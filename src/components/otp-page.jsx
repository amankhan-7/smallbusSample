"use client";
import useCountdown from "@/hooks/useCountdown";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import CodeInput from "./ui/code-input";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/utils/form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const signInOTPSchema = signInSchema.pick({
  otp: true,
});

export default function OTPPage({ onBack, onSubmit, onResend }) {
  const { countdown, resetCountdown } = useCountdown(30);

  const form = useForm({
    resolver: zodResolver(signInOTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const watchedOtp = form.watch("otp");

  const handleOnBack = () => {
    form.reset();
    resetCountdown();
    onBack();
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    new Promise((resolve) => setTimeout(resolve("otp sent"), 2000));
    onResend();
    resetCountdown();
  };

  return (
    <Card className="shadow-none flex flex-col self-center max-w-[450px] w-full border-none py-0 px-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <CardHeader className="px-0">
        <Button
          onClick={handleOnBack}
          className="w-fit p-2 h-10 mb-4 bg-primary text-white hover:bg-secondary hover:text-white px-4 py-2 text-sm font-normal text-center"
        >
          <ArrowLeft className="w-4 h-4" />
          Back{" "}
        </Button>
        <h2 className="text-[1.8rem] font-semibold text-center md:text-left text-primary">
          Enter verification code
        </h2>
      </CardHeader>

      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="my-6 flex flex-row items-center justify-center">
                  <FormControl>
                    <CodeInput
                      length={4}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={watchedOtp?.length !== 4}
              className="w-full p-4 font-medium h-14 text-[1.1rem]"
            >
              Verify & Login
            </Button>
          </form>
        </Form>
        <CardFooter className="flex justify-center items-center mt-4">
          {countdown > 0 ? (
            <p>Resend OTP in {countdown}s</p>
          ) : (
            <Button
              variant="link"
              onClick={handleResendOTP}
              className="text-primary hover:underline p-0"
            >
              Resend OTP
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
