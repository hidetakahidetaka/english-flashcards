
import React from 'react';
import type { Player } from '../types';

interface ResultScreenProps {
    players: Player[];
    onPlayAgain: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ players, onPlayAgain }) => {
    const titleClasses = "text-4xl sm:text-5xl font-extrabold text-blue-700 drop-shadow-md";
    const btnClasses = "font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white focus:ring-blue-500";

    return (
        <div className="flex flex-col items-center justify-center text-center w-full p-4">
            <h1 className={`${titleClasses} mb-8`}>結果発表！</h1>
            <div className="flex flex-col space-y-4 text-2xl mb-8 w-full">
                {players.map((player, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
                        <p className="text-gray-800 font-semibold">
                            {player.name}さんの結果: 
                        </p>
                        <p className="text-gray-700 mt-1">
                            <span className="text-pink-500 font-bold">正解 {player.correct}</span> / <span className="text-orange-500 font-bold">不正解 {player.incorrect}</span>
                        </p>
                    </div>
                ))}
            </div>
            <button onClick={onPlayAgain} className={`${btnClasses} w-full`}>
                もう一度遊ぶ
            </button>
        </div>
    );
};

export default ResultScreen;
