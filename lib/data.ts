// Dummy data layer for MVP - easily replaceable with real DB queries
// Each export can be swapped to a database call when ready

export interface Job {
  id: string
  title: string
  company: string
  companyLogo?: string
  type: "Part-time" | "Full-time" | "Seasonal" | "Internship"
  campus: "Wolverhampton" | "Telford" | "Walsall"
  location: string
  salary: string
  description: string
  fieldOfStudy: string
  remote: boolean
  deadline: string
  postedDate: string
  status: "approved" | "pending" | "rejected"
  applyUrl: string
}

export interface Accommodation {
  id: string
  title: string
  type: "Student Hall" | "Private Rental" | "Shared House" | "Studio"
  campus: "Wolverhampton" | "Telford" | "Walsall"
  price: string
  address: string
  distance: string
  bedrooms: number
  available: boolean
  amenities: string[]
  description: string
  imageUrl: string
  contactEmail: string
  status: "approved" | "pending"
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  campus: "Wolverhampton" | "Telford" | "Walsall"
  location: string
  category: "Career" | "Social" | "Academic" | "Sport" | "Wellbeing"
  description: string
  organizer: string
  capacity: number
  registered: number
}

export interface Student {
  id: string
  name: string
  email: string
  course: string
  yearOfStudy: number
  campus: "Wolverhampton" | "Telford" | "Walsall"
  savedJobs: string[]
  applications: Application[]
}

export interface Application {
  id: string
  jobId: string
  studentId: string
  dateApplied: string
  status: "applied" | "reviewing" | "interview" | "rejected" | "accepted"
}

export interface Admin {
  id: string
  name: string
  email: string
  role: "super_admin" | "moderator"
}

