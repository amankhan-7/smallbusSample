"use client";
import { accountDetailSchema } from "@/utils/validations/form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useUpdateUserMutation } from "@/utils/redux/api/user";
import { updateUserInfo } from "@/utils/redux/features/user/userSlice";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AccountForm() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const form = useForm({
    resolver: zodResolver(accountDetailSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        fullname: userInfo.fullname || "",
        phone: userInfo.phone || "",
        email: userInfo.email || "",
      });
    }
  }, [userInfo, form]);

  const handleSubmit = async (data) => {
    try {
      const result = await updateUser(data).unwrap();
      dispatch(updateUserInfo(result));
      alert("Account updated successfully!");
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex gap-[0.9375rem] mb-[1.25rem] max-md:flex-col max-md:gap-[1.25rem]">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="mb-[1.25rem]">
                  <FormLabel className="block mb-[0.5rem] font-semibold text-base leading-6 text-[var(--text-color)]">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-[0.9375rem] py-[0.75rem] border border-[var(--border-color)] rounded-none text-base transition-colors focus-visible:border focus-visible:border-primary 
                          min-h-fit
                          "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-1">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mb-[1.25rem]">
                  <FormLabel className="block mb-[0.5rem] font-[500] text-[var(--text-color)] text-base">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="10-digit mobile number"
                      readOnly
                      disabled
                      className="w-full px-[0.9375rem] py-[0.75rem] border border-[var(--border-color)] rounded-none text-base 
                          min-h-fit
                          focus:outline-none focus:border-primary
                          disabled:text-[var(--text-color)] disabled:cursor-not-allowed
                          disabled:opacity-100
                          cursor-not-allowed"
                    />
                  </FormControl>
                  <FormDescription className="mt-[0.375rem] text-[0.85rem] text-[#666]">
                    Phone number cannot be changed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-[1.25rem]">
              <FormLabel className="block mb-[0.5rem] font-[500] text-[var(--text-color)]">
                Email Address <span className="font-[400]">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-[0.9375rem] py-[0.75rem] border border-[var(--border-color)] rounded-none text-base transition-colors focus:outline-none
                      min-h-fit
                       focus-visible:border focus-visible:border-primary "
                />
              </FormControl>
              <FormDescription className="mt-[0.375rem] text-[0.85rem] text-[#666]">
                For receiving e-tickets and updates
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="px-[1.5625rem] py-[0.75rem] bg-primary text-white rounded-none font-[500] text-base transition-colors min-h-fit"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
