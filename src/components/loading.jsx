import LoadingScreen from "./ui/loading";
import { LoadingSpinnerSkeleton } from "./ui/skeletons";

export default function LoadingPage({ useSkeleton = false }) {
  if (useSkeleton) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinnerSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingScreen />
    </div>
  );
}
