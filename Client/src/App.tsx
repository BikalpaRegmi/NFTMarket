
import { Route, Routes } from 'react-router-dom';
import './App.css'
import MetamaskConn from './Components/metamaskConn'
import NavBar from './Components/NavBar';
import { useEthereum } from './Contexts/contractContext'
import CreateListing from './pages/listing/CreateListing';
import Home from './pages/home';

function App() {
  const { account } = useEthereum();
  return (
    <>
      {
        account == null ? <MetamaskConn />
          : (<>         
            <NavBar/>
            <Routes>
              <Route path='/Home' element={ <Home/> } />
              <Route path='/Listing' element={<CreateListing/> } />
            </Routes>
            </>
          )
      }
      
      
    </>
  )
}

export default App
