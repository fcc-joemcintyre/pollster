import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import { Poll } from '../../data/usePolls.js';

type Props = {
  polls: Poll[];
};

/**
 * List of polls
 * @param Props
 * @returns React component
 */
export const PollList = ({ polls }: Props) => {
  const navigate = useNavigate ();
  return (
    <List component='nav' aria-label='polls'>
      { polls.map ((a, index) => (
        <ListItem
          key={a.key}
          button
          onClick={() => { navigate (`/polls/${a.key}`); }}
          sx={{ backgroundColor: (index % 2 ? '#ddf2fa' : '#cae5ef') }}
        >
          <ListItemText
            primary={a.title}
            secondary={`${a.choices.reduce ((acc, b) => acc + b.votes, 0)} votes`}
          />
        </ListItem>
      ))}
    </List>
  );
};
