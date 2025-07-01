import React from 'react';

interface MistakeReviewSelectionScreenProps {
    playerNamesWithMistakes: string[];
    onSelectPlayer: (name: string) => void;
    onSelectAll: () => void;
    onBack: () => void;
}

const MistakeReviewSelectionScreen: React.FC<MistakeReviewSelectionScreenProps> = ({ playerNamesWithMistakes, onSelectPlayer, onSelectAll, onBack }) => {
    const titleClasses = "text-4xl sm:text-5xl font-extrabold text-blue-700 drop-shadow-md";
    const btnBaseClasses = "font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2";
    const btnPrimaryClasses = "bg-gradient-to-br from-blue-400 to-blue-600 text-white focus:ring-blue-500";
    const btnSecondaryClasses = "bg-gradient-to-br from-green-400 to-green-600 text-white focus:ring-green-500";
    const btnTertiaryClasses = "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white focus:ring-yellow-500";
    
    const hasAnyMistakes = playerNamesWithMistakes.length > 0;

    return (
        <div className="flex flex-col items-center justify-center text-center w-full">
            <h1 className={`${titleClasses} app-title mb-8`}>にがてリスト</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">どのリストを見ますか？</h2>
            
            {hasAnyMistakes ? (
                <div className="flex flex-col space-y-6 w-full">
                    <button onClick={onSelectAll} className={`${btnBaseClasses} ${btnTertiaryClasses} btn-base w-full`}>
                        みんなの にがてリスト
                    </button>
                    {playerNamesWithMistakes.map(name => (
                        <button key={name} onClick={() => onSelectPlayer(name)} className={`${btnBaseClasses} ${btnSecondaryClasses} btn-base w-full`}>
                            {name}の にがてリスト
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-lg my-8">記録されているにがてリストはありません。</p>
            )}

            <div className="w-full mt-10">
                 <button onClick={onBack} className={`${btnBaseClasses} ${btnPrimaryClasses} btn-base w-full`}>
                    タイトルに戻る
                </button>
            </div>
        </div>
    );
};

export default MistakeReviewSelectionScreen;
