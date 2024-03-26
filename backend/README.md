# Saci Backend
> This is the backend module of the Saci project, its purpose is to serve as a comprehensive guide and learning tool for aspiring software engineers.

## General Overview
- Programmed in **Java** with the support of **Spring**;
- It's integrated with a **MySQL** database;
- Uses **Flyway** for automated database migrations and versioning;
- Follows a **DDD (Domain Driven Design)** architecture.

## Getting Started
### Development Environment Setup
### Run Database
```bash
$ docker-compose up -d
```
### Installation
```bash
$ mvn clean install
```
### Run
```bash
$ mvn spring-boot:run -"Dspring-boot.run.profiles"=local
```
Default page: http://localhost:8080

