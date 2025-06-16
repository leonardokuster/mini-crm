import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomGlobalStyles from './styles/global.jsx';
import { NotificationProvider } from './components/NotificationsAlert/index.jsx';

import HomePage from './pages/HomePage.jsx';
import SigninPage from './pages/SigninPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import PrivateRoute from './components/PrivateRoute/index.jsx';
import ClientsListPage from './pages/ClientsListPage.jsx';
import AddClientPage from './pages/AddClientPage.jsx';
import InteractionsPage from './pages/InteractionsPage.jsx';
import Layout from './components/Layout/index.jsx';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#007BFF', dark: '#0056b3' },
    background: { default: '#f4f6f8' },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <CssBaseline />
        <CustomGlobalStyles />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<PrivateRoute element={Layout} />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/clients" element={<ClientsListPage />} />
              <Route path="/addClient" element={<AddClientPage />} />
              <Route path="/interacoes" element={<InteractionsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
}
