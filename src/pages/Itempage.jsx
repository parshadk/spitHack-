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
  import { useState, useEffect } from 'react'
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
  import { useToast } from "@/hooks/use-toast"
  import { Calendar as CalendarIcon, Trash2, Bell, BellOff } from "lucide-react"
  import { format, differenceInDays } from "date-fns"
  import { Calendar } from "@/components/ui/calendar"
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  import { Switch } from "@/components/ui/switch"
  import { Badge } from "@/components/ui/badge"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  
function Itempage() {
    const [foodItems, setFoodItems] = useState([])
    const [newItem, setNewItem] = useState({
        name: '',
        category: 'Other',
        quantity: 1,
        unit: 'piece',
        alertEnabled: true,
    })
    const { toast } = useToast()

    useEffect(() => {
        checkExpiringItems()
        const interval = setInterval(checkExpiringItems, 86400000)
        return () => clearInterval(interval)
    }, [foodItems])

    const checkExpiringItems = () => {
        const today = new Date()
        foodItems.forEach(item => {
            if (item.alertEnabled) {
                const daysUntilExpiry = differenceInDays(item.expiryDate, today)
                if (daysUntilExpiry <= 3 && daysUntilExpiry >= 0) {
                    toast({
                        title: "Food Item Expiring Soon!",
                        description: `${item.name} will expire in ${daysUntilExpiry} days.`,
                        duration: 5000,
                    })
                }
            }
        })
    }

    const handleAddItem = (e) => {
        e.preventDefault()
        if (newItem.name && newItem.expiryDate) {
            const foodItem = {
                id: Date.now(),
                name: newItem.name,
                category: newItem.category,
                quantity: newItem.quantity,
                unit: newItem.unit,
                expiryDate: newItem.expiryDate,
                alertEnabled: newItem.alertEnabled,
            }
            setFoodItems([...foodItems, foodItem])
            setNewItem({
                name: '',
                category: 'Other',
                quantity: 1,
                unit: 'piece',
                alertEnabled: true,
            })
            toast({
                title: "Food item added",
                description: `${foodItem.name} has been added to your inventory.`,
            })
        }
    }

    const handleDeleteItem = (id) => {
        setFoodItems(foodItems.filter(item => item.id !== id))
        toast({
            title: "Food item removed",
            description: "The item has been removed from your inventory.",
            variant: "destructive",
        })
    }

    const toggleAlert = (id) => {
        setFoodItems(foodItems.map(item =>
            item.id === id ? { ...item, alertEnabled: !item.alertEnabled } : item
        ))
    }

    const getExpiryStatus = (expiryDate) => {
        const daysUntilExpiry = differenceInDays(expiryDate, new Date())
        if (daysUntilExpiry < 0) return 'expired'
        if (daysUntilExpiry <= 3) return 'expiring-soon'
        return 'fresh'
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
                  Items
                </BreadcrumbLink>
              </BreadcrumbItem>
             

            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      
      <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Food Inventory Manager</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Add New Food Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddItem} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="itemName">Food Item Name</Label>
                                <Input
                                    id="itemName"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    placeholder="Enter food item name"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Select onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" required/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Fruits & Vegetables">Fruits & Vegetables</SelectItem>
                                        <SelectItem value="Dairy">Dairy</SelectItem>
                                        <SelectItem value="Meat">Meat</SelectItem>
                                        <SelectItem value="Grains">Grains</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={newItem.quantity}
                                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                                    min="1"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="unit">Unit</Label>
                                <Input
                                    id="unit"
                                    value={newItem.unit}
                                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                                    placeholder="e.g., piece, kg, liter"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={`w-full justify-start text-left font-normal ${!newItem.expiryDate && "text-muted-foreground"}`}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {newItem.expiryDate ? format(newItem.expiryDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={newItem.expiryDate}
                                            onSelect={(date) => setNewItem({ ...newItem, expiryDate: date })}
                                            initialFocus
                                            required
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="alert-mode"
                                    checked={newItem.alertEnabled}
                                    onCheckedChange={(checked) => setNewItem({ ...newItem, alertEnabled: checked })}
                                />
                                <Label htmlFor="alert-mode">Enable expiry alerts</Label>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">Add Food Item</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Food Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Food Item</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Expiry Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Alerts</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {foodItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{`${item.quantity} ${item.unit}`}</TableCell>
                                    <TableCell>{format(item.expiryDate, "PPP")}</TableCell>
                                    <TableCell>
                                        <Badge variant={getExpiryStatus(item.expiryDate) === 'expired' ? "destructive" : getExpiryStatus(item.expiryDate) === 'expiring-soon' ? "secondary" : "default"}>
                                            {getExpiryStatus(item.expiryDate) === 'expired' ? 'Expired' :
                                                getExpiryStatus(item.expiryDate) === 'expiring-soon' ? 'Expiring Soon' : 'Fresh'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleAlert(item.id)}
                                        >
                                            {item.alertEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                                            <span className="sr-only">{item.alertEnabled ? 'Disable alerts' : 'Enable alerts'}</span>
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
  )
}

export default Itempage