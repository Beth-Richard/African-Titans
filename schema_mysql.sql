Create a database named student_campus_hub

then - 


CREATE TABLE users (
user_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
role ENUM('student','company','admin') NOT NULL,
name VARCHAR(150) NOT NULL,
email VARCHAR(255) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (user_id),
UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE companies (
company_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
user_id BIGINT UNSIGNED NOT NULL,
company_name VARCHAR(200) NOT NULL,
website VARCHAR(300),
verified_flag TINYINT(1) NOT NULL DEFAULT 0,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (company_id),
UNIQUE KEY uq_companies_user_id (user_id),
CONSTRAINT fk_companies_user
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE campuses (
campus_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
campus_name VARCHAR(100) NOT NULL,
city VARCHAR(100) NOT NULL,
postcode_prefix VARCHAR(20),
lat DECIMAL(9,6),
lng DECIMAL(9,6),
PRIMARY KEY (campus_id),
UNIQUE KEY uq_campuses_name (campus_name)
) ENGINE=InnoDB;

CREATE TABLE jobs (
job_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
company_id BIGINT UNSIGNED NOT NULL,
campus_id BIGINT UNSIGNED NOT NULL,

title VARCHAR(200) NOT NULL,
description TEXT NOT NULL,

employment_type ENUM('part-time','casual','internship','temporary','contract') NOT NULL,

pay_min DECIMAL(10,2),
pay_max DECIMAL(10,2),
currency CHAR(3) NOT NULL DEFAULT 'GBP',

pay_type ENUM('hourly','salary') NOT NULL,
remote_type ENUM('onsite','hybrid','remote') NOT NULL,

location_text VARCHAR(200),
postcode VARCHAR(20),
lat DECIMAL(9,6),
lng DECIMAL(9,6),

apply_url TEXT NOT NULL,

posted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
expires_at TIMESTAMP NULL,

status ENUM('draft','pending','approved','rejected','closed') NOT NULL DEFAULT 'pending',

PRIMARY KEY (job_id),

KEY idx_jobs_status_posted_at (status, posted_at),
KEY idx_jobs_campus (campus_id),
KEY idx_jobs_company (company_id),

CONSTRAINT fk_jobs_company
FOREIGN KEY (company_id) REFERENCES companies(company_id)
ON DELETE CASCADE,

CONSTRAINT fk_jobs_campus
FOREIGN KEY (campus_id) REFERENCES campuses(campus_id)
ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE saved_jobs (
user_id BIGINT UNSIGNED NOT NULL,
job_id BIGINT UNSIGNED NOT NULL,
saved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

PRIMARY KEY (user_id, job_id),
KEY idx_saved_jobs_user (user_id),

CONSTRAINT fk_saved_jobs_user
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE,

CONSTRAINT fk_saved_jobs_job
FOREIGN KEY (job_id) REFERENCES jobs(job_id)
ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE job_categories (
category_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
category_name VARCHAR(100) NOT NULL,
PRIMARY KEY (category_id),
UNIQUE KEY uq_job_categories_name (category_name)
) ENGINE=InnoDB;

CREATE TABLE job_category_map (
job_id BIGINT UNSIGNED NOT NULL,
category_id BIGINT UNSIGNED NOT NULL,

PRIMARY KEY (job_id, category_id),
KEY idx_job_category_map_category (category_id, job_id),

CONSTRAINT fk_job_category_map_job
FOREIGN KEY (job_id) REFERENCES jobs(job_id)
ON DELETE CASCADE,

CONSTRAINT fk_job_category_map_category
FOREIGN KEY (category_id) REFERENCES job_categories(category_id)
ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE job_moderation (
moderation_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
job_id BIGINT UNSIGNED NOT NULL,
admin_user_id BIGINT UNSIGNED NOT NULL,
decision ENUM('approved','rejected') NOT NULL,
reason TEXT,
decided_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

PRIMARY KEY (moderation_id),

CONSTRAINT fk_job_moderation_job
FOREIGN KEY (job_id) REFERENCES jobs(job_id)
ON DELETE CASCADE,

CONSTRAINT fk_job_moderation_admin
FOREIGN KEY (admin_user_id) REFERENCES users(user_id)
ON DELETE RESTRICT
) ENGINE=InnoDB;