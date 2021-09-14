import axios from 'axios';
import React,{useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { UsersContext } from './Users'
function UsersList() {
    const [UsersData, setUsersData,BaseURL] = useContext(UsersContext);
    const history = useHistory();
    
    const deleteUser = async (ID) => {
        await axios.delete(`${BaseURL}/users/${ID}`)
        await axios.get(`${BaseURL}/users`).then(response => setUsersData(response.data));
    }
    return (
        <div className="container-fluid mb-4">
            <div className="news mb-3">
                Users data fetched from API and used UseEffect() and Context API for State Management
            </div>
            <div className="card shadow">
                <div className="card-header">
                    <h4 className="float-left text-info">Users</h4>
                    <Link className="btn btn-info float-right" to='/CreateUser'> Create User </Link>
                </div>
                <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-info table-striped" style={{borderRadius:"10px"}}>
                    <thead style={{color:"rgb(105, 54, 156)"}}>
                        <tr>
                        <th scope="col">UserId</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Plan</th>
                        <th scope="col">Employment</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody  style={{color:"rgba(110, 71, 145, 0.966)"}}>
                        {
                            UsersData.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.subscription}</td>
                                        <td>{user.employment}</td>
                                        <td>{user.address}</td>
                                        <td style={{cursor:"pointer"}}>
                                            <i className="fas fa-user-edit text-primary" onClick={() => history.push(`/editUser/${user.uid}`)}></i>
                                            <i className="fas fa-trash pl-2 text-danger" onClick = {() => deleteUser(user.id)}></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>  
                </div>      
                </div>
            </div>
        </div>
    )
}

export default UsersList