USE student_campus_hub;

-- Campuses
INSERT INTO campuses (campus_name, city, postcode_prefix, lat, lng) VALUES
('Wolverhampton', 'Wolverhampton', 'WV', 52.5862, -2.1286),
('Telford', 'Telford', 'TF', 52.6784, -2.4453),
('Walsall', 'Walsall', 'WS', 52.5862, -1.9829);

-- Users: 1 admin, 3 students, 3 company owners
INSERT INTO users (role, name, email) VALUES
('admin', 'Admin User', 'admin@wlv.example'),
('student', 'Nico Bowen', 'nico@student.example'),
('student', 'Aisha Khan', 'aisha@student.example'),
('student', 'Tom Williams', 'tom@student.example'),
('company', 'Sarah Patel', 'sarah@company.example'),
('company', 'Mark Evans', 'mark@company.example'),
('company', 'Helen Roberts','helen@company.example');

-- Companies (owned by the 3 company users above)
INSERT INTO companies (user_id, company_name, website, verified_flag) VALUES
(5, 'Wolves Coffee Co.', 'https://example.com/wolvescoffee', 1),
(6, 'Midlands Retail Group', 'https://example.com/midlandsretail', 1),
(7, 'Telford Logistics Ltd', 'https://example.com/telfordlogistics', 0);

-- Categories
INSERT INTO job_categories (category_name) VALUES
('Retail'),
('Hospitality'),
('Admin'),
('Warehouse'),
('Care'),
('Events'),
('Tech Support'),
('Tutoring');

-- Jobs
INSERT INTO jobs
(company_id, campus_id, title, description, employment_type, pay_min, pay_max, currency, pay_type, remote_type,
location_text, postcode, lat, lng, apply_url, expires_at, status)
VALUES
(1, 1, 'Barista (Part-time)', 'Serve customers, prepare drinks, maintain cleanliness. Student-friendly shifts.',
'part-time', 10.50, 12.00, 'GBP', 'hourly', 'onsite',
'Wolverhampton City Centre', 'WV1 1AA', 52.5865, -2.1290,
'https://example.com/apply/barista', DATE_ADD(NOW(), INTERVAL 21 DAY), 'approved'),

(2, 3, 'Retail Assistant (Weekend)', 'Stock shelves, assist customers, operate tills. Weekend shifts available.',
'part-time', 10.00, 11.50, 'GBP', 'hourly', 'onsite',
'Walsall Town Centre', 'WS1 1AB', 52.5859, -1.9832,
'https://example.com/apply/retail-assistant', DATE_ADD(NOW(), INTERVAL 14 DAY), 'approved'),

(3, 2, 'Warehouse Picker/Packer', 'Pick and pack orders, light lifting, training provided.',
'temporary', 11.00, 13.50, 'GBP', 'hourly', 'onsite',
'Telford Industrial Estate', 'TF3 3AA', 52.6769, -2.4480,
'https://example.com/apply/warehouse', DATE_ADD(NOW(), INTERVAL 30 DAY), 'pending'),

(2, 1, 'Student Admin Assistant', 'Help with data entry, emails, scheduling. Good for business students.',
'part-time', 11.50, 12.50, 'GBP', 'hourly', 'hybrid',
'University of Wolverhampton – City Campus', 'WV1 1LY', 52.5870, -2.1280,
'https://example.com/apply/admin-assistant', DATE_ADD(NOW(), INTERVAL 28 DAY), 'pending'),

(1, 1, 'Social Media Assistant (Remote)', 'Create simple posts, schedule content, track engagement. Remote work.',
'internship', NULL, NULL, 'GBP', 'salary', 'remote',
NULL, NULL, NULL, NULL,
'https://example.com/apply/social-remote', DATE_ADD(NOW(), INTERVAL 45 DAY), 'approved');

-- Category mapping (job_id assumed 1..5)
INSERT INTO job_category_map (job_id, category_id) VALUES
(1, 2),
(2, 1),
(3, 4),
(4, 3),
(5, 7);

-- Saved jobs (students are user_id 2,3,4)
INSERT INTO saved_jobs (user_id, job_id) VALUES
(2, 1),
(2, 2),
(3, 1);

-- Moderation (admin is user_id 1)
INSERT INTO job_moderation (job_id, admin_user_id, decision, reason) VALUES
(1, 1, 'approved', 'Meets listing requirements.'),
(2, 1, 'approved', 'Verified company and clear job details.');