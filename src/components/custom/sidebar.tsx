"use client";

import React from 'react'
import { Separator } from '../ui/separator'
import MenuItem from './sidebar-menu-item';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const menuLinks = [
    { label:"Home" , href:"/blogs"},
    { label:"Draft" , href:"/draft"},
    { label:"Rejected" , href:"/rejected"},
    { label:"Profile" , href:"/profile"}
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className='fixed h-screen w-[240px] 2xl:w-[280px] bg-blue-100'>
        <div className='h-[100px]'>
            {/* <Image src={''} alt='' width={100} height={100}/> */}
            LOGO
        </div>
        <Separator />
        {menuLinks.map((item) => (
            <MenuItem key={item.href} label={item.label} href={item.href}/>
        ))}
        <Separator />
        <div className='px-6 w-full mt-4 flex gap-2 cursor-pointer group' onClick={()=>router.push('/')}>Logout<LogOut className='w-[20px] group-hover:translate-x-[10px] transition' /></div>
    </div>
  )
}

export default Sidebar
