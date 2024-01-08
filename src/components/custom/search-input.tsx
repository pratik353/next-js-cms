import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

const SearchInput = () => {
  return (
    <div className='relative'>
      <Input className='m-w-[100px]' placeholder='search...'/>
      <Search className='w-[18px] absolute top-1/2 -translate-y-1/2 right-2'/>
    </div>
  )
}

export default SearchInput
