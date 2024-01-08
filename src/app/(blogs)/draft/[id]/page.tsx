import Editor from '@/components/editor-js/EditorJs'
import { Button } from '@/components/ui/button'
import { editorData } from '@/constants/data'
import React from 'react'

const Blog = () => {
  return (
    <div>
      <Editor data={editorData}/>
      <div className='flex justify-center gap-2'>
        <Button>Submit</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  )
}

export default Blog
