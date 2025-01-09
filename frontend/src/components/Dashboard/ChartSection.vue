<template>
    <div class="chart-section">
      <h2 class="chart-title">{{ title }}</h2>
      <canvas ref="chartCanvas" class="chart-canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  // Registrando os componentes do Chart.js
  Chart.register(...registerables);
  
  export default {
    name: "ChartSection",
    props: {
      title: {
        type: String,
        required: true,
      },
      chartData: {
        type: Object,
        required: true,
      },
      chartComponent: {
        type: String,
        default: "line",
      },
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.chartCanvas.getContext("2d");
        new Chart(ctx, {
          type: this.chartComponent,
          data: this.chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "#fff" },
              },
              x: {
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "#fff" },
              },
            },
            plugins: {
              legend: {
                labels: { color: "#fff" },
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                titleColor: "#fff",
                bodyColor: "#fff",
              },
            },
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .chart-section {
    position: relative;
    width: 48%;
    margin-top: 20px;
    margin-bottom: 40px;
    height: 400px;
    background-color: #1e1e1e;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }
  
  .chart-title {
    color: #fff;
    margin-bottom: 10px;
  }
  
  .chart-canvas {
    width: 100% !important;
    height: 100% !important;
  }
  </style>
  