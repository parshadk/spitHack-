import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { useAuth } from "@/UserContext"; // Import user context
import { Check, Edit3 } from "lucide-react"; // Importing icons for save and edit
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

function Account() {
  const { user } = useAuth(); // Access user data from context
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    contact: user?.contact || "",
    address: user?.address || "",
  });

  // Handle editing toggling and saving
  const toggleEditing = () => setIsEditing((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          name: profileData.name,
          contact: profileData.contact,
          address: profileData.address,
        });
        setIsEditing(false); // Turn off editing mode after saving
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Account
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Profile information display */}
          <div className="bg-white p-6 rounded-md shadow-lg flex items-center gap-6">
            <div className="flex-shrink-0">
              <img
                src={user?.avatar || "/placeholder-avatar.png"}
                alt="User Avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Name:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="border rounded p-1"
                  />
                ) : (
                  <span>{profileData.name || "N/A"}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Contact:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="contact"
                    value={profileData.contact}
                    onChange={handleChange}
                    className="border rounded p-1"
                  />
                ) : (
                  <span>{profileData.contact || "N/A"}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Address:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="border rounded p-1"
                  />
                ) : (
                  <span>{profileData.address || "N/A"}</span>
                )}
              </div>
            </div>
            <button
              onClick={isEditing ? handleSave : toggleEditing}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              aria-label={isEditing ? "Save Changes" : "Edit Profile"}
            >
              {isEditing ? <Check className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Account;
