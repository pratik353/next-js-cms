import PreviewBlog from "@/components/custom/preview-blog";
import Editor from "@/components/editor-js/EditorJs";
import { editorData } from "@/constants/data";
import { MoveLeft } from "lucide-react";
import React from "react";
import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";

const getBlogById = async (par: any) => {
  try {
    console.log("GET: /api/blog/[id]");
    const id = parseInt(par.params.id);
    const getBlog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      include: {
        tags: true,
        Block: true,
      },
    });

    return getBlog;
  } catch (err) {
    console.log("error", err);
  }
};
const PreviewBlogPage = async (par: any) => {
  const data = await getBlogById(par);
  console.log("On blogs id page", data);
  return (
    <div className="relative rounded-md border">
      {/* <div className='absolute top-4 left-4 flex gap-2'><MoveLeft /> Back</div> */}
      {data ? <PreviewBlog {...data} /> : <p>Loading...</p>}
    </div>
  );
};

export default PreviewBlogPage;
