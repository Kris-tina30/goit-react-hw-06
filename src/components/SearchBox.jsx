import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/filtersSlice';

function SearchBox() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.contacts.filters);
  const onChangeFilter = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <p>Find contacts by name</p>
      <input type="text" value={filters} onChange={onChangeFilter} />
    </div>
  );
}

export default SearchBox;
