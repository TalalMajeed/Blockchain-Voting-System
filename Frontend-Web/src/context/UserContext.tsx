import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  email: string | null;
  setEmail: (email: string) => void;
  phone: string | null;
  setPhone: (password: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        phone,
        setPhone,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContext");
  }
  return context;
};
