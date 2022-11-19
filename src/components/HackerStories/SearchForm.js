import * as React from 'react';
import { InputWithLabel } from './InputWithLabel';
import { ReactComponent as Check } from '../../svg/check.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
    <form onSubmit={onSearchSubmit} className="search-form">
      <InputWithLabel
        id="search"
        label="Search:"
        value={searchTerm}
        onInputChange={onSearchInput}
        isFocused
      >
        {/*<span>Барај: </span>*/}
        <FontAwesomeIcon icon="magnifying-glass" />
      </InputWithLabel>
      <button type="submit" className="button button_large" disabled={!searchTerm}>
        <Check />
      </button>
    </form>
  );

  export { SearchForm };