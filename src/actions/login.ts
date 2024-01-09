"use server";

import { redirect } from "next/navigation";

export const login = (formData: any) =>{
    console.log('formData', formData);
    redirect('/blogs')
}