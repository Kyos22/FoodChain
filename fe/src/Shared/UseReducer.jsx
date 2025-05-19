// context/RoleContext.js
import React, { createContext, useState, useContext } from 'react';

const RoleContext = createContext();

export const UseHelpers = () => {
    return useContext(RoleContext);
};

export const UseReducer = ({ children }) => {
    const [role, setRole] = useState('admin'); // Khởi tạo giá trị role
    const [fullName,setFullName] = useState('');
    return (
        <RoleContext.Provider value={{ role, setRole,
            fullName,setFullName,
         }}>
            {children}
        </RoleContext.Provider>
    );
};
