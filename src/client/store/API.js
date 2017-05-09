import { get, post, remove } from './util/jsonFetch';

export default class API {
  static register (username, password) {
    return post ('/api/register', { username, password });
  }

  static login (username, password) {
    return post ('/api/login', { username, password });
  }

  static logout () {
    return post ('/api/logout');
  }

  static verifyLogin () {
    return get ('/api/verifylogin');
  }

  static updateProfile (name, email) {
    return post ('/api/profile', { name, email });
  }

  static getPolls () {
    return get ('/api/polls');
  }

  static createPoll (title, choices, voteLimit, maxVotes, dateLimit, endDate) {
    return post ('/api/polls', { title, choices, voteLimit, maxVotes, dateLimit, endDate });
  }

  static updatePoll (_id, title, choices, voteLimit, maxVotes, dateLimit, endDate) {
    return post (`/api/polls/${_id}`, { title, choices, voteLimit, maxVotes, dateLimit, endDate });
  }

  static deletePoll (_id) {
    return remove (`/api/polls/${_id}`);
  }

  static vote (_id, choice) {
    return post (`/api/polls/${_id}/votes/${choice}`);
  }
}
