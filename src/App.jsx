import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Loading, Navbar } from './components';
import {
  Home, Login, Register, Thread, Leaderboards
} from './pages';
import { asyncPreloadProcess } from './states/isPreload/action';

function App() {
  const { authUser, isPreload = false } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [authUser]);

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/threads/:id" element={<Thread />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
