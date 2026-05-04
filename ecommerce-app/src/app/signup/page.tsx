"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Auth3dGraphic from "@/components/Auth3dGraphic";

const SIGNUP_EMAIL_KEY = "signupEmail";
const SIGNUP_ATTEMPT_CACHE_KEY = "signupAttempt";

type SignupStep = "form" | "otp";

interface OTPData {
  email: string;
  otp: string;
  expiresAt: number;
  attempts: number;
}

const getFriendlySignUpMessage = (error: unknown) => {
  const message = String((error as { message?: unknown })?.message ?? "").toLowerCase();

  if ((error as { status?: number })?.status === 429 || message.includes("rate limit") || message.includes("email rate limit")) {
    return "Too many signup attempts. Please wait 10 minutes before trying again.";
  }

  if (message.includes("already registered") || message.includes("already exists") || message.includes("user already registered")) {
    return "An account already exists for this email. Please sign in or use password recovery if needed.";
  }

  return (error as { message?: string })?.message ?? "Signup failed. Please try again.";
};

const getCachedSignupAttempt = () => {
  if (typeof window === "undefined") return null;
  const item = window.localStorage.getItem(SIGNUP_ATTEMPT_CACHE_KEY);
  if (!item) return null;

  try {
    return JSON.parse(item) as { email: string; timestamp: number };
  } catch {
    return null;
  }
};

const cacheSignupAttempt = (email: string) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    SIGNUP_ATTEMPT_CACHE_KEY,
    JSON.stringify({ email, timestamp: Date.now() })
  );
};

