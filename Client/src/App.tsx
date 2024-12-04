
import './App.css'
import MetamaskConn from './Components/metamaskConn'
import { useEthereum } from './Contexts/contractContext'

function App() {
  const { account } = useEthereum();
  return (
    <>
      {
        account == null ? <MetamaskConn />
          : (         
            <p className='text-5xl'>Hello World</p>
          )
      }
      
      
    </>
  )
}

export default App
