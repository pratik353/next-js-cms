import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { JsonValue } from "@prisma/client/runtime/library";

type Block = {
  id: number;
  sequence: number;
  blockData: JsonValue;
  blogId: number;
};
type Tag = {
  id: number;
  name: string;
  catId: number;
};
export type blogData = {
  id: number;
  title: string;
  slug: string;
  status: string;
  flags: number;
  createdAt: Date ;
  updatedAt: Date | null;
  userId: number;
  tags: Tag[];
  Block: Block[];
  rejected: boolean;

};

const BlogCard = ({
  title,
  createdAt,
  flags,
  id,
  slug,
  status,
  updatedAt,
  userId,
  rejected,
  Block
}: blogData) => {
  return (
    <Card>
      <div className="px-3 pt-3">
        <Image
          className="rounded-md"
          src={
            "https://plugins-media.makeupar.com/smb/blog/post/2021-06-25/3f952e96-b4ae-4d72-b80f-5795cb4fa4af.jpg"
          }
          alt=""
          width={400}
          height={500}
        />
        <div className="py-2">
          <h4 className="text-lg font-bold">{title}</h4>
          <div>
  {Block.slice(1, 3).map((block, index) => {
    // try {
      const parsedBlockData = JSON.parse(block.blockData);
      console.log("parsed",parsedBlockData.data.text)
        return (
          <p key={index} dangerouslySetInnerHTML={{ __html: parsedBlockData.data.text }} />
        );
    
  })}
</div>
          <span className="mt-2 text-sm">
            Created At: {createdAt?.getDate()}/{createdAt?.getMonth() + 1}/
            {createdAt?.getFullYear()}{" "}
          </span>
        </div>
      </div>
      {rejected && (
        <div className="px-4 py-2">
          <Separator />
          <span className="font-bold">Reason For Reject</span>
          <p className="text-destructive">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Temporibus, consectetur.
          </p>
        </div>
      )}
    </Card>
  );
};

export default BlogCard;
