import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../style/Layout';
import { SubHeading } from '../style/Text';
import { Select } from '../style/Select';

const ManagePollSelect = ({ polls, selected, onSelect }) => {
  return (
    <Box center w='400px' pb='16px'>
      <SubHeading center>My Polls</SubHeading>
      <Select
        w='380px'
        autoFocus
        value={selected}
        onChange={(e) => { onSelect (e.target.value); }}
      >
        <option key='add' value=''>- Add a new poll -</option>
        {polls.map ((poll) => {
          return <option key={poll._id} value={poll._id}>{poll.title}</option>;
        })}
      </Select>
    </Box>
  );
};

export default ManagePollSelect;

ManagePollSelect.propTypes = {
  polls: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf (PropTypes.shape ({
      votes: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
