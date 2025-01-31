import { useEffect, useState } from "react";
import { FaArrowLeft, FaImage } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/FetchApi";
import { useCategories } from "../../context/CategoriesContext";

const EditProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sequence, setSequence] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { categories, subCategories } = useCategories();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await getProductById(params.id);
        if (data) {
          setProductName(data.productName);
          setCategory(data.categoryId || "");
          setSubCategory(data.subcategoryId || "");
          setSequence(data.sequence);
          setStatus(data.status);
          setPreviewImage(data.image);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductData();

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
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onBack = () => navigate(-1);

  const onSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("categoryId", category);
      formData.append("subcategoryId", subCategory);
      formData.append("status", status);
      if (image) formData.append("image", image);
      
      const response = await updateProduct(params.id, formData);
      if (response.error) {
        setErrorMessage(response.error);
      } else {
        alert("Product updated successfully!");
        navigate("/product");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the product. Please try again.");
      console.error("Error while updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-6 bg-white shadow-md rounded-md border border-gray-300 h-full md:h-auto">
      <div className="flex items-center mb-6">
        <FaArrowLeft className="text-gray-600 cursor-pointer" onClick={onBack} />
        <h2 className="text-xl font-semibold text-gray-800 ml-3">Edit Product</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="product-name" className="block text-md font-medium mb-1">Product Name</label>
          <input id="product-name" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="category-name" className="block text-md font-medium mb-1">Category Name</label>
          <select id="category-name" value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-md w-full">
            <option value="" disabled>Select Category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sub-category-name" className="block text-md font-medium mb-1">Sub Category Name</label>
          <select id="sub-category-name" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-md w-full">
            <option value="" disabled>Select Sub Category</option>
            {subCategories?.map((subCat) => (
              <option key={subCat.id} value={subCat.id}>{subCat.subcategoryName}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div>
          <label htmlFor="status" className="block text-md font-medium mb-1">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-md w-full">
            <option value="" disabled>Select Status</option>
            {['Active', 'Inactive'].map((statusOption) => (
              <option key={statusOption} value={statusOption}>{statusOption}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-md font-medium mb-2">Upload Image</label>
          <div className="flex gap-4">
            {previewImage && <img src={previewImage} alt="Product" className="w-20 h-20 rounded-md border" />}
            <label className="border border-gray-300 rounded-md w-20 h-20 flex items-center justify-center cursor-pointer">
              <FaImage className="text-gray-500 text-2xl" />
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button onClick={onBack} className="bg-gray-300 px-6 py-2 rounded-md text-gray-700">Cancel</button>
        <button onClick={onSave} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
      </div>

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </div>
  );
};

export default EditProduct;
