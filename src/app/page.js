"use client";
import { Button } from "@/components/ui/button";
import { safeLocalStorage } from "@/lib/localStorage";
import { clearUserData } from "@/utils/redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const userInfo = safeLocalStorage.getItem("userInfo");
    console.log(userInfo)
    if (!userInfo) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    dispatch(clearUserData());
    router.push("/login");
  };
  return <div className="flex flex-col items-center justify-center min-h-screen">
    <h1>Welcome to the Home Page</h1>
    <Button onClick={handleLogout}>Logout</Button>
  </div>;
}
