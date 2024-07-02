import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Pages/Header/Header';
import Dashboard from './Pages/Dashboard/Dashboard';
import NoMatch from './Pages/NoMatch/NoMatch';
import AddStudent from './Pages/Student/AddStudent';
import EditStudent from './Pages/Student/EditStudent';

function App() {
  return (
    <>
      <Header/>
      <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/student' element={<AddStudent/>} />
      <Route path='/student/:id' element={<EditStudent/>} />
      <Route path='*' element={<NoMatch/>} />
      </Routes>
    </>
  );
}

export default App;
