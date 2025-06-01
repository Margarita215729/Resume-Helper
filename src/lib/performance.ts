import { NextRequest } from 'next/server';
import { logInfo } from './logger';

interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  route: string;
  method: string;
  statusCode?: number;
}

class PerformanceMonitor {
  private metrics = new Map<string, PerformanceMetrics>();

  startTiming(request: NextRequest): string {
    const id = crypto.randomUUID();
    const metrics: PerformanceMetrics = {
      startTime: Date.now(),
      route: request.nextUrl.pathname,
      method: request.method,
    };
    
    this.metrics.set(id, metrics);
    return id;
  }

  endTiming(id: string, statusCode: number): void {
    const metrics = this.metrics.get(id);
    if (!metrics) return;

    metrics.endTime = Date.now();
    metrics.duration = metrics.endTime - metrics.startTime;
    metrics.statusCode = statusCode;

    // Log performance metrics
    logInfo('API Performance', {
      route: metrics.route,
      method: metrics.method,
      duration: metrics.duration,
      statusCode: metrics.statusCode,
    });

    // Alert on slow requests (> 5 seconds)
    if (metrics.duration > 5000) {
      logInfo('Slow API request detected', {
        route: metrics.route,
        method: metrics.method,
        duration: metrics.duration,
        threshold: 5000,
      });
    }

    this.metrics.delete(id);
  }

  getMetrics(): PerformanceMetrics[] {
    return Array.from(this.metrics.values());
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Simple in-memory cache for API responses
interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

class APICache {
  private cache = new Map<string, CacheEntry>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Clean expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

export const apiCache = new APICache();

// Run cleanup every 10 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    apiCache.cleanup();
  }, 10 * 60 * 1000);
}
