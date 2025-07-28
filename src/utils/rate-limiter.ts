class RateLimiter {
  private calls: number[] = [];
  private maxCalls = 50; // 50 par minute pour être safe
  private window = 60000; // 1 minute
  
  canMakeCall(): boolean {
    const now = Date.now();
    // Nettoyer les anciens appels
    this.calls = this.calls.filter(time => now - time < this.window);
    
    if (this.calls.length >= this.maxCalls) {
      console.warn('⏰ Rate limit: too many calls per minute');
      return false;
    }
    
    this.calls.push(now);
    return true;
  }
}

export const rateLimiter = new RateLimiter(); 