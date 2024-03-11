import React, { useState } from 'react'
import Gender from './Gender'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {

    const [input , SetInput] = useState({
        fullName : "",
        username : "",
        password : "",
        confirmPassword : "",
        gender : ""
    })

    const {loading , signup} = useSignup();

    const handleGenderChange = (gender) => {
        SetInput({...input , gender})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(input)
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up <span className='text-blue-500'> Chatter.io</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input type="text" placeholder='Enter Full Name' className='w-full input input-bordered h-10' value={input.fullName} onChange={(e) => SetInput({...input , fullName : e.target.value})}/>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type="text" placeholder='Enter Username' className='w-full input input-bordered h-10' value={input.username} onChange={(e) => SetInput({...input , username : e.target.value})}/>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' value={input.password} onChange={(e) => SetInput({...input , password : e.target.value})}/>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10' value={input.confirmPassword} onChange={(e) => SetInput({...input , confirmPassword : e.target.value})}/>
                    </div>

                    <Gender handleGenderChange = {handleGenderChange} selectedGender = {input.gender} />
                    <Link to='/login' className="p-2 text-sm hover:underline hover:text-orange-300 inline-block">Already have an account?</Link>

                    <div>
                        <button type="submit" className='btn btn-block btn-sm' disabled={loading}>{
                            loading ? <span className='loading loading-spinner'></span> : "Sign Up"
                        }</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUp