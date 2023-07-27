import React, { useState } from 'react';

const BTUToTonConverter = () => {
    const [btu, setBTU] = useState('');
    const [ton, setTon] = useState('');
    const [conversionType, setConversionType] = useState('btuToTon');

    const handleDigitClick = (digit) => {
        setBTU((prev) => prev + digit);
    };

    const handleClear = () => {
        setBTU('');
        setTon('');
    };

    const handleConvert = () => {
        const btuValue = parseFloat(btu);
        if(!isNaN(btuValue)) {
            if(conversionType === 'btuToTon') {
                const tonValue = btuValue / 12000; // 1 ton is equivalent to 12,000 BTU
                setTon(tonValue.toFixed(2));
            } else {
                const btuValueConverted = btuValue * 12000;
                setTon(btuValueConverted.toString());
            }
        } else {
            setTon('');
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-200 rounded-md shadow-md">
            <div className="text-3xl font-bold mb-4">BTU/Ton Converter</div>

            <input
                type="text"
                className="col-span-4 w-full h-16 border border-gray-400 rounded-md text-right p-4 text-4xl font-bold mb-2"
                placeholder="0"
                value={btu}
                readOnly
            />


            <div className="grid grid-cols-4 gap-2">


                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('1')}
                >
                    1
                </button>
                {/* Add other digit buttons (1-9) similarly */}
                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('2')}
                >
                    2
                </button>
                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('3')}
                >
                    3
                </button>
                <button
                    className="col-span-1 h-16 bg-blue-500 text-white rounded-md text-2xl font-bold"
                    onClick={handleClear}
                >
                    C
                </button>

                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('4')}
                >
                    4
                </button>

                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('5')}
                >
                    5
                </button>

                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('6')}
                >
                    6
                </button>

                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('7')}
                >
                    7
                </button>

                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('8')}
                >
                    8
                </button>
                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('9')}
                >
                    9
                </button>
                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('0')}
                >
                    0
                </button>

                <button
                    className="col-span-1 h-16 bg-gray-300 text-gray-800 rounded-md text-2xl font-bold"
                    onClick={() => handleDigitClick('.')}
                >
                    .
                </button>


                <button
                    className={`col-span-1 h-16 ${conversionType === 'btuToTon'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-800'
                        } rounded-md text-2xl font-bold`}
                    onClick={() => setConversionType('btuToTon')}
                >
                    BTU to Ton
                </button>
                <button
                    className={`col-span-1 h-16 ${conversionType === 'tonToBTU'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-800'
                        } rounded-md text-2xl font-bold`}
                    onClick={() => setConversionType('tonToBTU')}
                >
                    Ton to BTU
                </button>
                <button
                    className="col-span-2 h-16 bg-blue-500 text-white rounded-md text-2xl font-bold"
                    onClick={handleConvert}
                >
                    =
                </button>
                {ton !== '' && (
                    <div className="col-span-4 mt-4">
                        <p className="text-2xl font-bold">
                            <span className="font-bold">{btu}</span>{' '}
                            {conversionType === 'btuToTon' ? 'BTU' : 'Ton'} is equal to{' '}
                            <span className="font-bold">{ton}</span>{' '}
                            {conversionType === 'btuToTon' ? 'Ton' : 'BTU'}.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BTUToTonConverter;
