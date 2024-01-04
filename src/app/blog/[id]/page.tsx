import { getBlogById } from '@/actions/actions';
import Image from 'next/image';
import React from 'react';
import { DateTime } from "luxon";
import QuoteIcon from '@/components/QuoteIcon';

const renderBlog = (data, index: number) => {
    const parseData = JSON.parse(data);

    switch (parseData["type"]) {
        case 'header':
            return (
                <div className='w-3/4 mx-auto p-6 bg-[#f2f7ff]'>
                    <h1 className='text-center' dangerouslySetInnerHTML={{__html: parseData["data"].text}} />
                </div>)
    
        case 'image':            
            return (
                <div className='w-full'>
                    <Image className={`mx-auto ${index === 1 ? 'rounded-2xl' : ''}`} src={parseData["data"]?.file?.url} alt='image' width={800} height={500}/>
                    {parseData["data"].caption && <p className='text-red-500 text-center'>{parseData["data"].caption}</p>}
                </div>
            )
            
        case 'paragraph': 
            return (
                <div className='w-3/4 mx-auto'>
                    <p className='py-2 text-xl' dangerouslySetInnerHTML={{__html: parseData["data"].text}} />
                </div>)
            
        case 'list': 
            return (
                <div className='w-3/4 mx-auto'>
                    <li dangerouslySetInnerHTML={{__html: parseData["data"].items[0]}}/>
                </div>
            )

        case 'quote':
            return (
                <div className='w-3/4 mx-auto flex gap-2 items-center'>
                    <QuoteIcon/>
                    <p className='text-2xl font-semibold' dangerouslySetInnerHTML={{__html: parseData["data"].text}}/>
                </div>)

        default:
            break;
    }
    return parseData["type"];
}

const page = async({params}) => {
    const blogResponse = await getBlogById(params?.id);
    return (
        <div className='relative text-gray-700'>
            <div className='bg-[#f2f7ff] w-full z-[-1] h-[450px] absolute top-0'></div>  
            <div className='max-w-6xl mx-auto'>
                <p className='text-center pt-4'><span className='text-blue-400 underline'>Blogs</span> / Anti Ageing Treatment Approaches</p>
                {blogResponse.Block.map((block, index: number) => (
                    <div key={block.id}>
                        {index === 1 && (
                            <div className='w-2/4 mx-auto flex justify-center gap-6 pb-2'>
                                <span className='flex items-center gap-1'>
                                    <span className='underline'>Reviewed By:</span>
                                    <img className='h-8 w-8 rounded-full' src="https://res.cloudinary.com/dzxnhfjsz/image/upload/v1703067312/cms-images/aetxi2aj0ttc0xpkomtu.png" alt="" />
                                    <span className='text-blue-400'>{blogResponse.author.name}</span> 
                                </span>
                                <span className='flex items-center'><span className='underline'>Updated on:&nbsp;</span> {DateTime.fromISO(blogResponse.createdAt, { zone: "utc" }).toFormat("dd LLL, yyyy")}</span>
                            </div>
                        )}
                        <div className='py-4'>
                            {renderBlog(block.blockData, index)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page
