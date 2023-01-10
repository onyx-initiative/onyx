# onyx
💼 Job board for the Onyx Initiative

## Backend

### Introduction
The onyx job board is deployed on an AWS EC2 instance. Below are the steps to deploy it locally using serverless
for testing and development purposes and to deploy it to AWS.

### Local Deployment
#### Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [Serverless](https://serverless.com/framework/docs/getting-started/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

#### Deployment
1. Clone the repository
2. Install the dependencies
```bash
npm install
```
3. Configure the AWS CLI (Only needed if deploying to AWS and need to use and access key)
```bash
aws configure
```
4. Deploy the application
```bash
serverless deploy
```
5. The application will be deployed to AWS and the endpoint will be displayed in the console.

### Database deployment
If you make modifications to the database schema (backend/src/database/schema.ddl), you will need to deploy the database.
You will likely need to modify 1. the privacy and 2. the security groups to allow local access to the database. Make sure
to change the security group back to the original settings after you are done.
```bash
serverless deploy --stage dev --function deployDatabase

# or connect to the database via the psql cli
# port automatically forwarded to 5432
psql -h {HOSTNAME} -U {MASTER_USERNAME} -d {DATABASE_NAME}
```

