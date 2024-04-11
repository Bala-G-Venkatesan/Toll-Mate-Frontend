import './App.css';
import {Routes,Route} from 'react-router-dom'
import AdminActions from './components/AdminActions';
import Home from './pages/Home';

function App() {
  return (
    <div className="App bg-gray-500 min-h-screen overflow-x-hidden">
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/admin' element={<AdminActions/>}/>
       </Routes>
    </div>
  )
}



export default App;
