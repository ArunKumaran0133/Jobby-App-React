import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => (
  <div>
    <Header />
    <div className="home-bg-container">
      <div className="home-sub-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-job-description">
          Millions of people of searching for jobs, salary information, company
          reviews, find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-job-home-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
