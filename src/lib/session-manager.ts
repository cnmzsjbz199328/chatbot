// 会话管理工具
export class SessionManager {
  private static SESSION_KEY = 'chatbot_session_id';
  private static instance: SessionManager;
  private listeners: (() => void)[] = [];

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  // 添加会话变更监听器
  addSessionChangeListener(callback: () => void) {
    this.listeners.push(callback);
  }

  // 移除会话变更监听器
  removeSessionChangeListener(callback: () => void) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // 通知所有监听器
  private notifySessionChange() {
    this.listeners.forEach(callback => callback());
  }

  // 获取或创建session ID
  getSessionId(): string {
    if (typeof window === 'undefined') {
      // 服务端渲染时返回临时ID
      return 'temp_session';
    }

    let sessionId = localStorage.getItem(SessionManager.SESSION_KEY);
    
    if (!sessionId) {
      // 生成新的session ID
      sessionId = crypto.randomUUID();
      localStorage.setItem(SessionManager.SESSION_KEY, sessionId);
      console.log('Created new session:', sessionId);
      
      // 自动创建会话记录
      this.createSession(sessionId, 24); // 默认24小时
    } else {
      console.log('Using existing session:', sessionId);
    }
    
    return sessionId;
  }

  // 创建或更新会话
  async createSession(sessionId: string, durationInHours: number = 24): Promise<void> {
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          durationInHours
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      const data = await response.json();
      console.log('Session created/updated:', data);
    } catch (error) {
      console.error('Session creation failed:', error);
    }
  }

  // 清除当前会话
  clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SessionManager.SESSION_KEY);
      this.notifySessionChange(); // 通知监听器
    }
  }

  // 获取会话HTTP头
  getSessionHeaders(): Record<string, string> {
    return {
      'X-Session-Id': this.getSessionId()
    };
  }
}

// 导出单例实例
export const sessionManager = SessionManager.getInstance();
