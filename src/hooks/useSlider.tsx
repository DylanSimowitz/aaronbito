import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useBoolean, useInterval } from "react-use"

const useSlider = (slides, options = { autoplay: true }) => {
  const { autoplay } = options
  const [offset, setOffset] = useState(0)
  const [count, setCount] = useState(slides.length)
  const [id, setId] = useState("")
  const [translation, setTranslation] = useState(0)
  // const items = useRef(new Array())
  const parent = useRef()
  // const register = useCallback(ref => {
  //   items.current.push(ref)
  // }, [])
  const [isPlaying, togglePlaying] = useBoolean(autoplay)

  useEffect(() => {
    setCount(slides.length)
    // setId(items.current[offset].getAttribute("data-id"))
    // setTranslation(-offset * 800)
  }, [slides])

  const nextOffset = (offset + 1) % count
  const prevOffset = (offset + (count - 1)) % count
  const prevSlide = slides[prevOffset]
  const currSlide = slides[offset]
  const nextSlide = slides[nextOffset]
  // useLayoutEffect(() => {
  //   const $parent = parent.current
  //   const $first = items.current[0]
  //   const $last = items.current[items.current.length - 1]
  //   const $firstClone = $first.cloneNode(true)
  //   $firstClone.removeAttribute("data-id")
  //   const $lastClone = $last.cloneNode(true)
  //   $lastClone.removeAttribute("data-id")
  //   $parent.insertBefore($lastClone, $first)
  //   $parent.insertBefore($firstClone, $last.nextSibling)
  // }, [])
  useLayoutEffect(() => {
    parent.current.style.transform = "translateX(calc(var(--slide-width)*-1))"
    parent.current.addEventListener("nextslide", () => {
      parent.current.style.transition = "transform 0.3s ease-in"
      parent.current.style.transform = `translateX(calc(var(--slide-width)*-2))`
      parent.current.setAttribute("data-direction", "next")
    })
    parent.current.addEventListener("prevslide", () => {
      parent.current.style.transition = "transform 0.3s ease-in"
      parent.current.style.transform = `translateX(0px)`
      parent.current.setAttribute("data-direction", "prev")
    })
    parent.current.addEventListener("transitionend", () => {
      parent.current.style.transition = "none"
      parent.current.style.transform = "translateX(calc(var(--slide-width)*-1))"
      const direction = parent.current.getAttribute("data-direction")
      if (direction === "next") {
        setOffset(prevO => (prevO + 1) % count)
      } else {
        setOffset(prevO => (prevO + (count - 1)) % count)
      }
    })
    return () => {
      parent.current.removeEventListener("nextslide")
      parent.current.removeEventListener("prevslide")
      parent.current.removeEventListener("transitionend")
    }
  }, [])
  // useLayoutEffect(() => {
  //   parent.current.addEventListener("transitionend", () => {
  //     setOffset(nextOffset)
  //   })
  // }, [nextOffset])
  // useLayoutEffect(() => {
  //   parent.current.style.transition = "transform 0.3s ease-in"
  //   parent.current.style.transform = `translateX(-800px)`
  // }, [offset])
  useInterval(next, isPlaying ? 5000 : null)

  // need to keep number of children the same
  // only want to render 3 of the children
  const Wrapper = useMemo(() => {
    return [prevSlide, currSlide, nextSlide]
  }, [offset])

  function next() {
    parent.current.dispatchEvent(new Event("nextslide"))
  }
  function previous() {
    parent.current.dispatchEvent(new Event("prevslide"))
  }

  function setSelected(id: string) {
    const index = slides.findIndex(slide => {
      return slide.props["data-id"] === id
    })
    setOffset(index)
  }

  return {
    next,
    previous,
    // register,
    slides,
    parent,
    offset,
    count,
    selected: slides[offset].props["data-id"],
    setSelected,
    togglePlaying,
    translation,
    Wrapper,
  }
}

export default useSlider
