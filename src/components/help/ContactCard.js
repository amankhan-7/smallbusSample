const ContactCard = ({
  icon,
  title,
  description,
  buttonText,
  buttonAction,
  isSecondary,
  highlightText,
}) => {
  return (
    <div className="bg-white rounded-xl p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 border-transparent hover:border-blue-50">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl"
        style={{ backgroundColor: '#e6f0ff', color: '#004aad' }}
      >
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="text-[1.4rem] font-semibold mb-3 text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      {highlightText && (
        <p className="font-bold text-gray-800 mb-6">{highlightText}</p>
      )}
      {buttonText && (
        <button
          onClick={buttonAction}
          className={`${
            isSecondary
              ? 'bg-white border-2 hover:text-white'
              : 'text-white hover:bg-opacity-90'
          } px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5`}
          style={
            isSecondary
              ? {
                  color: '#004aad',
                  borderColor: '#004aad',
                  '--tw-hover-bg': '#004aad',
                }
              : { backgroundColor: '#004aad' }
          }
          onMouseEnter={
            isSecondary
              ? (e) => {
                  e.target.style.backgroundColor = '#004aad'
                  e.target.style.color = 'white'
                }
              : undefined
          }
          onMouseLeave={
            isSecondary
              ? (e) => {
                  e.target.style.backgroundColor = 'white'
                  e.target.style.color = '#004aad'
                }
              : undefined
          }
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}

export default ContactCard
