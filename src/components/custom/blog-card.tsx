import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";

const BlogCard = ({ rejected }: { rejected?: boolean}) => {
  return (
    <Card>
        <div className="pt-3 px-3">
            <Image 
                className="rounded-md"
                src={'https://plugins-media.makeupar.com/smb/blog/post/2021-06-25/3f952e96-b4ae-4d72-b80f-5795cb4fa4af.jpg'}  
                alt="" 
                width={400} 
                height={500}
            />
            <div className="py-2" >
                <h4 className="text-lg font-bold">Title</h4>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, porro. Molestiae temporibus illo officia nostrum?</p>
                <span className="mt-2 text-sm">Created At</span>
            </div>
        </div>
        {rejected && (
          <div className="px-4 py-2">
            <Separator/>
            <span className="font-bold">Reason For Reject</span>
            <p className="text-destructive">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, consectetur.</p>
          </div>
        )}
    </Card>
  );
};

export default BlogCard;
