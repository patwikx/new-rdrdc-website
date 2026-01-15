'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function ReaPrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-2">Rea Chat - Privacy Policy</h1>
          <p className="text-zinc-400 mb-8">Last updated: January 2025</p>

          <div className="prose prose-invert prose-zinc max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
              <p className="text-zinc-300 leading-relaxed">
                This Privacy Policy explains how RD Realty Development Corporation collects, uses, 
                and protects information when you use Rea, our AI chat assistant. Your privacy is 
                important to us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
              <p className="text-zinc-300 leading-relaxed mb-3">When you use Rea, we may collect:</p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2">
                <li><strong>Chat Messages:</strong> The messages you send to Rea during your conversation</li>
                <li><strong>Session Data:</strong> Temporary conversation history stored in your browser session</li>
                <li><strong>Usage Data:</strong> General interaction patterns to improve our service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
              <p className="text-zinc-300 leading-relaxed mb-3">We use collected information to:</p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2">
                <li>Provide relevant responses to your property inquiries</li>
                <li>Maintain conversation context during your session</li>
                <li>Improve Rea&apos;s accuracy and helpfulness</li>
                <li>Ensure service quality and security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage & Retention</h2>
              <ul className="list-disc list-inside text-zinc-300 space-y-2">
                <li><strong>Session Storage:</strong> Chat history is stored temporarily in your browser and cleared when you close the browser or refresh the page</li>
                <li><strong>Server Processing:</strong> Messages are processed through Google&apos;s Gemini AI service to generate responses</li>
                <li><strong>No Permanent Storage:</strong> We do not permanently store your chat conversations on our servers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
              <p className="text-zinc-300 leading-relaxed">
                Rea uses Google&apos;s Gemini AI to process and respond to your messages. Your messages 
                are sent to Google&apos;s servers for processing. Please refer to{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Google&apos;s Privacy Policy
                </a>{' '}
                for information on how they handle data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
              <p className="text-zinc-300 leading-relaxed">
                We implement appropriate security measures to protect your information during 
                transmission and processing. However, no internet transmission is completely secure, 
                and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
              <p className="text-zinc-300 leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2">
                <li>Clear your chat history by refreshing the page</li>
                <li>Choose not to use the Rea chat service</li>
                <li>Request information about data processing practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Children&apos;s Privacy</h2>
              <p className="text-zinc-300 leading-relaxed">
                Rea is not intended for use by children under 18. We do not knowingly collect 
                information from minors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
              <p className="text-zinc-300 leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be posted on this page 
                with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
              <p className="text-zinc-300 leading-relaxed">
                For privacy-related questions or concerns, please contact us at{' '}
                <a href="mailto:info@rdrealty.com.ph" className="text-blue-400 hover:text-blue-300">
                  info@rdrealty.com.ph
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
