"use client";
import { useEffect, useState } from "react";

export default function useCountdown(initialCount) {
  const [countdown, setCountdown] = useState(initialCount);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const resetCountdown = () => {
    setCountdown(initialCount);
  };

  return { countdown, resetCountdown };
}