
export interface Meeting {
  id: string;
  title: string;
  client_id: string;
  client_name: string;
  scheduled_by: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  attendees: string[];
  summary?: string;
  notes?: string;
  created_date: string;
}

export const mockMeetings: Meeting[] = [
  {
    id: "meeting_1",
    title: "Project Kickoff Meeting",
    client_id: "1",
    client_name: "John Smith",
    scheduled_by: "Manager",
    date: "2024-01-25",
    time: "10:00",
    duration: 60,
    status: "completed",
    attendees: ["john@ecommerce.com", "dev1@company.com", "designer1@company.com"],
    summary: "Discussed project requirements, timeline, and deliverables. Confirmed the technical stack and design preferences.",
    notes: "Client prefers modern UI/UX design. Deadline is flexible but prefers completion by end of Q2.",
    created_date: "2024-01-20"
  },
  {
    id: "meeting_2",
    title: "Sprint Review",
    client_id: "2",
    client_name: "Sarah Johnson",
    scheduled_by: "Manager",
    date: "2024-01-28",
    time: "14:00",
    duration: 45,
    status: "scheduled",
    attendees: ["sarah@banking.com", "dev2@company.com"],
    created_date: "2024-01-22"
  },
  {
    id: "meeting_3",
    title: "Feature Demo",
    client_id: "1",
    client_name: "John Smith",
    scheduled_by: "Manager",
    date: "2024-01-30",
    time: "11:00",
    duration: 30,
    status: "scheduled",
    attendees: ["john@ecommerce.com", "dev1@company.com"],
    created_date: "2024-01-23"
  }
];

export const mockTeamMembers = [
  { id: "dev1", name: "Alex Developer", email: "dev1@company.com", role: "Frontend Developer" },
  { id: "dev2", name: "Sam Backend", email: "dev2@company.com", role: "Backend Developer" },
  { id: "designer1", name: "Jordan Designer", email: "designer1@company.com", role: "UI/UX Designer" },
  { id: "qa1", name: "Taylor QA", email: "qa1@company.com", role: "QA Engineer" }
];
