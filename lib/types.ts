export type Campus = "Wolverhampton" | "Telford" | "Walsall";

export interface Job {
  id: string;
  title: string;
  company: string;
  type: "Part-time" | "Full-time" | "Seasonal" | "Internship";
  campus: Campus;
  location: string;
  salary: string;
  description: string;
  fieldOfStudy: string;
  remote: boolean;
  deadline: string | null;
  postedDate: string;
  status: "approved" | "pending" | "rejected";
  applyUrl: string;
  categories?: string[];
}