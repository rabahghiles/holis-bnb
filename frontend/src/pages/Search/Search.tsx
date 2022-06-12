import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import LocationsContext, { LocationType } from '../../contexes/LocationsContext';
import SearchHeader from '../../components/SearchHeader/SearchHeader';
import SearchBody from '../../components/SearchBody/SearchBody';
import './Search.css';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {

  const {locations, categories, setLocations, setCategories} = useContext(LocationsContext);
  
  const [orderBy, setOrderBy] = useState<number>(0);
  const [price, setPrice] = useState<number>(1);

  // Create a function to fetch all locations from database (DONE);
  useEffect(() => {

    axios.get("http://localhost:8000/locations")
    .then((res) => setLocations(res.data))
    .catch((err) => console.log(err))

    axios.get("http://localhost:8000/categories")
    .then((res) => setCategories(res.data))
    .catch((err) => console.log(err))

  }, [])

  // const onDirectionChange = (direction: number): void => {
  //   setDirection(direction);
  // }

  // const onOrdberByChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
  //   const value = parseInt(e.target.value);
  //   setOrderBy(value);
  //   orderLocations(value, direction);
  // }

  // const orderLocations = (orderBy: number, direction: number): void => {

  //   // (orderBy)
  //   // 0 => Price
  //   // 1 => Nombre de chambres
  //   // 2 => Nombre d'étoiles

  //   // (direction)
  //   // 0 => ASC
  //   // 1 => DESC

  //   let sortedLocations: LocationType[] = [...locations];

  //   if( orderBy === 0  && direction === 1) sortedLocations.sort((a,b) => a.price - b.price);
  //   else if ( orderBy === 0 && direction === 0) sortedLocations.sort((a,b) => b.price - a.price);
  //   else if ( orderBy === 1 && direction === 1) sortedLocations.sort((a,b) => a.numberOfRooms - b.numberOfRooms);
  //   else if ( orderBy === 1 && direction === 0) sortedLocations.sort((a,b) => b.numberOfRooms - a.numberOfRooms);
  //   else if ( orderBy === 2 && direction === 1) sortedLocations.sort((a,b) => a.stars - b.stars);
  //   else if ( orderBy === 2 && direction === 0) sortedLocations.sort((a,b) => b.stars - a.stars);

  //   setSortedLocations(sortedLocations);

  // }

  // const getSortedLocations = (orderBy: number, direction: number, locations: LocationType[]): void => {

  //   console.log(orderBy, direction, locations);
  // }

  return (
    <div className="search">
      <SearchHeader
        nbrLocations={locations?.length}
        orderBy={orderBy}
        price={price}
        setOrderBy={setOrderBy}
        setPrice={setPrice}
      />
      <SearchBody
        locations={locations}
        categories={categories}
        orderBy={orderBy}
        price={price}
      />
      {/* <div>
        {
          sortedLocations?.map((location: LocationType) => <div key={location.id}>
            <h2>{location.title}</h2>
            <p>Prix : {location.price}</p>
            <p>Nombre de chambres : {location.numberOfRooms}</p>
            <p>Étoiles : {location.stars}</p>
          </div>)
        } */}
      {/* </div> */}
    </div>
  );
};

export default SearchPage;
