import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, Phone, MessageCircle, ExternalLink, Filter, Printer, LayoutGrid, FileText, Plus } from "lucide-react";
import { useState } from "react";
import { useParties, useAddParty, Party } from "@/hooks/useParties";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Parties() {
  const { data: parties = [], isLoading } = useParties();
  const addParty = useAddParty();
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newParty, setNewParty] = useState({
    name: "",
    gstin: "",
    phone: "",
    email: "",
    billing_address: "",
    party_type: "customer",
  });

  const filteredParties = parties.filter((party) =>
    party.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddParty = async () => {
    if (!newParty.name.trim()) return;
    await addParty.mutateAsync({
      ...newParty,
      opening_balance: 0,
      balance: 0,
    });
    setNewParty({ name: "", gstin: "", phone: "", email: "", billing_address: "", party_type: "customer" });
    setIsAddDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Parties</h1>
        <div className="flex items-center gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-1" /> Add Party
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Party</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Party Name *</Label>
                  <Input
                    value={newParty.name}
                    onChange={(e) => setNewParty({ ...newParty, name: e.target.value })}
                    placeholder="Enter party name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Party Type</Label>
                  <Select
                    value={newParty.party_type}
                    onValueChange={(value) =>
                      setNewParty({ ...newParty, party_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>GSTIN</Label>
                  <Input
                    value={newParty.gstin}
                    onChange={(e) => setNewParty({ ...newParty, gstin: e.target.value })}
                    placeholder="Enter GSTIN"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={newParty.phone}
                    onChange={(e) => setNewParty({ ...newParty, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={newParty.email}
                    onChange={(e) => setNewParty({ ...newParty, email: e.target.value })}
                    placeholder="Enter email"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Billing Address</Label>
                  <Input
                    value={newParty.billing_address}
                    onChange={(e) => setNewParty({ ...newParty, billing_address: e.target.value })}
                    placeholder="Enter billing address"
                  />
                </div>
                <Button onClick={handleAddParty} disabled={addParty.isPending} className="w-full">
                  {addParty.isPending ? "Adding..." : "Add Party"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
                  <Input
                    placeholder="Search Party Name"
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="border-b border-border">
                <div className="grid grid-cols-2 text-sm font-medium text-muted-foreground px-4 py-2">
                  <div className="flex items-center gap-1">
                    Party Name <Filter className="w-3 h-3" />
                  </div>
                  <div className="text-right">Balance</div>
                </div>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-muted-foreground">Loading...</div>
                ) : filteredParties.length === 0 ? (
                  <div className="p-8 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No parties found</p>
                    <p className="text-sm text-muted-foreground">Add your first party to get started</p>
                  </div>
                ) : (
                  filteredParties.map((party) => (
                    <button
                      key={party.id}
                      onClick={() => setSelectedParty(party)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition-colors border-l-2 ${
                        selectedParty?.id === party.id
                          ? "bg-muted border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <span className="truncate">{party.name}</span>
                      <span className={Number(party.balance) > 0 ? "text-primary" : "text-muted-foreground"}>
                        ₹ {Number(party.balance).toFixed(2)}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Party Details */}
        <div className="col-span-8">
          <Card>
            <CardContent className="p-4">
              {selectedParty ? (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold">{selectedParty.name}</h2>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                      {(selectedParty.gstin || selectedParty.billing_address) && (
                        <div className="flex gap-8 mt-2 text-sm">
                          {selectedParty.gstin && (
                            <div>
                              <span className="text-muted-foreground">GSTIN</span>
                              <p className="font-medium">{selectedParty.gstin}</p>
                            </div>
                          )}
                          {selectedParty.billing_address && (
                            <div>
                              <span className="text-muted-foreground">Billing Address</span>
                              <p className="font-medium">{selectedParty.billing_address}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedParty.phone && (
                        <Button variant="ghost" size="icon" className="text-primary">
                          <Phone className="w-4 h-4" />
                        </Button>
                      )}
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
                          <th>Balance <Filter className="w-3 h-3 inline ml-1" /></th>
                          <th>Status <Filter className="w-3 h-3 inline ml-1" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={6}>
                            <div className="empty-state py-12">
                              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <p className="font-medium">No Transactions to show</p>
                              <p className="text-sm text-muted-foreground">Create a sale or purchase to see transactions here.</p>
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
                  <p className="font-medium">Select a party to view details</p>
                  <p className="text-sm text-muted-foreground">Click on a party from the list to see their information</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
