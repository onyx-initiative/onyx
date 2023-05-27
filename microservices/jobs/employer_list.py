import pandas as pd
from microservices.webscraper import find_companies, get_logo

employer_list = pd.read_excel("../../../../../Desktop/Employers.xlsx")


employers = {}
for label in employer_list:
    employers[label] = []
    for data in employer_list[label]:
        if pd.notnull(data):
            employers[label].append(data)

# Categories given were: In Discussion, Signed, Contract, Prospecting
# Note: All non-company name data is dummy data
sql = {}
for label in employers:
    if label == "Signed" or "Contract":
        for employer in employers[label]:
            company_name, company_id = find_companies(employer)
            sql[employer] = {
                "name": employer,
                "contact_email": f"contact@{employer}.com",
                "address": "1 Bloor St. E",
                "website": f"www.{employer}.com",
                "description": "This is a sample description of a company",
                "logo_url": get_logo(company_name, company_id)
            }

print(len(sql))


