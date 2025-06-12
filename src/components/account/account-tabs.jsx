"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import AccountForm from "./account-form";
import BookingHistory from "./booking-history";

export default function AccountTabs() {
  return (
    <Tabs className="gap-5" defaultValue="account">
      <TabsList className="flex rounded-none bg-white h-fit w-full">
        <TabsTrigger
          value="account"
          className="
            flex-1
            p-[15px]
            text-center
            cursor-pointer
            text-[#666]
            border-b-2 border-transparent
            transition-all
            rounded-none
            border-0
            text-[1rem]
            data-[state=inactive]:hover:bg-[var(--hover-bg)]
            data-[state=inactive]:text-[#666]
            data-[state=inactive]:bg-white
            data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary
          "
        >
          Account Details
        </TabsTrigger>
        <TabsTrigger
          value="booking"
          className="
            flex-1
            p-[15px]
            text-center
            cursor-pointer
            text-[1rem]
            text-[#666]
            border-b-2 border-transparent
            transition-all
            rounded-none
            border-0
            data-[state=inactive]:hover:bg-[var(--hover-bg)]
            data-[state=inactive]:text-[#666]
            data-[state=inactive]:bg-white
            data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary
          "
        >
          Booking History
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="account"
        className="bg-white p-[30px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
      >
        <AccountForm />
      </TabsContent>

      <TabsContent
        value="booking"
        className="bg-white p-[30px] shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
      >
        <BookingHistory />
      </TabsContent>
    </Tabs>
  );
}
