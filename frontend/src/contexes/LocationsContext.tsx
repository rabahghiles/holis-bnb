import React, { createContext, useState } from 'react';

export type LocationType = {
  id: number;
  title: string;
  description: string;
  location: string;
  picture: string;
  stars: number;
  numberOfRooms: number;
  price: number;
  categoryId: number;
};
export type CategoryType = {
  id: number;
  description: string;
  propertyType: string;
}

type LocationsContextStateType = {
  locations: LocationType[];
  categories: CategoryType[],
  setLocations: (locations: LocationType[]) => void;
  setCategories: (categories: CategoryType[]) => void;
}
type LocationsContextPropsType = {
  children: any;
};

const LocationsContextDefaultValues: LocationsContextStateType = {
  locations: [],
  categories: [],
  setLocations: () => {},
  setCategories: () => {}
}

const LocationsContext = createContext<LocationsContextStateType>(LocationsContextDefaultValues);

export const LocationsProvider: React.FC<LocationsContextPropsType> = ({ children }) => {

  const [locations, setLocations] = useState<LocationType[]>(LocationsContextDefaultValues.locations);
  const [categories, setCategories] = useState<CategoryType[]>(LocationsContextDefaultValues.categories)

  return (
    <LocationsContext.Provider value={{
      locations,
      categories,
      setLocations,
      setCategories
    }} >
      {children}
    </LocationsContext.Provider>
  );
}

export default LocationsContext;