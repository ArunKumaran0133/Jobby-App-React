import Loader from 'react-loader-spinner'
import JobsCard from '../JobsCard'
import './index.css'

const JobsList = props => {
  const {jobsListData, apiStatusForJobList, retryApiForJobList} = props

  const renderSuccessView = () => {
    if (jobsListData.length === 0) {
      return (
        <div className="no-data-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-data-image"
          />
          <h1 className="no-data-heading">No Jobs Found</h1>
          <p className="no-data-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list-container">
        {jobsListData.map(eachJob => (
          <JobsCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  const retryApiRequest = () => {
    retryApiForJobList()
  }

  const loadingView = () => (
    <div data-testid="job-list-loader" className="loader">
      <Loader type="ThreeDots" color="white" />
    </div>
  )

  const failureView = () => (
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
        onClick={retryApiRequest}
      >
        Retry
      </button>
    </div>
  )

  const renderResultView = () => {
    switch (apiStatusForJobList) {
      case 'SUCCESS':
        return renderSuccessView()
      case 'FAILURE':
        return failureView()
      case 'IN_PROGRESS':
        return loadingView()
      default:
        return null
    }
  }

  return <div>{renderResultView()}</div>
}

export default JobsList
