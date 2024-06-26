import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading , setLoading] = useState(false);

    const {setAuthUser} = useAuthContext();
    const login = async (username , password) => {
        setLoading(true)

        const check = handleInputError(username , password);
        if(!check) return;
        try {
            const res = await fetch("/api/auth/login" , {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({username , password})
            })
            
            const data = await res.json();

            if(data.error)
            {
                throw new Error(data.error)
                setLoading(false)
            }

            localStorage.setItem("chat-user" , JSON.stringify(data))
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    return {loading , login}
};

export default useLogin;

const handleInputError = (username , password) => {
    if(!username || !password )
    {
        toast.error("Please enter all fields.")
        setLoading(false)
        return false;
    }

    if(password.length < 6)
    {
        toast.error('Password length must atleast be 6 characters.');
        setLoading(false)
        return false;
    }

    return true
}
