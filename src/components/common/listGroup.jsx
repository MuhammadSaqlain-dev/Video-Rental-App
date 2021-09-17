import React from "react";

const ListGroup = ({
  totalGenres,
  selectedGenre,
  valueProperty,
  textProperty,
  onGenreSelect,
}) => {
  return (
    <ul className="list-group">
      {totalGenres.map((genre) => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onGenreSelect(genre)}
          key={genre[valueProperty]}
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default ListGroup;
