"use client";
import { accountDetailSchema } from "@/utils/validations/form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "@/utils/redux/api/user";
import { updateUserInfo, hydrate } from "@/utils/redux/features/user/userSlice";
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
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function AccountForm() {
  const { userInfo, isHydrated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(accountDetailSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
    if (!isHydrated) {
      dispatch(hydrate());
    }
  }, [dispatch, isHydrated]);

  useEffect(() => {
    if (isHydrated && userInfo) {
      form.reset({
        fullname: userInfo.fullname || "",
        phone: userInfo.phone || "",
        email: userInfo.email || "",
      });
    }
  }, [userInfo, form, isHydrated]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted || !isHydrated) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const handleFormSubmit = async (data) => {
    try {
      const result = await updateUser(data).unwrap();
      dispatch(updateUserInfo(result));
      alert("Account updated successfully!");
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account. Please try again.");
    }
  };

  const onCancel = () => {
    form.reset({
      fullname: userInfo.fullname || "",
      phone: userInfo.phone || "",
      email: userInfo.email || "",
    });
    router.push("/account");
  };

  return (
    <Card className="p-6 gap-0 rounded-md shadow-sm">
      <CardHeader className="text-lg font-bold text-primary p-0">
        Edit Profile
      </CardHeader>

      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col mb-[1.25rem] max-md:flex-col max-md:gap-[1.25rem]"
          >
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
                      placeholder="Your full name"
                      className="w-full px-[0.9375rem] py-[0.75rem] border border-[var(--border-color)] text-base transition-colors focus-visible:border focus-visible:border-primary 
                          min-h-fit
                          "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      className="w-full px-[0.9375rem] py-[0.75rem] border border-[var(--border-color)] text-base 
                          min-h-fit
                          focus:outline-none focus:border-primary
                          disabled:text-[var(--text-color)] disabled:cursor-not-allowed
                          disabled:opacity-100
                          cursor-not-allowed"
                    />
                  </FormControl>
                  <FormDescription>
                    Phone number cannot be changed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email Address{" "}
                    <span className="font-normal">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      placeholder="Your email address"
                      className="w-full px-[0.9375rem] py-[0.75rem] border border-[var(--border-color)] text-base transition-colors
                    focus:outline-none
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

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-[1.5625rem] py-[0.75rem] bg-primary text-white font-[500] text-base transition-colors min-h-fit"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={onCancel}
                className="flex-1 py-[0.75rem] min-h-fit"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
