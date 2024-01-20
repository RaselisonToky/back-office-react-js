import React, { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import styles from "./page.module.css"
import axios from 'axios';
import Table from "../../../components/Table";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListeCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories]= useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    axios.get(`${ process.env.REACT_APP_API }/api/v1/categories`, axiosConfig)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Erreur lors de la récupération des bouquets', error));
  }, []);

  const handleRowClick = (selectedData) => {
    setSelectedCategories(selectedData);
  };

  const handleEdit = () => {
    console.log("Modifier la marque :", selectedCategories);
  };

  const handleDelete = () => {
    const { id_category } = selectedCategories;
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token non disponible. Impossible de supprimer la marque.");
      return;
    }
    const axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    axios.delete(`${ process.env.REACT_APP_API }/api/v1/categories/delete?id_category=${id_category}`, axiosConfig)
      .then(response => {
        toast.success("Suppression Effectué")
        setCategories(prevBrands => prevBrands.filter(categories => categories.id_category !== id_category));
      })
      .catch(error => {
        toast.error("Suppression Echoué")
      });
  };




  const columns = ['id_Category', 'Category']; 

  const data = categories.map(item => ({
    id_category: item.id_category,
    category: item.category,
  }));

  return (
      <div>
          <Header />
        <div className={styles.container}>
          <div>
            <Table columns={columns} data={data}  onRowClick={handleRowClick} />
          </div>
          <div>
            {selectedCategories && (
              <div className={styles.cm}>
                <div>Options pour {selectedCategories.category} :</div>
                  <div className={styles.cmo}>
                    <button onClick={handleEdit}>Modifier</button>
                    <button onClick={handleDelete}>Supprimer</button>
                </div>
            </div>
            )}
          </div>

        </div>
        <ToastContainer/>
      </div>

  );
}

export default ListeCategories;
