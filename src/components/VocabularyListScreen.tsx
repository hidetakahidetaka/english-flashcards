
import React from 'react';
import type { VocabularyItem } from '../types';

interface VocabularyListScreenProps {
    vocabulary: VocabularyItem[];
    onBack: () => void;
}

const VocabularyListScreen: React.FC<VocabularyListScreenProps> = ({ vocabulary, onBack }) => {
    const titleClasses = "text-4xl sm:text-5xl font-extrabold text-blue-700 drop-shadow-md";
    const btnClasses = "font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white focus:ring-blue-500";

    return (
        <div className="flex flex-col items-center justify-center text-center w-full p-4">
            <h1 className={`${titleClasses} mb-8`}>単語リスト</h1>
            <div className="w-full overflow-y-auto max-h-96 pr-2">
                {vocabulary.map((item, index) => (
                    <div key={index} className="flex justify-between items-center w-full py-2 px-4 mb-2 bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-left">
                        <span className="font-bold text-blue-700 text-lg flex-[2]">{item.english}</span>
                        <span className="text-lg font-medium text-gray-800 flex-[2] ml-4">{item.japanese}</span>
                        <span className="text-2xl flex-[0.5] text-right">{item.emoji}</span>
                    </div>
                ))}
            </div>
            <button onClick={onBack} className={`${btnClasses} w-full mt-8`}>
                タイトルに戻る
            </button>
        </div>
    );
};

export default VocabularyListScreen;
