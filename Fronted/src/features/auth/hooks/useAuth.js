// import { useContext ,useEffect} from "react";
// // import { Authcontext } from "./auth.context";
// import { Authcontext } from "../auth.context";
// // import {login,register,logout,getMe} from "../api/auth.api";
// import { login, register, logout, getMe } from "../services/auth.api";

// export const useAuth = () => {
//     const context = useContext(Authcontext);
//     const { user, setUser, loading, setLoading } = context;

//     const handleLogin = async ({ email, password }) => {
//         setLoading(true);
//         try {
//             const data = await login({ email, password });
//             setUser(data.user);

//         } catch (error) {
//             // console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     const handleRegister = async ({ email, password, username }) => {

//         setLoading(true);
//         try {
//             const data = await register({ email, username, password });
//             setUser(data.user);
//         } catch (error) {
//             // console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     const handleLogout = async () => {
//         setLoading(true);
//         try {
//             await logout();
//             setUser(null);
//         } catch (error) {
//             // console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(()=>{
        
//         const getUser=async()=>{
//             try{
//                 const response= await getMe();
//                 setUser(response.user);
//                 // setLoading(false);
//             }catch(error){
//                 console.log(error);
//             }finally{
//                 setLoading(false);}
//         }
//         getUser();
//     },[])
//     return { user, loading, handleLogin, handleLogout, handleRegister }
// }

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Auth.context";
// import { Authcontext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    const navigate = useNavigate();


    // const handleLogin = async ({ email, password }) => {
    //     setLoading(true)
    //     try {
    //         const data = await login({ email, password })
    //         setUser(data.user)
    //     } catch (err) {

    //     } finally {
    //         setLoading(false)
    //     }
    // }
const handleLogin = async ({ email, password }) => {

    setLoading(true);

    try {

        const data = await login({ email, password });

        console.log(data);

        // USER CONTEXT
        setUser(data.user);

        // REDIRECT
        navigate("/");

    } catch (err) {
        console.log(err);

    } finally {
        setLoading(false);
    }
}
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

   useEffect(() => {

    const token = localStorage.getItem("token");

    // 🔴 agar token hi nahi hai to direct logout state
    if (!token) {
        setUser(null);
        setLoading(false);
        return;
    }

    const getAndSetUser = async () => {
        try {
            const data = await getMe();
            setUser(data.user);
        } catch (err) {
            setUser(null);   // ❗ important
        } finally {
            setLoading(false);
        }
    };

    getAndSetUser();

}, []);

    return { user, loading, handleRegister, handleLogin, handleLogout }
}