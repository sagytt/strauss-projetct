import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from "../core/Layout";
import {signin, authenticate} from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const {email, password, loading, error, redirectToReferrer} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email, password})
            .then(data => {
                //If there is some error
                if (data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                    authenticate(data, ()=>{
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                    });
                }
            });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    // /*method to show error output*/
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    // /*method to show success output*/
    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    );

    const redirectUser = ()=>{
        if(redirectToReferrer){
            return <Redirect to="/"/>
        }
    };

    return (
        <Layout title="SignIn" description="Please sign in"
                className="container col-md-6 offset-md-3">
            {/*method to show success output*/}
            {showLoading()}
            {/*method to show error output*/}
            {showError()}
            {/*The form in html*/}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;