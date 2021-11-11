import { css } from "@emotion/react"
import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { useMeasure } from "react-use"
import Arrow from "../images/svg/arrow.svg"

const Slider: React.FC<{
  next: () => void
  previous: () => void
  offset: number
}> = (
  {
    children,
    offset,
    next,
    previous,
    slides,
    count,
    selected,
    setSelected,
    togglePlaying,
    translation,
    Wrapper,
    ...props
  },
  ref
) => {
  const parent = useRef()
  const [slider, { width: slideWidth }] = useMeasure()

  return (
    <div
      ref={slider}
      css={css`
        --slide-width: ${slideWidth - 300}px;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 120px auto;
        @media (min-width: 1024px) {
          margin: 200px auto;
        }
        .sl-arrow {
          width: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          margin: 0 32px;
          svg {
            width: 30px;
            height: 30px;
          }
          * {
            fill: var(--color-accent);
          }
        }
        .sl-container {
          display: flex;
        }
        .sl-slider {
          overflow: hidden;
          width: var(--slide-width);
          position: relative;
          min-height: 300px;
        }
        .sl-wrap {
          display: flex;
          position: absolute;
          height: 100%;
          user-select: none;
        }
        .sl-wrap > * {
          margin: 0;
          padding: 0;
          width: var(--slide-width);
        }
        .sl-dots {
          display: flex;
          justify-content: center;
          margin: -4px;
          flex-basis: 100%;
          margin-top: 24px;
          > * {
            cursor: pointer;
          }
        }
      `}
      {...props}
    >
      <div
        className="sl-container"
        onMouseOver={() => togglePlaying(false)}
        onMouseLeave={() => togglePlaying(true)}
        ref={parent}
      >
        <div className="sl-arrow" onClick={previous}>
          <Arrow />
        </div>
        <div className="sl-slider">
          <div className="sl-wrap" ref={ref}>
            {children}
          </div>
        </div>
        <div className="sl-arrow" onClick={next}>
          <Arrow
            css={css`
              transform: scaleX(-1);
            `}
          />
        </div>
      </div>
      <div className="sl-dots">
        {slides.map(slide => {
          const id = slide.props["data-id"]
          return (
            <Dot
              key={id}
              active={selected === id}
              onClick={() => setSelected(id)}
            />
          )
        })}
      </div>
    </div>
  )
}

export const Dot: React.FC<{}> = ({ active, ...props }) => {
  return (
    <div
      css={css`
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 4px;
        background: ${active
          ? "var(--color-accent)"
          : "rgba(255, 255, 255, 0.25)"};
      `}
      {...props}
    ></div>
  )
}

export default forwardRef(Slider)
