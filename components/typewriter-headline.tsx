"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterHeadlineProps {
  texts: string[]
  baseText?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export function TypewriterHeadline({
  texts,
  baseText = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = "",
}: TypewriterHeadlineProps) {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentText, setCurrentText] = useState("")

  const baseTextRef = useRef(baseText) // The prop will either be the passed value or the new default ""

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = texts[textIndex]
      if (isDeleting) {
        if (charIndex > 0) {
          setCurrentText(fullWord.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }
      } else {
        if (charIndex < fullWord.length) {
          setCurrentText(fullWord.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      }
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(handleTyping, speed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <h1 className={`font-extrabold tracking-tight flex items-center justify-center ${className}`}>
      <span>
        {baseTextRef.current}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
          {currentText}
        </span>
        <span className="animate-pulse">|</span>
      </span>
    </h1>
  )
}
