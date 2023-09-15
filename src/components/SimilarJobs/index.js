import './index.css'
import {AiTwotoneStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'

const SimilarJobs = props => {
  const {similarJobDetail} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetail

  return (
    <li className="similar-job-card">
      <div className="image-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="job-image-similar-job"
        />
        <div>
          <h1 className="developer-title">{title}</h1>
          <div className="icon-container">
            <AiTwotoneStar className="icon" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-text">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="location-category-icon-container">
        <div className="location-icon-container-similar">
          <MdLocationOn className="job-location-category-icons-similar" />
          <p className="job-location-category-texts-similar">{location}</p>
        </div>
        <div className="location-icon-container">
          <FaSuitcase className="job-location-category-icons-similar" />
          <p className="job-location-category-texts-similar">
            {employmentType}
          </p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
