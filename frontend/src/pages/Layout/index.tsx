/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import { useLinguiContext } from '../../context/LinguiContext'
import './style.scss'

const api = 'https://crypto528.herokuapp.com'
const baseURL = `${api}/api/v1/submitEmail`

const Layout: React.FC = ({ children }) => {
  const { lang, setLingui, setLang } = useLinguiContext()
  const [bottomEmail, setBottomEmail] = useState<string>('')
  const handleEmailCollector = (email: string) => {
    if (!email) {
      toast.error('Please input email!')

      return
    }

    // eslint-disable-next-line no-useless-escape
    if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.error(`Please enter a valid email address.`)

      return
    }
    axios
      .post(baseURL, { email })
      .then(response => {
        toast.success(response.data.message)
      })
      .catch((error: any) => {
        toast.error(error.response.data.message)
      })
  }

  return (
    <>
      <Header lang={lang} setLingui={setLingui} setLang={setLang} />
      {children}
      <Footer
        email={bottomEmail}
        setEmail={(item: string) => setBottomEmail(item)}
        submit={(item: string) => handleEmailCollector(item)}
        lang={lang}
      />
    </>
  )
}

export default Layout
