import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, FileText, Calendar, Filter, ArrowLeft, CheckCircle, Shield, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ExportReport = () => {
  const [exportFormat, setExportFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState("all");
  const [includeData, setIncludeData] = useState({
    schedules: true,
    transactions: true,
    analytics: true,
    compliance: true,
    encryption: false
  });
  const [exportStatus, setExportStatus] = useState<"idle" | "generating" | "ready" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleExport = async () => {
    setExportStatus("generating");
    
    try {
      // TODO: Implement actual export logic with FHE data handling
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate generation
      
      // Mock download URL
      setDownloadUrl("https://example.com/report.pdf");
      setExportStatus("ready");
    } catch (error) {
      setExportStatus("error");
    }
  };

  const exportFormats = [
    { value: "pdf", label: "PDF Report", description: "Professional PDF document" },
    { value: "excel", label: "Excel Spreadsheet", description: "Data analysis ready" },
    { value: "csv", label: "CSV Data", description: "Raw data export" },
    { value: "json", label: "JSON Data", description: "Structured data format" }
  ];

  const dateRanges = [
    { value: "all", label: "All Time" },
    { value: "year", label: "This Year" },
    { value: "quarter", label: "This Quarter" },
    { value: "month", label: "This Month" },
    { value: "custom", label: "Custom Range" }
  ];

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
                <h1 className="text-4xl font-bold mb-2 digital-text">Export Report</h1>
                <p className="text-muted-foreground">
                  Generate comprehensive reports of your vesting schedules and analytics
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-primary border-primary">
                <Shield className="w-3 h-3 mr-1" />
                FHE Protected
              </Badge>
              <Badge variant="outline" className="text-success border-success">
                <FileText className="w-3 h-3 mr-1" />
                Multi-Format
              </Badge>
            </div>
          </div>

          <div className="space-y-8">
            {/* Export Format Selection */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Download className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Export Format</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportFormats.map((format) => (
                  <div
                    key={format.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      exportFormat === format.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setExportFormat(format.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="format"
                        value={format.value}
                        checked={exportFormat === format.value}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="text-primary"
                      />
                      <div>
                        <p className="font-medium">{format.label}</p>
                        <p className="text-sm text-muted-foreground">{format.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Date Range Selection */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Date Range</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dateRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {dateRange === "custom" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Data Selection */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Include Data</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(includeData).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) =>
                          setIncludeData(prev => ({
                            ...prev,
                            [key]: checked
                          }))
                        }
                      />
                      <Label htmlFor={key} className="text-sm font-medium">
                        {key === "schedules" && "Vesting Schedules"}
                        {key === "transactions" && "Transaction History"}
                        {key === "analytics" && "Analytics Data"}
                        {key === "compliance" && "Compliance Reports"}
                        {key === "encryption" && "Encryption Details"}
                      </Label>
                    </div>
                  ))}
                </div>
                
                <Alert>
                  <Eye className="h-4 w-4" />
                  <AlertDescription>
                    Sensitive data will be encrypted in the export. Only authorized parties can decrypt the information.
                  </AlertDescription>
                </Alert>
              </div>
            </Card>

            {/* Export Status */}
            {exportStatus !== "idle" && (
              <Card className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  {exportStatus === "generating" && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  )}
                  {exportStatus === "ready" && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                  {exportStatus === "error" && (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                  <h2 className="text-xl font-semibold">
                    {exportStatus === "generating" && "Generating Report..."}
                    {exportStatus === "ready" && "Report Ready"}
                    {exportStatus === "error" && "Export Failed"}
                  </h2>
                </div>
                
                {exportStatus === "ready" && (
                  <div className="space-y-4">
                    <p className="text-success">Your report has been generated successfully!</p>
                    <div className="p-4 bg-surface-glass/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Vesting Report</p>
                          <p className="text-sm text-muted-foreground">
                            Generated on {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          onClick={() => window.open(downloadUrl, '_blank')}
                          className="bg-gradient-primary hover:opacity-90"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {exportStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Failed to generate report. Please try again or contact support.
                    </AlertDescription>
                  </Alert>
                )}
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6">
              <Link to="/vesting">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Vesting
                </Button>
              </Link>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setExportStatus("idle");
                    setDownloadUrl("");
                  }}
                >
                  Reset
                </Button>
                <Button 
                  onClick={handleExport}
                  disabled={exportStatus === "generating"}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExportReport;
