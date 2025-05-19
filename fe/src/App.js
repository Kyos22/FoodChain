// import logo from './logo.svg';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login      from './components/Login/Login.jsx';
import Layout     from './components/Layout/Layout_Spm.jsx';
import Superadmin from './components/Superadmin/Superadmin.jsx';
import { AuthProvider } from './Shared/AuthContext.jsx';
import ProtectedRoute from './Shared/ProtectedRoute.jsx';
import { UseReducer } from './Shared/UseReducer.jsx';
import Accounts_Spm from './components/Superadmin/Accounts/Accounts_Spm.jsx';
import RegisterAccount_Spm from './components/Superadmin/Accounts/RegisterAccount_Spm.jsx';
import EditAccount_Spm from './components/Superadmin/Accounts/EditAccount_Spm.jsx';
import AccountLayout_Spm from './components/Superadmin/Accounts/AccountLayout_Spm.jsx';
import ProductLayout_Spm from './components/Superadmin/Products/ProductLayout_Spm.jsx';
import Product_Spm from './components/Superadmin/Products/Product_Spm.jsx';
import PrivateRoute from './Shared/Services/PrivateRoute.jsx';
function App() {
 

  return (
    <AuthProvider>
      <UseReducer>
        <Router>
            <Routes>
              <Route path="/login" element={<Login/>}></Route>
                
                  <Route path='/superadmin/' element={<PrivateRoute><Layout/></PrivateRoute>}>
                      <Route index element={<Superadmin/>}/>
                      <Route path='accounts/' element={<AccountLayout_Spm/>} >
                           <Route index element={<Accounts_Spm/>}/>
                           <Route path='register' element={<RegisterAccount_Spm/>} />
                           <Route path='edit/:id' element={<EditAccount_Spm/>} /> 
                      </Route>
                      <Route path='products/' element={<ProductLayout_Spm/>}>
                          <Route index element={<Product_Spm/>}/>
                         
                      </Route>
                      <Route path='*' element={<h1>404 Not Found</h1>}>
                     </Route>
                  </Route>
              
            </Routes>
        </Router>
      </UseReducer>
      
    </AuthProvider>
  );
}

export default App;
