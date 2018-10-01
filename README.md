# pete-core

`pete-core` exposes the following modules.

+ <a href="#core">core</a>
+ <a href="#observer">observer</a>

## core
        /**
         * @function emptyFn
         * @param None
         * @return {Function}
         */

        /**
         * @function create
         * @param {Object} The base prototype.
         * @param {...Object[]} Optional. Any number of additional objects to be mixed into the new object.
         * @return {Object} The new, extended prototype.
         *
         * Only own, enumerable keys are copied over into the new object.
         */

        /**
         * @function createIf
         * @param {Object} The base prototype.
         * @param {...Object[]} Optional. Any number of additional objects to be mixed into the new object.
         * @return {Object} The new, extended prototype.
         *
         * Only own, enumerable keys are copied over into the new object.
         *
         * In addition, only fields that don't exist in the destination object are copied over.
         */

        /**
         * @function mixin
         * @param {Object} dest
         * @param {Variadic} src
         * @return {Object}
         *
         * Mixes in all properties of `src` to `dest`. Doesn't check for pre-existing properties.
         */

        /**
         * @function mixinIf
         * @param {Object} dest
         * @param {Variadic} src
         * @return {Object}
         *
         * Copies all properties of `src` to `dest` that don't exist in `child`.
         */

## observer

        /**
         * @function fire
         * @param {String} type
         * @param {Variadic} options Optional
         * @return {None}
         *
         * Publishes a custom event. The first argument passed to the observer is the name of the event.
         * Optionally, call with a variable number of arguments that will be passed to the subscribers.
         */

        /**
         * @function isObserved
         * @param {String} type
         * @return {Boolean}
         *
         * Returns `true` if the event has one or more subscribers (`false` otherwise). Note it doesn't query for a specific handler.
         */

        /**
         * @function purgeSubscribers
         * @param {Array/None} type
         * @return {None}
         *
         * If passed an array of string types, it will remove their subscribers.
         * Otherwise, removes all of the observable's subscribers.
         */

        /**
         * @function subscribe
         * @param {String} type Event to listen for
         * @param {Function} fn Callback
         * @return {Boolean}
         *
         * Listen to a pre-defined event by passing the name of the event to and the callback to be invoked when that event occurs.
         */

        /**
         * @function subscriberEvents
         * @param {Array} evs
         * @return {None}
         *
         * Define the custom events that the type will expose. Expects an array of custom events. If the object
         * then subscribes to one of the exposed events, the function will be mapped to the event name in `events`.
         */

        /**
         * @function unsubscribe
         * @param {String} type
         * @param {Function} fn
         * @return {Boolean}
         *
         * Remove the event listener that was previously subscribed.
         */

## License

[GPLv3](COPYING)

## Author

Benjamin Toll

