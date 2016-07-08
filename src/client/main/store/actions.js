import { SET_POLLS } from './constants';
import request from 'request';

export function setPolls (polls) {
  return { type: SET_POLLS, polls };
}

export function initPolls () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.get (location.origin + '/api/polls', (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          let polls = JSON.parse (body);
          dispatch (setPolls (polls));
          resolve ();
        }
      });
    });
  };
}

export function addPoll (poll) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.post (location.origin + '/api/polls', {form: poll}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          poll._id = JSON.parse (body)._id;
          dispatch (initPolls ());
          resolve ();
        }
      });
    });
  };
}

export function updatePoll (poll) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.post (location.origin + '/api/polls/' + poll._id, {form: poll}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (initPolls ());
          resolve ();
        }
      });
    });
  };
}

export function deletePoll (_id) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.del (location.origin + '/api/polls/' + _id, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (initPolls ());
          resolve ();
        }
      });
    });
  };
}

export function vote (poll, choice) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.post (location.origin + '/api/polls/' + poll._id + '/votes/' + choice, {form: poll}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (initPolls ());
          resolve ();
        }
      });
    });
  };
}
