import React, { useState } from 'react';

const TemperatureConverter = () => {
    const [celsius, setCelsius] = useState('');
    const [fahrenheit, setFahrenheit] = useState('');

    const handleCelsiusChange = (event) => {
        const value = event.target.value;
        setCelsius(value);
        setFahrenheit(convertToFahrenheit(value));
    };

    const handleFahrenheitChange = (event) => {
        const value = event.target.value;
        setFahrenheit(value);
        setCelsius(convertToCelsius(value));
    };

    const convertToFahrenheit = (celsius) => {
        return (celsius * 9) / 5 + 32;
    };

    const convertToCelsius = (fahrenheit) => {
        return ((fahrenheit - 32) * 5) / 9;
    };

    return (
        <div className="max-w-xs mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Temperature Converter</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Celsius</label>
                <input
                    type="number"
                    value={celsius}
                    onChange={handleCelsiusChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter temperature in Celsius"
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Fahrenheit</label>
                <input
                    type="number"
                    value={fahrenheit}
                    onChange={handleFahrenheitChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter temperature in Fahrenheit"
                />
            </div>
        </div>
    );
};

export default TemperatureConverter;
