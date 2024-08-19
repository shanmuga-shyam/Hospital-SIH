import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CartesianGrid, XAxis, Line, LineChart, Pie, PieChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export function mainstore() {
  const [searchTerm, setSearchTerm] = useState("")
  const [inventory, setInventory] = useState([
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
  const [showMainStore, setShowMainStore] = useState(true)
  const [showPharmacy, setShowPharmacy] = useState(false)
  const [showWard, setShowWard] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newCategory, setNewCategory] = useState("")
  const [newItem, setNewItem] = useState({
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
    if (showMainStore) {
      return inventory.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    } else if (showPharmacy) {
      return inventory.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.category === "Specialty",
      )
    } else if (showWard) {
      return inventory.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.quantity < 50,
      )
    } else {
      return inventory.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.quantity < 50,
      )
    }
  }, [inventory, searchTerm, showMainStore, showPharmacy, showWard])
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
  const handleCategorySelect = (category) => {
    setNewItem({ ...newItem, category })
  }
  const [showPieChart, setShowPieChart] = useState(false)
  const [pieChartData, setPieChartData] = useState([])
  const handleItemClick = (item) => {
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
            className={`w-full justify-start gap-2 ${showMainStore ? "bg-muted" : ""}`}
            onClick={() => {
              setShowMainStore(true)
              setShowPharmacy(false)
              setShowWard(false)
              setShowCategoryForm(false)
            }}
          >
            <InboxIcon className="w-4 h-4" />
            Main Store
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${!showMainStore && !showPharmacy && !showWard ? "bg-muted" : ""}`}
            onClick={() => {
              setShowMainStore(false)
              setShowPharmacy(false)
              setShowWard(false)
              setShowCategoryForm(false)
            }}
          >
            <InboxIcon className="w-4 h-4" />
            Sub Store
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${showPharmacy ? "bg-muted" : ""}`}
            onClick={() => {
              setShowMainStore(false)
              setShowPharmacy(true)
              setShowWard(false)
              setShowCategoryForm(false)
            }}
          >
            <PillBottleIcon className="w-4 h-4" />
            Pharmacy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${showWard ? "bg-muted" : ""}`}
            onClick={() => {
              setShowMainStore(false)
              setShowPharmacy(false)
              setShowWard(true)
              setShowCategoryForm(false)
            }}
          >
            <WandIcon className="w-4 h-4" />
            Ward
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${showCategoryForm ? "bg-muted" : ""}`}
            onClick={() => {
              setShowMainStore(false)
              setShowPharmacy(false)
              setShowWard(false)
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
                    id="category"
                    value={newItem.category}
                    onValueChange={(e) => handleCategorySelect(e.target.value)}
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
                <div className="flex justify-end">
                  <Button type="submit">Add Item</Button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-background rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Main Store Inventory</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Total Items</h3>
                <p className="text-4xl font-bold">{filteredInventory.length}</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Available</h3>
                <p className="text-4xl font-bold">{availableItems}</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Out of Stock</h3>
                <p className="text-4xl font-bold">{outOfStockItems}</p>
              </div>
            </div>
            <div className="relative mt-4">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for an item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg bg-card pl-10 pr-4 py-2 text-foreground"
              />
            </div>
            <div className="mt-4">
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
                    <TableRow
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="cursor-pointer hover:bg-muted"
                    >
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {item.inStock ? (
                          <Badge variant="secondary">In Stock</Badge>
                        ) : (
                          <Badge variant="outline">Out of Stock</Badge>
                        )}
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
              <div className="mt-4 max-w-md">
                <h2 className="text-xl font-bold mb-4">{selectedItem.name} - Inventory Analysis</h2>
                <Card>
                  <CardContent>
                    <PiechartcustomChart className="aspect-square w-full" />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function InboxIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  )
}


function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}


function PiechartcustomChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          visitors: {
            label: "Visitors",
          },
          chrome: {
            label: "Chrome",
            color: "hsl(var(--chart-1))",
          },
          safari: {
            label: "Safari",
            color: "hsl(var(--chart-2))",
          },
          firefox: {
            label: "Firefox",
            color: "hsl(var(--chart-3))",
          },
          edge: {
            label: "Edge",
            color: "hsl(var(--chart-4))",
          },
          other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
          },
        }}
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={[
              { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
              { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
              { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
              { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
              { browser: "other", visitors: 90, fill: "var(--color-other)" },
            ]}
            dataKey="visitors"
            nameKey="browser"
          />
        </PieChart>
      </ChartContainer>
    </div>
  )
}


function PillBottleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4" />
      <path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
      <rect width="16" height="5" x="4" y="2" rx="1" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function WandIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 4V2" />
      <path d="M15 16v-2" />
      <path d="M8 9h2" />
      <path d="M20 9h2" />
      <path d="M17.8 11.8 19 13" />
      <path d="M15 9h0" />
      <path d="M17.8 6.2 19 5" />
      <path d="m3 21 9-9" />
      <path d="M12.2 6.2 11 5" />
    </svg>
  )
}
