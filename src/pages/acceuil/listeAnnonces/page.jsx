import React, { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import Annonce from "../../../components/Annonces"
import styles from "./page.module.css"
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { padding } from '@mui/system';


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

      const handleDelete = (annonceId) => {

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
  

        const [page, setPage] = useState(1);
        const annoncesPerPage = 5;

        const handleChangePage = (event, value) => {
            setPage(value);
        };

        const startIndex = (page - 1) * annoncesPerPage;
        const endIndex = startIndex + annoncesPerPage;
        const displayedAnnonces = annonces.slice(startIndex, endIndex);
    

  return (
    <div>
    <Header />
    <div className={styles.container}>
      {displayedAnnonces.map((annonce, index) => (
        <Annonce key={index} annonce={annonce} onDelete={handleDelete} onValidation={handleValidation} />
      ))}
       <Pagination
        count={Math.ceil(annonces.length / annoncesPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ marginTop: 2, alignSelf: 'center' }}
      />
    </div>
     
  </div>

  );
}

export default ListeAnnonce;
