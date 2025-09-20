import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Shield, Key, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CreateSchedule = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    beneficiary: "",
    totalAmount: "",
    tokenSymbol: "VEST",
    vestingDuration: "",
    cliffDuration: "",
    releaseFrequency: "monthly",
    startDate: "",
    conditions: "",
    isEncrypted: true
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement schedule creation with FHE encryption
    console.log("Creating schedule:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/vesting" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold mb-2 digital-text">Create Vesting Schedule</h1>
                <p className="text-muted-foreground">
                  Set up a new encrypted vesting schedule with FHE protection
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-primary border-primary">
                <Shield className="w-3 h-3 mr-1" />
                FHE Encrypted
              </Badge>
              <Badge variant="outline" className="text-success border-success">
                <Key className="w-3 h-3 mr-1" />
                Private Data
              </Badge>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Schedule Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Team Allocation Q1 2025"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="beneficiary">Beneficiary Address *</Label>
                  <Input
                    id="beneficiary"
                    value={formData.beneficiary}
                    onChange={(e) => handleInputChange('beneficiary', e.target.value)}
                    placeholder="0x..."
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the purpose and conditions of this vesting schedule..."
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            {/* Token Allocation */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Token Allocation</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Total Amount *</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                    placeholder="1000000"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tokenSymbol">Token Symbol</Label>
                  <Input
                    id="tokenSymbol"
                    value={formData.tokenSymbol}
                    onChange={(e) => handleInputChange('tokenSymbol', e.target.value)}
                    placeholder="VEST"
                  />
                </div>
              </div>
            </Card>

            {/* Vesting Parameters */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Vesting Parameters</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vestingDuration">Vesting Duration (days) *</Label>
                  <Input
                    id="vestingDuration"
                    type="number"
                    value={formData.vestingDuration}
                    onChange={(e) => handleInputChange('vestingDuration', e.target.value)}
                    placeholder="1095"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cliffDuration">Cliff Duration (days)</Label>
                  <Input
                    id="cliffDuration"
                    type="number"
                    value={formData.cliffDuration}
                    onChange={(e) => handleInputChange('cliffDuration', e.target.value)}
                    placeholder="365"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="releaseFrequency">Release Frequency</Label>
                  <Select value={formData.releaseFrequency} onValueChange={(value) => handleInputChange('releaseFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* Additional Conditions */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Key className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Additional Conditions</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="conditions">Special Conditions</Label>
                  <Textarea
                    id="conditions"
                    value={formData.conditions}
                    onChange={(e) => handleInputChange('conditions', e.target.value)}
                    placeholder="e.g., Performance milestones, company targets, etc."
                    rows={3}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isEncrypted"
                    checked={formData.isEncrypted}
                    onChange={(e) => handleInputChange('isEncrypted', e.target.checked.toString())}
                    className="rounded"
                  />
                  <Label htmlFor="isEncrypted" className="text-sm">
                    Enable FHE encryption for sensitive data
                  </Label>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6">
              <Link to="/vesting">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </Link>
              
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline">
                  Save Draft
                </Button>
                <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                  <Save className="w-4 h-4 mr-2" />
                  Create Schedule
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateSchedule;
