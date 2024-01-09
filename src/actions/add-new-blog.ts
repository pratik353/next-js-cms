"use server";

interface BlogFormData {
    tags: String[];
    blog: any
}

export const addNewBlog = (formData: BlogFormData) => {
    console.log(formData);
}