import React, { useState } from 'react';

const HVACHeatLoadCalculator = () => {
    const [area, setArea] = useState('');
    const [occupants, setOccupants] = useState('');
    const [desiredTemperature, setDesiredTemperature] = useState('');
    const [heatingLoad, setHeatingLoad] = useState('');

    const handleCalculate = () => {
        const areaValue = parseFloat(area);
        const occupantsValue = parseInt(occupants);
        const desiredTemperatureValue = parseFloat(desiredTemperature);

        if(!isNaN(areaValue) && !isNaN(occupantsValue) && !isNaN(desiredTemperatureValue)) {
            const heatingLoadValue = areaValue * 25 + occupantsValue * 600 + (desiredTemperatureValue - 70) * 300;
            setHeatingLoad(heatingLoadValue.toFixed(2));
        } else {
            setHeatingLoad('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-72">
                <h1 className="text-2xl font-bold mb-6">HVAC Heat Load Calculator</h1>
                <input
                    type="number"
                    placeholder="Area (sq. ft.)"
                    className="w-full bg-gray-100 rounded-md p-2 mb-4"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number of Occupants"
                    className="w-full bg-gray-100 rounded-md p-2 mb-4"
                    value={occupants}
                    onChange={(e) => setOccupants(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Room Temperature (°F)"
                    className="w-full bg-gray-100 rounded-md p-2 mb-4"
                    value={desiredTemperature}
                    onChange={(e) => setDesiredTemperature(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white rounded-md py-2 mb-4"
                    onClick={handleCalculate}
                >
                    Calculate Heating Load
                </button>
                {heatingLoad !== '' && (
                    <p className="text-center">Heating Load (BTU/h): {heatingLoad}</p>
                )}
            </div>
        </div>
    );
};

export default HVACHeatLoadCalculator;
