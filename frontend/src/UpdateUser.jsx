import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'


function UpdateUser () {
    const {id} = useParams()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate()
    
    useEffect(() => {
        // Fetch data from the backend service
        axios.get("/api/getUser/"+id)
        .then(response => {
            console.log(response);
            setName(result.data.name)
            setEmail(result.data.email)
            setAge(result.data.age)
        })
        .catch(err => {
            console.error("Error fetching users:", err);
        });
    }, []);

    const Update = (e) => {
        e.preventDefault();
        // Change the URL to the backend container service name defined in docker-compose.yml file
        axios.put("/api/updateUser/"+id, {name, email, age})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control'
                        value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control'
                        value = {email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder='Enter Age' className='form-control'
                        value = {age} onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
            
        </div>
    )
}

export default UpdateUser
