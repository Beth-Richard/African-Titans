You can change the numbers as needed. Depending on the Stack, id recommend PHP, unless developer can get everyone up to date with Typescript loading and deploying. ( i have a ready working listing, search and crud app we can use) 

This will be secured as prepared statments later on.
---

# ✅ Q1) Student Jobs Listing (approved + not expired) - working 

```sql
SELECT 
 j.job_id, 
 j.title, 
 c.company_name, 
 ca.campus_name, 
 j.employment_type, 
 j.remote_type, 
 COALESCE(j.location_text, 'Remote') AS location, 
 j.pay_min, 
 j.pay_max, 
 j.pay_type, 
 j.currency, 
 j.posted_at, 
 j.expires_at, 
 j.apply_url 
FROM jobs j 
JOIN companies c ON c.company_id = j.company_id 
JOIN campuses ca ON ca.campus_id = j.campus_id 
WHERE j.status = 'approved' 
 AND (j.expires_at IS NULL OR j.expires_at >= NOW()) 
ORDER BY j.posted_at DESC;
```

---

# ✅ Q2) Student Filter by Campus - working

(Example campus_id = 1)

```sql
SELECT 
 j.job_id, 
 j.title, 
 c.company_name, 
 ca.campus_name, 
 j.remote_type, 
 COALESCE(j.location_text, 'Remote') AS location, 
 j.pay_min, 
 j.pay_max, 
 j.pay_type, 
 j.posted_at 
FROM jobs j 
JOIN companies c ON c.company_id = j.company_id 
JOIN campuses ca ON ca.campus_id = j.campus_id 
WHERE j.status = 'approved' 
 AND (j.expires_at IS NULL OR j.expires_at >= NOW()) 
 AND j.campus_id = 1
ORDER BY j.posted_at DESC;
```

---

# ✅ Q3) Student Filter by Employment Type - working 

```sql
SELECT 
 j.job_id, 
 j.title, 
 c.company_name, 
 ca.campus_name, 
 j.employment_type, 
 j.remote_type, 
 j.posted_at 
FROM jobs j 
JOIN companies c ON c.company_id = j.company_id 
JOIN campuses ca ON ca.campus_id = j.campus_id 
WHERE j.status = 'approved' 
 AND (j.expires_at IS NULL OR j.expires_at >= NOW()) 
 AND j.employment_type = 'part-time'
ORDER BY j.posted_at DESC;
```

---

# ✅ Q4) Student Keyword Search - working 

(Example keyword = "marketing")

```sql
SELECT 
 j.job_id, 
 j.title, 
 c.company_name, 
 ca.campus_name, 
 j.posted_at 
FROM jobs j 
JOIN companies c ON c.company_id = j.company_id 
JOIN campuses ca ON ca.campus_id = j.campus_id 
WHERE j.status = 'approved' 
 AND (j.expires_at IS NULL OR j.expires_at >= NOW()) 
 AND (
   j.title LIKE '%marketing%' 
   OR j.description LIKE '%marketing%'
 )
ORDER BY j.posted_at DESC;
```

---

# ✅ Q5) Job Detail View - working 

(Example job_id = 1)

```sql
SELECT 
 j.*, 
 c.company_name, 
 c.website, 
 ca.campus_name 
FROM jobs j 
JOIN companies c ON c.company_id = j.company_id 
JOIN campuses ca ON ca.campus_id = j.campus_id 
WHERE j.job_id = 1;
```

---

# ✅ Q6) Admin Pending Jobs - working

```sql
SELECT 
 j.job_id, 
 j.title, 
 c.company_name, 
 ca.campus_name, 
 j.employment_type, 
 j.remote_type, 
 j.posted_at 
FROM jobs j 
JOIN companies c ON c.company_id = j.company_id 
JOIN campuses ca ON ca.campus_id = j.campus_id 
WHERE j.status = 'pending' 
ORDER BY j.posted_at DESC;
```

---

# ✅ Q7) Admin Approve Job - not working 

(Example job_id = 1)

```sql
UPDATE jobs 
SET status = 'approved' 
WHERE job_id = 1;

INSERT INTO job_moderation (job_id, admin_user_id, decision, reason) 
VALUES (10, 1, 'approved', 'Approved for student visibility.');
```

---

# ✅ Q8) Admin Reject Job - not working

(Example job_id = 10)

```sql
UPDATE jobs 
SET status = 'rejected' 
WHERE job_id = 1;

INSERT INTO job_moderation (job_id, admin_user_id, decision, reason) 
VALUES (10, 1, 'rejected', 'Rejected: listing missing key details.');
```

---

# ✅ Q9) Moderation Log - not working

```sql
SELECT 
 moderation_id, 
 job_id, 
 admin_user_id, 
 decision, 
 reason, 
 decided_at 
FROM job_moderation 
ORDER BY decided_at DESC;
```

---

# ✅ Q10) Save a Job

(Example user_id = 5, job_id = 10)

```sql
INSERT INTO saved_jobs (user_id, job_id) 
VALUES (2, 2);
```

---

# ✅ Q11) Unsave a Job

```sql
DELETE FROM saved_jobs 
WHERE user_id = 5 AND job_id = 10;
```

---

# ✅ Q12) Student Saved Jobs List

(Example user_id = 5)

```sql
SELECT 
 j.job_id, 
 j.title, 
 c.company_name, 
 ca.campus_name, 
 j.remote_type, 
 COALESCE(j.location_text, 'Remote') AS location, 
 sj.saved_at 
FROM saved_jobs sj 
JOIN jobs j ON j.job_id = sj.job_id 
JOIN companies c ON c.company_id = j.company_id 
JOIN campuses ca ON ca.campus_id = j.campus_id 
WHERE sj.user_id = 5
ORDER BY sj.saved_at DESC;
```

---

# ✅ Q13) Filter by Category

(Example category_id = 2)

```sql
SELECT 
 j.job_id, 
 j.title, 
 c.company_name, 
 ca.campus_name, 
 j.posted_at 
FROM jobs j 
JOIN job_category_map m ON m.job_id = j.job_id 
JOIN companies c ON c.company_id = j.company_id 
JOIN campuses ca ON ca.campus_id = j.campus_id 
WHERE j.status = 'approved' 
 AND (j.expires_at IS NULL OR j.expires_at >= NOW()) 
 AND m.category_id = 2
ORDER BY j.posted_at DESC;
```

---


