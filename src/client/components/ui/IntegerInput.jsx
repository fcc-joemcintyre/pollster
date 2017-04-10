import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IntegerInput extends Component {
  constructor (props) {
    super (props);
    this.format = this.format.bind (this);
    this.calcCursor = this.calcCursor.bind (this);

    this.state = {
      value: this.format (props.value),
      regexp: new RegExp (props.separator, 'g'),
    };
  }

  componentWillReceiveProps (newProps) {
    this.setState ({ value: this.format (newProps.value) });
  }

  // add thousands separator
  format (n) {
    if (! n) {
      return '0';
    }
    return n.toString ().replace (/\B(?=(\d{3})+\b)/g, this.props.separator);
  }

  // calculate the new cursor position to accommodate adding / removing separator
  calcCursor (previous, next, cursor) {
    let pos = cursor;
    if (cursor < 2) {
      pos = 1;
    } else {
      const previousSeparators = (previous.match (this.state.regexp) || []).length;
      const nextSeparators = (next.match (this.state.regexp) || []).length;
      if (nextSeparators > previousSeparators) {
        pos += 1;
      } else if (nextSeparators < previousSeparators) {
        pos -= 1;
      }
    }
    this.refInput.setSelectionRange (pos, pos);
  }

  render () {
    // remove this compoenents props from props to passthrough to <input> element
    const passthrough = {};
    const keys = Reflect.ownKeys (this.props);
    for (const key of keys) {
      if (['separator', 'value', 'onChange'].indexOf (key) === -1) {
        passthrough[key] = this.props[key];
      }
    }

    return (
      <input
        {...passthrough}
        style={{ textAlign: 'right' }}
        type='text'
        ref={(ref) => { this.refInput = ref; }}
        value={this.state.value}
        onChange={(e) => {
          e.persist ();
          const previous = this.state.value;
          const changeValue = extract (e.target.value);
          const next = this.format (changeValue);
          const cursor = this.refInput.selectionStart;
          this.setState ({ value: next }, () => {
            this.calcCursor (previous, next, cursor);
            this.props.onChange (changeValue);
          });
        }}
      />
    );
  }
}

// extract integer value from displayed string
function extract (value) {
  if (value === '') {
    return 0;
  }
  let number = '';
  for (const ch of value) {
    if (ch >= '0' && ch <= '9') {
      number += ch;
    }
  }
  return parseInt (number, 10);
}

IntegerInput.propTypes = {
  separator: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

IntegerInput.defaultProps = {
  separator: ',',
};
