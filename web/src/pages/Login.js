import React, {useState, useEffect, useRef} from "react";
import { useAuth } from "../lib/helper/AuthContext";
import { supabase } from "../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import HALO from "vanta/dist/vanta.halo.min.js";

import '../css/Login.css'

const Login = () => {
    let navigate = useNavigate()
    const { setToken } = useAuth();

    const [formData,setFormData] = useState({email:'',password:''})
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] =  useState(0);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(HALO({
                el: vantaRef.current,
                minHeight: 200,
                minWidth: 200
            }));
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    console.log(formData)

    function handleChange(event){
        setFormData((prevFormData)=>{
            return{
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })
            if (error) throw error
            console.log(data)
            setToken(data)
            navigate('/homepage')

        } catch (error) {
            alert(error)
        }
    }

    return (
        <section ref={vantaRef} style={{ width: "100vw", height: "100vh" }}>
            <h1>S E R E N I T Y</h1>
            <br></br>
            <div className="wrapper">
                <div className="login-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input 
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                required
                            />
                            <input 
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                required
                            />       
                        </div>
                        <br></br>
                        <button type="submit" className="btn" name="submit">
                            Login
                        </button>         
                    </form>
                    <br></br>
                    Dont have an account?<a href="/signup">Sign up here</a>
                </div>
            </div>
        </section>
    )
}

export default Login