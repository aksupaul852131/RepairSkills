import React, { useState } from 'react';

const HpToTonCalculator = () => {
    const [hp, setHP] = useState('');
    const [tons, setTons] = useState('');

    const handleCalculate = () => {
        const hpValue = parseFloat(hp);

        if(!isNaN(hpValue)) {
            const coolingCapacityTons = hpValue / 0.2843;
            setTons(coolingCapacityTons.toFixed(2));
        } else {
            setTons('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-72">
                <h1 className="text-2xl font-bold mb-6">HP to Ton Calculator</h1>
                <input
                    type="number"
                    placeholder="Horsepower (HP)"
                    className="w-full bg-gray-100 rounded-md p-2 mb-4"
                    value={hp}
                    onChange={(e) => setHP(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white rounded-md py-2 mb-4"
                    onClick={handleCalculate}
                >
                    Convert to Tons
                </button>
                {tons !== '' && (
                    <p className="text-center">Cooling Capacity (Tons): {tons}</p>
                )}
            </div>
        </div>
    );
};

export default HpToTonCalculator;
