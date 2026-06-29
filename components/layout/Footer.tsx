// "use client";

// import { SiInstagram, SiLinkedin } from "react-icons/si";
// import Image from "next/image";

// export const Footer = () => {
//     return (
//         <footer className="bg-black text-white relative border-t border-white/10 overflow-hidden">
//             {/* Main Content Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-[65%_35%] lg:grid-cols-[70%_30%] w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">

//                 {/* Left Column - Contact + Socials */}
//                 <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-between">
//                     <div>
//                         <h4 className="font-mono text-gray-500 text-xs tracking-widest uppercase mb-4 sm:mb-6 md:mb-8">/ CONTACT</h4>
//                         <address className="text-base sm:text-lg md:text-xl lg:text-2xl not-italic leading-relaxed font-light text-gray-200">
//                             STC (Shivam Trade Center)<br />
//                             NH147, Ambli, Ahmedabad,<br />
//                             Gujarat 380058<br />
//                             Office: 504
//                         </address>
//                     </div>

//                     <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
//                         <a
//                             href="mailto:hello@jrats.studio"
//                             className="text-base sm:text-lg text-[#08cb00] hover:text-white transition-colors font-mono block"
//                         >
//                             hello@jrats.studio
//                         </a>
//                         <div className="flex gap-4">
//                             <a href="https://www.instagram.com/jrats.studio/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#08cb00] transition-colors" aria-label="Instagram">
//                                 <SiInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
//                             </a>
//                             <a href="https://www.linkedin.com/company/jrats-studio" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#08cb00] transition-colors" aria-label="LinkedIn">
//                                 <SiLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Right Column - Logo */}
//                 <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex items-center justify-center md:justify-end">
//                     <div className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px]">
//                         <Image
//                             src="/logo.svg"
//                             alt="JRATS STUDIO"
//                             width={400}
//                             height={150}
//                             className="w-full h-auto object-contain"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Copyright Bar */}
//             <div className="w-full border-t border-white/10 px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6">
//                 <p className="text-gray-500 text-xs sm:text-sm font-mono text-center">
//                     &copy; {new Date().getFullYear()} JRATS STUDIO. ALL RIGHTS RESERVED.
//                 </p>
//             </div>
//         </footer>
//     );
// };
"use client";

import { useState, useEffect } from "react";
import { SiInstagram, SiLinkedin } from "react-icons/si";
import Image from "next/image";
import emailjs from "@emailjs/browser";

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    whatYouMake: "",
    message: "",
    // attachment: null,
  });
  const [attachment, setAttachment] = useState<{
    name: string;
    data: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File too large. Please upload a file under 10MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target?.result as string;
      const base64 = data.split(",")[1];
      setAttachment({
        name: file.name,
        data: base64,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables are not configured.");
      }

      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        mobile: formData.mobile,
        what_you_make: formData.whatYouMake,
        message: formData.message,
        to_email: "hello@jrats.studio",
        attachments: attachment
          ? [
              {
                name: attachment.name,
                data: attachment.data,
                type: attachment.type,
              },
            ]
          : undefined,
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("Email sent successfully:", response);
      alert("✅ Message sent! We'll get back to you soon.");
      setIsModalOpen(false);
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        whatYouMake: "",
        message: "",
      });
      setAttachment(null);
    } catch (error: any) {
      console.error("Email send error:", {
        message: error.message || "Unknown error",
        text: error.text || "No additional details",
        status: error.status || "No status",
      });
      alert(
        "❌ Something went wrong. Please try again later.\n\n" +
        (error.message || "Unknown error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <footer className="bg-black text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono text-[#08cb00] text-lg tracking-[0.2em] uppercase mb-4">
                / CONTACT
              </h4>
              <address className="text-white/80 not-italic leading-relaxed text-lg">
                STC (Shivam Trade Center)<br />
                NH147, Ambli, Ahmedabad,<br />
                Gujarat 380058<br />
                Office: 504
              </address>
              <a
                href="mailto:hello@jrats.studio"
                className="block mt-4 text-[#08cb00] hover:text-white transition-colors font-mono text-lg"
              >
                hello@jrats.studio
              </a>
              <div className="flex gap-5 mt-5">
                <a
                  href="https://www.instagram.com/jrats.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#08cb00] transition-colors"
                >
                  <SiInstagram className="w-7 h-7" />
                </a>
                <a
                  href="https://www.linkedin.com/company/jrats-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#08cb00] transition-colors"
                >
                  <SiLinkedin className="w-7 h-7" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[#08cb00] text-lg tracking-[0.2em] uppercase mb-4">
                / SERVICES
              </h4>
              <ul className="space-y-2 text-lg text-white/80">
                <li>Software Development (AppSheet)</li>
                <li>Web Development</li>
                <li>Video Editing</li>
                <li>Graphics Design</li>
                <li>Social Media Post Design</li>
              </ul>
              <div className="mt-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2 border border-[#08cb00] text-[#08cb00] hover:bg-[#BBF7D0] hover:text-black transition-all duration-300 rounded-full font-mono text-lg tracking-wider"
                >
                  Get In Touch
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <Image
                src="/logo.svg"
                alt="JRATS STUDIO"
                width={200}
                height={70}
                className="w-80 h-80 opacity-90"
              />
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-300 text-md font-mono">
              &copy; {new Date().getFullYear()} JRATS STUDIO. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/15 rounded-2xl w-full max-w-lg p-6 md:p-8 relative max-h-[90vh] overflow-y-auto scrollbar-visible">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-100 hover:text-white transition-colors"
            >
              ✕
            </button>

            <h2 className="font-heading text-2xl text-white/80 mb-6">Get In Touch</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-md font-mono text-gray-200 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/15 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-[#08cb00] focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-md font-mono text-gray-200 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/15 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-[#08cb00] focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-md font-mono text-gray-200 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-white/15 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-[#08cb00] focus:outline-none transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="whatYouMake" className="block text-md font-mono text-gray-200 mb-1">
                  What You Make
                </label>
                <input
                  type="text"
                  id="whatYouMake"
                  name="whatYouMake"
                  value={formData.whatYouMake}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/15 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-[#08cb00] focus:outline-none transition-colors"
                  placeholder="e.g., Web App, Video, Design"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-md font-mono text-gray-200 mb-1">
                  What is in your mind
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-black/50 border border-white/15 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-[#08cb00] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* File Attachment */}
              {/* <div>
                <label htmlFor="fileInput" className="block text-sm font-mono text-gray-400 mb-1">
                  Attach PDF (optional)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    id="fileInput"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-mono file:bg-[#08cb00]/20 file:text-[#08cb00] hover:file:bg-[#08cb00]/30 cursor-pointer"
                  />
                  {attachment && (
                    <button
                      type="button"
                      onClick={removeAttachment}
                      className="text-red-400 hover:text-red-300 text-sm font-mono"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {attachment && (
                  <p className="text-xs text-green-400 mt-1 font-mono">
                    📎 {attachment.name} attached
                  </p>
                )}
              </div> */}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#08cb00] text-black border border-white font-mono font-bold rounded-lg hover:bg-[#86EFAC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};