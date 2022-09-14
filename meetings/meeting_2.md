## Meeting September 13, 2022

### Progress

- Created a database to hold admins, employers, jobs, filters, and scholars
- Began creating the server to allow for updating, adding, deleting jobs, admins, etc.

### Next steps

- Finish building the API (only need to add querys for jobs and scholars)
- Add tests for the API
- Add params to only allow certain entities (ie. admins) to update data
- Deploy to AWS
- Add authentication integration with hubspot

### Meeting Notes

Frontend

- Add tags/keywords to jobs
- Split interns and new grads, add whether its a 4/8/12 mo, when it is
- Separate whats new from what was seen before
    - Save the timestamp evertime so we can highlight whats new
- Have a link to analytics on the posting
- Have a page to edit metadata and see performance

Backend

- If they have no filters, they get everyjob
    - If they have a filter then send the jobs that align
    - Only give what they filtered
    - Add a frequency, happens once per day across all jobs and all students at X time (Daily summary)
        - Add ability to alter frequency
    - Look into how we can use hubspot for notifications
        - Keep track on timeing etc in hubspot
    - Look into SSO options/login options
        - Look into signing in with google or apple
        - Look into magic links for emails