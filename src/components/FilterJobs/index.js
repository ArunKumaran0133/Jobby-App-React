import './index.css'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

const FilterJobs = props => {
  const {
    userDetails,
    employmentTypesList,
    salaryRangesList,
    getUserInputDetail,
    getActiveEmployId,
    getActiveSalaryId,
    getFilteredJobList,
    searchInput,
    isChecked,
    apiStatusForUSerDetails,
    retryApi,
  } = props
  const {name, profileImageUrl, shortBio} = userDetails

  // user input details

  const getSearchInput = event => {
    const userInput = event.target.value
    getUserInputDetail(userInput)
  }

  const employType = event => {
    const activeId = event.target.id
    getActiveEmployId(activeId)
  }

  const salaryType = event => {
    const activeSalaryId = event.target.id
    getActiveSalaryId(activeSalaryId)
  }

  const getFilterResult = () => {
    getFilteredJobList()
  }

  // ---------------------------------------------------------------------

  const renderSearchInput = () => (
    <div className="search-input-container">
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={getSearchInput}
        value={searchInput}
      />
      <button
        type="button"
        className="search-button"
        onClick={getFilterResult}
        data-testid="searchButton"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  const renderProfileContainer = () => (
    <div className="user-details-container">
      <img src={profileImageUrl} alt="profile" className="user-image" />
      <br />
      <h1 className="user-name">{name}</h1>
      <p className="short-bio-text">{shortBio}</p>
    </div>
  )

  const renderTypeOfEmployment = eachType => {
    const {label, employmentTypeId} = eachType
    return (
      <li key={employmentTypeId} className="item-container-filter-jobs">
        <input
          type="checkBox"
          id={employmentTypeId}
          className="input-check-box"
          onClick={employType}
          checked={isChecked}
        />
        <label htmlFor={employmentTypeId} className="label-text">
          {label}
        </label>
      </li>
    )
  }

  const renderTypeOfSalary = eachSalary => {
    const {label, salaryRangeId} = eachSalary

    return (
      <li key={salaryRangeId} className="item-container-filter-jobs">
        <input
          type="radio"
          id={salaryRangeId}
          className="input-check-box"
          onClick={salaryType}
          name="radio-group"
          value={salaryRangeId}
          checked={isChecked}
        />
        <label htmlFor={salaryRangeId} className="label-text">
          {label}
        </label>
      </li>
    )
  }

  const retryBtn = () => {
    retryApi()
  }

  const renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="white" />
    </div>
  )

  const failureView = () => (
    <div className="failure-view-container">
      <button type="button" className="retry-button" onClick={retryBtn}>
        Retry
      </button>
    </div>
  )

  const renderResultView = () => {
    switch (apiStatusForUSerDetails) {
      case 'SUCCESS':
        return renderProfileContainer()
      case 'FAILURE':
        return failureView()
      case 'IN_PROGRESS':
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div>
      {renderSearchInput()}
      {renderResultView()}
      <hr />
      <h1 className="input-heading-filter-jobs">Type of Employment</h1>
      <ul className="list-container-filter-jobs">
        {employmentTypesList.map(eachType => renderTypeOfEmployment(eachType))}
      </ul>
      <hr />
      <h1 className="input-heading-filter-jobs">Salary Range</h1>
      <ul className="list-container-filter-jobs">
        {salaryRangesList.map(eachSalary => renderTypeOfSalary(eachSalary))}
      </ul>
    </div>
  )
}

export default FilterJobs
