import React, { useState, useEffect, useRef } from 'react';

const KoboLinkPrototype = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [formData, setFormData] = useState({
    phone: '',
    otp: ['', '', '', '', '', ''],
    fullName: '',
    username: '',
    pin: '',
    profilePhoto: null
  });
  const [otpTimer, setOtpTimer] = useState(45);
  const [showPin, setShowPin] = useState(false);
  const [showOtpSentMessage, setShowOtpSentMessage] = useState(false); // New state for OTP sent message

  // Refs for OTP inputs
  const otpInputRefs = useRef([]);

  // OTP Timer
  useEffect(() => {
    if (currentScreen === 'otp' && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (currentScreen === 'otp' && otpTimer === 0) {
      // Optionally reset timer or show resend option without timer
      // For now, it just stops counting.
    }
  }, [currentScreen, otpTimer]);

  // Handle OTP input change and auto-focus
  const handleOtpChange = (index, value) => {
    // Only allow single digit input
    if (value.length <= 1) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData({ ...formData, otp: newOtp });

      // Auto-focus next input if a digit was entered and it's not the last input
      if (value && index < 5 && otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle keydown for OTP inputs (e.g., backspace)
  const handleOtpKeyDown = (index, e) => {
    // If backspace is pressed and current input is empty, move to previous input
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event for OTP
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (pasteData.match(/^\d{6}$/)) { // Check if it's a 6-digit number
      const newOtp = pasteData.split('');
      setFormData({ ...formData, otp: newOtp });

      // Focus the last input after pasting, or the first if already at the end
      if (otpInputRefs.current[5]) {
        otpInputRefs.current[5].focus();
      }
      console.log("OTP pasted.");
    }
  };

  // Generic button click handler for console logging
  const handleSimulatedAction = (actionName) => {
    console.log(`Simulating action: ${actionName}`);
  };

  // Handle "Send Verification Code" button click
  const handleSendOtp = () => {
    handleSimulatedAction("OTP sent to " + formData.phone);
    setShowOtpSentMessage(true); // Show confirmation message
    setOtpTimer(45); // Reset timer for simulation (this timer is for the OTP screen, but good to reset it here too)

    // Delay the screen transition so the user can see the "OTP Sent!" message
    setTimeout(() => {
      setShowOtpSentMessage(false); // Hide the message after the delay
      setCurrentScreen('otp');      // Then transition to the OTP screen
    }, 1500); // Display message for 1.5 seconds before transitioning
  };

  // Handle "Verify Code" button click
  const handleVerifyOtp = () => {
    handleSimulatedAction("OTP verification successful");
    setCurrentScreen('profile');
  };


  // Inline SVG components for better control and guaranteed rendering
  const ArrowLeftIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );

  const CameraIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );

  const EyeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOffIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.06 18.06 0 0 1 4.38-5.32M2 2l20 20M7.07 7.07A5 5 0 0 1 12 10a5 5 0 0 1 5 5c0 1.27-.3 2.47-.94 3.53M12 7v.01" />
    </svg>
  );

  const FingerprintIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20v-2" />
      <path d="M10.85 15.65a4 4 0 0 0 5.48 0" />
      <path d="M7 11.2a7 7 0 0 1 9.53 4.38" />
      <path d="M17.5 17.5a9.5 9.5 0 0 0 0-11.5" />
      <path d="M5.3 11.3a9.5 9.5 0 0 1 0 11.4" />
      <path d="M8.5 7.3a12 12 0 0 1 0 13.4" />
      <path d="M15.5 4.3a12 12 0 0 0 0 13.4" />
    </svg>
  );

  const SmileIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );

  const CheckIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17 4 12" />
    </svg>
  );


  const screens = {
    welcome: (
      <div className="flex flex-col h-full bg-white font-sans">
        {/* Main content area - made scrollable */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 overflow-y-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
            K
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">KoboLink</h1>
          <p className="text-gray-600 text-center mb-8">
            Share money like <span className="text-green-600 font-semibold">gist</span>! 💰
          </p>

          <div className="w-full max-w-sm mb-8">
            <p className="text-center text-gray-700 mb-6">
              The easiest way to split bills and send money to your <span className="text-green-600 font-semibold">squad</span>!
            </p>

            <div className="bg-gray-50 p-6 rounded-xl text-center shadow-md">
              <div className="text-4xl mb-3">⚡</div>
              <p className="font-semibold text-gray-800">Fast transfers in seconds</p>
              <p className="text-sm text-gray-600 mt-2">Send money faster than you can say "send am"</p>
            </div>
          </div>
        </div>

        {/* Buttons section - fixed at the bottom */}
        <div className="p-6 space-y-3 flex-shrink-0">
          <button
            onClick={() => setCurrentScreen('phone')}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Get Started 🚀
          </button>
          <button
            onClick={() => setCurrentScreen('login')}
            className="w-full border-2 border-green-600 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            I already have an account
          </button>
        </div>
      </div>
    ),

    phone: (
      <div className="flex flex-col h-full bg-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button onClick={() => setCurrentScreen('welcome')} className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-green-600">Phone Number</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center py-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 mb-6">
          <div className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">
              What's your <span className="text-green-600">number</span>? 📱
            </h3>
            <p className="text-gray-600">We'll send you a quick verification code</p>
          </div>

          <div className="mb-6">
            <label htmlFor="phone-input" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="flex space-x-3">
              <select className="w-24 p-4 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none text-lg shadow-sm">
                <option>🇳🇬 +234</option>
              </select>
              <input
                id="phone-input"
                type="tel"
                placeholder="801 234 5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none text-lg shadow-sm"
              />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-xl shadow-inner">
            <p className="text-sm text-green-800">
              📌 <span className="font-semibold">Why we need this:</span> Your phone number helps your friends find you easily and keeps your account secure.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 flex-shrink-0">
          <button
            onClick={handleSendOtp} // Use the new handler
            disabled={!formData.phone || formData.phone.length < 10} // Basic validation
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Send Verification Code 📨
          </button>
          {showOtpSentMessage && (
            <p className="text-center text-sm text-green-600 mt-2 font-semibold animate-pulse">
              OTP Sent! (Simulated)
            </p>
          )}
        </div>
      </div>
    ),

    otp: (
      <div className="flex flex-col h-full bg-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button onClick={() => setCurrentScreen('phone')} className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-green-600">Verification</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center py-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 mb-6">
          <div className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">
              Check your <span className="text-green-600">messages</span>! 💬
            </h3>
            <p className="text-gray-600">
              Enter the 6-digit code we sent to<br />
              <span className="font-semibold">+234 {formData.phone}</span>
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center space-x-3 mb-8">
            {formData.otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={index === 0 ? handleOtpPaste : null} // Only listen to paste on the first input
                ref={el => otpInputRefs.current[index] = el}
                className="w-12 h-12 border-2 border-gray-200 rounded-lg text-center text-xl font-semibold focus:border-green-600 focus:outline-none shadow-sm transition-all duration-200"
              />
            ))}
          </div>

          {/* Resend Options */}
          <div className="text-center text-gray-600 mb-6">
            <p>Didn't receive the code?</p>
            <div className="mt-2 space-x-4">
              <button
                className={`text-green-600 font-medium ${otpTimer === 0 ? 'hover:underline' : 'cursor-not-allowed opacity-70'}`}
                disabled={otpTimer > 0}
                onClick={() => { setOtpTimer(45); console.log("Resending OTP..."); }}
              >
                {otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Resend Code'}
              </button>
              <span className="text-gray-400">|</span>
              <button onClick={() => handleSimulatedAction("Use WhatsApp for OTP")} className="text-green-600 font-medium hover:underline">
                Use WhatsApp instead
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 flex-shrink-0">
          <button
            onClick={handleVerifyOtp} // Use the new handler
            disabled={!formData.otp.every(digit => digit !== '')} // Enable only when all 6 digits are filled
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Verify Code <CheckIcon className="inline w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    ),

    profile: (
      <div className="flex flex-col h-full bg-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button onClick={() => setCurrentScreen('otp')} className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-green-600">Profile Setup</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center py-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 mb-6">
          <div className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">
              Let's set up your <span className="text-green-600">profile</span>! 👤
            </h3>
            <p className="text-gray-600">This helps your friends recognize you</p>
          </div>

          {/* Profile Photo Upload */}
          <div className="text-center mb-8">
            <div
              onClick={() => handleSimulatedAction("Add profile photo")}
              className="w-24 h-24 border-3 border-dashed border-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center text-gray-400 text-3xl cursor-pointer hover:border-green-600 hover:text-green-600 transition-all duration-200 shadow-inner"
              title="Tap to add photo (optional)"
            >
              <CameraIcon className="w-10 h-10" />
            </div>
            <p className="text-sm text-gray-600">Tap to add photo (optional)</p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="full-name-input" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                id="full-name-input"
                type="text"
                placeholder="e.g., Tobi Adebayo"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none text-lg shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="username-input" className="block text-sm font-medium text-gray-700 mb-2">Choose Username</label>
              <input
                id="username-input"
                type="text"
                placeholder="e.g., @tobi_ada"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none text-lg shadow-sm"
              />
              <p className="text-sm text-gray-600 mt-2">Your friends can send money using this username</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 flex-shrink-0">
          <button
            onClick={() => setCurrentScreen('security')}
            disabled={!formData.fullName || !formData.username}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Continue 🎯
          </button>
        </div>
      </div>
    ),

    security: (
      <div className="flex flex-col h-full bg-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button onClick={() => setCurrentScreen('profile')} className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-green-600">Security Setup</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center py-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 mb-6">
          <div className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">
              Secure your <span className="text-green-600">wallet</span>! 🔐
            </h3>
            <p className="text-gray-600">Choose how you want to protect your money</p>
          </div>

          {/* PIN Input */}
          <div className="mb-6">
            <label htmlFor="pin-input" className="block text-sm font-medium text-gray-700 mb-2">Create Transaction PIN</label>
            <div className="relative">
              <input
                id="pin-input"
                type={showPin ? "text" : "password"}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, '') })} // Only allow digits
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none text-lg pr-12 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
                title={showPin ? "Hide PIN" : "Show PIN"}
              >
                {showPin ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">You'll use this to confirm transfers</p>
          </div>

          {/* Quick Login Options */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
            <p className="font-semibold text-gray-800 mb-4">Quick Login Options:</p>

            <div className="space-y-3">
              <div className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-600 hover:bg-green-50 transition-all duration-200 shadow-sm" onClick={() => handleSimulatedAction("Fingerprint Login Toggle")}>
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white mr-4 shadow-md">
                  <FingerprintIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Fingerprint Login</p>
                  <p className="text-sm text-gray-600">Quick and secure access</p>
                </div>
              </div>

              <div className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-600 hover:bg-green-50 transition-all duration-200 shadow-sm" onClick={() => handleSimulatedAction("Face ID Login Toggle")}>
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white mr-4 shadow-md">
                  <SmileIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Face ID Login</p>
                  <p className="text-sm text-gray-600">Look and unlock instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 flex-shrink-0">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            disabled={formData.pin.length !== 4}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Complete Setup 🎉
          </button>
        </div>
      </div>
    ),

    dashboard: (
      <div className="flex flex-col h-full bg-white font-sans">
        {/* Top Section - Wallet Balance */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white text-center rounded-b-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2">Welcome, {formData.fullName.split(' ')[0] || 'User'}! 🎉</h3>
          <p className="text-green-100 mb-4">Your wallet is ready to go. User ID: <span className="font-mono text-sm">{typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'}_user_id_placeholder</span></p> {/* Placeholder for actual User ID */}
          <div className="text-4xl font-bold mb-2">₦0.00</div>
          <p className="text-sm text-green-100 opacity-90">Tap here to fund your wallet</p>
        </div>

        {/* Quick Actions */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => handleSimulatedAction("Send Money")}
                className="text-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-600 hover:bg-green-50 transition-all cursor-pointer shadow-sm active:shadow-md active:scale-98 transform"
              >
                <div className="text-3xl mb-2">💸</div>
                <p className="text-sm font-medium text-gray-700">Send Money</p>
              </div>
              <div
                onClick={() => handleSimulatedAction("Split Bill")}
                className="text-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-600 hover:bg-green-50 transition-all cursor-pointer shadow-sm active:shadow-md active:scale-98 transform"
              >
                <div className="text-3xl mb-2">🧾</div>
                <p className="text-sm font-medium text-gray-700">Split Bill</p>
              </div>
            </div>
          </div>

          {/* Pro Tip / Promotion */}
          <div className="bg-green-50 p-4 rounded-xl shadow-inner">
            <p className="text-green-800">
              <span className="font-semibold">🎯 Pro tip:</span> Invite friends to get ₦100 bonus when they complete their first transfer!
            </p>
          </div>
        </div>

        {/* Bottom Section - Navigation/CTA */}
        <div className="p-6 flex-shrink-0">
          <button
            onClick={() => handleSimulatedAction("Start Using KoboLink")}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Start Using KoboLink
          </button>
          <div className="text-center mt-4 text-sm text-gray-500">
            Registration complete! 🎉
          </div>
        </div>
      </div>
    ),

    login: (
      <div className="flex flex-col h-full bg-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button onClick={() => setCurrentScreen('welcome')} className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-green-600">Welcome Back</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center p-6 overflow-y-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
              K
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Welcome back!</h3>
            <p className="text-gray-600">Sign in to continue sending money to your squad</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="login-id-input" className="block text-sm font-medium text-gray-700 mb-2">Phone Number or Username</label>
              <input
                id="login-id-input"
                type="text"
                placeholder="Enter phone number or @username"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none text-lg shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="login-pin-input" className="block text-sm font-medium text-gray-700 mb-2">PIN</label>
              <input
                id="login-pin-input"
                type="password"
                placeholder="Enter your 4-digit PIN"
                maxLength={4}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none text-lg shadow-sm"
              />
            </div>

            <button
              onClick={() => handleSimulatedAction("Sign In")}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
              Sign In
            </button>

            <div className="flex justify-center space-x-6 mt-6">
              <button
                onClick={() => handleSimulatedAction("Fingerprint Login")}
                className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full hover:bg-green-50 transition-all shadow-md active:shadow-lg active:scale-98 transform focus:outline-none focus:ring-2 focus:ring-gray-300"
                title="Login with Fingerprint"
              >
                <FingerprintIcon className="w-8 h-8 text-green-600" />
              </button>
              <button
                onClick={() => handleSimulatedAction("Face ID Login")}
                className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full hover:bg-green-50 transition-all shadow-md active:shadow-lg active:scale-98 transform focus:outline-none focus:ring-2 focus:ring-gray-300"
                title="Login with Face ID"
              >
                <SmileIcon className="w-8 h-8 text-green-600" />
              </button>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => handleSimulatedAction("Forgot PIN")}
                className="text-green-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 rounded-md p-1"
              >
                Forgot PIN?
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    // Main container simulating a device frame
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Device frame styling */}
      <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl relative">
        {/* Notch for realistic phone look */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-lg z-10"></div>
        {/* Speaker and Camera dot */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
            <div className="w-10 h-1.5 bg-gray-600 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full ml-2"></div>
        </div>

        {/* Actual phone screen */}
        <div className="bg-white rounded-2xl w-80 h-[640px] overflow-hidden relative shadow-inner">
          {/* Status bar */}
          <div className="h-6 bg-black flex items-center justify-between px-4 text-white text-xs font-mono">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              {/* Wi-Fi Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55S2 9 2 5c0-1.66 1.34-3 3-3s3 1.34 3 3c0 3.88-2.43 6.64-2.82 7.55M12 12.55s3-3.55 3-7.55c0-1.66-1.34-3-3-3s-3 1.34-3 3c0 3.88 2.43 6.64 2.82 7.55M19 12.55s3-3.55 3-7.55c0-1.66-1.34-3-3-3s-3 1.34-3 3c0 3.88 2.43 6.64 2.82 7.55" />
              </svg>
              {/* Battery Icon */}
              <div className="w-4 h-2 border border-white rounded-sm relative">
                <div className="w-3 h-1 bg-white rounded-sm absolute top-1/2 left-0 transform -translate-y-1/2"></div>
                <div className="w-0.5 h-1.5 bg-white absolute -right-0.5 top-1/2 transform -translate-y-1/2"></div>
              </div>
            </div>
          </div>

          {/* Screen content */}
          <div className="h-full">
            {screens[currentScreen]}
          </div>
        </div>

        {/* Testing controls */}
        <div className="mt-6 text-center">
          <p className="text-white text-sm mb-2">Testing Controls:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.keys(screens).map(screen => (
              <button
                key={screen}
                onClick={() => setCurrentScreen(screen)}
                className={`px-3 py-1 rounded text-xs font-semibold ${
                  currentScreen === screen
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400`}
              >
                {screen}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoboLinkPrototype;
