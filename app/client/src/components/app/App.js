import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useAuth } from '../../data/useAuth';
import { Home } from '../home';
import { Register } from '../register';
import { Profile } from '../profile';
import { Poll } from '../poll';
import { Manage } from '../manage';
import { Result } from '../result';
import { About } from '../about';
import { Logout } from '../logout';
import { getTheme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { AuthRoute } from './AuthRoute';
import { Loading } from './Loading';
import { Nav } from './Nav';
import { NotFound } from './NotFound';
import { ScrollToTop } from './ScrollToTop';

export const App = () => {
  const q = useAuth ();
  if (!q.isSuccess) {
    return (
      <Loading message='Loading...' />
    );
  }

  const authenticated = q.isSuccess && q.data.key !== 0;
  const theme = getTheme ('base');
  return (
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Nav menu />
            <Switch>
              <Route exact path='/'><Home /></Route>
              <Route exact path='/register'><Register /></Route>
              <AuthRoute exact path='/profile' authenticated={authenticated}><Profile /></AuthRoute>
              <Route exact path='/polls/:key'><Poll /></Route>
              <AuthRoute exact path='/manage' authenticated={authenticated}><Manage /></AuthRoute>
              <AuthRoute exact path='/results' authenticated={authenticated}><Result /></AuthRoute>
              <Route exact path='/about'><About /></Route>
              <Route exact path='/logout'><Logout /></Route>
              <Route path='*'><NotFound /></Route>
            </Switch>
          </>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
