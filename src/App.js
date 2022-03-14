
import { BrowserRouter , Route, Switch } from "react-router-dom";
 import SearchPage from './components1/SearchPage'


function App() {
  return (
    <>
    <BrowserRouter>
   <Switch>

   <Route path="/" component={SearchPage} /> 
</Switch>
</BrowserRouter>
   </>
  );
}

export default App;
