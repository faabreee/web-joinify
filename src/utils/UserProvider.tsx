"use client";

import Loading from "@/app/loading";
import { createContext, useState } from "react";

// Datos del usuario
interface IUser {
    uuid: string;
    username: string;
    fullName: string;
    email: string;
    token: string;
  }
  
  // Datos del contexto
interface IUserContext {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}


export const UserContext = createContext<IUserContext | null>(null);


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [user, setUser] = useState<IUser | null>({
      uuid: "c9797343-ab0d-4b53-ab79-d5b5bdcd0a4f",
      username: "freyes",
      fullName: "Fabrizio Reyes",
      email: "reyescocafagardo@gmail.com",
      token: "KG91tmf3cYqBKFcBVXIilsJ7gOeGBprI9qWPXmkYul6eh1uv5yWE8P8IUFY2UfZl",
    });

    // const [user, setUser] = useState<IUser | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      );
};
