import React, { useState, useEffect } from 'react';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Set the launch date (e.g., 14 days from now for demo purposes)
  const [targetDate] = useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Timer Logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => setIsSubmitted(true), 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden font-sans">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl px-6 py-12 text-center">
        
        {/* Brand / Logo Area */}
        <div className="mb-8 flex justify-center items-center space-x-2">
          {/* Simple Geometric Logo SVG */}
          <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
          </svg>
          <span className="text-2xl font-bold tracking-wider uppercase">Nexus</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Something amazing <br /> is in the works.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          We are crafting an experience that redefines how you interact with digital spaces. 
          Stay tuned for the revolution.
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
          <TimeBox value={timeLeft.days} label="Days" />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Minutes" />
          <TimeBox value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Mail Icon SVG */}
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg leading-5 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
              >
                Notify Me
                {/* Arrow Right SVG */}
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-lg bg-green-900/30 border border-green-500/50 text-green-300 animate-fade-in flex items-center justify-center">
              {/* Check Circle SVG */}
              <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>You're on the list! We'll be in touch.</span>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-16 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Nexus Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

// Sub-component for Timer Blocks
const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
    <span className="text-3xl md:text-4xl font-bold text-white font-mono">
      {value < 10 ? `0${value}` : value}
    </span>
    <span className="text-xs uppercase tracking-widest text-gray-400 mt-1">{label}</span>
  </div>
);

export default ComingSoon;