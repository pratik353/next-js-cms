import React from 'react'
import { Separator } from '../ui/separator'
import MenuItem from './sidebar-menu-item';

const menuLinks = [
    { label:"Home" , href:"/blogs"},
    { label:"Draft" , href:"/draft"},
    { label:"Rejected" , href:"/rejected"},
    { label:"Profile" , href:"/profile"}
];

const Sidebar = () => {
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
    </div>
  )
}

export default Sidebar
