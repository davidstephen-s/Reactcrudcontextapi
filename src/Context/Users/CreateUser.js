import React, { useContext, useState } from 'react'
import { useHistory,useParams } from 'react-router'
import generateUniqueId from 'generate-unique-id'

import { UsersContext } from './Users';
import axios from 'axios';

function CreateUser() {
    const [UsersData, setUsersData,BaseURL] = useContext(UsersContext);
    const history = useHistory();

    // For edit Users
    let edituser={}; 
    let editUId =  useParams();
    if(history.location.pathname.includes('editUser')){
        let user = UsersData.filter(data => data.uid === editUId.uid);
        edituser = user[0];
    }

    /* Assigning initial values based on -EDIT or CREATE */

    const [username, setUsername] = useState(edituser.username || '');
    const [email, setEmail] = useState(edituser.email || '');
    const [plan,setPlan] = useState(edituser.subscription || '');
    const [employment,setEmployment] = useState(edituser.employment || '');
    const [address, setAddress] = useState(edituser.address || '');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(history.location.pathname.includes('CreateUser')){
            let createdUsers = await axios.post(`${BaseURL}/users`,{
                uid : generateUniqueId({length:36,includeSymbols: ['-']}),
                username,
                email,
                subscription : plan,
                employment,
                address
            })
            console.log(createdUsers);
            setUsersData([...UsersData,createdUsers.data])
            history.push('/users')
        }
        else{
            let updatedUser = await axios.put(`${BaseURL}/users/${edituser.id}`,{
                uid : editUId.uid,
                username,
                email,
                subscription:plan,
                employment,
                address
            })
            /******* Find index that need to be updated   *******/
            const updatedIndex = UsersData.findIndex(user => user.id === edituser.id) 
            UsersData[updatedIndex] = updatedUser.data;
            setUsersData(UsersData);
            history.push('/users')
        }
    }

    return (
        <div className={`container-fluid`}>
            <div className="card shadow">
                <div className="card-header">
                    <h4 className="float-left text-info">Create User</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">UserName</label>
                            <input type="text" className="form-control" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="plan" className="form-label">Subscription</label>
                            <select className="form-control" value={plan} onChange={(e)=>{setPlan(e.target.value)}} >
                                <option value=""></option>
                                <option value="Bronze">Bronze</option>
                                <option value="Gold">Gold</option>
                                <option value="Starter">Starter</option>
                                <option value="Premium">Premium</option>
                                <option value="Platinum">Platinum</option>
                                <option value="Essential">Essential</option>
                                <option value="Diamond">Diamond</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employment" className="form-label">Employment</label>
                            <input type="text" className="form-control" value={employment} onChange={(e)=>{setEmployment(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
                        </div>
                        <button type="submit" className="btn btn-primary">{history.location.pathname.includes('CreateUser') ? 'Create' : 'Update'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser
