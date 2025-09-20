import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, Download, ArrowLeft, CheckCircle, AlertCircle, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ImportSchedule = () => {
  const [importMethod, setImportMethod] = useState("file");
  const [importData, setImportData] = useState("");
  const [importStatus, setImportStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [importedSchedules, setImportedSchedules] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
      };
      reader.readAsText(file);
    }
  };

  const handleImport = async () => {
    setImportStatus("processing");
    
    try {
      // TODO: Implement actual import logic with FHE decryption
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      
      // Mock imported schedules
      const mockSchedules = [
        {
          title: "Team Allocation Q1",
          beneficiary: "0x1234...5678",
          amount: "500,000 VEST",
          status: "Ready"
        },
        {
          title: "Advisory Board",
          beneficiary: "0x9876...5432",
          amount: "200,000 VEST",
          status: "Ready"
        }
      ];
      
      setImportedSchedules(mockSchedules);
      setImportStatus("success");
    } catch (error) {
      setImportStatus("error");
    }
  };

  const supportedFormats = [
    { name: "CSV", description: "Comma-separated values", extension: ".csv" },
    { name: "JSON", description: "JavaScript Object Notation", extension: ".json" },
    { name: "Excel", description: "Microsoft Excel spreadsheet", extension: ".xlsx" }
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
                <h1 className="text-4xl font-bold mb-2 digital-text">Import Vesting Schedules</h1>
                <p className="text-muted-foreground">
                  Import existing vesting schedules from external sources with FHE encryption
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-primary border-primary">
                <Shield className="w-3 h-3 mr-1" />
                FHE Encrypted
              </Badge>
              <Badge variant="outline" className="text-warning border-warning">
                <FileText className="w-3 h-3 mr-1" />
                Bulk Import
              </Badge>
            </div>
          </div>

          <div className="space-y-8">
            {/* Import Method Selection */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Upload className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Import Method</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Import Method</Label>
                  <Select value={importMethod} onValueChange={setImportMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="file">Upload File</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                      <SelectItem value="csv">CSV Data</SelectItem>
                      <SelectItem value="api">API Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Supported Formats</Label>
                  <div className="flex flex-wrap gap-2">
                    {supportedFormats.map((format) => (
                      <Badge key={format.name} variant="outline" className="text-xs">
                        {format.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* File Upload Section */}
            {importMethod === "file" && (
              <Card className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Upload File</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Drop your file here or click to browse</p>
                      <p className="text-sm text-muted-foreground">
                        Supports CSV, JSON, and Excel files up to 10MB
                      </p>
                      <input
                        type="file"
                        accept=".csv,.json,.xlsx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Label htmlFor="file-upload">
                        <Button variant="outline" asChild>
                          <span>Choose File</span>
                        </Button>
                      </Label>
                    </div>
                  </div>
                  
                  {importData && (
                    <div className="space-y-2">
                      <Label>File Content Preview</Label>
                      <Textarea
                        value={importData}
                        onChange={(e) => setImportData(e.target.value)}
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* JSON/CSV Data Input */}
            {(importMethod === "json" || importMethod === "csv") && (
              <Card className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Paste {importMethod.toUpperCase()} Data</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="import-data">
                      {importMethod.toUpperCase()} Data
                    </Label>
                    <Textarea
                      id="import-data"
                      value={importData}
                      onChange={(e) => setImportData(e.target.value)}
                      placeholder={`Paste your ${importMethod.toUpperCase()} data here...`}
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Ensure your data includes required fields: title, beneficiary, amount, vestingDuration, cliffDuration
                    </AlertDescription>
                  </Alert>
                </div>
              </Card>
            )}

            {/* Import Status */}
            {importStatus !== "idle" && (
              <Card className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  {importStatus === "processing" && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  )}
                  {importStatus === "success" && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                  {importStatus === "error" && (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                  <h2 className="text-xl font-semibold">
                    {importStatus === "processing" && "Processing Import..."}
                    {importStatus === "success" && "Import Successful"}
                    {importStatus === "error" && "Import Failed"}
                  </h2>
                </div>
                
                {importStatus === "success" && (
                  <div className="space-y-4">
                    <p className="text-success">Successfully imported {importedSchedules.length} vesting schedules</p>
                    <div className="space-y-2">
                      {importedSchedules.map((schedule, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-surface-glass/30 rounded-lg">
                          <div>
                            <p className="font-medium">{schedule.title}</p>
                            <p className="text-sm text-muted-foreground">{schedule.beneficiary}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono">{schedule.amount}</p>
                            <Badge variant="outline" className="text-success border-success">
                              {schedule.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {importStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Failed to import schedules. Please check your data format and try again.
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
                    setImportData("");
                    setImportStatus("idle");
                    setImportedSchedules([]);
                  }}
                >
                  Reset
                </Button>
                <Button 
                  onClick={handleImport}
                  disabled={!importData || importStatus === "processing"}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Schedules
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

export default ImportSchedule;
