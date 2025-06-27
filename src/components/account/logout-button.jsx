"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => (
  <div className="my-6">
    <Button
      variant="outline"
      onClick={() => {}}
      className="w-full h-fit flex items-center justify-center gap-2 border-border bg-white text-primary font-medium rounded-md p-4 shadow-sm"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </Button>
  </div>
);

export default LogoutButton;
