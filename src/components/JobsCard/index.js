import './index.css'
import {Link} from 'react-router-dom'

import {FaSuitcase} from 'react-icons/fa'
import {AiTwotoneStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`jobs/${id}`} className="link-item">
      <li className="job-card-bg-container">
        <div className="image-logo-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-image"
          />
          <div>
            <h1 className="developer-title">{title}</h1>
            <div className="icon-container">
              <AiTwotoneStar className="icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-container">
          <div className="location-category-icon-container">
            <div className="location-icon-container">
              <MdLocationOn className="job-location-category-icons" />
              <p className="job-location-category-texts">{location}</p>
            </div>
            <div className="location-icon-container">
              <FaSuitcase className="job-location-category-icons" />
              <p className="job-location-category-texts">{employmentType}</p>
            </div>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="hr-element" />
        <div>
          <h1 className="job-description-title">Description</h1>
          <p className="description-job">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsCard
