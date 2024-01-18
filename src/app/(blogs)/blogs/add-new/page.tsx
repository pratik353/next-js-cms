"use client";

import slugify from "slugify";
import { BlogTags } from "@/components/custom/blog-tags";
import HeaderText from "@/components/custom/header-text";
import Editor from "@/components/editor-js/EditorJs";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addNewBlog } from "@/actions/add-new-blog";
import { draftBlog } from "@/actions/draft-blog";

const FormSchema = z.object({
  items: z.array(z.string()),
});

const AddNewBlog = () => {
  const ref = React.useRef<any>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      items: [],
    },
  });

  const handleSubmit = () => {
    if (ref.current) {
      ref?.current?.save().then(async (outputData: any) => {
        const tagsValues = form.getValues().items;
        const title = outputData.blocks[0];
        const titleWithoutTags = title.data.text.replace(/<\/?[^>]+(>|$)/g, "");
        console.log(titleWithoutTags);

        const slug = slugify(titleWithoutTags, {
          replacement: "-",
          lower: true,
        });
        addNewBlog({
          tags: tagsValues,
          blog: outputData,
          slug: slug,
          title: titleWithoutTags,
        });
      });
    }
  };

  const draftSubmit = () => {
    if (ref.current) {
      ref?.current?.save().then(async (outputData: any) => {
        const tagsValues = form.getValues().items;
        const title = outputData.blocks[0];
        const titleWithoutTags = title.data.text.replace(/<\/?[^>]+(>|$)/g, "");
        console.log(titleWithoutTags);

        const slug = slugify(titleWithoutTags, {
          replacement: "-",
          lower: true,
        });
        draftBlog({
          tags: tagsValues,
          blog: outputData,
          slug: slug,
          title: titleWithoutTags,
        });
      });
    }
  };

  return (
    <div className="">
      <div className="sticky top-[68px] flex justify-between">
        <HeaderText title="New Blog" />
        <div className="flex gap-3">
          <Button>Preview</Button>
          <Button onClick={draftSubmit}> Draft</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      <div className="relative mt-3 ">
        <div className="flex h-[75vh] gap-3">
          <div className="h-full flex-1 overflow-y-auto border">
            <Editor editorRef={ref} />
          </div>
          <div className="relative">
            <div className="sticky top-[68px] w-[250px] border p-3">
              <h3 className="text-md mb-3 font-bold">Tags</h3>
              <BlogTags form={form} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBlog;
