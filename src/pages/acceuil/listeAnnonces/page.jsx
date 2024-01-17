import React, { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import Annonce from "../../../components/Annonces"
import styles from "./page.module.css"
import axios from 'axios';

function ListeAnnonce() {
    let [annonces, setAnnonces]= useState([]);
 
    useEffect(() => {
        const token = localStorage.getItem('token');
        const axiosConfig = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
    
        axios.get(`http://${ process.env.REACT_APP_API }/api/v1/announces`, axiosConfig)
          .then(response => setAnnonces(response.data.listAnnounces))
          .catch(error => console.error('Erreur lors de la récupération des bouquets', error));
    
      }, []);


      useEffect (()=>{
        console.log(annonces)
      })
    
      const handleDelete = (annonceId) => {
        // const token = localStorage.getItem('token');
        // const axiosConfig = {
        //     headers: {
        //         'Authorization': 'Bearer ' + token
        //     }
        // };

        // axios.delete(`http://${process.env.REACT_APP_API}/api/v1/announces/${annonceId}`, axiosConfig)
        //     .then(response => {
        //         setAnnonces(prevAnnonces => prevAnnonces.filter(annonce => annonce.id !== annonceId));
        //         console.log('Annonce supprimée avec succès');
        //     })
        //     .catch(error => console.error('Erreur lors de la suppression de l\'annonce', error));
    };

    const handleValidation = (annonceId) => {
      const token = localStorage.getItem('token');
      const axiosConfig = {
          headers: {
              'Authorization': 'Bearer ' + token
          }
      };
  
      axios.get(`http://${process.env.REACT_APP_API}/api/v1/announces/${annonceId}/validate`, axiosConfig)
          .then(response => {
              // Mettez à jour l'état des annonces après la validation
              setAnnonces(prevAnnonces => prevAnnonces.map(annonce => {
                  if (annonce.id === annonceId) {
                      return { ...annonce, status: 10 }; // Supposons que le statut 1 représente "validé"
                  } else {
                      return annonce;
                  }
              }));
              console.log('Annonce validée avec succès');
          })
          .catch(error => console.error('Erreur lors de la validation de l\'annonce', error));
  };
  

    
    

  return (
      <div>
          <Header />
          <div className={styles.container}>
                {annonces.map((annonce, index) => (
                    <Annonce key={index} annonce={annonce} onDelete={handleDelete}  onValidation={handleValidation}/>
                ))}
            </div>
      </div>

  );
}

export default ListeAnnonce;
