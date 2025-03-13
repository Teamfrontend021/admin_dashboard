import React from 'react';

export const Card = ({ children }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            {children}
        </div>
    );
};

export const CardContent = ({ children }) => {
    return (
        <div className="text-gray-700">
            {children}
        </div>
    );
};
