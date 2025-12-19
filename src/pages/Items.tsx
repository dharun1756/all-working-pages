import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreVertical, Filter, AlertTriangle, SlidersHorizontal, Plus, FileText } from "lucide-react";
import { useState } from "react";
import { useItems, useAddItem, useCategories, useUnits, Item } from "@/hooks/useItems";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Items() {
  const { data: items = [], isLoading } = useItems();
  const { data: units = [] } = useUnits();
  const addItem = useAddItem();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    item_type: "product" as const,
    unit: "Pcs",
    sale_price: 0,
    purchase_price: 0,
    stock_quantity: 0,
    low_stock_alert: 0,
    hsn_code: "",
    tax_rate: 0,
  });

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = async () => {
    if (!newItem.name.trim()) return;
    await addItem.mutateAsync(newItem);
    setNewItem({
      name: "",
      item_type: "product",
      unit: "Pcs",
      sale_price: 0,
      purchase_price: 0,
      stock_quantity: 0,
      low_stock_alert: 0,
      hsn_code: "",
      tax_rate: 0,
    });
    setIsAddDialogOpen(false);
  };

  return (
    <MainLayout>
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0">
          <TabsTrigger
            value="products"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
          >
            PRODUCTS
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
          >
            SERVICES
          </TabsTrigger>
          <TabsTrigger
            value="category"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
          >
            CATEGORY
          </TabsTrigger>
          <TabsTrigger
            value="units"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
          >
            UNITS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-4">
          <div className="grid grid-cols-12 gap-4">
            {/* Items List */}
            <div className="col-span-4">
              <Card>
                <CardContent className="p-0">
                  <div className="p-3 border-b border-border flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search items..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Plus className="w-4 h-4 mr-1" /> Add Item
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Item</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Item Name *</Label>
                            <Input
                              value={newItem.name}
                              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                              placeholder="Enter item name"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Sale Price</Label>
                              <Input
                                type="number"
                                value={newItem.sale_price}
                                onChange={(e) => setNewItem({ ...newItem, sale_price: Number(e.target.value) })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Purchase Price</Label>
                              <Input
                                type="number"
                                value={newItem.purchase_price}
                                onChange={(e) => setNewItem({ ...newItem, purchase_price: Number(e.target.value) })}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Stock Quantity</Label>
                              <Input
                                type="number"
                                value={newItem.stock_quantity}
                                onChange={(e) => setNewItem({ ...newItem, stock_quantity: Number(e.target.value) })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Unit</Label>
                              <Select
                                value={newItem.unit}
                                onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {units.map((unit) => (
                                    <SelectItem key={unit.id} value={unit.short_name || unit.name}>
                                      {unit.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>HSN Code</Label>
                            <Input
                              value={newItem.hsn_code}
                              onChange={(e) => setNewItem({ ...newItem, hsn_code: e.target.value })}
                              placeholder="Enter HSN code"
                            />
                          </div>
                          <Button onClick={handleAddItem} disabled={addItem.isPending} className="w-full">
                            {addItem.isPending ? "Adding..." : "Add Item"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="border-b border-border">
                    <div className="grid grid-cols-2 text-sm font-medium text-muted-foreground px-4 py-2">
                      <div className="flex items-center gap-1">
                        ITEM <Filter className="w-3 h-3" />
                      </div>
                      <div className="text-right">QUANTITY</div>
                    </div>
                  </div>
                  <div className="max-h-[500px] overflow-y-auto">
                    {isLoading ? (
                      <div className="p-4 text-center text-muted-foreground">Loading...</div>
                    ) : filteredItems.length === 0 ? (
                      <div className="p-8 text-center">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No items found</p>
                        <p className="text-sm text-muted-foreground">Add your first item to get started</p>
                      </div>
                    ) : (
                      filteredItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition-colors border-l-2 ${
                            selectedItem?.id === item.id
                              ? "bg-muted border-primary"
                              : "border-transparent"
                          }`}
                        >
                          <span className="truncate">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={Number(item.stock_quantity) > 0 ? "text-secondary" : Number(item.stock_quantity) < 0 ? "text-primary" : "text-muted-foreground"}>
                              {Number(item.stock_quantity).toFixed(2)}
                            </span>
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Item Details */}
            <div className="col-span-8">
              <Card>
                <CardContent className="p-4">
                  {selectedItem ? (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-lg font-semibold">{selectedItem.name}</h2>
                          <div className="flex gap-8 mt-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">SALE PRICE:</span>
                              <span className="ml-1 text-secondary">₹ {Number(selectedItem.sale_price).toFixed(2)}</span>
                              <span className="text-muted-foreground"> (excl)</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">PURCHASE PRICE:</span>
                              <span className="ml-1 text-secondary">₹ {Number(selectedItem.purchase_price).toFixed(2)}</span>
                              <span className="text-muted-foreground"> (excl)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button variant="outline" className="mb-2">
                            <SlidersHorizontal className="w-4 h-4 mr-2" />
                            ADJUST ITEM
                          </Button>
                          <div className="text-sm">
                            <div className={`flex items-center gap-1 ${Number(selectedItem.stock_quantity) <= 0 ? 'text-primary' : 'text-secondary'}`}>
                              {Number(selectedItem.stock_quantity) <= 0 && <AlertTriangle className="w-3 h-3" />}
                              STOCK QUANTITY: {Number(selectedItem.stock_quantity).toFixed(2)} {selectedItem.unit}
                            </div>
                            <p className="text-muted-foreground">
                              STOCK VALUE: ₹ {(Number(selectedItem.stock_quantity) * Number(selectedItem.purchase_price)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">TRANSACTIONS</h3>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Search className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>TYPE <Filter className="w-3 h-3 inline ml-1" /></th>
                              <th>INVOICE/REF.. <Filter className="w-3 h-3 inline ml-1" /></th>
                              <th>NAME</th>
                              <th>DATE <Filter className="w-3 h-3 inline ml-1" /></th>
                              <th>QUANTITY <Filter className="w-3 h-3 inline ml-1" /></th>
                              <th>PRICE/UNIT <Filter className="w-3 h-3 inline ml-1" /></th>
                              <th>STATUS <Filter className="w-3 h-3 inline ml-1" /></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={7}>
                                <div className="empty-state py-12">
                                  <FileText className="w-12 h-12 text-muted-foreground mb-2" />
                                  <p className="font-medium">No Transactions</p>
                                  <p className="text-sm text-muted-foreground">Create a sale or purchase to see transactions here</p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="empty-state py-20">
                      <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                      <p className="font-medium">Select an item to view details</p>
                      <p className="text-sm text-muted-foreground">Click on an item from the list to see its information</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <div className="empty-state py-20">
            <FileText className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No services added yet</p>
            <Button className="mt-4">+ Add Service</Button>
          </div>
        </TabsContent>

        <TabsContent value="category">
          <div className="empty-state py-20">
            <FileText className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No categories added yet</p>
            <Button className="mt-4">+ Add Category</Button>
          </div>
        </TabsContent>

        <TabsContent value="units">
          <div className="p-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Available Units</h3>
                <div className="grid grid-cols-4 gap-4">
                  {units.map((unit) => (
                    <div key={unit.id} className="p-3 border rounded-lg">
                      <p className="font-medium">{unit.name}</p>
                      <p className="text-sm text-muted-foreground">{unit.short_name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