// ─── DUMMY JOBS ────────────────────────────────────────────
export const jobs: Job[] = [
  {
    id: "j1",
    title: "Barista - Campus Coffee House",
    company: "Campus Brews Ltd",
    type: "Part-time",
    campus: "Wolverhampton",
    location: "Wolverhampton City Centre",
    salary: "£10.50/hr",
    description: "We're looking for a friendly and energetic barista to join our team at Campus Coffee House. You'll be preparing hot and cold beverages, serving customers, and maintaining a clean workspace. Flexible hours around your studies.",
    fieldOfStudy: "Any",
    remote: false,
    deadline: "2026-04-15",
    postedDate: "2026-02-20",
    status: "approved",
    applyUrl: "#",
  },
  {
    id: "j2",
    title: "IT Support Assistant",
    company: "University of Wolverhampton",
    type: "Part-time",
    campus: "Wolverhampton",
    location: "MI Building, Wolverhampton",
    salary: "£12.00/hr",
    description: "Provide first-line IT support to staff and students. Troubleshoot hardware and software issues, assist with AV equipment setup, and help maintain computer labs. Great opportunity for Computer Science students.",
    fieldOfStudy: "Computer Science",
    remote: false,
    deadline: "2026-03-30",
    postedDate: "2026-02-18",
    status: "approved",
    applyUrl: "#",
  },
  {
    id: "j3",
    title: "Social Media Coordinator",
    company: "WLV Students' Union",
    type: "Part-time",
    campus: "Wolverhampton",
    location: "Students' Union Building",
    salary: "£11.00/hr",
    description: "Help manage the Students' Union social media accounts. Create engaging content, schedule posts, and analyse engagement metrics. Perfect for Marketing or Media students looking for hands-on experience.",
    fieldOfStudy: "Marketing",
    remote: true,
    deadline: "2026-04-01",
    postedDate: "2026-02-15",
    status: "approved",
    applyUrl: "#",
  },
  {
    id: "j4",
    title: "Library Student Assistant",
    company: "University of Wolverhampton",
    type: "Part-time",
    campus: "Telford",
    location: "Telford Innovation Campus",
    salary: "£10.50/hr",
    description: "Assist library staff with shelving, customer service, and helping students locate resources. Evening and weekend shifts available. Training provided.",
    fieldOfStudy: "Any",
    remote: false,
    deadline: "2026-03-20",
    postedDate: "2026-02-10",
    status: "approved",
    applyUrl: "#",
  },
  {
    id: "j5",
    title: "Data Entry Clerk",
    company: "Black Country Housing Group",
    type: "Part-time",
    campus: "Walsall",
    location: "Walsall Town Centre",
    salary: "£11.50/hr",
    description: "Inputting and verifying housing data into our management system. Attention to detail is essential. Flexible hours, minimum 12 hours per week. Good for Business or Admin students.",
    fieldOfStudy: "Business",
    remote: true,
    deadline: "2026-04-10",
    postedDate: "2026-02-22",
    status: "approved",
    applyUrl: "#",
  },
  {
    id: "j6",
    title: "Retail Sales Associate",
    company: "The Mander Centre",
    type: "Part-time",
    campus: "Wolverhampton",
    location: "Mander Centre, Wolverhampton",
    salary: "£10.50/hr",
    description: "Join our retail team for the spring season. Customer-facing role with responsibilities including stock management, till operations, and visual merchandising. Weekend availability required.",
    fieldOfStudy: "Any",
    remote: false,
    deadline: "2026-03-25",
    postedDate: "2026-02-19",
    status: "approved",
    applyUrl: "#",
  },
  {
    id: "j7",
    title: "Summer Camp Instructor",
    company: "West Midlands Activity Centre",
    type: "Seasonal",
    campus: "Telford",
    location: "Telford Town Park",
    salary: "£12.50/hr",
    description: "Lead outdoor activities for young people during the summer holidays. DBS check required. Experience with children preferred but training provided. Full-time June to August.",
    fieldOfStudy: "Education",
    remote: false,
    deadline: "2026-05-01",
    postedDate: "2026-02-25",
    status: "approved",
    applyUrl: "#",
  },
  {
    id: "j8",
    title: "Graduate Marketing Intern",
    company: "Midlands Tech Solutions",
    type: "Internship",
    campus: "Wolverhampton",
    location: "Wolverhampton Science Park",
    salary: "£22,000/year",
    description: "6-month paid internship in digital marketing. You'll work on SEO, content strategy, and campaign management. Ideal for final-year Marketing or Business students.",
    fieldOfStudy: "Marketing",
    remote: false,
    deadline: "2026-04-20",
    postedDate: "2026-02-23",
    status: "approved",
    applyUrl: "#",
  },
  {
    id: "j9",
    title: "Warehouse Operative",
    company: "Amazon Fulfilment",
    type: "Full-time",
    campus: "Walsall",
    location: "Walsall Industrial Estate",
    salary: "£12.00/hr",
    description: "Full-time warehouse position. Pick, pack, and dispatch orders. Shift patterns available including nights. Physical role with training provided.",
    fieldOfStudy: "Any",
    remote: false,
    deadline: "2026-03-15",
    postedDate: "2026-02-12",
    status: "approved",
    applyUrl: "#",
  },
  {
    id: "j10",
    title: "Graphic Design Freelancer",
    company: "Creative Wolverhampton",
    type: "Part-time",
    campus: "Wolverhampton",
    location: "Remote / Wolverhampton",
    salary: "£15.00/hr",
    description: "Freelance graphic design work creating brand materials, social media graphics, and event posters for local businesses. Must have portfolio. Flexible hours and location.",
    fieldOfStudy: "Design",
    remote: true,
    deadline: "2026-04-30",
    postedDate: "2026-02-26",
    status: "approved",
    applyUrl: "#",
  },
  {
    id: "j11",
    title: "Pharmacy Assistant",
    company: "Boots UK",
    type: "Part-time",
    campus: "Wolverhampton",
    location: "Wolverhampton High Street",
    salary: "£10.50/hr",
    description: "Assist pharmacists with dispensing, stock management, and customer queries. Pharmacy or Health Science students preferred.",
    fieldOfStudy: "Health Science",
    remote: false,
    deadline: "2026-03-28",
    postedDate: "2026-02-14",
    status: "pending",
    applyUrl: "#",
  },
  {
    id: "j12",
    title: "Restaurant Server",
    company: "Bilash Restaurant",
    type: "Part-time",
    campus: "Wolverhampton",
    location: "Wolverhampton City Centre",
    salary: "£10.50/hr + tips",
    description: "Evening shifts available at this award-winning restaurant. Customer service experience preferred. Great tips and staff meals included.",
    fieldOfStudy: "Any",
    remote: false,
    deadline: "2026-04-05",
    postedDate: "2026-02-21",
    status: "pending",
    applyUrl: "#",
  },
]

