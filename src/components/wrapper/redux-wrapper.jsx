"use client"
import { store } from "@/utils/redux/store";
import { Provider } from "react-redux";

export default function ReduxWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
