import React from 'react';
import SearchBodyRow from '../SearchBodyRow/SearchBodyRow';

import { LocationType, CategoryType } from '../../contexes/LocationsContext';

type SearchBodyProps = {
  locations: LocationType[];
  categories: CategoryType[];
  orderBy: number;
  price: number;
}

type OrdredLocationsType = {
  name: string;
  locations: LocationType[];
}


const SearchBody: React.FC<SearchBodyProps> = ({locations, categories, orderBy, price}) => {

  const getSortedLocations = (): OrdredLocationsType[] => {

    let rows: number[] = [];
    let ordredLocations: OrdredLocationsType[] = [];

    if ( orderBy === 0 ) {

      rows =  Array.from(new Set(locations.map((location: LocationType) => location.categoryId))).sort();
      ordredLocations = rows.map( elem => {
        return {
          name: getCategoryName(categories, elem),
          locations: price
          ? locations.filter(location => location.categoryId === elem).sort((a,b) => a.price - b.price)
          : locations.filter(location => location.categoryId === elem).sort((a,b) => b.price - a.price)
        }
      })

    }else if ( orderBy === 2 ) {

      rows =  Array.from(new Set(locations.map((location: LocationType) => location.stars))).sort((a,b) => b - a);
      ordredLocations = rows.map( elem => {
        return {
          name: `${elem} ${elem === 1 ? "star" : "stars"}`,
          locations: price
          ? locations.filter(location => location.stars === elem).sort((a,b) => a.price - b.price)
          : locations.filter(location => location.stars === elem).sort((a,b) => b.price - a.price)
        }
      })

    }else {

      rows =  Array.from(new Set(locations.map((location: LocationType) => location.numberOfRooms))).sort();
      ordredLocations = rows.map( elem => {
        return {
          name: `${elem} ${elem === 1 ? "room" : "rooms"}`,
          locations: price
          ? locations.filter(location => location.numberOfRooms === elem).sort((a,b) => a.price - b.price)
          : locations.filter(location => location.numberOfRooms === elem).sort((a,b) => b.price - a.price)
        }
      })

    }

    return ordredLocations;

  }

  const getCategoryName = (categories: CategoryType[], id: number): string => {
    const category = categories.find(c => c.id === id);
    const categoryName = category ? `${category.propertyType}s` : "";
    return categoryName
  }

  const mLocations: OrdredLocationsType[] = getSortedLocations();

  return (
    <>
      {
        mLocations.map( (row, index) => (
          <SearchBodyRow
            key={index}
            locations={row.locations}
            name={row.name}
          />
        ))
      }
    </>
  );
}


export default SearchBody;