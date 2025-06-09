"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SeatSelection from "@/components/seats/seat-selection";

export default function SeatsPage() {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is authenticated
    if (!userInfo) {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (!storedUserInfo) {
        router.push("/login");
        return;
      }
    }
  }, [userInfo, router]);

  return <SeatSelection />;
}
