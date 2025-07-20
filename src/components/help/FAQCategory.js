import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg mb-3 overflow-hidden shadow-sm">
      <button
        className="w-full p-3 bg-white text-left font-medium cursor-pointer flex justify-between items-center transition-colors hover:bg-gray-50 gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-normal text-gray-900 whitespace-nowrap flex-grow">
          {question}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-gray-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`bg-gray-50 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-48 px-5 py-4' : 'max-h-0 px-5 py-0'
        }`}
      >
        <p className="text-gray-700">{answer}</p>
      </div>
    </div>
  )
}

const FAQCategory = ({ title, icon, items }) => {
  return (
    <div className="bg-gray-100 rounded-xl p-8">
      <h3
        className="text-[1.3rem] font-semibold mb-5 flex items-center gap-3"
        style={{ color: '#004aad' }}
      >
        <i className={`fas ${icon}`}></i>
        {title}
      </h3>
      {items.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}

export default FAQCategory
