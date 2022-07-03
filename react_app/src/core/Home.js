import React, {useState, useEffect, Fragment} from 'react';
import Layout from "./Layout";
import {isAuthenticated} from "../auth";
import Candidates from "../candidates/candidates";
import {getCandidates} from './apiCore';

const Home = () => {
    const [candidates, setCandidates] = useState([]);

    const loadCandidates = () => {
        getCandidates().then(data => {
            if (data.error) {
                return data.error;
            } else {
                setCandidates(data);
            }
        });
    };

    useEffect(() => {
        if(isAuthenticated()) {
        loadCandidates();
            }
    }, []);

    return (
        <Layout title="Home Page" description="" className="container">
            {isAuthenticated() && (
                <Fragment>
                    <h2 className="mb-4">New Candidates</h2>
                    <Candidates candidates={candidates}/>
                </Fragment>
            )}
        </Layout>
    )
};

export default Home;