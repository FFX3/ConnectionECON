import React from 'react'
import { SignUp } from './components/SignUp'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//context
import { useAuth } from './contexts/AuthContext'
//components
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { ForgotPassword } from './components/ForgotPassord'

//css
import './App.css'

const App = () => {

  //firebase stuff
  const { currentUser } = useAuth()

  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/">
              {(currentUser !== undefined) ? <Redirect to="/login" /> : <Dashboard />}
            </Route>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
      </Router>
    </div>
  )
}

export default App
