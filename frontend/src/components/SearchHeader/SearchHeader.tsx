import React from 'react';
import { HiArrowNarrowUp } from 'react-icons/hi';
import './SearchHeader.css';

type SearchHeaderProps = {
  nbrLocations: number;
  orderBy: number,
  price: number,
  setOrderBy: (orderBy: number) => void;
  setPrice: (price: number) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({nbrLocations, orderBy, price, setOrderBy, setPrice}) => {

  return(
    <div className='search-header'>
      <div className="search-header-results">
        <p>{`${nbrLocations} ${nbrLocations === 1 ? "location" : "locations"}`}</p>
      </div>
      <div className={`search-header-orderby`}>
        <select defaultValue={orderBy} onChange={(e) => setOrderBy(parseInt(e.target.value))}>
          <option value={0}>Categories</option>
          <option value={1}>Rooms</option>
          <option value={2}>Stars</option>
        </select>
        <div className={`search-header-price ${price ? "search-header-price-down" : ''}`}>
          <span>Price</span>
          <button onClick={() => setPrice(price ? 0 : 1)}><HiArrowNarrowUp /></button>
        </div>
      </div>
    </div>
  );
}


export default SearchHeader;