import React from 'react';
import Card from '../Card/Card';

import { LocationType } from '../../contexes/LocationsContext';

import './SearchBodyRow.css';

type SearchBodyRowProps = {
  locations: LocationType[];
  name: string;
};

const SearchBodyRow: React.FC<SearchBodyRowProps> = ({locations, name}) => {
  return (
    <div className="search-body-row">
      <div className="category">
        <h2>{name}</h2>
      </div>
      <div className="locations">
        {
          locations?.map(location => <Card
            annance={location}
            key={location.id}
          />)
        }
      </div>
    </div>
  );
};

export default SearchBodyRow;
