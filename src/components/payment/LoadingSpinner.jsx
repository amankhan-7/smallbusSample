export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="animate-pulse text-gray-500">
        Loading payment details...
      </div>
    </div>
  );
}
