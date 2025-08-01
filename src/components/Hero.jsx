import Features from "@/components/Features";
import PopularRoutes from "@/components/PopularRoutes";
import SearchBar from "@/components/SearchBar";

function Hero() {
  return (
    <div className="relative flex flex-col bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900 leading-relaxed items-center w-full">
      <SearchBar />
      <Features />
      <PopularRoutes />
    </div>
  );
}

export default Hero;
