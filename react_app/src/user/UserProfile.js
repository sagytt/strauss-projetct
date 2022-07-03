import React from 'react';
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";

const Profile = () => {
    const {user : {name, email, role}} = isAuthenticated();

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li>
                </ul>
            </div>
        )
    };

    return (
        <Layout title="Profile" description={`Hello ${name}`} className="container">
          <div className="row">
              <div className="col-9">{userInfo()}</div>
          </div>
        </Layout>
    )
};

export default Profile;