"use server";
import prisma from "@/app/prismadb";

interface BlogFormData {
  tags: String[];
  blog: any;
}

export const addNewBlog = async (formData: BlogFormData) => {
  console.log("POST: blogs/add-new");
  console.log(formData);

  const tags = formData.tags;
  const allBlocks = formData.blog["blocks"];
  let getTagsId: Array<number> = [];

  const promises = tags.map(async (item: any) => {
    // console.log(item)
    let tagId = await prisma.tags.findFirst({
      where: {
        name: item,
      },
    });
    console.log(tagId);
    getTagsId.push(tagId!.id);
  });

  await Promise.all(promises);

  console.log("XXXXXXXXXXXXXX", tags, allBlocks);

  const blog = await prisma.blog.create({
    data: {
      title: "hello dummy",
      slug: "hello-dummy",
      status: "active",
      flags: 1,
      userId: 1,
      tags: {
        connect: getTagsId.map((id) => ({
          id,
        })),
      },
    },
  });

  allBlocks.forEach(async function (item: any, index: number) {
    console.log(item);

    const addBlock = await prisma.block.create({
      data: {
        blogId: blog.id,
        sequence: index + 1,
        blockData: JSON.stringify(item),
      },
    });
  });
};
