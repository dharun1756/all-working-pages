import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, Percent } from "lucide-react";

export default function SaleOrder() {
  return (
    <MainLayout>
      <Tabs defaultValue="sale-orders" className="w-full">
        <TabsList className="w-full justify-center bg-transparent border-b border-border rounded-none h-auto p-0">
          <TabsTrigger
            value="sale-orders"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3 font-medium"
          >
            SALE ORDERS
          </TabsTrigger>
          <TabsTrigger
            value="online-orders"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3 font-medium text-muted-foreground"
          >
            ONLINE ORDERS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sale-orders" className="mt-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="empty-state">
                <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                  <div className="relative">
                    <FileText className="w-10 h-10 text-muted-foreground" />
                    <div className="absolute -right-2 -bottom-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <Percent className="w-3 h-3 text-accent-foreground" />
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Make & share sale orders & convert them to sale invoice instantly.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Add Your First Sale Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="online-orders">
          <div className="empty-state">
            <p className="text-muted-foreground">No online orders yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
