const SearchSection = ({ searchTerm, onSearchChange }) => {
  return (
    <section className="bg-white py-10 shadow-sm">
      <div className="max-w-6xl mx-auto px-5">
        <div className="max-w-2xl mx-auto relative">
          <i className="fas fa-search absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full py-4 px-5 pl-12 border-2 border-gray-300 rounded-xl text-lg transition-all focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': 'rgba(0, 74, 173, 0.1)' }}
            onFocus={(e) => (e.target.style.borderColor = '#004aad')}
            onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            placeholder="Search for help articles..."
          />
        </div>
      </div>
    </section>
  )
}

export default SearchSection
