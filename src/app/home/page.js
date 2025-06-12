"use client";
import { Button } from "@/components/ui/button";
import { clearUserData } from "@/utils/redux/features/user/userSlice";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      redirect("/login");
    }
  }, []);

  const handleLogout = () => {
    dispatch(clearUserData());
    redirect("/login");
  };
  return <div className="flex flex-col items-center justify-center min-h-screen">
    <h1>Welcome to the Home Page</h1>
    <Button onClick={handleLogout}>Logout</Button>
  </div>;
}
