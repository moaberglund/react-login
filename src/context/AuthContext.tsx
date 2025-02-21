import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthResponse, AuthContextType } from '../types/auth.types';

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    // States
    const [user, setUser] = useState<User | null>(null);

    // Functions
    const register = async (credentials: RegisterCredentials) => {

        try {
            // Make API call
            const res = await fetch('https://user-api-vnhj.onrender.com/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!res.ok) {
                throw new Error('Registration failed');
            }

            // Parse response
            const data: AuthResponse = await res.json();

            // Set user
            setUser(data.user);

        } catch (err) {
            throw err;
        }
    }


    const login = async (credentials: LoginCredentials) => {
        try {
            // First login request
            const loginRes = await fetch('https://user-api-vnhj.onrender.com/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!loginRes.ok) {
                throw new Error('Login failed');
            }

            const { token } = await loginRes.json();
            localStorage.setItem('token', token);

            // Now fetch user data using the token
            const userRes = await fetch('https://user-api-vnhj.onrender.com/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!userRes.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await userRes.json();
            setUser(userData);

        } catch (err) {
            throw err;
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    const checkToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return;
        }

        try {
            const res = await fetch('https://user-api-vnhj.onrender.com/user/validate', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            const data = await res.json();
            console.log("Token validation response:", data);

            if (res.ok) {
                setUser(data.user);
            } else {
                localStorage.removeItem('token');
                setUser(null);
            }

        } catch (err) {
            localStorage.removeItem('token');
            setUser(null);
        }
    }

    useEffect(() => {
        checkToken();
    }, []);
    

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Create custom hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}