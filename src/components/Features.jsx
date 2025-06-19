import {
  FaShieldAlt,
  FaClock,
  FaTicketAlt,
  FaHeadset,
} from "react-icons/fa";

export default function FeaturesSection() {
    
   const features = [
    {
      icon: <FaShieldAlt size={24} />,
      title: "Safe Travel",
      desc: "Enhanced safety measures and sanitized buses for worry-free journeys",
    },
    {
      icon: <FaClock size={24} />,
      title: "Live Tracking",
      desc: "Track your bus location in real-time for better journey planning",
    },
    {
      icon: <FaTicketAlt size={24} />,
      title: "Instant Tickets",
      desc: "Get your e-tickets instantly via SMS and email",
    },
    {
      icon: <FaHeadset size={24} />,
      title: "24/7 Support",
      desc: "Round the clock customer service for all your travel needs",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-12">
          Why Choose SmallBus
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-white rounded-xl shadow-sm hover:shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1 text-center p-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#004aad]/10 text-[#004aad] text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
