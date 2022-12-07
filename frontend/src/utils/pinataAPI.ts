import axios from 'axios'

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config()

export const pinFileToIPFS = async (file: File | Blob) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

    return await axios
      .post(url, formData, {
        headers: {
          'content-type': 'multipart/form-data',
          // eslint-disable-next-line @typescript-eslint/camelcase
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY || '',
          // eslint-disable-next-line @typescript-eslint/camelcase
          pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET || '',
        },
      })
      .then((response: any) => ({
        success: true,
        imageUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
      }))
      .catch((error: any) => {
        console.log(error)
        // handle error here
        // eslint-disable-next-line newline-before-return
        return { success: false, imageUrl: '' }
      })
  } catch (err) {
    console.log(err)

    return { success: false, imageUrl: '' }
  }
}

export const mintUsingPinata = async (payload: any) => {
  try {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
    const data = Object.assign(payload)

    return await axios
      .post(url, data, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY || '',
          // eslint-disable-next-line @typescript-eslint/camelcase
          pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET || '',
        },
      })
      .then((response: any) => ({
        success: true,
        message: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
      }))
      .catch((error: { message: any }) => {
        console.log(error)

        return {
          success: false,
          message: error.message,
        }
      })
  } catch (err) {
    return {
      success: false,
      message: err,
    }
  }
}
