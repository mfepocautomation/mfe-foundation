// Observability utilities for logging, monitoring, and tracing
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: number;
  context?: Record<string, any>;
  error?: Error;
}

export interface ObservabilityConfig {
  logLevel: LogLevel;
  enableConsole: boolean;
  enableRemoteLogging?: boolean;
  remoteEndpoint?: string;
}

class Logger {
  private config: ObservabilityConfig;
  private logs: LogEntry[] = [];

  constructor(config: ObservabilityConfig = { 
    logLevel: LogLevel.INFO, 
    enableConsole: true 
  }) {
    this.config = config;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    const configIndex = levels.indexOf(this.config.logLevel);
    const currentIndex = levels.indexOf(level);
    return currentIndex >= configIndex;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: Date.now(),
      context,
      error,
    };

    this.logs.push(entry);

    if (this.config.enableConsole) {
      const logMethod = level === LogLevel.ERROR ? 'error' : 
                       level === LogLevel.WARN ? 'warn' : 
                       level === LogLevel.DEBUG ? 'debug' : 'log';
      
      console[logMethod](`[${level.toUpperCase()}] ${message}`, context || '', error || '');
    }
  }

  debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

// Performance monitoring utilities
export interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();

  startTimer(name: string, metadata?: Record<string, any>): void {
    this.metrics.set(name, {
      name,
      startTime: performance.now(),
      metadata,
    });
  }

  endTimer(name: string): PerformanceMetric | null {
    const metric = this.metrics.get(name);
    if (!metric) return null;

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;

    console.log(`Performance: ${name} took ${metric.duration.toFixed(2)}ms`);
    return metric;
  }

  getMetric(name: string): PerformanceMetric | null {
    return this.metrics.get(name) || null;
  }

  getAllMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  clearMetrics(): void {
    this.metrics.clear();
  }
}

// Export instances
export const logger = new Logger();
export const performanceMonitor = new PerformanceMonitor();

// Export convenience functions
export const debug = (message: string, context?: Record<string, any>) => logger.debug(message, context);
export const info = (message: string, context?: Record<string, any>) => logger.info(message, context);
export const warn = (message: string, context?: Record<string, any>) => logger.warn(message, context);
export const error = (message: string, error?: Error, context?: Record<string, any>) => logger.error(message, error, context);

export const startTimer = (name: string, metadata?: Record<string, any>) => performanceMonitor.startTimer(name, metadata);
export const endTimer = (name: string) => performanceMonitor.endTimer(name);

export default {
  logger,
  performanceMonitor,
  debug,
  info,
  warn,
  error,
  startTimer,
  endTimer,
}; 