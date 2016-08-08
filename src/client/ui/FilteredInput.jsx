import React from 'react';

const FilteredInput = (props) => {
  return (
    <input
      {...props}
      onKeyPress={(e) => {
        if (this.props.filter.test (e.key) === false) {
          e.preventDefault ();
        }
      }}
    />
  );
};

FilteredInput.PropTypes = {
  filter: React.PropTypes.object.isRequired,
};

export default FilteredInput;
