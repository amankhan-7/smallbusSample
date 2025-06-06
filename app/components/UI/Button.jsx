//Button.jsx
export default function CustomButton({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`block p-3 text-white rounded-lg font-semibold cursor-pointer bg-[#004aad] ${className}`}
    >
      {children}
    </button>
  );
}
