import { useRef, useEffect } from 'react'

export function usePortal() {
  const rootElemRef = useRef(null)

  const getRef = () => {
    // avoids re-creating useRef's initial value when not being used
    if (rootElemRef.current === null) {
      rootElemRef.current = document.createElement('div')
    }
    return rootElemRef.current
  }

  useEffect(function setupElement() {
    // Look for existing target dom element to append to
    const parentElem = document.getElementById('portal')
    // Inject created div inside parentElem
    parentElem.appendChild(getRef())
    // This function is run on unmount
    return function removeElement() {
      getRef().remove()
    }
  }, [])

  return getRef()
}
