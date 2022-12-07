/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom'
import './style.scss'

const Whitepaper = () => {
  return (
    <div className="whitepaper">
      <h4 className="main-titles">
        <span>White Paper </span>
        <span> Lite Paper</span>
      </h4>
      <h4 className="main-contents">
        WithNunc varius interdum imperdiet. Phasellus et eros et nisl posuere
        pretium a in neque. Vivamus scelerisque libero non erat porttitor
        viverra.
      </h4>
      <div className="abstract">
        <h5>Abstract</h5>
        <p>
          You may not participate in this program if you are an employee or
          family member of an employee, or a current vendor or employee of such
          vendor, of Endurance of any of its subsidiaries. [You are also
          prohibited from participating if you are (i) in a country or territory
          that is the target of U.S. sanctions (including Cuba, Iran, Syria,
          North Korea, or the Crimea region of Ukraine), (ii) designated as a
          Specially Designated National or Blocked Person by the U.S. Department
          of the Treasury’s Office of Foreign Assets Control or otherwise owned,
          controlled, or acting on behalf of such a person or entity, or (iii)
          otherwise a prohibited party under U.S. trade and export control
          laws.]
        </p>
        <div className="downloads">
          <a href="#" target="_blank">
            <span>Download</span>
            <span>White Paper</span>
          </a>
          <a href="#" target="_blank">
            <span>Download</span>
            <span>Lite Paper</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Whitepaper
