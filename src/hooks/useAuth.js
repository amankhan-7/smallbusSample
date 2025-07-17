import { useLogoutMutation } from "@/utils/redux/api/user";
import {
  clearAuth,
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsLoading,
} from "@/utils/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const router = useRouter();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleLogout = useCallback(() => {
    logout();
    dispatch(clearAuth());
    router.push("/login");
  }, [dispatch, logout, router]);


  return {
    user,
    isAuthenticated,
    isLoading: isLoading || isLogoutLoading,
    logout: handleLogout,
  };
};
