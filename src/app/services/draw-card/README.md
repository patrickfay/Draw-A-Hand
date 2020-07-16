# `draw-card` Service

This service is used to act like AngularJS's event Broadcaster.

We use a RxJS `Subject` object to act as an observable and an observer, which allows us to essentially 'emit events' accross the application. Compentents can then subscribe to these 'events' and perform whatever action is needed.
