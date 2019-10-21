# On The House

## Objective

On The House is a web application that allows UCI students to find solutions for UCI housing. Students can find subleasing opportunities and cost evaluations to meet their housing needs.

## Background

Finding affordable housing for people is quite a struggle at the UCI campus. It may be difficult for new students to find housing solutions, if they do not know people living in the area. Currently, a new student has three options for housing: 

1. Apply for ACC housing and accept an assigned housing community on campus.
2. Sign a new lease with one of the multiple Irvine Company Apartment communities.   
3. Find lease-holders looking for new roommates/subletters via social media.

Given the cost of ACC housing, and the cost and competition of signing a new lease, new students looking for affordable housing turn to various Facebook groups to look for roommates. The problem with this approach, however, is that posts on leasing and housing groups on Facebook cannot be organized, filtered or searched based on personal preferences. 

On The House provides the simple option of categorizing housing posts for UCI students. Posters can list their sublease information using options such as community, price, and floor plan.

## Scope

The purpose of our application is to cater to UCI students looking for housing options. The application will specifically include all the housing communities near UCI. In order to verify a user as a student, the application will require a valid UCI email address for a registering user.

## Running the Application

First, clone the repository using 'git clone' command, or download the ZIP via GitHub.

Next, make sure you have npm and nodejs installed. You can check for that by running -
```
npm -v
node -v
```
Finally, make sure you are in the source folder of this repository to follow the rest of the steps below.

### Backend Node Server

In order to setup the backend node server, run the following commands.
```
cd backend
npm i
```
These commands will install dependencies required to run the server onto your computer. Then, start the server by typing -
```
npm run start
```

### Frontend React App

In order to setup the frontend react app, run the following commands.
```
cd frontend
npm i
```

These commands will install dependencies required to run the react application onto your computer. Then, start the app by typing - 
```
npm run start
```



