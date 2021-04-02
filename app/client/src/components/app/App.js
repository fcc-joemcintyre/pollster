// @ts-check
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { useAuth } from '../../data/useAuth';
import { Home } from '../home';
import { Register } from '../register';
import { Profile } from '../profile';
import { Poll } from '../poll';
import { CreatePoll, Manage, UpdatePoll } from '../manage';
import { Result } from '../result';
import { About } from '../about';
import { Logout } from '../logout';
import { getTheme } from './theme';
import { AuthRoute } from './AuthRoute';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { Nav } from './Nav';
import { ScrollToTop } from './ScrollToTop';

export const App = () => {
  const q = useAuth ();
  if (!q.isSuccess) {
    return (
      <Loading />
    );
  }

  const authenticated = q.isSuccess && q.data.key !== 0;
  const theme = getTheme ('light');
  return (
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <>
            <CssBaseline />
            <Nav />
            <Switch>
              <Route exact path='/'><Home /></Route>
              <Route exact path='/register'><Register /></Route>
              <AuthRoute exact path='/profile' authenticated={authenticated}><Profile /></AuthRoute>
              <Route exact path='/polls/:key'><Poll /></Route>
              <AuthRoute exact path='/manage/create' authenticated={authenticated}><CreatePoll /></AuthRoute>
              <AuthRoute exact path='/manage/:key' authenticated={authenticated}><UpdatePoll /></AuthRoute>
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
