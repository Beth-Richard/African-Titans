Overview


Student Campus Hub is a Next.js-based web platform designed to connect students with campus job opportunities.

This MVP implements the Jobs module, including:

Database-backed job listings

Student login and authentication

Saved jobs functionality

Admin job moderation

API-driven architecture



The system is built collaboratively and structured to support future features and scaling.

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

phpMyAdmin (local environment)



Development Tools

Git

Visual Studio / VS Code

PNPM / NPM

Project Structure
African-Titans/
│
├── app/
│   ├── api/                # Backend API routes
│   │   ├── auth/           # Login/logout routes
│   │   ├── jobs/           # Job endpoints
│   │   ├── admin/          # Admin moderation endpoints
│   │   └── profile/        # Saved jobs / profile routes
│
│   ├── login/              # Login page
│   ├── jobs/               # Jobs UI
│   └── admin/              # Admin dashboard
│
├── components/             # Reusable UI components
├── lib/                    # Database + utilities
│   ├── db.ts               # Database connection
│   ├── types.ts            # Shared types
│
├── Database/
│   └── phpMyAdmin SQL Dump.sql
│
├── public/                 # Static assets
│
├── package.json
├── tsconfig.json
└── README.md
Database Setup


The database used for the application is:

student_campus_hub
Step 1 – Start Local Database


Start your local MySQL environment using:

XAMPP

MAMP

MySQL server



Ensure phpMyAdmin is accessible.



Example:

http://localhost/phpmyadmin
Step 2 – Create the Database


In phpMyAdmin:

Click New

Create a database named:

student_campus_hub
Use:

utf8mb4_general_ci
as the collation.

Step 3 – Import Schema + Seed


Navigate to:

Database/phpMyAdmin SQL Dump.sql
Then:

Select the student_campus_hub database

Click Import

Upload the SQL dump

Run import



This will create:

campuses

jobs

companies

job_categories

job_category_map

job_moderation

users

saved_jobs



and insert seed data for development.

Environment Setup


Create a local environment file.

.env.local
Example configuration:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=student_campus_hub
This file is not committed to Git for security reasons.

Installing the Project


Clone the repository:

git clone <repo-url>
Navigate into the project:

cd African-Titans
Install dependencies:

npm install
or if using PNPM:

pnpm install
Running the Application


Start the development server:

npm run dev
The app will run at:

http://localhost:3000
Authentication


The application includes a basic authentication system.



Features:

Login route

Logout functionality

Password hashing for security

Current user endpoint (/api/me)



Authentication routes:

/api/auth/login
/api/auth/logout
/api/me
Passwords are hashed before comparison with stored values.

API Routes


Jobs
GET /api/jobs
GET /api/jobs/[id]
POST /api/jobs/batch
Admin
GET /api/admin/jobs
POST /api/admin/jobs/moderate
Admin endpoints allow moderation of job listings.

Profile
GET /api/profile/saved
POST /api/profile/saved
Allows users to save and retrieve job listings.

Main Features (MVP1)


Jobs Module

Browse job listings

View individual job details

Save jobs to profile

Admin moderation system



Authentication

Login

Logout

User session retrieval



Database Integration

MySQL-backed data

API driven data access

Development Notes


Ignored directories:

node_modules/
.next/
.vs/
.env.local
These are excluded from Git to prevent unnecessary files being committed.

How to Contribute
Pull latest changes

git pull origin developers
Create a feature branch

git checkout -b feature/my-feature
Commit changes

git commit -m "feat: add feature"
Push branch

git push origin feature/my-feature
Open Pull Request

MVP Status


Current milestone:

MVP1 – Jobs Platform Core
Completed:

Database schema

Seed data

Job listing API

Authentication

Saved jobs system

Admin moderation

UI integration

Future Work


Planned improvements include: (sprint 2 or 1 pm team agree) 

Registration Page - Students & Companies 

Improved authentication/session management - currently works. 

Notifications - logged in/ logged out/ job saved 

UI refinement - log in page - can see more after testing

Deployment environment when running 

Authors


Nico Bowen 

African Titans Dev Team



Computer Science – Collaborative Development 