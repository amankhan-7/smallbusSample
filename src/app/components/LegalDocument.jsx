"use client";
import { useEffect } from 'react';

const LegalDocument = ({ content }) => {
  useEffect(() => {
    const backToTopButton = document.getElementById('backToTop');

    const handleScroll = () => {
      if (backToTopButton) {
        if (window.scrollY > 300) {
          backToTopButton.classList.remove('opacity-0', 'invisible');
          backToTopButton.classList.add('opacity-100', 'visible');
        } else {
          backToTopButton.classList.add('opacity-0', 'invisible');
          backToTopButton.classList.remove('opacity-100', 'visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main className="max-w-[900px] mx-auto my-[100px] mb-[50px] p-10 bg-white rounded-xl shadow-lg">
        <h1 className="text-primary text-3xl font-semibold mb-8">
          {content.title}
        </h1>
        <p className="text-gray-600 italic mb-8 text-sm">
          Last Updated: {content.lastUpdated}
        </p>

        <p className="mb-4 leading-7 text-gray-700">
          {content.introduction}
        </p>

        {content.sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
              {section.title}
            </h2>
            {section.type === 'paragraph' ? (
              <p className="mb-4 leading-7 text-gray-700">
                {section.content}
              </p>
            ) : (
              <ul className="list-disc pl-8 mb-4">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="mb-2.5 leading-6">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Contact Information
        </h2>
        <p className="mb-4">
          {content.contact.title}
          <br />
          Email: {content.contact.email}
          <br />
          Phone: {content.contact.phone}
        </p>
      </main>

      <a
        href="#"
        className="fixed bottom-8 right-8 w-[50px] h-[50px] bg-primary text-white rounded-full flex items-center justify-center no-underline shadow-lg opacity-0 invisible transition-all duration-300 hover:bg-secondary hover:-translate-y-1 hover:shadow-xl"
        id="backToTop"
      >
        <i className="fas fa-arrow-up"></i>
      </a>
    </>
  );
};

export default LegalDocument;
