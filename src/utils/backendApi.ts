/* eslint-disable consistent-return */
import axios from 'axios'
import { toast } from 'react-toastify'

const BASE_URL = process.env.REACT_APP_BASE_URL
const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY
const PINATA_API_SECRET = process.env.REACT_APP_PINATA_API_SECRET

export const getToken = () => {
  return localStorage.getItem('crypto528Token')
}

export const fetchGetApi = async (query: string, withAuth?: boolean) => {
  let token: string | null = ''
  try {
    if (withAuth) token = getToken()
    const response = await fetch(`${BASE_URL}/${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.status === 200 || response.status === 201) {
      const data = await response.json()

      return data
    }
    if (response.status === 400) {
      const data = await response.json()

      return data
    }
    if (response.status === 403) {
      return false
    }
    if (response.status === 500) {
      toast.error(
        'Sorry the server is not available right now please try later'
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchPostApi = async (
  query: string,
  body: any,
  withAuth?: boolean
) => {
  let token: string | null = ''
  try {
    if (withAuth) token = getToken()
    const response = await fetch(`${BASE_URL}/${query}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    if (response.status === 200 || response.status === 201) {
      const data = await response.json()

      return data
    }
    if (response.status === 400) {
      const data = await response.json()

      return data
    }
    if (response.status === 403) {
      return false
    }
    if (response.status === 500) {
      toast.error(
        'Sorry the server is not available right now please try later'
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchPutApi = async (
  query: string,
  body: any,
  withAuth?: boolean
) => {
  let token: string | null = ''
  try {
    if (withAuth) token = getToken()
    const response = await fetch(`${BASE_URL}/${query}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    if (response.status === 200 || response.status === 201) {
      const data = await response.json()

      return data
    }
    if (response.status === 400) {
      const data = await response.json()

      return data
    }
    if (response.status === 403) {
      return false
    }
    if (response.status === 500) {
      toast.error(
        'Sorry the server is not available right now please try later'
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export const getETHPrice = async (item?: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${item ||
        'ethereum'}&vs_currencies=usd`
    )
    const coinPrice = await response.json()
    console.log(coinPrice)

    return coinPrice[item || 'ethereum'].usd
  } catch (err) {
    console.log(err)

    return 0
  }
}

export const pinFileToIPFS = async (file: File | Blob) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

    return axios
      .post(url, formData, {
        headers: {
          'content-type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY as string,
          pinata_secret_api_key: PINATA_API_SECRET as string,
        },
      })
      .then((
        response // handle response here
      ) => ({
        success: true,
        imageUrl: `https://528holdings.mypinata.cloud/ipfs/${response.data.IpfsHash}`,
      }))
      .catch(function(error) {
        console.log(error)

        return { success: false, imageUrl: '' }
      })
  } catch (err) {
    console.log(err)

    return { success: false, imageUrl: '' }
  }
}

export const mintUsingPinata = async (file: File | Blob, payload: any) => {
  try {
    const res = await pinFileToIPFS(file)
    if (res.success) {
      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
      const data = Object.assign(payload, { image: res.imageUrl })

      return axios
        .post(url, data, {
          headers: {
            pinata_api_key: PINATA_API_KEY as string,
            pinata_secret_api_key: PINATA_API_SECRET as string,
          },
        })
        .then(response => ({
          success: true,
          message: `https://528holdings.mypinata.cloud/ipfs/${response.data.IpfsHash}`,
        }))
        .catch(function(error) {
          console.log(error)

          return {
            success: false,
            message: error.message,
          }
        })
    }

    return {
      success: false,
      message: 'Error',
    }
  } catch (err) {
    return {
      success: false,
      message: err,
    }
  }
}
