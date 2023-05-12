import asyncio
import json
import math
from collections import defaultdict
from typing import Dict, List#, Tuple
import re

import httpx
from parsel import Selector

HEADERS = {'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'}

session = httpx.AsyncClient(
    timeout=httpx.Timeout(30.0),
    cookies={"tldp": "3"},
    follow_redirects=True,
    headers=HEADERS,
)

async def find_country_code() -> None:
    # Note: Canada English is 3, Canada French is 19
	response = await httpx.get(
    "https://www.glassdoor.com/",
    follow_redirects=True,
	)
	country_data = re.findall(r'"countryMenu\\":.+?(\[.+?\])', response.text)[0].replace('\\', '')
	country_data = json.loads(country_data)
	for country in country_data:
		print(f"{country['textKey']}: {country['id']}")

def find_companies(query: str):
    """find company Glassdoor ID and name by query. e.g. "ebay" will return "eBay" with ID 7853"""
    result = httpx.get(
        url=f"https://www.glassdoor.com/searchsuggest/typeahead?numSuggestions=8&source=GD_V2&version=NEW&rf=full&fallback=token&input={query}",
        headers=HEADERS,
    )
    data = json.loads(result.content)
    company_name, company_id =  data[0]["suggestion"], data[0]["employerId"]
	
    # url = f"https://www.glassdoor.com/Overview/Working-at-{company_name}-EI_IE{company_id}.htm"
    # response = httpx.get(
	# 	url, 
	# 	cookies={"tldp": "1"},  # use cookies to force US location
	# 	follow_redirects=True
	# )
    # sel = Selector(response.text)
    # print(sel.css("h1::text").get())

    return company_name, company_id

def find_json_objects(text: str, decoder=json.JSONDecoder()):
    """Find JSON objects in text, and generate decoded JSON data and it's ID"""
    pos = 0
    while True:
        match = text.find("{", pos)
        if match == -1:
            break
        try:
            result, index = decoder.raw_decode(text[match:])
            # backtrack to find the key/identifier for this json object:
            key_end = text.rfind('"', 0, match)
            key_start = text.rfind('"', 0, key_end)
            key = text[key_start + 1 : key_end]
            yield key, result
            pos = match + index
        except ValueError:
            pos = match + 1


def extract_apollo_cache(html):
    """Extract apollo graphql cache data from HTML source"""
    selector = Selector(text=html)
    # print(selector)
    script_with_cache = selector.xpath('//*[@id="__NEXT_DATA__"]').get()
    cache = defaultdict(list)
    # print("Cache is: " + str(script_with_cache))
    for key, data in find_json_objects(script_with_cache):
        cache[key].append(data)
    return cache


def parse_job_page_count(html) -> int:
    """parse job page count from pagination details in Glassdoor jobs page"""
    _total_results = Selector(html).css(".paginationFooter::text").get()
    if not _total_results:
        return 1
    _total_results = int(_total_results.split()[-1])
    _total_pages = math.ceil(_total_results / 40)
    return _total_pages


async def get_logo(employer_name: str, employer_id: str):
    first_page = await session.get(
        url=f"https://www.glassdoor.com/Jobs/{employer_name}-Jobs-E{employer_id}.htm?filter.countryId={session.cookies.get('tldp')}",
        headers=HEADERS,
    )
    """
    Checkpoints within the webscrape results:
    1, For an employer description: jobs['application/json'][0]['props']['pageProps']['apolloCache'][f'EmployerManagedContentSection:{section_id}']
    """
    jobs = extract_apollo_cache(first_page.text)
    for key in jobs['application/json'][0]['props']['pageProps']['apolloCache'][f'Employer:{employer_id}']:
        if key == 'squareLogoUrl':
            return jobs['application/json'][0]['props']['pageProps']['apolloCache'][f'Employer:{employer_id}'][key]

async def scrape_jobs(employer_name: str, employer_id: str):
    """Scrape job listings"""
    # scrape first page of jobs:
    first_page = await session.get(
        url=f"https://www.glassdoor.com/Jobs/{employer_name}-Jobs-E{employer_id}.htm?filter.countryId={session.cookies.get('tldp')}",
    )
    # print(first_page.text)
    # print(first_page.url)
    jobs = extract_apollo_cache(first_page.text)
    total_pages = parse_job_page_count(first_page.text)

    # https://www.glassdoor.com/partner/jobListing.htm?pos=102&ao=1297893&s=21&guid=000001880d1c2d1fa1aa4aee12beb6fd&src=GD_JOB_AD&t=ESR&vt=n&cs=1_07558012&cb=1683847130629&jobListingId=1008624498502&jrtk=3-0-1h06hobceghqh801-1h06hobcuii26800-9bd894b15f00878d-

    path = jobs['application/json'][0]['props']['pageProps']['apolloCache']['ROOT_QUERY']
    pattern = re.compile('jobListings', re.IGNORECASE)
    
    for key in path:
        match = pattern.search(key)
        if match:
            # find the jobListings key
            path = path[key]['jobListings']
            break
    
    jobs = {}
    for job in path:
        jobs[job['jobview']['header']['jobTitleText']] = {
            'company': job['jobview']['overview']['shortName'], 
            'location': job['jobview']['header']['locationName'], 
            'pay_currency': job['jobview']['header']['payCurrency'], 
            'job_url': f"https://www.glassdoor.com{job['jobview']['header']['jobLink']}"
        }

    return jobs


# Reviews
# def extract_apollo_state(html):
#     """Extract apollo graphql state data from HTML source"""
#     data = re.findall('apolloState":\s*({.+})};', html)[0]
#     data = json.loads(data)
#     return data

# def parse_reviews(html) -> Tuple[List[Dict], int]:
#     """parse jobs page for job data and total amount of jobs"""
#     cache = extract_apollo_state(html)
#     xhr_cache = cache["ROOT_QUERY"]
#     reviews = next(v for k, v in xhr_cache.items() if k.startswith("employerReviews") and v.get("reviews"))
#     return reviews


# async def scrape_reviews(employer: str, employer_id: str, session: httpx.AsyncClient):
#     """Scrape job listings"""
#     # scrape first page of jobs:
#     first_page = await session.get(
#         url=f"https://www.glassdoor.com/Reviews/{employer}-Reviews-E{employer_id}.htm",
#         headers=HEADERS,
#     )
#     reviews = parse_reviews(first_page.text)
#     # find total amount of pages and scrape remaining pages concurrently
#     total_pages = reviews["numberOfPages"]
#     print(f"scraped first page of reviews, scraping remaining {total_pages - 1} pages")
#     other_pages = [
#         await session.get(
#             url=str(first_page.url).replace(".htm", f"_P{page}.htm"),
#             headers=HEADERS,
#         )
#         for page in range(2, total_pages + 1)
#     ]
#     for page in await asyncio.gather(*other_pages):
#         page_reviews = parse_reviews(page.text)
#         reviews["reviews"].extend(page_reviews["reviews"])
#     return reviews


async def main(company_name: str):
    company_name, company_id = find_companies(company_name)
    # print(f"found company: {company_name} with id: {company_id}")
    logo = await get_logo(company_name, company_id)
    print(logo)
    # jobs = await scrape_jobs(company_name, company_id)
    # print(jobs)
    # reviews = await scrape_reviews(company_name, company_id, session)
    # print(json.dumps(jobs, indent=2))
    # print(json.dumps(reviews, indent=2))


if __name__ == "__main__":
    asyncio.run(main("Microsoft"))