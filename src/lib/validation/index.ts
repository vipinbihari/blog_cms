/**
 * Validation Utilities
 * ===================
 * Standardized input validation and error handling utilities.
 */

/**
 * Standard validation result type
 */
export interface ValidationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: Record<string, any>;
}

/**
 * Standard error types
 */
export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_INPUT = 'INVALID_INPUT',
  PROCESSING_ERROR = 'PROCESSING_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR'
}

/**
 * Standard error class with context
 */
export class BlogCMSError extends Error {
  public readonly type: ErrorType;
  public readonly context?: Record<string, any>;
  public readonly timestamp: Date;

  constructor(
    message: string,
    type: ErrorType = ErrorType.PROCESSING_ERROR,
    context?: Record<string, any>
  ) {
    super(message);
    this.name = 'BlogCMSError';
    this.type = type;
    this.context = context;
    this.timestamp = new Date();
  }
}

/**
 * Validates string input
 */
export function validateString(
  value: any,
  fieldName: string,
  options: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  } = {}
): ValidationResult<string> {
  try {
    // Check if value exists
    if (options.required && (!value || typeof value !== 'string')) {
      return {
        success: false,
        error: `${fieldName} is required and must be a string`,
        details: { fieldName, value, type: typeof value }
      };
    }

    // If not required and empty, return success
    if (!options.required && (!value || value === '')) {
      return { success: true, data: '' };
    }

    const stringValue = String(value).trim();

    // Check minimum length
    if (options.minLength && stringValue.length < options.minLength) {
      return {
        success: false,
        error: `${fieldName} must be at least ${options.minLength} characters`,
        details: { fieldName, actualLength: stringValue.length, minLength: options.minLength }
      };
    }

    // Check maximum length
    if (options.maxLength && stringValue.length > options.maxLength) {
      return {
        success: false,
        error: `${fieldName} must not exceed ${options.maxLength} characters`,
        details: { fieldName, actualLength: stringValue.length, maxLength: options.maxLength }
      };
    }

    // Check pattern
    if (options.pattern && !options.pattern.test(stringValue)) {
      return {
        success: false,
        error: `${fieldName} does not match required format`,
        details: { fieldName, value: stringValue, pattern: options.pattern.source }
      };
    }

    return { success: true, data: stringValue };
  } catch (error) {
    return {
      success: false,
      error: `Validation failed for ${fieldName}`,
      details: { fieldName, originalError: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
}

/**
 * Validates number input
 */
export function validateNumber(
  value: any,
  fieldName: string,
  options: {
    required?: boolean;
    min?: number;
    max?: number;
    integer?: boolean;
  } = {}
): ValidationResult<number> {
  try {
    // Check if value exists
    if (options.required && (value === null || value === undefined)) {
      return {
        success: false,
        error: `${fieldName} is required`,
        details: { fieldName, value }
      };
    }

    // If not required and empty, return success
    if (!options.required && (value === null || value === undefined || value === '')) {
      return { success: true, data: 0 };
    }

    const numValue = Number(value);

    // Check if it's a valid number
    if (isNaN(numValue)) {
      return {
        success: false,
        error: `${fieldName} must be a valid number`,
        details: { fieldName, value, type: typeof value }
      };
    }

    // Check if integer is required
    if (options.integer && !Number.isInteger(numValue)) {
      return {
        success: false,
        error: `${fieldName} must be an integer`,
        details: { fieldName, value: numValue }
      };
    }

    // Check minimum value
    if (options.min !== undefined && numValue < options.min) {
      return {
        success: false,
        error: `${fieldName} must be at least ${options.min}`,
        details: { fieldName, value: numValue, min: options.min }
      };
    }

    // Check maximum value
    if (options.max !== undefined && numValue > options.max) {
      return {
        success: false,
        error: `${fieldName} must not exceed ${options.max}`,
        details: { fieldName, value: numValue, max: options.max }
      };
    }

    return { success: true, data: numValue };
  } catch (error) {
    return {
      success: false,
      error: `Validation failed for ${fieldName}`,
      details: { fieldName, originalError: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
}

/**
 * Safe execution wrapper with standardized error handling
 */
export async function safeExecute<T>(
  operation: () => Promise<T> | T,
  context: string,
  fallback?: T
): Promise<ValidationResult<T>> {
  try {
    const result = await operation();
    return { success: true, data: result };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Error in ${context}:`, error);
    
    return {
      success: false,
      error: errorMessage,
      data: fallback,
      details: { context, timestamp: new Date().toISOString() }
    };
  }
}

/**
 * Logging utility with context
 */
export function logWithContext(
  level: 'info' | 'warn' | 'error',
  message: string,
  context?: Record<string, any>
) {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    level,
    message,
    ...(context && { context })
  };

  switch (level) {
    case 'error':
      console.error(`[${timestamp}] ERROR:`, message, context);
      break;
    case 'warn':
      console.warn(`[${timestamp}] WARN:`, message, context);
      break;
    default:
      console.log(`[${timestamp}] INFO:`, message, context);
  }

  return logData;
}
