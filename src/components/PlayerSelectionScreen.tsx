import React from 'react';

interface PlayerSelectionScreenProps {
    onSelectPlayers: (count: number) => void;
    onViewVocabulary: () => void;
    onViewMistakeList: () => void;
}

const PlayerSelectionScreen: React.FC<PlayerSelectionScreenProps> = ({ onSelectPlayers, onViewVocabulary, onViewMistakeList }) => {
    const titleClasses = "text-4xl sm:text-5xl font-extrabold text-blue-700 drop-shadow-md";
    const btnBaseClasses = "font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2";
    const btnPrimaryClasses = "bg-gradient-to-br from-blue-400 to-blue-600 text-white focus:ring-blue-500";
    const btnSecondaryClasses = "bg-gradient-to-br from-green-400 to-green-600 text-white focus:ring-green-500";
    const btnTertiaryClasses = "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white focus:ring-yellow-500";
    
    return (
        <div className="flex flex-col items-center justify-center text-center w-full">
            <h1 className={`${titleClasses} app-title mb-4`}>小学三〜四年生用</h1>
            <h1 className={`${titleClasses} app-title mb-8`}>フラッシュカードアプリ</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">何人で遊びますか？</h2>
            <div className="flex flex-col space-y-6 w-full">
                <button onClick={() => onSelectPlayers(1)} className={`${btnBaseClasses} ${btnPrimaryClasses} btn-base w-full`}>
                    1人で遊ぶ
                </button>
                <button onClick={() => onSelectPlayers(2)} className={`${btnBaseClasses} ${btnPrimaryClasses} btn-base w-full`}>
                    2人で遊ぶ
                </button>
                <button onClick={onViewMistakeList} className={`${btnBaseClasses} ${btnTertiaryClasses} btn-base w-full`}>
                    にがてリストを確認・復習する
                </button>
                <button onClick={onViewVocabulary} className={`${btnBaseClasses} ${btnSecondaryClasses} btn-base w-full`}>
                    単語リストを見る
                </button>
            </div>
        </div>
    );
};

export default PlayerSelectionScreen;
