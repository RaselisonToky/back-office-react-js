import React, { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import styles from "./page.module.css"
import axios from 'axios';
import Table from "../../../components/Table";


function ListeCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    axios.get(`http://${ process.env.REACT_APP_API }/api/v1/categories`, axiosConfig)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Erreur lors de la récupération des bouquets', error));
  }, []);

  const columns = ['id_Category', 'Category']; 

  const data = categories.map(item => ({
    id_category: item.id_category,
    category: item.category,
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

export default ListeCategories;
