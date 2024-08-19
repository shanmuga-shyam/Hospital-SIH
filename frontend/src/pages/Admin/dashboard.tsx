import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

// Type definitions
interface PatientDetails {
  name: string;
  age: number;
  gender: string;
  reason: string;
}

interface Doctor {
  name: string;
  status: "online" | "offline";
}

const statusColors = {
  Waiting: "bg-red-500 text-red-50",
  "In Progress": "bg-yellow-500 text-yellow-50",
  Completed: "bg-green-500 text-green-50",
};

export function Admindashboard() {
  const [activeView, setActiveView] = useState<"activeDoctors" | "inactiveDoctors" | "newPatientForm" | null>(null);
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([
    { name: "Dr. John Doe", status: "online" },
    { name: "Dr. Jane Smith", status: "online" },
    { name: "Dr. Michael Johnson", status: "offline" },
    { name: "Dr. Emily Brown", status: "offline" },
    { name: "Dr. David Lee", status: "online" },
    { name: "Dr. Sarah Wilson", status: "offline" },
  ]);

  const getActiveDoctors = () => doctors.filter((doctor) => doctor.status === "online");

  const getInactiveDoctors = () => doctors.filter((doctor) => doctor.status === "offline");

  const renderActiveDoctors = () => (
    <Card>
      <CardHeader>
        <CardTitle>Active Doctors</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {getActiveDoctors().map((doctor) => (
            <li key={doctor.name} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md p-2">
              <div className="font-medium">{doctor.name}</div>
              <Badge variant="secondary">Online</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const renderInactiveDoctors = () => (
    <Card>
      <CardHeader>
        <CardTitle>Inactive Doctors</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {getInactiveDoctors().map((doctor) => (
            <li key={doctor.name} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md p-2">
              <div className="font-medium">{doctor.name}</div>
              <Badge variant="outline">Offline</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const renderNewPatientForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>New Patient</CardTitle>
        <CardDescription>Enter the patient's Abha ID to get their details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <Label htmlFor="abha-id">Abha ID</Label>
          <Input id="abha-id" placeholder="Enter Abha ID" />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            onClick={() => {
              const newPatientDetails: PatientDetails = {
                name: "Yas",
                age: 20,
                gender: "male",
                reason: "",
              };
              setPatientDetails(newPatientDetails);
              setActiveView(null); // Clear the active view when patient details are displayed
            }}
          >
            Get Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Dashboard */}
      <div className="flex items-center justify-between bg-gray-100 p-4 border-b">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link to="/adminsignin"><Button className="ml-auto">Home</Button></Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[280px_1fr] flex-1">
        <div className="flex flex-col border-r bg-muted/40 p-4">
          <div className="flex flex-col gap-4">
            <Button onClick={() => setActiveView("newPatientForm")}>New Patient</Button>
            <Button onClick={() => { setActiveView("activeDoctors"); setPatientDetails(null); }}>Active Doctors</Button>
            <Button onClick={() => { setActiveView("inactiveDoctors"); setPatientDetails(null); }}>Inactive Doctors</Button>
            
          </div>
        </div>
        <div className="flex flex-col p-6">
          {activeView === "activeDoctors" && renderActiveDoctors()}
          {activeView === "inactiveDoctors" && renderInactiveDoctors()}
          {activeView === "newPatientForm" && renderNewPatientForm()}
          {patientDetails && !activeView && (
            <Card>
              <CardHeader>
                <CardTitle>Patient Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={patientDetails.name} />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" defaultValue={patientDetails.age} />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Input id="gender" defaultValue={patientDetails.gender} />
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason</Label>
                    <Textarea id="reason" placeholder="Enter reason for visit" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="submit">Enter</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
