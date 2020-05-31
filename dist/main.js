Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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

const SVG_NS = 'http://www.w3.org/2000/svg';
const DEFAULT_ANIMATION_DURATION = 800;

class Random {
    constructor(seed) {
        this.seed = seed;
    }
    next() {
        if (this.seed) {
            return ((2 ** 31 - 1) & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31;
        }
        else {
            return Math.random();
        }
    }
}

function line(x1, y1, x2, y2, o) {
    return { type: 'path', ops: _doubleLine(x1, y1, x2, y2, o) };
}
function linearPath(points, close, o) {
    const len = (points || []).length;
    if (len > 2) {
        const ops = [];
        for (let i = 0; i < (len - 1); i++) {
            ops.push(..._doubleLine(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], o));
        }
        if (close) {
            ops.push(..._doubleLine(points[len - 1][0], points[len - 1][1], points[0][0], points[0][1], o));
        }
        return { type: 'path', ops };
    }
    else if (len === 2) {
        return line(points[0][0], points[0][1], points[1][0], points[1][1], o);
    }
    return { type: 'path', ops: [] };
}
function polygon(points, o) {
    return linearPath(points, true, o);
}
function rectangle(x, y, width, height, o) {
    const points = [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height]
    ];
    return polygon(points, o);
}
function ellipse(x, y, width, height, o) {
    const params = generateEllipseParams(width, height, o);
    return ellipseWithParams(x, y, o, params).opset;
}
function generateEllipseParams(width, height, o) {
    const psq = Math.sqrt(Math.PI * 2 * Math.sqrt((Math.pow(width / 2, 2) + Math.pow(height / 2, 2)) / 2));
    const stepCount = Math.max(o.curveStepCount, (o.curveStepCount / Math.sqrt(200)) * psq);
    const increment = (Math.PI * 2) / stepCount;
    let rx = Math.abs(width / 2);
    let ry = Math.abs(height / 2);
    const curveFitRandomness = 1 - o.curveFitting;
    rx += _offsetOpt(rx * curveFitRandomness, o);
    ry += _offsetOpt(ry * curveFitRandomness, o);
    return { increment, rx, ry };
}
function ellipseWithParams(x, y, o, ellipseParams) {
    const [ap1, cp1] = _computeEllipsePoints(ellipseParams.increment, x, y, ellipseParams.rx, ellipseParams.ry, 1, ellipseParams.increment * _offset(0.1, _offset(0.4, 1, o), o), o);
    let o1 = _curve(ap1, null, o);
    if (!o.disableMultiStroke) {
        const [ap2] = _computeEllipsePoints(ellipseParams.increment, x, y, ellipseParams.rx, ellipseParams.ry, 1.5, 0, o);
        const o2 = _curve(ap2, null, o);
        o1 = o1.concat(o2);
    }
    return {
        estimatedPoints: cp1,
        opset: { type: 'path', ops: o1 }
    };
}
function random(ops) {
    if (!ops.randomizer) {
        ops.randomizer = new Random(ops.seed || 0);
    }
    return ops.randomizer.next();
}
function _offset(min, max, ops, roughnessGain = 1) {
    return ops.roughness * roughnessGain * ((random(ops) * (max - min)) + min);
}
function _offsetOpt(x, ops, roughnessGain = 1) {
    return _offset(-x, x, ops, roughnessGain);
}
function _doubleLine(x1, y1, x2, y2, o, filling = false) {
    const singleStroke = filling ? o.disableMultiStrokeFill : o.disableMultiStroke;
    const o1 = _line(x1, y1, x2, y2, o, true, false);
    if (singleStroke) {
        return o1;
    }
    const o2 = _line(x1, y1, x2, y2, o, true, true);
    return o1.concat(o2);
}
function _line(x1, y1, x2, y2, o, move, overlay) {
    const lengthSq = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);
    const length = Math.sqrt(lengthSq);
    let roughnessGain = 1;
    if (length < 200) {
        roughnessGain = 1;
    }
    else if (length > 500) {
        roughnessGain = 0.4;
    }
    else {
        roughnessGain = (-0.0016668) * length + 1.233334;
    }
    let offset = o.maxRandomnessOffset || 0;
    if ((offset * offset * 100) > lengthSq) {
        offset = length / 10;
    }
    const halfOffset = offset / 2;
    const divergePoint = 0.2 + random(o) * 0.2;
    let midDispX = o.bowing * o.maxRandomnessOffset * (y2 - y1) / 200;
    let midDispY = o.bowing * o.maxRandomnessOffset * (x1 - x2) / 200;
    midDispX = _offsetOpt(midDispX, o, roughnessGain);
    midDispY = _offsetOpt(midDispY, o, roughnessGain);
    const ops = [];
    const randomHalf = () => _offsetOpt(halfOffset, o, roughnessGain);
    const randomFull = () => _offsetOpt(offset, o, roughnessGain);
    if (move) {
        if (overlay) {
            ops.push({
                op: 'move', data: [
                    x1 + randomHalf(),
                    y1 + randomHalf()
                ]
            });
        }
        else {
            ops.push({
                op: 'move', data: [
                    x1 + _offsetOpt(offset, o, roughnessGain),
                    y1 + _offsetOpt(offset, o, roughnessGain)
                ]
            });
        }
    }
    if (overlay) {
        ops.push({
            op: 'bcurveTo', data: [
                midDispX + x1 + (x2 - x1) * divergePoint + randomHalf(),
                midDispY + y1 + (y2 - y1) * divergePoint + randomHalf(),
                midDispX + x1 + 2 * (x2 - x1) * divergePoint + randomHalf(),
                midDispY + y1 + 2 * (y2 - y1) * divergePoint + randomHalf(),
                x2 + randomHalf(),
                y2 + randomHalf()
            ]
        });
    }
    else {
        ops.push({
            op: 'bcurveTo', data: [
                midDispX + x1 + (x2 - x1) * divergePoint + randomFull(),
                midDispY + y1 + (y2 - y1) * divergePoint + randomFull(),
                midDispX + x1 + 2 * (x2 - x1) * divergePoint + randomFull(),
                midDispY + y1 + 2 * (y2 - y1) * divergePoint + randomFull(),
                x2 + randomFull(),
                y2 + randomFull()
            ]
        });
    }
    return ops;
}
function _curve(points, closePoint, o) {
    const len = points.length;
    const ops = [];
    if (len > 3) {
        const b = [];
        const s = 1 - o.curveTightness;
        ops.push({ op: 'move', data: [points[1][0], points[1][1]] });
        for (let i = 1; (i + 2) < len; i++) {
            const cachedVertArray = points[i];
            b[0] = [cachedVertArray[0], cachedVertArray[1]];
            b[1] = [cachedVertArray[0] + (s * points[i + 1][0] - s * points[i - 1][0]) / 6, cachedVertArray[1] + (s * points[i + 1][1] - s * points[i - 1][1]) / 6];
            b[2] = [points[i + 1][0] + (s * points[i][0] - s * points[i + 2][0]) / 6, points[i + 1][1] + (s * points[i][1] - s * points[i + 2][1]) / 6];
            b[3] = [points[i + 1][0], points[i + 1][1]];
            ops.push({ op: 'bcurveTo', data: [b[1][0], b[1][1], b[2][0], b[2][1], b[3][0], b[3][1]] });
        }
        if (closePoint && closePoint.length === 2) {
            const ro = o.maxRandomnessOffset;
            ops.push({ op: 'lineTo', data: [closePoint[0] + _offsetOpt(ro, o), closePoint[1] + _offsetOpt(ro, o)] });
        }
    }
    else if (len === 3) {
        ops.push({ op: 'move', data: [points[1][0], points[1][1]] });
        ops.push({
            op: 'bcurveTo', data: [
                points[1][0], points[1][1],
                points[2][0], points[2][1],
                points[2][0], points[2][1]
            ]
        });
    }
    else if (len === 2) {
        ops.push(..._doubleLine(points[0][0], points[0][1], points[1][0], points[1][1], o));
    }
    return ops;
}
function _computeEllipsePoints(increment, cx, cy, rx, ry, offset, overlap, o) {
    const corePoints = [];
    const allPoints = [];
    const radOffset = _offsetOpt(0.5, o) - (Math.PI / 2);
    allPoints.push([
        _offsetOpt(offset, o) + cx + 0.9 * rx * Math.cos(radOffset - increment),
        _offsetOpt(offset, o) + cy + 0.9 * ry * Math.sin(radOffset - increment)
    ]);
    for (let angle = radOffset; angle < (Math.PI * 2 + radOffset - 0.01); angle = angle + increment) {
        const p = [
            _offsetOpt(offset, o) + cx + rx * Math.cos(angle),
            _offsetOpt(offset, o) + cy + ry * Math.sin(angle)
        ];
        corePoints.push(p);
        allPoints.push(p);
    }
    allPoints.push([
        _offsetOpt(offset, o) + cx + rx * Math.cos(radOffset + Math.PI * 2 + overlap * 0.5),
        _offsetOpt(offset, o) + cy + ry * Math.sin(radOffset + Math.PI * 2 + overlap * 0.5)
    ]);
    allPoints.push([
        _offsetOpt(offset, o) + cx + 0.98 * rx * Math.cos(radOffset + overlap),
        _offsetOpt(offset, o) + cy + 0.98 * ry * Math.sin(radOffset + overlap)
    ]);
    allPoints.push([
        _offsetOpt(offset, o) + cx + 0.9 * rx * Math.cos(radOffset + overlap * 0.5),
        _offsetOpt(offset, o) + cy + 0.9 * ry * Math.sin(radOffset + overlap * 0.5)
    ]);
    return [allPoints, corePoints];
}

