import React, { useState} from 'react';
import styles from "./page.module.css"
import Input from '../../components/Input'
import Bouton from "../../components/Bouton"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin');
  


  const click = async () => {
    try {
      const response = await axios.post(`http://${ process.env.REACT_APP_API }/api/v1/auth/login`, {
        email: email,
        password: password
      });
  
      if (response.status === 200) {
        const token = response.data.token;  
        localStorage.setItem('token', token);
        navigate('/ajoutCategorie');

      } else {
        console.error('Erreur lors de la création de nouvelle marque:', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la requête API:', error);
    }
  }




  return (
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
                <Bouton  variant={"contained"} designation={"S'identifier"} onClick={click} />
              </div>
        </div>

      </div>

    </div>

  );
}

export default Login;
