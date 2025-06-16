"use client";
import { userProfilePictureSchema } from "@/utils/validations/form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { setUserInfo } from "@/utils/redux/features/user/userSlice";
import { safeLocalStorage } from "@/lib/localStorage";

export default function AccountHeader() {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [mount, setMount] = useState(false);

  const onProfilePictureSubmit = (data) => {
    try {
      console.log("Profile picture submitted:", data);
      console.log("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const form = useForm({
    resolver: zodResolver(userProfilePictureSchema),
    defaultValues: {
      profilePicture: undefined,
    },
  });

  const handleProfilePictureSubmit = (data) => {
    if (onProfilePictureSubmit) {
      onProfilePictureSubmit(data);
    } else {
      console.log("Profile picture submitted:", data);
    }
  };

  useEffect(() => {
    const userInfoData = safeLocalStorage.getItem("userInfo");
    if (userInfoData) {
      dispatch(setUserInfo(userInfoData));
    }
  }, [dispatch]);

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) {
    return null;
  }
  return (
    <Card className="bg-white rounded-none p-[30px] mb-[20px] shadow-md flex gap-[30px] max-md:flex-col max-md:text-center max-md:gap-[15px]">
      <CardContent className="flex p-0 flex-col items-center md:flex-row gap-[15px]">
        {" "}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleProfilePictureSubmit)}>
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem className="relative">
                  <Avatar className="relative w-[100px] h-[100px] rounded-none bg-[#eee] flex items-center justify-center overflow-hidden">
                    <AvatarImage
                      src={avatarPreview || userInfo?.avatarUrl || ""}
                      alt={userInfo?.fullname || "User"}
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback className="text-[40px] text-[#999]">
                      {userInfo?.fullname?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <FormControl>
                    <Input
                      id="profile-upload"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/gif"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        field.onChange(file);
                        handleFileChange(file);
                      }}
                    />
                  </FormControl>

                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 w-[100px] left-0 right-0 bg-black/50 text-white text-[0.8rem] text-center py-1 cursor-pointer"
                  >
                    Change
                  </label>

                  <FormLabel className="sr-only">
                    Change Profile Picture
                  </FormLabel>
                  <FormMessage />
                  {field.value && (
                    <Button type="submit" size="sm" className="mt-4">
                      Change
                    </Button>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col justify-center item-center md:items-start">
          <h2 className="text-[1.5rem] font-bold text-[--text-color] mb-[5px]">
            {userInfo?.fullname || "User"}
          </h2>
          <p className="text-[0.9rem] text-[#666]">
            {userInfo?.phone || "+910000000000"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
