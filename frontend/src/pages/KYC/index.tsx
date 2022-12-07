/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react'
import SumsubWebSdk from '@sumsub/websdk-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import getAccessToken from './utils'
import { useAuthContext } from '../../context/useAuth'
import { fetchPutApi } from '../../utils/backendApi'

export default function KYC() {
  const { user } = useAuthContext()
  const [accessToken, setAccessToken] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessToken()
      setAccessToken(token)
    }
    getToken()
  }, [])

  const handleResult = async (type: any, payload: any) => {
    console.log('onMessage', type, payload)
    if (type === 'idCheck.applicantStatus') {
      if (payload?.reviewResult?.reviewAnswer === 'GREEN') {
        console.log('finished')
        await fetchPutApi(`api/user/${user?.id}`, {}, true)
        navigate('/explore')
      } else if (payload?.reviewResult?.reviewAnswer === 'RED') {
        toast.error('Sorry we cannot verify your identity. Please try again.')
      }
    }
  }

  return (
    <div className="kyc-container">
      {accessToken !== '' && accessToken && (
        <SumsubWebSdk
          accessToken={accessToken}
          // updateAccessToken={() => console.log('updateAccessToken')}
          expirationHandler={() => Promise.resolve(accessToken)}
          config={{
            lang: 'en',
          }}
          options={{ addViewportTag: false, adaptIframeHeight: true }}
          onMessage={(type, payload) => {
            handleResult(type, payload)
          }}
          onError={data => console.log('onError', data)}
        />
      )}
    </div>
  )
}
