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
import { Upload, Check, Pencil, Loader2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useBusinessProfile, useSaveBusinessProfile } from "@/hooks/useBusinessProfile";
import { uploadFile } from "@/utils/fileUpload";

export default function Profile() {
  const { data: profile, isLoading } = useBusinessProfile();
  const saveProfile = useSaveBusinessProfile();

  const [formData, setFormData] = useState({
    business_name: "",
    phone: "",
    gstin: "",
    email: "",
    state: "",
    pincode: "",
    address: "",
    left_name: "",
    left_number: "",
    right_name: "",
    right_number: "",
    logo_url: "",
    signature_url: "",
  });

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingSignature, setIsUploadingSignature] = useState(false);
  const fileInputLogoRef = useRef<HTMLInputElement>(null);
  const fileInputSignatureRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        business_name: profile.business_name || "",
        phone: profile.phone || "",
        gstin: profile.gstin || "",
        email: profile.email || "",
        state: profile.state || "",
        pincode: profile.pincode || "",
        address: profile.address || "",
        left_name: "",
        left_number: "",
        right_name: "",
        right_number: "",
        logo_url: profile.logo_url || "",
        signature_url: profile.signature_url || "",
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    const url = await uploadFile(file, "business_assets", "logos");
    if (url) {
      handleInputChange("logo_url", url);
    }
    setIsUploadingLogo(false);
  };

  const handleSignatureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingSignature(true);
    const url = await uploadFile(file, "business_assets", "signatures");
    if (url) {
      handleInputChange("signature_url", url);
    }
    setIsUploadingSignature(false);
  };

  const triggerLogoUpload = () => fileInputLogoRef.current?.click();
  const triggerSignatureUpload = () => fileInputSignatureRef.current?.click();

  const handleSave = async () => {
    await saveProfile.mutateAsync(formData);
  };

  // if (isLoading) {
  //   return (
  //     <MainLayout>
  //       <div className="flex items-center justify-center h-64">
  //         <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
  //       </div>
  //     </MainLayout>
  //   );
  // }

  return (
    <MainLayout>
      <div className="px-6 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground mb-6">Edit Profile</h1>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mb-6">
            <Button variant="outline">Cancel</Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSave}
              disabled={saveProfile.isPending}
            >
              {saveProfile.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>


        <div className="bg-card rounded-lg border border-border p-6">

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Main Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="leftName">Name</Label>
                    <Input
                      id="leftName"
                      value={formData.left_name}
                      onChange={(e) => handleInputChange("left_name", e.target.value)}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leftNumber">Number</Label>
                    <Input
                      id="leftNumber"
                      value={formData.left_number}
                      onChange={(e) => handleInputChange("left_number", e.target.value)}
                      placeholder="Enter number"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rightName">Name</Label>
                    <Input
                      id="rightName"
                      value={formData.right_name}
                      onChange={(e) => handleInputChange("right_name", e.target.value)}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rightNumber">Number</Label>
                    <Input
                      id="rightNumber"
                      value={formData.right_number}
                      onChange={(e) => handleInputChange("right_number", e.target.value)}
                      placeholder="Enter number"
                    />
                  </div>
                </div>
              </div>

              {/* Business & More Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-lg font-semibold text-foreground">
                    Business Details
                  </h2>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="businessName">
                      Business Name<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.business_name}
                      onChange={(e) => handleInputChange("business_name", e.target.value)}
                      placeholder="Enter business name"
                      className="h-10"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter phone number"
                      className="h-10"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="gstin" className="flex items-center gap-1">
                      GSTIN <span className="text-muted-foreground">ⓘ</span>
                    </Label>

                    <div className="relative">
                      <Input
                        id="gstin"
                        value={formData.gstin}
                        onChange={(e) => handleInputChange("gstin", e.target.value)}
                        placeholder="Enter GSTIN"
                        className="h-10 pr-10"
                      />
                      {formData.gstin?.length === 15 && (
                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* More Details */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-lg font-semibold text-foreground">
                    More Details
                  </h2>

                  <div className="flex flex-col gap-2">
                    <Label>State</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => handleInputChange("state", value)}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="kerala">Kerala</SelectItem>
                        <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      placeholder="Enter pincode"
                      className="h-10"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email"
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Main Column - Branding */}
            <div className="space-y-8">
              <h2 className="text-lg font-semibold text-foreground">Contact & Branding</h2>
              {/* Logo Section */}
              {/* Logo Section */}
              <div className="flex justify-center mt-5" style={{ "marginTop": "10px" }}>
                <div className="relative group">
                  <div
                    onClick={triggerLogoUpload}
                    className="w-32 h-32 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center bg-primary/5 cursor-pointer overflow-hidden hover:bg-primary/10 transition-colors"
                  >
                    {isUploadingLogo ? (
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    ) : formData.logo_url ? (
                      <img src={formData.logo_url} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <span className="text-primary text-sm">Add</span>
                        <br />
                        <span className="text-primary text-sm">Logo</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={triggerLogoUpload}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-card rounded-full border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputLogoRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </div>
              </div>

              {/* Contact & Branding Inputs */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Textarea
                    id="businessAddress"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="min-h-[100px]"
                    placeholder="Enter business address"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Add Signature</Label>
                  <div
                    onClick={triggerSignatureUpload}
                    className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer min-h-[150px]"
                  >
                    {isUploadingSignature ? (
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    ) : formData.signature_url ? (
                      <img src={formData.signature_url} alt="Signature" className="max-h-[100px] object-contain" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-primary">Upload Signature</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputSignatureRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleSignatureUpload}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
