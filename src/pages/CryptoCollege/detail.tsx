/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { Link, useParams } from 'react-router-dom'
import Layout from '../Layout'
import { blogs } from '../../constant/blogs'
import './style.scss'

const CollegeDetail = () => {
  const { id } = useParams()
  const blog = blogs[Number(id)]

  return (
    <Layout>
      <div className="college-detail">
        <div className="co-banner">
          {blog ? <img src={`/images/${blog?.image}`} alt="" /> : <></>}
          <div className="co-recent">
            <h3>Recent Post</h3>
            <div>
              {blogs.map((item: any, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <Link to={`/cryptocollege/${index}`} key={`college-${index}`}>
                  <p>{item?.title}</p>
                  <h4>{item?.date}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="co-info">
          <h1>{blog?.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: blog?.content }} />
        </div>
        {blog ? (
          <div className="co-btn">
            <a href={blog?.link} target="_blank" type="button" rel="noreferrer">
              Read More
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  )
}

export default CollegeDetail
