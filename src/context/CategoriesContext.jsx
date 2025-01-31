import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAllCategories, fetchAllSubcategories } from '../api/FetchApi';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false); 
      }
    };

    getCategories();
  }, []);
  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const response = await fetchAllSubcategories();
        setSubCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false); 
      }
    };

    getSubCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories,setCategories, subCategories ,loading }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};