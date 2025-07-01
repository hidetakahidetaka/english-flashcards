
import React, { useState, useCallback, useEffect } from 'react';
import { type Screen, type Player, type VocabularyItem } from './types';
import { VOCABULARY, MAX_QUESTIONS } from './constants';
import PlayerSelectionScreen from './components/PlayerSelectionScreen';
import NameInputScreen from './components/NameInputScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import VocabularyListScreen from './components/VocabularyListScreen';
import MistakeListScreen from './components/MistakeListScreen';

const MISTAKE_LIST_STORAGE_KEY = 'englishFlashcardMistakes';

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>('PlayerSelection');
    const [playerCount, setPlayerCount] = useState<number>(0);
    const [players, setPlayers] = useState<Player[]>([]);
    const [shuffledVocabulary, setShuffledVocabulary] = useState<VocabularyItem[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [mistakeList, setMistakeList] = useState<VocabularyItem[]>([]);
    const [vocabularyForNextGame, setVocabularyForNextGame] = useState<VocabularyItem[] | null>(null);

    useEffect(() => {
        try {
            const storedMistakes = localStorage.getItem(MISTAKE_LIST_STORAGE_KEY);
            if (storedMistakes) {
                setMistakeList(JSON.parse(storedMistakes));
            }
        } catch (error) {
            console.error("Failed to load mistakes from localStorage", error);
        }
    }, []);

    const handlePlayerCountSelect = useCallback((count: number) => {
        setPlayerCount(count);
        setScreen('NameInput');
    }, []);

    const handleViewVocabulary = useCallback(() => {
        setScreen('VocabularyList');
    }, []);
    
    const handleViewMistakeList = useCallback(() => {
        setScreen('MistakeList');
    }, []);

    const handleStartGame = useCallback((names: string[]) => {
        const initialPlayers = names.map(name => ({ name, correct: 0, incorrect: 0, incorrectWords: [] }));
        setPlayers(initialPlayers);

        const gameVocabulary = vocabularyForNextGame 
            ? [...vocabularyForNextGame].sort(() => Math.random() - 0.5)
            : [...VOCABULARY].sort(() => Math.random() - 0.5).slice(0, MAX_QUESTIONS);
        
        setShuffledVocabulary(gameVocabulary);
        setCurrentQuestionIndex(0);
        setVocabularyForNextGame(null); // Reset for the next game
        setScreen('Game');
    }, [vocabularyForNextGame]);

    const handleScoreUpdate = useCallback((playerIndex: number, isCorrect: boolean) => {
        const currentQuestion = shuffledVocabulary[currentQuestionIndex];
        
        setPlayers(prevPlayers => {
            const updatedPlayers = [...prevPlayers];
            const playerToUpdate = { ...updatedPlayers[playerIndex] };

            if (isCorrect) {
                playerToUpdate.correct++;
            } else {
                playerToUpdate.incorrect++;
                if (!playerToUpdate.incorrectWords.some(item => item.english === currentQuestion.english)) {
                    playerToUpdate.incorrectWords = [...playerToUpdate.incorrectWords, currentQuestion];
                }

                // Add to persistent mistake list
                setMistakeList(prevMistakes => {
                    if (!prevMistakes.some(item => item.english === currentQuestion.english)) {
                        const newMistakes = [...prevMistakes, currentQuestion];
                        try {
                            localStorage.setItem(MISTAKE_LIST_STORAGE_KEY, JSON.stringify(newMistakes));
                        } catch (error) {
                            console.error("Failed to save mistakes to localStorage", error);
                        }
                        return newMistakes;
                    }
                    return prevMistakes;
                });
            }
            updatedPlayers[playerIndex] = playerToUpdate;
            return updatedPlayers;
        });
    }, [currentQuestionIndex, shuffledVocabulary]);

    const handleQuestionAnswered = useCallback(() => {
        if (currentQuestionIndex < shuffledVocabulary.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setScreen('Result');
        }
    }, [currentQuestionIndex, shuffledVocabulary.length]);

    const handlePlayAgain = useCallback(() => {
        setPlayers(prevPlayers => prevPlayers.map(p => ({ ...p, correct: 0, incorrect: 0, incorrectWords: [] })));
        const shuffled = [...VOCABULARY].sort(() => Math.random() - 0.5).slice(0, MAX_QUESTIONS);
        setShuffledVocabulary(shuffled);
        setCurrentQuestionIndex(0);
        setScreen('Game');
    }, []);

    const handleStartSessionReviewGame = useCallback(() => {
        const allIncorrectWords = players.reduce((acc, player) => {
            player.incorrectWords.forEach(word => {
                if (!acc.has(word.english)) {
                    acc.set(word.english, word);
                }
            });
            return acc;
        }, new Map<string, VocabularyItem>());

        const reviewVocabulary = Array.from(allIncorrectWords.values());

        if (reviewVocabulary.length === 0) {
            alert("復習する問題がありません。");
            return;
        }

        setPlayers(prevPlayers => prevPlayers.map(p => ({ ...p, correct: 0, incorrect: 0, incorrectWords: [] })));
        setShuffledVocabulary(reviewVocabulary.sort(() => Math.random() - 0.5));
        setCurrentQuestionIndex(0);
        setScreen('Game');
    }, [players]);

    const handleStartGlobalReviewGame = useCallback(() => {
        if (mistakeList.length === 0) {
            alert("にがてリストに復習する問題がありません。");
            return;
        }
        setVocabularyForNextGame(mistakeList);
        setScreen('PlayerSelection');
    }, [mistakeList]);

    const handleRemoveWordFromMistakeList = useCallback((wordToRemove: VocabularyItem) => {
        setMistakeList(prevMistakes => {
            const newMistakes = prevMistakes.filter(item => item.english !== wordToRemove.english);
            try {
                localStorage.setItem(MISTAKE_LIST_STORAGE_KEY, JSON.stringify(newMistakes));
            } catch (error) {
                console.error("Failed to save updated mistakes to localStorage", error);
            }
            return newMistakes;
        });
    }, []);

    const handleBackToTitle = useCallback(() => {
        setScreen('PlayerSelection');
        setPlayers([]);
        setPlayerCount(0);
        setCurrentQuestionIndex(0);
        setShuffledVocabulary([]);
        setVocabularyForNextGame(null);
    }, []);

    const renderScreen = () => {
        switch (screen) {
            case 'PlayerSelection':
                return (
                    <PlayerSelectionScreen
                        onSelectPlayers={handlePlayerCountSelect}
                        onViewVocabulary={handleViewVocabulary}
                        onViewMistakeList={handleViewMistakeList}
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
                        totalQuestions={shuffledVocabulary.length}
                        onScoreUpdate={handleScoreUpdate}
                        onQuestionAnswered={handleQuestionAnswered}
                    />
                );
            case 'Result':
                return <ResultScreen 
                    players={players} 
                    onPlayAgain={handlePlayAgain} 
                    onBackToTitle={handleBackToTitle} 
                    onStartReview={handleStartSessionReviewGame} 
                />;
            case 'VocabularyList':
                return <VocabularyListScreen vocabulary={VOCABULARY} onBack={handleBackToTitle} />;
            case 'MistakeList':
                return <MistakeListScreen 
                    mistakeList={mistakeList}
                    onBack={handleBackToTitle}
                    onStartReview={handleStartGlobalReviewGame}
                    onRemoveWord={handleRemoveWordFromMistakeList}
                />;
            default:
                return <PlayerSelectionScreen onSelectPlayers={handlePlayerCountSelect} onViewVocabulary={handleViewVocabulary} onViewMistakeList={handleViewMistakeList} />;
        }
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-lg w-full flex flex-col items-center border-8 border-blue-300">
            {renderScreen()}
        </div>
    );
};

export default App;
