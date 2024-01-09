import PreviewBlog from '@/components/custom/preview-blog'
import Editor from '@/components/editor-js/EditorJs'
import { editorData } from '@/constants/data'
import { MoveLeft } from 'lucide-react'
import React from 'react'

const PreviewBlogPage = () => {
  return (
    <div className='border rounded-md relative'>
      {/* <div className='absolute top-4 left-4 flex gap-2'><MoveLeft /> Back</div> */}
      <PreviewBlog data={editorData}/>
    </div>
  )
}

export default PreviewBlogPage
