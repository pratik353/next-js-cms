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
  const data = await prisma.user.findMany();
  console.log(data);
  return data;
};

export default async function page() {
  const xyz = await getData();
  console.log(xyz);

  return (
    <div>
      <div className="flex w-full justify-between">
        <HeaderText title="Publish Blogs" />
        <Button>
          <Link href={"/blogs/add-new"}>Add new </Link>
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          // {data.map((item) => (
          <Link key={item} href="/123">
            <BlogCard />
          </Link>
        ))}
      </div>
      <div>
        <BlogsPagination />
      </div>
    </div>
  );
}
