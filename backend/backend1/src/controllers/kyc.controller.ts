import { Request, Response } from 'express';
import HttpStatus from 'http-status';
import axios from 'axios'
import crypto from 'crypto'
import fs from 'fs'
import FormData from 'form-data'
// These parameters should be used for all requests
// const SUMSUB_APP_TOKEN =
//   'sbx:pMehGBTGudTjtwogdEkAV9JB.roSiMIIyketbJvOQwtAsyMPuEDgavNq5' // Example: sbx:uY0CgwELmgUAEyl4hNWxLngb.0WSeQeiYny4WEqmAALEAiK2qTC96fBad - Please don't forget to change when switching to production
// const SUMSUB_SECRET_KEY = 'V1uITu0NkT6eTVBtkWvKNE7lB30xZbsZ' // Example: Hej2ch71kG2kTd1iIUDZFNsO5C1lh5Gq - Please don't forget to change when switching to production
const SUMSUB_APP_TOKEN = 'prd:xgyj2lQf2ein8zgMSTy4axP5.iqvOLqXRloiZzVfQlxuYDx6qos3Jnq2t' // Example: sbx:uY0CgwELmgUAEyl4hNWxLngb.0WSeQeiYny4WEqmAALEAiK2qTC96fBad - Please don't forget to change when switching to production
const SUMSUB_SECRET_KEY = 'EKyA1PqNSSsAx4KOpQYSYIocMYrdFuH0' // Example: Hej2ch71kG2kTd1iIUDZFNsO5C1lh5Gq - Please don't forget to change when switching to production
const SUMSUB_BASE_URL = 'https://api.sumsub.com'
function createAccessToken(
  externalUserId: any,
  levelName = 'NFT SAFT Compliance',
  ttlInSecs = 600
) {

  const method = 'post'
  const url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${levelName}`

  const headers = {
    Accept: 'application/json',
    'X-App-Token': SUMSUB_APP_TOKEN,
  }

  const config: any = {}
  config.baseURL = SUMSUB_BASE_URL

  config.method = method
  config.url = url
  config.headers = headers
  config.data = null

  const ts = Math.floor(Date.now() / 1000)
  const signature = crypto.createHmac('sha256', SUMSUB_SECRET_KEY)
  signature.update(ts + config?.method?.toUpperCase() + config.url)

  if (config.data instanceof FormData) {
    signature.update(config.data.getBuffer())
  } else if (config.data) {
    signature.update(config.data)
  }

  config.headers['X-App-Access-Ts'] = ts
  config.headers['X-App-Access-Sig'] = signature.digest('hex')

  return config
}

const get = async (req: Request, res: Response) => {
  try {
    const externalUserId = "random-JSToken-" + Math.random().toString(36).substr(2, 9);
    const levelName = 'basic-kyc-level';
    const response = await axios(createAccessToken(externalUserId, levelName, 1200))
    const data = response.data

    res.status(HttpStatus.OK).send({ data });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};


export const KYCController = {
  get,
};
