FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} vehicle-service.jar
ENTRYPOINT ["java","-jar","/vehicle-service.jar"]