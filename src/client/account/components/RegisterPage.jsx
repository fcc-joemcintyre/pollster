import React from 'react';
import {Link, withRouter} from 'react-router';
import {register, login} from '../store/actions';
import FilteredInput from '../../ui/FilteredInput.jsx';

const nameChars = /[A-Za-z0-9]/;
const pwChars = /[A-Za-z0-9!@#$%^&*-+_=]/;

class RegisterPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      username: '',
      password: '',
      verify: '',
      error: false
    }
    this.register = this.register.bind (this);
  }

  register (event) {
    event.preventDefault ();
    if (! ((this.state.username === '') || (this.state.password === ''))) {
      this.context.store.dispatch (register (this.state.username, this.state.password))
      .then (success => {
        this.context.store.dispatch (login (this.state.username, this.state.password))
        .then (success => {
          this.setState ({ error: false });
          if (this.props.location.state && this.props.location.nextPathname) {
            this.props.router.replace (this.props.location.nextPathname);
          } else {
            this.props.router.replace ('/');
          }
        })
        .catch (error => {
          this.setState ({ error: true });
        });
      });
    }
  }

  render() {
    return (
      <div className='dialogUser'>
        <h2>Register</h2>
        <hr/>
        <form onSubmit={this.register}>
          <FilteredInput
            autoFocus={true}
            type='text'
            placeholder='user name'
            maxLength={20}
            autoCapitalize='none'
            autoCorrect='off'
            filter={nameChars}
            onChange={e => {
              this.setState ({username: e.target.value});
            }}/>
          <FilteredInput
            type='password'
            placeholder='password'
            maxLength={20}
            filter={pwChars}
            onChange={e => {
              this.setState ({password: e.target.value});
            }}/>
          <FilteredInput
            type='password'
            placeholder='verify password'
            maxLength={20}
            filter={pwChars}
            onChange={e => {
              this.setState ({verify: e.target.value});
            }}/>
          <button className='dialogButton'
            disabled={(this.state.username === '') || (this.state.password === '')
              || (this.state.password !== this.state.verify)}>
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter (RegisterPage);

RegisterPage.contextTypes = {
  store: React.PropTypes.object.isRequired
}
