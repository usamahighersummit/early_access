import React, { useState } from "react";
import { ArrowRight, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init(process.env.REACT_APP_EMAILJS_PK); // Replace with your actual public key

const CustomAlert = ({ variant = "default", children }) => {
  const styles = {
    default: "bg-gray-50 border-gray-200 text-gray-800",
    destructive: "bg-red-50 border-red-200 text-red-800",
    success: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800",
  };

  return (
    <div className={`flex items-center p-4 rounded-lg border ${styles[variant]}`}>
      {variant === "destructive" && <AlertCircle className="h-5 w-5 text-red-600 mr-2" />}
      {variant === "success" && <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />}
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
      // Send notification to stakeholders
      const result = await emailjs.send(
        "service_oqg80pa", // Replace with your EmailJS service ID
        "template_8dinhpl", // Replace with your EmailJS template ID
        {
          user_email: email,
        }
      );

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        <div className="text-center relative">
          {/* Decorative elements */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute -top-4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -top-4 right-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="relative space-y-8 bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">Early Access Now Open</span>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Master Science Through
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">Smart Learning</span>
            </h1>

            <p className="text-lg sm:text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
              Revolutionizing science education with spaced retrieval learning. Our platform helps students retain knowledge longer and understand
              concepts deeper.
            </p>

            <div className="mt-8">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-lg">
                    <div className="relative flex-grow">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="block w-full rounded-xl border border-gray-200 pl-10 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={loading}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessPage;
