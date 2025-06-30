import React, { useState, useCallback } from 'react';
import { type Screen, type Player, type VocabularyItem } from './types';
import { VOCABULARY, MAX_QUESTIONS } from './constants';
import PlayerSelectionScreen from './components/PlayerSelectionScreen';
import NameInputScreen from './components/NameInputScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import VocabularyListScreen from './components/VocabularyListScreen';

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>('PlayerSelection');
    const [playerCount, setPlayerCount] = useState<number>(0);
    const [players, setPlayers] = useState<Player[]>([]);
    const [shuffledVocabulary, setShuffledVocabulary] = useState<VocabularyItem[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const handlePlayerCountSelect = useCallback((count: number) => {
        setPlayerCount(count);
        setScreen('NameInput');
    }, []);

    const handleViewVocabulary = useCallback(() => {
        setScreen('VocabularyList');
    }, []);

    const handleStartGame = useCallback((names: string[]) => {
        const initialPlayers = names.map(name => ({ name, correct: 0, incorrect: 0 }));
        setPlayers(initialPlayers);

        const shuffled = [...VOCABULARY].sort(() => Math.random() - 0.5).slice(0, MAX_QUESTIONS);
        setShuffledVocabulary(shuffled);
        setCurrentQuestionIndex(0);
        setScreen('Game');
    }, []);

    const handleScoreUpdate = useCallback((playerIndex: number, isCorrect: boolean) => {
        setPlayers(prevPlayers => {
            const updatedPlayers = [...prevPlayers];
            if (isCorrect) {
                updatedPlayers[playerIndex].correct++;
            } else {
                updatedPlayers[playerIndex].incorrect++;
            }
            return updatedPlayers;
        });
    }, []);

    const handleQuestionAnswered = useCallback(() => {
        if (currentQuestionIndex < MAX_QUESTIONS - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setScreen('Result');
        }
    }, [currentQuestionIndex]);

    const handlePlayAgain = useCallback(() => {
        setScreen('PlayerSelection');
        setPlayers([]);
        setPlayerCount(0);
    }, []);

    const handleBackToTitle = useCallback(() => {
        setScreen('PlayerSelection');
    }, []);

    const renderScreen = () => {
        switch (screen) {
            case 'PlayerSelection':
                return (
                    <PlayerSelectionScreen
                        onSelectPlayers={handlePlayerCountSelect}
                        onViewVocabulary={handleViewVocabulary}
                    />
                );
            case 'NameInput':
                return (
                    <NameInputScreen
                        playerCount={playerCount}
                        onStartGame={handleStartGame}
                        onBack={handleBackToTitle}
                    />
                );
            case 'Game':
                return (
                    <GameScreen
                        players={players}
                        question={shuffledVocabulary[currentQuestionIndex]}
                        questionNumber={currentQuestionIndex + 1}
                        totalQuestions={MAX_QUESTIONS}
                        onScoreUpdate={handleScoreUpdate}
                        onQuestionAnswered={handleQuestionAnswered}
                    />
                );
            case 'Result':
                return <ResultScreen players={players} onPlayAgain={handlePlayAgain} />;
            case 'VocabularyList':
                return <VocabularyListScreen vocabulary={VOCABULARY} onBack={handleBackToTitle} />;
            default:
                return <PlayerSelectionScreen onSelectPlayers={handlePlayerCountSelect} onViewVocabulary={handleViewVocabulary} />;
        }
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-lg w-full flex flex-col items-center border-8 border-blue-300">
            {renderScreen()}
        </div>
    );
};

export default App;
