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

const t="http://www.w3.org/2000/svg";class e{constructor(t){this.seed=t;}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function s(t,e,s,i,n){return {type:"path",ops:c(t,e,s,i,n)}}function i(t,e){return function(t,e,i){const n=(t||[]).length;if(n>2){const s=[];for(let e=0;e<n-1;e++)s.push(...c(t[e][0],t[e][1],t[e+1][0],t[e+1][1],i));return e&&s.push(...c(t[n-1][0],t[n-1][1],t[0][0],t[0][1],i)),{type:"path",ops:s}}return 2===n?s(t[0][0],t[0][1],t[1][0],t[1][1],i):{type:"path",ops:[]}}(t,!0,e)}function n(t,e,s,n,o){return i([[t,e],[t+s,e],[t+s,e+n],[t,e+n]],o)}function o(t,e,s,i,n){return function(t,e,s,i){const[n,o]=f(i.increment,t,e,i.rx,i.ry,1,i.increment*h(.1,h(.4,1,s),s),s);let r=l(n,null,s);if(!s.disableMultiStroke){const[n]=f(i.increment,t,e,i.rx,i.ry,1.5,0,s),o=l(n,null,s);r=r.concat(o);}return {estimatedPoints:o,opset:{type:"path",ops:r}}}(t,e,n,function(t,e,s){const i=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(t/2,2)+Math.pow(e/2,2))/2)),n=Math.max(s.curveStepCount,s.curveStepCount/Math.sqrt(200)*i),o=2*Math.PI/n;let r=Math.abs(t/2),h=Math.abs(e/2);const c=1-s.curveFitting;return r+=a(r*c,s),h+=a(h*c,s),{increment:o,rx:r,ry:h}}(s,i,n)).opset}function r(t){return t.randomizer||(t.randomizer=new e(t.seed||0)),t.randomizer.next()}function h(t,e,s,i=1){return s.roughness*i*(r(s)*(e-t)+t)}function a(t,e,s=1){return h(-t,t,e,s)}function c(t,e,s,i,n,o=!1){const r=o?n.disableMultiStrokeFill:n.disableMultiStroke,h=u(t,e,s,i,n,!0,!1);if(r)return h;const a=u(t,e,s,i,n,!0,!0);return h.concat(a)}function u(t,e,s,i,n,o,h){const c=Math.pow(t-s,2)+Math.pow(e-i,2),u=Math.sqrt(c);let l=1;l=u<200?1:u>500?.4:-.0016668*u+1.233334;let f=n.maxRandomnessOffset||0;f*f*100>c&&(f=u/10);const g=f/2,d=.2+.2*r(n);let p=n.bowing*n.maxRandomnessOffset*(i-e)/200,_=n.bowing*n.maxRandomnessOffset*(t-s)/200;p=a(p,n,l),_=a(_,n,l);const m=[],w=()=>a(g,n,l),v=()=>a(f,n,l);return o&&(h?m.push({op:"move",data:[t+w(),e+w()]}):m.push({op:"move",data:[t+a(f,n,l),e+a(f,n,l)]})),h?m.push({op:"bcurveTo",data:[p+t+(s-t)*d+w(),_+e+(i-e)*d+w(),p+t+2*(s-t)*d+w(),_+e+2*(i-e)*d+w(),s+w(),i+w()]}):m.push({op:"bcurveTo",data:[p+t+(s-t)*d+v(),_+e+(i-e)*d+v(),p+t+2*(s-t)*d+v(),_+e+2*(i-e)*d+v(),s+v(),i+v()]}),m}function l(t,e,s){const i=t.length,n=[];if(i>3){const o=[],r=1-s.curveTightness;n.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<i;e++){const s=t[e];o[0]=[s[0],s[1]],o[1]=[s[0]+(r*t[e+1][0]-r*t[e-1][0])/6,s[1]+(r*t[e+1][1]-r*t[e-1][1])/6],o[2]=[t[e+1][0]+(r*t[e][0]-r*t[e+2][0])/6,t[e+1][1]+(r*t[e][1]-r*t[e+2][1])/6],o[3]=[t[e+1][0],t[e+1][1]],n.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[3][0],o[3][1]]});}if(e&&2===e.length){const t=s.maxRandomnessOffset;n.push({op:"lineTo",data:[e[0]+a(t,s),e[1]+a(t,s)]});}}else 3===i?(n.push({op:"move",data:[t[1][0],t[1][1]]}),n.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===i&&n.push(...c(t[0][0],t[0][1],t[1][0],t[1][1],s));return n}function f(t,e,s,i,n,o,r,h){const c=[],u=[],l=a(.5,h)-Math.PI/2;u.push([a(o,h)+e+.9*i*Math.cos(l-t),a(o,h)+s+.9*n*Math.sin(l-t)]);for(let r=l;r<2*Math.PI+l-.01;r+=t){const t=[a(o,h)+e+i*Math.cos(r),a(o,h)+s+n*Math.sin(r)];c.push(t),u.push(t);}return u.push([a(o,h)+e+i*Math.cos(l+2*Math.PI+.5*r),a(o,h)+s+n*Math.sin(l+2*Math.PI+.5*r)]),u.push([a(o,h)+e+.98*i*Math.cos(l+r),a(o,h)+s+.98*n*Math.sin(l+r)]),u.push([a(o,h)+e+.9*i*Math.cos(l+.5*r),a(o,h)+s+.9*n*Math.sin(l+.5*r)]),[u,c]}const g={maxRandomnessOffset:2,roughness:1.5,bowing:1,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,seed:0,combineNestedSvgPaths:!1,disableMultiStroke:!1,disableMultiStrokeFill:!1};function d(t,e){const s=JSON.parse(JSON.stringify(g));switch(t){case"highlight":s.roughness=3,s.disableMultiStroke=!0;break;case"single":s.disableMultiStroke=!0;}return s.seed=e,s}function p(e,i,r,h,a){const c=[];let u=r.strokeWidth||2;const l=function(t){const e=t.padding;if(e||0===e){if("number"==typeof e)return [e,e,e,e];if(Array.isArray(e)){const t=e;if(t.length)switch(t.length){case 4:return [...t];case 1:return [t[0],t[0],t[0],t[0]];case 2:return [...t,...t];case 3:return [...t,t[1]];default:return [t[0],t[1],t[2],t[3]]}}}return [5,5,5,5]}(r),f=void 0===r.animate||!!r.animate,g=r.iterations||2;switch(r.type){case"underline":{const t=d("single",a),e=i.y+i.h+l[2];for(let n=0;n<g;n++)n%2?c.push(s(i.x+i.w,e,i.x,e,t)):c.push(s(i.x,e,i.x+i.w,e,t));break}case"strike-through":{const t=d("single",a),e=i.y+i.h/2;for(let n=0;n<g;n++)n%2?c.push(s(i.x+i.w,e,i.x,e,t)):c.push(s(i.x,e,i.x+i.w,e,t));break}case"box":{const t=d("single",a),e=i.x-l[3],s=i.y-l[0],o=i.w+(l[1]+l[3]),r=i.h+(l[0]+l[2]);for(let i=0;i<g;i++)c.push(n(e,s,o,r,t));break}case"crossed-off":{const t=d("single",a),e=i.x,n=i.y,o=e+i.w,r=n+i.h;for(let i=0;i<g;i++)i%2?c.push(s(o,r,e,n,t)):c.push(s(e,n,o,r,t));for(let i=0;i<g;i++)i%2?c.push(s(e,r,o,n,t)):c.push(s(o,n,e,r,t));break}case"circle":{const t=d("single",a),e=d("double",a),s=i.w+(l[1]+l[3]),n=i.h+(l[0]+l[2]),r=i.x-l[3]+s/2,h=i.y-l[0]+n/2,u=Math.floor(g/2),f=g-2*u;for(let t=0;t<u;t++)c.push(o(r,h,s,n,e));for(let e=0;e<f;e++)c.push(o(r,h,s,n,t));break}case"highlight":{const t=d("highlight",a);u=.95*i.h;const e=i.y+i.h/2;for(let n=0;n<g;n++)n%2?c.push(s(i.x+i.w,e,i.x,e,t)):c.push(s(i.x,e,i.x+i.w,e,t));break}}if(c.length){const s=function(t){const e=[];for(const s of t){let t="";for(const i of s.ops){const s=i.data;switch(i.op){case"move":t.trim()&&e.push(t.trim()),t=`M${s[0]} ${s[1]} `;break;case"bcurveTo":t+=`C${s[0]} ${s[1]}, ${s[2]} ${s[3]}, ${s[4]} ${s[5]} `;break;case"lineTo":t+=`L${s[0]} ${s[1]} `;}}t.trim()&&e.push(t.trim());}return e}(c),i=[],n=[];let o=0;const a=0===r.animationDuration?0:r.animationDuration||800,l=(0===r.animationDelay?0:r.animationDelay||0)+(h||0);for(const h of s){const s=document.createElementNS(t,"path");if(s.setAttribute("d",h),s.setAttribute("fill","none"),s.setAttribute("stroke",r.color||"currentColor"),s.setAttribute("stroke-width",""+u),f){const t=s.getTotalLength();i.push(t),o+=t;}e.appendChild(s),n.push(s);}if(f){let t=0;for(let e=0;e<n.length;e++){const s=n[e],r=i[e],h=o?a*(r/o):0,c=l+t,u=s.style;u.strokeDashoffset=""+r,u.strokeDasharray=""+r,u.animation=`rough-notation-dash ${h}ms ease-out ${c}ms forwards`,t+=h;}}}}class _{constructor(t,e){this._state="unattached",this._resizing=!1,this._seed=Math.floor(Math.random()*2**31),this._animationGroupDelay=0,this._resizeListener=()=>{this._resizing||(this._resizing=!0,setTimeout(()=>{if(this._resizing=!1,"showing"===this._state){const t=this.size();t&&this.hasRectChanged(t)&&this.show();}},400));},this._e=t,this._config=JSON.parse(JSON.stringify(e)),this.attach();}get animate(){return this._config.animate}set animate(t){this._config.animate=t;}get animationDuration(){return this._config.animationDuration}set animationDuration(t){this._config.animationDuration=t;}get animationDelay(){return this._config.animationDelay}set animationDelay(t){this._config.animationDelay=t;}get iterations(){return this._config.iterations}set iterations(t){this._config.iterations=t;}get color(){return this._config.color}set color(t){this._config.color!==t&&(this._config.color=t,this.refresh());}get strokeWidth(){return this._config.strokeWidth}set strokeWidth(t){this._config.strokeWidth!==t&&(this._config.strokeWidth=t,this.refresh());}get padding(){return this._config.padding}set padding(t){this._config.padding!==t&&(this._config.padding=t,this.refresh());}attach(){if("unattached"===this._state&&this._e.parentElement){!function(){if(!window.__rno_kf_s){const t=window.__rno_kf_s=document.createElement("style");t.textContent="@keyframes rough-notation-dash { to { stroke-dashoffset: 0; } }",document.head.appendChild(t);}}();const e=this._svg=document.createElementNS(t,"svg");e.setAttribute("class","rough-annotation");const s=e.style;s.position="absolute",s.top="0",s.left="0",s.overflow="visible",s.pointerEvents="none",s.width="100px",s.height="100px";const i="highlight"===this._config.type;if(this._e.insertAdjacentElement(i?"beforebegin":"afterend",e),this._state="not-showing",i){const t=window.getComputedStyle(this._e).position;(!t||"static"===t)&&(this._e.style.position="relative");}this.attachListeners();}}detachListeners(){window.removeEventListener("resize",this._resizeListener),this._ro&&this._ro.unobserve(this._e);}attachListeners(){this.detachListeners(),window.addEventListener("resize",this._resizeListener,{passive:!0}),!this._ro&&"ResizeObserver"in window&&(this._ro=new window.ResizeObserver(t=>{for(const e of t){let t=!0;if(e.contentRect){const s=this.sizeFor(e.contentRect);s&&!this.hasRectChanged(s)&&(t=!1);}t&&this._resizeListener();}})),this._ro&&this._ro.observe(this._e);}sameInteger(t,e){return Math.round(t)===Math.round(e)}hasRectChanged(t){return !this._lastSize||!t||!(this.sameInteger(t.x,this._lastSize.x)&&this.sameInteger(t.y,this._lastSize.y)&&this.sameInteger(t.w,this._lastSize.w)&&this.sameInteger(t.h,this._lastSize.h))}isShowing(){return "not-showing"!==this._state}refresh(){this.isShowing()&&!this.pendingRefresh&&(this.pendingRefresh=Promise.resolve().then(()=>{this.isShowing()&&this.show(),delete this.pendingRefresh;}));}show(){switch(this._state){case"unattached":break;case"showing":this.hide(),this._svg&&this.render(this._svg,!0);break;case"not-showing":this.attach(),this._svg&&this.render(this._svg,!1);}}hide(){if(this._svg)for(;this._svg.lastChild;)this._svg.removeChild(this._svg.lastChild);this._state="not-showing";}remove(){this._svg&&this._svg.parentElement&&this._svg.parentElement.removeChild(this._svg),this._svg=void 0,this._state="unattached",this.detachListeners();}render(t,e){const s=this.size();if(s){let i=this._config;e&&(i=JSON.parse(JSON.stringify(this._config)),i.animate=!1),p(t,s,i,this._animationGroupDelay,this._seed),this._lastSize=s,this._state="showing";}}size(){return this.sizeFor(this._e.getBoundingClientRect())}sizeFor(t){if(this._svg){const e=this._svg.getBoundingClientRect(),s=t;return {x:(s.x||s.left)-(e.x||e.left),y:(s.y||s.top)-(e.y||e.top),w:s.width,h:s.height}}return null}}function m(t,e){return new _(t,e)}function w(t){let e=0;for(const s of t){const t=s;t._animationGroupDelay=e;e+=0===t.animationDuration?0:t.animationDuration||800;}const s=[...t];return {show(){for(const t of s)t.show();},hide(){for(const t of s)t.hide();}}}

