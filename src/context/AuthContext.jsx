import { createContext, useState, useEffect, useContext } from 'react';
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedin(true);  
        }
        setLoading(false);  
    }, []);

    const logout = () => {
        setIsLoggedin(false); 
        localStorage.removeItem('authToken'); 
    };

    const value = {
        isLoggedin,
        setIsLoggedin,
        loading,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
