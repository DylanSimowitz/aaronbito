import { css } from "@emotion/react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useAudio, useSlider } from "react-use"
import Pause from "../images/svg/pause.svg"
import Play from "../images/svg/play.svg"
import Next from "../images/svg/next.svg"
import Previous from "../images/svg/previous.svg"

export const PlayerControls: React.FC<{
  title: string
  artist: string
  src: string
  next: () => void
  previous: () => void
}> = ({ title, artist, src, next, previous }) => {
  const sliderRef = useRef()

  const [autoPlay, setAutoPlay] = useState(false)

  const [audio, state, controls] = useAudio({
    src,
    autoPlay,
  })

  const [playheadPosition, setPlayheadPosition] = useState(0)

  const { isSliding, value, pos, length } = useSlider(sliderRef, {})

  useEffect(() => {
    if (isSliding) {
      setPlayheadPosition(value)
    }
  }, [isSliding, value])

  let seeking = false
  useEffect(() => {
    if (!isSliding) {
      seeking = true
      controls.seek(value * state.duration)
    }
  }, [isSliding])

  useEffect(() => {
    if (state.duration && !isSliding && !seeking) {
      setPlayheadPosition(state.time / state.duration)
    }
  }, [state.time, state.duration, isSliding])

  // const playheadPos = value * 100 + "%"
  // const playheadPos = isSliding
  //   ? value * 100 + "%"
  //   : (state.time / state.duration) * 100 + "%"

  const nextSong = () => {
    next()
    setPlayheadPosition(0)
    setAutoPlay(true)
  }

  const prevSong = () => {
    previous()
    setPlayheadPosition(0)
    setAutoPlay(true)
  }

  useEffect(() => {
    if (state.time === state.duration) {
      nextSong()
    }
  }, [state.time, state.duration])

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .info {
          font-family: Poppins;
          font-size: 42px;
          font-style: normal;
          font-weight: 500;
          letter-spacing: -0.055em;
          text-align: center;
          .artist {
            font-size: 27px;
            font-weight: 300;
            line-height: 41px;
            color: #6c6c6c;
          }
        }

        .seeker-container {
          min-width: 80%;
          border-radius: 5px;
          margin: 24px 0;
          height: 12px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .seeker {
          height: 5px;
          background: var(--color-primary);
          position: relative;
          border-radius: 2px;
          width: 100%;
        }
        .playhead {
          width: 12px;
          height: 12px;
          top: -3px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
        }
      `}
    >
      <div className="info">
        <div className="title">{title}</div>
        <div className="artist">{artist}</div>
      </div>
      {audio}
      <div className="seeker-container" ref={sliderRef}>
        <div className="seeker">
          <div
            className="playhead"
            style={{ left: `calc(${playheadPosition * 100}% - 6px)` }}
          ></div>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          > * {
            margin: 0 6px;
            cursor: pointer;
          }
        `}
      >
        <Previous onClick={prevSong} />
        {state.paused ? (
          <Play onClick={controls.play} />
        ) : (
          <Pause onClick={controls.pause} />
        )}
        <Next onClick={nextSong} />
      </div>
    </div>
  )
}

export default PlayerControls
