Student Campus Hub – MVP

What this project is

Student Campus Hub is a small web platform built using Next.js that connects students with job opportunities around their university campus.

This repository contains the first MVP version of the platform.

At the moment the system includes:

Job listings pulled from a MySQL database

Student login functionality

Ability to save jobs

Admin job approval / moderation

API routes for data handling

The project was built collaboratively and structured so additional features can be added in future sprints.

Tech Stack
Frontend

Next.js (App Router)

React

TypeScript

TailwindCSS

Backend

Next.js API Routes

Node.js

Database

MySQL

phpMyAdmin (local development)

Development Tools

Git

VS Code

npm / pnpm

Project Structure

Main folders in the project:

African-Titans/

app/
  api/
    auth/        login / logout
    jobs/        job endpoints
    admin/       admin moderation
    profile/     saved jobs

  login/         login page
  jobs/          jobs UI
  admin/         admin dashboard

components/      reusable UI components

lib/
  db.ts          database connection
  types.ts       shared TypeScript types

  Database/
    phpMyAdmin SQL Dump.sql

public/          static assets

package.json
tsconfig.json
README.md
Database Setup

The application uses a MySQL database called:

student_campus_hub
Step 1 – Start MySQL

Start your local database using something like:

XAMPP

MAMP

MySQL server

Then open phpMyAdmin in your browser:

http://localhost/phpmyadmin
Step 2 – Create the database

Inside phpMyAdmin:

Click New

Create a database called:

student_campus_hub

Use this collation:

utf8mb4_general_ci
Step 3 – Import the schema

The database structure and seed data are provided in the SQL dump located here:

lib/Database/phpMyAdmin SQL Dump.sql

To import it:

Select the student_campus_hub database

Click Import

Upload the SQL file

Run the import

This will automatically create all tables including:

campuses

users

companies

jobs

job_categories

job_category_map

job_moderation

saved_jobs

It also includes seed data for development.

Environment Variables

Create a file in the root of the project called:

.env.local

Add the following database configuration:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=student_campus_hub

This file is not pushed to GitHub.

Installing the Project

Clone the repository:

git clone <repository-url>

Move into the project folder:

cd African-Titans

Install dependencies:

npm install

or

pnpm install
Running the Project

Start the development server:

npm run dev

The application should now be available at:

http://localhost:3000
Authentication

The system currently includes a simple login system.

Features implemented:

Login route

Logout route

Current user endpoint

Password hashing

API routes used:

/api/auth/login
/api/auth/logout
/api/me

Passwords are hashed before being compared with database values.

API Routes
Jobs
GET /api/jobs
GET /api/jobs/[id]
POST /api/jobs/batch
Admin Moderation
GET /api/admin/jobs
POST /api/admin/jobs/moderate

Admins can approve or reject job listings before they appear publicly.

Profile / Saved Jobs
GET /api/profile/saved
POST /api/profile/saved

Students can save job listings to their profile.

MVP Features

Current MVP includes:

Job Listings

Browse jobs

View job details

Save jobs

Authentication

Login

Logout

Retrieve logged-in user

Admin Controls

Job moderation

Approval / rejection

Database Integration

MySQL database

API-driven data access

Development Notes

The following folders/files are ignored by Git:

node_modules
.next
.vs
.env.local

These contain local or generated files and should not be committed.

How to Contribute

Pull the latest version of the dev branch:

git pull origin dev

Create a new branch for your feature:

git checkout -b feature/your-feature

Commit your changes:

git commit -m "add feature"

Push your branch:

git push origin feature/your-feature

Then open a Pull Request.

Current Project Status

Current milestone:

MVP1 – Core Jobs Platform

Completed so far:

Database schema

Seed data

Job listing API

Login system

Saved jobs feature

Admin moderation

UI integration

Planned Improvements

Possible features for future sprints:

Student registration

Company registration

Improved session handling

Notifications

UI improvements

Deployment

Authors

Nico Bowen
African Titans Development Team

University of Wolverhampton
Computer Science – Collaborative Development