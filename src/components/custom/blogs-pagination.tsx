import React from 'react'
import { Button } from '../ui/button'

const BlogsPagination = () => {
  return (
    <div className='mt-3 flex justify-center gap-2'>
     <Button variant='outline' >Prev</Button>
     <Button variant='outline' >Next</Button>
    </div>
  )
}

export default BlogsPagination
