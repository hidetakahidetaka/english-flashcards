import React, { useState } from 'react';

interface NameInputScreenProps {
    playerCount: number;
    onStartGame: (names: string[]) => void;
    onBack: () => void;
}

const NameInputScreen: React.FC<NameInputScreenProps> = ({ playerCount, onStartGame, onBack }) => {
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');

    const handleStart = () => {
        if (!player1Name.trim()) {
            alert('プレイヤー1の名前を入力してください。');
            return;
        }

        const names = [player1Name.trim()];
        if (playerCount === 2) {
            if (!player2Name.trim()) {
                alert('プレイヤー2の名前を入力してください。');
                return;
            }
            names.push(player2Name.trim());
        }
        onStartGame(names);
    };
    
    const inputClasses = "p-3 border-4 border-blue-300 rounded-xl w-full text-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-md";
    const btnClasses = "font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 bg-gradient-to-br from-green-400 to-green-600 text-white focus:ring-green-500";


    return (
        <div className="flex flex-col items-center justify-center text-center w-full p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">名前を入力してください</h1>
            <div className="flex flex-col space-y-4 w-full">
                <input
                    type="text"
                    id="player1-name-input"
                    placeholder="プレイヤー1の名前"
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                    className={inputClasses}
                />
                {playerCount === 2 && (
                    <input
                        type="text"
                        id="player2-name-input"
                        placeholder="プレイヤー2の名前"
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)}
                        className={inputClasses}
                    />
                )}
                <button onClick={handleStart} className={`${btnClasses} btn-base w-full mt-6`}>
                    ゲームスタート！
                </button>
                 <button onClick={onBack} className="text-gray-500 hover:text-gray-700 mt-4">
                    戻る
                </button>
            </div>
        </div>
    );
};

export default NameInputScreen;
