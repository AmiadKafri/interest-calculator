import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const GrowthChart = ({ initialAmount, monthlyDeposit, annualReturn, years }) => {
    const calculateGrowthData = () => {
        const monthlyRate = annualReturn / 100 / 12;
        const totalMonths = years * 12;
        let balance = initialAmount;
        const balances = [balance];
        const deposits = [balance];
        
        for (let i = 1; i <= totalMonths; i++) {
            balance += monthlyDeposit;
            balance *= (1 + monthlyRate);
            
            if (i % 12 === 0) {
                balances.push(Math.round(balance));
                deposits.push(Math.round(initialAmount + (monthlyDeposit * i)));
            }
        }
        
        return { balances, deposits };
    };

    const { balances, deposits } = calculateGrowthData();
    const labels = Array.from({ length: years + 1 }, (_, i) => `שנה ${i}`);

    const data = {
        labels,
        datasets: [
            {
                label: 'סך הכל כולל רווחים',
                data: balances,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'סך הפקדות',
                data: deposits,
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                rtl: true,
                labels: {
                    font: {
                        family: 'system-ui'
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} ₪`;
                    }
                }
            },
            title: {
                display: true,
                text: 'צמיחת השקעה לאורך זמן',
                font: {
                    size: 18
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'שנים'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'סכום ב-₪'
                },
                ticks: {
                    stepSize: 5000,
                    callback: function(value) {
                        return value.toLocaleString() + ' ₪';
                    }
                }
            }
        }
    };

    return (
        <div className="growth-chart" style={{ height: '410px', overflow: 'hidden' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default GrowthChart;