"use client";
import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

const AccountHeader = () => {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const { fullname = "User Name", phone = "+91 912345678" } = userInfo;


  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <Card className="flex p-4 bg-card items-center flex-row shadow-sm mb-2">
      <CardContent className="flex px-4 items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden cursor-pointer border border-primary"
            onClick={handlePictureClick}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Profile"
                className="w-full h-full object-cover border
            border-primary"
              />
            ) : (
              <User className="text-primary w-8 h-8" />
            )}
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex items-center justify-center px-0 gap-0 flex-col">
            <div className="font-semibold text-lg text-foreground">
              {fullname}
            </div>
            <div className="text-sm text-muted-foreground">{phone}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountHeader;
