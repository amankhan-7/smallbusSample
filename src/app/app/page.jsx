import React from "react";

const SmallbusDownload = () => {
  return (
    <section className="font-poppins bg-white text-black flex flex-col justify-center items-start min-h-screen px-5 py-10 sm:px-8 md:px-16 lg:px-20">
      <h1 className="text-[#004aad] font-bold text-md md:text-2xl sm:text-[32px] mb-4">
        welcome to smallbus
      </h1>

      <p className="text-[14px] sm:text-[16px] leading-relaxed mb-6">
        we officially launched on <strong>15th August</strong>! 🎉<br />
        our app will be live soon on{" "}
        <span className="font-semibold text-[#004aad]">Google Play Store</span>
        , but you can start booking your rides right away:
      </p>

      <a
        href="smallbus.in/app"
        className="inline-block bg-[#004aad] text-white no-underline py-3 px-6 sm:py-4 sm:px-8 rounded-xl font-semibold text-[15px] sm:text-[16px] transition-colors duration-300 mb-4 hover:bg-[#003380]"
      >
        Download App
      </a>

      <a
        href="https://smallbus.in"
        className="inline-block border-2 border-[#004aad] text-[#004aad] no-underline py-2.5 px-6 sm:py-3 sm:px-7 rounded-lg font-semibold text-[13px] sm:text-[14px] transition-all duration-300 hover:bg-[#004aad] hover:text-white"
      >
        Book via smallbus.in
      </a>
    </section>
  );
};

export default SmallbusDownload;
