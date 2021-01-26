import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    let history = useHistory()

    const PostData = () =>{
        fetch('/signin',{
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:'#c62828 red darken-3 ' })
            }
            else{
                localStorage.setItem('signin', data)
                M.toast({ html: data.message })
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
        <div className="signup_section">
            <div className="signup_wrapper">
                <div className="menu">
                <div className="right_menu">
                        <div className="overlay"></div>
                    </div>
                    <div className="left_menu">
                        <div className="headers">
                            <h4>Signin</h4>
                            <p>Signin to continue our application</p>
                        </div>
                        <div className="left_menu_body">
                            <input type="email" placeholder="Plase enter email address" value={email} onChange={(e) =>setEmail(e.target.value) } />
                            <input type="password" placeholder=" Plase enter Password" value={password} onChange={(e) =>setPassword(e.target.value) } />
                            <button className="signup_btn" onClick={() => PostData()} >Signin</button>
                            <div className="link">
                                <p>Don't have a account<Link className="links" to="/signup"  >Signup</Link></p>
                            </div>
                        </div>
                    </div>
     
                </div>
            </div>
        </div>
    )
}

export default Signup
