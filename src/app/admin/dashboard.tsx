"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"

// Mock data for applications
const mockApplications = [
  {
    id: 1,
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    position: "Software Developer",
    education: "Bachelor of Science in Computer Science, Stanford University",
    experience: "5 years at Tech Solutions Inc. as a Full Stack Developer",
    skills: "JavaScript, React, Node.js, Python, SQL",
    submittedAt: "2023-05-15T10:30:00Z",
    status: "New",
    cvFilename: "john_smith_resume.pdf",
  },
  {
    id: 2,
    fullName: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "+1 (555) 987-6543",
    position: "Marketing Specialist",
    education: "Master of Business Administration, NYU",
    experience: "3 years at Global Marketing Agency as a Digital Marketing Coordinator",
    skills: "Social Media Marketing, Content Creation, SEO, Google Analytics, Adobe Creative Suite",
    submittedAt: "2023-05-14T14:45:00Z",
    status: "Reviewed",
    cvFilename: "emily_johnson_cv.pdf",
  },
  {
    id: 3,
    fullName: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    position: "Data Analyst",
    education: "Master of Science in Data Science, MIT",
    experience: "2 years at Data Insights Corp as a Junior Data Analyst",
    skills: "Python, R, SQL, Tableau, Machine Learning, Statistical Analysis",
    submittedAt: "2023-05-13T09:15:00Z",
    status: "Contacted",
    cvFilename: "michael_chen_resume.pdf",
  },
  {
    id: 4,
    fullName: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 345-6789",
    position: "UX/UI Designer",
    education: "Bachelor of Fine Arts in Graphic Design, RISD",
    experience: "4 years at Creative Design Studio as a UI Designer",
    skills: "Figma, Sketch, Adobe XD, Photoshop, Illustrator, User Research, Prototyping",
    submittedAt: "2023-05-12T16:20:00Z",
    status: "Interviewed",
    cvFilename: "sarah_williams_portfolio.pdf",
  },
  {
    id: 5,
    fullName: "David Rodriguez",
    email: "david.rodriguez@example.com",
    phone: "+1 (555) 456-7890",
    position: "Financial Analyst",
    education: "Bachelor of Science in Finance, University of Pennsylvania",
    experience: "3 years at Global Investments Inc. as a Junior Financial Analyst",
    skills: "Financial Modeling, Excel, Bloomberg Terminal, Valuation, Financial Statement Analysis",
    submittedAt: "2023-05-11T11:10:00Z",
    status: "New",
    cvFilename: "david_rodriguez_resume.pdf",
  },
]

// Status color mapping
const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Reviewed: "bg-yellow-100 text-yellow-800",
  Contacted: "bg-purple-100 text-purple-800",
  Interviewed: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Hired: "bg-emerald-100 text-emerald-800",
}

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = useState(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [positionFilter, setPositionFilter] = useState("All")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Get unique positions for filter
  const positions = ["All", ...Array.from(new Set(applications.map((app) => app.position)))]

  // Get unique statuses for filter
  const statuses = ["All", ...Array.from(new Set(applications.map((app) => app.status)))]

  // Filter applications based on search term and filters
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || app.status === statusFilter
    const matchesPosition = positionFilter === "All" || app.position === positionFilter

    return matchesSearch && matchesStatus && matchesPosition
  })

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // View application details
  const viewApplicationDetails = (application: any) => {
    setSelectedApplication(application)
    setIsDetailModalOpen(true)
  }

  // Update application status
  const updateApplicationStatus = (id: number, newStatus: string) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) => (app.id === id ? { ...app, status: newStatus } : app)),
    )

    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication({ ...selectedApplication, status: newStatus })
    }
  }

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">NK Recruitment Admin</h1>
          <button
            onClick={logout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Dashboard Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Candidate Applications</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage and review all candidate applications submitted through the website.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, position..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="positionFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  id="positionFilter"
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Candidate
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Submitted
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-medium">
                              {application.fullName
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{application.fullName}</div>
                            <div className="text-sm text-gray-500">{application.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(application.submittedAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[application.status] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewApplicationDetails(application)}
                          className="text-primary hover:text-primary/80 mr-4"
                        >
                          View
                        </button>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-900"
                          onClick={(e) => {
                            e.preventDefault()
                            // In a real app, this would download the CV file
                            alert(`Downloading ${application.cvFilename}`)
                          }}
                        >
                          Download CV
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No applications found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (simplified) */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredApplications.length}</span> of{" "}
                  <span className="font-medium">{filteredApplications.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Application Detail Modal */}
      {isDetailModalOpen && selectedApplication && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Application Details</h3>
                      <div>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[selectedApplication.status] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {selectedApplication.status}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                          <p className="mt-1 text-sm text-gray-900">{selectedApplication.fullName}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Position</h4>
                          <p className="mt-1 text-sm text-gray-900">{selectedApplication.position}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Email</h4>
                          <p className="mt-1 text-sm text-gray-900">{selectedApplication.email}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                          <p className="mt-1 text-sm text-gray-900">{selectedApplication.phone}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Submitted</h4>
                          <p className="mt-1 text-sm text-gray-900">{formatDate(selectedApplication.submittedAt)}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">CV File</h4>
                          <p className="mt-1 text-sm text-gray-900">
                            <a href="#" className="text-primary hover:underline">
                              {selectedApplication.cvFilename}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-4">
                      <h4 className="text-sm font-medium text-gray-500">Education</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.education}</p>
                    </div>

                    <div className="border-t border-gray-200 py-4">
                      <h4 className="text-sm font-medium text-gray-500">Experience</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.experience}</p>
                    </div>

                    <div className="border-t border-gray-200 py-4">
                      <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.skills}</p>
                    </div>

                    <div className="border-t border-gray-200 py-4">
                      <h4 className="text-sm font-medium text-gray-500">Update Status</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["New", "Reviewed", "Contacted", "Interviewed", "Rejected", "Hired"].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateApplicationStatus(selectedApplication.id, status)}
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              selectedApplication.status === status
                                ? `${statusColors[status]} ring-2 ring-offset-2 ring-primary/50`
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsDetailModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // In a real app, this would download the CV file
                    alert(`Downloading ${selectedApplication.cvFilename}`)
                  }}
                >
                  Download CV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
