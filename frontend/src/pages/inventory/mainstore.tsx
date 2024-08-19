import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
// Use react-icons or any other valid icon library
import { FaInbox, FaPills, FaMagic, FaPlus, FaSearch } from "react-icons/fa";

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  inStock: boolean;
  reorderLevel: number;
  lastOrderDate: string;
  expiryDate: string;
};

type PieChartData = {
  name: string;
  value: number;
};

export function MainStore() {
  const [searchTerm, setSearchTerm] = useState("");
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
    // Add more items as needed
  ]);
  const [showMainStore, setShowMainStore] = useState(true);
  const [showPharmacy, setShowPharmacy] = useState(false);
  const [showWard, setShowWard] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState<InventoryItem>({
    id: 0,
    name: "",
    category: "Medicine",
    quantity: 0,
    price: 0,
    inStock: true,
    reorderLevel: 0,
    lastOrderDate: "2023-01-01",
    expiryDate: "2024-01-01",
  });
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
  const [showPieChart, setShowPieChart] = useState(false);

  const filteredInventory = useMemo(() => {
    let filtered = inventory.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (showPharmacy) {
      filtered = filtered.filter((item) => item.category === "Specialty");
    } else if (showWard) {
      filtered = filtered.filter((item) => item.quantity < 50);
    }
    return filtered;
  }, [inventory, searchTerm, showPharmacy, showWard]);

  const totalItems = inventory.length;
  const availableItems = inventory.filter((item) => item.inStock).length;
  const outOfStockItems = inventory.filter((item) => !item.inStock).length;

  const handleAddItem = () => {
    setInventory([...inventory, { ...newItem, id: inventory.length + 1 }]);
    setNewItem({
      id: 0,
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

  // Correctly typing the item parameter as InventoryItem
  const handleItemClick = (item: InventoryItem) => {
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
            className={`w-full justify-start gap-2 ${
              showMainStore ? "bg-muted" : ""
            }`}
            onClick={() => {
              setShowMainStore(true);
              setShowPharmacy(false);
              setShowWard(false);
              setShowCategoryForm(false);
            }}
          >
            <FaInbox className="w-4 h-4" />
            Main Store
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${
              !showMainStore && !showPharmacy && !showWard ? "bg-muted" : ""
            }`}
            onClick={() => {
              setShowMainStore(false);
              setShowPharmacy(false);
              setShowWard(false);
              setShowCategoryForm(false);
            }}
          >
            <FaInbox className="w-4 h-4" />
            Sub Store
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${
              showPharmacy ? "bg-muted" : ""
            }`}
            onClick={() => {
              setShowMainStore(false);
              setShowPharmacy(true);
              setShowWard(false);
              setShowCategoryForm(false);
            }}
          >
            <FaPills className="w-4 h-4" />
            Pharmacy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${
              showWard ? "bg-muted" : ""
            }`}
            onClick={() => {
              setShowMainStore(false);
              setShowPharmacy(false);
              setShowWard(true);
              setShowCategoryForm(false);
            }}
          >
            <FaMagic className="w-4 h-4" />
            Ward
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${
              showCategoryForm ? "bg-muted" : ""
            }`}
            onClick={() => {
              setShowMainStore(false);
              setShowPharmacy(false);
              setShowWard(false);
              setShowCategoryForm(true);
            }}
          >
            <FaPlus className="w-4 h-4" />
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
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medicine">Medicine</SelectItem>
                      <SelectItem value="Medical Equipment">
                        Medical Equipment
                      </SelectItem>
                      <SelectItem value="Laboratory Supplies">
                        Laboratory Supplies
                      </SelectItem>
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
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        quantity: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reorderLevel">Reorder Level</Label>
                  <Input
                    id="reorderLevel"
                    type="number"
                    placeholder="Enter reorder level"
                    value={newItem.reorderLevel}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        reorderLevel: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastOrderDate">Last Order Date</Label>
                  <Input
                    id="lastOrderDate"
                    type="date"
                    value={newItem.lastOrderDate}
                    onChange={(e) =>
                      setNewItem({ ...newItem, lastOrderDate: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) =>
                      setNewItem({ ...newItem, expiryDate: e.target.value })
                    }
                  />
                </div>
                <Button type="submit">Add Item</Button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Inventory</h2>
              <Input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>In Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {item.inStock ? (
                        <Badge>Yes</Badge>
                      ) : (
                        <Badge variant="destructive">No</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {showPieChart && selectedItem && (
              <Card className="mt-6">
                <CardContent>
                  <h3 className="text-lg font-bold mb-4">
                    {selectedItem.name} Stock Analysis
                  </h3>
                  <PieChart width={300} height={300}>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
                      <Cell key="inStock" fill="#4caf50" />
                      <Cell key="outOfStock" fill="#f44336" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
