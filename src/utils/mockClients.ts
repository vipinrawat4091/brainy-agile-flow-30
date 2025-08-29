export interface Client {
  id: string;
  full_name: string;
  email: string;
  company: string;
  phone?: string;
  project_name: string;
  project_status: 'active' | 'completed' | 'on_hold' | 'planning';
  contract_value: number;
  start_date: string;
  end_date?: string;
  project_manager: string;
  priority: 'high' | 'medium' | 'low';
  completion_percentage: number;
  last_contact: string;
  notes?: string;
}

export const mockClients: Client[] = [
  {
    id: "1",
    full_name: "John Smith",
    email: "john@ecommerce.com",
    company: "E-Commerce Solutions Inc",
    phone: "+1-555-0123",
    project_name: "Advanced E-commerce Platform",
    project_status: "active",
    contract_value: 150000,
    start_date: "2024-01-15",
    end_date: "2024-06-15",
    project_manager: "Sarah Johnson",
    priority: "high",
    completion_percentage: 65,
    last_contact: "2024-01-20",
    notes: "Client prefers weekly updates and modern UI design"
  },
  {
    id: "2",
    full_name: "Sarah Johnson",
    email: "sarah@banking.com",
    company: "SecureBank Corp",
    phone: "+1-555-0124",
    project_name: "Banking Security System",
    project_status: "active",
    contract_value: 200000,
    start_date: "2024-01-10",
    end_date: "2024-08-10",
    project_manager: "Michael Chen",
    priority: "high",
    completion_percentage: 45,
    last_contact: "2024-01-18",
    notes: "High security requirements, compliance focused"
  },
  {
    id: "3",
    full_name: "Michael Chen",
    email: "michael@healthtech.com",
    company: "HealthTech Innovations",
    phone: "+1-555-0125",
    project_name: "Patient Management System",
    project_status: "planning",
    contract_value: 120000,
    start_date: "2024-02-01",
    end_date: "2024-07-01",
    project_manager: "Emily Davis",
    priority: "medium",
    completion_percentage: 15,
    last_contact: "2024-01-22",
    notes: "HIPAA compliance required, integration with existing systems"
  },
  {
    id: "4",
    full_name: "Emily Davis",
    email: "emily@retailchain.com",
    company: "Global Retail Chain",
    phone: "+1-555-0126",
    project_name: "Inventory Management Portal",
    project_status: "active",
    contract_value: 90000,
    start_date: "2023-11-01",
    end_date: "2024-03-01",
    project_manager: "David Wilson",
    priority: "medium",
    completion_percentage: 85,
    last_contact: "2024-01-19",
    notes: "Multi-location support needed, real-time sync required"
  },
  {
    id: "5",
    full_name: "David Wilson",
    email: "david@financeapp.com",
    company: "FinanceApp Startup",
    phone: "+1-555-0127",
    project_name: "Personal Finance Tracker",
    project_status: "completed",
    contract_value: 75000,
    start_date: "2023-08-01",
    end_date: "2023-12-01",
    project_manager: "Lisa Anderson",
    priority: "low",
    completion_percentage: 100,
    last_contact: "2023-12-15",
    notes: "Successfully launched, ongoing maintenance contract"
  },
  {
    id: "6",
    full_name: "Lisa Anderson",
    email: "lisa@eduplatform.org",
    company: "EduPlatform Foundation",
    phone: "+1-555-0128",
    project_name: "Online Learning Platform",
    project_status: "on_hold",
    contract_value: 110000,
    start_date: "2023-12-01",
    project_manager: "Robert Brown",
    priority: "low",
    completion_percentage: 30,
    last_contact: "2024-01-10",
    notes: "Waiting for funding approval, project temporarily paused"
  }
];