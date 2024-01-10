"use server";

import prisma from "@/app/prismadb";
interface BlogFormData {
    tags: string[];
    blog: any,
    slug: string,
    title: string
}

export const editBlog = async (formData: BlogFormData) => {
    const allBlocks = formData.blog["blocks"];
    await prisma.block.deleteMany({
    where :{
        blogId : 1
    }

   })
   allBlocks.forEach(async function (item: any, index: number) {
    console.log(item);
    const addBlock = await prisma.block.create({
      data: {
        blogId: 1,
        sequence: index + 1,
        blockData: JSON.stringify(item),
      },
    });
  }
  );

}