import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, Phone, MessageCircle, ExternalLink, Filter, Printer, LayoutGrid, FileText, Plus, Info, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import type { Party } from "@/hooks/useParties";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast";
import { mockParties } from "@/data/mockParties";


export default function Parties() {
  const [parties, setParties] = useState<Party[]>(mockParties);
  const isLoading = false;
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("gst-address");
  const [showDetailedAddress, setShowDetailedAddress] = useState(false);
  const [enableShippingAddress, setEnableShippingAddress] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newParty, setNewParty] = useState({
    name: "",
    gstin: "",
    phone: "",
    email: "",
    billing_address: "",
    billing_address_line1: "",
    billing_address_line2: "",
    billing_city: "",
    billing_state: "",
    billing_pincode: "",
    shipping_address: "",
    shipping_address_line1: "",
    shipping_address_line2: "",
    shipping_city: "",
    shipping_state: "",
    shipping_pincode: "",
    gst_type: "unregistered",
    state: "",
    party_type: "customer",
  });

  const filteredParties = parties.filter((party) =>
    party.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddParty = async (saveAndNew = false) => {
    if (!newParty.name.trim()) return;

    try {
      setIsSaving(true);
      const now = new Date().toISOString();
      const billing_address =
        newParty.billing_address ||
        `${newParty.billing_address_line1} ${newParty.billing_address_line2} ${newParty.billing_city} ${newParty.billing_state} ${newParty.billing_pincode}`.trim();

      const created: Party = {
        id: `p_${Math.random().toString(16).slice(2)}`,
        name: newParty.name,
        gstin: newParty.gstin,
        phone: newParty.phone,
        email: newParty.email,
        billing_address,
        shipping_address: enableShippingAddress ? newParty.shipping_address : "",
        party_type: newParty.party_type,
        opening_balance: 0,
        balance: 0,
        created_at: now,
        updated_at: now,
      };

      setParties((prev) => [created, ...prev]);
      setSelectedParty(created);
      toast({ title: "Party added (mock)" });

      if (!saveAndNew) {
      setNewParty({ 
        name: "", 
        gstin: "", 
        phone: "", 
        email: "", 
        billing_address: "",
        billing_address_line1: "",
        billing_address_line2: "",
        billing_city: "",
        billing_state: "",
        billing_pincode: "",
        shipping_address: "",
        shipping_address_line1: "",
        shipping_address_line2: "",
        shipping_city: "",
        shipping_state: "",
        shipping_pincode: "",
        gst_type: "unregistered",
        state: "",
        party_type: "customer",
      });
      setIsAddDialogOpen(false);
      setShowDetailedAddress(false);
      setEnableShippingAddress(false);
      setActiveTab("gst-address");
    } else {
      // Reset form but keep dialog open
      setNewParty({ 
        name: "", 
        gstin: "", 
        phone: "", 
        email: "", 
        billing_address: "",
        billing_address_line1: "",
        billing_address_line2: "",
        billing_city: "",
        billing_state: "",
        billing_pincode: "",
        shipping_address: "",
        shipping_address_line1: "",
        shipping_address_line2: "",
        shipping_city: "",
        shipping_state: "",
        shipping_pincode: "",
        gst_type: "unregistered",
        state: "",
        party_type: "customer",
      });
      setShowDetailedAddress(false);
      setEnableShippingAddress(false);
      setActiveTab("gst-address");
    }
    } finally {
      setIsSaving(false);
    }
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
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto [&>button]:hidden">
              <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b">
                <DialogTitle className="text-lg font-semibold">Add Party</DialogTitle>
                <div className="flex items-center gap-2">
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogClose>
                </div>
              </DialogHeader>
              
              {/* Top three input fields */}
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="space-y-2">
                  <div className="flex flex-row items-center gap-1">
                    <Label>Party Name *</Label>
                  </div>
                  <Input
                    value={newParty.name}
                    onChange={(e) => setNewParty({ ...newParty, name: e.target.value })}
                    placeholder="Enter party name"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Label>GSTIN</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 cursor-pointer text-muted-foreground" />
                        </TooltipTrigger>

                        <TooltipContent side="top" align="center">
                          <p className="text-xs">
                            GST Identification Number (15-character code)
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    value={newParty.gstin}
                    onChange={(e) => setNewParty({ ...newParty, gstin: e.target.value })}
                    placeholder="Enter GSTIN"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-row items-center gap-1">
                   <Label>Phone Number</Label>
                  </div>
                  <Input
                    value={newParty.phone}
                    onChange={(e) => setNewParty({ ...newParty, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0">
                  <TabsTrigger
                    value="gst-address"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                  >
                    GST & Address
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="gst-address" className="mt-4">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>GST Type</Label>
                        <Select
                          value={newParty.gst_type}
                          onValueChange={(value) => setNewParty({ ...newParty, gst_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select GST Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unregistered">Unregistered/Consumer</SelectItem>
                            <SelectItem value="registered">Registered</SelectItem>
                            <SelectItem value="composition">Composition</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>State</Label>
                        <Select
                          value={newParty.state}
                          onValueChange={(value) => setNewParty({ ...newParty, state: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Email ID</Label>
                        <Input
                          type="email"
                          value={newParty.email}
                          onChange={(e) => setNewParty({ ...newParty, email: e.target.value })}
                          placeholder="Enter email"
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Billing Address */}
                      <div className="space-y-2">
                        <Label>Billing Address</Label>
                        <Textarea
                          value={newParty.billing_address}
                          onChange={(e) => setNewParty({ ...newParty, billing_address: e.target.value })}
                          placeholder="Enter billing address"
                          className="min-h-[100px]"
                        />
                        <Button
                          variant="link"
                          className="h-auto p-0 text-primary text-sm"
                          onClick={() => setShowDetailedAddress(!showDetailedAddress)}
                        >
                          {showDetailedAddress ? (
                            <>
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Hide Detailed Address
                            </>
                          ) : (
                            "Show Detailed Address"
                          )}
                        </Button>
                        
                        {showDetailedAddress && (
                          <div className="space-y-3 mt-3 pt-3 border-t">
                            <div className="space-y-2">
                              <Label>Address Line 1</Label>
                              <Input
                                value={newParty.billing_address_line1}
                                onChange={(e) => setNewParty({ ...newParty, billing_address_line1: e.target.value })}
                                placeholder="Enter address line 1"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Address Line 2</Label>
                              <Input
                                value={newParty.billing_address_line2}
                                onChange={(e) => setNewParty({ ...newParty, billing_address_line2: e.target.value })}
                                placeholder="Enter address line 2"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <Label>City</Label>
                                <Input
                                  value={newParty.billing_city}
                                  onChange={(e) => setNewParty({ ...newParty, billing_city: e.target.value })}
                                  placeholder="Enter city"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Pincode</Label>
                                <Input
                                  value={newParty.billing_pincode}
                                  onChange={(e) => setNewParty({ ...newParty, billing_pincode: e.target.value })}
                                  placeholder="Enter pincode"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Select State</Label>
                              <Select
                                value={newParty.billing_state}
                                onValueChange={(value) => setNewParty({ ...newParty, billing_state: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                  <SelectItem value="gujarat">Gujarat</SelectItem>
                                  <SelectItem value="karnataka">Karnataka</SelectItem>
                                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                                  <SelectItem value="delhi">Delhi</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button variant="outline" onClick={() => setShowDetailedAddress(false)} className="flex-1">
                                Cancel
                              </Button>
                              <Button onClick={() => setShowDetailedAddress(false)} className="flex-1">
                                Save
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Shipping Address */}
                      <div className="space-y-2">
                        {!enableShippingAddress ? (
                          <Button
                            variant="link"
                            className="h-auto p-0 text-primary text-sm"
                            onClick={() => setEnableShippingAddress(true)}
                          >
                            + Enable Shipping Address
                          </Button>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Shipping Address</Label>
                              <Button
                                variant="link"
                                className="h-auto p-0 text-muted-foreground hover:text-destructive text-sm"
                                onClick={() => {
                                  setEnableShippingAddress(false);
                                  setNewParty({
                                    ...newParty,
                                    shipping_address: "",
                                    shipping_address_line1: "",
                                    shipping_address_line2: "",
                                    shipping_city: "",
                                    shipping_state: "",
                                    shipping_pincode: "",
                                  });
                                }}
                              >
                                Disable
                              </Button>
                            </div>
                            <Textarea
                              value={newParty.shipping_address}
                              onChange={(e) => setNewParty({ ...newParty, shipping_address: e.target.value })}
                              placeholder="Enter shipping address"
                              className="min-h-[100px]"
                            />
                            <div className="space-y-3 mt-3 pt-3 border-t">
                              <div className="space-y-2">
                                <Label>Address Line 1</Label>
                                <Input
                                  value={newParty.shipping_address_line1}
                                  onChange={(e) => setNewParty({ ...newParty, shipping_address_line1: e.target.value })}
                                  placeholder="Enter address line 1"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Address Line 2</Label>
                                <Input
                                  value={newParty.shipping_address_line2}
                                  onChange={(e) => setNewParty({ ...newParty, shipping_address_line2: e.target.value })}
                                  placeholder="Enter address line 2"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label>City</Label>
                                  <Input
                                    value={newParty.shipping_city}
                                    onChange={(e) => setNewParty({ ...newParty, shipping_city: e.target.value })}
                                    placeholder="Enter city"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Pincode</Label>
                                  <Input
                                    value={newParty.shipping_pincode}
                                    onChange={(e) => setNewParty({ ...newParty, shipping_pincode: e.target.value })}
                                    placeholder="Enter pincode"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Select State</Label>
                                <Select
                                  value={newParty.shipping_state}
                                  onValueChange={(value) => setNewParty({ ...newParty, shipping_state: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select State" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                    <SelectItem value="gujarat">Gujarat</SelectItem>
                                    <SelectItem value="karnataka">Karnataka</SelectItem>
                                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                                    <SelectItem value="delhi">Delhi</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="credit-balance" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Credit & Balance content coming soon
                  </div>
                </TabsContent>

                <TabsContent value="additional-fields" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Additional Fields content coming soon
                  </div>
                </TabsContent>
              </Tabs>

              {/* Bottom action buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                <Button
                  variant="outline"
                  onClick={() => handleAddParty(true)}
                  disabled={isSaving}
                >
                  Save & New
                </Button>
                <Button
                  onClick={() => handleAddParty(false)}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
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
