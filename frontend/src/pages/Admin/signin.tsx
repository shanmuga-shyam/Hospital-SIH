import { useState, FormEvent } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Link} from "react-router-dom";
import { BACKEND_URL} from "@/config";
import axios from "axios";

interface SignInFormData{
    email: string;
    password: string;
}
export  function SignAdmin() {
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
};

return (
    <div className="mx-auto max-w-sm space-y-6">
    <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">Enter your email and password to access your account.</p>
    </div>
    <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Link to="/admindashboard">
            <Button type="submit" className="w-full">
              Sign in
            </Button></Link>
          </CardFooter>
        </form>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?  <Link to="/adminsignup">SignUp</Link>
      </div>
    </div>
  );
}

