"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-white selection:text-black">
            <Navbar />

            <main className="pt-32 pb-24 px-8 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-primary mb-12">
                    TERMS OF SERVICE
                </h1>

                <div className="space-y-12 font-mono text-sm leading-relaxed text-muted-foreground">
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">1. Agreement to Terms</h2>
                        <p>
                            By accessing or using STONESAINTS™ ("the Site"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Site. These terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">2. Intellectual Property</h2>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of STONESAINTS™ and its licensors. Our intellectual property must not be used in connection with any product or service without the prior written consent of STONESAINTS™.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">3. Purchases & Orders</h2>
                        <p>
                            If you wish to purchase any product made available through the Site ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, expiration date, billing address, and shipping information. We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product availability, errors in the description or price of the product, or error in your order.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">4. Returns & Refunds</h2>
                        <p>
                            Due to the limited nature of our drops, all sales are final unless an item is received damaged or defective. If you receive a defective item, please contact us within 7 days of delivery with photographic evidence.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">5. User Accounts</h2>
                        <p>
                            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Site. You are responsible for safeguarding the password that you use to access the Service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-primary">6. Changes to Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
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
