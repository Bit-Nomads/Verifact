import React from "react";
import {
  UsersIcon,
  CheckBadgeIcon,
  CpuChipIcon
} from '@heroicons/react/24/solid';

const Features = () => {
  return (
    <div className="py-20 px-6 bg-slate-50" id="reason">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
          Why Use Verifact?
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Fast & Accurate  */}
          <div className="p-8 bg-white rounded-xl shadow-lg text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
            <CheckBadgeIcon
              className="h-12 w-12 text-blue-600 mx-auto mb-5"
              aria-hidden="true"
            />
            <h3 className="font-semibold text-xl text-slate-800 mb-3">
              Fast & Accurate
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Get instant feedback on claims with meticulously vetted sources.
            </p>
          </div>

          {/* Card 2: AI-Powered */}
          <div className="p-8 bg-white rounded-xl shadow-lg text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
            <CpuChipIcon
              className="h-12 w-12 text-green-600 mx-auto mb-5"
              aria-hidden="true"
            />
            <h3 className="font-semibold text-xl text-slate-800 mb-3">
              AI-Powered
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Advanced AI cross-references data across news, reports, journals &
              more.
            </p>
          </div>

          {/* Card 3: Built for Everyone */}
          <div className="p-8 bg-white rounded-xl shadow-lg text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
            <UsersIcon
              className="h-12 w-12 text-purple-600 mx-auto mb-5"
              aria-hidden="true"
            />
            <h3 className="font-semibold text-xl text-slate-800 mb-3">
              Built for Everyone
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Whether you're a student, journalist, researcher, or just curious
              — it's for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
