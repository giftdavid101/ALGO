// import React, { createContext, useState, useContext, ReactNode } from 'react';
//
//
// interface AuthContextType {
//     isLoggedIn: boolean;
//     login: () => void;
//     logout: () => void;
// }
//
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
//
// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//
//     const login = () => setIsLoggedIn(true);
//     const logout = () => {
//         setIsLoggedIn(false);
//         localStorage.removeItem('token');
//     };
//
//     return (
//         <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };


import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            // Verify token validity or check auth status
            setLoading(false);
        };
        checkAuth();
    }, []);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        // Check if user is already logged in
        return !!localStorage.getItem('token');
    });

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('authToken', 'token'); //// Save the auth token or relevant data
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
