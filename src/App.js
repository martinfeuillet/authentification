import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import SignUpModals from './components/SignUpModals';
import SignInModals from './components/SignInModals';
import Home from './pages/Home';
import Private from './pages/Private';
import PrivateHome from './pages/Private/PrivateHome/PrivateHome';

function App() {
  return (
    <>
    <SignUpModals />
    <SignInModals />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/private" element={<Private />} >
        <Route path="/private/private-home" element={<PrivateHome />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
