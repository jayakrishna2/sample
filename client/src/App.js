import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Home from './components/layout/Home'
import ContactList from './components/contacts/List'
import ContactHome from './components/layout/Home'
import ContactNew from './components/contacts/New'
import ContactShow from './components/contacts/Show'
import ContactEdit from './components/contacts/Edit'

import UserRegister from './components/authentication/Register'
import UserLogin from './components/authentication/Login'
import axios from '../../config1/axios';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            isAuthenticated: !!localStorage.getItem('token'),
        }
        this.handleIsAuthenticated = this.handleIsAuthenticated.bind(this)
    }
    handleIsAuthenticated(bool) {
        this.setState(() => ({
          isAuthenticated: bool
        }))
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <h2>Welcome to contact manager</h2>
                    
                        <Link to="/">Home</Link>
                        <Link to="/contacts">Contacts</Link>

                        {
                            this.state.isAuthenticated && <Link to="/users/logout">logout</Link>
                        }
                        {
                           !this.state.isAutheticated && (
                            <div>   
                             <Link to="/users/register">Register</Link>
                             <Link to="users/login">Login</Link>
                            </div>
                           ) 
                        }

                    <Switch>
                        <Route path="/" component={Home} exact={true} component={ContactHome} />
                        <Route path="/contacts" exact={true} component={ContactList} />
                        <Route path="/contacts/new" exact={true} component={ContactNew} />
                        <Route path="/contacts/:id" exact={true} component={ContactShow} />
                        <Route path="/contacts/edit/:id" component={ContactEdit} />

                        <Route path="/notes" exact={true} component={NoteList} />
                        <Route path="/notes/new" exact={true} component={NoteNew} />
                        <Route path="/users/logout" component={()=>{
                            localStorage.clear()
                            axios.defaults.headers['x-auth'] = null
                            return(
                                <div>
                                    <p>You have succssfully logged out</p>
                                </div>
                            )

                        }}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App