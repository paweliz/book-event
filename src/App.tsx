import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import NavbarComponent from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { Container } from 'react-bootstrap';
import AddEvent from './pages/AddEvent';
import Users from './pages/Users';
import PreviewEvent from './pages/PreviewEvent';
import Login from './pages/Login';
import { AuthProvider } from './hooks/AuthContext';
import axios from 'axios';
import { API_URL } from './config';
import Register from './pages/Register';
// import Home from './pages/Home';
// import NotFound from './pages/NotFound';
// import Create from './pages/Create';
// import EventsListPage from './pages/EventsListPage';
// import SignUp from './pages/SignUp';
// import Login from './pages/Login';
// import { AuthProvider } from './customHooks/AuthContext';
// import ForgotPassword from './pages/ForgotPassword';
// import UpdateProfile from './pages/UpdateProfile';
// import EventsDetails from './pages/EventsDetails';
// import UpdateEvent from './pages/UpdateEvent';
// import MyEvents from './pages/MyEvents';
// import VerifyEmail from './pages/VerifyEmail';
// import EmailNotVerified from './pages/EmailNotVerified';
// import ChangePassword from './pages/ChangePassword';
// import UpdateEmail from './pages/UpdateEmail';
// import UserPreview from './pages/UserPreview';
// import NearYou from './pages/NearYou';
// import ProtectedRoute from './ProtectedRoute';
// import UpdateFullName from './pages/UpdateFullName';
// import SearchEvents from './components/SearchEvents';

function App() {
  const [navbarVisible, setNavbarVisible] = useState(true);
  axios.defaults.baseURL = API_URL;
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
  return (
    <AuthProvider>
      <Router>
        <NavbarComponent
          navbarVisible={navbarVisible}
          setNavbarVisible={setNavbarVisible}
        />

        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dodaj' element={<AddEvent />} />
            <Route path='/users' element={<Users />} />
            <Route path='/event/:id' element={<PreviewEvent />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
