
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Clock, MessageSquare, Phone, Mail } from "lucide-react";
import TicketCreationForm from "@/components/client/TicketCreationForm";

export default function ClientSupport() {
  const [supportTickets, setSupportTickets] = useState([
    {
      id: "TICK-001",
      title: "Login Issues on Mobile Device",
      description: "Unable to log in using Safari on iPhone. Getting authentication error.",
      status: "open",
      priority: "high",
      createdDate: "2024-02-20",
      lastUpdate: "2024-02-21",
      assignedTo: "Technical Support",
      category: "Technical"
    },
    {
      id: "TICK-002",
      title: "Feature Request: Export to CSV",
      description: "Would like to export project reports in CSV format for external analysis.",
      status: "in-progress",
      priority: "medium",
      createdDate: "2024-02-18",
      lastUpdate: "2024-02-22",
      assignedTo: "Development Team",
      category: "Feature Request"
    },
    {
      id: "TICK-003",
      title: "Dashboard Loading Slowly",
      description: "The main dashboard takes more than 10 seconds to load all charts and data.",
      status: "resolved",
      priority: "medium",
      createdDate: "2024-02-15",
      lastUpdate: "2024-02-19",
      assignedTo: "Technical Support",
      category: "Performance"
    },
    {
      id: "TICK-004",
      title: "Question About Project Timeline",
      description: "Need clarification on the delivery dates for Phase 2 features.",
      status: "resolved",
      priority: "low",
      createdDate: "2024-02-12",
      lastUpdate: "2024-02-14",
      assignedTo: "Project Manager",
      category: "General"
    }
  ]);

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email."
    },
    {
      question: "How often is the project status updated?",
      answer: "Project status is updated in real-time as tasks are completed. Major milestone updates are communicated weekly via email."
    },
    {
      question: "Can I request changes to the project scope?",
      answer: "Yes, you can request scope changes through the support system. All changes will be reviewed and may affect timeline and budget."
    },
    {
      question: "How do I access project documentation?",
      answer: "All project documentation is available in the 'Documents' section of your client portal. You can view and download files there."
    }
  ];

  const handleTicketCreated = (newTicket: any) => {
    setSupportTickets([newTicket, ...supportTickets]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-500';
      case 'in-progress': return 'bg-orange-500';
      case 'resolved': return 'bg-green-500';
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
            SUPPORT CENTER
          </h1>
          <p className="text-gray-600 font-bold">Get help and support for your project</p>
        </div>

        {/* Support Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="neo-card bg-red-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-red-600 mb-2">
                {supportTickets.filter(t => t.status === 'open').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">OPEN TICKETS</div>
            </CardContent>
          </Card>
          <Card className="neo-card bg-orange-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-orange-600 mb-2">
                {supportTickets.filter(t => t.status === 'in-progress').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">IN PROGRESS</div>
            </CardContent>
          </Card>
          <Card className="neo-card bg-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-green-600 mb-2">
                {supportTickets.filter(t => t.status === 'resolved').length}
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase">RESOLVED</div>
            </CardContent>
          </Card>
          <Card className="neo-card bg-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">24h</div>
              <div className="text-sm font-bold text-gray-700 uppercase">AVG RESPONSE</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ticket Creation Form */}
          <TicketCreationForm onTicketCreated={handleTicketCreated} />

          {/* Contact Information */}
          <Card className="neo-card bg-white">
            <CardHeader className="border-b-4 border-black">
              <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                CONTACT INFORMATION
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="neo-card bg-blue-50 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h3 className="font-black text-gray-900 uppercase">EMAIL SUPPORT</h3>
                </div>
                <p className="text-sm font-bold text-gray-700">support@yourproject.com</p>
                <p className="text-xs font-bold text-gray-600">Response within 24 hours</p>
              </div>
              
              <div className="neo-card bg-green-50 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <h3 className="font-black text-gray-900 uppercase">PHONE SUPPORT</h3>
                </div>
                <p className="text-sm font-bold text-gray-700">+1 (555) 123-4567</p>
                <p className="text-xs font-bold text-gray-600">Mon-Fri, 9 AM - 6 PM EST</p>
              </div>

              <div className="neo-card bg-purple-50 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <h3 className="font-black text-gray-900 uppercase">LIVE CHAT</h3>
                </div>
                <p className="text-sm font-bold text-gray-700">Available in Messages section</p>
                <p className="text-xs font-bold text-gray-600">Real-time support during business hours</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Tickets */}
        <Card className="neo-card bg-white">
          <CardHeader className="border-b-4 border-black">
            <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-purple-600" />
              MY SUPPORT TICKETS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="neo-card bg-gray-50 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-black text-gray-900 uppercase">{ticket.title}</h3>
                        <Badge className="font-black border-2 border-black shadow-[2px_2px_0px_#000] bg-gray-600 text-white text-xs">
                          {ticket.id}
                        </Badge>
                      </div>
                      <p className="text-sm font-bold text-gray-700 mb-2">{ticket.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] ${getStatusColor(ticket.status)} text-white text-xs`}>
                        {ticket.status.toUpperCase()}
                      </Badge>
                      <Badge className={`font-black border-2 border-black shadow-[2px_2px_0px_#000] ${getPriorityColor(ticket.priority)} text-white text-xs`}>
                        {ticket.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                    <div className="flex items-center gap-4">
                      <span>ASSIGNED TO: {ticket.assignedTo}</span>
                      <span>CATEGORY: {ticket.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>UPDATED: {ticket.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="neo-card bg-white">
          <CardHeader className="border-b-4 border-black">
            <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-orange-600" />
              FREQUENTLY ASKED QUESTIONS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="neo-card bg-gray-50 p-4">
                  <h3 className="text-lg font-black text-gray-900 uppercase mb-2">{item.question}</h3>
                  <p className="text-sm font-bold text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
