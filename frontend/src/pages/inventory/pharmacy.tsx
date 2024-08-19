import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CartesianGrid, XAxis, Line, LineChart, Pie, PieChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { PlusIcon } from "@heroicons/react/24/outline" // Adjust import path as necessary

interface InventoryItem {
  id: number
  name: string
  category: string
  quantity: number
  price: number
  inStock: boolean
  reorderLevel: number
  lastOrderDate: string
  expiryDate: string
}

interface NewItem {
  name: string
  category: string
  quantity: number
  price: number
  inStock: boolean
  reorderLevel: number
  lastOrderDate: string
  expiryDate: string
}

export const Pharmacy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Widget A",
      category: "Industrial",
      quantity: 50,
      price: 19.99,
      inStock: true,
      reorderLevel: 20,
      lastOrderDate: "2023-07-15",
      expiryDate: "2024-12-31",
    },
    {
      id: 2,
      name: "Gadget B",
      category: "Consumer",
      quantity: 25,
      price: 9.99,
      inStock: true,
      reorderLevel: 10,
      lastOrderDate: "2023-08-01",
      expiryDate: "2025-03-31",
    },
    {
      id: 3,
      name: "Doohickey C",
      category: "Professional",
      quantity: 10,
      price: 49.99,
      inStock: false,
      reorderLevel: 5,
      lastOrderDate: "2023-06-20",
      expiryDate: "2024-06-30",
    },
    {
      id: 4,
      name: "Thingamajig D",
      category: "Home",
      quantity: 75,
      price: 14.99,
      inStock: true,
      reorderLevel: 30,
      lastOrderDate: "2023-09-01",
      expiryDate: "2025-09-30",
    },
    {
      id: 5,
      name: "Whatchamacallit E",
      category: "Specialty",
      quantity: 5,
      price: 99.99,
      inStock: false,
      reorderLevel: 2,
      lastOrderDate: "2023-05-01",
      expiryDate: "2024-03-31",
    },
  ])
  const [showPharmacy, setShowPharmacy] = useState<boolean>(false)
  const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [newCategory, setNewCategory] = useState<string>("")
  const [newItem, setNewItem] = useState<NewItem>({
    name: "",
    category: "Medicine",
    quantity: 0,
    price: 0,
    inStock: true,
    reorderLevel: 0,
    lastOrderDate: "2023-01-01",
    expiryDate: "2024-01-01",
  })

  const filteredInventory = useMemo(() => {
    if (showPharmacy) {
      return inventory.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.category === "Specialty",
      )
    } else {
      return inventory.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
  }, [inventory, searchTerm, showPharmacy])

  const totalItems = inventory.length
  const availableItems = inventory.filter((item) => item.inStock).length
  const outOfStockItems = inventory.filter((item) => !item.inStock).length
  const subStoreAvailableItems = filteredInventory.filter((item) => item.inStock).length
  const subStoreOutOfStockItems = filteredInventory.filter((item) => !item.inStock).length

  const handleAddItem = () => {
    setInventory([
      ...inventory,
      {
        id: inventory.length + 1,
        name: newItem.name,
        category: newItem.category,
        quantity: newItem.quantity,
        price: newItem.price,
        inStock: true,
        reorderLevel: newItem.reorderLevel,
        lastOrderDate: newItem.lastOrderDate,
        expiryDate: newItem.expiryDate,
      },
    ])
    setNewItem({
      name: "",
      category: "Medicine",
      quantity: 0,
      price: 0,
      inStock: true,
      reorderLevel: 0,
      lastOrderDate: "2023-01-01",
      expiryDate: "2024-01-01",
    })
    setShowCategoryForm(false)
  }

  const handleCategorySelect = (category: string) => {
    setNewItem({ ...newItem, category })
  }

  const [showPieChart, setShowPieChart] = useState<boolean>(false)
  const [pieChartData, setPieChartData] = useState<{ name: string; value: number }[]>([])

  const handleItemClick = (item: InventoryItem) => {
    setSelectedItem(item)
    setShowPieChart(true)
    setPieChartData([
      { name: "In Stock", value: item.inStock ? item.quantity : 0 },
      { name: "Out of Stock", value: item.inStock ? 0 : item.quantity },
    ])
  }

  return (
    <div className="flex h-screen">
      <div className="bg-background border-r w-64 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Navigation</h2>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${showPharmacy ? "bg-muted" : ""}`}
            onClick={() => {
              setShowPharmacy(true)
              setShowCategoryForm(false)
            }}
          >
            
            Pharmacy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${showCategoryForm ? "bg-muted" : ""}`}
            onClick={() => {
              setShowPharmacy(false)
              setShowCategoryForm(true)
            }}
          >
            <PlusIcon className="w-4 h-4" />
            Add Item
          </Button>
        </div>
      </div>
      <div className="flex-1 p-6">
        {showCategoryForm ? (
          <div className="bg-background rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddItem()
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => handleCategorySelect(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medicine">Medicine</SelectItem>
                      <SelectItem value="Surgical Tools">Surgical Tools</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reorderLevel">Reorder Level</Label>
                  <Input
                    id="reorderLevel"
                    type="number"
                    placeholder="Enter reorder level"
                    value={newItem.reorderLevel}
                    onChange={(e) => setNewItem({ ...newItem, reorderLevel: parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastOrderDate">Last Order Date</Label>
                  <Input
                    id="lastOrderDate"
                    type="date"
                    value={newItem.lastOrderDate}
                    onChange={(e) => setNewItem({ ...newItem, lastOrderDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                  />
                </div>
                <Button type="submit" >Add Item</Button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="bg-background rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Inventory</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>In Stock</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Last Order Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id} onClick={() => handleItemClick(item)}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge>
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.reorderLevel}</TableCell>
                      <TableCell>{item.lastOrderDate}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {showPieChart && selectedItem && (
              <Card>
                <CardContent>
                  <h2 className="text-xl font-bold mb-4">Item Analysis</h2>
                  
                    <PieChart width={400} height={400}>
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="name" />
                      <Pie  data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
            
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}