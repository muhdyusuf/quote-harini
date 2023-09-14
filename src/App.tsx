import './App.css'

//react router
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import { AuthProvider } from './Context/authContext'
import Guest from './Layout/Guest'
import QuoteHarini from './Pages/QuoteHarini'
import AddQuote from './Pages/AddQuote'
import Login from './Pages/Login'
import Authenticated from './Layout/Authenticated'
import UnAuthenticated from './Layout/UnAunthenticated'
import { Toaster } from './components/ui/toaster'

function App() {


  return (
    <AuthProvider>

    <Router>
      <Routes>
        
        <Route element={<Guest/>}>
          <Route path='/' element={<QuoteHarini/>}/>
        </Route>

        <Route element={<UnAuthenticated/>}>
          <Route path='/login' element={<Login/>}/>
        </Route>

        <Route element={<Authenticated/>}>  
          <Route path='/addQuote' element={<AddQuote/>}/>
        </Route>

        



      </Routes>
    </Router>
    <Toaster/>
    </AuthProvider>
  )
}

export default App
