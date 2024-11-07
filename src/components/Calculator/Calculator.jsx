import React, { useState, useEffect } from 'react';
import GrowthChart from '../Chart/GrowthChart';
import './Calculator.css';

const Calculator = () => {
    const [inputs, setInputs] = useState({
        initialAmount: 10000,
        monthlyDeposit: 1000,
        annualReturn: 7,
        years: 10
    });

    const [results, setResults] = useState({
        finalAmount: 0,
        totalProfit: 0,
        totalDeposits: 0,
        totalReturn: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const calculateResults = () => {
        const monthlyRate = inputs.annualReturn / 100 / 12;
        const totalMonths = inputs.years * 12;
        let balance = inputs.initialAmount;
        
        for (let i = 0; i < totalMonths; i++) {
            balance += inputs.monthlyDeposit;
            balance *= (1 + monthlyRate);
        }

        const totalDeposits = inputs.initialAmount + (inputs.monthlyDeposit * totalMonths);
        
        setResults({
            finalAmount: Math.round(balance),
            totalProfit: Math.round(balance - totalDeposits),
            totalDeposits: Math.round(totalDeposits),
            totalReturn: Math.round((balance / totalDeposits - 1) * 100)
        });
    };

    useEffect(() => {
        calculateResults();
    }, [inputs]);

    return (
        <div className="calculator">
            <h1>מחשבון ריבית דריבית</h1>
            
            <div className="calculator__inputs">
                <div className="input-group">
                    <label>סכום השקעה ראשוני</label>
                    <input
                        type="number"
                        name="initialAmount"
                        value={inputs.initialAmount}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <label>הפקדה חודשית</label>
                    <input
                        type="number"
                        name="monthlyDeposit"
                        value={inputs.monthlyDeposit}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <label>תשואה שנתית ממוצעת (ריאלית)</label>
                    <input
                        type="number"
                        name="annualReturn"
                        value={inputs.annualReturn}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <label>משך השקעה (שנים)</label>
                    <input
                        type="number"
                        name="years"
                        value={inputs.years}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="calculator__results">
                <div className="result-item">
                    <label>סכום סופי</label>
                    <span>{results.finalAmount.toLocaleString()} ₪</span>
                </div>
                
                <div className="result-item">
                    <label>רווח כולל</label>
                    <span>{results.totalProfit.toLocaleString()} ₪</span>
                </div>

                <div className="result-item">
                    <label>סך הפקדות</label>
                    <span>{results.totalDeposits.toLocaleString()} ₪</span>
                </div>

                <div className="result-item">
                    <label>תשואה מצטברת</label>
                    <span>{results.totalReturn}%</span>
                </div>
            </div>

            <div className="calculator__chart">
                <GrowthChart
                    initialAmount={inputs.initialAmount}
                    monthlyDeposit={inputs.monthlyDeposit}
                    annualReturn={inputs.annualReturn}
                    years={inputs.years}
                />
            </div>
        </div>
    );
};

export default Calculator;