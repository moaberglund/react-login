export interface User {
    id: string,
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
    age: number,
    created_at: Date
}

export interface LoginCredentials {
    username: string,
    password: string
}

export interface RegisterCredentials {
    username: string,
    password: string
}

export interface AuthResponse {
    user: User,
    token: string
}

export interface AuthContextType {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>,
    register: (credentials: RegisterCredentials) => Promise<void>,
    logout: () => void;
    loading: boolean;
}