/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
import Countdown from 'react-countdown'
import { TypeNFT } from '../../types'
import styles from './CountDown.module.scss'

interface RendererProps {
  days: number
  hours: number
  minutes: number
  seconds: number
  completed: any
}

export const CountDown = ({
  time,
  className,
  secondType = false,
}: {
  time: TypeNFT
  className?: string
  secondType?: boolean
}) => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: RendererProps) => {
    return (
      <div className={`flex text-md ${styles.auctionWatch} ${className ?? ''}`}>
        {completed ? (
          <p>
            <span>Finished</span>
          </p>
        ) : (
          <>
            <p>
              {days}
              <span>d</span>
            </p>
            <p>
              {hours}
              <span>h</span>
            </p>
            <p>
              {minutes}
              <span>m</span>
            </p>
            <p>
              {seconds}
              <span>s</span>
            </p>
          </>
        )}
      </div>
    )
  }

  const renderer2 = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: RendererProps) => {
    return (
      <div className="timer">
        {completed ? (
          <p>
            <span>Auction Finished</span>
          </p>
        ) : (
          <>
            <img src="/images/timer.png" alt="timer" className="timer-img" />
            <p>
              {days}d: {hours}h: {minutes}m : {seconds} s
            </p>
          </>
        )}
      </div>
    )
  }

  return time.auctionInfo ? (
    <Countdown
      date={time?.auctionInfo?.auctionEndTime || 0}
      renderer={secondType ? renderer2 : renderer}
    />
  ) : time.isSale ? (
    <div className={`flex text-md ${styles.auctionWatch} ${className ?? ''}`}>
      <p>
        <span>Auction not started</span>
      </p>
    </div>
  ) : (
    <div className={`flex text-md ${styles.auctionWatch} ${className ?? ''}`}>
      <p>
        <span>Auction not started</span>
      </p>
    </div>
  )
}
