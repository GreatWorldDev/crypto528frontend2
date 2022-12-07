/* eslint-disable no-nested-ternary */
/* global AlgoSigner */
import React, { useState, createContext, useEffect, useContext } from 'react'
import { dynamicActivate } from '..'

interface LinguiProps {
  lang: string
  setLang: (item: string) => void
  setLingui: (item: string) => void
}

const Context = createContext<LinguiProps>({} as LinguiProps)

export const ContextProvider: React.FC = ({ children }) => {
  const [lang, setLang] = useState<string>('ENGLISH')

  const setLingui = async (locale: string) => {
    await localStorage.setItem('crypto528-locale', locale)
    dynamicActivate(locale)
  }

  useEffect(() => {
    const locale = localStorage.getItem('crypto528-locale')
    if (locale) {
      setLang(
        locale === 'es'
          ? 'Español'
          : locale === 'pt_BR'
          ? 'Português'
          : locale === 'ar'
          ? 'العربية'
          : locale === 'zh_CN'
          ? '中文'
          : 'ENGLISH'
      )
    } else {
      setLang('ENGLISH')
    }
  }, [])

  return (
    <Context.Provider value={{ lang, setLang, setLingui }}>
      {children}
    </Context.Provider>
  )
}

export const useLinguiContext = () => useContext(Context)
