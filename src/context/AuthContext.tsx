import React, {createContext, useState, useContext, ReactNode} from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthResponse, AuthContextType } from '../types/auth.types';

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

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
            // Make API call
            const res = await fetch('https://user-api-vnhj.onrender.com/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!res.ok) {
                throw new Error('Login failed');
            }

            // Parse response
            const data: AuthResponse = await res.json();

            // Token
            localStorage.setItem('token', data.token);

            // Set user
            setUser(data.user);

        } catch (err) {
            throw err;
        }
    }
    

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// Create custom hook
export const useAuth = () :AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}