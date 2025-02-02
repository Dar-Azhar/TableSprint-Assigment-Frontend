import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import categoryIcon from "../../assets/icons/Category.svg";
import { Link } from "react-router-dom";
import { deleteSubcategory, fetchAllSubcategories } from "../../api/FetchApi";
import PopUp from "../../components/PopUp";
import Button from "../../components/Button";
import ReusableTable from "../../components/Table";
import { TableCell } from "@mui/material";
import DeleteIcon from '../../assets/icons/DeleteIcon.svg';

const SubCategory = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false)

  const handleConfirmDelete = () => {
    if (!subCategoryToDelete) return;

    try {
      deleteSubcategory(subCategoryToDelete)
        .then((res) => {
          setSubCategories((prevState) =>
            prevState.filter((subCategory) => subCategory.id !== subCategoryToDelete)
          );
          setIsPopUpOpen(false); 
        })
        .catch((error) => {
          console.error("Error deleting subcategory:", error);
        });
    } catch (error) { }
  };

  const handleDelete = (subCategoryId) => {
    setSubCategoryToDelete(subCategoryId);
    setIsPopUpOpen(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
  };

  useEffect(() => {
    setLoading(true);

    fetchAllSubcategories()
      .then((res) => {
        setSubCategories(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching sub categories:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const headers = ['Id', 'Sub Category Name', 'Category Name', 'Image', 'Status', 'Sequence', 'Action'];

  const renderRow = (subCategory) => [
    <TableCell key="id" sx={{ padding: '8px', borderBottom: '8px solid white', textAlign: 'center' }} className="text-white">{subCategory.id}</TableCell>,
    <TableCell key="subcategoryName" sx={{ padding: '8px', borderBottom: '8px solid white', textAlign: 'center' }} className="text-white">{subCategory.subcategoryName}</TableCell>,
    <TableCell key="categoryName" sx={{ padding: '8px', borderBottom: '8px solid white', textAlign: 'center' }} className="text-white">{subCategory.category.categoryName}</TableCell>,
    <TableCell key="image" sx={{ padding: '8px', borderBottom: '8px solid white', textAlign: 'center', verticalAlign: 'middle' }}>
      <img src={subCategory.image} alt="Sub Category" className="w-15 h-10 mx-auto" />
    </TableCell>,
    <TableCell key="status" sx={{ padding: '8px', borderBottom: '8px solid white', textAlign: 'center' }}>
      <span className={subCategory.status === "Active" ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{subCategory.status}</span>
    </TableCell>,
    <TableCell key="sequence" align="center" sx={{ padding: '8px', borderBottom: '8px solid white' }} className="text-white">{subCategory.sequence}</TableCell>,
    <TableCell key="action" align="center" sx={{ padding: '8px', borderBottom: '8px solid white' }}>
      <div className="flex gap-3 justify-center">
        <Link to={`edit/${subCategory.id}`}>
          <FaEdit className="text-gray-400 cursor-pointer hover:text-yellow-500 size-4" />
        </Link>
        <FaTrash className="text-gray-400 cursor-pointer hover:text-red-500 size-4" onClick={() => handleDelete(subCategory.id)} />
      </div>
    </TableCell>,
  ];

  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.subcategoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-4">
        <div className="flex items-center gap-4 w-full sm:w-auto mt-16">
          <img src={categoryIcon} className="size-6" alt="subcategory-icon" />
          <h2 className="text-lg leading-5 md:leading-6 font-semibold">Sub Categories</h2>
          <input
            type="text"
            placeholder="Search Sub Category"
            className="border border-gray-300 p-2 rounded-md w-full md:min-w-96 sm:w-auto flex-grow sm:flex-grow-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className=" sm:w-auto">
          <Button to='add' text='Add Sub Category' />
        </div>
      </div>
      {loading ? (
        <div className='load'></div>
      ) : (
        <ReusableTable headers={headers} rows={filteredSubCategories} rowRenderer={renderRow} />
      )}
      <PopUp open={isPopUpOpen}
        onClose={handleClosePopUp}
        onConfirm={handleConfirmDelete}>
        <div className="bg-white rounded-2xl p-8 shadow-xl w-96 text-center">
          <div className="flex items-center justify-center mb-4">
            <img src={DeleteIcon} className='text-3xl mr-2' alt="delete-icon" />
            <h2 className="text-xl font-bold">Delete</h2>
          </div>
          <p className="text-gray-600">Are you sure you want to delete?</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100"
              onClick={handleClosePopUp}
            >
              Cancel
            </button>
            <button
              className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-600"
              onClick={handleConfirmDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </PopUp>
    </div>
  );
};

export default SubCategory;
