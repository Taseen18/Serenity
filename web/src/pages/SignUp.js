import React, {useState} from "react";
import { supabase } from "../lib/helper/supabaseClient";

const SignUp = () => {

    const [formData,setFormData] = useState({
        first_name:'',last_name:'',email:'',password:''
    })

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
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                    }
                }
            })
            console.log(data)
            if (error) throw error
            alert('Check your email for verification link')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="First Name"
                    name="first_name"
                    onChange={handleChange}
                />
                <input 
                    placeholder="Last Name"
                    name="last_name"
                    onChange={handleChange}
                />
                <input 
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                />
                <input 
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                />       

                <button type="submit">
                    Submit
                </button>         
            </form>
            Already have an account?<a href="/">Login here</a>
        </div>
    )
}

export default SignUp