import { useState, useEffect, useCallback, useRef } from 'react'

// Speech synthesis hook for text-to-speech
export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState([])
  const [isSupported, setIsSupported] = useState(false)
  const utteranceRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSupported(false)
      return
    }

    setIsSupported(true)

    // Load voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)
    }

    loadVoices()

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  // Find the best voice for a language
  const getVoice = useCallback((lang) => {
    if (voices.length === 0) return null

    // Try to find exact match
    let voice = voices.find(v => v.lang.startsWith(lang))

    // For English, prefer US or UK voices
    if (lang === 'en') {
      voice = voices.find(v => v.lang === 'en-US') ||
              voices.find(v => v.lang === 'en-GB') ||
              voices.find(v => v.lang.startsWith('en'))
    }

    // For Khmer, look for km voices
    if (lang === 'km') {
      voice = voices.find(v => v.lang.startsWith('km'))
    }

    return voice || voices[0]
  }, [voices])

  // Speak text
  const speak = useCallback((text, options = {}) => {
    if (!isSupported || !text) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const {
      lang = 'en',
      rate = 0.9,
      pitch = 1,
      onStart,
      onEnd,
      onError
    } = options

    const utterance = new SpeechSynthesisUtterance(text)
    utteranceRef.current = utterance

    // Set voice
    const voice = getVoice(lang)
    if (voice) {
      utterance.voice = voice
    }

    // Set language explicitly
    utterance.lang = lang === 'km' ? 'km-KH' : 'en-US'
    utterance.rate = rate
    utterance.pitch = pitch

    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true)
      onStart?.()
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      onEnd?.()
    }

    utterance.onerror = (event) => {
      setIsSpeaking(false)
      console.error('Speech error:', event.error)
      onError?.(event)
    }

    // Speak
    window.speechSynthesis.speak(utterance)
  }, [isSupported, getVoice])

  // Speak English text
  const speakEnglish = useCallback((text, rate = 0.9) => {
    speak(text, { lang: 'en', rate })
  }, [speak])

  // Speak Khmer text
  const speakKhmer = useCallback((text, rate = 0.8) => {
    // Khmer speech may not be supported in all browsers
    // Try Khmer first, fall back to just showing a message
    const hasKhmerVoice = voices.some(v => v.lang.startsWith('km'))

    if (hasKhmerVoice) {
      speak(text, { lang: 'km', rate })
    } else {
      // No Khmer voice available - still try (some browsers may have built-in support)
      speak(text, { lang: 'km', rate })
    }
  }, [speak, voices])

  // Stop speaking
  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [isSupported])

  // Check if Khmer is supported
  const hasKhmerSupport = voices.some(v => v.lang.startsWith('km'))

  return {
    speak,
    speakEnglish,
    speakKhmer,
    stop,
    isSpeaking,
    isSupported,
    hasKhmerSupport,
    voices
  }
}

// Simple speak function for one-off use
export function speakText(text, lang = 'en', rate = 0.9) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang === 'km' ? 'km-KH' : 'en-US'
  utterance.rate = rate

  // Try to find appropriate voice
  const voices = window.speechSynthesis.getVoices()
  const voice = voices.find(v => v.lang.startsWith(lang === 'km' ? 'km' : 'en'))
  if (voice) {
    utterance.voice = voice
  }

  window.speechSynthesis.speak(utterance)
}
