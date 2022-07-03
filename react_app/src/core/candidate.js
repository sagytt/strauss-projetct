import React, {useState, useEffect, Fragment} from 'react';
import Layout from "./Layout";
import {isAuthenticated} from "../auth";
import {getCandidate} from './apiCore';

const Candidate = (props) =>{
    const [candidate, setCandidate] = useState([]);

    const loadCandidate = (userId) => {
        if(isAuthenticated()) {
            getCandidate(userId).then(data => {
                if (data.error) {
                    return data.error;
                } else {
                    setCandidate(data);
                }
            });
        }
    };

    useEffect(() => {
        const userId = props.match.params.userId;
        loadCandidate(userId);
    },[props.match.params.userId]);

    return (
        <Layout title="Candidate" description="Candidate Description" className="container">
            {isAuthenticated() && (
                <Fragment>
                    <h2 className="mb-4">{candidate.first_name + ' ' + candidate.last_name}</h2>
                    <div className="card mb-5">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Job Title</th>
                                <th scope="col">Job Description</th>
                                <th scope="col">Avatar</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{candidate.id}</th>
                                    <td>{candidate.first_name}</td>
                                    <td>{candidate.last_name}</td>
                                    <td>{candidate.email}</td>
                                    <td>{candidate.gender}</td>
                                    <td>{candidate.job_title}</td>
                                    <td>{candidate.job_description}</td>
                                    <td><img className="col-md-8" src={candidate.avatar} alt="avatar"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Fragment>
            )}
        </Layout>
    )
};

export default Candidate;
