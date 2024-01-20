import React, { useState} from 'react';
import styles from "./page.module.css"
import Input from '../../components/Input'
import Bouton from "../../components/Bouton"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Footer from "../../components/Footer"




function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);



  const click = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${ process.env.REACT_APP_API }/api/v1/auth/login`, {
        email: email,
        password: password
      });
        const token = response.data.token;  
        localStorage.setItem('token', token);
        navigate('/ajoutCategorie');

    } catch (error) {
      console.error('Erreur lors de la requête API:', error);
    }finally {
      setLoading(false);
    }
  }




  return (
    <div className={styles.c}>
        <div className={styles.container}>
          <div className={styles.titre}>
                Connectez-vous à votre <br></br>compte
          </div>
          <div className={styles.inputcontainer}>
              <div className={styles.form}>
                  <div className={styles.input}>
                    <div className={styles.label}>Email</div>
                    <div><Input   value={email} id={"input"} type={"email"} variant={"outlined"} width={"300px"}  onChange={(e) => setEmail(e.target.value)}/></div>
                  </div>
                  <div className={styles.input}>
                    <div className={styles.label}>Password</div>
                    <div><Input value={password} id={"password"} type={"password"} variant={"outlined"} width={"300px"} onChange={(e) => setPassword(e.target.value)}/></div>
                  </div>
                  <div className={styles.bouton}>
                    <Bouton  variant={"contained"} designation={"S'identifier"} onClick={click} disabled={loading} />
                  </div>
                  {loading && (
                    <div className={styles.loading}>
                      <ClipLoader css={css`margin-top: 8px;`} size={20} color={"#0d4f78"} loading={loading} />
                    </div>
                  )}
              </div>
          </div> 
      </div>

      <Footer/>
    </div>
  
        
   

  );
}

export default Login;
