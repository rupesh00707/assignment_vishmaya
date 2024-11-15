export default function QuoteCard({ quote }) {
    const { mediaUrl, text, username, createdAt } = quote;

    return (
        <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
                <img
                    src={mediaUrl}
                    alt="Quote Image"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <p className="text-white text-center text-lg font-medium px-4">{text}</p>
                </div>
            </div>
            <div className="p-4">
                <p className="text-gray-600 text-sm">Posted by: {username}</p>
                <p className="text-gray-400 text-xs">{new Date(createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
}
