import axios from 'axios'
import { ChartData } from '../types'

// eslint-disable-next-line consistent-return
export const getChartData = async (coin: string) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7&interval=daily`,
  )
  const percentageResponse = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&developer_data=false&sparkline=false`,
  )
  const chartTemp: ChartData[] = []
  for (let i = 0; i < response.data.prices.length; i += 1) {
    chartTemp.push({
      time: response.data.prices[i][0],
      y_position: response.data.prices[i][1],
      price: response.data.prices[i][1],
    })
  }

  const percent: number = percentageResponse.data.market_data.price_change_percentage_24h.toFixed(
    2,
  )

  return { chartTemp, percent }
}
