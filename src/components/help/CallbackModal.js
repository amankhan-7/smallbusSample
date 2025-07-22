import { useState } from 'react'
import { toast } from 'sonner';

const CallbackModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredTime: 'Morning (9 AM - 12 PM)',
    query: '',
  })

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone) {
      toast.error('Please fill in all required fields.')
      return
    }
    toast.success('Thank you! We have received your callback request. Our team will contact you within 24 hours.')
    onClose()
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      preferredTime: 'Morning (9 AM - 12 PM)',
      query: '',
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl max-w-lg w-full mx-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 text-xl hover:text-gray-600"
        >
          <i className="fas fa-times"></i>
        </button>
        <h3 className="text-xl font-semibold mb-2">Request a Callback</h3>
        <p className="text-gray-600 mb-6">
          Fill in your details and we&apos;ll call you back within 24 hours.
        </p>

        <div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'rgba(0, 74, 173, 0.1)' }}
              onFocus={(e) => (e.target.style.borderColor = '#004aad')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              onFocus={(e) => (e.target.style.borderColor = '#004aad')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              onFocus={(e) => (e.target.style.borderColor = '#004aad')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Preferred Time
            </label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              onFocus={(e) => (e.target.style.borderColor = '#004aad')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            >
              <option>Morning (9 AM - 12 PM)</option>
              <option>Afternoon (12 PM - 4 PM)</option>
              <option>Evening (4 PM - 8 PM)</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              How can we help you?
            </label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleInputChange}
              rows="3"
              placeholder="Briefly describe your query..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 resize-none"
              onFocus={(e) => (e.target.style.borderColor = '#004aad')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full text-white py-3 px-6 rounded-lg font-medium transition-colors hover:bg-opacity-90"
            style={{ backgroundColor: '#004aad' }}
          >
            Request Callback
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallbackModal
