import { useState } from "react"
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Type definitions
interface PatientDetails {
  name: string
  age: number
  gender: string
  reason: string
}

export function Summa() {
  const [showPatientForm, setShowPatientForm] = useState<boolean>(false)
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null)

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <div className="flex flex-col border-r bg-muted/40 p-4">
        <div className="flex h-[60px] items-center justify-between">
          <Link to="#" className="flex items-center gap-2 font-semibold">
            <HospitalIcon className="h-6 w-6" />
            <span>Clinic</span>
          </Link>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="grid gap-2 py-4">
            <Button
              variant="outline"
              className="justify-start gap-2 px-3 text-left"
              onClick={() => {
                setShowPatientForm(true)
              }}
            >
              <PlusIcon className="h-4 w-4" />
              <span>New Patient</span>
            </Button>
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
          <Link to="#" className="lg:hidden">
            <HospitalIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full border w-8 h-8">
                <img
                  src="/placeholder.svg"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                  style={{ aspectRatio: "32/32", objectFit: "cover" }}
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {showPatientForm && (
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
                      }
                      setPatientDetails(newPatientDetails)
                    }}
                  >
                    Get Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {patientDetails && (
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
        </main>
      </div>
    </div>
  )
}

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function HospitalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
