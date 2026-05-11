// import { createContext, useState,useEffect } from "react";
// // import { getMe } from "./services/auth.api";

// export const Authcontext = createContext();

// export const AuthProvider=({children})=>{
//     const [user,setUser] =useState(null);
//     const [loading,setLoading]=useState(false);

    
//     return (
//         <Authcontext.Provider value={{user,setUser,loading,setLoading}}>
//             {children}
//         </Authcontext.Provider>
//     )

// }

import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };

