import { SET_POLLS } from './constants';
import 'whatwg-fetch';

export function setPolls (polls) {
  return { type: SET_POLLS, polls };
}

export function initPolls () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      fetch (location.origin + '/api/polls', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }).then (res => {
        if (! res.ok) {
          reject (res.statusText);
        } else {
          return res.json ();
        }
      }).then (polls => {
        dispatch (setPolls (polls));
        resolve ();
      }).catch (err => {
        reject (err);
      });
    });
  };
}

export function addPoll (poll) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      fetch (location.origin + '/api/polls', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify (poll)
      }).then (res => {
        if (! res.ok) {
          reject (res.statusText);
        } else {
          dispatch (initPolls ())
          .then (() => {
            resolve ();
          });
        }
      }).catch (err => {
        reject (err);
      });
    });
  };
}

export function updatePoll (poll) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      fetch (location.origin + '/api/polls/' + poll._id, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify (poll)
      }).then (res => {
        if (! res.ok) {
          reject (res.statusText);
        } else {
          dispatch (initPolls ())
          .then (() => {
            resolve ();
          });
        }
      }).catch (err => {
        reject (err);
      });
    });
  };
}

export function deletePoll (_id) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      fetch (location.origin + '/api/polls/' + _id, {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }).then (res => {
        if (! res.ok) {
          reject (res.statusText);
        } else {
          dispatch (initPolls ())
          .then (() => {
            resolve ();
          });
        }
      }).catch (err => {
        reject (err);
      });
    });
  };
}

export function vote (_id, choice) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      fetch (location.origin + '/api/polls/' + _id + '/votes/' + choice, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }).then (res => {
        if (! res.ok) {
          reject (res.statusCode);
        } else {
          dispatch (initPolls ())
          .then (() => {
            resolve ();
          });
        }
      }).catch (err => {
        reject (err);
      });
    });
  };
}
