"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "../loading";

const AuthGuard = ({ children, requireAuth = true, redirectTo = "/login" }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (requireAuth && !isAuthenticated && !isLoading) {
      router.push(redirectTo);
    } else if (!requireAuth && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, requireAuth, redirectTo, router, isLoading, isMounted]);

  // Always show loading during SSR and initial client render
  if (!isMounted || isLoading) {
    return <LoadingPage />;
  }

  // Show loading while redirecting for auth checks
  if (requireAuth && !isAuthenticated) {
    return <LoadingPage />;
  }

  if (!requireAuth && isAuthenticated) {
    return <LoadingPage />;
  }

  return children;
};

export default AuthGuard;
