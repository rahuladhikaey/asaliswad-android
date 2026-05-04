import { Header } from "@/components/Header";


export const metadata = {
  title: "Privacy Policy | Asali Swad",
  description: "Read our Privacy Policy to understand how Asali Swad collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header title="Privacy Policy" subtitle="Your Privacy, Our Commitment" />

      <main className="px-4 py-12 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-10">

          {/* Hero Banner */}
          <section className="overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-600">Legal</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-500">
              <strong>Effective Date:</strong> April 15, 2026
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Welcome to <strong>Asali Swad</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
            </p>
          </section>

          {/* Policy Sections */}
          <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-12 space-y-12">

            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">1</span>
                Information We Collect
              </h2>
              <div className="mt-6 space-y-5 pl-11">
                <div>
                  <h3 className="font-semibold text-slate-800">a. Personal Information</h3>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-sm leading-7 text-slate-600">
                    <li>Name</li>
                    <li>Phone number</li>
                    <li>Email address</li>
                    <li>Delivery address</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">b. Order Information</h3>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-sm leading-7 text-slate-600">
                    <li>Products ordered (Urad Dal Bori varieties)</li>
                    <li>Payment details (processed securely via third-party providers)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">c. Technical Information</h3>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-sm leading-7 text-slate-600">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device information</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">2</span>
                How We Use Your Information
              </h2>
              <ul className="mt-5 list-disc list-inside space-y-2 pl-11 text-sm leading-7 text-slate-600">
                <li>Process and deliver your orders (within 30 minutes locally where applicable)</li>
                <li>Provide <strong>24/7 customer support</strong></li>
                <li>Manage returns (within our 24-hour return policy)</li>
                <li>Improve our products and services</li>
                <li>Send order updates and important notifications</li>
              </ul>
            </div>

            <hr className="border-slate-100" />

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">3</span>
                Our Commitment to Quality & Transparency
              </h2>
              <div className="mt-5 pl-11 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "🌿", text: "100% organic Urad Dal Bori products" },
                  { icon: "✅", text: "No adulteration or mixing — ever" },
                  { icon: "🤝", text: "Customer trust through full transparency" },
                ].map((item) => (
                  <div key={item.text} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                    <p className="text-3xl">{item.icon}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">4</span>
                Sharing of Information
              </h2>
              <p className="mt-4 pl-11 text-sm leading-7 text-slate-600">
                We do <strong>not sell or rent</strong> your personal information. We may share your information only with:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-2 pl-11 text-sm leading-7 text-slate-600">
                <li>Delivery partners (for order fulfillment)</li>
                <li>Payment gateways (for secure transactions)</li>
                <li>Legal authorities (if required by law)</li>
              </ul>
            </div>

            <hr className="border-slate-100" />

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">5</span>
                Data Security
              </h2>
              <p className="mt-4 pl-11 text-sm leading-7 text-slate-600">
                We take appropriate security measures to protect your data from unauthorized access, misuse, or disclosure.
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">6</span>
                Cookies
              </h2>
              <p className="mt-4 pl-11 text-sm leading-7 text-slate-600">
                Our website may use cookies to improve user experience and analyze website traffic. You can disable cookies in your browser settings if you prefer.
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">7</span>
                Your Rights
              </h2>
              <ul className="mt-4 list-disc list-inside space-y-2 pl-11 text-sm leading-7 text-slate-600">
                <li>Access your personal data</li>
                <li>Request correction or deletion</li>
                <li>Contact us regarding any privacy concerns</li>
              </ul>
            </div>

            <hr className="border-slate-100" />

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">8</span>
                Return & Support Policy
              </h2>
              <div className="mt-5 pl-11 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-2xl">🔄</p>
                  <p className="mt-2 font-semibold text-slate-800">24-Hour Return Policy</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Eligible products can be returned within 24 hours of delivery.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-2xl">💬</p>
                  <p className="mt-2 font-semibold text-slate-800">24/7 Customer Support</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Our team is always available to assist you with any queries.</p>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">9</span>
                Changes to This Policy
              </h2>
              <p className="mt-4 pl-11 text-sm leading-7 text-slate-600">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date.
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* Section 10 — Contact */}
            <div>
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-slate-900">10</span>
                Contact Us
              </h2>
              <div className="mt-5 pl-11">
                <div className="rounded-[1.75rem] bg-green-600 p-8 text-white shadow-lg sm:p-10">
                  <p className="text-sm uppercase tracking-[0.3em] text-yellow-100/90">Get in touch</p>
                  <div className="mt-6 space-y-4 text-sm leading-7">
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <a href="mailto:connect.asaliswad2026@gmail.com" className="mt-1 inline-block text-slate-100/90 transition hover:text-white">
                        connect.asaliswad2026@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Address</p>
                      <p className="mt-1 text-slate-100/90">123 Market Street, Local City, India</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Hours</p>
                      <p className="mt-1 text-slate-100/90">Mon – Sun: 8:00 AM – 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>
        </div>
      </main>


    </div>
  );
}
