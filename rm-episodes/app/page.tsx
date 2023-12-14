/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Card from '@/components/CharacterCard'
import LeftMenu from '@/components/EpisodeList'
import Loading from '@/components/Loading'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [charResults, setCharResults] = useState([] as any[])
  const [episodesData, setEpisodesResults] = useState([] as any[])
  const [loading, setLoading] = useState(true)
  const [id, setID] = useState(1)
  const [episodeName, setEpisodeName] = useState("")
  const [episodeClicked, setEposideClicked] = useState(false)
  const episodeDataAPI = `https://rickandmortyapi.com/api/episode/${id}`
  const characterAPI = `https://rickandmortyapi.com/api/character`;
  let allEpisodeAPI = `https://rickandmortyapi.com/api/episode/`

  useEffect(() => {
    getAllEpisodes();
    getInitalCharacters();
  }, [])

  async function getAllEpisodes() {
    setLoading(true)
    const data = await fetch(allEpisodeAPI).then(res => res.json())
    setLoading(false)
    setEpisodesResults(prev => [ ...prev, ...data.results ]);
    if (data.info.next) {
      allEpisodeAPI = data.info.next;
      getAllEpisodes();
    }
  }

  async function getInitalCharacters() {
    setLoading(true)
    const initaialCharData = await fetch(characterAPI).then(res => res.json())
    setLoading(false)
    setCharResults(initaialCharData.results);
  }

  async function getCharacters() {
    setLoading(true)
    const data = await fetch(episodeDataAPI).then(res => res.json())
    const characterData = await Promise.all(
      data.characters.map(async (x: RequestInfo | URL) => {
        const res = await fetch(x)
        return await res.json()
      })
    )
    setLoading(false)
    setCharResults(characterData)
  }

  function onEpisodeClick(idClicked:any, name:string) {
    if (id === idClicked && episodeClicked) {
      getInitalCharacters();
      setEposideClicked(false)
    } else {
      getCharacters()
      setID(idClicked)
      setEpisodeName(name)
      setEposideClicked(true)
    }
  }

  return (
    <main>
      <div className="sidenav">
        <div className='episode-title'>Episodes</div>
        <LeftMenu
          changeID={onEpisodeClick}
          data={episodesData}
          selectedID={episodeClicked ? id : 0}/>
      </div>
      <div className="char-board">
        <header className='heading'>
          Rick and Morty Characters
        </header>
        { episodeClicked &&
          <section className='char-details'>
            {charResults.length} Characters in episode "<span className='bold-cls'>{episodeName}</span>"
          </section>
        }
        {loading ? (
          <div className='center-loader'>
            <Loading />
          </div>
        ) : (
          <div key={id} className="card-grid">
            <Card results={charResults} />
          </div>
        )}
      </div>
    </main>
  )
}

export default page
