import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile'
import {Toaster} from 'react-hot-toast';
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const App = () => {

  const {authUser} = useContext(AuthContext)

  return (
    <div className="bg-[url('./src/assets/New_3.jpg')] bg-cover bg-center opacity-90">
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to="/login"/>} />
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>} />
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default App