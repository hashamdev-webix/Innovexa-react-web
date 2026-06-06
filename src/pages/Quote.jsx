import BestFitSection from "../sections/GetQuote/BestFitSection";
import GetQuoteHero from "../sections/GetQuote/GetQuoteHero";
import QuoteCTA from "../sections/GetQuote/QuoteCTA";
import QuoteFormSection from "../sections/GetQuote/QuoteFormSection";
import QuoteServices from "../sections/GetQuote/QuoteServices";


export default function Quote() {
    return (
        <>
            <GetQuoteHero />
            <QuoteFormSection />
            <QuoteServices />
            <BestFitSection />
            <QuoteCTA/>



        </>
    )
}
