
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Ticket, 
  User, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare,
  Search,
  Filter,
  Eye,
  Edit
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  category: string;
  clientName: string;
  clientEmail: string;
  assignedTo: string;
  createdDate: string;
  lastUpdate: string;
  responses: Array<{
    id: string;
    author: string;
    message: string;
    timestamp: string;
    type: "client" | "support";
  }>;
}

export default function ClientTickets() {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [responseMessage, setResponseMessage] = useState("");
  const { toast } = useToast();

  const mockTickets: SupportTicket[] = [
    {
      id: "TICK-001",
      title: "Login Authentication Issue",
      description: "Unable to login with correct credentials. Getting 'Invalid password' error even with the right password.",
      status: "open",
      priority: "high",
      category: "Technical Issue",
      clientName: "John Smith",
      clientEmail: "john@ecommerce.com",
      assignedTo: "Sarah Johnson",
      createdDate: "2024-01-20",
      lastUpdate: "2024-01-20",
      responses: [
        {
          id: "1",
          author: "John Smith",
          message: "I've tried resetting my password multiple times but still can't access my account.",
          timestamp: "2024-01-20 09:30",
          type: "client"
        }
      ]
    },
    {
      id: "TICK-002",
      title: "Feature Request: Dark Mode",
      description: "Would like to have a dark mode option for better user experience during night hours.",
      status: "in-progress",
      priority: "medium",
      category: "Feature Request",
      clientName: "Sarah Johnson",
      clientEmail: "sarah@banking.com",
      assignedTo: "Michael Chen",
      createdDate: "2024-01-18",
      lastUpdate: "2024-01-19",
      responses: [
        {
          id: "1",
          author: "Sarah Johnson",
          message: "This would be a great addition to improve accessibility.",
          timestamp: "2024-01-18 14:20",
          type: "client"
        },
        {
          id: "2",
          author: "Michael Chen",
          message: "We're currently working on implementing dark mode. Expected completion in 2 weeks.",
          timestamp: "2024-01-19 10:15",
          type: "support"
        }
      ]
    },
    {
      id: "TICK-003",
      title: "Performance Issue with Dashboard",
      description: "Dashboard takes too long to load, especially the analytics section. Page becomes unresponsive sometimes.",
      status: "resolved",
      priority: "high",
      category: "Performance Issue",
      clientName: "Michael Chen",
      clientEmail: "michael@healthtech.com",
      assignedTo: "Emily Davis",
      createdDate: "2024-01-15",
      lastUpdate: "2024-01-17",
      responses: [
        {
          id: "1",
          author: "Michael Chen",
          message: "The dashboard becomes completely unresponsive after 30 seconds of loading.",
          timestamp: "2024-01-15 11:45",
          type: "client"
        },
        {
          id: "2",
          author: "Emily Davis",
          message: "We've identified the issue and optimized the queries. Please try again.",
          timestamp: "2024-01-17 16:30",
          type: "support"
        },
        {
          id: "3",
          author: "Michael Chen",
          message: "Much better now! Dashboard loads quickly. Thank you!",
          timestamp: "2024-01-17 17:45",
          type: "client"
        }
      ]
    },
    {
      id: "TICK-004",
      title: "UI/UX Feedback",
      description: "The navigation menu is confusing. Would like to suggest some improvements to make it more intuitive.",
      status: "open",
      priority: "low",
      category: "UI/UX Feedback",
      clientName: "Emily Davis",
      clientEmail: "emily@retailchain.com",
      assignedTo: "David Wilson",
      createdDate: "2024-01-19",
      lastUpdate: "2024-01-19",
      responses: [
        {
          id: "1",
          author: "Emily Davis",
          message: "I've attached some mockups with suggested improvements to the navigation structure.",
          timestamp: "2024-01-19 13:20",
          type: "client"
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-500';
      case 'in-progress': return 'bg-orange-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <Ticket className="w-4 h-4" />;
    }
  };

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsViewModalOpen(true);
  };

  const handleSendResponse = () => {
    if (!responseMessage.trim() || !selectedTicket) return;

    // Simulate sending response
    toast({
      title: "Response Sent Successfully!",
      description: `Your response has been sent to ${selectedTicket.clientName}`,
    });

    setResponseMessage("");
    setIsViewModalOpen(false);
  };

  const handleUpdateStatus = (newStatus: string) => {
    if (!selectedTicket) return;

    toast({
      title: "Ticket Status Updated",
      description: `Ticket ${selectedTicket.id} status changed to ${newStatus.toUpperCase()}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <style>{`
        .neo-button {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 10px 10px 0px #000000 !important;
        }
        
        .neo-card {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="neo-card bg-white p-6">
          <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">
            CLIENT SUPPORT TICKETS
          </h1>
          <p className="text-gray-600 font-bold">Manage and respond to all client support requests and tickets</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="neo-card bg-red-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-red-600 mb-2">
                {mockTickets.filter(t => t.status === 'open').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">OPEN TICKETS</div>
            </CardContent>
          </Card>
          <Card className="neo-card bg-orange-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-orange-600 mb-2">
                {mockTickets.filter(t => t.status === 'in-progress').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">IN PROGRESS</div>
            </CardContent>
          </Card>
          <Card className="neo-card bg-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-green-600 mb-2">
                {mockTickets.filter(t => t.status === 'resolved').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">RESOLVED</div>
            </CardContent>
          </Card>
          <Card className="neo-card bg-gray-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-gray-600 mb-2">
                {mockTickets.filter(t => t.priority === 'high').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">HIGH PRIORITY</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="neo-card bg-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 neo-card border-3 border-black font-bold"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="neo-card border-3 border-black font-bold">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="neo-card border-3 border-black font-bold">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                className="neo-button bg-blue-500 hover:bg-blue-600 text-white font-black uppercase"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setPriorityFilter("all");
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                CLEAR FILTERS
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="neo-card bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-black text-gray-900 uppercase">{ticket.title}</h3>
                      <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] ${getStatusColor(ticket.status)} text-white flex items-center gap-1`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status.toUpperCase()}
                      </Badge>
                      <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] ${getPriorityColor(ticket.priority)} text-white`}>
                        {ticket.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-gray-700 mb-3">{ticket.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>CLIENT: {ticket.clientName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>CREATED: {ticket.createdDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>UPDATED: {ticket.lastUpdate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>RESPONSES: {ticket.responses.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleViewTicket(ticket)}
                      className="neo-button bg-blue-500 hover:bg-blue-600 text-white font-black uppercase"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      VIEW
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <Card className="neo-card bg-white">
            <CardContent className="p-12 text-center">
              <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-600 uppercase mb-2">NO TICKETS FOUND</h3>
              <p className="text-gray-500 font-bold">No tickets match your current filters.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Ticket Detail Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto neo-card bg-white">
          <DialogHeader className="border-b-4 border-black pb-4">
            <DialogTitle className="text-2xl font-black uppercase text-gray-900 flex items-center gap-3">
              <Ticket className="w-8 h-8 text-blue-600" />
              {selectedTicket?.title}
            </DialogTitle>
            <div className="flex gap-3 mt-4">
              <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] ${selectedTicket ? getStatusColor(selectedTicket.status) : 'bg-gray-500'} text-white`}>
                {selectedTicket?.status.toUpperCase()}
              </Badge>
              <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] ${selectedTicket ? getPriorityColor(selectedTicket.priority) : 'bg-gray-500'} text-white`}>
                {selectedTicket?.priority.toUpperCase()}
              </Badge>
              <Badge className="font-black border-2 border-black shadow-[2px_2px_0px_#000] bg-purple-500 text-white">
                {selectedTicket?.category.toUpperCase()}
              </Badge>
            </div>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-6 p-6">
              {/* Ticket Details */}
              <div className="neo-card bg-gray-50 p-4">
                <h3 className="font-black text-gray-900 uppercase mb-2">TICKET DETAILS</h3>
                <p className="text-gray-700 font-bold mb-4">{selectedTicket.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm font-bold text-gray-600">
                  <div>
                    <span className="text-gray-900">CLIENT:</span> {selectedTicket.clientName}
                  </div>
                  <div>
                    <span className="text-gray-900">EMAIL:</span> {selectedTicket.clientEmail}
                  </div>
                  <div>
                    <span className="text-gray-900">ASSIGNED TO:</span> {selectedTicket.assignedTo}
                  </div>
                  <div>
                    <span className="text-gray-900">TICKET ID:</span> {selectedTicket.id}
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div className="neo-card bg-white p-4">
                <h3 className="font-black text-gray-900 uppercase mb-4">UPDATE STATUS</h3>
                <div className="flex gap-2">
                  <Select onValueChange={handleUpdateStatus}>
                    <SelectTrigger className="neo-card border-3 border-black font-bold">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Conversation History */}
              <div className="neo-card bg-white p-4">
                <h3 className="font-black text-gray-900 uppercase mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  CONVERSATION HISTORY
                </h3>
                
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {selectedTicket.responses.map((response) => (
                    <div key={response.id} className={`flex ${response.type === 'client' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-md neo-card p-3 ${
                        response.type === 'client' 
                          ? 'bg-gray-100 text-gray-900' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4" />
                          <span className="text-xs font-black uppercase">{response.author}</span>
                        </div>
                        <p className="text-sm font-bold">{response.message}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs font-bold opacity-70 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {response.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Send Response */}
                <div className="border-t-4 border-black pt-4">
                  <div className="flex gap-3">
                    <Textarea
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      placeholder="Type your response to the client..."
                      className="flex-1 neo-card border-3 border-black font-bold resize-none"
                      rows={3}
                    />
                    <Button
                      onClick={handleSendResponse}
                      className="neo-button bg-green-500 hover:bg-green-600 text-white font-black uppercase px-6 self-end"
                    >
                      <MessageSquare className="w-5 h-5 mr-1" />
                      SEND
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
