const observer = {
  subscribers: {},

  subscribe(name, subscriber) {
    this.subscribers[name]
      ? this.subscribers[name].push(subscriber)
      : (this.subscribers[name] = [subscriber]);
  },

  unsubscribe(name, subscriberToRemove) {
    this.subscribers[name].forEach(subscriber => {
      if ('' + subscriber === '' + subscriberToRemove) {
        this.subscribers[name].splice(
          this.subscribers[name].indexOf(subscriber),
          1
        );
      }
    });
  },

  callEvent(name, params) {
    this.subscribers[name] &&
      this.subscribers[name].forEach(subscriber => subscriber(params));
  },
};

export default observer;
