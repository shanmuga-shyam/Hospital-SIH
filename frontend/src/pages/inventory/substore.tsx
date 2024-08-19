import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Pie, PieChart, Tooltip as ChartTooltip } from "recharts";

// Icons (Make sure to replace these with actual imports or your icon components)
function InboxIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) { return <svg {...props}>/* SVG Path */</svg>; }
function PillBottleIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) { return <svg {...props}>/* SVG Path */</svg>; }
function WandIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) { return <svg {...props}>/* SVG Path */</svg>; }
function PlusIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) { return <svg {...props}>/* SVG Path */</svg>; }

export function Substore() {
  // State and Inventory Management
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState([
    { id: 1, name: "Item A", category: "Medicine", quantity: 50, price: 10, inStock: true, reorderLevel: 10, lastOrderDate: "2023-01-01", expiryDate: "2024-01-01" },
    { id: 2, name: "Item B", category: "Surgical Tools", quantity: 0, price: 20, inStock: false, reorderLevel: 5, lastOrderDate: "2023-02-01", expiryDate: "2024-02-01" },
  ]);
  const [showMainStore, setShowMainStore] = useState(false);
  const [showPharmacy, setShowPharmacy] = useState(false);
  const [showWard, setShowWard] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Medicine",
    quantity: 0,
    price: 0,
    inStock: true,
    reorderLevel: 0,
    lastOrderDate: "2023-01-01",
    expiryDate: "2024-01-01",
  });

  const filteredInventory = useMemo(() => {
    return inventory.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (showPharmacy ? item.category === "Pharmacy" : true) &&
      (showWard ? item.category === "Ward" : true)
    );
  }, [inventory, searchTerm, showPharmacy, showWard]);

  const totalItems = inventory.length;
  const availableItems = inventory.filter(item => item.inStock).length;
  const outOfStockItems = inventory.filter(item => !item.inStock).length;

  const handleAddItem = () => {
    setInventory([
      ...inventory,
      { id: inventory.length + 1, ...newItem },
    ]);
    setNewItem({
      name: "",
      category: "Medicine",
      quantity: 0,
      price: 0,
      inStock: true,
      reorderLevel: 0,
      lastOrderDate: "2023-01-01",
      expiryDate: "2024-01-01",
    });
    setShowCategoryForm(false);
  };

  const handleCategorySelect = (category: string) => {
    setNewItem({ ...newItem, category });
  };

  const [showPieChart, setShowPieChart] = useState(false);
  const [pieChartData, setPieChartData] = useState<{ name: string; value: number }[]>([]);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setShowPieChart(true);
    setPieChartData([
      { name: "In Stock", value: item.inStock ? item.quantity : 0 },
      { name: "Out of Stock", value: item.inStock ? 0 : item.quantity },
    ]);
  };

  return (
    <div className="flex h-screen">
      <div className="bg-background border-r w-64 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Navigation</h2>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${!showMainStore && !showPharmacy && !showWard ? "bg-muted" : ""}`}
            onClick={() => {
              setShowMainStore(false);
              setShowPharmacy(false);
              setShowWard(false);
              setShowCategoryForm(false);
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
              setShowMainStore(false);
              setShowPharmacy(true);
              setShowWard(false);
              setShowCategoryForm(false);
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
              setShowMainStore(false);
              setShowPharmacy(false);
              setShowWard(true);
              setShowCategoryForm(false);
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
              setShowMainStore(false);
              setShowPharmacy(false);
              setShowWard(false);
              setShowCategoryForm(true);
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
                e.preventDefault();
                handleAddItem();
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
                    onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="inStock">In Stock</Label>
                  <Select
                    value={newItem.inStock ? "true" : "false"}
                    onValueChange={(value) => setNewItem({ ...newItem, inStock: value === "true" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reorderLevel">Reorder Level</Label>
                  <Input
                    id="reorderLevel"
                    type="number"
                    placeholder="Enter reorder level"
                    value={newItem.reorderLevel}
                    onChange={(e) => setNewItem({ ...newItem, reorderLevel: Number(e.target.value) })}
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
          <div>
            {/* Search Bar */}
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            {/* Inventory Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-card rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Total Items</h3>
                <p>{totalItems}</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Available Items</h3>
                <p>{availableItems}</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Out of Stock Items</h3>
                <p>{outOfStockItems}</p>
              </div>
            </div>
            {/* Inventory Table */}
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
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.inStock ? "Yes" : "No"}</TableCell>
                    <TableCell>{item.reorderLevel}</TableCell>
                    <TableCell>{item.lastOrderDate}</TableCell>
                    <TableCell>{item.expiryDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Pie Chart */}
            {showPieChart && (
              <Card>
                <CardContent>
                  <div className="flex justify-center">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                      />
                      <ChartTooltip />
                    </PieChart>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
