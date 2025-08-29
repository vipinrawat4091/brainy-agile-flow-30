
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

export default function EditTask() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="neo-card bg-white border-4 border-black">
          <CardHeader className="border-b-4 border-black">
            <CardTitle className="text-2xl font-black uppercase flex items-center gap-3">
              <Edit className="w-6 h-6 text-green-600" />
              EDIT TASK
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-16">
              <Edit className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-black text-gray-500 uppercase mb-2">
                EDIT TASK
              </h2>
              <p className="text-gray-400 font-bold">
                Task editing functionality will be implemented here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
