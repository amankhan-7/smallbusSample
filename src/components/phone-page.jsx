"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Button } from "./ui/button";
import { signInSchema } from "@/utils/form-validation";

const signInPhoneSchema = signInSchema.pick({
  phoneNumber: true,
  tnc: true,
});

export default function PhonePage({onSubmit}) {
  const form = useForm({
    resolver: zodResolver(signInPhoneSchema),
    defaultValues: {
      phoneNumber: "",
      tnc: false,
    },
  });
  return (
    <Card className="shadow-none flex flex-col self-center max-w-[450px] w-full border-none py-0 px-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="text-[1.8rem] mb-[25px] font-semibold text-center md:text-left text-primary px-0">
        Login to continue
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-[1.1rem] text-[var(--text-color)]">
                    Enter your phone number
                  </FormLabel>                  <FormControl>
                    <Input
                      placeholder="10-digit mobile number"
                      {...field}
                      className="md:text-[1.2rem] h-14 w-full border focus-visible:border-primary focus:shadow-[0_0_0_3px_rgba(0,74,173,0.15)] p-4"
                    />
                  </FormControl>
                  <FormDescription>
                    We'll send you a verification code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tnc"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                  <FormControl>
                    <Checkbox
                      {...field}
                      className="self-center m-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-muted-foreground h-fit font-normal">
                    I agree to the{" "}
                    <Button
                      asChild
                      variant="link"
                      className="text-primary hover:underline p-0"
                    >
                      <Link href="#">Terms & Conditions</Link>
                    </Button>
                    and
                    <Button
                      asChild
                      variant="link"
                      className="text-primary hover:underline p-0"
                    >
                      <Link href="#">Privacy Policy</Link>
                    </Button>
                  </FormLabel>
                </FormItem>
              )}
            />            <Button
              type="submit"
              className="w-full mt-4 p-4 font-medium h-14 text-[1.1rem]"
            >
              Get OTP
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
