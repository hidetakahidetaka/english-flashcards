import React from 'react';
import type { VocabularyItem } from '../types';

interface MistakeListScreenProps {
    mistakeList: VocabularyItem[];
    onStartReview: () => void;
    onRemoveWord: (word: VocabularyItem) => void;
    onBack: () => void;
}

const MistakeListScreen: React.FC<MistakeListScreenProps> = ({ mistakeList, onStartReview, onRemoveWord, onBack }) => {
    const titleClasses = "text-4xl sm:text-5xl font-extrabold text-blue-700 drop-shadow-md";
    const btnBaseClasses = "font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2";
    const btnPrimaryClasses = "bg-gradient-to-br from-blue-400 to-blue-600 text-white focus:ring-blue-500";
    const btnReviewClasses = "bg-gradient-to-br from-green-400 to-green-600 text-white focus:ring-green-500";
    const btnDeleteClasses = "text-sm py-1 px-3 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 transition-transform transform hover:scale-105 active:scale-95";

    return (
        <div className="flex flex-col items-center justify-center text-center w-full p-4">
            <h1 className={`${titleClasses} app-title mb-8`}>にがてリスト</h1>
            
            <div className="w-full h-80 bg-gray-50 border border-gray-200 rounded-xl p-2 mb-6 shadow-inner">
                {mistakeList.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-lg">まだ間違えた問題はありません。</p>
                    </div>
                ) : (
                    <div className="w-full overflow-y-auto max-h-full pr-2">
                        {mistakeList.map((item, index) => (
                            <div key={index} className="flex justify-between items-center w-full py-2 px-4 mb-2 bg-white rounded-lg shadow-sm border border-gray-200 text-left">
                                <span className="text-2xl flex-[0.5] text-center">{item.emoji}</span>
                                <div className="flex-[3] ml-4">
                                    <span className="font-bold text-blue-700 text-lg block">{item.english}</span>
                                    <span className="text-md font-medium text-gray-800">{item.japanese}</span>
                                </div>
                                <div className="flex-[1] text-right">
                                    <button onClick={() => onRemoveWord(item)} className={btnDeleteClasses}>
                                        削除
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col space-y-4 w-full">
                <button 
                    onClick={onStartReview} 
                    disabled={mistakeList.length === 0} 
                    className={`${btnBaseClasses} ${btnReviewClasses} btn-base w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100`}
                >
                    このリストで復習クイズを始める
                </button>
                <button onClick={onBack} className={`${btnBaseClasses} ${btnPrimaryClasses} btn-base w-full`}>
                    タイトルに戻る
                </button>
            </div>
        </div>
    );
};

export default MistakeListScreen;
