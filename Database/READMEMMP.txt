# MMP Database & Scope Notes

**Usage:**
1. Load the existing database schema
2. Run the MMP seed file above
3. The system is immediately ready for local testing and demo

---

## Registration & Authentication Scope Decision
User registration and authentication were intentionally excluded from the MMP feature set.

The core MMP goal is to allow students to:
- Browse real job listings
- Filter opportunities by category and employer
- Apply for roles via legitimate external application links

This functionality does **not require internal user accounts**.

Implementing registration would require the platform to collect and securely store personal and potentially sensitive data (names, emails, credentials). Under GDPR and data protection best practices, this would introduce additional compliance, security, and verification responsibilities (e.g. validating university email domains or institutional identity).

To maintain a privacy-first and low-risk prototype, the MMP avoids storing personal user data entirely. Applications are handled externally by employers or third-party job platforms already equipped to manage recruitment data securely.

Registration and authentication are recognised as important features for a production system and are deferred to a later development stage once appropriate infrastructure and governance can be introduced.

---

## Summary
- The MMP builds on the existing MVP backbone
- Real job data is introduced via a dedicated SQL seed
- Job discovery and application flows are fully functional
- Registration is excluded by design to reduce data protection risk and remain within Sprint 2 scope


## Overview
For the MMP (Sprint 2), the focus of the system is to support students in finding suitable job opportunities using realistic data and applying through trusted external links. The core architecture from MVP has been retained, while the database content has been extended to reflect real-world job listings.

This document outlines the database changes and key scope decisions made for the MMP.

---

## Database Changes (MMP)
- A new SQL seed file has been introduced to populate the database with **realistic job listings** suitable for demonstration and testing.
- The database schema and backbone remain unchanged from the MVP.
- Job-to-company and job-to-category mappings have been validated to ensure data integrity.
- No existing MVP seed files were modified to preserve rollback safety. (they set up core database and structure so must be run first) 

**MMP SQL file:** 'UpdateSQLMMPSPRINT2.txt'
(ensure you have run – database/phpMyAdmin MYSQL dump.txt else it wont work) 

1.	Clears everything inserts real jobs and category’s 
2.	Run Script
3.	Re-Map job-to-Categories 
4.	Add more jobs
---------------------------------------------------------------------------------
START TRANSACTION;

-- =====================================================
-- 1. CLEAR EXISTING JOB DATA (SAFE RESET)
-- =====================================================
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM saved_jobs;
DELETE FROM job_moderation;
DELETE FROM job_category_map;
DELETE FROM jobs;

ALTER TABLE jobs AUTO_INCREMENT = 1;
ALTER TABLE job_moderation AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- 2. INSERT REAL JOBS (SAFE COMPANY RESOLUTION)
-- =====================================================

/* -------------------------
   WOLVERHAMPTON (campus_id = 1)
   ------------------------- */

-- Wolves Coffee Co. (Hospitality)
INSERT INTO jobs (
  company_id, campus_id, title, description, employment_type,
  pay_min, pay_max, currency, pay_type, remote_type,
  location_text, postcode, lat, lng, apply_url, status
)
SELECT
  c.company_id, 1,
  'Barista (Part-time)',
  'Prepare drinks, serve customers, maintain cleanliness. Student-friendly shifts.',
  'part-time', 10.50, 12.00, 'GBP', 'hourly', 'onsite',
  'Wolverhampton City Centre', 'WV1',
  52.586200, -2.128600,
  'https://uk.indeed.com/q-part-time-barista-l-wolverhampton-jobs.html',
  'approved'
FROM companies c
WHERE c.company_name = 'Wolves Coffee Co.';

INSERT INTO job_category_map (job_id, category_id)
VALUES (LAST_INSERT_ID(), 2); -- Hospitality

-- Midlands Retail Group (Retail)
INSERT INTO jobs (
  company_id, campus_id, title, description, employment_type,
  pay_min, pay_max, currency, pay_type, remote_type,
  location_text, postcode, lat, lng, apply_url, status
)
SELECT
  c.company_id, 1,
  'Retail Assistant (Part-time)',
  'Customer service, tills, stock replenishment.',
  'part-time', 10.50, 11.50, 'GBP', 'hourly', 'onsite',
  'Wolverhampton Retail Park', 'WV10',
  52.615000, -2.105000,
  'https://uk.indeed.com/q-part-time-retail-l-wolverhampton-jobs.html',
  'approved'
FROM companies c
WHERE c.company_name = 'Midlands Retail Group';

