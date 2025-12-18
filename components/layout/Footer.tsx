"use client";

import { SiInstagram, SiLinkedin } from "react-icons/si";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="bg-black text-white relative border-t border-white/10 overflow-hidden">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[65%_35%] lg:grid-cols-[70%_30%] w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">

                {/* Left Column - Contact + Socials */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                        <h4 className="font-mono text-gray-500 text-xs tracking-widest uppercase mb-4 sm:mb-6 md:mb-8">/ CONTACT</h4>
                        <address className="text-base sm:text-lg md:text-xl lg:text-2xl not-italic leading-relaxed font-light text-gray-200">
                            STC (Shivam Trade Center)<br />
                            NH147, Ambli, Ahmedabad,<br />
                            Gujarat 380058<br />
                            Office: 504
                        </address>
                    </div>

                    <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                        <a
                            href="mailto:hello@jrats.studio"
                            className="text-base sm:text-lg text-[#08cb00] hover:text-white transition-colors font-mono block"
                        >
                            hello@jrats.studio
                        </a>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/jrats.studio/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#08cb00] transition-colors" aria-label="Instagram">
                                <SiInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                            <a href="https://www.linkedin.com/company/jrats-studio" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#08cb00] transition-colors" aria-label="LinkedIn">
                                <SiLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column - Logo */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex items-center justify-center md:justify-end">
                    <div className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px]">
                        <Image
                            src="/logo.svg"
                            alt="JRATS STUDIO"
                            width={400}
                            height={150}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="w-full border-t border-white/10 px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6">
                <p className="text-gray-500 text-xs sm:text-sm font-mono text-center">
                    &copy; {new Date().getFullYear()} JRATS STUDIO. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
};
