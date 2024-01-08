"use client";

import React from 'react'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SearchInput from './search-input';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className='border-b sticky top-0 z-10 bg-white h-[68px] flex justify-between items-center px-4'>
            <span className='capitalize'>{pathname.split("/")[1]}</span>
            <div className='flex gap-4'>
                <SearchInput/>
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}

export default Navbar
