SQL SCHEMA – JOBS MODULE (MMP)
Project: Student Campus Hub
Version: MMP
Prepared by: Ali Salih
Document Type: SQL Schema

1. Introduction
This document contains the complete SQL schema for the Jobs Module MMP, including all tables, constraints, foreign keys, and indexes. The schema is designed to support a scalable, secure, and high-performance job-search system for students.

2. SQL Schema
2.1 Students Table
CREATE TABLE Students (
  StudentID INT PRIMARY KEY AUTO_INCREMENT,
  UniEmail VARCHAR(255) UNIQUE NOT NULL,
  FullName VARCHAR(255) NOT NULL,
  Course VARCHAR(255) NOT NULL,
  YearOfStudy INT CHECK (YearOfStudy BETWEEN 1 AND 4),
  Campus ENUM('Wolverhampton','Telford','Walsall') NOT NULL,
  PhoneNumber VARCHAR(20),
  ProfilePicture VARCHAR(255)
);

2.2 Companies Table
CREATE TABLE Companies (
  CompanyID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  Industry VARCHAR(255),
  Location VARCHAR(255),
  ContactDetails VARCHAR(255) NOT NULL,
  CompanyLogo VARCHAR(255),
  VerifiedStatus BOOLEAN DEFAULT 0
);



2.3 Jobs Table
CREATE TABLE Jobs (
  JobID INT PRIMARY KEY AUTO_INCREMENT,
  Title VARCHAR(255) NOT NULL,
  Description TEXT NOT NULL,
  Type ENUM('FT','PT','Seasonal','Internship') NOT NULL,
  Salary DECIMAL(10,2) CHECK (Salary > 0),
  SalaryType ENUM('hourly','weekly','monthly') NOT NULL,
  Location VARCHAR(255) NOT NULL,
  Campus ENUM('Wolverhampton','Telford','Walsall') NOT NULL,
  ApplicationDeadline DATETIME NOT NULL,
  CompanyID INT NOT NULL,
  ApprovedByAdmin BOOLEAN DEFAULT 0,
  FOREIGN KEY (CompanyID) REFERENCES Companies(CompanyID) ON DELETE CASCADE
);

2.4 Applications Table
CREATE TABLE Applications (
  ApplicationID INT PRIMARY KEY AUTO_INCREMENT,
  StudentID INT NOT NULL,
  JobID INT NOT NULL,
  DateApplied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Status ENUM('pending','reviewing','interview','accepted','rejected') DEFAULT 'pending',
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE,
  FOREIGN KEY (JobID) REFERENCES Jobs(JobID) ON DELETE CASCADE
);

2.5 SavedJobs Table
CREATE TABLE SavedJobs (
  SavedID INT PRIMARY KEY AUTO_INCREMENT,
  StudentID INT NOT NULL,
  JobID INT NOT NULL,
  SavedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE,
  FOREIGN KEY (JobID) REFERENCES Jobs(JobID) ON DELETE CASCADE
);


3. Indexes (Performance Optimization)
CREATE INDEX idx_jobs_campus ON Jobs(Campus);
CREATE INDEX idx_jobs_type ON Jobs(Type);
CREATE INDEX idx_jobs_company ON Jobs(CompanyID);

CREATE INDEX idx_applications_student ON Applications(StudentID);

CREATE INDEX idx_savedjobs_student ON SavedJobs(StudentID);

4. Conclusion
This SQL schema provides a complete, production-ready foundation for the Jobs Module MMP. It includes all required tables, relationships, constraints, and performance indexes.

