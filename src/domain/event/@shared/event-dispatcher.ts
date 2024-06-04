import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

  private eventHandlers :  {[eventName: string]: EventHandlerInterface[]} = {}


  notify(event: EventInterface): void {
    throw new Error("Method not implemented.");
  }


  register(eventName: string, eventHandler: any): void {
    if(!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }


  unregister(eventName: string, eventHandler: any): void {
    throw new Error("Method not implemented.");
  }


  unregisterAll(): void {
    throw new Error("Method not implemented.");
  }

  get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]}  {
    return this.eventHandlers
  }

}