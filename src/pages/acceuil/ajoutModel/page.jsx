import React, { useState,useEffect} from 'react';
import Header from "../../../components/Header";
import styles from "./page.module.css"
import Input from '../../../components/Input'
import MySelectComponent from '../../../components/Select'
import Bouton from "../../../components/Bouton"
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function AjoutModel() {
  const [brands,setBrands]=useState([]);
  const [model, setModel]=useState('');
  const [categories, setCategories]= useState([]);

  const [selectedBrand, setSelctedBrand]= useState(null);
  const [selectedCategorie, setSelectedCategorie]= useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token manquant. Assurez-vous de vous connecter avant de faire cette requête.');
        return;
      }
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    };
  
    axios.get(`http://${ process.env.REACT_APP_API }/api/v1/brand`, axiosConfig)
      .then(response => setBrands(response.data))
      .catch(error => console.error('Erreur lors de la récupération des bouquets', error));
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token manquant. Assurez-vous de vous connecter avant de faire cette requête.');
        return;
      }
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    };
  
    axios.get(`http://${ process.env.REACT_APP_API }/api/v1/categories`, axiosConfig)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Erreur lors de la récupération des bouquets', error));
  }, []);
  
  


  const handleBrandChange = (selectedBrand) => {
    setSelctedBrand(selectedBrand);
  }

  const handleCategoryChange = (selectedCategorie) => {
    setSelectedCategorie(selectedCategorie);
  }



  const click = async () => {

    try {
      const token = localStorage.getItem('token');
    
      if (!token) {
        console.error('Token manquant. Assurez-vous de vous connecter avant de faire cette requête.');
        return;
      }
      
       await axios.post(`http://${ process.env.REACT_APP_API }/api/v1/models`, {
        brand: selectedBrand.value,
        model: model,
        category: selectedCategorie.value
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
            Ajouter un modele
          </div>
          <div className={styles.input}>
                        <MySelectComponent
                            label="Marque"
                            width="300px"
                            options={brands.map(brand => ({
                            value: brand,
                            label: brand.brand,
                            test: brand.id_brand
                            }))}
                            onChange={handleBrandChange}
                            selectedValue={selectedBrand}
                         />
            </div>
            <div className={styles.input}>
                        <MySelectComponent
                            label="Categorie"
                            width="300px"
                            options={categories.map(category => ({
                            value: category,
                            label: category.category,
                            test: category.id_category
                            }))}
                            onChange={handleCategoryChange}
                            selectedValue={selectedCategorie}
                         />
            </div>
          <div className={styles.input}>
            <Input label={"Entrez uu nouveau model"} type={"text"} variant={"outlined"} width={"300px"} onChange={(e) => setModel(e.target.value)}/>
          </div>
          <div className={styles.bouton}>
            <Bouton  variant={"contained"} designation={"Ajouter une nouvelle marque"} onClick={click} />
          </div>
      </div>
    <ToastContainer/>
    </div>

  );
}

export default AjoutModel;
