import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [motivation, setMotivation] = useState("Don't wait for opportunity. Create it.");

  const motivations = [
    "Believe in yourself and all that you are.",
    "Every moment is a fresh beginning.",
    "Push yourself, because no one else is going to do it for you.",
    "Dream big and dare to fail.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "You are capable of amazing things.",
    "Discipline is the bridge between goals and accomplishment.",
    "Small steps every day lead to big results.",
    "Stay focused and never give up.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Start where you are. Use what you have. Do what you can.",
    "Great things never come from comfort zones.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Success doesn’t just find you. You have to go out and get it.",
    "Keep going. Everything you need will come to you at the perfect time.",
    "One day or day one. You decide.",
    "Push yourself because no one else is going to do it for you.",
    "The future depends on what you do today.",
    "Hard work beats talent when talent doesn't work hard.",
    "Be stronger than your excuses.",
    "Don’t limit your challenges. Challenge your limits.",
    "Your only limit is your mind.",
    "If it doesn’t challenge you, it doesn’t change you.",
    "You don’t have to be extreme, just consistent.",
    "Work hard in silence, let success make the noise.",
    "Doubt kills more dreams than failure ever will.",
    "You miss 100% of the shots you don’t take.",
    "Act as if what you do makes a difference. It does.",
    "You are never too old to set another goal or to dream a new dream.",
    "With the new day comes new strength and new thoughts.",
    "Never bend your head. Always hold it high. Look the world straight in the eye.",
    "The only way to do great work is to love what you do.",
    "Diligence is the mother of good luck.",
    "Nothing will work unless you do.",
    "If opportunity doesn’t knock, build a door.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "Make each day your masterpiece.",
    "You don’t find the happy life. You make it.",
    "The best way out is always through.",
    "Try to be a rainbow in someone’s cloud.",
    "A goal without a plan is just a wish.",
    "Your passion is waiting for your courage to catch up.",
    "Magic is believing in yourself.",
    "Don’t stop until you’re proud.",
    "Turn your wounds into wisdom.",
    "Believe you can and you're halfway there.",
    "Let your dreams be bigger than your fears.",
    "The key to success is to focus on goals, not obstacles.",
    "Success is what comes after you stop making excuses.",
    "Action is the foundational key to all success."
  ];

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            if (onBreak) {
              setOnBreak(false);
              setTimeLeft(focusDuration * 60);
            } else {
              setOnBreak(true);
              setSessionsCompleted((prev) => prev + 1);
              setTimeLeft(breakDuration * 60);
            }
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, onBreak, focusDuration, breakDuration]);

  const handleStartPause = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setIsRunning(false);
    setOnBreak(false);
    setTimeLeft(focusDuration * 60);
    setSessionsCompleted(0);
  };

  const changeMotivation = () => {
    const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
    setMotivation(randomMotivation);
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return ${min}:${sec};
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white flex flex-col justify-center items-center p-6 font-sans">
      <div className="bg-white bg-opacity-5 border border-white border-opacity-10 p-8 rounded-3xl shadow-xl text-center w-[400px] backdrop-blur-lg">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Pomodoro Timer
        </h1>

        <div className="flex justify-center space-x-4 mb-6">
          <input
            type="number"
            value={focusDuration}
            onChange={(e) => setFocusDuration(Number(e.target.value))}
            className="w-16 p-2 text-center bg-white bg-opacity-10 border border-white border-opacity-20 rounded text-white focus:outline-none"
            min="1"
          />
          <span className="text-sm text-gray-300">min work</span>
          <input
            type="number"
            value={breakDuration}
            onChange={(e) => setBreakDuration(Number(e.target.value))}
            className="w-16 p-2 text-center bg-white bg-opacity-10 border border-white border-opacity-20 rounded text-white focus:outline-none"
            min="1"
          />
          <span className="text-sm text-gray-300">min break</span>
        </div>

        <button
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-2 px-6 rounded-xl mb-6 shadow-lg"
          onClick={() => setTimeLeft(focusDuration * 60)}
        >
          Set Timer
        </button>

        <div className="text-6xl font-bold p-6 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl mb-6 shadow-inner">
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl shadow-md"
            onClick={handleStartPause}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl shadow-md"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-5 py-2 rounded-xl shadow-md"
            onClick={changeMotivation}
          >
            Motivate
          </button>
        </div>

        <p className="text-sm italic text-gray-400 mb-2">{onBreak ? "Break Time" : "Focus Time"}</p>
        <p className="text-md text-white mb-2">
          Completed Sessions: <span className="text-teal-300">{sessionsCompleted}</span>
        </p>
        <p className="text-md italic text-yellow-400">"{motivation}"</p>
      </div>
    </div>
  );
};

export default PomodoroTimer;