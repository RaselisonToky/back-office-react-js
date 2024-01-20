import React, { useEffect, useState } from 'react';
import Header from "../../../components/Header";
import styles from "./page.module.css"
import axios from 'axios';
import Table from "../../../components/Table";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ListeModel() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel]=useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    axios.get(`${ process.env.REACT_APP_API }/api/v1/models`, axiosConfig)
      .then(response => setModels(response.data))
      .catch(error => console.error('Erreur lors de la récupération des bouquets', error));
  }, []);

  const handleSelectedModel = (selectedModel) =>{
    setSelectedModel(selectedModel);
  }

   const handleEdit = () => {
    console.log("Modifier la marque :", selectedModel);
  };

  const handleDelete = () => {
    const { id_model } = selectedModel;
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

    axios.delete(`${process.env.REACT_APP_API}/api/v1/models/delete?id_model=${id_model}`, axiosConfig)
      .then(response => {
        toast.success("Suppression Effectué")
        setModels(prevBrands => prevBrands.filter(models => models.id_model !== id_model));
      })
      .catch(error => {
        toast.error("Suppression Echoué")
      });
  };

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
          <div><Table columns={columns} data={data} onRowClick={handleSelectedModel} /></div>
          {selectedModel && (
            <div className={styles.cm}>
              <div>Options pour {selectedModel.model} :</div>
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

export default ListeModel;
