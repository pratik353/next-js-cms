"use server";

interface BlogFormData {
    tags: string[];
    blog: any,
    slug: string,
    title: string
}

export const editBlog = (formData: BlogFormData) => {
    console.log(formData);
}