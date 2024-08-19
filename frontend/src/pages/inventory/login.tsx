import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

// Define the type for the login type
type LoginType = "main-store" | "sub-store" | "pharmacy" | "ward";

export function InventoryLogin() {
  const [loginType, setLoginType] = useState<LoginType | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Login type:", loginType);
    console.log("Email:", email);
    console.log("Password:", password);

    // Navigate to different pages based on loginType
    if (loginType) {
      switch (loginType) {
        case "main-store":
          navigate("/mainstore"); // Adjust the route as needed
          break;
        case "sub-store":
          navigate("/substore"); // Adjust the route as needed
          break;
        case "pharmacy":
          navigate("/pharmacy"); // Adjust the route as needed
          break;
        case "ward":
          navigate("/ward"); // Adjust the route as needed
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">Enter your email and password to access your account.</p>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Login as</Label>
            <Select onValueChange={(value) => setLoginType(value as LoginType)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-store">Main Store</SelectItem>
                <SelectItem value="sub-store">Sub Store</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                <SelectItem value="ward">Ward</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button type="submit" className="w-full" onClick={handleLogin}>
            Sign in
          </Button>
        </CardFooter>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/inventorysignup" className="font-medium underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
