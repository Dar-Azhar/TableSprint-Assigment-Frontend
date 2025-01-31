import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import categoryIcon from '../../assets/icons/Category.svg';
import { Link } from 'react-router-dom';
import { deleteCategory, fetchAllCategories } from '../../api/FetchApi';
import PopUp from '../../components/PopUp';
import DeleteIcon from '../../assets/icons/DeleteIcon.svg';
import Button from '../../components/Button';
import ReusableTable from '../../components/Table';
import { TableCell } from '@mui/material';
import { useCategories } from '../../context/CategoriesContext';

const Category = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true);
  
    fetchAllCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  const handleDelete = (categoryId) => {
    setCategoryToDelete(categoryId);
    setIsPopUpOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete);

      const updatedCategories = categories.filter(category => category.id !== categoryToDelete);
      setCategories(updatedCategories);
      setIsPopUpOpen(false);
    } catch (error) {
      console.error("Error deleting category:", error);
      setIsPopUpOpen(false);
    }
  };

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
  };

  const headers = ['Id', 'Category Name', 'Image', 'Status', 'Sequence', 'Action'];

  const renderRow = (category) => [
    <TableCell key="id" sx={{ padding: '8px', borderBottom: '8px solid white', textAlign: 'center' }} className="text-white">{category.id}</TableCell>,
    <TableCell key="name" sx={{ padding: '8px', borderBottom: '8px solid white', textAlign: 'center' }} className="text-white">{category.categoryName}</TableCell>,
    <TableCell key="image" sx={{ padding: '8px', borderBottom: '8px solid white', textAlign: 'center', verticalAlign: 'middle' }} >
      <img src={category.image} alt="Category" className="w-15 h-10 mx-auto" />
    </TableCell>,
    <TableCell key="status" sx={{ padding: '8px', borderBottom: '8px solid white', textAlign: 'center' }}>
      <span className={category.status === "Active" || category.status === "active" ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{category.status}</span>
    </TableCell>,
    <TableCell key="sequence" align="center" sx={{ padding: '8px', borderBottom: '8px solid white' }} className="text-white">{category.sequence}</TableCell>,
    <TableCell key="action" align="center" sx={{ padding: '8px', borderBottom: '8px solid white' }} >
      <div className="flex gap-3 justify-center">
        <Link to={`edit/${category.id}`}>
          <FaEdit className="text-gray-400 cursor-pointer hover:text-yellow-500 size-4" />
        </Link>
        <FaTrash className="text-gray-400 cursor-pointer hover:text-red-500 size-4" onClick={() => handleDelete(category.id)} />
      </div>
    </TableCell>,
  ];

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <img src={categoryIcon} className="size-6" alt="category-icon" />
          <h2 className="text-lg font-semibold">Categories</h2>
          <input
            type="text"
            placeholder="Search Category"
            className="border border-gray-300 p-2 rounded-md w-full md:min-w-96 sm:w-auto flex-grow sm:flex-grow-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className=" sm:w-auto">
          <Button to="add" text="Add Category" />
        </div>
      </div>
      {loading ? (
        <div className='load'></div>
      ) : (
        <ReusableTable headers={headers} rows={filteredCategories} rowRenderer={renderRow} />
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

export default Category;
