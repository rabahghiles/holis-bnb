import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import LocationsContext, { LocationType } from '../../contexes/LocationsContext';
import SearchHeader from '../../components/SearchHeader/SearchHeader';
import './Search.css';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {

  const {locations, setLocations} = useContext(LocationsContext);
  
  const [sortedLocations, setSortedLocations] = useState<LocationType[]>(locations);
  const [direction, setDirection] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<number>(1);

  // Create a function to fetch all locations from database (DONE);
  useEffect(() => {

    axios.get("http://localhost:8000/locations")
    .then((res) => setLocations(res.data))
    .catch((err) => console.log(err))

  }, [])

  const onDirectionChange = (direction: number): void => {
    setDirection(direction);
    orderLocations();
  }

  const onOrdberByChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setOrderBy(parseInt(e.target.value));
    orderLocations();
  }

  const orderLocations = (): void => {

    // (orderBy)
    // 0 => Price
    // 1 => Nombre de chambres
    // 2 => Nombre d'étoiles

    // (direction)
    // 0 => ASC
    // 1 => DESC

    let sortedLocations: LocationType[] = [...locations];

    if( orderBy === 0  && direction === 1) sortedLocations.sort((a,b) => a.price - b.price);
    else if ( orderBy === 0 && direction === 0) sortedLocations.sort((a,b) => b.price - a.price);
    else if ( orderBy === 1 && direction === 1) sortedLocations.sort((a,b) => a.numberOfRooms - b.numberOfRooms);
    else if ( orderBy === 1 && direction === 0) sortedLocations.sort((a,b) => b.numberOfRooms - a.numberOfRooms);
    else if ( orderBy === 2 && direction === 1) sortedLocations.sort((a,b) => a.stars - b.stars);
    else if ( orderBy === 2 && direction === 0) sortedLocations.sort((a,b) => b.stars - a.stars);

    setSortedLocations(sortedLocations);

  }



  // Create a function to sort locations by categories & by number of rooms

  // Bonus: Create a search function linked to the search input in the header

  return (
    <div className="search">
      <SearchHeader
        nbrLocations={locations?.length}
        direction={direction}
        orbderBy={orderBy}
        onDirectionChange={onDirectionChange}
        onOrdberByChange={onOrdberByChange}
      />
      <div>
        {
          sortedLocations?.map((location: LocationType) => <div key={location.id}>
            <h2>{location.title}</h2>
            <p>Prix : {location.price}</p>
            <p>Nombre de chambres : {location.numberOfRooms}</p>
            <p>Étoiles : {location.stars}</p>
          </div>)
        }
      </div>
    </div>
  );
};

export default SearchPage;
