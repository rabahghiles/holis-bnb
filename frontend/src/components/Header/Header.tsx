import React, { useContext, useState } from 'react';
import axios from 'axios';
import { HiOutlineMenu, HiOutlineGlobeAlt, HiSearch } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import LocationsContext from '../../contexes/LocationsContext';

import './Header.css';
import Logo from '../../assets/img/HolisBnb.png';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = () => {

  const {setLocations} = useContext(LocationsContext);
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleKeywordChange = (keyword: string): void => {
    
    setKeyword(keyword);
    
    if (keyword.length >= 2 && !isLoading) {

      setIsLoading(true);

      axios.get(`http://localhost:8000/locations/search?q=${keyword.toString()}`)
      .then((res) => {
        setLocations(res.data);
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
    
    }

  }

  return (
    <div className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={Logo} alt="" />
        </Link>

        <div className="header__center">
          <input type="text" placeholder="Search a destination" value={keyword} onChange={(e) => handleKeywordChange(e.target.value)} />
          <div className="search-button">
            <HiSearch />
          </div>
        </div>

        <div className="header__right">
          <p>Become a host</p>
          <HiOutlineGlobeAlt />
          <HiOutlineMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
