## Database docs

## Entity Relationship Diagram
![ER Diagram for the Onyx schema](assets/onyx_erd.png)

## Instructions

To enter into the db locally:

```shell
# cd into the database directory
cd backend/src/database 

# Switch to pqsl command line
psql postgres

# load schema
\i schema.ddl

# Or if schema already loaded
SET search_path TO onyx;

# View all relations
\dt
```

Or, to SSH into the db:

```shell
chmod 400 onyx_server.pem 

ssh -i "onyx_server.pem" {EC2_URL}

psql -h {ONYX_DB_ENDPOINT} -U postgres
```