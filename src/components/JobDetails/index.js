import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import {AiTwotoneStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'
import {RiShareForwardBoxFill} from 'react-icons/ri'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiStatusObj = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skills: [],
    lifeAtCompany: {},
    apiStatus: apiStatusObj.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusObj.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        id: data.job_details.id,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const skills = data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs,
        skills,
        lifeAtCompany,
        apiStatus: apiStatusObj.success,
      })
    } else {
      this.setState({apiStatus: apiStatusObj.failure})
    }
  }

  retryApiRequest = () => {
    this.getJobDetails()
  }

  renderSuccessView = () => {
    const {jobDetails, skills, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobDetails
    return (
      <>
        <div className="job-card-bg-container">
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
          <hr />
          <div>
            <div className="description-container">
              <h1 className="job-description-title">Description</h1>
              <a href={companyWebsiteUrl} className="visit-company-text">
                <p>Visit</p>
                <RiShareForwardBoxFill className="share-icon" />
              </a>
            </div>
            <p className="description-job">{jobDescription}</p>
            <h1 className="skills-text">Skills</h1>
            <ul className="skill-list-container">
              {skills.map(eachSkill => (
                <li key={eachSkill.name} className="skill-item-container">
                  <img
                    src={eachSkill.imageUrl}
                    alt={eachSkill.name}
                    className="skill-image"
                  />
                  <p className="skill-text">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="life-at-company-text">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="life-at-company-description">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(eachJob => (
            <SimilarJobs key={eachJob.id} similarJobDetail={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button-jobs-list"
        onClick={this.retryApiRequest}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="white" />
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObj.success:
        return this.renderSuccessView()
      case apiStatusObj.failure:
        return this.renderFailureView()
      case apiStatusObj.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-detail-bg-container">{this.renderResultView()}</div>
      </>
    )
  }
}

export default JobDetails
