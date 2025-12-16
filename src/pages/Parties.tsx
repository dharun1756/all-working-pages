import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, Phone, MessageCircle, ExternalLink, Filter, Printer, LayoutGrid, FileText } from "lucide-react";
import { useState } from "react";

const parties = [
  { name: "SHREE RANGA POLYSTER PVT L...", amount: 0, gstin: "33ABNCS7918N1ZK", address: "2/93 K KULLAMPATTI VILLAGE Kakkavadi Karur, Tamil Nadu-639003 India" },
  { name: "PLANET CLOTHING", amount: 0 },
  { name: "SHREE RENGA POLYESTER PVT ...", amount: 0 },
  { name: "SRI KRISHNA TEXTILE", amount: 7684.00 },
  { name: "SHREE RENGA POLYSTER PVT L...", amount: 0 },
  { name: "Vadivelu", amount: 34542.00 },
  { name: "AKRON INDUSTRIES", amount: 0 },
  { name: "TRICHY GOVIND", amount: 0 },
  { name: "TIRUMALAI TEXTILES", amount: 0 },
  { name: "PICO CLOTHING COMPANY", amount: 0 },
];

export default function Parties() {
  const [selectedParty, setSelectedParty] = useState(parties[0]);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Parties</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-primary hover:bg-primary/90">
            + Add Party
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Party List */}
        <div className="col-span-4">
          <Card>
            <CardContent className="p-0">
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search Party Name" className="pl-9" />
                </div>
              </div>
              <div className="border-b border-border">
                <div className="grid grid-cols-2 text-sm font-medium text-muted-foreground px-4 py-2">
                  <div className="flex items-center gap-1">
                    Party Name <Filter className="w-3 h-3" />
                  </div>
                  <div className="text-right">Amount</div>
                </div>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                {parties.map((party, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedParty(party)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition-colors border-l-2 ${
                      selectedParty.name === party.name
                        ? "bg-muted border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <span className="truncate">{party.name}</span>
                    <span className={party.amount > 0 ? "text-primary" : "text-muted-foreground"}>
                      {party.amount.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-border bg-accent/10">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>Easily convert your <strong>Phone contacts</strong> into parties</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Party Details */}
        <div className="col-span-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{selectedParty.name}</h2>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                  {selectedParty.gstin && (
                    <div className="flex gap-8 mt-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">GSTIN</span>
                        <p className="font-medium">{selectedParty.gstin}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Billing Address</span>
                        <p className="font-medium">{selectedParty.address}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-primary">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-success">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Transactions</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Search className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Printer className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Type <Filter className="w-3 h-3 inline ml-1" /></th>
                      <th>Number <Filter className="w-3 h-3 inline ml-1" /></th>
                      <th>Date <Filter className="w-3 h-3 inline ml-1" /></th>
                      <th>Total <Filter className="w-3 h-3 inline ml-1" /></th>
                      <th>Balance/Unused <Filter className="w-3 h-3 inline ml-1" /></th>
                      <th>Due Date <Filter className="w-3 h-3 inline ml-1" /></th>
                      <th>Status <Filter className="w-3 h-3 inline ml-1" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7}>
                        <div className="empty-state py-12">
                          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="font-medium">No Transactions to show</p>
                          <p className="text-sm text-muted-foreground">You haven't added any transactions yet.</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
