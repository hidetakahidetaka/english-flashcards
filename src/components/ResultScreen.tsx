
import React from 'react';
import type { Player } from '../types';

interface ResultScreenProps {
    players: Player[];
    onPlayAgain: () => void;
    onBackToTitle: () => void;
    onStartReview: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ players, onPlayAgain, onBackToTitle, onStartReview }) => {
    const titleClasses = "text-4xl sm:text-5xl font-extrabold text-blue-700 drop-shadow-md";
    const btnBaseClasses = "font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2";
    const btnPrimaryClasses = "bg-gradient-to-br from-blue-400 to-blue-600 text-white focus:ring-blue-500";
    const btnReviewClasses = "bg-gradient-to-br from-green-400 to-green-600 text-white focus:ring-green-500";

    const totalIncorrectWords = players.reduce((count, player) => count + player.incorrectWords.length, 0);

    return (
        <div className="flex flex-col items-center justify-center text-center w-full p-4">
            <h1 className={`${titleClasses} app-title mb-8`}>結果発表！</h1>
            <div className="flex flex-col space-y-4 text-2xl mb-8 w-full max-h-72 overflow-y-auto pr-2">
                {players.map((player, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
                        <p className="text-gray-800 font-semibold text-xl">
                            {player.name}さんの結果: 
                        </p>
                        <p className="text-gray-700 mt-1 text-lg">
                            <span className="text-pink-500 font-bold">正解 {player.correct}</span> / <span className="text-orange-500 font-bold">不正解 {player.incorrect}</span>
                        </p>
                        {player.incorrectWords.length > 0 && (
                            <div className="mt-3 text-left">
                                <p className="text-md font-bold text-gray-700">間違えた単語:</p>
                                <ul className="list-disc list-inside text-gray-600 text-sm mt-1 space-y-1">
                                    {player.incorrectWords.map((word, i) => (
                                        <li key={i}><span className="font-semibold">{word.english}</span> ({word.japanese})</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex flex-col space-y-4 w-full mt-4">
                {totalIncorrectWords > 0 && (
                    <button onClick={onStartReview} className={`${btnBaseClasses} ${btnReviewClasses} btn-base w-full`}>
                        間違えた問題だけ復習する
                    </button>
                )}
                <button onClick={onPlayAgain} className={`${btnBaseClasses} ${btnPrimaryClasses} btn-base w-full`}>
                    もう一度遊ぶ
                </button>
                <button onClick={onBackToTitle} className="text-gray-500 hover:text-gray-700 mt-2 font-semibold">
                    タイトルに戻る
                </button>
            </div>
        </div>
    );
};

export default ResultScreen;
