import React, { createContext, useReducer, useEffect, useContext, useRef, useCallback } from 'react';
import { annotate } from 'rough-notation';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var GroupContext = createContext(null);
var GroupDispatchContext = createContext(null);
var initialState = {
    annotations: [],
};
function reducer(state, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case 'ADD': {
            var annotations = __spreadArrays(state.annotations, [payload]);
            var annotationsToSort = annotations.reduce(function (toSort, annotation) {
                var newAnnotations = __assign({}, toSort);
                if (typeof annotation.order === 'number') {
                    newAnnotations.withOrder = __spreadArrays(newAnnotations.withOrder, [
                        annotation,
                    ]).sort(function (a, b) { return a.order - b.order; });
                }
                else {
                    newAnnotations.withoutOrder = __spreadArrays(newAnnotations.withoutOrder, [
                        annotation,
                    ]);
                }
                return newAnnotations;
            }, {
                withOrder: [],
                withoutOrder: [],
            });
            return __assign(__assign({}, state), { annotations: __spreadArrays(annotationsToSort.withOrder, annotationsToSort.withoutOrder) });
        }
        default:
            return state;
    }
}
var RoughNotationGroup = function (_a) {
    var children = _a.children, show = _a.show;
    var _b = useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    useEffect(function () {
        var nextTimeout = 0;
        state.annotations.forEach(function (_a) {
            var annotation = _a.annotation;
            if (show) {
                setTimeout(function () {
                    annotation.show();
                }, nextTimeout);
                nextTimeout += annotation.getAnnotation().animationDuration || 0;
            }
            else {
                annotation.hide();
            }
        });
    }, [show, state]);
    return (React.createElement(GroupContext.Provider, { value: state },
        React.createElement(GroupDispatchContext.Provider, { value: dispatch }, children)));
};
var useGroupContext = function (annotation, order) {
    var context = useContext(GroupContext);
    var dispatch = useContext(GroupDispatchContext);
    var initialProps = useRef({ annotation: annotation, context: context, dispatch: dispatch, order: order });
    useEffect(function () {
        var _a = initialProps.current, currentAnnotation = _a.annotation, currentContext = _a.context, currentDispatch = _a.dispatch, currentOrder = _a.order;
        if (!currentContext) {
            return;
        }
        if (currentDispatch) {
            return currentDispatch({
                type: 'ADD',
                payload: { annotation: currentAnnotation, order: currentOrder },
            });
        }
    }, []);
};

var RoughNotation = function (_a) {
    var _b = _a.animate, animate = _b === void 0 ? true : _b, _c = _a.animationDelay, animationDelay = _c === void 0 ? 0 : _c, _d = _a.animationDuration, animationDuration = _d === void 0 ? 800 : _d, brackets = _a.brackets, children = _a.children, color = _a.color, _e = _a.customElement, customElement = _e === void 0 ? 'span' : _e, getAnnotationObject = _a.getAnnotationObject, _f = _a.iterations, iterations = _f === void 0 ? 2 : _f, _g = _a.multiline, multiline = _g === void 0 ? false : _g, order = _a.order, _h = _a.padding, padding = _h === void 0 ? 5 : _h, _j = _a.show, show = _j === void 0 ? false : _j, _k = _a.strokeWidth, strokeWidth = _k === void 0 ? 1 : _k, _l = _a.type, type = _l === void 0 ? 'underline' : _l, rest = __rest(_a, ["animate", "animationDelay", "animationDuration", "brackets", "children", "color", "customElement", "getAnnotationObject", "iterations", "multiline", "order", "padding", "show", "strokeWidth", "type"]);
    var element = useRef(null);
    var annotation = useRef();
    var innerVars = useRef({
        playing: false,
        timeout: null,
    });
    var initialOptions = useRef({
        animate: animate,
        animationDuration: animationDuration,
        brackets: brackets,
        color: color,
        getAnnotationObject: getAnnotationObject,
        iterations: iterations,
        multiline: multiline,
        padding: padding,
        strokeWidth: strokeWidth,
        type: type,
    });
    var showAnnotation = useCallback(function () {
        if (!innerVars.current.timeout) {
            innerVars.current.timeout = window.setTimeout(function () {
                var _a, _b;
                innerVars.current.playing = true;
                (_b = (_a = annotation.current) === null || _a === void 0 ? void 0 : _a.show) === null || _b === void 0 ? void 0 : _b.call(_a);
                window.setTimeout(function () {
                    innerVars.current.playing = false;
                    innerVars.current.timeout = null;
                }, animationDuration);
            }, animationDelay);
        }
    }, [animationDelay, animationDuration]);
    var hideAnnotation = useCallback(function () {
        var _a, _b;
        (_b = (_a = annotation.current) === null || _a === void 0 ? void 0 : _a.hide) === null || _b === void 0 ? void 0 : _b.call(_a);
        innerVars.current.playing = false;
        if (innerVars.current.timeout) {
            clearTimeout(innerVars.current.timeout);
            innerVars.current.timeout = null;
        }
    }, []);
    var getAnnotation = useCallback(function () {
        return annotation.current;
    }, [annotation]);
    useGroupContext({
        getAnnotation: getAnnotation,
        show: showAnnotation,
        hide: hideAnnotation,
    }, typeof order === 'string' ? parseInt(order) : order);
    useEffect(function () {
        var options = initialOptions.current;
        var getAnnotationObjectFromOptions = options.getAnnotationObject;
        annotation.current = annotate(element.current, options);
        if (getAnnotationObjectFromOptions) {
            getAnnotationObjectFromOptions(annotation.current);
        }
        return function () {
            var _a, _b;
            (_b = (_a = annotation.current) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
    }, []);
    useEffect(function () {
        if (show) {
            showAnnotation();
        }
        else {
            hideAnnotation();
        }
    }, [
        annotation,
        show,
        animationDelay,
        innerVars,
        animationDuration,
        showAnnotation,
        hideAnnotation,
    ]);
    useEffect(function () {
        if (annotation.current) {
            annotation.current.animate = animate;
            annotation.current.animationDuration = animationDuration;
            annotation.current.color = color;
            annotation.current.strokeWidth = strokeWidth;
            annotation.current.padding = padding;
        }
    }, [annotation, animate, animationDuration, color, strokeWidth, padding]);
    return React.createElement(customElement, __assign({ ref: element }, rest), children);
};

export { RoughNotation, RoughNotationGroup };
//# sourceMappingURL=module.es.js.map
