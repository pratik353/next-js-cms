import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface CardProps{
  id: number;
    title: string;
    slug: string,
    status: string,
    flags: number,
    comments: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    userId: number
}

const BlogCard = ({title,comments,createdAt,flags,id,slug,status,updatedAt,userId}:CardProps) => {
  return (
    <Card>
        <div className="p-3">
            <Image 
                className="rounded-md"
                src={'https://plugins-media.makeupar.com/smb/blog/post/2021-06-25/3f952e96-b4ae-4d72-b80f-5795cb4fa4af.jpg'}  
                alt="" 
                width={400} 
                height={500}
            />
            <div className="py-2" >
                <h4 className="text-lg font-bold">{title}</h4>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, porro. Molestiae temporibus illo officia nostrum?</p>
                <span className="mt-2 text-sm">Created At: {createdAt?.getDate()}/{createdAt?.getMonth()}/{createdAt?.getFullYear()} </span>
            </div>
        </div>
    </Card>
  );
};

export default BlogCard;
