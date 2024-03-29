import BlogCard from '@/components/custom/blog-card'
import BlogsPagination from '@/components/custom/blogs-pagination'
import HeaderText from '@/components/custom/header-text'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const RejectedBlogs = () => {
  return (
    <div>
      <div className='flex w-full justify-between'>
        <HeaderText title="Rejected Blogs"/>
        <Button><Link href={'/blogs/add-new'}>Add new </Link></Button>
      </div>
      <div className='mt-3 grid grid-cols-4 gap-4'>
        {[1, 2, 3, 4, 5, 6, 7, 8].map( item => (
          <Link key={item} href={`/draft/${'123'}`}>
            <BlogCard rejected={true}/>
          </Link>
        ))}
      </div>
      <div>
        <BlogsPagination/>
      </div>
  </div>
  )
}

export default RejectedBlogs
