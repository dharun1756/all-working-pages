import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, FileText, CheckCircle } from "lucide-react";

export default function DeliveryChallan() {
  return (
    <MainLayout>
      <div className="text-center text-muted-foreground uppercase tracking-wider mb-8">
        DELIVERY CHALLAN
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="empty-state">
            <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center mb-6 relative">
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-l-2 border-b-2 border-muted-foreground transform -rotate-45"></div>
              </div>
              <div className="relative">
                <FileText className="w-12 h-12 text-muted-foreground absolute -top-2 -left-4" />
                <div className="w-16 h-12 bg-success rounded flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success-foreground" />
                </div>
                <Truck className="w-14 h-10 text-accent absolute -bottom-2 -right-6" />
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Make & share delivery challan with your customers & convert it to sale whenever you want.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Add Your First Delivery Challan
            </Button>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
