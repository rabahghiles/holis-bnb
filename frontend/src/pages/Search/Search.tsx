import React, {useContext} from 'react';
import LocationsContext from '../../contexes/LocationsContext';
import './Search.css';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {

  const {locations} = useContext(LocationsContext);
  // Create a function to fetch all locations from database

  // Create a function to sort locations by categories & by number of rooms

  // Bonus: Create a search function linked to the search input in the header

  console.log(locations);

  return (
    <div className="search">
      <h2>Seach</h2>
    </div>
  );
};

export default SearchPage;
