// HomePage.jsx
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle, Barcode, Bell, MapPin, TrendingUp, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate
import { logOut } from "@/authService.js";  // Import logOut function from authService

export default function HomePage() {
  const navigate = useNavigate();  // Initialize the navigate function for redirection

  // Handle logout
  const handleLogout = async () => {
    try {
      await logOut();  // Call logOut function to log the user out
      navigate('/auth');  // Redirect to the login page after successful logout
    } catch (error) {
      console.error("Logout failed", error);  // Log error if logout fails
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex-1 rounded-xl bg-blue-300 min-h-min">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                      Reduce Food Waste with Food-Flux
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                      Track your food, get timely alerts, and discover delicious recipes for your leftovers.
                    </p>
                  </div>
                  <div className="space-x-4">
                    <Button><Link to="/signup">Get Started</Link></Button>
                    <Button variant="outline"><Link to="/about">Learn More</Link></Button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 ">
            <div className="rounded-xl bg-muted/50">
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <Barcode className="h-14 w-14 text-primary mb-4" />
                  <CardTitle>Food Item Logging</CardTitle>
                </CardHeader>
                <CardContent>
                  Log food items with details like name, quantity, expiry date, and storage location. Includes barcode scanning for easy entry.
                </CardContent>
              </Card>
            </div>

            <div className="rounded-xl bg-muted/50">
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <Bell className="h-14 w-14 text-primary mb-4" />
                  <CardTitle>Expiry Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  Receive reminders for items nearing expiry and get recipe suggestions to avoid waste.
                </CardContent>
              </Card>
            </div>

            <div className="rounded-xl bg-muted/50">
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <Gift className="h-14 w-14 text-primary mb-4" />
                  <CardTitle>Donation Feature</CardTitle>
                </CardHeader>
                <CardContent>
                  List surplus food for donation and connect with local shelters or food banks.
                </CardContent>
              </Card>
            </div>

            <div className="rounded-xl bg-muted/50">
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <MapPin className="h-14 w-14 text-primary mb-4" />
                  <CardTitle>Location-Based Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  Match donations with nearby organizations using location-based algorithms.
                </CardContent>
              </Card>
            </div>

            <div className="rounded-xl bg-muted/50">
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <TrendingUp className="h-14 w-14 text-primary mb-4" />
                  <CardTitle>Waste Reduction Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  Track saved food, donations, and environmental impact with real-time analytics.
                </CardContent>
              </Card>
            </div>

            <div className="rounded-xl bg-muted/50">
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <AlertCircle className="h-14 w-14 text-primary mb-4" />
                  <CardTitle>Gamification & Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  Earn badges and points for reducing waste and making donations. Join the leaderboard!
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
