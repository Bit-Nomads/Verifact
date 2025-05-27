import React from "react";
import heroImage from "../assets/images/verifact-hero-graphic.png";
import verifactImage from "../assets/images/verifact-image.png";


const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 overflow-hidden">
      <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
        <div className="w-96 h-96 bg-sky-200/30 rounded-full filter blur-3xl opacity-70"></div>
      </div>
      <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
        <div className="w-80 h-80 bg-blue-300/30 rounded-full filter blur-3xl opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block">Uncover Truth.</span>
            <span className="block text-blue-600">
              Instantly Verify Information.
            </span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-lg text-slate-600 sm:text-xl md:mt-8 md:max-w-2xl">
            Verifact empowers you with fast, AI-driven fact-checking. Cut
            through the noise and access reliable insights from trusted sources
            in seconds.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5 md:flex-row md:gap-3 sm:flex-row sm:items-center">
              {/* Main CTA */}
              <a
                href="#" // To be linked to verification page
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-transform duration-150 ease-in-out hover:scale-105 md:py-4 md:text-lg md:px-10"
              >
                Verify a Claim Now
              </a>
              {/* Secondary CTA */}
              <a
                href="#" // To be linked to How It Works section
                className="flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-semibold rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-transform duration-150 ease-in-out hover:scale-105 md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Optional: Image/Graphic Placeholder- this will be a screenshot of the verification page */}
        <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
            <img
              className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none opacity-90"
              src={verifactImage}
              alt="Verifact application mockup or illustrative graphic"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
