"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function RouteFormPopup({ form, onSubmit, onCancel, bus }) {
  return (
    <div className="fixed inset-0 pt-75 lg:pt-50 flex items-center justify-center">
      <div className="bg-white rounded-[12px] p-6 shadow-lg w-[90%] max-w-xl">
        <h2 className="text-[#004aad] mb-4 text-xl md:text-2xl font-bold">
          Enter Your Details
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="10-digit phone number"
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-sm font-medium text-slate-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="you@email.com"
                      className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end mt-4 gap-1.5">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#004aad] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
