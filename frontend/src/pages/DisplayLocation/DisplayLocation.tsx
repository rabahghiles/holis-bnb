import React, { useState, useEffect, useContext } from 'react';

import LocationsContext, { LocationType, CategoryType } from '../../contexes/LocationsContext';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


import "./DisplayLocation.css";
interface LocationCatType extends LocationType {
  category: CategoryType | undefined
}



type DisplayLocationPageProps = {};

const DisplayLocationPage: React.FC<DisplayLocationPageProps> = () => {

  
  const { id } = useParams();
  const navigate = useNavigate();
  const {locations, categories, setLocations } = useContext(LocationsContext);

  const [location, setLocation] = useState<LocationCatType>();
  const [mPrice, setPrice] = useState<string>();

  useEffect(() => {


    const numId: number | false = id ? parseInt(id) : false;

    if ( !numId ) navigate("/", { replace: true });
    const location: LocationType | undefined = locations.find(location => location.id === numId);
    if ( !location ) {

      // Call l'api pour recupérer la locations
      axios.get(`http://localhost:8000/locations/${numId}`)
      .then((res) => {
        setLocation(res.data)
        setPrice(res.data.price.toString());
      })
      .catch((err) => console.log(err))

    }else {

      // Mettre la location directement dans le state
      let category: CategoryType | undefined = categories?.find(c => c.id === location.categoryId);
      if ( !category ) {
        axios.get(`http://localhost:8000/categories/${location.categoryId}`)
        .then((res) => category = res.data)
        .catch((err) => console.log(err))
      }
      setPrice(location.price.toString());
      setLocation({
        ...location,
        category
      })

    }

  }, [])


  const deletLocation = (id?: number): void => {
    if (!id) return;
    axios.delete(`http://localhost:8000/locations/${id}`)
    .then((res) => {
      setLocations([]);
      navigate("/", { replace: true })
    })
    .catch((err) => console.log(err))
  }

  const updatePrice = (id?: number, price?: string): void => {
    if (!id || !price) return;
    const numPrice: number = parseInt(price);
    axios.put(`http://localhost:8000/locations/${id}`, {price: numPrice})
    .then((res) => setLocation(res.data))
    .catch((err) => console.log(err))
  }

  const formatPrice= (price: number): string => {
    return new Intl.NumberFormat('en-EN', { maximumSignificantDigits: 3 }).format(price);
  }

  return (
    <div className="display-location">

      <div className="display-location__img">
        <img src={location?.picture} alt={location?.title} />
      </div>

      <div className="display-location__content-container">
        
        <div className="display-location__content">
          <div className="display-location__content-header">
            <h1>{location?.title}, {location?.location}</h1>
            <p>€&nbsp;{formatPrice(location?.price ? location?.price : 0 )}&nbsp;<span>night</span></p>
          </div>
          <p className='display-location__content-cp'>{location?.category?.propertyType} • {`${location?.numberOfRooms}${location?.numberOfRooms === 1 ? "room" : "rooms"}`}</p>
          <p className='display-location__content-cd'>{location?.category?.description}</p>
        </div>

        <div className="display-location__edit">
          <form>
            <label htmlFor="price">Modify price</label>
            <input
              type="number"
              id="price"
              placeholder={location?.price.toString()}
              value={mPrice}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div>
              <button className='display-location__edit-btn-delete' type="button" onClick={() => deletLocation(location?.id)}>Delete</button>
              <button className='display-location__edit-btn-update' type="button" onClick={() => updatePrice(location?.id, mPrice)}>Confirm</button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};

export default DisplayLocationPage;
