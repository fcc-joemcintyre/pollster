import React from 'react';
import PropTypes from 'prop-types';
import { Box, Select, Text } from 'uikit';

export const ManagePollSelect = ({ polls, selected, onSelect }) => (
  <Box center w='380px' pb='0 4px 16px 4px'>
    <Text as='h2' center>My Polls</Text>
    <Select
      style={{ width: '100%' }}
      autoFocus
      value={selected}
      onChange={(e) => { onSelect (e.target.value); }}
    >
      <option key='add' value=''>- Add a new poll -</option>
      {polls.map ((poll) => <option key={poll._id} value={poll._id}>{poll.title}</option>)}
    </Select>
  </Box>
);

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
