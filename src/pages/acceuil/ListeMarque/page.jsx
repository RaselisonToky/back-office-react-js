import React, { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import styles from "./page.module.css"
import axios from 'axios';
import Table from "../../../components/Table";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListeMarque() {
  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

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

  const handleRowClick = (selectedData) => {
    setSelectedBrand(selectedData);
  };

  const handleEdit = () => {
    console.log("Modifier la marque :", selectedBrand);
  };

  const handleDelete = () => {
    const { id_brand } = selectedBrand;
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

    axios.delete(`http://${process.env.REACT_APP_API}/api/v1/brand/delete?id_brand=${id_brand}`, axiosConfig)
      .then(response => {
        toast.success("Suppression Effectué")
        window.location.reload();

      })
      .catch(error => {
        toast.error("Suppression Echoué")
      });
  };


  const columns = ['id_brand', 'Brand']; 

  const data = brand.map(item => ({
    id_brand: item.id_brand,
    brand: item.brand,
  }));

  return (
      <div>
          <Header />
        <div className={styles.container}>
          <div>
            <Table columns={columns} data={data} onRowClick={handleRowClick} />
          </div>
          {selectedBrand && (
          <div className={styles.cm}>
            <div>Options pour {selectedBrand.brand} :</div>
              <div className={styles.cmo}>
                <button onClick={handleEdit}>Modifier</button>
                <button onClick={handleDelete}>Supprimer</button>
            </div>
          </div>
        )}
        </div>
        <ToastContainer/>
      </div>

  );
}

export default ListeMarque;
