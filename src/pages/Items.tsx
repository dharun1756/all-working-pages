import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreVertical, Filter, AlertTriangle, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const items = [
  { name: "20's COTTON HOSIERY Y...", quantity: 0, salePrice: 180, purchasePrice: 160 },
  { name: "CHARCOL MELANGE", quantity: 0 },
  { name: "Collar Size: 16.5/3 inch C...", quantity: 0 },
  { name: "COTTON COLLAR AND C...", quantity: -0.15 },
  { name: "HOSIERY FABRIC AIRTEX", quantity: 83091.08 },
  { name: "KNITTED CLOTH POLO", quantity: 4389.74 },
  { name: "POLO KNIT", quantity: 476.75 },
  { name: "POLO KNIT (Full Dull)", quantity: 0 },
  { name: "POLO T - SHIRT", quantity: 909 },
  { name: "POLYSTER COLLAR", quantity: 0 },
  { name: "POLYSTER COLLAR & CU...", quantity: 0 },
  { name: "POLYSTER COLLAR AND ...", quantity: -5.5 },
  { name: "POLYSTER CUFF", quantity: 0 },
  { name: "POLYSTER MARS", quantity: 4767 },
];

const transactions = [
  { type: "Purchase Order", invoiceRef: "1", name: "TIRUMALAI TEXTILES", date: "04/09/2025, 03:...", quantity: "1200 Kg", priceUnit: "₹ 160.00", status: "Unpaid" },
];

export default function Items() {
  const [selectedItem, setSelectedItem] = useState(items[0]);

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
                    <Button variant="ghost" size="icon">
                      <Search className="w-4 h-4" />
                    </Button>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      + Add Item
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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
                    {items.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedItem(item)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition-colors border-l-2 ${
                          selectedItem.name === item.name
                            ? "bg-muted border-primary"
                            : "border-transparent"
                        }`}
                      >
                        <span className="truncate">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={item.quantity > 0 ? "text-secondary" : item.quantity < 0 ? "text-primary" : "text-muted-foreground"}>
                            {item.quantity}
                          </span>
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Item Details */}
            <div className="col-span-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold">20'S COTTON HOSIERY YARN</h2>
                      <div className="flex gap-8 mt-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">SALE PRICE:</span>
                          <span className="ml-1 text-secondary">₹ 180.00</span>
                          <span className="text-muted-foreground"> (excl)</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">PURCHASE PRICE:</span>
                          <span className="ml-1 text-secondary">₹ 160.00</span>
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
                        <div className="flex items-center gap-1 text-primary">
                          <AlertTriangle className="w-3 h-3" />
                          STOCK QUANTITY: 0
                        </div>
                        <p className="text-muted-foreground">STOCK VALUE: ₹ 0.00</p>
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
                        {transactions.map((txn, index) => (
                          <tr key={index}>
                            <td>{txn.type}</td>
                            <td>{txn.invoiceRef}</td>
                            <td>{txn.name}</td>
                            <td>{txn.date}</td>
                            <td>{txn.quantity}</td>
                            <td>{txn.priceUnit}</td>
                            <td className="text-muted-foreground">{txn.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <div className="empty-state">
            <p className="text-muted-foreground">No services added yet</p>
          </div>
        </TabsContent>

        <TabsContent value="category">
          <div className="empty-state">
            <p className="text-muted-foreground">No categories added yet</p>
          </div>
        </TabsContent>

        <TabsContent value="units">
          <div className="empty-state">
            <p className="text-muted-foreground">No units added yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
