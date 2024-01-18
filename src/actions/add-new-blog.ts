"use server";
import prisma from "@/app/prismadb";

interface BlogFormData {
  tags: string[] ,
  blog: any,
  slug: string,
  title: string,
  status:string,
  flag:number
}

export const addNewBlog = async (formData: any) => {
  console.log("POST: blogs/add-new");
  console.log(formData);

  const tags = formData.tags;
  const allBlocks = formData.blog["blocks"];
  let getTagsId: Array<number> = [];
  let category_id : number
  const find = "skin type"
  const get_category_id = await prisma.category.findFirst({
    where:{
      cat_name: find
    }
  })

  console.log("getcategoryid",get_category_id)
  if(get_category_id != null){
    category_id = get_category_id.id
  }
  else{
  const new_category = await prisma.category.create({
      data : {
      cat_name : find
      }
    })
    category_id = new_category.id
    console.log("newcategory",new_category)
  }

  const promises = tags.map(async (item: any) => {
    // console.log(item)
    let tagId = await prisma.tags.findFirst({
      where: {
        name: item,
      },
    });
    console.log(tagId);
    if(tagId){
      getTagsId.push(tagId.id);
    }
    else{
      const data = await prisma.tags.create({
        data: {
          name: item,
          catId : category_id
        },
      });
    }
  });

  await Promise.all(promises);

  console.log("XXXXXXXXXXXXXX", tags, allBlocks);

  const blog = await prisma.blog.create({
    data: {
      title: formData.title,
      slug: formData.slug,
      status: formData.status,
      flags: 3,
      userId: 1,
      tags: {
        connect: getTagsId.map((id) => ({
          id,
        })),
      },
    },
  });

// for draft/ rejected blogs
//   const drafted_blog = await prisma.blog.upsert({
//     where:{
//         id : id
//     },
//     update:{
//         title: formData.title,
//         slug: formData.slug,
//         status: formData.status,
//         flags: formData.flag,
//         userId: 1,
//         tags: {
//             connect: getTagsId.map((id) => ({
//             id,
//             })),
//         },

//     },
//     create : {
//         title: formData.title,
//         slug: formData.slug,
//         status: formData.status,
//         flags: 2,
//         userId: 1,
//         tags: {
//             connect: getTagsId.map((id) => ({
//             id,
//             })),
//         },
//    }
// })

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