INSERT INTO job_category_map (job_id, category_id)
VALUES (LAST_INSERT_ID(), 1); -- Retail

-- Campus IT Services (Tech Support)
INSERT INTO jobs (
  company_id, campus_id, title, description, employment_type,
  pay_min, pay_max, currency, pay_type, remote_type,
  location_text, postcode, lat, lng, apply_url, status
)
SELECT
  c.company_id, 1,
  'IT Lab Assistant',
  'Support students with logins, printing, and basic troubleshooting.',
  'part-time', 12.00, 13.00, 'GBP', 'hourly', 'onsite',
  'Wolverhampton Campus', 'WV1',
  52.587000, -2.128000,
  'https://uk.indeed.com/q-part-time-it-support-l-wolverhampton-jobs.html',
  'approved'
FROM companies c
WHERE c.company_name = 'Campus IT Services';

INSERT INTO job_category_map (job_id, category_id)
VALUES (LAST_INSERT_ID(), 7); -- Tech Support

-- Creative Wolverhampton (Marketing   PENDING)
INSERT INTO jobs (
  company_id, campus_id, title, description, employment_type,
  pay_min, pay_max, currency, pay_type, remote_type,
  location_text, postcode, lat, lng, apply_url, status
)
SELECT
  c.company_id, 1,
  'Content Assistant (Pending)',
  'Assist with social media posts and basic design tasks.',
  'part-time', 12.00, 14.00, 'GBP', 'hourly', 'hybrid',
  'Wolverhampton / Remote', 'WV1',
  52.586900, -2.128800,
  'https://uk.indeed.com/q-part-time-marketing-l-wolverhampton-jobs.html',
  'pending'
FROM companies c
WHERE c.company_name = 'Creative Wolverhampton';

INSERT INTO job_category_map (job_id, category_id)
VALUES (LAST_INSERT_ID(), 9); -- Marketing

/* -------------------------
   TELFORD (campus_id = 2)
   ------------------------- */

-- Telford Logistics Ltd (Warehouse)
INSERT INTO jobs (
  company_id, campus_id, title, description, employment_type,
  pay_min, pay_max, currency, pay_type, remote_type,
  location_text, postcode, lat, lng, apply_url, status
)
SELECT
  c.company_id, 2,
  'Warehouse Operative',
  'Picking and packing orders. Training provided.',
  'part-time', 11.00, 13.00, 'GBP', 'hourly', 'onsite',
  'Telford Industrial Estate', 'TF3',
  52.676900, -2.448000,
  'https://uk.indeed.com/q-part-time-warehouse-l-telford-jobs.html',
  'approved'
FROM companies c
WHERE c.company_name = 'Telford Logistics Ltd';

INSERT INTO job_category_map (job_id, category_id)
VALUES (LAST_INSERT_ID(), 4); -- Warehouse

-- City Bites Catering (Hospitality)
INSERT INTO jobs (
  company_id, campus_id, title, description, employment_type,
  pay_min, pay_max, currency, pay_type, remote_type,
  location_text, postcode, lat, lng, apply_url, status
)
SELECT
  c.company_id, 2,
  'Catering Assistant (Pending)',
  'Food preparation, serving, and cleaning duties.',
  'part-time', 10.50, 11.50, 'GBP', 'hourly', 'onsite',
  'Telford Campus', 'TF2',
  52.676600, -2.446600,
  'https://uk.indeed.com/q-part-time-catering-l-telford-jobs.html',
  'pending'
FROM companies c
WHERE c.company_name = 'City Bites Catering';

INSERT INTO job_category_map (job_id, category_id)
VALUES (LAST_INSERT_ID(), 2); -- Hospitality

/* -------------------------
   WALSALL (campus_id = 3)
   ------------------------- */

-- StudyBuddy Tutors (Tutoring  FIXED)
INSERT INTO jobs (
  company_id, campus_id, title, description, employment_type,
  pay_min, pay_max, currency, pay_type, remote_type,
  location_text, postcode, lat, lng, apply_url, status
)
SELECT
  c.company_id, 3,
  'SEND Tutor (Part-time)',
  '1:1 tutoring for students with SEND needs. Training provided.',
  'part-time', 14.00, 18.00, 'GBP', 'hourly', 'onsite',
  'Walsall', 'WS1',
  52.585300, -1.984000,
  'https://uk.indeed.com/q-send-tutor-part-time-jobs.html',
  'approved'
FROM companies c
WHERE c.company_name = 'StudyBuddy Tutors';

INSERT INTO job_category_map (job_id, category_id)
VALUES (LAST_INSERT_ID(), 8); -- Tutoring

