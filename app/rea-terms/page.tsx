'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function ReaTermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-2">Rea Chat - Terms of Use</h1>
          <p className="text-zinc-400 mb-8">Last updated: January 2025</p>

          <div className="prose prose-invert prose-zinc max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
              <p className="text-zinc-300 leading-relaxed">
                Welcome to Rea, the AI-powered chat assistant for RD Realty Development Corporation. 
                By using Rea, you agree to these Terms of Use. Please read them carefully before 
                interacting with our chat service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Service Description</h2>
              <p className="text-zinc-300 leading-relaxed">
                Rea is an AI assistant designed to provide information about RD Realty properties, 
                leasing processes, and general inquiries. Rea uses Google&apos;s Gemini AI technology 
                to generate responses based on RD Realty&apos;s property information and guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Acceptable Use</h2>
              <p className="text-zinc-300 leading-relaxed mb-3">When using Rea, you agree to:</p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2">
                <li>Use the service only for legitimate inquiries about RD Realty properties and services</li>
                <li>Not attempt to manipulate or abuse the AI system</li>
                <li>Not submit harmful, offensive, or inappropriate content</li>
                <li>Not use the service for any illegal purposes</li>
                <li>Not attempt to extract proprietary information or reverse-engineer the system</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Limitations</h2>
              <p className="text-zinc-300 leading-relaxed mb-3">Please be aware that:</p>
              <ul className="list-disc list-inside text-zinc-300 space-y-2">
                <li>Rea provides general information only and should not be considered as legal, financial, or investment advice</li>
                <li>Property availability, pricing, and details are subject to change without notice</li>
                <li>AI-generated responses may occasionally contain inaccuracies</li>
                <li>For official inquiries and transactions, please contact our leasing team directly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Disclaimer</h2>
              <p className="text-zinc-300 leading-relaxed">
                Rea is provided &quot;as is&quot; without warranties of any kind. RD Realty Development 
                Corporation is not liable for any decisions made based on information provided by Rea. 
                Always verify important details with our official representatives.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Changes to Terms</h2>
              <p className="text-zinc-300 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of Rea after 
                changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2>
              <p className="text-zinc-300 leading-relaxed">
                For questions about these terms, please contact us at{' '}
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
