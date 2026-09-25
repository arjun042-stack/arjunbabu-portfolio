"use client";

import { useState } from "react";
import { profileData } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Copy,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write a message.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /**
   * ISOLATED SUBMISSION HANDLER
   * To connect to a live backend (Formspree, Resend, EmailJS, or Next.js API route):
   * Replace the simulated delay below with your actual API fetch call.
   * Example:
   * await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulated processing delay for smooth UI feedback
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch {
      setErrors({ form: "An error occurred while sending. Please use the direct email link." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(profileData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-[#090c12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <span>Direct Channel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Let&apos;s Build Something Useful.
          </h2>
          <div className="h-1 w-12 bg-blue-500 rounded-full mt-3 mb-4" />
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            I&apos;m open to opportunities involving software engineering, AI-powered applications, full-stack development and cybersecurity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0e131d] border border-slate-800 space-y-6 shadow-xl">
              <div>
                <h3 className="text-base font-semibold text-white">Contact Information</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Reach out directly via email, phone, or connect on professional networks.
                </p>
              </div>

              {/* Email Card */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#090c12] border border-slate-800/80">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono uppercase text-slate-500">Email</div>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-xs sm:text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors truncate block"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 ml-2"
                  title="Copy email"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#090c12] border border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500">Phone</div>
                    <a
                      href={`tel:${profileData.phone}`}
                      className="text-xs sm:text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors"
                    >
                      {profileData.phoneDisplay}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyPhone}
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 ml-2"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#090c12] border border-slate-800/80">
                <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">Location</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-200">
                    {profileData.location}
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Professional Profiles
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={profileData.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090c12] border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profileData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#090c12] border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                    aria-label="GitHub profile"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-300" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0e131d] border border-slate-800 shadow-xl">
              <h3 className="text-base font-semibold text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the form below or email me directly at {profileData.email}.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-blue-950/30 border border-blue-800/60 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. I will review your message and respond promptly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {errors.form && (
                    <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Full Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#090c12] border text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                          errors.name
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-slate-800 focus:border-blue-500"
                        }`}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-[11px] text-rose-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Email Address <span className="text-blue-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#090c12] border text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors ${
                          errors.email
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-slate-800 focus:border-blue-500"
                        }`}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-[11px] text-rose-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Subject / Project Context
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. Software Engineering Opportunity / Collaboration"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#090c12] border border-slate-800 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Message <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Details about your opportunity, project or inquiry..."
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#090c12] border text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? "border-rose-500 focus:border-rose-500"
                          : "border-slate-800 focus:border-blue-500"
                      }`}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-[11px] text-rose-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-blue-600/20 transition-all duration-200 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                      Direct response guaranteed
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
