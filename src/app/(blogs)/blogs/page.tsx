import BlogCard from "@/components/custom/blog-card";
import BlogsPagination from "@/components/custom/blogs-pagination";
import HeaderText from "@/components/custom/header-text";
import { Button } from "@/components/ui/button";
import { cache } from "react";
import prisma from "@/app/prismadb";
import Link from "next/link";
import React from "react";

const getData = async () => {
  //get all published blogs
  const data = await prisma.blog.findMany({
    where: {
      flags : 1
    },
    include : {
      Block: true
    }
  })
  // console.log(data);
  return data;
};

export default async function page() {
  const data = await getData();
  console.log(data);

  return (
    <div>
      <div className="flex w-full justify-between">
        <HeaderText title="Publish Blogs" />
        <Button>
          <Link href={"/blogs/add-new"}>Add new </Link>
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-4">
        {data.map((item) => (
          // {data.map((item) => (
          <Link key={item.id} href={`/blog/${item.id}`}>
            <BlogCard {...item} />
          </Link>
        ))}
      </div>
      <div>
        <BlogsPagination />
      </div>
    </div>
  );
}
