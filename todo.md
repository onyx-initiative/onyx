# New TODOs
## Priority
- [X] Re-write db schema in a ddl file to have less redundancy
    - [X] Set up db in postgres
    - [X] Edit/delete data dictionary - might be useful as reference when getting data from the db into ts objects
    - [X] Add a function that adds a job to featured/archived
- [X] Fix query/mutations based on new schema
    - [X] Use pg full text search to find jobs that align with scholar views
    - [X] Implement the count page views function
        - Everytime someone navigates to the page, call the function to increment the count
    - [X] Implement the send email function
    - [X] Write tests for server/database w/ mock data
- [X] Add authentication (Can I use SSO? or maybe next auth?)
    - [X] See if its possible to do SSO with hubspot/use hubspot auth 
    - [X] Get admins to use a username and password and then give them a token (don't use hubspot auth)
## Later
- [ ] Figure out how to make tests work with serverless
- [X] Add queries beyond CRUD
- [X] Write all query/mutation hooks for frontend
    - Note: For some of the mutations (e.g. adding jobs), will likely need to combine
        querys to allow for a better user experience. E.g. inputting an employer name
        when adding a job rather than an employer id.
- [X] Redeploy to AWS

## Emails
- [X] Add a BE function to look through the views of each scholar and return the jobs that align with their views
    - Return scholar name, company, and the jobs that align with their views
    - Limit to 5 jobs per scholar
- [ ] Make the filters more fuzzy, ie. not all criteria has to match

## New

- [ ] Add apple MSFT and google auth bc theyre students <- Need onyx cc
- [X] CRON job to send emails
- [X] Add password login for admins
    - [X] Add valid admin email list to the database
    - [X] Add frontend creation/login flow for admin
    - [X] Add a hash for the password
    - [ ] Add a way to reset password
- [X] Add semantic search
- [X] Link bookmarking to backend
- [X] Add a view creation on signup
- [ ] Make filters grab 5 jobs per view
 

Michael's Hours:
- Sat, Aug 27 - 1.5 hrs
- Sun, Aug 28 - 6 hrs
- Mon, Aug 29 - 1 hr
- Tues, Aug 30 - 3 hrs
- Wed, Aug 31 - 1.5 hrs 
- Thurs, Sept 1 - 1 hr
- Fri, Sept 2 - 1 hr
- Mon, Sept 12 - 9 hrs
- Tues, Sept 13 - 2 hrs
- Thurs, Sept 15 - 3 hr
- Fri, Sept 16 - 1 hr
- Sat, Sept 17 - 4 hrs
- Sun, Sept 18 - 3 hrs
- Mon, Sept 19 - 4 hrs
- Tues, Sept 20 - 5 hrs
- Wed, Sept 21 - 1.5
- Monday, Sept 26 - 7 hrs
- Tuesday, Sept 27 - 6 hrs
- Wed, Sept 28 - 2 hrs
- Wed, Nov 9 - 2 hrs
- Thurs, Nov 10 - 3 hrs
- Sat, Dec 17 - 1 hr
- Wed, Dec 21 - 14 hrs
- Thurs, Dec 22 - 3 hrs
- Fri, Dec 23 - 1 hr
- Mon, Jan 2 - 3 hrs
- Tues, Jan 3 - 8 hrs
- Wed, Jan 4 - 10 hrs
- Thurs, Jan 5 - 5 hrs
- Fri, Jan 6 - 6 hrs
- Sun, Jan 8 - 1 hr
- Wed, Jan 11 - 1 hr
- Mon, Jan 16 - 2 hr
- Tues, Jan 17 - 2 hr
- Fri, Jan 20 - 13 hrs
- Sat, Jan 21 - 3 hrs
- Sun, Jan 23 - 5 hrs
- Mon, Jan 24 - 7 hrs
- Sat, Jan 28 - 2 hr
- Thurs, Feb 9 - 2 hr
- Sun, Feb 12 - 2 hr
- Mon, Feb 13 - 2 hr
- Tues, Feb 14 - 7 hr
- Tues, Feb 21 - 6 hr
- Wed, Feb 22 - 9 hr
- Thurs, Feb 23 - 12 hr
- Sat, April 15 - 5 hr
- Wed Apr 19 - 3 hr