var GroupContext = React.createContext(null);
var GroupDispatchContext = React.createContext(null);
var initialState = {
    annotations: [],
};
function reducer(state, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case "ADD":
            var annotations = __spreadArrays(state.annotations, [payload]);
            var annotationsToSort = annotations.reduce(function (toSort, annotation) {
                var newAnnotations = __assign({}, toSort);
                if (annotation.order !== undefined) {
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
        default:
            return state;
    }
}
function RoughNotationGroup(_a) {
    var children = _a.children, show = _a.show;
    var _b = React.useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    React.useEffect(function () {
        var group = w(state.annotations.map(function (_a) {
            var annotation = _a.annotation;
            return annotation.current;
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
function useGroupContext(annotation, order) {
    var context = React.useContext(GroupContext);
    var dispatch = React.useContext(GroupDispatchContext);
    if (!context) {
        return undefined;
    }
    React.useEffect(function () {
        if (dispatch) {
            dispatch({
                type: "ADD",
                payload: { annotation: annotation, order: order },
            });
        }
    }, []);
    return;
}

function RoughNotation(_a) {
    var _b = _a.animate, animate = _b === void 0 ? true : _b, _c = _a.animationDelay, animationDelay = _c === void 0 ? 0 : _c, _d = _a.animationDuration, animationDuration = _d === void 0 ? 800 : _d, children = _a.children, color = _a.color, _e = _a.customElement, customElement = _e === void 0 ? "span" : _e, getAnnotationObject = _a.getAnnotationObject, _f = _a.iterations, iterations = _f === void 0 ? 2 : _f, order = _a.order, _g = _a.padding, padding = _g === void 0 ? 5 : _g, _h = _a.show, show = _h === void 0 ? false : _h, _j = _a.strokeWidth, strokeWidth = _j === void 0 ? 1 : _j, type = _a.type, rest = __rest(_a, ["animate", "animationDelay", "animationDuration", "children", "color", "customElement", "getAnnotationObject", "iterations", "order", "padding", "show", "strokeWidth", "type"]);
    var element = React.useRef(document.createElement("span"));
    var annotation = React.useRef();
    useGroupContext(annotation, typeof order === "string" ? parseInt(order) : order);
    React.useEffect(function () {
        annotation.current = m(element.current, {
            animate: animate,
            animationDelay: animationDelay,
            animationDuration: animationDuration,
            color: color,
            iterations: iterations,
            padding: padding,
            strokeWidth: strokeWidth,
            type: type,
        });
        if (getAnnotationObject) {
            getAnnotationObject(annotation.current);
        }
        return function () {
            var _a, _b;
            (_b = (_a = annotation.current) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
    }, []);
    React.useEffect(function () {
        var _a, _b, _c, _d;
        if (show) {
            (_b = (_a = annotation.current) === null || _a === void 0 ? void 0 : _a.show) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        else {
            (_d = (_c = annotation.current) === null || _c === void 0 ? void 0 : _c.hide) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
    }, [annotation, show]);
    React.useEffect(function () {
        if (annotation.current) {
            annotation.current.animate = animate;
            annotation.current.animationDuration = animationDuration;
            annotation.current.color = color;
            annotation.current.strokeWidth = strokeWidth;
            annotation.current.padding = padding;
        }
    }, [
        annotation,
        animate,
        animationDelay,
        animationDuration,
        color,
        strokeWidth,
        padding,
    ]);
    return React__default.createElement(customElement, __assign({ ref: element }, rest), children);
}

exports.RoughNotation = RoughNotation;
exports.RoughNotationGroup = RoughNotationGroup;
//# sourceMappingURL=main.js.map
