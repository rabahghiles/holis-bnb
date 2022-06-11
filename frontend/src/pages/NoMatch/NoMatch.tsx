import React from 'react';

type NoMatchPageProps = {};

const DisplayLocationPage: React.FC<NoMatchPageProps> = () => {
  return (
    <div className="no-match">
      <h2>404 not found</h2>
    </div>
  );
};

export default DisplayLocationPage;
