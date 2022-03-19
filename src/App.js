import {
  Route,
  Routes,
} from 'react-router-dom';
import ConfirmLogin from './components/Auth/ConfirmLogin';
import Login from './components/Auth/Login';
import Home from './container/Home';
import './App.css';
import AgencyProfile from './container/AgencyProfile';
import { useState } from 'react';
import { LoaderContext } from './shared/context/loader-context';

function App() {
  const [loader, setLoader] = useState(false);
  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      <div className='h-1'>
        {loader ?
          <div className="progress-line h-full"></div> :
          <></>
        }
      </div>

      <Routes>
        <Route path="login/google/*" element={<ConfirmLogin />} />
        <Route path="login" element={<Login />} />
        <Route path="agency-profile" element={<AgencyProfile />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </LoaderContext.Provider>


  );
}

export default App;
