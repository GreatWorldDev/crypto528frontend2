/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Slider from 'react-slick'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import './style.scss'

const SampleNextArrow = (props: any) => {
  const { onClick } = props

  return (
    <div onClick={onClick} className="nextArrow">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="23" stroke="#F8951D" strokeWidth="2" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.2896 18.7098C21.8996 19.0998 21.8996 19.7298 22.2896 20.1198L26.1696 23.9998L22.2896 27.8798C21.8996 28.2698 21.8996 28.8998 22.2896 29.2898C22.6796 29.6798 23.3096 29.6798 23.6996 29.2898L28.2896 24.6998C28.6796 24.3098 28.6796 23.6798 28.2896 23.2898L23.6996 18.6998C23.3196 18.3198 22.6796 18.3198 22.2896 18.7098Z"
          fill="#F8951D"
        />
      </svg>
    </div>
  )
}

const SamplePrevArrow = (props: any) => {
  const { onClick } = props

  return (
    <div onClick={onClick} className="prevArrow">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="23" stroke="#F8951D" strokeWidth="2" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.7104 18.7098C26.1004 19.0998 26.1004 19.7298 25.7104 20.1198L21.8304 23.9998L25.7104 27.8798C26.1004 28.2698 26.1004 28.8998 25.7104 29.2898C25.3204 29.6798 24.6904 29.6798 24.3004 29.2898L19.7104 24.6998C19.3204 24.3098 19.3204 23.6798 19.7104 23.2898L24.3004 18.6998C24.6804 18.3198 25.3204 18.3198 25.7104 18.7098Z"
          fill="#F8951D"
        />
      </svg>
    </div>
  )
}

const settings = {
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '0px',
  slidesToShow: 3,
  speed: 500,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 845,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

const FAQ = () => {
  const { i18n } = useLingui()
  const sliderContent = [
    {
      title: i18n._(t`What is the purpose of Crypto528?`),
      content: i18n._(
        t`The mission of Crypto528 is to bring positive change to the world by creating a community of like-minded individuals with a focus on supporting blockchain technology, sustainable development, human rights, and helping those in need.`
      ),
    },
    {
      title: i18n._(t`What is a DAO?`),
      content: i18n._(
        t`A Decentralized Autonomous Organization (DAO) is a community-based organization that is collectively owned and managed by its members. DAOs have built-in treasuries so no one has the authority to access funds without the approval of the group. Decisions are governed by proposals and voting to ensure everyone in the organization has a voice.`
      ),
    },
    {
      title: i18n._(t`What is a Crypto Republik?`),
      content: i18n._(
        t`A crypto republic is a decentralized blockchain society that has an official set of rules such as a Constitution, which is specifically designed to protect the rights of each individual Citizen. In the Crypto528 Republik, Citizens can elect Chancellors to represent them on the DAO governance board which is known as the 528 Order.`
      ),
    },
    {
      title: i18n._(t`Who are Citizens of the Crypto Republik?`),
      content: i18n._(
        t`Citizens of the Republik are C-528 tokenholders and are  responsible for safeguarding the community vault and for electing representatives to the 528 Order. Governance in the DAO is designed to give Citizens the ability to change, modify or revoke any aspect of the organization ensuring that all power remains in the hands of tokenholders.`
      ),
    },
    {
      title: i18n._(t`What is the 528 Order?`),
      content: i18n._(
        t`Every four years the Republik will hold elections, where Citizens can cast votes to elect eight Chancellors and one Overseer to create the 528 Order. The primary function of the 528 Order is to act as a governance board that manages and guides the Republik. This is accomplished through voting proposals that are submitted by Chancellors to the 528 Order.`
      ),
    },
    {
      title: i18n._(t`What does a Chancellor do?`),
      content: i18n._(
        t`A Chancellor is elected by the Republik Citizens to represent them on the 528 Order. There are a total of 8 Chancellors who work together to manage the operations of the Republik. The duty of Chancellors is to manage, oversee and guide the DAO’s operations.`
      ),
    },
    {
      title: i18n._(t`Who is the Overseer?`),
      content: i18n._(
        t`The Overseer (O-528 holder) is an independent citizen representative that oversees the 528 Order. Unlike Chancellors (G-528 holders), the Overseer does not have any voting rights in the 528 Order. The role of the Overseer is to ensure that all voting proposals submitted are adhering to the Crypto528 constitution and bylaws.`
      ),
    },
    {
      title: i18n._(t`What is a Republik Vault?`),
      content: i18n._(
        t`All assets of the DAO are held in the Republik Vault which can only be accessed through voting proposals that are sent to Citizens for approval. Any vote requesting access to the Vault must have a minimum quorum of 5% of total C-528 tokenholders present. If 60% vote in favor, the proposal will pass and be approved for action.`
      ),
    },
    // {
    //   title: 'Who can buy C-528?',
    //   content:
    //     'Was just thinking this could get tricky because not all people can buy if they live in a country where we’re not authorized to sell',
    // },
    // {
    //   title: 'What’s the purpose of C-528 token?',
    //   content: 'This one is similar to who are Citizens of the Republik question',
    // },
  ]

  return (
    <div className="faq">
      <h5>{i18n._(t`Frequently Asked Questions`)}</h5>
      <Slider {...settings}>
        {sliderContent.map((item: any, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="slider" key={`faq-${index}`}>
            <div>
              <h3>{item.title}</h3>
              <h4>{item.content}</h4>
              <div className="bottomBar" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default FAQ
