from fastapi import FastAPI
from typing import Optional
import asyncio
from fastapi.middleware.cors import CORSMiddleware

from webscraper.webscraper import find_companies, get_logo, scrape_jobs

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def main():
    return {"message": "Hello World"}

@app.get("/webscraper/logo/{company}")
async def main(company: str):
    company_name, company_id = find_companies(company)
    logo = await get_logo(company_name, company_id)
    return {"logo": logo}

@app.get("/webscraper/jobs/{company}")
async def main(company: str):
    company_name, company_id = find_companies(company)
    jobs = await scrape_jobs(company_name, company_id)
    return {"company_name": company_name, "jobs": jobs}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)