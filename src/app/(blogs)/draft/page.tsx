import BlogCard from "@/components/custom/blog-card";
import BlogsPagination from "@/components/custom/blogs-pagination";
import HeaderText from "@/components/custom/header-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import prisma from "@/app/prismadb";
const getDraftedBlogs = async () => {
  //get all published blogs
  const data = await prisma.blog.findMany({
    where: {
      AND: [
        { flags: 2 }, //drafted blog
        { status: "active" },
      ],
    },
    include: {
      Block: true,
    },
  });
  console.log(data);
  return data;
  // return NextResponse.json({ data }, { status: 200 });
};
const BlogPage = async function page() {
  const data = await getDraftedBlogs();
  console.log(data);

  return (
    <div>
      <div className="flex w-full justify-between">
        <HeaderText title="Draft Blogs" />
        <Button>
          <Link href={"/blogs/add-new"}>Add new </Link>
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-4">
        {data.map((item) => (
          <Link key={item.id} href={`/draft/${item.id}`}>
            <BlogCard {...item} />
          </Link>
        ))}
      </div>
      <div>
        <BlogsPagination />
      </div>
    </div>
  );
};

export default BlogPage;
