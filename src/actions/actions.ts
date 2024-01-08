"use server";

export const uploadBlog = async(blogData: any) => {
    try {
        const res = await fetch('http://localhost:3000/api/blog', {
            method: 'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify(blogData)
        })  
        const response = await res.json();
        console.log(response);

        } catch (error) {
        console.log(error);
        }
}

export const getBlogById = async(id:number) => {
    try {
        const res = await fetch(`http://192.168.30.168:3000/api/blog/${id}`, {
            method: 'GET',
            headers:{
                "Content-Type":'application/json'
            },
        })  

        const response = await res.json();
        console.log(response);
        
        return response;

        } catch (error) {
        console.log(error);
        return error
        }
}