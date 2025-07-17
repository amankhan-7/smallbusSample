"use client";

import {
  hydrate,
  selectIsLoading,
} from "@/utils/redux/slices/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HydrationWrapper({ children }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    if (isLoading) dispatch(hydrate());
  }, [dispatch, isLoading]);
  return <>{children}</>;
}
