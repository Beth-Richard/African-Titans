Live Student Campus Hub – Security Framework (MVP)

Security Consultant: Wasiu Oladele
Project: Live Student Campus Hub
Institution: University of Wolverhampton
Sprint: MVP – Sprint 1

⸻

1. Security Philosophy

Security is treated as a core requirement of the Live Student Campus Hub. Given that the platform handles student accounts, job data, accommodation listings, transport APIs, and personal preferences, data protection and system integrity are critical.

The system will follow a security-by-design approach from the beginning of development.

⸻

2. Key Security Assets

The following assets require protection:
	•	Student profiles (StudentID, name, email)
	•	Authentication credentials (University SSO + JWT tokens)
	•	Saved jobs and accommodation data
	•	User preferences and activity history
	•	Event registrations
	•	API keys (Transport for West Midlands, National Rail, Google Maps)
	•	Cloud infrastructure (AWS environment)
	•	Database contents (MongoDB + PostgreSQL)

⸻

3. Identified Threats

Potential threats include:
	•	Unauthorized access to student accounts
	•	JWT token hijacking
	•	SQL Injection (PostgreSQL)
	•	NoSQL injection (MongoDB)
	•	Cross-Site Scripting (XSS)
	•	API key exposure
	•	Fake job or accommodation listings
	•	Data breaches
	•	GDPR non-compliance
	•	Privilege escalation (student accessing admin features)

⸻

4. Authentication & Session Security

The system will integrate:
	•	University SSO authentication
	•	JWT-based session management

Security controls:
	•	JWT tokens must expire after defined time
	•	Refresh tokens must be securely stored
	•	HTTPS must be enforced
	•	Passwords (if locally stored) must be hashed using bcrypt
	•	Multi-factor authentication considered for admin accounts

⸻

5. Role-Based Access Control (RBAC)

Defined roles:

Student
	•	View jobs, accommodation, transport, events
	•	Save listings
	•	Manage profile

Admin
	•	Approve job postings
	•	Approve accommodation listings
	•	Moderate content
	•	Manage system configuration

All authorization checks must occur server-side.

⸻

6. API & Integration Security

External APIs include:
	•	Transport for West Midlands
	•	National Rail
	•	Google Maps
	•	University systems

Security controls:
	•	API keys stored in environment variables
	•	No API keys exposed in frontend code
	•	Rate limiting implemented
	•	Input validation on all external data
	•	Error handling without exposing sensitive details

⸻

7. Database Security

MongoDB + PostgreSQL must implement:
	•	Prepared statements (PostgreSQL)
	•	Input validation (MongoDB)
	•	Encrypted connections
	•	Role-based database access
	•	Regular backups
	•	Audit logs for sensitive operations

⸻

8. GDPR & Data Privacy

As this system operates in the UK, GDPR compliance is mandatory.

Measures include:
	•	Minimal data collection
	•	Clear privacy policy
	•	User data deletion request process
	•	Secure storage of personal data
	•	Encryption at rest and in transit

⸻

9. Cloud & Infrastructure Security (AWS)
	•	Use IAM roles with least privilege principle
	•	Enable firewall/security groups
	•	Enable logging and monitoring
	•	Automatic backups
	•	Secure environment variable storage

⸻

10. Security Review Requirement

All new features must undergo a security review before deployment.

Add comprehensive security framework aligned with MVP architecture
