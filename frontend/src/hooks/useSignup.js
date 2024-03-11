import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading , setLoading] = useState(false);

    const {setAuthUser} = useAuthContext();

    const signup = async({fullName , username , password, confirmPassword , gender}) => {
        const success = handleInputError({fullName , username , password, confirmPassword , gender});

        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup" , {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({fullName , username , password, confirmPassword , gender})
            })

            const data = await res.json();

            if(data.error)
            {
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user" , JSON.stringify(data));

            setAuthUser(data);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    
    return {loading , signup}

}

export default useSignup

const handleInputError = ({fullName , username , password, confirmPassword , gender}) => {
    if(!fullName || !username || !password || !confirmPassword || !gender)
    {
        toast.error("Please enter all fields.")
        return false;
    }

    if(password !== confirmPassword)
    {
        toast.error("Password doesn't match!")
        return false;
    }

    if(password.length < 6)
    {
        toast.error('Password length must atleast be 6 characters.')
    }

    return true
}