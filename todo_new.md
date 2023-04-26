Mike
- [X] Fix search
- [X] Implement filter
- [X] Fix emails
  - [ ] Make sure jobs are properly filtered
- [X] Add job from csv/excel
  - [X] Add a gql endpoint to batch add using employer name instead of id
- [X] Add profile page
  - Just a dropdown w profile and logout
  - Profile page shows views

Add link:
 - [X] Modal
 - [ ] Add from csv
 - [ ] Add single job

# Tests
- Test long descriptions
- Test how many jobs can be batch added

Cole
- [X] Make responsive
- [X] Link jobs to search from employer
- [X] Format drawer in open jobs page
- [X] Remove job
- [X] Remove employer
- [X] Add announcement banner     
- [ ] Fix single add job **(PRIORITY)**
  - [ ] Description not being sent properly
  - [ ] New jobs not showing up in search
- [ ] Connect it to hubspot and add a db table AllowedScholars **(PRIORITY)**
  - [ ] You'll need to add a check to the resolver method for creating a scholar to first check this table before allowing a scholar to continue
  - [ ] Just use the hubspot api to populate it directly (google/chatgpt can help)
- Look into if we can use vercel analytics on components
- [ ] Add support for employer videos
- [ ] Add IG widget

