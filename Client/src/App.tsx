
import { Route, Routes } from 'react-router-dom';
import './App.css'
import MetamaskConn from './Components/metamaskConn'
import NavBar from './Components/NavBar';
import { useEthereum } from './Contexts/contractContext'
import CreateListing from './pages/listing/CreateListing';
import Home from './pages/home';
import MyProfile from './pages/myProfile';
import CheckOut from './pages/myProfile/CheckOut';

function App() {
  const { account } = useEthereum();
  return (
    <>
      {
        account == null ? <MetamaskConn />
          : (<>         
            <NavBar/>
            <Routes>
              <Route path='/' element={ <Home/> } />
              <Route path='/Listing' element={<CreateListing/> } />
              <Route path='/myProfile' element={<MyProfile/> } />
              <Route path='/myProfile/:id' element={<CheckOut/> } />
            </Routes>
            </>
          )
      }
      
      
    </>
  )
}

export default App
