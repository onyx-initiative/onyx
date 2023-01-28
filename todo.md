# New TODOs
## Priority
- [X] Re-write db schema in a ddl file to have less redundancy
    - [X] Set up db in postgres
    - [X] Edit/delete data dictionary - might be useful as reference when getting data from the db into ts objects
    - [X] Add a function that adds a job to featured/archived
- [X] Fix query/mutations based on new schema
    - [ ] Add a function that adds a job to the db and include a trigger to look through views and sends emails when they align with scholar views
        - [X] Use pg full text search to find jobs that align with scholar views
        - [X] Implement the count page views function
         - Everytime someone navigates to the page, call the function to increment the count
        - [ ] Implement the send email function
    - [X] Write tests for server/database w/ mock data
- [X] Add authentication (Can I use SSO? or maybe next auth?)
    - [X] See if its possible to do SSO with hubspot/use hubspot auth 
    - [ ] Add to the serverless server
     - [ ] Get admins to use a username and password and then give them a token (don't use hubspot auth)
## Later
- [ ] Figure out how to make tests work with serverless
- [ ] Add queries beyond CRUD
- [ ] Write all query/mutation hooks for frontend
    - Note: For some of the mutations (e.g. adding jobs), will likely need to combine
        querys to allow for a better user experience. E.g. inputting an employer name
        when adding a job rather than an employer id.
- [ ] Redeploy to AWS

## New

- Add apple MSFT and google auth bc theyre students
- Check hubsot api yo grab student emails
- CRON job to send emails
 

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

