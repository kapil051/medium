import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Blog } from './pages/Blog'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'

function App() {
  return (
    <>
       <BrowserRouter>
            <Routes>

                 <Route path='/blog' element={<Blog/>} ></Route>
                 <Route path='/signup' element={<Signup/>} ></Route>
                 <Route path='/signin' element={<Signin/>} ></Route>

            </Routes>
       </BrowserRouter>     
    </>
  )
}

export default App
