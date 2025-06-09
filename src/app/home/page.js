"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { logout } from "@/utils/redux/features/auth/authSlice";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Bus, MapPin, Calendar, ArrowRight } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      redirect("/login");
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    redirect("/login");
  };

  // Sample bus routes for demonstration
  const sampleRoutes = [
    {
      id: 1,
      from: "Mumbai",
      to: "Pune",
      date: "Today",
      price: "₹500",
      operator: "SmallBus Express",
    },
    {
      id: 2,
      from: "Delhi",
      to: "Agra",
      date: "Tomorrow",
      price: "₹350",
      operator: "SmallBus Comfort",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Welcome to SmallBus
                </CardTitle>
                <p className="text-gray-600 mt-1">
                  Book your comfortable journey
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Action */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bus className="w-5 h-5" />
              Experience Seat Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Try our new seat selection interface with interactive bus layout
            </p>
            <Link href="/seats">
              <Button size="lg" className="w-full sm:w-auto">
                Select Seats
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Sample Routes */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Popular Routes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sampleRoutes.map((route) => (
              <Card
                key={route.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{route.from}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="font-medium">{route.to}</span>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {route.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{route.date}</span>
                    </div>
                    <span>{route.operator}</span>
                  </div>

                  <Link href="/seats">
                    <Button variant="outline" size="sm" className="w-full">
                      Select Seats
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
