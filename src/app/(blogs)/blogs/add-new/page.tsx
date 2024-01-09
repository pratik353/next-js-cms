"use client";

import slugify from 'slugify';
import { BlogTags } from '@/components/custom/blog-tags'
import HeaderText from '@/components/custom/header-text'
import Editor from '@/components/editor-js/EditorJs'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { addNewBlog } from '@/actions/add-new-blog';

const FormSchema = z.object({
  items: z.array(z.string()),
})

const AddNewBlog = () => {
  
  const ref = React.useRef<any>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      items: [],
    },
  });
  
  const handleSubmit = () => {
    
    if (ref.current) {
      ref.current.save().then(async(outputData: any) => {
        const tagsValues = form.getValues().items;
        const title = outputData.blocks[0];
        const titleWithoutTags = title.replace(/<\/?[^>]+(>|$)/g, '');

        const slug = slugify(titleWithoutTags, {
          replacement: "-",
          lower: true,
        });
        addNewBlog({"tags": tagsValues, "blog": outputData, "slug": slug, "title": titleWithoutTags})
      })
    };

  };

  return (
    <div className=''>
      <div className='sticky top-[68px] flex justify-between'>
        <HeaderText title="New Blog"/>
        <div className='flex gap-3'>
          <Button>Preview</Button>
          <Button>Draft</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      <div className='mt-3 relative '>
        <div className='flex gap-3 h-[75vh]'>
          <div className='flex-1 border h-full overflow-y-auto'>
            <Editor editorRef={ref}/>
          </div>
          <div className='relative'>
            <div className='sticky top-[68px] w-[250px] border p-3'>
              <h3 className='font-bold text-md mb-3'>Tags</h3>
              <BlogTags form={form} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewBlog
