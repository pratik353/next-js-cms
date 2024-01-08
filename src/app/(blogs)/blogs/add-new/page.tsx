import HeaderText from '@/components/custom/header-text'
import { Button } from '@/components/ui/button'
import React from 'react'

const AddNewBlog = () => {
  return (
    <div>
      <HeaderText title="New Blog"/>
      <div className='flex justify-end'>
        <div className='flex gap-3'>
          <Button>Preview</Button>
          <Button>Draft</Button>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default AddNewBlog
