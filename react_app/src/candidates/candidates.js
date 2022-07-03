import React from 'react';
import {Link} from 'react-router-dom'

const Candidates = ({candidates}) => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">All Candidates</h3>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Avatar</th>
                </tr>
                </thead>
                <tbody>
                {candidates.map((candidate, i) => (
                    <tr key={i}>
                        <th scope="row">{candidate.id}</th>
                        <td>{candidate.first_name + ' ' + candidate.last_name}</td>
                        <td>{candidate.job_title}</td>
                        <td><img className="col-md-4" src={candidate.avatar} alt="avatar"/></td>
                        <td>
                            <Link to={`/candidate/${candidate.id}`}>
                                <button className="btn btn-primary">Full details</button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default Candidates;