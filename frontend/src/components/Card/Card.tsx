import React from 'react';
import { Link } from 'react-router-dom';
import { LocationType } from '../../contexes/LocationsContext';

import './Card.css';

type CarProps = {
  annance: LocationType
}


const Card: React.FC<CarProps> = ({annance}) => {

  const {id, picture, title, location, description, price} = annance

  const trimText = (text: string, n: number): string => {
    return text.length > n ? `${text.slice(0, n-1)} ...` : text;
  }
  
  const formatPrice= (price: number): string => {
    return new Intl.NumberFormat('en-EN', { maximumSignificantDigits: 3 }).format(price);
  }

  return (
    <Link to={`location/${id}`} className="card">
      <div className="img">
        <img
          src={picture}
          alt={title}
        />
      </div>
      <h3 className="title">{title}, {location}</h3>
      <p className="desc">{trimText(description, 50)}</p>
      <p className="date">May 10 - 20</p>
      <p className="price">€ {formatPrice(price)}<span> / night</span>
      </p>
    </Link>
  );
};

export default Card;
