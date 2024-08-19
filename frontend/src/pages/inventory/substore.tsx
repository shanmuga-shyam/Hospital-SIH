import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CartesianGrid, XAxis, Line, LineChart, Pie, PieChart, Tooltip } from "recharts";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  inStock: boolean;
  reorderLevel: number;
  lastOrderDate: string;
  expiryDate: string;
}

export function Substore() {
  const [searchTerm, setSearchTerm] = useState<string>("");
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
      name: "Whatcham E",
      category: "Specialty",
      quantity: 5,
      price: 99.99,
      inStock: false,
      reorderLevel: 2,
      lastOrderDate: "2023-05-01",
      expiryDate: "2024-03-31",
    },
  ]);
  const [showPharmacy, setShowPharmacy] = useState<boolean>(false);
  const [showWard, setShowWard] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const filteredInventory = useMemo(() => {
    if (showPharmacy) {
      return inventory.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.category === "Specialty"
      );
    } else if (showWard) {
      return inventory.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.quantity < 50
      );
    } else {
      return inventory.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.quantity < 50
      );
    }
  }, [inventory, searchTerm, showPharmacy, showWard]);

  const subStoreAvailableItems = filteredInventory.filter((item) => item.inStock).length;
  const subStoreOutOfStockItems = filteredInventory.filter((item) => !item.inStock).length;

  return (
    <div className="flex h-screen">
      <div className="bg-background border-r w-64 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Navigation</h2>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${!showPharmacy && !showWard ? "bg-muted" : ""}`}
            onClick={() => {
              setShowPharmacy(false);
              setShowWard(false);
            }}
          >
            Sub Store
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${showPharmacy ? "bg-muted" : ""}`}
            onClick={() => {
              setShowPharmacy(true);
              setShowWard(false);
            }}
          >
            Pharmacy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${showWard ? "bg-muted" : ""}`}
            onClick={() => {
              setShowPharmacy(false);
              setShowWard(true);
            }}
          >
            Ward
          </Button>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {(showPharmacy || showWard || (!showPharmacy && !showWard)) && (
          <div className="bg-background rounded-lg shadow-md p-6 flex-1">
            <h2 className="text-xl font-bold mb-4">
              {showPharmacy ? "Pharmacy" : showWard ? "Ward" : "Sub Store"} Inventory
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Total Items</h3>
                <p className="text-4xl font-bold">{filteredInventory.length}</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Available</h3>
                <p className="text-4xl font-bold">{subStoreAvailableItems}</p>
              </div>
              <div className="bg-card rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">Out of Stock</h3>
                <p className="text-4xl font-bold">{subStoreOutOfStockItems}</p>
              </div>
            </div>
            <div className="relative mt-4">
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
                      onClick={() => setSelectedItem(item)}
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
          </div>
        )}
        {selectedItem && (
          <div className="bg-background rounded-lg shadow-md p-6 flex-1">
            <h2 className="text-xl font-bold mb-4">{selectedItem.name} Inventory Analysis</h2>
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="bg-card rounded-lg p-4 flex-1">
                <h3 className="text-lg font-bold mb-2">{selectedItem.name}</h3>
                <div className="text-muted-foreground text-sm">
                  <p>Category: {selectedItem.category}</p>
                  <p>Quantity: {selectedItem.quantity}</p>
                  <p>Price: ${selectedItem.price.toFixed(2)}</p>
                  <p>In Stock: {selectedItem.inStock ? "Yes" : "No"}</p>
                  <p>Reorder Level: {selectedItem.reorderLevel}</p>
                  <p>Last Order Date: {selectedItem.lastOrderDate}</p>
                  <p>Expiry Date: {selectedItem.expiryDate}</p>
                </div>
              </div>
              
              <div className="flex-1">
                <PieChart width={200} height={200}>
                  <Pie
                    dataKey="quantity"
                    data={filteredInventory}
                    cx={100}
                    cy={100}
                    outerRadius={80}
                    fill="#8884d8"
                  />
                  <Tooltip content={<TooltipContent />} />
                </PieChart>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TooltipContent({ payload, label }: any) {
  if (payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-gray-300 rounded">
        <p className="font-bold">{label}</p>
        <p>Quantity: {payload[0].value}</p>
      </div>
    );
  }
  return null;
}
