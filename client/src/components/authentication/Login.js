import React from 'react'
import axios from 'axios'
import {Redirect} from  'react-router-dom'
class UserLogin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            notice: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('https://localhost:3005/users/login',formData)
            
                
                    .then(response => {
                        axios.defaults.headers['x-auth'] = response.data.token
                        localStorage.setItem('token',response.data.token)
                        this.props.handleIsAuthenticated(true)
                        this.setState(() => ({redirect:true}))
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState(()=> ({
                            notice: err.response.data.notice
                        }))
                    })
            
    }

    handleChange(e){
        e.persist()
       this.setState(() => ({
              [e.target.name]: e.target.value
        }))
    }     

    render(){
        if(this.state.redirect){
            return <Redirect to ="/contact"/>
        }
        return (
            <div>
                <h2>Login</h2>
        {this.state.notice && <p>{this.state.notice}</p> }
        <form onSubmit={this.handleSubmit}>
        <label>
            email
            <input type="text" value={this.state.email} onChange={this.handleChange} name="username"/>
        </label>
        <label>
            password
            <input/>
        </label>

        </form>
            </div>
        )
    }


}
