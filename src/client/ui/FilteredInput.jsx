import React from 'react';

const FilteredInput = (props) => {
  // remove FilteredInput props from props to passthrough to <input> element
  const passthrough = {};
  const keys = Reflect.ownKeys (props);
  for (const key of keys) {
    if ((key !== 'key') && (key !== 'ref') && (key !== 'filter')) {
      passthrough[key] = props[key];
    }
  }

  return (
    <input
      {...passthrough}
      onKeyPress={(e) => {
        if (props.filter.test (e.key) === false) {
          e.preventDefault ();
        }
      }}
    />
  );
};

/* eslint react/forbid-prop-types: off */
FilteredInput.propTypes = {
  filter: React.PropTypes.object.isRequired,
};

export default FilteredInput;
