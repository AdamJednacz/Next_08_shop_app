'use client';

import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import type { User } from '@/types/types';
import {getSessionUser, verifySession} from "@/lib/session";

type UserContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
} | null;

export const UserContext = createContext<UserContextType>(null);

interface UserContextProviderProps {
    children: React.ReactNode;
    user?: User | null;
}

export default function UserContextProvider({
                                                children,
                                                user: initialUser = null,
                                            }: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(initialUser);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook do wygodnego korzystania z kontekstu
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserContextProvider');
    }
    return context;
}
