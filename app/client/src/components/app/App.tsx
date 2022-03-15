import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
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
import { NavUnauth } from './NavUnauth';
import { NavAuth } from './NavAuth';
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
            { authenticated ? <NavAuth /> : <NavUnauth /> }
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<AuthRoute><Profile /></AuthRoute>} />
              <Route path='/polls/:key' element={<Poll />} />
              <Route path='/manage/create' element={<AuthRoute><CreatePoll /></AuthRoute>} />
              <Route path='/manage/:key' element={<AuthRoute><UpdatePoll /></AuthRoute>} />
              <Route path='/manage' element={<AuthRoute><Manage /></AuthRoute>} />
              <Route path='/results' element={<AuthRoute><Result /></AuthRoute>} />
              <Route path='/about' element={<About />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
