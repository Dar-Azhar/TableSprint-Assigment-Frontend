import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowLeft, FaGrinStars, FaImage } from "react-icons/fa";
import { updateCategory, getCategoryById } from "../../api/FetchApi";
import { useParams, useNavigate } from "react-router-dom";
import PopUp from "../../components/PopUp";

const EditCategory = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [sequence, setSequence] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { data } = await getCategoryById(params.id);
        if (data) {
          setCategoryName(data.categoryName);
          setSequence(data.sequence);
          setStatus(data.status);
          setPreviewImage(data.image);
        }
      } catch (error) { }
    };

    fetchCategoryData();

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
  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
    navigate("/categories");
  };

  const onSave = async () => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      formData.append("sequence", sequence);
      formData.append("status", status);
      if (image) {
        formData.append("image", image);
      }

      const response = await updateCategory(params.id, formData);
      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setIsPopUpOpen(true)

      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the category. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col p-6 bg-white shadow-md rounded-md border border-gray-300  w-full mt-16 sm:h-[calc(100vh-65px)]" >
      <div className="flex items-center mb-6">
        <FaArrowLeft className="text-gray-600 cursor-pointer" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-semibold text-gray-800 ml-3">Edit Category</h2>
      </div>
      {loading ? (
        <div className="load"></div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <option value="" disabled>
                  Select Sequence
                </option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
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
                className="border border-gray-300 px-4 py-2 rounded-md w-full appearance-none"
              >
                <option value="" disabled>
                  Select Status
                </option>
                {["Active", "Inactive"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <FaArrowDown className="absolute right-3 top-10 text-gray-500" />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-md font-medium mb-2">Upload Image</label>
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

          {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
          <div className="flex-grow"></div>

          <div className="mt-6 flex justify-end gap-4">
            <button onClick={() => navigate(-1)} className="bg-gray-300 px-6 py-2 rounded-md text-gray-700">
              Cancel
            </button>
            <button onClick={onSave} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
              Save
            </button>
          </div>
        </>
      )}
      <PopUp open={isPopUpOpen} onClose={handleClosePopUp} >
        <div className="bg-white rounded-2xl p-8 shadow-xl w-72 md:w-96 text-center">
          <div className="flex flex-col items-center justify-center mb-4">
            <FaGrinStars className="text-primary text-3xl" />
            <h2 className="text-xl font-bold">Success!</h2>
          </div>
          <p className="text-gray-600">Category has been updated</p>
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

export default EditCategory;
