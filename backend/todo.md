- [X] Outline scholar, admin, employer and job tables in database.sql
- [X] Initialize each ^ in postgres
- [X] Add resolvers for 4 typedefs to offer basic CRUD functionality
    - [X] Add relational resolvers
    - [ ] Add checks to avoid duplicant entries
- [X] Write tests for server/database w/ mock data
    - [ ] Figure out how to make tests work with serverless
- [ ] Add authentication (maybe, look into SSO and if it's server or third party)
- [X] Deploy to AWS
- [X] Establish connection on frontend

# New TODOs
- [X] Re-write db schema in a ddl file to have less redundancy
    - [X] Set up db in postgres
    - [ ] Edit/delete data dictionary - might be useful as reference when getting
          data from the db into ts objects
    - [ ] Add a function that adds a job to featured/archived
- [ ] Fix query/mutations based on new schema
    - [ ] Add a function that adds a job to the db and include a trigger to look through
          views and sends emails when they align with scholar views
        - [ ] Use pg full text search to find jobs that align with scholar views
- [ ] Add more robust querys
- [ ] Write all query hooks for frontend
- [ ] Define permissions (e.g. to ensure only admins add jobs)
- [ ] Add authentication (Can I use SSO? or maybe next auth?)
    - [ ] See if its possible to do SSO with hubspot/use hubspot auth 
- [ ] Redeploy to AWS


Michael's Hours:
- Sat, Aug 27 - 1.5hrs
- Sun, Aug 28 - 6 hrs
- Mon, Aug 29 - 1 hr
- Tues, Aug 30 - 3 hrs
- Wed, Aug 31 - 1.5hrs + 
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
- Wed, Dec 21 - 