"use client"
import { addNewBlog } from '@/actions/add-new-blog';
import { BlogTags } from '@/components/custom/blog-tags'
import PreviewBlog, { blogData } from '@/components/custom/preview-blog';
import Editor from '@/components/editor-js/EditorJs';
import { Button } from '@/components/ui/button';
import { editorData } from '@/constants/data'
import { JsonValue } from '@prisma/client/runtime/library';
import { Trash2 } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import * as z from "zod"

// Schema
const FormSchema = z.object({
    items: z.array(z.string()),
  })
  
const EditorWrapper = (blogData:blogData) => {
    // Hooks
    
    const [editBlogEnable, setEditBlogEnable] = React.useState(false)
    const ref = React.useRef<any>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
          items: [],
        },
      });


      const handleSubmit = () => {
        if (ref.current) {
          ref?.current?.save().then(async(outputData: any) => {
            const tagsValues = form.getValues().items;
            const title = outputData.blocks[0].data.text;
            const titleWithoutTags = title.replace(/<\/?[^>]+(>|$)/g, '');
    
            const slug = slugify(titleWithoutTags, {
              replacement: "-",
              lower: true,
            });
            addNewBlog({"tags": tagsValues, "blog": outputData, "slug": slug, "title": titleWithoutTags , flags : 2 })
          })
        };
      }
    

  return (
    <div>
      
    <div className='border rounded-md'>
      {editBlogEnable ? 
      ( <div className='mt-3 relative '>
      <div className='flex gap-3 h-[75vh]'>
        <div className='flex-1 h-full overflow-y-auto'>
          <Editor data={editorData} editorRef={ref}/>
        </div>
        <div className='relative'>
          <div className='sticky top-[68px] w-[250px] border p-3'>
            <h3 className='font-bold text-md mb-3'>Tags</h3>
            <BlogTags form={form} />
          </div>
        </div>
      </div>
    </div> ) : (
    <>
  <div className="bg-slate-300 animate-pulse w-full h-5 rounded-sm" />
    {/* <PreviewBlog data={blogData}/> */}
    <div>
      
      
    </div>
    </>
    
    )}
    </div>
    <div className='flex justify-center gap-2 mt-2'>
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={()=> setEditBlogEnable(false)}>Preview</Button>
      <Button onClick={()=> setEditBlogEnable(true)}>Edit</Button>
      <Button onClick={()=> alert("Delete blog")}><Trash2 /></Button>
    </div>
  </div>  )
}

export default EditorWrapper