const defaultOptions = {
    maxRandomnessOffset: 2,
    roughness: 1.5,
    bowing: 1,
    stroke: '#000',
    strokeWidth: 1.5,
    curveTightness: 0,
    curveFitting: 0.95,
    curveStepCount: 9,
    fillStyle: 'hachure',
    fillWeight: -1,
    hachureAngle: -41,
    hachureGap: -1,
    dashOffset: -1,
    dashGap: -1,
    zigzagOffset: -1,
    seed: 0,
    combineNestedSvgPaths: false,
    disableMultiStroke: false,
    disableMultiStrokeFill: false
};
const singleStrokeOptions = JSON.parse(JSON.stringify(defaultOptions));
singleStrokeOptions.disableMultiStroke = true;
const highlightOptions = JSON.parse(JSON.stringify(defaultOptions));
highlightOptions.roughness = 3;
highlightOptions.disableMultiStroke = true;
function renderAnnotation(svg, rect, config, animationGroupDelay) {
    const opList = [];
    let strokeWidth = config.strokeWidth || 2;
    const padding = (config.padding === 0) ? 0 : (config.padding || 5);
    const animate = (config.animate === undefined) ? true : (!!config.animate);
    switch (config.type) {
        case 'underline': {
            const y = rect.y + rect.h + padding;
            opList.push(line(rect.x, y, rect.x + rect.w, y, singleStrokeOptions));
            opList.push(line(rect.x + rect.w, y, rect.x, y, singleStrokeOptions));
            break;
        }
        case 'strike-through': {
            const y = rect.y + (rect.h / 2);
            opList.push(line(rect.x, y, rect.x + rect.w, y, singleStrokeOptions));
            opList.push(line(rect.x + rect.w, y, rect.x, y, singleStrokeOptions));
            break;
        }
        case 'box': {
            const x = rect.x - padding;
            const y = rect.y - padding;
            const width = rect.w + (2 * padding);
            const height = rect.h + (2 * padding);
            opList.push(rectangle(x, y, width, height, singleStrokeOptions));
            opList.push(rectangle(x, y, width, height, singleStrokeOptions));
            break;
        }
        case 'crossed-off': {
            const x = rect.x;
            const y = rect.y;
            const x2 = x + rect.w;
            const y2 = y + rect.h;
            opList.push(line(x, y, x2, y2, singleStrokeOptions));
            opList.push(line(x2, y2, x, y, singleStrokeOptions));
            opList.push(line(x2, y, x, y2, singleStrokeOptions));
            opList.push(line(x, y2, x2, y, singleStrokeOptions));
            break;
        }
        case 'circle': {
            const p2 = padding * 2;
            const width = rect.w + (2 * p2);
            const height = rect.h + (2 * p2);
            const x = rect.x - p2 + (width / 2);
            const y = rect.y - p2 + (height / 2);
            opList.push(ellipse(x, y, width, height, defaultOptions));
            break;
        }
        case 'highlight': {
            strokeWidth = rect.h * 0.95;
            const y = rect.y + (rect.h / 2);
            opList.push(line(rect.x, y, rect.x + rect.w, y, highlightOptions));
            opList.push(line(rect.x + rect.w, y, rect.x, y, highlightOptions));
            break;
        }
    }
    if (opList.length) {
        const pathStrings = opsToPath(opList);
        const lengths = [];
        const pathElements = [];
        let totalLength = 0;
        const totalDuration = config.animationDuration === 0 ? 0 : (config.animationDuration || DEFAULT_ANIMATION_DURATION);
        const initialDelay = (config.animationDelay === 0 ? 0 : (config.animationDelay || 0)) + (animationGroupDelay || 0);
        for (const d of pathStrings) {
            const path = document.createElementNS(SVG_NS, 'path');
            path.setAttribute('d', d);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', config.color || 'currentColor');
            path.setAttribute('stroke-width', `${strokeWidth}`);
            if (animate) {
                const length = path.getTotalLength();
                lengths.push(length);
                totalLength += length;
            }
            svg.appendChild(path);
            pathElements.push(path);
        }
        if (animate) {
            let durationOffset = 0;
            for (let i = 0; i < pathElements.length; i++) {
                const path = pathElements[i];
                const length = lengths[i];
                const duration = totalLength ? (totalDuration * (length / totalLength)) : 0;
                const delay = initialDelay + durationOffset;
                const style = path.style;
                style.strokeDashoffset = `${length}`;
                style.strokeDasharray = `${length}`;
                style.animation = `rough-notation-dash ${duration}ms ease-out ${delay}ms forwards`;
                durationOffset += duration;
            }
        }
    }
}
function opsToPath(opList) {
    const paths = [];
    for (const drawing of opList) {
        let path = '';
        for (const item of drawing.ops) {
            const data = item.data;
            switch (item.op) {
                case 'move':
                    if (path.trim()) {
                        paths.push(path.trim());
                    }
                    path = `M${data[0]} ${data[1]} `;
                    break;
                case 'bcurveTo':
                    path += `C${data[0]} ${data[1]}, ${data[2]} ${data[3]}, ${data[4]} ${data[5]} `;
                    break;
                case 'lineTo':
                    path += `L${data[0]} ${data[1]} `;
                    break;
            }
        }
        if (path.trim()) {
            paths.push(path.trim());
        }
    }
    return paths;
}

