export const unsupportedCompanies = {
    "Mckinsey & Company": "https://www.mckinsey.com/~/media/images/global/seoimageplaceholder.jpg",
}

export async function getLogo(company: string) {
    if (company in unsupportedCompanies) {
        return unsupportedCompanies[company as keyof typeof unsupportedCompanies];
    } else {    
        const data = fetch('http://ec2-3-96-162-79.ca-central-1.compute.amazonaws.com' + '/webscraper/logo/' + company).then(res => res.json()).then(data => {
        return data;
        });
        const logo = await data;
        return logo;
    }
}