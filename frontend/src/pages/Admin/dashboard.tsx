import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Doctor {
  name: string;
  status: "online" | "offline";
}

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
  reason: string;
  status: "Waiting" | "In Progress" | "Completed";
};

const statusColors = {
  Waiting: "bg-red-500 text-red-50",
  "In Progress": "bg-yellow-500 text-yellow-50",
  Completed: "bg-green-500 text-green-50",
};

export function Admindashboard() { // Changed to default export
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [doctors, setDoctors] = useState<Doctor[]>([
    { name: "Dr. John Doe", status: "online" },
    { name: "Dr. Jane Smith", status: "online" },
    { name: "Dr. Michael Johnson", status: "offline" },
    { name: "Dr. Emily Brown", status: "offline" },
    { name: "Dr. David Lee", status: "online" },
    { name: "Dr. Sarah Wilson", status: "offline" },
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "John Doe",
      age: 35,
      gender: "Male",
      reason: "Flu symptoms",
      status: "Waiting",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 42,
      gender: "Female",
      reason: "Broken arm",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Michael Johnson",
      age: 28,
      gender: "Male",
      reason: "Routine checkup",
      status: "Completed",
    },
  ]);

  const handleTabChange = (tab: "active" | "inactive") => {
    setActiveTab(tab);
    setSelectedDoctor(null);
  };

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const getActiveDoctors = () => {
    return doctors.filter((doctor) => doctor.status === "online");
  };

  const getInactiveDoctors = () => {
    return doctors.filter((doctor) => doctor.status === "offline");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="bg-background border-r w-64 p-6 flex flex-col gap-6">
        <div className="flex justify-center">
          <Button
            onClick={() => handleTabChange("active")}
            className={`rounded-md px-4 py-2 font-medium transition-colors ${
              activeTab === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Active Doctors
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => handleTabChange("inactive")}
            className={`rounded-md px-4 py-2 font-medium transition-colors ${
              activeTab === "inactive"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Inactive Doctors
          </Button>
        </div>
      </aside>
      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="grid gap-4">
          {activeTab === "active" && (
            <Card>
              <CardHeader>
                <CardTitle>Active Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {getActiveDoctors().map((doctor) => (
                    <li
                      key={doctor.name}
                      className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md p-2"
                      onClick={() => handleDoctorClick(doctor)}
                    >
                      <div className="font-medium">{doctor.name}</div>
                      <Badge variant="secondary">Online</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          {activeTab === "inactive" && (
            <Card>
              <CardHeader>
                <CardTitle>Inactive Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {getInactiveDoctors().map((doctor) => (
                    <li
                      key={doctor.name}
                      className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md p-2"
                      onClick={() => handleDoctorClick(doctor)}
                    >
                      <div className="font-medium">{doctor.name}</div>
                      <Badge variant="outline">Offline</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
        {selectedDoctor && patients.map((patient) => (
          <Card key={patient.id} className="relative">
            <CardHeader className={`${statusColors[patient.status]} px-4 py-2 rounded-t-md`}>
              <div className="absolute top-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-medium">
                {patient.status}
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="border-2 border-white">
                  <AvatarImage src="/placeholder-user.jpg" alt={patient.name} />
                  <AvatarFallback>{patient.name[0] + patient.name[1]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm">{`${patient.age} years old, ${patient.gender}`}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <div className="text-sm text-muted-foreground">
                Reason for visit: {patient.reason}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
