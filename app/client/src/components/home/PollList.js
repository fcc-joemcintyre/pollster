import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export const PollList = ({ polls, current, pageItems }) => {
  const history = useHistory ();
  const end = Math.min (polls.length, (current + 1) * pageItems);
  const result = [];
  for (let i = (current * pageItems); i < end; i ++) {
    const poll = polls[i];
    const totalVotes = poll.choices.reduce ((a, b) => a + b.votes, 0);
    result.push (
      <PollItem
        key={poll._id}
        onClick={() => { history.push (`/polls/${poll._id}`); }}
      >
        <Title>{poll.title}</Title>
        <Votes>{totalVotes} votes</Votes>
      </PollItem>
    );
  }
  return result;
};

PollList.propTypes = {
  polls: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf (PropTypes.shape ({
      votes: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  current: PropTypes.number.isRequired,
  pageItems: PropTypes.number.isRequired,
};

const PollItem = styled.div`
  display: flex;
  font-family: 'Lato', sans-serif;
  padding: 8px;
  cursor: pointer;

  &:nth-child(even) {
    background-color: ${(props) => props.theme.colorRowBgEven || '#F0F8FF'};
  }
  &:nth-child(odd) {
    background-color: ${(props) => props.theme.colorRowBgOdd || '#FFFFF0'};
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.colorRowHoverBorder || '#0000F8'};
  }
`;

const Title = styled.div`
  flex: 1 1;
}`;

const Votes = styled.div`
  flex: 0 0;
  white-space: nowrap;
  text-align: right;
}`;