-- CarePlus Support (Care   PENDING)
INSERT INTO jobs (
  company_id, campus_id, title, description, employment_type,
  pay_min, pay_max, currency, pay_type, remote_type,
  location_text, postcode, lat, lng, apply_url, status
)
SELECT
  c.company_id, 3,
  'Care Support Assistant (Pending)',
  'Support adults with daily living tasks.',
  'part-time', 12.00, 14.50, 'GBP', 'hourly', 'onsite',
  'Walsall', 'WS1',
  52.585300, -1.984000,
  'https://uk.indeed.com/q-part-time-care-assistant-l-walsall-jobs.html',
  'pending'
FROM companies c
WHERE c.company_name = 'CarePlus Support';

INSERT INTO job_category_map (job_id, category_id)
VALUES (LAST_INSERT_ID(), 5); -- Care

-- Warehouse Nation (Warehouse)
INSERT INTO jobs (
  company_id, campus_id, title, description, employment_type,
  pay_min, pay_max, currency, pay_type, remote_type,
  location_text, postcode, lat, lng, apply_url, status
)
SELECT
  c.company_id, 3,
  'Warehouse Assistant',
  'Stock handling and order preparation.',
  'part-time', 11.00, 13.00, 'GBP', 'hourly', 'onsite',
  'Walsall Industrial Estate', 'WS2',
  52.600000, -1.980000,
  'https://uk.indeed.com/q-part-time-warehouse-l-walsall-jobs.html',
  'approved'
FROM companies c
WHERE c.company_name = 'Warehouse Nation';

INSERT INTO job_category_map (job_id, category_id)
VALUES (LAST_INSERT_ID(), 4); -- Warehouse

COMMIT;
Clear categories map 

START TRANSACTION;

DELETE FROM job_category_map;

COMMIT;
Re-Map Categories 

Map to Jobs with keywords (better improved) 

INSERT INTO job_category_map (job_id, category_id)
SELECT
  j.job_id,
  CASE
    -- WAREHOUSE
    WHEN j.title REGEXP '(Warehouse|Picker|Packer|Stockroom|Inventory)' THEN 4

    -- CARE (MUST come before Tech Support)
    WHEN j.title REGEXP '(Care|Support Worker|Healthcare)' THEN 5

    -- RETAIL
    WHEN j.title REGEXP '(Retail|Sales|Store|Customer Service)' THEN 1

    -- HOSPITALITY
    WHEN j.title REGEXP '(Barista|Cafe|Café|Waiting|Kitchen|Catering)' THEN 2

    -- EVENTS
    WHEN j.title REGEXP '(Event|Events|Steward|Crew|Conference)' THEN 6

    -- FITNESS
    WHEN j.title REGEXP '(Gym|Fitness|Receptionist|Personal Trainer)' THEN 13

    -- CLEANING
    WHEN j.title REGEXP '(Cleaner|Cleaning)' THEN 11

    -- TECH SUPPORT (AFTER Care & General Support)
    WHEN j.title REGEXP '(IT|Tech|Helpdesk|Lab|System)' THEN 7

    -- TUTORING
    WHEN j.title REGEXP '(Tutor|Tutoring|Teaching|SEND|Study)' THEN 8

    -- MARKETING
    WHEN j.title REGEXP '(Marketing|Content|Social|Media|Copy)' THEN 9

    -- SECURITY
    WHEN j.title REGEXP '(Security|Guard)' THEN 10

    -- FALLBACK
    ELSE 12
  END
FROM jobs j;

Suggestions: 
Remove apply by date –  
Extra jobs –
START TRANSACTION;

/* =====================================================
   ADDITIONAL REAL JOBS – NO DELETES, NO RESETS
   ===================================================== */

/* -------------------------
   WOLVERHAMPTON (campus_id = 1)
   ------------------------- */

-- Customer Service Assistant
INSERT INTO jobs (
company_id, campus_id, title, description, employment_type,
pay_min, pay_max, currency, pay_type, remote_type,
location_text, postcode, lat, lng, apply_url, status
)
SELECT c.company_id, 1,
'Customer Service Assistant',
'Handle customer enquiries, basic admin and in store support.',
'part-time', 11.50, 13.00, 'GBP', 'hourly', 'onsite',
'Wolverhampton Retail Park', 'WV10',
52.6150, -2.1050,
'https://uk.indeed.com/q-part-time-customer-service-l-wolverhampton-jobs.html',
'approved'
FROM companies c
WHERE c.company_name = 'Midlands Retail Group';

