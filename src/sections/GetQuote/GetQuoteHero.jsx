
import GetQouteImage from "../../assets/GetQoute.png";



export default function GetQuoteHero() {
    return (
        <>
            <section className="w-full min-h-screen flex items-center bg-white px-10 md:px-16">

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

                    {/* LEFT */}
                    <div className="flex-1">

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Get a Quote for AI-Powered IT Support
                        </h1>

                        <p className="mt-5 text-[var(--color-gray)] text-lg leading-relaxed">
                            Tell us about your business, technology environment,
                            and support requirements. Our team will review your
                            needs and recommend the right Innovexa solution.
                        </p>

                        <p className="mt-4 text-[var(--color-gray)]">
                            Designed for dental clinics, law firms, accounting firms,
                            medical offices, real estate businesses and growing companies.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <button className="btn-primary">
                                Request a Quote
                            </button>

                            <button className="btn-secondary">
                                Contact Us
                            </button>
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="flex-1">

                        <div className="card">

                            <img
                                src={GetQouteImage}
                                alt="Get Quote"
                                className="w-full rounded-xl"
                            />

                        </div>

                    </div>

                </div>

            </section>
        </>

    );
}