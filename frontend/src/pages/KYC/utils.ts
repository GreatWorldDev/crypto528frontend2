/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { fetchGetApi } from '../../utils/backendApi'

async function getAccessToken() {
  const config = {
    method: 'get',
    url:
      'https://cors-anywhere.herokuapp.com/http://127.0.0.1:3000/api/ky/access',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  const data = await fetchGetApi(`api/kyc/access`, true)
    .then(response => {
      return response.data.token
    })
    .catch(err => console.log(err))

  return data
}

export default getAccessToken
