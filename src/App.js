import React from 'react'
import { SignUp } from './components/SignUp'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//components
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'

//css
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
      </Router>
    </div>
  )
}

export default App
