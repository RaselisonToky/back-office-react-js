import React, { useState} from 'react';
import Header from "../../../components/Header";
import styles from "./page.module.css"
import Input from '../../../components/Input'
import Bouton from "../../../components/Bouton"
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function AjoutCategorie() {
  const [category,setCategory]=useState('');


  const click = async () => {

    try {
      const token = localStorage.getItem('token');
    
      if (!token) {
        console.error('Token manquant. Assurez-vous de vous connecter avant de faire cette requête.');
        return;
      }
      
       await axios.post('http://localhost:8080/api/v1/categories/save', {
        category
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      });
        toast.success("hihihihih")
 
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Vous n'avez pas les autorisations requises");
      } else {
        console.error('Erreur lors de la requête API:', error);
      }
    }
    
  }


  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className={styles.container}>
          <div className={styles.titre}>
            Ajouter une nouvelle categorie de voiture
          </div>
          <div className={styles.input}>
            <Input label={"Entrez une nouvelle Categorie"} type={"text"} variant={"outlined"} width={"400px"} onChange={(e) => setCategory(e.target.value)}/>
          </div>
          <div className={styles.bouton}>
            <Bouton  variant={"contained"} designation={"Ajouter une nouvelle categorie"} onClick={click} />
          </div>
      </div>
    <ToastContainer/>
    </div>

  );
}

export default AjoutCategorie;
