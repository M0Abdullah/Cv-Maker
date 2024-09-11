import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useResumeGenerator() {
  const navigate = useNavigate(); // Correctly initialize useNavigate
  const [currentstate, setCurrentstate] = useState(1);

  const handleBack = () => {
    setCurrentstate(prevState => Math.max(prevState - 1, 1));
  };

  const handleNextStep = () => {
    setCurrentstate(prevState => (prevState < 5 ? prevState + 1 : 5));
  };

  const handleNewPage = () => {
    if (currentstate === 5) {
      navigate('/Usertemplate');
    } else {
      alert('You need to complete all steps before proceeding.');
    }
  };

  const isBackDisabled = currentstate === 1;
  const isNextDisabled = currentstate === 5; // Disabled when at last step

  return { currentstate, handleBack, handleNextStep, isBackDisabled, isNextDisabled, handleNewPage };
}