function ensureKeyframes() {
    if (!window.__rough_notation_keyframe_styles) {
        const style = window.__rough_notation_keyframe_styles = document.createElement('style');
        style.textContent = `
    @keyframes rough-notation-dash {
      to {
        stroke-dashoffset: 0;
      }
    }
    `;
        document.head.appendChild(style);
    }
}

class RoughAnnotationImpl {
    constructor(e, config) {
        this._state = 'unattached';
        this._resizing = false;
        this._animationGroupDelay = 0;
        this._resizeListener = () => {
            if (!this._resizing) {
                this._resizing = true;
                setTimeout(() => {
                    this._resizing = false;
                    if (this._state === 'showing') {
                        const newSize = this.computeSize();
                        if (newSize && this.hasRectChanged(newSize)) {
                            this.show();
                        }
                    }
                }, 400);
            }
        };
        this._e = e;
        this._config = config;
        this.attach();
    }
    get config() {
        return this._config;
    }
    attach() {
        if (this._state === 'unattached' && this._e.parentElement) {
            ensureKeyframes();
            const svg = this._svg = document.createElementNS(SVG_NS, 'svg');
            const style = svg.style;
            style.position = 'absolute';
            style.top = '0';
            style.left = '0';
            style.overflow = 'visible';
            style.pointerEvents = 'none';
            style.width = '100px';
            style.height = '100px';
            const prepend = this._config.type === 'highlight';
            this._e.insertAdjacentElement(prepend ? 'beforebegin' : 'afterend', svg);
            this._state = 'not-showing';
            // ensure e is positioned
            if (prepend) {
                const computedPos = window.getComputedStyle(this._e).position;
                const unpositioned = (!computedPos) || (computedPos === 'static');
                if (unpositioned) {
                    this._e.style.position = 'relative';
                }
            }
            this.attachListeners();
        }
    }
    detachListeners() {
        window.removeEventListener('resize', this._resizeListener);
        if (this._resizeObserver) {
            this._resizeObserver.unobserve(this._e);
        }
    }
    attachListeners() {
        this.detachListeners();
        window.addEventListener('resize', this._resizeListener, { passive: true });
        if ((!this._resizeObserver) && ('ResizeObserver' in window)) {
            this._resizeObserver = new window.ResizeObserver((entries) => {
                for (const entry of entries) {
                    let trigger = true;
                    if (entry.contentRect) {
                        const newRect = this.computeSizeWithBounds(entry.contentRect);
                        if (newRect && (!this.hasRectChanged(newRect))) {
                            trigger = false;
                        }
                    }
                    if (trigger) {
                        this._resizeListener();
                    }
                }
            });
        }
        if (this._resizeObserver) {
            this._resizeObserver.observe(this._e);
        }
    }
    sameInteger(a, b) {
        return Math.round(a) === Math.round(b);
    }
    hasRectChanged(rect) {
        if (this._lastSize && rect) {
            return !(this.sameInteger(rect.x, this._lastSize.x) &&
                this.sameInteger(rect.y, this._lastSize.y) &&
                this.sameInteger(rect.w, this._lastSize.w) &&
                this.sameInteger(rect.h, this._lastSize.h));
        }
        return true;
    }
    isShowing() {
        return (this._state !== 'not-showing');
    }
    show() {
        switch (this._state) {
            case 'unattached':
                break;
            case 'showing':
                this.hide();
                this.show();
                break;
            case 'not-showing':
                this.attach();
                if (this._svg) {
                    this.render(this._svg);
                }
                break;
        }
    }
    hide() {
        if (this._svg) {
            while (this._svg.lastChild) {
                this._svg.removeChild(this._svg.lastChild);
            }
        }
        this._state = 'not-showing';
    }
    remove() {
        if (this._svg && this._svg.parentElement) {
            this._svg.parentElement.removeChild(this._svg);
        }
        this._svg = undefined;
        this._state = 'unattached';
        this.detachListeners();
    }
    render(svg) {
        const rect = this.computeSize();
        if (rect) {
            renderAnnotation(svg, rect, this._config, this._animationGroupDelay);
            this._lastSize = rect;
            this._state = 'showing';
        }
    }
    computeSize() {
        return this.computeSizeWithBounds(this._e.getBoundingClientRect());
    }
    computeSizeWithBounds(bounds) {
        if (this._svg) {
            const rect1 = this._svg.getBoundingClientRect();
            const rect2 = bounds;
            const x = (rect2.x || rect2.left) - (rect1.x || rect1.left);
            const y = (rect2.y || rect2.top) - (rect1.y || rect1.top);
            const w = rect2.width;
            const h = rect2.height;
            return { x, y, w, h };
        }
        return null;
    }
}
function annotate(element, config) {
    return new RoughAnnotationImpl(element, config);
}
function annotationGroup(annotations) {
    let delay = 0;
    for (const a of annotations) {
        const ai = a;
        ai._animationGroupDelay = delay;
        const duration = ai.config.animationDuration === 0 ? 0 : (ai.config.animationDuration || DEFAULT_ANIMATION_DURATION);
        delay += duration;
    }
    const list = [...annotations];
    return {
        show() {
            for (const a of list) {
                a.show();
            }
        },
        hide() {
            for (const a of list) {
                a.hide();
            }
        }
    };
}

