import React, { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import styles from "./page.module.css"
import axios from 'axios';
import Table from "../../../components/Table";


function ListeModel() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    axios.get(`http://${ process.env.REACT_APP_API }/api/v1/models`, axiosConfig)
      .then(response => setModels(response.data))
      .catch(error => console.error('Erreur lors de la récupération des bouquets', error));
  }, []);

  const columns = ['id_model', 'Brand','Category','Model']; 

  const data = models.map(item => ({
    id_model: item.id_model,
    brand: item.brand.brand,
    category: item.category.category,
    model: item.model
  }));

  return (
      <div>
          <Header />
        <div className={styles.container}>
        <Table columns={columns} data={data} />
        </div>
      </div>

  );
}

export default ListeModel;
