import ReactDOM from 'react-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import getUserLocale from 'get-user-locale'
import { AuthProvider } from './context/useAuth'
import { ContextProvider } from './context/LinguiContext'
import Web3ReactManager from './context/Web3ReactManager'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './index.scss'

function getLibrary(provider: any) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000

  return library
}

export async function dynamicActivate(locale: string) {
  const { messages } = await import(`./locales/${locale}/messages`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

const localeList = ['en', 'es', 'pt_BR', 'ar', 'zh_CN']

const userLocale = getUserLocale()
const localeTemp = localStorage.getItem('crypto528-locale')
if (localeTemp) {
  if (localeList.includes(localeTemp)) {
    dynamicActivate(localeTemp)
  } else {
    dynamicActivate('en')
  }
} else {
  dynamicActivate('en')
}

ReactDOM.render(
  <I18nProvider i18n={i18n}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactManager>
        <ContextProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ContextProvider>
      </Web3ReactManager>
    </Web3ReactProvider>
  </I18nProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
