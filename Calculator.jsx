import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumberClick = (num) => {
    if (display === '0' || resetDisplay) {
      setDisplay(num.toString());
      setResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperationClick = (op) => {
    if (prevValue === null) {
      setPrevValue(parseFloat(display));
    } else if (operation) {
      const result = calculate(prevValue, parseFloat(display), operation);
      setPrevValue(result);
      setDisplay(result.toString());
    }
    setOperation(op);
    setResetDisplay(true);
  };

  const handleEqualsClick = () => {
    if (prevValue !== null && operation) {
      const result = calculate(prevValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setPrevValue(null);
      setOperation(null);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
  };

  const handleDecimalClick = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handlePercentClick = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  };

  const handleToggleSignClick = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const calculate = (a, b, operation) => {
    switch (operation) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const buttons = [
    { text: 'AC', onClick: handleClearClick, className: 'bg-gray-300 text-black' },
    { text: '+/-', onClick: handleToggleSignClick, className: 'bg-gray-300 text-black' },
    { text: '%', onClick: handlePercentClick, className: 'bg-gray-300 text-black' },
    { text: '÷', onClick: () => handleOperationClick('÷'), className: 'bg-orange-500 text-white' },
    { text: '7', onClick: () => handleNumberClick(7) },
    { text: '8', onClick: () => handleNumberClick(8) },
    { text: '9', onClick: () => handleNumberClick(9) },
    { text: '×', onClick: () => handleOperationClick('×'), className: 'bg-orange-500 text-white' },
    { text: '4', onClick: () => handleNumberClick(4) },
    { text: '5', onClick: () => handleNumberClick(5) },
    { text: '6', onClick: () => handleNumberClick(6) },
    { text: '-', onClick: () => handleOperationClick('-'), className: 'bg-orange-500 text-white' },
    { text: '1', onClick: () => handleNumberClick(1) },
    { text: '2', onClick: () => handleNumberClick(2) },
    { text: '3', onClick: () => handleNumberClick(3) },
    { text: '+', onClick: () => handleOperationClick('+'), className: 'bg-orange-500 text-white' },
    { text: '0', onClick: () => handleNumberClick(0), className: 'col-span-2' },
    { text: '.', onClick: handleDecimalClick },
    { text: '=', onClick: handleEqualsClick, className: 'bg-orange-500 text-white' },
  ];

  return (
    <div className="w-64 bg-black rounded-3xl shadow-lg p-4">
      <div className="text-white text-right p-2 rounded mb-2 h-24 flex items-end justify-end text-6xl font-light overflow-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            onClick={btn.onClick}
            className={`h-16 text-2xl font-medium rounded-full ${
              btn.className || 'bg-gray-800 text-white hover:bg-gray-700'
            } ${btn.text === '0' ? 'col-span-2' : ''}`}
          >
            {btn.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;