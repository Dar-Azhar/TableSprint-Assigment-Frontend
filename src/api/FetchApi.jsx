import axiosInstance from './axios'

export const loginUser = async (loginData) => {
    try {
        const res = await axiosInstance.post('/auth/login', loginData)
        return res.data;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const fetchAllCategories = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.get('/category/get', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const addCategory = async (categoryData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.post('/category/create', categoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.delete(`/category/delete/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.put(`/category/update/${categoryId}`, categoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const getCategoryById = async (categoryId) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.get(`/category/get-by-id/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const fetchAllSubcategories = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.get('/sub-category/get', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const addSubcategory = async (subcategoryData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.post('/sub-category/create', subcategoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const deleteSubcategory = async (subcategoryId) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.delete(`/sub-category/delete/${subcategoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const updateSubcategory = async (subcategoryId, subcategoryData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.put(`/sub-category/update/${subcategoryId}`, subcategoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const getSubcategoryById = async (subcategoryId) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.get(`/sub-category/get-by-id/${subcategoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const fetchAllProducts = async () => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.get('/product/get', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const addProduct = async (productData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.post('/product/create', productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const deleteProduct = async (productId) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.delete(`/product/delete/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const getProductById = async (productId) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.get(`/product/get-by-id/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const updateProduct = async (productId, productData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return { error: "Token not found" };
        }
        const res = await axiosInstance.put(`/product/update/${productId}`, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        return { error: error.message || "An unknown error occurred" };
    }
}

export const registerUser = async (data) => {
    try {
        const response = axiosInstance.post("auth/register", data);
        return response
    } catch (error) {
        return { error };
    }
};
