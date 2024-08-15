import { useState, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/config";
import axios from "axios";

// Define the shape of the form data
interface SignInFormData {
  email: string;
  password: string;
}

export function SigninDoctor() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear any previous errors
    setError(null);

    // Perform basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Handle the form submission (e.g., API call)
    try {
        const res = await axios.post(`${BACKEND_URL}/api/doctor/register`,formData) as {success:boolean,token:string};
        localStorage.setItem("doctortoken",res.token)
      console.log("Login successful");
    } catch (err: any) {
      // Handle error
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Doctor Login</h1>
          <p className="mt-2 text-muted-foreground">Enter your email and password to access your account.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@hospital.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <br />
          <Link to="/doctordashboard"><Button type="submit" className="w-full">
            Login
          </Button></Link>
          <p>Have you registered? <Link to="/doctorssignup">SignUp</Link></p>
        </form>
      </div>
    </div>
  );
}
