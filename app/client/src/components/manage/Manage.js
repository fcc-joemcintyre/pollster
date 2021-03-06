// @ts-check
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, IconButton, List, ListItem, ListItemText,
  ListItemSecondaryAction, Tooltip, Typography } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { GenDialog } from '@cygns/muikit';
import { useDeletePoll, usePolls } from '../../data/usePolls';
import { PageContent } from '../util';

export const Manage = () => {
  const history = useHistory ();
  const [dialog, setDialog] = useState (/** @type {GenDialog=} */ (undefined));
  const { data: polls, isLoading, isError, isSuccess } = usePolls (true);
  const deletePoll = useDeletePoll ();

  function onEditPoll (key) {
    history.push (`/manage/${key}`);
  }

  function onDeletePoll (key) {
    setDialog (<GenDialog>Deleting poll...</GenDialog>);
    deletePoll.mutate ({ key }, {
      onSuccess: () => {
        setDialog (
          <GenDialog
            actions={['Ok']}
            data='reset'
            onClose={onClose}
          >
            Poll has been deleted.
          </GenDialog>
        );
      },
      onError: () => {
        setDialog (
          <GenDialog
            actions={['Close']}
            onClose={onClose}
          >
            Error deleting poll.
          </GenDialog>
        );
      },
    });
  }

  function onClose () {
    setDialog (null);
  }

  return (
    <PageContent>
      <Typography variant='h1' textAlign='center'>Manage Polls</Typography>
      { isLoading && (
        <Typography>Loading ...</Typography>
      )}
      { isError && (
        <Typography>Error loading polls</Typography>
      )}
      { isSuccess && (
        <>
          <Box textAlign='right'>
            <Tooltip title='Create a new poll'>
              <IconButton onClick={() => history.push ('/manage/create')}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <List component='nav' aria-label='polls'>
            { (polls?.polls || []).map ((a) => (
              <ListItem key={a.key}>
                <ListItemText
                  primary={a.title}
                  secondary={`${a.choices.reduce ((acc, b) => acc + b.votes, 0)} votes`}
                />
                <ListItemSecondaryAction>
                  <Tooltip title='Edit poll'>
                    <IconButton
                      edge='end'
                      aria-label='edit'
                      onClick={() => onEditPoll (a.key)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Delete poll'>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => onDeletePoll (a.key)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </>
      )}
      {dialog}
    </PageContent>
  );
};
