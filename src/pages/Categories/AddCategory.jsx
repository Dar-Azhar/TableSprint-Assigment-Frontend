import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowLeft, FaImage } from "react-icons/fa";
import { addCategory } from "../../api/FetchApi";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [sequence, setSequence] = useState(1);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const onBack = () => {
        window.history.back();
    };

    const onSave = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("categoryName", categoryName);
            formData.append("sequence", sequence);
            if (image) {
                formData.append("image", image);
            }
            const response = await addCategory(formData);

            if (response.error) {
                setErrorMessage(response.error);
            } else {
                setLoading(false);
                alert("Category added successfully");
                navigate("/categories");
                setErrorMessage("");
                setCategoryName("");
                setSequence(1);
                setImage(null);
                setPreviewImage(null);
            }
        } catch (error) {
            setErrorMessage("An error occurred while adding the category. Please try again.");
        }
    };

    return (
        <div className="flex flex-col p-6 bg-white shadow-md rounded-md border border-gray-300 " style={{ height: 'calc(100vh - 65px)' }}>
            <div className="flex items-center mb-6">
                <FaArrowLeft className="text-gray-600 cursor-pointer" onClick={onBack} />
                <h2 className="text-xl font-semibold text-gray-800 ml-3">Add Category</h2>
            </div>
            {loading ? (
                <div className="load"></div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="category-name" className="block text-md font-medium mb-1">
                                Category Name
                            </label>
                            <input
                                id="category-name"
                                type="text"
                                placeholder="Category Name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="sequence" className="block text-md font-medium mb-1">
                                Category Sequence
                            </label>
                            <select
                                id="sequence"
                                value={sequence}
                                onChange={(e) => setSequence(e.target.value)}
                                className="border border-gray-300 px-4 py-2 rounded-md w-full appearance-none"
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                            <FaArrowDown className="absolute right-3 top-10 text-gray-500" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-md font-medium mb-2">
                            Upload Image
                        </label>
                        <div className="flex gap-4 mt-2">
                            {previewImage && (
                                <img src={previewImage} alt="Category" className="w-20 h-20 rounded-md border" />
                            )}
                            <label className="border border-gray-300 rounded-md w-20 h-20 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
                                <FaImage className="text-gray-500 text-2xl" />
                                <span className="text-xs text-gray-500">Upload</span>
                                <input type="file" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
                    )}

                    <div className="flex-grow"></div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button onClick={onBack} className="bg-gray-300 px-6 py-2 rounded-md text-gray-700">Cancel</button>
                        <button onClick={onSave} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">Save</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddCategory;
