"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from "zod";
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
import { signInSchema } from "../../utils/form-validation";

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phoneNumber: "",
      tnc: false,
    },
  });
  return (
      <Card className="shadow-none flex flex-col self-center max-w-[450px] w-full  border-none py-0 px-3.5 ">
        <CardHeader className="text-[1.8rem] mb-[25px] font-semibold text-left text-[var(--primary)] px-0">
          Login to continue
        </CardHeader>
        <CardContent className="px-0">
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-[1.1rem] text-[var(--text-color)]">
                      Enter your phone number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="10-digit mobile number"
                        {...field}
                        className="md:text-[1.2rem] h-14 w-full border focus-visible:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(0,74,173,0.15)] p-4"

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
                  <FormItem className="flex flex-row">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className=""
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {" "}
                      I agree to the{" "}
                      <Link
                        href="#"
                        className="text-blue-600 hover:underline inline-block"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Button className="w-full mt-4 p-4 font-medium h-14 text-[1.1rem] ">Get OTP</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
