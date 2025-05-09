
import { useState } from "react";
import { Save, Upload } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useToast } from "../components/ui/use-toast";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    businessName: "",
    businessType: "",
    industry: "",
    location: "",
    employeeCount: "",
    description: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: ""
  });
  
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating a save
    toast({
      title: "Profile Updated",
      description: "Your business profile has been saved successfully."
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Business Profile</h1>
        <p className="text-muted-foreground mb-6">
          Complete your business profile to get personalized sustainability recommendations and compliance guidelines.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Basic Information */}
            <Card className="col-span-2">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={profileData.businessName}
                      onChange={handleChange}
                      placeholder="e.g., Green Solutions Pvt Ltd"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select
                        value={profileData.businessType}
                        onValueChange={(value) => handleSelectChange("businessType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="llp">Limited Liability Partnership</SelectItem>
                          <SelectItem value="pvt_ltd">Private Limited Company</SelectItem>
                          <SelectItem value="public_ltd">Public Limited Company</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={profileData.industry}
                        onValueChange={(value) => handleSelectChange("industry", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="food_processing">Food Processing</SelectItem>
                          <SelectItem value="textile">Textile</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleChange}
                        placeholder="e.g., Bengaluru, Karnataka"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="employeeCount">Number of Employees</Label>
                      <Select
                        value={profileData.employeeCount}
                        onValueChange={(value) => handleSelectChange("employeeCount", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10</SelectItem>
                          <SelectItem value="11-50">11-50</SelectItem>
                          <SelectItem value="51-100">51-100</SelectItem>
                          <SelectItem value="101-250">101-250</SelectItem>
                          <SelectItem value="250+">250+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={profileData.description}
                      onChange={handleChange}
                      placeholder="Briefly describe your business operations and activities"
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={profileData.contactPerson}
                      onChange={handleChange}
                      placeholder="Full name"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={profileData.contactEmail}
                      onChange={handleChange}
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="contactPhone">Phone</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={profileData.contactPhone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  
                  <div className="grid gap-2 mt-4">
                    <Label>Upload Documents</Label>
                    <Button variant="outline" type="button" className="flex items-center gap-2">
                      <Upload size={16} />
                      Upload Business Documents
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload any relevant business licenses or certificates for better compliance assessment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save size={16} />
              Save Profile
            </Button>
          </div>
        </form>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
