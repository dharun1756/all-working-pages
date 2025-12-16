import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Check, Pencil } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({
    businessName: "RAMESH CLOTH",
    phoneNumber: "9750350078, 9443360751",
    gstin: "33AAZFR1827P1ZD",
    email: "rameshcloth.tiruppur@gmail.com",
    businessType: "retail",
    businessCategory: "",
    state: "tamil-nadu",
    pincode: "641607",
    businessAddress: "24/85 MIDDLE STREET THIRUNEELAKANDAPURAM TIRUPUR",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Edit Profile</h1>

        <div className="bg-card rounded-lg border border-border p-6">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center bg-primary/5">
                <div className="text-center">
                  <span className="text-primary text-sm">Add</span>
                  <br />
                  <span className="text-primary text-sm">Logo</span>
                </div>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-card rounded-full border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors">
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Business Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">Business Details</h2>

              <div className="space-y-2">
                <Label htmlFor="businessName">
                  Business Name<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  className="border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gstin" className="flex items-center gap-1">
                  GSTIN <span className="text-muted-foreground">ⓘ</span>
                </Label>
                <div className="relative">
                  <Input
                    id="gstin"
                    value={formData.gstin}
                    onChange={(e) => handleInputChange("gstin", e.target.value)}
                  />
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email ID</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>

            {/* More Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">More Details</h2>

              <div className="space-y-2">
                <Label>Business Type</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => handleInputChange("businessType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Business Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Business Category</Label>
                <Select
                  value={formData.businessCategory}
                  onValueChange={(value) => handleInputChange("businessCategory", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Business Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="textiles">Textiles</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="grocery">Grocery</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>State</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleInputChange("state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="kerala">Kerala</SelectItem>
                    <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                />
              </div>
            </div>

            {/* Business Address & Signature */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Textarea
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Add Signature</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-primary">Upload Signature</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
