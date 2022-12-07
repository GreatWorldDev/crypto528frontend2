/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './style.scss'

interface StackType {
  stack: string
  percent: number
}

interface MemberCardType {
  avatar: string
  name: string
  title: string
  linkedin?: string
  twitter?: string
  facebook?: string
  github?: string
  instagram?: string
  content?: string
  stacks?: StackType[]
}

const MemberCard = ({
  avatar,
  name,
  title,
  linkedin,
  twitter,
  facebook,
  github,
  instagram,
  content,
  stacks,
}: MemberCardType) => {
  return (
    <div className="member-card">
      <div
        style={{ backgroundImage: `url(${avatar})` }}
        className="profile-img"
      />
      <div className="infoIcon">
        <img src="/images/Info.svg" alt="info" />
      </div>
      <p className="member-name orange">{name}</p>
      <p className="member-title">{title}</p>
      <div className="member-social-acct">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <img src="/images/Linkedin.svg" alt="linkedin logo" />
          </a>
        )}
        {twitter && (
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <img src="/images/Twitter.svg" alt="" />
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <img src="/images/Instagram.svg" alt="" />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            <img src="/images/Instagram.svg" alt="" />
          </a>
        )}
      </div>
    </div>
  )
}

export default MemberCard
