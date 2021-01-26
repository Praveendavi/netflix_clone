import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    let history = useHistory()

    const PostData = () =>{
        fetch('/signup',{
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:'#c62828 red darken-3 ' })
            }
            else{
                M.toast({ html: data.message })
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
        <div className="signup_section">
            <div className="signup_wrapper">
                <div className="menu">
                    <div className="left_menu">
                        <div className="headers">
                            <h4>Signup</h4>
                            <p>Signup to continue our application</p>
                        </div>
                        <div className="left_menu_body">
                            <input type="text" placeholder="Plase enter your name" value={name} onChange={(e) =>setName(e.target.value) } />
                            <input type="email" placeholder="Plase enter email address" value={email} onChange={(e) =>setEmail(e.target.value) } />
                            <input type="password" placeholder=" Plase enter Password" value={password} onChange={(e) =>setPassword(e.target.value) } />
                            <button className="signup_btn" onClick={() => PostData()} >Signup</button>
                            <div className="link">
                               <p>Already have a account <Link className="links" to="/signin"  >Signin</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="right_menu">
                        <div className="overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
