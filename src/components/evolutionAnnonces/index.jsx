import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraphComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      // Détruire le graphique existant s'il y en a un
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('myChart').getContext('2d');
      const labels = data.map(entry => entry.moisString);
      const values = data.map(entry => entry.nombreDannonces);

      // Créer un nouveau graphique
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre d\'annonces',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              step:10,
              suggestedMax: Math.max(...values) + 3, // Ajouter une marge de 5 à l'axe y
              ticks: {
                stepSize: 1, // Définir l'intervalle entre chaque étape sur l'axe y
              },
            }
          }
        }
      });
    }
  }, [data]);

  return (
    <div>
      <canvas id="myChart" width="10" height="10"></canvas>
    </div>
  );
};

export default GraphComponent;
