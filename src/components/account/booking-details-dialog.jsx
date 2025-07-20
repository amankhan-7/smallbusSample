"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  IndianRupee,
  MapPin,
  Clock,
  User,
  CreditCard,
  Calendar,
  Bus,
  Hash,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "destructive";
    case "expired":
      return "secondary";
    default:
      return "default";
  }
};

const getPaymentStatusBadgeVariant = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "destructive";
    default:
      return "default";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function BookingDetailsDialog({ booking, open, onOpenChange }) {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] hide-scrollbar px-4 py-6 mt-8 overflow-y-auto">
        <DialogHeader className="mt-4">
          <DialogTitle className="flex items-center justify-between">
            <span>Booking Details</span>
            <Badge variant={getStatusBadgeVariant(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription className="self-start">
            Booking Reference: {booking.bookingReference}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Journey Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Bus className="w-4 h-4 mr-2" />
              Journey Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center w-full justify-between space-x-4">
                  <div className="text-center">
                    <div className="font-medium text-lg">
                      {booking.fromCity}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.busId?.departureTime || "--"}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                  <div className="text-center">
                    <div className="font-medium text-lg">{booking.toCity}</div>
                    <div className="text-sm text-gray-500">
                      {booking.busId?.arrivalTime || "--"}
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Journey Date</div>
                    <div className="font-medium">
                      {formatDate(booking.journeyDate)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bus className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Bus Type</div>
                    <div className="font-medium">
                      {booking.busId?.busName || "--"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Passenger & Seat Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Passenger & Seat Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Passenger Name</div>
                <div className="font-medium">{booking.passengerName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Age</div>
                <div className="font-medium">{booking.passengerAge} years</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Gender</div>
                <div className="font-medium capitalize">
                  {booking.passengerGender}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Seat Number</div>
                <div className="font-medium">Seat {booking.seatNumber}</div>
              </div>
            </div>
          </Card>

          {/* Payment Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  <span className="text-2xl font-bold">₹{booking.amount}</span>
                </div>
                <Badge
                  variant={getPaymentStatusBadgeVariant(booking.paymentStatus)}
                >
                  {booking.paymentStatus.charAt(0).toUpperCase() +
                    booking.paymentStatus.slice(1)}
                </Badge>
              </div>

              {booking.paymentDetails && (
                <>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Payment Method</div>
                      <div className="font-medium capitalize">
                        {booking.paymentDetails.method ||
                          booking.paymentMethod ||
                          "--"}
                      </div>
                    </div>
                    {booking.paymentDetails.bank && (
                      <div>
                        <div className="text-gray-500">Bank</div>
                        <div className="font-medium">
                          {booking.paymentDetails.bank}
                        </div>
                      </div>
                    )}
                    {booking.paymentDetails.razorpayPaymentId && (
                      <div className="col-span-2">
                        <div className="text-gray-500">Payment ID</div>
                        <div className="font-medium text-xs">
                          {booking.paymentDetails.razorpayPaymentId}
                        </div>
                      </div>
                    )}
                    {booking.paymentDetails.razorpayOrderId && (
                      <div className="col-span-2">
                        <div className="text-gray-500">Order ID</div>
                        <div className="font-medium text-xs">
                          {booking.paymentDetails.razorpayOrderId}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Booking Timeline */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Booking Timeline
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking Created</span>
                <span>
                  {formatDate(booking.createdAt)} at{" "}
                  {formatTime(booking.createdAt)}
                </span>
              </div>
              {booking.lockedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Seat Locked</span>
                  <span>
                    {formatDate(booking.lockedAt)} at{" "}
                    {formatTime(booking.lockedAt)}
                  </span>
                </div>
              )}
              {booking.confirmedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Booking Confirmed</span>
                  <span>
                    {formatDate(booking.confirmedAt)} at{" "}
                    {formatTime(booking.confirmedAt)}
                  </span>
                </div>
              )}
              {booking.updatedAt && booking.updatedAt !== booking.createdAt && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated</span>
                  <span>
                    {formatDate(booking.updatedAt)} at{" "}
                    {formatTime(booking.updatedAt)}
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Action Buttons */}
          {booking.status === "confirmed" && (
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                Download Ticket
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/help" >Contact Support</Link>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
