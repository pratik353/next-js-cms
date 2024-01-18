"use server";
import prisma from "@/app/prismadb";

export const draftBlog = async (formData: any) => {
  try {
    console.log("Draft: author/draft-blog");
    const id = 1;
    const find = "skin type";
    const tags = formData.tags;
    const allBlocks = formData.blog["blocks"];
    let getTagsId: Array<number> = [];
    let category_id: number;

    // Get the skin type category ID if it exists, otherwise create a new one 
    const get_category_id = await prisma.category.findFirst({
      where: {
        cat_name: find,
      },
    });
    console.log("getcategoryid", get_category_id);
    if (get_category_id != null) {
      category_id = get_category_id.id;
    } else {
      const new_category = await prisma.category.create({
        data: {
          cat_name: find,
        },
      });
      category_id = new_category.id;
      console.log("newcategory", new_category);
    }

    const promises = tags.map(async (item: any) => {
      // console.log(item)
      let tagId = await prisma.tags.findFirst({
        where: {
          name: item,
        },
      });
      console.log(tagId);
      if (tagId) {
        getTagsId.push(tagId.id);
      } else {
        const data = await prisma.tags.create({
          data: {
            name: item,
            catId: category_id,
          },
        });
      }
    });

    await Promise.all(promises);

    const drafted_blog = await prisma.blog.upsert({
      where: {
        id: id,
      },
      update: {
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
      create: {
        title: formData.title,
        slug: formData.slug,
        status: formData.status,
        flags: 2,
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
          // blogId: blog.id,
          blogId: drafted_blog.id,
          sequence: index + 1,
          blockData: JSON.stringify(item),
        },
      });
    });
    
  } catch (e) {
    console.error(`Error in Draft Blog: ${e}`);
  }
};


