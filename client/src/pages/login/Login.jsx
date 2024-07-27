import React  ,{ useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import {useNavigate} from "react-router-dom"


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await newRequest.post("/auth/login", { username, password });
      // localStorage.setItem("currentUser", JSON.stringify(res.data));

      // const res=await axios.post("http://localhost:8800/api/auth/login",{
      //           username,
      //           password,
      //         });
      // console.log(res.data)


      //initializing axios req in utils.. so that we can use it everywhere from there. check newRequest in utils
      
      const res = await newRequest.post( "/auth/login", {username , password});
      // console.log(res.data);
      localStorage.setItem("currentUser" , JSON.stringify(res.data));  //res.data is obj but we canset only string in  
      navigate("/");                                                   //localstorage sowe convert res.data(object) to string
    } 
    catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
