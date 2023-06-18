import { Link, json } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import swal from "sweetalert";
let SignUp = () => {
  let [name,setName]=useState("");
  let [email,setEmail]=useState("");
  let [isChecked,setIsChecked]=useState(false);
  let {setSignupShow,setLoginShow,setLinksShow,signupShow,logniShow,linksShow,signupEmail,setSignupEmail,signupName,setSignupName}=useContext(AuthContext);
  let closeSignup=()=>{
    setSignupShow(false);
    setLinksShow(true);
  };
  let loginShowAndSignupClose=()=>{
    setSignupShow(false);
    setLoginShow(true);
    setLinksShow(false);
  };
  let handleCheckboxChange = () => {
    setIsChecked((prevState) => !prevState);
  };
  let handleSignup=(e)=>{
    e.preventDefault();
    if(name.trim().length<3){
      swal("Invalid Name","Enter correct name which have a minimum length of 3 atleast","error");
      return;
    };
    if(email.trim().length<6 || !email.includes("@")){
      swal("Invalid Email","Enter correct email address with a minimum length of 6 and a @ symbol","error");
      return;
    };
    let data={
      name,
      email,
    };
    fetch("https://backend-server-8879b-default-rtdb.firebaseio.com/signup.json",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data),
    })
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      setSignupName(json.name);
      setSignupEmail(json.email);
    })
    .catch((error)=>{
      console.log(error);
    });
    swal("Done","Account Created Successfully","success")
    setLinksShow(false);
    setSignupShow(false);
    setLoginShow(true);
  };
  return (
    <div className={styles.main}>
      <div className={styles.cross}>
      <h1 className={styles.heading}>Sign up</h1>
      <p className={styles.cancel} onClick={closeSignup}>⨯</p>
      </div>
      <form onSubmit={handleSignup}>
        <div>
          <input type="text" placeholder="Full Name" className={styles.name} value={name} onChange={(e)=> setName(e.target.value)}/>
        </div>
        <div>
          <input type="email" placeholder="Email" className={styles.email} value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div className={styles.change}>
          <input className={styles.check} type="checkbox" onChange={handleCheckboxChange}/>
          <p className={styles.para}>
            I agree to QuickBite's Terms of Service , Privacy Policy and Content
            Policies
          </p>
        </div>
        <button className={styles.btn} type="submit" disabled={!isChecked}>
          Create account
        </button>
      </form>
      <hr></hr>
      <h3 className={styles.parah3}>
        Already have an account ? <Link className={styles.link} onClick={loginShowAndSignupClose}>Log in</Link>
      </h3>
    </div>
  );
};
export default SignUp;