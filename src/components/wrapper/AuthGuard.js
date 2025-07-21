"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthRedirectLoading from "../AuthRediectLoading";

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

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <AuthRedirectLoading path={"login"} />;
  }

  if (!requireAuth && isAuthenticated) {
    return <AuthRedirectLoading path={""} />;
  }

  return children;
};

export default AuthGuard;
