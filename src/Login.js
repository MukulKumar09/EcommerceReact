import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login(props) {

        const [errormsg,setError] = useState("");
    function submitForm(e) {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;
        const postData = { username, password };
        fetch('https://localhost:7293/User/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        }
        ).then(res => { return res.json() }).then(data => {
            //console.log(data);
            if (data.user_type == 100) {
                setError("Invalid Credentials!");
            } else {
                setError("Signing you in...");
                localStorage.setItem('UserID', data.userId);
                localStorage.setItem('UserName', data.userName);
                localStorage.setItem('User_type', data.user_type);
                window.location.reload(true);
            }
        })
    }
    return (
        <div className="container">
            <div className="row ml-auto me-auto" style={{marginTop:'300px'}}>
                <div className="col d-flex align-items-center border-end">
                    <img src="logo.png" height="150px" className="m-auto" />
                </div>
                <div className="col text-center">
                    <h3>Login</h3>
                    <form onSubmit={submitForm} className="m-auto mt-5 w-50">
                        {errormsg !="" ?<div className="alert alert-warning">{errormsg }</div>:"" }
                        <input type="text" name="username" className="form-control mt-3" placeholder="Username" />
                        <input type="password" name="password" className="form-control mt-3" placeholder="Password" />
                        <button type="submit" className="btn btn-outline-secondary mt-4">Login</button>
                        {/* <button className="btn btn-secondary mt-4">Register</button>*/}
                        </form>
                </div>
             </div>
            </div>
        );
}
export default Login