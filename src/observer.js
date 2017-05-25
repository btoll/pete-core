/**
 * Copyright (c) 2009 - 2017 Benjamin Toll (benjamintoll.com)
 *
 * This file is part of pete-core.
 *
 * pete-core is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * pete-core is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with pete-core.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import core from './core';

const hasSubscribers = function (type) {
    const events = this.events;
    return events && events[type] && events[type].length;
};

const observer = {
    /**
     * @function fire
     * @param {String} type
     * @param {Variadic} options Optional
     * @return {None}
     *
     * Publishes a custom event. The first argument passed to the observer is the name of the event.
     * Optionally, call with a variable number of arguments that will be passed to the subscribers.
     */
    fire: function (type, ...options) {
        if (hasSubscribers.call(this, type)) {
            this.events[type].forEach(fn =>
                fn.apply(this, options)
            );
        }
    },

    /**
     * @function isObserved
     * @param {String} type
     * @return {Boolean}
     *
     * Returns `true` if the event has one or more subscribers (`false` otherwise). Note it doesn't query for a specific handler.
     */
    isObserved: function (type) {
        return hasSubscribers.call(this, type);
    },

    /**
     * @function purgeSubscribers
     * @param {Array/None} type
     * @return {None}
     *
     * If passed an array of string types, it will remove their subscribers.
     * Otherwise, removes all of the observable's subscribers.
     */
    purgeSubscribers: (() => {
        let subscribers;

        const purge = function (type) {
            subscribers = this.events[type];
            subscribers = subscribers.map(fn => null);

            this.events[type] = [];
        };

        return function (...types) {
            if (!this.events) {
                return;
            }

            if (!types.length) {
                for (let type of Object.keys(this.events)) {
                    purge.call(this, type);
                }
            } else {
                types.forEach(purge.bind(this));
            }
        };
    })(),

    subscribableEvents: function () {
        return !this.events ?
            null :
            Object.keys(this.events).join(', ');
    },

    /**
     * @function subscribe
     * @param {String} type Event to listen for
     * @param {Function} fn Callback
     * @return {Boolean}
     *
     * Listen to a pre-defined event by passing the name of the event to and the callback to be invoked when that event occurs.
     */
    subscribe: function (type, fn) {
        let rtn = false;

        if (!this.events) {
            return rtn;
        }

        if (this.events[type]) {
            this.events[type].push(fn);
            rtn = true;
        }

        return rtn;
    },

    /**
     * @function subscriberEvents
     * @param {Array} evs
     * @return {None}
     *
     * Define the custom events that the type will expose. Expects an array of custom events. If the object
     * then subscribes to one of the exposed events, the function will be mapped to the event name in `events`.
     */
    subscriberEvents: function (v) {
        if (!this.events) {
            this.events = {};
        }

        v.forEach(a => {
            if (!this.events[a]) {
                this.events[a] = [];
            }
        });
    },

    /**
     * @function unsubscribe
     * @param {String} type
     * @param {Function} fn
     * @return {Boolean}
     *
     * Remove the event listener that was previously subscribed.
     */
    unsubscribe: function (type, fn) {
        let rtn = false;

        if (hasSubscribers.call(this, type)) {
            let i;

            if (~(i = this.events[type].indexOf(fn))) {
                this.events[type].splice(i, 1);
                rtn = true;
            }
        }

        return rtn;
    }
};

export default observer;

