import Form from "./component/Forms";
import {  
  Routes,
  Route,
 
} from "react-router-dom";
function App() {
  return (
    <div>
    <Routes>
    <Route path="/reset-password" element={<Form/>} />

    </Routes>
  </div>
  );
}

export default App;
