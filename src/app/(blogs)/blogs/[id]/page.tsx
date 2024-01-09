import PreviewBlog from '@/components/custom/preview-blog'
import Editor from '@/components/editor-js/EditorJs'
import { editorData } from '@/constants/data'
import { MoveLeft } from 'lucide-react'
import React from 'react'
import prisma from '@/app/prismadb'
import { NextResponse } from 'next/server'
 
const getBlogById = async( par: any) => {
  try {
    console.log("GET: /api/blog/[id]");
    console.log("**************",par)
    const id = parseInt(par.params.id);
    const getBlog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      include: {
        tags: true,
        Block: true,
      },
    });
    console.log("getblog", getBlog);
}
catch(err){
  console.log("error",err)
}
}
const PreviewBlogPage = (par:any) => {
  const data = getBlogById(par)
  console.log(data)
  console.log(getBlogById)
  return (
    <div className='border rounded-md relative'>
      {/* <div className='absolute top-4 left-4 flex gap-2'><MoveLeft /> Back</div> */}
      <PreviewBlog data={editorData}/>
    </div>
  )
}

export default PreviewBlogPage
