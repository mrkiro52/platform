(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();function Td(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var so={exports:{}},hr={},no={exports:{}},B={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ln=Symbol.for("react.element"),Cd=Symbol.for("react.portal"),Od=Symbol.for("react.fragment"),Ld=Symbol.for("react.strict_mode"),Dd=Symbol.for("react.profiler"),Ad=Symbol.for("react.provider"),Rd=Symbol.for("react.context"),Pd=Symbol.for("react.forward_ref"),Id=Symbol.for("react.suspense"),bd=Symbol.for("react.memo"),Bd=Symbol.for("react.lazy"),Gl=Symbol.iterator;function zd(e){return e===null||typeof e!="object"?null:(e=Gl&&e[Gl]||e["@@iterator"],typeof e=="function"?e:null)}var ro={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},io=Object.assign,lo={};function ys(e,s,n){this.props=e,this.context=s,this.refs=lo,this.updater=n||ro}ys.prototype.isReactComponent={};ys.prototype.setState=function(e,s){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,s,"setState")};ys.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ao(){}ao.prototype=ys.prototype;function Qi(e,s,n){this.props=e,this.context=s,this.refs=lo,this.updater=n||ro}var Ki=Qi.prototype=new ao;Ki.constructor=Qi;io(Ki,ys.prototype);Ki.isPureReactComponent=!0;var $l=Array.isArray,oo=Object.prototype.hasOwnProperty,Yi={current:null},co={key:!0,ref:!0,__self:!0,__source:!0};function uo(e,s,n){var r,i={},l=null,a=null;if(s!=null)for(r in s.ref!==void 0&&(a=s.ref),s.key!==void 0&&(l=""+s.key),s)oo.call(s,r)&&!co.hasOwnProperty(r)&&(i[r]=s[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var c=Array(o),u=0;u<o;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return{$$typeof:ln,type:e,key:l,ref:a,props:i,_owner:Yi.current}}function Fd(e,s){return{$$typeof:ln,type:e.type,key:s,ref:e.ref,props:e.props,_owner:e._owner}}function Ji(e){return typeof e=="object"&&e!==null&&e.$$typeof===ln}function Md(e){var s={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return s[n]})}var Wl=/\/+/g;function Cr(e,s){return typeof e=="object"&&e!==null&&e.key!=null?Md(""+e.key):s.toString(36)}function Ln(e,s,n,r,i){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(l){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case ln:case Cd:a=!0}}if(a)return a=e,i=i(a),e=r===""?"."+Cr(a,0):r,$l(i)?(n="",e!=null&&(n=e.replace(Wl,"$&/")+"/"),Ln(i,s,n,"",function(u){return u})):i!=null&&(Ji(i)&&(i=Fd(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(Wl,"$&/")+"/")+e)),s.push(i)),1;if(a=0,r=r===""?".":r+":",$l(e))for(var o=0;o<e.length;o++){l=e[o];var c=r+Cr(l,o);a+=Ln(l,s,n,c,i)}else if(c=zd(e),typeof c=="function")for(e=c.call(e),o=0;!(l=e.next()).done;)l=l.value,c=r+Cr(l,o++),a+=Ln(l,s,n,c,i);else if(l==="object")throw s=String(e),Error("Objects are not valid as a React child (found: "+(s==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":s)+"). If you meant to render a collection of children, use an array instead.");return a}function mn(e,s,n){if(e==null)return e;var r=[],i=0;return Ln(e,r,"","",function(l){return s.call(n,l,i++)}),r}function Hd(e){if(e._status===-1){var s=e._result;s=s(),s.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=s)}if(e._status===1)return e._result.default;throw e._result}var me={current:null},Dn={transition:null},Ud={ReactCurrentDispatcher:me,ReactCurrentBatchConfig:Dn,ReactCurrentOwner:Yi};function ho(){throw Error("act(...) is not supported in production builds of React.")}B.Children={map:mn,forEach:function(e,s,n){mn(e,function(){s.apply(this,arguments)},n)},count:function(e){var s=0;return mn(e,function(){s++}),s},toArray:function(e){return mn(e,function(s){return s})||[]},only:function(e){if(!Ji(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};B.Component=ys;B.Fragment=Od;B.Profiler=Dd;B.PureComponent=Qi;B.StrictMode=Ld;B.Suspense=Id;B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ud;B.act=ho;B.cloneElement=function(e,s,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=io({},e.props),i=e.key,l=e.ref,a=e._owner;if(s!=null){if(s.ref!==void 0&&(l=s.ref,a=Yi.current),s.key!==void 0&&(i=""+s.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(c in s)oo.call(s,c)&&!co.hasOwnProperty(c)&&(r[c]=s[c]===void 0&&o!==void 0?o[c]:s[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){o=Array(c);for(var u=0;u<c;u++)o[u]=arguments[u+2];r.children=o}return{$$typeof:ln,type:e.type,key:i,ref:l,props:r,_owner:a}};B.createContext=function(e){return e={$$typeof:Rd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Ad,_context:e},e.Consumer=e};B.createElement=uo;B.createFactory=function(e){var s=uo.bind(null,e);return s.type=e,s};B.createRef=function(){return{current:null}};B.forwardRef=function(e){return{$$typeof:Pd,render:e}};B.isValidElement=Ji;B.lazy=function(e){return{$$typeof:Bd,_payload:{_status:-1,_result:e},_init:Hd}};B.memo=function(e,s){return{$$typeof:bd,type:e,compare:s===void 0?null:s}};B.startTransition=function(e){var s=Dn.transition;Dn.transition={};try{e()}finally{Dn.transition=s}};B.unstable_act=ho;B.useCallback=function(e,s){return me.current.useCallback(e,s)};B.useContext=function(e){return me.current.useContext(e)};B.useDebugValue=function(){};B.useDeferredValue=function(e){return me.current.useDeferredValue(e)};B.useEffect=function(e,s){return me.current.useEffect(e,s)};B.useId=function(){return me.current.useId()};B.useImperativeHandle=function(e,s,n){return me.current.useImperativeHandle(e,s,n)};B.useInsertionEffect=function(e,s){return me.current.useInsertionEffect(e,s)};B.useLayoutEffect=function(e,s){return me.current.useLayoutEffect(e,s)};B.useMemo=function(e,s){return me.current.useMemo(e,s)};B.useReducer=function(e,s,n){return me.current.useReducer(e,s,n)};B.useRef=function(e){return me.current.useRef(e)};B.useState=function(e){return me.current.useState(e)};B.useSyncExternalStore=function(e,s,n){return me.current.useSyncExternalStore(e,s,n)};B.useTransition=function(){return me.current.useTransition()};B.version="18.3.1";no.exports=B;var _=no.exports;const Gd=Td(_);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $d=_,Wd=Symbol.for("react.element"),Vd=Symbol.for("react.fragment"),qd=Object.prototype.hasOwnProperty,Qd=$d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Kd={key:!0,ref:!0,__self:!0,__source:!0};function mo(e,s,n){var r,i={},l=null,a=null;n!==void 0&&(l=""+n),s.key!==void 0&&(l=""+s.key),s.ref!==void 0&&(a=s.ref);for(r in s)qd.call(s,r)&&!Kd.hasOwnProperty(r)&&(i[r]=s[r]);if(e&&e.defaultProps)for(r in s=e.defaultProps,s)i[r]===void 0&&(i[r]=s[r]);return{$$typeof:Wd,type:e,key:l,ref:a,props:i,_owner:Qd.current}}hr.Fragment=Vd;hr.jsx=mo;hr.jsxs=mo;so.exports=hr;var t=so.exports,ti={},fo={exports:{}},Te={},po={exports:{}},yo={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function s(T,A){var P=T.length;T.push(A);e:for(;0<P;){var $=P-1>>>1,Y=T[$];if(0<i(Y,A))T[$]=A,T[P]=Y,P=$;else break e}}function n(T){return T.length===0?null:T[0]}function r(T){if(T.length===0)return null;var A=T[0],P=T.pop();if(P!==A){T[0]=P;e:for(var $=0,Y=T.length,I=Y>>>1;$<I;){var pe=2*($+1)-1,Ns=T[pe],Ye=pe+1,hn=T[Ye];if(0>i(Ns,P))Ye<Y&&0>i(hn,Ns)?(T[$]=hn,T[Ye]=P,$=Ye):(T[$]=Ns,T[pe]=P,$=pe);else if(Ye<Y&&0>i(hn,P))T[$]=hn,T[Ye]=P,$=Ye;else break e}}return A}function i(T,A){var P=T.sortIndex-A.sortIndex;return P!==0?P:T.id-A.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var a=Date,o=a.now();e.unstable_now=function(){return a.now()-o}}var c=[],u=[],f=1,y=null,p=3,x=!1,w=!1,j=!1,L=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(T){for(var A=n(u);A!==null;){if(A.callback===null)r(u);else if(A.startTime<=T)r(u),A.sortIndex=A.expirationTime,s(c,A);else break;A=n(u)}}function g(T){if(j=!1,m(T),!w)if(n(c)!==null)w=!0,js(S);else{var A=n(u);A!==null&&Ge(g,A.startTime-T)}}function S(T,A){w=!1,j&&(j=!1,h(O),O=-1),x=!0;var P=p;try{for(m(A),y=n(c);y!==null&&(!(y.expirationTime>A)||T&&!X());){var $=y.callback;if(typeof $=="function"){y.callback=null,p=y.priorityLevel;var Y=$(y.expirationTime<=A);A=e.unstable_now(),typeof Y=="function"?y.callback=Y:y===n(c)&&r(c),m(A)}else r(c);y=n(c)}if(y!==null)var I=!0;else{var pe=n(u);pe!==null&&Ge(g,pe.startTime-A),I=!1}return I}finally{y=null,p=P,x=!1}}var E=!1,k=null,O=-1,F=5,D=-1;function X(){return!(e.unstable_now()-D<F)}function ve(){if(k!==null){var T=e.unstable_now();D=T;var A=!0;try{A=k(!0,T)}finally{A?Gt():(E=!1,k=null)}}else E=!1}var Gt;if(typeof d=="function")Gt=function(){d(ve)};else if(typeof MessageChannel<"u"){var Oe=new MessageChannel,un=Oe.port2;Oe.port1.onmessage=ve,Gt=function(){un.postMessage(null)}}else Gt=function(){L(ve,0)};function js(T){k=T,E||(E=!0,Gt())}function Ge(T,A){O=L(function(){T(e.unstable_now())},A)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_continueExecution=function(){w||x||(w=!0,js(S))},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):F=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(T){switch(p){case 1:case 2:case 3:var A=3;break;default:A=p}var P=p;p=A;try{return T()}finally{p=P}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(T,A){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var P=p;p=T;try{return A()}finally{p=P}},e.unstable_scheduleCallback=function(T,A,P){var $=e.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?$+P:$):P=$,T){case 1:var Y=-1;break;case 2:Y=250;break;case 5:Y=1073741823;break;case 4:Y=1e4;break;default:Y=5e3}return Y=P+Y,T={id:f++,callback:A,priorityLevel:T,startTime:P,expirationTime:Y,sortIndex:-1},P>$?(T.sortIndex=P,s(u,T),n(c)===null&&T===n(u)&&(j?(h(O),O=-1):j=!0,Ge(g,P-$))):(T.sortIndex=Y,s(c,T),w||x||(w=!0,js(S))),T},e.unstable_shouldYield=X,e.unstable_wrapCallback=function(T){var A=p;return function(){var P=p;p=A;try{return T.apply(this,arguments)}finally{p=P}}}})(yo);po.exports=yo;var Yd=po.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jd=_,_e=Yd;function v(e){for(var s="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)s+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+s+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var xo=new Set,Us={};function Ht(e,s){cs(e,s),cs(e+"Capture",s)}function cs(e,s){for(Us[e]=s,e=0;e<s.length;e++)xo.add(s[e])}var st=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),si=Object.prototype.hasOwnProperty,Xd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Vl={},ql={};function Zd(e){return si.call(ql,e)?!0:si.call(Vl,e)?!1:Xd.test(e)?ql[e]=!0:(Vl[e]=!0,!1)}function eu(e,s,n,r){if(n!==null&&n.type===0)return!1;switch(typeof s){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function tu(e,s,n,r){if(s===null||typeof s>"u"||eu(e,s,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!s;case 4:return s===!1;case 5:return isNaN(s);case 6:return isNaN(s)||1>s}return!1}function fe(e,s,n,r,i,l,a){this.acceptsBooleans=s===2||s===3||s===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=s,this.sanitizeURL=l,this.removeEmptyString=a}var le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){le[e]=new fe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var s=e[0];le[s]=new fe(s,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){le[e]=new fe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){le[e]=new fe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){le[e]=new fe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){le[e]=new fe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){le[e]=new fe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){le[e]=new fe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){le[e]=new fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Xi=/[\-:]([a-z])/g;function Zi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var s=e.replace(Xi,Zi);le[s]=new fe(s,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var s=e.replace(Xi,Zi);le[s]=new fe(s,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var s=e.replace(Xi,Zi);le[s]=new fe(s,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){le[e]=new fe(e,1,!1,e.toLowerCase(),null,!1,!1)});le.xlinkHref=new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){le[e]=new fe(e,1,!1,e.toLowerCase(),null,!0,!0)});function el(e,s,n,r){var i=le.hasOwnProperty(s)?le[s]:null;(i!==null?i.type!==0:r||!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(tu(s,n,i,r)&&(n=null),r||i===null?Zd(s)&&(n===null?e.removeAttribute(s):e.setAttribute(s,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(s=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(s):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,s,n):e.setAttribute(s,n))))}var lt=Jd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,fn=Symbol.for("react.element"),Wt=Symbol.for("react.portal"),Vt=Symbol.for("react.fragment"),tl=Symbol.for("react.strict_mode"),ni=Symbol.for("react.profiler"),go=Symbol.for("react.provider"),jo=Symbol.for("react.context"),sl=Symbol.for("react.forward_ref"),ri=Symbol.for("react.suspense"),ii=Symbol.for("react.suspense_list"),nl=Symbol.for("react.memo"),ot=Symbol.for("react.lazy"),No=Symbol.for("react.offscreen"),Ql=Symbol.iterator;function vs(e){return e===null||typeof e!="object"?null:(e=Ql&&e[Ql]||e["@@iterator"],typeof e=="function"?e:null)}var Q=Object.assign,Or;function Os(e){if(Or===void 0)try{throw Error()}catch(n){var s=n.stack.trim().match(/\n( *(at )?)/);Or=s&&s[1]||""}return`
`+Or+e}var Lr=!1;function Dr(e,s){if(!e||Lr)return"";Lr=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(s)if(s=function(){throw Error()},Object.defineProperty(s.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(s,[])}catch(u){var r=u}Reflect.construct(e,[],s)}else{try{s.call()}catch(u){r=u}e.call(s.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),l=r.stack.split(`
`),a=i.length-1,o=l.length-1;1<=a&&0<=o&&i[a]!==l[o];)o--;for(;1<=a&&0<=o;a--,o--)if(i[a]!==l[o]){if(a!==1||o!==1)do if(a--,o--,0>o||i[a]!==l[o]){var c=`
`+i[a].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=a&&0<=o);break}}}finally{Lr=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Os(e):""}function su(e){switch(e.tag){case 5:return Os(e.type);case 16:return Os("Lazy");case 13:return Os("Suspense");case 19:return Os("SuspenseList");case 0:case 2:case 15:return e=Dr(e.type,!1),e;case 11:return e=Dr(e.type.render,!1),e;case 1:return e=Dr(e.type,!0),e;default:return""}}function li(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Vt:return"Fragment";case Wt:return"Portal";case ni:return"Profiler";case tl:return"StrictMode";case ri:return"Suspense";case ii:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case jo:return(e.displayName||"Context")+".Consumer";case go:return(e._context.displayName||"Context")+".Provider";case sl:var s=e.render;return e=e.displayName,e||(e=s.displayName||s.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case nl:return s=e.displayName||null,s!==null?s:li(e.type)||"Memo";case ot:s=e._payload,e=e._init;try{return li(e(s))}catch{}}return null}function nu(e){var s=e.type;switch(e.tag){case 24:return"Cache";case 9:return(s.displayName||"Context")+".Consumer";case 10:return(s._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=s.render,e=e.displayName||e.name||"",s.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return s;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return li(s);case 8:return s===tl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof s=="function")return s.displayName||s.name||null;if(typeof s=="string")return s}return null}function wt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function vo(e){var s=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(s==="checkbox"||s==="radio")}function ru(e){var s=vo(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,s),r=""+e[s];if(!e.hasOwnProperty(s)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,l=n.set;return Object.defineProperty(e,s,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,l.call(this,a)}}),Object.defineProperty(e,s,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[s]}}}}function pn(e){e._valueTracker||(e._valueTracker=ru(e))}function wo(e){if(!e)return!1;var s=e._valueTracker;if(!s)return!0;var n=s.getValue(),r="";return e&&(r=vo(e)?e.checked?"true":"false":e.value),e=r,e!==n?(s.setValue(e),!0):!1}function Un(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ai(e,s){var n=s.checked;return Q({},s,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Kl(e,s){var n=s.defaultValue==null?"":s.defaultValue,r=s.checked!=null?s.checked:s.defaultChecked;n=wt(s.value!=null?s.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:s.type==="checkbox"||s.type==="radio"?s.checked!=null:s.value!=null}}function So(e,s){s=s.checked,s!=null&&el(e,"checked",s,!1)}function oi(e,s){So(e,s);var n=wt(s.value),r=s.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}s.hasOwnProperty("value")?ci(e,s.type,n):s.hasOwnProperty("defaultValue")&&ci(e,s.type,wt(s.defaultValue)),s.checked==null&&s.defaultChecked!=null&&(e.defaultChecked=!!s.defaultChecked)}function Yl(e,s,n){if(s.hasOwnProperty("value")||s.hasOwnProperty("defaultValue")){var r=s.type;if(!(r!=="submit"&&r!=="reset"||s.value!==void 0&&s.value!==null))return;s=""+e._wrapperState.initialValue,n||s===e.value||(e.value=s),e.defaultValue=s}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ci(e,s,n){(s!=="number"||Un(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ls=Array.isArray;function ns(e,s,n,r){if(e=e.options,s){s={};for(var i=0;i<n.length;i++)s["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=s.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+wt(n),s=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}s!==null||e[i].disabled||(s=e[i])}s!==null&&(s.selected=!0)}}function di(e,s){if(s.dangerouslySetInnerHTML!=null)throw Error(v(91));return Q({},s,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Jl(e,s){var n=s.value;if(n==null){if(n=s.children,s=s.defaultValue,n!=null){if(s!=null)throw Error(v(92));if(Ls(n)){if(1<n.length)throw Error(v(93));n=n[0]}s=n}s==null&&(s=""),n=s}e._wrapperState={initialValue:wt(n)}}function ko(e,s){var n=wt(s.value),r=wt(s.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),s.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Xl(e){var s=e.textContent;s===e._wrapperState.initialValue&&s!==""&&s!==null&&(e.value=s)}function Eo(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ui(e,s){return e==null||e==="http://www.w3.org/1999/xhtml"?Eo(s):e==="http://www.w3.org/2000/svg"&&s==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var yn,_o=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(s,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(s,n,r,i)})}:e}(function(e,s){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=s;else{for(yn=yn||document.createElement("div"),yn.innerHTML="<svg>"+s.valueOf().toString()+"</svg>",s=yn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;s.firstChild;)e.appendChild(s.firstChild)}});function Gs(e,s){if(s){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=s;return}}e.textContent=s}var Rs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},iu=["Webkit","ms","Moz","O"];Object.keys(Rs).forEach(function(e){iu.forEach(function(s){s=s+e.charAt(0).toUpperCase()+e.substring(1),Rs[s]=Rs[e]})});function To(e,s,n){return s==null||typeof s=="boolean"||s===""?"":n||typeof s!="number"||s===0||Rs.hasOwnProperty(e)&&Rs[e]?(""+s).trim():s+"px"}function Co(e,s){e=e.style;for(var n in s)if(s.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=To(n,s[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var lu=Q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function hi(e,s){if(s){if(lu[e]&&(s.children!=null||s.dangerouslySetInnerHTML!=null))throw Error(v(137,e));if(s.dangerouslySetInnerHTML!=null){if(s.children!=null)throw Error(v(60));if(typeof s.dangerouslySetInnerHTML!="object"||!("__html"in s.dangerouslySetInnerHTML))throw Error(v(61))}if(s.style!=null&&typeof s.style!="object")throw Error(v(62))}}function mi(e,s){if(e.indexOf("-")===-1)return typeof s.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var fi=null;function rl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pi=null,rs=null,is=null;function Zl(e){if(e=cn(e)){if(typeof pi!="function")throw Error(v(280));var s=e.stateNode;s&&(s=xr(s),pi(e.stateNode,e.type,s))}}function Oo(e){rs?is?is.push(e):is=[e]:rs=e}function Lo(){if(rs){var e=rs,s=is;if(is=rs=null,Zl(e),s)for(e=0;e<s.length;e++)Zl(s[e])}}function Do(e,s){return e(s)}function Ao(){}var Ar=!1;function Ro(e,s,n){if(Ar)return e(s,n);Ar=!0;try{return Do(e,s,n)}finally{Ar=!1,(rs!==null||is!==null)&&(Ao(),Lo())}}function $s(e,s){var n=e.stateNode;if(n===null)return null;var r=xr(n);if(r===null)return null;n=r[s];e:switch(s){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(v(231,s,typeof n));return n}var yi=!1;if(st)try{var ws={};Object.defineProperty(ws,"passive",{get:function(){yi=!0}}),window.addEventListener("test",ws,ws),window.removeEventListener("test",ws,ws)}catch{yi=!1}function au(e,s,n,r,i,l,a,o,c){var u=Array.prototype.slice.call(arguments,3);try{s.apply(n,u)}catch(f){this.onError(f)}}var Ps=!1,Gn=null,$n=!1,xi=null,ou={onError:function(e){Ps=!0,Gn=e}};function cu(e,s,n,r,i,l,a,o,c){Ps=!1,Gn=null,au.apply(ou,arguments)}function du(e,s,n,r,i,l,a,o,c){if(cu.apply(this,arguments),Ps){if(Ps){var u=Gn;Ps=!1,Gn=null}else throw Error(v(198));$n||($n=!0,xi=u)}}function Ut(e){var s=e,n=e;if(e.alternate)for(;s.return;)s=s.return;else{e=s;do s=e,s.flags&4098&&(n=s.return),e=s.return;while(e)}return s.tag===3?n:null}function Po(e){if(e.tag===13){var s=e.memoizedState;if(s===null&&(e=e.alternate,e!==null&&(s=e.memoizedState)),s!==null)return s.dehydrated}return null}function ea(e){if(Ut(e)!==e)throw Error(v(188))}function uu(e){var s=e.alternate;if(!s){if(s=Ut(e),s===null)throw Error(v(188));return s!==e?null:e}for(var n=e,r=s;;){var i=n.return;if(i===null)break;var l=i.alternate;if(l===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===n)return ea(i),e;if(l===r)return ea(i),s;l=l.sibling}throw Error(v(188))}if(n.return!==r.return)n=i,r=l;else{for(var a=!1,o=i.child;o;){if(o===n){a=!0,n=i,r=l;break}if(o===r){a=!0,r=i,n=l;break}o=o.sibling}if(!a){for(o=l.child;o;){if(o===n){a=!0,n=l,r=i;break}if(o===r){a=!0,r=l,n=i;break}o=o.sibling}if(!a)throw Error(v(189))}}if(n.alternate!==r)throw Error(v(190))}if(n.tag!==3)throw Error(v(188));return n.stateNode.current===n?e:s}function Io(e){return e=uu(e),e!==null?bo(e):null}function bo(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var s=bo(e);if(s!==null)return s;e=e.sibling}return null}var Bo=_e.unstable_scheduleCallback,ta=_e.unstable_cancelCallback,hu=_e.unstable_shouldYield,mu=_e.unstable_requestPaint,J=_e.unstable_now,fu=_e.unstable_getCurrentPriorityLevel,il=_e.unstable_ImmediatePriority,zo=_e.unstable_UserBlockingPriority,Wn=_e.unstable_NormalPriority,pu=_e.unstable_LowPriority,Fo=_e.unstable_IdlePriority,mr=null,qe=null;function yu(e){if(qe&&typeof qe.onCommitFiberRoot=="function")try{qe.onCommitFiberRoot(mr,e,void 0,(e.current.flags&128)===128)}catch{}}var Me=Math.clz32?Math.clz32:ju,xu=Math.log,gu=Math.LN2;function ju(e){return e>>>=0,e===0?32:31-(xu(e)/gu|0)|0}var xn=64,gn=4194304;function Ds(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Vn(e,s){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,l=e.pingedLanes,a=n&268435455;if(a!==0){var o=a&~i;o!==0?r=Ds(o):(l&=a,l!==0&&(r=Ds(l)))}else a=n&~i,a!==0?r=Ds(a):l!==0&&(r=Ds(l));if(r===0)return 0;if(s!==0&&s!==r&&!(s&i)&&(i=r&-r,l=s&-s,i>=l||i===16&&(l&4194240)!==0))return s;if(r&4&&(r|=n&16),s=e.entangledLanes,s!==0)for(e=e.entanglements,s&=r;0<s;)n=31-Me(s),i=1<<n,r|=e[n],s&=~i;return r}function Nu(e,s){switch(e){case 1:case 2:case 4:return s+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return s+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vu(e,s){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,l=e.pendingLanes;0<l;){var a=31-Me(l),o=1<<a,c=i[a];c===-1?(!(o&n)||o&r)&&(i[a]=Nu(o,s)):c<=s&&(e.expiredLanes|=o),l&=~o}}function gi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Mo(){var e=xn;return xn<<=1,!(xn&4194240)&&(xn=64),e}function Rr(e){for(var s=[],n=0;31>n;n++)s.push(e);return s}function an(e,s,n){e.pendingLanes|=s,s!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,s=31-Me(s),e[s]=n}function wu(e,s){var n=e.pendingLanes&~s;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=s,e.mutableReadLanes&=s,e.entangledLanes&=s,s=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Me(n),l=1<<i;s[i]=0,r[i]=-1,e[i]=-1,n&=~l}}function ll(e,s){var n=e.entangledLanes|=s;for(e=e.entanglements;n;){var r=31-Me(n),i=1<<r;i&s|e[r]&s&&(e[r]|=s),n&=~i}}var M=0;function Ho(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Uo,al,Go,$o,Wo,ji=!1,jn=[],ft=null,pt=null,yt=null,Ws=new Map,Vs=new Map,dt=[],Su="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function sa(e,s){switch(e){case"focusin":case"focusout":ft=null;break;case"dragenter":case"dragleave":pt=null;break;case"mouseover":case"mouseout":yt=null;break;case"pointerover":case"pointerout":Ws.delete(s.pointerId);break;case"gotpointercapture":case"lostpointercapture":Vs.delete(s.pointerId)}}function Ss(e,s,n,r,i,l){return e===null||e.nativeEvent!==l?(e={blockedOn:s,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[i]},s!==null&&(s=cn(s),s!==null&&al(s)),e):(e.eventSystemFlags|=r,s=e.targetContainers,i!==null&&s.indexOf(i)===-1&&s.push(i),e)}function ku(e,s,n,r,i){switch(s){case"focusin":return ft=Ss(ft,e,s,n,r,i),!0;case"dragenter":return pt=Ss(pt,e,s,n,r,i),!0;case"mouseover":return yt=Ss(yt,e,s,n,r,i),!0;case"pointerover":var l=i.pointerId;return Ws.set(l,Ss(Ws.get(l)||null,e,s,n,r,i)),!0;case"gotpointercapture":return l=i.pointerId,Vs.set(l,Ss(Vs.get(l)||null,e,s,n,r,i)),!0}return!1}function Vo(e){var s=Lt(e.target);if(s!==null){var n=Ut(s);if(n!==null){if(s=n.tag,s===13){if(s=Po(n),s!==null){e.blockedOn=s,Wo(e.priority,function(){Go(n)});return}}else if(s===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function An(e){if(e.blockedOn!==null)return!1;for(var s=e.targetContainers;0<s.length;){var n=Ni(e.domEventName,e.eventSystemFlags,s[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);fi=r,n.target.dispatchEvent(r),fi=null}else return s=cn(n),s!==null&&al(s),e.blockedOn=n,!1;s.shift()}return!0}function na(e,s,n){An(e)&&n.delete(s)}function Eu(){ji=!1,ft!==null&&An(ft)&&(ft=null),pt!==null&&An(pt)&&(pt=null),yt!==null&&An(yt)&&(yt=null),Ws.forEach(na),Vs.forEach(na)}function ks(e,s){e.blockedOn===s&&(e.blockedOn=null,ji||(ji=!0,_e.unstable_scheduleCallback(_e.unstable_NormalPriority,Eu)))}function qs(e){function s(i){return ks(i,e)}if(0<jn.length){ks(jn[0],e);for(var n=1;n<jn.length;n++){var r=jn[n];r.blockedOn===e&&(r.blockedOn=null)}}for(ft!==null&&ks(ft,e),pt!==null&&ks(pt,e),yt!==null&&ks(yt,e),Ws.forEach(s),Vs.forEach(s),n=0;n<dt.length;n++)r=dt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<dt.length&&(n=dt[0],n.blockedOn===null);)Vo(n),n.blockedOn===null&&dt.shift()}var ls=lt.ReactCurrentBatchConfig,qn=!0;function _u(e,s,n,r){var i=M,l=ls.transition;ls.transition=null;try{M=1,ol(e,s,n,r)}finally{M=i,ls.transition=l}}function Tu(e,s,n,r){var i=M,l=ls.transition;ls.transition=null;try{M=4,ol(e,s,n,r)}finally{M=i,ls.transition=l}}function ol(e,s,n,r){if(qn){var i=Ni(e,s,n,r);if(i===null)Gr(e,s,r,Qn,n),sa(e,r);else if(ku(i,e,s,n,r))r.stopPropagation();else if(sa(e,r),s&4&&-1<Su.indexOf(e)){for(;i!==null;){var l=cn(i);if(l!==null&&Uo(l),l=Ni(e,s,n,r),l===null&&Gr(e,s,r,Qn,n),l===i)break;i=l}i!==null&&r.stopPropagation()}else Gr(e,s,r,null,n)}}var Qn=null;function Ni(e,s,n,r){if(Qn=null,e=rl(r),e=Lt(e),e!==null)if(s=Ut(e),s===null)e=null;else if(n=s.tag,n===13){if(e=Po(s),e!==null)return e;e=null}else if(n===3){if(s.stateNode.current.memoizedState.isDehydrated)return s.tag===3?s.stateNode.containerInfo:null;e=null}else s!==e&&(e=null);return Qn=e,null}function qo(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(fu()){case il:return 1;case zo:return 4;case Wn:case pu:return 16;case Fo:return 536870912;default:return 16}default:return 16}}var ht=null,cl=null,Rn=null;function Qo(){if(Rn)return Rn;var e,s=cl,n=s.length,r,i="value"in ht?ht.value:ht.textContent,l=i.length;for(e=0;e<n&&s[e]===i[e];e++);var a=n-e;for(r=1;r<=a&&s[n-r]===i[l-r];r++);return Rn=i.slice(e,1<r?1-r:void 0)}function Pn(e){var s=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&s===13&&(e=13)):e=s,e===10&&(e=13),32<=e||e===13?e:0}function Nn(){return!0}function ra(){return!1}function Ce(e){function s(n,r,i,l,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=l,this.target=a,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(l):l[o]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Nn:ra,this.isPropagationStopped=ra,this}return Q(s.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Nn)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Nn)},persist:function(){},isPersistent:Nn}),s}var xs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dl=Ce(xs),on=Q({},xs,{view:0,detail:0}),Cu=Ce(on),Pr,Ir,Es,fr=Q({},on,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ul,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Es&&(Es&&e.type==="mousemove"?(Pr=e.screenX-Es.screenX,Ir=e.screenY-Es.screenY):Ir=Pr=0,Es=e),Pr)},movementY:function(e){return"movementY"in e?e.movementY:Ir}}),ia=Ce(fr),Ou=Q({},fr,{dataTransfer:0}),Lu=Ce(Ou),Du=Q({},on,{relatedTarget:0}),br=Ce(Du),Au=Q({},xs,{animationName:0,elapsedTime:0,pseudoElement:0}),Ru=Ce(Au),Pu=Q({},xs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Iu=Ce(Pu),bu=Q({},xs,{data:0}),la=Ce(bu),Bu={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},zu={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fu={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Mu(e){var s=this.nativeEvent;return s.getModifierState?s.getModifierState(e):(e=Fu[e])?!!s[e]:!1}function ul(){return Mu}var Hu=Q({},on,{key:function(e){if(e.key){var s=Bu[e.key]||e.key;if(s!=="Unidentified")return s}return e.type==="keypress"?(e=Pn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?zu[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ul,charCode:function(e){return e.type==="keypress"?Pn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Uu=Ce(Hu),Gu=Q({},fr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),aa=Ce(Gu),$u=Q({},on,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ul}),Wu=Ce($u),Vu=Q({},xs,{propertyName:0,elapsedTime:0,pseudoElement:0}),qu=Ce(Vu),Qu=Q({},fr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ku=Ce(Qu),Yu=[9,13,27,32],hl=st&&"CompositionEvent"in window,Is=null;st&&"documentMode"in document&&(Is=document.documentMode);var Ju=st&&"TextEvent"in window&&!Is,Ko=st&&(!hl||Is&&8<Is&&11>=Is),oa=" ",ca=!1;function Yo(e,s){switch(e){case"keyup":return Yu.indexOf(s.keyCode)!==-1;case"keydown":return s.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jo(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qt=!1;function Xu(e,s){switch(e){case"compositionend":return Jo(s);case"keypress":return s.which!==32?null:(ca=!0,oa);case"textInput":return e=s.data,e===oa&&ca?null:e;default:return null}}function Zu(e,s){if(qt)return e==="compositionend"||!hl&&Yo(e,s)?(e=Qo(),Rn=cl=ht=null,qt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(s.ctrlKey||s.altKey||s.metaKey)||s.ctrlKey&&s.altKey){if(s.char&&1<s.char.length)return s.char;if(s.which)return String.fromCharCode(s.which)}return null;case"compositionend":return Ko&&s.locale!=="ko"?null:s.data;default:return null}}var eh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function da(e){var s=e&&e.nodeName&&e.nodeName.toLowerCase();return s==="input"?!!eh[e.type]:s==="textarea"}function Xo(e,s,n,r){Oo(r),s=Kn(s,"onChange"),0<s.length&&(n=new dl("onChange","change",null,n,r),e.push({event:n,listeners:s}))}var bs=null,Qs=null;function th(e){cc(e,0)}function pr(e){var s=Yt(e);if(wo(s))return e}function sh(e,s){if(e==="change")return s}var Zo=!1;if(st){var Br;if(st){var zr="oninput"in document;if(!zr){var ua=document.createElement("div");ua.setAttribute("oninput","return;"),zr=typeof ua.oninput=="function"}Br=zr}else Br=!1;Zo=Br&&(!document.documentMode||9<document.documentMode)}function ha(){bs&&(bs.detachEvent("onpropertychange",ec),Qs=bs=null)}function ec(e){if(e.propertyName==="value"&&pr(Qs)){var s=[];Xo(s,Qs,e,rl(e)),Ro(th,s)}}function nh(e,s,n){e==="focusin"?(ha(),bs=s,Qs=n,bs.attachEvent("onpropertychange",ec)):e==="focusout"&&ha()}function rh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return pr(Qs)}function ih(e,s){if(e==="click")return pr(s)}function lh(e,s){if(e==="input"||e==="change")return pr(s)}function ah(e,s){return e===s&&(e!==0||1/e===1/s)||e!==e&&s!==s}var Ue=typeof Object.is=="function"?Object.is:ah;function Ks(e,s){if(Ue(e,s))return!0;if(typeof e!="object"||e===null||typeof s!="object"||s===null)return!1;var n=Object.keys(e),r=Object.keys(s);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!si.call(s,i)||!Ue(e[i],s[i]))return!1}return!0}function ma(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function fa(e,s){var n=ma(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=s&&r>=s)return{node:n,offset:s-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ma(n)}}function tc(e,s){return e&&s?e===s?!0:e&&e.nodeType===3?!1:s&&s.nodeType===3?tc(e,s.parentNode):"contains"in e?e.contains(s):e.compareDocumentPosition?!!(e.compareDocumentPosition(s)&16):!1:!1}function sc(){for(var e=window,s=Un();s instanceof e.HTMLIFrameElement;){try{var n=typeof s.contentWindow.location.href=="string"}catch{n=!1}if(n)e=s.contentWindow;else break;s=Un(e.document)}return s}function ml(e){var s=e&&e.nodeName&&e.nodeName.toLowerCase();return s&&(s==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||s==="textarea"||e.contentEditable==="true")}function oh(e){var s=sc(),n=e.focusedElem,r=e.selectionRange;if(s!==n&&n&&n.ownerDocument&&tc(n.ownerDocument.documentElement,n)){if(r!==null&&ml(n)){if(s=r.start,e=r.end,e===void 0&&(e=s),"selectionStart"in n)n.selectionStart=s,n.selectionEnd=Math.min(e,n.value.length);else if(e=(s=n.ownerDocument||document)&&s.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,l=Math.min(r.start,i);r=r.end===void 0?l:Math.min(r.end,i),!e.extend&&l>r&&(i=r,r=l,l=i),i=fa(n,l);var a=fa(n,r);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(s=s.createRange(),s.setStart(i.node,i.offset),e.removeAllRanges(),l>r?(e.addRange(s),e.extend(a.node,a.offset)):(s.setEnd(a.node,a.offset),e.addRange(s)))}}for(s=[],e=n;e=e.parentNode;)e.nodeType===1&&s.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<s.length;n++)e=s[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ch=st&&"documentMode"in document&&11>=document.documentMode,Qt=null,vi=null,Bs=null,wi=!1;function pa(e,s,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;wi||Qt==null||Qt!==Un(r)||(r=Qt,"selectionStart"in r&&ml(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Bs&&Ks(Bs,r)||(Bs=r,r=Kn(vi,"onSelect"),0<r.length&&(s=new dl("onSelect","select",null,s,n),e.push({event:s,listeners:r}),s.target=Qt)))}function vn(e,s){var n={};return n[e.toLowerCase()]=s.toLowerCase(),n["Webkit"+e]="webkit"+s,n["Moz"+e]="moz"+s,n}var Kt={animationend:vn("Animation","AnimationEnd"),animationiteration:vn("Animation","AnimationIteration"),animationstart:vn("Animation","AnimationStart"),transitionend:vn("Transition","TransitionEnd")},Fr={},nc={};st&&(nc=document.createElement("div").style,"AnimationEvent"in window||(delete Kt.animationend.animation,delete Kt.animationiteration.animation,delete Kt.animationstart.animation),"TransitionEvent"in window||delete Kt.transitionend.transition);function yr(e){if(Fr[e])return Fr[e];if(!Kt[e])return e;var s=Kt[e],n;for(n in s)if(s.hasOwnProperty(n)&&n in nc)return Fr[e]=s[n];return e}var rc=yr("animationend"),ic=yr("animationiteration"),lc=yr("animationstart"),ac=yr("transitionend"),oc=new Map,ya="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function kt(e,s){oc.set(e,s),Ht(s,[e])}for(var Mr=0;Mr<ya.length;Mr++){var Hr=ya[Mr],dh=Hr.toLowerCase(),uh=Hr[0].toUpperCase()+Hr.slice(1);kt(dh,"on"+uh)}kt(rc,"onAnimationEnd");kt(ic,"onAnimationIteration");kt(lc,"onAnimationStart");kt("dblclick","onDoubleClick");kt("focusin","onFocus");kt("focusout","onBlur");kt(ac,"onTransitionEnd");cs("onMouseEnter",["mouseout","mouseover"]);cs("onMouseLeave",["mouseout","mouseover"]);cs("onPointerEnter",["pointerout","pointerover"]);cs("onPointerLeave",["pointerout","pointerover"]);Ht("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ht("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ht("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ht("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ht("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ht("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var As="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hh=new Set("cancel close invalid load scroll toggle".split(" ").concat(As));function xa(e,s,n){var r=e.type||"unknown-event";e.currentTarget=n,du(r,s,void 0,e),e.currentTarget=null}function cc(e,s){s=(s&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var l=void 0;if(s)for(var a=r.length-1;0<=a;a--){var o=r[a],c=o.instance,u=o.currentTarget;if(o=o.listener,c!==l&&i.isPropagationStopped())break e;xa(i,o,u),l=c}else for(a=0;a<r.length;a++){if(o=r[a],c=o.instance,u=o.currentTarget,o=o.listener,c!==l&&i.isPropagationStopped())break e;xa(i,o,u),l=c}}}if($n)throw e=xi,$n=!1,xi=null,e}function U(e,s){var n=s[Ti];n===void 0&&(n=s[Ti]=new Set);var r=e+"__bubble";n.has(r)||(dc(s,e,2,!1),n.add(r))}function Ur(e,s,n){var r=0;s&&(r|=4),dc(n,e,r,s)}var wn="_reactListening"+Math.random().toString(36).slice(2);function Ys(e){if(!e[wn]){e[wn]=!0,xo.forEach(function(n){n!=="selectionchange"&&(hh.has(n)||Ur(n,!1,e),Ur(n,!0,e))});var s=e.nodeType===9?e:e.ownerDocument;s===null||s[wn]||(s[wn]=!0,Ur("selectionchange",!1,s))}}function dc(e,s,n,r){switch(qo(s)){case 1:var i=_u;break;case 4:i=Tu;break;default:i=ol}n=i.bind(null,s,n,e),i=void 0,!yi||s!=="touchstart"&&s!=="touchmove"&&s!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(s,n,{capture:!0,passive:i}):e.addEventListener(s,n,!0):i!==void 0?e.addEventListener(s,n,{passive:i}):e.addEventListener(s,n,!1)}function Gr(e,s,n,r,i){var l=r;if(!(s&1)&&!(s&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var o=r.stateNode.containerInfo;if(o===i||o.nodeType===8&&o.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;a=a.return}for(;o!==null;){if(a=Lt(o),a===null)return;if(c=a.tag,c===5||c===6){r=l=a;continue e}o=o.parentNode}}r=r.return}Ro(function(){var u=l,f=rl(n),y=[];e:{var p=oc.get(e);if(p!==void 0){var x=dl,w=e;switch(e){case"keypress":if(Pn(n)===0)break e;case"keydown":case"keyup":x=Uu;break;case"focusin":w="focus",x=br;break;case"focusout":w="blur",x=br;break;case"beforeblur":case"afterblur":x=br;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=ia;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Lu;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=Wu;break;case rc:case ic:case lc:x=Ru;break;case ac:x=qu;break;case"scroll":x=Cu;break;case"wheel":x=Ku;break;case"copy":case"cut":case"paste":x=Iu;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=aa}var j=(s&4)!==0,L=!j&&e==="scroll",h=j?p!==null?p+"Capture":null:p;j=[];for(var d=u,m;d!==null;){m=d;var g=m.stateNode;if(m.tag===5&&g!==null&&(m=g,h!==null&&(g=$s(d,h),g!=null&&j.push(Js(d,g,m)))),L)break;d=d.return}0<j.length&&(p=new x(p,w,null,n,f),y.push({event:p,listeners:j}))}}if(!(s&7)){e:{if(p=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",p&&n!==fi&&(w=n.relatedTarget||n.fromElement)&&(Lt(w)||w[nt]))break e;if((x||p)&&(p=f.window===f?f:(p=f.ownerDocument)?p.defaultView||p.parentWindow:window,x?(w=n.relatedTarget||n.toElement,x=u,w=w?Lt(w):null,w!==null&&(L=Ut(w),w!==L||w.tag!==5&&w.tag!==6)&&(w=null)):(x=null,w=u),x!==w)){if(j=ia,g="onMouseLeave",h="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(j=aa,g="onPointerLeave",h="onPointerEnter",d="pointer"),L=x==null?p:Yt(x),m=w==null?p:Yt(w),p=new j(g,d+"leave",x,n,f),p.target=L,p.relatedTarget=m,g=null,Lt(f)===u&&(j=new j(h,d+"enter",w,n,f),j.target=m,j.relatedTarget=L,g=j),L=g,x&&w)t:{for(j=x,h=w,d=0,m=j;m;m=$t(m))d++;for(m=0,g=h;g;g=$t(g))m++;for(;0<d-m;)j=$t(j),d--;for(;0<m-d;)h=$t(h),m--;for(;d--;){if(j===h||h!==null&&j===h.alternate)break t;j=$t(j),h=$t(h)}j=null}else j=null;x!==null&&ga(y,p,x,j,!1),w!==null&&L!==null&&ga(y,L,w,j,!0)}}e:{if(p=u?Yt(u):window,x=p.nodeName&&p.nodeName.toLowerCase(),x==="select"||x==="input"&&p.type==="file")var S=sh;else if(da(p))if(Zo)S=lh;else{S=rh;var E=nh}else(x=p.nodeName)&&x.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(S=ih);if(S&&(S=S(e,u))){Xo(y,S,n,f);break e}E&&E(e,p,u),e==="focusout"&&(E=p._wrapperState)&&E.controlled&&p.type==="number"&&ci(p,"number",p.value)}switch(E=u?Yt(u):window,e){case"focusin":(da(E)||E.contentEditable==="true")&&(Qt=E,vi=u,Bs=null);break;case"focusout":Bs=vi=Qt=null;break;case"mousedown":wi=!0;break;case"contextmenu":case"mouseup":case"dragend":wi=!1,pa(y,n,f);break;case"selectionchange":if(ch)break;case"keydown":case"keyup":pa(y,n,f)}var k;if(hl)e:{switch(e){case"compositionstart":var O="onCompositionStart";break e;case"compositionend":O="onCompositionEnd";break e;case"compositionupdate":O="onCompositionUpdate";break e}O=void 0}else qt?Yo(e,n)&&(O="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(O="onCompositionStart");O&&(Ko&&n.locale!=="ko"&&(qt||O!=="onCompositionStart"?O==="onCompositionEnd"&&qt&&(k=Qo()):(ht=f,cl="value"in ht?ht.value:ht.textContent,qt=!0)),E=Kn(u,O),0<E.length&&(O=new la(O,e,null,n,f),y.push({event:O,listeners:E}),k?O.data=k:(k=Jo(n),k!==null&&(O.data=k)))),(k=Ju?Xu(e,n):Zu(e,n))&&(u=Kn(u,"onBeforeInput"),0<u.length&&(f=new la("onBeforeInput","beforeinput",null,n,f),y.push({event:f,listeners:u}),f.data=k))}cc(y,s)})}function Js(e,s,n){return{instance:e,listener:s,currentTarget:n}}function Kn(e,s){for(var n=s+"Capture",r=[];e!==null;){var i=e,l=i.stateNode;i.tag===5&&l!==null&&(i=l,l=$s(e,n),l!=null&&r.unshift(Js(e,l,i)),l=$s(e,s),l!=null&&r.push(Js(e,l,i))),e=e.return}return r}function $t(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ga(e,s,n,r,i){for(var l=s._reactName,a=[];n!==null&&n!==r;){var o=n,c=o.alternate,u=o.stateNode;if(c!==null&&c===r)break;o.tag===5&&u!==null&&(o=u,i?(c=$s(n,l),c!=null&&a.unshift(Js(n,c,o))):i||(c=$s(n,l),c!=null&&a.push(Js(n,c,o)))),n=n.return}a.length!==0&&e.push({event:s,listeners:a})}var mh=/\r\n?/g,fh=/\u0000|\uFFFD/g;function ja(e){return(typeof e=="string"?e:""+e).replace(mh,`
`).replace(fh,"")}function Sn(e,s,n){if(s=ja(s),ja(e)!==s&&n)throw Error(v(425))}function Yn(){}var Si=null,ki=null;function Ei(e,s){return e==="textarea"||e==="noscript"||typeof s.children=="string"||typeof s.children=="number"||typeof s.dangerouslySetInnerHTML=="object"&&s.dangerouslySetInnerHTML!==null&&s.dangerouslySetInnerHTML.__html!=null}var _i=typeof setTimeout=="function"?setTimeout:void 0,ph=typeof clearTimeout=="function"?clearTimeout:void 0,Na=typeof Promise=="function"?Promise:void 0,yh=typeof queueMicrotask=="function"?queueMicrotask:typeof Na<"u"?function(e){return Na.resolve(null).then(e).catch(xh)}:_i;function xh(e){setTimeout(function(){throw e})}function $r(e,s){var n=s,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),qs(s);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);qs(s)}function xt(e){for(;e!=null;e=e.nextSibling){var s=e.nodeType;if(s===1||s===3)break;if(s===8){if(s=e.data,s==="$"||s==="$!"||s==="$?")break;if(s==="/$")return null}}return e}function va(e){e=e.previousSibling;for(var s=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(s===0)return e;s--}else n==="/$"&&s++}e=e.previousSibling}return null}var gs=Math.random().toString(36).slice(2),Ve="__reactFiber$"+gs,Xs="__reactProps$"+gs,nt="__reactContainer$"+gs,Ti="__reactEvents$"+gs,gh="__reactListeners$"+gs,jh="__reactHandles$"+gs;function Lt(e){var s=e[Ve];if(s)return s;for(var n=e.parentNode;n;){if(s=n[nt]||n[Ve]){if(n=s.alternate,s.child!==null||n!==null&&n.child!==null)for(e=va(e);e!==null;){if(n=e[Ve])return n;e=va(e)}return s}e=n,n=e.parentNode}return null}function cn(e){return e=e[Ve]||e[nt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Yt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(v(33))}function xr(e){return e[Xs]||null}var Ci=[],Jt=-1;function Et(e){return{current:e}}function G(e){0>Jt||(e.current=Ci[Jt],Ci[Jt]=null,Jt--)}function H(e,s){Jt++,Ci[Jt]=e.current,e.current=s}var St={},de=Et(St),ge=Et(!1),It=St;function ds(e,s){var n=e.type.contextTypes;if(!n)return St;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===s)return r.__reactInternalMemoizedMaskedChildContext;var i={},l;for(l in n)i[l]=s[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=i),i}function je(e){return e=e.childContextTypes,e!=null}function Jn(){G(ge),G(de)}function wa(e,s,n){if(de.current!==St)throw Error(v(168));H(de,s),H(ge,n)}function uc(e,s,n){var r=e.stateNode;if(s=s.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in s))throw Error(v(108,nu(e)||"Unknown",i));return Q({},n,r)}function Xn(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||St,It=de.current,H(de,e),H(ge,ge.current),!0}function Sa(e,s,n){var r=e.stateNode;if(!r)throw Error(v(169));n?(e=uc(e,s,It),r.__reactInternalMemoizedMergedChildContext=e,G(ge),G(de),H(de,e)):G(ge),H(ge,n)}var Xe=null,gr=!1,Wr=!1;function hc(e){Xe===null?Xe=[e]:Xe.push(e)}function Nh(e){gr=!0,hc(e)}function _t(){if(!Wr&&Xe!==null){Wr=!0;var e=0,s=M;try{var n=Xe;for(M=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Xe=null,gr=!1}catch(i){throw Xe!==null&&(Xe=Xe.slice(e+1)),Bo(il,_t),i}finally{M=s,Wr=!1}}return null}var Xt=[],Zt=0,Zn=null,er=0,Le=[],De=0,bt=null,Ze=1,et="";function Ct(e,s){Xt[Zt++]=er,Xt[Zt++]=Zn,Zn=e,er=s}function mc(e,s,n){Le[De++]=Ze,Le[De++]=et,Le[De++]=bt,bt=e;var r=Ze;e=et;var i=32-Me(r)-1;r&=~(1<<i),n+=1;var l=32-Me(s)+i;if(30<l){var a=i-i%5;l=(r&(1<<a)-1).toString(32),r>>=a,i-=a,Ze=1<<32-Me(s)+i|n<<i|r,et=l+e}else Ze=1<<l|n<<i|r,et=e}function fl(e){e.return!==null&&(Ct(e,1),mc(e,1,0))}function pl(e){for(;e===Zn;)Zn=Xt[--Zt],Xt[Zt]=null,er=Xt[--Zt],Xt[Zt]=null;for(;e===bt;)bt=Le[--De],Le[De]=null,et=Le[--De],Le[De]=null,Ze=Le[--De],Le[De]=null}var Ee=null,ke=null,W=!1,Fe=null;function fc(e,s){var n=Ae(5,null,null,0);n.elementType="DELETED",n.stateNode=s,n.return=e,s=e.deletions,s===null?(e.deletions=[n],e.flags|=16):s.push(n)}function ka(e,s){switch(e.tag){case 5:var n=e.type;return s=s.nodeType!==1||n.toLowerCase()!==s.nodeName.toLowerCase()?null:s,s!==null?(e.stateNode=s,Ee=e,ke=xt(s.firstChild),!0):!1;case 6:return s=e.pendingProps===""||s.nodeType!==3?null:s,s!==null?(e.stateNode=s,Ee=e,ke=null,!0):!1;case 13:return s=s.nodeType!==8?null:s,s!==null?(n=bt!==null?{id:Ze,overflow:et}:null,e.memoizedState={dehydrated:s,treeContext:n,retryLane:1073741824},n=Ae(18,null,null,0),n.stateNode=s,n.return=e,e.child=n,Ee=e,ke=null,!0):!1;default:return!1}}function Oi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Li(e){if(W){var s=ke;if(s){var n=s;if(!ka(e,s)){if(Oi(e))throw Error(v(418));s=xt(n.nextSibling);var r=Ee;s&&ka(e,s)?fc(r,n):(e.flags=e.flags&-4097|2,W=!1,Ee=e)}}else{if(Oi(e))throw Error(v(418));e.flags=e.flags&-4097|2,W=!1,Ee=e}}}function Ea(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ee=e}function kn(e){if(e!==Ee)return!1;if(!W)return Ea(e),W=!0,!1;var s;if((s=e.tag!==3)&&!(s=e.tag!==5)&&(s=e.type,s=s!=="head"&&s!=="body"&&!Ei(e.type,e.memoizedProps)),s&&(s=ke)){if(Oi(e))throw pc(),Error(v(418));for(;s;)fc(e,s),s=xt(s.nextSibling)}if(Ea(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(v(317));e:{for(e=e.nextSibling,s=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(s===0){ke=xt(e.nextSibling);break e}s--}else n!=="$"&&n!=="$!"&&n!=="$?"||s++}e=e.nextSibling}ke=null}}else ke=Ee?xt(e.stateNode.nextSibling):null;return!0}function pc(){for(var e=ke;e;)e=xt(e.nextSibling)}function us(){ke=Ee=null,W=!1}function yl(e){Fe===null?Fe=[e]:Fe.push(e)}var vh=lt.ReactCurrentBatchConfig;function _s(e,s,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(v(309));var r=n.stateNode}if(!r)throw Error(v(147,e));var i=r,l=""+e;return s!==null&&s.ref!==null&&typeof s.ref=="function"&&s.ref._stringRef===l?s.ref:(s=function(a){var o=i.refs;a===null?delete o[l]:o[l]=a},s._stringRef=l,s)}if(typeof e!="string")throw Error(v(284));if(!n._owner)throw Error(v(290,e))}return e}function En(e,s){throw e=Object.prototype.toString.call(s),Error(v(31,e==="[object Object]"?"object with keys {"+Object.keys(s).join(", ")+"}":e))}function _a(e){var s=e._init;return s(e._payload)}function yc(e){function s(h,d){if(e){var m=h.deletions;m===null?(h.deletions=[d],h.flags|=16):m.push(d)}}function n(h,d){if(!e)return null;for(;d!==null;)s(h,d),d=d.sibling;return null}function r(h,d){for(h=new Map;d!==null;)d.key!==null?h.set(d.key,d):h.set(d.index,d),d=d.sibling;return h}function i(h,d){return h=vt(h,d),h.index=0,h.sibling=null,h}function l(h,d,m){return h.index=m,e?(m=h.alternate,m!==null?(m=m.index,m<d?(h.flags|=2,d):m):(h.flags|=2,d)):(h.flags|=1048576,d)}function a(h){return e&&h.alternate===null&&(h.flags|=2),h}function o(h,d,m,g){return d===null||d.tag!==6?(d=Xr(m,h.mode,g),d.return=h,d):(d=i(d,m),d.return=h,d)}function c(h,d,m,g){var S=m.type;return S===Vt?f(h,d,m.props.children,g,m.key):d!==null&&(d.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ot&&_a(S)===d.type)?(g=i(d,m.props),g.ref=_s(h,d,m),g.return=h,g):(g=Hn(m.type,m.key,m.props,null,h.mode,g),g.ref=_s(h,d,m),g.return=h,g)}function u(h,d,m,g){return d===null||d.tag!==4||d.stateNode.containerInfo!==m.containerInfo||d.stateNode.implementation!==m.implementation?(d=Zr(m,h.mode,g),d.return=h,d):(d=i(d,m.children||[]),d.return=h,d)}function f(h,d,m,g,S){return d===null||d.tag!==7?(d=Pt(m,h.mode,g,S),d.return=h,d):(d=i(d,m),d.return=h,d)}function y(h,d,m){if(typeof d=="string"&&d!==""||typeof d=="number")return d=Xr(""+d,h.mode,m),d.return=h,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case fn:return m=Hn(d.type,d.key,d.props,null,h.mode,m),m.ref=_s(h,null,d),m.return=h,m;case Wt:return d=Zr(d,h.mode,m),d.return=h,d;case ot:var g=d._init;return y(h,g(d._payload),m)}if(Ls(d)||vs(d))return d=Pt(d,h.mode,m,null),d.return=h,d;En(h,d)}return null}function p(h,d,m,g){var S=d!==null?d.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return S!==null?null:o(h,d,""+m,g);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case fn:return m.key===S?c(h,d,m,g):null;case Wt:return m.key===S?u(h,d,m,g):null;case ot:return S=m._init,p(h,d,S(m._payload),g)}if(Ls(m)||vs(m))return S!==null?null:f(h,d,m,g,null);En(h,m)}return null}function x(h,d,m,g,S){if(typeof g=="string"&&g!==""||typeof g=="number")return h=h.get(m)||null,o(d,h,""+g,S);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case fn:return h=h.get(g.key===null?m:g.key)||null,c(d,h,g,S);case Wt:return h=h.get(g.key===null?m:g.key)||null,u(d,h,g,S);case ot:var E=g._init;return x(h,d,m,E(g._payload),S)}if(Ls(g)||vs(g))return h=h.get(m)||null,f(d,h,g,S,null);En(d,g)}return null}function w(h,d,m,g){for(var S=null,E=null,k=d,O=d=0,F=null;k!==null&&O<m.length;O++){k.index>O?(F=k,k=null):F=k.sibling;var D=p(h,k,m[O],g);if(D===null){k===null&&(k=F);break}e&&k&&D.alternate===null&&s(h,k),d=l(D,d,O),E===null?S=D:E.sibling=D,E=D,k=F}if(O===m.length)return n(h,k),W&&Ct(h,O),S;if(k===null){for(;O<m.length;O++)k=y(h,m[O],g),k!==null&&(d=l(k,d,O),E===null?S=k:E.sibling=k,E=k);return W&&Ct(h,O),S}for(k=r(h,k);O<m.length;O++)F=x(k,h,O,m[O],g),F!==null&&(e&&F.alternate!==null&&k.delete(F.key===null?O:F.key),d=l(F,d,O),E===null?S=F:E.sibling=F,E=F);return e&&k.forEach(function(X){return s(h,X)}),W&&Ct(h,O),S}function j(h,d,m,g){var S=vs(m);if(typeof S!="function")throw Error(v(150));if(m=S.call(m),m==null)throw Error(v(151));for(var E=S=null,k=d,O=d=0,F=null,D=m.next();k!==null&&!D.done;O++,D=m.next()){k.index>O?(F=k,k=null):F=k.sibling;var X=p(h,k,D.value,g);if(X===null){k===null&&(k=F);break}e&&k&&X.alternate===null&&s(h,k),d=l(X,d,O),E===null?S=X:E.sibling=X,E=X,k=F}if(D.done)return n(h,k),W&&Ct(h,O),S;if(k===null){for(;!D.done;O++,D=m.next())D=y(h,D.value,g),D!==null&&(d=l(D,d,O),E===null?S=D:E.sibling=D,E=D);return W&&Ct(h,O),S}for(k=r(h,k);!D.done;O++,D=m.next())D=x(k,h,O,D.value,g),D!==null&&(e&&D.alternate!==null&&k.delete(D.key===null?O:D.key),d=l(D,d,O),E===null?S=D:E.sibling=D,E=D);return e&&k.forEach(function(ve){return s(h,ve)}),W&&Ct(h,O),S}function L(h,d,m,g){if(typeof m=="object"&&m!==null&&m.type===Vt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case fn:e:{for(var S=m.key,E=d;E!==null;){if(E.key===S){if(S=m.type,S===Vt){if(E.tag===7){n(h,E.sibling),d=i(E,m.props.children),d.return=h,h=d;break e}}else if(E.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ot&&_a(S)===E.type){n(h,E.sibling),d=i(E,m.props),d.ref=_s(h,E,m),d.return=h,h=d;break e}n(h,E);break}else s(h,E);E=E.sibling}m.type===Vt?(d=Pt(m.props.children,h.mode,g,m.key),d.return=h,h=d):(g=Hn(m.type,m.key,m.props,null,h.mode,g),g.ref=_s(h,d,m),g.return=h,h=g)}return a(h);case Wt:e:{for(E=m.key;d!==null;){if(d.key===E)if(d.tag===4&&d.stateNode.containerInfo===m.containerInfo&&d.stateNode.implementation===m.implementation){n(h,d.sibling),d=i(d,m.children||[]),d.return=h,h=d;break e}else{n(h,d);break}else s(h,d);d=d.sibling}d=Zr(m,h.mode,g),d.return=h,h=d}return a(h);case ot:return E=m._init,L(h,d,E(m._payload),g)}if(Ls(m))return w(h,d,m,g);if(vs(m))return j(h,d,m,g);En(h,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,d!==null&&d.tag===6?(n(h,d.sibling),d=i(d,m),d.return=h,h=d):(n(h,d),d=Xr(m,h.mode,g),d.return=h,h=d),a(h)):n(h,d)}return L}var hs=yc(!0),xc=yc(!1),tr=Et(null),sr=null,es=null,xl=null;function gl(){xl=es=sr=null}function jl(e){var s=tr.current;G(tr),e._currentValue=s}function Di(e,s,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&s)!==s?(e.childLanes|=s,r!==null&&(r.childLanes|=s)):r!==null&&(r.childLanes&s)!==s&&(r.childLanes|=s),e===n)break;e=e.return}}function as(e,s){sr=e,xl=es=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&s&&(xe=!0),e.firstContext=null)}function Pe(e){var s=e._currentValue;if(xl!==e)if(e={context:e,memoizedValue:s,next:null},es===null){if(sr===null)throw Error(v(308));es=e,sr.dependencies={lanes:0,firstContext:e}}else es=es.next=e;return s}var Dt=null;function Nl(e){Dt===null?Dt=[e]:Dt.push(e)}function gc(e,s,n,r){var i=s.interleaved;return i===null?(n.next=n,Nl(s)):(n.next=i.next,i.next=n),s.interleaved=n,rt(e,r)}function rt(e,s){e.lanes|=s;var n=e.alternate;for(n!==null&&(n.lanes|=s),n=e,e=e.return;e!==null;)e.childLanes|=s,n=e.alternate,n!==null&&(n.childLanes|=s),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ct=!1;function vl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function jc(e,s){e=e.updateQueue,s.updateQueue===e&&(s.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function tt(e,s){return{eventTime:e,lane:s,tag:0,payload:null,callback:null,next:null}}function gt(e,s,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,z&2){var i=r.pending;return i===null?s.next=s:(s.next=i.next,i.next=s),r.pending=s,rt(e,n)}return i=r.interleaved,i===null?(s.next=s,Nl(r)):(s.next=i.next,i.next=s),r.interleaved=s,rt(e,n)}function In(e,s,n){if(s=s.updateQueue,s!==null&&(s=s.shared,(n&4194240)!==0)){var r=s.lanes;r&=e.pendingLanes,n|=r,s.lanes=n,ll(e,n)}}function Ta(e,s){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?i=l=a:l=l.next=a,n=n.next}while(n!==null);l===null?i=l=s:l=l.next=s}else i=l=s;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=s:e.next=s,n.lastBaseUpdate=s}function nr(e,s,n,r){var i=e.updateQueue;ct=!1;var l=i.firstBaseUpdate,a=i.lastBaseUpdate,o=i.shared.pending;if(o!==null){i.shared.pending=null;var c=o,u=c.next;c.next=null,a===null?l=u:a.next=u,a=c;var f=e.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=u:o.next=u,f.lastBaseUpdate=c))}if(l!==null){var y=i.baseState;a=0,f=u=c=null,o=l;do{var p=o.lane,x=o.eventTime;if((r&p)===p){f!==null&&(f=f.next={eventTime:x,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var w=e,j=o;switch(p=s,x=n,j.tag){case 1:if(w=j.payload,typeof w=="function"){y=w.call(x,y,p);break e}y=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=j.payload,p=typeof w=="function"?w.call(x,y,p):w,p==null)break e;y=Q({},y,p);break e;case 2:ct=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[o]:p.push(o))}else x={eventTime:x,lane:p,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(u=f=x,c=y):f=f.next=x,a|=p;if(o=o.next,o===null){if(o=i.shared.pending,o===null)break;p=o,o=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(f===null&&(c=y),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=f,s=i.shared.interleaved,s!==null){i=s;do a|=i.lane,i=i.next;while(i!==s)}else l===null&&(i.shared.lanes=0);zt|=a,e.lanes=a,e.memoizedState=y}}function Ca(e,s,n){if(e=s.effects,s.effects=null,e!==null)for(s=0;s<e.length;s++){var r=e[s],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(v(191,i));i.call(r)}}}var dn={},Qe=Et(dn),Zs=Et(dn),en=Et(dn);function At(e){if(e===dn)throw Error(v(174));return e}function wl(e,s){switch(H(en,s),H(Zs,e),H(Qe,dn),e=s.nodeType,e){case 9:case 11:s=(s=s.documentElement)?s.namespaceURI:ui(null,"");break;default:e=e===8?s.parentNode:s,s=e.namespaceURI||null,e=e.tagName,s=ui(s,e)}G(Qe),H(Qe,s)}function ms(){G(Qe),G(Zs),G(en)}function Nc(e){At(en.current);var s=At(Qe.current),n=ui(s,e.type);s!==n&&(H(Zs,e),H(Qe,n))}function Sl(e){Zs.current===e&&(G(Qe),G(Zs))}var V=Et(0);function rr(e){for(var s=e;s!==null;){if(s.tag===13){var n=s.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return s}else if(s.tag===19&&s.memoizedProps.revealOrder!==void 0){if(s.flags&128)return s}else if(s.child!==null){s.child.return=s,s=s.child;continue}if(s===e)break;for(;s.sibling===null;){if(s.return===null||s.return===e)return null;s=s.return}s.sibling.return=s.return,s=s.sibling}return null}var Vr=[];function kl(){for(var e=0;e<Vr.length;e++)Vr[e]._workInProgressVersionPrimary=null;Vr.length=0}var bn=lt.ReactCurrentDispatcher,qr=lt.ReactCurrentBatchConfig,Bt=0,q=null,ee=null,se=null,ir=!1,zs=!1,tn=0,wh=0;function ae(){throw Error(v(321))}function El(e,s){if(s===null)return!1;for(var n=0;n<s.length&&n<e.length;n++)if(!Ue(e[n],s[n]))return!1;return!0}function _l(e,s,n,r,i,l){if(Bt=l,q=s,s.memoizedState=null,s.updateQueue=null,s.lanes=0,bn.current=e===null||e.memoizedState===null?_h:Th,e=n(r,i),zs){l=0;do{if(zs=!1,tn=0,25<=l)throw Error(v(301));l+=1,se=ee=null,s.updateQueue=null,bn.current=Ch,e=n(r,i)}while(zs)}if(bn.current=lr,s=ee!==null&&ee.next!==null,Bt=0,se=ee=q=null,ir=!1,s)throw Error(v(300));return e}function Tl(){var e=tn!==0;return tn=0,e}function We(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return se===null?q.memoizedState=se=e:se=se.next=e,se}function Ie(){if(ee===null){var e=q.alternate;e=e!==null?e.memoizedState:null}else e=ee.next;var s=se===null?q.memoizedState:se.next;if(s!==null)se=s,ee=e;else{if(e===null)throw Error(v(310));ee=e,e={memoizedState:ee.memoizedState,baseState:ee.baseState,baseQueue:ee.baseQueue,queue:ee.queue,next:null},se===null?q.memoizedState=se=e:se=se.next=e}return se}function sn(e,s){return typeof s=="function"?s(e):s}function Qr(e){var s=Ie(),n=s.queue;if(n===null)throw Error(v(311));n.lastRenderedReducer=e;var r=ee,i=r.baseQueue,l=n.pending;if(l!==null){if(i!==null){var a=i.next;i.next=l.next,l.next=a}r.baseQueue=i=l,n.pending=null}if(i!==null){l=i.next,r=r.baseState;var o=a=null,c=null,u=l;do{var f=u.lane;if((Bt&f)===f)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var y={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(o=c=y,a=r):c=c.next=y,q.lanes|=f,zt|=f}u=u.next}while(u!==null&&u!==l);c===null?a=r:c.next=o,Ue(r,s.memoizedState)||(xe=!0),s.memoizedState=r,s.baseState=a,s.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do l=i.lane,q.lanes|=l,zt|=l,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[s.memoizedState,n.dispatch]}function Kr(e){var s=Ie(),n=s.queue;if(n===null)throw Error(v(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,l=s.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do l=e(l,a.action),a=a.next;while(a!==i);Ue(l,s.memoizedState)||(xe=!0),s.memoizedState=l,s.baseQueue===null&&(s.baseState=l),n.lastRenderedState=l}return[l,r]}function vc(){}function wc(e,s){var n=q,r=Ie(),i=s(),l=!Ue(r.memoizedState,i);if(l&&(r.memoizedState=i,xe=!0),r=r.queue,Cl(Ec.bind(null,n,r,e),[e]),r.getSnapshot!==s||l||se!==null&&se.memoizedState.tag&1){if(n.flags|=2048,nn(9,kc.bind(null,n,r,i,s),void 0,null),ne===null)throw Error(v(349));Bt&30||Sc(n,s,i)}return i}function Sc(e,s,n){e.flags|=16384,e={getSnapshot:s,value:n},s=q.updateQueue,s===null?(s={lastEffect:null,stores:null},q.updateQueue=s,s.stores=[e]):(n=s.stores,n===null?s.stores=[e]:n.push(e))}function kc(e,s,n,r){s.value=n,s.getSnapshot=r,_c(s)&&Tc(e)}function Ec(e,s,n){return n(function(){_c(s)&&Tc(e)})}function _c(e){var s=e.getSnapshot;e=e.value;try{var n=s();return!Ue(e,n)}catch{return!0}}function Tc(e){var s=rt(e,1);s!==null&&He(s,e,1,-1)}function Oa(e){var s=We();return typeof e=="function"&&(e=e()),s.memoizedState=s.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:sn,lastRenderedState:e},s.queue=e,e=e.dispatch=Eh.bind(null,q,e),[s.memoizedState,e]}function nn(e,s,n,r){return e={tag:e,create:s,destroy:n,deps:r,next:null},s=q.updateQueue,s===null?(s={lastEffect:null,stores:null},q.updateQueue=s,s.lastEffect=e.next=e):(n=s.lastEffect,n===null?s.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,s.lastEffect=e)),e}function Cc(){return Ie().memoizedState}function Bn(e,s,n,r){var i=We();q.flags|=e,i.memoizedState=nn(1|s,n,void 0,r===void 0?null:r)}function jr(e,s,n,r){var i=Ie();r=r===void 0?null:r;var l=void 0;if(ee!==null){var a=ee.memoizedState;if(l=a.destroy,r!==null&&El(r,a.deps)){i.memoizedState=nn(s,n,l,r);return}}q.flags|=e,i.memoizedState=nn(1|s,n,l,r)}function La(e,s){return Bn(8390656,8,e,s)}function Cl(e,s){return jr(2048,8,e,s)}function Oc(e,s){return jr(4,2,e,s)}function Lc(e,s){return jr(4,4,e,s)}function Dc(e,s){if(typeof s=="function")return e=e(),s(e),function(){s(null)};if(s!=null)return e=e(),s.current=e,function(){s.current=null}}function Ac(e,s,n){return n=n!=null?n.concat([e]):null,jr(4,4,Dc.bind(null,s,e),n)}function Ol(){}function Rc(e,s){var n=Ie();s=s===void 0?null:s;var r=n.memoizedState;return r!==null&&s!==null&&El(s,r[1])?r[0]:(n.memoizedState=[e,s],e)}function Pc(e,s){var n=Ie();s=s===void 0?null:s;var r=n.memoizedState;return r!==null&&s!==null&&El(s,r[1])?r[0]:(e=e(),n.memoizedState=[e,s],e)}function Ic(e,s,n){return Bt&21?(Ue(n,s)||(n=Mo(),q.lanes|=n,zt|=n,e.baseState=!0),s):(e.baseState&&(e.baseState=!1,xe=!0),e.memoizedState=n)}function Sh(e,s){var n=M;M=n!==0&&4>n?n:4,e(!0);var r=qr.transition;qr.transition={};try{e(!1),s()}finally{M=n,qr.transition=r}}function bc(){return Ie().memoizedState}function kh(e,s,n){var r=Nt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Bc(e))zc(s,n);else if(n=gc(e,s,n,r),n!==null){var i=he();He(n,e,r,i),Fc(n,s,r)}}function Eh(e,s,n){var r=Nt(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Bc(e))zc(s,i);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=s.lastRenderedReducer,l!==null))try{var a=s.lastRenderedState,o=l(a,n);if(i.hasEagerState=!0,i.eagerState=o,Ue(o,a)){var c=s.interleaved;c===null?(i.next=i,Nl(s)):(i.next=c.next,c.next=i),s.interleaved=i;return}}catch{}finally{}n=gc(e,s,i,r),n!==null&&(i=he(),He(n,e,r,i),Fc(n,s,r))}}function Bc(e){var s=e.alternate;return e===q||s!==null&&s===q}function zc(e,s){zs=ir=!0;var n=e.pending;n===null?s.next=s:(s.next=n.next,n.next=s),e.pending=s}function Fc(e,s,n){if(n&4194240){var r=s.lanes;r&=e.pendingLanes,n|=r,s.lanes=n,ll(e,n)}}var lr={readContext:Pe,useCallback:ae,useContext:ae,useEffect:ae,useImperativeHandle:ae,useInsertionEffect:ae,useLayoutEffect:ae,useMemo:ae,useReducer:ae,useRef:ae,useState:ae,useDebugValue:ae,useDeferredValue:ae,useTransition:ae,useMutableSource:ae,useSyncExternalStore:ae,useId:ae,unstable_isNewReconciler:!1},_h={readContext:Pe,useCallback:function(e,s){return We().memoizedState=[e,s===void 0?null:s],e},useContext:Pe,useEffect:La,useImperativeHandle:function(e,s,n){return n=n!=null?n.concat([e]):null,Bn(4194308,4,Dc.bind(null,s,e),n)},useLayoutEffect:function(e,s){return Bn(4194308,4,e,s)},useInsertionEffect:function(e,s){return Bn(4,2,e,s)},useMemo:function(e,s){var n=We();return s=s===void 0?null:s,e=e(),n.memoizedState=[e,s],e},useReducer:function(e,s,n){var r=We();return s=n!==void 0?n(s):s,r.memoizedState=r.baseState=s,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},r.queue=e,e=e.dispatch=kh.bind(null,q,e),[r.memoizedState,e]},useRef:function(e){var s=We();return e={current:e},s.memoizedState=e},useState:Oa,useDebugValue:Ol,useDeferredValue:function(e){return We().memoizedState=e},useTransition:function(){var e=Oa(!1),s=e[0];return e=Sh.bind(null,e[1]),We().memoizedState=e,[s,e]},useMutableSource:function(){},useSyncExternalStore:function(e,s,n){var r=q,i=We();if(W){if(n===void 0)throw Error(v(407));n=n()}else{if(n=s(),ne===null)throw Error(v(349));Bt&30||Sc(r,s,n)}i.memoizedState=n;var l={value:n,getSnapshot:s};return i.queue=l,La(Ec.bind(null,r,l,e),[e]),r.flags|=2048,nn(9,kc.bind(null,r,l,n,s),void 0,null),n},useId:function(){var e=We(),s=ne.identifierPrefix;if(W){var n=et,r=Ze;n=(r&~(1<<32-Me(r)-1)).toString(32)+n,s=":"+s+"R"+n,n=tn++,0<n&&(s+="H"+n.toString(32)),s+=":"}else n=wh++,s=":"+s+"r"+n.toString(32)+":";return e.memoizedState=s},unstable_isNewReconciler:!1},Th={readContext:Pe,useCallback:Rc,useContext:Pe,useEffect:Cl,useImperativeHandle:Ac,useInsertionEffect:Oc,useLayoutEffect:Lc,useMemo:Pc,useReducer:Qr,useRef:Cc,useState:function(){return Qr(sn)},useDebugValue:Ol,useDeferredValue:function(e){var s=Ie();return Ic(s,ee.memoizedState,e)},useTransition:function(){var e=Qr(sn)[0],s=Ie().memoizedState;return[e,s]},useMutableSource:vc,useSyncExternalStore:wc,useId:bc,unstable_isNewReconciler:!1},Ch={readContext:Pe,useCallback:Rc,useContext:Pe,useEffect:Cl,useImperativeHandle:Ac,useInsertionEffect:Oc,useLayoutEffect:Lc,useMemo:Pc,useReducer:Kr,useRef:Cc,useState:function(){return Kr(sn)},useDebugValue:Ol,useDeferredValue:function(e){var s=Ie();return ee===null?s.memoizedState=e:Ic(s,ee.memoizedState,e)},useTransition:function(){var e=Kr(sn)[0],s=Ie().memoizedState;return[e,s]},useMutableSource:vc,useSyncExternalStore:wc,useId:bc,unstable_isNewReconciler:!1};function Be(e,s){if(e&&e.defaultProps){s=Q({},s),e=e.defaultProps;for(var n in e)s[n]===void 0&&(s[n]=e[n]);return s}return s}function Ai(e,s,n,r){s=e.memoizedState,n=n(r,s),n=n==null?s:Q({},s,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Nr={isMounted:function(e){return(e=e._reactInternals)?Ut(e)===e:!1},enqueueSetState:function(e,s,n){e=e._reactInternals;var r=he(),i=Nt(e),l=tt(r,i);l.payload=s,n!=null&&(l.callback=n),s=gt(e,l,i),s!==null&&(He(s,e,i,r),In(s,e,i))},enqueueReplaceState:function(e,s,n){e=e._reactInternals;var r=he(),i=Nt(e),l=tt(r,i);l.tag=1,l.payload=s,n!=null&&(l.callback=n),s=gt(e,l,i),s!==null&&(He(s,e,i,r),In(s,e,i))},enqueueForceUpdate:function(e,s){e=e._reactInternals;var n=he(),r=Nt(e),i=tt(n,r);i.tag=2,s!=null&&(i.callback=s),s=gt(e,i,r),s!==null&&(He(s,e,r,n),In(s,e,r))}};function Da(e,s,n,r,i,l,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,a):s.prototype&&s.prototype.isPureReactComponent?!Ks(n,r)||!Ks(i,l):!0}function Mc(e,s,n){var r=!1,i=St,l=s.contextType;return typeof l=="object"&&l!==null?l=Pe(l):(i=je(s)?It:de.current,r=s.contextTypes,l=(r=r!=null)?ds(e,i):St),s=new s(n,l),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=Nr,e.stateNode=s,s._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=l),s}function Aa(e,s,n,r){e=s.state,typeof s.componentWillReceiveProps=="function"&&s.componentWillReceiveProps(n,r),typeof s.UNSAFE_componentWillReceiveProps=="function"&&s.UNSAFE_componentWillReceiveProps(n,r),s.state!==e&&Nr.enqueueReplaceState(s,s.state,null)}function Ri(e,s,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},vl(e);var l=s.contextType;typeof l=="object"&&l!==null?i.context=Pe(l):(l=je(s)?It:de.current,i.context=ds(e,l)),i.state=e.memoizedState,l=s.getDerivedStateFromProps,typeof l=="function"&&(Ai(e,s,l,n),i.state=e.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(s=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),s!==i.state&&Nr.enqueueReplaceState(i,i.state,null),nr(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function fs(e,s){try{var n="",r=s;do n+=su(r),r=r.return;while(r);var i=n}catch(l){i=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:s,stack:i,digest:null}}function Yr(e,s,n){return{value:e,source:null,stack:n??null,digest:s??null}}function Pi(e,s){try{console.error(s.value)}catch(n){setTimeout(function(){throw n})}}var Oh=typeof WeakMap=="function"?WeakMap:Map;function Hc(e,s,n){n=tt(-1,n),n.tag=3,n.payload={element:null};var r=s.value;return n.callback=function(){or||(or=!0,$i=r),Pi(e,s)},n}function Uc(e,s,n){n=tt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=s.value;n.payload=function(){return r(i)},n.callback=function(){Pi(e,s)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){Pi(e,s),typeof r!="function"&&(jt===null?jt=new Set([this]):jt.add(this));var a=s.stack;this.componentDidCatch(s.value,{componentStack:a!==null?a:""})}),n}function Ra(e,s,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Oh;var i=new Set;r.set(s,i)}else i=r.get(s),i===void 0&&(i=new Set,r.set(s,i));i.has(n)||(i.add(n),e=Gh.bind(null,e,s,n),s.then(e,e))}function Pa(e){do{var s;if((s=e.tag===13)&&(s=e.memoizedState,s=s!==null?s.dehydrated!==null:!0),s)return e;e=e.return}while(e!==null);return null}function Ia(e,s,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===s?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(s=tt(-1,1),s.tag=2,gt(n,s,1))),n.lanes|=1),e)}var Lh=lt.ReactCurrentOwner,xe=!1;function ue(e,s,n,r){s.child=e===null?xc(s,null,n,r):hs(s,e.child,n,r)}function ba(e,s,n,r,i){n=n.render;var l=s.ref;return as(s,i),r=_l(e,s,n,r,l,i),n=Tl(),e!==null&&!xe?(s.updateQueue=e.updateQueue,s.flags&=-2053,e.lanes&=~i,it(e,s,i)):(W&&n&&fl(s),s.flags|=1,ue(e,s,r,i),s.child)}function Ba(e,s,n,r,i){if(e===null){var l=n.type;return typeof l=="function"&&!Bl(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(s.tag=15,s.type=l,Gc(e,s,l,r,i)):(e=Hn(n.type,null,r,s,s.mode,i),e.ref=s.ref,e.return=s,s.child=e)}if(l=e.child,!(e.lanes&i)){var a=l.memoizedProps;if(n=n.compare,n=n!==null?n:Ks,n(a,r)&&e.ref===s.ref)return it(e,s,i)}return s.flags|=1,e=vt(l,r),e.ref=s.ref,e.return=s,s.child=e}function Gc(e,s,n,r,i){if(e!==null){var l=e.memoizedProps;if(Ks(l,r)&&e.ref===s.ref)if(xe=!1,s.pendingProps=r=l,(e.lanes&i)!==0)e.flags&131072&&(xe=!0);else return s.lanes=e.lanes,it(e,s,i)}return Ii(e,s,n,r,i)}function $c(e,s,n){var r=s.pendingProps,i=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(s.mode&1))s.memoizedState={baseLanes:0,cachePool:null,transitions:null},H(ss,we),we|=n;else{if(!(n&1073741824))return e=l!==null?l.baseLanes|n:n,s.lanes=s.childLanes=1073741824,s.memoizedState={baseLanes:e,cachePool:null,transitions:null},s.updateQueue=null,H(ss,we),we|=e,null;s.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,H(ss,we),we|=r}else l!==null?(r=l.baseLanes|n,s.memoizedState=null):r=n,H(ss,we),we|=r;return ue(e,s,i,n),s.child}function Wc(e,s){var n=s.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(s.flags|=512,s.flags|=2097152)}function Ii(e,s,n,r,i){var l=je(n)?It:de.current;return l=ds(s,l),as(s,i),n=_l(e,s,n,r,l,i),r=Tl(),e!==null&&!xe?(s.updateQueue=e.updateQueue,s.flags&=-2053,e.lanes&=~i,it(e,s,i)):(W&&r&&fl(s),s.flags|=1,ue(e,s,n,i),s.child)}function za(e,s,n,r,i){if(je(n)){var l=!0;Xn(s)}else l=!1;if(as(s,i),s.stateNode===null)zn(e,s),Mc(s,n,r),Ri(s,n,r,i),r=!0;else if(e===null){var a=s.stateNode,o=s.memoizedProps;a.props=o;var c=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=Pe(u):(u=je(n)?It:de.current,u=ds(s,u));var f=n.getDerivedStateFromProps,y=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";y||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==r||c!==u)&&Aa(s,a,r,u),ct=!1;var p=s.memoizedState;a.state=p,nr(s,r,a,i),c=s.memoizedState,o!==r||p!==c||ge.current||ct?(typeof f=="function"&&(Ai(s,n,f,r),c=s.memoizedState),(o=ct||Da(s,n,o,r,p,c,u))?(y||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(s.flags|=4194308)):(typeof a.componentDidMount=="function"&&(s.flags|=4194308),s.memoizedProps=r,s.memoizedState=c),a.props=r,a.state=c,a.context=u,r=o):(typeof a.componentDidMount=="function"&&(s.flags|=4194308),r=!1)}else{a=s.stateNode,jc(e,s),o=s.memoizedProps,u=s.type===s.elementType?o:Be(s.type,o),a.props=u,y=s.pendingProps,p=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=Pe(c):(c=je(n)?It:de.current,c=ds(s,c));var x=n.getDerivedStateFromProps;(f=typeof x=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==y||p!==c)&&Aa(s,a,r,c),ct=!1,p=s.memoizedState,a.state=p,nr(s,r,a,i);var w=s.memoizedState;o!==y||p!==w||ge.current||ct?(typeof x=="function"&&(Ai(s,n,x,r),w=s.memoizedState),(u=ct||Da(s,n,u,r,p,w,c)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,w,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,w,c)),typeof a.componentDidUpdate=="function"&&(s.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(s.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&p===e.memoizedState||(s.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&p===e.memoizedState||(s.flags|=1024),s.memoizedProps=r,s.memoizedState=w),a.props=r,a.state=w,a.context=c,r=u):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&p===e.memoizedState||(s.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&p===e.memoizedState||(s.flags|=1024),r=!1)}return bi(e,s,n,r,l,i)}function bi(e,s,n,r,i,l){Wc(e,s);var a=(s.flags&128)!==0;if(!r&&!a)return i&&Sa(s,n,!1),it(e,s,l);r=s.stateNode,Lh.current=s;var o=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return s.flags|=1,e!==null&&a?(s.child=hs(s,e.child,null,l),s.child=hs(s,null,o,l)):ue(e,s,o,l),s.memoizedState=r.state,i&&Sa(s,n,!0),s.child}function Vc(e){var s=e.stateNode;s.pendingContext?wa(e,s.pendingContext,s.pendingContext!==s.context):s.context&&wa(e,s.context,!1),wl(e,s.containerInfo)}function Fa(e,s,n,r,i){return us(),yl(i),s.flags|=256,ue(e,s,n,r),s.child}var Bi={dehydrated:null,treeContext:null,retryLane:0};function zi(e){return{baseLanes:e,cachePool:null,transitions:null}}function qc(e,s,n){var r=s.pendingProps,i=V.current,l=!1,a=(s.flags&128)!==0,o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:(i&2)!==0),o?(l=!0,s.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),H(V,i&1),e===null)return Li(s),e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(s.mode&1?e.data==="$!"?s.lanes=8:s.lanes=1073741824:s.lanes=1,null):(a=r.children,e=r.fallback,l?(r=s.mode,l=s.child,a={mode:"hidden",children:a},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=a):l=Sr(a,r,0,null),e=Pt(e,r,n,null),l.return=s,e.return=s,l.sibling=e,s.child=l,s.child.memoizedState=zi(n),s.memoizedState=Bi,e):Ll(s,a));if(i=e.memoizedState,i!==null&&(o=i.dehydrated,o!==null))return Dh(e,s,a,r,o,i,n);if(l){l=r.fallback,a=s.mode,i=e.child,o=i.sibling;var c={mode:"hidden",children:r.children};return!(a&1)&&s.child!==i?(r=s.child,r.childLanes=0,r.pendingProps=c,s.deletions=null):(r=vt(i,c),r.subtreeFlags=i.subtreeFlags&14680064),o!==null?l=vt(o,l):(l=Pt(l,a,n,null),l.flags|=2),l.return=s,r.return=s,r.sibling=l,s.child=r,r=l,l=s.child,a=e.child.memoizedState,a=a===null?zi(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},l.memoizedState=a,l.childLanes=e.childLanes&~n,s.memoizedState=Bi,r}return l=e.child,e=l.sibling,r=vt(l,{mode:"visible",children:r.children}),!(s.mode&1)&&(r.lanes=n),r.return=s,r.sibling=null,e!==null&&(n=s.deletions,n===null?(s.deletions=[e],s.flags|=16):n.push(e)),s.child=r,s.memoizedState=null,r}function Ll(e,s){return s=Sr({mode:"visible",children:s},e.mode,0,null),s.return=e,e.child=s}function _n(e,s,n,r){return r!==null&&yl(r),hs(s,e.child,null,n),e=Ll(s,s.pendingProps.children),e.flags|=2,s.memoizedState=null,e}function Dh(e,s,n,r,i,l,a){if(n)return s.flags&256?(s.flags&=-257,r=Yr(Error(v(422))),_n(e,s,a,r)):s.memoizedState!==null?(s.child=e.child,s.flags|=128,null):(l=r.fallback,i=s.mode,r=Sr({mode:"visible",children:r.children},i,0,null),l=Pt(l,i,a,null),l.flags|=2,r.return=s,l.return=s,r.sibling=l,s.child=r,s.mode&1&&hs(s,e.child,null,a),s.child.memoizedState=zi(a),s.memoizedState=Bi,l);if(!(s.mode&1))return _n(e,s,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var o=r.dgst;return r=o,l=Error(v(419)),r=Yr(l,r,void 0),_n(e,s,a,r)}if(o=(a&e.childLanes)!==0,xe||o){if(r=ne,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==l.retryLane&&(l.retryLane=i,rt(e,i),He(r,e,i,-1))}return bl(),r=Yr(Error(v(421))),_n(e,s,a,r)}return i.data==="$?"?(s.flags|=128,s.child=e.child,s=$h.bind(null,e),i._reactRetry=s,null):(e=l.treeContext,ke=xt(i.nextSibling),Ee=s,W=!0,Fe=null,e!==null&&(Le[De++]=Ze,Le[De++]=et,Le[De++]=bt,Ze=e.id,et=e.overflow,bt=s),s=Ll(s,r.children),s.flags|=4096,s)}function Ma(e,s,n){e.lanes|=s;var r=e.alternate;r!==null&&(r.lanes|=s),Di(e.return,s,n)}function Jr(e,s,n,r,i){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:s,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(l.isBackwards=s,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=i)}function Qc(e,s,n){var r=s.pendingProps,i=r.revealOrder,l=r.tail;if(ue(e,s,r.children,n),r=V.current,r&2)r=r&1|2,s.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=s.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ma(e,n,s);else if(e.tag===19)Ma(e,n,s);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===s)break e;for(;e.sibling===null;){if(e.return===null||e.return===s)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(H(V,r),!(s.mode&1))s.memoizedState=null;else switch(i){case"forwards":for(n=s.child,i=null;n!==null;)e=n.alternate,e!==null&&rr(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=s.child,s.child=null):(i=n.sibling,n.sibling=null),Jr(s,!1,i,n,l);break;case"backwards":for(n=null,i=s.child,s.child=null;i!==null;){if(e=i.alternate,e!==null&&rr(e)===null){s.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Jr(s,!0,n,null,l);break;case"together":Jr(s,!1,null,null,void 0);break;default:s.memoizedState=null}return s.child}function zn(e,s){!(s.mode&1)&&e!==null&&(e.alternate=null,s.alternate=null,s.flags|=2)}function it(e,s,n){if(e!==null&&(s.dependencies=e.dependencies),zt|=s.lanes,!(n&s.childLanes))return null;if(e!==null&&s.child!==e.child)throw Error(v(153));if(s.child!==null){for(e=s.child,n=vt(e,e.pendingProps),s.child=n,n.return=s;e.sibling!==null;)e=e.sibling,n=n.sibling=vt(e,e.pendingProps),n.return=s;n.sibling=null}return s.child}function Ah(e,s,n){switch(s.tag){case 3:Vc(s),us();break;case 5:Nc(s);break;case 1:je(s.type)&&Xn(s);break;case 4:wl(s,s.stateNode.containerInfo);break;case 10:var r=s.type._context,i=s.memoizedProps.value;H(tr,r._currentValue),r._currentValue=i;break;case 13:if(r=s.memoizedState,r!==null)return r.dehydrated!==null?(H(V,V.current&1),s.flags|=128,null):n&s.child.childLanes?qc(e,s,n):(H(V,V.current&1),e=it(e,s,n),e!==null?e.sibling:null);H(V,V.current&1);break;case 19:if(r=(n&s.childLanes)!==0,e.flags&128){if(r)return Qc(e,s,n);s.flags|=128}if(i=s.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),H(V,V.current),r)break;return null;case 22:case 23:return s.lanes=0,$c(e,s,n)}return it(e,s,n)}var Kc,Fi,Yc,Jc;Kc=function(e,s){for(var n=s.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===s)break;for(;n.sibling===null;){if(n.return===null||n.return===s)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Fi=function(){};Yc=function(e,s,n,r){var i=e.memoizedProps;if(i!==r){e=s.stateNode,At(Qe.current);var l=null;switch(n){case"input":i=ai(e,i),r=ai(e,r),l=[];break;case"select":i=Q({},i,{value:void 0}),r=Q({},r,{value:void 0}),l=[];break;case"textarea":i=di(e,i),r=di(e,r),l=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Yn)}hi(n,r);var a;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var o=i[u];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Us.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var c=r[u];if(o=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&c!==o&&(c!=null||o!=null))if(u==="style")if(o){for(a in o)!o.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&o[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(l||(l=[]),l.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,o=o?o.__html:void 0,c!=null&&o!==c&&(l=l||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(l=l||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Us.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&U("scroll",e),l||o===c||(l=[])):(l=l||[]).push(u,c))}n&&(l=l||[]).push("style",n);var u=l;(s.updateQueue=u)&&(s.flags|=4)}};Jc=function(e,s,n,r){n!==r&&(s.flags|=4)};function Ts(e,s){if(!W)switch(e.tailMode){case"hidden":s=e.tail;for(var n=null;s!==null;)s.alternate!==null&&(n=s),s=s.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?s||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function oe(e){var s=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(s)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,s}function Rh(e,s,n){var r=s.pendingProps;switch(pl(s),s.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return oe(s),null;case 1:return je(s.type)&&Jn(),oe(s),null;case 3:return r=s.stateNode,ms(),G(ge),G(de),kl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(kn(s)?s.flags|=4:e===null||e.memoizedState.isDehydrated&&!(s.flags&256)||(s.flags|=1024,Fe!==null&&(qi(Fe),Fe=null))),Fi(e,s),oe(s),null;case 5:Sl(s);var i=At(en.current);if(n=s.type,e!==null&&s.stateNode!=null)Yc(e,s,n,r,i),e.ref!==s.ref&&(s.flags|=512,s.flags|=2097152);else{if(!r){if(s.stateNode===null)throw Error(v(166));return oe(s),null}if(e=At(Qe.current),kn(s)){r=s.stateNode,n=s.type;var l=s.memoizedProps;switch(r[Ve]=s,r[Xs]=l,e=(s.mode&1)!==0,n){case"dialog":U("cancel",r),U("close",r);break;case"iframe":case"object":case"embed":U("load",r);break;case"video":case"audio":for(i=0;i<As.length;i++)U(As[i],r);break;case"source":U("error",r);break;case"img":case"image":case"link":U("error",r),U("load",r);break;case"details":U("toggle",r);break;case"input":Kl(r,l),U("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},U("invalid",r);break;case"textarea":Jl(r,l),U("invalid",r)}hi(n,l),i=null;for(var a in l)if(l.hasOwnProperty(a)){var o=l[a];a==="children"?typeof o=="string"?r.textContent!==o&&(l.suppressHydrationWarning!==!0&&Sn(r.textContent,o,e),i=["children",o]):typeof o=="number"&&r.textContent!==""+o&&(l.suppressHydrationWarning!==!0&&Sn(r.textContent,o,e),i=["children",""+o]):Us.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&U("scroll",r)}switch(n){case"input":pn(r),Yl(r,l,!0);break;case"textarea":pn(r),Xl(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Yn)}r=i,s.updateQueue=r,r!==null&&(s.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Eo(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[Ve]=s,e[Xs]=r,Kc(e,s,!1,!1),s.stateNode=e;e:{switch(a=mi(n,r),n){case"dialog":U("cancel",e),U("close",e),i=r;break;case"iframe":case"object":case"embed":U("load",e),i=r;break;case"video":case"audio":for(i=0;i<As.length;i++)U(As[i],e);i=r;break;case"source":U("error",e),i=r;break;case"img":case"image":case"link":U("error",e),U("load",e),i=r;break;case"details":U("toggle",e),i=r;break;case"input":Kl(e,r),i=ai(e,r),U("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=Q({},r,{value:void 0}),U("invalid",e);break;case"textarea":Jl(e,r),i=di(e,r),U("invalid",e);break;default:i=r}hi(n,i),o=i;for(l in o)if(o.hasOwnProperty(l)){var c=o[l];l==="style"?Co(e,c):l==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&_o(e,c)):l==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Gs(e,c):typeof c=="number"&&Gs(e,""+c):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Us.hasOwnProperty(l)?c!=null&&l==="onScroll"&&U("scroll",e):c!=null&&el(e,l,c,a))}switch(n){case"input":pn(e),Yl(e,r,!1);break;case"textarea":pn(e),Xl(e);break;case"option":r.value!=null&&e.setAttribute("value",""+wt(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?ns(e,!!r.multiple,l,!1):r.defaultValue!=null&&ns(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Yn)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(s.flags|=4)}s.ref!==null&&(s.flags|=512,s.flags|=2097152)}return oe(s),null;case 6:if(e&&s.stateNode!=null)Jc(e,s,e.memoizedProps,r);else{if(typeof r!="string"&&s.stateNode===null)throw Error(v(166));if(n=At(en.current),At(Qe.current),kn(s)){if(r=s.stateNode,n=s.memoizedProps,r[Ve]=s,(l=r.nodeValue!==n)&&(e=Ee,e!==null))switch(e.tag){case 3:Sn(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Sn(r.nodeValue,n,(e.mode&1)!==0)}l&&(s.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ve]=s,s.stateNode=r}return oe(s),null;case 13:if(G(V),r=s.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(W&&ke!==null&&s.mode&1&&!(s.flags&128))pc(),us(),s.flags|=98560,l=!1;else if(l=kn(s),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(v(318));if(l=s.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(v(317));l[Ve]=s}else us(),!(s.flags&128)&&(s.memoizedState=null),s.flags|=4;oe(s),l=!1}else Fe!==null&&(qi(Fe),Fe=null),l=!0;if(!l)return s.flags&65536?s:null}return s.flags&128?(s.lanes=n,s):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(s.child.flags|=8192,s.mode&1&&(e===null||V.current&1?te===0&&(te=3):bl())),s.updateQueue!==null&&(s.flags|=4),oe(s),null);case 4:return ms(),Fi(e,s),e===null&&Ys(s.stateNode.containerInfo),oe(s),null;case 10:return jl(s.type._context),oe(s),null;case 17:return je(s.type)&&Jn(),oe(s),null;case 19:if(G(V),l=s.memoizedState,l===null)return oe(s),null;if(r=(s.flags&128)!==0,a=l.rendering,a===null)if(r)Ts(l,!1);else{if(te!==0||e!==null&&e.flags&128)for(e=s.child;e!==null;){if(a=rr(e),a!==null){for(s.flags|=128,Ts(l,!1),r=a.updateQueue,r!==null&&(s.updateQueue=r,s.flags|=4),s.subtreeFlags=0,r=n,n=s.child;n!==null;)l=n,e=r,l.flags&=14680066,a=l.alternate,a===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=a.childLanes,l.lanes=a.lanes,l.child=a.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=a.memoizedProps,l.memoizedState=a.memoizedState,l.updateQueue=a.updateQueue,l.type=a.type,e=a.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return H(V,V.current&1|2),s.child}e=e.sibling}l.tail!==null&&J()>ps&&(s.flags|=128,r=!0,Ts(l,!1),s.lanes=4194304)}else{if(!r)if(e=rr(a),e!==null){if(s.flags|=128,r=!0,n=e.updateQueue,n!==null&&(s.updateQueue=n,s.flags|=4),Ts(l,!0),l.tail===null&&l.tailMode==="hidden"&&!a.alternate&&!W)return oe(s),null}else 2*J()-l.renderingStartTime>ps&&n!==1073741824&&(s.flags|=128,r=!0,Ts(l,!1),s.lanes=4194304);l.isBackwards?(a.sibling=s.child,s.child=a):(n=l.last,n!==null?n.sibling=a:s.child=a,l.last=a)}return l.tail!==null?(s=l.tail,l.rendering=s,l.tail=s.sibling,l.renderingStartTime=J(),s.sibling=null,n=V.current,H(V,r?n&1|2:n&1),s):(oe(s),null);case 22:case 23:return Il(),r=s.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(s.flags|=8192),r&&s.mode&1?we&1073741824&&(oe(s),s.subtreeFlags&6&&(s.flags|=8192)):oe(s),null;case 24:return null;case 25:return null}throw Error(v(156,s.tag))}function Ph(e,s){switch(pl(s),s.tag){case 1:return je(s.type)&&Jn(),e=s.flags,e&65536?(s.flags=e&-65537|128,s):null;case 3:return ms(),G(ge),G(de),kl(),e=s.flags,e&65536&&!(e&128)?(s.flags=e&-65537|128,s):null;case 5:return Sl(s),null;case 13:if(G(V),e=s.memoizedState,e!==null&&e.dehydrated!==null){if(s.alternate===null)throw Error(v(340));us()}return e=s.flags,e&65536?(s.flags=e&-65537|128,s):null;case 19:return G(V),null;case 4:return ms(),null;case 10:return jl(s.type._context),null;case 22:case 23:return Il(),null;case 24:return null;default:return null}}var Tn=!1,ce=!1,Ih=typeof WeakSet=="function"?WeakSet:Set,C=null;function ts(e,s){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){K(e,s,r)}else n.current=null}function Mi(e,s,n){try{n()}catch(r){K(e,s,r)}}var Ha=!1;function bh(e,s){if(Si=qn,e=sc(),ml(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var a=0,o=-1,c=-1,u=0,f=0,y=e,p=null;t:for(;;){for(var x;y!==n||i!==0&&y.nodeType!==3||(o=a+i),y!==l||r!==0&&y.nodeType!==3||(c=a+r),y.nodeType===3&&(a+=y.nodeValue.length),(x=y.firstChild)!==null;)p=y,y=x;for(;;){if(y===e)break t;if(p===n&&++u===i&&(o=a),p===l&&++f===r&&(c=a),(x=y.nextSibling)!==null)break;y=p,p=y.parentNode}y=x}n=o===-1||c===-1?null:{start:o,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(ki={focusedElem:e,selectionRange:n},qn=!1,C=s;C!==null;)if(s=C,e=s.child,(s.subtreeFlags&1028)!==0&&e!==null)e.return=s,C=e;else for(;C!==null;){s=C;try{var w=s.alternate;if(s.flags&1024)switch(s.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var j=w.memoizedProps,L=w.memoizedState,h=s.stateNode,d=h.getSnapshotBeforeUpdate(s.elementType===s.type?j:Be(s.type,j),L);h.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var m=s.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(v(163))}}catch(g){K(s,s.return,g)}if(e=s.sibling,e!==null){e.return=s.return,C=e;break}C=s.return}return w=Ha,Ha=!1,w}function Fs(e,s,n){var r=s.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var l=i.destroy;i.destroy=void 0,l!==void 0&&Mi(s,n,l)}i=i.next}while(i!==r)}}function vr(e,s){if(s=s.updateQueue,s=s!==null?s.lastEffect:null,s!==null){var n=s=s.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==s)}}function Hi(e){var s=e.ref;if(s!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof s=="function"?s(e):s.current=e}}function Xc(e){var s=e.alternate;s!==null&&(e.alternate=null,Xc(s)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(s=e.stateNode,s!==null&&(delete s[Ve],delete s[Xs],delete s[Ti],delete s[gh],delete s[jh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Zc(e){return e.tag===5||e.tag===3||e.tag===4}function Ua(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Zc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ui(e,s,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,s?n.nodeType===8?n.parentNode.insertBefore(e,s):n.insertBefore(e,s):(n.nodeType===8?(s=n.parentNode,s.insertBefore(e,n)):(s=n,s.appendChild(e)),n=n._reactRootContainer,n!=null||s.onclick!==null||(s.onclick=Yn));else if(r!==4&&(e=e.child,e!==null))for(Ui(e,s,n),e=e.sibling;e!==null;)Ui(e,s,n),e=e.sibling}function Gi(e,s,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,s?n.insertBefore(e,s):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Gi(e,s,n),e=e.sibling;e!==null;)Gi(e,s,n),e=e.sibling}var re=null,ze=!1;function at(e,s,n){for(n=n.child;n!==null;)ed(e,s,n),n=n.sibling}function ed(e,s,n){if(qe&&typeof qe.onCommitFiberUnmount=="function")try{qe.onCommitFiberUnmount(mr,n)}catch{}switch(n.tag){case 5:ce||ts(n,s);case 6:var r=re,i=ze;re=null,at(e,s,n),re=r,ze=i,re!==null&&(ze?(e=re,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):re.removeChild(n.stateNode));break;case 18:re!==null&&(ze?(e=re,n=n.stateNode,e.nodeType===8?$r(e.parentNode,n):e.nodeType===1&&$r(e,n),qs(e)):$r(re,n.stateNode));break;case 4:r=re,i=ze,re=n.stateNode.containerInfo,ze=!0,at(e,s,n),re=r,ze=i;break;case 0:case 11:case 14:case 15:if(!ce&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var l=i,a=l.destroy;l=l.tag,a!==void 0&&(l&2||l&4)&&Mi(n,s,a),i=i.next}while(i!==r)}at(e,s,n);break;case 1:if(!ce&&(ts(n,s),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(o){K(n,s,o)}at(e,s,n);break;case 21:at(e,s,n);break;case 22:n.mode&1?(ce=(r=ce)||n.memoizedState!==null,at(e,s,n),ce=r):at(e,s,n);break;default:at(e,s,n)}}function Ga(e){var s=e.updateQueue;if(s!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Ih),s.forEach(function(r){var i=Wh.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function be(e,s){var n=s.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var l=e,a=s,o=a;e:for(;o!==null;){switch(o.tag){case 5:re=o.stateNode,ze=!1;break e;case 3:re=o.stateNode.containerInfo,ze=!0;break e;case 4:re=o.stateNode.containerInfo,ze=!0;break e}o=o.return}if(re===null)throw Error(v(160));ed(l,a,i),re=null,ze=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){K(i,s,u)}}if(s.subtreeFlags&12854)for(s=s.child;s!==null;)td(s,e),s=s.sibling}function td(e,s){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(be(s,e),$e(e),r&4){try{Fs(3,e,e.return),vr(3,e)}catch(j){K(e,e.return,j)}try{Fs(5,e,e.return)}catch(j){K(e,e.return,j)}}break;case 1:be(s,e),$e(e),r&512&&n!==null&&ts(n,n.return);break;case 5:if(be(s,e),$e(e),r&512&&n!==null&&ts(n,n.return),e.flags&32){var i=e.stateNode;try{Gs(i,"")}catch(j){K(e,e.return,j)}}if(r&4&&(i=e.stateNode,i!=null)){var l=e.memoizedProps,a=n!==null?n.memoizedProps:l,o=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{o==="input"&&l.type==="radio"&&l.name!=null&&So(i,l),mi(o,a);var u=mi(o,l);for(a=0;a<c.length;a+=2){var f=c[a],y=c[a+1];f==="style"?Co(i,y):f==="dangerouslySetInnerHTML"?_o(i,y):f==="children"?Gs(i,y):el(i,f,y,u)}switch(o){case"input":oi(i,l);break;case"textarea":ko(i,l);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!l.multiple;var x=l.value;x!=null?ns(i,!!l.multiple,x,!1):p!==!!l.multiple&&(l.defaultValue!=null?ns(i,!!l.multiple,l.defaultValue,!0):ns(i,!!l.multiple,l.multiple?[]:"",!1))}i[Xs]=l}catch(j){K(e,e.return,j)}}break;case 6:if(be(s,e),$e(e),r&4){if(e.stateNode===null)throw Error(v(162));i=e.stateNode,l=e.memoizedProps;try{i.nodeValue=l}catch(j){K(e,e.return,j)}}break;case 3:if(be(s,e),$e(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{qs(s.containerInfo)}catch(j){K(e,e.return,j)}break;case 4:be(s,e),$e(e);break;case 13:be(s,e),$e(e),i=e.child,i.flags&8192&&(l=i.memoizedState!==null,i.stateNode.isHidden=l,!l||i.alternate!==null&&i.alternate.memoizedState!==null||(Rl=J())),r&4&&Ga(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(ce=(u=ce)||f,be(s,e),ce=u):be(s,e),$e(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!f&&e.mode&1)for(C=e,f=e.child;f!==null;){for(y=C=f;C!==null;){switch(p=C,x=p.child,p.tag){case 0:case 11:case 14:case 15:Fs(4,p,p.return);break;case 1:ts(p,p.return);var w=p.stateNode;if(typeof w.componentWillUnmount=="function"){r=p,n=p.return;try{s=r,w.props=s.memoizedProps,w.state=s.memoizedState,w.componentWillUnmount()}catch(j){K(r,n,j)}}break;case 5:ts(p,p.return);break;case 22:if(p.memoizedState!==null){Wa(y);continue}}x!==null?(x.return=p,C=x):Wa(y)}f=f.sibling}e:for(f=null,y=e;;){if(y.tag===5){if(f===null){f=y;try{i=y.stateNode,u?(l=i.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(o=y.stateNode,c=y.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,o.style.display=To("display",a))}catch(j){K(e,e.return,j)}}}else if(y.tag===6){if(f===null)try{y.stateNode.nodeValue=u?"":y.memoizedProps}catch(j){K(e,e.return,j)}}else if((y.tag!==22&&y.tag!==23||y.memoizedState===null||y===e)&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===e)break e;for(;y.sibling===null;){if(y.return===null||y.return===e)break e;f===y&&(f=null),y=y.return}f===y&&(f=null),y.sibling.return=y.return,y=y.sibling}}break;case 19:be(s,e),$e(e),r&4&&Ga(e);break;case 21:break;default:be(s,e),$e(e)}}function $e(e){var s=e.flags;if(s&2){try{e:{for(var n=e.return;n!==null;){if(Zc(n)){var r=n;break e}n=n.return}throw Error(v(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Gs(i,""),r.flags&=-33);var l=Ua(e);Gi(e,l,i);break;case 3:case 4:var a=r.stateNode.containerInfo,o=Ua(e);Ui(e,o,a);break;default:throw Error(v(161))}}catch(c){K(e,e.return,c)}e.flags&=-3}s&4096&&(e.flags&=-4097)}function Bh(e,s,n){C=e,sd(e)}function sd(e,s,n){for(var r=(e.mode&1)!==0;C!==null;){var i=C,l=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||Tn;if(!a){var o=i.alternate,c=o!==null&&o.memoizedState!==null||ce;o=Tn;var u=ce;if(Tn=a,(ce=c)&&!u)for(C=i;C!==null;)a=C,c=a.child,a.tag===22&&a.memoizedState!==null?Va(i):c!==null?(c.return=a,C=c):Va(i);for(;l!==null;)C=l,sd(l),l=l.sibling;C=i,Tn=o,ce=u}$a(e)}else i.subtreeFlags&8772&&l!==null?(l.return=i,C=l):$a(e)}}function $a(e){for(;C!==null;){var s=C;if(s.flags&8772){var n=s.alternate;try{if(s.flags&8772)switch(s.tag){case 0:case 11:case 15:ce||vr(5,s);break;case 1:var r=s.stateNode;if(s.flags&4&&!ce)if(n===null)r.componentDidMount();else{var i=s.elementType===s.type?n.memoizedProps:Be(s.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=s.updateQueue;l!==null&&Ca(s,l,r);break;case 3:var a=s.updateQueue;if(a!==null){if(n=null,s.child!==null)switch(s.child.tag){case 5:n=s.child.stateNode;break;case 1:n=s.child.stateNode}Ca(s,a,n)}break;case 5:var o=s.stateNode;if(n===null&&s.flags&4){n=o;var c=s.memoizedProps;switch(s.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(s.memoizedState===null){var u=s.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var y=f.dehydrated;y!==null&&qs(y)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(v(163))}ce||s.flags&512&&Hi(s)}catch(p){K(s,s.return,p)}}if(s===e){C=null;break}if(n=s.sibling,n!==null){n.return=s.return,C=n;break}C=s.return}}function Wa(e){for(;C!==null;){var s=C;if(s===e){C=null;break}var n=s.sibling;if(n!==null){n.return=s.return,C=n;break}C=s.return}}function Va(e){for(;C!==null;){var s=C;try{switch(s.tag){case 0:case 11:case 15:var n=s.return;try{vr(4,s)}catch(c){K(s,n,c)}break;case 1:var r=s.stateNode;if(typeof r.componentDidMount=="function"){var i=s.return;try{r.componentDidMount()}catch(c){K(s,i,c)}}var l=s.return;try{Hi(s)}catch(c){K(s,l,c)}break;case 5:var a=s.return;try{Hi(s)}catch(c){K(s,a,c)}}}catch(c){K(s,s.return,c)}if(s===e){C=null;break}var o=s.sibling;if(o!==null){o.return=s.return,C=o;break}C=s.return}}var zh=Math.ceil,ar=lt.ReactCurrentDispatcher,Dl=lt.ReactCurrentOwner,Re=lt.ReactCurrentBatchConfig,z=0,ne=null,Z=null,ie=0,we=0,ss=Et(0),te=0,rn=null,zt=0,wr=0,Al=0,Ms=null,ye=null,Rl=0,ps=1/0,Je=null,or=!1,$i=null,jt=null,Cn=!1,mt=null,cr=0,Hs=0,Wi=null,Fn=-1,Mn=0;function he(){return z&6?J():Fn!==-1?Fn:Fn=J()}function Nt(e){return e.mode&1?z&2&&ie!==0?ie&-ie:vh.transition!==null?(Mn===0&&(Mn=Mo()),Mn):(e=M,e!==0||(e=window.event,e=e===void 0?16:qo(e.type)),e):1}function He(e,s,n,r){if(50<Hs)throw Hs=0,Wi=null,Error(v(185));an(e,n,r),(!(z&2)||e!==ne)&&(e===ne&&(!(z&2)&&(wr|=n),te===4&&ut(e,ie)),Ne(e,r),n===1&&z===0&&!(s.mode&1)&&(ps=J()+500,gr&&_t()))}function Ne(e,s){var n=e.callbackNode;vu(e,s);var r=Vn(e,e===ne?ie:0);if(r===0)n!==null&&ta(n),e.callbackNode=null,e.callbackPriority=0;else if(s=r&-r,e.callbackPriority!==s){if(n!=null&&ta(n),s===1)e.tag===0?Nh(qa.bind(null,e)):hc(qa.bind(null,e)),yh(function(){!(z&6)&&_t()}),n=null;else{switch(Ho(r)){case 1:n=il;break;case 4:n=zo;break;case 16:n=Wn;break;case 536870912:n=Fo;break;default:n=Wn}n=dd(n,nd.bind(null,e))}e.callbackPriority=s,e.callbackNode=n}}function nd(e,s){if(Fn=-1,Mn=0,z&6)throw Error(v(327));var n=e.callbackNode;if(os()&&e.callbackNode!==n)return null;var r=Vn(e,e===ne?ie:0);if(r===0)return null;if(r&30||r&e.expiredLanes||s)s=dr(e,r);else{s=r;var i=z;z|=2;var l=id();(ne!==e||ie!==s)&&(Je=null,ps=J()+500,Rt(e,s));do try{Hh();break}catch(o){rd(e,o)}while(!0);gl(),ar.current=l,z=i,Z!==null?s=0:(ne=null,ie=0,s=te)}if(s!==0){if(s===2&&(i=gi(e),i!==0&&(r=i,s=Vi(e,i))),s===1)throw n=rn,Rt(e,0),ut(e,r),Ne(e,J()),n;if(s===6)ut(e,r);else{if(i=e.current.alternate,!(r&30)&&!Fh(i)&&(s=dr(e,r),s===2&&(l=gi(e),l!==0&&(r=l,s=Vi(e,l))),s===1))throw n=rn,Rt(e,0),ut(e,r),Ne(e,J()),n;switch(e.finishedWork=i,e.finishedLanes=r,s){case 0:case 1:throw Error(v(345));case 2:Ot(e,ye,Je);break;case 3:if(ut(e,r),(r&130023424)===r&&(s=Rl+500-J(),10<s)){if(Vn(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){he(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=_i(Ot.bind(null,e,ye,Je),s);break}Ot(e,ye,Je);break;case 4:if(ut(e,r),(r&4194240)===r)break;for(s=e.eventTimes,i=-1;0<r;){var a=31-Me(r);l=1<<a,a=s[a],a>i&&(i=a),r&=~l}if(r=i,r=J()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*zh(r/1960))-r,10<r){e.timeoutHandle=_i(Ot.bind(null,e,ye,Je),r);break}Ot(e,ye,Je);break;case 5:Ot(e,ye,Je);break;default:throw Error(v(329))}}}return Ne(e,J()),e.callbackNode===n?nd.bind(null,e):null}function Vi(e,s){var n=Ms;return e.current.memoizedState.isDehydrated&&(Rt(e,s).flags|=256),e=dr(e,s),e!==2&&(s=ye,ye=n,s!==null&&qi(s)),e}function qi(e){ye===null?ye=e:ye.push.apply(ye,e)}function Fh(e){for(var s=e;;){if(s.flags&16384){var n=s.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],l=i.getSnapshot;i=i.value;try{if(!Ue(l(),i))return!1}catch{return!1}}}if(n=s.child,s.subtreeFlags&16384&&n!==null)n.return=s,s=n;else{if(s===e)break;for(;s.sibling===null;){if(s.return===null||s.return===e)return!0;s=s.return}s.sibling.return=s.return,s=s.sibling}}return!0}function ut(e,s){for(s&=~Al,s&=~wr,e.suspendedLanes|=s,e.pingedLanes&=~s,e=e.expirationTimes;0<s;){var n=31-Me(s),r=1<<n;e[n]=-1,s&=~r}}function qa(e){if(z&6)throw Error(v(327));os();var s=Vn(e,0);if(!(s&1))return Ne(e,J()),null;var n=dr(e,s);if(e.tag!==0&&n===2){var r=gi(e);r!==0&&(s=r,n=Vi(e,r))}if(n===1)throw n=rn,Rt(e,0),ut(e,s),Ne(e,J()),n;if(n===6)throw Error(v(345));return e.finishedWork=e.current.alternate,e.finishedLanes=s,Ot(e,ye,Je),Ne(e,J()),null}function Pl(e,s){var n=z;z|=1;try{return e(s)}finally{z=n,z===0&&(ps=J()+500,gr&&_t())}}function Ft(e){mt!==null&&mt.tag===0&&!(z&6)&&os();var s=z;z|=1;var n=Re.transition,r=M;try{if(Re.transition=null,M=1,e)return e()}finally{M=r,Re.transition=n,z=s,!(z&6)&&_t()}}function Il(){we=ss.current,G(ss)}function Rt(e,s){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,ph(n)),Z!==null)for(n=Z.return;n!==null;){var r=n;switch(pl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Jn();break;case 3:ms(),G(ge),G(de),kl();break;case 5:Sl(r);break;case 4:ms();break;case 13:G(V);break;case 19:G(V);break;case 10:jl(r.type._context);break;case 22:case 23:Il()}n=n.return}if(ne=e,Z=e=vt(e.current,null),ie=we=s,te=0,rn=null,Al=wr=zt=0,ye=Ms=null,Dt!==null){for(s=0;s<Dt.length;s++)if(n=Dt[s],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,l=n.pending;if(l!==null){var a=l.next;l.next=i,r.next=a}n.pending=r}Dt=null}return e}function rd(e,s){do{var n=Z;try{if(gl(),bn.current=lr,ir){for(var r=q.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}ir=!1}if(Bt=0,se=ee=q=null,zs=!1,tn=0,Dl.current=null,n===null||n.return===null){te=1,rn=s,Z=null;break}e:{var l=e,a=n.return,o=n,c=s;if(s=ie,o.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,f=o,y=f.tag;if(!(f.mode&1)&&(y===0||y===11||y===15)){var p=f.alternate;p?(f.updateQueue=p.updateQueue,f.memoizedState=p.memoizedState,f.lanes=p.lanes):(f.updateQueue=null,f.memoizedState=null)}var x=Pa(a);if(x!==null){x.flags&=-257,Ia(x,a,o,l,s),x.mode&1&&Ra(l,u,s),s=x,c=u;var w=s.updateQueue;if(w===null){var j=new Set;j.add(c),s.updateQueue=j}else w.add(c);break e}else{if(!(s&1)){Ra(l,u,s),bl();break e}c=Error(v(426))}}else if(W&&o.mode&1){var L=Pa(a);if(L!==null){!(L.flags&65536)&&(L.flags|=256),Ia(L,a,o,l,s),yl(fs(c,o));break e}}l=c=fs(c,o),te!==4&&(te=2),Ms===null?Ms=[l]:Ms.push(l),l=a;do{switch(l.tag){case 3:l.flags|=65536,s&=-s,l.lanes|=s;var h=Hc(l,c,s);Ta(l,h);break e;case 1:o=c;var d=l.type,m=l.stateNode;if(!(l.flags&128)&&(typeof d.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(jt===null||!jt.has(m)))){l.flags|=65536,s&=-s,l.lanes|=s;var g=Uc(l,o,s);Ta(l,g);break e}}l=l.return}while(l!==null)}ad(n)}catch(S){s=S,Z===n&&n!==null&&(Z=n=n.return);continue}break}while(!0)}function id(){var e=ar.current;return ar.current=lr,e===null?lr:e}function bl(){(te===0||te===3||te===2)&&(te=4),ne===null||!(zt&268435455)&&!(wr&268435455)||ut(ne,ie)}function dr(e,s){var n=z;z|=2;var r=id();(ne!==e||ie!==s)&&(Je=null,Rt(e,s));do try{Mh();break}catch(i){rd(e,i)}while(!0);if(gl(),z=n,ar.current=r,Z!==null)throw Error(v(261));return ne=null,ie=0,te}function Mh(){for(;Z!==null;)ld(Z)}function Hh(){for(;Z!==null&&!hu();)ld(Z)}function ld(e){var s=cd(e.alternate,e,we);e.memoizedProps=e.pendingProps,s===null?ad(e):Z=s,Dl.current=null}function ad(e){var s=e;do{var n=s.alternate;if(e=s.return,s.flags&32768){if(n=Ph(n,s),n!==null){n.flags&=32767,Z=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{te=6,Z=null;return}}else if(n=Rh(n,s,we),n!==null){Z=n;return}if(s=s.sibling,s!==null){Z=s;return}Z=s=e}while(s!==null);te===0&&(te=5)}function Ot(e,s,n){var r=M,i=Re.transition;try{Re.transition=null,M=1,Uh(e,s,n,r)}finally{Re.transition=i,M=r}return null}function Uh(e,s,n,r){do os();while(mt!==null);if(z&6)throw Error(v(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(v(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(wu(e,l),e===ne&&(Z=ne=null,ie=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Cn||(Cn=!0,dd(Wn,function(){return os(),null})),l=(n.flags&15990)!==0,n.subtreeFlags&15990||l){l=Re.transition,Re.transition=null;var a=M;M=1;var o=z;z|=4,Dl.current=null,bh(e,n),td(n,e),oh(ki),qn=!!Si,ki=Si=null,e.current=n,Bh(n),mu(),z=o,M=a,Re.transition=l}else e.current=n;if(Cn&&(Cn=!1,mt=e,cr=i),l=e.pendingLanes,l===0&&(jt=null),yu(n.stateNode),Ne(e,J()),s!==null)for(r=e.onRecoverableError,n=0;n<s.length;n++)i=s[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(or)throw or=!1,e=$i,$i=null,e;return cr&1&&e.tag!==0&&os(),l=e.pendingLanes,l&1?e===Wi?Hs++:(Hs=0,Wi=e):Hs=0,_t(),null}function os(){if(mt!==null){var e=Ho(cr),s=Re.transition,n=M;try{if(Re.transition=null,M=16>e?16:e,mt===null)var r=!1;else{if(e=mt,mt=null,cr=0,z&6)throw Error(v(331));var i=z;for(z|=4,C=e.current;C!==null;){var l=C,a=l.child;if(C.flags&16){var o=l.deletions;if(o!==null){for(var c=0;c<o.length;c++){var u=o[c];for(C=u;C!==null;){var f=C;switch(f.tag){case 0:case 11:case 15:Fs(8,f,l)}var y=f.child;if(y!==null)y.return=f,C=y;else for(;C!==null;){f=C;var p=f.sibling,x=f.return;if(Xc(f),f===u){C=null;break}if(p!==null){p.return=x,C=p;break}C=x}}}var w=l.alternate;if(w!==null){var j=w.child;if(j!==null){w.child=null;do{var L=j.sibling;j.sibling=null,j=L}while(j!==null)}}C=l}}if(l.subtreeFlags&2064&&a!==null)a.return=l,C=a;else e:for(;C!==null;){if(l=C,l.flags&2048)switch(l.tag){case 0:case 11:case 15:Fs(9,l,l.return)}var h=l.sibling;if(h!==null){h.return=l.return,C=h;break e}C=l.return}}var d=e.current;for(C=d;C!==null;){a=C;var m=a.child;if(a.subtreeFlags&2064&&m!==null)m.return=a,C=m;else e:for(a=d;C!==null;){if(o=C,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:vr(9,o)}}catch(S){K(o,o.return,S)}if(o===a){C=null;break e}var g=o.sibling;if(g!==null){g.return=o.return,C=g;break e}C=o.return}}if(z=i,_t(),qe&&typeof qe.onPostCommitFiberRoot=="function")try{qe.onPostCommitFiberRoot(mr,e)}catch{}r=!0}return r}finally{M=n,Re.transition=s}}return!1}function Qa(e,s,n){s=fs(n,s),s=Hc(e,s,1),e=gt(e,s,1),s=he(),e!==null&&(an(e,1,s),Ne(e,s))}function K(e,s,n){if(e.tag===3)Qa(e,e,n);else for(;s!==null;){if(s.tag===3){Qa(s,e,n);break}else if(s.tag===1){var r=s.stateNode;if(typeof s.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(jt===null||!jt.has(r))){e=fs(n,e),e=Uc(s,e,1),s=gt(s,e,1),e=he(),s!==null&&(an(s,1,e),Ne(s,e));break}}s=s.return}}function Gh(e,s,n){var r=e.pingCache;r!==null&&r.delete(s),s=he(),e.pingedLanes|=e.suspendedLanes&n,ne===e&&(ie&n)===n&&(te===4||te===3&&(ie&130023424)===ie&&500>J()-Rl?Rt(e,0):Al|=n),Ne(e,s)}function od(e,s){s===0&&(e.mode&1?(s=gn,gn<<=1,!(gn&130023424)&&(gn=4194304)):s=1);var n=he();e=rt(e,s),e!==null&&(an(e,s,n),Ne(e,n))}function $h(e){var s=e.memoizedState,n=0;s!==null&&(n=s.retryLane),od(e,n)}function Wh(e,s){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(v(314))}r!==null&&r.delete(s),od(e,n)}var cd;cd=function(e,s,n){if(e!==null)if(e.memoizedProps!==s.pendingProps||ge.current)xe=!0;else{if(!(e.lanes&n)&&!(s.flags&128))return xe=!1,Ah(e,s,n);xe=!!(e.flags&131072)}else xe=!1,W&&s.flags&1048576&&mc(s,er,s.index);switch(s.lanes=0,s.tag){case 2:var r=s.type;zn(e,s),e=s.pendingProps;var i=ds(s,de.current);as(s,n),i=_l(null,s,r,e,i,n);var l=Tl();return s.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(s.tag=1,s.memoizedState=null,s.updateQueue=null,je(r)?(l=!0,Xn(s)):l=!1,s.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,vl(s),i.updater=Nr,s.stateNode=i,i._reactInternals=s,Ri(s,r,e,n),s=bi(null,s,r,!0,l,n)):(s.tag=0,W&&l&&fl(s),ue(null,s,i,n),s=s.child),s;case 16:r=s.elementType;e:{switch(zn(e,s),e=s.pendingProps,i=r._init,r=i(r._payload),s.type=r,i=s.tag=qh(r),e=Be(r,e),i){case 0:s=Ii(null,s,r,e,n);break e;case 1:s=za(null,s,r,e,n);break e;case 11:s=ba(null,s,r,e,n);break e;case 14:s=Ba(null,s,r,Be(r.type,e),n);break e}throw Error(v(306,r,""))}return s;case 0:return r=s.type,i=s.pendingProps,i=s.elementType===r?i:Be(r,i),Ii(e,s,r,i,n);case 1:return r=s.type,i=s.pendingProps,i=s.elementType===r?i:Be(r,i),za(e,s,r,i,n);case 3:e:{if(Vc(s),e===null)throw Error(v(387));r=s.pendingProps,l=s.memoizedState,i=l.element,jc(e,s),nr(s,r,null,n);var a=s.memoizedState;if(r=a.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},s.updateQueue.baseState=l,s.memoizedState=l,s.flags&256){i=fs(Error(v(423)),s),s=Fa(e,s,r,n,i);break e}else if(r!==i){i=fs(Error(v(424)),s),s=Fa(e,s,r,n,i);break e}else for(ke=xt(s.stateNode.containerInfo.firstChild),Ee=s,W=!0,Fe=null,n=xc(s,null,r,n),s.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(us(),r===i){s=it(e,s,n);break e}ue(e,s,r,n)}s=s.child}return s;case 5:return Nc(s),e===null&&Li(s),r=s.type,i=s.pendingProps,l=e!==null?e.memoizedProps:null,a=i.children,Ei(r,i)?a=null:l!==null&&Ei(r,l)&&(s.flags|=32),Wc(e,s),ue(e,s,a,n),s.child;case 6:return e===null&&Li(s),null;case 13:return qc(e,s,n);case 4:return wl(s,s.stateNode.containerInfo),r=s.pendingProps,e===null?s.child=hs(s,null,r,n):ue(e,s,r,n),s.child;case 11:return r=s.type,i=s.pendingProps,i=s.elementType===r?i:Be(r,i),ba(e,s,r,i,n);case 7:return ue(e,s,s.pendingProps,n),s.child;case 8:return ue(e,s,s.pendingProps.children,n),s.child;case 12:return ue(e,s,s.pendingProps.children,n),s.child;case 10:e:{if(r=s.type._context,i=s.pendingProps,l=s.memoizedProps,a=i.value,H(tr,r._currentValue),r._currentValue=a,l!==null)if(Ue(l.value,a)){if(l.children===i.children&&!ge.current){s=it(e,s,n);break e}}else for(l=s.child,l!==null&&(l.return=s);l!==null;){var o=l.dependencies;if(o!==null){a=l.child;for(var c=o.firstContext;c!==null;){if(c.context===r){if(l.tag===1){c=tt(-1,n&-n),c.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?c.next=c:(c.next=f.next,f.next=c),u.pending=c}}l.lanes|=n,c=l.alternate,c!==null&&(c.lanes|=n),Di(l.return,n,s),o.lanes|=n;break}c=c.next}}else if(l.tag===10)a=l.type===s.type?null:l.child;else if(l.tag===18){if(a=l.return,a===null)throw Error(v(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Di(a,n,s),a=l.sibling}else a=l.child;if(a!==null)a.return=l;else for(a=l;a!==null;){if(a===s){a=null;break}if(l=a.sibling,l!==null){l.return=a.return,a=l;break}a=a.return}l=a}ue(e,s,i.children,n),s=s.child}return s;case 9:return i=s.type,r=s.pendingProps.children,as(s,n),i=Pe(i),r=r(i),s.flags|=1,ue(e,s,r,n),s.child;case 14:return r=s.type,i=Be(r,s.pendingProps),i=Be(r.type,i),Ba(e,s,r,i,n);case 15:return Gc(e,s,s.type,s.pendingProps,n);case 17:return r=s.type,i=s.pendingProps,i=s.elementType===r?i:Be(r,i),zn(e,s),s.tag=1,je(r)?(e=!0,Xn(s)):e=!1,as(s,n),Mc(s,r,i),Ri(s,r,i,n),bi(null,s,r,!0,e,n);case 19:return Qc(e,s,n);case 22:return $c(e,s,n)}throw Error(v(156,s.tag))};function dd(e,s){return Bo(e,s)}function Vh(e,s,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=s,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ae(e,s,n,r){return new Vh(e,s,n,r)}function Bl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function qh(e){if(typeof e=="function")return Bl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===sl)return 11;if(e===nl)return 14}return 2}function vt(e,s){var n=e.alternate;return n===null?(n=Ae(e.tag,s,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=s,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,s=e.dependencies,n.dependencies=s===null?null:{lanes:s.lanes,firstContext:s.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Hn(e,s,n,r,i,l){var a=2;if(r=e,typeof e=="function")Bl(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Vt:return Pt(n.children,i,l,s);case tl:a=8,i|=8;break;case ni:return e=Ae(12,n,s,i|2),e.elementType=ni,e.lanes=l,e;case ri:return e=Ae(13,n,s,i),e.elementType=ri,e.lanes=l,e;case ii:return e=Ae(19,n,s,i),e.elementType=ii,e.lanes=l,e;case No:return Sr(n,i,l,s);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case go:a=10;break e;case jo:a=9;break e;case sl:a=11;break e;case nl:a=14;break e;case ot:a=16,r=null;break e}throw Error(v(130,e==null?e:typeof e,""))}return s=Ae(a,n,s,i),s.elementType=e,s.type=r,s.lanes=l,s}function Pt(e,s,n,r){return e=Ae(7,e,r,s),e.lanes=n,e}function Sr(e,s,n,r){return e=Ae(22,e,r,s),e.elementType=No,e.lanes=n,e.stateNode={isHidden:!1},e}function Xr(e,s,n){return e=Ae(6,e,null,s),e.lanes=n,e}function Zr(e,s,n){return s=Ae(4,e.children!==null?e.children:[],e.key,s),s.lanes=n,s.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},s}function Qh(e,s,n,r,i){this.tag=s,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Rr(0),this.expirationTimes=Rr(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Rr(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function zl(e,s,n,r,i,l,a,o,c){return e=new Qh(e,s,n,o,c),s===1?(s=1,l===!0&&(s|=8)):s=0,l=Ae(3,null,null,s),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},vl(l),e}function Kh(e,s,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Wt,key:r==null?null:""+r,children:e,containerInfo:s,implementation:n}}function ud(e){if(!e)return St;e=e._reactInternals;e:{if(Ut(e)!==e||e.tag!==1)throw Error(v(170));var s=e;do{switch(s.tag){case 3:s=s.stateNode.context;break e;case 1:if(je(s.type)){s=s.stateNode.__reactInternalMemoizedMergedChildContext;break e}}s=s.return}while(s!==null);throw Error(v(171))}if(e.tag===1){var n=e.type;if(je(n))return uc(e,n,s)}return s}function hd(e,s,n,r,i,l,a,o,c){return e=zl(n,r,!0,e,i,l,a,o,c),e.context=ud(null),n=e.current,r=he(),i=Nt(n),l=tt(r,i),l.callback=s??null,gt(n,l,i),e.current.lanes=i,an(e,i,r),Ne(e,r),e}function kr(e,s,n,r){var i=s.current,l=he(),a=Nt(i);return n=ud(n),s.context===null?s.context=n:s.pendingContext=n,s=tt(l,a),s.payload={element:e},r=r===void 0?null:r,r!==null&&(s.callback=r),e=gt(i,s,a),e!==null&&(He(e,i,a,l),In(e,i,a)),a}function ur(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ka(e,s){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<s?n:s}}function Fl(e,s){Ka(e,s),(e=e.alternate)&&Ka(e,s)}function Yh(){return null}var md=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ml(e){this._internalRoot=e}Er.prototype.render=Ml.prototype.render=function(e){var s=this._internalRoot;if(s===null)throw Error(v(409));kr(e,s,null,null)};Er.prototype.unmount=Ml.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var s=e.containerInfo;Ft(function(){kr(null,e,null,null)}),s[nt]=null}};function Er(e){this._internalRoot=e}Er.prototype.unstable_scheduleHydration=function(e){if(e){var s=$o();e={blockedOn:null,target:e,priority:s};for(var n=0;n<dt.length&&s!==0&&s<dt[n].priority;n++);dt.splice(n,0,e),n===0&&Vo(e)}};function Hl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function _r(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ya(){}function Jh(e,s,n,r,i){if(i){if(typeof r=="function"){var l=r;r=function(){var u=ur(a);l.call(u)}}var a=hd(s,r,e,0,null,!1,!1,"",Ya);return e._reactRootContainer=a,e[nt]=a.current,Ys(e.nodeType===8?e.parentNode:e),Ft(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var o=r;r=function(){var u=ur(c);o.call(u)}}var c=zl(e,0,!1,null,null,!1,!1,"",Ya);return e._reactRootContainer=c,e[nt]=c.current,Ys(e.nodeType===8?e.parentNode:e),Ft(function(){kr(s,c,n,r)}),c}function Tr(e,s,n,r,i){var l=n._reactRootContainer;if(l){var a=l;if(typeof i=="function"){var o=i;i=function(){var c=ur(a);o.call(c)}}kr(s,a,e,i)}else a=Jh(n,s,e,i,r);return ur(a)}Uo=function(e){switch(e.tag){case 3:var s=e.stateNode;if(s.current.memoizedState.isDehydrated){var n=Ds(s.pendingLanes);n!==0&&(ll(s,n|1),Ne(s,J()),!(z&6)&&(ps=J()+500,_t()))}break;case 13:Ft(function(){var r=rt(e,1);if(r!==null){var i=he();He(r,e,1,i)}}),Fl(e,1)}};al=function(e){if(e.tag===13){var s=rt(e,134217728);if(s!==null){var n=he();He(s,e,134217728,n)}Fl(e,134217728)}};Go=function(e){if(e.tag===13){var s=Nt(e),n=rt(e,s);if(n!==null){var r=he();He(n,e,s,r)}Fl(e,s)}};$o=function(){return M};Wo=function(e,s){var n=M;try{return M=e,s()}finally{M=n}};pi=function(e,s,n){switch(s){case"input":if(oi(e,n),s=n.name,n.type==="radio"&&s!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+s)+'][type="radio"]'),s=0;s<n.length;s++){var r=n[s];if(r!==e&&r.form===e.form){var i=xr(r);if(!i)throw Error(v(90));wo(r),oi(r,i)}}}break;case"textarea":ko(e,n);break;case"select":s=n.value,s!=null&&ns(e,!!n.multiple,s,!1)}};Do=Pl;Ao=Ft;var Xh={usingClientEntryPoint:!1,Events:[cn,Yt,xr,Oo,Lo,Pl]},Cs={findFiberByHostInstance:Lt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Zh={bundleType:Cs.bundleType,version:Cs.version,rendererPackageName:Cs.rendererPackageName,rendererConfig:Cs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:lt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Io(e),e===null?null:e.stateNode},findFiberByHostInstance:Cs.findFiberByHostInstance||Yh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var On=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!On.isDisabled&&On.supportsFiber)try{mr=On.inject(Zh),qe=On}catch{}}Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xh;Te.createPortal=function(e,s){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Hl(s))throw Error(v(200));return Kh(e,s,null,n)};Te.createRoot=function(e,s){if(!Hl(e))throw Error(v(299));var n=!1,r="",i=md;return s!=null&&(s.unstable_strictMode===!0&&(n=!0),s.identifierPrefix!==void 0&&(r=s.identifierPrefix),s.onRecoverableError!==void 0&&(i=s.onRecoverableError)),s=zl(e,1,!1,null,null,n,!1,r,i),e[nt]=s.current,Ys(e.nodeType===8?e.parentNode:e),new Ml(s)};Te.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var s=e._reactInternals;if(s===void 0)throw typeof e.render=="function"?Error(v(188)):(e=Object.keys(e).join(","),Error(v(268,e)));return e=Io(s),e=e===null?null:e.stateNode,e};Te.flushSync=function(e){return Ft(e)};Te.hydrate=function(e,s,n){if(!_r(s))throw Error(v(200));return Tr(null,e,s,!0,n)};Te.hydrateRoot=function(e,s,n){if(!Hl(e))throw Error(v(405));var r=n!=null&&n.hydratedSources||null,i=!1,l="",a=md;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),s=hd(s,null,e,1,n??null,i,!1,l,a),e[nt]=s.current,Ys(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),s.mutableSourceEagerHydrationData==null?s.mutableSourceEagerHydrationData=[n,i]:s.mutableSourceEagerHydrationData.push(n,i);return new Er(s)};Te.render=function(e,s,n){if(!_r(s))throw Error(v(200));return Tr(null,e,s,!1,n)};Te.unmountComponentAtNode=function(e){if(!_r(e))throw Error(v(40));return e._reactRootContainer?(Ft(function(){Tr(null,null,e,!1,function(){e._reactRootContainer=null,e[nt]=null})}),!0):!1};Te.unstable_batchedUpdates=Pl;Te.unstable_renderSubtreeIntoContainer=function(e,s,n,r){if(!_r(n))throw Error(v(200));if(e==null||e._reactInternals===void 0)throw Error(v(38));return Tr(e,s,n,!1,r)};Te.version="18.3.1-next-f1338f8080-20240426";function fd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(fd)}catch(e){console.error(e)}}fd(),fo.exports=Te;var em=fo.exports,Ja=em;ti.createRoot=Ja.createRoot,ti.hydrateRoot=Ja.hydrateRoot;const tm="";function sm(){var e;try{return((e=JSON.parse(localStorage.getItem("kiro_user")))==null?void 0:e.token)||null}catch{return null}}async function Tt(e,s={}){const n=sm(),r={"Content-Type":"application/json",...s.headers||{}};n&&(r.Authorization=`Bearer ${n}`);const i=await fetch(`${tm}${e}`,{...s,headers:r});if(i.status===401&&!e.includes("/auth/")){localStorage.removeItem("kiro_user"),window.location.reload();return}if(!i.ok){const l=await i.json().catch(()=>({}));throw Object.assign(new Error(l.message||i.statusText),{status:i.status})}return i.json()}const Ke={login:(e,s)=>Tt("/api/auth/login",{method:"POST",body:JSON.stringify({email:e,password:s})}),schedule:()=>Tt("/api/schedule"),library:()=>Tt("/api/library"),tasks:()=>Tt("/api/tasks"),setTaskStatus:(e,s)=>Tt(`/api/tasks/${e}/status`,{method:"PATCH",body:JSON.stringify({status:s})}),announcements:()=>Tt("/api/announcements"),links:()=>Tt("/api/links")};function nm({onLogin:e}){const[s,n]=_.useState(""),[r,i]=_.useState(""),[l,a]=_.useState(!1),[o,c]=_.useState(""),[u,f]=_.useState(!1),[y,p]=_.useState(!1),x=_.useRef(null);_.useEffect(()=>(document.body.className="login-page",localStorage.getItem("sessionExpired")&&(p(!0),localStorage.removeItem("sessionExpired")),()=>{document.body.className=""}),[]),_.useEffect(()=>{const j=x.current;if(!j)return;const L=j.getContext("2d");let h=[],d;const m=()=>{j.width=window.innerWidth,j.height=window.innerHeight},g=()=>({x:Math.random()*j.width,y:Math.random()*j.height,r:Math.random()*1.8+.4,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,o:Math.random()*.08+.03}),S=()=>{m(),h=Array.from({length:60},g)},E=()=>{L.clearRect(0,0,j.width,j.height),h.forEach(k=>{L.beginPath(),L.arc(k.x,k.y,k.r,0,Math.PI*2),L.fillStyle=`rgba(200,255,0,${k.o})`,L.fill(),k.x+=k.vx,k.y+=k.vy,k.x<-5&&(k.x=j.width+5),k.x>j.width+5&&(k.x=-5),k.y<-5&&(k.y=j.height+5),k.y>j.height+5&&(k.y=-5)}),d=requestAnimationFrame(E)};return S(),E(),window.addEventListener("resize",S,{passive:!0}),()=>{cancelAnimationFrame(d),window.removeEventListener("resize",S)}},[]);const w=async j=>{if(j.preventDefault(),!s||!r){c("Введите email и пароль");return}c(""),f(!0);try{const L=await Ke.login(s,r);e({token:L.token,...L.user})}catch(L){c(L.message||"Неверный email или пароль"),f(!1)}};return t.jsxs(t.Fragment,{children:[t.jsx("canvas",{id:"login-canvas",ref:x}),t.jsx("div",{className:"login-wrap",children:t.jsxs("div",{className:"login-card",children:[t.jsxs("div",{className:"login-brand",children:[t.jsx("span",{className:"login-brand-kiro",children:"KIRO"}),t.jsx("div",{className:"login-brand-sep"}),t.jsx("span",{className:"login-brand-platform",children:"Platform"})]}),t.jsx("h1",{className:"login-title",children:"IT Summer Camp '26"}),t.jsx("p",{className:"login-subtitle",children:"Войдите чтобы получить доступ к платформе"}),t.jsxs("form",{onSubmit:w,noValidate:!0,children:[t.jsxs("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",htmlFor:"login-email",children:"Логин"}),t.jsx("input",{type:"text",id:"login-email",name:"username",placeholder:"Ваш логин",autoComplete:"username",value:s,onChange:j=>n(j.target.value)})]}),t.jsxs("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",htmlFor:"login-password",children:"Пароль"}),t.jsxs("div",{className:"password-wrap",children:[t.jsx("input",{type:l?"text":"password",id:"login-password",name:"password",placeholder:"••••••••",autoComplete:"current-password",value:r,onChange:j=>i(j.target.value)}),t.jsx("button",{type:"button",className:"password-toggle",tabIndex:-1,onClick:()=>a(j=>!j),children:t.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),t.jsx("circle",{cx:"12",cy:"12",r:"3"})]})})]})]}),y&&t.jsx("div",{className:"login-error",style:{background:"rgba(255, 153, 0, 0.1)",borderColor:"#ff9900"},children:"⏰ Ваша сессия истекла. Пожалуйста, войдите снова."}),o&&t.jsx("div",{className:"login-error",children:o}),t.jsx("button",{type:"submit",className:"btn-primary btn-full",style:{marginTop:4},disabled:u,children:u?"Входим...":"Войти →"})]}),t.jsxs("p",{className:"login-note",children:["🔒 Доступ выдаётся менеджером после оплаты.",t.jsx("br",{}),"Для получения доступа напишите"," ",t.jsx("a",{href:"https://t.me/kiro_team_manager",target:"_blank",rel:"noopener",children:"@kiro_team_manager"})]})]})})]})}function rm(e){return(e||"").split(" ").map(s=>s[0]||"").join("").toUpperCase().slice(0,2)||"?"}const im=[{page:"dashboard",label:"Дэшборд"},{page:"schedule",label:"Расписание"},{page:"library",label:"Библиотека знаний"},{page:"tasks",label:"Задания"},{page:"links",label:"Полезные ссылки"}];function lm({user:e,currentPage:s,onNavigate:n,onLogout:r,onClose:i}){const[l,a]=_.useState(!1),o=rm((e==null?void 0:e.name)||"");return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"sidebar-header",children:[t.jsxs("a",{className:"sidebar-logo",href:"#",children:[t.jsx("span",{className:"sidebar-logo-kiro",children:"KIRO"}),t.jsx("span",{className:"sidebar-logo-platform",children:"CAMP"})]}),t.jsx("button",{className:"sidebar-close-btn",onClick:i,children:"×"})]}),t.jsxs("div",{className:"sidebar-user",children:[t.jsx("div",{className:"sidebar-avatar",children:o}),t.jsx("div",{className:"sidebar-user-name",children:(e==null?void 0:e.name)||"—"})]}),t.jsx("nav",{className:"sidebar-nav",children:im.map(c=>t.jsx("button",{className:`nav-item${s===c.page?" active":""}`,onClick:()=>n(c.page),children:c.label},c.page))}),t.jsx("div",{className:"sidebar-footer",children:l?t.jsxs("div",{className:"logout-confirm",children:[t.jsx("div",{className:"logout-confirm-text",children:"Выйти из аккаунта?"}),t.jsxs("div",{className:"logout-confirm-btns",children:[t.jsx("button",{className:"logout-btn-yes",onClick:r,children:"Выйти"}),t.jsx("button",{className:"logout-btn-no",onClick:()=>a(!1),children:"Отменить"})]})]}):t.jsx("button",{className:"nav-item nav-item--logout",onClick:()=>a(!0),children:"Выйти"})})]})}const am={dashboard:"Дэшборд",schedule:"Расписание",library:"Библиотека знаний",tasks:"Задания",links:"Полезные ссылки"};function om(e){return e.split(" ").map(s=>s[0]||"").join("").toUpperCase().slice(0,2)}function cm({user:e,page:s,onMenuClick:n}){const r=e?om(e.name):"??";return t.jsxs("header",{className:"top-bar",children:[t.jsxs("button",{className:"hamburger",onClick:n,children:[t.jsx("span",{}),t.jsx("span",{}),t.jsx("span",{})]}),t.jsx("span",{className:"top-bar-title",children:am[s]||s}),t.jsx("div",{className:"top-bar-avatar",children:r})]})}function dm({day:e,onClose:s}){var n;return _.useEffect(()=>{document.body.style.overflow="hidden";const r=i=>{i.key==="Escape"&&s()};return document.addEventListener("keydown",r),()=>{document.body.style.overflow="",document.removeEventListener("keydown",r)}},[s]),e?t.jsx("div",{className:"modal-overlay active",onClick:r=>{r.target===r.currentTarget&&s()},children:t.jsxs("div",{className:"modal-box",children:[t.jsxs("div",{className:"modal-header",children:[t.jsxs("div",{children:[t.jsxs("div",{className:"modal-day-num",children:["День ",e.num??e.id," · ",e.date]}),t.jsx("div",{className:"modal-day-title",children:e.title})]}),t.jsx("button",{className:"modal-close",onClick:s,children:"×"})]}),t.jsx("div",{className:"modal-body",children:(n=e.mats)!=null&&n.length?t.jsx("div",{className:"mat-links",children:e.mats.map((r,i)=>t.jsxs("a",{href:r.url,className:"mat-link",target:"_blank",rel:"noopener",children:[t.jsx("span",{className:"mat-link-title",children:r.title}),t.jsx("span",{className:"mat-link-arrow",children:"→"})]},i))}):t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Материалы появятся скоро."})})]})}):null}const Mt=[{id:1,day:1,date:"пн, 1 июня",type:"intro",title:"Вводное занятие: старт лагеря",theory:["Знакомство с форматом: как устроены занятия, созвоны и ДЗ","Обзор платформы: где находить материалы, задания и расписание","Инструменты для старта: установка редактора кода и необходимого ПО","Рекомендации по учёбе, работе с ментором и одногруппниками","Знакомство участников: первый круговой созвон"],tasks:["Установить редактор кода и инструменты по инструкции на платформе",'Написать программу "Hello, World!" и запустить в терминале'],hw:'Установить все инструменты и написать в чат: "Готов(а) к старту!" — это твой первый ДЗ.'},{id:2,day:2,date:"вт, 2 июня",type:"lecture",title:"Основы программирования: переменные, типы, условия",theory:["Что такое программа: инструкции, данные, порядок выполнения","Переменные и типы данных: числа, строки, булевы значения, пустое значение","Арифметические, логические операторы и операторы сравнения","Условные операторы: if / elif / else — синтаксис и примеры","Ввод и вывод данных: как программа общается с пользователем"],tasks:["Написать калькулятор с 4 операциями (+, −, ×, ÷)",'Задача: "Угадай число" — пользователь вводит, программа сравнивает'],hw:"3 задачи на условия из Codeforces уровня A. Ссылки на платформе."},{id:3,day:3,date:"ср, 3 июня",type:"lecture",title:"Основы программирования: циклы, функции, коллекции",theory:["Циклы: повторение по счётчику и по условию — когда что","Прерывание и продолжение цикла","Функции: объявление, параметры, возвращаемое значение, область видимости","Работа с коллекциями: массивы/списки — добавление, удаление, срезы","Принципы читаемого кода: именование, отступы, минимум комментариев"],tasks:["FizzBuzz — классика программирования","Функция для проверки является ли число простым","Написать таблицу умножения через вложенные циклы"],hw:"Функция подсчёта суммы всех чётных чисел в массиве. Написать 2 варианта: через цикл и через встроенные инструменты языка."},{id:4,day:4,date:"чт, 4 июня",type:"lecture",title:"Алгоритмическое мышление и Big O",theory:["Что такое алгоритм: чёткость, конечность, результат","Нотация Big O: O(1), O(n), O(n²), O(log n), O(n log n)","Как анализировать время и память алгоритма","Примеры: линейный vs бинарный поиск, пузырьковая vs быстрая сортировка","Зачем это знать: каждое техническое собеседование спрашивает Big O"],tasks:["Определить сложность 5 данных алгоритмов","Написать два решения одной задачи с разной сложностью — сравнить"],hw:"Задача: найти пару элементов с заданной суммой — два решения разной сложности."},{id:5,day:5,date:"пт, 5 июня",type:"lecture",title:"Дискретная математика: логика и множества",theory:["Булева алгебра: AND, OR, NOT, XOR, импликация, эквивалентность","Таблицы истинности: как строить и читать","Теория множеств: объединение, пересечение, разность, подмножество","Применение в программировании: битовые операции, фильтрация данных, индексы"],tasks:["Построить таблицу истинности для формулы с 3 переменными","Single Number (LeetCode #136) — через XOR"],hw:"Number of 1 Bits (LeetCode #191) и Power of Two (LeetCode #231) — через битовые операции."},{id:6,day:6,date:"сб, 6 июня",type:"lecture",title:"Дискретная математика: графы и алгоритмы",theory:["Граф: вершины, рёбра, типы (орграф, взвешенный, цикличный)","Представление: матрица смежности, список смежности — плюсы и минусы","BFS (поиск в ширину): алгоритм на очереди, применение","DFS (поиск в глубину): рекурсия и стек, применение","Алгоритмы на графах, создание и обзор графа через код"],tasks:["Реализовать BFS и DFS","Number of Islands (LeetCode #200)"],hw:"Clone Graph (LeetCode #133)."},{id:7,day:7,date:"вс, 7 июня",type:"lecture",title:"Структуры данных: массивы и связанные списки",theory:["Массивы: хранение в памяти, доступ за O(1), вставка и удаление","Динамические массивы: как массив растёт под капотом при добавлении","Связанный список: узлы и указатели, операции и их сложность","Двусвязный список: обход в обе стороны","Когда массив, когда связный список — таблица сравнения"],tasks:["Реализовать LinkedList с методами: add, remove, find, print","Задача: перевернуть связанный список in-place"],hw:"Reverse Linked List (LeetCode #206) — итеративно и рекурсивно."},{id:8,day:8,date:"пн, 8 июня",type:"lecture",title:"Структуры данных: стек и очередь",theory:["Стек (Stack): принцип LIFO, операции push/pop/peek — O(1)","Применение стека: история браузера, undo/redo, вычисление выражений","Очередь (Queue): принцип FIFO, enqueue/dequeue","Применение очереди: очередь задач, BFS-обходы, буфер","Deque (двусторонняя очередь): когда нужны операции с обоих концов"],tasks:["Реализовать стек через массив и через связный список","Задача: Valid Parentheses (LeetCode #20)"],hw:"Implement Queue using Stacks (LeetCode #232) — реализовать очередь из двух стеков."},{id:9,day:9,date:"вт, 9 июня",type:"lecture",title:"Структуры данных: хэш-таблицы",theory:["Идея хеширования: ключ → индекс за O(1)","Хеш-функции: что делает функцию хорошей","Метод 1 — Chaining (цепочка): каждая ячейка хранит список (цепочку) всех элементов с одинаковым хешем","Метод 2 — Open Addressing / Linear Probing: при коллизии ищем следующую свободную ячейку (hash(key), hash(key)+1, hash(key)+2...)","Метод 3 — Double Hashing: две хеш-функции для более эффективного поиска (hash1(key), hash1(key)+hash2(key), hash1(key)+2*hash2(key)...)","Сравнение методов: Chaining проще, Double Hashing лучше для кэша","Словари и хэш-мапы: встроенные реализации в разных языках (Python dict, JavaScript Map)","Применение: кэширование, поиск, дедупликация, частотный анализ, индексирование"],tasks:["Two Sum (LeetCode #1) — решить с хэш-таблицей","Group Anagrams (LeetCode #49)"],hw:"Longest Substring Without Repeating Characters (LeetCode #3)."},{id:10,day:10,date:"ср, 10 июня",type:"lecture",title:"Структуры данных: деревья",theory:["Дерево: узлы, рёбра, корень, листья, высота, уровни","Бинарное дерево поиска (BST): свойство, вставка, поиск, удаление","Обходы: in-order, pre-order, post-order — рекурсивно и итеративно","AVL-деревья: самобалансирующееся дерево, коэффициент баланса, повороты (LL, RR, LR, RL)","AVL операции: O(log n) для поиска, вставки, удаления благодаря балансировке","Red-Black деревья: цвета узлов (красный/чёрный), правила балансировки, менее строгие чем AVL","Red-Black преимущества: меньше ротаций при вставке/удалении, проще реализация","Когда какое дерево: AVL для частого поиска, Red-Black для частых обновлений","Применение деревьев: файловая система, индексы в БД, STL map/set в C++"],tasks:["Реализовать BST с insert, search, min/max","Maximum Depth of Binary Tree (LeetCode #104)"],hw:"Validate Binary Search Tree (LeetCode #98)."}],pd=[{month:"june",week:"Неделя 1 · 1–7 июня",days:[{id:1,date:"1 июня",title:"Введение. Алгоритмы и Big O",status:"done",mats:[]},{id:2,date:"2 июня",title:"Массивы и связанные списки",status:"done",mats:[]},{id:3,date:"3 июня",title:"Стеки, очереди, хэш-таблицы",status:"done",mats:[]},{id:4,date:"4 июня",title:"Деревья. BFS и DFS",status:"available",mats:[]},{id:5,date:"5 июня",title:"Графы и алгоритмы",status:"available",mats:[]},{id:6,date:"6 июня",title:"Динамическое программирование",status:"available",mats:[]},{id:7,date:"7 июня",title:"Обзор и закрепление недели 1",status:"available",mats:[]}]},{month:"june",week:"Неделя 2 · 8–10 июня",days:[{id:8,date:"8 июня",title:"Структуры данных: стеки и очереди",status:"available",mats:[]},{id:9,date:"9 июня",title:"Структуры данных: хеш-таблицы",status:"available",mats:[]},{id:10,date:"10 июня",title:"Структуры данных: деревья",status:"available",mats:[]}]}],um={intro:"#6eb5ff",lecture:"#c8ff00",insider:"#a07aff",project:"#ff9f50",org:"#8a8a9a",demo:"#ff5f5f"},yd={intro:"Введение",lecture:"Лекция",insider:"Insider Show",project:"Проект",org:"Орг",demo:"Демо-день"},xd={intro:"badge--blue",lecture:"badge--lime",insider:"badge--purple",project:"badge--orange",org:"badge--gray",demo:"badge--red"},Ul={1:"https://disk.yandex.ru/d/vBFq6jGQXn3XeQ",2:"https://disk.yandex.ru/d/8ND9CE1jN-KZag",3:"https://disk.yandex.ru/d/Dp9TSjAzcaPIzQ",4:"https://disk.yandex.ru/d/nGMtfv16ARM5Vw",5:"https://disk.yandex.ru/d/m6St3COwjHEWLA",6:"https://disk.yandex.ru/d/hwlCvydBRTSdDg",7:"https://disk.yandex.ru/d/SFt-fMhRjdX4cw",8:"https://disk.yandex.ru/d/5TtGY3PUU6jXTw",9:"https://disk.yandex.ru/d/BpbiXs33cjNrtQ",10:"https://disk.yandex.ru/d/S4ow_h8TF367kg"};function hm(){return t.jsxs("div",{className:"skeleton-schedule-day",children:[t.jsx("div",{className:"skeleton skeleton-title"}),t.jsx("div",{className:"skeleton skeleton-block",style:{width:"60%"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"90%"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"85%"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"70%"}})]})}function mm(){return t.jsxs("div",{className:"skeleton-schedule-day",children:[t.jsx("div",{className:"skeleton skeleton-block",style:{width:"80%",height:18}}),t.jsx("div",{className:"skeleton skeleton-title",style:{margin:"8px 0"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"50%"}})]})}function gd(){return t.jsxs("div",{className:"skeleton-news-card",children:[t.jsx("div",{className:"skeleton skeleton-news-card-title"}),t.jsx("div",{className:"skeleton skeleton-news-card-text"}),t.jsx("div",{className:"skeleton skeleton-news-card-text"})]})}function fm(){return t.jsxs("div",{className:"skeleton-schedule-day",children:[t.jsx("div",{className:"skeleton skeleton-block",style:{width:"30%",height:14}}),t.jsx("div",{className:"skeleton skeleton-title",style:{margin:"8px 0"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"65%"}})]})}function jd(){return t.jsx("div",{style:{marginBottom:24},children:[1,2,3].map(e=>t.jsxs("div",{style:{marginBottom:16},children:[t.jsxs("div",{style:{display:"flex",gap:10,marginBottom:8},children:[t.jsx("div",{className:"skeleton skeleton-block",style:{width:"80px"}}),t.jsx("div",{className:"skeleton skeleton-block",style:{flex:1}})]}),t.jsx("div",{className:"skeleton skeleton-block",style:{height:8}})]},e))})}const pm=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],ym=["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"];function xm(){const e=new Date;e.setHours(0,0,0,0);const s=[{label:"Июнь",total:30,start:new Date(2026,5,1)},{label:"Июль",total:31,start:new Date(2026,6,1)},{label:"Август",total:31,start:new Date(2026,7,1)}];return t.jsx("div",{className:"camp-progress",children:s.map(n=>{let r=0;const i=Array.from({length:n.total},(l,a)=>{const o=new Date(n.start);o.setDate(o.getDate()+a);const c=o.getTime()===e.getTime(),u=o<e;return(c||u)&&r++,{isToday:c,isPast:u}});return t.jsxs("div",{className:"camp-month-bar",children:[t.jsxs("div",{className:"camp-month-head",children:[t.jsx("span",{className:"camp-month-name",children:n.label}),t.jsxs("span",{className:"camp-month-pct",children:[r,"/",n.total," · ",Math.round(r/n.total*100),"%"]})]}),t.jsx("div",{className:"camp-segs",children:i.map((l,a)=>t.jsx("div",{className:`camp-seg${l.isToday?" s-today":l.isPast?" s-past":""}`},a))})]},n.label)})})}function gm(e){const s=Math.floor(e/3600),n=Math.floor(e%3600/60),r=e%60;return`${String(s).padStart(2,"0")}:${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function jm({onOpenDay:e,onNavigate:s}){var P,$,Y;const[n,r]=_.useState([]),[i,l]=_.useState(Mt),[a,o]=_.useState(pd),[c,u]=_.useState(()=>localStorage.getItem("kiro_notes")||""),[f,y]=_.useState(!0),[p,x]=_.useState(0),[w,j]=_.useState(25),[L,h]=_.useState(0),[d,m]=_.useState(null),[g,S]=_.useState(!1),E=_.useRef(null);_.useEffect(()=>{const I=Date.now(),pe=500;Promise.all([Ke.announcements().then(r).catch(()=>{}),Ke.schedule().then(l).catch(()=>{}),Ke.library().then(o).catch(()=>{})]).then(()=>{const Ns=Date.now()-I,Ye=Math.max(0,pe-Ns);setTimeout(()=>y(!1),Ye)})},[]),_.useEffect(()=>(g?E.current=setInterval(()=>{m(I=>I<=1?(clearInterval(E.current),S(!1),0):I-1)},1e3):clearInterval(E.current),()=>clearInterval(E.current)),[g]);const k=p*3600+w*60+L,O=()=>{d===null&&m(k),S(!0)},F=()=>S(!1),D=()=>{S(!1),m(null)},X=I=>{u(I.target.value),localStorage.setItem("kiro_notes",I.target.value)},ve=new Date,Oe=ve.getFullYear()===2026&&ve.getMonth()===5?ve.getDate():null,un=Oe?Ul[Oe]:null,js=a.flatMap(I=>I.days),Ge=Oe?js.find(I=>(I.num??I.id)===Oe):null,T=i.filter(I=>Oe?I.day>=Oe:!0).slice(0,3),A=`${ym[ve.getDay()]}, ${ve.getDate()} ${pm[ve.getMonth()]} ${ve.getFullYear()}`;return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Дэшборд"}),t.jsx("p",{className:"page-subtitle",style:{textTransform:"capitalize"},children:A})]}),f?t.jsx(jd,{}):t.jsx(xm,{}),t.jsxs("div",{className:"dash-grid",children:[t.jsxs("div",{className:"dash-col",children:[t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:"Новости и обновления"})}),f?[1,2].map(I=>t.jsx(gd,{},I)):n.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13,padding:"4px 0"},children:"Объявлений пока нет"}):n.slice(0,3).map((I,pe)=>t.jsxs("div",{className:"news-card fade-in",style:{animationDelay:`${pe*.05}s`},children:[t.jsxs("div",{className:"news-card-head",children:[t.jsxs("span",{className:"news-card-title",children:[I.icon||"📢"," ",I.title]}),t.jsx("span",{className:"news-card-date",children:I.published_at})]}),t.jsx("div",{className:"news-card-text",children:I.text})]},I.id)),!f&&n.length>3&&t.jsx("div",{className:"dash-nav-link",style:{marginTop:10},onClick:()=>s("announcements"),children:"Показать еще →"})]}),t.jsxs("div",{className:"widget",children:[t.jsxs("div",{className:"widget-header",children:[t.jsx("span",{className:"widget-title",children:"Заметки"}),t.jsx("button",{onClick:()=>{u(""),localStorage.removeItem("kiro_notes")},style:{fontSize:12,color:"var(--text-tertiary)",background:"none",border:"none",cursor:"pointer"},children:"Очистить"})]}),t.jsx("textarea",{className:"notes-area",value:c,onChange:X,placeholder:"Пиши здесь что угодно — сохраняется автоматически"})]})]}),t.jsxs("div",{className:"dash-col",children:[t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:Oe?`Сегодня — День ${Oe}`:"Сегодня"})}),Oe?t.jsxs(t.Fragment,{children:[un&&t.jsx("a",{href:un,target:"_blank",rel:"noopener",className:"today-block",children:t.jsxs("div",{children:[t.jsx("div",{className:"today-block-label",children:"Домашнее задание"}),t.jsx("div",{className:"today-block-link",children:"Открыть папку с ДЗ →"})]})}),Ge&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"today-block",style:(P=Ge.mats)!=null&&P.length?{cursor:"pointer"}:void 0,onClick:($=Ge.mats)!=null&&$.length?()=>e(Ge):void 0,children:t.jsxs("div",{children:[t.jsx("div",{className:"today-block-label",children:"Материалы дня"}),t.jsxs("div",{className:"today-block-text",children:[Ge.title,(Y=Ge.mats)!=null&&Y.length?" →":""]})]})}),t.jsx("div",{className:"dash-nav-link",onClick:()=>s("library"),children:"Все материалы →"})]})]}):t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13},children:"Лагерь ещё не начался или завершился"})]}),t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:"Ближайшие события"})}),f?[1,2,3].map(I=>t.jsx(fm,{},I)):T.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13},children:"Событий нет"}):T.map((I,pe)=>t.jsxs("div",{className:"event-mini fade-in",style:{animationDelay:`${pe*.05}s`},children:[t.jsxs("div",{className:"event-mini-day",children:["День ",I.day]}),t.jsx("div",{className:"event-mini-title",children:I.title}),t.jsx("span",{className:`badge ${xd[I.type]||"badge--gray"}`,style:{flexShrink:0},children:yd[I.type]||I.type})]},pe)),t.jsx("div",{className:"dash-nav-link",style:{marginTop:10},onClick:()=>s("schedule"),children:"Все события →"})]}),t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:"Таймер"})}),d!==null?t.jsx("div",{className:`timer-display${d===0?" timer-done":""}`,children:d===0?"Время вышло!":gm(d)}):t.jsxs("div",{className:"timer-setup",children:[t.jsx("input",{type:"number",min:"0",max:"23",value:p,onChange:I=>x(Math.max(0,Math.min(23,+I.target.value||0)))}),t.jsx("span",{children:"ч"}),t.jsx("input",{type:"number",min:"0",max:"59",value:w,onChange:I=>j(Math.max(0,Math.min(59,+I.target.value||0)))}),t.jsx("span",{children:"мин"}),t.jsx("input",{type:"number",min:"0",max:"59",value:L,onChange:I=>h(Math.max(0,Math.min(59,+I.target.value||0)))}),t.jsx("span",{children:"сек"})]}),t.jsxs("div",{className:"timer-btns",children:[d===null?t.jsx("button",{className:"timer-btn-start",onClick:O,disabled:k===0,children:"Старт"}):g?t.jsx("button",{className:"timer-btn-pause",onClick:F,children:"Пауза"}):d>0?t.jsx("button",{className:"timer-btn-start",onClick:O,children:"Продолжить"}):null,d!==null&&t.jsx("button",{className:"timer-btn-reset",onClick:D,children:"Сбросить"})]})]})]})]})]})}const Nm=[{value:"all",label:"Все"},{value:"lecture",label:"Лекции"},{value:"project",label:"Проекты"},{value:"insider",label:"Insider Show"},{value:"org",label:"Орг"}],vm=[{label:"Неделя 1 · 1–7 июня",start:1,end:7},{label:"Неделя 2 · 8–14 июня",start:8,end:14},{label:"Неделя 3 · 15–21 июня",start:15,end:21},{label:"Неделя 4 · 22–28 июня",start:22,end:28},{label:"Неделя 5 · 29–30 июня",start:29,end:99}];function wm(e){return e<=30?new Date(2026,5,e):new Date(2026,6,e-30)}function Sm(e){const s=new Date;return s.setHours(0,0,0,0),wm(e)<=s}function Xa(e){const s=new Date;if(s.getFullYear()!==2026||s.getMonth()!==5)return null;const n=e.find(r=>r.day===s.getDate());return n?n.id:null}function km(){const e=new Date;e.setHours(0,0,0,0);const s=[{label:"Июнь",total:30,start:new Date(2026,5,1)},{label:"Июль",total:31,start:new Date(2026,6,1)},{label:"Август",total:31,start:new Date(2026,7,1)}];return t.jsx("div",{className:"camp-progress",children:s.map(n=>{let r=0;const i=Array.from({length:n.total},(a,o)=>{const c=new Date(n.start);c.setDate(c.getDate()+o);const u=c.getTime()===e.getTime(),f=c<e;return(u||f)&&r++,{isToday:u,isPast:f}}),l=Math.round(r/n.total*100);return t.jsxs("div",{className:"camp-month-bar",children:[t.jsxs("div",{className:"camp-month-head",children:[t.jsx("span",{className:"camp-month-name",children:n.label}),t.jsxs("span",{className:"camp-month-pct",children:[r,"/",n.total," · ",l,"%"]})]}),t.jsx("div",{className:"camp-segs",children:i.map((a,o)=>t.jsx("div",{className:`camp-seg${a.isToday?" s-today":a.isPast?" s-past":""}`},o))})]},n.label)})})}function Em({day:e,expanded:s,onToggle:n}){var c;const r=um[e.type]||"#8a8a9a",i=xd[e.type]||"badge--gray",l=yd[e.type]||e.type,a=Ul[e.day],o=Sm(e.day);return t.jsxs("div",{className:`sched-day${s?" sched-day--open":""}`,children:[t.jsxs("div",{className:"sched-day-header",onClick:n,children:[t.jsx("div",{className:"sched-day-stripe",style:{background:r}}),t.jsxs("div",{className:"sched-day-meta",children:[t.jsxs("span",{className:"sched-day-num",children:["День ",e.day]}),t.jsx("span",{className:"sched-day-sep",children:"·"}),t.jsx("span",{className:"sched-day-date",children:e.date})]}),t.jsx("div",{className:"sched-day-title",children:e.title}),t.jsx("span",{className:`badge ${i}`,children:l}),t.jsx("span",{className:"sched-chevron",children:s?"▴":"▾"})]}),s&&t.jsxs("div",{className:"sched-day-body",children:[(e.meeting_time||e.meeting_link)&&t.jsxs("div",{className:"sched-section",children:[t.jsx("div",{className:"sched-section-label",children:"Встреча"}),t.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"center"},children:[e.meeting_time&&t.jsxs("span",{style:{fontSize:"14px",fontWeight:600,color:"var(--accent-lime)"},children:["🕐 ",e.meeting_time]}),e.meeting_link&&(o?t.jsx("a",{href:e.meeting_link,target:"_blank",rel:"noopener",className:"hw-drive-btn",children:"🔗 Присоединиться →"}):t.jsxs("span",{className:"hw-drive-btn hw-drive-btn--locked",children:["🔒 Доступ ",e.date]}))]})]}),((c=e.theory)==null?void 0:c.length)>0&&t.jsxs("div",{className:"sched-section",children:[t.jsx("div",{className:"sched-section-label",children:"Теория"}),t.jsx("ul",{className:"sched-list",children:e.theory.map((u,f)=>t.jsx("li",{children:u},f))})]}),a&&t.jsxs("div",{className:"sched-section",children:[t.jsx("div",{className:"sched-section-label",children:"Домашнее задание"}),o?t.jsx("a",{href:a,className:"hw-drive-btn",target:"_blank",rel:"noopener",children:"Открыть папку с ДЗ →"}):t.jsxs("span",{className:"hw-drive-btn hw-drive-btn--locked",children:["🔒 Откроется ",e.date]})]})]})]})}function Nd(){const[e,s]=_.useState("all"),[n,r]=_.useState(Mt),[i,l]=_.useState(()=>Xa(Mt)),[a,o]=_.useState(!0);_.useEffect(()=>{const f=Date.now(),y=500;Ke.schedule().then(p=>{r(p);const x=Xa(p);x!==null&&l(x);const w=Date.now()-f,j=Math.max(0,y-w);setTimeout(()=>o(!1),j)}).catch(()=>{const p=Date.now()-f,x=Math.max(0,y-p);setTimeout(()=>o(!1),x)})},[]);const c=e==="all"?n:n.filter(f=>f.type===e),u=f=>l(y=>y===f?null:f);return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Расписание"}),t.jsx("p",{className:"page-subtitle",children:"Программа лагеря — теория, задания и ДЗ по каждому дню"})]}),a?t.jsx(jd,{}):t.jsx(km,{}),t.jsx("div",{className:"schedule-controls",children:Nm.map(f=>t.jsx("button",{className:`filter-btn${e===f.value?" active":""}`,onClick:()=>{s(f.value),l(null)},disabled:a,children:f.label},f.value))}),a?t.jsx("div",{className:"sched-week",children:[1,2,3,4,5].map(f=>t.jsx(hm,{},f))}):vm.map(f=>{const y=c.filter(p=>p.day>=f.start&&p.day<=f.end);return y.length?t.jsxs("div",{className:"sched-week",children:[t.jsx("div",{className:"schedule-date-label",children:f.label}),y.map((p,x)=>t.jsx("div",{className:"fade-in",style:{animationDelay:`${x*.02}s`},children:t.jsx(Em,{day:p,expanded:i===p.id,onToggle:()=>u(p.id)})},p.id))]},f.label):null}),!a&&!c.length&&t.jsx("p",{style:{color:"var(--text-tertiary)",padding:"20px 0"},children:"Нет занятий для этого фильтра"})]})}const _m=[{value:"june",label:"Июнь — Фундамент",locked:!1},{value:"july",label:"Июль — Специализация",locked:!0},{value:"august",label:"Август — Карьера",locked:!0}],Tm=[{label:"Неделя 1 · 1–7 июня",start:1,end:7},{label:"Неделя 2 · 8–14 июня",start:8,end:14},{label:"Неделя 3 · 15–21 июня",start:15,end:21},{label:"Неделя 4 · 22–28 июня",start:22,end:28},{label:"Неделя 5 · 29–30 июня",start:29,end:99}],Cm=["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"],Om=["ЯНВАРЯ","ФЕВРАЛЯ","МАРТА","АПРЕЛЯ","МАЯ","ИЮНЯ","ИЮЛЯ","АВГУСТА","СЕНТЯБРЯ","ОКТЯБРЯ","НОЯБРЯ","ДЕКАБРЯ"];function Lm(e){const s=new Date(2026,5,e);return`${Cm[s.getDay()]}, ${e} ${Om[s.getMonth()]}`}function Dm(e){const s=new Date;return s.setHours(0,0,0,0),new Date(2026,5,e)<=s}function Am(e){const n=new Date().getDate();return e>=2&&e<=n}function Rm(e,s){const n={};s.forEach(i=>{i.days.forEach(l=>{const a=l.num??l.id;n[a]={title:l.title,mats:l.mats||[],id:l.id}})});const r={};return e.filter(i=>i.day>=1&&i.day<=30).forEach(i=>{r[i.day]=i.title}),Array.from({length:30},(i,l)=>{const a=l+1,o=n[a];return{id:(o==null?void 0:o.id)??a,day:a,title:(o==null?void 0:o.title)||r[a]||`День ${a}`,mats:(o==null?void 0:o.mats)||[]}})}function Pm({day:e,onOpen:s,onOpenTheory:n,onOpenQuestions:r,onOpenHomework:i}){var u;const l=!Dm(e.day),a=Am(e.day),o=l?"rgba(255,255,255,0.08)":"#c8ff00",c=((u=e.mats)==null?void 0:u.length)>0;return t.jsx("div",{className:`sched-day${!l&&c?" sched-day--open":""}`,style:l?{opacity:.4}:c?{cursor:"pointer",borderColor:"rgba(200,255,0,0.1)"}:{cursor:"default"},onClick:!l&&c?()=>s(e):void 0,children:t.jsxs("div",{className:"sched-day-header",style:{pointerEvents:"none"},children:[t.jsx("div",{className:"sched-day-stripe",style:{background:o}}),t.jsxs("div",{className:"sched-day-meta",children:[t.jsx("span",{className:"sched-day-num",children:String(e.day).padStart(2,"0")}),t.jsx("span",{className:"sched-day-sep",children:"·"}),t.jsx("span",{className:"sched-day-date",children:Lm(e.day)})]}),t.jsx("div",{className:"sched-day-title",children:e.title}),t.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[a&&t.jsxs(t.Fragment,{children:[t.jsx("button",{className:"theory-file-btn",onClick:f=>{f.stopPropagation(),n(e)},title:"Открыть теорию",children:"📚"}),e.day!==13&&t.jsx("button",{className:"theory-file-btn",onClick:f=>{f.stopPropagation(),r(e)},title:"Открыть задачи для тренировки",children:"✅"}),t.jsx("button",{className:"theory-file-btn",onClick:f=>{f.stopPropagation(),i(e)},title:"Открыть домашние задания",children:"📝"})]}),!l&&c&&t.jsx("button",{className:"theory-file-btn",onClick:f=>{f.stopPropagation(),s(e)},title:"Открыть материалы",children:"🔗"})]})]})})}function Im({onOpenDay:e,onOpenTheory:s,onOpenQuestions:n,onOpenHomework:r}){const[i,l]=_.useState("june"),[a,o]=_.useState(pd),[c,u]=_.useState(Mt),[f,y]=_.useState(!0);_.useEffect(()=>{const x=Date.now(),w=500;Promise.all([Ke.library().then(o).catch(()=>{}),Ke.schedule().then(u).catch(()=>{})]).then(()=>{const j=Date.now()-x,L=Math.max(0,w-j);setTimeout(()=>y(!1),L)})},[]);const p=Rm(c,a);return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Библиотека знаний"}),t.jsx("p",{className:"page-subtitle",children:"Материалы лагеря по дням — нажми на день чтобы открыть"})]}),t.jsx("div",{className:"library-tabs",children:_m.map(x=>t.jsxs("button",{className:`lib-tab${i===x.value?" active":""}${x.locked?" lib-tab--locked":""}`,onClick:x.locked?void 0:()=>l(x.value),disabled:x.locked,children:[x.label,x.locked?" 🔒":""]},x.value))}),i==="june"?f?t.jsx("div",{className:"sched-week",children:[1,2,3,4,5,6].map(x=>t.jsx(mm,{},x))}):Tm.map(x=>{const w=p.filter(j=>j.day>=x.start&&j.day<=x.end);return w.length?t.jsxs("div",{className:"sched-week",children:[t.jsx("div",{className:"schedule-date-label",children:x.label}),w.map((j,L)=>t.jsx("div",{className:"fade-in",style:{animationDelay:`${L*.02}s`},children:t.jsx(Pm,{day:j,onOpen:e,onOpenTheory:s,onOpenQuestions:n,onOpenHomework:r})},j.id))]},x.label):null}):t.jsx("p",{style:{color:"var(--text-tertiary)",padding:"20px 0"},children:"Материалы появятся позже"})]})}const bm=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];function vd(e){return e<=30?new Date(2026,5,e):new Date(2026,6,e-30)}function Bm(e){const s=new Date;return s.setHours(0,0,0,0),vd(e)<=s}function zm(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Fm(){try{return JSON.parse(localStorage.getItem("kiro_hw_status")||"{}")}catch{return{}}}const ei=Array.from({length:30},(e,s)=>{const n=s+1,r=vd(n),i=n<=7?1:n<=14?2:n<=21?3:n<=28?4:5,l=`${String(r.getDate()).padStart(2,"0")} ${bm[r.getMonth()]} ${r.getFullYear()}`;return{id:n,url:Ul[n],week:i,dateLabel:l,dateKey:zm(r)}}),Mm=[{value:"all",label:"Все"},{value:"open",label:"Открытые"},{value:"done",label:"Выполненные"}];function Hm(){const[e,s]=_.useState(Fm),[n,r]=_.useState("all"),i=o=>{s(c=>{const u={...c,[o]:c[o]==="done"?"active":"done"};return localStorage.setItem("kiro_hw_status",JSON.stringify(u)),u})},l=ei.filter(o=>n==="done"?e[o.dateKey]==="done":n==="open"?e[o.dateKey]!=="done":!0),a=ei.filter(o=>e[o.dateKey]==="done").length;return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Задания"}),t.jsxs("p",{className:"page-subtitle",children:["Домашние задания по дням · Выполнено ",a,"/",ei.length]})]}),t.jsx("div",{className:"schedule-controls",children:Mm.map(o=>t.jsx("button",{className:`filter-btn${n===o.value?" active":""}`,onClick:()=>r(o.value),children:o.label},o.value))}),t.jsx("div",{children:l.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",padding:"20px 0"},children:"Нет заданий"}):l.map(o=>{const c=e[o.dateKey]==="done",u=Bm(o.id);return t.jsxs("div",{className:`task-card${c?" task-card--done":""}`,children:[t.jsx("div",{className:`task-checkbox${c?" checked":""}`,onClick:()=>i(o.dateKey),children:c?"✓":""}),t.jsxs("div",{className:"task-body",children:[t.jsxs("div",{className:"task-title",children:["Домашнее задание от ",o.dateLabel,", Неделя ",o.week]}),t.jsx("div",{className:"task-meta",children:u?t.jsx("a",{href:o.url,target:"_blank",rel:"noopener",className:"hw-link-btn",children:"Открыть папку с ДЗ →"}):t.jsxs("span",{className:"hw-link-locked",children:["🔒 Открывается ",o.dateLabel]})})]})]},o.id)})})]})}const Um=[{href:"https://t.me/kiro_team",icon:"📣",title:"Канал KIRO Team",desc:"Главный канал сообщества. Объявления, новости и важная информация о лагере.",tag:"→ Открыть в Telegram"},{href:"https://t.me/kiro_team_manager",icon:"👨‍💼",title:"Менеджер",desc:"Вопросы по оплате, доступу и организационным моментам — пиши менеджеру.",tag:"→ Написать менеджеру"}];function Gm({onNavigate:e}){const[s,n]=_.useState([]);return _.useEffect(()=>{Ke.links().then(n).catch(()=>{})},[]),t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Полезные ссылки"}),t.jsx("p",{className:"page-subtitle",children:"Каналы, контакты и материалы для участников"})]}),t.jsxs("div",{className:"community-grid",children:[Um.map((r,i)=>t.jsxs("a",{className:"community-card",href:r.href,target:"_blank",rel:"noopener",children:[t.jsx("div",{className:"community-card-icon",children:r.icon}),t.jsx("div",{className:"community-card-title",children:r.title}),t.jsx("div",{className:"community-card-desc",children:r.desc}),t.jsx("div",{className:"community-card-tag",children:r.tag})]},i)),s.map(r=>t.jsxs("a",{className:"community-card",href:r.url,target:"_blank",rel:"noopener",children:[t.jsx("div",{className:"community-card-icon",children:"🔗"}),t.jsx("div",{className:"community-card-title",children:r.title}),t.jsx("div",{className:"community-card-desc",children:r.description}),t.jsx("div",{className:"community-card-tag",children:"→ Открыть"})]},r.id)),t.jsxs("div",{className:"community-card",style:{border:"2px dashed var(--border-color)",background:"rgba(200,255,0,0.02)",display:"flex",flexDirection:"column",cursor:"default"},children:[t.jsx("div",{className:"community-card-icon",children:"🔗"}),t.jsx("div",{className:"community-card-title",children:"Полезные материалы"}),t.jsx("div",{className:"community-card-desc",children:"Здесь будут размещаться ссылки на статьи, видео, документацию и другие материалы по ходу лагеря."}),t.jsx("div",{style:{fontSize:11,color:"var(--text-tertiary)",marginTop:"auto",paddingTop:8,borderTop:"1px solid var(--border-color)"},children:"Скоро добавим →"})]})]}),t.jsxs("div",{style:{marginTop:32,padding:"16px",background:"rgba(200,255,0,0.05)",borderRadius:"8px",fontSize:13,color:"var(--text-secondary)",lineHeight:1.6},children:[t.jsx("strong",{children:"Где найти другие материалы:"}),t.jsxs("ul",{style:{marginTop:8},children:[t.jsxs("li",{children:["Домашнее задание — в"," ",t.jsx("button",{onClick:()=>e("tasks"),style:{background:"none",border:"none",color:"var(--accent-lime)",fontWeight:700,cursor:"pointer",textDecoration:"underline",padding:0,font:"inherit"},children:"Заданиях"})]}),t.jsxs("li",{style:{marginTop:4},children:["Материалы по дням лагеря — в"," ",t.jsx("button",{onClick:()=>e("library"),style:{background:"none",border:"none",color:"var(--accent-lime)",fontWeight:700,cursor:"pointer",textDecoration:"underline",padding:0,font:"inherit"},children:"Библиотеке знаний"})]})]})]})]})}function $m(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"KIRO IT SUMMER CAMP 2026"}),t.jsx("p",{className:"theory-subtitle",children:"Вводное занятие: старт лагеря"}),t.jsx("p",{className:"theory-date",children:"1 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Расписание занятий"}),t.jsxs("div",{className:"theory-card",children:[t.jsxs("div",{className:"theory-card-item",children:[t.jsx("span",{className:"theory-label",children:"Время проведения:"}),t.jsx("p",{className:"theory-text",children:"ежедневно примерно в 21:00 (9 вечера)"})]}),t.jsxs("div",{className:"theory-card-item",children:[t.jsx("span",{className:"theory-label",children:"Продолжительность:"}),t.jsx("p",{className:"theory-text",children:"примерно 1-1,5 часа"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Индивидуальный подход к обучению"}),t.jsx("p",{className:"theory-intro",children:"Интенсивность обучения регулируется по ходу лагеря в зависимости от ваших возможностей:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Объем домашнего задания подбирается индивидуально"}),t.jsx("li",{className:"theory-list-item",children:"Сколько времени в день вы можете уделять обучению — столько же мы будем давать вам в домашних заданиях"}),t.jsx("li",{className:"theory-list-item",children:"Если вы отстаете, вы можете только прослушать материал и попросить минимизировать или не давать домашнее задание"}),t.jsx("li",{className:"theory-list-item",children:"Все решения принимаются индивидуально с учетом ваших потребностей"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Выбор направления обучения"}),t.jsx("p",{className:"theory-intro",children:"В конце июня вы сможете выбрать специальность, на которой хотите сосредоточиться в июле-августе:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Если вы не можете выбрать направление — это совершенно нормально"}),t.jsx("li",{className:"theory-list-item",children:"Вы можете изучать все направления подряд"}),t.jsx("li",{className:"theory-list-item",children:"Кроме специализированных тем будут общие лекции"}),t.jsx("li",{className:"theory-list-item",children:"Вы сможете посещать лекции разных направлений по своему выбору"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Где найти материалы и домашние задания"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Записи занятий доступны на платформе лагеря"}),t.jsx("li",{className:"theory-list-item",children:"Домашние задания можно найти на платформе лагеря"}),t.jsx("li",{className:"theory-list-item",children:"Расписание занятий и ссылки на созвоны также находятся на платформе лагеря"}),t.jsx("li",{className:"theory-list-item",children:"Все важную информацию мы дублируем в беседе лагеря в Telegram"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Домашнее задание после первого занятия"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"1. Завести дневник лагеря"}),t.jsx("p",{className:"theory-intro",children:"Вы можете выбрать любой удобный для вас формат:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"На бумаге в тетради"}),t.jsx("li",{className:"theory-list-item",children:"В Google Таблице"}),t.jsx("li",{className:"theory-list-item",children:"В Notion"}),t.jsx("li",{className:"theory-list-item",children:"В любом другом удобном вам формате"})]}),t.jsx("p",{className:"theory-intro theory-mt",children:"В дневнике вы сможете:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Дублировать ссылки на материалы дня"}),t.jsx("li",{className:"theory-list-item",children:"Добавлять ссылки на домашние задания"}),t.jsx("li",{className:"theory-list-item",children:"Сохранять решения домашних заданий"}),t.jsx("li",{className:"theory-list-item",children:"Писать свои мысли и заметки"})]}),t.jsx("p",{className:"theory-highlight",children:"Дневник станет вашим личным хранилищем и конспектом на время обучения в лагере и после"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"2. Скачать Visual Studio Code"}),t.jsx("p",{className:"theory-text",children:"Это текстовый редактор для написания кода, который мы будем использовать на занятиях."}),t.jsx("p",{className:"theory-text",children:"Если у вас возникнут проблемы со скачиванием или установкой, обратитесь в беседе группы в Telegram — мы поможем!"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Добро пожаловать в KIRO IT SUMMER CAMP 2026! 🚀"})})]})}function b({headers:e,rows:s}){return t.jsx("div",{className:"theory-table-wrapper",children:t.jsxs("table",{className:"theory-table",children:[t.jsx("thead",{children:t.jsx("tr",{children:e.map((n,r)=>t.jsx("th",{children:n},r))})}),t.jsx("tbody",{children:s.map((n,r)=>t.jsx("tr",{children:n.map((i,l)=>t.jsx("td",{children:i},l))},r))})]})})}function N({code:e,language:s="js"}){return t.jsxs("div",{className:"theory-code-block",children:[t.jsx("div",{className:"theory-code-label",children:s}),t.jsx("pre",{className:"theory-code",children:t.jsx("code",{children:e})})]})}function R({title:e,children:s}){return t.jsxs("div",{className:"theory-example",children:[t.jsxs("div",{className:"theory-example-title",children:["💡 ",e]}),t.jsx("div",{className:"theory-example-content",children:s})]})}function Se({name:e,columns:s,rows:n,highlightRows:r=[],highlightCols:i=[],caption:l}){return t.jsxs("div",{className:"db-table-illustration",style:{margin:"16px 0"},children:[e&&t.jsx("div",{style:{display:"inline-block",background:"var(--accent-lime)",color:"#0a0a14",fontWeight:700,fontSize:"12px",padding:"3px 12px",borderRadius:"6px 6px 0 0",fontFamily:"monospace"},children:e}),t.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:e?"0 8px 8px 8px":"8px"},children:t.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px",minWidth:"max-content"},children:[t.jsx("thead",{children:t.jsx("tr",{children:s.map((a,o)=>t.jsx("th",{style:{padding:"8px 14px",textAlign:"left",whiteSpace:"nowrap",background:i.includes(o)?"rgba(200,255,0,0.18)":"var(--bg-secondary)",color:i.includes(o)?"var(--accent-lime)":"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontFamily:"monospace",fontWeight:700},children:a},o))})}),t.jsx("tbody",{children:n.map((a,o)=>t.jsx("tr",{style:{background:r.includes(o)?"rgba(200,255,0,0.10)":"transparent"},children:a.map((c,u)=>t.jsx("td",{style:{padding:"7px 14px",whiteSpace:"nowrap",borderBottom:"1px solid var(--border-color)",color:i.includes(u)||r.includes(o)?"var(--text-primary)":"var(--text-secondary)",fontWeight:i.includes(u)?600:400},children:c},u))},o))})]})}),l&&t.jsx("div",{style:{fontSize:"12px",color:"var(--text-tertiary)",marginTop:"6px",fontStyle:"italic"},children:l})]})}function Wm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 2"}),t.jsx("p",{className:"theory-subtitle",children:"Основы программирования: переменные, типы, условия"}),t.jsx("p",{className:"theory-date",children:"2 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое программа?"}),t.jsx("p",{className:"theory-text",children:"Программа — это набор инструкций, которые компьютер выполняет по порядку. Программист пишет код на специальном языке (например, Python, JavaScript), а компьютер этот код понимает и исполняет."}),t.jsx("p",{className:"theory-text",style:{marginTop:"12px"},children:"Каждая программа состоит из трёх основных частей:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Данные"})," — информация, с которой работает программа"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Инструкции"})," — команды, что делать с данными"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Порядок выполнения"})," — в каком порядке выполнять инструкции"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Переменные"}),t.jsx("p",{className:"theory-intro",children:'Переменная — это "ящик" в памяти компьютера, где можно хранить данные. У каждого ящика есть имя (название переменной) и значение (то, что в нём хранится).'}),t.jsxs(R,{title:"Аналогия из реальной жизни",children:[t.jsx("p",{children:"Представь, что переменная — это коробка, на которой написано имя:"}),t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Коробка"})," = переменная"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Надпись на коробке"}),' = имя переменной (например, "возраст")']}),t.jsxs("li",{children:[t.jsx("strong",{children:"То, что внутри коробки"})," = значение (например, число 17)"]})]})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Как объявить переменную:"}),t.jsx(N,{code:`// Python
name = "Иван"
age = 17
height = 180.5

// JavaScript
let name = "Иван"
let age = 17
let height = 180.5`}),t.jsx("p",{className:"theory-intro",children:"Правила для имён переменных:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Имя должно начинаться с буквы или подчёркивания (_)"}),t.jsx("li",{className:"theory-list-item",children:"В имени можно использовать буквы, цифры и подчёркивание"}),t.jsx("li",{className:"theory-list-item",children:"Имя не может содержать пробелы"}),t.jsx("li",{className:"theory-list-item",children:"Придумывай понятные имена (age лучше, чем x)"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Типы данных"}),t.jsx("p",{className:"theory-intro",children:"Тип данных — это категория информации. Например, число — это один тип, текст — другой."}),t.jsx(b,{headers:["Тип","Описание","Примеры","Для чего"],rows:[["int/число","Целое число (без запятой)","17, -5, 1000","Возраст, количество"],["float/число","Число с запятой","3.14, -0.5, 180.5","Высота, вес, вычисления"],["str/строка","Текст (в кавычках)",'"Иван", "Hello"',"Имена, сообщения"],["bool/логический","Истина или ложь","true, false","Проверки, условия"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"20px"},children:"Как проверить тип данных:"}),t.jsx(N,{code:`// Python
name = "Иван"
age = 17
print(type(name))  # <class 'str'>
print(type(age))   # <class 'int'>

// JavaScript
let name = "Иван"
let age = 17
console.log(typeof name)  // "string"
console.log(typeof age)   // "number"`})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Операторы"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Арифметические операторы"}),t.jsx("p",{className:"theory-intro",children:"Используются для математических операций:"}),t.jsx(b,{headers:["Оператор","Название","Пример","Результат"],rows:[["+","Сложение","5 + 3","8"],["-","Вычитание","10 - 4","6"],["*","Умножение","6 * 7","42"],["/","Деление","20 / 4","5"],["**","Возведение в степень","2 ** 3","8"],["%","Остаток от деления","17 % 5","2"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операторы сравнения"}),t.jsx("p",{className:"theory-intro",children:"Используются для проверки, сравнивают два значения и возвращают true или false:"}),t.jsx(b,{headers:["Оператор","Название","Пример","Результат"],rows:[["==","Равно","5 == 5","true"],["!=","Не равно","5 != 3","true"],[">","Больше","10 > 5","true"],["<","Меньше","3 < 10","true"],[">=","Больше или равно","5 >= 5","true"],["<=","Меньше или равно","3 <= 10","true"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Логические операторы"}),t.jsx("p",{className:"theory-intro",children:"Используются для объединения нескольких условий:"}),t.jsx(b,{headers:["Оператор","Название","Описание","Пример"],rows:[["and","И","true, если ОБА условия верны","age > 18 and age < 65"],["or","ИЛИ","true, если ХОТЬ ОДНО условие верно",'day == "Saturday" or day == "Sunday"'],["not","НЕ","Меняет true на false и наоборот","not is_raining"]]}),t.jsx(N,{code:`// Примеры логических операторов

// AND - оба условия должны быть true
age = 25
if age > 18 and age < 65:
    print("Трудоспособный возраст")  # Выведет это

// OR - хоть одно условие true
day = "Saturday"
if day == "Saturday" or day == "Sunday":
    print("Выходной!")  # Выведет это

// NOT - инвертирует значение
is_raining = False
if not is_raining:
    print("Можно гулять")  # Выведет это`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Условные операторы: if, else, elif"}),t.jsx("p",{className:"theory-intro",children:'Условные операторы позволяют программе принимать решения: "если происходит то-то, то делай то-то, иначе делай это".'}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура if-else"}),t.jsx(N,{code:`// Python
age = 17

if age >= 18:
    print("Ты взрослый")
else:
    print("Ты ещё не совершеннолетний")

# Выведет: "Ты ещё не совершеннолетний"`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура if-elif-else"}),t.jsx("p",{className:"theory-intro",children:'elif (else if) — "иначе если":'}),t.jsx(N,{code:`score = 75

if score >= 90:
    print("Отличная оценка! (A)")
elif score >= 80:
    print("Хорошая оценка! (B)")
elif score >= 70:
    print("Удовлетворительно (C)")
else:
    print("Плохая оценка (F)")

# Выведет: "Удовлетворительно (C)"`,language:"python"})]}),t.jsxs(R,{title:"Чтение кода",children:[t.jsx("p",{children:"Когда программа встречает if, она проверяет условие:"}),t.jsxs("ul",{children:[t.jsxs("li",{children:["Если условие ",t.jsx("strong",{children:"true"})," — выполняет код в блоке if"]}),t.jsxs("li",{children:["Если условие ",t.jsx("strong",{children:"false"})," — переходит к elif (если он есть)"]}),t.jsx("li",{children:"Если все elif false — выполняет код в блоке else"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Ввод и вывод данных"}),t.jsx("p",{className:"theory-intro",children:"Вывод (output) — когда программа отправляет информацию пользователю. Ввод (input) — когда пользователь вводит информацию в программу."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Вывод данных (print)"}),t.jsx(N,{code:`# Просто текст
print("Привет!")

# Переменные
name = "Алиса"
print("Меня зовут", name)  # Выведет: Меня зовут Алиса

# Несколько значений
age = 17
print("Мне", age, "лет")  # Выведет: Мне 17 лет`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Ввод данных (input)"}),t.jsx(N,{code:`# Простой ввод
name = input("Как тебя зовут? ")
print("Привет,", name)

# Ввод числа (важно: input всегда возвращает текст!)
age_text = input("Сколько тебе лет? ")
age = int(age_text)  # Превращаем текст в число
print("Тебе", age, "лет")`,language:"python"}),t.jsxs(R,{title:"Важно",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"input()"})," всегда возвращает ",t.jsx("strong",{children:"текст (строку)"}),", даже если пользователь вводит число!"]}),t.jsxs("p",{children:["Если нужно число — используй ",t.jsx("strong",{children:"int()"})," или ",t.jsx("strong",{children:"float()"})]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практический пример: калькулятор оценок"}),t.jsx(N,{code:`print("=== Калькулятор оценок ===")

# Ввод
name = input("Как тебя зовут? ")
score = int(input("Какая у тебя оценка? (0-100): "))

# Логика
if score >= 90:
    grade = "A (отлично)"
elif score >= 80:
    grade = "B (хорошо)"
elif score >= 70:
    grade = "C (удовлетворительно)"
elif score >= 60:
    grade = "D (слабо)"
else:
    grade = "F (очень плохо)"

# Вывод
print(f"{name}, твоя оценка: {grade}")`,language:"python"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь основы программирования!"})})]})}function Vm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 3"}),t.jsx("p",{className:"theory-subtitle",children:"Основы программирования: циклы, функции, коллекции"}),t.jsx("p",{className:"theory-date",children:"3 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Циклы"}),t.jsx("p",{className:"theory-intro",children:"Цикл — это способ повторить блок кода много раз. Вместо того чтобы писать одну и ту же команду 100 раз, можно использовать цикл."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Цикл for"}),t.jsx("p",{className:"theory-intro",children:"Используется, когда знаешь, сколько раз нужно повторить код:"}),t.jsx(N,{code:`# Выведи числа от 1 до 5
for i in range(1, 6):
    print(i)
# Выведет: 1 2 3 4 5

# Выведи "Привет" 3 раза
for num in range(3):
    print("Привет!")
# Выведет:
# Привет!
# Привет!
# Привет!`,language:"python"}),t.jsx(R,{title:"Как работает range()",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"range"})," использует Start Stop и Step"]}),t.jsx("li",{children:"По умолчанию start = 0, stop = последнему элементу, step = 1"}),t.jsxs("li",{children:[t.jsx("strong",{children:"range(5)"})," — от 0 до 4 (не включает 5)"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"range(1, 6)"})," — от 1 до 5"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"range(0, 10, 2)"})," — от 0 до 10, шаг 2 (0, 2, 4, 6, 8)"]})]})})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Цикл while"}),t.jsx("p",{className:"theory-intro",children:"Повторяет код, пока условие true:"}),t.jsx(N,{code:`count = 0
while count < 5:
    print(count)
    count = count + 1
# Выведет: 0 1 2 3 4

# Игра: угадай число
number = 42
guess = 0
while guess != number:
    guess = int(input("Угадай число (1-100): "))
    if guess < number:
        print("Число больше")
    elif guess > number:
        print("Число меньше")
    else:
        print("Угадал!")`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"break и continue"}),t.jsx("p",{className:"theory-intro",children:"Управляют ходом цикла:"}),t.jsx(b,{headers:["Команда","Что делает","Пример"],rows:[["break","Выходит из цикла сразу","if password_correct: break"],["continue","Пропускает остаток итерации","if user.age < 18: continue"]]}),t.jsx(N,{code:`# break - выход из цикла
for i in range(10):
    if i == 3:
        break  # Выходит, когда i = 3
    print(i)
# Выведет: 0 1 2

# continue - пропустить итерацию
for i in range(5):
    if i == 2:
        continue  # Пропускает 2
    print(i)
# Выведет: 0 1 3 4`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Функции"}),t.jsx("p",{className:"theory-intro",children:"Функция — это блок кода, которому дали имя. Функция можно вызвать много раз, не переписывая код."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура функции"}),t.jsx(N,{code:`# Объявление функции
def greet(name):
    print(f"Привет, {name}!")

# Вызов функции
greet("Алиса")  # Выведет: Привет, Алиса!
greet("Боб")    # Выведет: Привет, Боб!`,language:"python"}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Части функции:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"def"})," — ключевое слово для определения функции"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"greet"})," — имя функции"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"(name)"})," — параметры (входные данные)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"тело функции"})," — код, который выполняется"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Возвращаемое значение (return)"}),t.jsx("p",{className:"theory-intro",children:"Функция может возвращать результат:"}),t.jsx(N,{code:`# Функция с return
def add(a, b):
    result = a + b
    return result

# Используем результат
sum_value = add(5, 3)
print(sum_value)  # Выведет: 8

# Функция-калькулятор
def calculate(x, y, operation):
    if operation == "+":
        return x + y
    elif operation == "-":
        return x - y
    elif operation == "*":
        return x * y
    elif operation == "/":
        return x / y

print(calculate(10, 3, "+"))  # 13
print(calculate(10, 3, "-"))  # 7`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Параметры и аргументы"}),t.jsx(R,{title:"Разница",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Параметры"})," — переменные в скобках при объявлении функции"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Аргументы"})," — значения, которые передаёшь при вызове функции"]})]})}),t.jsx(N,{code:`# name, age — параметры
def profile(name, age):
    print(f"Имя: {name}, Возраст: {age}")

# "Алиса", 17 — аргументы
profile("Алиса", 17)`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Коллекции данных"}),t.jsx("p",{className:"theory-intro",children:"Коллекция — это контейнер, который хранит несколько значений вместе."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Список (list)"}),t.jsx("p",{className:"theory-intro",children:"Упорядоченная коллекция, которую можно менять:"}),t.jsx(N,{code:`# Создание списка
fruits = ["яблоко", "банан", "апельсин"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "текст", 3.14, True]

# Доступ к элементам (индекс начинается с 0!)
print(fruits[0])   # яблоко
print(fruits[1])   # банан
print(fruits[-1])  # апельсин (последний элемент)

# Добавление элемента
fruits.append("груша")  # [яблоко, банан, апельсин, груша]

# Удаление элемента
fruits.remove("банан")  # [яблоко, апельсин, груша]

# Длина списка
print(len(fruits))  # 3

# Цикл по списку
for fruit in fruits:
    print(fruit)
# Выведет: яблоко, апельсин, груша`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Кортеж (tuple)"}),t.jsx("p",{className:"theory-intro",children:"Как список, но не менять его нельзя:"}),t.jsx(N,{code:`# Создание кортежа (круглые скобки)
coords = (10, 20)
colors = ("red", "green", "blue")

# Доступ работает так же
print(coords[0])  # 10
print(colors[1])  # green

# Это НЕЛЬЗЯ менять!
coords[0] = 15  # ❌ Ошибка!

# Но можно создать новый:
coords = (15, 20)  # ✅ Это работает`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Словарь (dict)"}),t.jsx("p",{className:"theory-intro",children:'Хранит пары "ключ-значение":'}),t.jsx(N,{code:`# Создание словаря (фигурные скобки)
student = {
    "name": "Алиса",
    "age": 17,
    "grade": "10А",
    "gpa": 4.5
}

# Доступ по ключу
print(student["name"])  # Алиса
print(student["age"])   # 17

# Добавление новой пары
student["city"] = "Москва"

# Удаление
del student["grade"]

# Проверка наличия ключа
if "name" in student:
    print(student["name"])  # Алиса

# Цикл по словарю
for key, value in student.items():
    print(f"{key}: {value}")
# Выведет:
# name: Алиса
# age: 17
# city: Москва`,language:"python"})]}),t.jsx(b,{headers:["Тип","Символы","Можно менять?","Дубли?","Когда использовать"],rows:[["Список","[ ]","Да","Да","Данные, которые меняются"],["Кортеж","( )","Нет","Да","Данные, которые не меняются"],["Словарь","{ }","Да","Нет (ключи)","Связанные данные (ключ-значение)"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Читаемость кода"}),t.jsx("p",{className:"theory-intro",children:"Код пишется один раз, но читается много раз. Сделай его понятным!"}),t.jsxs(R,{title:"Плохо vs Хорошо",children:[t.jsx("p",{children:t.jsx("strong",{children:"Плохо:"})}),t.jsx("p",{style:{color:"#ff6b6b",fontSize:"13px",fontFamily:"monospace"},children:"x = 5; y = []; for i in range(x): y.append(i*2)"}),t.jsx("p",{style:{marginTop:"12px"},children:t.jsx("strong",{children:"Хорошо:"})}),t.jsx(N,{code:`numbers = []
limit = 5
for i in range(limit):
    doubled = i * 2
    numbers.append(doubled)`,language:"python"})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Правила:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Используй понятные имена переменных (age вместо a)"}),t.jsx("li",{className:"theory-list-item",children:"Добавляй пробелы: a + b вместо a+b"}),t.jsx("li",{className:"theory-list-item",children:"Один блок кода = одна задача"}),t.jsx("li",{className:"theory-list-item",children:"Комментарии только когда код неочевиден"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Ты уже почти профессионал!"})})]})}function qm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 4"}),t.jsx("p",{className:"theory-subtitle",children:"Алгоритмическое мышление и Big O"}),t.jsx("p",{className:"theory-date",children:"4 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое алгоритм?"}),t.jsx("p",{className:"theory-intro",children:"Алгоритм — это пошаговая инструкция для решения задачи. Как рецепт в кулинарии: нужно делать шаги в правильном порядке, чтобы получить результат."}),t.jsx("p",{className:"theory-intro",style:{marginTop:"12px"},children:"Свойства алгоритма:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Конечность"})," — алгоритм должен закончиться, не бежать вечно"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Определённость"})," — каждый шаг должен быть ясным и однозначным"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ввод"})," — алгоритм принимает входные данные"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Вывод"})," — алгоритм выдаёт результат"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Эффективность"})," — алгоритм должен работать за разумное время"]})]}),t.jsx(R,{title:"Пример: Рецепт чая",children:t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Налей воду в чайник"}),t.jsx("li",{children:"Включи чайник"}),t.jsx("li",{children:"Жди, пока вода закипит"}),t.jsx("li",{children:"Налей горячую воду в кружку"}),t.jsx("li",{children:"Положи пакетик чая"}),t.jsx("li",{children:"Жди 3-5 минут"}),t.jsx("li",{children:"Достань пакетик"}),t.jsx("li",{children:"Добавь сахар (по желанию)"}),t.jsx("li",{children:"Чай готов!"})]})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Примеры алгоритмов"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Алгоритм: Найти максимум в списке"}),t.jsx(N,{code:`def find_max(numbers):
    max_value = numbers[0]

    for num in numbers:
        if num > max_value:
            max_value = num

    return max_value

# Пример
scores = [45, 89, 23, 67, 92, 34]
print(find_max(scores))  # 92`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Алгоритм: Поиск элемента (Linear Search)"}),t.jsx(N,{code:`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Найдено на позиции i
    return -1  # Не найдено

# Пример
fruits = ["яблоко", "банан", "апельсин"]
print(linear_search(fruits, "банан"))  # 1
print(linear_search(fruits, "груша"))  # -1`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Алгоритм: Сортировка (Bubble Sort)"}),t.jsx(N,{code:`def bubble_sort(arr):
    n = len(arr)

    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Меняем местами
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    return arr

# Пример
nums = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(nums))
# [11, 12, 22, 25, 34, 64, 90]`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Нотация Big O (сложность алгоритма)"}),t.jsx("p",{className:"theory-intro",children:"Big O — это способ описать, как быстро растёт время выполнения алгоритма при увеличении входных данных."}),t.jsxs(R,{title:"Аналогия",children:[t.jsx("p",{children:"Представь, что у тебя есть большая библиотека:"}),t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"O(1)"})," — ты помнишь, где конкретная книга, берёшь её сразу"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"O(n)"})," — нужно проверить все полки, может на 100-й полке"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"O(n²)"})," — нужно проверить все полки и все книги на каждой полке"]})]})]}),t.jsx(b,{headers:["Нотация","Название","Что делает","Пример","Скорость"],rows:[["O(1)","Постоянная","Одна операция, не зависит от размера","Доступ к элементу по индексу","Молния"],["O(log n)","Логарифмическая","Каждый раз половина","Бинарный поиск","Очень быстро"],["O(n)","Линейная","Проверить все элементы","Поиск в списке","Быстро"],["O(n log n)","Линейно-логарифмическая","Разделяй и властвуй","Эффективная сортировка","Нормально"],["O(n²)","Квадратичная","Вложенные циклы","Пузырьковая сортировка","Медленно"],["O(n³)","Кубическая","Три вложенных цикла","Тройные циклы","Медленнее"],["O(2ⁿ)","Экспоненциальная","Растёт очень быстро","Некоторые рекурсивные алгоритмы","Очень медленно"]]}),t.jsxs("div",{className:"theory-subsection",style:{marginTop:"24px"},children:[t.jsx("h3",{className:"theory-heading-3",children:"Как анализировать Big O"}),t.jsx(N,{code:`# O(1) - одна операция
def get_first(arr):
    return arr[0]

# O(n) - один цикл
def sum_all(arr):
    total = 0
    for num in arr:
        total += num
    return total

# O(n²) - вложенные циклы
def print_pairs(arr):
    for i in arr:
        for j in arr:
            print(i, j)

# O(log n) - каждый раз половина (бинарный поиск)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение скоростей"}),t.jsx("p",{className:"theory-intro",children:"Как быстро работают разные алгоритмы с 1 млн элементов:"}),t.jsx(b,{headers:["Big O","Операций","Время","Использовать?"],rows:[["O(1)","1","0.000001 сек","Идеально! ✅"],["O(log n)","20","0.00002 сек","Очень хорошо ✅"],["O(n)","1,000,000","0.001 сек","Хорошо ✅"],["O(n log n)","20,000,000","0.02 сек","Приемлемо ✅"],["O(n²)","1,000,000,000,000","16 минут","Плохо ❌"],["O(2ⁿ)","Огромное число","Вечность ","Очень плохо ❌"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как выбрать хороший алгоритм"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Для маленьких данных — важнее простота кода"}),t.jsx("li",{className:"theory-list-item",children:"Для больших данных — важнее скорость (Big O)"}),t.jsx("li",{className:"theory-list-item",children:"Всегда проверь граничные случаи (пустой список, один элемент)"}),t.jsx("li",{className:"theory-list-item",children:"O(n) лучше, чем O(n²), но O(1) ещё лучше!"})]}),t.jsxs(R,{title:"На собеседовании",children:[t.jsx("p",{children:"Когда спрашивают решить задачу, обязательно скажи:"}),t.jsxs("ul",{children:[t.jsx("li",{children:"Какая Big O временная сложность?"}),t.jsx("li",{children:"Какая Big O пространственная сложность (память)?"}),t.jsx("li",{children:"Можно ли оптимизировать?"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь, как писать быстрый код"})})]})}function Qm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 5"}),t.jsx("p",{className:"theory-subtitle",children:"Дискретная математика: логика и множества"}),t.jsx("p",{className:"theory-date",children:"5 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Булева алгебра"}),t.jsx("p",{className:"theory-intro",children:"Булева алгебра работает с двумя значениями: истина (True) и ложь (False). Это основа всей цифровой логики!"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Логические операции"}),t.jsx(b,{headers:["Операция","Символ","Описание","Пример","Результат"],rows:[["AND (И)","and, &","true, если ОБА значения true","True and False","False"],["OR (ИЛИ)","or, |","true, если ХОТЬ ОДНО true","True or False","True"],["NOT (НЕ)","not, !","Инвертирует значение","not True","False"],["XOR (исключающее ИЛИ)","xor, ^","true, если значения разные","True xor True","False"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Таблицы истинности"}),t.jsx("p",{className:"theory-intro",children:"AND — оба должны быть true:"}),t.jsx(b,{headers:["A","B","A AND B"],rows:[["true","true","true"],["true","false","false"],["false","true","false"],["false","false","false"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"OR — хоть одно true:"}),t.jsx(b,{headers:["A","B","A OR B"],rows:[["true","true","true"],["true","false","true"],["false","true","true"],["false","false","false"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"NOT — инверсия:"}),t.jsx(b,{headers:["A","NOT A"],rows:[["true","false"],["false","true"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Примеры в коде"}),t.jsx(N,{code:`# AND - оба условия должны быть true
age = 25
has_license = True

if age >= 18 and has_license:
    print("Можно водить машину")

# OR - хоть одно условие true
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("Выходной!")  # Выведет это

# NOT - инверсия
is_raining = True

if not is_raining:
    print("Можно гулять")
else:
    print("Нужен зонтик")  # Выведет это`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Множества (Sets)"}),t.jsx("p",{className:"theory-intro",children:"Множество — это неупорядоченная коллекция уникальных элементов. В отличие от списка, каждый элемент может быть только один раз."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции с множествами"}),t.jsx(N,{code:`# Создание множества
colors = {"красный", "зелёный", "синий"}
numbers = {1, 2, 3, 4, 5}

# Добавление элемента
colors.add("жёлтый")

# Удаление элемента
colors.remove("красный")

# Проверка наличия элемента
if "зелёный" in colors:
    print("Зелёный есть!")

# Размер множества
print(len(colors))

# Преобразование из списка (удалит дубли!)
duplicates = [1, 2, 2, 3, 3, 3]
unique = set(duplicates)
print(unique)  # {1, 2, 3}`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции между множествами"}),t.jsx(N,{code:`set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}

# Объединение (union) - все элементы из обоих
union = set_a | set_b
# или set_a.union(set_b)
print(union)  # {1, 2, 3, 4, 5, 6}

# Пересечение (intersection) - общие элементы
intersection = set_a & set_b
# или set_a.intersection(set_b)
print(intersection)  # {3, 4}

# Разность (difference) - элементы только из первого
difference = set_a - set_b
# или set_a.difference(set_b)
print(difference)  # {1, 2}

# Симметричная разность - уникальные для каждого
sym_diff = set_a ^ set_b
print(sym_diff)  # {1, 2, 5, 6}`,language:"python"})]}),t.jsx(b,{headers:["Операция","Символ","Что делает","Пример"],rows:[["Объединение","|","Все элементы из обоих","{1,2} | {2,3} = {1,2,3}"],["Пересечение","&","Общие элементы","{1,2} & {2,3} = {2}"],["Разность","-","Только из первого","{1,2} - {2,3} = {1}"],["Симметричная разность","^","Уникальные для каждого","{1,2} ^ {2,3} = {1,3}"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Теория множеств"}),t.jsx("p",{className:"theory-intro",children:"Множество описывает коллекцию элементов, которые имеют общее свойство."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Основные понятия"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Элемент"})," — одно значение в множестве"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Пустое множество"})," — множество без элементов ∅"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Подмножество"})," — множество, все элементы которого содержатся в другом множестве"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Универсум"})," — все возможные элементы"]})]}),t.jsx(N,{code:`# Пустое множество
empty = set()
# НЕ используй {} - это пустой словарь!

# Подмножество
numbers = {1, 2, 3, 4, 5}
evens = {2, 4}

# Проверка: evens — подмножество numbers?
if evens <= numbers:
    print("evens — подмножество numbers")  # Выведет это

# Проверка: numbers — надмножество evens?
if numbers >= evens:
    print("numbers — надмножество evens")  # Выведет это`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Битовые операции"}),t.jsx("p",{className:"theory-intro",children:"Компьютер работает с битами (0 и 1). Битовые операции работают прямо с нулями и единицами в памяти."}),t.jsx(b,{headers:["Операция","Символ","Описание"],rows:[["AND","&","Побитовое И"],["OR","|","Побитовое ИЛИ"],["XOR","^","Побитовое исключающее ИЛИ"],["NOT","~","Побитовое НЕ"],["Левый сдвиг","<<","Сдвинуть влево на n позиций"],["Правый сдвиг",">>","Сдвинуть вправо на n позиций"]]}),t.jsx(N,{code:`# Примеры битовых операций
a = 5     # В бинарном: 0101
b = 3     # В бинарном: 0011

# AND - 1 только если оба 1
print(a & b)  # 0001 = 1

# OR - 1 если хоть один 1
print(a | b)  # 0111 = 7

# XOR - 1 если разные
print(a ^ b)  # 0110 = 6

# Сдвиг влево (умножение на 2)
print(5 << 1)  # 10 (5 * 2)

# Сдвиг вправо (деление на 2)
print(5 >> 1)  # 2 (5 / 2)`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практическое применение"}),t.jsxs(R,{title:"Пример: Проверка флагов",children:[t.jsx("p",{children:"Часто используют биты как флаги (на/выкл):"}),t.jsx(N,{code:`# Флаги: читать(1), писать(2), исполнять(4)
READ = 1      # 0001
WRITE = 2     # 0010
EXECUTE = 4   # 0100

# Даём пользователю права читать и писать
user_rights = READ | WRITE  # 0011 = 3

# Проверяем, может ли пользователь писать?
if user_rights & WRITE:
    print("Можно писать!")

# Добавляем право исполнять
user_rights = user_rights | EXECUTE

# Снимаем право писать
user_rights = user_rights & ~WRITE`,language:"python"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Логика — основа всего в программировании!"})})]})}function Km(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 6"}),t.jsx("p",{className:"theory-subtitle",children:"Дискретная математика: графы и алгоритмы"}),t.jsx("p",{className:"theory-date",children:"6 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое граф?"}),t.jsx("p",{className:"theory-intro",children:"Граф — это структура, которая состоит из точек (вершин) и линий (рёбер), соединяющих эти точки. Графы помогают моделировать реальные сиутации."}),t.jsx(R,{title:"Примеры графов в реальной жизни",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Социальная сеть"})," — люди это вершины, дружба это рёбра"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Карта города"})," — перекрёстки это вершины, дороги это рёбра"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Интернет"})," — компьютеры это вершины, кабели это рёбра"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Родственные связи"})," — люди это вершины, семейные связи это рёбра"]})]})}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Основные понятия"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Вершина (узел)"})," — точка в графе"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ребро"})," — линия, соединяющая два узла"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ориентированный граф"})," — рёбра имеют направление (стрелка)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Неориентированный граф"})," — рёбра без направления"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Взвешенный граф"})," — рёбра имеют вес (расстояние, стоимость)"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Представление графа"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Матрица смежности"}),t.jsx("p",{className:"theory-intro",children:"Используется, если много рёбер. Таблица, где строка и столбец = вершины, значение = есть ли ребро."}),t.jsx(N,{code:`# Матрица смежности для графа A-B, A-C, B-C
# 1 = есть ребро, 0 = нет ребра

adjacency_matrix = [
    [0, 1, 1],  # A: связь с B, C
    [1, 0, 1],  # B: связь с A, C
    [1, 1, 0]   # C: связь с A, B
]

# Проверка: есть ли ребро между A (0) и B (1)?
if adjacency_matrix[0][1] == 1:
    print("Есть ребро A-B")`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Список смежности"}),t.jsx("p",{className:"theory-intro",children:"Используется, если мало рёбер. Для каждой вершины список её соседей."}),t.jsx(N,{code:`# Список смежности для графа A-B, A-C, B-C
# Словарь: вершина -> список соседей

adjacency_list = {
    'A': ['B', 'C'],
    'B': ['A', 'C'],
    'C': ['A', 'B']
}

# Получить соседей вершины A
neighbors_a = adjacency_list['A']
print(neighbors_a)  # ['B', 'C']

# Проверить: соседи ли A и B?
if 'B' in adjacency_list['A']:
    print("A и B — соседи")`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Поиск в ширину (BFS)"}),t.jsx("p",{className:"theory-intro",children:"BFS (Breadth-First Search) — ищет уровень за уровнем, от стартовой вершины. Используется очередь."}),t.jsx(R,{title:"Как работает BFS",children:t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Начинаешь со стартовой вершины, добавляешь в очередь"}),t.jsx("li",{children:"Берёшь вершину из начала очереди"}),t.jsx("li",{children:"Проверяешь все её соседей"}),t.jsx("li",{children:"Еслиососед не посещён, добавляешь в очередь"}),t.jsx("li",{children:"Повторяешь, пока очередь не пуста"})]})}),t.jsx(N,{code:`from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []

    while queue:
        node = queue.popleft()  # Берём из начала
        result.append(node)

        # Проверяем всех соседей
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result

# Граф: A-B, A-C, B-D, C-D
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D']`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Поиск в глубину (DFS)"}),t.jsx("p",{className:"theory-intro",children:"DFS (Depth-First Search) — идёт как глубже и глубже в один путь. Используется стек или рекурсия."}),t.jsx(R,{title:"Как работает DFS",children:t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Начинаешь со стартовой вершины"}),t.jsx("li",{children:"Идёшь как можно глубже в одного соседа"}),t.jsx("li",{children:"Когда зашёл в тупик, возвращаешься"}),t.jsx("li",{children:"Пробуешь следующего соседа"})]})}),t.jsx(N,{code:`def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    result = [node]

    for neighbor in graph[node]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))

    return result

# Граф: A-B, A-C, B-D, C-D
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

print(dfs(graph, 'A'))  # ['A', 'B', 'D', 'C']`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение BFS vs DFS"}),t.jsx(b,{headers:["Критерий","BFS","DFS"],rows:[["Структура данных","Очередь","Стек или рекурсия"],["Как ищет","Уровень за уровнем","Как можно глубже"],["Находит кратчайший путь?","Да","Нет"],["Используется для","Кратчайший путь, ширина","Компоненты, цикли"],["Память","Может быть больше","Зависит от высоты"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Топологическая сортировка"}),t.jsx("p",{className:"theory-intro",children:"Порядок вершин в ориентированном графе без циклов, где для каждого ребра A→B вершина A идёт раньше B."}),t.jsx(N,{code:`from collections import deque

def topological_sort(graph, in_degree):
    queue = deque([node for node in graph if in_degree[node] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return result

# Граф зависимостей: A→B, A→C, B→D, C→D
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
}

in_degree = {'A': 0, 'B': 1, 'C': 1, 'D': 2}

print(topological_sort(graph, in_degree))  # ['A', 'B', 'C', 'D']`,language:"python"}),t.jsx(R,{title:"Применение",children:t.jsx("p",{children:"Например, в системе сборки проектов: нужно скомпилировать файл A перед файлом B, если B зависит от A."})})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь графы"})})]})}function Ym(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 7"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: массивы и связанные списки"}),t.jsx("p",{className:"theory-date",children:"7 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Массив (Array)"}),t.jsx("p",{className:"theory-intro",children:"Массив — это структура данных, которая хранит несколько элементов одного типа в смежных ячейках памяти. Каждый элемент имеет индекс."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Как работает массив в памяти"}),t.jsx("p",{className:"theory-intro",children:"Массив занимает последовательно блоки памяти. Если массив начинается с адреса 1000:"}),t.jsx(b,{headers:["Индекс","Адрес памяти","Значение"],rows:[["0","1000","45"],["1","1004","89"],["2","1008","23"],["3","1012","67"],["4","1016","92"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Поэтому доступ к элементу по индексу за O(1) — просто посчитай адрес!"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции с массивом"}),t.jsx(b,{headers:["Операция","Big O","Описание"],rows:[["Доступ по индексу","O(1)","arr[2] — мгновенно"],["Добавление в конец","O(1)","Если место есть"],["Вставка в середину","O(n)","Нужно сдвинуть элементы"],["Удаление из середины","O(n)","Нужно сдвинуть элементы"],["Поиск элемента","O(n)","Проверить все элементы"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Плюсы и минусы"}),t.jsx("p",{className:"theory-intro",children:t.jsx("strong",{children:"✅ Плюсы:"})}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Быстрый доступ к элементу по индексу O(1)"}),t.jsx("li",{className:"theory-list-item",children:"Экономит память (нет дополнительных указателей)"}),t.jsx("li",{className:"theory-list-item",children:"Можно быстро итерировать"})]}),t.jsx("p",{className:"theory-intro",children:t.jsx("strong",{children:"❌ Минусы:"})}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Фиксированный размер (в большинстве языков)"}),t.jsx("li",{className:"theory-list-item",children:"Вставка/удаление в середину O(n) — медленно"}),t.jsx("li",{className:"theory-list-item",children:"Нужно знать размер заранее"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Динамический массив"}),t.jsx("p",{className:"theory-intro",children:"Динамический массив (как list в Python) автоматически растёт, когда не хватает места. Так как это работает?"}),t.jsx(R,{title:"Как растёт динамический массив",children:t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Создаёшь список [] с местом на 10 элементов"}),t.jsx("li",{children:"Добавляешь 10 элементов — список полон"}),t.jsx("li",{children:"Добавляешь 11-й элемент — программа создаёт новый массив на 20 элементов"}),t.jsx("li",{children:"Копирует старые 10 элементов туда"}),t.jsx("li",{children:"Добавляет 11-й элемент"}),t.jsx("li",{children:"Удаляет старый массив"})]})}),t.jsx(N,{code:`# В Python это список
numbers = []  # Создан пустой список

# Добавляем элементы
for i in range(1000000):
    numbers.append(i)

# Каждый append работает как:
# 1. Если место есть → добавляем O(1)
# 2. Если нет места → копируем всё в новый массив O(n) + добавляем

# Но в среднем это O(1) за счёт группировки добавлений!`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Связанный список (Linked List)"}),t.jsx("p",{className:"theory-intro",children:"Связанный список — это список, где каждый элемент (узел) содержит данные и указатель на следующий узел."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура узла"}),t.jsx(N,{code:`class Node:
    def __init__(self, data):
        self.data = data        # Данные
        self.next = None        # Указатель на следующий узел

# Создание узлов
node1 = Node(10)
node2 = Node(20)
node3 = Node(30)

# Связываем их
node1.next = node2
node2.next = node3

# Получение данных
print(node1.data)        # 10
print(node1.next.data)   # 20
print(node1.next.next.data)  # 30`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Полная реализация"}),t.jsx(N,{code:`class LinkedList:
    def __init__(self):
        self.head = None

    def add(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node

    def display(self):
        result = []
        current = self.head
        while current:
            result.append(current.data)
            current = current.next
        print(result)

    def remove(self, data):
        if not self.head:
            return

        if self.head.data == data:
            self.head = self.head.next
            return

        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next

# Использование
ll = LinkedList()
ll.add(10)
ll.add(20)
ll.add(30)
ll.display()  # [10, 20, 30]

ll.remove(20)
ll.display()  # [10, 30]`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции со связанным списком"}),t.jsx(b,{headers:["Операция","Big O","Описание"],rows:[["Доступ к элементу","O(n)","Нужно пройти от начала"],["Вставка в начало","O(1)","Просто меняем head"],["Вставка после узла","O(1)","Меняем указатели"],["Удаление из начала","O(1)","Меняем head"],["Поиск элемента","O(n)","Проходим по всем"]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение: Массив vs Связный список"}),t.jsx(b,{headers:["Критерий","Массив","Связный список"],rows:[["Доступ по индексу","O(1) ⚡","O(n) 🐢"],["Вставка/удаление в начало","O(n) 🐢","O(1) ⚡"],["Вставка/удаление в конец","O(1) ⚡","O(n) 🐢"],["Поиск","O(n)","O(n)"],["Память","Плотная","Дополнительная на указатели"],["Использовать когда","Нужен быстрый доступ","Много вставок/удалений"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Двусвязный список"}),t.jsx("p",{className:"theory-intro",children:"Как связный список, но каждый узел имеет указатель и на следующий, и на предыдущий. Позволяет идти в обе стороны."}),t.jsx(N,{code:`class DNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None  # Указатель на предыдущий

# Двусвязный список можно обходить в обе стороны
node1 = DNode(10)
node2 = DNode(20)
node3 = DNode(30)

node1.next = node2
node2.prev = node1
node2.next = node3
node3.prev = node2

# Идём вперёд: 10 → 20 → 30
current = node1
while current:
    print(current.data)
    current = current.next

# Идём назад: 30 → 20 → 10
current = node3
while current:
    print(current.data)
    current = current.prev`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Когда что использовать?"}),t.jsx(R,{title:"Примеры",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Массив:"})," Сохраняешь оценки студентов, часто нужен доступ к i-й оценке"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Динамический массив:"})," Собираешь данные, не знаешь количество заранее"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Связный список:"})," Реализуешь очередь или стек, много вставок/удалений"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Двусвязный список:"}),' Плеер с кнопками "вперёд/назад" по плейлисту']})]})})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Правильная структура данных = правильное решение!"})})]})}function Jm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 8"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: стек и очередь"}),t.jsx("p",{className:"theory-date",children:"8 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Стек (Stack)"}),t.jsx("p",{className:"theory-intro",children:"Стек работает по принципу LIFO (Last In, First Out) — последний добавленный элемент первым извлекается. Как стопка тарелок: берёшь с вершины."}),t.jsxs(R,{title:"Аналогия из жизни",children:[t.jsx("p",{children:"Думаешь о стопке книг:"}),t.jsxs("ul",{children:[t.jsx("li",{children:"Положил первую книгу (основание стека)"}),t.jsx("li",{children:"Положил вторую на первую"}),t.jsx("li",{children:"Положил третью на вторую (вершина стека)"}),t.jsx("li",{children:"Берёшь книги? Сначала третью, потом вторую, потом первую"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции со стеком"}),t.jsx(b,{headers:["Операция","Описание","Big O"],rows:[["push(x)","Добавить элемент на вершину","O(1)"],["pop()","Удалить и вернуть элемент с вершины","O(1)"],["peek()","Посмотреть элемент на вершине без удаления","O(1)"],["is_empty()","Проверить, пуст ли стек","O(1)"],["size()","Размер стека","O(1)"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Реализация стека"}),t.jsx(N,{code:`class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Использование
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)

print(stack.pop())   # 30 (последний добавленный)
print(stack.peek())  # 20 (вершина без удаления)
print(stack.size())  # 2`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Примеры использования стека"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Undo/Redo"})," — каждый шаг в стек, отменяешь — pop из стека"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"История браузера"}),' — нажимаешь "назад" → pop из стека URL']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Вычисление выражений"})," — (2 + 3) * 4 → используешь стек"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Рекурсия"})," — каждый вызов функции идёт в стек вызовов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"DFS (поиск в глубину)"})," — обход графа"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Очередь (Queue)"}),t.jsx("p",{className:"theory-intro",children:"Очередь работает по принципу FIFO (First In, First Out) — первый добавленный элемент первым извлекается. Как очередь в магазине."}),t.jsxs(R,{title:"Аналогия из жизни",children:[t.jsx("p",{children:"Очередь в магазине:"}),t.jsxs("ul",{children:[t.jsx("li",{children:"Первый пришёл — первый обслужился"}),t.jsx("li",{children:"Последний пришёл — последний обслужился"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции с очередью"}),t.jsx(b,{headers:["Операция","Описание","Big O"],rows:[["enqueue(x)","Добавить элемент в конец (задняя часть)","O(1)"],["dequeue()","Удалить и вернуть элемент с начала (передняя часть)","O(1)"],["front()","Посмотреть первый элемент без удаления","O(1)"],["is_empty()","Проверить, пуста ли очередь","O(1)"],["size()","Размер очереди","O(1)"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Реализация очереди"}),t.jsx(N,{code:`from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        return None

    def front(self):
        if not self.is_empty():
            return self.items[0]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Использование
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

print(queue.dequeue())  # 10 (первый добавленный)
print(queue.front())    # 20 (передняя без удаления)
print(queue.size())     # 2`,language:"python"}),t.jsx(R,{title:"Почему deque?",children:t.jsx("p",{children:"Используем deque из collections, потому что обычный list в Python медленный для удаления с начала (O(n)). deque быстрый для обоих концов (O(1))."})})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Примеры использования очереди"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Очередь печати"})," — отправляешь несколько файлов, принтер печатает по очереди"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BFS (поиск в ширину)"})," — обход графа уровень за уровнем"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Система обработки задач"})," — рабочий берёт первую задачу из очереди"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Буфер ввода-вывода"})," — данные идут в очередь, программа обрабатывает по порядку"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение: Стек vs Очередь"}),t.jsx(b,{headers:["Критерий","Стек (LIFO)","Очередь (FIFO)"],rows:[["Добавление","В вершину (push)","В конец (enqueue)"],["Удаление","С вершины (pop)","С начала (dequeue)"],["Первым обслужен","Последний добавленный","Первый добавленный"],["Аналогия","Стопка тарелок","Очередь в магазине"],["Используется для","Undo/redo, DFS","BFS, обработка задач"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Деку (Deque) - двусторонняя очередь"}),t.jsx("p",{className:"theory-intro",children:"Deque (Double Ended Queue) — очередь, где можно добавлять и удалять элементы с обоих концов."}),t.jsx(N,{code:`from collections import deque

dq = deque([10, 20, 30])

# Добавлять можно с обоих концов
dq.append(40)        # Добавить в конец: [10, 20, 30, 40]
dq.appendleft(5)     # Добавить в начало: [5, 10, 20, 30, 40]

# Удалять можно с обоих концов
dq.pop()             # Удалить с конца: [5, 10, 20, 30]
dq.popleft()         # Удалить с начала: [10, 20, 30]

print(dq)            # deque([10, 20, 30])

# Все операции O(1)!`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практический пример: Проверка скобок"}),t.jsx("p",{className:"theory-intro",children:"Проверить, правильно ли расставлены скобки: (()), ()((, ()("}),t.jsx(N,{code:`def is_valid_parentheses(s):
    stack = Stack()
    pairs = {'(': ')', '[': ']', '{': '}'}

    for char in s:
        if char in pairs:  # Открывающая скобка
            stack.push(char)
        elif char in pairs.values():  # Закрывающая скобка
            if stack.is_empty() or pairs[stack.pop()] != char:
                return False

    return stack.is_empty()

# Примеры
print(is_valid_parentheses("()"))        # True
print(is_valid_parentheses("()[]{}"))    # True
print(is_valid_parentheses("([{}])"))    # True
print(is_valid_parentheses("([)]"))      # False
print(is_valid_parentheses("("))         # False`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практический пример: BFS с очередью"}),t.jsx(N,{code:`from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []

    while queue:
        node = queue.popleft()  # Берём с начала (очередь)
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)  # Добавляем в конец

    return result

# Граф
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['C']
}

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D', 'E']`,language:"python"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Стек и очередь — это основа многих алгоритмов!"})})]})}function Xm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 9"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: хэш-таблицы"}),t.jsx("p",{className:"theory-date",children:"9 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое хэш-таблица?"}),t.jsx("p",{className:"theory-intro",children:"Хэш-таблица (hash table) — это структура данных, которая использует хэш-функцию для превращения ключей в индексы массива. Позволяет очень быстро искать, добавлять и удалять элементы."}),t.jsxs(R,{title:"Аналогия",children:[t.jsx("p",{children:"Представь, что у тебя есть картотека:"}),t.jsxs("ul",{children:[t.jsx("li",{children:'Нужно найти запись по имени "Алиса"'}),t.jsx("li",{children:"Вместо того чтобы перелистывать все записи, применяешь хэш-функцию"}),t.jsx("li",{children:'Хэш("Алиса") = 7 → идёшь сразу на ящик 7 → находишь запись'})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как работает хэш-таблица"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Хэш-функция"}),t.jsx("p",{className:"theory-intro",children:"Хэш-функция — это функция, которая преобразует ключ любого типа в целое число (индекс)."}),t.jsx(N,{code:`# Простая хэш-функция для строк
def simple_hash(key, table_size):
    hash_value = 0
    for char in key:
        hash_value += ord(char)  # Суммируем ASCII коды
    return hash_value % table_size

# Пример
table_size = 10
print(simple_hash("Alice", table_size))    # Индекс 0-9
print(simple_hash("Bob", table_size))      # Индекс 0-9
print(simple_hash("Charlie", table_size))  # Индекс 0-9

# Хорошая хэш-функция распределяет ключи равномерно`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура хэш-таблицы"}),t.jsx("p",{className:"theory-intro",children:"Упрощённо это выглядит так:"}),t.jsx(b,{headers:["Индекс","Содержимое","Ключи"],rows:[["0",'[("Alice", 90)]',"Alice"],["1","[]","пусто"],["2",'[("Bob", 85)]',"Bob"],["3","[]","пусто"],["4",'[("Charlie", 92)]',"Charlie"],["5","[]","пусто"],["...","...","..."]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Коллизии"}),t.jsx("p",{className:"theory-intro",children:'Коллизия — когда две разные ключи дают один индекс. Например, "Alice" и "Bob" оба дают индекс 2. Нужно это решить.'}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод 1: Chaining (цепочка)"}),t.jsx("p",{className:"theory-intro",children:"Каждая ячейка содержит список (цепочку) элементов. Если коллизия — добавляем в список."}),t.jsx(N,{code:`# Хэш-таблица с chaining
class HashTableChaining:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]

    def hash(self, key):
        return sum(ord(c) for c in key) % self.size

    def add(self, key, value):
        index = self.hash(key)
        # Проверяем, есть ли уже такой ключ
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        # Добавляем в конец цепочки
        self.table[index].append((key, value))

    def get(self, key):
        index = self.hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return None

# Использование
ht = HashTableChaining(10)
ht.add("Alice", 90)
ht.add("Bob", 85)
ht.add("Charlie", 92)

print(ht.get("Alice"))   # 90
print(ht.get("Bob"))     # 85`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод 2: Open Addressing"}),t.jsx("p",{className:"theory-intro",children:"Если ячейка занята, ищем следующую свободную ячейку. Например, линейный поиск: если индекс 2 занят, смотрим 3, потом 4, и т.д."}),t.jsx(N,{code:`class HashTableOpenAddressing:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size

    def hash(self, key):
        return sum(ord(c) for c in key) % self.size

    def add(self, key, value):
        index = self.hash(key)
        while self.table[index] is not None:
            if self.table[index][0] == key:
                self.table[index] = (key, value)
                return
            index = (index + 1) % self.size
        self.table[index] = (key, value)

    def get(self, key):
        index = self.hash(key)
        while self.table[index] is not None:
            if self.table[index][0] == key:
                return self.table[index][1]
            index = (index + 1) % self.size
        return None

ht = HashTableOpenAddressing(10)
ht.add("Alice", 90)
ht.add("Bob", 85)
print(ht.get("Alice"))  # 90`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод 3: Double Hashing (двойное хеширование)"}),t.jsx("p",{className:"theory-intro",children:"Используются две хэш-функции для более эффективного поиска следующей свободной ячейки. При коллизии вместо просто +1, применяем вторую функцию: hash1(key), hash1(key)+hash2(key), hash1(key)+2*hash2(key), и т.д."}),t.jsx("p",{className:"theory-intro",children:"Преимущества: лучше распределяет ключи, меньше кластеров (скопов занятых ячеек), лучше для кэша процессора."}),t.jsx(N,{code:`# Хэш-таблица с double hashing
class HashTableDoubleHashing:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size

    def hash1(self, key):
        # Первая хеш-функция
        return sum(ord(c) for c in key) % self.size

    def hash2(self, key):
        # Вторая хеш-функция (обычно простое число)
        return 7 - (sum(ord(c) for c in key) % 7)

    def add(self, key, value):
        index = self.hash1(key)
        step = self.hash2(key)
        i = 0
        while self.table[index] is not None:
            if self.table[index][0] == key:
                self.table[index] = (key, value)
                return
            i += 1
            index = (self.hash1(key) + i * step) % self.size
        self.table[index] = (key, value)

    def get(self, key):
        index = self.hash1(key)
        step = self.hash2(key)
        i = 0
        while self.table[index] is not None:
            if self.table[index][0] == key:
                return self.table[index][1]
            i += 1
            index = (self.hash1(key) + i * step) % self.size
        return None

# Использование
ht = HashTableDoubleHashing(10)
ht.add("Alice", 90)
ht.add("Bob", 85)
ht.add("Charlie", 92)

print(ht.get("Alice"))   # 90
print(ht.get("Bob"))     # 85`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Сравнение методов разрешения коллизий"}),t.jsx(b,{headers:["Метод","Преимущества","Недостатки"],rows:[["Chaining","Простая реализация, удаление O(1)","Требует доп. память для списков"],["Linear Probing","Не требует доп. память","Кластеризация, заполнение таблицы"],["Double Hashing","Меньше кластеров, лучше распределение","Сложнее реализация, нужны две функции"]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Big O для хэш-таблиц"}),t.jsx(b,{headers:["Операция","Лучший случай","Средний случай","Худший случай"],rows:[["Добавление","O(1)","O(1)","O(n)"],["Удаление","O(1)","O(1)","O(n)"],["Поиск","O(1)","O(1)","O(n)"]]}),t.jsx(R,{title:"Когда наступает худший случай?",children:t.jsx("p",{children:"Когда хэш-функция плохая и много коллизий. Хорошая хэш-функция дает O(1) в 99% случаев!"})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Словарь в Python"}),t.jsx("p",{className:"theory-intro",children:"Словарь (dict) в Python — это хэш-таблица! Он использует интерпретатор Python под капотом."}),t.jsx(N,{code:`# Словарь = хэш-таблица
student = {
    "name": "Алиса",
    "age": 17,
    "grade": "10A"
}

# Добавление - O(1)
student["city"] = "Москва"

# Поиск - O(1)
print(student["name"])  # Алиса

# Удаление - O(1)
del student["grade"]

# Проверка наличия ключа - O(1)
if "age" in student:
    print(student["age"])  # 17

# Итерация по ключам
for key in student:
    print(f"{key}: {student[key]}")

# Методы
print(student.keys())      # dict_keys(['name', 'age', 'city'])
print(student.values())    # dict_values(['Алиса', 17, 'Москва'])
print(student.items())     # dict_items([('name', 'Алиса'), ...])
print(student.get("age"))  # 17`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практические примеры"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Пример 1: Подсчёт частоты элементов"}),t.jsx(N,{code:`def count_frequency(arr):
    frequency = {}
    for num in arr:
        if num in frequency:
            frequency[num] += 1
        else:
            frequency[num] = 1
    return frequency

# Пример
nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
result = count_frequency(nums)
print(result)  # {1: 1, 2: 2, 3: 3, 4: 4}

# Или использовать defaultdict
from collections import defaultdict

frequency = defaultdict(int)
for num in nums:
    frequency[num] += 1

print(dict(frequency))  # {1: 1, 2: 2, 3: 3, 4: 4}`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Пример 2: Two Sum — найти две числа, которые дают сумму"}),t.jsx(N,{code:`def two_sum(arr, target):
    seen = {}
    for num in arr:
        complement = target - num
        if complement in seen:
            return [seen[complement], arr.index(num)]
        seen[num] = arr.index(num)
    return None

# Пример: найти пару, которая дает сумму 7
nums = [2, 7, 11, 15]
result = two_sum(nums, 9)
print(result)  # [0, 1] (2 + 7 = 9)

# Лучшая версия
def two_sum_v2(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return None

print(two_sum_v2(nums, 9))  # [0, 1]`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Пример 3: Найти дубли в массиве"}),t.jsx(N,{code:`def has_duplicates(arr):
    seen = set()
    for num in arr:
        if num in seen:
            return True
        seen.add(num)
    return False

# Примеры
print(has_duplicates([1, 2, 3, 4]))      # False
print(has_duplicates([1, 2, 3, 2, 4]))   # True

# Или использовать длину
def has_duplicates_v2(arr):
    return len(arr) != len(set(arr))`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Когда использовать хэш-таблицу?"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Нужен быстрый поиск по ключу — используй словарь/хэш-таблицу"}),t.jsx("li",{className:"theory-list-item",children:"Подсчёт частоты элементов"}),t.jsx("li",{className:"theory-list-item",children:"Проверка, содержится ли элемент в наборе"}),t.jsx("li",{className:"theory-list-item",children:"Кэширование (запоминание результатов)"}),t.jsx("li",{className:"theory-list-item",children:"Группировка данных по ключам"})]}),t.jsx(R,{title:"На собеседовании",children:t.jsx("p",{children:"Если задача требует быстрого поиска — часто ответ это хэш-таблица или словарь. Подумай: можно ли использовать ключ для O(1) доступа?"})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Итоги 6 дней"}),t.jsx("p",{className:"theory-intro",children:"Ты изучил основные структуры данных:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 4:"})," Алгоритмы и Big O"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 5:"})," Логика и множества"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 6:"})," Графы и поиск"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 7:"})," Массивы и связные списки"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 8:"})," Стеки и очереди"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 9:"})," Хэш-таблицы"]})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Это основа для 99% задач на собеседованиях! Практикуйся на LeetCode, и ты будешь готов 🚀"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Ты на правильном пути! Только вперед!"})})]})}function Zm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 10"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: деревья"}),t.jsx("p",{className:"theory-date",children:"10 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое дерево?"}),t.jsx("p",{className:"theory-intro",children:"Дерево — это иерархическая структура данных с узлами, где каждый узел может иметь несколько потомков, но только одного родителя."}),t.jsx(R,{title:"Аналогия",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Файловая система:"})," папки и файлы образуют дерево"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Генеалогия:"})," родитель → дети → внуки"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Организация:"})," руководитель → отделы → сотрудники"]})]})}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Терминология"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Корень (root)"})," — верхний узел без родителя"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Листья (leaves)"})," — узлы без потомков"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Высота"})," — количество уровней в дереве"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Глубина узла"})," — расстояние до корня"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Поддерево"})," — узел и все его потомки"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Бинарное дерево (Binary Tree)"}),t.jsx("p",{className:"theory-intro",children:"Дерево, где каждый узел может иметь максимум 2 потомка (левый и правый)."}),t.jsx(N,{code:`class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Обходы дерева"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"1. In-order (левый-корень-правый)"}),t.jsx("p",{className:"theory-intro",children:"Для BST дает отсортированный порядок:"}),t.jsx(N,{code:`def inorder(node):
    if node is None:
        return
    inorder(node.left)
    print(node.data)
    inorder(node.right)

# Для дерева выше: 4 2 5 1 3`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"2. Pre-order (корень-левый-правый)"}),t.jsx("p",{className:"theory-intro",children:"Обходит корень первым:"}),t.jsx(N,{code:`def preorder(node):
    if node is None:
        return
    print(node.data)
    preorder(node.left)
    preorder(node.right)

# Для дерева выше: 1 2 4 5 3`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"3. Post-order (левый-правый-корень)"}),t.jsx("p",{className:"theory-intro",children:"Обходит корень последним:"}),t.jsx(N,{code:`def postorder(node):
    if node is None:
        return
    postorder(node.left)
    postorder(node.right)
    print(node.data)

# Для дерева выше: 4 5 2 3 1`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Бинарное дерево поиска (BST)"}),t.jsx("p",{className:"theory-intro",children:"BST — бинарное дерево с особым свойством: левый потомок < родитель < правый потомок."}),t.jsx(N,{code:`class BST:
    def __init__(self):
        self.root = None

    def insert(self, data):
        if self.root is None:
            self.root = Node(data)
        else:
            self._insert_recursive(self.root, data)

    def _insert_recursive(self, node, data):
        if data < node.data:
            if node.left is None:
                node.left = Node(data)
            else:
                self._insert_recursive(node.left, data)
        else:
            if node.right is None:
                node.right = Node(data)
            else:
                self._insert_recursive(node.right, data)

    def search(self, data):
        return self._search_recursive(self.root, data)

    def _search_recursive(self, node, data):
        if node is None:
            return False
        if data == node.data:
            return True
        elif data < node.data:
            return self._search_recursive(node.left, data)
        else:
            return self._search_recursive(node.right, data)

# Использование
bst = BST()
for val in [50, 30, 70, 20, 40, 60, 80]:
    bst.insert(val)

print(bst.search(40))  # True
print(bst.search(100)) # False`,language:"python"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции в BST"}),t.jsx(b,{headers:["Операция","Big O (лучше)","Big O (хуже)","Когда худший случай"],rows:[["Поиск","O(log n)","O(n)","Несбалансированное дерево"],["Вставка","O(log n)","O(n)","Несбалансированное дерево"],["Удаление","O(log n)","O(n)","Несбалансированное дерево"]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Высота и баланс дерева"}),t.jsx(R,{title:"Сбалансированное дерево O(log n)",children:t.jsx("p",{children:"Дерево где разница высот левого и правого поддеревьев ≤ 1"})}),t.jsx(R,{title:"Несбалансированное дерево O(n)",children:t.jsx("p",{children:"Дерево вырождается в список (все элементы в одну сторону)"})}),t.jsx(N,{code:`# Несбалансированное дерево (худший случай)
bst = BST()
for val in [1, 2, 3, 4, 5]:  # Уже отсортировано!
    bst.insert(val)

# Дерево выглядит как список:
# 1-2-3-4-5

# Поиск 5 требует O(5) операций!`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сбалансированные деревья"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"AVL-дерево"}),t.jsx("p",{className:"theory-intro",children:"Самобалансирующееся дерево, которое поддерживает баланс после вставки/удаления. Высота всегда O(log n)."}),t.jsx("p",{className:"theory-text",style:{marginTop:"12px"},children:"Гарантирует O(log n) для всех операций, но медленнее при вставке/удалении из-за переб алансировки."})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Red-Black дерево"}),t.jsx("p",{className:"theory-intro",children:"Другое сбалансированное дерево. Быстрее AVL при вставке/удалении."}),t.jsx("p",{className:"theory-text",style:{marginTop:"12px"},children:"Используется в Java TreeMap и C++ std::map."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практический пример: Проверка BST"}),t.jsx(N,{code:`def is_bst(node, min_val=float('-inf'), max_val=float('inf')):
    """Проверить, является ли дерево корректным BST"""
    if node is None:
        return True

    # Если значение вне диапазона - не BST
    if node.data <= min_val or node.data >= max_val:
        return False

    # Рекурсивно проверяем поддеревья
    return (is_bst(node.left, min_val, node.data) and
            is_bst(node.right, node.data, max_val))

# Пример
root = Node(50)
root.left = Node(30)
root.right = Node(70)
root.left.left = Node(20)
root.left.right = Node(40)

print(is_bst(root))  # True`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Когда использовать деревья?"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BST:"})," Быстрый поиск, сортировка, диапазонные запросы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Файловая система:"})," Иерархия папок и файлов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"DOM дерево:"})," В браузерах для HTML документов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Индексы БД:"})," B-деревья в базах данных"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Парсеры:"})," Abstract Syntax Tree (AST)"]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Деревья — один из самых мощных инструментов программиста!"})})]})}function ef(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 11"}),t.jsx("p",{className:"theory-subtitle",children:"Git: версионирование и командная работа"}),t.jsx("p",{className:"theory-date",children:"11 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое Git?"}),t.jsx("p",{className:"theory-intro",children:"Git — это система контроля версий, которая отслеживает изменения в коде. Позволяет сохранять историю, откатываться назад, работать в команде и создавать отдельные ветки для новых фич."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Платформы хостинга репозиториев"}),t.jsx("p",{className:"theory-intro",children:"Git локальный, но для совместной работы используются платформы:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"GitHub"})," — самая популярная, PR, Issues"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"GitLab"})," — открытый код, полный CI/CD"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Bitbucket"})," — от Atlassian"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Интерфейсы: CLI и GUI"}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"CLI (команды в терминале)"})," — самый мощный способ."]}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"GUI (визуальные приложения)"})," — GitHub Desktop, GitKraken, VS Code."]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Основные команды"}),t.jsx(N,{code:`git clone URL            # Клонировать репозиторий
git init                # Инициализировать новый
git status              # Текущий статус
git add .               # Добавить файлы в staging
git commit -m "msg"     # Создать коммит
git push                # Отправить на удалённый
git pull                # Скачать обновления
git checkout -b name    # Создать и перейти на ветку
git merge name          # Объединить ветку
git log --oneline       # История коммитов
git diff                # Что изменилось`,language:"bash"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Git Workflow для Junior"}),t.jsxs("ol",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"git pull (скачать свежий код)"}),t.jsx("li",{className:"theory-list-item",children:"git checkout -b feature/name (создать свою ветку)"}),t.jsx("li",{className:"theory-list-item",children:'Пишешь код и коммитишь: git add . && git commit -m "msg"'}),t.jsx("li",{className:"theory-list-item",children:"git push origin feature/name (отправляешь ветку)"}),t.jsx("li",{className:"theory-list-item",children:"На GitHub создаёшь Pull Request"}),t.jsx("li",{className:"theory-list-item",children:"Code Review от других разработчиков"}),t.jsx("li",{className:"theory-list-item",children:"После одобрения PR мержится в main"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Pull Request (PR)"}),t.jsx("p",{className:"theory-intro",children:"PR — способ предложить свои изменения для рассмотрения перед включением в главный код."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Code Review — другие смотрят твой код"}),t.jsx("li",{className:"theory-list-item",children:"Обсуждение улучшений и ошибок"}),t.jsx("li",{className:"theory-list-item",children:"Merge в main после одобрения"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Git это не просто инструмент — это часть культуры разработки. Каждый коммит это история. Пиши понятные коммиты и станешь хорошим разработчиком!"})})]})}function tf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 12"}),t.jsx("p",{className:"theory-subtitle",children:"ИИ-инструменты разработчика"}),t.jsx("p",{className:"theory-date",children:"12 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как работают LLM?"}),t.jsx("p",{className:"theory-intro",children:"LLM (Large Language Model) — большая языковая модель. Это нейросеть, обученная на миллиардах слов из интернета. Модель предсказывает следующее слово на основе контекста, вычисляя вероятности для тысяч возможных вариантов."}),t.jsxs(R,{title:"Упрощённо: как модель думает",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Ты:"}),' "Напиши функцию, которая сортирует"']}),t.jsx("p",{children:t.jsx("strong",{children:"Модель внутренне:"})}),t.jsx("p",{children:'• Анализирует контекст: "функция", "сортирует" → скорее всего массив'}),t.jsx("p",{children:"• Проверяет статистику обучения: как обычно пишут сортировку"}),t.jsx("p",{children:"• Вычисляет вероятности: Python (60%), JavaScript (30%), Java (10%)"}),t.jsx("p",{children:"• Выбирает наиболее вероятный ответ"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Основные параметры LLM"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Токены"})," — куски текста (примерно 1 токен = 4 символа). При работе с Claude API нужно знать: входные токены дешевле, выходные дороже"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Контекстное окно"})," — сколько токенов модель может обработать одновременно. Claude 3.5 Sonnet: 200k входных, может вывести до 4k. Это целая книга!"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Температура"})," — 0 = всегда выбирает самый вероятный ответ (логичный), 1 = выбирает случайно (творческий). Для кода используй 0-0.3, для идей 0.7-1"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Max tokens"})," — максимальная длина ответа. Ограничивает стоимость"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Top-p"})," — выбирает из верхних N% вероятных вариантов (альтернатива температуре)"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Модели Claude: какую использовать?"}),t.jsx("p",{className:"theory-intro",children:"Claude выпускает несколько версий модели. Каждая имеет разные характеристики, цену и скорость."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Claude 3.5 Sonnet (Рекомендуется 🚀)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"🏆 Лучшее соотношение цена/производительность"}),t.jsx("li",{className:"theory-list-item",children:"💪 Отличное для программирования (анализ кода, рефакторинг, исправление ошибок)"}),t.jsx("li",{className:"theory-list-item",children:"⚡ Быстрая (2x быстрее чем Opus)"}),t.jsx("li",{className:"theory-list-item",children:"📚 200k контекстное окно = целые проекты можно скармливать"}),t.jsx("li",{className:"theory-list-item",children:"💰 Средняя цена"}),t.jsx("li",{className:"theory-list-item",children:"✅ Лучше всего для ежедневной разработки"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Claude 3 Opus"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:'🧠 Самая "умная" модель (чуть лучше в сложной логике)'}),t.jsx("li",{className:"theory-list-item",children:"⏱️ Медленнее чем Sonnet"}),t.jsx("li",{className:"theory-list-item",children:"💰 Дороже"}),t.jsx("li",{className:"theory-list-item",children:"📚 200k контекст"}),t.jsx("li",{className:"theory-list-item",children:"✅ Для очень сложных задач, когда нужна максимальная точность"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Claude 3 Haiku"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"⚡ Самая быстрая"}),t.jsx("li",{className:"theory-list-item",children:"💰 Самая дешёвая (в 10x раз дешевле Sonnet)"}),t.jsx("li",{className:"theory-list-item",children:"🧠 Менее умная, но достаточна для простых задач"}),t.jsx("li",{className:"theory-list-item",children:"📚 100k контекст"}),t.jsx("li",{className:"theory-list-item",children:"✅ Для быстрых ответов и прототипирования"})]})]}),t.jsx(R,{title:"Таблица сравнения",children:t.jsx(b,{headers:["Модель","Разум","Скорость","Цена","Контекст","Лучше всего для"],rows:[["Claude 3.5 Sonnet","⭐⭐⭐⭐","⚡⚡⚡⚡⚡","💰💰","200k","Разработка (ВЫБЕРИ ЭТО)"],["Claude 3 Opus","⭐⭐⭐⭐⭐","⚡⚡⚡","💰💰💰💰","200k","Очень сложные задачи"],["Claude 3 Haiku","⭐⭐⭐","⚡⚡⚡⚡⚡","💰","100k","Быстрые ответы"]]})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Искусство писать промпты (Prompt Engineering)"}),t.jsx("p",{className:"theory-intro",children:"Промпт — это твой запрос к ИИ. От качества промпта на 80% зависит качество ответа. Это настоящее искусство! Вот как писать хорошие промпты."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"❌ Плохой промпт vs ✅ Хороший промпт"}),t.jsxs(R,{title:"Пример 1: Простая задача",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"❌ Плохо:"}),' "Напиши код"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"✅ Хорошо:"}),' "Напиши функцию на Python, которая проверяет, является ли число простым. Входной параметр: целое число n. Выходной параметр: True если простое, False иначе. Используй эффективный алгоритм O(√n)"']})]}),t.jsxs(R,{title:"Пример 2: Анализ кода",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"❌ Плохо:"}),' "Почему это не работает?"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"✅ Хорошо:"}),' "Вот мой код: [код]. Ошибка: TypeError: NoneType. Я ожидаю, что функция должна вернуть список. Объясни, в чём проблема, и покажи исправленный вариант"']})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"📋 Структура хорошего промпта"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px",lineHeight:"1.8"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Контекст:"})," Для чего это нужно? Кто будет использовать?"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Задача:"})," Что ровно нужно сделать? (Глагол: напиши, объясни, исправь)"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Детали:"})," Язык программирования? Формат? Требования?"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Примеры:"})," Показать примеры входа/выхода"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Ограничения:"})," Не использовать библиотеки? О(n) или меньше?"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Формат ответа:"})," Только код? С объяснением? С комментариями?"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎯 Техника: Chain of Thought (думай пошагово)"}),t.jsx("p",{className:"theory-intro",children:"Явно попроси ИИ думать пошагово для сложных задач:"}),t.jsx(N,{code:`❌ Плохо:
"Реши задачу с массивом"

✅ Хорошо:
"Решение: тебе нужно найти два числа в массиве, которые в сумме дают target.
Сначала объясни алгоритм (что будет твой подход?), потом напиши код.
Покажи пример для массива [2, 7, 11, 15], target = 9"`})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"📚 Техника: Few-shot Learning (показывай примеры)"}),t.jsx("p",{className:"theory-intro",children:"Приведи примеры ПЕРЕД основным вопросом:"}),t.jsx(N,{code:`Перевод названий переменных из camelCase в snake_case:

userName → user_name
getUserId → get_user_id
isActive → is_active

Теперь переведи эти (используй тот же паттерн):
myAwesomeVariable → ?
totalCount → ?
calculateHashValue → ?`}),t.jsx("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:"Нейросеть видит примеры и легче понимает паттерн!"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎭 Техника: Role-based prompting (задай роль)"}),t.jsx(N,{code:`✅ Хороший промпт:
"Ты опытный разработчик Python с 10 лет опыта.
Напиши код для валидации email адреса.
Используй лучшие практики и обработку исключений.
Добавь типизацию (type hints)."`}),t.jsx("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:"Указание роли + опыта часто улучшает качество!"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Контекст: самое важное правило"}),t.jsx("p",{className:"theory-intro",children:'Чем больше контекста ты даешь ИИ, тем лучше ответ. Claude может "помнить" 200k токенов (целую книгу!), используй это!'}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"1️⃣ Указывай файлы и папки для работы"}),t.jsx(N,{code:`✅ Хорошо:
"Я использую инструмент Claude Code.
Давай вместе работать с проектом React.
Файлы находятся в src/components/

Основной файл: src/components/Button.jsx
Стили: src/styles/button.css

Сделай Button более доступным (accessibility)"

ИИ может читать файлы и редактировать их прямо!`})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"2️⃣ Давай информацию о структуре проекта"}),t.jsx(N,{code:`✅ Полезно сказать:
"У меня есть структура:
- src/
  - pages/
  - components/
  - utils/
  - styles/
- backend/
  - api.js
  - db.js

Я хочу добавить функцию аутентификации.
Какие файлы нужно изменить?"`})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"3️⃣ Скармливай весь релевантный код"}),t.jsx(N,{code:`✅ Вместо:
"Почему ошибка?"

Напиши:
"У меня есть функция:

\`\`\`python
def calculate_sum(arr):
    total = 0
    for num in arr
        total += num
    return total
\`\`\`

Ошибка: SyntaxError на строке 4. Помоги найти"`}),t.jsx("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:"ИИ видит точную проблему (пропущен двоеточие)!"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Инструкции в формате .md файла (Промпт как файл)"}),t.jsx("p",{className:"theory-intro",children:"Для больших проектов создай файл CLAUDE.md или INSTRUCTIONS.md, который опишет:"}),t.jsx(N,{code:`# Инструкции для ИИ помощника

## О проекте
- Это веб-приложение для планирования задач (React + Node.js)
- Используем ESLint для стиля кода
- Все компоненты должны быть функциональные (Hooks)

## Файловая структура
- src/components/  ← переиспользуемые компоненты
- src/pages/       ← страницы приложения
- src/utils/       ← вспомогательные функции
- backend/api.js   ← API endpoints

## Правила кода
✅ ДЕЛАЙ: Используй React Hooks, типизируй с PropTypes
❌ НЕ ДЕЛАЙ: Class components, глобальные переменные

## Примеры хороших компонентов
[Вставь примеры]

## Как запустить
npm install && npm start`}),t.jsx("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:"Если такой файл есть в проекте, ИИ его найдет и будет следовать правилам!"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Технические указания для точных результатов"}),t.jsx("p",{className:"theory-intro",children:"Чем точнее указания, тем лучше результат."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Ограничения (помогают фокусироваться)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Язык:"}),' "Только Python 3.9+, без numpy"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Размер:"}),' "Функция не более 20 строк"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сложность:"}),' "O(n) временная сложность, максимум"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Стиль:"}),' "В стиле Google, с docstrings"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Зависимости:"}),' "Используй только встроенные модули"']})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Формат ответа (скажи как именно ты хочешь ответ)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Структура:"}),' "Дай сначала объяснение, потом код, потом примеры"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Язык:"}),' "На русском / на английском"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Детальность:"}),' "Краткий ответ / подробный с объяснением каждой строки"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Комментарии:"}),' "Без комментариев / с комментариями на каждом шаге"']})]})]}),t.jsxs(R,{title:"Полный пример хорошего промпта",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Контекст:"}),' "Работаю над веб-приложением на React"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"Задача:"}),' "Напиши компонент Button"']}),t.jsx("p",{children:t.jsx("strong",{children:"Требования:"})}),t.jsx("p",{children:"• Функциональный компонент с Hooks"}),t.jsx("p",{children:"• Props: text, onClick, disabled, variant (primary/secondary)"}),t.jsx("p",{children:"• Использует CSS модули (не inline styles)"}),t.jsx("p",{children:"• Должен быть доступен (accessibility)"}),t.jsxs("p",{children:[t.jsx("strong",{children:"Формат:"}),' "Код + пример использования + PropTypes"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"Ограничение:"}),' "Не более 50 строк, чистый код без лишнего"']})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"GitHub Copilot"}),t.jsx("p",{className:"theory-intro",children:"Расширение в IDE, которое автодополняет код во время печати. Работает как автозаполнение на телефоне, но для кода."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Как это работает"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Смотрит на контекст: названия переменных, функций, импорты"}),t.jsx("li",{className:"theory-list-item",children:"Предлагает код на основе миллионов примеров с GitHub"}),t.jsx("li",{className:"theory-list-item",children:"Работает в VS Code, JetBrains IDE, Neovim"}),t.jsx("li",{className:"theory-list-item",children:"Платно: $10/месяц (но бесплатно для студентов и open-source разработчиков)"})]})]}),t.jsxs(R,{title:"Как писать, чтобы Copilot помог",children:[t.jsx("p",{children:t.jsx("strong",{children:"❌ Плохо:"})}),t.jsx("p",{children:"def f(a, b):"}),t.jsx("p",{children:t.jsx("strong",{children:"✅ Хорошо:"})}),t.jsx("p",{children:"def validate_email_address(email: str) -> bool:"}),t.jsx("p",{children:"    # проверяет что email содержит @"}),t.jsx("p",{style:{marginTop:"8px"},children:"Copilot видит название + комментарий и предложит нужную функцию!"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Claude Code: IDE расширение"}),t.jsx("p",{className:"theory-intro",children:"Самое мощное: Claudeде может читать и редактировать файлы прямо в твоём проекте. Используй это максимально!"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Что он может делать"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:["📖 ",t.jsx("strong",{children:"Читать файлы:"}),' "Покажи мне файл Button.jsx"']}),t.jsxs("li",{className:"theory-list-item",children:["✏️ ",t.jsx("strong",{children:"Редактировать файлы:"})," Автоматически изменяет и сохраняет"]}),t.jsxs("li",{className:"theory-list-item",children:["🔍 ",t.jsx("strong",{children:"Поиск:"}),' "Найди все функции которые проверяют email"']}),t.jsxs("li",{className:"theory-list-item",children:["🔧 ",t.jsx("strong",{children:"Рефакторинг:"}),' "Переведи этот компонент на Hooks"']}),t.jsxs("li",{className:"theory-list-item",children:["🐛 ",t.jsx("strong",{children:"Исправление ошибок:"})," Видит error и исправляет"]}),t.jsxs("li",{className:"theory-list-item",children:["🧪 ",t.jsx("strong",{children:"Написание тестов:"})," Генерирует unit tests"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Как использовать эффективно"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px",lineHeight:"1.8"},children:[t.jsx("li",{children:'Скажи "Показать мне файл [путь]" чтобы ИИ прочитал файл'}),t.jsx("li",{children:'После того как ИИ прочитал контекст, пиши запросы: "Рефакторь этот компонент"'}),t.jsx("li",{children:"ИИ видит ошибки в терминале и может их исправлять автоматически"}),t.jsx("li",{children:"Для больших задач - скажи ИИ про всю структуру папки"})]})]}),t.jsxs(R,{title:"Практический пример",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Ты:"}),` "У меня есть проект React в папке src/. Есть ошибка в консоли: 'Cannot read property of undefined'. Помоги найти и исправить"`]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Claude (через IDE):"})," Откроет файлы, увидит проблему, исправит, сохранит"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Ограничения и опасности ИИ"}),t.jsx("p",{className:"theory-intro",children:"ИИ — мощный инструмент, но не волшебство. Вот о чём надо помнить."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🚫 Галлюцинации"}),t.jsx("p",{className:"theory-intro",children:"Модель может выдумать с полной уверенностью."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:'Факты которых нет ("Это функция была добавлена в Python 3.12")'}),t.jsx("li",{className:"theory-list-item",children:'Несуществующие библиотеки ("Используй numpy_super.array()")'}),t.jsx("li",{className:"theory-list-item",children:"Неправильный код, но написанный очень убедительно"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"})," ВСЕГДА проверяй код перед использованием. Гугли если сомневаешься."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"📅 Знания устаревают"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Claude обучена до определённой даты"}),t.jsx("li",{className:"theory-list-item",children:"О новых версиях библиотек может не знать"}),t.jsx("li",{className:"theory-list-item",children:"Новые API может не знать"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"}),' Скажи ИИ "Это новая версия, вот доки" и скармливай свежую информацию.']})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🧮 Ошибки в точных вычислениях"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Может неправильно считать математику"}),t.jsx("li",{className:"theory-list-item",children:"Путается в больших числах"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"})," Для математики и точных вычислений - проверь вручную или в Python."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎭 Может ошибаться в сложной логике"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Сложные алгоритмы может напереть неправильно"}),t.jsx("li",{className:"theory-list-item",children:"Может забыть edge case в коде"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"}),' Попроси "покажи примеры, включая edge cases" и протестируй.']})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🧠 Контекст конечен (хоть 200k большой)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Если скармливаешь ОЧЕНЬ много текста, может потеря качество"}),t.jsx("li",{className:"theory-list-item",children:"Может забыть начало длинной беседы"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"})," Разбей большие задачи на несколько промптов. Напомни контекст если забыл."]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Этика использования ИИ"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:["✅ ",t.jsx("strong",{children:"ВСЕГДА"})," проверяй код перед использованием в production"]}),t.jsx("li",{className:"theory-list-item",children:"✅ Указывай что ты использовал ИИ (в коде, в документации, в резюме)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Проверяй лицензии и авторские права (не копируй чужой чужой лицензированный код)"}),t.jsx("li",{className:"theory-list-item",children:"✅ ИИ — помощник, а не замена. Ты должен понимать что пишешь"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не полагайся полностью на ИИ для критических систем"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практические советы для разработчика"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"💡 ТОП-5 способов использовать ИИ каждый день"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px",lineHeight:"1.8"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Рефакторинг кода:"}),' "Переделай этот код чтобы он был более читаемым"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Объяснение чужого кода:"}),' "Объясни что делает эта функция пошагово"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Написание тестов:"}),' "Напиши unit tests для этой функции"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Документация:"}),' "Напиши подробный комментарий (docstring) для этой функции"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Отладка:"}),' "Помоги найти баг. Вот ошибка и код" (скармливай error message)']})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎯 Когда НЕ использовать ИИ"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"❌ Для изучения основ (ты должен сам учиться, не копировать ответы)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Для хранения секретной информации (в бесплатных сервисах данные могут видеть)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Для очень специфичного знания про твой проект (ИИ может не знать деталей)"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"ИИ — твой помощник разработчика. Используй его мудро, проверяй результаты, и он сэкономит тебе часы работы!"})})]})}function sf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 13"}),t.jsx("p",{className:"theory-subtitle",children:"Практический проект: визуализация структур данных и алгоритмов"}),t.jsx("p",{className:"theory-date",children:"13 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"📋 Дедлайны и правила"}),t.jsxs("div",{style:{backgroundColor:"rgba(200,255,0,0.05)",padding:"16px",borderRadius:"8px",marginBottom:"24px"},children:[t.jsx("p",{style:{margin:"0 0 12px 0",fontWeight:600},children:"⏰ Когда можешь сдать:"}),t.jsxs("ul",{style:{margin:"0 0 12px 0",paddingLeft:"20px"},children:[t.jsx("li",{children:"✅ Суббота, 13 июня в 21:00"}),t.jsx("li",{children:"✅ Или в любой день в 21:00 в начале лекции"})]}),t.jsx("p",{style:{margin:"0 0 12px 0",fontWeight:600},children:"🎤 Выступление:"}),t.jsxs("ul",{style:{margin:"0 0 12px 0",paddingLeft:"20px"},children:[t.jsx("li",{children:"Время на выступление: 5 минут"}),t.jsx("li",{children:"Показать что реализовал (демонстрация программы)"}),t.jsx("li",{children:"Рассказать какое задание было"}),t.jsx("li",{children:"Объяснить что получилось"}),t.jsx("li",{children:"Рассказать какие трудности были"})]}),t.jsx("p",{style:{margin:"0",color:"var(--text-secondary)",fontSize:"13px"},children:"Дедлайна нет! Можешь сдать когда готово. Главное - показать свою работу и рассказать как её делал."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"🎯 Тебе мог попасться один из 10 вариантов"}),t.jsx("p",{className:"theory-intro",style:{marginBottom:"24px"},children:"Получи вариант в лс в телеграме и реализуй его. Используй Python или другой язык программирования. Допускается использование AI (Copilot, Claude, ChatGPT) для помощи. Код загрузи в GitHub репозиторий."}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 1: Поиск середины списка (slow/fast pointers)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм поиска середины односвязного списка с помощью указателей slow и fast"}),t.jsx("li",{children:"Программа должна пошагово показывать перемещение указателей по списку"}),t.jsx("li",{children:"Графический вывод: консоль с анимацией или выводом каждого шага по нажатию Enter"}),t.jsx("li",{children:"Необходимо реализовать создание списка и визуализацию позиций указателей"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 2: Проверка скобочной последовательности"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм проверки правильности скобочной последовательности с использованием стека"}),t.jsx("li",{children:"Визуально показывать содержимое стека после каждой операции push/pop"}),t.jsx("li",{children:"Графический вывод: браузер (HTML/CSS/JS) или консоль"}),t.jsx("li",{children:"Отображать текущий символ строки и текущее состояние стека на каждом шаге"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 3: Обход графа в ширину (BFS)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм обхода графа в ширину (BFS) с использованием очереди"}),t.jsx("li",{children:"Пошагово показывать добавление и удаление вершин из очереди"}),t.jsx("li",{children:"Графический вывод: браузер с визуализацией графа или библиотека графики"}),t.jsx("li",{children:"На каждом шаге подсвечивать текущую вершину и содержимое очереди"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 4: Обход графа в глубину (DFS)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм обхода графа в глубину (DFS) со стеком или рекурсией"}),t.jsx("li",{children:"Визуально показывать порядок посещения вершин графа"}),t.jsx("li",{children:"Графический вывод: браузер или библиотека для графики"}),t.jsx("li",{children:"На каждом этапе отображать текущую вершину и уже посещённые вершины"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 5: Двусвязный список"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать двусвязный список с операциями вставки и удаления элементов"}),t.jsx("li",{children:"Пошагово показывать изменение связей между узлами списка"}),t.jsx("li",{children:"Графический вывод: консоль или библиотека графики"}),t.jsx("li",{children:"Отображать указатели prev и next для каждого элемента списка"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 6: Удаление дубликатов из списка"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм удаления дубликатов из односвязного списка"}),t.jsx("li",{children:"Пошагово показывать обход списка и удаление повторяющихся элементов"}),t.jsx("li",{children:"Графический вывод: консоль, браузер или библиотека графики"}),t.jsx("li",{children:"На каждом шаге отображать текущий узел, проверяемое значение и итоговое состояние списка"}),t.jsx("li",{children:"Можно реализовать управление шагами через кнопки вперед/назад или автоматический показ через таймер"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 7: Хэш-таблица с разрешением коллизий"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать хэш-таблицу с разрешением коллизий методом цепочек или линейного пробирования"}),t.jsx("li",{children:"Пошагово показывать процесс вставки, поиска и обработки коллизий"}),t.jsx("li",{children:"Графический вывод: браузер или библиотека графики"}),t.jsx("li",{children:"На каждом шаге отображать индекс хэш-таблицы и действия алгоритма"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 8: Бинарное дерево поиска (BST)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать бинарное дерево поиска (BST) с операциями вставки и поиска элементов"}),t.jsx("li",{children:"Визуально показывать прохождение по дереву на каждом шаге алгоритма"}),t.jsx("li",{children:"Графический вывод: библиотека графики или браузер"}),t.jsx("li",{children:"Отображать текущий узел и направление перехода по дереву"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 9: Разворот односвязного списка"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм разворота односвязного списка"}),t.jsx("li",{children:"Пошагово показывать изменение ссылок между элементами списка"}),t.jsx("li",{children:"Графический вывод: консоль с задержкой по времени или браузер"}),t.jsx("li",{children:"На каждом шаге отображать текущий элемент, previous и next"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 10: Алгоритм Дейкстры (кратчайший путь)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм поиска кратчайшего пути в графе (алгоритм Дейкстры)"}),t.jsx("li",{children:"Пошагово показывать обновление расстояний до вершин и выбор текущей вершины"}),t.jsx("li",{children:"Графический вывод: браузер или библиотека графики"}),t.jsx("li",{children:"Отображать таблицу расстояний и подсветку текущих рёбер графа"})]})]})]})]})]})}function nf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 15"}),t.jsx("p",{className:"theory-subtitle",children:"Тайм- и таск-менеджмент"}),t.jsx("p",{className:"theory-date",children:"15 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое таск-менеджмент и зачем он нужен"}),t.jsx("p",{className:"theory-intro",children:"Таск-менеджмент — это система организации и управления задачами, которая помогает человеку или команде достигать целей без потери фокуса. В мире, где количество задач постоянно растёт, умение управлять временем становится ключевым профессиональным навыком."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Проблемы без системы управления задачами"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Задачи теряются или забываются"}),t.jsx("li",{className:"theory-list-item",children:"Непонятно, что делать в первую очередь"}),t.jsx("li",{className:"theory-list-item",children:"Ощущение постоянной перегруженности"}),t.jsx("li",{className:"theory-list-item",children:"Сложно оценить реальный прогресс по проектам"}),t.jsx("li",{className:"theory-list-item",children:"Прокрастинация и откладывание важных дел"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Метод GTD (Getting Things Done)"}),t.jsx("p",{className:"theory-intro",children:"GTD — система управления задачами Дэвида Аллена. Её суть: освободить голову от хранения задач и доверить их надёжной внешней системе. Мозг плохо хранит, но отлично обрабатывает."}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"12px",margin:"20px 0"},children:[{n:"1",t:"Сбор",en:"Capture",d:"Записывай всё во «входящий ящик» (Inbox). Не держи ничего в голове."},{n:"2",t:"Обработка",en:"Clarify",d:"Требует ли элемент действия? Если да — определи конкретный следующий шаг."},{n:"3",t:"Организация",en:"Organize",d:"Распредели по категориям: действия, проекты, ожидания, календарь."},{n:"4",t:"Обзор",en:"Reflect",d:"Еженедельно просматривай все списки и обновляй систему."},{n:"5",t:"Выполнение",en:"Engage",d:"Выбирай задачу по контексту, времени, энергии и приоритету."}].map((e,s)=>t.jsxs("div",{style:{flex:"1 1 150px",minWidth:"150px",background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:"var(--accent-lime)",color:"#0a0a14",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"8px"},children:e.n}),t.jsx("div",{style:{fontWeight:700,color:"var(--text-primary)",fontSize:"14px"},children:e.t}),t.jsx("div",{style:{fontSize:"11px",color:"var(--accent-lime)",marginBottom:"6px"},children:e.en}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)",lineHeight:"1.5"},children:e.d})]},s))}),t.jsx(R,{title:"Ключевое правило GTD (правило 2 минут)",children:t.jsx("p",{children:"Если задача занимает менее 2 минут — сделай её немедленно, не откладывая в систему."})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Техники управления временем"}),t.jsx("p",{className:"theory-intro",children:"Универсального метода нет — разные подходы подходят разным людям. Попробуй каждый и найди свой."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🍅 Техника Pomodoro"}),t.jsx("p",{className:"theory-text",style:{marginBottom:"12px"},children:"Работай 25 минут без прерываний (один «помидор»), затем 5 минут отдыха. После четырёх «помидоров» — длинный перерыв 15–30 минут."}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",alignItems:"center",margin:"12px 0"},children:[{l:"25 мин",w:"работа"},{l:"5",w:"отдых"},{l:"25 мин",w:"работа"},{l:"5",w:"отдых"},{l:"25 мин",w:"работа"},{l:"5",w:"отдых"},{l:"25 мин",w:"работа"},{l:"15-30",w:"длинный отдых"}].map((e,s)=>t.jsxs("div",{style:{flex:e.w==="работа"?"1 1 70px":"0 1 50px",minWidth:e.w==="работа"?"70px":"44px",background:e.w==="работа"?"rgba(200,255,0,0.15)":e.w==="длинный отдых"?"rgba(110,181,255,0.18)":"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:"6px",padding:"8px 6px",textAlign:"center"},children:[t.jsx("div",{style:{fontSize:"12px",fontWeight:700,color:"var(--text-primary)"},children:e.l}),t.jsx("div",{style:{fontSize:"10px",color:"var(--text-tertiary)"},children:e.w})]},s))}),t.jsxs("p",{className:"theory-text",children:[t.jsx("strong",{children:"Для кого:"})," тем, кого легко отвлечь, и тем, кто работает без пауз. Хорошо для монотонных задач — кодирование, тексты, учёба."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🐸 Метод «Съешь лягушку»"}),t.jsxs("p",{className:"theory-text",children:["«Лягушка» — самая неприятная задача дня. Выполняй её первой, пока энергия максимальна. Остаток дня ощущается легче. ",t.jsx("strong",{children:"Для кого:"})," тем, кто откладывает неприятное на конец дня."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🐘 Метод «Съешь слона по частям»"}),t.jsxs("p",{className:"theory-text",children:["Большую задачу разбей на маленькие шаги. «Написать диплом» — это проект, а «написать введение (1500 слов)» — задача. ",t.jsx("strong",{children:"Для кого:"})," тем, кто чувствует паралич перед крупными проектами."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🗓 Метод «Временные блоки» (Time Blocking)"}),t.jsxs("p",{className:"theory-text",children:["Заранее выделяй в календаре блоки под типы задач. Например: 9:00–11:00 — глубокая работа, 11:00–12:00 — встречи, после обеда — рутина. ",t.jsx("strong",{children:"Для кого:"})," тем, кто не чувствует контроля над днём."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"1️⃣3️⃣5️⃣ Метод «1-3-5»"}),t.jsx("p",{className:"theory-text",children:"Каждый день планируй: 1 большую задачу, 3 средних и 5 маленьких. Реалистичный план, который не позволяет перегрузить список."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Личный Канбан"}),t.jsx("p",{className:"theory-intro",children:"Визуальная доска с тремя колонками. Задачи перемещаются слева направо. Ключевое правило: ограничивай количество задач «В процессе» (обычно не более 3) — это борьба с многозадачностью."}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"12px",margin:"20px 0"},children:[{title:"Нужно сделать",color:"var(--text-tertiary)",cards:["📝 Написать функцию","🧪 Добавить тесты","📚 Прочитать главу"]},{title:"В процессе",color:"var(--accent-lime)",limit:"WIP ≤ 3",cards:["🔍 Код-ревью PR","🐛 Чинить баг"]},{title:"Готово",color:"#64c864",cards:["✅ Настроить Git","✅ Залить проект"]}].map((e,s)=>t.jsxs("div",{style:{flex:"1 1 200px",minWidth:"180px",background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:"10px",padding:"12px"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px",paddingBottom:"8px",borderBottom:`2px solid ${e.color}`},children:[t.jsx("span",{style:{fontWeight:700,color:e.color,fontSize:"13px"},children:e.title}),e.limit&&t.jsx("span",{style:{fontSize:"10px",color:"var(--accent-lime)",border:"1px solid var(--accent-lime)",borderRadius:"4px",padding:"1px 5px"},children:e.limit})]}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:e.cards.map((n,r)=>t.jsx("div",{style:{background:"var(--bg-primary)",border:"1px solid var(--border-color)",borderRadius:"6px",padding:"8px",fontSize:"12px",color:"var(--text-secondary)"},children:n},r))})]},s))})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Приоритизация: матрица Эйзенхауэра"}),t.jsx("p",{className:"theory-intro",children:"Делит все задачи на 4 квадранта по двум осям: важность и срочность."}),t.jsxs("div",{style:{margin:"20px 0"},children:[t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto 1fr 1fr",gap:"8px",alignItems:"stretch"},children:[t.jsx("div",{}),t.jsx("div",{style:{textAlign:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",padding:"4px"},children:"СРОЧНО"}),t.jsx("div",{style:{textAlign:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",padding:"4px"},children:"НЕ СРОЧНО"}),t.jsx("div",{style:{display:"flex",alignItems:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",writingMode:"vertical-rl",transform:"rotate(180deg)",justifyContent:"center"},children:"ВАЖНО"}),t.jsxs("div",{style:{background:"rgba(255,95,95,0.15)",border:"1px solid rgba(255,95,95,0.4)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"#ff5f5f",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 1 · Делать"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Кризисы, дедлайны, аварии. Чинить баг в продакшене."})]}),t.jsxs("div",{style:{background:"rgba(110,181,255,0.15)",border:"1px solid rgba(110,181,255,0.4)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"#6eb5ff",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 2 · Планировать"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Развитие, обучение, здоровье. Самый ценный квадрант!"})]}),t.jsx("div",{style:{display:"flex",alignItems:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",writingMode:"vertical-rl",transform:"rotate(180deg)",justifyContent:"center"},children:"НЕ ВАЖНО"}),t.jsxs("div",{style:{background:"rgba(255,159,80,0.15)",border:"1px solid rgba(255,159,80,0.4)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"#ff9f50",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 3 · Делегировать"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Чужие просьбы, часть встреч. Иллюзия занятости."})]}),t.jsxs("div",{style:{background:"rgba(138,138,154,0.12)",border:"1px solid var(--border-color)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"var(--text-tertiary)",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 4 · Исключить"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Соцсети, лишние встречи. Сокращай до минимума."})]})]}),t.jsxs("p",{className:"theory-text",style:{marginTop:"12px"},children:[t.jsx("strong",{children:"Главная мысль:"})," большинство живёт в квадрантах 1 и 3. Перенеси фокус в квадрант 2 — и кризисов станет меньше."]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Другие методы приоритизации"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод MoSCoW"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Must Have"})," — обязательно (без этого проект не работает)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Should Have"})," — важно, но не критично сейчас"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Could Have"})," — хорошо бы при наличии времени"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Won't Have"})," — не делаем сейчас, возможно потом"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод ABC"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"A"})," — серьёзные последствия за невыполнение (делай первыми)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"B"})," — умеренные последствия"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"C"})," — без последствий"]})]}),t.jsx("p",{className:"theory-text",children:"Никогда не берись за B, если не сделаны все A."})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Правило 80/20 (Принцип Парето)"}),t.jsx("p",{className:"theory-text",children:"20% усилий дают 80% результата. Найди те 20% задач, которые приносят наибольший вклад, и фокусируйся на них. Делать не меньше — делать умнее."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Инструменты и приложения"}),t.jsx("p",{className:"theory-intro",children:"Инструмент — это не система. Сначала выбери подход (GTD, канбан, Pomodoro), потом подбери инструмент под него."}),t.jsx(b,{headers:["Инструмент","Для чего","Тип пользователя"],rows:[["Trello","Визуальные доски, канбан","Личное и команды до 10 человек"],["Notion","Всё в одном (задачи, заметки, документы)","Индивидуально и малые команды"],["Jira","Agile, спринты, баг-трекинг","IT-команды"],["Linear","Быстрый трекер задач","Стартапы и продуктовые команды"],["Todoist","Простые личные задачи","Индивидуально"],["TickTick","Задачи + привычки + Pomodoro","Индивидуально"],["Obsidian","Управление знаниями (Markdown)","Разработчики, исследователи"]]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Инструмент следует за системой, а не наоборот. Регулярный обзор — ключ к любой системе. Время — самый ценный ресурс! ⏰"})})]})}function rf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 16"}),t.jsx("p",{className:"theory-subtitle",children:"Языки программирования и фреймворки в 2026 году"}),t.jsx("p",{className:"theory-date",children:"16 июня 2026"})]}),t.jsx("section",{className:"theory-section",children:t.jsx("p",{className:"theory-intro",children:"Технологический ландшафт в 2026 году продолжает меняться. Цель — не выучить всё, а понять, на что ориентироваться при построении карьеры. Ниже обзор по ключевым направлениям."})}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"2.1. Фронтенд"}),t.jsx("p",{className:"theory-intro",children:"Фронтенд — всё, что видит пользователь в браузере. Основа неизменна: HTML, CSS, JavaScript. Всё остальное — инструменты поверх них."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Базовые технологии"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"HTML5"})," — структура страницы, семантическая разметка"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"CSS3"})," — стили, анимации, адаптивный дизайн. Flexbox и Grid — обязательны"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"JavaScript (ES2024+)"})," — логика, взаимодействие, работа с API"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"TypeScript"})," — типизированная надстройка над JS, де-факто стандарт в продакшене"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Фреймворки и библиотеки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"React"})," — самая популярная библиотека (Meta). В 2026 — React 19 с серверными компонентами"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Next.js"})," — фреймворк поверх React (Vercel): SSR, SSG, маршрутизация, API-роуты"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Vue.js"})," — лёгкий вход, Vue 3 с Composition API"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Svelte / SvelteKit"})," — компилируемый фреймворк без рантайм-оверхеда"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Astro"})," — быстрые контентные сайты, Islands Architecture"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Дополнительные инструменты"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Tailwind CSS"})," — утилитарный CSS-фреймворк"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Vite"})," — быстрый сборщик, заменяет Webpack"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Figma"})," — основной инструмент дизайна"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Storybook"})," — разработка и документирование UI-компонентов"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"2.2. Бэкенд"}),t.jsx("p",{className:"theory-intro",children:"Бэкенд — серверная часть: обработка данных, бизнес-логика, базы данных, API. Выбор зависит от задачи, нагрузки и команды."}),t.jsx(b,{headers:["Язык","Фреймворки","Особенности"],rows:[["Python","FastAPI, Django, Flask","Простота, силён рядом с ML/аналитикой"],["Node.js (JS)","Express, NestJS, Hono","JS на клиенте и сервере, real-time приложения"],["Go","Gin, Echo, Fiber","Высоконагруженные системы, микросервисы"],["Java / Kotlin","Spring Boot","Корпоративный бэкенд, энтерпрайз"],["Rust","Actix Web, Axum","Производительность, безопасность памяти"]]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Базы данных"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"PostgreSQL"})," — реляционная БД, стандарт большинства проектов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"MongoDB"})," — документо-ориентированная NoSQL"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Redis"})," — кэш и брокер сообщений в памяти"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"ClickHouse"})," — колоночная БД для аналитики"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"ORM:"})," Prisma, SQLAlchemy, GORM"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"2.3. Аналитика данных"}),t.jsx("p",{className:"theory-intro",children:"Аналитик собирает, обрабатывает, визуализирует и интерпретирует данные. Основной язык — Python, но SQL важен не меньше."}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"pandas"})," — работа с табличными данными"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"NumPy"})," — численные вычисления, матрицы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Matplotlib, Seaborn, Plotly"})," — визуализация"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Jupyter Notebook"})," — интерактивная среда анализа"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"SQL"})," — обязательный инструмент любого аналитика"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BI:"})," Tableau, Power BI, Grafana, Superset, Metabase"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"2.4. Machine Learning"}),t.jsx("p",{className:"theory-intro",children:"ML-инженер и Data Scientist работают на стыке математики, программирования и предметной области. Порог входа высокий, но спрос устойчив."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Базовые библиотеки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"scikit-learn"})," — классические ML-алгоритмы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"XGBoost, LightGBM, CatBoost"})," — градиентный бустинг (лидер на табличных данных)"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Deep Learning и LLM (тренд 2024-2026)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"PyTorch"})," — доминирующий фреймворк для исследований и продакшена"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"TensorFlow / Keras"})," — по-прежнему используется в энтерпрайзе"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LangChain, LlamaIndex"})," — работа с LLM"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Hugging Face Transformers"})," — стандарт для NLP"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ollama"})," — запуск локальных LLM"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"2.5. Кибербезопасность"}),t.jsx("p",{className:"theory-intro",children:"Специалист должен понимать, как работают системы, сети и приложения — и как их взломать, чтобы защитить."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Языки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Python"})," — скрипты, автоматизация, инструменты анализа"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Bash / Shell"})," — работа в Linux"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"C / C++"})," — уязвимости низкого уровня, reverse engineering"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Ключевые инструменты"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Kali Linux / Parrot OS"})," — дистрибутивы для пентеста"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Nmap"})," — сетевое сканирование, ",t.jsx("strong",{children:"Burp Suite"})," — анализ веб-приложений"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Wireshark"})," — анализ трафика, ",t.jsx("strong",{children:"Metasploit"})," — тестирование на проникновение"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"2.6. Универсальные инструменты разработчика"}),t.jsx("p",{className:"theory-intro",children:"Независимо от направления есть инструменты, которые нужны всем."}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Git"})," — система контроля версий (абсолютный стандарт). GitHub / GitLab / Bitbucket, CI/CD"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Командная строка и Linux"})," — большинство серверов на Linux. SSH, bash-скрипты"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Docker"})," — контейнеризация, решает «у меня работает, а на сервере нет». Kubernetes для оркестрации"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Облачные платформы"})," — AWS, Google Cloud, Azure"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"REST API и HTTP"})," — методы, статус-коды, JSON. Postman для тестирования"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"VS Code"})," — самый популярный редактор. JetBrains IDE, Neovim"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"AI-инструменты"})," — GitHub Copilot, Cursor, Claude, ChatGPT"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Рынок труда 2026: что выбрать"}),t.jsx(b,{headers:["Направление","Топ-стек","Спрос"],rows:[["Фронтенд","TypeScript + React/Next.js, Tailwind + Vite","⭐⭐⭐⭐⭐"],["Бэкенд","Python (FastAPI/Django), Node.js (NestJS), Go","⭐⭐⭐⭐⭐"],["Аналитика","Python + SQL, dbt, BI-инструменты","⭐⭐⭐⭐"],["ML/AI","PyTorch + scikit-learn, LangChain, Hugging Face","⭐⭐⭐⭐⭐"],["Кибербезопасность","Python + Linux + Bash","⭐⭐⭐⭐"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как выбрать первый язык"}),t.jsx(R,{title:"Хочешь веб (frontend)",children:t.jsxs("p",{children:["🎯 ",t.jsx("strong",{children:"JavaScript / TypeScript"})," — единственный выбор для браузера"]})}),t.jsx(R,{title:"Хочешь веб (backend)",children:t.jsxs("p",{children:["🎯 ",t.jsx("strong",{children:"Python"})," (просто учиться) или ",t.jsx("strong",{children:"JavaScript/Node.js"})]})}),t.jsx(R,{title:"Хочешь аналитику или ML",children:t.jsxs("p",{children:["🎯 ",t.jsx("strong",{children:"Python + SQL"})," — обязательный минимум"]})})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Не пытайся выучить всё сразу. Выбери одно направление, освой базу, начни применять. Глубина важнее ширины! 🚀"})})]})}function lf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 17"}),t.jsx("p",{className:"theory-subtitle",children:"IT-тренды и влияние ИИ · SQL часть 1"}),t.jsx("p",{className:"theory-date",children:"17 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Топ-тренды 2026"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🤖 Generative AI"}),t.jsx("p",{className:"theory-intro",children:"ИИ генерирует текст, код, изображения. Меняет разработку кардинально."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"AI-ассистенты (Copilot, Claude) в IDE"}),t.jsx("li",{className:"theory-list-item",children:"Автоматизация рутинных задач"}),t.jsx("li",{className:"theory-list-item",children:"Новые профессии (prompt engineers, AI researchers)"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"☁️ Cloud Native & Kubernetes"}),t.jsx("p",{className:"theory-intro",children:"Всё переходит в облако. Kubernetes уже стандарт."})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🔐 Кибербезопасность"}),t.jsx("p",{className:"theory-intro",children:"С ростом данных — растёт спрос на security специалистов."})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"⚡ Edge Computing"}),t.jsx("p",{className:"theory-intro",children:"Обработка данных близко к источнику (IoT, 5G)."})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🌐 Web3 / Blockchain"}),t.jsx("p",{className:"theory-intro",children:"Децентрализованные приложения. Спорный тренд, но есть спрос."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как ИИ меняет разработку"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"❌ Что автоматизируется"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Простой boilerplate код"}),t.jsx("li",{className:"theory-list-item",children:"Документация и комментарии"}),t.jsx("li",{className:"theory-list-item",children:"Тесты"}),t.jsx("li",{className:"theory-list-item",children:"Code review (частично)"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"✅ Что остаётся людям"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Архитектура и дизайн системы"}),t.jsx("li",{className:"theory-list-item",children:"Критическое мышление"}),t.jsx("li",{className:"theory-list-item",children:"Коммуникация с командой"}),t.jsx("li",{className:"theory-list-item",children:"Понимание бизнес-требований"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Перспективы по направлениям"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Frontend"}),t.jsx("p",{className:"theory-intro",children:"Спрос: ⭐⭐⭐⭐ (всегда нужны UI разработчики)"}),t.jsx("p",{className:"theory-text",children:"Изменения: AI для дизайна и вёрстки, но качество — люди"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Backend"}),t.jsx("p",{className:"theory-intro",children:"Спрос: ⭐⭐⭐⭐⭐ (расти с облаком)"}),t.jsx("p",{className:"theory-text",children:"Изменения: Serverless, микросервисы, AI-интеграция"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"ML/AI"}),t.jsx("p",{className:"theory-intro",children:"Спрос: ⭐⭐⭐⭐⭐ (явно растёт)"}),t.jsx("p",{className:"theory-text",children:"Изменения: LLM становятся проще, растёт спрос на инженеров"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"DevOps"}),t.jsx("p",{className:"theory-intro",children:"Спрос: ⭐⭐⭐⭐⭐ (облако требует expertise)"}),t.jsx("p",{className:"theory-text",children:"Изменения: Platform Engineering, eBPF, zero-trust security"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как не отстать"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Учись основам (алгоритмы, архитектура) — они не меняются"}),t.jsx("li",{className:"theory-list-item",children:"Следи за трендами (HackerNews, Reddit r/programming)"}),t.jsx("li",{className:"theory-list-item",children:"Экспериментируй с новыми технологиями"}),t.jsx("li",{className:"theory-list-item",children:"Сфокусируйся на soft skills (communication, problem-solving)"}),t.jsx("li",{className:"theory-list-item",children:"Используй ИИ как инструмент, а не замену себе"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"📊 SQL — часть 1: что такое база данных"}),t.jsx("p",{className:"theory-intro",children:"База данных (БД) — это место, где приложение надёжно хранит данные. Реляционная БД хранит данные в таблицах — как электронные таблицы Excel, со строками и столбцами."}),t.jsxs("p",{className:"theory-text",style:{marginBottom:"4px"},children:["Вот таблица ",t.jsx("strong",{children:"users"})," — каждая строка это один пользователь, каждый столбец — одно свойство:"]}),t.jsx(Se,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"]],caption:"id — уникальный номер строки (первичный ключ)"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"SELECT — выборка данных"}),t.jsxs("p",{className:"theory-intro",children:["SELECT — главная команда SQL. Она говорит: «выбери эти колонки из этой таблицы». ",t.jsx("code",{children:"*"})," означает «все колонки»."]}),t.jsx(N,{language:"sql",code:"SELECT name, age FROM users;"}),t.jsx("p",{className:"theory-text",children:"Берём только колонки name и age из таблицы users:"}),t.jsx(Se,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"]],highlightCols:[1,2],caption:"Подсвеченные колонки — это результат запроса"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"WHERE — фильтрация строк"}),t.jsx("p",{className:"theory-intro",children:"WHERE оставляет только те строки, которые подходят под условие. Остальные отбрасываются."}),t.jsx(N,{language:"sql",code:"SELECT * FROM users WHERE age > 25;"}),t.jsx("p",{className:"theory-text",children:"Останутся только пользователи старше 25 лет:"}),t.jsx(Se,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"]],highlightRows:[1,3],caption:"Подсвечены строки, прошедшие условие age > 25 (Борис и Глеб)"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операторы в WHERE"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сравнение:"})," = , > , < , >= , <= , != "]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"AND / OR:"})," ",t.jsx("code",{children:"WHERE age > 20 AND city = 'Москва'"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"IN:"})," ",t.jsx("code",{children:"WHERE city IN ('Москва', 'Сочи')"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BETWEEN:"})," ",t.jsx("code",{children:"WHERE age BETWEEN 20 AND 30"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LIKE:"})," ",t.jsx("code",{children:"WHERE name LIKE 'А%'"})," — имена на букву «А»"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"ORDER BY — сортировка"}),t.jsx("p",{className:"theory-intro",children:"ORDER BY сортирует результат. ASC — по возрастанию (по умолчанию), DESC — по убыванию."}),t.jsx(N,{language:"sql",code:"SELECT * FROM users ORDER BY age DESC;"}),t.jsx("p",{className:"theory-text",children:"Те же данные, но отсортированы от самого старшего к младшему:"}),t.jsx(Se,{name:"результат",columns:["id","name","age","city"],rows:[["4","Глеб","42","Сочи"],["2","Борис","31","Казань"],["1","Анна","25","Москва"],["3","Вера","19","Москва"]],highlightCols:[2],caption:"Строки переставлены по убыванию возраста"}),t.jsxs("ul",{className:"theory-list",style:{marginTop:"12px"},children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LIMIT"})," — ограничить число строк: ",t.jsx("code",{children:"ORDER BY age DESC LIMIT 3"})," (топ-3 старших)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"DISTINCT"})," — только уникальные значения: ",t.jsx("code",{children:"SELECT DISTINCT city FROM users"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Будущее IT — за теми, кто постоянно учится. А SELECT, WHERE и ORDER BY — твой первый шаг в SQL! 📈"})})]})}function af(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 18"}),t.jsx("p",{className:"theory-subtitle",children:"Тестирование, комментарии и документация · SQL часть 2"}),t.jsx("p",{className:"theory-date",children:"18 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Типы тестов"}),t.jsx(b,{headers:["Тип","Что тестирует","Скорость","Пример"],rows:[["Unit","Одна функция","Быстро","def test_add()"],["Integration","Несколько компонентов","Медленнее","Фронтенд + API"],["E2E","Весь поток пользователя","Очень медленно","Открыть браузер, кликнуть"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Паттерн AAA"}),t.jsx("p",{className:"theory-intro",children:"Arrange → Act → Assert. Структура каждого теста:"}),t.jsx(N,{code:`def test_user_creation():
    # Arrange (подготовка)
    user_data = {"name": "Иван", "age": 17}

    # Act (выполнение)
    user = User(**user_data)

    # Assert (проверка)
    assert user.name == "Иван"
    assert user.age == 17`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"TDD (Test-Driven Development)"}),t.jsx("p",{className:"theory-intro",children:"Красный → Зелёный → Рефакторинг"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Напиши тест (сейчас fails) 🔴"}),t.jsx("li",{children:"Напиши код чтобы тест passed ✅"}),t.jsx("li",{children:"Рефакторь код (тесты всё ещё работают)"}),t.jsx("li",{children:"Повтори"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Документация"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"README"}),t.jsx("p",{className:"theory-intro",children:"Лицо проекта. Должно быть понятно за 30 секунд."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Что это"}),t.jsx("li",{className:"theory-list-item",children:"Как установить"}),t.jsx("li",{className:"theory-list-item",children:"Как использовать"}),t.jsx("li",{className:"theory-list-item",children:"Примеры"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Docstrings (Python)"}),t.jsx(N,{code:`def calculate_average(numbers):
    """
    Вычисляет среднее арифметическое.

    Args:
        numbers (list): Список чисел

    Returns:
        float: Среднее значение

    Raises:
        ValueError: Если список пуст
    """
    if not numbers:
        raise ValueError("Список не может быть пустым")
    return sum(numbers) / len(numbers)`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"JSDoc (JavaScript)"}),t.jsx(N,{code:`/**
 * Сортирует массив
 * @param {number[]} arr - Массив чисел
 * @returns {number[]} Отсортированный массив
 * @throws {Error} Если arr не массив
 */
function sortArray(arr) {
    return arr.sort((a, b) => a - b)
}`,language:"javascript"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Комментарии"}),t.jsxs(R,{title:"Плохо",children:[t.jsx("p",{children:"// Увеличиваем i на 1"}),t.jsx("p",{children:"i++"})]}),t.jsxs(R,{title:"Хорошо",children:[t.jsx("p",{children:"// Пропускаем элементы до первого позитивного отзыва"}),t.jsx("p",{children:"while (reviews[i].rating < 4) i++"})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Правило: комментируй ЧТО и ПОЧЕМУ, а не ЧТО делает код (это очевидно из кода)."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Хорошие привычки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Пиши код для людей, компилятор уже поймёт"}),t.jsx("li",{className:"theory-list-item",children:"✅ Тесты это документация (показывают как использовать)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Код должен быть понятен без комментариев"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не комментируй очевидное"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не оставляй старый код в комментариях (это Git!)"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"📊 SQL — часть 2: агрегатные функции"}),t.jsxs("p",{className:"theory-intro",children:["Агрегатные функции считают что-то по целой группе строк и возвращают одно число. Используем ту же таблицу ",t.jsx("strong",{children:"users"})," из части 1."]}),t.jsx(Se,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"],["5","Дина","28","Казань"]]}),t.jsx(b,{headers:["Функция","Что делает","Пример","Результат"],rows:[["COUNT(*)","Считает строки","SELECT COUNT(*) FROM users","5"],["AVG(age)","Среднее значение","SELECT AVG(age) FROM users","29"],["MAX(age)","Максимум","SELECT MAX(age) FROM users","42"],["MIN(age)","Минимум","SELECT MIN(age) FROM users","19"],["SUM(age)","Сумма","SELECT SUM(age) FROM users","145"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"GROUP BY — группировка"}),t.jsx("p",{className:"theory-intro",children:"GROUP BY собирает строки в группы по одинаковому значению, и агрегатная функция считается для каждой группы отдельно."}),t.jsx(N,{language:"sql",code:`SELECT city, COUNT(*) AS count
FROM users
GROUP BY city;`}),t.jsx("p",{className:"theory-text",children:"Строки сгруппировались по городу, и для каждого посчиталось количество:"}),t.jsx(Se,{name:"результат",columns:["city","count"],rows:[["Москва","2"],["Казань","2"],["Сочи","1"]],highlightCols:[1],caption:"Анна+Вера → Москва (2), Борис+Дина → Казань (2), Глеб → Сочи (1)"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"HAVING — фильтр групп"}),t.jsxs("p",{className:"theory-intro",children:["HAVING фильтрует уже сгруппированные данные. Запомни разницу: ",t.jsx("strong",{children:"WHERE"})," фильтрует строки ДО группировки, ",t.jsx("strong",{children:"HAVING"})," — группы ПОСЛЕ."]}),t.jsx(N,{language:"sql",code:`SELECT city, COUNT(*) AS count
FROM users
GROUP BY city
HAVING COUNT(*) > 1;`}),t.jsx("p",{className:"theory-text",children:"Остались только города, где больше одного пользователя:"}),t.jsx(Se,{name:"результат",columns:["city","count"],rows:[["Москва","2"],["Казань","2"]],highlightRows:[0,1],caption:"Сочи отброшен — там только 1 пользователь"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"INSERT — добавление данных"}),t.jsx(N,{language:"sql",code:`INSERT INTO users (id, name, age, city)
VALUES (6, 'Егор', 35, 'Москва');`}),t.jsx("p",{className:"theory-text",children:"В таблице появилась новая строка:"}),t.jsx(Se,{name:"users",columns:["id","name","age","city"],rows:[["...","...","...","..."],["5","Дина","28","Казань"],["6","Егор","35","Москва"]],highlightRows:[2],caption:"Новая строка добавлена в конец таблицы"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"UPDATE и DELETE"}),t.jsx("p",{className:"theory-intro",children:"UPDATE меняет существующие строки, DELETE удаляет их. Условие WHERE определяет, какие именно строки затронуты."}),t.jsx(N,{language:"sql",code:`-- Изменить город пользователя с id=1
UPDATE users SET city = 'Сочи' WHERE id = 1;

-- Удалить пользователя с id=6
DELETE FROM users WHERE id = 6;`}),t.jsxs(R,{title:"⚠️ Главное правило безопасности",children:[t.jsxs("p",{children:["ВСЕГДА пиши WHERE в UPDATE и DELETE! Без условия команда изменит или удалит ",t.jsx("strong",{children:"ВСЕ"})," строки таблицы."]}),t.jsx("p",{style:{marginTop:"8px",color:"#ff5f5f"},children:"DELETE FROM users; — удалит вообще всех пользователей!"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Качество > количество кода. А GROUP BY и агрегаты превращают тысячи строк в осмысленные цифры! 🎯"})})]})}function of(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 19"}),t.jsx("p",{className:"theory-subtitle",children:"Основы баз данных и SQL · часть 3"}),t.jsx("p",{className:"theory-date",children:"19 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Связи между таблицами"}),t.jsx("p",{className:"theory-intro",children:"В реальных приложениях данные разбиты на несколько таблиц, связанных между собой. Это избавляет от дублирования. Возьмём пользователей и их заказы."}),t.jsx(Se,{name:"users",columns:["id 🔑","name","city"],rows:[["1","Анна","Москва"],["2","Борис","Казань"],["3","Вера","Москва"]],highlightCols:[0],caption:"id — первичный ключ (PRIMARY KEY), уникальный для каждого пользователя"}),t.jsx(Se,{name:"orders",columns:["id 🔑","user_id 🔗","product","price"],rows:[["1","1","Книга","500"],["2","1","Наушники","3000"],["3","2","Мышка","1200"],["4","5","Монитор","15000"]],highlightCols:[1],caption:"user_id — внешний ключ (FOREIGN KEY), ссылается на users.id"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Ключи"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Первичный ключ (PRIMARY KEY)"})," 🔑 — уникальный идентификатор строки. Не повторяется."]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Внешний ключ (FOREIGN KEY)"})," 🔗 — ссылка на первичный ключ другой таблицы. Связывает таблицы."]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"INNER JOIN — соединение таблиц"}),t.jsx("p",{className:"theory-intro",children:"JOIN соединяет строки двух таблиц по условию. INNER JOIN оставляет только те строки, для которых есть совпадение в обеих таблицах."}),t.jsx(N,{language:"sql",code:`SELECT users.name, orders.product, orders.price
FROM users
JOIN orders ON users.id = orders.user_id;`}),t.jsx("p",{className:"theory-text",children:"Каждый заказ дополнился именем пользователя (соединение по id = user_id):"}),t.jsx(Se,{name:"результат",columns:["name","product","price"],rows:[["Анна","Книга","500"],["Анна","Наушники","3000"],["Борис","Мышка","1200"]],highlightRows:[0,1,2],caption:"Заказ с user_id=5 не попал — такого пользователя нет. Вера без заказов — тоже не попала."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"LEFT JOIN — все строки слева"}),t.jsx("p",{className:"theory-intro",children:"LEFT JOIN берёт ВСЕ строки из левой таблицы, даже если справа нет совпадения. Где совпадения нет — будет NULL (пусто)."}),t.jsx(N,{language:"sql",code:`SELECT users.name, orders.product
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`}),t.jsx(Se,{name:"результат",columns:["name","product"],rows:[["Анна","Книга"],["Анна","Наушники"],["Борис","Мышка"],["Вера","NULL"]],highlightRows:[3],caption:"Вера попала в результат, хотя заказов у неё нет — product = NULL"}),t.jsx(b,{headers:["Тип JOIN","Что возвращает"],rows:[["INNER JOIN","Только строки с совпадением в обеих таблицах"],["LEFT JOIN","Все строки из левой таблицы + совпадения справа"],["RIGHT JOIN","Все строки из правой таблицы + совпадения слева"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"JOIN + GROUP BY вместе"}),t.jsx("p",{className:"theory-intro",children:"Самое мощное — соединить таблицы и тут же сгруппировать. Например: сколько потратил каждый пользователь."}),t.jsx(N,{language:"sql",code:`SELECT users.name, SUM(orders.price) AS total
FROM users
JOIN orders ON users.id = orders.user_id
GROUP BY users.name
ORDER BY total DESC;`}),t.jsx(Se,{name:"результат",columns:["name","total"],rows:[["Анна","3500"],["Борис","1200"]],highlightCols:[1],caption:"Анна: 500 + 3000 = 3500. Отсортировано по убыванию суммы."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Нормализация"}),t.jsx("p",{className:"theory-intro",children:"Нормализация — это разбиение данных на таблицы так, чтобы избежать дублирования. Вместо того чтобы в каждом заказе хранить имя и город пользователя, мы храним только user_id и ссылаемся на таблицу users."}),t.jsx(R,{title:"Зачем это нужно",children:t.jsx("p",{children:"Если Анна сменит город, мы поменяем его в ОДНОМ месте — в таблице users. Без нормализации пришлось бы менять город во всех её заказах."})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"SQL vs NoSQL"}),t.jsx(b,{headers:["SQL (реляционные)","NoSQL"],rows:[["Данные в таблицах со схемой","Гибкая структура (документы, ключ-значение)"],["Строгие связи и целостность","Быстрое масштабирование"],["Сложные запросы с JOIN","Простые быстрые запросы"],["PostgreSQL, MySQL, SQLite","MongoDB, Redis"]]}),t.jsxs("p",{className:"theory-text",style:{marginTop:"12px"},children:[t.jsx("strong",{children:"Когда что:"})," SQL — когда данные структурированы и важны связи (банк, магазин). NoSQL — когда нужна гибкость и скорость (кэш, логи, ленты)."]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Итог трёх дней SQL"}),t.jsx(b,{headers:["Часть","Что изучили"],rows:[["Часть 1 (17 июня)","БД, таблицы, SELECT, WHERE, ORDER BY, LIMIT"],["Часть 2 (18 июня)","COUNT/SUM/AVG, GROUP BY, HAVING, INSERT/UPDATE/DELETE"],["Часть 3 (19 июня)","Ключи, INNER/LEFT JOIN, нормализация, SQL vs NoSQL"]]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"SQL — один из самых востребованных навыков. Ты прошёл все основы за три дня. Теперь практикуйся на реальных запросах! 📊"})})]})}function cf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 20"}),t.jsx("p",{className:"theory-subtitle",children:"Сети и REST API"}),t.jsx("p",{className:"theory-date",children:"20 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как работает интернет"}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"DNS:"})," google.com → IP адрес"]}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"HTTP:"})," Запрос-ответ между клиентом и сервером"]}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"TCP/IP:"})," Стандарты передачи данных"]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"HTTP методы"}),t.jsx(b,{headers:["Метод","Описание","Пример"],rows:[["GET","Получить данные","Загрузить страницу"],["POST","Создать данные","Отправить форму"],["PUT","Обновить полностью","Заменить весь объект"],["PATCH","Обновить частично","Изменить одно поле"],["DELETE","Удалить данные","Удалить пост"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"REST API"}),t.jsx("p",{className:"theory-intro",children:"REST = Representational State Transfer. Стандарт для создания API."}),t.jsx(N,{code:`// GET /users - получить всех пользователей
GET /users

// GET /users/123 - получить пользователя 123
GET /users/123

// POST /users - создать нового пользователя
POST /users
Body: {"name": "Иван", "age": 17}

// PUT /users/123 - обновить пользователя 123
PUT /users/123
Body: {"name": "Иван", "age": 18}

// DELETE /users/123 - удалить пользователя 123
DELETE /users/123`})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"HTTP коды ответов"}),t.jsx(b,{headers:["Код","Значение","Когда"],rows:[["200","OK","Запрос успешен"],["201","Created","Ресурс создан"],["400","Bad Request","Неправильные данные"],["401","Unauthorized","Нужна аутентификация"],["403","Forbidden","Доступ запрещён"],["404","Not Found","Ресурс не найден"],["500","Server Error","Ошибка на сервере"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"JSON"}),t.jsx("p",{className:"theory-intro",children:"Формат обмена данными между сервером и клиентом."}),t.jsx(N,{code:`{
  "users": [
    {
      "id": 1,
      "name": "Иван",
      "email": "ivan@example.com",
      "active": true
    },
    {
      "id": 2,
      "name": "Алиса",
      "email": "alice@example.com",
      "active": false
    }
  ]
}`,language:"json"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Аутентификация"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"API Key:"})," Простой ключ в заголовке"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Bearer Token (JWT):"})," Токен с информацией о пользователе"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"OAuth 2.0:"})," Вход через Google/GitHub"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"cURL - тестирование API"}),t.jsx(N,{code:`# GET запрос
curl https://api.example.com/users

# POST с данными
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Иван","age":17}'

# С токеном
curl https://api.example.com/users \\
  -H "Authorization: Bearer token123"`,language:"bash"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"API везде! Это основа веб-разработки! 🌐"})})]})}function df(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 23"}),t.jsx("p",{className:"theory-subtitle",children:"Алгоритмы: сортировки и поиск"}),t.jsx("p",{className:"theory-date",children:"23 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Алгоритмы сортировки"}),t.jsx(b,{headers:["Алгоритм","Big O","Стабильный?","Когда использовать"],rows:[["Bubble Sort","O(n²)","Да","Только для обучения"],["Merge Sort","O(n log n)","Да","Нужна стабильность"],["Quick Sort","O(n log n)","Нет","Обычно быстрее"],["Heap Sort","O(n log n)","Нет","Гарантированно быстро"],["Insertion Sort","O(n²)","Да","Маленькие массивы"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Merge Sort"}),t.jsx(N,{code:`def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    return result + left[i:] + right[j:]`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Quick Sort"}),t.jsx(N,{code:`def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[0]
    left = [x for x in arr[1:] if x < pivot]
    right = [x for x in arr[1:] if x >= pivot]

    return quick_sort(left) + [pivot] + quick_sort(right)`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Бинарный поиск"}),t.jsx(N,{code:`def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # Не найдено`,language:"python"}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"⚠️ Работает только на отсортированном массиве!"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Алгоритм Кадане (Maximum Subarray)"}),t.jsx(N,{code:`def max_subarray(arr):
    max_ending_here = arr[0]
    max_so_far = arr[0]

    for i in range(1, len(arr)):
        max_ending_here = max(arr[i], max_ending_here + arr[i])
        max_so_far = max(max_so_far, max_ending_here)

    return max_so_far

# Пример: [−2,1,−3,4,−1,2,1,−5,4] → 6 (подмассив [4,−1,2,1])`,language:"python"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Сортировка везде! Выучи хорошо! 📊"})})]})}function uf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 24"}),t.jsx("p",{className:"theory-subtitle",children:"Паттерны алгоритмических задач"}),t.jsx("p",{className:"theory-date",children:"24 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Sliding Window"}),t.jsx("p",{className:"theory-intro",children:"Использовать окно для работы с подмассивом"}),t.jsx(N,{code:`def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)

    return max_sum`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Two Pointers"}),t.jsx("p",{className:"theory-intro",children:"Два указателя с противоположных концов"}),t.jsx(N,{code:`def two_sum(arr, target):
    left, right = 0, len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return []`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Fast & Slow Pointers"}),t.jsx("p",{className:"theory-intro",children:"Обнаружение цикла в связном списке"}),t.jsx(N,{code:`def has_cycle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Рекурсия + Мемоизация"}),t.jsx(N,{code:`def fib(n, memo={}):
    if n in memo:
        return memo[n]

    if n <= 1:
        return n

    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как решать задачи на собеседовании"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Поймиляй задачу (спроси примеры)"}),t.jsx("li",{children:"Обсуди подход (не сразу пиши код)"}),t.jsx("li",{children:"Напиши решение (медленно и четко)"}),t.jsx("li",{children:"Тест на примерах"}),t.jsx("li",{children:"Обсуди Big O"}),t.jsx("li",{children:"Спроси можно ли оптимизировать"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Паттерны повторяются! Выучи и побеждай! 🎯"})})]})}function hf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 25"}),t.jsx("p",{className:"theory-subtitle",children:"Кибербезопасность для разработчика"}),t.jsx("p",{className:"theory-date",children:"25 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"OWASP Top 10"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"SQL-инъекции"}),t.jsx("li",{children:"Broken Authentication"}),t.jsx("li",{children:"Sensitive Data Exposure"}),t.jsx("li",{children:"XXE (XML External Entity)"}),t.jsx("li",{children:"Broken Access Control"}),t.jsx("li",{children:"Security Misconfiguration"}),t.jsx("li",{children:"XSS (Cross-Site Scripting)"}),t.jsx("li",{children:"Insecure Deserialization"}),t.jsx("li",{children:"Using Components with Known Vulnerabilities"}),t.jsx("li",{children:"Insufficient Logging & Monitoring"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"SQL-инъекции"}),t.jsx(N,{code:`# ❌ Плохо
username = request.form.get("username")
query = f"SELECT * FROM users WHERE name = '{username}'"

# Если user вводит: ' OR '1'='1
# Запрос: SELECT * FROM users WHERE name = '' OR '1'='1'
# Это вернёт всех пользователей!

# ✅ Хорошо
cursor.execute("SELECT * FROM users WHERE name = ?", (username,))`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"XSS (Cross-Site Scripting)"}),t.jsx(N,{code:`# ❌ Плохо (в JavaScript/React)
<div>{user_input}</div>

# ❌ Плохо (HTML)
<div>{{ user_input }}</div>

# ✅ Хорошо (React автоматом экранирует)
<div>{user_input}</div>  // React экранирует

# ✅ Хорошо (sanitize вручную)
import DOMPurify from 'dompurify'
<div>{DOMPurify.sanitize(user_input)}</div>`,language:"jsx"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Хеширование паролей"}),t.jsx(N,{code:`# ❌ Плохо
password_hash = hashlib.md5(password).hexdigest()

# ✅ Хорошо
import bcrypt
salt = bcrypt.gensalt()
password_hash = bcrypt.hashpw(password.encode(), salt)`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"HTTPS и TLS"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"ВСЕГДА используй HTTPS (не HTTP)"}),t.jsx("li",{className:"theory-list-item",children:"Шифрует данные между браузером и сервером"}),t.jsx("li",{className:"theory-list-item",children:"TLS 1.2+ обязателен"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Правила безопасности"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Валидируй весь пользовательский ввод"}),t.jsx("li",{className:"theory-list-item",children:"✅ Используй параметризованные запросы"}),t.jsx("li",{className:"theory-list-item",children:"✅ Экранируй output"}),t.jsx("li",{className:"theory-list-item",children:"✅ Не логируй пароли"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не храни секреты в коде"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не доверяй клиентским проверкам"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Security — ответственность разработчика! 🔒"})})]})}function mf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 26"}),t.jsx("p",{className:"theory-subtitle",children:"Soft skills: команда, фидбек, рост"}),t.jsx("p",{className:"theory-date",children:"26 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Работа в команде"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Коммуникация:"})," Ясно объясняй проблемы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Слушание:"})," Слушай мнение других"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сотрудничество:"})," Помогай коллегам"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ответственность:"})," Бери на себя задачи"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как давать фидбек (модель SBI)"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Situation:"})," Опиши ситуацию"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Behavior:"})," Что сделал человек"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Impact:"})," Какой был результат"]})]}),t.jsx(N,{code:`// ❌ Плохо
"Твой код плохой"

// ✅ Хорошо
"На код-ревью я заметил, что функция calcPrice()
не обрабатывает null значения. Это привело к ошибке
на продакшене. Давай добавим валидацию в начале функции."`,language:"text"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как просить о помощи"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Rubber duck debugging: объясни проблему игрушечной утке"}),t.jsx("li",{className:"theory-list-item",children:"✅ Google → StackOverflow → коллеги → менеджер"}),t.jsx("li",{className:"theory-list-item",children:"✅ Показывай что уже пробовал"}),t.jsx("li",{className:"theory-list-item",children:"❌ Сразу не звони с вопросом"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Синдром самозванца"}),t.jsx("p",{className:"theory-intro",children:"Чувство что ты не достоин, что все лучше, что вот-вот все поймут что ты фрод."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Это нормально — даже опытные разработчики это чувствуют"}),t.jsx("li",{className:"theory-list-item",children:"✅ Пиши код, получай фидбек, улучшайся"}),t.jsx("li",{className:"theory-list-item",children:"✅ Помни о достижениях, а не только о ошибках"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Профессиональный рост"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Читай чужой код — лучше всего учиться"}),t.jsx("li",{className:"theory-list-item",children:"Делись знаниями (статьи, переговоры, mentoring)"}),t.jsx("li",{className:"theory-list-item",children:"Проси фидбек и совета"}),t.jsx("li",{className:"theory-list-item",children:"Учись на ошибках (своих и чужих)"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Soft skills важны как hard skills! 🤝"})})]})}function ff(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 27"}),t.jsx("p",{className:"theory-subtitle",children:"Как учиться программированию"}),t.jsx("p",{className:"theory-date",children:"27 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Активное vs Пассивное обучение"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"❌ Пассивное: Читать блоги, смотреть видео"}),t.jsx("li",{className:"theory-list-item",children:"✅ Активное: Писать код, делать проекты, объяснять"})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"12px"},children:"Статистика: помнишь 10% прочитанного, 50% услышанного, 90% сделанного!"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Метод Фейнмана"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Выбери концепцию"}),t.jsx("li",{children:"Объясни её простыми словами (как ребёнку)"}),t.jsx("li",{children:"Определи пробелы в понимании"}),t.jsx("li",{children:"Упрости и переделай объяснение"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Ресурсы для обучения"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Обучение:"})," CS50, Roadmap.sh, Udemy"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Практика:"})," LeetCode, Codeforces, HackerRank"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Проекты:"})," GitHub, собственные идеи"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сообщество:"})," Reddit r/learnprogramming, Discord"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как учиться эффективно"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Уделяй 1-2 часа ежедневно, а не 8 часов в выходной"}),t.jsx("li",{className:"theory-list-item",children:"✅ Проектное обучение: делай реальные проекты"}),t.jsx("li",{className:"theory-list-item",children:"✅ Читай чужой код (GitHub, документация)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Объясняй другим (лучший способ учиться)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не зубри синтаксис (Google это за тебя)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не начинай со сложного"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Публичное портфолио"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"GitHub:"})," README, примеры кода, проекты"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LinkedIn:"})," Опыт, навыки, рекомендации"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Личный сайт:"})," Portfolio с примерами работ"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Блог:"})," Статьи о том что учишь"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как ставить цели (OKR)"}),t.jsxs(R,{title:"Пример OKR",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Objective:"})," Научиться веб-разработке"]}),t.jsx("p",{children:t.jsx("strong",{children:"Key Results:"})}),t.jsxs("ul",{style:{marginTop:"8px"},children:[t.jsx("li",{children:"1. Завершить 5 проектов на React"}),t.jsx("li",{children:"2. Сделать 30 задач на LeetCode (medium)"}),t.jsx("li",{children:"3. Прочитать 2 книги по вебу"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Обучение — это путь, не пункт назначения! 📚"})})]})}function pf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 29"}),t.jsx("p",{className:"theory-subtitle",children:"Резюме IT-джуна: пишем первую версию"}),t.jsx("p",{className:"theory-date",children:"29 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Структура резюме"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Контакты:"})," Имя, email, телефон, GitHub, LinkedIn"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Профессиональное резюме (summary):"})," 2-3 предложения кто ты"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Навыки:"})," Язык программирования, фреймворки, инструменты"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Опыт:"})," Стажировки, проекты, волонтёрство"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Образование:"})," Курсы, сертификаты, лагеря"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Проекты:"})," GitHub ссылки на твои лучшие работы"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Советы для джуна"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Будь честен (не приукрашивай опыт)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Покажи что ты можешь (GitHub, проекты)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Сфокусируйся на качестве (5 хороших проектов > 20 так себе)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Напиши о том что ты выучил"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не претендуй на senior роль"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не списывай чужое резюме"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как описывать проекты"}),t.jsx(R,{title:"❌ Плохо",children:t.jsx("p",{children:"«Написал сайт на React»"})}),t.jsx(R,{title:"✅ Хорошо",children:t.jsx("p",{children:"«Разработал образовательную платформу на React + Node.js для управления расписанием лагеря. Реализовал аутентификацию через JWT, интеграцию с API для расписания, динамическое кэширование данных. Развернул на VPS с Nginx. GitHub: [ссылка]»"})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"GitHub как портфолио"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"README для каждого проекта:"})," Что это, как запустить, примеры"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Хороший коммит история:"})," Осмысленные сообщения"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Чистый код:"})," Без мусора, хорошо организован"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Стабильные проекты:"})," Которые хорошо работают"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сопроводительное письмо"}),t.jsx("p",{className:"theory-intro",children:"Не обязательно для джуна, но помогает!"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Привет, я изучаю [технология]"}),t.jsx("li",{children:"Сделал [проект], это показывает [скиллы]"}),t.jsx("li",{children:"Интересуюсь вашей компанией потому что [причина]"}),t.jsx("li",{children:"Хотел бы присоединиться к команде и учиться!"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Поиск первой работы"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"🔍 LinkedIn Jobs, Indeed, HeadHunter"}),t.jsx("li",{className:"theory-list-item",children:"🔍 Job boards: dev.by (Беларусь), habr.career (Россия)"}),t.jsx("li",{className:"theory-list-item",children:"🔍 Компании напрямую (их сайты)"}),t.jsx("li",{className:"theory-list-item",children:"🤝 Сетвуринг: встречайся с разработчиками"}),t.jsx("li",{className:"theory-list-item",children:"💌 Отправляй резюме в компании которые тебе нравятся"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Во время интервью"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Приходи вовремя (за 5 минут)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Задавай вопросы о команде и проектах"}),t.jsx("li",{className:"theory-list-item",children:"✅ Будь честен что не знаешь"}),t.jsx("li",{className:"theory-list-item",children:"✅ Покажи как думаешь при решении задач"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не будь самоуверен"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не говори что тебе всё равно"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Первая работа — начало карьеры! Верь в себя! 💪"})})]})}const Za={1:$m,2:Wm,3:Vm,4:qm,5:Qm,6:Km,7:Ym,8:Jm,9:Xm,10:Zm,11:ef,12:tf,13:sf,15:nf,16:rf,17:lf,18:af,19:of,20:cf,23:df,24:uf,25:hf,26:mf,27:ff,29:pf};function yf(e){const s=Mt.find(n=>n.day===e);return s?s.title:`День ${e}`}function wd({selectedDay:e,onBack:s}){const[n,r]=_.useState(null),[i,l]=_.useState(!0);return _.useEffect(()=>{const a=setTimeout(()=>{Za[e]&&r(()=>Za[e]),l(!1)},300);return()=>clearTimeout(a)},[e]),i?t.jsx("section",{className:"page active",children:t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-secondary)"},children:"Загрузка..."})})}):n?t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"theory-breadcrumbs",children:[t.jsx("button",{className:"breadcrumb-link",onClick:s,children:"📚 Библиотека знаний"}),t.jsx("span",{className:"breadcrumb-sep",children:"/"}),t.jsxs("span",{className:"breadcrumb-current",children:["День ",e," · ",yf(e)]})]}),t.jsx(n,{}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:s,children:"Вернуться в Библиотеку знаний"})})]}):t.jsxs("section",{className:"page active",children:[t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Материалы для этого дня еще готовятся..."})}),t.jsx("button",{className:"btn-back",onClick:s,children:"← Вернуться в Библиотеку"})]})}function xf(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:'Что выведет: print(int("42"))?',options:["42",'"42"',"Ошибка","None"],answer:"42",hint:"int() преобразует строку в целое число"},{id:2,type:"choice",difficulty:"easy",text:"Что выведет: print(7 / 2)?",options:["3","3.5","3.0","2"],answer:"3.5",hint:"Оператор / всегда возвращает float"},{id:3,type:"choice",difficulty:"easy",text:"Что выведет: print(7 // 2)?",options:["3.5","3","4","Ошибка"],answer:"3",hint:"// — целочисленное деление (floor division)"},{id:4,type:"choice",difficulty:"easy",text:"Что выведет: print(7 % 3)?",options:["2","1","4","0"],answer:"1",hint:"% возвращает остаток от деления: 7 = 3*2 + 1"},{id:5,type:"choice",difficulty:"medium",text:"Какой приоритет операций верный? (от высшего к низшему)",options:["1) +, -   2) *, /   3) **","1) **   2) *, /, //, %   3) +, -","1) *   2) +   3) **","1) **   2) +   3) *"],answer:"1) **   2) *, /, //, %   3) +, -",hint:"Возведение в степень выполняется первым"},{id:6,type:"choice",difficulty:"easy",text:'Какие из этих значений считаются "ложными"?',options:["Только False",'0, "", None, [], False',"Только 0","True и 1"],answer:'0, "", None, [], False',hint:"Ложные значения: False, 0, пустая строка, None, пустые коллекции"},{id:7,type:"choice",difficulty:"easy",text:"Чем отличается is от ==?",options:["Нет разницы","== сравнивает значения, is сравнивает идентичность объектов","is быстрее чем ==","is работает только с числами"],answer:"== сравнивает значения, is сравнивает идентичность объектов",hint:"Для None правильно писать: x is None, а не x == None"},{id:8,type:"choice",difficulty:"medium",text:"Что выведет: print(True + True + False)?",options:["TrueTrueFalse","2","1","Ошибка"],answer:"2",hint:"True это 1, False это 0. Значит 1 + 1 + 0 = 2"},{id:9,type:"choice",difficulty:"easy",text:"Какой тип возвращает: print(type(1/1))?",options:["int","float","str","bool"],answer:"float",hint:"Оператор / ВСЕГДА возвращает float, даже 4/2 вернет 2.0"},{id:10,type:"choice",difficulty:"medium",text:"Что выведет: print(-7 // 2)?",options:["-3","-4","-3.5","Ошибка"],answer:"-4",hint:"Floor division округляет вниз: -3.5 округляется в -4"},{id:11,type:"choice",difficulty:"medium",text:"Как правильно сравнить переменную с None?",options:["x == None","x is None","Оба варианта одинаковы","None == x"],answer:"x is None",hint:"is проверяет идентичность объекта. Правильный способ: x is None"},{id:12,type:"choice",difficulty:"medium",text:"Как найти последнюю цифру числа 12345?",options:["12345 / 10","12345 // 10","12345 % 10","12345 - 10"],answer:"12345 % 10",hint:"Остаток от деления на 10 дает последнюю цифру"}]}}function gf(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Что выведет: for i in range(3): print(i)?",options:["0 1 2","1 2 3","0 1 2 3","Ошибка"],answer:"0 1 2",hint:"range(3) генерирует числа от 0 до 2 включительно"},{id:2,type:"choice",difficulty:"easy",text:"Какой результат даст while цикл при number = 0, while number < 3?",options:["Бесконечный цикл","Выполнится 3 раза","Не выполнится вообще","Ошибка"],answer:"Выполнится 3 раза",hint:"while проверяет условие. При number=0,1,2 условие истинно, при 3 - ложно"},{id:3,type:"choice",difficulty:"easy",text:"Что выведет? for i in range(10): if i == 5: break; print(i)",options:["0 1 2 3 4","0 1 2 3 4 5","0 1 2 3 4 5 6 7 8 9","Только 5"],answer:"0 1 2 3 4",hint:"break прерывает цикл. При i==5 цикл сразу прерывается"},{id:4,type:"choice",difficulty:"easy",text:"Что выведет? for i in range(5): if i == 2: continue; print(i)",options:["0 1 2 3 4","0 1 3 4","1 3 4","0 1 3 5"],answer:"0 1 3 4",hint:"continue пропускает текущую итерацию, переходит к следующей"},{id:5,type:"choice",difficulty:"easy",text:"Какой синтаксис правильный для определения функции в Python?",options:["def add(a, b) { return a + b }","def add(a, b): return a + b","function add(a, b) { return a + b }","def add(a, b) -> a + b"],answer:"def add(a, b): return a + b",hint:"В Python: def имя(параметры): тело функции"},{id:6,type:"choice",difficulty:"medium",text:`Что выведет? def greet(name, greeting="Привет"): return f"{greeting}, {name}!"
print(greet("Мария"))`,options:["Привет, Мария!","Привет, Привет!","Ошибка","greeting, Мария!"],answer:"Привет, Мария!",hint:"Параметры по умолчанию используются если аргумент не передан"},{id:7,type:"choice",difficulty:"easy",text:"Что выведет? numbers = [1, 2, 3]; print(numbers[-1])",options:["1","-1","3","Ошибка"],answer:"3",hint:"[-1] обращается к последнему элементу списка"},{id:8,type:"choice",difficulty:"medium",text:"Какой метод удаляет последний элемент из списка?",options:["remove()","pop()","delete()","clear()"],answer:"pop()",hint:"pop() удаляет и возвращает последний элемент"},{id:9,type:"choice",difficulty:"medium",text:"Что выведет? squares = [n ** 2 for n in [1, 2, 3]]; print(squares)",options:["[1, 4, 9]","[1, 2, 3]","[2, 4, 6]","Ошибка"],answer:"[1, 4, 9]",hint:"List comprehension: [выражение for элемент in список]"},{id:10,type:"choice",difficulty:"medium",text:"Что выведет? even = [n for n in [1, 2, 3, 4, 5] if n % 2 == 0]; print(even)",options:["[1, 3, 5]","[2, 4]","[1, 2, 3, 4, 5]","[]"],answer:"[2, 4]",hint:"[выражение for элемент in список if условие] - фильтрует элементы"}]}}function jf(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Сколько операций выполняет O(1) алгоритм на n = 1 000 000?",options:["1 операция","1 млн операций","n операций","log(n) операций"],answer:"1 операция",hint:"O(1) - константная сложность, не зависит от размера входных данных"},{id:2,type:"choice",difficulty:"easy",text:"Какая сложность алгоритма если он делит задачу пополам на каждом шаге?",options:["O(n)","O(n²)","O(log n)","O(2^n)"],answer:"O(log n)",hint:"Бинарный поиск: n → n/2 → n/4 → 1. Глубина = log(n)"},{id:3,type:"choice",difficulty:"easy",text:"Сколько операций в одном цикле: for i in range(n): print(i)?",options:["O(1)","O(n)","O(n²)","O(log n)"],answer:"O(n)",hint:"Один цикл = n итераций = O(n)"},{id:4,type:"choice",difficulty:"easy",text:"Какая сложность двух вложенных циклов: for i in range(n): for j in range(n):?",options:["O(n)","O(2n)","O(n²)","O(n log n)"],answer:"O(n²)",hint:"Два вложенных цикла перемножаются: O(n) * O(n) = O(n²)"},{id:5,type:"choice",difficulty:"medium",text:"Упростите Big O: O(2n)",options:["O(2n)","O(n²)","O(n)","O(log n)"],answer:"O(n)",hint:"Отбрасываем константы: O(2n) = O(n)"},{id:6,type:"choice",difficulty:"medium",text:"Упростите Big O: O(n² + n)",options:["O(n)","O(n²)","O(n³)","O(n + n²)"],answer:"O(n²)",hint:"Оставляем доминирующий член: O(n²) > O(n)"},{id:7,type:"choice",difficulty:"medium",text:"На n = 1 000 000 - Сколько O(n) и O(n²) дают операций:",options:["оба - 1 млн","1 млн и 1 млн","1 млн и 1 триллион","1 млн и 1 млрд"],answer:"1 млн и 1 триллион",hint:"O(n) = 1 млн опер (миллисекунды). O(n²) = 1 трлн опер (часы!)"},{id:8,type:"choice",difficulty:"medium",text:"Какой алгоритм быстрее для поиска в отсортированном массиве?",options:["Линейный поиск O(n)","Бинарный поиск O(log n)","Оба одинаковые","Зависит от размера"],answer:"Бинарный поиск O(log n)",hint:"На n=1млн: линейный ~1млн опер, бинарный ~20 опер. Разница 50000х!"},{id:9,type:"choice",difficulty:"medium",text:"Определите сложность: for i in range(n): for j in range(i): print(i,j)",options:["O(n)","O(n²)","O(n³)","O(log n)"],answer:"O(n²)",hint:"n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)"},{id:10,type:"choice",difficulty:"hard",text:"Какая сложность у рекурсивного Фибоначчи: fib(n) = fib(n-1) + fib(n-2)?",options:["O(n)","O(n log n)","O(2^n)","O(log n)"],answer:"O(2^n)",hint:"Каждый вызов даёт 2 новых вызова. Дерево вызовов = 2^n"},{id:11,type:"choice",difficulty:"hard",text:"Какая сложность у Фибоначчи с мемоизацией (кэшированием)?",options:["O(n)","O(2^n)","O(n²)","O(n!)"],answer:"O(n)",hint:"С мемоизацией каждое число вычисляется один раз = O(n)"},{id:12,type:"choice",difficulty:"hard",text:"Какая операция имеет O(1) сложность?",options:["Поиск в неотсортированном массиве","Доступ к элементу по индексу arr[5]","Сортировка массива","Обход всех элементов"],answer:"Доступ к элементу по индексу arr[5]",hint:"Доступ по индексу, присваивание, поиск в словаре - все O(1)"}]}}function Nf(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Что означает операция A ∧ B (AND)?",options:["Истина если хотя бы одна переменная истина","Истина если обе переменные истины","Инверсия значения переменной","Истина если значения разные"],answer:"Истина если обе переменные истины",hint:"AND (И) требует чтобы ОБЕ переменные были истинны"},{id:2,type:"choice",difficulty:"easy",text:"Что означает операция A ∨ B (OR)?",options:["Истина если обе переменные истины","Истина если хотя бы одна переменная истина","Инверсия значения переменной","Истина если значения разные"],answer:"Истина если хотя бы одна переменная истина",hint:"OR (ИЛИ) требует чтобы ХОТЯ БЫ одна переменная была истинна"},{id:3,type:"choice",difficulty:"easy",text:"Что означает операция ¬A (NOT)?",options:["Истина если обе переменные истины","Истина если хотя бы одна истина","Инверсия (противоположное значение) переменной","Истина если значения разные"],answer:"Инверсия (противоположное значение) переменной",hint:"NOT (НЕ) просто меняет значение: 0→1, 1→0"},{id:4,type:"choice",difficulty:"medium",text:"Первый закон де Моргана: ¬(A ∧ B) =?",options:["A ∨ B","¬A ∨ ¬B","¬A ∧ ¬B","A ∧ B"],answer:"¬A ∨ ¬B",hint:"Отрицание конъюнкции равно дизъюнкции отрицаний"},{id:5,type:"choice",difficulty:"medium",text:"Второй закон де Моргана: ¬(A ∨ B) =?",options:["A ∧ B","¬A ∨ ¬B","¬A ∧ ¬B","A ∨ B"],answer:"¬A ∧ ¬B",hint:"Отрицание дизъюнкции равно конъюнкции отрицаний"},{id:6,type:"choice",difficulty:"easy",text:"Закон исключенного третьего: A ∨ ¬A =?",options:["0 (ложь)","1 (истина)","A","¬A"],answer:"1 (истина)",hint:"Переменная либо истинна, либо ложна - одно из двух всегда верно"},{id:7,type:"choice",difficulty:"easy",text:"Закон противоречия: A ∧ ¬A =?",options:["1 (истина)","0 (ложь)","A","¬A"],answer:"0 (ложь)",hint:"Невозможно чтобы переменная была одновременно истинной И ложной"},{id:8,type:"choice",difficulty:"medium",text:"Таблица истинности для A ∧ B имеет сколько строк истины из 4?",options:["1 строка","2 строки","3 строки","4 строки"],answer:"1 строка",hint:"AND истинен только когда обе переменные истины (1,1) - один случай"},{id:9,type:"choice",difficulty:"medium",text:"Что такое объединение множеств A ∪ B?",options:["Элементы которые есть только в A","Элементы которые есть в обоих множествах","Все элементы которые принадлежат либо A, либо B, либо обоим","Элементы которые есть только в B"],answer:"Все элементы которые принадлежат либо A, либо B, либо обоим",hint:'Объединение "собирает" все элементы из обоих множеств'},{id:10,type:"choice",difficulty:"medium",text:"Что такое пересечение множеств A ∩ B?",options:["Все элементы из обоих множеств","Элементы которые принадлежат одновременно и A, и B","Элементы которые есть только в A","Элементы которые есть только в B"],answer:"Элементы которые принадлежат одновременно и A, и B",hint:'Пересечение находит "общие" элементы двух множеств'},{id:11,type:"choice",difficulty:"medium",text:"A = {1, 2, 3}, B = {3, 4, 5}. Что такое A - B (разность)?",options:["{3, 4, 5}","{1, 2, 3, 4, 5}","{1, 2}","{3}"],answer:"{1, 2}",hint:"Разность A  B - это элементы A которые НЕ принадлежат B"},{id:12,type:"choice",difficulty:"hard",text:"Битовые операции: 5 (0101) & 3 (0011) =?",options:["0001 = 1","0101 = 5","0111 = 7","1111 = 15"],answer:"0001 = 1",hint:"& (AND) - битовое И. Единица только где обе позиции = 1"}]}}function vf(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Что такое граф?",options:["Совокупность вершин и рёбер, где рёбра соединяют пары вершин","Последовательность чисел от 1 до n","Матрица целых чисел","Список чисел в порядке возрастания"],answer:"Совокупность вершин и рёбер, где рёбра соединяют пары вершин",hint:"Граф состоит из вершин (узлов) и рёбер (связей между ними)"},{id:2,type:"choice",difficulty:"easy",text:"Что такое полный граф?",options:["Граф где каждая вершина связана с каждой другой вершиной","Граф где нет циклов","Граф где все вершины на одной линии","Граф с одной вершиной"],answer:"Граф где каждая вершина связана с каждой другой вершиной",hint:"Полный граф обозначается K_n, где n - количество вершин"},{id:3,type:"choice",difficulty:"easy",text:"Что такое ориентированный граф?",options:["Граф где рёбра имеют направление (стрелки)","Граф где рёбра не имеют направления","Граф где все вершины связаны в кольцо","Граф без циклов"],answer:"Граф где рёбра имеют направление (стрелки)",hint:"В ориентированном графе есть направление: A→B ≠ B→A"},{id:4,type:"choice",difficulty:"easy",text:"Что такое неориентированный граф?",options:["Граф где рёбра имеют направление","Граф где рёбра НЕ имеют направления (двусторонние)","Граф только с одной вершиной","Граф с самопетлями"],answer:"Граф где рёбра НЕ имеют направления (двусторонние)",hint:"В неориентированном графе A-B = B-A (одно и то же ребро)"},{id:5,type:"choice",difficulty:"medium",text:"Что такое словарь смежности (adjacency list)?",options:["Словарь где ключ - вершина, значение - список соседних вершин","Список всех вершин графа","Матрица расстояний между вершинами","Список рёбер в порядке возрастания"],answer:"Словарь где ключ - вершина, значение - список соседних вершин",hint:"Пример: {A: [B, C], B: [A, D]} - это словарь смежности"},{id:6,type:"choice",difficulty:"medium",text:"В неориентированном графе матрица смежности должна быть:",options:["Симметричной относительно диагонали (A[i][j] = A[j][i])","Диагональной (ненулевые только на диагонали)","Треугольной (нули над/под диагональю)","Единичной (единицы на диагонали)"],answer:"Симметричной относительно диагонали (A[i][j] = A[j][i])",hint:"Симметрия нужна потому что A-B = B-A в неориентированном графе"},{id:7,type:"input",difficulty:"medium",text:"DFS (в глубину) обход графа: граф = {A: [B, C], B: [D], C: [D], D: []}. Начните с A. Записать последовательность посещения вершин (обходить соседей слева направо)",answer:"ABDC",hint:"DFS: идём вглубь. A→B (первый сосед)→D→(нет соседей, назад)→(B посещён)→C→D (уже посещена). Результат: A,B,D,C"},{id:8,type:"input",difficulty:"medium",text:"DFS обход: граф = {A: [B, C], B: [A, D], C: [A], D: [B]}. Начните с A. Последовательность (слева направо)",answer:"ABDC",hint:"DFS идёт в глубину: A→B→D→(нет новых)→назад→C"},{id:9,type:"input",difficulty:"medium",text:"BFS (в ширину) обход графа: граф = {A: [B, C], B: [D], C: [D], D: []}. Начните с A. Последовательность (обходить слева направо)",answer:"ABCD",hint:"BFS: идём в ширину. Уровень 1: A. Уровень 2: B, C. Уровень 3: D. Результат: A,B,C,D"},{id:10,type:"input",difficulty:"medium",text:"BFS обход: граф = {A: [B, C], B: [A, D], C: [A], D: [B]}. Начните с A. Последовательность",answer:"ABCD",hint:"BFS слой за слоем: A (слой 0)→B,C (слой 1)→D (слой 2)"},{id:11,type:"choice",difficulty:"hard",text:"Есть ли цикл в графе? граф = {A: [B, C], B: [D], C: [D], D: []}",options:["Да, есть цикл A→B→D→A","Да, есть цикл B→D→C→B","Нет цикла","Есть самопетля"],answer:"Нет цикла",hint:"Цикл - это путь который возвращается в исходную вершину. В этом графе нет такого пути"},{id:12,type:"choice",difficulty:"hard",text:"Есть ли цикл в графе? граф = {A: [B], B: [C], C: [A], D: [B]}",options:["Нет цикла","Да, цикл: A→B→C→A","Да, цикл: D→B→C","Нет рёбер"],answer:"Да, цикл: A→B→C→A",hint:"Следите за путем: A→B→C→A - это вернулось в исходную вершину!"}]}}function wf(){return{tasks:[{text:"Какой индекс первого элемента в массиве?",type:"input",answer:"0",hint:"Индексация начинается с нуля",difficulty:"Легко"},{text:"Как получить элемент массива arr по индексу 2?",type:"choice",answer:"arr[2]",options:["arr[2]","arr.get(2)","arr(2)","arr-2"],hint:"Используй квадратные скобки",difficulty:"Легко"},{text:"Какая сложность доступа к элементу в массиве?",type:"choice",answer:"O(1)",options:["O(1)","O(n)","O(log n)","O(n^2)"],hint:"Прямой доступ по индексу это константа",difficulty:"Средне"},{text:"Какая сложность поиска в отсортированном массиве?",type:"choice",answer:"O(log n)",options:["O(log n)","O(n)","O(1)","O(n^2)"],hint:"Можно использовать бинарный поиск",difficulty:"Средне"},{text:"Какая сложность вставки элемента в начало массива?",type:"choice",answer:"O(n)",options:["O(n)","O(1)","O(log n)","O(n log n)"],hint:"Нужно сдвинуть все элементы",difficulty:"Средне"},{text:"Что такое связный список?",type:"choice",answer:"цепочка",options:["цепочка","дерево","граф","таблица"],hint:"Структура где каждый элемент указывает на следующий",difficulty:"Средне"},{text:"Как растет динамический массив при добавлении элемента?",type:"choice",answer:"выделяется новая память и копируются все элементы",options:["выделяется новая память и копируются все элементы","старая память расширяется","новый элемент добавляется в конец без изменений","ничего не происходит"],hint:"Когда массив переполнен, создаётся новый с большим размером",difficulty:"Средне"},{text:"Что такое односвязный список?",type:"choice",answer:"каждый узел имеет указатель только на следующий",options:["каждый узел имеет указатель только на следующий","каждый узел имеет указатели на предыдущий и следующий","это массив","это дерево"],hint:"Односвязный = one direction (одно направление)",difficulty:"Легко"},{text:"Что такое двусвязный список?",type:"choice",answer:"каждый узел имеет указатели на предыдущий и следующий",options:["каждый узел имеет указатель только на следующий","каждый узел имеет указатели на предыдущий и следующий","это граф","это стек"],hint:"Двусвязный = two directions (два направления)",difficulty:"Легко"},{text:"Односвязный список: [1] -> [2] -> [3]. Если current указывает на узел 1, что такое current.next.next?",type:"choice",answer:"узел с значением 3",options:["узел с значением 3","узел с значением 2","null","ошибка"],hint:"current.next это второй узел (2), current.next.next это третий узел (3)",difficulty:"Средне"},{text:"Какая сложность доступа к элементу по индексу? Массив vs Связный список",type:"choice",answer:"Массив O(1), Связный список O(n)",options:["Массив O(1), Связный список O(n)","Массив O(n), Связный список O(1)","Оба O(1)","Оба O(n)"],hint:"Массив знает адрес каждого элемента. Список нужно обходить от начала",difficulty:"Средне"},{text:"Двусвязный список: [1] ↔ [2] ↔ [3]. Если current указывает на узел 2, что такое current.prev?",type:"choice",answer:"узел с значением 1",options:["узел с значением 1","узел с значением 3","null","ошибка"],hint:"current.prev это указатель на предыдущий узел в двусвязном списке",difficulty:"Средне"}]}}function Sf(){return{tasks:[{text:"Что такое LIFO?",type:"choice",answer:"Last In First Out - последний вошедший первый вышедший",options:["Linear Input First Output","Last In First Out - последний вошедший первый вышедший","Load In First Out","List In File Output"],hint:"LIFO это принцип работы стека",difficulty:"Легко"},{text:"Что такое FIFO?",type:"choice",answer:"First In First Out - первый вошедший первый вышедший",options:["Field Information First Output","Final Input First Output","First In First Out - первый вошедший первый вышедший","File In First Out"],hint:"FIFO это принцип работы очереди",difficulty:"Легко"},{text:"Операция push в стеке это...",type:"choice",answer:"добавление элемента на вершину",options:["просмотр верхнего элемента","очистка стека","добавление элемента на вершину","удаление элемента с вершины"],hint:"push добавляет (вталкивает) элемент",difficulty:"Легко"},{text:"Операция pop в стеке это...",type:"choice",answer:"удаление и возврат элемента с вершины",options:["переворот стека","просмотр без удаления","удаление и возврат элемента с вершины","добавление элемента"],hint:"pop извлекает элемент с вершины",difficulty:"Легко"},{text:"Очередь операции: enqueue это добавление, dequeue это удаление. Какая сложность?",type:"choice",answer:"Оба O(1)",options:["enqueue O(n), dequeue O(1)","Оба O(n)","enqueue O(1), dequeue O(n)","Оба O(1)"],hint:"В очереди добавление в конец и удаление из начала обе O(1)",difficulty:"Средне"},{text:'История браузера - вы посещаете сайты 1 → 2 → 3, затем нажимаете "назад" дважды. Какая структура данных это?',type:"choice",answer:"стек (LIFO)",options:["граф","массив","очередь (FIFO)","стек (LIFO)"],hint:'Последний посещённый сайт первым в истории "назад"',difficulty:"Средне"},{text:"Список запросов к серверу от разных пользователей обрабатывается в порядке поступления. Какая структура это?",type:"choice",answer:"очередь (FIFO)",options:["приоритетный массив","дерево","очередь (FIFO)","стек (LIFO)"],hint:"Первый запрос первым обрабатывается - очередь",difficulty:"Средне"},{text:"Операция Undo/Redo при редактировании текста - какая структура?",type:"choice",answer:"стек для Undo, стек для Redo",options:["связный список","очередь для обеих","массив","стек для Undo, стек для Redo"],hint:"Отмена действий в обратном порядке - это LIFO",difficulty:"Средне"},{text:"Какая сложность push и pop операций в стеке?",type:"choice",answer:"Обе O(1)",options:["push O(log n), pop O(n)","Обе O(n)","Обе O(1)","push O(1), pop O(n)"],hint:"Добавление и удаление с вершины - константные операции",difficulty:"Средне"},{text:"Очередь печати (принтер): документы ждут печати в порядке отправки. Какая это очередь?",type:"choice",answer:"FIFO - первый отправленный печатается первым",options:["По размеру файла","Случайный порядок","LIFO - последний отправленный печатается первым","FIFO - первый отправленный печатается первым"],hint:"Справедливо: кто первый в очереди, тот первый печатается",difficulty:"Средне"}]}}function kf(){return{tasks:[{text:"Какая средняя сложность поиска элемента в хеш-таблице?",type:"choice",answer:"O(1)",options:["O(n)","O(log n)","O(1)","O(n^2)"],hint:"Прямой доступ по ключу это константа при отсутствии коллизий",difficulty:"Легко"},{text:"Как может находиться индекс элемента при добавлении в хеш-таблицу?",type:"choice",answer:"применяется хеш-функция к ключу и берется остаток от деления на размер таблицы",options:["просто берется первый свободный индекс","применяется хеш-функция к ключу и берется остаток от деления на размер таблицы","индекс совпадает с самим ключом","индекс выбирается случайно"],hint:"index = hash(key) % table_size",difficulty:"Средне"},{text:"Что происходит когда две разные ключи дают один и тот же хеш?",type:"choice",answer:"коллизия хеширования",options:["программа выдает ошибку","второе значение перезаписывает первое","коллизия хеширования","хеш-таблица игнорирует второе значение"],hint:"Hash collision - это нормальная ситуация которую нужно разрешать",difficulty:"Средне"},{text:"Что такое Chaining (цепочка) для разрешения коллизий?",type:"choice",answer:"каждая ячейка таблицы хранит список всех элементов с одинаковым хешем",options:["поиск следующей свободной ячейки для размещения элемента","каждая ячейка таблицы хранит список всех элементов с одинаковым хешем","удаление предыдущего значения и добавление нового","двойное хеширование для поиска другого индекса"],hint:"Separate chaining - метод цепочек",difficulty:"Средне"},{text:"Что такое Double Hashing (двойное хеширование)?",type:"choice",answer:"при коллизии используется вторая хеш-функция для поиска другой позиции",options:["хеширование ключа два раза подряд","при коллизии используется вторая хеш-функция для поиска другой позиции","использование двух разных хеш-таблиц","хеширование и ключа и значения"],hint:"Open addressing метод - проверяем hash1, hash1+hash2, hash1+2*hash2...",difficulty:"Средне"},{text:"В Python dict - это хеш-таблица?",type:"choice",answer:"да, dict в Python реализован как хеш-таблица",options:["нет, это связный список","зависит от версии Python","да, dict в Python реализован как хеш-таблица","нет, это дерево"],hint:"dict в Python использует хеширование для быстрого доступа",difficulty:"Легко"},{text:"Какая сложность удаления элемента из хеш-таблицы в среднем случае?",type:"choice",answer:"O(1)",options:["O(log n)","O(n)","O(1)","O(n log n)"],hint:"Удаление так же быстро как поиск - нужен хеш ключа",difficulty:"Средне"},{text:"Что произойдет если в хеш-таблице слишком много коллизий?",type:"choice",answer:"сложность операций станет близка к O(n)",options:["все операции сразу станут O(1)","таблица автоматически удалится","сложность операций станет близка к O(n)","коллизии исчезнут сами собой"],hint:"В худшем случае все элементы в одной цепочке - O(n)",difficulty:"Средне"},{text:"Когда нужно увеличить размер хеш-таблицы (rehashing)?",type:"choice",answer:"когда коэффициент загрузки (количество элементов / размер таблицы) превысит порог (обычно 0.75)",options:["когда таблица совсем пустая","когда коэффициент загрузки (количество элементов / размер таблицы) превысит порог (обычно 0.75)","только когда она полностью заполнена","никогда"],hint:"Load factor = size / capacity. При >0.75 обычно увеличиваем размер",difficulty:"Средне"},{text:"В Python как получить значение по ключу из словаря dict и вернуть None если ключа нет?",type:"choice",answer:'dict.get("key")',options:['dict["key"] или None','dict.find("key")','dict.get("key")','dict.search("key")'],hint:"get() метод не выдает KeyError если ключа нет, возвращает None",difficulty:"Средне"}]}}function Ef(){return{tasks:[{text:"Из скольких детей состоит бинарное дерево?",type:"input",answer:"2",hint:"Левый и правый потомок",difficulty:"Легко"},{text:"Как называется элемент в вершине дерева?",type:"choice",answer:"корень",options:["корень","лист","узел","ребро"],hint:"Root - верхний элемент дерева",difficulty:"Легко"},{text:"Какой результат поиска в сбалансированном BST?",type:"choice",answer:"O(log n)",options:["O(log n)","O(n)","O(1)","O(n^2)"],hint:"На каждом шаге исключаем половину элементов",difficulty:"Средне"},{text:"Какой вид обхода дерева существует?",type:"choice",answer:"in-order",options:["in-order","prev-order","all-order","level-order"],hint:"In-order (левый, родитель, правый), pre-order, post-order",difficulty:"Средне"},{text:"Что такое высота дерева?",type:"choice",answer:"путь",options:["путь","сумма","ширина","размер"],hint:"Максимальное расстояние от корня до листа",difficulty:"Средне"},{text:"В чём отличие между BST и обычным бинарным деревом?",type:"choice",answer:"порядок",options:["порядок","размер","высота","глубина"],hint:"BST имеет свойство упорядоченности: левый < родитель < правый",difficulty:"Сложно"}]}}function _f(){return{tasks:[{text:"Что такое Git?",type:"choice",answer:"система контроля версий для отслеживания изменений в коде",options:["язык программирования","система контроля версий для отслеживания изменений в коде","текстовый редактор","база данных"],hint:"Git помогает сохранять историю и работать в команде",difficulty:"Легко"},{text:"Какая команда инициализирует новый репозиторий?",type:"choice",answer:"git init",options:["git start","git init","git create","git new"],hint:"Первая команда когда начинаешь новый проект",difficulty:"Легко"},{text:"Как добавить все изменённые файлы в staging area?",type:"choice",answer:"git add .",options:["git add all","git add .","git stage","git commit all"],hint:"Точка означает все файлы в текущей директории",difficulty:"Легко"},{text:"Какая команда создаёт новый коммит?",type:"choice",answer:'git commit -m "сообщение"',options:["git save",'git commit -m "сообщение"',"git log","git push"],hint:"-m флаг нужен для написания описания",difficulty:"Легко"},{text:"Как создать новую ветку и переключиться на неё одной командой?",type:"choice",answer:"git checkout -b имя-ветки",options:["git branch имя-ветки","git checkout -b имя-ветки","git new-branch","git create-branch"],hint:"-b флаг создаёт ветку и переключается",difficulty:"Средне"},{text:"Какая команда отправляет коммиты на удалённый сервер?",type:"choice",answer:"git push",options:["git send","git push","git upload","git sync"],hint:"Это загруза твоих изменений на GitHub/GitLab",difficulty:"Средне"},{text:"Что такое Pull Request (PR)?",type:"choice",answer:"предложение своих изменений для рассмотрения перед включением в главный код",options:["команда git","способ скачать код","предложение своих изменений для рассмотрения перед включением в главный код","тип файла"],hint:"Это как бы просишь: посмотри мой код, он хороший?",difficulty:"Средне"},{text:"Какая команда показывает историю коммитов?",type:"choice",answer:"git log",options:["git history","git log","git commits","git timeline"],hint:"log отображает все сохранённые коммиты",difficulty:"Средне"},{text:"Какая платформа для хостинга репозиториев самая популярная?",type:"choice",answer:"GitHub",options:["GitLab","GitHub","Bitbucket","Gitea"],hint:"Самая популярная, принадлежит Microsoft",difficulty:"Легко"},{text:"Как скачать обновления с удалённого репозитория?",type:"choice",answer:"git pull",options:["git download","git pull","git fetch all","git sync"],hint:"pull = fetch + merge (скачивает и объединяет)",difficulty:"Средне"}]}}function Tf(){return{tasks:[{text:"Что такое LLM?",type:"choice",answer:"модель",options:["модель","язык","данные","algoritm"],hint:"Large Language Model - это нейросетевая...",difficulty:"Легко"},{text:"Какой самый популярный AI для кодинга?",type:"choice",answer:"copilot",options:["copilot","ChatGPT","Claude","Gemini"],hint:"GitHub Copilot, Claude Code",difficulty:"Легко"},{text:"Что такое промпт инженеринг?",type:"choice",answer:"вопрос",options:["вопрос","код","данные","модель"],hint:"Умение писать хорошие вопросы (prompts) для AI",difficulty:"Средне"},{text:"Можно ли генерировать код с помощью AI?",type:"choice",answer:"да",options:["да","нет","иногда","только простой код"],hint:"AI может писать код, тесты, документацию",difficulty:"Легко"},{text:"Нужно ли проверять код сгенерированный AI?",type:"choice",answer:"да",options:["да","нет","только если длинный","зависит от AI"],hint:"AI может делать ошибки, всегда проверяй код",difficulty:"Средне"},{text:"Что главное при работе с AI в разработке?",type:"choice",answer:"понимание",options:["понимание","скорость","качество","количество"],hint:"Понимай что генерирует AI и почему",difficulty:"Средне"}]}}function Cf(){return{tasks:[{text:"Что такое MVP в проекте?",type:"choice",answer:"минимум",options:["минимум","максимум","средство","версия"],hint:"Minimum Viable Product - самая минимальная версия",difficulty:"Легко"},{text:"Какой первый шаг при разработке проекта?",type:"choice",answer:"план",options:["план","код","тесты","развёртывание"],hint:"Спланируй что ты хочешь сделать",difficulty:"Легко"},{text:"Сколько тестов должно быть в проекте?",type:"choice",answer:"много",options:["много","несколько","один","не нужны"],hint:"Чем больше тестов тем лучше, минимум 50% покрытие",difficulty:"Средне"},{text:"Какие типы тестов существуют?",type:"choice",answer:"unit",options:["unit","integration","e2e","все варианты"],hint:"Unit, integration, e2e тесты",difficulty:"Средне"},{text:"Нужен ли README в проекте?",type:"choice",answer:"да",options:["да","нет","опционально","только для open source"],hint:"README должен описывать проект и как его использовать",difficulty:"Легко"},{text:"Что должно быть в README?",type:"choice",answer:"описание",options:["описание","код","тесты","лицензия"],hint:"Описание, как установить, как запустить, примеры",difficulty:"Средне"}]}}function Of(){return{tasks:[{text:"Сколько минут длится один «помидор» в технике Pomodoro?",type:"input",answer:"25",hint:"Стандартный рабочий интервал",difficulty:"Легко"},{text:"Кто разработал систему GTD (Getting Things Done)?",type:"choice",answer:"дэвид аллен",options:["дэвид аллен","франческо чирилло","брайан трейси","дуайт эйзенхауэр"],hint:"Автор книги Getting Things Done",difficulty:"Средне"},{text:"Сколько шагов в методе GTD?",type:"input",answer:"5",hint:"Сбор, Обработка, Организация, Обзор, Выполнение",difficulty:"Легко"},{text:"По правилу GTD: если задача занимает меньше скольки минут — сделай её сразу?",type:"input",answer:"2",hint:"Правило двух минут",difficulty:"Средне"},{text:"Какой квадрант матрицы Эйзенхауэра самый ценный (важно + не срочно)?",type:"input",answer:"2",hint:"Развитие, обучение, здоровье — именно здесь создаются результаты",difficulty:"Средне"},{text:"По матрице Эйзенхауэра задачи «не важно + срочно» нужно...",type:"choice",answer:"делегировать",options:["делегировать","делать сейчас","планировать","исключить"],hint:"Чужие просьбы создают иллюзию занятости",difficulty:"Средне"},{text:"Как называется метод, где самую неприятную задачу делают первой?",type:"choice",answer:"съешь лягушку",options:["съешь лягушку","съешь слона","pomodoro","time blocking"],hint:"Автор — Брайан Трейси",difficulty:"Легко"},{text:"Сколько максимум задач рекомендуют держать в колонке «В процессе» (WIP-лимит) в личном Канбане?",type:"input",answer:"3",hint:"Борьба с многозадачностью",difficulty:"Средне"},{text:'В методе MoSCoW буква "M" означает задачи, которые...',type:"choice",answer:"обязательно сделать",options:["обязательно сделать","можно сделать потом","хорошо бы сделать","не делаем"],hint:"Must Have — без этого проект не работает",difficulty:"Средне"},{text:"Согласно принципу Парето, какой процент усилий даёт 80% результата?",type:"input",answer:"20",hint:"Правило 80/20",difficulty:"Легко"}]}}function Lf(){return{tasks:[{text:"Какой язык стал де-факто стандартом в продакшене как типизированная надстройка над JavaScript?",type:"choice",answer:"typescript",options:["typescript","coffeescript","dart","python"],hint:"Добавляет типы к JS",difficulty:"Легко"},{text:"Какой фреймворк построен поверх React и добавляет серверный рендеринг (SSR) от компании Vercel?",type:"choice",answer:"next.js",options:["next.js","vue.js","svelte","astro"],hint:"SSR, SSG, маршрутизация из коробки",difficulty:"Средне"},{text:"Какой быстрый сборщик проектов заменяет Webpack в большинстве новых проектов?",type:"choice",answer:"vite",options:["vite","gulp","parcel","rollup"],hint:"Совпадает с итальянским словом «быстро»",difficulty:"Средне"},{text:"Какой Python-фреймворк с автоматической документацией (OpenAPI) стал популярным для REST API?",type:"choice",answer:"fastapi",options:["fastapi","django","flask","tornado"],hint:"Современный, высокопроизводительный",difficulty:"Средне"},{text:"Какой язык от Google создан для высоконагруженных систем и микросервисов?",type:"choice",answer:"go",options:["go","rust","kotlin","ruby"],hint:"Также называется Golang",difficulty:"Легко"},{text:"Какая реляционная БД является стандартом для большинства проектов?",type:"choice",answer:"postgresql",options:["postgresql","mongodb","redis","clickhouse"],hint:"Реляционная, не NoSQL",difficulty:"Средне"},{text:"Какая библиотека Python — основная для работы с табличными данными в аналитике?",type:"choice",answer:"pandas",options:["pandas","numpy","matplotlib","requests"],hint:'Названа в честь "panel data"',difficulty:"Средне"},{text:"Какой Deep Learning фреймворк доминирует для исследований и продакшена в 2026?",type:"choice",answer:"pytorch",options:["pytorch","tensorflow","keras","jax"],hint:"Разработан Meta, гибкий и питоновский",difficulty:"Средне"},{text:"Какой инструмент контейнеризации решает проблему «у меня работает, а на сервере нет»?",type:"choice",answer:"docker",options:["docker","kubernetes","vagrant","ansible"],hint:"Упаковывает приложение со всеми зависимостями",difficulty:"Легко"},{text:"Какая система контроля версий является абсолютным стандартом для командной работы?",type:"choice",answer:"git",options:["git","svn","mercurial","perforce"],hint:"GitHub, GitLab построены вокруг него",difficulty:"Легко"}]}}function Df(){return{tasks:[{text:"Какая SQL-команда выбирает данные из таблицы?",type:"choice",answer:"select",options:["select","get","fetch","find"],hint:"SELECT * FROM users",difficulty:"Легко"},{text:"Какое ключевое слово фильтрует строки по условию?",type:"choice",answer:"where",options:["where","filter","having","if"],hint:"SELECT * FROM users WHERE age > 18",difficulty:"Легко"},{text:"Что выберет запрос: SELECT * FROM users — сколько колонок вернётся, если в таблице 4 колонки?",type:"input",answer:"4",hint:"Звёздочка * означает «все колонки»",difficulty:"Легко"},{text:"Какое ключевое слово сортирует результат?",type:"choice",answer:"order by",options:["order by","sort","group by","arrange"],hint:"ORDER BY age DESC",difficulty:"Средне"},{text:"Что означает DESC в ORDER BY?",type:"choice",answer:"по убыванию",options:["по убыванию","по возрастанию","описание","удалить"],hint:"descending — от большего к меньшему",difficulty:"Средне"},{text:"Какой оператор проверяет вхождение в список: WHERE city ___ ('Москва', 'Сочи')?",type:"choice",answer:"in",options:["in","has","contains","between"],hint:"WHERE city IN (...)",difficulty:"Средне"},{text:"Какой оператор ищет по шаблону, например имена на букву А: WHERE name ___ 'А%'?",type:"choice",answer:"like",options:["like","match","similar","equals"],hint:"LIKE с символом % (любые символы)",difficulty:"Средне"},{text:"Какое ключевое слово оставляет только уникальные значения?",type:"choice",answer:"distinct",options:["distinct","unique","group","only"],hint:"SELECT DISTINCT city FROM users",difficulty:"Средне"},{text:"Какое ключевое слово ограничивает количество строк в результате?",type:"choice",answer:"limit",options:["limit","top","max","count"],hint:"ORDER BY age DESC LIMIT 3 — топ-3",difficulty:"Средне"},{text:"Что означает аббревиатура SQL?",type:"choice",answer:"structured query language",options:["structured query language","simple question logic","system quality level","standard query link"],hint:"Язык структурированных запросов",difficulty:"Легко"}]}}function Af(){return{tasks:[{text:"Какая агрегатная функция считает количество строк?",type:"choice",answer:"count",options:["count","sum","total","number"],hint:"SELECT COUNT(*) FROM users",difficulty:"Легко"},{text:"Какая функция вычисляет среднее значение?",type:"choice",answer:"avg",options:["avg","mean","middle","sum"],hint:"AVG(age) — average",difficulty:"Легко"},{text:"Если возрасты пользователей 25, 31, 19, 42, 28 — что вернёт MAX(age)?",type:"input",answer:"42",hint:"MAX возвращает наибольшее значение",difficulty:"Легко"},{text:"Какое ключевое слово группирует строки по одинаковому значению?",type:"choice",answer:"group by",options:["group by","order by","having","union"],hint:"GROUP BY city — группировка по городу",difficulty:"Средне"},{text:"Чем HAVING отличается от WHERE?",type:"choice",answer:"фильтрует группы",options:["фильтрует группы","фильтрует строки","сортирует","соединяет таблицы"],hint:"WHERE — до группировки (строки), HAVING — после (группы)",difficulty:"Сложно"},{text:"Какая команда добавляет новую строку в таблицу?",type:"choice",answer:"insert",options:["insert","add","create","append"],hint:"INSERT INTO users VALUES (...)",difficulty:"Легко"},{text:"Какая команда изменяет существующие данные?",type:"choice",answer:"update",options:["update","change","modify","set"],hint:"UPDATE users SET city = ... WHERE id = ...",difficulty:"Средне"},{text:"Какая команда удаляет строки из таблицы?",type:"choice",answer:"delete",options:["delete","remove","drop","clear"],hint:"DELETE FROM users WHERE id = 6",difficulty:"Средне"},{text:"Что обязательно нужно писать в UPDATE и DELETE, чтобы не затронуть все строки?",type:"choice",answer:"where",options:["where","limit","having","select"],hint:"Без WHERE команда изменит/удалит ВСЕ строки!",difficulty:"Средне"},{text:"Какая функция вернёт сумму всех значений в колонке?",type:"choice",answer:"sum",options:["sum","count","total","add"],hint:"SUM(price) — сумма цен",difficulty:"Легко"}]}}function Rf(){return{tasks:[{text:"Как называется уникальный идентификатор строки в таблице?",type:"choice",answer:"первичный ключ",options:["первичный ключ","внешний ключ","индекс","хеш"],hint:"PRIMARY KEY — уникален для каждой строки",difficulty:"Легко"},{text:"Как называется поле, которое ссылается на первичный ключ другой таблицы?",type:"choice",answer:"внешний ключ",options:["внешний ключ","первичный ключ","связь","указатель"],hint:"FOREIGN KEY связывает таблицы",difficulty:"Средне"},{text:"Какая команда соединяет две таблицы?",type:"choice",answer:"join",options:["join","merge","connect","union"],hint:"SELECT ... FROM a JOIN b ON ...",difficulty:"Легко"},{text:"Какой JOIN возвращает только строки с совпадением в обеих таблицах?",type:"choice",answer:"inner join",options:["inner join","left join","right join","full join"],hint:"INNER — только пересечение",difficulty:"Средне"},{text:"Какой JOIN вернёт ВСЕ строки из левой таблицы, даже без совпадений справа?",type:"choice",answer:"left join",options:["left join","inner join","right join","cross join"],hint:"LEFT JOIN — все слева + NULL где нет пары",difficulty:"Средне"},{text:"Что окажется в колонке справа при LEFT JOIN, если совпадения нет?",type:"choice",answer:"null",options:["null","0","пустая строка","ошибка"],hint:"Пустое значение — NULL",difficulty:"Средне"},{text:"Как называется разбиение данных на таблицы для устранения дублирования?",type:"choice",answer:"нормализация",options:["нормализация","индексация","агрегация","репликация"],hint:"Чтобы менять данные в одном месте",difficulty:"Сложно"},{text:"Какая из этих баз данных — NoSQL?",type:"choice",answer:"mongodb",options:["mongodb","postgresql","mysql","sqlite"],hint:"Документо-ориентированная БД",difficulty:"Средне"},{text:"Запрос JOIN + GROUP BY + SUM(price) посчитает...",type:"choice",answer:"сумму по каждому пользователю",options:["сумму по каждому пользователю","все заказы","одного пользователя","количество таблиц"],hint:"Соединяем таблицы и группируем по пользователю",difficulty:"Сложно"},{text:"Когда лучше выбрать SQL, а не NoSQL?",type:"choice",answer:"когда важны связи и структура",options:["когда важны связи и структура","когда нужна максимальная гибкость","для кэша","для логов"],hint:"Банк, магазин — структурированные данные со связями",difficulty:"Средне"}]}}function Pf(){return{tasks:[{text:"Что означает API?",type:"choice",answer:"интерфейс",options:["интерфейс","программа","протокол","сервер"],hint:"Application Programming Interface",difficulty:"Легко"},{text:"Что такое REST API?",type:"choice",answer:"http",options:["http","tcp","udp","websocket"],hint:"API основанный на HTTP методах",difficulty:"Легко"},{text:"Сколько основных HTTP методов?",type:"input",answer:"4",hint:"GET, POST, PUT, DELETE",difficulty:"Легко"},{text:"Какой HTTP метод используется для получения данных?",type:"choice",answer:"get",options:["get","post","put","delete"],hint:"GET запрос для получения информации",difficulty:"Легко"},{text:"Какой HTTP метод для создания данных?",type:"choice",answer:"post",options:["post","get","put","delete"],hint:"POST для отправки новых данных",difficulty:"Средне"},{text:"Что такое JSON?",type:"choice",answer:"формат",options:["формат","язык","протокол","сервер"],hint:"JavaScript Object Notation - формат данных",difficulty:"Легко"},{text:"Какой статус код для успешного запроса?",type:"input",answer:"200",hint:"200 OK означает успех, 404 Not Found, 500 Server Error",difficulty:"Средне"}]}}function If(){return{tasks:[{text:"Какая сложность bubble sort?",type:"choice",answer:"O(n^2)",options:["O(n^2)","O(n log n)","O(n)","O(1)"],hint:"Самый медленный алгоритм сортировки",difficulty:"Средне"},{text:"Какая сложность merge sort?",type:"choice",answer:"O(n log n)",options:["O(n log n)","O(n^2)","O(n)","O(log n)"],hint:"Быстрый и стабильный алгоритм",difficulty:"Средне"},{text:"Какая сложность quick sort в среднем?",type:"choice",answer:"O(n log n)",options:["O(n log n)","O(n^2)","O(n)","O(log n)"],hint:"Быстрая сортировка (в среднем случае)",difficulty:"Средне"},{text:"Какой алгоритм сортировки используется в Python?",type:"choice",answer:"timsort",options:["timsort","quicksort","mergesort","heapsort"],hint:"Timsort - комбинация merge и insertion sort",difficulty:"Сложно"},{text:"Какая сложность бинарного поиска?",type:"choice",answer:"O(log n)",options:["O(log n)","O(n)","O(n^2)","O(1)"],hint:"На каждом шаге половины массива исключаются",difficulty:"Средне"},{text:"Сколько операций для 1000 элементов при O(n log n)?",type:"input",answer:"10000",hint:"Примерно 1000 * log2(1000) ≈ 10000",difficulty:"Сложно"}]}}function bf(){return{tasks:[{text:"Что такое sliding window?",type:"choice",answer:"окно",options:["окно","указатель","стек","очередь"],hint:"Техника для работы с подмассивами и подстроками",difficulty:"Средне"},{text:"Что такое two pointers?",type:"choice",answer:"указатель",options:["указатель","окно","стек","дерево"],hint:"Два указателя которые движутся в разных направлениях",difficulty:"Средне"},{text:"Что такое fast and slow pointers?",type:"choice",answer:"черепаха",options:["черепаха","заяц","прыжок","шаг"],hint:"Один быстрый, один медленный - поиск цикла",difficulty:"Средне"},{text:"Что такое рекурсия?",type:"choice",answer:"функция",options:["функция","цикл","алгоритм","метод"],hint:"Функция которая вызывает саму себя",difficulty:"Легко"},{text:"Что такое мемоизация?",type:"choice",answer:"кэш",options:["кэш","память","таблица","список"],hint:"Сохранение результатов чтобы не пересчитывать",difficulty:"Средне"},{text:"Для чего нужна мемоизация?",type:"choice",answer:"скорость",options:["скорость","память","простота","чистота"],hint:"Для оптимизации рекурсивных алгоритмов",difficulty:"Средне"}]}}function Bf(){return{tasks:[{text:"Что такое SQL инъекция?",type:"choice",answer:"атака",options:["атака","запрос","команда","ошибка"],hint:"Атака через введение вредоносного SQL кода",difficulty:"Средне"},{text:"Что такое XSS?",type:"choice",answer:"скрипт",options:["скрипт","запрос","команда","атака"],hint:"Cross-Site Scripting - вставка вредоносного скрипта",difficulty:"Средне"},{text:"Как защитить от SQL инъекций?",type:"choice",answer:"параметры",options:["параметры","фильтры","проверки","логирование"],hint:"Параметризованные запросы или prepared statements",difficulty:"Средне"},{text:"Как защитить от XSS?",type:"choice",answer:"экранировать",options:["экранировать","удалить","заменить","скрыть"],hint:"Экранировать (escape) HTML символы",difficulty:"Средне"},{text:"Какой алгоритм использовать для хеша паролей?",type:"choice",answer:"bcrypt",options:["bcrypt","md5","sha1","sha256"],hint:"bcrypt, argon2 - специальные алгоритмы для паролей",difficulty:"Средне"},{text:"Всегда ли нужен HTTPS?",type:"choice",answer:"да",options:["да","нет","иногда","только для данных"],hint:"Шифрование обязательно в production",difficulty:"Легко"},{text:"Что такое OWASP Top 10?",type:"choice",answer:"уязвимости",options:["уязвимости","угрозы","риски","методы"],hint:"Список 10 самых опасных уязвимостей",difficulty:"Средне"}]}}function zf(){return{tasks:[{text:"Что такое синдром самозванца?",type:"choice",answer:"чувство",options:["чувство","болезнь","ошибка","метод"],hint:"Ощущение что ты не достоин своей позиции",difficulty:"Легко"},{text:"Как давать конструктивный фидбек?",type:"choice",answer:"sbi",options:["sbi","abc","xyz","oop"],hint:"Модель SBI: Situation, Behavior, Impact",difficulty:"Средне"},{text:"Что делать если не понимаешь задачу?",type:"choice",answer:"спросить",options:["спросить","молчать","гадать","начать кодить"],hint:"Спросить (лучше спросить чем молчать)",difficulty:"Легко"},{text:"Как правильно просить о помощи?",type:"choice",answer:"объясни",options:["объясни","просто спроси","жди сам","возьми чужой код"],hint:"Объясни что уже пробовал, показывай прогресс",difficulty:"Средне"},{text:"Почему важны soft skills?",type:"choice",answer:"общение",options:["общение","деньги","известность","успех"],hint:"Для работы в команде и карьерного роста",difficulty:"Легко"},{text:"Что важнее - hard или soft skills?",type:"choice",answer:"оба",options:["оба","hard skills","soft skills","depend"],hint:"Оба одинаково важны для успеха",difficulty:"Средне"}]}}function Ff(){return{tasks:[{text:"Какой процент информации помнишь если читаешь?",type:"input",answer:"10",hint:"Только 10% информации запомнится из прочитанного",difficulty:"Легко"},{text:"Какой процент помнишь если слышишь?",type:"input",answer:"50",hint:"Примерно 50% из услышанного",difficulty:"Легко"},{text:"Какой процент помнишь если делаешь?",type:"input",answer:"90",hint:"90% информации запомнится если ты это сделал",difficulty:"Легко"},{text:"Что такое метод Фейнмана?",type:"choice",answer:"объяснение",options:["объяснение","запись","чтение","слушание"],hint:"Объясни тему простыми словами как ребенку",difficulty:"Средне"},{text:"Какой минимум времени для эффективного обучения?",type:"choice",answer:"1-2",options:["1-2","3-4","5-6","7-8"],hint:"1-2 часа в день лучше чем 8 часов в выходной",difficulty:"Средне"},{text:"Что лучше для обучения - видео или практика?",type:"choice",answer:"практика",options:["практика","видео","чтение","лекции"],hint:"Практика и проекты более эффективны",difficulty:"Средне"},{text:"Как лучше учиться - читать код или писать?",type:"choice",answer:"писать",options:["писать","читать","смотреть","слушать"],hint:"Писать код лучше чем просто читать",difficulty:"Легко"}]}}function Mf(){return{tasks:[{text:"Сколько страниц должно быть в резюме джуна?",type:"input",answer:"1",hint:"Максимум одна страница для начинающего",difficulty:"Легко"},{text:"Что главное в резюме джуна?",type:"choice",answer:"проекты",options:["проекты","образование","сертификаты","опыт"],hint:"Ссылки на GitHub и портфолио проектов",difficulty:"Легко"},{text:"Нужен ли опыт для первой работы?",type:"choice",answer:"нет",options:["нет","да","желательно","обязательно"],hint:"Можно без опыта если есть хорошие проекты",difficulty:"Легко"},{text:"Что важнее - много навыков или глубокие знания?",type:"choice",answer:"глубокие",options:["глубокие","много","широкие","популярные"],hint:"Лучше 3 языка на хорошем уровне чем 10 поверхностно",difficulty:"Средне"},{text:"Нужно ли сопроводительное письмо?",type:"choice",answer:"желательно",options:["желательно","да","нет","опционально"],hint:"Помогает выделиться среди других кандидатов",difficulty:"Легко"},{text:"Как написать хорошее резюме?",type:"choice",answer:"честно",options:["честно","красиво","сложно","оригинально"],hint:"Честно опиши навыки и достижения без приукрас",difficulty:"Средне"},{text:"Что написать если нет работы в резюме?",type:"choice",answer:"проекты",options:["проекты","ничего","выдумать","школа"],hint:"Напиши о личных проектах, волонтёрстве, лагере",difficulty:"Средне"}]}}const Hf={2:xf,3:gf,4:jf,5:Nf,6:vf,7:wf,8:Sf,9:kf,10:Ef,11:_f,12:Tf,13:Cf,15:Of,16:Lf,17:Df,18:Af,19:Rf,20:Pf,23:If,24:bf,25:Bf,26:zf,27:Ff,29:Mf};function Uf({question:e,taskIndex:s,totalTasks:n,onAnswer:r,isSolved:i,savedAnswer:l}){const[a,o]=_.useState(""),[c,u]=_.useState(!1),[f,y]=_.useState(null),[p,x]=_.useState(!1),w=e.type==="choice";_.useEffect(()=>{l&&l.answer?(o(l.answer),l.status&&y({correct:l.status==="correct",message:l.status==="correct"?"Правильно!":"Неправильно"})):(o(""),y(null))},[l,s]);const j=()=>{if(!a.trim()){y({correct:!1,message:"Выберите ответ"});return}x(!0),setTimeout(()=>{const m=a.trim().toLowerCase()===e.answer.toLowerCase();y({correct:m,message:m?"Правильно!":"Неправильно"}),x(!1),r(s,m,a.trim())},300)},L=()=>{o(""),y(null),u(!1)},h=l&&l.status,d={color:f!=null&&f.correct?"#00ff00":"#ff3333",fontSize:"13px",fontWeight:600,marginTop:"8px",minHeight:"20px"};return t.jsxs("div",{className:"question-card",children:[t.jsxs("div",{className:"question-header",children:[t.jsxs("span",{className:"question-number",children:["Задача ",s+1," из ",n]}),t.jsx("span",{className:"question-difficulty",children:e.difficulty})]}),t.jsx("p",{className:"question-text",children:e.text}),w?t.jsx("div",{className:"question-options",children:e.options.map((m,g)=>t.jsxs("label",{className:`question-option ${h&&(f!=null&&f.correct)&&m===a?"answered":""}`,children:[t.jsx("input",{type:"radio",name:`question-${s}`,value:m,checked:a===m,onChange:S=>o(S.target.value),disabled:p}),t.jsx("span",{className:"option-text",children:m})]},g))}):t.jsx("div",{className:"question-input-group",children:t.jsx("input",{type:"text",value:a,onChange:m=>o(m.target.value),placeholder:"Введите ваш ответ...",disabled:p,className:`question-input ${h&&(f!=null&&f.correct)?"answered":""}`,onKeyPress:m=>m.key==="Enter"&&j()})}),t.jsxs("div",{className:"question-actions",children:[t.jsxs("div",{className:"question-actions-left",children:[t.jsx("button",{onClick:()=>u(!c),className:"btn-hint",disabled:p,children:c?"Скрыть подсказку":"Подсказка"}),t.jsx("button",{onClick:L,className:"btn-clear",disabled:p,children:h?"Переделать":"Очистить"})]}),t.jsx("button",{onClick:j,className:`btn-check ${p?"checking":""}`,disabled:p||h&&(f==null?void 0:f.correct),children:p?"⟳":h&&(f!=null&&f.correct)?"✓ Решено":"Проверить"})]}),c&&t.jsxs("div",{className:"question-hint",children:[t.jsx("strong",{children:"Подсказка:"})," ",e.hint]}),f&&t.jsx("div",{style:d,children:f.message})]})}function Gf({totalTasks:e,taskStatuses:s,currentIndex:n,onSelectTask:r}){return t.jsx("div",{className:"task-indicators",children:Array.from({length:e}).map((i,l)=>{const a=s[l],c=`task-indicator ${a==="correct"?"correct":""} ${a==="incorrect"?"incorrect":""} ${l===n?"active":""}`;return t.jsx("button",{className:c,title:`Задача ${l+1}`,onClick:()=>r(l),children:l+1},l)})})}function Sd({selectedDay:e,onBack:s}){const[n,r]=_.useState([]),[i,l]=_.useState({}),[a,o]=_.useState({}),[c,u]=_.useState(0),[f,y]=_.useState(!0),[p,x]=_.useState(!1);_.useEffect(()=>{const g=setTimeout(()=>{const S=Hf[e];if(S){const E=S();r(E.tasks||[]);const k=localStorage.getItem("taskStatuses"),O=k?JSON.parse(k):{},F=`day${e}`;l(O[F]||{});const D=localStorage.getItem("taskAnswers"),X=D?JSON.parse(D):{};o(X[F]||{})}u(0),y(!1)},300);return()=>clearTimeout(g)},[e]);const w=(g,S,E)=>{const k={...i,[g]:S?"correct":"incorrect"};l(k);const O=localStorage.getItem("taskStatuses"),F=O?JSON.parse(O):{};F[`day${e}`]=k,localStorage.setItem("taskStatuses",JSON.stringify(F));const D=localStorage.getItem("taskAnswers"),X=D?JSON.parse(D):{};X[`day${e}`]||(X[`day${e}`]={}),X[`day${e}`][g]={answer:E,status:S?"correct":"incorrect"},localStorage.setItem("taskAnswers",JSON.stringify(X))},j=g=>{const S=Math.max(0,Math.min(g,n.length-1));if(S===c)return;const E=localStorage.getItem("taskAnswers"),k=E?JSON.parse(E):{},O=`day${e}`,F=k[O]||{};o(F),x(!0),setTimeout(()=>{u(S),x(!1)},200)},L=()=>{j(c-1)},h=()=>{j(c+1)};function d(g){const S=Mt.find(E=>E.day===g);return S?S.title:`День ${g}`}if(f)return t.jsx("section",{className:"page active",children:t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-secondary)"},children:"Загрузка..."})})});if(!n.length)return t.jsxs("section",{className:"page active",children:[t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Задач для этого дня нет или они еще готовятся..."})}),t.jsx("button",{className:"btn-back",onClick:s,children:"← Вернуться в Библиотеку"})]});const m=n[c];return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"theory-breadcrumbs",children:[t.jsx("button",{className:"breadcrumb-link",onClick:s,children:"📚 Библиотека знаний"}),t.jsx("span",{className:"breadcrumb-sep",children:"/"}),t.jsxs("span",{className:"breadcrumb-current",children:["День ",e," · ",d(e)]})]}),t.jsxs("div",{className:"questions-container",children:[t.jsxs("div",{className:"questions-header",children:[t.jsx("h2",{className:"questions-title",children:"Задачи для тренировки"}),t.jsx(Gf,{totalTasks:n.length,taskStatuses:i,currentIndex:c,onSelectTask:j})]}),t.jsxs("div",{className:"single-question-view",children:[t.jsx("div",{className:`question-card-wrapper ${p?"switching":""}`,children:t.jsx(Uf,{question:m,taskIndex:c,totalTasks:n.length,onAnswer:w,isSolved:i[c],savedAnswer:a[c]},`${e}-${c}`)}),t.jsxs("div",{className:"question-navigation",children:[t.jsx("button",{className:"nav-btn nav-prev",onClick:L,disabled:c===0,children:"← Предыдущая"}),t.jsxs("span",{className:"nav-counter",children:[c+1," из ",n.length]}),t.jsx("button",{className:"nav-btn nav-next",onClick:h,disabled:c===n.length-1,children:"Следующая →"})]})]})]}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:s,children:"Вернуться в Библиотеку знаний"})})]})}const eo={1:{title:"Дневник лагеря и инструменты",tasks:[{num:1,title:"Завести дневник лагеря",description:`Вы можете выбрать любой удобный для вас формат:
• На бумаге в тетради
• В Google Таблице
• В Notion
• В любом другом удобном вам формате

В дневнике вы сможете:
• Дублировать ссылки на материалы дня
• Добавлять ссылки на домашние задания
• Сохранять решения домашних заданий
• Писать свои мысли и заметки

Дневник станет вашим личным хранилищем и конспектом на время обучения в лагере и после`},{num:2,title:"Скачать Visual Studio Code",description:`Это текстовый редактор для написания кода, который мы будем использовать на занятиях.

Если у вас возникнут проблемы со скачиванием или установкой, обратитесь в беседе группы в Telegram — мы поможем!

Добро пожаловать в KIRO IT SUMMER CAMP 2026! 🚀`}]},2:{title:"Типы данных, арифметика и условия",tasks:[{num:1,title:"Сумма двух чисел",description:"Считайте два целых числа с клавиатуры и выведите их сумму."},{num:2,title:"Площадь прямоугольника",description:"Считайте ширину и высоту прямоугольника (целые числа). Выведите его площадь."},{num:3,title:"Часы и минуты",description:"Дано количество минут (целое число). Выведите, сколько это полных часов и остаток минут."},{num:4,title:"Четность числа",description:"Считайте целое число. Выведите «Чётное», если число делится на 2, иначе — «Нечётное»."},{num:5,title:"Знак числа",description:"Считайте вещественное число. Определите его знак: выведите «Положительное», «Отрицательное» или «Ноль»."},{num:6,title:"Наибольшее из трёх",description:"Считайте три целых числа. Выведите наибольшее из них. Не используйте встроенную функцию max()."},{num:7,title:"Деление с обработкой",description:"Считайте два числа a и b. Если b равно нулю — выведите «Деление на ноль невозможно», иначе выведите результат деления a на b с двумя знаками после запятой."},{num:8,title:"Високосный год",description:"Считайте год. Год является високосным, если делится на 4, но не делится на 100, или делится на 400. Выведите «Високосный» или «Обычный»."},{num:9,title:"Калькулятор",description:"Считайте два числа и символ операции (+, -, *, /). Выполните соответствующую операцию и выведите результат. Обработайте деление на ноль и неизвестную операцию."},{num:10,title:"Оценка по баллам",description:"Считайте балл от 0 до 100. Выведите оценку: 90–100 → «A», 80–89 → «B», 70–79 → «C», 60–69 → «D», 0–59 → «F». Если балл вне диапазона — выведите «Ошибка»."},{num:11,title:"Проверка диапазона",description:"Считайте три числа: a, b и x. Определите, попадает ли x в закрытый отрезок [a, b]. Выведите «Внутри» или «Снаружи». Гарантируется, что a ≤ b."},{num:12,title:"Расчет абонентской платы",description:"Абонент платит 300 руб/мес за 100 минут. Каждая дополнительная минута стоит 3 руб. Считайте количество минут, выведите итоговую стоимость."},{num:13,title:"Количество цифр",description:"Считайте положительное целое число. Выведите, сколько в нём цифр: однозначное (1–9), двузначное (10–99), трёхзначное (100–999) или «больше трех знаков»."},{num:14,title:"Расчет ИМТ",description:"Считайте рост (м) и вес (кг). Вычислите ИМТ = вес / рост². Выведите значение с 1 знаком и категорию: < 18.5 — «Недостаток веса», 18.5–24.9 — «Норма», 25–29.9 — «Избыточный вес», ≥ 30 — «Ожирение»."},{num:15,title:"Проверка треугольника",description:"Считайте три стороны треугольника. Сначала проверьте, можно ли из них построить треугольник (сумма двух сторон > третьей). Если нет — выведите «Не треугольник». Иначе — «Равносторонний», «Равнобедренный» или «Разносторонний»."},{num:16,title:"Квадратное уравнение",description:"Считайте коэффициенты a, b, c квадратного уравнения ax² + bx + c = 0. Если a == 0, уравнение линейное — обработайте отдельно. Иначе найдите дискриминант. Выведите корни (2 корня / 1 корень / нет корней)."},{num:17,title:"Проверка даты",description:"Считайте день, месяц и год. Проверьте корректность даты: месяц 1–12, день 1–(кол-во дней в месяце), учитывая високосный год для февраля. Выведите «Корректная» или «Некорректная»."},{num:18,title:"Перевод в другую систему",description:"Считайте неотрицательное целое число и основание системы счисления (2, 8 или 16). Выведите число в этой системе. Не используйте встроенные bin(), oct(), hex()."},{num:19,title:"Выдача сдачи",description:"Покупатель дает купюру номиналом 50, 100, 200, 500 или 1000 руб. за товар стоимостью price (целое, < номинала). Посчитайте сдачу и выразите её минимальным количеством купюр/монет: 100, 50, 10, 5, 2, 1 руб."},{num:20,title:"Цифровой корень",description:"Цифровой корень числа — сумма его цифр, применяемая повторно до получения однозначного числа. Считайте натуральное число и выведите его цифровой корень, не используя рекурсию и циклы — только арифметику и условные операторы."},{num:21,title:"Кубическое уравнение",description:"С клавиатуры вводятся числа a, b, c и d. Нужно вывести корни уравнения третьей степени ax³ + bx² + cx + d = 0. Учитывайте в решении, что a, b, c и d могут быть и нулем."}]},3:{title:"Циклы и функции",tasks:[{num:1,title:"Сумма в диапазоне",description:"Напишите функцию, которая вычисляет сумму всех чисел от start до end включительно, используя цикл. Не используйте встроенную функцию sum()."},{num:2,title:"Палиндром",description:"Проверьте, является ли число палиндромом (читается одинаково в обе стороны). Используйте цикл, а не преобразование в строку."},{num:3,title:"Количество делителей",description:"Найдите количество делителей числа n (не считая самого числа). Например, делители 12: 1, 2, 3, 4, 6."},{num:4,title:"Степень двойки",description:"Напишите функцию, которая проверяет, является ли число степенью двойки (2⁰=1, 2¹=2, 2²=4, и т.д.). Без циклов и встроенных функций вроде log."},{num:5,title:"НОД (алгоритм Евклида)",description:"Найдите НОД двух чисел без встроенной функции. Используйте рекурсию или алгоритм Евклида."},{num:6,title:"Факториал",description:"Напишите функцию для вычисления факториала n. Обработайте граничные случаи (0! = 1). Используйте рекурсию."},{num:7,title:"Второй максимум",description:"Найдите второе по величине число в списке. Гарантируется, что в списке минимум 2 различных элемента."},{num:8,title:"Пересечение массивов",description:"Найдите все элементы, которые есть в обоих массивах (пересечение). Результат должен содержать уникальные элементы."}]},4:{title:"Big O анализ сложности",tasks:[{num:1,title:"Сумма элементов массива",description:`def sum_array(arr):
    total = 0
    for num in arr:
        total += num
    return total
# Определите Big O`},{num:2,title:"Проверка всех пар",description:`def has_pair_sum(arr, target):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] + arr[j] == target:
                return True
    return False
# Определите Big O`},{num:3,title:"Быстрое возведение в степень",description:`def power(x, n):
    if n == 0: return 1
    if n % 2 == 0:
        half = power(x, n // 2)
        return half * half
    else:
        return x * power(x, n - 1)
# Определите Big O`},{num:4,title:"Максимум в матрице",description:`def find_max_matrix(matrix):
    max_val = matrix[0][0]
    for row in matrix:
        for val in row:
            if val > max_val:
                max_val = val
    return max_val
# Определите Big O`},{num:5,title:"Сортировка выбором",description:`def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
# Определите Big O`},{num:6,title:"Поиск дубликата",description:`def has_duplicate_naive(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False
# Определите Big O (есть способ O(n)!)`},{num:7,title:"Фибоначчи рекурсивно",description:`def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
# Это ОЧЕНЬ медленно!
# Определите Big O`},{num:8,title:"Фибоначчи с запоминанием (динамическое программирование)",description:`def fib_memo(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
# Это намного быстрее
# Определите Big O`}]},6:{title:"Дискретная математика: графы и алгоритмы",tasks:[{num:1,title:"Граф как словарь (Adjacency List)",description:`Реализуй граф используя словарь (самый популярный способ):

# Неориентированный граф
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

# Ориентированный граф
directed = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
}

Напиши функции:
def add_edge(graph, u, v):
    # Добавь ребро между u и v
    pass

def remove_edge(graph, u, v):
    # Удали ребро
    pass

def get_neighbors(graph, node):
    # Верни всех соседей узла
    pass

Плюсы: быстро, простой доступ, экономит память на разреженных графах
Минусы: медленный поиск ребра`},{num:2,title:"Граф как матрица смежности (Adjacency Matrix)",description:`Реализуй граф используя 2D массив:

# Матрица смежности для 4 узлов
#     0 1 2 3
# 0 [[0,1,1,0],
# 1  [1,0,0,1],
# 2  [1,0,0,1],
# 3  [0,1,1,0]]

class Graph:
    def __init__(self, num_nodes):
        self.num_nodes = num_nodes
        self.matrix = [[0] * num_nodes for _ in range(num_nodes)]

    def add_edge(self, u, v):
        # Добавь ребро между u и v
        self.matrix[u][v] = 1
        self.matrix[v][u] = 1  # для неориентированного

    def remove_edge(self, u, v):
        # Удали ребро
        pass

    def has_edge(self, u, v):
        # Проверь есть ли ребро
        pass

Плюсы: быстрый поиск ребра O(1), удобно для плотных графов
Минусы: требует O(n²) памяти даже для пустого графа`},{num:3,title:"Обход в ширину (BFS - Breadth-First Search)",description:`Обойди граф уровень за уровнем (как волны в воде):

def bfs(graph, start):
    # Верни список посещённых узлов в порядке BFS
    from collections import deque

    visited = set()
    queue = deque([start])
    result = []

    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            result.append(node)
            # Добавь всех соседей в очередь
            pass

    return result

Пример:
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': [],
    'F': []
}
bfs(graph, 'A') → ['A', 'B', 'C', 'D', 'E', 'F']

Сложность: O(V + E) где V - вершины, E - рёбра
Используется для: поиск кратчайшего пути, уровневый обход`},{num:4,title:"Обход в глубину (DFS - Depth-First Search)",description:`Обойди граф глубоко в каждую ветку:

# Итеративный способ со стеком
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    result = []

    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            result.append(node)
            # Добавь соседей в стек
            pass

    return result

# Рекурсивный способ
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    result = [node]

    for neighbor in graph[node]:
        if neighbor not in visited:
            # Рекурсивный вызов
            pass

    return result

Пример:
dfs_iterative(graph, 'A') → ['A', 'C', 'F', 'B', 'E', 'D']

Сложность: O(V + E)
Используется для: поиск связных компонент, топологическая сортировка, обнаружение цикла`},{num:5,title:"Поиск кратчайшего пути (Shortest Path)",description:`Найди кратчайший путь между двумя узлами:

def shortest_path(graph, start, end):
    # Используй BFS чтобы найти кратчайший путь
    # Верни список узлов от start до end
    from collections import deque

    visited = {start}
    queue = deque([(start, [start])])

    while queue:
        node, path = queue.popleft()
        if node == end:
            return path

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                # Добавь в очередь новый путь
                pass

    return None  # Пути нет

Пример:
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': ['E'],
    'E': []
}
shortest_path(graph, 'A', 'E') → ['A', 'B', 'D', 'E'] или ['A', 'C', 'D', 'E']

Сложность: O(V + E)
Почему BFS? Потому что обходит по уровням и найдёт кратчайший путь первым`},{num:6,title:"Обнаружение цикла в графе",description:`Определи, есть ли цикл в графе:

def has_cycle(graph):
    # Для ориентированного графа используй DFS с раскраской
    # Белый (0) - не посещён
    # Серый (1) - сейчас посещаем
    # Чёрный (2) - полностью обработан

    color = {node: 0 for node in graph}

    def dfs(node):
        if color[node] == 1:  # Нашли серый - цикл!
            return True
        if color[node] == 2:  # Уже полностью обработан
            return False

        color[node] = 1  # Становится серым
        for neighbor in graph.get(node, []):
            if dfs(neighbor):
                return True
        color[node] = 2  # Становится чёрным
        return False

    for node in graph:
        if color[node] == 0:
            if dfs(node):
                return True
    return False

Примеры:
Граф БЕЗ цикла: A→B→C (это дерево)
Граф С циклом: A→B→C→A`},{num:7,title:"Поиск связных компонент",description:`Найди все отдельные компоненты в графе:

def find_components(graph):
    # Верни список списков, где каждый внутренний - компонента
    visited = set()
    components = []

    def dfs(node, component):
        visited.add(node)
        component.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor, component)

    for node in graph:
        if node not in visited:
            component = []
            dfs(node, component)
            components.append(component)

    return components

Пример:
graph = {
    'A': ['B'],
    'B': ['A'],
    'C': ['D'],
    'D': ['C'],
    'E': []
}
find_components(graph) → [['A','B'], ['C','D'], ['E']]

Используется для: проверка связности, социальные сети (группы друзей)`},{num:8,title:"Топологическая сортировка (для DAG)",description:`Отсортируй узлы так чтобы для каждого ребра u→v узел u был раньше v:

def topological_sort(graph):
    # Работает только для ориентированного графа БЕЗ циклов (DAG)
    visited = set()
    stack = []

    def dfs(node):
        visited.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor)
        stack.append(node)  # Добавляем ПОСЛЕ рекурсии

    for node in graph:
        if node not in visited:
            dfs(node)

    return stack[::-1]  # Переворачиваем

Пример (зависимости между курсами):
graph = {
    'Основы': ['Python', 'Git'],
    'Python': ['Django'],
    'Git': [],
    'Django': []
}
topological_sort(graph) → ['Основы', 'Python', 'Django', 'Git']

Используется для: расписание задач, зависимости пакетов, порядок выполнения работ`},{num:9,title:"Проверка двудольности графа (Bipartite)",description:`Определи, можно ли раскрасить узлы в 2 цвета так чтобы соседи имели разные цвета:

def is_bipartite(graph):
    # Используй BFS с раскраской в 2 цвета
    from collections import deque

    color = {}

    for start in graph:
        if start in color:
            continue

        queue = deque([start])
        color[start] = 0

        while queue:
            node = queue.popleft()
            for neighbor in graph.get(node, []):
                if neighbor not in color:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False  # Сосед имеет тот же цвет = не двудольный

    return True

Примеры:
Двудольный: A-B-C (можно раскрасить: красный-синий-красный)
НЕ двудольный: A-B, B-C, C-A (треугольник, нельзя раскрасить в 2 цвета)

Используется для: проверка шахматной доски, паросочетания, проверка графика`},{num:10,title:"Проверка эйлерова пути/цикла",description:`Определи, можно ли пройти по графу посетив каждое ребро ровно один раз:

def has_euler_path(graph, num_vertices):
    # Условия существования эйлерова пути:
    # 1. Граф должен быть связный
    # 2. Все вершины должны иметь чётную степень (цикл)
    #    ИЛИ ровно 2 вершины нечётной степени (путь)

    # Посчитай степень каждой вершины
    degree = {}
    for node in graph:
        degree[node] = len(graph.get(node, []))

    odd_degree_count = sum(1 for d in degree.values() if d % 2 == 1)

    if odd_degree_count == 0:
        return "Эйлеров ЦИКЛ"  # Можно начать с любой
    elif odd_degree_count == 2:
        return "Эйлеров ПУТЬ"   # Начни с нечётной степени
    else:
        return "Пути нет"

Пример (мост Кёнигсберга):
Есть 4 острова, соединённые 7 мостами.
Вопрос: можно ли пройти по каждому мосту ровно один раз?
Ответ: НЕТ, потому что более 2 вершин имеют нечётную степень

Используется для: маршруты почтальона, уборка улиц, печать схем без повтора`}]},7:{title:"Структуры данных: динамические массивы и связные списки",tasks:[{num:1,title:"Реализация динамического массива (DynamicArray)",description:`Реализуй простой динамический массив с методами:

class DynamicArray:
    def __init__(self, capacity=10):
        self.arr = [None] * capacity
        self.size = 0
        self.capacity = capacity

    def append(self, value):
        # Добавь элемент в конец
        # Если массив полный - увеличь его вдвое
        pass

    def insert(self, index, value):
        # Вставь элемент на позицию index
        # Сдвинь остальные элементы вправо
        pass

    def remove(self, index):
        # Удали элемент на позиции index
        # Сдвинь остальные влево
        pass

    def get(self, index):
        # Верни элемент по индексу
        pass

Тест:
arr = DynamicArray()
arr.append(1)
arr.append(2)
arr.insert(0, 0)  # [0, 1, 2]
arr.remove(1)     # [0, 2]`},{num:2,title:"Реализация односвязного списка (LinkedList)",description:`Реализуй односвязный список с нодами:

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        # Добавь элемент в конец списка
        pass

    def insert_at_head(self, data):
        # Вставь в начало
        pass

    def remove(self, data):
        # Удали первый элемент с значением data
        pass

    def search(self, data):
        # Найди элемент, верни True/False
        pass

    def display(self):
        # Выведи все элементы: 1 -> 2 -> 3 -> None
        pass

Тест:
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.insert_at_head(0)
ll.display()  # 0 -> 1 -> 2 -> None`},{num:3,title:"Реализация двусвязного списка (DoublyLinkedList)",description:`Реализуй двусвязный список (может ходить туда-сюда):

class DNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        # Добавь в конец, обновляя prev
        pass

    def insert_at_head(self, data):
        # Вставь в начало
        pass

    def remove(self, data):
        # Удали элемент
        # Обнови both prev и next
        pass

    def reverse_display(self):
        # Выведи список в обратном порядке
        # Начиная с конца
        pass

Почему двусвязный нужен?
- Быстрое удаление если есть ссылка на ноду
- Движение в обе стороны
- Итератор на обратный проход`},{num:4,title:"Реверс односвязного списка",description:`Реализуй функцию разворота связного списка:

def reverse_linked_list(head):
    # Входной параметр: head линкованного списка
    # Выходной параметр: head развернутого списка
    # Не используй доп. структуры данных!
    pass

Пример:
Было: 1 -> 2 -> 3 -> None
Стало: 3 -> 2 -> 1 -> None

Алгоритм (3 указателя):
prev = None
current = head
while current:
    next = current.next
    current.next = prev
    prev = current
    current = next`},{num:5,title:"Поиск середины списка",description:`Найди элемент в середине односвязного списка:

def find_middle(head):
    # Верни ноду которая находится в середине
    # Если два элемента в конце - верни второй
    pass

Пример:
1 -> 2 -> 3 -> 4 -> 5 -> None
Ответ: Node(3)

Подсказка: используй two pointers технику!
(она же Алгоритм Заяц-Черепаха / Метод быстрого и медленного указателей)
- slow указатель: шагает на 1
- fast указатель: шагает на 2
Когда fast достигнет конца - slow будет в середине`},{num:6,title:"Обнаружение цикла в списке",description:`Определи, есть ли цикл в связном списке:

def has_cycle(head):
    # Верни True если есть цикл, False иначе
    pass

Пример с циклом:
1 -> 2 -> 3 -> 4
          ^    |
          |____|  (4 указывает на 3)

Алгоритм: Floyd's Cycle Detection (следует погуглить)
- slow: шагает на 1
- fast: шагает на 2
- Если fast поймает slow = есть цикл
- Если fast достигнет None = нет цикла`},{num:7,title:"Слияние двух отсортированных списков",description:`Слей два отсортированных связных списка в один:

def merge_sorted_lists(head1, head2):
    # head1: 1 -> 3 -> 5 -> None
    # head2: 2 -> 4 -> 6 -> None
    # Результат: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> None
    pass

Алгоритм:
- Два указателя: current1 и current2
- Сравниваешь элементы
- Меньший добавляешь в результат
- Сдвигаешь тот указатель
- В конце добавляешь остаток

Сложность: O(n + m), где n и m - длины списков`},{num:8,title:"Удаление N-го элемента с конца",description:`Удали N-й элемент считая с конца (без пересчета длины!):

def remove_nth_from_end(head, n):
    # Удали N-й элемент с конца
    # Верни новый head
    pass

Пример:
1 -> 2 -> 3 -> 4 -> 5, n=2
Результат: 1 -> 2 -> 3 -> 5

Подсказка: two pointers с gap!
- first указатель на n позиций впереди
- second и first идут вместе
- Когда first достигнет конца - second перед элементом к удалению`},{num:9,title:"Проверка палиндрома в списке",description:`Проверь, является ли связный список палиндромом:

def is_palindrome(head):
    # Верни True если список читается одинаково в обе стороны
    pass

Пример:
1 -> 2 -> 3 -> 2 -> 1 -> None  ✅ True
1 -> 2 -> 3 -> None             ❌ False

Алгоритм (без разворота всего списка):
1. Найди середину (two pointers)
2. Разверни вторую половину
3. Сравни первую половину со второй в обратном порядке

Сложность: O(n) время, O(1) память`},{num:10,title:"Сортировка списка (Merge Sort)",description:`Отсортируй связный список используя merge sort:

def sort_linked_list(head):
    # Верни отсортированный head
    # Используй divide & conquer
    pass

Алгоритм:
1. Раздели список пополам (find_middle)
2. Рекурсивно отсортируй обе половины
3. Слей две половины (merge_sorted_lists)

Пример:
4 -> 2 -> 1 -> 3 -> None
Результат: 1 -> 2 -> 3 -> 4 -> None

Сложность: O(n log n) - как обычный merge sort
Преимущество: работает с памятью O(log n) для рекурсии (не O(n))`}]},5:{title:"Булева алгебра и множества",tasks:[{num:1,title:"Упростить выражение",description:`Упростить выражение, используя законы де Моргана:
¬(A ∧ B) ∨ (A ∨ B)`},{num:2,title:"Упростить выражение",description:`Упростить:
¬(A ∨ B) ∧ (A ∨ B)`},{num:3,title:"Таблица истинности",description:`Построить таблицу истинности для выражения:
(A ∧ B) ∨ ¬C`},{num:4,title:"Операции над множествами",description:`Заданы множества A = {2, 4, 6, 8}, B = {4, 8, 12, 16}. Найти:
a) A ∪ B
b) A ∩ B
c) A \\ B`},{num:5,title:"Битовые операции",description:`Вычислить результат битовых операций для A = 6 (0110) и B = 5 (0101)
a) A AND B
b) A OR B
c) A XOR B`},{num:6,title:"Практическая задача",description:`В магазине товар покупают, если (цена низкая ИЛИ хороший рейтинг) И (наличие на складе).
Будет ли товар куплен, если цена высокая, рейтинг 4.8, товар есть?`}]},8:{title:"Стеки и очереди",tasks:[{num:1,title:"Реализация стека (LIFO)",description:`Реализуй стек с методами push, pop и peek.

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        # Добавь элемент в стек
        pass

    def pop(self):
        # Удали и верни верхний элемент
        # Верни None если стек пуст
        pass

    def peek(self):
        # Посмотри верхний элемент без удаления
        pass

    def is_empty(self):
        pass

Тест:
stack = Stack()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.pop())  # 3
print(stack.peek()) # 2`},{num:2,title:"Реализация очереди (FIFO)",description:`Реализуй очередь с методами enqueue, dequeue и peek.

class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        # Добавь элемент в конец очереди
        pass

    def dequeue(self):
        # Удали и верни первый элемент
        # Верни None если очередь пуста
        pass

    def peek(self):
        # Посмотри первый элемент без удаления
        pass

    def is_empty(self):
        pass

Тест:
queue = Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
print(queue.dequeue())  # 1
print(queue.peek())     # 2`},{num:3,title:"Проверка правильной скобочной последовательности",description:`Реализуй функцию, которая проверяет, правильно ли расставлены круглые скобки.

def is_valid_parentheses(s):
    # Возврати True если скобки правильные, False иначе
    # Используй стек!
    pass

Примеры:
"()" → True
"(())" → True
"())" → False
"(((" → False
"(()())" → True`},{num:4,title:"Проверка скобок трех типов: (), {}, []",description:`Расширь предыдущую функцию - проверяй скобки трех типов одновременно.

def is_valid_brackets(s):
    # Проверь (), {}, [] одновременно
    # Они должны быть правильно вложены
    pass

Примеры:
"()[]{}" → True
"({[]})" → True
"({[}))" → False (неправильный порядок)
"{[}]" → False (перекрываются)`},{num:5,title:"Найти минимальное количество удалений",description:`Найди минимальное количество символов, которые нужно удалить, чтобы получить правильную скобочную последовательность.

def min_deletions(s):
    # Верни минимальное число удалений
    pass

Примеры:
"())" → 1 (удали последнюю )
"(((" → 3 (удали все)
"(())" → 0 (уже правильная)
"))(" → 3 (удали все)`},{num:6,title:"Проверка корректности кода (вложенные скобки)",description:`Напиши функцию, которая проверяет, что в коде все скобки правильно открыты и закрыты.
Учитывай также, что строки в кавычках не считаются.

def is_valid_code(code):
    # Проверь баланс (), {}, [] в коде
    # Игнорируй строки в кавычках: "..." или '...'
    pass

Примеры:
'print("hello")' → True
'if x > 0: { print("ok") }' → True
'arr = [1, 2, 3' → False
'string = "test ) bracket"' → True (скобка в строке не считается)`},{num:7,title:"Реверс строки используя стек",description:`Реализуй функцию, которая разворачивает строку, используя стек.

def reverse_string(s):
    # Используй стек для разворота
    # Верни развернутую строку
    pass

Примеры:
"hello" → "olleh"
"12345" → "54321"
"a" → "a"`}]},9:{title:"Хэш таблицы",tasks:[{num:0,title:"ВАЖНО: Выбор хэш функции",description:`⚠️ ТЕОРИЯ: Изучи разные хэш функции в Python перед выполнением задач:

1️⃣ Встроенная hash() функция:
   hash("key") % table_size
   ✓ Встроенная в Python
   ✗ Разная в разных сеансах (для безопасности)

2️⃣ Сумма ASCII кодов:
   def hash_sum(key, size):
       return sum(ord(c) for c in key) % size
   ✓ Простая
   ✗ Плохое распределение для похожих строк

3️⃣ Полиномиальный хэш (популярный):
   def hash_poly(key, size, base=31):
       h = 0
       for c in key:
           h = (h * base + ord(c)) % size
       return h
   ✓ Хорошее распределение
   ✓ Быстрый

4️⃣ Хэш с простым числом:
   def hash_prime(key, size, prime=101):
       h = 0
       for c in key:
           h = (h * prime + ord(c)) % size
       return h
   ✓ Еще лучше для таблиц

Рекомендуем использовать функции 3 или 4 в задачах ниже!`},{num:1,title:"Реализация хэш таблицы (добавление и поиск)",description:`Реализуй простую хэш таблицу с методами добавления и поиска элементов.

class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size

    def hash(self, key):
        # Используй одну из хэш функций выше
        return hash(key) % self.size

    def insert(self, key, value):
        # Добавь пару (key, value) в таблицу
        pass

    def search(self, key):
        # Найди значение по ключу
        # Верни значение или None
        pass

Тест:
ht = HashTable(5)
ht.insert("name", "Alice")
ht.insert("age", 25)
print(ht.search("name"))  # Alice
print(ht.search("city"))  # None`},{num:2,title:"Удаление из хэш таблицы",description:`Добавь метод удаления элемента из хэш таблицы.

class HashTable:
    # ... предыдущие методы ...

    def delete(self, key):
        # Удали пару (key, value) из таблицы
        # Верни True если удалил, False если ключ не найден
        pass

Тест:
ht.insert("city", "Paris")
print(ht.delete("city"))  # True
print(ht.search("city"))  # None
print(ht.delete("city"))  # False`},{num:3,title:"Разрешение колизий методом Chaining",description:`Реализуй хэш таблицу с разрешением колизий через chaining (цепочки).
Вместо одного значения в ячейке храни список пар (key, value).

class HashTableChaining:
    def __init__(self, size=5):
        self.size = size
        self.table = [[] for _ in range(size)]  # Список цепочек

    def hash(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        # Добавь (key, value) в цепочку на позиции hash(key)
        pass

    def search(self, key):
        # Найди значение по ключу в цепочке
        pass

Тест с колизией:
ht = HashTableChaining(3)
ht.insert("dog", 1)
ht.insert("cat", 2)
ht.insert("rat", 3)  # Возможна колизия! Но все равно найдутся
print(ht.search("dog"))  # 1
print(ht.search("cat"))  # 2`},{num:4,title:"Разрешение колизий методом Linear Probing",description:`Реализуй хэш таблицу с разрешением колизий через linear probing.
Если ячейка занята, переходи к следующей: hash(key), hash(key)+1, hash(key)+2...

class HashTableLinearProbing:
    def __init__(self, size=5):
        self.size = size
        self.table = [None] * size

    def hash(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        # Найди первую свободную ячейку начиная с hash(key)
        # Добавь (key, value) туда
        pass

    def search(self, key):
        # Найди значение, проверяя ячейки начиная с hash(key)
        pass

Тест:
ht = HashTableLinearProbing(5)
ht.insert("a", 1)
ht.insert("b", 2)
print(ht.search("a"))  # 1
print(ht.search("b"))  # 2`},{num:5,title:"Разрешение колизий методом Double Hashing",description:`Реализуй хэш таблицу с разрешением колизий через double hashing.
Используй две хэш функции: hash1(key) и hash2(key).
При колизии переходи: hash1 + hash2, hash1 + 2*hash2, hash1 + 3*hash2...

def hash1(key, size):
    return hash(key) % size

def hash2(key, size):
    return 1 + (hash(key) % (size - 1))

class HashTableDoubleHash:
    def __init__(self, size=5):
        self.size = size
        self.table = [None] * size

    def insert(self, key, value):
        # Используй обе хэш функции для разрешения колизий
        pass

    def search(self, key):
        # Найди значение используя double hashing
        pass

Тест:
ht = HashTableDoubleHash(7)
ht.insert("x", 10)
ht.insert("y", 20)
print(ht.search("x"))  # 10`}]},10:{title:"Структуры данных: деревья",tasks:[{num:1,title:"Высота бинарного дерева",description:`Реализуй функцию, которая вычисляет высоту бинарного дерева поиска (максимальный путь от корня до листа).

class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def tree_height(node):
    # Возврати высоту дерева
    pass

# Пример: дерево [5, 3, 7, 2, 4]
#       5
#      / \\
#     3   7
#    / \\
#   2   4
# Ответ: 2`},{num:2,title:"Удаление элемента из BST",description:`Реализуй функцию удаления элемента из бинарного дерева поиска. Учти три случая:
- Узел без детей (просто удали)
- Узел с одним ребенком (замени на ребенка)
- Узел с двумя детьми (найди минимум в правом поддереве)

def delete_node(root, val):
    # Удали узел с значением val
    # Верни новый корень дерева
    pass

Тест: удалить 3 из дерева [5, 3, 7, 2, 4, 6, 8]`},{num:3,title:"Проверка валидности BST",description:`Реализуй функцию, которая проверяет, является ли дерево валидным бинарным деревом поиска.
Помни: для каждого узла все значения слева должны быть < узла, а справа > узла.

def is_valid_bst(node, min_val=float('-inf'), max_val=float('inf')):
    # Проверь, что дерево - валидное BST
    pass

Тест 1: [5, 3, 7, 2, 4] → True (валидное)
Тест 2: [5, 3, 7, 2, 8] → False (8 > 5 но справа)`},{num:4,title:"Поиск пути в дереве",description:`Реализуй функцию, которая находит путь от корня до конкретного значения в дереве.

def find_path(node, target):
    # Верни список значений от корня до target
    # Или пустой список, если не найдено
    pass

Пример дерева:
#       5
#      / \\
#     3   7
#    / \\
#   2   4

find_path(root, 4) → [5, 3, 4]
find_path(root, 7) → [5, 7]
find_path(root, 10) → []`},{num:5,title:"Сумма всех путей",description:`Реализуй функцию, которая находит сумму всех значений во всех путях от корня до листьев.

def path_sum(node):
    # Верни сумму значений всех путей
    pass

Пример:
#       5
#      / \\
#     3   7
#    /
#   2

Пути: [5,3,2] → сумма 10
       [5,7] → сумма 12
Ответ: 10 + 12 = 22`},{num:6,title:"Самый большой путь в дереве (Diameter)",description:`Реализуй функцию, которая находит длину самого длинного пути между любыми двумя узлами дерева (может не проходить через корень).

def tree_diameter(node):
    # Верни длину самого длинного пути
    pass

Пример:
#       1
#      / \\
#     2   3
#    /
#   4
#  /
# 5

Самый длинный путь: 5→4→2→1→3 (длина 4)
Ответ: 4`},{num:7,title:"Уровневый обход дерева (BFS)",description:`Реализуй функцию обхода дерева по уровням (breadth-first search).

from collections import deque

def level_order(root):
    # Верни список списков, где каждый список - уровень дерева
    pass

Пример:
#       5
#      / \\
#     3   7
#    / \\
#   2   4

Ответ: [[5], [3, 7], [2, 4]]`},{num:8,title:"Удаление поддерева",description:`Реализуй функцию, которая удаляет все узлы, значение которых меньше заданного значения.

def delete_subtree(node, min_val):
    # Удали все узлы < min_val вместе с их потомками
    # Верни новый корень дерева
    pass

Пример:
#       5
#      / \\
#     3   7
#    / \\
#   2   4

delete_subtree(root, 4) удаляет узлы 3, 2
Результат:
#       5
#        \\
#         7`}]},13:{title:"Практический проект",tasks:[]},12:{title:"ИИ-инструменты разработчика",tasks:[{num:1,title:"Установка ИИ помощника для VS Code",description:`Выбери один из вариантов и установи бесплатно:

Вариант 1: GitHub Copilot
• Перейди в VS Code → Extensions
• Найди "GitHub Copilot" (от GitHub)
• Нажми Install
• Авторизуйся через GitHub
• Готово! Начни печатать код

Вариант 2: Claude Code (для Claude)
• Установи Claude Code CLI или расширение
• Авторизуйся аккаунтом Claude
• Используй в командной строке или IDE

Если хочешь платную подписку - напиши:
• t.me/kiro_team_manager или
• t.me/x_tap
Объясни что нужна помощь с покупкой, поможем!`},{num:2,title:"Первый промпт: простая функция",description:`Напиши в Copilot / Claude Code промпт:

"Напиши функцию на Python, которая проверяет, простое ли число.
Входной параметр: целое число n
Выходной параметр: True если простое, False иначе
Используй эффективный алгоритм O(√n)"

Что ты должен был получить:
✅ Функция с проверкой делимости
✅ Оптимизация через √n
✅ Комментарии в коде

Протестируй результат:
is_prime(7) → True
is_prime(10) → False`},{num:3,title:"Второй промпт: создание файла и папки",description:`Если используешь Claude Code - дай промпт:

"Создай структуру проекта для калькулятора:
• Папка: calculator/
  • Файл: calculator.py (основная логика)
  • Файл: tests.py (тесты)
  • Файл: README.md (описание)

В calculator.py реализуй:
• add(a, b)
• subtract(a, b)
• multiply(a, b)
• divide(a, b) с проверкой на 0

В tests.py напиши примеры использования каждой функции"

Claude Code сам создаст папку и файлы с кодом!`},{num:4,title:"Третий промпт: анализ и улучшение кода",description:`Найди в своём проекте любой файл с кодом и дай ИИ:

"Вот мой код:
[скопируй весь код]

Что можно улучшить?
Напиши версию с:
• Лучшей организацией
• Типизацией (type hints)
• Docstrings для функций
• Обработкой ошибок

Объясни каждое изменение"

ИИ покажет как писать профессиональный код!`},{num:5,title:"Четвёртый промпт: написание тестов",description:`Дай ИИ одну из своих функций:

"Напиши unit tests для этой функции:
[скопируй функцию]

Использование pytest. Покрой:
• Нормальные случаи
• Edge cases (граничные значения)
• Ошибки (exception handling)

Минимум 5 тестов"

Результат: готовые тесты, которые можно запустить!`},{num:6,title:"Пятый промпт: объяснение чужого кода",description:`Возьми любой код (из интернета, учебника, проекта):

"Объясни этот код пошагово, как я дошкольник:
[скопируй весь код]

Что он делает?
Какие переменные и функции?
Как работает логика?
Нарисуй ASCII диаграмму если нужна"

ИИ объяснит даже сложный код!`},{num:7,title:"Практический результат",description:`К концу этого дня ты должен:

✅ Установить Copilot или Claude Code
✅ Дать ИИ минимум 3-5 промптов
✅ Получить:
   • Готовые функции
   • Созданные файлы и папки
   • Улучшенный и отрефакторенный код
   • Написанные тесты
   • Понимание как работает чужой код

Это базовые навыки работы с ИИ!
Используй его как помощника, не как замену.`}]},11:{title:"Git и версионирование",tasks:[{num:1,title:"Создать аккаунт на GitHub",description:`Если у тебя еще нет аккаунта на GitHub, создай его на сайте https://github.com
Подтверди email и настрой профиль`},{num:2,title:"Создать проект в VS Code",description:`Создай новую папку на своем компьютере для проекта
Открой ее в VS Code
Инициализируй Git репозиторий: git init`},{num:3,title:"Создать файл с решением",description:`Выбери любую задачу из Days 2-10 (из задач для тренировки)
Напиши решение этой задачи в файл solution.py (или solution.js)
Сохрани файл в своем проекте`},{num:4,title:"Первый коммит и пуш",description:`Добавь файл в Git: git add solution.py
Сделай коммит: git commit -m "Add solution"
Создай репозиторий на GitHub
Свяжи локальный репозиторий с GitHub: git remote add origin <ссылка>
Запуши код: git push -u origin main`},{num:5,title:"Внести изменения и запушить снова",description:`Отредактируй свое решение (добавь комментарии, улучши код)
Добавь изменения: git add solution.py
Сделай новый коммит: git commit -m "Improve solution"
Запуши изменения: git push`},{num:6,title:"Посмотреть историю в GitHub",description:`Открой свой репозиторий на GitHub
Посмотри в разделе "Commits" всю историю своих коммитов
Проверь, что видны оба коммита с правильными сообщениями и датами`},{num:7,title:"Пройти интерактивную игру",description:`Это дополнительное задание для углубленного изучения Git

Пройди игру Learn Git Branching:
https://learngitbranching.js.org/?locale=ru_RU

Игра поможет тебе разобраться с ветками (branches), мержами и другими продвинутыми операциями Git`}]},15:{title:"Тайм- и таск-менеджмент",tasks:[]},16:{title:"Языки программирования и фреймворки",tasks:[]},17:{title:"SQL — часть 1: основы и SELECT",tasks:[{num:1,title:"Подготовка",description:`Открой онлайн-песочницу для SQL (регистрация не нужна):
• https://sqliteonline.com — рекомендуем
• или https://www.db-fiddle.com

Создай таблицу users и наполни её данными:

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    city TEXT
);

INSERT INTO users (id, name, age, city) VALUES
(1, 'Анна', 25, 'Москва'),
(2, 'Борис', 31, 'Казань'),
(3, 'Вера', 19, 'Москва'),
(4, 'Глеб', 42, 'Сочи'),
(5, 'Дина', 28, 'Казань');`},{num:2,title:"Простой SELECT",description:`Напиши запросы:
1) Выбрать все колонки всех пользователей
2) Выбрать только имена (name) и города (city)
3) Выбрать имена пользователей с псевдонимом колонки "Имя" (используй AS)`},{num:3,title:"Фильтрация WHERE",description:`Напиши запросы:
1) Все пользователи старше 25 лет
2) Все пользователи из Москвы
3) Все пользователи из Казани старше 30 лет (используй AND)
4) Пользователи младше 20 ИЛИ старше 40 (используй OR)`},{num:4,title:"Операторы LIKE, IN, BETWEEN",description:`Напиши запросы:
1) Пользователи, чьё имя начинается на букву "В" (LIKE 'В%')
2) Пользователи из городов 'Москва' или 'Сочи' (используй IN)
3) Пользователи в возрасте от 20 до 30 лет включительно (используй BETWEEN)`},{num:5,title:"Сортировка ORDER BY и LIMIT",description:`Напиши запросы:
1) Все пользователи, отсортированные по возрасту по возрастанию
2) Все пользователи, отсортированные по возрасту по убыванию (DESC)
3) Топ-3 самых старших пользователя (ORDER BY + LIMIT)
4) Уникальные города (используй DISTINCT)`}]},18:{title:"SQL — часть 2: агрегации и изменение данных",tasks:[{num:1,title:"Агрегатные функции",description:`Используй таблицу users из части 1. Напиши запросы:
1) Сколько всего пользователей? (COUNT)
2) Средний возраст всех пользователей (AVG)
3) Возраст самого старшего и самого младшего (MAX и MIN)
4) Сумма всех возрастов (SUM)`},{num:2,title:"Группировка GROUP BY",description:`Напиши запросы:
1) Сколько пользователей в каждом городе?
   SELECT city, COUNT(*) FROM users GROUP BY city;
2) Средний возраст пользователей по каждому городу
3) Максимальный возраст в каждом городе`},{num:3,title:"Фильтрация групп HAVING",description:`Напиши запросы:
1) Города, в которых больше 1 пользователя (GROUP BY + HAVING COUNT(*) > 1)
2) Города со средним возрастом больше 25

Важно: WHERE фильтрует строки ДО группировки, HAVING — группы ПОСЛЕ.`},{num:4,title:"INSERT — добавление данных",description:`1) Добавь нового пользователя: id=6, name='Егор', age=35, city='Москва'
2) Добавь сразу двух пользователей одним запросом
3) Проверь результат через SELECT *`},{num:5,title:"UPDATE и DELETE",description:`1) Измени город пользователя с id=1 на 'Санкт-Петербург' (UPDATE ... SET ... WHERE)
2) Увеличь возраст всех пользователей из Казани на 1 год
3) Удали пользователя с id=6 (DELETE ... WHERE)

⚠️ ВАЖНО: всегда пиши WHERE в UPDATE и DELETE! Без него изменятся ВСЕ строки.`}]},19:{title:"SQL — часть 3: связи таблиц и JOIN",tasks:[{num:1,title:"Создание связанных таблиц",description:`Создай вторую таблицу — заказы (orders), связанную с users:

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    product TEXT,
    price INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO orders (id, user_id, product, price) VALUES
(1, 1, 'Книга', 500),
(2, 1, 'Наушники', 3000),
(3, 2, 'Мышка', 1200),
(4, 3, 'Клавиатура', 2500),
(5, 5, 'Монитор', 15000);

Здесь user_id — внешний ключ (FOREIGN KEY), ссылающийся на id в users.`},{num:2,title:"INNER JOIN",description:`Напиши запросы:
1) Покажи имя пользователя и название его товара (соедини users и orders)
   SELECT users.name, orders.product
   FROM users
   JOIN orders ON users.id = orders.user_id;
2) Покажи имя, товар и цену для всех заказов
3) Покажи только заказы пользователей из Москвы`},{num:3,title:"LEFT JOIN",description:`Напиши запросы:
1) Покажи ВСЕХ пользователей и их заказы (даже тех, у кого заказов нет)
   Используй LEFT JOIN — у пользователей без заказов товар будет NULL
2) Найди пользователей, которые НЕ сделали ни одного заказа
   (LEFT JOIN + WHERE orders.id IS NULL)`},{num:4,title:"JOIN + агрегация",description:`Напиши запросы:
1) Сколько заказов сделал каждый пользователь? (JOIN + GROUP BY)
2) Сколько всего денег потратил каждый пользователь? (SUM(price))
3) Кто потратил больше всех? (добавь ORDER BY + LIMIT 1)`},{num:5,title:"Проектирование схемы",description:`Спроектируй схему базы данных для соцсети (просто опиши таблицы и поля):
• Таблица пользователей (users)
• Таблица постов (posts) — связь с users
• Таблица лайков (likes) — связь с users и posts

Для каждой таблицы укажи:
- Первичный ключ (PRIMARY KEY)
- Внешние ключи (FOREIGN KEY) и на что они ссылаются
- Основные поля

Подумай: какой тип связи между постами и лайками?`}]}};function kd({selectedDay:e,onBack:s}){const[n,r]=_.useState(Mt);_.useEffect(()=>{Ke.schedule().then(r).catch(()=>{})},[]);const i=e||1,l=eo[i]||{title:"Домашние задания",tasks:[]};function a(o){var f;const c=n.find(y=>y.day===o);return c&&c.title?c.title:((f=eo[o])==null?void 0:f.title)||`День ${o}`}return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"theory-breadcrumbs",children:[t.jsx("button",{className:"breadcrumb-link",onClick:s,children:"📚 Библиотека знаний"}),t.jsx("span",{className:"breadcrumb-sep",children:"/"}),t.jsxs("span",{className:"breadcrumb-current",children:["День ",i," · ",a(i)]})]}),t.jsx("div",{style:{maxWidth:"900px",margin:"0 auto"},children:t.jsxs("div",{style:{marginTop:"24px"},children:[t.jsx("h2",{style:{fontSize:"18px",marginBottom:"16px"},children:l.title}),l.tasks.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Домашние задания еще не добавлены"}):t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:l.tasks.map((o,c)=>t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsxs("h3",{style:{margin:"0 0 8px 0",fontSize:"16px"},children:["Задача ",o.num,": ",o.title]}),t.jsx("p",{style:{margin:0,color:"var(--text-secondary)",whiteSpace:"pre-wrap",lineHeight:"1.6"},children:o.description})]},c))})]})}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:s,children:"Вернуться в Библиотеку знаний"})})]})}function Ed({onBack:e}){const[s,n]=_.useState([]),[r,i]=_.useState(!0);return _.useEffect(()=>{const l=Date.now(),a=500;Ke.announcements().then(n).catch(()=>{}).finally(()=>{const o=Date.now()-l,c=Math.max(0,a-o);setTimeout(()=>i(!1),c)})},[]),t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Новости и обновления"}),t.jsx("p",{className:"page-subtitle",children:"Все объявления"})]}),t.jsx("div",{className:"widget",children:r?[1,2,3].map(l=>t.jsx(gd,{},l)):s.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13,padding:"4px 0"},children:"Объявлений пока нет"}):s.map((l,a)=>t.jsxs("div",{className:"news-card fade-in",style:{animationDelay:`${a*.05}s`},children:[t.jsxs("div",{className:"news-card-head",children:[t.jsxs("span",{className:"news-card-title",children:[l.icon||"📢"," ",l.title]}),t.jsx("span",{className:"news-card-date",children:l.published_at})]}),t.jsx("div",{className:"news-card-text",children:l.text})]},l.id))}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:e,children:"← Вернуться на дэшборд"})})]})}const _d={dashboard:jm,schedule:Nd,library:Im,tasks:Hm,links:Gm,theory:wd,questions:Sd,homework:kd,announcements:Ed},$f=Object.keys(_d);function Wf({user:e,onLogout:s}){const[n,r]=_.useState("dashboard"),[i,l]=_.useState(!1),[a,o]=_.useState(null),[c,u]=_.useState(null);_.useEffect(()=>(document.body.className="app-page",()=>{document.body.className=""}),[]);const f=h=>{$f.includes(h)&&(r(h),l(!1))},y=h=>{u(h.day),r("theory")},p=h=>{u(h.day),r("questions")},x=h=>{u(h.day),r("homework")},w=()=>{r("library")},j=()=>{r("dashboard")},L=_d[n]||Nd;return t.jsxs(t.Fragment,{children:[t.jsx("aside",{id:"sidebar",className:`sidebar${i?" open":""}`,children:t.jsx(lm,{user:e,currentPage:n,onNavigate:f,onLogout:s,onClose:()=>l(!1)})}),i&&t.jsx("div",{className:"sidebar-overlay active",onClick:()=>l(!1)}),t.jsxs("div",{className:"app-content",children:[t.jsx(cm,{user:e,page:n,onMenuClick:()=>l(!0)}),t.jsx("main",{className:"pages-wrap",children:n==="theory"?t.jsx(wd,{selectedDay:c,onBack:w}):n==="questions"?t.jsx(Sd,{selectedDay:c,onBack:w}):n==="homework"?t.jsx(kd,{selectedDay:c,onBack:w}):n==="announcements"?t.jsx(Ed,{onBack:j}):t.jsx(L,{user:e,onNavigate:f,onOpenDay:o,onOpenTheory:y,onOpenQuestions:p,onOpenHomework:x})})]}),a&&t.jsx(dm,{day:a,onClose:()=>o(null)})]})}function to(e){if(!e)return!1;if(e.expiresAt){const s=new Date(e.expiresAt).getTime();return new Date().getTime()<s}return!0}function Vf(){const[e,s]=_.useState(()=>{try{const i=JSON.parse(localStorage.getItem("kiro_user"));return i&&to(i)?i:(localStorage.removeItem("kiro_user"),i&&localStorage.setItem("sessionExpired","true"),null)}catch{return null}});_.useEffect(()=>{const i=()=>{try{const o=localStorage.getItem("kiro_user");if(!o){e&&s(null);return}const c=JSON.parse(o);to(c)||(localStorage.removeItem("kiro_user"),localStorage.setItem("sessionExpired","true"),s(null))}catch{localStorage.removeItem("kiro_user"),s(null)}};i();const l=()=>{document.visibilityState==="visible"&&i()};document.addEventListener("visibilitychange",l);const a=setInterval(i,6e4);return()=>{clearInterval(a),document.removeEventListener("visibilitychange",l)}},[]);const n=_.useCallback(i=>{localStorage.setItem("kiro_user",JSON.stringify(i)),s(i)},[]),r=_.useCallback(()=>{localStorage.removeItem("kiro_user"),localStorage.setItem("sessionExpired","true"),s(null)},[]);return e?t.jsx(Wf,{user:e,onLogout:r}):t.jsx(nm,{onLogin:n})}ti.createRoot(document.getElementById("root")).render(t.jsx(Gd.StrictMode,{children:t.jsx(Vf,{})}));
