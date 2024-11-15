import { useState } from "react";
import axios from "axios";

export default function CreateQuoteModal({ isOpen, onClose, onQuoteCreated }) {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!text || !file) {
            alert("Please provide both text and an image.");
            return;
        }

        setLoading(true);
        try {
            // Upload image
            const formData = new FormData();
            formData.append("file", file);

            const uploadResponse = await axios.post(
                "https://crafto.app/crafto/v1.0/media/assignment/upload",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const mediaUrl = uploadResponse.data[0].url;


            await axios.post(
                "https://assignment.stage.crafto.app/postQuote",
                { text, mediaUrl }
            );

            alert("Quote created successfully!");
            onQuoteCreated();
            onClose();
        } catch (error) {
            alert("Error creating quote. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Create a Quote</h2>
                <textarea
                    className="w-full border border-gray-300 rounded p-2 mb-4 h-32"
                    placeholder="Enter your quote"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    type="file"
                    className="mb-4"
                    onChange={handleFileChange}
                />
                {/* Ensure the flex container is properly set */}
                <div className="flex justify-end  w-full mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>

    );
}
