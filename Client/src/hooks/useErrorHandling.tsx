import { useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const useErrorHandling = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleError = (error: unknown) => {
    if (typeof error === 'string') {
      setErrorMessage(error);
    } else if (error instanceof Error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('An unexpected error occurred');
    }
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  const ErrorMessage = () => (
    errorMessage ? (
      <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">
        <FiAlertCircle className="mr-2" size={20} />
        <span className="block sm:inline">{errorMessage}</span>
      </div>
    ) : null
  );

  return { errorMessage, handleError, clearError, ErrorMessage };
};

export default useErrorHandling;