// ─── DUMMY ACCOMMODATION ──────────────────────────────────
export const accommodations: Accommodation[] = [
  {
    id: "a1",
    title: "City Campus Halls",
    type: "Student Hall",
    campus: "Wolverhampton",
    price: "£130/week",
    address: "Stafford Street, Wolverhampton, WV1 1NA",
    distance: "2 min walk to campus",
    bedrooms: 1,
    available: true,
    amenities: ["WiFi", "En-suite", "Laundry", "Common Room", "24hr Security"],
    description: "Modern student halls right next to the city campus. All-inclusive bills with high-speed WiFi, en-suite bathrooms, and a shared kitchen. Perfect for first-year students.",
    imageUrl: "/images/halls-1.jpg",
    contactEmail: "accommodation@wlv.ac.uk",
    status: "approved",
  },
  {
    id: "a2",
    title: "Rosalind Franklin House",
    type: "Student Hall",
    campus: "Wolverhampton",
    price: "£145/week",
    address: "Molineux Street, Wolverhampton, WV1 4SB",
    distance: "5 min walk to campus",
    bedrooms: 1,
    available: true,
    amenities: ["WiFi", "En-suite", "Gym", "Study Room", "Bike Storage"],
    description: "Premium student accommodation with on-site gym and study spaces. Modern facilities with a vibrant community atmosphere. Bills included.",
    imageUrl: "/images/halls-2.jpg",
    contactEmail: "rfh@studentliving.co.uk",
    status: "approved",
  },
  {
    id: "a3",
    title: "3-Bed Shared House - Tettenhall Road",
    type: "Shared House",
    campus: "Wolverhampton",
    price: "£90/week per room",
    address: "Tettenhall Road, Wolverhampton, WV3 9NH",
    distance: "15 min bus ride to campus",
    bedrooms: 3,
    available: true,
    amenities: ["WiFi", "Garden", "Parking", "Washing Machine"],
    description: "Spacious 3-bedroom shared house in a quiet residential area. Recently refurbished with modern kitchen and bathroom. Close to local shops and bus routes.",
    imageUrl: "/images/house-1.jpg",
    contactEmail: "lettings@wolverhamptonproperty.co.uk",
    status: "approved",
  },
  {
    id: "a4",
    title: "Studio Flat - Chapel Ash",
    type: "Studio",
    campus: "Wolverhampton",
    price: "£550/month",
    address: "Chapel Ash, Wolverhampton, WV3 0TY",
    distance: "10 min walk to campus",
    bedrooms: 1,
    available: true,
    amenities: ["WiFi", "Kitchenette", "Furnished", "Central Heating"],
    description: "Self-contained studio flat ideal for postgraduate students. Fully furnished with a kitchenette and modern bathroom. Bills not included.",
    imageUrl: "/images/studio-1.jpg",
    contactEmail: "info@chapelashliving.co.uk",
    status: "approved",
  },
  {
    id: "a5",
    title: "Telford Campus Residence",
    type: "Student Hall",
    campus: "Telford",
    price: "£115/week",
    address: "Shifnal Road, Telford, TF2 9NT",
    distance: "On campus",
    bedrooms: 1,
    available: true,
    amenities: ["WiFi", "En-suite", "Laundry", "Parking"],
    description: "Purpose-built student accommodation on the Telford campus. Convenient location with all amenities included.",
    imageUrl: "/images/halls-3.jpg",
    contactEmail: "telford.accommodation@wlv.ac.uk",
    status: "approved",
  },
  {
    id: "a6",
    title: "2-Bed Flat - Walsall Centre",
    type: "Private Rental",
    campus: "Walsall",
    price: "£475/month",
    address: "Bradford Street, Walsall, WS1 1PN",
    distance: "8 min walk to campus",
    bedrooms: 2,
    available: false,
    amenities: ["WiFi", "Furnished", "Central Heating", "Parking"],
    description: "Two-bedroom flat in central Walsall, close to campus and town centre. Ideal for two students to share.",
    imageUrl: "/images/flat-1.jpg",
    contactEmail: "walsall.lets@property.co.uk",
    status: "approved",
  },
]

