<template>
    <div class="chart-container">
        <h3 class="chart-title">Gráfico do Facebook</h3>
        <canvas ref="barChart" class="bar-chart"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { useToast } from 'vue-toastification';
import { listarFacebook } from '../../services/facebookService';

Chart.register(...registerables);

export default {
    props: {
        chartData: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            chartInstance: null, // Armazenar a instância do gráfico
        };
    },
    mounted() {
        this.createChart();
        window.addEventListener('resize', this.createChart); // Adicionando evento para redimensionar
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.createChart); // Removendo o evento ao destruir o componente
        if (this.chartInstance) {
            this.chartInstance.destroy(); // Destruir a instância do gráfico ao destruir o componente
        }
    },
    watch: {
        chartData: {
            handler() {
                this.createChart(); // Atualiza o gráfico quando os dados mudam
            },
            deep: true,
        },
    },
    methods: {
        createChart() {
            const ctx = this.$refs.barChart.getContext("2d");
            if (this.chartInstance) {
                this.chartInstance.destroy(); // Destruir o gráfico existente antes de criar um novo
            }
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpar o canvas antes de desenhar
            const labels = this.chartData.map((item) =>
                new Date(item.createdAt).toLocaleDateString('pt-BR') // Formatação para o padrão brasileiro
            );
            const investimentos = this.chartData.map((item) => item.investimento || 0);
            const leads = this.chartData.map((item) => item.leads || 0);
            const custoPorLead = this.chartData.map((item) => item.custoPorLead || 0);
            const impressao = this.chartData.map((item) => item.impressao || 0);

            this.chartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Investimento",
                            data: investimentos,
                            backgroundColor: "rgba(54, 162, 235, 0.8)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 2,
                            borderRadius: 5,
                        },
                        {
                            label: "Leads",
                            data: leads,
                            backgroundColor: "rgba(255, 99, 132, 0.8)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 2,
                            borderRadius: 5,
                        },
                        {
                            label: "Custo por Lead",
                            data: custoPorLead,
                            backgroundColor: "rgba(255, 206, 86, 0.8)",
                            borderColor: "rgba(255, 206, 86, 1)",
                            borderWidth: 2,
                            borderRadius: 5,
                        },
                        {
                            label: "Impressões",
                            data: impressao,
                            backgroundColor: "rgba(255, 206, 86, 0.8)",
                            borderColor: "rgba(255, 206, 86, 1)",
                            borderWidth: 2,
                            borderRadius: 5,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Valores',
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                },
                                color: '#ffffff',
                            },
                            grid: {
                                color: 'rgba(50, 50, 50, 10)',
                            },
                        },
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                boxWidth: 20,
                                padding: 15,
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                },
                                color: '#ffffff',
                            },
                        },
                    },
                },
            });
        },
    },
};
</script>

<style scoped>
.chart-container {
    position: relative;
    width: 100%;
    height: 400px; /* Altura do gráfico */
    margin: 20px 0;
    background-color: var(--binance-black1);
    border-radius: 10px;
    padding: 20px;
}

.chart-title {
    text-align: center;
    font-size: 1.5rem;
    color: var(--binance-white);
    margin-bottom: 15px;
}

.bar-chart {
    width: 100% !important; /* Garantir que o gráfico ocupe 100% da largura */
    height: 100% !important; /* Garantir que o gráfico ocupe 100% da altura */
}
</style>
