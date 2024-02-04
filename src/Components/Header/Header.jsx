import React from 'react'
import { Link } from 'react-router-dom'
import {ImSearch} from "react-icons/im"
const Header = () => {
  return (
    <nav className="header">
     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="logo" />


     <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recentlyadded">Recently Added</Link>
        <Link to="/mylist">My List</Link>
     </div>

<ImSearch/>

    </nav>

  )
}

export default Header