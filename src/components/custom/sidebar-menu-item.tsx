import React from 'react'
import { Separator } from '../ui/separator'
import Link from 'next/link';

interface MenuItemProps {
    label: string,
    href: string,
}

const MenuItem = ({ label, href}: MenuItemProps) => {
  return (
    <>
        <Link href={href} >
            <div className='px-6 py-4 cursor-pointer hover:bg-blue-200/80'>
                {label}
            </div>
        </Link>
        <Separator />
    </>
  )
}

export default MenuItem
