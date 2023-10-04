export default class EventManager {
  listeners: Map<string, ((payload: any) => void)[]>;

  constructor() {
    this.listeners = new Map<string, ((payload: any) => void)[]>();
  }

  // Registrar listeners
  on(event: string, listener: any) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)!.push(listener);
  }

  // Emitir listeners
  emit(event: string, payload: any) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event)!.forEach((listener: any) => {
      listener(payload);
    });
  }

  // Remover listeners
  removeListener(event: string, listenerToRemove: any) {
    const listeners = this.listeners.get(event);
    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter(
      (listener: any) => listener !== listenerToRemove
    );

    this.listeners.set(event, filteredListeners);
  }
}
