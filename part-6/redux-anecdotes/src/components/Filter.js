import React from "react";
import { useDispatch } from "react-redux";
import {filterChange} from "../reducers/filterReducer";

function Filter() {
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    dispatch(filterChange(e.target.value));
  };

  return (
    <div>
      <input onChange={handleFilter} placeholder="Search..."/>
    </div>
  );
}

export default Filter;