-- Evening Cleaner (Pending)
INSERT INTO jobs (
company_id, campus_id, title, description, employment_type,
pay_min, pay_max, currency, pay_type, remote_type,
location_text, postcode, lat, lng, apply_url, status
)
SELECT c.company_id, 1,
'Evening Cleaner (Pending)',
'Evening cleaning of student and office areas.',
'part-time', 10.50, 11.00, 'GBP', 'hourly', 'onsite',
'Wolverhampton Campus', 'WV1',
52.5870, -2.1280,
'https://uk.indeed.com/q-part-time-cleaner-l-wolverhampton-jobs.html',
'pending'
FROM companies c
WHERE c.company_name = 'City Bites Catering';

-- Events Assistant
INSERT INTO jobs (
company_id, campus_id, title, description, employment_type,
pay_min, pay_max, currency, pay_type, remote_type,
location_text, postcode, lat, lng, apply_url, status
)
SELECT c.company_id, 1,
'Events Assistant',
'Support open days and campus events, setup and guest support.',
'temporary', 11.50, 13.00, 'GBP', 'hourly', 'onsite',
'Wolverhampton City Campus', 'WV1',
52.5870, -2.1280,
'https://uk.indeed.com/q-part-time-events-l-wolverhampton-jobs.html',
'approved'
FROM companies c
WHERE c.company_name = 'EventCrew West Midlands';

/* -------------------------
   TELFORD (campus_id = 2)
   ------------------------- */

-- Stockroom Assistant
INSERT INTO jobs (
company_id, campus_id, title, description, employment_type,
pay_min, pay_max, currency, pay_type, remote_type,
location_text, postcode, lat, lng, apply_url, status
)
SELECT c.company_id, 2,
'Stockroom Assistant',
'Receive deliveries, organise stock, assist shop floor.',
'part-time', 11.00, 12.00, 'GBP', 'hourly', 'onsite',
'Telford Shopping Centre', 'TF3',
52.6784, -2.4453,
'https://uk.indeed.com/q-part-time-stockroom-l-telford-jobs.html',
'approved'
FROM companies c
WHERE c.company_name = 'Midlands Retail Group';

-- Gym Receptionist (Pending)
INSERT INTO jobs (
company_id, campus_id, title, description, employment_type,
pay_min, pay_max, currency, pay_type, remote_type,
location_text, postcode, lat, lng, apply_url, status
)
SELECT c.company_id, 2,
'Gym Receptionist (Pending)',
'Front desk support, membership enquiries and bookings.',
'part-time', 11.00, 12.50, 'GBP', 'hourly', 'onsite',
'Telford Fitness Centre', 'TF2',
52.6766, -2.4466,
'https://uk.indeed.com/q-part-time-gym-receptionist-l-telford-jobs.html',
'pending'
FROM companies c
WHERE c.company_name = 'FitWell Gyms';

/* -------------------------
   WALSALL (campus_id = 3)
   ------------------------- */

-- Waiting Staff
INSERT INTO jobs (
company_id, campus_id, title, description, employment_type,
pay_min, pay_max, currency, pay_type, remote_type,
location_text, postcode, lat, lng, apply_url, status
)
SELECT c.company_id, 3,
'Waiting Staff (Evenings)',
'Serve tables during evening service and weekends.',
'part-time', 10.50, 12.50, 'GBP', 'hourly', 'onsite',
'Walsall Town Centre', 'WS1',
52.5859, -1.9832,
'https://uk.indeed.com/q-part-time-waiting-staff-l-walsall-jobs.html',
'approved'
FROM companies c
WHERE c.company_name = 'City Bites Catering';

-- Care Support Worker
INSERT INTO jobs (
company_id, campus_id, title, description, employment_type,
pay_min, pay_max, currency, pay_type, remote_type,
location_text, postcode, lat, lng, apply_url, status
)
SELECT c.company_id, 3,
'Care Support Worker (Weekends)',
'Support clients with daily living tasks during weekends.',
'part-time', 12.50, 14.50, 'GBP', 'hourly', 'onsite',
'Walsall', 'WS1',
52.5853, -1.9840,
'https://uk.indeed.com/q-part-time-care-assistant-l-walsall-jobs.html',
'approved'
FROM companies c
WHERE c.company_name = 'CarePlus Support';

COMMIT;
Verify job matches all categories

SELECT
  j.job_id,
  j.title,
  jc.category_name
FROM jobs j
LEFT JOIN job_category_map m ON j.job_id = m.job_id
LEFT JOIN job_categories jc ON m.category_id = jc.category_id
ORDER BY j.job_id;
