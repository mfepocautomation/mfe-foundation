// Analytics tracking functions
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

export interface AnalyticsConfig {
  enabled: boolean;
  endpoint?: string;
  apiKey?: string;
}

class Analytics {
  private config: AnalyticsConfig;
  private events: AnalyticsEvent[] = [];

  constructor(config: AnalyticsConfig = { enabled: true }) {
    this.config = config;
  }

  track(event: AnalyticsEvent): void {
    if (!this.config.enabled) return;

    const eventWithTimestamp = {
      ...event,
      timestamp: event.timestamp || Date.now(),
    };

    this.events.push(eventWithTimestamp);
    
    // In a real implementation, you would send this to your analytics service
    console.log('Analytics event:', eventWithTimestamp);
  }

  trackPageView(page: string, properties?: Record<string, any>): void {
    this.track({
      name: 'page_view',
      properties: {
        page,
        ...properties,
      },
    });
  }

  trackCustomEvent(name: string, properties?: Record<string, any>): void {
    this.track({
      name,
      properties,
    });
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clearEvents(): void {
    this.events = [];
  }
}

// Export default instance
export const analytics = new Analytics();

// Export individual functions for convenience
export const trackEvent = (event: AnalyticsEvent) => analytics.track(event);
export const trackPageView = (page: string, properties?: Record<string, any>) => 
  analytics.trackPageView(page, properties);
export const trackCustomEvent = (name: string, properties?: Record<string, any>) => 
  analytics.trackCustomEvent(name, properties);

export default analytics; 