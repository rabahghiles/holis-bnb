import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import LocationsContext from '../../contexes/LocationsContext';
import SearchHeader from '../../components/SearchHeader/SearchHeader';
import SearchBody from '../../components/SearchBody/SearchBody';
import './Search.css';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {

  const {locations, categories, setLocations, setCategories} = useContext(LocationsContext);
  
  const [orderBy, setOrderBy] = useState<number>(0);
  const [price, setPrice] = useState<number>(1);

  useEffect(() => {

    axios.get("http://localhost:8000/locations")
    .then((res) => setLocations(res.data))
    .catch((err) => console.log(err))

    axios.get("http://localhost:8000/categories")
    .then((res) => setCategories(res.data))
    .catch((err) => console.log(err))

  }, [])

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
    </div>
  );
};

export default SearchPage;
