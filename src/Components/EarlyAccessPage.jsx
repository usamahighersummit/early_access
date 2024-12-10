import React, { useState } from "react";
import { ArrowRight, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import axios from "axios";

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
    // try {
    //   const result = await emailjs.send("service_z996bcy", "template_lfdxgop", {
    //     user_email: email,
    //     signup_time: new Date().toLocaleString(),
    //     source: "Early Access Landing Page Alternative",
    //   });

    //   if (result.status === 200) {
    //     setSubmitted(true);
    //     setError("");
    //     setEmail("");
    //   } else {
    //     throw new Error("Failed to send email");
    //   }
    // } catch (error) {
    //   console.error("EmailJS error:", error);
    //   setError("Failed to sign up. Please try again later.");
    // } finally {
    //   setLoading(false);
    // }

    try {
      axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
      axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      const result = await axios.post(process.env.REACT_APP_REST_API_BASE_URL + "/early_access_engram", {
        method: "POST",
        email: email,
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
      <div className="w-full max-w-[53rem] bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
        {/* Early Access Badge */}
        {/* <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#4A2A5D]/10 text-[#4A2A5D] text-sm font-medium">
            Early Access for September 2024
          </span>
        </div> */}

        {/* Title Section */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Build Lasting Knowledge: Effortless for Teachers, Effective for Students</h1>
          <p className="text-lg text-gray-600">
            Automated spaced retrieval that keeps knowledge fresh throughout the course, reducing revision stress and saving teacher time
          </p>
        </div>

        {/* How It Works Section - Highlighted */}
        <div className="bg-[#4A2A5D]/5 p-6 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-[#4A2A5D] mb-4">How It Works</h2>
          <ul className="space-y-3">
            {[
              "Log topics as you teach them",
              "System automatically engages students within 24 hours",
              "Questions adapt to each student's performance",
              "Clear insights show which topics need revisiting",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-[#4A2A5D] mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          {/* Benefits Grid - Two Columns */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Benefits for Teachers */}
            <div>
              <h3 className="text-xl font-semibold text-[#4A2A5D] mb-3">Benefits for Teachers</h3>
              <ul className="space-y-2">
                {[
                  "Save hours on creating revision materials",
                  "Clear data on knowledge retention",
                  "Evidence of retrieval practice for SLT",
                  "Minimal time to manage",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#4A2A5D] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits for Students */}
            <div>
              <h3 className="text-xl font-semibold text-[#4A2A5D] mb-3">Benefits for Students</h3>
              <ul className="space-y-2">
                {[
                  "Knowledge stays fresh throughout the course",
                  "No more overwhelming revision before exams",
                  "Build confidence through regular success",
                  "Learn at their own pace",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#4A2A5D] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Better Exam Performance - Perfectly Centered */}
          <div className="w-1/2 mx-auto">
            <h3 className="text-xl font-semibold text-[#4A2A5D] mb-3">Better Exam Performance</h3>
            <ul className="space-y-2">
              {[
                "Students sit exams with secure knowledge",
                "More time for exam technique practice",
                "Reduced stress means clearer thinking",
                "Better recall for analysis tasks",
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#4A2A5D] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form Section */}
        <div className="mb-4">
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
                      Request Early Access
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

        <p className="text-center text-sm text-gray-600">
          Join forward-thinking departments already preparing for September 2024. Limited places available.
        </p>
      </div>
    </div>
  );
};

export default EarlyAccessPage;
