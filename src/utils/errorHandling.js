/**
 * Custom error for application-specific errors
 */
export class AppError extends Error {
  constructor(message, code = 'APP_ERROR') {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

/**
 * Log error to console and optionally to a service
 */
export const logError = (error, context = {}) => {
  console.error('Error:', {
    message: error.message,
    code: error.code,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });

  // Here you could add error reporting service integration
  // e.g., Sentry, LogRocket, etc.
};

/**
 * Handle async operations with error handling
 */
export const handleAsync = async (promise) => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    logError(error);
    return [null, error];
  }
};

/**
 * Format error message for user display
 */
export const formatErrorMessage = (error) => {
  if (error instanceof AppError) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};