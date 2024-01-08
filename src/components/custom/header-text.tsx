import React from 'react'

const HeaderText = ({ title }: { title : string }) => {
  return (
    <div  className='text-lg font-bold'> 
        {title}
    </div>
  )
}

export default HeaderText