// ─── DUMMY EVENTS ─────────────────────────────────────────
export const events: Event[] = [
  {
    id: "e1",
    title: "Spring Career Fair 2026",
    date: "2026-03-15",
    time: "10:00 - 16:00",
    campus: "Wolverhampton",
    location: "The Arena, Wulfruna Street",
    category: "Career",
    description: "Meet over 50 employers from across the West Midlands. Bring your CV and dress smart-casual. Workshops on interview skills running throughout the day.",
    organizer: "Careers & Enterprise Team",
    capacity: 500,
    registered: 347,
  },
  {
    id: "e2",
    title: "Study Skills Workshop",
    date: "2026-03-08",
    time: "14:00 - 16:00",
    campus: "Wolverhampton",
    location: "Alan Turing Building, Room 204",
    category: "Academic",
    description: "Boost your academic writing and referencing skills. Open to all students. Covers Harvard referencing, essay structure, and critical analysis.",
    organizer: "Academic Skills Team",
    capacity: 40,
    registered: 28,
  },
  {
    id: "e3",
    title: "International Food Festival",
    date: "2026-03-20",
    time: "12:00 - 17:00",
    campus: "Wolverhampton",
    location: "Students' Union Courtyard",
    category: "Social",
    description: "Celebrate cultural diversity with food stalls from around the world. Live music, cooking demonstrations, and free samples. Everyone welcome!",
    organizer: "Students' Union",
    capacity: 300,
    registered: 189,
  },
  {
    id: "e4",
    title: "5-a-Side Football Tournament",
    date: "2026-03-22",
    time: "13:00 - 18:00",
    campus: "Walsall",
    location: "Walsall Campus Sports Hall",
    category: "Sport",
    description: "Register your team for the inter-campus 5-a-side tournament. Prizes for the winning team. All skill levels welcome.",
    organizer: "Sports & Wellbeing",
    capacity: 80,
    registered: 64,
  },
  {
    id: "e5",
    title: "Mindfulness & Meditation Session",
    date: "2026-03-10",
    time: "17:00 - 18:00",
    campus: "Telford",
    location: "Telford Campus, Wellbeing Centre",
    category: "Wellbeing",
    description: "Take a break from deadlines and enjoy a guided meditation session. No experience needed. Mats and cushions provided.",
    organizer: "Student Wellbeing Team",
    capacity: 25,
    registered: 18,
  },
  {
    id: "e6",
    title: "Tech Industry Panel Talk",
    date: "2026-03-28",
    time: "15:00 - 17:00",
    campus: "Wolverhampton",
    location: "MI Building, Lecture Theatre 1",
    category: "Career",
    description: "Hear from industry professionals at Capgemini, Accenture, and local startups about breaking into the tech industry. Q&A session included.",
    organizer: "School of Computing",
    capacity: 120,
    registered: 87,
  },
]

// ─── DUMMY STUDENT ────────────────────────────────────────
export const currentStudent: Student = {
  id: "s1",
  name: "Alex Johnson",
  email: "a.johnson@student.wlv.ac.uk",
  course: "BSc Computer Science",
  yearOfStudy: 2,
  campus: "Wolverhampton",
  savedJobs: ["j2", "j3", "j8"],
  applications: [
    {
      id: "app1",
      jobId: "j2",
      studentId: "s1",
      dateApplied: "2026-02-22",
      status: "reviewing",
    },
    {
      id: "app2",
      jobId: "j8",
      studentId: "s1",
      dateApplied: "2026-02-24",
      status: "applied",
    },
  ],
}

