import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onLogoutBtnLarge = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  const onLogoutBtnSmall = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-bg-container">
      <div className="nav-sub-container-small">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="icons-container">
          <Link to="/">
            <AiFillHome className="small-logos" />
          </Link>
          <Link to="/jobs">
            <MdWork className="small-logos" />
          </Link>
          <button
            type="button"
            className="small-logout-button"
            onClick={onLogoutBtnSmall}
          >
            <FiLogOut className="small-logos" />
          </button>
        </ul>
      </div>
      <div className="nav-sub-container-large">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo-large"
          />
        </Link>
        <ul className="nav-list-home-large">
          <Link to="/" className="home-logout-text">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="home-logout-text">
            <li>Jobs</li>
          </Link>
          <li>
            <button
              type="button"
              className="nav-logout-button-large"
              onClick={onLogoutBtnLarge}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
