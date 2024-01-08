"use client"

import { login } from '@/actions/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";

const Home = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePassword = () => setShowPassword( prev => !prev);

  return (
    <div className='h-screen bg-blue-300 flex justify-center items-center'>
      <div className='border rounded-lg bg-gray-200 p-4'>
        <h2 className=' text-center font-bold'>Login</h2>
            <form className='flex flex-col gap-2' action={login}>
                <div className='flex flex-col'>
                    <label>Email</label>
                    <Input type='text' name='email' placeholder='example@gmail.com'/>
                </div>
                <div>
                    <label>Password</label>
                    <div className='relative'>
                        { showPassword ? ( <IoEyeOff className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer" onClick={togglePassword}/> ) : ( <IoEye className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer" onClick={togglePassword}/> )}
                        <Input type={ showPassword ? 'text' : 'password' } name='password' placeholder='*******'/>
                    </div>
                </div>
                <div>
                    <Button className='w-full' type='submit'>Login</Button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default Home
