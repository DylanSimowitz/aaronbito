import { css } from "@emotion/react"
import { IGatsbyImageData } from "gatsby-plugin-image"
import React, { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"
import PlayerControls from "./PlayerControls"
import { ContentfulSong } from "../../graphql-types"

export const Player: React.FC<{ songs: ContentfulSong[] }> = ({ songs }) => {
  const [currentTrack, setCurrentTrack] = useState(songs[0])
  const nextTrack = () => {
    setCurrentTrack(track => {
      const idx = songs.findIndex(song => song.id === track.id)
      return songs[(idx + 1) % songs.length]
    })
  }
  const prevTrack = () => {
    setCurrentTrack(track => {
      const idx = songs.findIndex(song => song.id === track.id)
      return songs[(idx + (songs.length - 1)) % songs.length]
    })
  }

  return (
    <div
      css={css`
        height: 600px;
        width: 100%;
        max-width: 960px;
        border-radius: 36px;
        border: 4px solid;
        display: grid;
        padding: 36px;
        grid-template:
          "a" auto
          "b" 1fr
          / 1fr;
        row-gap: 24px;
        margin: 0 auto;
        .artwork {
          padding: 16px;
        }
        .artwork--big {
          display: none;
        }
        @media (min-width: 768px) {
          grid-template:
            "a b" auto
            "c c" 1fr
            / auto 1fr;
          .artwork--big {
            display: block;
          }
        }
      `}
    >
      <div className="artwork artwork--big">
        <img srcSet={currentTrack.artwork?.fixed?.srcSet} />
      </div>
      <PlayerControls
        title={currentTrack.title!}
        artist={currentTrack.artist!}
        src={currentTrack.track?.file?.url!}
        next={nextTrack}
        previous={prevTrack}
      />
      <div
        css={css`
          grid-column: span 2;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        `}
      >
        {songs.map(song => {
          const { id, artist, title, track, artwork } = song
          return (
            <Track
              key={id}
              artist={artist}
              title={title}
              src={track.file.url}
              artwork={artwork.fixed.srcSet}
              onClick={() => setCurrentTrack(song)}
              active={currentTrack.id === song.id}
            />
          )
        })}
      </div>
    </div>
  )
}

const Track: React.FC<{
  title: string
  artist: string
  artwork: IGatsbyImageData
  src: string
}> = ({ title, artist, artwork, src, active, ...props }) => {
  const waveformRef = useRef(null)

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#161616",
      progressColor: "#161616",
      height: 60,
      cursorWidth: 0,
    })
    wavesurfer.load(src)
    return () => {
      wavesurfer.destroy()
    }
  }, [src])

  const baseStyles = css`
    display: flex;
    align-items: center;
    padding: 8px 0;
    cursor: pointer;
    &:hover {
      background: #313131;
    }
    > * {
      margin: 0 8px;
    }
    .artwork {
      padding: 0px !important;
      img {
        width: 80px !important;
        height: 80px !important;
      }
    }
    .info {
      font-family: Poppins;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: 36px;
      letter-spacing: -0.055em;
      text-align: left;

      .artist {
        font-size: 18px;
        font-weight: 300;
        line-height: 27px;
        color: #6c6c6c;
      }
    }
    .wave {
      flex: 1;
    }
  `
  const activeStyles = css`
    .info {
      .title {
        color: var(--color-primary);
      }
    }
  `
  const styles = [baseStyles]
  if (active) styles.push(activeStyles)
  return (
    <div css={styles} {...props}>
      <div className="artwork">
        <img srcSet={artwork} />
      </div>
      <div className="info">
        <div className="title">{title}</div>
        <div className="artist">{artist}</div>
      </div>
      <div className="wave" ref={waveformRef}></div>
    </div>
  )
}

export default Player
