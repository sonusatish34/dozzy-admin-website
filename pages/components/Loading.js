import React from 'react';

const LoadingComp = (props) => {
    return (
        <div class="flex justify-center items-center h-screen bg-white">
            <div class="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingComp;