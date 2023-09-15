import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FilterJobs from '../FilterJobs'
import JobsList from '../JobsList'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusObj = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    userDetails: {},
    activeSalaryType: '',
    activeEmployType: '',
    searchInput: '',
    jobsListData: [],
    isChecked: null,
    apiStatusForUSerDetails: apiStatusObj.initial,
    apiStatusForJobList: apiStatusObj.initial,
  }

  componentDidMount() {
    this.getUserProfile()
    this.getJobsList()
  }

  // user input details

  getUserInputDetail = userInput => {
    this.setState({searchInput: userInput})
  }

  getActiveEmployId = activeId => {
    this.setState({activeEmployType: activeId})
  }

  getActiveSalaryId = activeSalaryId => {
    this.setState({activeSalaryType: activeSalaryId})
  }

  getFilteredJobList = () => {
    this.getJobsList()
    this.setState({isChecked: false})
  }

  getSearchInputDetailsLarge = event => {
    this.setState({searchInput: event.target.value})
  }

  getFilteredListLarge = () => {
    this.getJobsList()
    this.setState({isChecked: false})
  }

  retryApi = () => {
    this.getUserProfile()
  }

  retryApiForJobList = () => {
    this.getJobsList()
  }
  // ----------------------------------------------------------------------------------------

  getUserProfile = async () => {
    this.setState({apiStatusForUSerDetails: apiStatusObj.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedProfileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        userDetails: updatedProfileDetails,
        apiStatusForUSerDetails: apiStatusObj.success,
      })
    } else {
      this.setState({apiStatusForUSerDetails: apiStatusObj.failure})
    }
  }

  getJobsList = async () => {
    this.setState({apiStatusForJobList: apiStatusObj.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmployType, activeSalaryType, searchInput} = this.state
    console.log(activeEmployType, activeSalaryType)

    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmployType}&minimum_package=${activeSalaryType}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsListData: updatedData,
        activeEmployType: '',
        activeSalaryType: '',
        searchInput: '',
        isChecked: null,
        apiStatusForJobList: apiStatusObj.success,
      })
    } else {
      this.setState({apiStatusForJobList: apiStatusObj.failure})
    }
  }

  renderSearchInputLarge = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container-large">
        <input
          type="search"
          className="search-input-large"
          placeholder="Search"
          onChange={this.getSearchInputDetailsLarge}
          value={searchInput}
        />
        <button
          type="button"
          className="search-button-large"
          onClick={this.getFilteredListLarge}
          data-testid="searchButton"
        >
          <BsSearch className="search-icon-large" />
        </button>
      </div>
    )
  }

  render() {
    const {
      userDetails,
      jobsListData,
      searchInput,
      isChecked,
      apiStatusForUSerDetails,
      apiStatusForJobList,
    } = this.state
    return (
      <div>
        <Header />
        <div className="jobs-bg-container">
          <div className="filter-job-container">
            <FilterJobs
              userDetails={userDetails}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              getUserInputDetail={this.getUserInputDetail}
              getActiveEmployId={this.getActiveEmployId}
              getActiveSalaryId={this.getActiveSalaryId}
              getFilteredJobList={this.getFilteredJobList}
              searchInput={searchInput}
              isChecked={isChecked}
              apiStatusForUSerDetails={apiStatusForUSerDetails}
              retryApi={this.retryApi}
            />
          </div>
          <div className="job-list-container">
            {this.renderSearchInputLarge()}
            <JobsList
              jobsListData={jobsListData}
              apiStatusForJobList={apiStatusForJobList}
              retryApiForJobList={this.retryApiForJobList}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
