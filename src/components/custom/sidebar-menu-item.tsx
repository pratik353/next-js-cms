"use client";

import React from 'react'
import { Separator } from '../ui/separator'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
    label: string,
    href: string,
}

const MenuItem = ({ label, href}: MenuItemProps) => {
  const path = usePathname();
  
  return (
    <div className={`${path.includes(href) ? "text-blue-500 bg-blue-200 font-bold" : ''}`}>
        <Link href={href} >
            <div className='px-6 py-4 cursor-pointer hover:bg-blue-200/80'>
                {label}
            </div>
        </Link>
        <Separator />
    </div>
  )
}

export default MenuItem
