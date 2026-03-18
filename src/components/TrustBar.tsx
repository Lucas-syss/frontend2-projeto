import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";

const TrustBar = () => {
    const features = [
        { icon: <Truck className="w-6 h-6 mb-4 stroke-[1.5]" />, text: "Global Fulfillment" },
        { icon: <ShieldCheck className="w-6 h-6 mb-4 stroke-[1.5]" />, text: "Secure Checkout" },
        { icon: <RefreshCcw className="w-6 h-6 mb-4 stroke-[1.5]" />, text: "Hassle-Free Returns" },
    ];

    return (
        <div className="w-full bg-muted/20 py-16 border-y border-border">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {features.map((feature, i) => (
                        <div key={i} className="flex flex-col items-center justify-center text-foreground">
                            {feature.icon}
                            <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground">{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBar;
