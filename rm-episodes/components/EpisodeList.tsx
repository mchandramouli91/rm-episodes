import { episodeProps, menuProps } from '@/types/types'
import React from 'react'

const LeftMenu = ({ changeID, data, selectedID }: menuProps) => {
  return (
    <div>
      {
        data.map((episode:episodeProps) => {
          return (
            <div key={episode.id}
              className={ selectedID === episode.id ? 'higlight' : ''}
              onClick={() => changeID(episode.id, episode.name)}>{episode.name}</div>
          );
        })
      }
    </div>
  )
}

export default LeftMenu
