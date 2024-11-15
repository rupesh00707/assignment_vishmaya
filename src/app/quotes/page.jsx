'use client'
import {useState, useEffect, useRef} from "react";
import QuoteCard from "@/components/QuoteCard/QuoteCard";
import FloatingButton from "@/components/FloatingButton/FloatingButton";
import axios from "axios";
import {throttle} from "lodash";
import CreateQuoteModal from "@/Modals/CreateQuotesModal/CreateQuoteModal";

export default function QuotesPage() {
    const [quotes, setQuotes] = useState([]);
    const [limit] = useState(20);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const offsetRef = useRef(0); // Ref to track the latest offset value

    const [isModalOpen, setIsModalOpen] = useState(false);


    const fetchQuotes = async () => {
        if (loading || !hasMore) return; // Prevent overlapping calls
        setLoading(true);

        try {
            const response = await axios.get(
                `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offsetRef.current}`
            );

            if (response.status !== 200) {
                throw new Error("Failed to fetch quotes.");
            }

            const data = response?.data?.data || [];

            if (data.length === 0) {
                setHasMore(false);
            }


            offsetRef.current += limit;

            // Update quotes, avoiding duplicates
            setQuotes((prevQuotes) => {
                const existingIds = new Set(prevQuotes.map((quote) => quote.id));
                const newQuotes = data.filter((quote) => !existingIds.has(quote.id));
                return [...prevQuotes, ...newQuotes];
            });

        } catch (error) {
            // alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Throttled scroll handler
    const handleScroll = throttle(() => {
        if (loading || !hasMore) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            fetchQuotes();
        }
    }, 200);

    useEffect(() => {
        fetchQuotes();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleQuoteCreated = () => {
        fetchQuotes(); // Refresh the quotes list
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Quotes</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quotes.map((quote) => (
                        <QuoteCard key={quote.id} quote={quote} />
                    ))}
                </div>
                {loading && <p className="text-center mt-4">Loading...</p>}
                {!hasMore && <p className="text-center mt-4">No more quotes available.</p>}
            </div>
            <FloatingButton onClick={()=>{
                setIsModalOpen(true)
            }} />
            <CreateQuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onQuoteCreated={handleQuoteCreated}
            />
        </div>
    );
}
