"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Copy, Trash2, Edit, Download } from "lucide-react"

interface Vendor {
  id: string
  company_name: string
  contact_name: string
  email: string
  phone: string
  linkedin_profile: string
  source_module: string
  added_date: string
  notes: string
}

export function VendorManagement() {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      company_name: "TechCorp Solutions",
      contact_name: "John Smith",
      email: "john.smith@techcorp.com",
      phone: "+1-555-0123",
      linkedin_profile: "linkedin.com/in/johnsmith",
      source_module: "LinkedIn Recruiter",
      added_date: "2024-11-09",
      notes: "HR Manager - React hiring",
    },
    {
      id: "2",
      company_name: "InnovateLabs",
      contact_name: "Sarah Johnson",
      email: "sarah.j@innovatelabs.com",
      phone: "+1-555-0456",
      linkedin_profile: "linkedin.com/in/sarahjohnson",
      source_module: "Company Email Scraper",
      added_date: "2024-11-08",
      notes: "Recruiting Manager - Full Stack",
    },
    {
      id: "3",
      company_name: "CloudSystems Inc",
      contact_name: "Mike Chen",
      email: "m.chen@cloudsystems.com",
      phone: "+1-555-0789",
      linkedin_profile: "linkedin.com/in/mikechen",
      source_module: "LinkedIn Jobs",
      added_date: "2024-11-07",
      notes: "Technical Recruiter - DevOps",
    },
    {
      id: "4",
      company_name: "DataViz Pro",
      contact_name: "Emma Wilson",
      email: "emma@datavizpro.com",
      phone: "+1-555-0321",
      linkedin_profile: "linkedin.com/in/emmawilson",
      source_module: "Company Email Scraper",
      added_date: "2024-11-06",
      notes: "Hiring Lead - Data Science",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterModule, setFilterModule] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [newVendor, setNewVendor] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    linkedin_profile: "",
    source_module: "",
    notes: "",
  })

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesModule = !filterModule || vendor.source_module === filterModule

    return matchesSearch && matchesModule
  })

  const handleAddVendor = () => {
    if (newVendor.company_name && newVendor.contact_name && newVendor.email) {
      const vendor: Vendor = {
        id: Date.now().toString(),
        ...newVendor,
        added_date: new Date().toISOString().split("T")[0],
      }
      setVendors([vendor, ...vendors])
      setNewVendor({
        company_name: "",
        contact_name: "",
        email: "",
        phone: "",
        linkedin_profile: "",
        source_module: "",
        notes: "",
      })
      setShowForm(false)
    }
  }

  const handleDeleteVendor = (id: string) => {
    setVendors(vendors.filter((v) => v.id !== id))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exportToCSV = () => {
    const headers = ["Company", "Contact", "Email", "Phone", "LinkedIn", "Source", "Date", "Notes"]
    const rows = filteredVendors.map((v) => [
      v.company_name,
      v.contact_name,
      v.email,
      v.phone,
      v.linkedin_profile,
      v.source_module,
      v.added_date,
      v.notes,
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vendors-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Vendor Management</h2>
          <p className="text-muted-foreground mt-1">Store and manage company contacts from all automation sources</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{vendors.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Vendors</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-chart-1">{new Set(vendors.map((v) => v.company_name)).size}</p>
              <p className="text-sm text-muted-foreground mt-1">Unique Companies</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-chart-2">{new Set(vendors.map((v) => v.source_module)).size}</p>
              <p className="text-sm text-muted-foreground mt-1">Data Sources</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-chart-3">{vendors.filter((v) => v.phone).length}</p>
              <p className="text-sm text-muted-foreground mt-1">With Phone</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Vendor Form */}
      {showForm && (
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Add New Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Company Name"
                value={newVendor.company_name}
                onChange={(e) => setNewVendor({ ...newVendor, company_name: e.target.value })}
              />
              <Input
                placeholder="Contact Name"
                value={newVendor.contact_name}
                onChange={(e) => setNewVendor({ ...newVendor, contact_name: e.target.value })}
              />
              <Input
                placeholder="Email"
                type="email"
                value={newVendor.email}
                onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
              />
              <Input
                placeholder="Phone Number"
                value={newVendor.phone}
                onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
              />
              <Input
                placeholder="LinkedIn Profile URL"
                value={newVendor.linkedin_profile}
                onChange={(e) => setNewVendor({ ...newVendor, linkedin_profile: e.target.value })}
              />
              <select
                className="px-3 py-2 rounded-md border border-input bg-background text-foreground"
                value={newVendor.source_module}
                onChange={(e) => setNewVendor({ ...newVendor, source_module: e.target.value })}
              >
                <option value="">Select Source</option>
                <option value="LinkedIn Recruiter">LinkedIn Recruiter</option>
                <option value="Company Email Scraper">Company Email Scraper</option>
                <option value="LinkedIn Jobs">LinkedIn Jobs</option>
                <option value="Manual">Manual Entry</option>
              </select>
              <Input
                placeholder="Notes"
                value={newVendor.notes}
                onChange={(e) => setNewVendor({ ...newVendor, notes: e.target.value })}
                className="md:col-span-2"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddVendor}>Save Vendor</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by company, contact, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          className="px-3 py-2 rounded-md border border-input bg-background text-foreground"
          value={filterModule}
          onChange={(e) => setFilterModule(e.target.value)}
        >
          <option value="">All Sources</option>
          <option value="LinkedIn Recruiter">LinkedIn Recruiter</option>
          <option value="Company Email Scraper">Company Email Scraper</option>
          <option value="LinkedIn Jobs">LinkedIn Jobs</option>
          <option value="Manual">Manual Entry</option>
        </select>
      </div>

      {/* Vendors Table */}
      <Card className="border border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">LinkedIn</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Source</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{vendor.company_name}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{vendor.contact_name}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground">{vendor.email}</span>
                        <button
                          onClick={() => copyToClipboard(vendor.email)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{vendor.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {vendor.linkedin_profile ? (
                          <>
                            <a
                              href={`https://${vendor.linkedin_profile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-chart-1 hover:underline truncate max-w-xs"
                            >
                              View
                            </a>
                            <button
                              onClick={() => copyToClipboard(vendor.linkedin_profile)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <span className="text-muted-foreground text-xs">N/A</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant="outline">{vendor.source_module}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVendor(vendor.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredVendors.length === 0 && (
            <div className="px-6 py-12 text-center text-muted-foreground">No vendors found matching your search</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
