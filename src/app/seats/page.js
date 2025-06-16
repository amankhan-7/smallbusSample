"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import SeatSelection from "@/components/seats/seat-selection";
import { safeLocalStorage } from "@/lib/localStorage";


export default function SeatsPage() {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo) {
      const storedUserInfo = safeLocalStorage.getItem("userInfo");
      if (!storedUserInfo) {
        router.push("/login");
        return;
      }
    }
  }, [userInfo, router]);

  return <SeatSelection />;
}
