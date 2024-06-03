import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserForm from './UserForm';
import UserList from './UsersList';
import UpdateForm from './UpdateForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserForm />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<UpdateForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
