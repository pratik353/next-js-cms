"use server";

interface BlogFormData {
    tags: String[];
    blog: any
}

export const addNewBlog = (formData: BlogFormData) => {
    console.log("POST: blogs/add-new");
    console.log(formData);

    const tags = formData.tags
    const allBlocks = formData.blog["blocks"]

    console.log("XXXXXXXXXXXXXX",tags,allBlocks)
    
}