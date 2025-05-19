import { useState } from 'react';
import '../Login/Login.css';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Shared/AuthContext';
import { UseHelpers } from '../../Shared/UseReducer';
import Cookies from 'js-cookie';

function Login() {
// reference -------------------------------------------------------
    const { setRole }    = UseHelpers();
    const { setFullName} = UseHelpers();
    // const {login} = useAuth();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        idEmployee: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
//function -------------------------------------------------------

    const HandleInputChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const validateInput = (fieldName, value)=>{
        const newErrors = { ...errors };
        if (fieldName === "Email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            newErrors[fieldName] = !emailPattern.test(value) ? "Invalid email format" : '';
        }
        if (fieldName === "Password") {
            if (value.trim() === '') {
                newErrors[fieldName] = 'Password is required';
            } else if (value.length < 8) {
                newErrors[fieldName] = 'Password Must be at least 8 characters';
            } else {
                newErrors[fieldName] = '';
            }

        }
    setErrors(newErrors)
}

const HandleSubmit = async(e) => {
    e.preventDefault();
    if (formData.idEmployee === '' || formData.password === ''){
        Swal.fire({
            icon: "error",
            title: 'Id Employee and password required',
            showConfirmButton: false,
            timer: 2000
        });
    }else{
        const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
        });
        const responseData = await response.json();
        console.log("data",responseData);
        
 
        if (response.ok || response!== 200 && responseData.data){
            // login("123456");
            console.log("success",responseData);
            const token = responseData.token;
            Cookies.set("access_token", token, { 
                expires: 1,
                secure: false, // set true nếu dùng HTTPS
                sameSite: "Lax", // hoặc "Strict"
                path: "/",
             });
            navigate("/superadmin");
            let tempIdRole = null;
            tempIdRole = responseData.data.idRole;
            setFullName(responseData.data.fullName);
            console.log("id",tempIdRole);
            Swal.fire({
                icon: "success",
                title: "Login successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            const responseRole = await fetch(`http://127.0.0.1:8000/api/role/getRoleByIdRole/${tempIdRole}`,
                {credentials: 'include'},
            );
            const roleData = await responseRole.json();
            console.log("responseRole",responseRole);
            console.log("responsedata",roleData);
            if(responseRole.ok && roleData){
                setRole(roleData.data);
            }else{
                console.log('error');
            }
        } else {
            navigate("/login");
            Swal.fire({
                icon: "error",
                title: "Login failed",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
}
// -------------------------------------------------------------------------------------
    return (
         <div className="middle-box text-center loginscreen animated fadeInDown ">
            <div>
            <div>

                <h1 className="logo-name">IN+</h1>

            </div>
            <h3>Welcome to KyosChain</h3>
            <p>A food supplier with a history of more than 20 years, our motto is always a priority: Safety, cleanliness, quality and speed
            </p>
            <p>Login in. To see it in action.</p>
            <form onSubmit={HandleSubmit} className="m-t" role="form" action="index.html">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="idEmployee" name='idEmployee'
                    value={formData.idEmployee} onChange={HandleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" name='password'
                    value={formData.password} onChange={HandleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary block full-width m-b">Login</button>

                <a href="#"><small>Forgot password?</small></a>
                <p className="text-muted text-center"><small>Account creation is only available with higher admin permissions</small></p>
                {/* <a className="btn btn-sm btn-white btn-block" href="register.html">Create an account</a> */}
            </form>
        </div>
    </div>


    )
}

export default Login;