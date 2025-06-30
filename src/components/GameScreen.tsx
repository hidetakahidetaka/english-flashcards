import React, { useState, useEffect, useCallback } from 'react';
import type { Player, VocabularyItem } from '../types';

interface GameScreenProps {
    players: Player[];
    question: VocabularyItem;
    questionNumber: number;
    totalQuestions: number;
    onScoreUpdate: (playerIndex: number, isCorrect: boolean) => void;
    onQuestionAnswered: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ players, question, questionNumber, totalQuestions, onScoreUpdate, onQuestionAnswered }) => {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [playersAnswered, setPlayersAnswered] = useState<boolean[]>([]);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            const updateVoices = () => setVoices(speechSynthesis.getVoices());
            speechSynthesis.onvoiceschanged = updateVoices;
            updateVoices();
            return () => { speechSynthesis.onvoiceschanged = null; };
        }
    }, []);

    useEffect(() => {
        setIsAnswerVisible(false);
        setPlayersAnswered(new Array(players.length).fill(false));
    }, [question, players.length]);
    
    useEffect(() => {
        if (players.length > 0 && playersAnswered.every(answered => answered)) {
            const timer = setTimeout(() => {
                onQuestionAnswered();
            }, 2000);
            return () => clearTimeout(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playersAnswered, onQuestionAnswered, players.length]);

    const playAudioHint = useCallback(() => {
        if ('speechSynthesis' in window && question) {
            const utterance = new SpeechSynthesisUtterance(question.english);
            utterance.lang = 'en-US';
            const selectedVoice = voices.find(voice => voice.lang === 'en-US' && (voice.name.includes('Google') || voice.name.includes('Samantha')));
            if (selectedVoice) utterance.voice = selectedVoice;
            utterance.rate = 0.9;
            speechSynthesis.speak(utterance);
        } else {
            alert("お使いのブラウザは音声合成に対応していません。");
        }
    }, [question, voices]);

    const handleScore = (event: React.MouseEvent<HTMLButtonElement>, playerIndex: number, isCorrect: boolean) => {
        if (playersAnswered[playerIndex]) return;

        const button = event.currentTarget;
        button.classList.add('btn-pressed-feedback');
        setTimeout(() => {
            button.classList.remove('btn-pressed-feedback');
        }, 200);

        onScoreUpdate(playerIndex, isCorrect);
        const newPlayersAnswered = [...playersAnswered];
        newPlayersAnswered[playerIndex] = true;
        setPlayersAnswered(newPlayersAnswered);
    };
    
    const btnBase = "font-extrabold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100";
    const allAnswered = playersAnswered.every(a => a);

    return (
        <div className="flex flex-col items-center justify-center text-center w-full p-4">
            <p className="text-2xl font-bold text-gray-700 mb-6">問題 {questionNumber} / {totalQuestions}</p>
            
            <div className="flex items-center justify-center mb-8 w-full max-w-xs h-48 sm:h-64 flex-col">
                <div className="text-9xl font-extrabold text-blue-700 leading-none drop-shadow-lg">
                    {question.english.charAt(0).toUpperCase()}
                </div>
                <div className="text-6xl mt-4">{question.emoji}</div>
            </div>

            <button
                onClick={() => setIsAnswerVisible(true)}
                disabled={isAnswerVisible || allAnswered}
                className={`${btnBase} btn-base text-5xl font-black py-5 bg-gradient-to-br from-blue-400 to-blue-600 text-white focus:ring-blue-500 w-full mb-4`}
            >
                答え
            </button>
            
            <p id="answer-display" className={`text-3xl font-black mb-6 h-10 answer-text ${isAnswerVisible ? 'bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent' : ''}`}>
                {isAnswerVisible ? question.japanese : ''}
            </p>

            <button
                onClick={playAudioHint}
                disabled={allAnswered}
                className={`${btnBase} btn-base text-5xl font-black py-5 bg-gradient-to-br from-purple-400 to-purple-600 text-white focus:ring-purple-500 w-full mb-6`}
            >
                ヒント (発音)
            </button>

            <div className="w-full">
                {players.map((player, index) => (
                    <div key={index} className="player-controls mb-4 p-4 bg-gray-100 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-xl font-semibold text-gray-800 mb-3">{player.name}さんの正誤</p>
                        <div className="flex justify-around space-x-2">
                            <button
                                onClick={(e) => handleScore(e, index, true)}
                                disabled={playersAnswered[index] || allAnswered}
                                className={`${btnBase} btn-base flex-1 text-xl bg-gradient-to-br from-pink-400 to-pink-600 text-white focus:ring-pink-500`}
                            >
                                ○ 正解
                            </button>
                            <button
                                onClick={(e) => handleScore(e, index, false)}
                                disabled={playersAnswered[index] || allAnswered}
                                className={`${btnBase} btn-base flex-1 text-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white focus:ring-orange-500`}
                            >
                                × 不正解
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameScreen;
