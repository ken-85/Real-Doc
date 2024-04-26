import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../firebase/firebase";
import "./Login.css";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //   useEffect(() => {
  //     setErrMsg("");
  //   }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await axios.post(
    //     LOGIN_URL,
    //     JSON.stringify({ user, pwd }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(JSON.stringify(response?.data));
    //   //console.log(JSON.stringify(response));
    //   setUser("");
    //   setPwd("");
    //   setSuccess(true);
    // } catch (err) {
    //   if (!err?.response) {
    //     setErrMsg("No Server Response");
    //   } else if (err.response?.status === 400) {
    //     setErrMsg("Missing Username or Password");
    //   } else if (err.response?.status === 401) {
    //     setErrMsg("Unauthorized");
    //   } else {
    //     setErrMsg("Login Failed");
    //   }
    //   errRef.current.focus();
    // }
  };

  return (
    <div className="login__section">
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className="sign__in__button">Sign In</button>
          </form>

          <button
            onClick={(e) => {
              dispatch(signInWithGoogle(dispatch));
            }}
            className="google__signin__button"
          >
            <FcGoogle size={30}/>
            Google
          </button>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
