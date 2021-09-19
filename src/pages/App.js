import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {Profile, SignIn, Snippet,ProtectedRoute,AddCode,Home} from './'
import Header from '../utility/Header';
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/signin" component={SignIn}/>
        <ProtectedRoute exact path="/profile" component={Profile}/>
        <ProtectedRoute exact path="/snippet" component={Snippet}/>
        <ProtectedRoute exact path="/addcode" component={AddCode}/>
        <Route exact path="/" component={Home} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
