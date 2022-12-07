import { Link } from 'react-router-dom'
import { useLingui } from '@lingui/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { t } from '@lingui/macro'
import MemberCard from '../../../components/MemberCard'
import './style.scss'

interface Props {
  lang: string
}

const Team = ({ lang }: Props) => {
  const { i18n } = useLingui()

  const teamMembers = [
    {
      avatar: '/images/Hayato.png',
      name: 'Hayato Suzuki',
      title: i18n._(t`Project Leader`),
      linkedin: 'https://linkedin.com/in/hayatosuzuki801293/',
    },
    {
      avatar: '/images/magnus.png',
      name: 'Magnus Dufwa',
      title: i18n._(t`CTO`),
      linkedin: 'https://www.linkedin.com/in/magnusdufwa',
      twitter: 'https://twitter.com/MagnusDufwa?t=TUQRQ89cXHvw5tswb6HbHQ&s=09',
    },
    {
      avatar: '/images/ayio.jpg',
      name: 'Ayoleyi Lurogho',
      title: i18n._(t`Product Designer`),
      linkedin: 'https://www.linkedin.com/in/ayoleyi-lurogho/',
      twitter: 'https://twitter.com/lurogho_eth',
    },
    {
      avatar: '/images/socialmedia.png',
      name: 'Chaz Da Fonseca',
      title: i18n._(t`Social Media Specialist`),
      linkedin: 'https://www.linkedin.com/in/chaz-da-fonseca-79a675a0/',
      instagram: 'https://instagram.com/chaz_da_fonseca?igshid=YmMyMTA2M2Y=',
    },
    {
      avatar: '/images/socialmedia1.png',
      name: 'Allen Wazny',
      title: i18n._(t`Social Media Specialist`),
      linkedin: 'https://www.linkedin.com/in/allenwazny/',
      twitter: 'https://twitter.com/allenwaz',
    },
    {
      avatar: '/images/debbie1.jpg',
      name: 'Debbie Mamuzo',
      title: lang === 'Español' ? 'Cofundadora' : i18n._(t`Co-Founder`),
      instagram: 'https://instagram.com/mamuzzo_?igshid=YzAyZWRlMzg=',
      twitter: 'https://twitter.com/mamuzzo_?s=21&t=AhPPZ7BHD595fBy8QvGf1w',
    },
    {
      avatar: '/images/vlastimil1.png',
      name: 'Vlasta Hynek',
      title: i18n._(t`Co-Founder`),
      instagram: 'https://www.instagram.com/vlasta_hynek/?hl=en',
    },
    {
      avatar: '/images/raphael1.png',
      name: 'Raphael Comte',
      title: i18n._(t`Co-Founder`),
      linkedin: 'https://www.linkedin.com/in/rapha%C3%ABl-haroun-c-5463a516b/',
    },
    {
      avatar: '/images/mark1.jpg',
      name: 'Mark Magliocco',
      title: i18n._(t`Co-Founder`),
      linkedin: 'https://www.linkedin.com/in/mark-magliocco-51185b69/',
      twitter: 'https://twitter.com/NomadicSesh?t=gruZpET2gE5ijDvUyoc-Yw&s=08',
    },
  ]

  const advisoryMembers = [
    {
      avatar: '/images/Danish.jpg',
      name: 'Danish Akhtar',
      title: i18n._(t`Co-Founder/Mining Advisor`),
      linkedin:
        'https://www.linkedin.com/in/danish-akhtar-bitcoin-mining-expert-58763bb2/',
    },
    {
      avatar: '/images/neil.jpg',
      name: 'Neil Singh',
      title: i18n._(t`Governance Board Advisor`),
      linkedin: 'https://www.linkedin.com/in/neil-singh-32852320/',
    },
    {
      avatar: '/images/dustin.jpg',
      name: 'Dustin Pierce, CFA',
      title: i18n._(t`Governance Board Investment Advisor`),
      linkedin: 'https://www.linkedin.com/in/dustin-pierce-cfa-56a38729/',
    },
    {
      avatar: '/images/wilson.png',
      name: 'Wilson Duarte',
      title: i18n._(t`Defi Project Advisor`),
      linkedin: 'https://www.linkedin.com/in/wilson-duarte/',
      twitter: 'https://twitter.com/inPlanB',
    },
    {
      avatar: '/images/richard.png',
      name: 'Richard McAree',
      title: i18n._(t`Environmental, Social and Governance Advisor`),
      linkedin: 'https://www.linkedin.com/in/richard-mcaree-822a3116/',
    },
  ]

  return (
    <div className="team" id="about">
      <h4 className="main-titles">{i18n._(t`Our Team`)}</h4>
      <h4 className="main-contents">
        {i18n._(
          t`The Crypto528 team combines a passion for decentralization & community, and has a proven record in finance, development, marketing & licensing`
        )}
      </h4>
      <h5>{i18n._(t`THE ADVISORY BOARD`)}</h5>
      <div className="members">
        {advisoryMembers.map((item: any, index: number) => (
          <MemberCard
            avatar={item.avatar}
            name={item.name}
            title={item.title}
            linkedin={item?.linkedin}
            twitter={item?.twitter}
            instagram={item?.instagram}
            github={item?.github}
            // eslint-disable-next-line react/no-array-index-key
            key={`member-${index}`}
          />
        ))}
      </div>
      <h5>
        {i18n._(t`THE PROJECT TEAM`)}{' '}
        <img src="https://www.certik.com/badge-kyc-large.svg" alt="kyc" />
      </h5>
      <div className="members">
        {teamMembers.map((item: any, index: number) => (
          <MemberCard
            avatar={item.avatar}
            name={item.name}
            title={item.title}
            linkedin={item?.linkedin}
            twitter={item?.twitter}
            instagram={item?.instagram}
            github={item?.github}
            // eslint-disable-next-line react/no-array-index-key
            key={`member-${index}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Team
