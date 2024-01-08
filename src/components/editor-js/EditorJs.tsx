"use client";

import React, { useState, useEffect, useRef } from "react";

import ColorPlugin from 'editorjs-text-color-plugin' 

import SimpleImage from "@/components/simple-image";
import ImageTool from '@editorjs/image';
import HyperLink from 'editorjs-hyperlink';

import dynamic from "next/dynamic";
import { editorData } from "@/constants/data";
import { useRouter } from "next/navigation";


export default function Editor({data}: {data: any}) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<any>(null);

  const handleUpload = async (file: File) => {
    const clUrl = `https://api.cloudinary.com/v1_1/dzxnhfjsz/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", 'bn6bd1ye');
    const res = await fetch(clUrl, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const publicId = data.public_id;
    return data.secure_url
  };

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Link = (await import("@editorjs/link")).default
    const List = (await import("@editorjs/list")).default
    const Quote = (await import("@editorjs/quote")).default
    const Table = (await import("@editorjs/table")).default
    const Paragraph = (await import("@editorjs/paragraph")).default
    const Embed = (await import("@editorjs/embed")).default
    const Marker = (await import("@editorjs/marker")).default
    const NestedList = (await import("@editorjs/nested-list")).default
    const Code = (await import("@editorjs/code")).default

    if (ref.current) {
      const editor = new EditorJS({
        autofocus: true,
        holder: ref.current,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: 'Header',
              // levels: [2, 3, 4],
              // defaultLevel: 2,  
            },
            shortcut: 'CMD+SHIFT+H'
          },
          link: Link,
          simpleImage: SimpleImage,
          list: List,
          quote: {
            class: Quote,
            inlineToolbar: true
          },
          image:{
            class: ImageTool,
            config:{
              uploader:{
                async uploadByFile(file: File){
                  const data = await handleUpload(file);
                  return {
                    success: 1,
                    file: {
                      url: data,
                    }
                  }
                  
                }
              },
              inlineToolbar: ['link']
            }
          },
          table:{
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 1,
              cols: 1,
            },
          },
          // Marker:{
          //   class: Marker
          // },
          paragraph:{
            class: Paragraph
          },
          nestedlist:{
            class: NestedList
          },
          code:{
            class: Code
          },
          embed:{
            class: Embed
          },
          hyperlink: {
            class: HyperLink,
            toolbox:{
              title:'rrrererrdsdgsddsvdg'
            },
            config: {
              shortcut: 'CMD+L',
              target: '_blank',
              rel: 'nofollow',
              availableTargets: ['_blank', '_self'],
              availableRels: ['author', 'noreferrer'],
              validate: true,
            }
          },
          Color: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
               colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
               defaultColor: '#FF1300',
               type: 'text', 
               customPicker: true // add a button to allow selecting any colour  
            }     
          },
          Marker: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              //  colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
               defaultColor: '#FFBF00',
               type: 'marker',
               icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
              }       
          },
        },
        data: data && data
      });
      ref.current = editor
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();

      return () => {
        if (ref.current) {
          ref.current.destroy();
        }
      }
    }
  }, [isMounted])

  const save = async() => {

    if (ref.current) {
      ref.current.save().then(async(outputData: any) => {
        const bodyData = {
          "title": "First blog",  
          "authorName": "Pratik",
          "authorEmail":"pratik123@gmail.com",
          "slug": "first-blog",
          "tagName":["treatment","asdfghj"],
          "block":{
            ...outputData
          }
        };

        try {
          const res = await fetch('http://192.168.30.168:3000/api/blog', {
              method: 'POST',
              body: JSON.stringify(bodyData)
          })  
          const response = await res.json();
          console.log();
          
          router.push(`/blog/${response.blog.id}`)
  
          } catch (error) {
          console.log(error);
          }
      })
    }
  }

  return (
    <>
      <div ref={ref} draggable={false} className="" />
      <div>
    </div>

    </>
  )

};