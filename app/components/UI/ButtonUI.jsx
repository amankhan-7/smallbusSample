//Button.jsx
export default function CustomButton({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`block cursor-pointer bg-[#004aad] text-white md:p-3 font-semibold rounded-lg ${className}`}
    >
      {children}
    </button>
  );
}
