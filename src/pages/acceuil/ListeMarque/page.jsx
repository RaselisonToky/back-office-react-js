import React, { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import styles from "./page.module.css"
import axios from 'axios';
import Table from "../../../components/Table";


function ListeMarque() {
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    axios.get(`http://${ process.env.REACT_APP_API }/api/v1/brand`, axiosConfig)
      .then(response => setBrand(response.data))
      .catch(error => console.error('Erreur lors de la récupération des bouquets', error));
  }, []);

  const columns = ['id_brand', 'Brand']; 

  const data = brand.map(item => ({
    id_brand: item.id_brand,
    brand: item.brand,
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

export default ListeMarque;
