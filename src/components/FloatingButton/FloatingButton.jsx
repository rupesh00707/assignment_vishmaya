export default function FloatingButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
            <span className="text-xl">Create Quote +</span>
        </button>
    );
}
