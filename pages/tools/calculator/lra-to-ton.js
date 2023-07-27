import React, { useState } from 'react';

const LraToTonCalculator = () => {
    const [lra, setLRA] = useState('');
    const [tons, setTons] = useState('');

    const handleCalculate = () => {
        const lraValue = parseFloat(lra);

        if(!isNaN(lraValue)) {
            const coolingCapacityTons = lraValue / 24;
            setTons(coolingCapacityTons.toFixed(2));
        } else {
            setTons('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-72">
                <h1 className="text-2xl font-bold mb-6">LRA to Ton Calculator</h1>
                <input
                    type="number"
                    placeholder="LRA (Locked Rotor Amperes)"
                    className="w-full bg-gray-100 rounded-md p-2 mb-4"
                    value={lra}
                    onChange={(e) => setLRA(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white rounded-md py-2 mb-4"
                    onClick={handleCalculate}
                >
                    Calculate Cooling Capacity (Tons)
                </button>
                {tons !== '' && (
                    <p className="text-center">Cooling Capacity (Tons): {tons}</p>
                )}
            </div>
        </div>
    );
};

export default LraToTonCalculator;
