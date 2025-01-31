import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowLeft, FaImage } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../../context/CategoriesContext";
import { getSubcategoryById, updateSubcategory } from "../../api/FetchApi";

const EditSubCategory = () => {
    const [subCategoryName, setSubCategoryName] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [sequence, setSequence] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const { categories } = useCategories();
    const [errorMessage, setErrorMessage] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubCategoryData = async () => {
            try {
                const res = await getSubcategoryById(params?.id);
                const subCategoryData = res.data;
                if (subCategoryData) {
                    setSubCategoryName(subCategoryData.subcategoryName || "");
                    setCategory(subCategoryData.categoryId || "");
                    setStatus(subCategoryData.status || "");
                    setSequence(subCategoryData.sequence || "");
                    setImage(subCategoryData.image || null);
                    setPreviewImage(subCategoryData.image || null);
                }
            } catch (error) { }
        };

        fetchSubCategoryData();

        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [params.id]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
        }
    };

    const onBack = () => {
        window.history.back();
    };

    const onSave = async () => {
        try {
            const formData = new FormData();
            formData.append("subcategoryName", subCategoryName);
            formData.append("categoryId", category);
            formData.append("status", status);
            formData.append("sequence", sequence);

            const selectedCategory = categories.find(cat => cat.id === category);
            const categoryId = selectedCategory ? selectedCategory.id : "";

            if (!subCategoryName || !category || !status || !sequence) {
                setErrorMessage("All fields are required.");
                return;
            }

            if (image && image !== previewImage) {
                formData.append("image", image);
            } else if (previewImage) {
                formData.append("imageUrl", previewImage);
            }

            const response = await updateSubcategory(params.id, formData);

            if (response.error) {
                setErrorMessage(response.error);
            } else {
                alert("Subcategory updated successfully!");
                navigate("/subcategories");
            }
        } catch (error) {
            setErrorMessage("An error occurred while updating the subcategory. Please try again.");
        }
    };

    return (
        <div className="flex flex-col p-6 bg-white shadow-md rounded-md border border-gray-300 md:h-[calc(100vh-65px)]">
            <div className="flex items-center mb-6">
                <FaArrowLeft className="text-gray-600 cursor-pointer" onClick={onBack} />
                <h2 className="text-xl font-semibold text-gray-800 ml-3">Edit Sub Category</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="sub-category-name" className="block text-md font-medium mb-1">
                        Sub Category Name
                    </label>
                    <input
                        id="sub-category-name"
                        type="text"
                        placeholder="Sub Category Name"
                        value={subCategoryName}
                        onChange={(e) => setSubCategoryName(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full"
                    />
                </div>

                <div>
                    <label htmlFor="category-name" className="block text-md font-medium mb-1">
                        Category Name
                    </label>
                    <select
                        id="category-name"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-md w-full appearance-none"
                    >
                        <option value="" disabled>Select Category</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                        ))}
                    </select>
                </div>

                <div className="relative">
                    <label htmlFor="sequence" className="block text-md font-medium mb-1">
                        Sequence
                    </label>
                    <select
                        id="sequence"
                        value={sequence}
                        onChange={(e) => setSequence(e.target.value)}
                        className={`border border-gray-300 px-4 py-2 rounded-md w-full appearance-none ${sequence === "" ? "text-gray-500" : "text-black"}`}
                    >
                        <option value="" disabled>Select Sequence</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <FaArrowDown className="absolute right-3 top-10 text-gray-500" />
                </div>

                <div className="relative">
                    <label htmlFor="status" className="block text-md font-medium mb-1">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`border border-gray-300 px-4 py-2 rounded-md w-full appearance-none ${status === "" ? "text-gray-500" : "text-black"}`}
                    >
                        <option value="" disabled>Select Status</option>
                        {["Active", "Inactive"].map((status) => (
                            <option key={status} value={status}>{status}</option>
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
                        <img src={previewImage} alt="Sub Category" className="w-20 h-20 rounded-md border" />
                    )}
                    <label className="border border-gray-300 rounded-md w-20 h-20 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
                        <FaImage className="text-gray-500 text-2xl" />
                        <span className="text-xs text-gray-500">Upload</span>
                        <input type="file" className="hidden" onChange={handleImageUpload} />
                    </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
            </div>

            <div className="flex-grow"></div>

            <div className="mt-6 flex justify-end gap-4">
                <button onClick={onBack} className="bg-gray-300 px-6 py-2 rounded-md text-gray-700">
                    Cancel
                </button>
                <button onClick={onSave} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditSubCategory;
