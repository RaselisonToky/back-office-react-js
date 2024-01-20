import React, { useState, useEffect } from 'react';
import GraphComponent from '../../components/evolutionAnnonces';
import axios from 'axios';
import styles from './page.module.css'
import Header from '../../components/Header'
const App = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    axios.get(`${ process.env.REACT_APP_API }/api/v1/annonce-par-mois`, axiosConfig)
      .then(response =>  setApiData(response.data))
      .catch(error => console.error('Erreur lors de la récupération des bouquets', error));
  }, []);


  return (
    <div>
        <Header/>
        <div className={styles.container}>
            <div className={styles.graph}>
                <div><h5>Nombre d'annonces durant le 5 derniers mois</h5></div>
                <GraphComponent data={apiData} />
            </div>
        </div>
     
    </div>
  );
};

export default App;
