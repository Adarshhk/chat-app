import './App.css'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import {Routes , Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext.jsx';

function App() {

  const {authUser} = useAuthContext();

  return (
    <div className='p-4  h-screen flex item-center justify-center'>
      <Toaster/>
      <Routes>
        <Route path='/' element={!authUser ? <Navigate to='/login'/> : <Home/> }/>
        <Route path='/login' element={authUser ? <Navigate to='/'/> : <Login/>}/>
        <Route path='/signup' element={authUser ? <Navigate to='/'/> : <SignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
