/* eslint-disable no-unused-vars */

// card-props
export type characterProps = {
  results: {
    id: string
    name: string
    status: string
    species: string
    gender: string
    origin: {
      name: string
    }
    location: {
      name: string
    }
    image: string
  }[]
}

export type episodeProps = {
    id: number
    name: string
    status: string
    species: string
    gender: string
    origin: {
      name: string
    }
    location: {
      name: string
    }
    image: string
}

export type menuProps = {
  changeID: (value: number, name: string) => void
  data: any,
  selectedID: number
}


