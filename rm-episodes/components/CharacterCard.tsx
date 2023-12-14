/* eslint-disable @next/next/no-img-element */
import { characterProps } from '@/types/types'
import React from 'react';

const IDCard = ({ results }: characterProps) => {
  let display: string | JSX.Element[]

  if (results) {
    display = results.map(x => {
      const { id, name, image } = x

      return (
        <div key={id} className='char-card'>
          <img
            className="image-style"
            height={"100px"}
            width={"100px"}
            src={image}
            alt=""
          />
          <div className='char-name'>{name}</div>
        </div>
      )
    })
  } else {
    display = 'No Characters Found'
  }

  return <>{display}</>
}

export default IDCard
