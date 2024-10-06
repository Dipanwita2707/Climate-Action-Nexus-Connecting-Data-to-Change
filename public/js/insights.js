// Fetch climate data and render the chart
async function fetchClimateData() {
  try {
    const response = await fetch('/insights/data'); // Endpoint to fetch data
    const data = await response.json();

    const temperatureData = data.temperature; // Temperature data from API
    const precipitationData = data.precipitation; // Precipitation data from API

    // Create the chart
    const ctx = document.getElementById('climateChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(temperatureData), // x-axis labels (dates)
        datasets: [
          {
            label: 'Temperature (°C)',
            data: Object.values(temperatureData), // y-axis data (temperature values)
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
          },
          {
            label: 'Precipitation (mm)',
            data: Object.values(precipitationData), // y-axis data (precipitation values)
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Measurement'
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching climate data:', error);
  }
}

// Call the function on window load
window.onload = fetchClimateData;
