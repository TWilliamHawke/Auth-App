import { useCallback } from "react"

export const useScroll = () => {

  const scrollToBottom = useCallback((ref) => {
    const botom = ref.current.scrollHeight
    ref.current.scrollTo(0, botom)
  }, [])

  return {scrollToBottom}

}