"use client";
import { useState, useEffect } from "react";
import HelpHeader from "@/components/help/HelpHeader";
import SearchSection from "@/components/help/SearchSection";
import ContactCard from "@/components/help/ContactCard";
import FAQCategory from "@/components/help/FAQCategory";
import CallbackModal from "@/components/help/CallbackModal";
import { useSEO } from "@/hooks/useSEO";
import { SEO_CONFIG } from "@/lib/seo";

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  useSEO({
    title: SEO_CONFIG.pages.help.title,
    description:
      SEO_CONFIG.pages.help.description,
    url: `${SEO_CONFIG.siteUrl}/help`,
    robots: SEO_CONFIG.pages.help.robots,
    openGraph: {
      title: SEO_CONFIG.pages.help.title,
      description: SEO_CONFIG.pages.help.description,
      url: `${SEO_CONFIG.siteUrl}/help`,
    },
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const faqData = [
    {
      title: "Booking & Tickets",
      icon: "fa-ticket-alt",
      items: [
        {
          question: "How do I book a bus ticket?",
          answer:
            "You can book a ticket by selecting your departure and destination cities, choosing your travel date, and selecting from available buses. Complete the booking by making payment.",
        },
        {
          question: "Can I cancel my booking?",
          answer:
            "Yes, you can cancel your booking up to 2 hours before departure. Cancellation charges may apply based on the timing of cancellation.",
        },
        {
          question: "How do I get my ticket?",
          answer:
            "After successful booking, you'll receive an e-ticket via email and SMS. You can also download it from your account or show the booking confirmation on your mobile.",
        },
      ],
    },
    {
      title: "Payment & Refunds",
      icon: "fa-credit-card",
      items: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit/debit cards, net banking, UPI, and digital wallets like Paytm, PhonePe, and Google Pay.",
        },
        {
          question: "How long does it take to get a refund?",
          answer:
            "Refunds are processed within 5-7 business days to your original payment method. The exact time may vary depending on your bank.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, all payments are processed through secure, encrypted gateways. We don't store your payment information on our servers.",
        },
      ],
    },
    {
      title: "Travel & Services",
      icon: "fa-bus",
      items: [
        {
          question: "What amenities are available on buses?",
          answer:
            "Amenities vary by bus type but may include AC, WiFi, charging points, entertainment systems, and refreshments. Check bus details while booking.",
        },
        {
          question: "Can I track my bus location?",
          answer:
            "Yes, you can track your bus in real-time through our mobile app or website using your booking reference number.",
        },
        {
          question: "What if my bus is delayed?",
          answer:
            "You'll receive SMS and email notifications about any delays. In case of significant delays, you may be eligible for compensation or rebooking.",
        },
      ],
    },
  ];

  const filteredFaqData = faqData
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          searchTerm === "" ||
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className="font-sans bg-gray-100 text-gray-900 min-h-screen">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      <HelpHeader />
      <SearchSection
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <ContactCard
              icon="fa-comments"
              title="Live Chat"
              description="Get instant help from our support team. Available 24/7 to assist you with any questions."
              highlightText="Look for the chat widget in the bottom-right corner of your screen to start chatting!"
            />

            <ContactCard
              icon="fa-phone"
              title="Request Callback"
              description="Schedule a call with our support team at your convenience. We'll call you back within 24 hours."
              buttonText="Request Callback"
              buttonAction={() => setIsCallbackModalOpen(true)}
              isSecondary={true}
            />

            <ContactCard
              icon="fa-envelope"
              title="Email Support"
              description="Send us an email and we'll get back to you within 24 hours with a detailed response."
              buttonText="Send Email"
              buttonAction={() =>
                (window.location.href = "mailto:support@smallbus.com")
              }
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-center text-3xl font-bold mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {(searchTerm ? filteredFaqData : faqData).map((category, index) => (
              <FAQCategory
                key={index}
                title={category.title}
                icon={category.icon}
                items={category.items}
              />
            ))}
          </div>
          {searchTerm && filteredFaqData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No results found for "{searchTerm}". Try different keywords.
              </p>
            </div>
          )}
        </div>
      </section>

      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />
    </div>
  );
}
