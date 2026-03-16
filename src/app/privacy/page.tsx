"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-white selection:text-black">
            <Navbar />

            <main className="pt-32 pb-24 px-8 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-primary mb-12">
                    PRIVACY POLICY
                </h1>

                <div className="space-y-12 font-mono text-sm leading-relaxed text-muted-foreground">
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">1. Information Collection</h2>
                        <p>
                            We collect information you provide directly to us when you create an account, complete a transaction, or contact us. This may include your name, email address, shipping address, payment information, and device information (such as your IP address and browser type).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">2. Use of Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, to process your transactions and send you related information, including confirmations and receipts, and to respond to your comments, questions, and customer service requests.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">3. Data Security & Storage</h2>
                        <p>
                            We implement appropriate technical and organizational measures to maintain the safety of your personal information. Payment processing is handled by secure third-party processors (Stripe). We do not store your full credit card information on our servers.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">4. Cookies and Tracking</h2>
                        <p>
                            We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">5. Third-Party Disclosure</h2>
                        <p>
                            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">6. Your Rights</h2>
                        <p>
                            Depending on your location, you may have the right to access, update, or request deletion of the Personal Information we have on you. If you wish to exercise these rights, please contact us.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-border mt-16 text-xs text-muted-foreground/50">
                        Last updated: March 16, 2026<br />
                        STONESAINTS™
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
