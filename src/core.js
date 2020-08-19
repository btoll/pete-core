/**
 * Copyright (c) 2009 - 2020 Benjamin Toll (benjamintoll.com)
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

const create = Object.create;

const createExtendFn = methodName => {
    return (proto, ...src) => {
        const obj = create(proto);

        core[methodName](obj, ...src);

        // Do any post-processing on the newly-minted object.
        if (obj.$extend) {
            obj.$extend.apply(obj, src);
        }

        return obj;
    };
};

const mixin = (dest, ...src) => {
    // No support in IE.
    if (!Object.assign) {
        src.forEach(o => {
            for (let prop of Object.keys(o)) {
                dest[prop] = o[prop];
            }
        });
    } else {
        src.forEach(
            o => Object.assign(dest, o)
        );
    }

    return dest;
};

const mixinIf = (dest, ...src) => {
    src.forEach(o => {
        for (let prop of Object.keys(o)) {
            if (!dest[prop]) {
                dest[prop] = o[prop];
            }
        }
    });

    return dest;
};

const core = {
    /**
     * @function emptyFn
     * @param None
     * @return {Function}
     */
    emptyFn: () => {},

    /**
     * @function create
     * @param {Object} The base prototype.
     * @param {...Object[]} Optional. Any number of additional objects to be mixed into the new object.
     * @return {Object} The new, extended prototype.
     *
     * Only own, enumerable keys are copied over into the new object.
     */
    create: createExtendFn('mixin'),

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
    createIf: createExtendFn('mixinIf'),

    /**
     * @function mixin
     * @param {Object} dest
     * @param {Variadic} src
     * @return {Object}
     *
     * Mixes in all properties of `src` to `dest`. Doesn't check for pre-existing properties.
     */
    mixin: mixin,

    /**
     * @function mixinIf
     * @param {Object} dest
     * @param {Variadic} src
     * @return {Object}
     *
     * Copies all properties of `src` to `dest` that don't exist in `child`.
     */
    mixinIf: mixinIf
};

export default core;

