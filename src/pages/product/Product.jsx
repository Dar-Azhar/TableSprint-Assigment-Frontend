import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import categoryIcon from '../../assets/icons/Category.svg';
import { Link } from "react-router-dom";
import { deleteProduct, fetchAllProducts } from "../../api/FetchApi";
import Button from "../../components/Button";
import ReusableTable from "../../components/Table";
import { TableCell } from "@mui/material";
import PopUp from "../../components/PopUp";
import DeleteIcon from '../../assets/icons/DeleteIcon.svg';

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await fetchAllProducts();
        if (res?.data?.length === 0) {
          setError("No products found");
        }
        setProducts(res.data);
      } catch (err) {}
      finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setIsPopUpOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;

    try {
      deleteProduct(productToDelete)
        .then((res) => {
          setIsPopUpOpen(false);
          setProducts(products?.filter(product => product.id !== productToDelete));
        })
        .catch(error => {});
    } catch (error) {}
  };

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
  };

  const headers = ['Id', 'Product Name', 'Sub Category', 'Category Name', 'Status', 'Action'];

  const renderRow = (product) => [
    <TableCell key="id" sx={{ padding: "8px", borderBottom: "8px solid white", textAlign: "center" }} className="text-white">{product.id}</TableCell>,
    <TableCell key="productName" sx={{ padding: "8px", borderBottom: "8px solid white", textAlign: "center" }} className="text-white">{product.productName}</TableCell>,
    <TableCell key="subCategory" sx={{ padding: "8px", borderBottom: "8px solid white", textAlign: "center" }} className="text-white">{product.subcategory?.subcategoryName}</TableCell>,
    <TableCell key="categoryName" sx={{ padding: "8px", borderBottom: "8px solid white", textAlign: "center" }} className="text-white">{product.category?.categoryName}</TableCell>,
    <TableCell key="status" sx={{ padding: "8px", borderBottom: "8px solid white", textAlign: "center" }}>
      <span className={product.status === "Active" || product.status === 'active' ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
        {product.status}
      </span>
    </TableCell>,
    <TableCell key="action" align="center" sx={{ padding: "8px", borderBottom: "8px solid white" }} className="text-white">
      <div className="flex gap-3 justify-center">
        <Link to={`update/${product.id}`}>
          <FaEdit className="text-gray-400 cursor-pointer hover:text-yellow-500 size-4" />
        </Link>
        <FaTrash className="text-gray-400 cursor-pointer hover:text-red-500 size-4" onClick={() => handleDelete(product.id)} />
      </div>
    </TableCell>,
  ];

  const filteredProducts = products?.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-4">
        <div className="flex items-center gap-4 w-full sm:w-auto mt-16">
          <img src={categoryIcon} className="size-6" alt="product-icon" />
          <h2 className="text-lg font-semibold">Products</h2>
          <input
            type="text"
            placeholder="Search Product"
            className="border border-gray-300 p-2 rounded-md w-full xl:min-w-96 sm:w-auto flex-grow sm:flex-grow-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sm:w-auto">
          <Button to='add' text='Add Product' />
        </div>
      </div>

      <div className="overflow-x-auto max-w-[100vw]">
        {loading ? (
          <div className='load'></div>
        ) : (
          <ReusableTable headers={headers} rows={filteredProducts} rowRenderer={renderRow} />
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

      {error && <p className="text-grey-500 text-2xl flex items-center justify-center h-96">{error}</p>}
    </div>
  );
};

export default Product;
