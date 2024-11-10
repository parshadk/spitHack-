import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { Separator } from "@/components/ui/separator"
  import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
  } from "@/components/ui/sidebar"
  import { AppSidebar } from "@/components/ui/app-sidebar"
 
  import React, { useState } from 'react'
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Textarea } from "@/components/ui/textarea"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { Badge } from "@/components/ui/badge"
  import { Camera, Search } from 'lucide-react'
  
  
function Ngodonations() {
  const [userType, setUserType] = useState('donor') // 'donor' or 'ngo'
  const [donations, setDonations] = useState([])
  const [requests, setRequests] = useState([])
  const [showDonationForm, setShowDonationForm] = useState(false)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)

  const [donationForm, setDonationForm] = useState({
    foodItem: '',
    category: '',
    quantity: '',
    expiryDate: '',
    pickupLocation: '',
    notes: '',
    photo: null
  })

  const [requestForm, setRequestForm] = useState({
    foodType: '',
    quantity: '',
    specialRequirements: ''
  })

  const handleDonationSubmit = (e) => {
    e.preventDefault()
    const newDonation = {
      ...donationForm,
      id: Date.now(),
      status: 'Available',
      photo: donationForm.photo ? URL.createObjectURL(donationForm.photo) : null
    }
    setDonations([...donations, newDonation])
    setShowDonationForm(false)
    setDonationForm({
      foodItem: '',
      category: '',
      quantity: '',
      expiryDate: '',
      pickupLocation: '',
      notes: '',
      photo: null
    })
  }

  const handleRequestSubmit = (e) => {
    e.preventDefault()
    const newRequest = {
      ...requestForm,
      id: Date.now(),
      status: 'Pending'
    }
    setRequests([...requests, newRequest])
    setShowRequestForm(false)
    setRequestForm({
      foodType: '',
      quantity: '',
      specialRequirements: ''
    })
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    setDonationForm({ ...donationForm, photo: file })
  }

  const handlePickupRequest = (donation) => {
    setSelectedDonation(donation)
  }

  const confirmPickup = () => {
    const updatedDonations = donations.map(d => 
      d.id === selectedDonation.id ? { ...d, status: 'In Progress' } : d
    )
    setDonations(updatedDonations)
    setSelectedDonation(null)
  } 
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
            <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
         
      <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Food Donation Platform</h1>
      
      <div className="mb-6">
        <Select value={userType} onValueChange={setUserType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="donor">Donor</SelectItem>
            <SelectItem value="ngo">NGO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {userType === 'donor' ? (
        <Card>
          <CardHeader>
            <CardTitle>Donor Dashboard</CardTitle>
            <CardDescription>Manage your food donations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowDonationForm(true)} className="mb-4">
              Make a Donation
            </Button>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Food Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>{donation.foodItem}</TableCell>
                    <TableCell>{donation.category}</TableCell>
                    <TableCell>{donation.quantity}</TableCell>
                    <TableCell>{donation.expiryDate}</TableCell>
                    <TableCell>
                      <Badge variant={donation.status === 'Available' ? 'secondary' : 'default'}>
                        {donation.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>NGO Dashboard</CardTitle>
            <CardDescription>Request and manage food donations</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="available">
              <TabsList>
                <TabsTrigger value="available">Available Donations</TabsTrigger>
                <TabsTrigger value="requests">Your Requests</TabsTrigger>
              </TabsList>
              <TabsContent value="available">
                <div className="mb-4">
                  <Label htmlFor="search">Search Donations</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="search" placeholder="Search by item, category, or location" className="pl-8" />
                  </div>
                </div>
                <ScrollArea className="h-[400px]">
                  {donations.filter(d => d.status === 'Available').map((donation) => (
                    <Card key={donation.id} className="mb-4">
                      <CardHeader>
                        <CardTitle>{donation.foodItem}</CardTitle>
                        <CardDescription>{donation.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p><strong>Quantity:</strong> {donation.quantity}</p>
                        <p><strong>Expiry Date:</strong> {donation.expiryDate}</p>
                        <p><strong>Pickup Location:</strong> {donation.pickupLocation}</p>
                        {donation.photo && (
                          <img src={donation.photo} alt={donation.foodItem} className="mt-2 rounded-md w-full max-w-xs" />
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button onClick={() => handlePickupRequest(donation)}>Request Pickup</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="requests">
                <Button onClick={() => setShowRequestForm(true)} className="mb-4">
                  Make a Request
                </Button>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Food Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Special Requirements</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.foodType}</TableCell>
                        <TableCell>{request.quantity}</TableCell>
                        <TableCell>{request.specialRequirements}</TableCell>
                        <TableCell>
                          <Badge variant={request.status === 'Pending' ? 'secondary' : 'default'}>
                            {request.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      <Dialog open={showDonationForm} onOpenChange={setShowDonationForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make a Donation</DialogTitle>
            <DialogDescription>Fill in the details of your food donation</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDonationSubmit} className="space-y-4">
            <div>
              <Label htmlFor="foodItem">Food Item</Label>
              <Input
                id="foodItem"
                value={donationForm.foodItem}
                onChange={(e) => setDonationForm({...donationForm, foodItem: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={donationForm.category}
                onValueChange={(value) => setDonationForm({...donationForm, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perishable">Perishable</SelectItem>
                  <SelectItem value="non-perishable">Non-perishable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={donationForm.quantity}
                onChange={(e) => setDonationForm({...donationForm, quantity: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={donationForm.expiryDate}
                onChange={(e) => setDonationForm({...donationForm, expiryDate: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Input
                id="pickupLocation"
                value={donationForm.pickupLocation}
                onChange={(e) => setDonationForm({...donationForm, pickupLocation: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={donationForm.notes}
                onChange={(e) => setDonationForm({...donationForm, notes: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="photo">Photo (Optional)</Label>
              <div className="mt-1 flex items-center">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Label htmlFor="photo" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Photo
                </Label>
                {donationForm.photo && <span className="ml-2">{donationForm.photo.name}</span>}
              </div>
            </div>
            <Button type="submit">Submit Donation</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make a Food Request</DialogTitle>
            <DialogDescription>Specify your food requirements</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div>
              <Label htmlFor="foodType">Food Type</Label>
              <Input
                id="foodType"
                value={requestForm.foodType}
                onChange={(e) => setRequestForm({...requestForm, foodType: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="requestQuantity">Quantity</Label>
              <Input
                id="requestQuantity"
                value={requestForm.quantity}
                onChange={(e) => setRequestForm({...requestForm, quantity: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="specialRequirements">Special Requirements</Label>
              <Textarea
                id="specialRequirements"
                value={requestForm.specialRequirements}
                onChange={(e) => setRequestForm({...requestForm, specialRequirements: e.target.value})}
              />
            </div>
            <Button type="submit">Submit Request</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedDonation} onOpenChange={() => setSelectedDonation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Pickup Request</DialogTitle>
            <DialogDescription>Are you sure you want to request pickup for this donation?</DialogDescription>
          </DialogHeader>
          {selectedDonation && (
            <div>
              <p><strong>Food Item:</strong> {selectedDonation.foodItem}</p>
              <p><strong>Quantity:</strong> {selectedDonation.quantity}</p>
              <p><strong>Pickup Location:</strong> {selectedDonation.pickupLocation}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedDonation(null)}>Cancel</Button>
            <Button onClick={confirmPickup}>Confirm Pickup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
        
      </div>
    </SidebarInset>
  </SidebarProvider>
  )
}

export default Ngodonations