// ─── DUMMY ADMIN ──────────────────────────────────────────
export const currentAdmin: Admin = {
  id: "admin1",
  name: "Dr. Sarah Mitchell",
  email: "s.mitchell@wlv.ac.uk",
  role: "super_admin",
}

// ─── CHATBOT FAQ DATA ─────────────────────────────────────
export const chatbotFAQ = [
  {
    keywords: ["job", "jobs", "work", "employment", "part-time", "part time"],
    answer: "You can browse all available jobs on the Jobs page. Use filters to search by campus, job type, or field of study. Save jobs you're interested in by clicking the bookmark icon.",
  },
  {
    keywords: ["accommodation", "housing", "halls", "room", "rent", "live"],
    answer: "Check our Accommodation page for student halls, private rentals, and shared houses near all three campuses. Listings are verified by the university.",
  },
  {
    keywords: ["event", "events", "career fair", "workshop"],
    answer: "Visit the Events page to see upcoming events across all campuses. You can filter by category and campus. Register directly through the platform.",
  },
  {
    keywords: ["campus", "wolverhampton", "telford", "walsall"],
    answer: "The University of Wolverhampton has three main campuses: Wolverhampton City Campus, Telford Innovation Campus, and Walsall Campus. You can filter jobs and events by campus.",
  },
  {
    keywords: ["apply", "application", "how to apply"],
    answer: "To apply for a job, click on the listing to view details, then click the 'Apply Now' button. This will take you to the employer's application page. You can track your applications in your Profile.",
  },
  {
    keywords: ["save", "bookmark", "saved jobs"],
    answer: "You can save jobs by clicking the bookmark icon on any job listing. View all your saved jobs from your Profile page under the 'Saved Jobs' tab.",
  },
  {
    keywords: ["transport", "bus", "train", "travel"],
    answer: "Check travel times in job listings. Many jobs near campus are walkable. For transport info, visit the Transport for West Midlands website or the National Rail Enquiries site.",
  },
  {
    keywords: ["help", "support", "contact"],
    answer: "For technical support, email hub@wlv.ac.uk. For career advice, visit the Careers & Enterprise team in the MI Building. For wellbeing support, contact the Student Wellbeing team.",
  },
  {
    keywords: ["profile", "account", "settings"],
    answer: "Manage your profile from the Profile page. You can update your course details, work preferences, and skills. Your saved jobs and application history are also available there.",
  },
  {
    keywords: ["admin", "post job", "employer"],
    answer: "Employers can post jobs through the admin panel. All job postings require admin approval before going live to ensure quality and safety for students.",
  },
]

// ─── HELPER FUNCTIONS ─────────────────────────────────────
// These simulate DB queries and can be replaced with real ones

export function getApprovedJobs(): Job[] {
  return jobs.filter((j) => j.status === "approved")
}

export function getPendingJobs(): Job[] {
  return jobs.filter((j) => j.status === "pending")
}

export function getJobById(id: string): Job | undefined {
  return jobs.find((j) => j.id === id)
}

export function getApprovedAccommodations(): Accommodation[] {
  return accommodations.filter((a) => a.status === "approved")
}

export function getAccommodationById(id: string): Accommodation | undefined {
  return accommodations.find((a) => a.id === id)
}

export function getUpcomingEvents(): Event[] {
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id)
}

export function searchJobs(query: string, campus?: string, type?: string): Job[] {
  let filtered = getApprovedJobs()
  if (campus && campus !== "all") {
    filtered = filtered.filter((j) => j.campus === campus)
  }
  if (type && type !== "all") {
    filtered = filtered.filter((j) => j.type === type)
  }
  if (query) {
    const q = query.toLowerCase()
    filtered = filtered.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.fieldOfStudy.toLowerCase().includes(q)
    )
  }
  return filtered
}

export function getChatbotResponse(message: string): string {
  const lower = message.toLowerCase()
  for (const faq of chatbotFAQ) {
    if (faq.keywords.some((kw) => lower.includes(kw))) {
      return faq.answer
    }
  }
  return "I'm not sure about that. Try asking about jobs, accommodation, events, transport, or how to apply. You can also contact hub@wlv.ac.uk for direct support."
}