var GroupContext = React.createContext(null);
var GroupDispatchContext = React.createContext(null);
var initialState = {
    annotations: [],
};
function reducer(state, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case "ADD":
            return __assign(__assign({}, state), { annotations: __spreadArrays(state.annotations, [payload]) });
        default:
            return state;
    }
}
function RoughNotationGroup(_a) {
    var children = _a.children, show = _a.show;
    var _b = React.useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    React.useEffect(function () {
        var group = annotationGroup(state.annotations.map(function (_a) {
            var current = _a.current;
            return current;
        }));
        if (show) {
            group.show();
        }
        else {
            group.hide();
        }
    }, [show, state]);
    return (React__default.createElement(GroupContext.Provider, { value: state },
        React__default.createElement(GroupDispatchContext.Provider, { value: dispatch }, children)));
}
function useGroupContext(annotation) {
    var context = React.useContext(GroupContext);
    var dispatch = React.useContext(GroupDispatchContext);
    if (!context) {
        return undefined;
    }
    React.useEffect(function () {
        if (dispatch) {
            dispatch({
                type: "ADD",
                payload: annotation,
            });
        }
    }, []);
    return;
}

function RoughNotation(_a) {
    var _b = _a.animate, animate = _b === void 0 ? true : _b, _c = _a.animationDelay, animationDelay = _c === void 0 ? 0 : _c, _d = _a.animationDuration, animationDuration = _d === void 0 ? 800 : _d, children = _a.children, color = _a.color, _e = _a.customElement, customElement = _e === void 0 ? "span" : _e, getAnnotationObject = _a.getAnnotationObject, _f = _a.padding, padding = _f === void 0 ? 5 : _f, _g = _a.show, show = _g === void 0 ? false : _g, _h = _a.strokeWidth, strokeWidth = _h === void 0 ? 1 : _h, type = _a.type, rest = __rest(_a, ["animate", "animationDelay", "animationDuration", "children", "color", "customElement", "getAnnotationObject", "padding", "show", "strokeWidth", "type"]);
    var element = React.useRef(document.createElement("span"));
    var annotation = React.useRef({
        remove: function () { },
        show: function () { },
        hide: function () { },
    });
    useGroupContext(annotation);
    React.useEffect(function () {
        annotation.current = annotate(element.current, {
            animate: animate,
            animationDelay: animationDelay,
            animationDuration: animationDuration,
            color: color,
            padding: padding,
            strokeWidth: strokeWidth,
            type: type,
        });
        if (getAnnotationObject) {
            getAnnotationObject(annotation.current);
        }
        return function () {
            annotation.current.remove();
        };
    }, [
        animate,
        animationDelay,
        animationDuration,
        color,
        padding,
        strokeWidth,
        type,
        getAnnotationObject,
    ]);
    React.useEffect(function () {
        if (show) {
            annotation.current.show();
        }
        else {
            annotation.current.hide();
        }
    }, [show, annotation]);
    return React__default.createElement(customElement, __assign({ ref: element }, rest), children);
}

exports.RoughNotation = RoughNotation;
exports.RoughNotationGroup = RoughNotationGroup;
//# sourceMappingURL=main.js.map
