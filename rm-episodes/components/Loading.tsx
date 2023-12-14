import loader from '@/public/assets/loader.gif'
import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <Image
      height={"800"}
      src={loader}
      alt="Loader.." />
  )
}

export default Loading