export default function SignupPage() {
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(SIGNUP_EMAIL_KEY) ?? "";
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // OTP State
  const [step, setStep] = useState<SignupStep>("form");
  const [otpData, setOtpData] = useState<OTPData | null>(null);
  const [otpInput, setOtpInput] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (step === "otp" && timeLeft > 0 && !otpSuccess) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [step, timeLeft, otpSuccess]);

  // Check if OTP expired
  useEffect(() => {
    if (step === "otp" && otpData && Date.now() >= otpData.expiresAt && !otpSuccess) {
      setOtpError("OTP has expired. Please request a new one.");
      setOtpInput("");
    }
  }, [step, otpData, otpSuccess]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (email) {
      window.localStorage.setItem(SIGNUP_EMAIL_KEY, email);
    } else {
      window.localStorage.removeItem(SIGNUP_EMAIL_KEY);
    }
  }, [email]);

  const handleGoogleAuth = async () => {
    if (typeof window === "undefined") return;
    setStatusMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setStatusMessage(getFriendlySignUpMessage(error));
      setLoading(false);
    }
  };

  const handleGenerateOTP = async () => {
    setOtpLoading(true);
    setOtpError("");
    
    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOtpError(data.error || "Failed to generate OTP");
        return;
      }

      setOtpData({
        email,
        otp: data.otp,
        expiresAt: data.expiresAt,
        attempts: 0,
      });
      setTimeLeft(60);
      setIsBlocked(false);
      setStep("otp");
    } catch (err) {
      setOtpError("Failed to generate OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpInput || otpInput.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", email, otp: otpInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.expired) {
          setOtpError(data.error);
          setOtpInput("");
        } else {
          setOtpError(data.error);
        }
        return;
      }

      if (data.verified) {
        setOtpSuccess(true);
        // Now create the user in Supabase with auto-confirmation
        try {
          const createResponse = await fetch("/api/auth/signup-verified", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const createData = await createResponse.json();

          if (!createResponse.ok) {
            setOtpError(createData.error || "Failed to create account");
            setOtpSuccess(false);
            setOtpInput("");
            return;
          }

          cacheSignupAttempt(email);
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(SIGNUP_EMAIL_KEY);
          }
          setStatusMessage("✅ Account created and verified successfully!");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setOtpInput("");
          
          // Redirect to login after short delay
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } catch (err) {
          setOtpError("Failed to create account. Please try again.");
          setOtpSuccess(false);
          setOtpInput("");
        }
      }
    } catch (err) {
      setOtpError("Failed to verify OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setOtpLoading(true);
    setOtpError("");
    setOtpInput("");

    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resend", email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOtpError(data.error || "Failed to resend OTP");
        return;
      }

      setOtpData({
        email,
        otp: data.otp,
        expiresAt: data.expiresAt,
        attempts: 0,
      });
      setTimeLeft(60);
      setIsBlocked(false);
    } catch (err) {
      setOtpError("Failed to resend OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleBackToForm = () => {
    setStep("form");
    setOtpData(null);
    setOtpInput("");
    setOtpError("");
    setOtpSuccess(false);
    setTimeLeft(60);
    setIsBlocked(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");

    if (password !== confirmPassword) {
      setStatusMessage("Passwords do not match.");
      return;
    }

    const cachedAttempt = getCachedSignupAttempt();
    if (
      cachedAttempt?.email === email &&
      Date.now() - cachedAttempt.timestamp < 1000 * 60 * 10
    ) {
      setStatusMessage(
        "A confirmation email was already sent to this address. Please check your inbox and spam folder."
      );
      return;
    }

    // Generate OTP instead of directly signing up
    await handleGenerateOTP();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 md:p-8 text-slate-900 overflow-x-hidden">
      {/* Absolute Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed left-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-xl shadow-slate-200/50 hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-95 md:left-10 md:top-10"
        aria-label="Go Back"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="w-full max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] xl:gap-16 items-center">
          <div className="hidden lg:block transition-all hover:scale-105 duration-700">
             <Auth3dGraphic />
          </div>
          
          <div className="rounded-[3rem] bg-white p-8 md:p-12 premium-shadow border border-slate-100 flex flex-col items-center">
            <div className="mb-8 transition-transform hover:scale-110 duration-500">
              <Link href="/">
                <img src="/logo.png" alt="Asali Swad Logo" className="h-16 w-16 rounded-2xl object-cover shadow-2xl border-4 border-white" />
              </Link>
            </div>
            
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`h-2 w-8 rounded-full transition-all ${step === "form" ? "bg-emerald-500" : "bg-emerald-200"}`}></div>
              <div className={`h-2 w-8 rounded-full transition-all ${step === "otp" ? "bg-emerald-500" : "bg-slate-200"}`}></div>
            </div>

            {step === "form" ? (
              // Original Registration Form
              <>
                <div className="text-center mb-8">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Join Us</span>
                   <h1 className="mt-2 text-3xl md:text-4xl font-black tracking-tight text-slate-900">Create Account</h1>
                   <p className="mt-3 text-sm font-bold text-slate-400">Join the premium spice community today.</p>
                </div>

                <div className="w-full space-y-6">
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border-2 border-slate-50 bg-white px-6 text-sm font-black uppercase tracking-widest text-slate-700 transition-all hover:border-emerald-500/20 hover:bg-slate-50 hover:shadow-xl hover:shadow-emerald-900/5 disabled:opacity-50"
                  >
                    <svg viewBox="0 0 533.5 544.3" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272.1v95.5h146.9c-6.4 34.5-25.7 63.7-54.7 83.3v68.9h88.3c51.6-47.5 81.9-117.8 81.9-197.3z"/>
                      <path fill="#34A853" d="M272.1 544.3c73.7 0 135.6-24.4 180.8-66.1l-88.3-68.9c-24.5 16.4-55.8 26-92.4 26-71 0-131-47.9-152.4-112.4H32.8v70.7c45.5 90.1 140 150.7 239.3 150.7z"/>
                      <path fill="#FBBC05" d="M119.7 322.9c-10.9-32.7-10.9-67.9 0-100.6V151.6H32.8c-38.5 76.9-38.5 168.8 0 245.7l86.9-74.4z"/>
                      <path fill="#EA4335" d="M272.1 107.7c39.9 0 75.8 13.7 104.1 40.7l78.1-78.1C402 24.5 339.5 0 272.1 0 173.8 0 79.4 60.6 33.9 150.7l86 70.8C141.1 155.6 201.1 107.7 272.1 107.7z"/>
                    </svg>
                    Google Sign Up
                  </button>

                  <div className="flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                    <span className="h-px flex-1 bg-slate-100"></span>
                    <span className="mx-4">or manual registration</span>
                    <span className="h-px flex-1 bg-slate-100"></span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                      <div className="group relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none transition-all placeholder:text-slate-300 focus:border-emerald-500/20 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                        />
                      </div>
                      <div className="group relative">
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="New Password"
                          className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none transition-all placeholder:text-slate-300 focus:border-emerald-500/20 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                        />
                      </div>
                      <div className="group relative">
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password"
                          className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none transition-all placeholder:text-slate-300 focus:border-emerald-500/20 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                        />
                      </div>
                    </div>

                    {statusMessage ? (
                       <div className={`flex items-center gap-3 rounded-2xl p-4 border ${statusMessage.includes('created') || statusMessage.includes('verified') ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                          <p className="text-xs font-bold leading-snug">{statusMessage}</p>
                       </div>
                    ) : null}

                    <button
                      disabled={loading}
                      className="flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-600 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-600/30 transition-all hover:bg-emerald-700 active:scale-95 disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Create Account ✨"}
                    </button>
                  </form>

                  <div className="pt-6 text-center">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Old friend? <Link href="/login" className="text-emerald-600 hover:text-emerald-700 transition-colors">Sign In Here</Link>
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                      <Link href="/" className="text-[9px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-900 transition-colors">← Store Home</Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // OTP Verification Form
              <>
                <div className="text-center mb-8">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Verify Email</span>
                   <h1 className="mt-2 text-3xl md:text-4xl font-black tracking-tight text-slate-900">Enter OTP</h1>
                   <p className="mt-3 text-sm font-bold text-slate-400">
                     {otpSuccess 
                       ? "Verification successful!" 
                       : `We've sent a verification code to your email`
                     }
                   </p>
                </div>

                {otpSuccess ? (
                  // Success State
                  <div className="w-full space-y-6">
                    <div className="flex flex-col items-center gap-4 rounded-3xl bg-emerald-50 p-8 border border-emerald-100">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
                        <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-center text-sm font-bold text-emerald-700">
                        Account created successfully!<br/>
                        Redirecting to login...
                      </p>
                    </div>
                  </div>
                ) : (
                  // OTP Input Form
                  <div className="w-full space-y-6">
                    {/* OTP Display */}
                    {otpData && (
                      <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-center shadow-xl shadow-emerald-500/30">
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100">Your Verification Code</p>
                        <p className="font-mono text-4xl font-black tracking-[0.5em] text-white">{otpData.otp}</p>
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <svg className="h-4 w-4 text-emerald-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-mono text-sm font-bold text-emerald-100">
                            {timeLeft > 0 ? `${timeLeft}s` : "Expired"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* OTP Input */}
                    <div className="space-y-4">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otpInput}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                          setOtpInput(val);
                          setOtpError("");
                        }}
                        placeholder="Enter 6-digit OTP"
                        disabled={otpLoading}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-center font-mono text-2xl font-black tracking-[0.5em] outline-none transition-all placeholder:text-slate-300 placeholder:tracking-normal focus:border-emerald-500/20 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 disabled:opacity-50"
                      />
                    </div>

                    {/* Error Message */}
                    {otpError ? (
                      <div className="flex items-center gap-3 rounded-2xl p-4 border bg-rose-50 border-rose-100 text-rose-700">
                        <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs font-bold leading-snug flex-1">{otpError}</p>
                      </div>
                    ) : null}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={handleVerifyOTP}
                        disabled={otpLoading || otpInput.length !== 6}
                        className="flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-600 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-600/30 transition-all hover:bg-emerald-700 active:scale-95 disabled:opacity-50"
                      >
                        {otpLoading ? "Verifying..." : "Verify OTP ✅"}
                      </button>

                      <button
                        onClick={handleResendOTP}
                        disabled={otpLoading || timeLeft > 0}
                        className="flex h-12 w-full items-center justify-center rounded-2xl border-2 border-slate-50 bg-white text-sm font-black uppercase tracking-widest text-slate-600 transition-all hover:border-emerald-500/20 hover:bg-slate-50 disabled:opacity-50"
                      >
                        {otpLoading 
                          ? "Processing..." 
                          : timeLeft > 0 
                            ? `Resend in ${timeLeft}s` 
                            : "Resend OTP 🔄"
                        }
                      </button>
                    </div>

                    {/* Back Button */}
                    <button
                      onClick={handleBackToForm}
                      disabled={otpLoading}
                      className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-400 hover:text-emerald-600 transition-colors disabled:opacity-50"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to registration
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


