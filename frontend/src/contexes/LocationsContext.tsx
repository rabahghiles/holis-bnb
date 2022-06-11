import React, { createContext, useState } from 'react';
export type locationType = {
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
type LocationsContextStateType = {
  locations: locationType[];
  setLocations: (locations: locationType[]) => void;
};
type LocationsContextPropsType = {
  children: any;
};
const LocationsContextDefaultValues: LocationsContextStateType = {
  locations: [
    {
      id: 1,
      title: 'Super Hotel',
      description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum maximus cursus. Nunc aliquam arcu est, quis sodales ante elementum euismod. Curabitur faucibus diam ut facilisis tincidunt. Morbi blandit dui et nunc euismod, nec tristique enim facilisis. Duis sagittis mattis neque, vel iaculis risus pulvinar non.',
      location: 'London',
      picture: 'https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg',
      stars: 4,
      numberOfRooms: 2,
      price: 90,
      categoryId: 1
    }
  ],
  setLocations: () => {}
}

const LocationsContext = createContext<LocationsContextStateType>(LocationsContextDefaultValues);

export const LocationsProvider: React.FC<LocationsContextPropsType> = ({ children }) => {
  const [locations, setLocations] = useState<locationType[]>(LocationsContextDefaultValues.locations);
  return (
    <LocationsContext.Provider value={{
      locations,
      setLocations
    }} >
      {children}
    </LocationsContext.Provider>
  );
}

export default LocationsContext;