import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './components/Authentication/Register';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '/config/firebase-config';
import { getUserData } from '/services/users.service';
import { AuthContext } from '/context/AuthContext';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  const [user] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user === null || user === undefined) return;

    getUserData(user.uid).then((snapshot) => {
      if (!snapshot.exists()) {
        throw new Error('User data not found!');
      }
      setAppState({
        user,
        userData: snapshot.val()[Object.keys(snapshot.val())[0]],
      });
    });
  }, [user]);

  // const updateUserData = (newUserData) => {
  //   setAppState((prevState) => ({
  //     ...prevState,
  //     userData: newUserData,
  //   }));
  // };

  // const isAdmin = () => {
  //   return appState.userData?.role === 'admin';
  // }

  return (
    <>
      <AuthContext.Provider value={{ ...appState, setContext: setAppState }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
