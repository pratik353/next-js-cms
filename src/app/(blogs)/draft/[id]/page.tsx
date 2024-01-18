
import React from 'react'
import * as z from "zod"
import prisma from '@/app/prismadb';
import EditorWrapper from './_components/EditorWrapper';

const getBlogById = async (par: any) => {
  try {
    console.log("GET: /api/blog/[id]");
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

    return getBlog;
  } catch (err) {
    console.log("error", err);
  }
};

const FormSchema = z.object({
  items: z.array(z.string()),
})

const Blog = async (par: any) => {
  // Fetch blog data by ID
  const blogData = await getBlogById(par);
  console.log("inside",blogData)


  if(!blogData) return <p>No result...</p>


  return (
    
<EditorWrapper blogData={blogData} />
  )
}

export default Blog
