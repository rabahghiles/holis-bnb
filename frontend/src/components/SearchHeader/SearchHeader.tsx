import React from 'react';
import { HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi';
import './SearchHeader.css';

type SearchHeaderProps = {
  nbrLocations: number;
  direction: number,
  orbderBy: number,
  onDirectionChange: (direction: number) => void;
  onOrdberByChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({nbrLocations, onOrdberByChange, onDirectionChange, direction, orbderBy}) => {

  return(
    <div className='search-header'>
      <p>{`${nbrLocations} ${nbrLocations === 1 ? "location" : "locations"}`}</p>
      <div className="search-header-orderby">
        <select defaultValue={orbderBy} onChange={onOrdberByChange}>
          <option value="0">Prix</option>
          <option value="1">Nombre de chambres</option>
          <option value="2">Nombre d'étoiles</option>
        </select>
        <button onClick={() => onDirectionChange(direction ? 0 : 1)}>
          {
            direction ? <HiArrowNarrowUp /> : <HiArrowNarrowDown />
          }
        </button>
      </div>
    </div>
  );
}


export default SearchHeader;