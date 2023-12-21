import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
//pages
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App">
       <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Navbar/>
        <div className ="pages">
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
          </Routes>
          <Routes>
            <Route
              path="/login"
              element={<Signin/>}
            />
          </Routes>
          <Routes>
            <Route
              path="/signup"
              element={<Signup/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
