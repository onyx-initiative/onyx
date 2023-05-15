# Build Steps:
1. docker build -t onyx-microservices . --platform linux/amd64 
2. docker images 
    2.1 Get the image id of the microservices image
    2.2 docker run -p 8080:8000 <image id> to make sure it runs properly
3. docker tag onyx-microservices:latest <ecr link>/onyx-microservices:latest
4. docker push <ecr link>/onyx-microservices:latest
5. Log into the EC2 instance via ssh and pull the docker image
6. docker run -d -p 80:8000 --name onyx-microservices mdawess/onyx-microservices:v<version number>
7. docker ps to make sure it's running
