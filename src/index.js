import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  
} from "react-router-dom";
import './index.css';
// import App from './App'
import Login from './pages/Component/login';
import ShowTable from './pages/Component/showTable';
import reportWebVitals from './reportWebVitals';
import ViewTransaction from './pages/Component/transaction';
import UpdateTransaction from './pages/Component/update';
import Registration from './pages/Component/registration';
import FinanceTracker from './pages/user';
import Error from './pages/Component/Error';
import { FormValuesContext } from './pages/Contexts/formValuesContext';



const Protected = props => {
  const login = JSON.parse(localStorage.getItem("login"));
  const { isPublic, cmp } = props;
  if (isPublic) {
    if (!login) {
      return cmp;
    } else {
      return <Navigate to="/showTable" />
    }
  } else {
    if (login) {
      return cmp;
    } else {
      return <Navigate to="/login" />

    }
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='login' element={<Protected isPublic cmp={<Login/>} />} />
      <Route path='registration' element={<Protected isPublic cmp={<Registration/>} />} />
      <Route path='showTable'>
        <Route path='' element={<Protected cmp={<ShowTable />} />} />
        <Route path=':id' element={<Protected cmp={<ViewTransaction />} />} />
         <Route path='create' element={<Protected cmp={<FinanceTracker />} />} />
        <Route path='update/:id' element={<Protected cmp={<UpdateTransaction />} />} /> 
      </Route>
      <Route path='' element={<Navigate to={'/showTable'} />} />
      <Route path='*'element={<Protected cmp={<Error />} />}/>
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<FormValuesContext>
  <RouterProvider router={router} />
</FormValuesContext>
);
reportWebVitals();
