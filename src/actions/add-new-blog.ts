"use server";

interface BlogFormData {
    tags: string[];
    blog: any,
    slug: string,
    title: string
}

export const addNewBlog = (formData: BlogFormData) => {
    console.log("POST: blogs/add-new");
    console.log(formData);

    const tags = formData.tags
    const allBlocks = formData.blog["blocks"]

    console.log("XXXXXXXXXXXXXX",tags,allBlocks)
    
}