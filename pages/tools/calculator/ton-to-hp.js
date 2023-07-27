import React, { useState } from 'react';

const TonToHpCalculator = () => {
    const [tons, setTons] = useState('');
    const [hp, setHP] = useState('');

    const handleCalculate = () => {
        const tonsValue = parseFloat(tons);

        if(!isNaN(tonsValue)) {
            const horsepower = tonsValue * 0.2843;
            setHP(horsepower.toFixed(2));
        } else {
            setHP('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-72">
                <h1 className="text-2xl font-bold mb-6">Ton to HP Calculator</h1>
                <input
                    type="number"
                    placeholder="Cooling Capacity (Tons)"
                    className="w-full bg-gray-100 rounded-md p-2 mb-4"
                    value={tons}
                    onChange={(e) => setTons(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white rounded-md py-2 mb-4"
                    onClick={handleCalculate}
                >
                    Convert to HP
                </button>
                {hp !== '' && (
                    <p className="text-center">Horsepower (HP): {hp}</p>
                )}
            </div>
        </div>
    );
};

export default TonToHpCalculator;
