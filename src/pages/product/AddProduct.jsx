import { useEffect, useState } from "react";
import { FaArrowLeft, FaGrinStars, FaImage } from "react-icons/fa";
import { addProduct } from "../../api/FetchApi";
import { useCategories } from "../../context/CategoriesContext";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/PopUp";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const { categories, cLoading, subCategories, subCategoriesLoading } = useCategories();
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => previewImage && URL.revokeObjectURL(previewImage);
  }, [previewImage]);

  const onBack = () => navigate(-1);
  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
    navigate("/product");
  };

  const validateForm = () => {
    if (!productName || !category || !subCategory) {
      setErrorMessage("Please fill out all required fields.");
      return false;
    }
    return true;
  };

  const onSave = async () => {
    setLoading(true);
    if (!validateForm()) return;
    setLoading(true);
    setErrorMessage("");
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("categoryId", category);
      formData.append("subcategoryId", subCategory);
      if (image) formData.append("image", image);
      const response = await addProduct(formData);
      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setIsPopUpOpen(true)
        setLoading(false);
        setProductName("");
        setCategory("");
        setSubCategory("");
        setImage(null);
        setPreviewImage(null);
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col p-6 bg-white shadow-md rounded-md border border-gray-300 mt-16 sm:h-[calc(100vh-65px)]">
      <div className="flex items-center mb-6">
        <FaArrowLeft className="text-gray-600 cursor-pointer" onClick={onBack} />
        <h2 className="text-xl font-semibold text-gray-800 ml-3">Add Product</h2>
      </div>
      {errorMessage && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md">{errorMessage}</div>}
      {loading ? (
        <div className="load"></div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-md font-medium mb-1">Product Name</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-md w-full" required />
            </div>
            <div>
              <label className="block text-md font-medium mb-1">Category Name</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-md w-full appearance-none" disabled={cLoading} required>
                <option value="" disabled>Select Category</option>
                {cLoading ? <option disabled>Loading categories...</option> : categories.length > 0 ? categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.categoryName}</option>) : <option disabled>No Categories Available</option>}
              </select>
            </div>
            <div>
              <label className="block text-md font-medium mb-1">Sub Category Name</label>
              <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-md w-full appearance-none" disabled={subCategoriesLoading} required>
                <option value="" disabled>Select Sub Category</option>
                {subCategoriesLoading ? <option disabled>Loading subcategories...</option> : subCategories.length > 0 ? subCategories.map((subCat) => <option key={subCat.id} value={subCat.id}>{subCat.subcategoryName}</option>) : <option disabled>No Sub Categories Available</option>}
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-md font-medium mb-2">Upload Image</label>
            <div className="flex gap-4 mt-2">
              {previewImage && <img src={previewImage} alt="Product" className="w-20 h-20 rounded-md border" />}
              <label className="border border-gray-300 rounded-md w-20 h-20 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
                <FaImage className="text-gray-500 text-2xl" />
                <span className="text-xs text-gray-500">Upload</span>
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
          </div>
          <div className="flex-grow"></div>
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={onBack} className="bg-gray-300 px-6 py-2 rounded-md text-gray-700 hover:bg-gray-400">Cancel</button>
            <button onClick={onSave} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">Save</button>
          </div>
        </>
      )}
      <PopUp open={isPopUpOpen} onClose={handleClosePopUp} >
                <div className="bg-white rounded-2xl p-8 shadow-xl w-72 md:w-96 text-center">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <FaGrinStars className="text-primary text-3xl" />
                        <h2 className="text-xl font-bold">Success!</h2>
                    </div>
                    <p className="text-gray-600">New Product has been added</p>
                    <div className="flex justify-center gap-4 mt-6">

                        <button
                            className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-600"
                            onClick={handleClosePopUp}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </PopUp>
    </div>
  );
};

export default AddProduct;
