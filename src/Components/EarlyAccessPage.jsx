import React, { useState } from "react";
import { ArrowRight, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS
emailjs.init("wq466uVBRSDmwOr4V");

const CustomAlert = ({ variant = "default", children }) => {
  const styles = {
    default: "bg-gray-50 border-gray-200 text-gray-800",
    destructive: "bg-red-50 border-red-200 text-red-800",
    success: "bg-purple-50 border-purple-200 text-purple-800",
  };

  return (
    <div className={`flex items-center p-4 rounded-lg border ${styles[variant]}`}>
      {variant === "destructive" && <AlertCircle className="h-5 w-5 text-red-600 mr-2" />}
      {variant === "success" && <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2" />}
      <div>{children}</div>
    </div>
  );
};

const EarlyAccessPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = await emailjs.send("service_z996bcy", "template_lfdxgop", {
        user_email: email,
        signup_time: new Date().toLocaleString(),
        source: "Early Access Landing Page Alternative",
      });

      if (result.status === 200) {
        setSubmitted(true);
        setError("");
        setEmail("");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setError("Failed to sign up. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#4A2A5D] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Main Card Container */}
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
        {/* Early Access Badge */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#4A2A5D]/10 text-[#4A2A5D] text-sm font-medium">Early Access Now Open</span>
        </div>

        {/* Title Section */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="text-gray-900">
              Master Science
              <br />
              Through
            </span>
            <span className="block text-[#4A2A5D] mt-2">Smart Learning</span>
          </h1>

          <p className="text-lg text-gray-600">
            Revolutionizing science education with spaced retrieval learning. Join our early access program to transform how you learn and retain
            knowledge.
          </p>
        </div>

        {/* Form Section */}
        <div className="mb-8">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="block w-full rounded-xl border border-gray-200 pl-10 py-3 text-gray-900 focus:ring-2 focus:ring-[#4A2A5D] focus:border-[#4A2A5D]"
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-xl bg-[#4A2A5D] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#5d3574] focus:outline-none focus:ring-2 focus:ring-[#4A2A5D] focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Get Early Access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <div className="mt-4">
                  <CustomAlert variant="destructive">{error}</CustomAlert>
                </div>
              )}
            </form>
          ) : (
            <CustomAlert variant="success">Thanks for signing up! We'll notify you when we launch.</CustomAlert>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 text-center">
          {["Personalized Learning Path", "Smart Study Schedules", "Enhanced Memory Retention", "Progress Tracking"].map((feature, index) => (
            <div key={index} className="p-4 rounded-xl bg-[#4A2A5D]/5 border border-[#4A2A5D]/10">
              <CheckCircle2 className="h-5 w-5 text-[#4A2A5D] mx-auto mb-2" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessPage;
