

import Dashboard from './pages/dashboard/Dashboard';
import Invoice from './pages/invoice/Invoice';
import Login from './pages/login/Login';
import Singup from './pages/singup/Singup';
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import {useContext} from "react"
import {Context} from "./context/Context"

function App() {
  const { user } = useContext(Context);
  return (
    
    <div className="App">
   {/*<Login/>
   <Singup/>
      <Dashboard/>*/}

      <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />

        <Route
          exact
          path="/Singup"
          element={<Singup />}
        />
         <Route
          exact
          path="/Dashboard"
          element={user? <Dashboard /> : <Login/>}
        />
         <Route
          exact
          path="/Invoice"
          element={user ? <Invoice /> : <Login/>}
        />

      
   
      </Routes>
  

    </Router>
      

    </div>
    
  );
}

export default App;
