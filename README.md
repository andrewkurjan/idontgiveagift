# I Don't Give a Gift 🎁 💩

## Overview

"I Don't Give a Gift" is a web application designed to help users organize gift exchanges. Users can create lists of participants, assign gift recipients, and send email notifications to participants. The app ensures that each participant is assigned a recipient in a fair and random manner.

## Features

- User authentication with NextAuth
- Create and manage participant lists
- Assign gift recipients randomly
- Send email notifications to participants
- Responsive and user-friendly interface

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Next.js API routes, tRPC, Prisma
- **Database**: PostgreSQL
- **Authentication**: NextAuth with Discord, GitHub, and SendGrid providers
- **Email Service**: SendGrid
- **State Management**: React Query (via @tanstack/react-query)
- **Validation**: Zod
- **Environment Management**: @t3-oss/env-nextjs

## Description

### /prisma/schema.prisma

This file defines the database schema using Prisma's schema language. It includes models for users, participants, and lists. Some models in here are specifically for AuthJS.
This List, Participant and Picks are the main models for the app, and store data for each respectively.

The List model has a many-to-many relationship with the User model, which allows users to create and manage lists of participants.

The Participant model has a many-to-many relationship with the List model, which allows users to assign participants to lists.

The Picks model has a one-to-many relationship with the Participant model, which allows users to assign gift recipients to participants.

### /app

This directory contains the Next.js application. The app is built with React and Tailwind CSS.

The app wrapper was used as a way to load in the user session and pass it down to the rest of the app. This is done by using the `useSession` hook from NextAuth. We are also loading in the user's lists and participants in this wrapper if the user returns to the app.

The app wrapper handles the session, and is a place where the navigation and layout are defined. If there is a session, the user is able to navigate to the app. If there is no session, the user is redirected to the login page.

#### List

The list component is simple and handles the creation of the user's list. Once a list is made is displays the list and a way delete it.

#### Participants

The participants component is a bit more complex. It handles the creation of participants and the assignment of participants to lists. It also handles the assignment of gift recipients to participants.

Participants are added one by one just using a first name and email address. You can remove a participant, and need a minimum of 3 participants to assign gift recipients.

Once you have enough participants, you can assign gift recipients. This is done by clicking the "Submit" button. This will assign a random participant to each participant in the list and same this data as a JSON object in the database.

#### Picks

The picks component simply displays the picks for each participant in the list. This is done by fetching the picks from the database and displaying them in a list.

If a user already has a list and had assigned gift recipients, they can view the picks for each participant in the list if they log back in.

#### Send Email

It is from this point where we show two options for communitcation. The first is to send the master list to the user's email. The second is to send an email to each participant with their assigned recipient.

#### Layout / Page

These are the main entry point for the web app and serve as a place just to set some global styles and layout for the app.

### /server

This directory holds a server action and some TRPC route queries.

#### Send Message

Send message is a server action that sends an email to a user. It is used to send the master list to the user's email. Because NextJs handles both the frontend and backend, we can use this function from the server action in the frontend and just pass in a message that we are watning to send.

I have integrated SendGrid into the app to send emails. This is done by using the SendGrid API and the `@sendgrid/mail` package.

#### /api

The api folder is for the TRPC routes. These are used to fetch data from the database and send it to the frontend.

I made three routers for the app. One for the lists, one for the participants, and one for the picks. These are used to fetch data from the database and send it to the frontend.

The list router has four queries. Create list is used to create a list. Get latest is used to get the latest list for the user, at this point a user can only have one list, but this might be added in the future. Delete list is used to delete a list. Set submitted to used to track whether the list has been submitted and the picks have been generated.

Participants only has a createq query. This is used to insert a participant into the database.

The picks router has two queries. Create picks is used to insert the picks into the database. Get picks is used to fetch the picks from the database.

#### /auth

This folder is for Next Auth / Auth JS. It is used to handle the authentication for the app.

I have added providers for Discord, GitHub, and SendGrid. This is done by using the `NextAuth` package and the `@next-auth` package.

The SendGrid provider is used to send magic link emails to the user via SendGrids API.

Discord, GitHub are linked via OAuth and have their respective secrets in the `.env` file. Each of these services must be configured on their end to allow the app to use their services.

### /services

That last file is just a simple message service the is used to build the email bodies that are sent to the user.

One of these functions is used to build the email body for the master list. The other is used to build the email body for the participant's email.

### other files

There are a bunch of config files that are generated by using the create t3 app boilderplate. These are used to set up the app and the database.

Some added and custom stying options are in the `tailwind.config.js` file. This is used to set up the Tailwind CSS for the app.