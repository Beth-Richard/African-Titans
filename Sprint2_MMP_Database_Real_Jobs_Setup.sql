Inserting Real Jobs (MMP) Database Development. 

This file allows update of database for our MMP and testing for students. Please follow instructions to insert REAL jobs into the system correctly. 
If you have the previous files in the database, then please run this scripts below:

1.	Clears everything inserts real jobs and category’s 
2.	Run Script
3.	Re-Map job-to-Categories 
----------------------------------------------------------------------------------------------------------------------------------------------
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

START TRANSACTION;

INSERT INTO job_category_map (job_id, category_id)
SELECT
  j.job_id,
  CASE
    -- WAREHOUSE
    WHEN j.title LIKE '%Warehouse%' THEN 4

    -- RETAIL
    WHEN j.title LIKE '%Retail%' OR j.title LIKE '%Sales%' OR j.title LIKE '%Store%' THEN 1

    -- HOSPITALITY
    WHEN j.title LIKE '%Barista%' 
      OR j.title LIKE '%Café%' 
      OR j.title LIKE '%Front of House%' 
      OR j.title LIKE '%Waiting%' 
      OR j.title LIKE '%Kitchen%' THEN 2

    -- TECH SUPPORT
    WHEN j.title LIKE '%IT%' 
      OR j.title LIKE '%Tech%' 
      OR j.title LIKE '%Support%' 
      OR j.title LIKE '%Lab%' THEN 7

    -- TUTORING
    WHEN j.title LIKE '%Tutor%' 
      OR j.title LIKE '%Teaching%' 
      OR j.title LIKE '%SEND%' THEN 8

    -- CARE
    WHEN j.title LIKE '%Care%' 
      OR j.title LIKE '%Support Worker%' THEN 5

    -- EVENTS
    WHEN j.title LIKE '%Event%' 
      OR j.title LIKE '%Steward%' 
      OR j.title LIKE '%Crew%' THEN 6

    -- FITNESS
    WHEN j.title LIKE '%Gym%' 
      OR j.title LIKE '%Fitness%' 
      OR j.title LIKE '%Personal Trainer%' THEN 13

    -- CLEANING
    WHEN j.title LIKE '%Cleaner%' 
      OR j.title LIKE '%Cleaning%' THEN 11

    -- MARKETING
    WHEN j.title LIKE '%Marketing%' 
      OR j.title LIKE '%Content%' 
      OR j.title LIKE '%Copy%' 
      OR j.title LIKE '%Social%' THEN 9

    -- SECURITY
    WHEN j.title LIKE '%Security%' THEN 10

    -- CUSTOMER SERVICE (DEFAULT SAFE FALLBACK)
    ELSE 12
  END AS category_id
FROM jobs j;

COMMIT;
Map to Jobs with keywords 

START TRANSACTION;

INSERT INTO job_category_map (job_id, category_id)
SELECT
  j.job_id,
  CASE
    -- WAREHOUSE
    WHEN j.title LIKE '%Manufacturing%'
    OR j.title LIKE '%Warehouse%' THEN 4
    

    -- RETAIL
    WHEN j.title LIKE '%Retail%' 
    OR j.title LIKE '%Sales%' 
    OR j.title LIKE '%Store%' THEN 1

    -- HOSPITALITY
    WHEN j.title LIKE '%Barista%' 
      OR j.title LIKE '%Café%' 
      OR j.title LIKE '%Front of House%' 
      OR j.title LIKE '%Waiting%' 
      OR j.title LIKE '%Kitchen%' THEN 2

    -- TECH SUPPORT
    WHEN j.title LIKE '%IT%' 
      OR j.title LIKE '%Tech%' 
      OR j.title LIKE '%Support%' 
      OR j.title LIKE '%Lab%' THEN 7

    -- TUTORING
    WHEN j.title LIKE '%Tutor%' 
      OR j.title LIKE '%Teaching%' 
      OR j.title LIKE '%SEND%' THEN 8

    -- CARE
    WHEN j.title LIKE '%Care%' 
      OR j.title LIKE '%Support Worker%' THEN 5

    -- EVENTS
    WHEN j.title LIKE '%Event%' 
      OR j.title LIKE '%Steward%' 
      OR j.title LIKE '%Crew%' THEN 6

    -- FITNESS
    WHEN j.title LIKE '%Gym%' 
      OR j.title LIKE '%Fitness%' 
      OR j.title LIKE '%Personal Trainer%' THEN 13

    -- CLEANING
    WHEN j.title LIKE '%Cleaner%' 
      OR j.title LIKE '%Cleaning%' THEN 11

    -- MARKETING
    WHEN j.title LIKE '%Marketing%' 
      OR j.title LIKE '%Content%' 
      OR j.title LIKE '%Copy%' 
      OR j.title LIKE '%Social%' THEN 9

    -- SECURITY
    WHEN j.title LIKE '%Security%' THEN 10

    -- CUSTOMER SERVICE (DEFAULT SAFE FALLBACK)
    ELSE 12
  END AS category_id
FROM jobs j;

COMMIT;
Suggestions: 
Remove apply by date – 
