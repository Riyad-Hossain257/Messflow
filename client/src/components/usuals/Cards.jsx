import React from 'react';

const Cards = (props) => {
  return (
    <div className="card bg-transparent text-white mb-3">
      <div className="card-header">{props.name}</div>
      <div className="card-body">
        <h5 className="card-title">{props.value}</h5>
      </div>
    </div>
  );
};

export default Cards;
