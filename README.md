# Mock Enterprise E-learning Platform
This is a mock e-learning app for enterprise. 

## Motivation
The motivation of this development is to create something like Coursera and Udemy, where course authors and instructors may use platform in ways that would ease their work in scaffolding an e-learning course. While this is a mock-up, this is a dev practice to think more about the user experience.

## Goal
The eventual goal of this app is to allow course authors to create an e-learning course through a prescribed template. Additionally, the prescribed template should be flexible enough to cover most course structures.

## The template idea 
The template at this point of writing is in the shape of below - in descending order:
1. Course
2. Chapter
3. Section (Or End of Chapter Quiz)
4. Sub-Section

### Something to note
This is a do-when-I-am-free pet project. Not sure when I will finish this. But...

### What I have developed so far
1. Mobile layout wireframe
2. Designed schema for the DB
    - Course - Root table for any e-learning content
    - Chapter - Chapter table with course_id as foreign key
    - Section - Section table with chapter_id as foreign key
    - Multimedia - Multimedia table with section_id (Eg. Section's lecture video) or chapter_id (Eg. Chapter's intro video) as foreign key     
6. Sending course metadata and multimedia to DB in Postgres
7. Retrieving course metadata and multimedia from DB
8. Created an application backend (Express Typescript) to handle API request and DB CRUDs

### What I aim to do from this point on
1. E2E testing of data flow (retrieval and course creation)
2. Verify that template structure holds up in different cases
3. Comment section of each section and chapter

### Tools
1. Frontend: Angular 16
2. Backend: Express Typescript
3. DB: Postgres

Alhammi Aliff

