"use client"

import { useState, useRef, type FormEvent, type ChangeEvent } from "react"

// Form field types
type FormData = {
  fullName: string
  email: string
  phone: string
  education: string
  experience: string
  skills: string
  position: string
  message: string
  cvFile: File | null
}

// Initial form state
const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  education: "",
  experience: "",
  skills: "",
  position: "",
  message: "",
  cvFile: null,
}

const SubmitCVPage = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Available positions
  const availablePositions = [
    "Software Developer",
    "Data Analyst",
    "Marketing Specialist",
    "Financial Analyst",
    "Project Manager",
    "UX/UI Designer",
    "Sales Representative",
    "Customer Support Specialist",
    "HR Coordinator",
    "Other",
  ]

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  // Handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    // Validate file type
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          cvFile: "Please upload a PDF or Word document (.pdf, .doc, .docx)",
        }))
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          cvFile: "File size should be less than 5MB",
        }))
        return
      }
    }

    setFormData((prev) => ({
      ...prev,
      cvFile: file,
    }))

    // Clear error when file is selected
    if (errors.cvFile) {
      setErrors((prev) => ({
        ...prev,
        cvFile: "",
      }))
    }
  }

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    // Required fields
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.education.trim()) newErrors.education = "Education information is required"
    if (!formData.skills.trim()) newErrors.skills = "Skills information is required"
    if (!formData.position) newErrors.position = "Please select a position"
    if (!formData.cvFile) newErrors.cvFile = "Please upload your CV"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // In a real application, you would send this data to your server
      // using an API endpoint. This is a simulation for demonstration purposes.

      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulated successful submission
      console.log("Form submitted successfully:", formData)
      setSubmitSuccess(true)
      setFormData(initialFormData)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("There was an error submitting your application. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 px-4 py-1 rounded-full text-primary font-medium text-sm mb-4">
              CAREER OPPORTUNITIES
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Submit Your CV
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Take the first step towards your dream career by submitting your CV to NK Recruitment. Our team of experts
              will review your application and match you with suitable opportunities.
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for submitting your CV. Our recruitment team will review your application and contact you if
                there's a suitable match.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
                  </div>

                  {/* Position */}
                  <div>
                    <label htmlFor="position" className="block text-gray-700 font-medium mb-2">
                      Position of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.position ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a position</option>
                      {availablePositions.map((position) => (
                        <option key={position} value={position}>
                          {position}
                        </option>
                      ))}
                    </select>
                    {errors.position && <p className="mt-1 text-red-500 text-sm">{errors.position}</p>}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-6">
                  <label htmlFor="education" className="block text-gray-700 font-medium mb-2">
                    Education <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.education ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your educational background, degrees, institutions, graduation years"
                  ></textarea>
                  {errors.education && <p className="mt-1 text-red-500 text-sm">{errors.education}</p>}
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">
                    Work Experience
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your previous work experience, positions, companies, duration"
                  ></textarea>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <label htmlFor="skills" className="block text-gray-700 font-medium mb-2">
                    Skills <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.skills ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="List your key skills, certifications, and competencies"
                  ></textarea>
                  {errors.skills && <p className="mt-1 text-red-500 text-sm">{errors.skills}</p>}
                </div>

                {/* Additional Message */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Any additional information you'd like to share with our recruitment team"
                  ></textarea>
                </div>

                {/* CV Upload */}
                <div className="mb-8">
                  <label htmlFor="cvFile" className="block text-gray-700 font-medium mb-2">
                    Upload CV <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-md p-6 text-center ${
                      errors.cvFile ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <input
                      type="file"
                      id="cvFile"
                      name="cvFile"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                    <div className="space-y-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-gray-400 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <div className="text-gray-600">
                        {formData.cvFile ? (
                          <span className="text-primary font-medium">{formData.cvFile.name}</span>
                        ) : (
                          <>
                            <span className="text-primary font-medium">Click to upload</span> or drag and drop
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">PDF or Word documents up to 5MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      Select File
                    </button>
                  </div>
                  {errors.cvFile && <p className="mt-1 text-red-500 text-sm">{errors.cvFile}</p>}
                </div>

                {/* Submit Error Message */}
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            </div>
          )}

          <div className="mt-12 bg-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What Happens Next?</h3>
            <ol className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                  1
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Application Review:</span> Our recruitment team will review your CV
                    and application details.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                  2
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Initial Contact:</span> If your profile matches our current openings,
                    a recruiter will contact you within 5-7 business days.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                  3
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-medium">Profile Database:</span> Your profile will be added to our database
                    for future opportunities that match your skills and experience.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitCVPage
