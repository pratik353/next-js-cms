import { BlogTags } from '@/components/custom/blog-tags'
import HeaderText from '@/components/custom/header-text'
import Editor from '@/components/editor-js/EditorJs'
import { Button } from '@/components/ui/button'
import React from 'react'

const AddNewBlog = () => {
  return (
    <div className=''>
      <div className='sticky top-[68px] flex justify-between'>
        <HeaderText title="New Blog"/>
        <div className='flex gap-3'>
          <Button>Preview</Button>
          <Button>Draft</Button>
          <Button>Submit</Button>
        </div>
      </div>
      <div className='mt-3 relative '>
        <form action="">
          <div className='flex gap-3 md:h-[25.5rem] 2xl:h-[46rem]'>
            <div className='flex-1 border h-full overflow-y-auto'>
              <Editor/>
            </div>
            <div className='relative'>
              <div className='sticky top-[68px] w-[250px] border p-3'>
                <h3 className='font-bold text-md mb-3'>Tags</h3>
                <BlogTags/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewBlog
