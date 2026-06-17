(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=s(i);fetch(i.href,l)}})();function Td(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var sa={exports:{}},hr={},ra={exports:{}},B={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ls=Symbol.for("react.element"),Cd=Symbol.for("react.portal"),Od=Symbol.for("react.fragment"),Ld=Symbol.for("react.strict_mode"),bd=Symbol.for("react.profiler"),Dd=Symbol.for("react.provider"),Ad=Symbol.for("react.context"),Pd=Symbol.for("react.forward_ref"),Rd=Symbol.for("react.suspense"),Id=Symbol.for("react.memo"),Bd=Symbol.for("react.lazy"),Gl=Symbol.iterator;function zd(e){return e===null||typeof e!="object"?null:(e=Gl&&e[Gl]||e["@@iterator"],typeof e=="function"?e:null)}var ia={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},la=Object.assign,oa={};function xn(e,n,s){this.props=e,this.context=n,this.refs=oa,this.updater=s||ia}xn.prototype.isReactComponent={};xn.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};xn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function aa(){}aa.prototype=xn.prototype;function Qi(e,n,s){this.props=e,this.context=n,this.refs=oa,this.updater=s||ia}var Ki=Qi.prototype=new aa;Ki.constructor=Qi;la(Ki,xn.prototype);Ki.isPureReactComponent=!0;var $l=Array.isArray,ca=Object.prototype.hasOwnProperty,Yi={current:null},da={key:!0,ref:!0,__self:!0,__source:!0};function ua(e,n,s){var r,i={},l=null,o=null;if(n!=null)for(r in n.ref!==void 0&&(o=n.ref),n.key!==void 0&&(l=""+n.key),n)ca.call(n,r)&&!da.hasOwnProperty(r)&&(i[r]=n[r]);var a=arguments.length-2;if(a===1)i.children=s;else if(1<a){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:ls,type:e,key:l,ref:o,props:i,_owner:Yi.current}}function Fd(e,n){return{$$typeof:ls,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function Ji(e){return typeof e=="object"&&e!==null&&e.$$typeof===ls}function Md(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(s){return n[s]})}var Wl=/\/+/g;function Cr(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Md(""+e.key):n.toString(36)}function Ls(e,n,s,r,i){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case ls:case Cd:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+Cr(o,0):r,$l(i)?(s="",e!=null&&(s=e.replace(Wl,"$&/")+"/"),Ls(i,n,s,"",function(u){return u})):i!=null&&(Ji(i)&&(i=Fd(i,s+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Wl,"$&/")+"/")+e)),n.push(i)),1;if(o=0,r=r===""?".":r+":",$l(e))for(var a=0;a<e.length;a++){l=e[a];var c=r+Cr(l,a);o+=Ls(l,n,s,c,i)}else if(c=zd(e),typeof c=="function")for(e=c.call(e),a=0;!(l=e.next()).done;)l=l.value,c=r+Cr(l,a++),o+=Ls(l,n,s,c,i);else if(l==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return o}function fs(e,n,s){if(e==null)return e;var r=[],i=0;return Ls(e,r,"","",function(l){return n.call(s,l,i++)}),r}function Hd(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(s){(e._status===0||e._status===-1)&&(e._status=1,e._result=s)},function(s){(e._status===0||e._status===-1)&&(e._status=2,e._result=s)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var fe={current:null},bs={transition:null},Ud={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:bs,ReactCurrentOwner:Yi};function ha(){throw Error("act(...) is not supported in production builds of React.")}B.Children={map:fs,forEach:function(e,n,s){fs(e,function(){n.apply(this,arguments)},s)},count:function(e){var n=0;return fs(e,function(){n++}),n},toArray:function(e){return fs(e,function(n){return n})||[]},only:function(e){if(!Ji(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};B.Component=xn;B.Fragment=Od;B.Profiler=bd;B.PureComponent=Qi;B.StrictMode=Ld;B.Suspense=Rd;B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ud;B.act=ha;B.cloneElement=function(e,n,s){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=la({},e.props),i=e.key,l=e.ref,o=e._owner;if(n!=null){if(n.ref!==void 0&&(l=n.ref,o=Yi.current),n.key!==void 0&&(i=""+n.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(c in n)ca.call(n,c)&&!da.hasOwnProperty(c)&&(r[c]=n[c]===void 0&&a!==void 0?a[c]:n[c])}var c=arguments.length-2;if(c===1)r.children=s;else if(1<c){a=Array(c);for(var u=0;u<c;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:ls,type:e.type,key:i,ref:l,props:r,_owner:o}};B.createContext=function(e){return e={$$typeof:Ad,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Dd,_context:e},e.Consumer=e};B.createElement=ua;B.createFactory=function(e){var n=ua.bind(null,e);return n.type=e,n};B.createRef=function(){return{current:null}};B.forwardRef=function(e){return{$$typeof:Pd,render:e}};B.isValidElement=Ji;B.lazy=function(e){return{$$typeof:Bd,_payload:{_status:-1,_result:e},_init:Hd}};B.memo=function(e,n){return{$$typeof:Id,type:e,compare:n===void 0?null:n}};B.startTransition=function(e){var n=bs.transition;bs.transition={};try{e()}finally{bs.transition=n}};B.unstable_act=ha;B.useCallback=function(e,n){return fe.current.useCallback(e,n)};B.useContext=function(e){return fe.current.useContext(e)};B.useDebugValue=function(){};B.useDeferredValue=function(e){return fe.current.useDeferredValue(e)};B.useEffect=function(e,n){return fe.current.useEffect(e,n)};B.useId=function(){return fe.current.useId()};B.useImperativeHandle=function(e,n,s){return fe.current.useImperativeHandle(e,n,s)};B.useInsertionEffect=function(e,n){return fe.current.useInsertionEffect(e,n)};B.useLayoutEffect=function(e,n){return fe.current.useLayoutEffect(e,n)};B.useMemo=function(e,n){return fe.current.useMemo(e,n)};B.useReducer=function(e,n,s){return fe.current.useReducer(e,n,s)};B.useRef=function(e){return fe.current.useRef(e)};B.useState=function(e){return fe.current.useState(e)};B.useSyncExternalStore=function(e,n,s){return fe.current.useSyncExternalStore(e,n,s)};B.useTransition=function(){return fe.current.useTransition()};B.version="18.3.1";ra.exports=B;var E=ra.exports;const Gd=Td(E);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $d=E,Wd=Symbol.for("react.element"),Vd=Symbol.for("react.fragment"),qd=Object.prototype.hasOwnProperty,Qd=$d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Kd={key:!0,ref:!0,__self:!0,__source:!0};function fa(e,n,s){var r,i={},l=null,o=null;s!==void 0&&(l=""+s),n.key!==void 0&&(l=""+n.key),n.ref!==void 0&&(o=n.ref);for(r in n)qd.call(n,r)&&!Kd.hasOwnProperty(r)&&(i[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)i[r]===void 0&&(i[r]=n[r]);return{$$typeof:Wd,type:e,key:l,ref:o,props:i,_owner:Qd.current}}hr.Fragment=Vd;hr.jsx=fa;hr.jsxs=fa;sa.exports=hr;var t=sa.exports,ti={},ma={exports:{}},Te={},pa={exports:{}},ya={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(T,D){var A=T.length;T.push(D);e:for(;0<A;){var $=A-1>>>1,Y=T[$];if(0<i(Y,D))T[$]=D,T[A]=Y,A=$;else break e}}function s(T){return T.length===0?null:T[0]}function r(T){if(T.length===0)return null;var D=T[0],A=T.pop();if(A!==D){T[0]=A;e:for(var $=0,Y=T.length,P=Y>>>1;$<P;){var pe=2*($+1)-1,vn=T[pe],Ye=pe+1,hs=T[Ye];if(0>i(vn,A))Ye<Y&&0>i(hs,vn)?(T[$]=hs,T[Ye]=A,$=Ye):(T[$]=vn,T[pe]=A,$=pe);else if(Ye<Y&&0>i(hs,A))T[$]=hs,T[Ye]=A,$=Ye;else break e}}return D}function i(T,D){var A=T.sortIndex-D.sortIndex;return A!==0?A:T.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var c=[],u=[],m=1,y=null,p=3,x=!1,w=!1,j=!1,L=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(T){for(var D=s(u);D!==null;){if(D.callback===null)r(u);else if(D.startTime<=T)r(u),D.sortIndex=D.expirationTime,n(c,D);else break;D=s(u)}}function g(T){if(j=!1,f(T),!w)if(s(c)!==null)w=!0,Nn(k);else{var D=s(u);D!==null&&Ge(g,D.startTime-T)}}function k(T,D){w=!1,j&&(j=!1,h(O),O=-1),x=!0;var A=p;try{for(f(D),y=s(c);y!==null&&(!(y.expirationTime>D)||T&&!X());){var $=y.callback;if(typeof $=="function"){y.callback=null,p=y.priorityLevel;var Y=$(y.expirationTime<=D);D=e.unstable_now(),typeof Y=="function"?y.callback=Y:y===s(c)&&r(c),f(D)}else r(c);y=s(c)}if(y!==null)var P=!0;else{var pe=s(u);pe!==null&&Ge(g,pe.startTime-D),P=!1}return P}finally{y=null,p=A,x=!1}}var _=!1,S=null,O=-1,F=5,b=-1;function X(){return!(e.unstable_now()-b<F)}function ve(){if(S!==null){var T=e.unstable_now();b=T;var D=!0;try{D=S(!0,T)}finally{D?Gt():(_=!1,S=null)}}else _=!1}var Gt;if(typeof d=="function")Gt=function(){d(ve)};else if(typeof MessageChannel<"u"){var Oe=new MessageChannel,us=Oe.port2;Oe.port1.onmessage=ve,Gt=function(){us.postMessage(null)}}else Gt=function(){L(ve,0)};function Nn(T){S=T,_||(_=!0,Gt())}function Ge(T,D){O=L(function(){T(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_continueExecution=function(){w||x||(w=!0,Nn(k))},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):F=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return s(c)},e.unstable_next=function(T){switch(p){case 1:case 2:case 3:var D=3;break;default:D=p}var A=p;p=D;try{return T()}finally{p=A}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(T,D){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var A=p;p=T;try{return D()}finally{p=A}},e.unstable_scheduleCallback=function(T,D,A){var $=e.unstable_now();switch(typeof A=="object"&&A!==null?(A=A.delay,A=typeof A=="number"&&0<A?$+A:$):A=$,T){case 1:var Y=-1;break;case 2:Y=250;break;case 5:Y=1073741823;break;case 4:Y=1e4;break;default:Y=5e3}return Y=A+Y,T={id:m++,callback:D,priorityLevel:T,startTime:A,expirationTime:Y,sortIndex:-1},A>$?(T.sortIndex=A,n(u,T),s(c)===null&&T===s(u)&&(j?(h(O),O=-1):j=!0,Ge(g,A-$))):(T.sortIndex=Y,n(c,T),w||x||(w=!0,Nn(k))),T},e.unstable_shouldYield=X,e.unstable_wrapCallback=function(T){var D=p;return function(){var A=p;p=D;try{return T.apply(this,arguments)}finally{p=A}}}})(ya);pa.exports=ya;var Yd=pa.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jd=E,Ee=Yd;function v(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,s=1;s<arguments.length;s++)n+="&args[]="+encodeURIComponent(arguments[s]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var xa=new Set,Gn={};function Ht(e,n){dn(e,n),dn(e+"Capture",n)}function dn(e,n){for(Gn[e]=n,e=0;e<n.length;e++)xa.add(n[e])}var nt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ni=Object.prototype.hasOwnProperty,Xd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Vl={},ql={};function Zd(e){return ni.call(ql,e)?!0:ni.call(Vl,e)?!1:Xd.test(e)?ql[e]=!0:(Vl[e]=!0,!1)}function eu(e,n,s,r){if(s!==null&&s.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:s!==null?!s.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function tu(e,n,s,r){if(n===null||typeof n>"u"||eu(e,n,s,r))return!0;if(r)return!1;if(s!==null)switch(s.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function me(e,n,s,r,i,l,o){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=s,this.propertyName=e,this.type=n,this.sanitizeURL=l,this.removeEmptyString=o}var le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){le[e]=new me(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];le[n]=new me(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){le[e]=new me(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){le[e]=new me(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){le[e]=new me(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){le[e]=new me(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){le[e]=new me(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){le[e]=new me(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){le[e]=new me(e,5,!1,e.toLowerCase(),null,!1,!1)});var Xi=/[\-:]([a-z])/g;function Zi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Xi,Zi);le[n]=new me(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Xi,Zi);le[n]=new me(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Xi,Zi);le[n]=new me(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){le[e]=new me(e,1,!1,e.toLowerCase(),null,!1,!1)});le.xlinkHref=new me("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){le[e]=new me(e,1,!1,e.toLowerCase(),null,!0,!0)});function el(e,n,s,r){var i=le.hasOwnProperty(n)?le[n]:null;(i!==null?i.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(tu(n,s,i,r)&&(s=null),r||i===null?Zd(n)&&(s===null?e.removeAttribute(n):e.setAttribute(n,""+s)):i.mustUseProperty?e[i.propertyName]=s===null?i.type===3?!1:"":s:(n=i.attributeName,r=i.attributeNamespace,s===null?e.removeAttribute(n):(i=i.type,s=i===3||i===4&&s===!0?"":""+s,r?e.setAttributeNS(r,n,s):e.setAttribute(n,s))))}var lt=Jd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ms=Symbol.for("react.element"),Wt=Symbol.for("react.portal"),Vt=Symbol.for("react.fragment"),tl=Symbol.for("react.strict_mode"),si=Symbol.for("react.profiler"),ga=Symbol.for("react.provider"),ja=Symbol.for("react.context"),nl=Symbol.for("react.forward_ref"),ri=Symbol.for("react.suspense"),ii=Symbol.for("react.suspense_list"),sl=Symbol.for("react.memo"),at=Symbol.for("react.lazy"),Na=Symbol.for("react.offscreen"),Ql=Symbol.iterator;function wn(e){return e===null||typeof e!="object"?null:(e=Ql&&e[Ql]||e["@@iterator"],typeof e=="function"?e:null)}var Q=Object.assign,Or;function Ln(e){if(Or===void 0)try{throw Error()}catch(s){var n=s.stack.trim().match(/\n( *(at )?)/);Or=n&&n[1]||""}return`
`+Or+e}var Lr=!1;function br(e,n){if(!e||Lr)return"";Lr=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(u){var r=u}Reflect.construct(e,[],n)}else{try{n.call()}catch(u){r=u}e.call(n.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),l=r.stack.split(`
`),o=i.length-1,a=l.length-1;1<=o&&0<=a&&i[o]!==l[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==l[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==l[a]){var c=`
`+i[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=a);break}}}finally{Lr=!1,Error.prepareStackTrace=s}return(e=e?e.displayName||e.name:"")?Ln(e):""}function nu(e){switch(e.tag){case 5:return Ln(e.type);case 16:return Ln("Lazy");case 13:return Ln("Suspense");case 19:return Ln("SuspenseList");case 0:case 2:case 15:return e=br(e.type,!1),e;case 11:return e=br(e.type.render,!1),e;case 1:return e=br(e.type,!0),e;default:return""}}function li(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Vt:return"Fragment";case Wt:return"Portal";case si:return"Profiler";case tl:return"StrictMode";case ri:return"Suspense";case ii:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ja:return(e.displayName||"Context")+".Consumer";case ga:return(e._context.displayName||"Context")+".Provider";case nl:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case sl:return n=e.displayName||null,n!==null?n:li(e.type)||"Memo";case at:n=e._payload,e=e._init;try{return li(e(n))}catch{}}return null}function su(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return li(n);case 8:return n===tl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function wt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function va(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function ru(e){var n=va(e)?"checked":"value",s=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var i=s.get,l=s.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,l.call(this,o)}}),Object.defineProperty(e,n,{enumerable:s.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function ps(e){e._valueTracker||(e._valueTracker=ru(e))}function wa(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var s=n.getValue(),r="";return e&&(r=va(e)?e.checked?"true":"false":e.value),e=r,e!==s?(n.setValue(e),!0):!1}function Us(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function oi(e,n){var s=n.checked;return Q({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:s??e._wrapperState.initialChecked})}function Kl(e,n){var s=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;s=wt(n.value!=null?n.value:s),e._wrapperState={initialChecked:r,initialValue:s,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function ka(e,n){n=n.checked,n!=null&&el(e,"checked",n,!1)}function ai(e,n){ka(e,n);var s=wt(n.value),r=n.type;if(s!=null)r==="number"?(s===0&&e.value===""||e.value!=s)&&(e.value=""+s):e.value!==""+s&&(e.value=""+s);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?ci(e,n.type,s):n.hasOwnProperty("defaultValue")&&ci(e,n.type,wt(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function Yl(e,n,s){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,s||n===e.value||(e.value=n),e.defaultValue=n}s=e.name,s!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,s!==""&&(e.name=s)}function ci(e,n,s){(n!=="number"||Us(e.ownerDocument)!==e)&&(s==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+s&&(e.defaultValue=""+s))}var bn=Array.isArray;function sn(e,n,s,r){if(e=e.options,n){n={};for(var i=0;i<s.length;i++)n["$"+s[i]]=!0;for(s=0;s<e.length;s++)i=n.hasOwnProperty("$"+e[s].value),e[s].selected!==i&&(e[s].selected=i),i&&r&&(e[s].defaultSelected=!0)}else{for(s=""+wt(s),n=null,i=0;i<e.length;i++){if(e[i].value===s){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}n!==null||e[i].disabled||(n=e[i])}n!==null&&(n.selected=!0)}}function di(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(v(91));return Q({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Jl(e,n){var s=n.value;if(s==null){if(s=n.children,n=n.defaultValue,s!=null){if(n!=null)throw Error(v(92));if(bn(s)){if(1<s.length)throw Error(v(93));s=s[0]}n=s}n==null&&(n=""),s=n}e._wrapperState={initialValue:wt(s)}}function Sa(e,n){var s=wt(n.value),r=wt(n.defaultValue);s!=null&&(s=""+s,s!==e.value&&(e.value=s),n.defaultValue==null&&e.defaultValue!==s&&(e.defaultValue=s)),r!=null&&(e.defaultValue=""+r)}function Xl(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function _a(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ui(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?_a(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ys,Ea=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,s,r,i){MSApp.execUnsafeLocalFunction(function(){return e(n,s,r,i)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(ys=ys||document.createElement("div"),ys.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=ys.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function $n(e,n){if(n){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=n;return}}e.textContent=n}var Pn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},iu=["Webkit","ms","Moz","O"];Object.keys(Pn).forEach(function(e){iu.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Pn[n]=Pn[e]})});function Ta(e,n,s){return n==null||typeof n=="boolean"||n===""?"":s||typeof n!="number"||n===0||Pn.hasOwnProperty(e)&&Pn[e]?(""+n).trim():n+"px"}function Ca(e,n){e=e.style;for(var s in n)if(n.hasOwnProperty(s)){var r=s.indexOf("--")===0,i=Ta(s,n[s],r);s==="float"&&(s="cssFloat"),r?e.setProperty(s,i):e[s]=i}}var lu=Q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function hi(e,n){if(n){if(lu[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(v(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(v(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(v(61))}if(n.style!=null&&typeof n.style!="object")throw Error(v(62))}}function fi(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var mi=null;function rl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pi=null,rn=null,ln=null;function Zl(e){if(e=cs(e)){if(typeof pi!="function")throw Error(v(280));var n=e.stateNode;n&&(n=xr(n),pi(e.stateNode,e.type,n))}}function Oa(e){rn?ln?ln.push(e):ln=[e]:rn=e}function La(){if(rn){var e=rn,n=ln;if(ln=rn=null,Zl(e),n)for(e=0;e<n.length;e++)Zl(n[e])}}function ba(e,n){return e(n)}function Da(){}var Dr=!1;function Aa(e,n,s){if(Dr)return e(n,s);Dr=!0;try{return ba(e,n,s)}finally{Dr=!1,(rn!==null||ln!==null)&&(Da(),La())}}function Wn(e,n){var s=e.stateNode;if(s===null)return null;var r=xr(s);if(r===null)return null;s=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(v(231,n,typeof s));return s}var yi=!1;if(nt)try{var kn={};Object.defineProperty(kn,"passive",{get:function(){yi=!0}}),window.addEventListener("test",kn,kn),window.removeEventListener("test",kn,kn)}catch{yi=!1}function ou(e,n,s,r,i,l,o,a,c){var u=Array.prototype.slice.call(arguments,3);try{n.apply(s,u)}catch(m){this.onError(m)}}var Rn=!1,Gs=null,$s=!1,xi=null,au={onError:function(e){Rn=!0,Gs=e}};function cu(e,n,s,r,i,l,o,a,c){Rn=!1,Gs=null,ou.apply(au,arguments)}function du(e,n,s,r,i,l,o,a,c){if(cu.apply(this,arguments),Rn){if(Rn){var u=Gs;Rn=!1,Gs=null}else throw Error(v(198));$s||($s=!0,xi=u)}}function Ut(e){var n=e,s=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(s=n.return),e=n.return;while(e)}return n.tag===3?s:null}function Pa(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function eo(e){if(Ut(e)!==e)throw Error(v(188))}function uu(e){var n=e.alternate;if(!n){if(n=Ut(e),n===null)throw Error(v(188));return n!==e?null:e}for(var s=e,r=n;;){var i=s.return;if(i===null)break;var l=i.alternate;if(l===null){if(r=i.return,r!==null){s=r;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===s)return eo(i),e;if(l===r)return eo(i),n;l=l.sibling}throw Error(v(188))}if(s.return!==r.return)s=i,r=l;else{for(var o=!1,a=i.child;a;){if(a===s){o=!0,s=i,r=l;break}if(a===r){o=!0,r=i,s=l;break}a=a.sibling}if(!o){for(a=l.child;a;){if(a===s){o=!0,s=l,r=i;break}if(a===r){o=!0,r=l,s=i;break}a=a.sibling}if(!o)throw Error(v(189))}}if(s.alternate!==r)throw Error(v(190))}if(s.tag!==3)throw Error(v(188));return s.stateNode.current===s?e:n}function Ra(e){return e=uu(e),e!==null?Ia(e):null}function Ia(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Ia(e);if(n!==null)return n;e=e.sibling}return null}var Ba=Ee.unstable_scheduleCallback,to=Ee.unstable_cancelCallback,hu=Ee.unstable_shouldYield,fu=Ee.unstable_requestPaint,J=Ee.unstable_now,mu=Ee.unstable_getCurrentPriorityLevel,il=Ee.unstable_ImmediatePriority,za=Ee.unstable_UserBlockingPriority,Ws=Ee.unstable_NormalPriority,pu=Ee.unstable_LowPriority,Fa=Ee.unstable_IdlePriority,fr=null,qe=null;function yu(e){if(qe&&typeof qe.onCommitFiberRoot=="function")try{qe.onCommitFiberRoot(fr,e,void 0,(e.current.flags&128)===128)}catch{}}var Me=Math.clz32?Math.clz32:ju,xu=Math.log,gu=Math.LN2;function ju(e){return e>>>=0,e===0?32:31-(xu(e)/gu|0)|0}var xs=64,gs=4194304;function Dn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Vs(e,n){var s=e.pendingLanes;if(s===0)return 0;var r=0,i=e.suspendedLanes,l=e.pingedLanes,o=s&268435455;if(o!==0){var a=o&~i;a!==0?r=Dn(a):(l&=o,l!==0&&(r=Dn(l)))}else o=s&~i,o!==0?r=Dn(o):l!==0&&(r=Dn(l));if(r===0)return 0;if(n!==0&&n!==r&&!(n&i)&&(i=r&-r,l=n&-n,i>=l||i===16&&(l&4194240)!==0))return n;if(r&4&&(r|=s&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)s=31-Me(n),i=1<<s,r|=e[s],n&=~i;return r}function Nu(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vu(e,n){for(var s=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,l=e.pendingLanes;0<l;){var o=31-Me(l),a=1<<o,c=i[o];c===-1?(!(a&s)||a&r)&&(i[o]=Nu(a,n)):c<=n&&(e.expiredLanes|=a),l&=~a}}function gi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ma(){var e=xs;return xs<<=1,!(xs&4194240)&&(xs=64),e}function Ar(e){for(var n=[],s=0;31>s;s++)n.push(e);return n}function os(e,n,s){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Me(n),e[n]=s}function wu(e,n){var s=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<s;){var i=31-Me(s),l=1<<i;n[i]=0,r[i]=-1,e[i]=-1,s&=~l}}function ll(e,n){var s=e.entangledLanes|=n;for(e=e.entanglements;s;){var r=31-Me(s),i=1<<r;i&n|e[r]&n&&(e[r]|=n),s&=~i}}var M=0;function Ha(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Ua,ol,Ga,$a,Wa,ji=!1,js=[],mt=null,pt=null,yt=null,Vn=new Map,qn=new Map,dt=[],ku="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function no(e,n){switch(e){case"focusin":case"focusout":mt=null;break;case"dragenter":case"dragleave":pt=null;break;case"mouseover":case"mouseout":yt=null;break;case"pointerover":case"pointerout":Vn.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":qn.delete(n.pointerId)}}function Sn(e,n,s,r,i,l){return e===null||e.nativeEvent!==l?(e={blockedOn:n,domEventName:s,eventSystemFlags:r,nativeEvent:l,targetContainers:[i]},n!==null&&(n=cs(n),n!==null&&ol(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,i!==null&&n.indexOf(i)===-1&&n.push(i),e)}function Su(e,n,s,r,i){switch(n){case"focusin":return mt=Sn(mt,e,n,s,r,i),!0;case"dragenter":return pt=Sn(pt,e,n,s,r,i),!0;case"mouseover":return yt=Sn(yt,e,n,s,r,i),!0;case"pointerover":var l=i.pointerId;return Vn.set(l,Sn(Vn.get(l)||null,e,n,s,r,i)),!0;case"gotpointercapture":return l=i.pointerId,qn.set(l,Sn(qn.get(l)||null,e,n,s,r,i)),!0}return!1}function Va(e){var n=Lt(e.target);if(n!==null){var s=Ut(n);if(s!==null){if(n=s.tag,n===13){if(n=Pa(s),n!==null){e.blockedOn=n,Wa(e.priority,function(){Ga(s)});return}}else if(n===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ds(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var s=Ni(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(s===null){s=e.nativeEvent;var r=new s.constructor(s.type,s);mi=r,s.target.dispatchEvent(r),mi=null}else return n=cs(s),n!==null&&ol(n),e.blockedOn=s,!1;n.shift()}return!0}function so(e,n,s){Ds(e)&&s.delete(n)}function _u(){ji=!1,mt!==null&&Ds(mt)&&(mt=null),pt!==null&&Ds(pt)&&(pt=null),yt!==null&&Ds(yt)&&(yt=null),Vn.forEach(so),qn.forEach(so)}function _n(e,n){e.blockedOn===n&&(e.blockedOn=null,ji||(ji=!0,Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority,_u)))}function Qn(e){function n(i){return _n(i,e)}if(0<js.length){_n(js[0],e);for(var s=1;s<js.length;s++){var r=js[s];r.blockedOn===e&&(r.blockedOn=null)}}for(mt!==null&&_n(mt,e),pt!==null&&_n(pt,e),yt!==null&&_n(yt,e),Vn.forEach(n),qn.forEach(n),s=0;s<dt.length;s++)r=dt[s],r.blockedOn===e&&(r.blockedOn=null);for(;0<dt.length&&(s=dt[0],s.blockedOn===null);)Va(s),s.blockedOn===null&&dt.shift()}var on=lt.ReactCurrentBatchConfig,qs=!0;function Eu(e,n,s,r){var i=M,l=on.transition;on.transition=null;try{M=1,al(e,n,s,r)}finally{M=i,on.transition=l}}function Tu(e,n,s,r){var i=M,l=on.transition;on.transition=null;try{M=4,al(e,n,s,r)}finally{M=i,on.transition=l}}function al(e,n,s,r){if(qs){var i=Ni(e,n,s,r);if(i===null)Gr(e,n,r,Qs,s),no(e,r);else if(Su(i,e,n,s,r))r.stopPropagation();else if(no(e,r),n&4&&-1<ku.indexOf(e)){for(;i!==null;){var l=cs(i);if(l!==null&&Ua(l),l=Ni(e,n,s,r),l===null&&Gr(e,n,r,Qs,s),l===i)break;i=l}i!==null&&r.stopPropagation()}else Gr(e,n,r,null,s)}}var Qs=null;function Ni(e,n,s,r){if(Qs=null,e=rl(r),e=Lt(e),e!==null)if(n=Ut(e),n===null)e=null;else if(s=n.tag,s===13){if(e=Pa(n),e!==null)return e;e=null}else if(s===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Qs=e,null}function qa(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(mu()){case il:return 1;case za:return 4;case Ws:case pu:return 16;case Fa:return 536870912;default:return 16}default:return 16}}var ht=null,cl=null,As=null;function Qa(){if(As)return As;var e,n=cl,s=n.length,r,i="value"in ht?ht.value:ht.textContent,l=i.length;for(e=0;e<s&&n[e]===i[e];e++);var o=s-e;for(r=1;r<=o&&n[s-r]===i[l-r];r++);return As=i.slice(e,1<r?1-r:void 0)}function Ps(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Ns(){return!0}function ro(){return!1}function Ce(e){function n(s,r,i,l,o){this._reactName=s,this._targetInst=i,this.type=r,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(s=e[a],this[a]=s?s(l):l[a]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Ns:ro,this.isPropagationStopped=ro,this}return Q(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Ns)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Ns)},persist:function(){},isPersistent:Ns}),n}var gn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dl=Ce(gn),as=Q({},gn,{view:0,detail:0}),Cu=Ce(as),Pr,Rr,En,mr=Q({},as,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ul,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==En&&(En&&e.type==="mousemove"?(Pr=e.screenX-En.screenX,Rr=e.screenY-En.screenY):Rr=Pr=0,En=e),Pr)},movementY:function(e){return"movementY"in e?e.movementY:Rr}}),io=Ce(mr),Ou=Q({},mr,{dataTransfer:0}),Lu=Ce(Ou),bu=Q({},as,{relatedTarget:0}),Ir=Ce(bu),Du=Q({},gn,{animationName:0,elapsedTime:0,pseudoElement:0}),Au=Ce(Du),Pu=Q({},gn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ru=Ce(Pu),Iu=Q({},gn,{data:0}),lo=Ce(Iu),Bu={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},zu={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fu={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Mu(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Fu[e])?!!n[e]:!1}function ul(){return Mu}var Hu=Q({},as,{key:function(e){if(e.key){var n=Bu[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Ps(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?zu[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ul,charCode:function(e){return e.type==="keypress"?Ps(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ps(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Uu=Ce(Hu),Gu=Q({},mr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),oo=Ce(Gu),$u=Q({},as,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ul}),Wu=Ce($u),Vu=Q({},gn,{propertyName:0,elapsedTime:0,pseudoElement:0}),qu=Ce(Vu),Qu=Q({},mr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ku=Ce(Qu),Yu=[9,13,27,32],hl=nt&&"CompositionEvent"in window,In=null;nt&&"documentMode"in document&&(In=document.documentMode);var Ju=nt&&"TextEvent"in window&&!In,Ka=nt&&(!hl||In&&8<In&&11>=In),ao=" ",co=!1;function Ya(e,n){switch(e){case"keyup":return Yu.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ja(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qt=!1;function Xu(e,n){switch(e){case"compositionend":return Ja(n);case"keypress":return n.which!==32?null:(co=!0,ao);case"textInput":return e=n.data,e===ao&&co?null:e;default:return null}}function Zu(e,n){if(qt)return e==="compositionend"||!hl&&Ya(e,n)?(e=Qa(),As=cl=ht=null,qt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Ka&&n.locale!=="ko"?null:n.data;default:return null}}var eh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function uo(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!eh[e.type]:n==="textarea"}function Xa(e,n,s,r){Oa(r),n=Ks(n,"onChange"),0<n.length&&(s=new dl("onChange","change",null,s,r),e.push({event:s,listeners:n}))}var Bn=null,Kn=null;function th(e){cc(e,0)}function pr(e){var n=Yt(e);if(wa(n))return e}function nh(e,n){if(e==="change")return n}var Za=!1;if(nt){var Br;if(nt){var zr="oninput"in document;if(!zr){var ho=document.createElement("div");ho.setAttribute("oninput","return;"),zr=typeof ho.oninput=="function"}Br=zr}else Br=!1;Za=Br&&(!document.documentMode||9<document.documentMode)}function fo(){Bn&&(Bn.detachEvent("onpropertychange",ec),Kn=Bn=null)}function ec(e){if(e.propertyName==="value"&&pr(Kn)){var n=[];Xa(n,Kn,e,rl(e)),Aa(th,n)}}function sh(e,n,s){e==="focusin"?(fo(),Bn=n,Kn=s,Bn.attachEvent("onpropertychange",ec)):e==="focusout"&&fo()}function rh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return pr(Kn)}function ih(e,n){if(e==="click")return pr(n)}function lh(e,n){if(e==="input"||e==="change")return pr(n)}function oh(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Ue=typeof Object.is=="function"?Object.is:oh;function Yn(e,n){if(Ue(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var s=Object.keys(e),r=Object.keys(n);if(s.length!==r.length)return!1;for(r=0;r<s.length;r++){var i=s[r];if(!ni.call(n,i)||!Ue(e[i],n[i]))return!1}return!0}function mo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function po(e,n){var s=mo(e);e=0;for(var r;s;){if(s.nodeType===3){if(r=e+s.textContent.length,e<=n&&r>=n)return{node:s,offset:n-e};e=r}e:{for(;s;){if(s.nextSibling){s=s.nextSibling;break e}s=s.parentNode}s=void 0}s=mo(s)}}function tc(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?tc(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function nc(){for(var e=window,n=Us();n instanceof e.HTMLIFrameElement;){try{var s=typeof n.contentWindow.location.href=="string"}catch{s=!1}if(s)e=n.contentWindow;else break;n=Us(e.document)}return n}function fl(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function ah(e){var n=nc(),s=e.focusedElem,r=e.selectionRange;if(n!==s&&s&&s.ownerDocument&&tc(s.ownerDocument.documentElement,s)){if(r!==null&&fl(s)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in s)s.selectionStart=n,s.selectionEnd=Math.min(e,s.value.length);else if(e=(n=s.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var i=s.textContent.length,l=Math.min(r.start,i);r=r.end===void 0?l:Math.min(r.end,i),!e.extend&&l>r&&(i=r,r=l,l=i),i=po(s,l);var o=po(s,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(n=n.createRange(),n.setStart(i.node,i.offset),e.removeAllRanges(),l>r?(e.addRange(n),e.extend(o.node,o.offset)):(n.setEnd(o.node,o.offset),e.addRange(n)))}}for(n=[],e=s;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<n.length;s++)e=n[s],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ch=nt&&"documentMode"in document&&11>=document.documentMode,Qt=null,vi=null,zn=null,wi=!1;function yo(e,n,s){var r=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;wi||Qt==null||Qt!==Us(r)||(r=Qt,"selectionStart"in r&&fl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zn&&Yn(zn,r)||(zn=r,r=Ks(vi,"onSelect"),0<r.length&&(n=new dl("onSelect","select",null,n,s),e.push({event:n,listeners:r}),n.target=Qt)))}function vs(e,n){var s={};return s[e.toLowerCase()]=n.toLowerCase(),s["Webkit"+e]="webkit"+n,s["Moz"+e]="moz"+n,s}var Kt={animationend:vs("Animation","AnimationEnd"),animationiteration:vs("Animation","AnimationIteration"),animationstart:vs("Animation","AnimationStart"),transitionend:vs("Transition","TransitionEnd")},Fr={},sc={};nt&&(sc=document.createElement("div").style,"AnimationEvent"in window||(delete Kt.animationend.animation,delete Kt.animationiteration.animation,delete Kt.animationstart.animation),"TransitionEvent"in window||delete Kt.transitionend.transition);function yr(e){if(Fr[e])return Fr[e];if(!Kt[e])return e;var n=Kt[e],s;for(s in n)if(n.hasOwnProperty(s)&&s in sc)return Fr[e]=n[s];return e}var rc=yr("animationend"),ic=yr("animationiteration"),lc=yr("animationstart"),oc=yr("transitionend"),ac=new Map,xo="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function St(e,n){ac.set(e,n),Ht(n,[e])}for(var Mr=0;Mr<xo.length;Mr++){var Hr=xo[Mr],dh=Hr.toLowerCase(),uh=Hr[0].toUpperCase()+Hr.slice(1);St(dh,"on"+uh)}St(rc,"onAnimationEnd");St(ic,"onAnimationIteration");St(lc,"onAnimationStart");St("dblclick","onDoubleClick");St("focusin","onFocus");St("focusout","onBlur");St(oc,"onTransitionEnd");dn("onMouseEnter",["mouseout","mouseover"]);dn("onMouseLeave",["mouseout","mouseover"]);dn("onPointerEnter",["pointerout","pointerover"]);dn("onPointerLeave",["pointerout","pointerover"]);Ht("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ht("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ht("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ht("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ht("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ht("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var An="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hh=new Set("cancel close invalid load scroll toggle".split(" ").concat(An));function go(e,n,s){var r=e.type||"unknown-event";e.currentTarget=s,du(r,n,void 0,e),e.currentTarget=null}function cc(e,n){n=(n&4)!==0;for(var s=0;s<e.length;s++){var r=e[s],i=r.event;r=r.listeners;e:{var l=void 0;if(n)for(var o=r.length-1;0<=o;o--){var a=r[o],c=a.instance,u=a.currentTarget;if(a=a.listener,c!==l&&i.isPropagationStopped())break e;go(i,a,u),l=c}else for(o=0;o<r.length;o++){if(a=r[o],c=a.instance,u=a.currentTarget,a=a.listener,c!==l&&i.isPropagationStopped())break e;go(i,a,u),l=c}}}if($s)throw e=xi,$s=!1,xi=null,e}function U(e,n){var s=n[Ti];s===void 0&&(s=n[Ti]=new Set);var r=e+"__bubble";s.has(r)||(dc(n,e,2,!1),s.add(r))}function Ur(e,n,s){var r=0;n&&(r|=4),dc(s,e,r,n)}var ws="_reactListening"+Math.random().toString(36).slice(2);function Jn(e){if(!e[ws]){e[ws]=!0,xa.forEach(function(s){s!=="selectionchange"&&(hh.has(s)||Ur(s,!1,e),Ur(s,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[ws]||(n[ws]=!0,Ur("selectionchange",!1,n))}}function dc(e,n,s,r){switch(qa(n)){case 1:var i=Eu;break;case 4:i=Tu;break;default:i=al}s=i.bind(null,n,s,e),i=void 0,!yi||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(n,s,{capture:!0,passive:i}):e.addEventListener(n,s,!0):i!==void 0?e.addEventListener(n,s,{passive:i}):e.addEventListener(n,s,!1)}function Gr(e,n,s,r,i){var l=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;o=o.return}for(;a!==null;){if(o=Lt(a),o===null)return;if(c=o.tag,c===5||c===6){r=l=o;continue e}a=a.parentNode}}r=r.return}Aa(function(){var u=l,m=rl(s),y=[];e:{var p=ac.get(e);if(p!==void 0){var x=dl,w=e;switch(e){case"keypress":if(Ps(s)===0)break e;case"keydown":case"keyup":x=Uu;break;case"focusin":w="focus",x=Ir;break;case"focusout":w="blur",x=Ir;break;case"beforeblur":case"afterblur":x=Ir;break;case"click":if(s.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=io;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Lu;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=Wu;break;case rc:case ic:case lc:x=Au;break;case oc:x=qu;break;case"scroll":x=Cu;break;case"wheel":x=Ku;break;case"copy":case"cut":case"paste":x=Ru;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=oo}var j=(n&4)!==0,L=!j&&e==="scroll",h=j?p!==null?p+"Capture":null:p;j=[];for(var d=u,f;d!==null;){f=d;var g=f.stateNode;if(f.tag===5&&g!==null&&(f=g,h!==null&&(g=Wn(d,h),g!=null&&j.push(Xn(d,g,f)))),L)break;d=d.return}0<j.length&&(p=new x(p,w,null,s,m),y.push({event:p,listeners:j}))}}if(!(n&7)){e:{if(p=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",p&&s!==mi&&(w=s.relatedTarget||s.fromElement)&&(Lt(w)||w[st]))break e;if((x||p)&&(p=m.window===m?m:(p=m.ownerDocument)?p.defaultView||p.parentWindow:window,x?(w=s.relatedTarget||s.toElement,x=u,w=w?Lt(w):null,w!==null&&(L=Ut(w),w!==L||w.tag!==5&&w.tag!==6)&&(w=null)):(x=null,w=u),x!==w)){if(j=io,g="onMouseLeave",h="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(j=oo,g="onPointerLeave",h="onPointerEnter",d="pointer"),L=x==null?p:Yt(x),f=w==null?p:Yt(w),p=new j(g,d+"leave",x,s,m),p.target=L,p.relatedTarget=f,g=null,Lt(m)===u&&(j=new j(h,d+"enter",w,s,m),j.target=f,j.relatedTarget=L,g=j),L=g,x&&w)t:{for(j=x,h=w,d=0,f=j;f;f=$t(f))d++;for(f=0,g=h;g;g=$t(g))f++;for(;0<d-f;)j=$t(j),d--;for(;0<f-d;)h=$t(h),f--;for(;d--;){if(j===h||h!==null&&j===h.alternate)break t;j=$t(j),h=$t(h)}j=null}else j=null;x!==null&&jo(y,p,x,j,!1),w!==null&&L!==null&&jo(y,L,w,j,!0)}}e:{if(p=u?Yt(u):window,x=p.nodeName&&p.nodeName.toLowerCase(),x==="select"||x==="input"&&p.type==="file")var k=nh;else if(uo(p))if(Za)k=lh;else{k=rh;var _=sh}else(x=p.nodeName)&&x.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(k=ih);if(k&&(k=k(e,u))){Xa(y,k,s,m);break e}_&&_(e,p,u),e==="focusout"&&(_=p._wrapperState)&&_.controlled&&p.type==="number"&&ci(p,"number",p.value)}switch(_=u?Yt(u):window,e){case"focusin":(uo(_)||_.contentEditable==="true")&&(Qt=_,vi=u,zn=null);break;case"focusout":zn=vi=Qt=null;break;case"mousedown":wi=!0;break;case"contextmenu":case"mouseup":case"dragend":wi=!1,yo(y,s,m);break;case"selectionchange":if(ch)break;case"keydown":case"keyup":yo(y,s,m)}var S;if(hl)e:{switch(e){case"compositionstart":var O="onCompositionStart";break e;case"compositionend":O="onCompositionEnd";break e;case"compositionupdate":O="onCompositionUpdate";break e}O=void 0}else qt?Ya(e,s)&&(O="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(O="onCompositionStart");O&&(Ka&&s.locale!=="ko"&&(qt||O!=="onCompositionStart"?O==="onCompositionEnd"&&qt&&(S=Qa()):(ht=m,cl="value"in ht?ht.value:ht.textContent,qt=!0)),_=Ks(u,O),0<_.length&&(O=new lo(O,e,null,s,m),y.push({event:O,listeners:_}),S?O.data=S:(S=Ja(s),S!==null&&(O.data=S)))),(S=Ju?Xu(e,s):Zu(e,s))&&(u=Ks(u,"onBeforeInput"),0<u.length&&(m=new lo("onBeforeInput","beforeinput",null,s,m),y.push({event:m,listeners:u}),m.data=S))}cc(y,n)})}function Xn(e,n,s){return{instance:e,listener:n,currentTarget:s}}function Ks(e,n){for(var s=n+"Capture",r=[];e!==null;){var i=e,l=i.stateNode;i.tag===5&&l!==null&&(i=l,l=Wn(e,s),l!=null&&r.unshift(Xn(e,l,i)),l=Wn(e,n),l!=null&&r.push(Xn(e,l,i))),e=e.return}return r}function $t(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function jo(e,n,s,r,i){for(var l=n._reactName,o=[];s!==null&&s!==r;){var a=s,c=a.alternate,u=a.stateNode;if(c!==null&&c===r)break;a.tag===5&&u!==null&&(a=u,i?(c=Wn(s,l),c!=null&&o.unshift(Xn(s,c,a))):i||(c=Wn(s,l),c!=null&&o.push(Xn(s,c,a)))),s=s.return}o.length!==0&&e.push({event:n,listeners:o})}var fh=/\r\n?/g,mh=/\u0000|\uFFFD/g;function No(e){return(typeof e=="string"?e:""+e).replace(fh,`
`).replace(mh,"")}function ks(e,n,s){if(n=No(n),No(e)!==n&&s)throw Error(v(425))}function Ys(){}var ki=null,Si=null;function _i(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ei=typeof setTimeout=="function"?setTimeout:void 0,ph=typeof clearTimeout=="function"?clearTimeout:void 0,vo=typeof Promise=="function"?Promise:void 0,yh=typeof queueMicrotask=="function"?queueMicrotask:typeof vo<"u"?function(e){return vo.resolve(null).then(e).catch(xh)}:Ei;function xh(e){setTimeout(function(){throw e})}function $r(e,n){var s=n,r=0;do{var i=s.nextSibling;if(e.removeChild(s),i&&i.nodeType===8)if(s=i.data,s==="/$"){if(r===0){e.removeChild(i),Qn(n);return}r--}else s!=="$"&&s!=="$?"&&s!=="$!"||r++;s=i}while(s);Qn(n)}function xt(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function wo(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"){if(n===0)return e;n--}else s==="/$"&&n++}e=e.previousSibling}return null}var jn=Math.random().toString(36).slice(2),Ve="__reactFiber$"+jn,Zn="__reactProps$"+jn,st="__reactContainer$"+jn,Ti="__reactEvents$"+jn,gh="__reactListeners$"+jn,jh="__reactHandles$"+jn;function Lt(e){var n=e[Ve];if(n)return n;for(var s=e.parentNode;s;){if(n=s[st]||s[Ve]){if(s=n.alternate,n.child!==null||s!==null&&s.child!==null)for(e=wo(e);e!==null;){if(s=e[Ve])return s;e=wo(e)}return n}e=s,s=e.parentNode}return null}function cs(e){return e=e[Ve]||e[st],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Yt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(v(33))}function xr(e){return e[Zn]||null}var Ci=[],Jt=-1;function _t(e){return{current:e}}function G(e){0>Jt||(e.current=Ci[Jt],Ci[Jt]=null,Jt--)}function H(e,n){Jt++,Ci[Jt]=e.current,e.current=n}var kt={},de=_t(kt),ge=_t(!1),Rt=kt;function un(e,n){var s=e.type.contextTypes;if(!s)return kt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var i={},l;for(l in s)i[l]=n[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=i),i}function je(e){return e=e.childContextTypes,e!=null}function Js(){G(ge),G(de)}function ko(e,n,s){if(de.current!==kt)throw Error(v(168));H(de,n),H(ge,s)}function uc(e,n,s){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return s;r=r.getChildContext();for(var i in r)if(!(i in n))throw Error(v(108,su(e)||"Unknown",i));return Q({},s,r)}function Xs(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||kt,Rt=de.current,H(de,e),H(ge,ge.current),!0}function So(e,n,s){var r=e.stateNode;if(!r)throw Error(v(169));s?(e=uc(e,n,Rt),r.__reactInternalMemoizedMergedChildContext=e,G(ge),G(de),H(de,e)):G(ge),H(ge,s)}var Xe=null,gr=!1,Wr=!1;function hc(e){Xe===null?Xe=[e]:Xe.push(e)}function Nh(e){gr=!0,hc(e)}function Et(){if(!Wr&&Xe!==null){Wr=!0;var e=0,n=M;try{var s=Xe;for(M=1;e<s.length;e++){var r=s[e];do r=r(!0);while(r!==null)}Xe=null,gr=!1}catch(i){throw Xe!==null&&(Xe=Xe.slice(e+1)),Ba(il,Et),i}finally{M=n,Wr=!1}}return null}var Xt=[],Zt=0,Zs=null,er=0,Le=[],be=0,It=null,Ze=1,et="";function Ct(e,n){Xt[Zt++]=er,Xt[Zt++]=Zs,Zs=e,er=n}function fc(e,n,s){Le[be++]=Ze,Le[be++]=et,Le[be++]=It,It=e;var r=Ze;e=et;var i=32-Me(r)-1;r&=~(1<<i),s+=1;var l=32-Me(n)+i;if(30<l){var o=i-i%5;l=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ze=1<<32-Me(n)+i|s<<i|r,et=l+e}else Ze=1<<l|s<<i|r,et=e}function ml(e){e.return!==null&&(Ct(e,1),fc(e,1,0))}function pl(e){for(;e===Zs;)Zs=Xt[--Zt],Xt[Zt]=null,er=Xt[--Zt],Xt[Zt]=null;for(;e===It;)It=Le[--be],Le[be]=null,et=Le[--be],Le[be]=null,Ze=Le[--be],Le[be]=null}var _e=null,Se=null,W=!1,Fe=null;function mc(e,n){var s=De(5,null,null,0);s.elementType="DELETED",s.stateNode=n,s.return=e,n=e.deletions,n===null?(e.deletions=[s],e.flags|=16):n.push(s)}function _o(e,n){switch(e.tag){case 5:var s=e.type;return n=n.nodeType!==1||s.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,_e=e,Se=xt(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,_e=e,Se=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(s=It!==null?{id:Ze,overflow:et}:null,e.memoizedState={dehydrated:n,treeContext:s,retryLane:1073741824},s=De(18,null,null,0),s.stateNode=n,s.return=e,e.child=s,_e=e,Se=null,!0):!1;default:return!1}}function Oi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Li(e){if(W){var n=Se;if(n){var s=n;if(!_o(e,n)){if(Oi(e))throw Error(v(418));n=xt(s.nextSibling);var r=_e;n&&_o(e,n)?mc(r,s):(e.flags=e.flags&-4097|2,W=!1,_e=e)}}else{if(Oi(e))throw Error(v(418));e.flags=e.flags&-4097|2,W=!1,_e=e}}}function Eo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;_e=e}function Ss(e){if(e!==_e)return!1;if(!W)return Eo(e),W=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!_i(e.type,e.memoizedProps)),n&&(n=Se)){if(Oi(e))throw pc(),Error(v(418));for(;n;)mc(e,n),n=xt(n.nextSibling)}if(Eo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(v(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"){if(n===0){Se=xt(e.nextSibling);break e}n--}else s!=="$"&&s!=="$!"&&s!=="$?"||n++}e=e.nextSibling}Se=null}}else Se=_e?xt(e.stateNode.nextSibling):null;return!0}function pc(){for(var e=Se;e;)e=xt(e.nextSibling)}function hn(){Se=_e=null,W=!1}function yl(e){Fe===null?Fe=[e]:Fe.push(e)}var vh=lt.ReactCurrentBatchConfig;function Tn(e,n,s){if(e=s.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(s._owner){if(s=s._owner,s){if(s.tag!==1)throw Error(v(309));var r=s.stateNode}if(!r)throw Error(v(147,e));var i=r,l=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===l?n.ref:(n=function(o){var a=i.refs;o===null?delete a[l]:a[l]=o},n._stringRef=l,n)}if(typeof e!="string")throw Error(v(284));if(!s._owner)throw Error(v(290,e))}return e}function _s(e,n){throw e=Object.prototype.toString.call(n),Error(v(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function To(e){var n=e._init;return n(e._payload)}function yc(e){function n(h,d){if(e){var f=h.deletions;f===null?(h.deletions=[d],h.flags|=16):f.push(d)}}function s(h,d){if(!e)return null;for(;d!==null;)n(h,d),d=d.sibling;return null}function r(h,d){for(h=new Map;d!==null;)d.key!==null?h.set(d.key,d):h.set(d.index,d),d=d.sibling;return h}function i(h,d){return h=vt(h,d),h.index=0,h.sibling=null,h}function l(h,d,f){return h.index=f,e?(f=h.alternate,f!==null?(f=f.index,f<d?(h.flags|=2,d):f):(h.flags|=2,d)):(h.flags|=1048576,d)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function a(h,d,f,g){return d===null||d.tag!==6?(d=Xr(f,h.mode,g),d.return=h,d):(d=i(d,f),d.return=h,d)}function c(h,d,f,g){var k=f.type;return k===Vt?m(h,d,f.props.children,g,f.key):d!==null&&(d.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===at&&To(k)===d.type)?(g=i(d,f.props),g.ref=Tn(h,d,f),g.return=h,g):(g=Hs(f.type,f.key,f.props,null,h.mode,g),g.ref=Tn(h,d,f),g.return=h,g)}function u(h,d,f,g){return d===null||d.tag!==4||d.stateNode.containerInfo!==f.containerInfo||d.stateNode.implementation!==f.implementation?(d=Zr(f,h.mode,g),d.return=h,d):(d=i(d,f.children||[]),d.return=h,d)}function m(h,d,f,g,k){return d===null||d.tag!==7?(d=Pt(f,h.mode,g,k),d.return=h,d):(d=i(d,f),d.return=h,d)}function y(h,d,f){if(typeof d=="string"&&d!==""||typeof d=="number")return d=Xr(""+d,h.mode,f),d.return=h,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case ms:return f=Hs(d.type,d.key,d.props,null,h.mode,f),f.ref=Tn(h,null,d),f.return=h,f;case Wt:return d=Zr(d,h.mode,f),d.return=h,d;case at:var g=d._init;return y(h,g(d._payload),f)}if(bn(d)||wn(d))return d=Pt(d,h.mode,f,null),d.return=h,d;_s(h,d)}return null}function p(h,d,f,g){var k=d!==null?d.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return k!==null?null:a(h,d,""+f,g);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ms:return f.key===k?c(h,d,f,g):null;case Wt:return f.key===k?u(h,d,f,g):null;case at:return k=f._init,p(h,d,k(f._payload),g)}if(bn(f)||wn(f))return k!==null?null:m(h,d,f,g,null);_s(h,f)}return null}function x(h,d,f,g,k){if(typeof g=="string"&&g!==""||typeof g=="number")return h=h.get(f)||null,a(d,h,""+g,k);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ms:return h=h.get(g.key===null?f:g.key)||null,c(d,h,g,k);case Wt:return h=h.get(g.key===null?f:g.key)||null,u(d,h,g,k);case at:var _=g._init;return x(h,d,f,_(g._payload),k)}if(bn(g)||wn(g))return h=h.get(f)||null,m(d,h,g,k,null);_s(d,g)}return null}function w(h,d,f,g){for(var k=null,_=null,S=d,O=d=0,F=null;S!==null&&O<f.length;O++){S.index>O?(F=S,S=null):F=S.sibling;var b=p(h,S,f[O],g);if(b===null){S===null&&(S=F);break}e&&S&&b.alternate===null&&n(h,S),d=l(b,d,O),_===null?k=b:_.sibling=b,_=b,S=F}if(O===f.length)return s(h,S),W&&Ct(h,O),k;if(S===null){for(;O<f.length;O++)S=y(h,f[O],g),S!==null&&(d=l(S,d,O),_===null?k=S:_.sibling=S,_=S);return W&&Ct(h,O),k}for(S=r(h,S);O<f.length;O++)F=x(S,h,O,f[O],g),F!==null&&(e&&F.alternate!==null&&S.delete(F.key===null?O:F.key),d=l(F,d,O),_===null?k=F:_.sibling=F,_=F);return e&&S.forEach(function(X){return n(h,X)}),W&&Ct(h,O),k}function j(h,d,f,g){var k=wn(f);if(typeof k!="function")throw Error(v(150));if(f=k.call(f),f==null)throw Error(v(151));for(var _=k=null,S=d,O=d=0,F=null,b=f.next();S!==null&&!b.done;O++,b=f.next()){S.index>O?(F=S,S=null):F=S.sibling;var X=p(h,S,b.value,g);if(X===null){S===null&&(S=F);break}e&&S&&X.alternate===null&&n(h,S),d=l(X,d,O),_===null?k=X:_.sibling=X,_=X,S=F}if(b.done)return s(h,S),W&&Ct(h,O),k;if(S===null){for(;!b.done;O++,b=f.next())b=y(h,b.value,g),b!==null&&(d=l(b,d,O),_===null?k=b:_.sibling=b,_=b);return W&&Ct(h,O),k}for(S=r(h,S);!b.done;O++,b=f.next())b=x(S,h,O,b.value,g),b!==null&&(e&&b.alternate!==null&&S.delete(b.key===null?O:b.key),d=l(b,d,O),_===null?k=b:_.sibling=b,_=b);return e&&S.forEach(function(ve){return n(h,ve)}),W&&Ct(h,O),k}function L(h,d,f,g){if(typeof f=="object"&&f!==null&&f.type===Vt&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case ms:e:{for(var k=f.key,_=d;_!==null;){if(_.key===k){if(k=f.type,k===Vt){if(_.tag===7){s(h,_.sibling),d=i(_,f.props.children),d.return=h,h=d;break e}}else if(_.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===at&&To(k)===_.type){s(h,_.sibling),d=i(_,f.props),d.ref=Tn(h,_,f),d.return=h,h=d;break e}s(h,_);break}else n(h,_);_=_.sibling}f.type===Vt?(d=Pt(f.props.children,h.mode,g,f.key),d.return=h,h=d):(g=Hs(f.type,f.key,f.props,null,h.mode,g),g.ref=Tn(h,d,f),g.return=h,h=g)}return o(h);case Wt:e:{for(_=f.key;d!==null;){if(d.key===_)if(d.tag===4&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){s(h,d.sibling),d=i(d,f.children||[]),d.return=h,h=d;break e}else{s(h,d);break}else n(h,d);d=d.sibling}d=Zr(f,h.mode,g),d.return=h,h=d}return o(h);case at:return _=f._init,L(h,d,_(f._payload),g)}if(bn(f))return w(h,d,f,g);if(wn(f))return j(h,d,f,g);_s(h,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,d!==null&&d.tag===6?(s(h,d.sibling),d=i(d,f),d.return=h,h=d):(s(h,d),d=Xr(f,h.mode,g),d.return=h,h=d),o(h)):s(h,d)}return L}var fn=yc(!0),xc=yc(!1),tr=_t(null),nr=null,en=null,xl=null;function gl(){xl=en=nr=null}function jl(e){var n=tr.current;G(tr),e._currentValue=n}function bi(e,n,s){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===s)break;e=e.return}}function an(e,n){nr=e,xl=en=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(xe=!0),e.firstContext=null)}function Pe(e){var n=e._currentValue;if(xl!==e)if(e={context:e,memoizedValue:n,next:null},en===null){if(nr===null)throw Error(v(308));en=e,nr.dependencies={lanes:0,firstContext:e}}else en=en.next=e;return n}var bt=null;function Nl(e){bt===null?bt=[e]:bt.push(e)}function gc(e,n,s,r){var i=n.interleaved;return i===null?(s.next=s,Nl(n)):(s.next=i.next,i.next=s),n.interleaved=s,rt(e,r)}function rt(e,n){e.lanes|=n;var s=e.alternate;for(s!==null&&(s.lanes|=n),s=e,e=e.return;e!==null;)e.childLanes|=n,s=e.alternate,s!==null&&(s.childLanes|=n),s=e,e=e.return;return s.tag===3?s.stateNode:null}var ct=!1;function vl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function jc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function tt(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function gt(e,n,s){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,z&2){var i=r.pending;return i===null?n.next=n:(n.next=i.next,i.next=n),r.pending=n,rt(e,s)}return i=r.interleaved,i===null?(n.next=n,Nl(r)):(n.next=i.next,i.next=n),r.interleaved=n,rt(e,s)}function Rs(e,n,s){if(n=n.updateQueue,n!==null&&(n=n.shared,(s&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,s|=r,n.lanes=s,ll(e,s)}}function Co(e,n){var s=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,s===r)){var i=null,l=null;if(s=s.firstBaseUpdate,s!==null){do{var o={eventTime:s.eventTime,lane:s.lane,tag:s.tag,payload:s.payload,callback:s.callback,next:null};l===null?i=l=o:l=l.next=o,s=s.next}while(s!==null);l===null?i=l=n:l=l.next=n}else i=l=n;s={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=n:e.next=n,s.lastBaseUpdate=n}function sr(e,n,s,r){var i=e.updateQueue;ct=!1;var l=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var c=a,u=c.next;c.next=null,o===null?l=u:o.next=u,o=c;var m=e.alternate;m!==null&&(m=m.updateQueue,a=m.lastBaseUpdate,a!==o&&(a===null?m.firstBaseUpdate=u:a.next=u,m.lastBaseUpdate=c))}if(l!==null){var y=i.baseState;o=0,m=u=c=null,a=l;do{var p=a.lane,x=a.eventTime;if((r&p)===p){m!==null&&(m=m.next={eventTime:x,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var w=e,j=a;switch(p=n,x=s,j.tag){case 1:if(w=j.payload,typeof w=="function"){y=w.call(x,y,p);break e}y=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=j.payload,p=typeof w=="function"?w.call(x,y,p):w,p==null)break e;y=Q({},y,p);break e;case 2:ct=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[a]:p.push(a))}else x={eventTime:x,lane:p,tag:a.tag,payload:a.payload,callback:a.callback,next:null},m===null?(u=m=x,c=y):m=m.next=x,o|=p;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;p=a,a=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(m===null&&(c=y),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=m,n=i.shared.interleaved,n!==null){i=n;do o|=i.lane,i=i.next;while(i!==n)}else l===null&&(i.shared.lanes=0);zt|=o,e.lanes=o,e.memoizedState=y}}function Oo(e,n,s){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],i=r.callback;if(i!==null){if(r.callback=null,r=s,typeof i!="function")throw Error(v(191,i));i.call(r)}}}var ds={},Qe=_t(ds),es=_t(ds),ts=_t(ds);function Dt(e){if(e===ds)throw Error(v(174));return e}function wl(e,n){switch(H(ts,n),H(es,e),H(Qe,ds),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:ui(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=ui(n,e)}G(Qe),H(Qe,n)}function mn(){G(Qe),G(es),G(ts)}function Nc(e){Dt(ts.current);var n=Dt(Qe.current),s=ui(n,e.type);n!==s&&(H(es,e),H(Qe,s))}function kl(e){es.current===e&&(G(Qe),G(es))}var V=_t(0);function rr(e){for(var n=e;n!==null;){if(n.tag===13){var s=n.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||s.data==="$?"||s.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Vr=[];function Sl(){for(var e=0;e<Vr.length;e++)Vr[e]._workInProgressVersionPrimary=null;Vr.length=0}var Is=lt.ReactCurrentDispatcher,qr=lt.ReactCurrentBatchConfig,Bt=0,q=null,ee=null,ne=null,ir=!1,Fn=!1,ns=0,wh=0;function oe(){throw Error(v(321))}function _l(e,n){if(n===null)return!1;for(var s=0;s<n.length&&s<e.length;s++)if(!Ue(e[s],n[s]))return!1;return!0}function El(e,n,s,r,i,l){if(Bt=l,q=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Is.current=e===null||e.memoizedState===null?Eh:Th,e=s(r,i),Fn){l=0;do{if(Fn=!1,ns=0,25<=l)throw Error(v(301));l+=1,ne=ee=null,n.updateQueue=null,Is.current=Ch,e=s(r,i)}while(Fn)}if(Is.current=lr,n=ee!==null&&ee.next!==null,Bt=0,ne=ee=q=null,ir=!1,n)throw Error(v(300));return e}function Tl(){var e=ns!==0;return ns=0,e}function We(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ne===null?q.memoizedState=ne=e:ne=ne.next=e,ne}function Re(){if(ee===null){var e=q.alternate;e=e!==null?e.memoizedState:null}else e=ee.next;var n=ne===null?q.memoizedState:ne.next;if(n!==null)ne=n,ee=e;else{if(e===null)throw Error(v(310));ee=e,e={memoizedState:ee.memoizedState,baseState:ee.baseState,baseQueue:ee.baseQueue,queue:ee.queue,next:null},ne===null?q.memoizedState=ne=e:ne=ne.next=e}return ne}function ss(e,n){return typeof n=="function"?n(e):n}function Qr(e){var n=Re(),s=n.queue;if(s===null)throw Error(v(311));s.lastRenderedReducer=e;var r=ee,i=r.baseQueue,l=s.pending;if(l!==null){if(i!==null){var o=i.next;i.next=l.next,l.next=o}r.baseQueue=i=l,s.pending=null}if(i!==null){l=i.next,r=r.baseState;var a=o=null,c=null,u=l;do{var m=u.lane;if((Bt&m)===m)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var y={lane:m,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(a=c=y,o=r):c=c.next=y,q.lanes|=m,zt|=m}u=u.next}while(u!==null&&u!==l);c===null?o=r:c.next=a,Ue(r,n.memoizedState)||(xe=!0),n.memoizedState=r,n.baseState=o,n.baseQueue=c,s.lastRenderedState=r}if(e=s.interleaved,e!==null){i=e;do l=i.lane,q.lanes|=l,zt|=l,i=i.next;while(i!==e)}else i===null&&(s.lanes=0);return[n.memoizedState,s.dispatch]}function Kr(e){var n=Re(),s=n.queue;if(s===null)throw Error(v(311));s.lastRenderedReducer=e;var r=s.dispatch,i=s.pending,l=n.memoizedState;if(i!==null){s.pending=null;var o=i=i.next;do l=e(l,o.action),o=o.next;while(o!==i);Ue(l,n.memoizedState)||(xe=!0),n.memoizedState=l,n.baseQueue===null&&(n.baseState=l),s.lastRenderedState=l}return[l,r]}function vc(){}function wc(e,n){var s=q,r=Re(),i=n(),l=!Ue(r.memoizedState,i);if(l&&(r.memoizedState=i,xe=!0),r=r.queue,Cl(_c.bind(null,s,r,e),[e]),r.getSnapshot!==n||l||ne!==null&&ne.memoizedState.tag&1){if(s.flags|=2048,rs(9,Sc.bind(null,s,r,i,n),void 0,null),se===null)throw Error(v(349));Bt&30||kc(s,n,i)}return i}function kc(e,n,s){e.flags|=16384,e={getSnapshot:n,value:s},n=q.updateQueue,n===null?(n={lastEffect:null,stores:null},q.updateQueue=n,n.stores=[e]):(s=n.stores,s===null?n.stores=[e]:s.push(e))}function Sc(e,n,s,r){n.value=s,n.getSnapshot=r,Ec(n)&&Tc(e)}function _c(e,n,s){return s(function(){Ec(n)&&Tc(e)})}function Ec(e){var n=e.getSnapshot;e=e.value;try{var s=n();return!Ue(e,s)}catch{return!0}}function Tc(e){var n=rt(e,1);n!==null&&He(n,e,1,-1)}function Lo(e){var n=We();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ss,lastRenderedState:e},n.queue=e,e=e.dispatch=_h.bind(null,q,e),[n.memoizedState,e]}function rs(e,n,s,r){return e={tag:e,create:n,destroy:s,deps:r,next:null},n=q.updateQueue,n===null?(n={lastEffect:null,stores:null},q.updateQueue=n,n.lastEffect=e.next=e):(s=n.lastEffect,s===null?n.lastEffect=e.next=e:(r=s.next,s.next=e,e.next=r,n.lastEffect=e)),e}function Cc(){return Re().memoizedState}function Bs(e,n,s,r){var i=We();q.flags|=e,i.memoizedState=rs(1|n,s,void 0,r===void 0?null:r)}function jr(e,n,s,r){var i=Re();r=r===void 0?null:r;var l=void 0;if(ee!==null){var o=ee.memoizedState;if(l=o.destroy,r!==null&&_l(r,o.deps)){i.memoizedState=rs(n,s,l,r);return}}q.flags|=e,i.memoizedState=rs(1|n,s,l,r)}function bo(e,n){return Bs(8390656,8,e,n)}function Cl(e,n){return jr(2048,8,e,n)}function Oc(e,n){return jr(4,2,e,n)}function Lc(e,n){return jr(4,4,e,n)}function bc(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Dc(e,n,s){return s=s!=null?s.concat([e]):null,jr(4,4,bc.bind(null,n,e),s)}function Ol(){}function Ac(e,n){var s=Re();n=n===void 0?null:n;var r=s.memoizedState;return r!==null&&n!==null&&_l(n,r[1])?r[0]:(s.memoizedState=[e,n],e)}function Pc(e,n){var s=Re();n=n===void 0?null:n;var r=s.memoizedState;return r!==null&&n!==null&&_l(n,r[1])?r[0]:(e=e(),s.memoizedState=[e,n],e)}function Rc(e,n,s){return Bt&21?(Ue(s,n)||(s=Ma(),q.lanes|=s,zt|=s,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,xe=!0),e.memoizedState=s)}function kh(e,n){var s=M;M=s!==0&&4>s?s:4,e(!0);var r=qr.transition;qr.transition={};try{e(!1),n()}finally{M=s,qr.transition=r}}function Ic(){return Re().memoizedState}function Sh(e,n,s){var r=Nt(e);if(s={lane:r,action:s,hasEagerState:!1,eagerState:null,next:null},Bc(e))zc(n,s);else if(s=gc(e,n,s,r),s!==null){var i=he();He(s,e,r,i),Fc(s,n,r)}}function _h(e,n,s){var r=Nt(e),i={lane:r,action:s,hasEagerState:!1,eagerState:null,next:null};if(Bc(e))zc(n,i);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=n.lastRenderedReducer,l!==null))try{var o=n.lastRenderedState,a=l(o,s);if(i.hasEagerState=!0,i.eagerState=a,Ue(a,o)){var c=n.interleaved;c===null?(i.next=i,Nl(n)):(i.next=c.next,c.next=i),n.interleaved=i;return}}catch{}finally{}s=gc(e,n,i,r),s!==null&&(i=he(),He(s,e,r,i),Fc(s,n,r))}}function Bc(e){var n=e.alternate;return e===q||n!==null&&n===q}function zc(e,n){Fn=ir=!0;var s=e.pending;s===null?n.next=n:(n.next=s.next,s.next=n),e.pending=n}function Fc(e,n,s){if(s&4194240){var r=n.lanes;r&=e.pendingLanes,s|=r,n.lanes=s,ll(e,s)}}var lr={readContext:Pe,useCallback:oe,useContext:oe,useEffect:oe,useImperativeHandle:oe,useInsertionEffect:oe,useLayoutEffect:oe,useMemo:oe,useReducer:oe,useRef:oe,useState:oe,useDebugValue:oe,useDeferredValue:oe,useTransition:oe,useMutableSource:oe,useSyncExternalStore:oe,useId:oe,unstable_isNewReconciler:!1},Eh={readContext:Pe,useCallback:function(e,n){return We().memoizedState=[e,n===void 0?null:n],e},useContext:Pe,useEffect:bo,useImperativeHandle:function(e,n,s){return s=s!=null?s.concat([e]):null,Bs(4194308,4,bc.bind(null,n,e),s)},useLayoutEffect:function(e,n){return Bs(4194308,4,e,n)},useInsertionEffect:function(e,n){return Bs(4,2,e,n)},useMemo:function(e,n){var s=We();return n=n===void 0?null:n,e=e(),s.memoizedState=[e,n],e},useReducer:function(e,n,s){var r=We();return n=s!==void 0?s(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=Sh.bind(null,q,e),[r.memoizedState,e]},useRef:function(e){var n=We();return e={current:e},n.memoizedState=e},useState:Lo,useDebugValue:Ol,useDeferredValue:function(e){return We().memoizedState=e},useTransition:function(){var e=Lo(!1),n=e[0];return e=kh.bind(null,e[1]),We().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,s){var r=q,i=We();if(W){if(s===void 0)throw Error(v(407));s=s()}else{if(s=n(),se===null)throw Error(v(349));Bt&30||kc(r,n,s)}i.memoizedState=s;var l={value:s,getSnapshot:n};return i.queue=l,bo(_c.bind(null,r,l,e),[e]),r.flags|=2048,rs(9,Sc.bind(null,r,l,s,n),void 0,null),s},useId:function(){var e=We(),n=se.identifierPrefix;if(W){var s=et,r=Ze;s=(r&~(1<<32-Me(r)-1)).toString(32)+s,n=":"+n+"R"+s,s=ns++,0<s&&(n+="H"+s.toString(32)),n+=":"}else s=wh++,n=":"+n+"r"+s.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},Th={readContext:Pe,useCallback:Ac,useContext:Pe,useEffect:Cl,useImperativeHandle:Dc,useInsertionEffect:Oc,useLayoutEffect:Lc,useMemo:Pc,useReducer:Qr,useRef:Cc,useState:function(){return Qr(ss)},useDebugValue:Ol,useDeferredValue:function(e){var n=Re();return Rc(n,ee.memoizedState,e)},useTransition:function(){var e=Qr(ss)[0],n=Re().memoizedState;return[e,n]},useMutableSource:vc,useSyncExternalStore:wc,useId:Ic,unstable_isNewReconciler:!1},Ch={readContext:Pe,useCallback:Ac,useContext:Pe,useEffect:Cl,useImperativeHandle:Dc,useInsertionEffect:Oc,useLayoutEffect:Lc,useMemo:Pc,useReducer:Kr,useRef:Cc,useState:function(){return Kr(ss)},useDebugValue:Ol,useDeferredValue:function(e){var n=Re();return ee===null?n.memoizedState=e:Rc(n,ee.memoizedState,e)},useTransition:function(){var e=Kr(ss)[0],n=Re().memoizedState;return[e,n]},useMutableSource:vc,useSyncExternalStore:wc,useId:Ic,unstable_isNewReconciler:!1};function Be(e,n){if(e&&e.defaultProps){n=Q({},n),e=e.defaultProps;for(var s in e)n[s]===void 0&&(n[s]=e[s]);return n}return n}function Di(e,n,s,r){n=e.memoizedState,s=s(r,n),s=s==null?n:Q({},n,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Nr={isMounted:function(e){return(e=e._reactInternals)?Ut(e)===e:!1},enqueueSetState:function(e,n,s){e=e._reactInternals;var r=he(),i=Nt(e),l=tt(r,i);l.payload=n,s!=null&&(l.callback=s),n=gt(e,l,i),n!==null&&(He(n,e,i,r),Rs(n,e,i))},enqueueReplaceState:function(e,n,s){e=e._reactInternals;var r=he(),i=Nt(e),l=tt(r,i);l.tag=1,l.payload=n,s!=null&&(l.callback=s),n=gt(e,l,i),n!==null&&(He(n,e,i,r),Rs(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var s=he(),r=Nt(e),i=tt(s,r);i.tag=2,n!=null&&(i.callback=n),n=gt(e,i,r),n!==null&&(He(n,e,r,s),Rs(n,e,r))}};function Do(e,n,s,r,i,l,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,o):n.prototype&&n.prototype.isPureReactComponent?!Yn(s,r)||!Yn(i,l):!0}function Mc(e,n,s){var r=!1,i=kt,l=n.contextType;return typeof l=="object"&&l!==null?l=Pe(l):(i=je(n)?Rt:de.current,r=n.contextTypes,l=(r=r!=null)?un(e,i):kt),n=new n(s,l),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Nr,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=l),n}function Ao(e,n,s,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(s,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(s,r),n.state!==e&&Nr.enqueueReplaceState(n,n.state,null)}function Ai(e,n,s,r){var i=e.stateNode;i.props=s,i.state=e.memoizedState,i.refs={},vl(e);var l=n.contextType;typeof l=="object"&&l!==null?i.context=Pe(l):(l=je(n)?Rt:de.current,i.context=un(e,l)),i.state=e.memoizedState,l=n.getDerivedStateFromProps,typeof l=="function"&&(Di(e,n,l,s),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(n=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),n!==i.state&&Nr.enqueueReplaceState(i,i.state,null),sr(e,s,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function pn(e,n){try{var s="",r=n;do s+=nu(r),r=r.return;while(r);var i=s}catch(l){i=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:n,stack:i,digest:null}}function Yr(e,n,s){return{value:e,source:null,stack:s??null,digest:n??null}}function Pi(e,n){try{console.error(n.value)}catch(s){setTimeout(function(){throw s})}}var Oh=typeof WeakMap=="function"?WeakMap:Map;function Hc(e,n,s){s=tt(-1,s),s.tag=3,s.payload={element:null};var r=n.value;return s.callback=function(){ar||(ar=!0,$i=r),Pi(e,n)},s}function Uc(e,n,s){s=tt(-1,s),s.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=n.value;s.payload=function(){return r(i)},s.callback=function(){Pi(e,n)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(s.callback=function(){Pi(e,n),typeof r!="function"&&(jt===null?jt=new Set([this]):jt.add(this));var o=n.stack;this.componentDidCatch(n.value,{componentStack:o!==null?o:""})}),s}function Po(e,n,s){var r=e.pingCache;if(r===null){r=e.pingCache=new Oh;var i=new Set;r.set(n,i)}else i=r.get(n),i===void 0&&(i=new Set,r.set(n,i));i.has(s)||(i.add(s),e=Gh.bind(null,e,n,s),n.then(e,e))}function Ro(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Io(e,n,s,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===n?e.flags|=65536:(e.flags|=128,s.flags|=131072,s.flags&=-52805,s.tag===1&&(s.alternate===null?s.tag=17:(n=tt(-1,1),n.tag=2,gt(s,n,1))),s.lanes|=1),e)}var Lh=lt.ReactCurrentOwner,xe=!1;function ue(e,n,s,r){n.child=e===null?xc(n,null,s,r):fn(n,e.child,s,r)}function Bo(e,n,s,r,i){s=s.render;var l=n.ref;return an(n,i),r=El(e,n,s,r,l,i),s=Tl(),e!==null&&!xe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,it(e,n,i)):(W&&s&&ml(n),n.flags|=1,ue(e,n,r,i),n.child)}function zo(e,n,s,r,i){if(e===null){var l=s.type;return typeof l=="function"&&!Bl(l)&&l.defaultProps===void 0&&s.compare===null&&s.defaultProps===void 0?(n.tag=15,n.type=l,Gc(e,n,l,r,i)):(e=Hs(s.type,null,r,n,n.mode,i),e.ref=n.ref,e.return=n,n.child=e)}if(l=e.child,!(e.lanes&i)){var o=l.memoizedProps;if(s=s.compare,s=s!==null?s:Yn,s(o,r)&&e.ref===n.ref)return it(e,n,i)}return n.flags|=1,e=vt(l,r),e.ref=n.ref,e.return=n,n.child=e}function Gc(e,n,s,r,i){if(e!==null){var l=e.memoizedProps;if(Yn(l,r)&&e.ref===n.ref)if(xe=!1,n.pendingProps=r=l,(e.lanes&i)!==0)e.flags&131072&&(xe=!0);else return n.lanes=e.lanes,it(e,n,i)}return Ri(e,n,s,r,i)}function $c(e,n,s){var r=n.pendingProps,i=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},H(nn,we),we|=s;else{if(!(s&1073741824))return e=l!==null?l.baseLanes|s:s,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,H(nn,we),we|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:s,H(nn,we),we|=r}else l!==null?(r=l.baseLanes|s,n.memoizedState=null):r=s,H(nn,we),we|=r;return ue(e,n,i,s),n.child}function Wc(e,n){var s=n.ref;(e===null&&s!==null||e!==null&&e.ref!==s)&&(n.flags|=512,n.flags|=2097152)}function Ri(e,n,s,r,i){var l=je(s)?Rt:de.current;return l=un(n,l),an(n,i),s=El(e,n,s,r,l,i),r=Tl(),e!==null&&!xe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,it(e,n,i)):(W&&r&&ml(n),n.flags|=1,ue(e,n,s,i),n.child)}function Fo(e,n,s,r,i){if(je(s)){var l=!0;Xs(n)}else l=!1;if(an(n,i),n.stateNode===null)zs(e,n),Mc(n,s,r),Ai(n,s,r,i),r=!0;else if(e===null){var o=n.stateNode,a=n.memoizedProps;o.props=a;var c=o.context,u=s.contextType;typeof u=="object"&&u!==null?u=Pe(u):(u=je(s)?Rt:de.current,u=un(n,u));var m=s.getDerivedStateFromProps,y=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";y||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||c!==u)&&Ao(n,o,r,u),ct=!1;var p=n.memoizedState;o.state=p,sr(n,r,o,i),c=n.memoizedState,a!==r||p!==c||ge.current||ct?(typeof m=="function"&&(Di(n,s,m,r),c=n.memoizedState),(a=ct||Do(n,s,a,r,p,c,u))?(y||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(n.flags|=4194308)):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=c),o.props=r,o.state=c,o.context=u,r=a):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{o=n.stateNode,jc(e,n),a=n.memoizedProps,u=n.type===n.elementType?a:Be(n.type,a),o.props=u,y=n.pendingProps,p=o.context,c=s.contextType,typeof c=="object"&&c!==null?c=Pe(c):(c=je(s)?Rt:de.current,c=un(n,c));var x=s.getDerivedStateFromProps;(m=typeof x=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==y||p!==c)&&Ao(n,o,r,c),ct=!1,p=n.memoizedState,o.state=p,sr(n,r,o,i);var w=n.memoizedState;a!==y||p!==w||ge.current||ct?(typeof x=="function"&&(Di(n,s,x,r),w=n.memoizedState),(u=ct||Do(n,s,u,r,p,w,c)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,w,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,w,c)),typeof o.componentDidUpdate=="function"&&(n.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=w),o.props=r,o.state=w,o.context=c,r=u):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),r=!1)}return Ii(e,n,s,r,l,i)}function Ii(e,n,s,r,i,l){Wc(e,n);var o=(n.flags&128)!==0;if(!r&&!o)return i&&So(n,s,!1),it(e,n,l);r=n.stateNode,Lh.current=n;var a=o&&typeof s.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&o?(n.child=fn(n,e.child,null,l),n.child=fn(n,null,a,l)):ue(e,n,a,l),n.memoizedState=r.state,i&&So(n,s,!0),n.child}function Vc(e){var n=e.stateNode;n.pendingContext?ko(e,n.pendingContext,n.pendingContext!==n.context):n.context&&ko(e,n.context,!1),wl(e,n.containerInfo)}function Mo(e,n,s,r,i){return hn(),yl(i),n.flags|=256,ue(e,n,s,r),n.child}var Bi={dehydrated:null,treeContext:null,retryLane:0};function zi(e){return{baseLanes:e,cachePool:null,transitions:null}}function qc(e,n,s){var r=n.pendingProps,i=V.current,l=!1,o=(n.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(l=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),H(V,i&1),e===null)return Li(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(o=r.children,e=r.fallback,l?(r=n.mode,l=n.child,o={mode:"hidden",children:o},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=o):l=kr(o,r,0,null),e=Pt(e,r,s,null),l.return=n,e.return=n,l.sibling=e,n.child=l,n.child.memoizedState=zi(s),n.memoizedState=Bi,e):Ll(n,o));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return bh(e,n,o,r,a,i,s);if(l){l=r.fallback,o=n.mode,i=e.child,a=i.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&n.child!==i?(r=n.child,r.childLanes=0,r.pendingProps=c,n.deletions=null):(r=vt(i,c),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?l=vt(a,l):(l=Pt(l,o,s,null),l.flags|=2),l.return=n,r.return=n,r.sibling=l,n.child=r,r=l,l=n.child,o=e.child.memoizedState,o=o===null?zi(s):{baseLanes:o.baseLanes|s,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=e.childLanes&~s,n.memoizedState=Bi,r}return l=e.child,e=l.sibling,r=vt(l,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=s),r.return=n,r.sibling=null,e!==null&&(s=n.deletions,s===null?(n.deletions=[e],n.flags|=16):s.push(e)),n.child=r,n.memoizedState=null,r}function Ll(e,n){return n=kr({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Es(e,n,s,r){return r!==null&&yl(r),fn(n,e.child,null,s),e=Ll(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function bh(e,n,s,r,i,l,o){if(s)return n.flags&256?(n.flags&=-257,r=Yr(Error(v(422))),Es(e,n,o,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(l=r.fallback,i=n.mode,r=kr({mode:"visible",children:r.children},i,0,null),l=Pt(l,i,o,null),l.flags|=2,r.return=n,l.return=n,r.sibling=l,n.child=r,n.mode&1&&fn(n,e.child,null,o),n.child.memoizedState=zi(o),n.memoizedState=Bi,l);if(!(n.mode&1))return Es(e,n,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,l=Error(v(419)),r=Yr(l,r,void 0),Es(e,n,o,r)}if(a=(o&e.childLanes)!==0,xe||a){if(r=se,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==l.retryLane&&(l.retryLane=i,rt(e,i),He(r,e,i,-1))}return Il(),r=Yr(Error(v(421))),Es(e,n,o,r)}return i.data==="$?"?(n.flags|=128,n.child=e.child,n=$h.bind(null,e),i._reactRetry=n,null):(e=l.treeContext,Se=xt(i.nextSibling),_e=n,W=!0,Fe=null,e!==null&&(Le[be++]=Ze,Le[be++]=et,Le[be++]=It,Ze=e.id,et=e.overflow,It=n),n=Ll(n,r.children),n.flags|=4096,n)}function Ho(e,n,s){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),bi(e.return,n,s)}function Jr(e,n,s,r,i){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:s,tailMode:i}:(l.isBackwards=n,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=s,l.tailMode=i)}function Qc(e,n,s){var r=n.pendingProps,i=r.revealOrder,l=r.tail;if(ue(e,n,r.children,s),r=V.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ho(e,s,n);else if(e.tag===19)Ho(e,s,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(H(V,r),!(n.mode&1))n.memoizedState=null;else switch(i){case"forwards":for(s=n.child,i=null;s!==null;)e=s.alternate,e!==null&&rr(e)===null&&(i=s),s=s.sibling;s=i,s===null?(i=n.child,n.child=null):(i=s.sibling,s.sibling=null),Jr(n,!1,i,s,l);break;case"backwards":for(s=null,i=n.child,n.child=null;i!==null;){if(e=i.alternate,e!==null&&rr(e)===null){n.child=i;break}e=i.sibling,i.sibling=s,s=i,i=e}Jr(n,!0,s,null,l);break;case"together":Jr(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function zs(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function it(e,n,s){if(e!==null&&(n.dependencies=e.dependencies),zt|=n.lanes,!(s&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(v(153));if(n.child!==null){for(e=n.child,s=vt(e,e.pendingProps),n.child=s,s.return=n;e.sibling!==null;)e=e.sibling,s=s.sibling=vt(e,e.pendingProps),s.return=n;s.sibling=null}return n.child}function Dh(e,n,s){switch(n.tag){case 3:Vc(n),hn();break;case 5:Nc(n);break;case 1:je(n.type)&&Xs(n);break;case 4:wl(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,i=n.memoizedProps.value;H(tr,r._currentValue),r._currentValue=i;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(H(V,V.current&1),n.flags|=128,null):s&n.child.childLanes?qc(e,n,s):(H(V,V.current&1),e=it(e,n,s),e!==null?e.sibling:null);H(V,V.current&1);break;case 19:if(r=(s&n.childLanes)!==0,e.flags&128){if(r)return Qc(e,n,s);n.flags|=128}if(i=n.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),H(V,V.current),r)break;return null;case 22:case 23:return n.lanes=0,$c(e,n,s)}return it(e,n,s)}var Kc,Fi,Yc,Jc;Kc=function(e,n){for(var s=n.child;s!==null;){if(s.tag===5||s.tag===6)e.appendChild(s.stateNode);else if(s.tag!==4&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===n)break;for(;s.sibling===null;){if(s.return===null||s.return===n)return;s=s.return}s.sibling.return=s.return,s=s.sibling}};Fi=function(){};Yc=function(e,n,s,r){var i=e.memoizedProps;if(i!==r){e=n.stateNode,Dt(Qe.current);var l=null;switch(s){case"input":i=oi(e,i),r=oi(e,r),l=[];break;case"select":i=Q({},i,{value:void 0}),r=Q({},r,{value:void 0}),l=[];break;case"textarea":i=di(e,i),r=di(e,r),l=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ys)}hi(s,r);var o;s=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var a=i[u];for(o in a)a.hasOwnProperty(o)&&(s||(s={}),s[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Gn.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var c=r[u];if(a=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&c!==a&&(c!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(s||(s={}),s[o]="");for(o in c)c.hasOwnProperty(o)&&a[o]!==c[o]&&(s||(s={}),s[o]=c[o])}else s||(l||(l=[]),l.push(u,s)),s=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,a=a?a.__html:void 0,c!=null&&a!==c&&(l=l||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(l=l||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Gn.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&U("scroll",e),l||a===c||(l=[])):(l=l||[]).push(u,c))}s&&(l=l||[]).push("style",s);var u=l;(n.updateQueue=u)&&(n.flags|=4)}};Jc=function(e,n,s,r){s!==r&&(n.flags|=4)};function Cn(e,n){if(!W)switch(e.tailMode){case"hidden":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var r=null;s!==null;)s.alternate!==null&&(r=s),s=s.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ae(e){var n=e.alternate!==null&&e.alternate.child===e.child,s=0,r=0;if(n)for(var i=e.child;i!==null;)s|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)s|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=s,n}function Ah(e,n,s){var r=n.pendingProps;switch(pl(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ae(n),null;case 1:return je(n.type)&&Js(),ae(n),null;case 3:return r=n.stateNode,mn(),G(ge),G(de),Sl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ss(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Fe!==null&&(qi(Fe),Fe=null))),Fi(e,n),ae(n),null;case 5:kl(n);var i=Dt(ts.current);if(s=n.type,e!==null&&n.stateNode!=null)Yc(e,n,s,r,i),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(v(166));return ae(n),null}if(e=Dt(Qe.current),Ss(n)){r=n.stateNode,s=n.type;var l=n.memoizedProps;switch(r[Ve]=n,r[Zn]=l,e=(n.mode&1)!==0,s){case"dialog":U("cancel",r),U("close",r);break;case"iframe":case"object":case"embed":U("load",r);break;case"video":case"audio":for(i=0;i<An.length;i++)U(An[i],r);break;case"source":U("error",r);break;case"img":case"image":case"link":U("error",r),U("load",r);break;case"details":U("toggle",r);break;case"input":Kl(r,l),U("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},U("invalid",r);break;case"textarea":Jl(r,l),U("invalid",r)}hi(s,l),i=null;for(var o in l)if(l.hasOwnProperty(o)){var a=l[o];o==="children"?typeof a=="string"?r.textContent!==a&&(l.suppressHydrationWarning!==!0&&ks(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(l.suppressHydrationWarning!==!0&&ks(r.textContent,a,e),i=["children",""+a]):Gn.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&U("scroll",r)}switch(s){case"input":ps(r),Yl(r,l,!0);break;case"textarea":ps(r),Xl(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Ys)}r=i,n.updateQueue=r,r!==null&&(n.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=_a(s)),e==="http://www.w3.org/1999/xhtml"?s==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(s,{is:r.is}):(e=o.createElement(s),s==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,s),e[Ve]=n,e[Zn]=r,Kc(e,n,!1,!1),n.stateNode=e;e:{switch(o=fi(s,r),s){case"dialog":U("cancel",e),U("close",e),i=r;break;case"iframe":case"object":case"embed":U("load",e),i=r;break;case"video":case"audio":for(i=0;i<An.length;i++)U(An[i],e);i=r;break;case"source":U("error",e),i=r;break;case"img":case"image":case"link":U("error",e),U("load",e),i=r;break;case"details":U("toggle",e),i=r;break;case"input":Kl(e,r),i=oi(e,r),U("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=Q({},r,{value:void 0}),U("invalid",e);break;case"textarea":Jl(e,r),i=di(e,r),U("invalid",e);break;default:i=r}hi(s,i),a=i;for(l in a)if(a.hasOwnProperty(l)){var c=a[l];l==="style"?Ca(e,c):l==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Ea(e,c)):l==="children"?typeof c=="string"?(s!=="textarea"||c!=="")&&$n(e,c):typeof c=="number"&&$n(e,""+c):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Gn.hasOwnProperty(l)?c!=null&&l==="onScroll"&&U("scroll",e):c!=null&&el(e,l,c,o))}switch(s){case"input":ps(e),Yl(e,r,!1);break;case"textarea":ps(e),Xl(e);break;case"option":r.value!=null&&e.setAttribute("value",""+wt(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?sn(e,!!r.multiple,l,!1):r.defaultValue!=null&&sn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Ys)}switch(s){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return ae(n),null;case 6:if(e&&n.stateNode!=null)Jc(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(v(166));if(s=Dt(ts.current),Dt(Qe.current),Ss(n)){if(r=n.stateNode,s=n.memoizedProps,r[Ve]=n,(l=r.nodeValue!==s)&&(e=_e,e!==null))switch(e.tag){case 3:ks(r.nodeValue,s,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ks(r.nodeValue,s,(e.mode&1)!==0)}l&&(n.flags|=4)}else r=(s.nodeType===9?s:s.ownerDocument).createTextNode(r),r[Ve]=n,n.stateNode=r}return ae(n),null;case 13:if(G(V),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(W&&Se!==null&&n.mode&1&&!(n.flags&128))pc(),hn(),n.flags|=98560,l=!1;else if(l=Ss(n),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(v(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(v(317));l[Ve]=n}else hn(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;ae(n),l=!1}else Fe!==null&&(qi(Fe),Fe=null),l=!0;if(!l)return n.flags&65536?n:null}return n.flags&128?(n.lanes=s,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||V.current&1?te===0&&(te=3):Il())),n.updateQueue!==null&&(n.flags|=4),ae(n),null);case 4:return mn(),Fi(e,n),e===null&&Jn(n.stateNode.containerInfo),ae(n),null;case 10:return jl(n.type._context),ae(n),null;case 17:return je(n.type)&&Js(),ae(n),null;case 19:if(G(V),l=n.memoizedState,l===null)return ae(n),null;if(r=(n.flags&128)!==0,o=l.rendering,o===null)if(r)Cn(l,!1);else{if(te!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(o=rr(e),o!==null){for(n.flags|=128,Cn(l,!1),r=o.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=s,s=n.child;s!==null;)l=s,e=r,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,e=o.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),s=s.sibling;return H(V,V.current&1|2),n.child}e=e.sibling}l.tail!==null&&J()>yn&&(n.flags|=128,r=!0,Cn(l,!1),n.lanes=4194304)}else{if(!r)if(e=rr(o),e!==null){if(n.flags|=128,r=!0,s=e.updateQueue,s!==null&&(n.updateQueue=s,n.flags|=4),Cn(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!W)return ae(n),null}else 2*J()-l.renderingStartTime>yn&&s!==1073741824&&(n.flags|=128,r=!0,Cn(l,!1),n.lanes=4194304);l.isBackwards?(o.sibling=n.child,n.child=o):(s=l.last,s!==null?s.sibling=o:n.child=o,l.last=o)}return l.tail!==null?(n=l.tail,l.rendering=n,l.tail=n.sibling,l.renderingStartTime=J(),n.sibling=null,s=V.current,H(V,r?s&1|2:s&1),n):(ae(n),null);case 22:case 23:return Rl(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?we&1073741824&&(ae(n),n.subtreeFlags&6&&(n.flags|=8192)):ae(n),null;case 24:return null;case 25:return null}throw Error(v(156,n.tag))}function Ph(e,n){switch(pl(n),n.tag){case 1:return je(n.type)&&Js(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return mn(),G(ge),G(de),Sl(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return kl(n),null;case 13:if(G(V),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(v(340));hn()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return G(V),null;case 4:return mn(),null;case 10:return jl(n.type._context),null;case 22:case 23:return Rl(),null;case 24:return null;default:return null}}var Ts=!1,ce=!1,Rh=typeof WeakSet=="function"?WeakSet:Set,C=null;function tn(e,n){var s=e.ref;if(s!==null)if(typeof s=="function")try{s(null)}catch(r){K(e,n,r)}else s.current=null}function Mi(e,n,s){try{s()}catch(r){K(e,n,r)}}var Uo=!1;function Ih(e,n){if(ki=qs,e=nc(),fl(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else e:{s=(s=e.ownerDocument)&&s.defaultView||window;var r=s.getSelection&&s.getSelection();if(r&&r.rangeCount!==0){s=r.anchorNode;var i=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{s.nodeType,l.nodeType}catch{s=null;break e}var o=0,a=-1,c=-1,u=0,m=0,y=e,p=null;t:for(;;){for(var x;y!==s||i!==0&&y.nodeType!==3||(a=o+i),y!==l||r!==0&&y.nodeType!==3||(c=o+r),y.nodeType===3&&(o+=y.nodeValue.length),(x=y.firstChild)!==null;)p=y,y=x;for(;;){if(y===e)break t;if(p===s&&++u===i&&(a=o),p===l&&++m===r&&(c=o),(x=y.nextSibling)!==null)break;y=p,p=y.parentNode}y=x}s=a===-1||c===-1?null:{start:a,end:c}}else s=null}s=s||{start:0,end:0}}else s=null;for(Si={focusedElem:e,selectionRange:s},qs=!1,C=n;C!==null;)if(n=C,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,C=e;else for(;C!==null;){n=C;try{var w=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var j=w.memoizedProps,L=w.memoizedState,h=n.stateNode,d=h.getSnapshotBeforeUpdate(n.elementType===n.type?j:Be(n.type,j),L);h.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var f=n.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(v(163))}}catch(g){K(n,n.return,g)}if(e=n.sibling,e!==null){e.return=n.return,C=e;break}C=n.return}return w=Uo,Uo=!1,w}function Mn(e,n,s){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var l=i.destroy;i.destroy=void 0,l!==void 0&&Mi(n,s,l)}i=i.next}while(i!==r)}}function vr(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var s=n=n.next;do{if((s.tag&e)===e){var r=s.create;s.destroy=r()}s=s.next}while(s!==n)}}function Hi(e){var n=e.ref;if(n!==null){var s=e.stateNode;switch(e.tag){case 5:e=s;break;default:e=s}typeof n=="function"?n(e):n.current=e}}function Xc(e){var n=e.alternate;n!==null&&(e.alternate=null,Xc(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Ve],delete n[Zn],delete n[Ti],delete n[gh],delete n[jh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Zc(e){return e.tag===5||e.tag===3||e.tag===4}function Go(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Zc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ui(e,n,s){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?s.nodeType===8?s.parentNode.insertBefore(e,n):s.insertBefore(e,n):(s.nodeType===8?(n=s.parentNode,n.insertBefore(e,s)):(n=s,n.appendChild(e)),s=s._reactRootContainer,s!=null||n.onclick!==null||(n.onclick=Ys));else if(r!==4&&(e=e.child,e!==null))for(Ui(e,n,s),e=e.sibling;e!==null;)Ui(e,n,s),e=e.sibling}function Gi(e,n,s){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?s.insertBefore(e,n):s.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Gi(e,n,s),e=e.sibling;e!==null;)Gi(e,n,s),e=e.sibling}var re=null,ze=!1;function ot(e,n,s){for(s=s.child;s!==null;)ed(e,n,s),s=s.sibling}function ed(e,n,s){if(qe&&typeof qe.onCommitFiberUnmount=="function")try{qe.onCommitFiberUnmount(fr,s)}catch{}switch(s.tag){case 5:ce||tn(s,n);case 6:var r=re,i=ze;re=null,ot(e,n,s),re=r,ze=i,re!==null&&(ze?(e=re,s=s.stateNode,e.nodeType===8?e.parentNode.removeChild(s):e.removeChild(s)):re.removeChild(s.stateNode));break;case 18:re!==null&&(ze?(e=re,s=s.stateNode,e.nodeType===8?$r(e.parentNode,s):e.nodeType===1&&$r(e,s),Qn(e)):$r(re,s.stateNode));break;case 4:r=re,i=ze,re=s.stateNode.containerInfo,ze=!0,ot(e,n,s),re=r,ze=i;break;case 0:case 11:case 14:case 15:if(!ce&&(r=s.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var l=i,o=l.destroy;l=l.tag,o!==void 0&&(l&2||l&4)&&Mi(s,n,o),i=i.next}while(i!==r)}ot(e,n,s);break;case 1:if(!ce&&(tn(s,n),r=s.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=s.memoizedProps,r.state=s.memoizedState,r.componentWillUnmount()}catch(a){K(s,n,a)}ot(e,n,s);break;case 21:ot(e,n,s);break;case 22:s.mode&1?(ce=(r=ce)||s.memoizedState!==null,ot(e,n,s),ce=r):ot(e,n,s);break;default:ot(e,n,s)}}function $o(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var s=e.stateNode;s===null&&(s=e.stateNode=new Rh),n.forEach(function(r){var i=Wh.bind(null,e,r);s.has(r)||(s.add(r),r.then(i,i))})}}function Ie(e,n){var s=n.deletions;if(s!==null)for(var r=0;r<s.length;r++){var i=s[r];try{var l=e,o=n,a=o;e:for(;a!==null;){switch(a.tag){case 5:re=a.stateNode,ze=!1;break e;case 3:re=a.stateNode.containerInfo,ze=!0;break e;case 4:re=a.stateNode.containerInfo,ze=!0;break e}a=a.return}if(re===null)throw Error(v(160));ed(l,o,i),re=null,ze=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){K(i,n,u)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)td(n,e),n=n.sibling}function td(e,n){var s=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ie(n,e),$e(e),r&4){try{Mn(3,e,e.return),vr(3,e)}catch(j){K(e,e.return,j)}try{Mn(5,e,e.return)}catch(j){K(e,e.return,j)}}break;case 1:Ie(n,e),$e(e),r&512&&s!==null&&tn(s,s.return);break;case 5:if(Ie(n,e),$e(e),r&512&&s!==null&&tn(s,s.return),e.flags&32){var i=e.stateNode;try{$n(i,"")}catch(j){K(e,e.return,j)}}if(r&4&&(i=e.stateNode,i!=null)){var l=e.memoizedProps,o=s!==null?s.memoizedProps:l,a=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{a==="input"&&l.type==="radio"&&l.name!=null&&ka(i,l),fi(a,o);var u=fi(a,l);for(o=0;o<c.length;o+=2){var m=c[o],y=c[o+1];m==="style"?Ca(i,y):m==="dangerouslySetInnerHTML"?Ea(i,y):m==="children"?$n(i,y):el(i,m,y,u)}switch(a){case"input":ai(i,l);break;case"textarea":Sa(i,l);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!l.multiple;var x=l.value;x!=null?sn(i,!!l.multiple,x,!1):p!==!!l.multiple&&(l.defaultValue!=null?sn(i,!!l.multiple,l.defaultValue,!0):sn(i,!!l.multiple,l.multiple?[]:"",!1))}i[Zn]=l}catch(j){K(e,e.return,j)}}break;case 6:if(Ie(n,e),$e(e),r&4){if(e.stateNode===null)throw Error(v(162));i=e.stateNode,l=e.memoizedProps;try{i.nodeValue=l}catch(j){K(e,e.return,j)}}break;case 3:if(Ie(n,e),$e(e),r&4&&s!==null&&s.memoizedState.isDehydrated)try{Qn(n.containerInfo)}catch(j){K(e,e.return,j)}break;case 4:Ie(n,e),$e(e);break;case 13:Ie(n,e),$e(e),i=e.child,i.flags&8192&&(l=i.memoizedState!==null,i.stateNode.isHidden=l,!l||i.alternate!==null&&i.alternate.memoizedState!==null||(Al=J())),r&4&&$o(e);break;case 22:if(m=s!==null&&s.memoizedState!==null,e.mode&1?(ce=(u=ce)||m,Ie(n,e),ce=u):Ie(n,e),$e(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!m&&e.mode&1)for(C=e,m=e.child;m!==null;){for(y=C=m;C!==null;){switch(p=C,x=p.child,p.tag){case 0:case 11:case 14:case 15:Mn(4,p,p.return);break;case 1:tn(p,p.return);var w=p.stateNode;if(typeof w.componentWillUnmount=="function"){r=p,s=p.return;try{n=r,w.props=n.memoizedProps,w.state=n.memoizedState,w.componentWillUnmount()}catch(j){K(r,s,j)}}break;case 5:tn(p,p.return);break;case 22:if(p.memoizedState!==null){Vo(y);continue}}x!==null?(x.return=p,C=x):Vo(y)}m=m.sibling}e:for(m=null,y=e;;){if(y.tag===5){if(m===null){m=y;try{i=y.stateNode,u?(l=i.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(a=y.stateNode,c=y.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,a.style.display=Ta("display",o))}catch(j){K(e,e.return,j)}}}else if(y.tag===6){if(m===null)try{y.stateNode.nodeValue=u?"":y.memoizedProps}catch(j){K(e,e.return,j)}}else if((y.tag!==22&&y.tag!==23||y.memoizedState===null||y===e)&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===e)break e;for(;y.sibling===null;){if(y.return===null||y.return===e)break e;m===y&&(m=null),y=y.return}m===y&&(m=null),y.sibling.return=y.return,y=y.sibling}}break;case 19:Ie(n,e),$e(e),r&4&&$o(e);break;case 21:break;default:Ie(n,e),$e(e)}}function $e(e){var n=e.flags;if(n&2){try{e:{for(var s=e.return;s!==null;){if(Zc(s)){var r=s;break e}s=s.return}throw Error(v(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&($n(i,""),r.flags&=-33);var l=Go(e);Gi(e,l,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=Go(e);Ui(e,a,o);break;default:throw Error(v(161))}}catch(c){K(e,e.return,c)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Bh(e,n,s){C=e,nd(e)}function nd(e,n,s){for(var r=(e.mode&1)!==0;C!==null;){var i=C,l=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Ts;if(!o){var a=i.alternate,c=a!==null&&a.memoizedState!==null||ce;a=Ts;var u=ce;if(Ts=o,(ce=c)&&!u)for(C=i;C!==null;)o=C,c=o.child,o.tag===22&&o.memoizedState!==null?qo(i):c!==null?(c.return=o,C=c):qo(i);for(;l!==null;)C=l,nd(l),l=l.sibling;C=i,Ts=a,ce=u}Wo(e)}else i.subtreeFlags&8772&&l!==null?(l.return=i,C=l):Wo(e)}}function Wo(e){for(;C!==null;){var n=C;if(n.flags&8772){var s=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ce||vr(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ce)if(s===null)r.componentDidMount();else{var i=n.elementType===n.type?s.memoizedProps:Be(n.type,s.memoizedProps);r.componentDidUpdate(i,s.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=n.updateQueue;l!==null&&Oo(n,l,r);break;case 3:var o=n.updateQueue;if(o!==null){if(s=null,n.child!==null)switch(n.child.tag){case 5:s=n.child.stateNode;break;case 1:s=n.child.stateNode}Oo(n,o,s)}break;case 5:var a=n.stateNode;if(s===null&&n.flags&4){s=a;var c=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&s.focus();break;case"img":c.src&&(s.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var u=n.alternate;if(u!==null){var m=u.memoizedState;if(m!==null){var y=m.dehydrated;y!==null&&Qn(y)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(v(163))}ce||n.flags&512&&Hi(n)}catch(p){K(n,n.return,p)}}if(n===e){C=null;break}if(s=n.sibling,s!==null){s.return=n.return,C=s;break}C=n.return}}function Vo(e){for(;C!==null;){var n=C;if(n===e){C=null;break}var s=n.sibling;if(s!==null){s.return=n.return,C=s;break}C=n.return}}function qo(e){for(;C!==null;){var n=C;try{switch(n.tag){case 0:case 11:case 15:var s=n.return;try{vr(4,n)}catch(c){K(n,s,c)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var i=n.return;try{r.componentDidMount()}catch(c){K(n,i,c)}}var l=n.return;try{Hi(n)}catch(c){K(n,l,c)}break;case 5:var o=n.return;try{Hi(n)}catch(c){K(n,o,c)}}}catch(c){K(n,n.return,c)}if(n===e){C=null;break}var a=n.sibling;if(a!==null){a.return=n.return,C=a;break}C=n.return}}var zh=Math.ceil,or=lt.ReactCurrentDispatcher,bl=lt.ReactCurrentOwner,Ae=lt.ReactCurrentBatchConfig,z=0,se=null,Z=null,ie=0,we=0,nn=_t(0),te=0,is=null,zt=0,wr=0,Dl=0,Hn=null,ye=null,Al=0,yn=1/0,Je=null,ar=!1,$i=null,jt=null,Cs=!1,ft=null,cr=0,Un=0,Wi=null,Fs=-1,Ms=0;function he(){return z&6?J():Fs!==-1?Fs:Fs=J()}function Nt(e){return e.mode&1?z&2&&ie!==0?ie&-ie:vh.transition!==null?(Ms===0&&(Ms=Ma()),Ms):(e=M,e!==0||(e=window.event,e=e===void 0?16:qa(e.type)),e):1}function He(e,n,s,r){if(50<Un)throw Un=0,Wi=null,Error(v(185));os(e,s,r),(!(z&2)||e!==se)&&(e===se&&(!(z&2)&&(wr|=s),te===4&&ut(e,ie)),Ne(e,r),s===1&&z===0&&!(n.mode&1)&&(yn=J()+500,gr&&Et()))}function Ne(e,n){var s=e.callbackNode;vu(e,n);var r=Vs(e,e===se?ie:0);if(r===0)s!==null&&to(s),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(s!=null&&to(s),n===1)e.tag===0?Nh(Qo.bind(null,e)):hc(Qo.bind(null,e)),yh(function(){!(z&6)&&Et()}),s=null;else{switch(Ha(r)){case 1:s=il;break;case 4:s=za;break;case 16:s=Ws;break;case 536870912:s=Fa;break;default:s=Ws}s=dd(s,sd.bind(null,e))}e.callbackPriority=n,e.callbackNode=s}}function sd(e,n){if(Fs=-1,Ms=0,z&6)throw Error(v(327));var s=e.callbackNode;if(cn()&&e.callbackNode!==s)return null;var r=Vs(e,e===se?ie:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=dr(e,r);else{n=r;var i=z;z|=2;var l=id();(se!==e||ie!==n)&&(Je=null,yn=J()+500,At(e,n));do try{Hh();break}catch(a){rd(e,a)}while(!0);gl(),or.current=l,z=i,Z!==null?n=0:(se=null,ie=0,n=te)}if(n!==0){if(n===2&&(i=gi(e),i!==0&&(r=i,n=Vi(e,i))),n===1)throw s=is,At(e,0),ut(e,r),Ne(e,J()),s;if(n===6)ut(e,r);else{if(i=e.current.alternate,!(r&30)&&!Fh(i)&&(n=dr(e,r),n===2&&(l=gi(e),l!==0&&(r=l,n=Vi(e,l))),n===1))throw s=is,At(e,0),ut(e,r),Ne(e,J()),s;switch(e.finishedWork=i,e.finishedLanes=r,n){case 0:case 1:throw Error(v(345));case 2:Ot(e,ye,Je);break;case 3:if(ut(e,r),(r&130023424)===r&&(n=Al+500-J(),10<n)){if(Vs(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){he(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Ei(Ot.bind(null,e,ye,Je),n);break}Ot(e,ye,Je);break;case 4:if(ut(e,r),(r&4194240)===r)break;for(n=e.eventTimes,i=-1;0<r;){var o=31-Me(r);l=1<<o,o=n[o],o>i&&(i=o),r&=~l}if(r=i,r=J()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*zh(r/1960))-r,10<r){e.timeoutHandle=Ei(Ot.bind(null,e,ye,Je),r);break}Ot(e,ye,Je);break;case 5:Ot(e,ye,Je);break;default:throw Error(v(329))}}}return Ne(e,J()),e.callbackNode===s?sd.bind(null,e):null}function Vi(e,n){var s=Hn;return e.current.memoizedState.isDehydrated&&(At(e,n).flags|=256),e=dr(e,n),e!==2&&(n=ye,ye=s,n!==null&&qi(n)),e}function qi(e){ye===null?ye=e:ye.push.apply(ye,e)}function Fh(e){for(var n=e;;){if(n.flags&16384){var s=n.updateQueue;if(s!==null&&(s=s.stores,s!==null))for(var r=0;r<s.length;r++){var i=s[r],l=i.getSnapshot;i=i.value;try{if(!Ue(l(),i))return!1}catch{return!1}}}if(s=n.child,n.subtreeFlags&16384&&s!==null)s.return=n,n=s;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ut(e,n){for(n&=~Dl,n&=~wr,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var s=31-Me(n),r=1<<s;e[s]=-1,n&=~r}}function Qo(e){if(z&6)throw Error(v(327));cn();var n=Vs(e,0);if(!(n&1))return Ne(e,J()),null;var s=dr(e,n);if(e.tag!==0&&s===2){var r=gi(e);r!==0&&(n=r,s=Vi(e,r))}if(s===1)throw s=is,At(e,0),ut(e,n),Ne(e,J()),s;if(s===6)throw Error(v(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Ot(e,ye,Je),Ne(e,J()),null}function Pl(e,n){var s=z;z|=1;try{return e(n)}finally{z=s,z===0&&(yn=J()+500,gr&&Et())}}function Ft(e){ft!==null&&ft.tag===0&&!(z&6)&&cn();var n=z;z|=1;var s=Ae.transition,r=M;try{if(Ae.transition=null,M=1,e)return e()}finally{M=r,Ae.transition=s,z=n,!(z&6)&&Et()}}function Rl(){we=nn.current,G(nn)}function At(e,n){e.finishedWork=null,e.finishedLanes=0;var s=e.timeoutHandle;if(s!==-1&&(e.timeoutHandle=-1,ph(s)),Z!==null)for(s=Z.return;s!==null;){var r=s;switch(pl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Js();break;case 3:mn(),G(ge),G(de),Sl();break;case 5:kl(r);break;case 4:mn();break;case 13:G(V);break;case 19:G(V);break;case 10:jl(r.type._context);break;case 22:case 23:Rl()}s=s.return}if(se=e,Z=e=vt(e.current,null),ie=we=n,te=0,is=null,Dl=wr=zt=0,ye=Hn=null,bt!==null){for(n=0;n<bt.length;n++)if(s=bt[n],r=s.interleaved,r!==null){s.interleaved=null;var i=r.next,l=s.pending;if(l!==null){var o=l.next;l.next=i,r.next=o}s.pending=r}bt=null}return e}function rd(e,n){do{var s=Z;try{if(gl(),Is.current=lr,ir){for(var r=q.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}ir=!1}if(Bt=0,ne=ee=q=null,Fn=!1,ns=0,bl.current=null,s===null||s.return===null){te=1,is=n,Z=null;break}e:{var l=e,o=s.return,a=s,c=n;if(n=ie,a.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,m=a,y=m.tag;if(!(m.mode&1)&&(y===0||y===11||y===15)){var p=m.alternate;p?(m.updateQueue=p.updateQueue,m.memoizedState=p.memoizedState,m.lanes=p.lanes):(m.updateQueue=null,m.memoizedState=null)}var x=Ro(o);if(x!==null){x.flags&=-257,Io(x,o,a,l,n),x.mode&1&&Po(l,u,n),n=x,c=u;var w=n.updateQueue;if(w===null){var j=new Set;j.add(c),n.updateQueue=j}else w.add(c);break e}else{if(!(n&1)){Po(l,u,n),Il();break e}c=Error(v(426))}}else if(W&&a.mode&1){var L=Ro(o);if(L!==null){!(L.flags&65536)&&(L.flags|=256),Io(L,o,a,l,n),yl(pn(c,a));break e}}l=c=pn(c,a),te!==4&&(te=2),Hn===null?Hn=[l]:Hn.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,n&=-n,l.lanes|=n;var h=Hc(l,c,n);Co(l,h);break e;case 1:a=c;var d=l.type,f=l.stateNode;if(!(l.flags&128)&&(typeof d.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(jt===null||!jt.has(f)))){l.flags|=65536,n&=-n,l.lanes|=n;var g=Uc(l,a,n);Co(l,g);break e}}l=l.return}while(l!==null)}od(s)}catch(k){n=k,Z===s&&s!==null&&(Z=s=s.return);continue}break}while(!0)}function id(){var e=or.current;return or.current=lr,e===null?lr:e}function Il(){(te===0||te===3||te===2)&&(te=4),se===null||!(zt&268435455)&&!(wr&268435455)||ut(se,ie)}function dr(e,n){var s=z;z|=2;var r=id();(se!==e||ie!==n)&&(Je=null,At(e,n));do try{Mh();break}catch(i){rd(e,i)}while(!0);if(gl(),z=s,or.current=r,Z!==null)throw Error(v(261));return se=null,ie=0,te}function Mh(){for(;Z!==null;)ld(Z)}function Hh(){for(;Z!==null&&!hu();)ld(Z)}function ld(e){var n=cd(e.alternate,e,we);e.memoizedProps=e.pendingProps,n===null?od(e):Z=n,bl.current=null}function od(e){var n=e;do{var s=n.alternate;if(e=n.return,n.flags&32768){if(s=Ph(s,n),s!==null){s.flags&=32767,Z=s;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{te=6,Z=null;return}}else if(s=Ah(s,n,we),s!==null){Z=s;return}if(n=n.sibling,n!==null){Z=n;return}Z=n=e}while(n!==null);te===0&&(te=5)}function Ot(e,n,s){var r=M,i=Ae.transition;try{Ae.transition=null,M=1,Uh(e,n,s,r)}finally{Ae.transition=i,M=r}return null}function Uh(e,n,s,r){do cn();while(ft!==null);if(z&6)throw Error(v(327));s=e.finishedWork;var i=e.finishedLanes;if(s===null)return null;if(e.finishedWork=null,e.finishedLanes=0,s===e.current)throw Error(v(177));e.callbackNode=null,e.callbackPriority=0;var l=s.lanes|s.childLanes;if(wu(e,l),e===se&&(Z=se=null,ie=0),!(s.subtreeFlags&2064)&&!(s.flags&2064)||Cs||(Cs=!0,dd(Ws,function(){return cn(),null})),l=(s.flags&15990)!==0,s.subtreeFlags&15990||l){l=Ae.transition,Ae.transition=null;var o=M;M=1;var a=z;z|=4,bl.current=null,Ih(e,s),td(s,e),ah(Si),qs=!!ki,Si=ki=null,e.current=s,Bh(s),fu(),z=a,M=o,Ae.transition=l}else e.current=s;if(Cs&&(Cs=!1,ft=e,cr=i),l=e.pendingLanes,l===0&&(jt=null),yu(s.stateNode),Ne(e,J()),n!==null)for(r=e.onRecoverableError,s=0;s<n.length;s++)i=n[s],r(i.value,{componentStack:i.stack,digest:i.digest});if(ar)throw ar=!1,e=$i,$i=null,e;return cr&1&&e.tag!==0&&cn(),l=e.pendingLanes,l&1?e===Wi?Un++:(Un=0,Wi=e):Un=0,Et(),null}function cn(){if(ft!==null){var e=Ha(cr),n=Ae.transition,s=M;try{if(Ae.transition=null,M=16>e?16:e,ft===null)var r=!1;else{if(e=ft,ft=null,cr=0,z&6)throw Error(v(331));var i=z;for(z|=4,C=e.current;C!==null;){var l=C,o=l.child;if(C.flags&16){var a=l.deletions;if(a!==null){for(var c=0;c<a.length;c++){var u=a[c];for(C=u;C!==null;){var m=C;switch(m.tag){case 0:case 11:case 15:Mn(8,m,l)}var y=m.child;if(y!==null)y.return=m,C=y;else for(;C!==null;){m=C;var p=m.sibling,x=m.return;if(Xc(m),m===u){C=null;break}if(p!==null){p.return=x,C=p;break}C=x}}}var w=l.alternate;if(w!==null){var j=w.child;if(j!==null){w.child=null;do{var L=j.sibling;j.sibling=null,j=L}while(j!==null)}}C=l}}if(l.subtreeFlags&2064&&o!==null)o.return=l,C=o;else e:for(;C!==null;){if(l=C,l.flags&2048)switch(l.tag){case 0:case 11:case 15:Mn(9,l,l.return)}var h=l.sibling;if(h!==null){h.return=l.return,C=h;break e}C=l.return}}var d=e.current;for(C=d;C!==null;){o=C;var f=o.child;if(o.subtreeFlags&2064&&f!==null)f.return=o,C=f;else e:for(o=d;C!==null;){if(a=C,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:vr(9,a)}}catch(k){K(a,a.return,k)}if(a===o){C=null;break e}var g=a.sibling;if(g!==null){g.return=a.return,C=g;break e}C=a.return}}if(z=i,Et(),qe&&typeof qe.onPostCommitFiberRoot=="function")try{qe.onPostCommitFiberRoot(fr,e)}catch{}r=!0}return r}finally{M=s,Ae.transition=n}}return!1}function Ko(e,n,s){n=pn(s,n),n=Hc(e,n,1),e=gt(e,n,1),n=he(),e!==null&&(os(e,1,n),Ne(e,n))}function K(e,n,s){if(e.tag===3)Ko(e,e,s);else for(;n!==null;){if(n.tag===3){Ko(n,e,s);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(jt===null||!jt.has(r))){e=pn(s,e),e=Uc(n,e,1),n=gt(n,e,1),e=he(),n!==null&&(os(n,1,e),Ne(n,e));break}}n=n.return}}function Gh(e,n,s){var r=e.pingCache;r!==null&&r.delete(n),n=he(),e.pingedLanes|=e.suspendedLanes&s,se===e&&(ie&s)===s&&(te===4||te===3&&(ie&130023424)===ie&&500>J()-Al?At(e,0):Dl|=s),Ne(e,n)}function ad(e,n){n===0&&(e.mode&1?(n=gs,gs<<=1,!(gs&130023424)&&(gs=4194304)):n=1);var s=he();e=rt(e,n),e!==null&&(os(e,n,s),Ne(e,s))}function $h(e){var n=e.memoizedState,s=0;n!==null&&(s=n.retryLane),ad(e,s)}function Wh(e,n){var s=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(s=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(v(314))}r!==null&&r.delete(n),ad(e,s)}var cd;cd=function(e,n,s){if(e!==null)if(e.memoizedProps!==n.pendingProps||ge.current)xe=!0;else{if(!(e.lanes&s)&&!(n.flags&128))return xe=!1,Dh(e,n,s);xe=!!(e.flags&131072)}else xe=!1,W&&n.flags&1048576&&fc(n,er,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;zs(e,n),e=n.pendingProps;var i=un(n,de.current);an(n,s),i=El(null,n,r,e,i,s);var l=Tl();return n.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,je(r)?(l=!0,Xs(n)):l=!1,n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,vl(n),i.updater=Nr,n.stateNode=i,i._reactInternals=n,Ai(n,r,e,s),n=Ii(null,n,r,!0,l,s)):(n.tag=0,W&&l&&ml(n),ue(null,n,i,s),n=n.child),n;case 16:r=n.elementType;e:{switch(zs(e,n),e=n.pendingProps,i=r._init,r=i(r._payload),n.type=r,i=n.tag=qh(r),e=Be(r,e),i){case 0:n=Ri(null,n,r,e,s);break e;case 1:n=Fo(null,n,r,e,s);break e;case 11:n=Bo(null,n,r,e,s);break e;case 14:n=zo(null,n,r,Be(r.type,e),s);break e}throw Error(v(306,r,""))}return n;case 0:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Be(r,i),Ri(e,n,r,i,s);case 1:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Be(r,i),Fo(e,n,r,i,s);case 3:e:{if(Vc(n),e===null)throw Error(v(387));r=n.pendingProps,l=n.memoizedState,i=l.element,jc(e,n),sr(n,r,null,s);var o=n.memoizedState;if(r=o.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},n.updateQueue.baseState=l,n.memoizedState=l,n.flags&256){i=pn(Error(v(423)),n),n=Mo(e,n,r,s,i);break e}else if(r!==i){i=pn(Error(v(424)),n),n=Mo(e,n,r,s,i);break e}else for(Se=xt(n.stateNode.containerInfo.firstChild),_e=n,W=!0,Fe=null,s=xc(n,null,r,s),n.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling;else{if(hn(),r===i){n=it(e,n,s);break e}ue(e,n,r,s)}n=n.child}return n;case 5:return Nc(n),e===null&&Li(n),r=n.type,i=n.pendingProps,l=e!==null?e.memoizedProps:null,o=i.children,_i(r,i)?o=null:l!==null&&_i(r,l)&&(n.flags|=32),Wc(e,n),ue(e,n,o,s),n.child;case 6:return e===null&&Li(n),null;case 13:return qc(e,n,s);case 4:return wl(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=fn(n,null,r,s):ue(e,n,r,s),n.child;case 11:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Be(r,i),Bo(e,n,r,i,s);case 7:return ue(e,n,n.pendingProps,s),n.child;case 8:return ue(e,n,n.pendingProps.children,s),n.child;case 12:return ue(e,n,n.pendingProps.children,s),n.child;case 10:e:{if(r=n.type._context,i=n.pendingProps,l=n.memoizedProps,o=i.value,H(tr,r._currentValue),r._currentValue=o,l!==null)if(Ue(l.value,o)){if(l.children===i.children&&!ge.current){n=it(e,n,s);break e}}else for(l=n.child,l!==null&&(l.return=n);l!==null;){var a=l.dependencies;if(a!==null){o=l.child;for(var c=a.firstContext;c!==null;){if(c.context===r){if(l.tag===1){c=tt(-1,s&-s),c.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var m=u.pending;m===null?c.next=c:(c.next=m.next,m.next=c),u.pending=c}}l.lanes|=s,c=l.alternate,c!==null&&(c.lanes|=s),bi(l.return,s,n),a.lanes|=s;break}c=c.next}}else if(l.tag===10)o=l.type===n.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(v(341));o.lanes|=s,a=o.alternate,a!==null&&(a.lanes|=s),bi(o,s,n),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===n){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}ue(e,n,i.children,s),n=n.child}return n;case 9:return i=n.type,r=n.pendingProps.children,an(n,s),i=Pe(i),r=r(i),n.flags|=1,ue(e,n,r,s),n.child;case 14:return r=n.type,i=Be(r,n.pendingProps),i=Be(r.type,i),zo(e,n,r,i,s);case 15:return Gc(e,n,n.type,n.pendingProps,s);case 17:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Be(r,i),zs(e,n),n.tag=1,je(r)?(e=!0,Xs(n)):e=!1,an(n,s),Mc(n,r,i),Ai(n,r,i,s),Ii(null,n,r,!0,e,s);case 19:return Qc(e,n,s);case 22:return $c(e,n,s)}throw Error(v(156,n.tag))};function dd(e,n){return Ba(e,n)}function Vh(e,n,s,r){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function De(e,n,s,r){return new Vh(e,n,s,r)}function Bl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function qh(e){if(typeof e=="function")return Bl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===nl)return 11;if(e===sl)return 14}return 2}function vt(e,n){var s=e.alternate;return s===null?(s=De(e.tag,n,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=n,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&14680064,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,n=e.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s}function Hs(e,n,s,r,i,l){var o=2;if(r=e,typeof e=="function")Bl(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Vt:return Pt(s.children,i,l,n);case tl:o=8,i|=8;break;case si:return e=De(12,s,n,i|2),e.elementType=si,e.lanes=l,e;case ri:return e=De(13,s,n,i),e.elementType=ri,e.lanes=l,e;case ii:return e=De(19,s,n,i),e.elementType=ii,e.lanes=l,e;case Na:return kr(s,i,l,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ga:o=10;break e;case ja:o=9;break e;case nl:o=11;break e;case sl:o=14;break e;case at:o=16,r=null;break e}throw Error(v(130,e==null?e:typeof e,""))}return n=De(o,s,n,i),n.elementType=e,n.type=r,n.lanes=l,n}function Pt(e,n,s,r){return e=De(7,e,r,n),e.lanes=s,e}function kr(e,n,s,r){return e=De(22,e,r,n),e.elementType=Na,e.lanes=s,e.stateNode={isHidden:!1},e}function Xr(e,n,s){return e=De(6,e,null,n),e.lanes=s,e}function Zr(e,n,s){return n=De(4,e.children!==null?e.children:[],e.key,n),n.lanes=s,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Qh(e,n,s,r,i){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ar(0),this.expirationTimes=Ar(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ar(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function zl(e,n,s,r,i,l,o,a,c){return e=new Qh(e,n,s,a,c),n===1?(n=1,l===!0&&(n|=8)):n=0,l=De(3,null,null,n),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:s,cache:null,transitions:null,pendingSuspenseBoundaries:null},vl(l),e}function Kh(e,n,s){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Wt,key:r==null?null:""+r,children:e,containerInfo:n,implementation:s}}function ud(e){if(!e)return kt;e=e._reactInternals;e:{if(Ut(e)!==e||e.tag!==1)throw Error(v(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(je(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(v(171))}if(e.tag===1){var s=e.type;if(je(s))return uc(e,s,n)}return n}function hd(e,n,s,r,i,l,o,a,c){return e=zl(s,r,!0,e,i,l,o,a,c),e.context=ud(null),s=e.current,r=he(),i=Nt(s),l=tt(r,i),l.callback=n??null,gt(s,l,i),e.current.lanes=i,os(e,i,r),Ne(e,r),e}function Sr(e,n,s,r){var i=n.current,l=he(),o=Nt(i);return s=ud(s),n.context===null?n.context=s:n.pendingContext=s,n=tt(l,o),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=gt(i,n,o),e!==null&&(He(e,i,o,l),Rs(e,i,o)),o}function ur(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Yo(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<n?s:n}}function Fl(e,n){Yo(e,n),(e=e.alternate)&&Yo(e,n)}function Yh(){return null}var fd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ml(e){this._internalRoot=e}_r.prototype.render=Ml.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(v(409));Sr(e,n,null,null)};_r.prototype.unmount=Ml.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Ft(function(){Sr(null,e,null,null)}),n[st]=null}};function _r(e){this._internalRoot=e}_r.prototype.unstable_scheduleHydration=function(e){if(e){var n=$a();e={blockedOn:null,target:e,priority:n};for(var s=0;s<dt.length&&n!==0&&n<dt[s].priority;s++);dt.splice(s,0,e),s===0&&Va(e)}};function Hl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Er(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Jo(){}function Jh(e,n,s,r,i){if(i){if(typeof r=="function"){var l=r;r=function(){var u=ur(o);l.call(u)}}var o=hd(n,r,e,0,null,!1,!1,"",Jo);return e._reactRootContainer=o,e[st]=o.current,Jn(e.nodeType===8?e.parentNode:e),Ft(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var u=ur(c);a.call(u)}}var c=zl(e,0,!1,null,null,!1,!1,"",Jo);return e._reactRootContainer=c,e[st]=c.current,Jn(e.nodeType===8?e.parentNode:e),Ft(function(){Sr(n,c,s,r)}),c}function Tr(e,n,s,r,i){var l=s._reactRootContainer;if(l){var o=l;if(typeof i=="function"){var a=i;i=function(){var c=ur(o);a.call(c)}}Sr(n,o,e,i)}else o=Jh(s,n,e,i,r);return ur(o)}Ua=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var s=Dn(n.pendingLanes);s!==0&&(ll(n,s|1),Ne(n,J()),!(z&6)&&(yn=J()+500,Et()))}break;case 13:Ft(function(){var r=rt(e,1);if(r!==null){var i=he();He(r,e,1,i)}}),Fl(e,1)}};ol=function(e){if(e.tag===13){var n=rt(e,134217728);if(n!==null){var s=he();He(n,e,134217728,s)}Fl(e,134217728)}};Ga=function(e){if(e.tag===13){var n=Nt(e),s=rt(e,n);if(s!==null){var r=he();He(s,e,n,r)}Fl(e,n)}};$a=function(){return M};Wa=function(e,n){var s=M;try{return M=e,n()}finally{M=s}};pi=function(e,n,s){switch(n){case"input":if(ai(e,s),n=s.name,s.type==="radio"&&n!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<s.length;n++){var r=s[n];if(r!==e&&r.form===e.form){var i=xr(r);if(!i)throw Error(v(90));wa(r),ai(r,i)}}}break;case"textarea":Sa(e,s);break;case"select":n=s.value,n!=null&&sn(e,!!s.multiple,n,!1)}};ba=Pl;Da=Ft;var Xh={usingClientEntryPoint:!1,Events:[cs,Yt,xr,Oa,La,Pl]},On={findFiberByHostInstance:Lt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Zh={bundleType:On.bundleType,version:On.version,rendererPackageName:On.rendererPackageName,rendererConfig:On.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:lt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ra(e),e===null?null:e.stateNode},findFiberByHostInstance:On.findFiberByHostInstance||Yh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Os=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Os.isDisabled&&Os.supportsFiber)try{fr=Os.inject(Zh),qe=Os}catch{}}Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xh;Te.createPortal=function(e,n){var s=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Hl(n))throw Error(v(200));return Kh(e,n,null,s)};Te.createRoot=function(e,n){if(!Hl(e))throw Error(v(299));var s=!1,r="",i=fd;return n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),n=zl(e,1,!1,null,null,s,!1,r,i),e[st]=n.current,Jn(e.nodeType===8?e.parentNode:e),new Ml(n)};Te.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(v(188)):(e=Object.keys(e).join(","),Error(v(268,e)));return e=Ra(n),e=e===null?null:e.stateNode,e};Te.flushSync=function(e){return Ft(e)};Te.hydrate=function(e,n,s){if(!Er(n))throw Error(v(200));return Tr(null,e,n,!0,s)};Te.hydrateRoot=function(e,n,s){if(!Hl(e))throw Error(v(405));var r=s!=null&&s.hydratedSources||null,i=!1,l="",o=fd;if(s!=null&&(s.unstable_strictMode===!0&&(i=!0),s.identifierPrefix!==void 0&&(l=s.identifierPrefix),s.onRecoverableError!==void 0&&(o=s.onRecoverableError)),n=hd(n,null,e,1,s??null,i,!1,l,o),e[st]=n.current,Jn(e),r)for(e=0;e<r.length;e++)s=r[e],i=s._getVersion,i=i(s._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[s,i]:n.mutableSourceEagerHydrationData.push(s,i);return new _r(n)};Te.render=function(e,n,s){if(!Er(n))throw Error(v(200));return Tr(null,e,n,!1,s)};Te.unmountComponentAtNode=function(e){if(!Er(e))throw Error(v(40));return e._reactRootContainer?(Ft(function(){Tr(null,null,e,!1,function(){e._reactRootContainer=null,e[st]=null})}),!0):!1};Te.unstable_batchedUpdates=Pl;Te.unstable_renderSubtreeIntoContainer=function(e,n,s,r){if(!Er(s))throw Error(v(200));if(e==null||e._reactInternals===void 0)throw Error(v(38));return Tr(e,n,s,!1,r)};Te.version="18.3.1-next-f1338f8080-20240426";function md(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(md)}catch(e){console.error(e)}}md(),ma.exports=Te;var ef=ma.exports,Xo=ef;ti.createRoot=Xo.createRoot,ti.hydrateRoot=Xo.hydrateRoot;const tf="";function nf(){var e;try{return((e=JSON.parse(localStorage.getItem("kiro_user")))==null?void 0:e.token)||null}catch{return null}}async function Tt(e,n={}){const s=nf(),r={"Content-Type":"application/json",...n.headers||{}};s&&(r.Authorization=`Bearer ${s}`);const i=await fetch(`${tf}${e}`,{...n,headers:r});if(i.status===401&&!e.includes("/auth/")){localStorage.removeItem("kiro_user"),window.location.reload();return}if(!i.ok){const l=await i.json().catch(()=>({}));throw Object.assign(new Error(l.message||i.statusText),{status:i.status})}return i.json()}const Ke={login:(e,n)=>Tt("/api/auth/login",{method:"POST",body:JSON.stringify({email:e,password:n})}),schedule:()=>Tt("/api/schedule"),library:()=>Tt("/api/library"),tasks:()=>Tt("/api/tasks"),setTaskStatus:(e,n)=>Tt(`/api/tasks/${e}/status`,{method:"PATCH",body:JSON.stringify({status:n})}),announcements:()=>Tt("/api/announcements"),links:()=>Tt("/api/links")};function sf({onLogin:e}){const[n,s]=E.useState(""),[r,i]=E.useState(""),[l,o]=E.useState(!1),[a,c]=E.useState(""),[u,m]=E.useState(!1),[y,p]=E.useState(!1),x=E.useRef(null);E.useEffect(()=>(document.body.className="login-page",localStorage.getItem("sessionExpired")&&(p(!0),localStorage.removeItem("sessionExpired")),()=>{document.body.className=""}),[]),E.useEffect(()=>{const j=x.current;if(!j)return;const L=j.getContext("2d");let h=[],d;const f=()=>{j.width=window.innerWidth,j.height=window.innerHeight},g=()=>({x:Math.random()*j.width,y:Math.random()*j.height,r:Math.random()*1.8+.4,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,o:Math.random()*.08+.03}),k=()=>{f(),h=Array.from({length:60},g)},_=()=>{L.clearRect(0,0,j.width,j.height),h.forEach(S=>{L.beginPath(),L.arc(S.x,S.y,S.r,0,Math.PI*2),L.fillStyle=`rgba(200,255,0,${S.o})`,L.fill(),S.x+=S.vx,S.y+=S.vy,S.x<-5&&(S.x=j.width+5),S.x>j.width+5&&(S.x=-5),S.y<-5&&(S.y=j.height+5),S.y>j.height+5&&(S.y=-5)}),d=requestAnimationFrame(_)};return k(),_(),window.addEventListener("resize",k,{passive:!0}),()=>{cancelAnimationFrame(d),window.removeEventListener("resize",k)}},[]);const w=async j=>{if(j.preventDefault(),!n||!r){c("Введите email и пароль");return}c(""),m(!0);try{const L=await Ke.login(n,r);e({token:L.token,...L.user})}catch(L){c(L.message||"Неверный email или пароль"),m(!1)}};return t.jsxs(t.Fragment,{children:[t.jsx("canvas",{id:"login-canvas",ref:x}),t.jsx("div",{className:"login-wrap",children:t.jsxs("div",{className:"login-card",children:[t.jsxs("div",{className:"login-brand",children:[t.jsx("span",{className:"login-brand-kiro",children:"KIRO"}),t.jsx("div",{className:"login-brand-sep"}),t.jsx("span",{className:"login-brand-platform",children:"Platform"})]}),t.jsx("h1",{className:"login-title",children:"IT Summer Camp '26"}),t.jsx("p",{className:"login-subtitle",children:"Войдите чтобы получить доступ к платформе"}),t.jsxs("form",{onSubmit:w,noValidate:!0,children:[t.jsxs("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",htmlFor:"login-email",children:"Логин"}),t.jsx("input",{type:"text",id:"login-email",name:"username",placeholder:"Ваш логин",autoComplete:"username",value:n,onChange:j=>s(j.target.value)})]}),t.jsxs("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",htmlFor:"login-password",children:"Пароль"}),t.jsxs("div",{className:"password-wrap",children:[t.jsx("input",{type:l?"text":"password",id:"login-password",name:"password",placeholder:"••••••••",autoComplete:"current-password",value:r,onChange:j=>i(j.target.value)}),t.jsx("button",{type:"button",className:"password-toggle",tabIndex:-1,onClick:()=>o(j=>!j),children:t.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),t.jsx("circle",{cx:"12",cy:"12",r:"3"})]})})]})]}),y&&t.jsx("div",{className:"login-error",style:{background:"rgba(255, 153, 0, 0.1)",borderColor:"#ff9900"},children:"⏰ Ваша сессия истекла. Пожалуйста, войдите снова."}),a&&t.jsx("div",{className:"login-error",children:a}),t.jsx("button",{type:"submit",className:"btn-primary btn-full",style:{marginTop:4},disabled:u,children:u?"Входим...":"Войти →"})]}),t.jsxs("p",{className:"login-note",children:["🔒 Доступ выдаётся менеджером после оплаты.",t.jsx("br",{}),"Для получения доступа напишите"," ",t.jsx("a",{href:"https://t.me/kiro_team_manager",target:"_blank",rel:"noopener",children:"@kiro_team_manager"})]})]})})]})}function rf(e){return(e||"").split(" ").map(n=>n[0]||"").join("").toUpperCase().slice(0,2)||"?"}const lf=[{page:"dashboard",label:"Дэшборд"},{page:"schedule",label:"Расписание"},{page:"library",label:"Библиотека знаний"},{page:"tasks",label:"Задания"},{page:"links",label:"Полезные ссылки"}];function of({user:e,currentPage:n,onNavigate:s,onLogout:r,onClose:i}){const[l,o]=E.useState(!1),a=rf((e==null?void 0:e.name)||"");return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"sidebar-header",children:[t.jsxs("a",{className:"sidebar-logo",href:"#",children:[t.jsx("span",{className:"sidebar-logo-kiro",children:"KIRO"}),t.jsx("span",{className:"sidebar-logo-platform",children:"CAMP"})]}),t.jsx("button",{className:"sidebar-close-btn",onClick:i,children:"×"})]}),t.jsxs("div",{className:"sidebar-user",children:[t.jsx("div",{className:"sidebar-avatar",children:a}),t.jsx("div",{className:"sidebar-user-name",children:(e==null?void 0:e.name)||"—"})]}),t.jsx("nav",{className:"sidebar-nav",children:lf.map(c=>t.jsx("button",{className:`nav-item${n===c.page?" active":""}`,onClick:()=>s(c.page),children:c.label},c.page))}),t.jsx("div",{className:"sidebar-footer",children:l?t.jsxs("div",{className:"logout-confirm",children:[t.jsx("div",{className:"logout-confirm-text",children:"Выйти из аккаунта?"}),t.jsxs("div",{className:"logout-confirm-btns",children:[t.jsx("button",{className:"logout-btn-yes",onClick:r,children:"Выйти"}),t.jsx("button",{className:"logout-btn-no",onClick:()=>o(!1),children:"Отменить"})]})]}):t.jsx("button",{className:"nav-item nav-item--logout",onClick:()=>o(!0),children:"Выйти"})})]})}const af={dashboard:"Дэшборд",schedule:"Расписание",library:"Библиотека знаний",tasks:"Задания",links:"Полезные ссылки"};function cf(e){return e.split(" ").map(n=>n[0]||"").join("").toUpperCase().slice(0,2)}function df({user:e,page:n,onMenuClick:s}){const r=e?cf(e.name):"??";return t.jsxs("header",{className:"top-bar",children:[t.jsxs("button",{className:"hamburger",onClick:s,children:[t.jsx("span",{}),t.jsx("span",{}),t.jsx("span",{})]}),t.jsx("span",{className:"top-bar-title",children:af[n]||n}),t.jsx("div",{className:"top-bar-avatar",children:r})]})}function uf({day:e,onClose:n}){var s;return E.useEffect(()=>{document.body.style.overflow="hidden";const r=i=>{i.key==="Escape"&&n()};return document.addEventListener("keydown",r),()=>{document.body.style.overflow="",document.removeEventListener("keydown",r)}},[n]),e?t.jsx("div",{className:"modal-overlay active",onClick:r=>{r.target===r.currentTarget&&n()},children:t.jsxs("div",{className:"modal-box",children:[t.jsxs("div",{className:"modal-header",children:[t.jsxs("div",{children:[t.jsxs("div",{className:"modal-day-num",children:["День ",e.num??e.id," · ",e.date]}),t.jsx("div",{className:"modal-day-title",children:e.title})]}),t.jsx("button",{className:"modal-close",onClick:n,children:"×"})]}),t.jsx("div",{className:"modal-body",children:(s=e.mats)!=null&&s.length?t.jsx("div",{className:"mat-links",children:e.mats.map((r,i)=>t.jsxs("a",{href:r.url,className:"mat-link",target:"_blank",rel:"noopener",children:[t.jsx("span",{className:"mat-link-title",children:r.title}),t.jsx("span",{className:"mat-link-arrow",children:"→"})]},i))}):t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Материалы появятся скоро."})})]})}):null}const Mt=[{id:1,day:1,date:"пн, 1 июня",type:"intro",title:"Вводное занятие: старт лагеря",theory:["Знакомство с форматом: как устроены занятия, созвоны и ДЗ","Обзор платформы: где находить материалы, задания и расписание","Инструменты для старта: установка редактора кода и необходимого ПО","Рекомендации по учёбе, работе с ментором и одногруппниками","Знакомство участников: первый круговой созвон"],tasks:["Установить редактор кода и инструменты по инструкции на платформе",'Написать программу "Hello, World!" и запустить в терминале'],hw:'Установить все инструменты и написать в чат: "Готов(а) к старту!" — это твой первый ДЗ.'},{id:2,day:2,date:"вт, 2 июня",type:"lecture",title:"Основы программирования: переменные, типы, условия",theory:["Что такое программа: инструкции, данные, порядок выполнения","Переменные и типы данных: числа, строки, булевы значения, пустое значение","Арифметические, логические операторы и операторы сравнения","Условные операторы: if / elif / else — синтаксис и примеры","Ввод и вывод данных: как программа общается с пользователем"],tasks:["Написать калькулятор с 4 операциями (+, −, ×, ÷)",'Задача: "Угадай число" — пользователь вводит, программа сравнивает'],hw:"3 задачи на условия из Codeforces уровня A. Ссылки на платформе."},{id:3,day:3,date:"ср, 3 июня",type:"lecture",title:"Основы программирования: циклы, функции, коллекции",theory:["Циклы: повторение по счётчику и по условию — когда что","Прерывание и продолжение цикла","Функции: объявление, параметры, возвращаемое значение, область видимости","Работа с коллекциями: массивы/списки — добавление, удаление, срезы","Принципы читаемого кода: именование, отступы, минимум комментариев"],tasks:["FizzBuzz — классика программирования","Функция для проверки является ли число простым","Написать таблицу умножения через вложенные циклы"],hw:"Функция подсчёта суммы всех чётных чисел в массиве. Написать 2 варианта: через цикл и через встроенные инструменты языка."},{id:4,day:4,date:"чт, 4 июня",type:"lecture",title:"Алгоритмическое мышление и Big O",theory:["Что такое алгоритм: чёткость, конечность, результат","Нотация Big O: O(1), O(n), O(n²), O(log n), O(n log n)","Как анализировать время и память алгоритма","Примеры: линейный vs бинарный поиск, пузырьковая vs быстрая сортировка","Зачем это знать: каждое техническое собеседование спрашивает Big O"],tasks:["Определить сложность 5 данных алгоритмов","Написать два решения одной задачи с разной сложностью — сравнить"],hw:"Задача: найти пару элементов с заданной суммой — два решения разной сложности."},{id:5,day:5,date:"пт, 5 июня",type:"lecture",title:"Дискретная математика: логика и множества",theory:["Булева алгебра: AND, OR, NOT, XOR, импликация, эквивалентность","Таблицы истинности: как строить и читать","Теория множеств: объединение, пересечение, разность, подмножество","Применение в программировании: битовые операции, фильтрация данных, индексы"],tasks:["Построить таблицу истинности для формулы с 3 переменными","Single Number (LeetCode #136) — через XOR"],hw:"Number of 1 Bits (LeetCode #191) и Power of Two (LeetCode #231) — через битовые операции."},{id:6,day:6,date:"сб, 6 июня",type:"lecture",title:"Дискретная математика: графы и алгоритмы",theory:["Граф: вершины, рёбра, типы (орграф, взвешенный, цикличный)","Представление: матрица смежности, список смежности — плюсы и минусы","BFS (поиск в ширину): алгоритм на очереди, применение","DFS (поиск в глубину): рекурсия и стек, применение","Алгоритмы на графах, создание и обзор графа через код"],tasks:["Реализовать BFS и DFS","Number of Islands (LeetCode #200)"],hw:"Clone Graph (LeetCode #133)."},{id:7,day:7,date:"вс, 7 июня",type:"lecture",title:"Структуры данных: массивы и связанные списки",theory:["Массивы: хранение в памяти, доступ за O(1), вставка и удаление","Динамические массивы: как массив растёт под капотом при добавлении","Связанный список: узлы и указатели, операции и их сложность","Двусвязный список: обход в обе стороны","Когда массив, когда связный список — таблица сравнения"],tasks:["Реализовать LinkedList с методами: add, remove, find, print","Задача: перевернуть связанный список in-place"],hw:"Reverse Linked List (LeetCode #206) — итеративно и рекурсивно."},{id:8,day:8,date:"пн, 8 июня",type:"lecture",title:"Структуры данных: стек и очередь",theory:["Стек (Stack): принцип LIFO, операции push/pop/peek — O(1)","Применение стека: история браузера, undo/redo, вычисление выражений","Очередь (Queue): принцип FIFO, enqueue/dequeue","Применение очереди: очередь задач, BFS-обходы, буфер","Deque (двусторонняя очередь): когда нужны операции с обоих концов"],tasks:["Реализовать стек через массив и через связный список","Задача: Valid Parentheses (LeetCode #20)"],hw:"Implement Queue using Stacks (LeetCode #232) — реализовать очередь из двух стеков."},{id:9,day:9,date:"вт, 9 июня",type:"lecture",title:"Структуры данных: хэш-таблицы",theory:["Идея хеширования: ключ → индекс за O(1)","Хеш-функции: что делает функцию хорошей","Метод 1 — Chaining (цепочка): каждая ячейка хранит список (цепочку) всех элементов с одинаковым хешем","Метод 2 — Open Addressing / Linear Probing: при коллизии ищем следующую свободную ячейку (hash(key), hash(key)+1, hash(key)+2...)","Метод 3 — Double Hashing: две хеш-функции для более эффективного поиска (hash1(key), hash1(key)+hash2(key), hash1(key)+2*hash2(key)...)","Сравнение методов: Chaining проще, Double Hashing лучше для кэша","Словари и хэш-мапы: встроенные реализации в разных языках (Python dict, JavaScript Map)","Применение: кэширование, поиск, дедупликация, частотный анализ, индексирование"],tasks:["Two Sum (LeetCode #1) — решить с хэш-таблицей","Group Anagrams (LeetCode #49)"],hw:"Longest Substring Without Repeating Characters (LeetCode #3)."},{id:10,day:10,date:"ср, 10 июня",type:"lecture",title:"Структуры данных: деревья",theory:["Дерево: узлы, рёбра, корень, листья, высота, уровни","Бинарное дерево поиска (BST): свойство, вставка, поиск, удаление","Обходы: in-order, pre-order, post-order — рекурсивно и итеративно","AVL-деревья: самобалансирующееся дерево, коэффициент баланса, повороты (LL, RR, LR, RL)","AVL операции: O(log n) для поиска, вставки, удаления благодаря балансировке","Red-Black деревья: цвета узлов (красный/чёрный), правила балансировки, менее строгие чем AVL","Red-Black преимущества: меньше ротаций при вставке/удалении, проще реализация","Когда какое дерево: AVL для частого поиска, Red-Black для частых обновлений","Применение деревьев: файловая система, индексы в БД, STL map/set в C++"],tasks:["Реализовать BST с insert, search, min/max","Maximum Depth of Binary Tree (LeetCode #104)"],hw:"Validate Binary Search Tree (LeetCode #98)."}],pd=[{month:"june",week:"Неделя 1 · 1–7 июня",days:[{id:1,date:"1 июня",title:"Введение. Алгоритмы и Big O",status:"done",mats:[]},{id:2,date:"2 июня",title:"Массивы и связанные списки",status:"done",mats:[]},{id:3,date:"3 июня",title:"Стеки, очереди, хэш-таблицы",status:"done",mats:[]},{id:4,date:"4 июня",title:"Деревья. BFS и DFS",status:"available",mats:[]},{id:5,date:"5 июня",title:"Графы и алгоритмы",status:"available",mats:[]},{id:6,date:"6 июня",title:"Динамическое программирование",status:"available",mats:[]},{id:7,date:"7 июня",title:"Обзор и закрепление недели 1",status:"available",mats:[]}]},{month:"june",week:"Неделя 2 · 8–10 июня",days:[{id:8,date:"8 июня",title:"Структуры данных: стеки и очереди",status:"available",mats:[]},{id:9,date:"9 июня",title:"Структуры данных: хеш-таблицы",status:"available",mats:[]},{id:10,date:"10 июня",title:"Структуры данных: деревья",status:"available",mats:[]}]}],hf={intro:"#6eb5ff",lecture:"#c8ff00",insider:"#a07aff",project:"#ff9f50",org:"#8a8a9a",demo:"#ff5f5f"},yd={intro:"Введение",lecture:"Лекция",insider:"Insider Show",project:"Проект",org:"Орг",demo:"Демо-день"},xd={intro:"badge--blue",lecture:"badge--lime",insider:"badge--purple",project:"badge--orange",org:"badge--gray",demo:"badge--red"},Ul={1:"https://disk.yandex.ru/d/vBFq6jGQXn3XeQ",2:"https://disk.yandex.ru/d/8ND9CE1jN-KZag",3:"https://disk.yandex.ru/d/Dp9TSjAzcaPIzQ",4:"https://disk.yandex.ru/d/nGMtfv16ARM5Vw",5:"https://disk.yandex.ru/d/m6St3COwjHEWLA",6:"https://disk.yandex.ru/d/hwlCvydBRTSdDg",7:"https://disk.yandex.ru/d/SFt-fMhRjdX4cw",8:"https://disk.yandex.ru/d/5TtGY3PUU6jXTw",9:"https://disk.yandex.ru/d/BpbiXs33cjNrtQ",10:"https://disk.yandex.ru/d/S4ow_h8TF367kg"};function ff(){return t.jsxs("div",{className:"skeleton-schedule-day",children:[t.jsx("div",{className:"skeleton skeleton-title"}),t.jsx("div",{className:"skeleton skeleton-block",style:{width:"60%"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"90%"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"85%"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"70%"}})]})}function mf(){return t.jsxs("div",{className:"skeleton-schedule-day",children:[t.jsx("div",{className:"skeleton skeleton-block",style:{width:"80%",height:18}}),t.jsx("div",{className:"skeleton skeleton-title",style:{margin:"8px 0"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"50%"}})]})}function gd(){return t.jsxs("div",{className:"skeleton-news-card",children:[t.jsx("div",{className:"skeleton skeleton-news-card-title"}),t.jsx("div",{className:"skeleton skeleton-news-card-text"}),t.jsx("div",{className:"skeleton skeleton-news-card-text"})]})}function pf(){return t.jsxs("div",{className:"skeleton-schedule-day",children:[t.jsx("div",{className:"skeleton skeleton-block",style:{width:"30%",height:14}}),t.jsx("div",{className:"skeleton skeleton-title",style:{margin:"8px 0"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"65%"}})]})}function jd(){return t.jsx("div",{style:{marginBottom:24},children:[1,2,3].map(e=>t.jsxs("div",{style:{marginBottom:16},children:[t.jsxs("div",{style:{display:"flex",gap:10,marginBottom:8},children:[t.jsx("div",{className:"skeleton skeleton-block",style:{width:"80px"}}),t.jsx("div",{className:"skeleton skeleton-block",style:{flex:1}})]}),t.jsx("div",{className:"skeleton skeleton-block",style:{height:8}})]},e))})}const yf=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],xf=["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"];function gf(){const e=new Date;e.setHours(0,0,0,0);const n=[{label:"Июнь",total:30,start:new Date(2026,5,1)},{label:"Июль",total:31,start:new Date(2026,6,1)},{label:"Август",total:31,start:new Date(2026,7,1)}];return t.jsx("div",{className:"camp-progress",children:n.map(s=>{let r=0;const i=Array.from({length:s.total},(l,o)=>{const a=new Date(s.start);a.setDate(a.getDate()+o);const c=a.getTime()===e.getTime(),u=a<e;return(c||u)&&r++,{isToday:c,isPast:u}});return t.jsxs("div",{className:"camp-month-bar",children:[t.jsxs("div",{className:"camp-month-head",children:[t.jsx("span",{className:"camp-month-name",children:s.label}),t.jsxs("span",{className:"camp-month-pct",children:[r,"/",s.total," · ",Math.round(r/s.total*100),"%"]})]}),t.jsx("div",{className:"camp-segs",children:i.map((l,o)=>t.jsx("div",{className:`camp-seg${l.isToday?" s-today":l.isPast?" s-past":""}`},o))})]},s.label)})})}function jf(e){const n=Math.floor(e/3600),s=Math.floor(e%3600/60),r=e%60;return`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Nf({onOpenDay:e,onNavigate:n}){var A,$,Y;const[s,r]=E.useState([]),[i,l]=E.useState(Mt),[o,a]=E.useState(pd),[c,u]=E.useState(()=>localStorage.getItem("kiro_notes")||""),[m,y]=E.useState(!0),[p,x]=E.useState(0),[w,j]=E.useState(25),[L,h]=E.useState(0),[d,f]=E.useState(null),[g,k]=E.useState(!1),_=E.useRef(null);E.useEffect(()=>{const P=Date.now(),pe=500;Promise.all([Ke.announcements().then(r).catch(()=>{}),Ke.schedule().then(l).catch(()=>{}),Ke.library().then(a).catch(()=>{})]).then(()=>{const vn=Date.now()-P,Ye=Math.max(0,pe-vn);setTimeout(()=>y(!1),Ye)})},[]),E.useEffect(()=>(g?_.current=setInterval(()=>{f(P=>P<=1?(clearInterval(_.current),k(!1),0):P-1)},1e3):clearInterval(_.current),()=>clearInterval(_.current)),[g]);const S=p*3600+w*60+L,O=()=>{d===null&&f(S),k(!0)},F=()=>k(!1),b=()=>{k(!1),f(null)},X=P=>{u(P.target.value),localStorage.setItem("kiro_notes",P.target.value)},ve=new Date,Oe=ve.getFullYear()===2026&&ve.getMonth()===5?ve.getDate():null,us=Oe?Ul[Oe]:null,Nn=o.flatMap(P=>P.days),Ge=Oe?Nn.find(P=>(P.num??P.id)===Oe):null,T=i.filter(P=>Oe?P.day>=Oe:!0).slice(0,3),D=`${xf[ve.getDay()]}, ${ve.getDate()} ${yf[ve.getMonth()]} ${ve.getFullYear()}`;return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Дэшборд"}),t.jsx("p",{className:"page-subtitle",style:{textTransform:"capitalize"},children:D})]}),m?t.jsx(jd,{}):t.jsx(gf,{}),t.jsxs("div",{className:"dash-grid",children:[t.jsxs("div",{className:"dash-col",children:[t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:"Новости и обновления"})}),m?[1,2].map(P=>t.jsx(gd,{},P)):s.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13,padding:"4px 0"},children:"Объявлений пока нет"}):s.slice(0,3).map((P,pe)=>t.jsxs("div",{className:"news-card fade-in",style:{animationDelay:`${pe*.05}s`},children:[t.jsxs("div",{className:"news-card-head",children:[t.jsxs("span",{className:"news-card-title",children:[P.icon||"📢"," ",P.title]}),t.jsx("span",{className:"news-card-date",children:P.published_at})]}),t.jsx("div",{className:"news-card-text",children:P.text})]},P.id)),!m&&s.length>3&&t.jsx("div",{className:"dash-nav-link",style:{marginTop:10},onClick:()=>n("announcements"),children:"Показать еще →"})]}),t.jsxs("div",{className:"widget",children:[t.jsxs("div",{className:"widget-header",children:[t.jsx("span",{className:"widget-title",children:"Заметки"}),t.jsx("button",{onClick:()=>{u(""),localStorage.removeItem("kiro_notes")},style:{fontSize:12,color:"var(--text-tertiary)",background:"none",border:"none",cursor:"pointer"},children:"Очистить"})]}),t.jsx("textarea",{className:"notes-area",value:c,onChange:X,placeholder:"Пиши здесь что угодно — сохраняется автоматически"})]})]}),t.jsxs("div",{className:"dash-col",children:[t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:Oe?`Сегодня — День ${Oe}`:"Сегодня"})}),Oe?t.jsxs(t.Fragment,{children:[us&&t.jsx("a",{href:us,target:"_blank",rel:"noopener",className:"today-block",children:t.jsxs("div",{children:[t.jsx("div",{className:"today-block-label",children:"Домашнее задание"}),t.jsx("div",{className:"today-block-link",children:"Открыть папку с ДЗ →"})]})}),Ge&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"today-block",style:(A=Ge.mats)!=null&&A.length?{cursor:"pointer"}:void 0,onClick:($=Ge.mats)!=null&&$.length?()=>e(Ge):void 0,children:t.jsxs("div",{children:[t.jsx("div",{className:"today-block-label",children:"Материалы дня"}),t.jsxs("div",{className:"today-block-text",children:[Ge.title,(Y=Ge.mats)!=null&&Y.length?" →":""]})]})}),t.jsx("div",{className:"dash-nav-link",onClick:()=>n("library"),children:"Все материалы →"})]})]}):t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13},children:"Лагерь ещё не начался или завершился"})]}),t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:"Ближайшие события"})}),m?[1,2,3].map(P=>t.jsx(pf,{},P)):T.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13},children:"Событий нет"}):T.map((P,pe)=>t.jsxs("div",{className:"event-mini fade-in",style:{animationDelay:`${pe*.05}s`},children:[t.jsxs("div",{className:"event-mini-day",children:["День ",P.day]}),t.jsx("div",{className:"event-mini-title",children:P.title}),t.jsx("span",{className:`badge ${xd[P.type]||"badge--gray"}`,style:{flexShrink:0},children:yd[P.type]||P.type})]},pe)),t.jsx("div",{className:"dash-nav-link",style:{marginTop:10},onClick:()=>n("schedule"),children:"Все события →"})]}),t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:"Таймер"})}),d!==null?t.jsx("div",{className:`timer-display${d===0?" timer-done":""}`,children:d===0?"Время вышло!":jf(d)}):t.jsxs("div",{className:"timer-setup",children:[t.jsx("input",{type:"number",min:"0",max:"23",value:p,onChange:P=>x(Math.max(0,Math.min(23,+P.target.value||0)))}),t.jsx("span",{children:"ч"}),t.jsx("input",{type:"number",min:"0",max:"59",value:w,onChange:P=>j(Math.max(0,Math.min(59,+P.target.value||0)))}),t.jsx("span",{children:"мин"}),t.jsx("input",{type:"number",min:"0",max:"59",value:L,onChange:P=>h(Math.max(0,Math.min(59,+P.target.value||0)))}),t.jsx("span",{children:"сек"})]}),t.jsxs("div",{className:"timer-btns",children:[d===null?t.jsx("button",{className:"timer-btn-start",onClick:O,disabled:S===0,children:"Старт"}):g?t.jsx("button",{className:"timer-btn-pause",onClick:F,children:"Пауза"}):d>0?t.jsx("button",{className:"timer-btn-start",onClick:O,children:"Продолжить"}):null,d!==null&&t.jsx("button",{className:"timer-btn-reset",onClick:b,children:"Сбросить"})]})]})]})]})]})}const vf=[{value:"all",label:"Все"},{value:"lecture",label:"Лекции"},{value:"project",label:"Проекты"},{value:"insider",label:"Insider Show"},{value:"org",label:"Орг"}],wf=[{label:"Неделя 1 · 1–7 июня",start:1,end:7},{label:"Неделя 2 · 8–14 июня",start:8,end:14},{label:"Неделя 3 · 15–21 июня",start:15,end:21},{label:"Неделя 4 · 22–28 июня",start:22,end:28},{label:"Неделя 5 · 29–30 июня",start:29,end:99}];function kf(e){return e<=30?new Date(2026,5,e):new Date(2026,6,e-30)}function Sf(e){const n=new Date;return n.setHours(0,0,0,0),kf(e)<=n}function Zo(e){const n=new Date;if(n.getFullYear()!==2026||n.getMonth()!==5)return null;const s=e.find(r=>r.day===n.getDate());return s?s.id:null}function _f(){const e=new Date;e.setHours(0,0,0,0);const n=[{label:"Июнь",total:30,start:new Date(2026,5,1)},{label:"Июль",total:31,start:new Date(2026,6,1)},{label:"Август",total:31,start:new Date(2026,7,1)}];return t.jsx("div",{className:"camp-progress",children:n.map(s=>{let r=0;const i=Array.from({length:s.total},(o,a)=>{const c=new Date(s.start);c.setDate(c.getDate()+a);const u=c.getTime()===e.getTime(),m=c<e;return(u||m)&&r++,{isToday:u,isPast:m}}),l=Math.round(r/s.total*100);return t.jsxs("div",{className:"camp-month-bar",children:[t.jsxs("div",{className:"camp-month-head",children:[t.jsx("span",{className:"camp-month-name",children:s.label}),t.jsxs("span",{className:"camp-month-pct",children:[r,"/",s.total," · ",l,"%"]})]}),t.jsx("div",{className:"camp-segs",children:i.map((o,a)=>t.jsx("div",{className:`camp-seg${o.isToday?" s-today":o.isPast?" s-past":""}`},a))})]},s.label)})})}function Ef({day:e,expanded:n,onToggle:s}){var c;const r=hf[e.type]||"#8a8a9a",i=xd[e.type]||"badge--gray",l=yd[e.type]||e.type,o=Ul[e.day],a=Sf(e.day);return t.jsxs("div",{className:`sched-day${n?" sched-day--open":""}`,children:[t.jsxs("div",{className:"sched-day-header",onClick:s,children:[t.jsx("div",{className:"sched-day-stripe",style:{background:r}}),t.jsxs("div",{className:"sched-day-meta",children:[t.jsxs("span",{className:"sched-day-num",children:["День ",e.day]}),t.jsx("span",{className:"sched-day-sep",children:"·"}),t.jsx("span",{className:"sched-day-date",children:e.date})]}),t.jsx("div",{className:"sched-day-title",children:e.title}),t.jsx("span",{className:`badge ${i}`,children:l}),t.jsx("span",{className:"sched-chevron",children:n?"▴":"▾"})]}),n&&t.jsxs("div",{className:"sched-day-body",children:[(e.meeting_time||e.meeting_link)&&t.jsxs("div",{className:"sched-section",children:[t.jsx("div",{className:"sched-section-label",children:"Встреча"}),t.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"center"},children:[e.meeting_time&&t.jsxs("span",{style:{fontSize:"14px",fontWeight:600,color:"var(--accent-lime)"},children:["🕐 ",e.meeting_time]}),e.meeting_link&&(a?t.jsx("a",{href:e.meeting_link,target:"_blank",rel:"noopener",className:"hw-drive-btn",children:"🔗 Присоединиться →"}):t.jsxs("span",{className:"hw-drive-btn hw-drive-btn--locked",children:["🔒 Доступ ",e.date]}))]})]}),((c=e.theory)==null?void 0:c.length)>0&&t.jsxs("div",{className:"sched-section",children:[t.jsx("div",{className:"sched-section-label",children:"Теория"}),t.jsx("ul",{className:"sched-list",children:e.theory.map((u,m)=>t.jsx("li",{children:u},m))})]}),o&&t.jsxs("div",{className:"sched-section",children:[t.jsx("div",{className:"sched-section-label",children:"Домашнее задание"}),a?t.jsx("a",{href:o,className:"hw-drive-btn",target:"_blank",rel:"noopener",children:"Открыть папку с ДЗ →"}):t.jsxs("span",{className:"hw-drive-btn hw-drive-btn--locked",children:["🔒 Откроется ",e.date]})]})]})]})}function Nd(){const[e,n]=E.useState("all"),[s,r]=E.useState(Mt),[i,l]=E.useState(()=>Zo(Mt)),[o,a]=E.useState(!0);E.useEffect(()=>{const m=Date.now(),y=500;Ke.schedule().then(p=>{r(p);const x=Zo(p);x!==null&&l(x);const w=Date.now()-m,j=Math.max(0,y-w);setTimeout(()=>a(!1),j)}).catch(()=>{const p=Date.now()-m,x=Math.max(0,y-p);setTimeout(()=>a(!1),x)})},[]);const c=e==="all"?s:s.filter(m=>m.type===e),u=m=>l(y=>y===m?null:m);return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Расписание"}),t.jsx("p",{className:"page-subtitle",children:"Программа лагеря — теория, задания и ДЗ по каждому дню"})]}),o?t.jsx(jd,{}):t.jsx(_f,{}),t.jsx("div",{className:"schedule-controls",children:vf.map(m=>t.jsx("button",{className:`filter-btn${e===m.value?" active":""}`,onClick:()=>{n(m.value),l(null)},disabled:o,children:m.label},m.value))}),o?t.jsx("div",{className:"sched-week",children:[1,2,3,4,5].map(m=>t.jsx(ff,{},m))}):wf.map(m=>{const y=c.filter(p=>p.day>=m.start&&p.day<=m.end);return y.length?t.jsxs("div",{className:"sched-week",children:[t.jsx("div",{className:"schedule-date-label",children:m.label}),y.map((p,x)=>t.jsx("div",{className:"fade-in",style:{animationDelay:`${x*.02}s`},children:t.jsx(Ef,{day:p,expanded:i===p.id,onToggle:()=>u(p.id)})},p.id))]},m.label):null}),!o&&!c.length&&t.jsx("p",{style:{color:"var(--text-tertiary)",padding:"20px 0"},children:"Нет занятий для этого фильтра"})]})}const Tf=[{value:"june",label:"Июнь — Фундамент",locked:!1},{value:"july",label:"Июль — Специализация",locked:!0},{value:"august",label:"Август — Карьера",locked:!0}],Cf=[{label:"Неделя 1 · 1–7 июня",start:1,end:7},{label:"Неделя 2 · 8–14 июня",start:8,end:14},{label:"Неделя 3 · 15–21 июня",start:15,end:21},{label:"Неделя 4 · 22–28 июня",start:22,end:28},{label:"Неделя 5 · 29–30 июня",start:29,end:99}],Of=["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"],Lf=["ЯНВАРЯ","ФЕВРАЛЯ","МАРТА","АПРЕЛЯ","МАЯ","ИЮНЯ","ИЮЛЯ","АВГУСТА","СЕНТЯБРЯ","ОКТЯБРЯ","НОЯБРЯ","ДЕКАБРЯ"];function bf(e){const n=new Date(2026,5,e);return`${Of[n.getDay()]}, ${e} ${Lf[n.getMonth()]}`}function Df(e){const n=new Date;return n.setHours(0,0,0,0),new Date(2026,5,e)<=n}function Af(e){const s=new Date().getDate();return e>=2&&e<=s}function Pf(e,n){const s={};n.forEach(i=>{i.days.forEach(l=>{const o=l.num??l.id;s[o]={title:l.title,mats:l.mats||[],id:l.id}})});const r={};return e.filter(i=>i.day>=1&&i.day<=30).forEach(i=>{r[i.day]=i.title}),Array.from({length:30},(i,l)=>{const o=l+1,a=s[o];return{id:(a==null?void 0:a.id)??o,day:o,title:(a==null?void 0:a.title)||r[o]||`День ${o}`,mats:(a==null?void 0:a.mats)||[]}})}function Rf({day:e,onOpen:n,onOpenTheory:s,onOpenQuestions:r,onOpenHomework:i}){var u;const l=!Df(e.day),o=Af(e.day),a=l?"rgba(255,255,255,0.08)":"#c8ff00",c=((u=e.mats)==null?void 0:u.length)>0;return t.jsx("div",{className:`sched-day${!l&&c?" sched-day--open":""}`,style:l?{opacity:.4}:c?{cursor:"pointer",borderColor:"rgba(200,255,0,0.1)"}:{cursor:"default"},onClick:!l&&c?()=>n(e):void 0,children:t.jsxs("div",{className:"sched-day-header",style:{pointerEvents:"none"},children:[t.jsx("div",{className:"sched-day-stripe",style:{background:a}}),t.jsxs("div",{className:"sched-day-meta",children:[t.jsx("span",{className:"sched-day-num",children:String(e.day).padStart(2,"0")}),t.jsx("span",{className:"sched-day-sep",children:"·"}),t.jsx("span",{className:"sched-day-date",children:bf(e.day)})]}),t.jsx("div",{className:"sched-day-title",children:e.title}),t.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[o&&t.jsxs(t.Fragment,{children:[t.jsx("button",{className:"theory-file-btn",onClick:m=>{m.stopPropagation(),s(e)},title:"Открыть теорию",children:"📚"}),e.day!==13&&t.jsx("button",{className:"theory-file-btn",onClick:m=>{m.stopPropagation(),r(e)},title:"Открыть задачи для тренировки",children:"✅"}),t.jsx("button",{className:"theory-file-btn",onClick:m=>{m.stopPropagation(),i(e)},title:"Открыть домашние задания",children:"📝"})]}),!l&&c&&t.jsx("button",{className:"theory-file-btn",onClick:m=>{m.stopPropagation(),n(e)},title:"Открыть материалы",children:"🔗"})]})]})})}function If({onOpenDay:e,onOpenTheory:n,onOpenQuestions:s,onOpenHomework:r}){const[i,l]=E.useState("june"),[o,a]=E.useState(pd),[c,u]=E.useState(Mt),[m,y]=E.useState(!0);E.useEffect(()=>{const x=Date.now(),w=500;Promise.all([Ke.library().then(a).catch(()=>{}),Ke.schedule().then(u).catch(()=>{})]).then(()=>{const j=Date.now()-x,L=Math.max(0,w-j);setTimeout(()=>y(!1),L)})},[]);const p=Pf(c,o);return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Библиотека знаний"}),t.jsx("p",{className:"page-subtitle",children:"Материалы лагеря по дням — нажми на день чтобы открыть"})]}),t.jsx("div",{className:"library-tabs",children:Tf.map(x=>t.jsxs("button",{className:`lib-tab${i===x.value?" active":""}${x.locked?" lib-tab--locked":""}`,onClick:x.locked?void 0:()=>l(x.value),disabled:x.locked,children:[x.label,x.locked?" 🔒":""]},x.value))}),i==="june"?m?t.jsx("div",{className:"sched-week",children:[1,2,3,4,5,6].map(x=>t.jsx(mf,{},x))}):Cf.map(x=>{const w=p.filter(j=>j.day>=x.start&&j.day<=x.end);return w.length?t.jsxs("div",{className:"sched-week",children:[t.jsx("div",{className:"schedule-date-label",children:x.label}),w.map((j,L)=>t.jsx("div",{className:"fade-in",style:{animationDelay:`${L*.02}s`},children:t.jsx(Rf,{day:j,onOpen:e,onOpenTheory:n,onOpenQuestions:s,onOpenHomework:r})},j.id))]},x.label):null}):t.jsx("p",{style:{color:"var(--text-tertiary)",padding:"20px 0"},children:"Материалы появятся позже"})]})}const Bf=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];function vd(e){return e<=30?new Date(2026,5,e):new Date(2026,6,e-30)}function zf(e){const n=new Date;return n.setHours(0,0,0,0),vd(e)<=n}function Ff(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Mf(){try{return JSON.parse(localStorage.getItem("kiro_hw_status")||"{}")}catch{return{}}}const ei=Array.from({length:30},(e,n)=>{const s=n+1,r=vd(s),i=s<=7?1:s<=14?2:s<=21?3:s<=28?4:5,l=`${String(r.getDate()).padStart(2,"0")} ${Bf[r.getMonth()]} ${r.getFullYear()}`;return{id:s,url:Ul[s],week:i,dateLabel:l,dateKey:Ff(r)}}),Hf=[{value:"all",label:"Все"},{value:"open",label:"Открытые"},{value:"done",label:"Выполненные"}];function Uf(){const[e,n]=E.useState(Mf),[s,r]=E.useState("all"),i=a=>{n(c=>{const u={...c,[a]:c[a]==="done"?"active":"done"};return localStorage.setItem("kiro_hw_status",JSON.stringify(u)),u})},l=ei.filter(a=>s==="done"?e[a.dateKey]==="done":s==="open"?e[a.dateKey]!=="done":!0),o=ei.filter(a=>e[a.dateKey]==="done").length;return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Задания"}),t.jsxs("p",{className:"page-subtitle",children:["Домашние задания по дням · Выполнено ",o,"/",ei.length]})]}),t.jsx("div",{className:"schedule-controls",children:Hf.map(a=>t.jsx("button",{className:`filter-btn${s===a.value?" active":""}`,onClick:()=>r(a.value),children:a.label},a.value))}),t.jsx("div",{children:l.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",padding:"20px 0"},children:"Нет заданий"}):l.map(a=>{const c=e[a.dateKey]==="done",u=zf(a.id);return t.jsxs("div",{className:`task-card${c?" task-card--done":""}`,children:[t.jsx("div",{className:`task-checkbox${c?" checked":""}`,onClick:()=>i(a.dateKey),children:c?"✓":""}),t.jsxs("div",{className:"task-body",children:[t.jsxs("div",{className:"task-title",children:["Домашнее задание от ",a.dateLabel,", Неделя ",a.week]}),t.jsx("div",{className:"task-meta",children:u?t.jsx("a",{href:a.url,target:"_blank",rel:"noopener",className:"hw-link-btn",children:"Открыть папку с ДЗ →"}):t.jsxs("span",{className:"hw-link-locked",children:["🔒 Открывается ",a.dateLabel]})})]})]},a.id)})})]})}const Gf=[{href:"https://t.me/kiro_team",icon:"📣",title:"Канал KIRO Team",desc:"Главный канал сообщества. Объявления, новости и важная информация о лагере.",tag:"→ Открыть в Telegram"},{href:"https://t.me/kiro_team_manager",icon:"👨‍💼",title:"Менеджер",desc:"Вопросы по оплате, доступу и организационным моментам — пиши менеджеру.",tag:"→ Написать менеджеру"}];function $f({onNavigate:e}){const[n,s]=E.useState([]);return E.useEffect(()=>{Ke.links().then(s).catch(()=>{})},[]),t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Полезные ссылки"}),t.jsx("p",{className:"page-subtitle",children:"Каналы, контакты и материалы для участников"})]}),t.jsxs("div",{className:"community-grid",children:[Gf.map((r,i)=>t.jsxs("a",{className:"community-card",href:r.href,target:"_blank",rel:"noopener",children:[t.jsx("div",{className:"community-card-icon",children:r.icon}),t.jsx("div",{className:"community-card-title",children:r.title}),t.jsx("div",{className:"community-card-desc",children:r.desc}),t.jsx("div",{className:"community-card-tag",children:r.tag})]},i)),n.map(r=>t.jsxs("a",{className:"community-card",href:r.url,target:"_blank",rel:"noopener",children:[t.jsx("div",{className:"community-card-icon",children:"🔗"}),t.jsx("div",{className:"community-card-title",children:r.title}),t.jsx("div",{className:"community-card-desc",children:r.description}),t.jsx("div",{className:"community-card-tag",children:"→ Открыть"})]},r.id)),t.jsxs("div",{className:"community-card",style:{border:"2px dashed var(--border-color)",background:"rgba(200,255,0,0.02)",display:"flex",flexDirection:"column",cursor:"default"},children:[t.jsx("div",{className:"community-card-icon",children:"🔗"}),t.jsx("div",{className:"community-card-title",children:"Полезные материалы"}),t.jsx("div",{className:"community-card-desc",children:"Здесь будут размещаться ссылки на статьи, видео, документацию и другие материалы по ходу лагеря."}),t.jsx("div",{style:{fontSize:11,color:"var(--text-tertiary)",marginTop:"auto",paddingTop:8,borderTop:"1px solid var(--border-color)"},children:"Скоро добавим →"})]})]}),t.jsxs("div",{style:{marginTop:32,padding:"16px",background:"rgba(200,255,0,0.05)",borderRadius:"8px",fontSize:13,color:"var(--text-secondary)",lineHeight:1.6},children:[t.jsx("strong",{children:"Где найти другие материалы:"}),t.jsxs("ul",{style:{marginTop:8},children:[t.jsxs("li",{children:["Домашнее задание — в"," ",t.jsx("button",{onClick:()=>e("tasks"),style:{background:"none",border:"none",color:"var(--accent-lime)",fontWeight:700,cursor:"pointer",textDecoration:"underline",padding:0,font:"inherit"},children:"Заданиях"})]}),t.jsxs("li",{style:{marginTop:4},children:["Материалы по дням лагеря — в"," ",t.jsx("button",{onClick:()=>e("library"),style:{background:"none",border:"none",color:"var(--accent-lime)",fontWeight:700,cursor:"pointer",textDecoration:"underline",padding:0,font:"inherit"},children:"Библиотеке знаний"})]})]})]})]})}function Wf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"KIRO IT SUMMER CAMP 2026"}),t.jsx("p",{className:"theory-subtitle",children:"Вводное занятие: старт лагеря"}),t.jsx("p",{className:"theory-date",children:"1 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Расписание занятий"}),t.jsxs("div",{className:"theory-card",children:[t.jsxs("div",{className:"theory-card-item",children:[t.jsx("span",{className:"theory-label",children:"Время проведения:"}),t.jsx("p",{className:"theory-text",children:"ежедневно примерно в 21:00 (9 вечера)"})]}),t.jsxs("div",{className:"theory-card-item",children:[t.jsx("span",{className:"theory-label",children:"Продолжительность:"}),t.jsx("p",{className:"theory-text",children:"примерно 1-1,5 часа"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Индивидуальный подход к обучению"}),t.jsx("p",{className:"theory-intro",children:"Интенсивность обучения регулируется по ходу лагеря в зависимости от ваших возможностей:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Объем домашнего задания подбирается индивидуально"}),t.jsx("li",{className:"theory-list-item",children:"Сколько времени в день вы можете уделять обучению — столько же мы будем давать вам в домашних заданиях"}),t.jsx("li",{className:"theory-list-item",children:"Если вы отстаете, вы можете только прослушать материал и попросить минимизировать или не давать домашнее задание"}),t.jsx("li",{className:"theory-list-item",children:"Все решения принимаются индивидуально с учетом ваших потребностей"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Выбор направления обучения"}),t.jsx("p",{className:"theory-intro",children:"В конце июня вы сможете выбрать специальность, на которой хотите сосредоточиться в июле-августе:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Если вы не можете выбрать направление — это совершенно нормально"}),t.jsx("li",{className:"theory-list-item",children:"Вы можете изучать все направления подряд"}),t.jsx("li",{className:"theory-list-item",children:"Кроме специализированных тем будут общие лекции"}),t.jsx("li",{className:"theory-list-item",children:"Вы сможете посещать лекции разных направлений по своему выбору"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Где найти материалы и домашние задания"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Записи занятий доступны на платформе лагеря"}),t.jsx("li",{className:"theory-list-item",children:"Домашние задания можно найти на платформе лагеря"}),t.jsx("li",{className:"theory-list-item",children:"Расписание занятий и ссылки на созвоны также находятся на платформе лагеря"}),t.jsx("li",{className:"theory-list-item",children:"Все важную информацию мы дублируем в беседе лагеря в Telegram"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Домашнее задание после первого занятия"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"1. Завести дневник лагеря"}),t.jsx("p",{className:"theory-intro",children:"Вы можете выбрать любой удобный для вас формат:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"На бумаге в тетради"}),t.jsx("li",{className:"theory-list-item",children:"В Google Таблице"}),t.jsx("li",{className:"theory-list-item",children:"В Notion"}),t.jsx("li",{className:"theory-list-item",children:"В любом другом удобном вам формате"})]}),t.jsx("p",{className:"theory-intro theory-mt",children:"В дневнике вы сможете:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Дублировать ссылки на материалы дня"}),t.jsx("li",{className:"theory-list-item",children:"Добавлять ссылки на домашние задания"}),t.jsx("li",{className:"theory-list-item",children:"Сохранять решения домашних заданий"}),t.jsx("li",{className:"theory-list-item",children:"Писать свои мысли и заметки"})]}),t.jsx("p",{className:"theory-highlight",children:"Дневник станет вашим личным хранилищем и конспектом на время обучения в лагере и после"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"2. Скачать Visual Studio Code"}),t.jsx("p",{className:"theory-text",children:"Это текстовый редактор для написания кода, который мы будем использовать на занятиях."}),t.jsx("p",{className:"theory-text",children:"Если у вас возникнут проблемы со скачиванием или установкой, обратитесь в беседе группы в Telegram — мы поможем!"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Добро пожаловать в KIRO IT SUMMER CAMP 2026! 🚀"})})]})}function I({headers:e,rows:n}){return t.jsx("div",{className:"theory-table-wrapper",children:t.jsxs("table",{className:"theory-table",children:[t.jsx("thead",{children:t.jsx("tr",{children:e.map((s,r)=>t.jsx("th",{children:s},r))})}),t.jsx("tbody",{children:n.map((s,r)=>t.jsx("tr",{children:s.map((i,l)=>t.jsx("td",{children:i},l))},r))})]})})}function N({code:e,language:n="js"}){return t.jsxs("div",{className:"theory-code-block",children:[t.jsx("div",{className:"theory-code-label",children:n}),t.jsx("pre",{className:"theory-code",children:t.jsx("code",{children:e})})]})}function R({title:e,children:n}){return t.jsxs("div",{className:"theory-example",children:[t.jsxs("div",{className:"theory-example-title",children:["💡 ",e]}),t.jsx("div",{className:"theory-example-content",children:n})]})}function ke({name:e,columns:n,rows:s,highlightRows:r=[],highlightCols:i=[],caption:l}){return t.jsxs("div",{className:"db-table-illustration",style:{margin:"16px 0"},children:[e&&t.jsx("div",{style:{display:"inline-block",background:"var(--accent-lime)",color:"#0a0a14",fontWeight:700,fontSize:"12px",padding:"3px 12px",borderRadius:"6px 6px 0 0",fontFamily:"monospace"},children:e}),t.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:e?"0 8px 8px 8px":"8px"},children:t.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px",minWidth:"max-content"},children:[t.jsx("thead",{children:t.jsx("tr",{children:n.map((o,a)=>t.jsx("th",{style:{padding:"8px 14px",textAlign:"left",whiteSpace:"nowrap",background:i.includes(a)?"rgba(200,255,0,0.18)":"var(--bg-secondary)",color:i.includes(a)?"var(--accent-lime)":"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontFamily:"monospace",fontWeight:700},children:o},a))})}),t.jsx("tbody",{children:s.map((o,a)=>t.jsx("tr",{style:{background:r.includes(a)?"rgba(200,255,0,0.10)":"transparent"},children:o.map((c,u)=>t.jsx("td",{style:{padding:"7px 14px",whiteSpace:"nowrap",borderBottom:"1px solid var(--border-color)",color:i.includes(u)||r.includes(a)?"var(--text-primary)":"var(--text-secondary)",fontWeight:i.includes(u)?600:400},children:c},u))},a))})]})}),l&&t.jsx("div",{style:{fontSize:"12px",color:"var(--text-tertiary)",marginTop:"6px",fontStyle:"italic"},children:l})]})}function Vf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 2"}),t.jsx("p",{className:"theory-subtitle",children:"Основы программирования: переменные, типы, условия"}),t.jsx("p",{className:"theory-date",children:"2 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое программа?"}),t.jsx("p",{className:"theory-text",children:"Программа — это набор инструкций, которые компьютер выполняет по порядку. Программист пишет код на специальном языке (например, Python, JavaScript), а компьютер этот код понимает и исполняет."}),t.jsx("p",{className:"theory-text",style:{marginTop:"12px"},children:"Каждая программа состоит из трёх основных частей:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Данные"})," — информация, с которой работает программа"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Инструкции"})," — команды, что делать с данными"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Порядок выполнения"})," — в каком порядке выполнять инструкции"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Переменные"}),t.jsx("p",{className:"theory-intro",children:'Переменная — это "ящик" в памяти компьютера, где можно хранить данные. У каждого ящика есть имя (название переменной) и значение (то, что в нём хранится).'}),t.jsxs(R,{title:"Аналогия из реальной жизни",children:[t.jsx("p",{children:"Представь, что переменная — это коробка, на которой написано имя:"}),t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Коробка"})," = переменная"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Надпись на коробке"}),' = имя переменной (например, "возраст")']}),t.jsxs("li",{children:[t.jsx("strong",{children:"То, что внутри коробки"})," = значение (например, число 17)"]})]})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Как объявить переменную:"}),t.jsx(N,{code:`// Python
name = "Иван"
age = 17
height = 180.5

// JavaScript
let name = "Иван"
let age = 17
let height = 180.5`}),t.jsx("p",{className:"theory-intro",children:"Правила для имён переменных:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Имя должно начинаться с буквы или подчёркивания (_)"}),t.jsx("li",{className:"theory-list-item",children:"В имени можно использовать буквы, цифры и подчёркивание"}),t.jsx("li",{className:"theory-list-item",children:"Имя не может содержать пробелы"}),t.jsx("li",{className:"theory-list-item",children:"Придумывай понятные имена (age лучше, чем x)"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Типы данных"}),t.jsx("p",{className:"theory-intro",children:"Тип данных — это категория информации. Например, число — это один тип, текст — другой."}),t.jsx(I,{headers:["Тип","Описание","Примеры","Для чего"],rows:[["int/число","Целое число (без запятой)","17, -5, 1000","Возраст, количество"],["float/число","Число с запятой","3.14, -0.5, 180.5","Высота, вес, вычисления"],["str/строка","Текст (в кавычках)",'"Иван", "Hello"',"Имена, сообщения"],["bool/логический","Истина или ложь","true, false","Проверки, условия"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"20px"},children:"Как проверить тип данных:"}),t.jsx(N,{code:`// Python
name = "Иван"
age = 17
print(type(name))  # <class 'str'>
print(type(age))   # <class 'int'>

// JavaScript
let name = "Иван"
let age = 17
console.log(typeof name)  // "string"
console.log(typeof age)   // "number"`})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Операторы"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Арифметические операторы"}),t.jsx("p",{className:"theory-intro",children:"Используются для математических операций:"}),t.jsx(I,{headers:["Оператор","Название","Пример","Результат"],rows:[["+","Сложение","5 + 3","8"],["-","Вычитание","10 - 4","6"],["*","Умножение","6 * 7","42"],["/","Деление","20 / 4","5"],["**","Возведение в степень","2 ** 3","8"],["%","Остаток от деления","17 % 5","2"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операторы сравнения"}),t.jsx("p",{className:"theory-intro",children:"Используются для проверки, сравнивают два значения и возвращают true или false:"}),t.jsx(I,{headers:["Оператор","Название","Пример","Результат"],rows:[["==","Равно","5 == 5","true"],["!=","Не равно","5 != 3","true"],[">","Больше","10 > 5","true"],["<","Меньше","3 < 10","true"],[">=","Больше или равно","5 >= 5","true"],["<=","Меньше или равно","3 <= 10","true"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Логические операторы"}),t.jsx("p",{className:"theory-intro",children:"Используются для объединения нескольких условий:"}),t.jsx(I,{headers:["Оператор","Название","Описание","Пример"],rows:[["and","И","true, если ОБА условия верны","age > 18 and age < 65"],["or","ИЛИ","true, если ХОТЬ ОДНО условие верно",'day == "Saturday" or day == "Sunday"'],["not","НЕ","Меняет true на false и наоборот","not is_raining"]]}),t.jsx(N,{code:`// Примеры логических операторов

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
print(f"{name}, твоя оценка: {grade}")`,language:"python"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь основы программирования!"})})]})}function qf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 3"}),t.jsx("p",{className:"theory-subtitle",children:"Основы программирования: циклы, функции, коллекции"}),t.jsx("p",{className:"theory-date",children:"3 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Циклы"}),t.jsx("p",{className:"theory-intro",children:"Цикл — это способ повторить блок кода много раз. Вместо того чтобы писать одну и ту же команду 100 раз, можно использовать цикл."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Цикл for"}),t.jsx("p",{className:"theory-intro",children:"Используется, когда знаешь, сколько раз нужно повторить код:"}),t.jsx(N,{code:`# Выведи числа от 1 до 5
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
        print("Угадал!")`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"break и continue"}),t.jsx("p",{className:"theory-intro",children:"Управляют ходом цикла:"}),t.jsx(I,{headers:["Команда","Что делает","Пример"],rows:[["break","Выходит из цикла сразу","if password_correct: break"],["continue","Пропускает остаток итерации","if user.age < 18: continue"]]}),t.jsx(N,{code:`# break - выход из цикла
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
# city: Москва`,language:"python"})]}),t.jsx(I,{headers:["Тип","Символы","Можно менять?","Дубли?","Когда использовать"],rows:[["Список","[ ]","Да","Да","Данные, которые меняются"],["Кортеж","( )","Нет","Да","Данные, которые не меняются"],["Словарь","{ }","Да","Нет (ключи)","Связанные данные (ключ-значение)"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Читаемость кода"}),t.jsx("p",{className:"theory-intro",children:"Код пишется один раз, но читается много раз. Сделай его понятным!"}),t.jsxs(R,{title:"Плохо vs Хорошо",children:[t.jsx("p",{children:t.jsx("strong",{children:"Плохо:"})}),t.jsx("p",{style:{color:"#ff6b6b",fontSize:"13px",fontFamily:"monospace"},children:"x = 5; y = []; for i in range(x): y.append(i*2)"}),t.jsx("p",{style:{marginTop:"12px"},children:t.jsx("strong",{children:"Хорошо:"})}),t.jsx(N,{code:`numbers = []
limit = 5
for i in range(limit):
    doubled = i * 2
    numbers.append(doubled)`,language:"python"})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Правила:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Используй понятные имена переменных (age вместо a)"}),t.jsx("li",{className:"theory-list-item",children:"Добавляй пробелы: a + b вместо a+b"}),t.jsx("li",{className:"theory-list-item",children:"Один блок кода = одна задача"}),t.jsx("li",{className:"theory-list-item",children:"Комментарии только когда код неочевиден"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Ты уже почти профессионал!"})})]})}function Qf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 4"}),t.jsx("p",{className:"theory-subtitle",children:"Алгоритмическое мышление и Big O"}),t.jsx("p",{className:"theory-date",children:"4 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое алгоритм?"}),t.jsx("p",{className:"theory-intro",children:"Алгоритм — это пошаговая инструкция для решения задачи. Как рецепт в кулинарии: нужно делать шаги в правильном порядке, чтобы получить результат."}),t.jsx("p",{className:"theory-intro",style:{marginTop:"12px"},children:"Свойства алгоритма:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Конечность"})," — алгоритм должен закончиться, не бежать вечно"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Определённость"})," — каждый шаг должен быть ясным и однозначным"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ввод"})," — алгоритм принимает входные данные"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Вывод"})," — алгоритм выдаёт результат"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Эффективность"})," — алгоритм должен работать за разумное время"]})]}),t.jsx(R,{title:"Пример: Рецепт чая",children:t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Налей воду в чайник"}),t.jsx("li",{children:"Включи чайник"}),t.jsx("li",{children:"Жди, пока вода закипит"}),t.jsx("li",{children:"Налей горячую воду в кружку"}),t.jsx("li",{children:"Положи пакетик чая"}),t.jsx("li",{children:"Жди 3-5 минут"}),t.jsx("li",{children:"Достань пакетик"}),t.jsx("li",{children:"Добавь сахар (по желанию)"}),t.jsx("li",{children:"Чай готов!"})]})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Примеры алгоритмов"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Алгоритм: Найти максимум в списке"}),t.jsx(N,{code:`def find_max(numbers):
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
# [11, 12, 22, 25, 34, 64, 90]`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Нотация Big O (сложность алгоритма)"}),t.jsx("p",{className:"theory-intro",children:"Big O — это способ описать, как быстро растёт время выполнения алгоритма при увеличении входных данных."}),t.jsxs(R,{title:"Аналогия",children:[t.jsx("p",{children:"Представь, что у тебя есть большая библиотека:"}),t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"O(1)"})," — ты помнишь, где конкретная книга, берёшь её сразу"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"O(n)"})," — нужно проверить все полки, может на 100-й полке"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"O(n²)"})," — нужно проверить все полки и все книги на каждой полке"]})]})]}),t.jsx(I,{headers:["Нотация","Название","Что делает","Пример","Скорость"],rows:[["O(1)","Постоянная","Одна операция, не зависит от размера","Доступ к элементу по индексу","Молния"],["O(log n)","Логарифмическая","Каждый раз половина","Бинарный поиск","Очень быстро"],["O(n)","Линейная","Проверить все элементы","Поиск в списке","Быстро"],["O(n log n)","Линейно-логарифмическая","Разделяй и властвуй","Эффективная сортировка","Нормально"],["O(n²)","Квадратичная","Вложенные циклы","Пузырьковая сортировка","Медленно"],["O(n³)","Кубическая","Три вложенных цикла","Тройные циклы","Медленнее"],["O(2ⁿ)","Экспоненциальная","Растёт очень быстро","Некоторые рекурсивные алгоритмы","Очень медленно"]]}),t.jsxs("div",{className:"theory-subsection",style:{marginTop:"24px"},children:[t.jsx("h3",{className:"theory-heading-3",children:"Как анализировать Big O"}),t.jsx(N,{code:`# O(1) - одна операция
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
    return -1`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение скоростей"}),t.jsx("p",{className:"theory-intro",children:"Как быстро работают разные алгоритмы с 1 млн элементов:"}),t.jsx(I,{headers:["Big O","Операций","Время","Использовать?"],rows:[["O(1)","1","0.000001 сек","Идеально! ✅"],["O(log n)","20","0.00002 сек","Очень хорошо ✅"],["O(n)","1,000,000","0.001 сек","Хорошо ✅"],["O(n log n)","20,000,000","0.02 сек","Приемлемо ✅"],["O(n²)","1,000,000,000,000","16 минут","Плохо ❌"],["O(2ⁿ)","Огромное число","Вечность ","Очень плохо ❌"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как выбрать хороший алгоритм"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Для маленьких данных — важнее простота кода"}),t.jsx("li",{className:"theory-list-item",children:"Для больших данных — важнее скорость (Big O)"}),t.jsx("li",{className:"theory-list-item",children:"Всегда проверь граничные случаи (пустой список, один элемент)"}),t.jsx("li",{className:"theory-list-item",children:"O(n) лучше, чем O(n²), но O(1) ещё лучше!"})]}),t.jsxs(R,{title:"На собеседовании",children:[t.jsx("p",{children:"Когда спрашивают решить задачу, обязательно скажи:"}),t.jsxs("ul",{children:[t.jsx("li",{children:"Какая Big O временная сложность?"}),t.jsx("li",{children:"Какая Big O пространственная сложность (память)?"}),t.jsx("li",{children:"Можно ли оптимизировать?"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь, как писать быстрый код"})})]})}function Kf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 5"}),t.jsx("p",{className:"theory-subtitle",children:"Дискретная математика: логика и множества"}),t.jsx("p",{className:"theory-date",children:"5 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Булева алгебра"}),t.jsx("p",{className:"theory-intro",children:"Булева алгебра работает с двумя значениями: истина (True) и ложь (False). Это основа всей цифровой логики!"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Логические операции"}),t.jsx(I,{headers:["Операция","Символ","Описание","Пример","Результат"],rows:[["AND (И)","and, &","true, если ОБА значения true","True and False","False"],["OR (ИЛИ)","or, |","true, если ХОТЬ ОДНО true","True or False","True"],["NOT (НЕ)","not, !","Инвертирует значение","not True","False"],["XOR (исключающее ИЛИ)","xor, ^","true, если значения разные","True xor True","False"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Таблицы истинности"}),t.jsx("p",{className:"theory-intro",children:"AND — оба должны быть true:"}),t.jsx(I,{headers:["A","B","A AND B"],rows:[["true","true","true"],["true","false","false"],["false","true","false"],["false","false","false"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"OR — хоть одно true:"}),t.jsx(I,{headers:["A","B","A OR B"],rows:[["true","true","true"],["true","false","true"],["false","true","true"],["false","false","false"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"NOT — инверсия:"}),t.jsx(I,{headers:["A","NOT A"],rows:[["true","false"],["false","true"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Примеры в коде"}),t.jsx(N,{code:`# AND - оба условия должны быть true
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
print(sym_diff)  # {1, 2, 5, 6}`,language:"python"})]}),t.jsx(I,{headers:["Операция","Символ","Что делает","Пример"],rows:[["Объединение","|","Все элементы из обоих","{1,2} | {2,3} = {1,2,3}"],["Пересечение","&","Общие элементы","{1,2} & {2,3} = {2}"],["Разность","-","Только из первого","{1,2} - {2,3} = {1}"],["Симметричная разность","^","Уникальные для каждого","{1,2} ^ {2,3} = {1,3}"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Теория множеств"}),t.jsx("p",{className:"theory-intro",children:"Множество описывает коллекцию элементов, которые имеют общее свойство."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Основные понятия"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Элемент"})," — одно значение в множестве"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Пустое множество"})," — множество без элементов ∅"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Подмножество"})," — множество, все элементы которого содержатся в другом множестве"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Универсум"})," — все возможные элементы"]})]}),t.jsx(N,{code:`# Пустое множество
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
    print("numbers — надмножество evens")  # Выведет это`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Битовые операции"}),t.jsx("p",{className:"theory-intro",children:"Компьютер работает с битами (0 и 1). Битовые операции работают прямо с нулями и единицами в памяти."}),t.jsx(I,{headers:["Операция","Символ","Описание"],rows:[["AND","&","Побитовое И"],["OR","|","Побитовое ИЛИ"],["XOR","^","Побитовое исключающее ИЛИ"],["NOT","~","Побитовое НЕ"],["Левый сдвиг","<<","Сдвинуть влево на n позиций"],["Правый сдвиг",">>","Сдвинуть вправо на n позиций"]]}),t.jsx(N,{code:`# Примеры битовых операций
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
user_rights = user_rights & ~WRITE`,language:"python"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Логика — основа всего в программировании!"})})]})}function Yf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 6"}),t.jsx("p",{className:"theory-subtitle",children:"Дискретная математика: графы и алгоритмы"}),t.jsx("p",{className:"theory-date",children:"6 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое граф?"}),t.jsx("p",{className:"theory-intro",children:"Граф — это структура, которая состоит из точек (вершин) и линий (рёбер), соединяющих эти точки. Графы помогают моделировать реальные сиутации."}),t.jsx(R,{title:"Примеры графов в реальной жизни",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Социальная сеть"})," — люди это вершины, дружба это рёбра"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Карта города"})," — перекрёстки это вершины, дороги это рёбра"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Интернет"})," — компьютеры это вершины, кабели это рёбра"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Родственные связи"})," — люди это вершины, семейные связи это рёбра"]})]})}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Основные понятия"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Вершина (узел)"})," — точка в графе"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ребро"})," — линия, соединяющая два узла"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ориентированный граф"})," — рёбра имеют направление (стрелка)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Неориентированный граф"})," — рёбра без направления"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Взвешенный граф"})," — рёбра имеют вес (расстояние, стоимость)"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Представление графа"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Матрица смежности"}),t.jsx("p",{className:"theory-intro",children:"Используется, если много рёбер. Таблица, где строка и столбец = вершины, значение = есть ли ребро."}),t.jsx(N,{code:`# Матрица смежности для графа A-B, A-C, B-C
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

print(dfs(graph, 'A'))  # ['A', 'B', 'D', 'C']`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение BFS vs DFS"}),t.jsx(I,{headers:["Критерий","BFS","DFS"],rows:[["Структура данных","Очередь","Стек или рекурсия"],["Как ищет","Уровень за уровнем","Как можно глубже"],["Находит кратчайший путь?","Да","Нет"],["Используется для","Кратчайший путь, ширина","Компоненты, цикли"],["Память","Может быть больше","Зависит от высоты"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Топологическая сортировка"}),t.jsx("p",{className:"theory-intro",children:"Порядок вершин в ориентированном графе без циклов, где для каждого ребра A→B вершина A идёт раньше B."}),t.jsx(N,{code:`from collections import deque

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

print(topological_sort(graph, in_degree))  # ['A', 'B', 'C', 'D']`,language:"python"}),t.jsx(R,{title:"Применение",children:t.jsx("p",{children:"Например, в системе сборки проектов: нужно скомпилировать файл A перед файлом B, если B зависит от A."})})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь графы"})})]})}function Jf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 7"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: массивы и связанные списки"}),t.jsx("p",{className:"theory-date",children:"7 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Массив (Array)"}),t.jsx("p",{className:"theory-intro",children:"Массив — это структура данных, которая хранит несколько элементов одного типа в смежных ячейках памяти. Каждый элемент имеет индекс."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Как работает массив в памяти"}),t.jsx("p",{className:"theory-intro",children:"Массив занимает последовательно блоки памяти. Если массив начинается с адреса 1000:"}),t.jsx(I,{headers:["Индекс","Адрес памяти","Значение"],rows:[["0","1000","45"],["1","1004","89"],["2","1008","23"],["3","1012","67"],["4","1016","92"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Поэтому доступ к элементу по индексу за O(1) — просто посчитай адрес!"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции с массивом"}),t.jsx(I,{headers:["Операция","Big O","Описание"],rows:[["Доступ по индексу","O(1)","arr[2] — мгновенно"],["Добавление в конец","O(1)","Если место есть"],["Вставка в середину","O(n)","Нужно сдвинуть элементы"],["Удаление из середины","O(n)","Нужно сдвинуть элементы"],["Поиск элемента","O(n)","Проверить все элементы"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Плюсы и минусы"}),t.jsx("p",{className:"theory-intro",children:t.jsx("strong",{children:"✅ Плюсы:"})}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Быстрый доступ к элементу по индексу O(1)"}),t.jsx("li",{className:"theory-list-item",children:"Экономит память (нет дополнительных указателей)"}),t.jsx("li",{className:"theory-list-item",children:"Можно быстро итерировать"})]}),t.jsx("p",{className:"theory-intro",children:t.jsx("strong",{children:"❌ Минусы:"})}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Фиксированный размер (в большинстве языков)"}),t.jsx("li",{className:"theory-list-item",children:"Вставка/удаление в середину O(n) — медленно"}),t.jsx("li",{className:"theory-list-item",children:"Нужно знать размер заранее"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Динамический массив"}),t.jsx("p",{className:"theory-intro",children:"Динамический массив (как list в Python) автоматически растёт, когда не хватает места. Так как это работает?"}),t.jsx(R,{title:"Как растёт динамический массив",children:t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Создаёшь список [] с местом на 10 элементов"}),t.jsx("li",{children:"Добавляешь 10 элементов — список полон"}),t.jsx("li",{children:"Добавляешь 11-й элемент — программа создаёт новый массив на 20 элементов"}),t.jsx("li",{children:"Копирует старые 10 элементов туда"}),t.jsx("li",{children:"Добавляет 11-й элемент"}),t.jsx("li",{children:"Удаляет старый массив"})]})}),t.jsx(N,{code:`# В Python это список
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
ll.display()  # [10, 30]`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции со связанным списком"}),t.jsx(I,{headers:["Операция","Big O","Описание"],rows:[["Доступ к элементу","O(n)","Нужно пройти от начала"],["Вставка в начало","O(1)","Просто меняем head"],["Вставка после узла","O(1)","Меняем указатели"],["Удаление из начала","O(1)","Меняем head"],["Поиск элемента","O(n)","Проходим по всем"]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение: Массив vs Связный список"}),t.jsx(I,{headers:["Критерий","Массив","Связный список"],rows:[["Доступ по индексу","O(1) ⚡","O(n) 🐢"],["Вставка/удаление в начало","O(n) 🐢","O(1) ⚡"],["Вставка/удаление в конец","O(1) ⚡","O(n) 🐢"],["Поиск","O(n)","O(n)"],["Память","Плотная","Дополнительная на указатели"],["Использовать когда","Нужен быстрый доступ","Много вставок/удалений"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Двусвязный список"}),t.jsx("p",{className:"theory-intro",children:"Как связный список, но каждый узел имеет указатель и на следующий, и на предыдущий. Позволяет идти в обе стороны."}),t.jsx(N,{code:`class DNode:
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
    current = current.prev`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Когда что использовать?"}),t.jsx(R,{title:"Примеры",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Массив:"})," Сохраняешь оценки студентов, часто нужен доступ к i-й оценке"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Динамический массив:"})," Собираешь данные, не знаешь количество заранее"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Связный список:"})," Реализуешь очередь или стек, много вставок/удалений"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Двусвязный список:"}),' Плеер с кнопками "вперёд/назад" по плейлисту']})]})})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Правильная структура данных = правильное решение!"})})]})}function Xf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 8"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: стек и очередь"}),t.jsx("p",{className:"theory-date",children:"8 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Стек (Stack)"}),t.jsx("p",{className:"theory-intro",children:"Стек работает по принципу LIFO (Last In, First Out) — последний добавленный элемент первым извлекается. Как стопка тарелок: берёшь с вершины."}),t.jsxs(R,{title:"Аналогия из жизни",children:[t.jsx("p",{children:"Думаешь о стопке книг:"}),t.jsxs("ul",{children:[t.jsx("li",{children:"Положил первую книгу (основание стека)"}),t.jsx("li",{children:"Положил вторую на первую"}),t.jsx("li",{children:"Положил третью на вторую (вершина стека)"}),t.jsx("li",{children:"Берёшь книги? Сначала третью, потом вторую, потом первую"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции со стеком"}),t.jsx(I,{headers:["Операция","Описание","Big O"],rows:[["push(x)","Добавить элемент на вершину","O(1)"],["pop()","Удалить и вернуть элемент с вершины","O(1)"],["peek()","Посмотреть элемент на вершине без удаления","O(1)"],["is_empty()","Проверить, пуст ли стек","O(1)"],["size()","Размер стека","O(1)"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Реализация стека"}),t.jsx(N,{code:`class Stack:
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
print(stack.size())  # 2`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Примеры использования стека"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Undo/Redo"})," — каждый шаг в стек, отменяешь — pop из стека"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"История браузера"}),' — нажимаешь "назад" → pop из стека URL']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Вычисление выражений"})," — (2 + 3) * 4 → используешь стек"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Рекурсия"})," — каждый вызов функции идёт в стек вызовов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"DFS (поиск в глубину)"})," — обход графа"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Очередь (Queue)"}),t.jsx("p",{className:"theory-intro",children:"Очередь работает по принципу FIFO (First In, First Out) — первый добавленный элемент первым извлекается. Как очередь в магазине."}),t.jsxs(R,{title:"Аналогия из жизни",children:[t.jsx("p",{children:"Очередь в магазине:"}),t.jsxs("ul",{children:[t.jsx("li",{children:"Первый пришёл — первый обслужился"}),t.jsx("li",{children:"Последний пришёл — последний обслужился"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции с очередью"}),t.jsx(I,{headers:["Операция","Описание","Big O"],rows:[["enqueue(x)","Добавить элемент в конец (задняя часть)","O(1)"],["dequeue()","Удалить и вернуть элемент с начала (передняя часть)","O(1)"],["front()","Посмотреть первый элемент без удаления","O(1)"],["is_empty()","Проверить, пуста ли очередь","O(1)"],["size()","Размер очереди","O(1)"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Реализация очереди"}),t.jsx(N,{code:`from collections import deque

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
print(queue.size())     # 2`,language:"python"}),t.jsx(R,{title:"Почему deque?",children:t.jsx("p",{children:"Используем deque из collections, потому что обычный list в Python медленный для удаления с начала (O(n)). deque быстрый для обоих концов (O(1))."})})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Примеры использования очереди"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Очередь печати"})," — отправляешь несколько файлов, принтер печатает по очереди"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BFS (поиск в ширину)"})," — обход графа уровень за уровнем"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Система обработки задач"})," — рабочий берёт первую задачу из очереди"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Буфер ввода-вывода"})," — данные идут в очередь, программа обрабатывает по порядку"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение: Стек vs Очередь"}),t.jsx(I,{headers:["Критерий","Стек (LIFO)","Очередь (FIFO)"],rows:[["Добавление","В вершину (push)","В конец (enqueue)"],["Удаление","С вершины (pop)","С начала (dequeue)"],["Первым обслужен","Последний добавленный","Первый добавленный"],["Аналогия","Стопка тарелок","Очередь в магазине"],["Используется для","Undo/redo, DFS","BFS, обработка задач"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Деку (Deque) - двусторонняя очередь"}),t.jsx("p",{className:"theory-intro",children:"Deque (Double Ended Queue) — очередь, где можно добавлять и удалять элементы с обоих концов."}),t.jsx(N,{code:`from collections import deque

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

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D', 'E']`,language:"python"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Стек и очередь — это основа многих алгоритмов!"})})]})}function Zf(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 9"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: хэш-таблицы"}),t.jsx("p",{className:"theory-date",children:"9 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое хэш-таблица?"}),t.jsx("p",{className:"theory-intro",children:"Хэш-таблица (hash table) — это структура данных, которая использует хэш-функцию для превращения ключей в индексы массива. Позволяет очень быстро искать, добавлять и удалять элементы."}),t.jsxs(R,{title:"Аналогия",children:[t.jsx("p",{children:"Представь, что у тебя есть картотека:"}),t.jsxs("ul",{children:[t.jsx("li",{children:'Нужно найти запись по имени "Алиса"'}),t.jsx("li",{children:"Вместо того чтобы перелистывать все записи, применяешь хэш-функцию"}),t.jsx("li",{children:'Хэш("Алиса") = 7 → идёшь сразу на ящик 7 → находишь запись'})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как работает хэш-таблица"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Хэш-функция"}),t.jsx("p",{className:"theory-intro",children:"Хэш-функция — это функция, которая преобразует ключ любого типа в целое число (индекс)."}),t.jsx(N,{code:`# Простая хэш-функция для строк
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

# Хорошая хэш-функция распределяет ключи равномерно`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура хэш-таблицы"}),t.jsx("p",{className:"theory-intro",children:"Упрощённо это выглядит так:"}),t.jsx(I,{headers:["Индекс","Содержимое","Ключи"],rows:[["0",'[("Alice", 90)]',"Alice"],["1","[]","пусто"],["2",'[("Bob", 85)]',"Bob"],["3","[]","пусто"],["4",'[("Charlie", 92)]',"Charlie"],["5","[]","пусто"],["...","...","..."]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Коллизии"}),t.jsx("p",{className:"theory-intro",children:'Коллизия — когда две разные ключи дают один индекс. Например, "Alice" и "Bob" оба дают индекс 2. Нужно это решить.'}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод 1: Chaining (цепочка)"}),t.jsx("p",{className:"theory-intro",children:"Каждая ячейка содержит список (цепочку) элементов. Если коллизия — добавляем в список."}),t.jsx(N,{code:`# Хэш-таблица с chaining
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
print(ht.get("Bob"))     # 85`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Сравнение методов разрешения коллизий"}),t.jsx(I,{headers:["Метод","Преимущества","Недостатки"],rows:[["Chaining","Простая реализация, удаление O(1)","Требует доп. память для списков"],["Linear Probing","Не требует доп. память","Кластеризация, заполнение таблицы"],["Double Hashing","Меньше кластеров, лучше распределение","Сложнее реализация, нужны две функции"]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Big O для хэш-таблиц"}),t.jsx(I,{headers:["Операция","Лучший случай","Средний случай","Худший случай"],rows:[["Добавление","O(1)","O(1)","O(n)"],["Удаление","O(1)","O(1)","O(n)"],["Поиск","O(1)","O(1)","O(n)"]]}),t.jsx(R,{title:"Когда наступает худший случай?",children:t.jsx("p",{children:"Когда хэш-функция плохая и много коллизий. Хорошая хэш-функция дает O(1) в 99% случаев!"})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Словарь в Python"}),t.jsx("p",{className:"theory-intro",children:"Словарь (dict) в Python — это хэш-таблица! Он использует интерпретатор Python под капотом."}),t.jsx(N,{code:`# Словарь = хэш-таблица
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
    return len(arr) != len(set(arr))`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Когда использовать хэш-таблицу?"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Нужен быстрый поиск по ключу — используй словарь/хэш-таблицу"}),t.jsx("li",{className:"theory-list-item",children:"Подсчёт частоты элементов"}),t.jsx("li",{className:"theory-list-item",children:"Проверка, содержится ли элемент в наборе"}),t.jsx("li",{className:"theory-list-item",children:"Кэширование (запоминание результатов)"}),t.jsx("li",{className:"theory-list-item",children:"Группировка данных по ключам"})]}),t.jsx(R,{title:"На собеседовании",children:t.jsx("p",{children:"Если задача требует быстрого поиска — часто ответ это хэш-таблица или словарь. Подумай: можно ли использовать ключ для O(1) доступа?"})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Итоги 6 дней"}),t.jsx("p",{className:"theory-intro",children:"Ты изучил основные структуры данных:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 4:"})," Алгоритмы и Big O"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 5:"})," Логика и множества"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 6:"})," Графы и поиск"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 7:"})," Массивы и связные списки"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 8:"})," Стеки и очереди"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 9:"})," Хэш-таблицы"]})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Это основа для 99% задач на собеседованиях! Практикуйся на LeetCode, и ты будешь готов 🚀"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Ты на правильном пути! Только вперед!"})})]})}function em(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 10"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: деревья"}),t.jsx("p",{className:"theory-date",children:"10 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое дерево?"}),t.jsx("p",{className:"theory-intro",children:"Дерево — это иерархическая структура данных с узлами, где каждый узел может иметь несколько потомков, но только одного родителя."}),t.jsx(R,{title:"Аналогия",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Файловая система:"})," папки и файлы образуют дерево"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Генеалогия:"})," родитель → дети → внуки"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Организация:"})," руководитель → отделы → сотрудники"]})]})}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Терминология"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Корень (root)"})," — верхний узел без родителя"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Листья (leaves)"})," — узлы без потомков"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Высота"})," — количество уровней в дереве"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Глубина узла"})," — расстояние до корня"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Поддерево"})," — узел и все его потомки"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Бинарное дерево (Binary Tree)"}),t.jsx("p",{className:"theory-intro",children:"Дерево, где каждый узел может иметь максимум 2 потомка (левый и правый)."}),t.jsx(N,{code:`class Node:
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
print(bst.search(100)) # False`,language:"python"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции в BST"}),t.jsx(I,{headers:["Операция","Big O (лучше)","Big O (хуже)","Когда худший случай"],rows:[["Поиск","O(log n)","O(n)","Несбалансированное дерево"],["Вставка","O(log n)","O(n)","Несбалансированное дерево"],["Удаление","O(log n)","O(n)","Несбалансированное дерево"]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Высота и баланс дерева"}),t.jsx(R,{title:"Сбалансированное дерево O(log n)",children:t.jsx("p",{children:"Дерево где разница высот левого и правого поддеревьев ≤ 1"})}),t.jsx(R,{title:"Несбалансированное дерево O(n)",children:t.jsx("p",{children:"Дерево вырождается в список (все элементы в одну сторону)"})}),t.jsx(N,{code:`# Несбалансированное дерево (худший случай)
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

print(is_bst(root))  # True`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Когда использовать деревья?"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BST:"})," Быстрый поиск, сортировка, диапазонные запросы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Файловая система:"})," Иерархия папок и файлов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"DOM дерево:"})," В браузерах для HTML документов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Индексы БД:"})," B-деревья в базах данных"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Парсеры:"})," Abstract Syntax Tree (AST)"]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Деревья — один из самых мощных инструментов программиста!"})})]})}function tm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 11"}),t.jsx("p",{className:"theory-subtitle",children:"Git: версионирование и командная работа"}),t.jsx("p",{className:"theory-date",children:"11 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое Git?"}),t.jsx("p",{className:"theory-intro",children:"Git — это система контроля версий, которая отслеживает изменения в коде. Позволяет сохранять историю, откатываться назад, работать в команде и создавать отдельные ветки для новых фич."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Платформы хостинга репозиториев"}),t.jsx("p",{className:"theory-intro",children:"Git локальный, но для совместной работы используются платформы:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"GitHub"})," — самая популярная, PR, Issues"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"GitLab"})," — открытый код, полный CI/CD"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Bitbucket"})," — от Atlassian"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Интерфейсы: CLI и GUI"}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"CLI (команды в терминале)"})," — самый мощный способ."]}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"GUI (визуальные приложения)"})," — GitHub Desktop, GitKraken, VS Code."]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Основные команды"}),t.jsx(N,{code:`git clone URL            # Клонировать репозиторий
git init                # Инициализировать новый
git status              # Текущий статус
git add .               # Добавить файлы в staging
git commit -m "msg"     # Создать коммит
git push                # Отправить на удалённый
git pull                # Скачать обновления
git checkout -b name    # Создать и перейти на ветку
git merge name          # Объединить ветку
git log --oneline       # История коммитов
git diff                # Что изменилось`,language:"bash"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Git Workflow для Junior"}),t.jsxs("ol",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"git pull (скачать свежий код)"}),t.jsx("li",{className:"theory-list-item",children:"git checkout -b feature/name (создать свою ветку)"}),t.jsx("li",{className:"theory-list-item",children:'Пишешь код и коммитишь: git add . && git commit -m "msg"'}),t.jsx("li",{className:"theory-list-item",children:"git push origin feature/name (отправляешь ветку)"}),t.jsx("li",{className:"theory-list-item",children:"На GitHub создаёшь Pull Request"}),t.jsx("li",{className:"theory-list-item",children:"Code Review от других разработчиков"}),t.jsx("li",{className:"theory-list-item",children:"После одобрения PR мержится в main"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Pull Request (PR)"}),t.jsx("p",{className:"theory-intro",children:"PR — способ предложить свои изменения для рассмотрения перед включением в главный код."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Code Review — другие смотрят твой код"}),t.jsx("li",{className:"theory-list-item",children:"Обсуждение улучшений и ошибок"}),t.jsx("li",{className:"theory-list-item",children:"Merge в main после одобрения"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Git это не просто инструмент — это часть культуры разработки. Каждый коммит это история. Пиши понятные коммиты и станешь хорошим разработчиком!"})})]})}function nm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 12"}),t.jsx("p",{className:"theory-subtitle",children:"ИИ-инструменты разработчика"}),t.jsx("p",{className:"theory-date",children:"12 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как работают LLM?"}),t.jsx("p",{className:"theory-intro",children:"LLM (Large Language Model) — большая языковая модель. Это нейросеть, обученная на миллиардах слов из интернета. Модель предсказывает следующее слово на основе контекста, вычисляя вероятности для тысяч возможных вариантов."}),t.jsxs(R,{title:"Упрощённо: как модель думает",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Ты:"}),' "Напиши функцию, которая сортирует"']}),t.jsx("p",{children:t.jsx("strong",{children:"Модель внутренне:"})}),t.jsx("p",{children:'• Анализирует контекст: "функция", "сортирует" → скорее всего массив'}),t.jsx("p",{children:"• Проверяет статистику обучения: как обычно пишут сортировку"}),t.jsx("p",{children:"• Вычисляет вероятности: Python (60%), JavaScript (30%), Java (10%)"}),t.jsx("p",{children:"• Выбирает наиболее вероятный ответ"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Основные параметры LLM"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Токены"})," — куски текста (примерно 1 токен = 4 символа). При работе с Claude API нужно знать: входные токены дешевле, выходные дороже"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Контекстное окно"})," — сколько токенов модель может обработать одновременно. Claude 3.5 Sonnet: 200k входных, может вывести до 4k. Это целая книга!"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Температура"})," — 0 = всегда выбирает самый вероятный ответ (логичный), 1 = выбирает случайно (творческий). Для кода используй 0-0.3, для идей 0.7-1"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Max tokens"})," — максимальная длина ответа. Ограничивает стоимость"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Top-p"})," — выбирает из верхних N% вероятных вариантов (альтернатива температуре)"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Модели Claude: какую использовать?"}),t.jsx("p",{className:"theory-intro",children:"Claude выпускает несколько версий модели. Каждая имеет разные характеристики, цену и скорость."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Claude 3.5 Sonnet (Рекомендуется 🚀)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"🏆 Лучшее соотношение цена/производительность"}),t.jsx("li",{className:"theory-list-item",children:"💪 Отличное для программирования (анализ кода, рефакторинг, исправление ошибок)"}),t.jsx("li",{className:"theory-list-item",children:"⚡ Быстрая (2x быстрее чем Opus)"}),t.jsx("li",{className:"theory-list-item",children:"📚 200k контекстное окно = целые проекты можно скармливать"}),t.jsx("li",{className:"theory-list-item",children:"💰 Средняя цена"}),t.jsx("li",{className:"theory-list-item",children:"✅ Лучше всего для ежедневной разработки"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Claude 3 Opus"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:'🧠 Самая "умная" модель (чуть лучше в сложной логике)'}),t.jsx("li",{className:"theory-list-item",children:"⏱️ Медленнее чем Sonnet"}),t.jsx("li",{className:"theory-list-item",children:"💰 Дороже"}),t.jsx("li",{className:"theory-list-item",children:"📚 200k контекст"}),t.jsx("li",{className:"theory-list-item",children:"✅ Для очень сложных задач, когда нужна максимальная точность"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Claude 3 Haiku"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"⚡ Самая быстрая"}),t.jsx("li",{className:"theory-list-item",children:"💰 Самая дешёвая (в 10x раз дешевле Sonnet)"}),t.jsx("li",{className:"theory-list-item",children:"🧠 Менее умная, но достаточна для простых задач"}),t.jsx("li",{className:"theory-list-item",children:"📚 100k контекст"}),t.jsx("li",{className:"theory-list-item",children:"✅ Для быстрых ответов и прототипирования"})]})]}),t.jsx(R,{title:"Таблица сравнения",children:t.jsx(I,{headers:["Модель","Разум","Скорость","Цена","Контекст","Лучше всего для"],rows:[["Claude 3.5 Sonnet","⭐⭐⭐⭐","⚡⚡⚡⚡⚡","💰💰","200k","Разработка (ВЫБЕРИ ЭТО)"],["Claude 3 Opus","⭐⭐⭐⭐⭐","⚡⚡⚡","💰💰💰💰","200k","Очень сложные задачи"],["Claude 3 Haiku","⭐⭐⭐","⚡⚡⚡⚡⚡","💰","100k","Быстрые ответы"]]})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Искусство писать промпты (Prompt Engineering)"}),t.jsx("p",{className:"theory-intro",children:"Промпт — это твой запрос к ИИ. От качества промпта на 80% зависит качество ответа. Это настоящее искусство! Вот как писать хорошие промпты."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"❌ Плохой промпт vs ✅ Хороший промпт"}),t.jsxs(R,{title:"Пример 1: Простая задача",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"❌ Плохо:"}),' "Напиши код"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"✅ Хорошо:"}),' "Напиши функцию на Python, которая проверяет, является ли число простым. Входной параметр: целое число n. Выходной параметр: True если простое, False иначе. Используй эффективный алгоритм O(√n)"']})]}),t.jsxs(R,{title:"Пример 2: Анализ кода",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"❌ Плохо:"}),' "Почему это не работает?"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"✅ Хорошо:"}),' "Вот мой код: [код]. Ошибка: TypeError: NoneType. Я ожидаю, что функция должна вернуть список. Объясни, в чём проблема, и покажи исправленный вариант"']})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"📋 Структура хорошего промпта"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px",lineHeight:"1.8"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Контекст:"})," Для чего это нужно? Кто будет использовать?"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Задача:"})," Что ровно нужно сделать? (Глагол: напиши, объясни, исправь)"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Детали:"})," Язык программирования? Формат? Требования?"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Примеры:"})," Показать примеры входа/выхода"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Ограничения:"})," Не использовать библиотеки? О(n) или меньше?"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Формат ответа:"})," Только код? С объяснением? С комментариями?"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎯 Техника: Chain of Thought (думай пошагово)"}),t.jsx("p",{className:"theory-intro",children:"Явно попроси ИИ думать пошагово для сложных задач:"}),t.jsx(N,{code:`❌ Плохо:
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
npm install && npm start`}),t.jsx("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:"Если такой файл есть в проекте, ИИ его найдет и будет следовать правилам!"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Технические указания для точных результатов"}),t.jsx("p",{className:"theory-intro",children:"Чем точнее указания, тем лучше результат."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Ограничения (помогают фокусироваться)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Язык:"}),' "Только Python 3.9+, без numpy"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Размер:"}),' "Функция не более 20 строк"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сложность:"}),' "O(n) временная сложность, максимум"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Стиль:"}),' "В стиле Google, с docstrings"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Зависимости:"}),' "Используй только встроенные модули"']})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Формат ответа (скажи как именно ты хочешь ответ)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Структура:"}),' "Дай сначала объяснение, потом код, потом примеры"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Язык:"}),' "На русском / на английском"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Детальность:"}),' "Краткий ответ / подробный с объяснением каждой строки"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Комментарии:"}),' "Без комментариев / с комментариями на каждом шаге"']})]})]}),t.jsxs(R,{title:"Полный пример хорошего промпта",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Контекст:"}),' "Работаю над веб-приложением на React"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"Задача:"}),' "Напиши компонент Button"']}),t.jsx("p",{children:t.jsx("strong",{children:"Требования:"})}),t.jsx("p",{children:"• Функциональный компонент с Hooks"}),t.jsx("p",{children:"• Props: text, onClick, disabled, variant (primary/secondary)"}),t.jsx("p",{children:"• Использует CSS модули (не inline styles)"}),t.jsx("p",{children:"• Должен быть доступен (accessibility)"}),t.jsxs("p",{children:[t.jsx("strong",{children:"Формат:"}),' "Код + пример использования + PropTypes"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"Ограничение:"}),' "Не более 50 строк, чистый код без лишнего"']})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"GitHub Copilot"}),t.jsx("p",{className:"theory-intro",children:"Расширение в IDE, которое автодополняет код во время печати. Работает как автозаполнение на телефоне, но для кода."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Как это работает"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Смотрит на контекст: названия переменных, функций, импорты"}),t.jsx("li",{className:"theory-list-item",children:"Предлагает код на основе миллионов примеров с GitHub"}),t.jsx("li",{className:"theory-list-item",children:"Работает в VS Code, JetBrains IDE, Neovim"}),t.jsx("li",{className:"theory-list-item",children:"Платно: $10/месяц (но бесплатно для студентов и open-source разработчиков)"})]})]}),t.jsxs(R,{title:"Как писать, чтобы Copilot помог",children:[t.jsx("p",{children:t.jsx("strong",{children:"❌ Плохо:"})}),t.jsx("p",{children:"def f(a, b):"}),t.jsx("p",{children:t.jsx("strong",{children:"✅ Хорошо:"})}),t.jsx("p",{children:"def validate_email_address(email: str) -> bool:"}),t.jsx("p",{children:"    # проверяет что email содержит @"}),t.jsx("p",{style:{marginTop:"8px"},children:"Copilot видит название + комментарий и предложит нужную функцию!"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Claude Code: IDE расширение"}),t.jsx("p",{className:"theory-intro",children:"Самое мощное: Claudeде может читать и редактировать файлы прямо в твоём проекте. Используй это максимально!"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Что он может делать"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:["📖 ",t.jsx("strong",{children:"Читать файлы:"}),' "Покажи мне файл Button.jsx"']}),t.jsxs("li",{className:"theory-list-item",children:["✏️ ",t.jsx("strong",{children:"Редактировать файлы:"})," Автоматически изменяет и сохраняет"]}),t.jsxs("li",{className:"theory-list-item",children:["🔍 ",t.jsx("strong",{children:"Поиск:"}),' "Найди все функции которые проверяют email"']}),t.jsxs("li",{className:"theory-list-item",children:["🔧 ",t.jsx("strong",{children:"Рефакторинг:"}),' "Переведи этот компонент на Hooks"']}),t.jsxs("li",{className:"theory-list-item",children:["🐛 ",t.jsx("strong",{children:"Исправление ошибок:"})," Видит error и исправляет"]}),t.jsxs("li",{className:"theory-list-item",children:["🧪 ",t.jsx("strong",{children:"Написание тестов:"})," Генерирует unit tests"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Как использовать эффективно"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px",lineHeight:"1.8"},children:[t.jsx("li",{children:'Скажи "Показать мне файл [путь]" чтобы ИИ прочитал файл'}),t.jsx("li",{children:'После того как ИИ прочитал контекст, пиши запросы: "Рефакторь этот компонент"'}),t.jsx("li",{children:"ИИ видит ошибки в терминале и может их исправлять автоматически"}),t.jsx("li",{children:"Для больших задач - скажи ИИ про всю структуру папки"})]})]}),t.jsxs(R,{title:"Практический пример",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Ты:"}),` "У меня есть проект React в папке src/. Есть ошибка в консоли: 'Cannot read property of undefined'. Помоги найти и исправить"`]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Claude (через IDE):"})," Откроет файлы, увидит проблему, исправит, сохранит"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Ограничения и опасности ИИ"}),t.jsx("p",{className:"theory-intro",children:"ИИ — мощный инструмент, но не волшебство. Вот о чём надо помнить."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🚫 Галлюцинации"}),t.jsx("p",{className:"theory-intro",children:"Модель может выдумать с полной уверенностью."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:'Факты которых нет ("Это функция была добавлена в Python 3.12")'}),t.jsx("li",{className:"theory-list-item",children:'Несуществующие библиотеки ("Используй numpy_super.array()")'}),t.jsx("li",{className:"theory-list-item",children:"Неправильный код, но написанный очень убедительно"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"})," ВСЕГДА проверяй код перед использованием. Гугли если сомневаешься."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"📅 Знания устаревают"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Claude обучена до определённой даты"}),t.jsx("li",{className:"theory-list-item",children:"О новых версиях библиотек может не знать"}),t.jsx("li",{className:"theory-list-item",children:"Новые API может не знать"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"}),' Скажи ИИ "Это новая версия, вот доки" и скармливай свежую информацию.']})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🧮 Ошибки в точных вычислениях"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Может неправильно считать математику"}),t.jsx("li",{className:"theory-list-item",children:"Путается в больших числах"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"})," Для математики и точных вычислений - проверь вручную или в Python."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎭 Может ошибаться в сложной логике"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Сложные алгоритмы может напереть неправильно"}),t.jsx("li",{className:"theory-list-item",children:"Может забыть edge case в коде"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"}),' Попроси "покажи примеры, включая edge cases" и протестируй.']})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🧠 Контекст конечен (хоть 200k большой)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Если скармливаешь ОЧЕНЬ много текста, может потеря качество"}),t.jsx("li",{className:"theory-list-item",children:"Может забыть начало длинной беседы"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"})," Разбей большие задачи на несколько промптов. Напомни контекст если забыл."]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Этика использования ИИ"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:["✅ ",t.jsx("strong",{children:"ВСЕГДА"})," проверяй код перед использованием в production"]}),t.jsx("li",{className:"theory-list-item",children:"✅ Указывай что ты использовал ИИ (в коде, в документации, в резюме)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Проверяй лицензии и авторские права (не копируй чужой чужой лицензированный код)"}),t.jsx("li",{className:"theory-list-item",children:"✅ ИИ — помощник, а не замена. Ты должен понимать что пишешь"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не полагайся полностью на ИИ для критических систем"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практические советы для разработчика"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"💡 ТОП-5 способов использовать ИИ каждый день"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px",lineHeight:"1.8"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Рефакторинг кода:"}),' "Переделай этот код чтобы он был более читаемым"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Объяснение чужого кода:"}),' "Объясни что делает эта функция пошагово"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Написание тестов:"}),' "Напиши unit tests для этой функции"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Документация:"}),' "Напиши подробный комментарий (docstring) для этой функции"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Отладка:"}),' "Помоги найти баг. Вот ошибка и код" (скармливай error message)']})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎯 Когда НЕ использовать ИИ"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"❌ Для изучения основ (ты должен сам учиться, не копировать ответы)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Для хранения секретной информации (в бесплатных сервисах данные могут видеть)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Для очень специфичного знания про твой проект (ИИ может не знать деталей)"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"ИИ — твой помощник разработчика. Используй его мудро, проверяй результаты, и он сэкономит тебе часы работы!"})})]})}function sm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 13"}),t.jsx("p",{className:"theory-subtitle",children:"Практический проект: визуализация структур данных и алгоритмов"}),t.jsx("p",{className:"theory-date",children:"13 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"📋 Дедлайны и правила"}),t.jsxs("div",{style:{backgroundColor:"rgba(200,255,0,0.05)",padding:"16px",borderRadius:"8px",marginBottom:"24px"},children:[t.jsx("p",{style:{margin:"0 0 12px 0",fontWeight:600},children:"⏰ Когда можешь сдать:"}),t.jsxs("ul",{style:{margin:"0 0 12px 0",paddingLeft:"20px"},children:[t.jsx("li",{children:"✅ Суббота, 13 июня в 21:00"}),t.jsx("li",{children:"✅ Или в любой день в 21:00 в начале лекции"})]}),t.jsx("p",{style:{margin:"0 0 12px 0",fontWeight:600},children:"🎤 Выступление:"}),t.jsxs("ul",{style:{margin:"0 0 12px 0",paddingLeft:"20px"},children:[t.jsx("li",{children:"Время на выступление: 5 минут"}),t.jsx("li",{children:"Показать что реализовал (демонстрация программы)"}),t.jsx("li",{children:"Рассказать какое задание было"}),t.jsx("li",{children:"Объяснить что получилось"}),t.jsx("li",{children:"Рассказать какие трудности были"})]}),t.jsx("p",{style:{margin:"0",color:"var(--text-secondary)",fontSize:"13px"},children:"Дедлайна нет! Можешь сдать когда готово. Главное - показать свою работу и рассказать как её делал."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"🎯 Тебе мог попасться один из 10 вариантов"}),t.jsx("p",{className:"theory-intro",style:{marginBottom:"24px"},children:"Получи вариант в лс в телеграме и реализуй его. Используй Python или другой язык программирования. Допускается использование AI (Copilot, Claude, ChatGPT) для помощи. Код загрузи в GitHub репозиторий."}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 1: Поиск середины списка (slow/fast pointers)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм поиска середины односвязного списка с помощью указателей slow и fast"}),t.jsx("li",{children:"Программа должна пошагово показывать перемещение указателей по списку"}),t.jsx("li",{children:"Графический вывод: консоль с анимацией или выводом каждого шага по нажатию Enter"}),t.jsx("li",{children:"Необходимо реализовать создание списка и визуализацию позиций указателей"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 2: Проверка скобочной последовательности"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм проверки правильности скобочной последовательности с использованием стека"}),t.jsx("li",{children:"Визуально показывать содержимое стека после каждой операции push/pop"}),t.jsx("li",{children:"Графический вывод: браузер (HTML/CSS/JS) или консоль"}),t.jsx("li",{children:"Отображать текущий символ строки и текущее состояние стека на каждом шаге"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 3: Обход графа в ширину (BFS)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм обхода графа в ширину (BFS) с использованием очереди"}),t.jsx("li",{children:"Пошагово показывать добавление и удаление вершин из очереди"}),t.jsx("li",{children:"Графический вывод: браузер с визуализацией графа или библиотека графики"}),t.jsx("li",{children:"На каждом шаге подсвечивать текущую вершину и содержимое очереди"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 4: Обход графа в глубину (DFS)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм обхода графа в глубину (DFS) со стеком или рекурсией"}),t.jsx("li",{children:"Визуально показывать порядок посещения вершин графа"}),t.jsx("li",{children:"Графический вывод: браузер или библиотека для графики"}),t.jsx("li",{children:"На каждом этапе отображать текущую вершину и уже посещённые вершины"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 5: Двусвязный список"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать двусвязный список с операциями вставки и удаления элементов"}),t.jsx("li",{children:"Пошагово показывать изменение связей между узлами списка"}),t.jsx("li",{children:"Графический вывод: консоль или библиотека графики"}),t.jsx("li",{children:"Отображать указатели prev и next для каждого элемента списка"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 6: Удаление дубликатов из списка"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм удаления дубликатов из односвязного списка"}),t.jsx("li",{children:"Пошагово показывать обход списка и удаление повторяющихся элементов"}),t.jsx("li",{children:"Графический вывод: консоль, браузер или библиотека графики"}),t.jsx("li",{children:"На каждом шаге отображать текущий узел, проверяемое значение и итоговое состояние списка"}),t.jsx("li",{children:"Можно реализовать управление шагами через кнопки вперед/назад или автоматический показ через таймер"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 7: Хэш-таблица с разрешением коллизий"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать хэш-таблицу с разрешением коллизий методом цепочек или линейного пробирования"}),t.jsx("li",{children:"Пошагово показывать процесс вставки, поиска и обработки коллизий"}),t.jsx("li",{children:"Графический вывод: браузер или библиотека графики"}),t.jsx("li",{children:"На каждом шаге отображать индекс хэш-таблицы и действия алгоритма"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 8: Бинарное дерево поиска (BST)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать бинарное дерево поиска (BST) с операциями вставки и поиска элементов"}),t.jsx("li",{children:"Визуально показывать прохождение по дереву на каждом шаге алгоритма"}),t.jsx("li",{children:"Графический вывод: библиотека графики или браузер"}),t.jsx("li",{children:"Отображать текущий узел и направление перехода по дереву"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 9: Разворот односвязного списка"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм разворота односвязного списка"}),t.jsx("li",{children:"Пошагово показывать изменение ссылок между элементами списка"}),t.jsx("li",{children:"Графический вывод: консоль с задержкой по времени или браузер"}),t.jsx("li",{children:"На каждом шаге отображать текущий элемент, previous и next"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 10: Алгоритм Дейкстры (кратчайший путь)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм поиска кратчайшего пути в графе (алгоритм Дейкстры)"}),t.jsx("li",{children:"Пошагово показывать обновление расстояний до вершин и выбор текущей вершины"}),t.jsx("li",{children:"Графический вывод: браузер или библиотека графики"}),t.jsx("li",{children:"Отображать таблицу расстояний и подсветку текущих рёбер графа"})]})]})]})]})]})}function rm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 15"}),t.jsx("p",{className:"theory-subtitle",children:"Тайм- и таск-менеджмент"}),t.jsx("p",{className:"theory-date",children:"15 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое таск-менеджмент и зачем он нужен"}),t.jsx("p",{className:"theory-intro",children:"Таск-менеджмент — это система организации и управления задачами, которая помогает человеку или команде достигать целей без потери фокуса. В мире, где количество задач постоянно растёт, умение управлять временем становится ключевым профессиональным навыком."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Проблемы без системы управления задачами"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Задачи теряются или забываются"}),t.jsx("li",{className:"theory-list-item",children:"Непонятно, что делать в первую очередь"}),t.jsx("li",{className:"theory-list-item",children:"Ощущение постоянной перегруженности"}),t.jsx("li",{className:"theory-list-item",children:"Сложно оценить реальный прогресс по проектам"}),t.jsx("li",{className:"theory-list-item",children:"Прокрастинация и откладывание важных дел"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Метод GTD (Getting Things Done)"}),t.jsx("p",{className:"theory-intro",children:"GTD — система управления задачами Дэвида Аллена. Её суть: освободить голову от хранения задач и доверить их надёжной внешней системе. Мозг плохо хранит, но отлично обрабатывает."}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"12px",margin:"20px 0"},children:[{n:"1",t:"Сбор",en:"Capture",d:"Записывай всё во «входящий ящик» (Inbox). Не держи ничего в голове."},{n:"2",t:"Обработка",en:"Clarify",d:"Требует ли элемент действия? Если да — определи конкретный следующий шаг."},{n:"3",t:"Организация",en:"Organize",d:"Распредели по категориям: действия, проекты, ожидания, календарь."},{n:"4",t:"Обзор",en:"Reflect",d:"Еженедельно просматривай все списки и обновляй систему."},{n:"5",t:"Выполнение",en:"Engage",d:"Выбирай задачу по контексту, времени, энергии и приоритету."}].map((e,n)=>t.jsxs("div",{style:{flex:"1 1 150px",minWidth:"150px",background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:"var(--accent-lime)",color:"#0a0a14",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"8px"},children:e.n}),t.jsx("div",{style:{fontWeight:700,color:"var(--text-primary)",fontSize:"14px"},children:e.t}),t.jsx("div",{style:{fontSize:"11px",color:"var(--accent-lime)",marginBottom:"6px"},children:e.en}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)",lineHeight:"1.5"},children:e.d})]},n))}),t.jsx(R,{title:"Ключевое правило GTD (правило 2 минут)",children:t.jsx("p",{children:"Если задача занимает менее 2 минут — сделай её немедленно, не откладывая в систему."})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Техники управления временем"}),t.jsx("p",{className:"theory-intro",children:"Универсального метода нет — разные подходы подходят разным людям. Попробуй каждый и найди свой."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🍅 Техника Pomodoro"}),t.jsx("p",{className:"theory-text",style:{marginBottom:"12px"},children:"Работай 25 минут без прерываний (один «помидор»), затем 5 минут отдыха. После четырёх «помидоров» — длинный перерыв 15–30 минут."}),t.jsxs("p",{className:"theory-text",style:{marginBottom:"12px",fontSize:"12px",color:"var(--text-tertiary)"},children:["Используй таймер: ",t.jsx("a",{href:"https://www.forestapp.cc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Forest"}),", ",t.jsx("a",{href:"https://www.befocused.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Be Focused"})," или ",t.jsx("a",{href:"https://pomofocus.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Pomofocus.io"})]}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",alignItems:"center",margin:"12px 0"},children:[{l:"25 мин",w:"работа"},{l:"5",w:"отдых"},{l:"25 мин",w:"работа"},{l:"5",w:"отдых"},{l:"25 мин",w:"работа"},{l:"5",w:"отдых"},{l:"25 мин",w:"работа"},{l:"15-30",w:"длинный отдых"}].map((e,n)=>t.jsxs("div",{style:{flex:e.w==="работа"?"1 1 70px":"0 1 50px",minWidth:e.w==="работа"?"70px":"44px",background:e.w==="работа"?"rgba(200,255,0,0.15)":e.w==="длинный отдых"?"rgba(110,181,255,0.18)":"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:"6px",padding:"8px 6px",textAlign:"center"},children:[t.jsx("div",{style:{fontSize:"12px",fontWeight:700,color:"var(--text-primary)"},children:e.l}),t.jsx("div",{style:{fontSize:"10px",color:"var(--text-tertiary)"},children:e.w})]},n))}),t.jsxs("p",{className:"theory-text",children:[t.jsx("strong",{children:"Для кого:"})," тем, кого легко отвлечь, и тем, кто работает без пауз. Хорошо для монотонных задач — кодирование, тексты, учёба."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🐸 Метод «Съешь лягушку»"}),t.jsxs("p",{className:"theory-text",children:["«Лягушка» — самая неприятная задача дня. Выполняй её первой, пока энергия максимальна. Остаток дня ощущается легче. ",t.jsx("strong",{children:"Для кого:"})," тем, кто откладывает неприятное на конец дня."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🐘 Метод «Съешь слона по частям»"}),t.jsxs("p",{className:"theory-text",children:["Большую задачу разбей на маленькие шаги. «Написать диплом» — это проект, а «написать введение (1500 слов)» — задача. ",t.jsx("strong",{children:"Для кого:"})," тем, кто чувствует паралич перед крупными проектами."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🗓 Метод «Временные блоки» (Time Blocking)"}),t.jsxs("p",{className:"theory-text",children:["Заранее выделяй в календаре блоки под типы задач. Например: 9:00–11:00 — глубокая работа, 11:00–12:00 — встречи, после обеда — рутина. ",t.jsx("strong",{children:"Для кого:"})," тем, кто не чувствует контроля над днём."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"1️⃣3️⃣5️⃣ Метод «1-3-5»"}),t.jsx("p",{className:"theory-text",children:"Каждый день планируй: 1 большую задачу, 3 средних и 5 маленьких. Реалистичный план, который не позволяет перегрузить список."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Личный Канбан"}),t.jsx("p",{className:"theory-intro",children:"Визуальная доска с тремя колонками. Задачи перемещаются слева направо. Ключевое правило: ограничивай количество задач «В процессе» (обычно не более 3) — это борьба с многозадачностью."}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"12px",margin:"20px 0"},children:[{title:"Нужно сделать",color:"var(--text-tertiary)",cards:["📝 Написать функцию","🧪 Добавить тесты","📚 Прочитать главу"]},{title:"В процессе",color:"var(--accent-lime)",limit:"WIP ≤ 3",cards:["🔍 Код-ревью PR","🐛 Чинить баг"]},{title:"Готово",color:"#64c864",cards:["✅ Настроить Git","✅ Залить проект"]}].map((e,n)=>t.jsxs("div",{style:{flex:"1 1 200px",minWidth:"180px",background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:"10px",padding:"12px"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px",paddingBottom:"8px",borderBottom:`2px solid ${e.color}`},children:[t.jsx("span",{style:{fontWeight:700,color:e.color,fontSize:"13px"},children:e.title}),e.limit&&t.jsx("span",{style:{fontSize:"10px",color:"var(--accent-lime)",border:"1px solid var(--accent-lime)",borderRadius:"4px",padding:"1px 5px"},children:e.limit})]}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:e.cards.map((s,r)=>t.jsx("div",{style:{background:"var(--bg-primary)",border:"1px solid var(--border-color)",borderRadius:"6px",padding:"8px",fontSize:"12px",color:"var(--text-secondary)"},children:s},r))})]},n))})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Приоритизация: матрица Эйзенхауэра"}),t.jsx("p",{className:"theory-intro",children:"Делит все задачи на 4 квадранта по двум осям: важность и срочность."}),t.jsxs("div",{style:{margin:"20px 0"},children:[t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto 1fr 1fr",gap:"8px",alignItems:"stretch"},children:[t.jsx("div",{}),t.jsx("div",{style:{textAlign:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",padding:"4px"},children:"СРОЧНО"}),t.jsx("div",{style:{textAlign:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",padding:"4px"},children:"НЕ СРОЧНО"}),t.jsx("div",{style:{display:"flex",alignItems:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",writingMode:"vertical-rl",transform:"rotate(180deg)",justifyContent:"center"},children:"ВАЖНО"}),t.jsxs("div",{style:{background:"rgba(255,95,95,0.15)",border:"1px solid rgba(255,95,95,0.4)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"#ff5f5f",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 1 · Делать"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Кризисы, дедлайны, аварии. Чинить баг в продакшене."})]}),t.jsxs("div",{style:{background:"rgba(110,181,255,0.15)",border:"1px solid rgba(110,181,255,0.4)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"#6eb5ff",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 2 · Планировать"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Развитие, обучение, здоровье. Самый ценный квадрант!"})]}),t.jsx("div",{style:{display:"flex",alignItems:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",writingMode:"vertical-rl",transform:"rotate(180deg)",justifyContent:"center"},children:"НЕ ВАЖНО"}),t.jsxs("div",{style:{background:"rgba(255,159,80,0.15)",border:"1px solid rgba(255,159,80,0.4)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"#ff9f50",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 3 · Делегировать"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Чужие просьбы, часть встреч. Иллюзия занятости."})]}),t.jsxs("div",{style:{background:"rgba(138,138,154,0.12)",border:"1px solid var(--border-color)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"var(--text-tertiary)",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 4 · Исключить"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Соцсети, лишние встречи. Сокращай до минимума."})]})]}),t.jsxs("p",{className:"theory-text",style:{marginTop:"12px"},children:[t.jsx("strong",{children:"Главная мысль:"})," большинство живёт в квадрантах 1 и 3. Перенеси фокус в квадрант 2 — и кризисов станет меньше."]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Другие методы приоритизации"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод MoSCoW"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Must Have"})," — обязательно (без этого проект не работает)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Should Have"})," — важно, но не критично сейчас"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Could Have"})," — хорошо бы при наличии времени"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Won't Have"})," — не делаем сейчас, возможно потом"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод ABC"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"A"})," — серьёзные последствия за невыполнение (делай первыми)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"B"})," — умеренные последствия"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"C"})," — без последствий"]})]}),t.jsx("p",{className:"theory-text",children:"Никогда не берись за B, если не сделаны все A."})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Правило 80/20 (Принцип Парето)"}),t.jsx("p",{className:"theory-text",children:"20% усилий дают 80% результата. Найди те 20% задач, которые приносят наибольший вклад, и фокусируйся на них. Делать не меньше — делать умнее."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Инструменты и приложения"}),t.jsx("p",{className:"theory-intro",children:"Инструмент — это не система. Сначала выбери подход (GTD, канбан, Pomodoro), потом подбери инструмент под него."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🍅 Pomodoro-приложения"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.forestapp.cc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Forest"})," — вырастить виртуальный лес во время работы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.befocused.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Be Focused"})," — простой Pomodoro-таймер для всех устройств"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://pomofocus.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Pomofocus.io"})," — веб-таймер Pomodoro (бесплатно)"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"📋 Таск-менеджеры и доски"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://trello.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Trello"})," — визуальные доски, канбан для личного и командного использования"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://notion.so",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Notion"})," — всё в одном (задачи, заметки, БД, документы)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.atlassian.com/software/jira",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Jira"})," — Agile, спринты, баг-трекинг для IT-команд"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://linear.app",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Linear"})," — быстрый трекер задач для стартапов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://todoist.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Todoist"})," — простой GTD-таск-менеджер"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.ticktick.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"TickTick"})," — задачи + привычки + встроенный Pomodoro"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🧠 Управление знаниями и заметки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://obsidian.md",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Obsidian"})," — система личных заметок на основе Markdown (локально на диске)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://google.com/tasks",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Google Tasks"})," — простой список задач, интегрирован с Google Calendar и Gmail"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://calendar.google.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Google Calendar"})," — календарь для time blocking и планирования дней"]})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Инструмент следует за системой, а не наоборот. Регулярный обзор — ключ к любой системе. Время — самый ценный ресурс! ⏰"})})]})}function im(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 16"}),t.jsx("p",{className:"theory-subtitle",children:"Языки программирования и фреймворки в 2026 году"}),t.jsx("p",{className:"theory-date",children:"16 июня 2026"})]}),t.jsx("section",{className:"theory-section",children:t.jsx("p",{className:"theory-intro",children:"Технологический ландшафт в 2026 году продолжает меняться. Цель — не выучить всё, а понять, на что ориентироваться при построении карьеры. Ниже обзор по ключевым направлениям."})}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Фронтенд"}),t.jsx("p",{className:"theory-intro",children:"Фронтенд — всё, что видит пользователь в браузере. Основа неизменна: HTML, CSS, JavaScript. Всё остальное — инструменты поверх них."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Базовые технологии"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"HTML5"})," — структура страницы, семантическая разметка"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"CSS3"})," — стили, анимации, адаптивный дизайн. Flexbox и Grid — обязательны"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"JavaScript (ES2024+)"})," — логика, взаимодействие, работа с API"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"TypeScript"})," — типизированная надстройка над JS, де-факто стандарт в продакшене"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Фреймворки и библиотеки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://react.dev",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"React"})})," — самая популярная библиотека (Meta). В 2026 — React 19 с серверными компонентами"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://nextjs.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Next.js"})})," — фреймворк поверх React (Vercel): SSR, SSG, маршрутизация, API-роуты"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://vuejs.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Vue.js"})})," — лёгкий вход, Vue 3 с Composition API"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://svelte.dev",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Svelte / SvelteKit"})})," — компилируемый фреймворк без рантайм-оверхеда"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://astro.build",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Astro"})})," — быстрые контентные сайты, Islands Architecture"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Дополнительные инструменты"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://tailwindcss.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Tailwind CSS"})})," — утилитарный CSS-фреймворк"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://vitejs.dev",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Vite"})})," — быстрый сборщик, заменяет Webpack"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://figma.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Figma"})})," — основной инструмент дизайна"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://storybook.js.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Storybook"})})," — разработка и документирование UI-компонентов"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Бэкенд"}),t.jsx("p",{className:"theory-intro",children:"Бэкенд — серверная часть: обработка данных, бизнес-логика, базы данных, API. Выбор зависит от задачи, нагрузки и команды."}),t.jsx(I,{headers:["Язык","Фреймворки","Особенности"],rows:[["Python","FastAPI, Django, Flask","Простота, силён рядом с ML/аналитикой"],["Node.js (JS)","Express, NestJS, Hono","JS на клиенте и сервере, real-time приложения"],["Go","Gin, Echo, Fiber","Высоконагруженные системы, микросервисы"],["Java / Kotlin","Spring Boot","Корпоративный бэкенд, энтерпрайз"],["Rust","Actix Web, Axum","Производительность, безопасность памяти"]]}),t.jsx("div",{className:"theory-subsection",style:{marginTop:"16px"},children:t.jsxs("p",{style:{marginBottom:"12px",fontSize:"12px"},children:["📚 Документации:",t.jsx("a",{href:"https://www.python.org/doc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"Python"}),t.jsx("span",{style:{color:"var(--text-tertiary)"},children:" · "}),t.jsx("a",{href:"https://fastapi.tiangolo.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"FastAPI"}),t.jsx("span",{style:{color:"var(--text-tertiary)"},children:" · "}),t.jsx("a",{href:"https://www.djangoproject.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"Django"}),t.jsx("span",{style:{color:"var(--text-tertiary)"},children:" · "}),t.jsx("a",{href:"https://nodejs.org/en/docs",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"Node.js"}),t.jsx("span",{style:{color:"var(--text-tertiary)"},children:" · "}),t.jsx("a",{href:"https://go.dev/doc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"Go"}),t.jsx("span",{style:{color:"var(--text-tertiary)"},children:" · "}),t.jsx("a",{href:"https://www.rust-lang.org/documentation.html",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"Rust"})]})}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Базы данных"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.postgresql.org/docs",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"PostgreSQL"})})," — реляционная БД, стандарт большинства проектов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://docs.mongodb.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"MongoDB"})})," — документо-ориентированная NoSQL"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://redis.io/docs",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Redis"})})," — кэш и брокер сообщений в памяти"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://clickhouse.com/docs",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"ClickHouse"})})," — колоночная БД для аналитики"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"ORM:"})," ",t.jsx("a",{href:"https://www.prisma.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Prisma"}),", ",t.jsx("a",{href:"https://docs.sqlalchemy.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"SQLAlchemy"}),", ",t.jsx("a",{href:"https://gorm.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"GORM"})]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Аналитика данных"}),t.jsx("p",{className:"theory-intro",children:"Аналитик собирает, обрабатывает, визуализирует и интерпретирует данные. Основной язык — Python, но SQL важен не меньше."}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://pandas.pydata.org/docs",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"pandas"})})," — работа с табличными данными"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://numpy.org/doc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"NumPy"})})," — численные вычисления, матрицы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Визуализация:"})," ",t.jsx("a",{href:"https://matplotlib.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Matplotlib"}),", ",t.jsx("a",{href:"https://seaborn.pydata.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Seaborn"}),", ",t.jsx("a",{href:"https://plotly.com/python",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Plotly"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://jupyter.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Jupyter Notebook"})})," — интерактивная среда анализа"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"SQL"})," — обязательный инструмент любого аналитика"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BI:"})," ",t.jsx("a",{href:"https://www.tableau.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Tableau"}),", ",t.jsx("a",{href:"https://powerbi.microsoft.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Power BI"}),", ",t.jsx("a",{href:"https://grafana.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Grafana"}),", ",t.jsx("a",{href:"https://superset.apache.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Superset"}),", ",t.jsx("a",{href:"https://www.metabase.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Metabase"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Machine Learning"}),t.jsx("p",{className:"theory-intro",children:"ML-инженер и Data Scientist работают на стыке математики, программирования и предметной области. Порог входа высокий, но спрос устойчив."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Базовые библиотеки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://scikit-learn.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"scikit-learn"})})," — классические ML-алгоритмы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Градиентный бустинг:"})," ",t.jsx("a",{href:"https://xgboost.readthedocs.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"XGBoost"}),", ",t.jsx("a",{href:"https://lightgbm.readthedocs.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"LightGBM"}),", ",t.jsx("a",{href:"https://catboost.ai",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"CatBoost"})," (лидер на табличных данных)"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Deep Learning и LLM (тренд 2024-2026)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://pytorch.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"PyTorch"})})," — доминирующий фреймворк для исследований и продакшена"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://tensorflow.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"TensorFlow / Keras"})})," — по-прежнему используется в энтерпрайзе"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LLM фреймворки:"})," ",t.jsx("a",{href:"https://python.langchain.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"LangChain"}),", ",t.jsx("a",{href:"https://docs.llamaindex.ai",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"LlamaIndex"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://huggingface.co/docs/transformers",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Hugging Face Transformers"})})," — стандарт для NLP"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://ollama.ai",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Ollama"})})," — запуск локальных LLM"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Кибербезопасность"}),t.jsx("p",{className:"theory-intro",children:"Специалист должен понимать, как работают системы, сети и приложения — и как их взломать, чтобы защитить."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Языки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.python.org/doc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Python"})})," — скрипты, автоматизация, инструменты анализа"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.gnu.org/software/bash/manual",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Bash / Shell"})})," — работа в Linux"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"C / C++"})," — уязвимости низкого уровня, reverse engineering"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Ключевые инструменты"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.kali.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Kali Linux"})})," / ",t.jsx("a",{href:"https://www.parrotsec.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Parrot OS"})})," — дистрибутивы для пентеста"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://nmap.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Nmap"})})," — сетевое сканирование, ",t.jsx("a",{href:"https://portswigger.net/burp",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Burp Suite"})})," — анализ веб-приложений"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.wireshark.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Wireshark"})})," — анализ трафика, ",t.jsx("a",{href:"https://www.metasploit.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Metasploit"})})," — тестирование на проникновение"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Универсальные инструменты разработчика"}),t.jsx("p",{className:"theory-intro",children:"Независимо от направления есть инструменты, которые нужны всем."}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://git-scm.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Git"})})," — система контроля версий (абсолютный стандарт). ",t.jsx("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"GitHub"}),", ",t.jsx("a",{href:"https://gitlab.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"GitLab"}),", ",t.jsx("a",{href:"https://bitbucket.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Bitbucket"}),", CI/CD"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Командная строка и Linux"})," — большинство серверов на Linux. ",t.jsx("a",{href:"https://www.man7.org/linux/man-pages/man1/ssh.1.html",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"SSH"}),", bash-скрипты"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://docker.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"Docker"})})," — контейнеризация, решает «у меня работает, а на сервере нет». ",t.jsx("a",{href:"https://kubernetes.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Kubernetes"})," для оркестрации"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Облачные платформы:"})," ",t.jsx("a",{href:"https://aws.amazon.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"AWS"}),", ",t.jsx("a",{href:"https://cloud.google.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Google Cloud"}),", ",t.jsx("a",{href:"https://azure.microsoft.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Azure"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"REST API и HTTP"})," — методы, статус-коды, JSON. ",t.jsx("a",{href:"https://www.postman.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Postman"})," для тестирования"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://code.visualstudio.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:t.jsx("strong",{children:"VS Code"})})," — самый популярный редактор. ",t.jsx("a",{href:"https://www.jetbrains.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"JetBrains IDE"}),", ",t.jsx("a",{href:"https://neovim.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Neovim"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"AI-инструменты:"})," ",t.jsx("a",{href:"https://github.com/features/copilot",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"GitHub Copilot"}),", ",t.jsx("a",{href:"https://cursor.sh",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Cursor"}),", ",t.jsx("a",{href:"https://claude.ai",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Claude"}),", ",t.jsx("a",{href:"https://chatgpt.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"ChatGPT"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Рынок труда 2026: что выбрать"}),t.jsx(I,{headers:["Направление","Топ-стек"],rows:[["Фронтенд","TypeScript + React/Next.js, Tailwind + Vite"],["Бэкенд","Python (FastAPI/Django), Node.js (NestJS), Go"],["Аналитика","Python + SQL, dbt, BI-инструменты"],["ML/AI","PyTorch + scikit-learn, LangChain, Hugging Face"],["Кибербезопасность","Python + Linux + Bash"]]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Не пытайся выучить всё сразу. Выбери одно направление, освой базу, начни применять. Глубина важнее ширины! 🚀"})})]})}function lm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 17"}),t.jsx("p",{className:"theory-subtitle",children:"SQL — часть 1: основы"}),t.jsx("p",{className:"theory-date",children:"17 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"📊 SQL — часть 1: что такое база данных"}),t.jsx("p",{className:"theory-intro",children:"База данных (БД) — это место, где приложение надёжно хранит данные. Реляционная БД хранит данные в таблицах — как электронные таблицы Excel, со строками и столбцами."}),t.jsxs("p",{className:"theory-text",style:{marginBottom:"4px"},children:["Вот таблица ",t.jsx("strong",{children:"users"})," — каждая строка это один пользователь, каждый столбец — одно свойство:"]}),t.jsx(ke,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"]],caption:"id — уникальный номер строки (первичный ключ)"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"SELECT — выборка данных"}),t.jsxs("p",{className:"theory-intro",children:["SELECT — главная команда SQL. Она говорит: «выбери эти колонки из этой таблицы». ",t.jsx("code",{children:"*"})," означает «все колонки»."]}),t.jsx(N,{language:"sql",code:"SELECT name, age FROM users;"}),t.jsx("p",{className:"theory-text",children:"Берём только колонки name и age из таблицы users:"}),t.jsx(ke,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"]],highlightCols:[1,2],caption:"Подсвеченные колонки — это результат запроса"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"WHERE — фильтрация строк"}),t.jsx("p",{className:"theory-intro",children:"WHERE оставляет только те строки, которые подходят под условие. Остальные отбрасываются."}),t.jsx(N,{language:"sql",code:"SELECT * FROM users WHERE age > 25;"}),t.jsx("p",{className:"theory-text",children:"Останутся только пользователи старше 25 лет:"}),t.jsx(ke,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"]],highlightRows:[1,3],caption:"Подсвечены строки, прошедшие условие age > 25 (Борис и Глеб)"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операторы в WHERE"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сравнение:"})," = , > , < , >= , <= , != "]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"AND / OR:"})," ",t.jsx("code",{children:"WHERE age > 20 AND city = 'Москва'"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"IN:"})," ",t.jsx("code",{children:"WHERE city IN ('Москва', 'Сочи')"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BETWEEN:"})," ",t.jsx("code",{children:"WHERE age BETWEEN 20 AND 30"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LIKE:"})," ",t.jsx("code",{children:"WHERE name LIKE 'А%'"})," — имена на букву «А»"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"ORDER BY — сортировка"}),t.jsx("p",{className:"theory-intro",children:"ORDER BY сортирует результат. ASC — по возрастанию (по умолчанию), DESC — по убыванию."}),t.jsx(N,{language:"sql",code:"SELECT * FROM users ORDER BY age DESC;"}),t.jsx("p",{className:"theory-text",children:"Те же данные, но отсортированы от самого старшего к младшему:"}),t.jsx(ke,{name:"результат",columns:["id","name","age","city"],rows:[["4","Глеб","42","Сочи"],["2","Борис","31","Казань"],["1","Анна","25","Москва"],["3","Вера","19","Москва"]],highlightCols:[2],caption:"Строки переставлены по убыванию возраста"}),t.jsxs("ul",{className:"theory-list",style:{marginTop:"12px"},children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LIMIT"})," — ограничить число строк: ",t.jsx("code",{children:"ORDER BY age DESC LIMIT 3"})," (топ-3 старших)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"DISTINCT"})," — только уникальные значения: ",t.jsx("code",{children:"SELECT DISTINCT city FROM users"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Будущее IT — за теми, кто постоянно учится. А SELECT, WHERE и ORDER BY — твой первый шаг в SQL! 📈"})})]})}function om(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 18"}),t.jsx("p",{className:"theory-subtitle",children:"Тестирование, комментарии и документация · SQL часть 2"}),t.jsx("p",{className:"theory-date",children:"18 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Типы тестов"}),t.jsx(I,{headers:["Тип","Что тестирует","Скорость","Пример"],rows:[["Unit","Одна функция","Быстро","def test_add()"],["Integration","Несколько компонентов","Медленнее","Фронтенд + API"],["E2E","Весь поток пользователя","Очень медленно","Открыть браузер, кликнуть"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Паттерн AAA"}),t.jsx("p",{className:"theory-intro",children:"Arrange → Act → Assert. Структура каждого теста:"}),t.jsx(N,{code:`def test_user_creation():
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
}`,language:"javascript"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Комментарии"}),t.jsxs(R,{title:"Плохо",children:[t.jsx("p",{children:"// Увеличиваем i на 1"}),t.jsx("p",{children:"i++"})]}),t.jsxs(R,{title:"Хорошо",children:[t.jsx("p",{children:"// Пропускаем элементы до первого позитивного отзыва"}),t.jsx("p",{children:"while (reviews[i].rating < 4) i++"})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Правило: комментируй ЧТО и ПОЧЕМУ, а не ЧТО делает код (это очевидно из кода)."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Хорошие привычки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Пиши код для людей, компилятор уже поймёт"}),t.jsx("li",{className:"theory-list-item",children:"✅ Тесты это документация (показывают как использовать)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Код должен быть понятен без комментариев"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не комментируй очевидное"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не оставляй старый код в комментариях (это Git!)"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"📊 SQL — часть 2: агрегатные функции"}),t.jsxs("p",{className:"theory-intro",children:["Агрегатные функции считают что-то по целой группе строк и возвращают одно число. Используем ту же таблицу ",t.jsx("strong",{children:"users"})," из части 1."]}),t.jsx(ke,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"],["5","Дина","28","Казань"]]}),t.jsx(I,{headers:["Функция","Что делает","Пример","Результат"],rows:[["COUNT(*)","Считает строки","SELECT COUNT(*) FROM users","5"],["AVG(age)","Среднее значение","SELECT AVG(age) FROM users","29"],["MAX(age)","Максимум","SELECT MAX(age) FROM users","42"],["MIN(age)","Минимум","SELECT MIN(age) FROM users","19"],["SUM(age)","Сумма","SELECT SUM(age) FROM users","145"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"GROUP BY — группировка"}),t.jsx("p",{className:"theory-intro",children:"GROUP BY собирает строки в группы по одинаковому значению, и агрегатная функция считается для каждой группы отдельно."}),t.jsx(N,{language:"sql",code:`SELECT city, COUNT(*) AS count
FROM users
GROUP BY city;`}),t.jsx("p",{className:"theory-text",children:"Строки сгруппировались по городу, и для каждого посчиталось количество:"}),t.jsx(ke,{name:"результат",columns:["city","count"],rows:[["Москва","2"],["Казань","2"],["Сочи","1"]],highlightCols:[1],caption:"Анна+Вера → Москва (2), Борис+Дина → Казань (2), Глеб → Сочи (1)"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"HAVING — фильтр групп"}),t.jsxs("p",{className:"theory-intro",children:["HAVING фильтрует уже сгруппированные данные. Запомни разницу: ",t.jsx("strong",{children:"WHERE"})," фильтрует строки ДО группировки, ",t.jsx("strong",{children:"HAVING"})," — группы ПОСЛЕ."]}),t.jsx(N,{language:"sql",code:`SELECT city, COUNT(*) AS count
FROM users
GROUP BY city
HAVING COUNT(*) > 1;`}),t.jsx("p",{className:"theory-text",children:"Остались только города, где больше одного пользователя:"}),t.jsx(ke,{name:"результат",columns:["city","count"],rows:[["Москва","2"],["Казань","2"]],highlightRows:[0,1],caption:"Сочи отброшен — там только 1 пользователь"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"INSERT — добавление данных"}),t.jsx(N,{language:"sql",code:`INSERT INTO users (id, name, age, city)
VALUES (6, 'Егор', 35, 'Москва');`}),t.jsx("p",{className:"theory-text",children:"В таблице появилась новая строка:"}),t.jsx(ke,{name:"users",columns:["id","name","age","city"],rows:[["...","...","...","..."],["5","Дина","28","Казань"],["6","Егор","35","Москва"]],highlightRows:[2],caption:"Новая строка добавлена в конец таблицы"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"UPDATE и DELETE"}),t.jsx("p",{className:"theory-intro",children:"UPDATE меняет существующие строки, DELETE удаляет их. Условие WHERE определяет, какие именно строки затронуты."}),t.jsx(N,{language:"sql",code:`-- Изменить город пользователя с id=1
UPDATE users SET city = 'Сочи' WHERE id = 1;

-- Удалить пользователя с id=6
DELETE FROM users WHERE id = 6;`}),t.jsxs(R,{title:"⚠️ Главное правило безопасности",children:[t.jsxs("p",{children:["ВСЕГДА пиши WHERE в UPDATE и DELETE! Без условия команда изменит или удалит ",t.jsx("strong",{children:"ВСЕ"})," строки таблицы."]}),t.jsx("p",{style:{marginTop:"8px",color:"#ff5f5f"},children:"DELETE FROM users; — удалит вообще всех пользователей!"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Качество > количество кода. А GROUP BY и агрегаты превращают тысячи строк в осмысленные цифры! 🎯"})})]})}function am(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 19"}),t.jsx("p",{className:"theory-subtitle",children:"Основы баз данных и SQL · часть 3"}),t.jsx("p",{className:"theory-date",children:"19 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Связи между таблицами"}),t.jsx("p",{className:"theory-intro",children:"В реальных приложениях данные разбиты на несколько таблиц, связанных между собой. Это избавляет от дублирования. Возьмём пользователей и их заказы."}),t.jsx(ke,{name:"users",columns:["id 🔑","name","city"],rows:[["1","Анна","Москва"],["2","Борис","Казань"],["3","Вера","Москва"]],highlightCols:[0],caption:"id — первичный ключ (PRIMARY KEY), уникальный для каждого пользователя"}),t.jsx(ke,{name:"orders",columns:["id 🔑","user_id 🔗","product","price"],rows:[["1","1","Книга","500"],["2","1","Наушники","3000"],["3","2","Мышка","1200"],["4","5","Монитор","15000"]],highlightCols:[1],caption:"user_id — внешний ключ (FOREIGN KEY), ссылается на users.id"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Ключи"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Первичный ключ (PRIMARY KEY)"})," 🔑 — уникальный идентификатор строки. Не повторяется."]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Внешний ключ (FOREIGN KEY)"})," 🔗 — ссылка на первичный ключ другой таблицы. Связывает таблицы."]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"INNER JOIN — соединение таблиц"}),t.jsx("p",{className:"theory-intro",children:"JOIN соединяет строки двух таблиц по условию. INNER JOIN оставляет только те строки, для которых есть совпадение в обеих таблицах."}),t.jsx(N,{language:"sql",code:`SELECT users.name, orders.product, orders.price
FROM users
JOIN orders ON users.id = orders.user_id;`}),t.jsx("p",{className:"theory-text",children:"Каждый заказ дополнился именем пользователя (соединение по id = user_id):"}),t.jsx(ke,{name:"результат",columns:["name","product","price"],rows:[["Анна","Книга","500"],["Анна","Наушники","3000"],["Борис","Мышка","1200"]],highlightRows:[0,1,2],caption:"Заказ с user_id=5 не попал — такого пользователя нет. Вера без заказов — тоже не попала."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"LEFT JOIN — все строки слева"}),t.jsx("p",{className:"theory-intro",children:"LEFT JOIN берёт ВСЕ строки из левой таблицы, даже если справа нет совпадения. Где совпадения нет — будет NULL (пусто)."}),t.jsx(N,{language:"sql",code:`SELECT users.name, orders.product
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`}),t.jsx(ke,{name:"результат",columns:["name","product"],rows:[["Анна","Книга"],["Анна","Наушники"],["Борис","Мышка"],["Вера","NULL"]],highlightRows:[3],caption:"Вера попала в результат, хотя заказов у неё нет — product = NULL"}),t.jsx(I,{headers:["Тип JOIN","Что возвращает"],rows:[["INNER JOIN","Только строки с совпадением в обеих таблицах"],["LEFT JOIN","Все строки из левой таблицы + совпадения справа"],["RIGHT JOIN","Все строки из правой таблицы + совпадения слева"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"JOIN + GROUP BY вместе"}),t.jsx("p",{className:"theory-intro",children:"Самое мощное — соединить таблицы и тут же сгруппировать. Например: сколько потратил каждый пользователь."}),t.jsx(N,{language:"sql",code:`SELECT users.name, SUM(orders.price) AS total
FROM users
JOIN orders ON users.id = orders.user_id
GROUP BY users.name
ORDER BY total DESC;`}),t.jsx(ke,{name:"результат",columns:["name","total"],rows:[["Анна","3500"],["Борис","1200"]],highlightCols:[1],caption:"Анна: 500 + 3000 = 3500. Отсортировано по убыванию суммы."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Нормализация"}),t.jsx("p",{className:"theory-intro",children:"Нормализация — это разбиение данных на таблицы так, чтобы избежать дублирования. Вместо того чтобы в каждом заказе хранить имя и город пользователя, мы храним только user_id и ссылаемся на таблицу users."}),t.jsx(R,{title:"Зачем это нужно",children:t.jsx("p",{children:"Если Анна сменит город, мы поменяем его в ОДНОМ месте — в таблице users. Без нормализации пришлось бы менять город во всех её заказах."})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"SQL vs NoSQL"}),t.jsx(I,{headers:["SQL (реляционные)","NoSQL"],rows:[["Данные в таблицах со схемой","Гибкая структура (документы, ключ-значение)"],["Строгие связи и целостность","Быстрое масштабирование"],["Сложные запросы с JOIN","Простые быстрые запросы"],["PostgreSQL, MySQL, SQLite","MongoDB, Redis"]]}),t.jsxs("p",{className:"theory-text",style:{marginTop:"12px"},children:[t.jsx("strong",{children:"Когда что:"})," SQL — когда данные структурированы и важны связи (банк, магазин). NoSQL — когда нужна гибкость и скорость (кэш, логи, ленты)."]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Итог трёх дней SQL"}),t.jsx(I,{headers:["Часть","Что изучили"],rows:[["Часть 1 (17 июня)","БД, таблицы, SELECT, WHERE, ORDER BY, LIMIT"],["Часть 2 (18 июня)","COUNT/SUM/AVG, GROUP BY, HAVING, INSERT/UPDATE/DELETE"],["Часть 3 (19 июня)","Ключи, INNER/LEFT JOIN, нормализация, SQL vs NoSQL"]]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"SQL — один из самых востребованных навыков. Ты прошёл все основы за три дня. Теперь практикуйся на реальных запросах! 📊"})})]})}function cm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 20"}),t.jsx("p",{className:"theory-subtitle",children:"Сети и REST API"}),t.jsx("p",{className:"theory-date",children:"20 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как работает интернет"}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"DNS:"})," google.com → IP адрес"]}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"HTTP:"})," Запрос-ответ между клиентом и сервером"]}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"TCP/IP:"})," Стандарты передачи данных"]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"HTTP методы"}),t.jsx(I,{headers:["Метод","Описание","Пример"],rows:[["GET","Получить данные","Загрузить страницу"],["POST","Создать данные","Отправить форму"],["PUT","Обновить полностью","Заменить весь объект"],["PATCH","Обновить частично","Изменить одно поле"],["DELETE","Удалить данные","Удалить пост"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"REST API"}),t.jsx("p",{className:"theory-intro",children:"REST = Representational State Transfer. Стандарт для создания API."}),t.jsx(N,{code:`// GET /users - получить всех пользователей
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
DELETE /users/123`})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"HTTP коды ответов"}),t.jsx(I,{headers:["Код","Значение","Когда"],rows:[["200","OK","Запрос успешен"],["201","Created","Ресурс создан"],["400","Bad Request","Неправильные данные"],["401","Unauthorized","Нужна аутентификация"],["403","Forbidden","Доступ запрещён"],["404","Not Found","Ресурс не найден"],["500","Server Error","Ошибка на сервере"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"JSON"}),t.jsx("p",{className:"theory-intro",children:"Формат обмена данными между сервером и клиентом."}),t.jsx(N,{code:`{
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
  -H "Authorization: Bearer token123"`,language:"bash"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"API везде! Это основа веб-разработки! 🌐"})})]})}function dm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 23"}),t.jsx("p",{className:"theory-subtitle",children:"Алгоритмы: сортировки и поиск"}),t.jsx("p",{className:"theory-date",children:"23 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Алгоритмы сортировки"}),t.jsx(I,{headers:["Алгоритм","Big O","Стабильный?","Когда использовать"],rows:[["Bubble Sort","O(n²)","Да","Только для обучения"],["Merge Sort","O(n log n)","Да","Нужна стабильность"],["Quick Sort","O(n log n)","Нет","Обычно быстрее"],["Heap Sort","O(n log n)","Нет","Гарантированно быстро"],["Insertion Sort","O(n²)","Да","Маленькие массивы"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Merge Sort"}),t.jsx(N,{code:`def merge_sort(arr):
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

# Пример: [−2,1,−3,4,−1,2,1,−5,4] → 6 (подмассив [4,−1,2,1])`,language:"python"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Сортировка везде! Выучи хорошо! 📊"})})]})}function um(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 24"}),t.jsx("p",{className:"theory-subtitle",children:"Паттерны алгоритмических задач"}),t.jsx("p",{className:"theory-date",children:"24 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Sliding Window"}),t.jsx("p",{className:"theory-intro",children:"Использовать окно для работы с подмассивом"}),t.jsx(N,{code:`def max_sum_subarray(arr, k):
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
    return memo[n]`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как решать задачи на собеседовании"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Поймиляй задачу (спроси примеры)"}),t.jsx("li",{children:"Обсуди подход (не сразу пиши код)"}),t.jsx("li",{children:"Напиши решение (медленно и четко)"}),t.jsx("li",{children:"Тест на примерах"}),t.jsx("li",{children:"Обсуди Big O"}),t.jsx("li",{children:"Спроси можно ли оптимизировать"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Паттерны повторяются! Выучи и побеждай! 🎯"})})]})}function hm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 25"}),t.jsx("p",{className:"theory-subtitle",children:"Кибербезопасность для разработчика"}),t.jsx("p",{className:"theory-date",children:"25 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"OWASP Top 10"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"SQL-инъекции"}),t.jsx("li",{children:"Broken Authentication"}),t.jsx("li",{children:"Sensitive Data Exposure"}),t.jsx("li",{children:"XXE (XML External Entity)"}),t.jsx("li",{children:"Broken Access Control"}),t.jsx("li",{children:"Security Misconfiguration"}),t.jsx("li",{children:"XSS (Cross-Site Scripting)"}),t.jsx("li",{children:"Insecure Deserialization"}),t.jsx("li",{children:"Using Components with Known Vulnerabilities"}),t.jsx("li",{children:"Insufficient Logging & Monitoring"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"SQL-инъекции"}),t.jsx(N,{code:`# ❌ Плохо
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
password_hash = bcrypt.hashpw(password.encode(), salt)`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"HTTPS и TLS"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"ВСЕГДА используй HTTPS (не HTTP)"}),t.jsx("li",{className:"theory-list-item",children:"Шифрует данные между браузером и сервером"}),t.jsx("li",{className:"theory-list-item",children:"TLS 1.2+ обязателен"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Правила безопасности"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Валидируй весь пользовательский ввод"}),t.jsx("li",{className:"theory-list-item",children:"✅ Используй параметризованные запросы"}),t.jsx("li",{className:"theory-list-item",children:"✅ Экранируй output"}),t.jsx("li",{className:"theory-list-item",children:"✅ Не логируй пароли"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не храни секреты в коде"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не доверяй клиентским проверкам"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Security — ответственность разработчика! 🔒"})})]})}function fm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 26"}),t.jsx("p",{className:"theory-subtitle",children:"Soft skills: команда, фидбек, рост"}),t.jsx("p",{className:"theory-date",children:"26 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Работа в команде"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Коммуникация:"})," Ясно объясняй проблемы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Слушание:"})," Слушай мнение других"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сотрудничество:"})," Помогай коллегам"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ответственность:"})," Бери на себя задачи"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как давать фидбек (модель SBI)"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Situation:"})," Опиши ситуацию"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Behavior:"})," Что сделал человек"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Impact:"})," Какой был результат"]})]}),t.jsx(N,{code:`// ❌ Плохо
"Твой код плохой"

// ✅ Хорошо
"На код-ревью я заметил, что функция calcPrice()
не обрабатывает null значения. Это привело к ошибке
на продакшене. Давай добавим валидацию в начале функции."`,language:"text"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как просить о помощи"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Rubber duck debugging: объясни проблему игрушечной утке"}),t.jsx("li",{className:"theory-list-item",children:"✅ Google → StackOverflow → коллеги → менеджер"}),t.jsx("li",{className:"theory-list-item",children:"✅ Показывай что уже пробовал"}),t.jsx("li",{className:"theory-list-item",children:"❌ Сразу не звони с вопросом"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Синдром самозванца"}),t.jsx("p",{className:"theory-intro",children:"Чувство что ты не достоин, что все лучше, что вот-вот все поймут что ты фрод."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Это нормально — даже опытные разработчики это чувствуют"}),t.jsx("li",{className:"theory-list-item",children:"✅ Пиши код, получай фидбек, улучшайся"}),t.jsx("li",{className:"theory-list-item",children:"✅ Помни о достижениях, а не только о ошибках"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Профессиональный рост"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Читай чужой код — лучше всего учиться"}),t.jsx("li",{className:"theory-list-item",children:"Делись знаниями (статьи, переговоры, mentoring)"}),t.jsx("li",{className:"theory-list-item",children:"Проси фидбек и совета"}),t.jsx("li",{className:"theory-list-item",children:"Учись на ошибках (своих и чужих)"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Soft skills важны как hard skills! 🤝"})})]})}function mm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 27"}),t.jsx("p",{className:"theory-subtitle",children:"Как учиться программированию"}),t.jsx("p",{className:"theory-date",children:"27 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Активное vs Пассивное обучение"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"❌ Пассивное: Читать блоги, смотреть видео"}),t.jsx("li",{className:"theory-list-item",children:"✅ Активное: Писать код, делать проекты, объяснять"})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"12px"},children:"Статистика: помнишь 10% прочитанного, 50% услышанного, 90% сделанного!"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Метод Фейнмана"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Выбери концепцию"}),t.jsx("li",{children:"Объясни её простыми словами (как ребёнку)"}),t.jsx("li",{children:"Определи пробелы в понимании"}),t.jsx("li",{children:"Упрости и переделай объяснение"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Ресурсы для обучения"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Обучение:"})," CS50, Roadmap.sh, Udemy"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Практика:"})," LeetCode, Codeforces, HackerRank"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Проекты:"})," GitHub, собственные идеи"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сообщество:"})," Reddit r/learnprogramming, Discord"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как учиться эффективно"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Уделяй 1-2 часа ежедневно, а не 8 часов в выходной"}),t.jsx("li",{className:"theory-list-item",children:"✅ Проектное обучение: делай реальные проекты"}),t.jsx("li",{className:"theory-list-item",children:"✅ Читай чужой код (GitHub, документация)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Объясняй другим (лучший способ учиться)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не зубри синтаксис (Google это за тебя)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не начинай со сложного"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Публичное портфолио"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"GitHub:"})," README, примеры кода, проекты"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LinkedIn:"})," Опыт, навыки, рекомендации"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Личный сайт:"})," Portfolio с примерами работ"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Блог:"})," Статьи о том что учишь"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как ставить цели (OKR)"}),t.jsxs(R,{title:"Пример OKR",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Objective:"})," Научиться веб-разработке"]}),t.jsx("p",{children:t.jsx("strong",{children:"Key Results:"})}),t.jsxs("ul",{style:{marginTop:"8px"},children:[t.jsx("li",{children:"1. Завершить 5 проектов на React"}),t.jsx("li",{children:"2. Сделать 30 задач на LeetCode (medium)"}),t.jsx("li",{children:"3. Прочитать 2 книги по вебу"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Обучение — это путь, не пункт назначения! 📚"})})]})}function pm(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 29"}),t.jsx("p",{className:"theory-subtitle",children:"Резюме IT-джуна: пишем первую версию"}),t.jsx("p",{className:"theory-date",children:"29 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Структура резюме"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Контакты:"})," Имя, email, телефон, GitHub, LinkedIn"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Профессиональное резюме (summary):"})," 2-3 предложения кто ты"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Навыки:"})," Язык программирования, фреймворки, инструменты"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Опыт:"})," Стажировки, проекты, волонтёрство"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Образование:"})," Курсы, сертификаты, лагеря"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Проекты:"})," GitHub ссылки на твои лучшие работы"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Советы для джуна"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Будь честен (не приукрашивай опыт)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Покажи что ты можешь (GitHub, проекты)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Сфокусируйся на качестве (5 хороших проектов > 20 так себе)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Напиши о том что ты выучил"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не претендуй на senior роль"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не списывай чужое резюме"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как описывать проекты"}),t.jsx(R,{title:"❌ Плохо",children:t.jsx("p",{children:"«Написал сайт на React»"})}),t.jsx(R,{title:"✅ Хорошо",children:t.jsx("p",{children:"«Разработал образовательную платформу на React + Node.js для управления расписанием лагеря. Реализовал аутентификацию через JWT, интеграцию с API для расписания, динамическое кэширование данных. Развернул на VPS с Nginx. GitHub: [ссылка]»"})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"GitHub как портфолио"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"README для каждого проекта:"})," Что это, как запустить, примеры"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Хороший коммит история:"})," Осмысленные сообщения"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Чистый код:"})," Без мусора, хорошо организован"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Стабильные проекты:"})," Которые хорошо работают"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сопроводительное письмо"}),t.jsx("p",{className:"theory-intro",children:"Не обязательно для джуна, но помогает!"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Привет, я изучаю [технология]"}),t.jsx("li",{children:"Сделал [проект], это показывает [скиллы]"}),t.jsx("li",{children:"Интересуюсь вашей компанией потому что [причина]"}),t.jsx("li",{children:"Хотел бы присоединиться к команде и учиться!"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Поиск первой работы"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"🔍 LinkedIn Jobs, Indeed, HeadHunter"}),t.jsx("li",{className:"theory-list-item",children:"🔍 Job boards: dev.by (Беларусь), habr.career (Россия)"}),t.jsx("li",{className:"theory-list-item",children:"🔍 Компании напрямую (их сайты)"}),t.jsx("li",{className:"theory-list-item",children:"🤝 Сетвуринг: встречайся с разработчиками"}),t.jsx("li",{className:"theory-list-item",children:"💌 Отправляй резюме в компании которые тебе нравятся"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Во время интервью"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Приходи вовремя (за 5 минут)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Задавай вопросы о команде и проектах"}),t.jsx("li",{className:"theory-list-item",children:"✅ Будь честен что не знаешь"}),t.jsx("li",{className:"theory-list-item",children:"✅ Покажи как думаешь при решении задач"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не будь самоуверен"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не говори что тебе всё равно"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Первая работа — начало карьеры! Верь в себя! 💪"})})]})}const ea={1:Wf,2:Vf,3:qf,4:Qf,5:Kf,6:Yf,7:Jf,8:Xf,9:Zf,10:em,11:tm,12:nm,13:sm,15:rm,16:im,17:lm,18:om,19:am,20:cm,23:dm,24:um,25:hm,26:fm,27:mm,29:pm};function ym(e){const n=Mt.find(s=>s.day===e);return n?n.title:`День ${e}`}function wd({selectedDay:e,onBack:n}){const[s,r]=E.useState(null),[i,l]=E.useState(!0);return E.useEffect(()=>{const o=setTimeout(()=>{ea[e]&&r(()=>ea[e]),l(!1)},300);return()=>clearTimeout(o)},[e]),i?t.jsx("section",{className:"page active",children:t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-secondary)"},children:"Загрузка..."})})}):s?t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"theory-breadcrumbs",children:[t.jsx("button",{className:"breadcrumb-link",onClick:n,children:"📚 Библиотека знаний"}),t.jsx("span",{className:"breadcrumb-sep",children:"/"}),t.jsxs("span",{className:"breadcrumb-current",children:["День ",e," · ",ym(e)]})]}),t.jsx(s,{}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:n,children:"Вернуться в Библиотеку знаний"})})]}):t.jsxs("section",{className:"page active",children:[t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Материалы для этого дня еще готовятся..."})}),t.jsx("button",{className:"btn-back",onClick:n,children:"← Вернуться в Библиотеку"})]})}function xm(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:'Что выведет: print(int("42"))?',options:["42",'"42"',"Ошибка","None"],answer:"42",hint:"int() преобразует строку в целое число"},{id:2,type:"choice",difficulty:"easy",text:"Что выведет: print(7 / 2)?",options:["3","3.5","3.0","2"],answer:"3.5",hint:"Оператор / всегда возвращает float"},{id:3,type:"choice",difficulty:"easy",text:"Что выведет: print(7 // 2)?",options:["3.5","3","4","Ошибка"],answer:"3",hint:"// — целочисленное деление (floor division)"},{id:4,type:"choice",difficulty:"easy",text:"Что выведет: print(7 % 3)?",options:["2","1","4","0"],answer:"1",hint:"% возвращает остаток от деления: 7 = 3*2 + 1"},{id:5,type:"choice",difficulty:"medium",text:"Какой приоритет операций верный? (от высшего к низшему)",options:["1) +, -   2) *, /   3) **","1) **   2) *, /, //, %   3) +, -","1) *   2) +   3) **","1) **   2) +   3) *"],answer:"1) **   2) *, /, //, %   3) +, -",hint:"Возведение в степень выполняется первым"},{id:6,type:"choice",difficulty:"easy",text:'Какие из этих значений считаются "ложными"?',options:["Только False",'0, "", None, [], False',"Только 0","True и 1"],answer:'0, "", None, [], False',hint:"Ложные значения: False, 0, пустая строка, None, пустые коллекции"},{id:7,type:"choice",difficulty:"easy",text:"Чем отличается is от ==?",options:["Нет разницы","== сравнивает значения, is сравнивает идентичность объектов","is быстрее чем ==","is работает только с числами"],answer:"== сравнивает значения, is сравнивает идентичность объектов",hint:"Для None правильно писать: x is None, а не x == None"},{id:8,type:"choice",difficulty:"medium",text:"Что выведет: print(True + True + False)?",options:["TrueTrueFalse","2","1","Ошибка"],answer:"2",hint:"True это 1, False это 0. Значит 1 + 1 + 0 = 2"},{id:9,type:"choice",difficulty:"easy",text:"Какой тип возвращает: print(type(1/1))?",options:["int","float","str","bool"],answer:"float",hint:"Оператор / ВСЕГДА возвращает float, даже 4/2 вернет 2.0"},{id:10,type:"choice",difficulty:"medium",text:"Что выведет: print(-7 // 2)?",options:["-3","-4","-3.5","Ошибка"],answer:"-4",hint:"Floor division округляет вниз: -3.5 округляется в -4"},{id:11,type:"choice",difficulty:"medium",text:"Как правильно сравнить переменную с None?",options:["x == None","x is None","Оба варианта одинаковы","None == x"],answer:"x is None",hint:"is проверяет идентичность объекта. Правильный способ: x is None"},{id:12,type:"choice",difficulty:"medium",text:"Как найти последнюю цифру числа 12345?",options:["12345 / 10","12345 // 10","12345 % 10","12345 - 10"],answer:"12345 % 10",hint:"Остаток от деления на 10 дает последнюю цифру"}]}}function gm(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Что выведет: for i in range(3): print(i)?",options:["0 1 2","1 2 3","0 1 2 3","Ошибка"],answer:"0 1 2",hint:"range(3) генерирует числа от 0 до 2 включительно"},{id:2,type:"choice",difficulty:"easy",text:"Какой результат даст while цикл при number = 0, while number < 3?",options:["Бесконечный цикл","Выполнится 3 раза","Не выполнится вообще","Ошибка"],answer:"Выполнится 3 раза",hint:"while проверяет условие. При number=0,1,2 условие истинно, при 3 - ложно"},{id:3,type:"choice",difficulty:"easy",text:"Что выведет? for i in range(10): if i == 5: break; print(i)",options:["0 1 2 3 4","0 1 2 3 4 5","0 1 2 3 4 5 6 7 8 9","Только 5"],answer:"0 1 2 3 4",hint:"break прерывает цикл. При i==5 цикл сразу прерывается"},{id:4,type:"choice",difficulty:"easy",text:"Что выведет? for i in range(5): if i == 2: continue; print(i)",options:["0 1 2 3 4","0 1 3 4","1 3 4","0 1 3 5"],answer:"0 1 3 4",hint:"continue пропускает текущую итерацию, переходит к следующей"},{id:5,type:"choice",difficulty:"easy",text:"Какой синтаксис правильный для определения функции в Python?",options:["def add(a, b) { return a + b }","def add(a, b): return a + b","function add(a, b) { return a + b }","def add(a, b) -> a + b"],answer:"def add(a, b): return a + b",hint:"В Python: def имя(параметры): тело функции"},{id:6,type:"choice",difficulty:"medium",text:`Что выведет? def greet(name, greeting="Привет"): return f"{greeting}, {name}!"
print(greet("Мария"))`,options:["Привет, Мария!","Привет, Привет!","Ошибка","greeting, Мария!"],answer:"Привет, Мария!",hint:"Параметры по умолчанию используются если аргумент не передан"},{id:7,type:"choice",difficulty:"easy",text:"Что выведет? numbers = [1, 2, 3]; print(numbers[-1])",options:["1","-1","3","Ошибка"],answer:"3",hint:"[-1] обращается к последнему элементу списка"},{id:8,type:"choice",difficulty:"medium",text:"Какой метод удаляет последний элемент из списка?",options:["remove()","pop()","delete()","clear()"],answer:"pop()",hint:"pop() удаляет и возвращает последний элемент"},{id:9,type:"choice",difficulty:"medium",text:"Что выведет? squares = [n ** 2 for n in [1, 2, 3]]; print(squares)",options:["[1, 4, 9]","[1, 2, 3]","[2, 4, 6]","Ошибка"],answer:"[1, 4, 9]",hint:"List comprehension: [выражение for элемент in список]"},{id:10,type:"choice",difficulty:"medium",text:"Что выведет? even = [n for n in [1, 2, 3, 4, 5] if n % 2 == 0]; print(even)",options:["[1, 3, 5]","[2, 4]","[1, 2, 3, 4, 5]","[]"],answer:"[2, 4]",hint:"[выражение for элемент in список if условие] - фильтрует элементы"}]}}function jm(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Сколько операций выполняет O(1) алгоритм на n = 1 000 000?",options:["1 операция","1 млн операций","n операций","log(n) операций"],answer:"1 операция",hint:"O(1) - константная сложность, не зависит от размера входных данных"},{id:2,type:"choice",difficulty:"easy",text:"Какая сложность алгоритма если он делит задачу пополам на каждом шаге?",options:["O(n)","O(n²)","O(log n)","O(2^n)"],answer:"O(log n)",hint:"Бинарный поиск: n → n/2 → n/4 → 1. Глубина = log(n)"},{id:3,type:"choice",difficulty:"easy",text:"Сколько операций в одном цикле: for i in range(n): print(i)?",options:["O(1)","O(n)","O(n²)","O(log n)"],answer:"O(n)",hint:"Один цикл = n итераций = O(n)"},{id:4,type:"choice",difficulty:"easy",text:"Какая сложность двух вложенных циклов: for i in range(n): for j in range(n):?",options:["O(n)","O(2n)","O(n²)","O(n log n)"],answer:"O(n²)",hint:"Два вложенных цикла перемножаются: O(n) * O(n) = O(n²)"},{id:5,type:"choice",difficulty:"medium",text:"Упростите Big O: O(2n)",options:["O(2n)","O(n²)","O(n)","O(log n)"],answer:"O(n)",hint:"Отбрасываем константы: O(2n) = O(n)"},{id:6,type:"choice",difficulty:"medium",text:"Упростите Big O: O(n² + n)",options:["O(n)","O(n²)","O(n³)","O(n + n²)"],answer:"O(n²)",hint:"Оставляем доминирующий член: O(n²) > O(n)"},{id:7,type:"choice",difficulty:"medium",text:"На n = 1 000 000 - Сколько O(n) и O(n²) дают операций:",options:["оба - 1 млн","1 млн и 1 млн","1 млн и 1 триллион","1 млн и 1 млрд"],answer:"1 млн и 1 триллион",hint:"O(n) = 1 млн опер (миллисекунды). O(n²) = 1 трлн опер (часы!)"},{id:8,type:"choice",difficulty:"medium",text:"Какой алгоритм быстрее для поиска в отсортированном массиве?",options:["Линейный поиск O(n)","Бинарный поиск O(log n)","Оба одинаковые","Зависит от размера"],answer:"Бинарный поиск O(log n)",hint:"На n=1млн: линейный ~1млн опер, бинарный ~20 опер. Разница 50000х!"},{id:9,type:"choice",difficulty:"medium",text:"Определите сложность: for i in range(n): for j in range(i): print(i,j)",options:["O(n)","O(n²)","O(n³)","O(log n)"],answer:"O(n²)",hint:"n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)"},{id:10,type:"choice",difficulty:"hard",text:"Какая сложность у рекурсивного Фибоначчи: fib(n) = fib(n-1) + fib(n-2)?",options:["O(n)","O(n log n)","O(2^n)","O(log n)"],answer:"O(2^n)",hint:"Каждый вызов даёт 2 новых вызова. Дерево вызовов = 2^n"},{id:11,type:"choice",difficulty:"hard",text:"Какая сложность у Фибоначчи с мемоизацией (кэшированием)?",options:["O(n)","O(2^n)","O(n²)","O(n!)"],answer:"O(n)",hint:"С мемоизацией каждое число вычисляется один раз = O(n)"},{id:12,type:"choice",difficulty:"hard",text:"Какая операция имеет O(1) сложность?",options:["Поиск в неотсортированном массиве","Доступ к элементу по индексу arr[5]","Сортировка массива","Обход всех элементов"],answer:"Доступ к элементу по индексу arr[5]",hint:"Доступ по индексу, присваивание, поиск в словаре - все O(1)"}]}}function Nm(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Что означает операция A ∧ B (AND)?",options:["Истина если хотя бы одна переменная истина","Истина если обе переменные истины","Инверсия значения переменной","Истина если значения разные"],answer:"Истина если обе переменные истины",hint:"AND (И) требует чтобы ОБЕ переменные были истинны"},{id:2,type:"choice",difficulty:"easy",text:"Что означает операция A ∨ B (OR)?",options:["Истина если обе переменные истины","Истина если хотя бы одна переменная истина","Инверсия значения переменной","Истина если значения разные"],answer:"Истина если хотя бы одна переменная истина",hint:"OR (ИЛИ) требует чтобы ХОТЯ БЫ одна переменная была истинна"},{id:3,type:"choice",difficulty:"easy",text:"Что означает операция ¬A (NOT)?",options:["Истина если обе переменные истины","Истина если хотя бы одна истина","Инверсия (противоположное значение) переменной","Истина если значения разные"],answer:"Инверсия (противоположное значение) переменной",hint:"NOT (НЕ) просто меняет значение: 0→1, 1→0"},{id:4,type:"choice",difficulty:"medium",text:"Первый закон де Моргана: ¬(A ∧ B) =?",options:["A ∨ B","¬A ∨ ¬B","¬A ∧ ¬B","A ∧ B"],answer:"¬A ∨ ¬B",hint:"Отрицание конъюнкции равно дизъюнкции отрицаний"},{id:5,type:"choice",difficulty:"medium",text:"Второй закон де Моргана: ¬(A ∨ B) =?",options:["A ∧ B","¬A ∨ ¬B","¬A ∧ ¬B","A ∨ B"],answer:"¬A ∧ ¬B",hint:"Отрицание дизъюнкции равно конъюнкции отрицаний"},{id:6,type:"choice",difficulty:"easy",text:"Закон исключенного третьего: A ∨ ¬A =?",options:["0 (ложь)","1 (истина)","A","¬A"],answer:"1 (истина)",hint:"Переменная либо истинна, либо ложна - одно из двух всегда верно"},{id:7,type:"choice",difficulty:"easy",text:"Закон противоречия: A ∧ ¬A =?",options:["1 (истина)","0 (ложь)","A","¬A"],answer:"0 (ложь)",hint:"Невозможно чтобы переменная была одновременно истинной И ложной"},{id:8,type:"choice",difficulty:"medium",text:"Таблица истинности для A ∧ B имеет сколько строк истины из 4?",options:["1 строка","2 строки","3 строки","4 строки"],answer:"1 строка",hint:"AND истинен только когда обе переменные истины (1,1) - один случай"},{id:9,type:"choice",difficulty:"medium",text:"Что такое объединение множеств A ∪ B?",options:["Элементы которые есть только в A","Элементы которые есть в обоих множествах","Все элементы которые принадлежат либо A, либо B, либо обоим","Элементы которые есть только в B"],answer:"Все элементы которые принадлежат либо A, либо B, либо обоим",hint:'Объединение "собирает" все элементы из обоих множеств'},{id:10,type:"choice",difficulty:"medium",text:"Что такое пересечение множеств A ∩ B?",options:["Все элементы из обоих множеств","Элементы которые принадлежат одновременно и A, и B","Элементы которые есть только в A","Элементы которые есть только в B"],answer:"Элементы которые принадлежат одновременно и A, и B",hint:'Пересечение находит "общие" элементы двух множеств'},{id:11,type:"choice",difficulty:"medium",text:"A = {1, 2, 3}, B = {3, 4, 5}. Что такое A - B (разность)?",options:["{3, 4, 5}","{1, 2, 3, 4, 5}","{1, 2}","{3}"],answer:"{1, 2}",hint:"Разность A  B - это элементы A которые НЕ принадлежат B"},{id:12,type:"choice",difficulty:"hard",text:"Битовые операции: 5 (0101) & 3 (0011) =?",options:["0001 = 1","0101 = 5","0111 = 7","1111 = 15"],answer:"0001 = 1",hint:"& (AND) - битовое И. Единица только где обе позиции = 1"}]}}function vm(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Что такое граф?",options:["Совокупность вершин и рёбер, где рёбра соединяют пары вершин","Последовательность чисел от 1 до n","Матрица целых чисел","Список чисел в порядке возрастания"],answer:"Совокупность вершин и рёбер, где рёбра соединяют пары вершин",hint:"Граф состоит из вершин (узлов) и рёбер (связей между ними)"},{id:2,type:"choice",difficulty:"easy",text:"Что такое полный граф?",options:["Граф где каждая вершина связана с каждой другой вершиной","Граф где нет циклов","Граф где все вершины на одной линии","Граф с одной вершиной"],answer:"Граф где каждая вершина связана с каждой другой вершиной",hint:"Полный граф обозначается K_n, где n - количество вершин"},{id:3,type:"choice",difficulty:"easy",text:"Что такое ориентированный граф?",options:["Граф где рёбра имеют направление (стрелки)","Граф где рёбра не имеют направления","Граф где все вершины связаны в кольцо","Граф без циклов"],answer:"Граф где рёбра имеют направление (стрелки)",hint:"В ориентированном графе есть направление: A→B ≠ B→A"},{id:4,type:"choice",difficulty:"easy",text:"Что такое неориентированный граф?",options:["Граф где рёбра имеют направление","Граф где рёбра НЕ имеют направления (двусторонние)","Граф только с одной вершиной","Граф с самопетлями"],answer:"Граф где рёбра НЕ имеют направления (двусторонние)",hint:"В неориентированном графе A-B = B-A (одно и то же ребро)"},{id:5,type:"choice",difficulty:"medium",text:"Что такое словарь смежности (adjacency list)?",options:["Словарь где ключ - вершина, значение - список соседних вершин","Список всех вершин графа","Матрица расстояний между вершинами","Список рёбер в порядке возрастания"],answer:"Словарь где ключ - вершина, значение - список соседних вершин",hint:"Пример: {A: [B, C], B: [A, D]} - это словарь смежности"},{id:6,type:"choice",difficulty:"medium",text:"В неориентированном графе матрица смежности должна быть:",options:["Симметричной относительно диагонали (A[i][j] = A[j][i])","Диагональной (ненулевые только на диагонали)","Треугольной (нули над/под диагональю)","Единичной (единицы на диагонали)"],answer:"Симметричной относительно диагонали (A[i][j] = A[j][i])",hint:"Симметрия нужна потому что A-B = B-A в неориентированном графе"},{id:7,type:"input",difficulty:"medium",text:"DFS (в глубину) обход графа: граф = {A: [B, C], B: [D], C: [D], D: []}. Начните с A. Записать последовательность посещения вершин (обходить соседей слева направо)",answer:"ABDC",hint:"DFS: идём вглубь. A→B (первый сосед)→D→(нет соседей, назад)→(B посещён)→C→D (уже посещена). Результат: A,B,D,C"},{id:8,type:"input",difficulty:"medium",text:"DFS обход: граф = {A: [B, C], B: [A, D], C: [A], D: [B]}. Начните с A. Последовательность (слева направо)",answer:"ABDC",hint:"DFS идёт в глубину: A→B→D→(нет новых)→назад→C"},{id:9,type:"input",difficulty:"medium",text:"BFS (в ширину) обход графа: граф = {A: [B, C], B: [D], C: [D], D: []}. Начните с A. Последовательность (обходить слева направо)",answer:"ABCD",hint:"BFS: идём в ширину. Уровень 1: A. Уровень 2: B, C. Уровень 3: D. Результат: A,B,C,D"},{id:10,type:"input",difficulty:"medium",text:"BFS обход: граф = {A: [B, C], B: [A, D], C: [A], D: [B]}. Начните с A. Последовательность",answer:"ABCD",hint:"BFS слой за слоем: A (слой 0)→B,C (слой 1)→D (слой 2)"},{id:11,type:"choice",difficulty:"hard",text:"Есть ли цикл в графе? граф = {A: [B, C], B: [D], C: [D], D: []}",options:["Да, есть цикл A→B→D→A","Да, есть цикл B→D→C→B","Нет цикла","Есть самопетля"],answer:"Нет цикла",hint:"Цикл - это путь который возвращается в исходную вершину. В этом графе нет такого пути"},{id:12,type:"choice",difficulty:"hard",text:"Есть ли цикл в графе? граф = {A: [B], B: [C], C: [A], D: [B]}",options:["Нет цикла","Да, цикл: A→B→C→A","Да, цикл: D→B→C","Нет рёбер"],answer:"Да, цикл: A→B→C→A",hint:"Следите за путем: A→B→C→A - это вернулось в исходную вершину!"}]}}function wm(){return{tasks:[{text:"Какой индекс первого элемента в массиве?",type:"input",answer:"0",hint:"Индексация начинается с нуля",difficulty:"Легко"},{text:"Как получить элемент массива arr по индексу 2?",type:"choice",answer:"arr[2]",options:["arr[2]","arr.get(2)","arr(2)","arr-2"],hint:"Используй квадратные скобки",difficulty:"Легко"},{text:"Какая сложность доступа к элементу в массиве?",type:"choice",answer:"O(1)",options:["O(1)","O(n)","O(log n)","O(n^2)"],hint:"Прямой доступ по индексу это константа",difficulty:"Средне"},{text:"Какая сложность поиска в отсортированном массиве?",type:"choice",answer:"O(log n)",options:["O(log n)","O(n)","O(1)","O(n^2)"],hint:"Можно использовать бинарный поиск",difficulty:"Средне"},{text:"Какая сложность вставки элемента в начало массива?",type:"choice",answer:"O(n)",options:["O(n)","O(1)","O(log n)","O(n log n)"],hint:"Нужно сдвинуть все элементы",difficulty:"Средне"},{text:"Что такое связный список?",type:"choice",answer:"цепочка",options:["цепочка","дерево","граф","таблица"],hint:"Структура где каждый элемент указывает на следующий",difficulty:"Средне"},{text:"Как растет динамический массив при добавлении элемента?",type:"choice",answer:"выделяется новая память и копируются все элементы",options:["выделяется новая память и копируются все элементы","старая память расширяется","новый элемент добавляется в конец без изменений","ничего не происходит"],hint:"Когда массив переполнен, создаётся новый с большим размером",difficulty:"Средне"},{text:"Что такое односвязный список?",type:"choice",answer:"каждый узел имеет указатель только на следующий",options:["каждый узел имеет указатель только на следующий","каждый узел имеет указатели на предыдущий и следующий","это массив","это дерево"],hint:"Односвязный = one direction (одно направление)",difficulty:"Легко"},{text:"Что такое двусвязный список?",type:"choice",answer:"каждый узел имеет указатели на предыдущий и следующий",options:["каждый узел имеет указатель только на следующий","каждый узел имеет указатели на предыдущий и следующий","это граф","это стек"],hint:"Двусвязный = two directions (два направления)",difficulty:"Легко"},{text:"Односвязный список: [1] -> [2] -> [3]. Если current указывает на узел 1, что такое current.next.next?",type:"choice",answer:"узел с значением 3",options:["узел с значением 3","узел с значением 2","null","ошибка"],hint:"current.next это второй узел (2), current.next.next это третий узел (3)",difficulty:"Средне"},{text:"Какая сложность доступа к элементу по индексу? Массив vs Связный список",type:"choice",answer:"Массив O(1), Связный список O(n)",options:["Массив O(1), Связный список O(n)","Массив O(n), Связный список O(1)","Оба O(1)","Оба O(n)"],hint:"Массив знает адрес каждого элемента. Список нужно обходить от начала",difficulty:"Средне"},{text:"Двусвязный список: [1] ↔ [2] ↔ [3]. Если current указывает на узел 2, что такое current.prev?",type:"choice",answer:"узел с значением 1",options:["узел с значением 1","узел с значением 3","null","ошибка"],hint:"current.prev это указатель на предыдущий узел в двусвязном списке",difficulty:"Средне"}]}}function km(){return{tasks:[{text:"Что такое LIFO?",type:"choice",answer:"Last In First Out - последний вошедший первый вышедший",options:["Linear Input First Output","Last In First Out - последний вошедший первый вышедший","Load In First Out","List In File Output"],hint:"LIFO это принцип работы стека",difficulty:"Легко"},{text:"Что такое FIFO?",type:"choice",answer:"First In First Out - первый вошедший первый вышедший",options:["Field Information First Output","Final Input First Output","First In First Out - первый вошедший первый вышедший","File In First Out"],hint:"FIFO это принцип работы очереди",difficulty:"Легко"},{text:"Операция push в стеке это...",type:"choice",answer:"добавление элемента на вершину",options:["просмотр верхнего элемента","очистка стека","добавление элемента на вершину","удаление элемента с вершины"],hint:"push добавляет (вталкивает) элемент",difficulty:"Легко"},{text:"Операция pop в стеке это...",type:"choice",answer:"удаление и возврат элемента с вершины",options:["переворот стека","просмотр без удаления","удаление и возврат элемента с вершины","добавление элемента"],hint:"pop извлекает элемент с вершины",difficulty:"Легко"},{text:"Очередь операции: enqueue это добавление, dequeue это удаление. Какая сложность?",type:"choice",answer:"Оба O(1)",options:["enqueue O(n), dequeue O(1)","Оба O(n)","enqueue O(1), dequeue O(n)","Оба O(1)"],hint:"В очереди добавление в конец и удаление из начала обе O(1)",difficulty:"Средне"},{text:'История браузера - вы посещаете сайты 1 → 2 → 3, затем нажимаете "назад" дважды. Какая структура данных это?',type:"choice",answer:"стек (LIFO)",options:["граф","массив","очередь (FIFO)","стек (LIFO)"],hint:'Последний посещённый сайт первым в истории "назад"',difficulty:"Средне"},{text:"Список запросов к серверу от разных пользователей обрабатывается в порядке поступления. Какая структура это?",type:"choice",answer:"очередь (FIFO)",options:["приоритетный массив","дерево","очередь (FIFO)","стек (LIFO)"],hint:"Первый запрос первым обрабатывается - очередь",difficulty:"Средне"},{text:"Операция Undo/Redo при редактировании текста - какая структура?",type:"choice",answer:"стек для Undo, стек для Redo",options:["связный список","очередь для обеих","массив","стек для Undo, стек для Redo"],hint:"Отмена действий в обратном порядке - это LIFO",difficulty:"Средне"},{text:"Какая сложность push и pop операций в стеке?",type:"choice",answer:"Обе O(1)",options:["push O(log n), pop O(n)","Обе O(n)","Обе O(1)","push O(1), pop O(n)"],hint:"Добавление и удаление с вершины - константные операции",difficulty:"Средне"},{text:"Очередь печати (принтер): документы ждут печати в порядке отправки. Какая это очередь?",type:"choice",answer:"FIFO - первый отправленный печатается первым",options:["По размеру файла","Случайный порядок","LIFO - последний отправленный печатается первым","FIFO - первый отправленный печатается первым"],hint:"Справедливо: кто первый в очереди, тот первый печатается",difficulty:"Средне"}]}}function Sm(){return{tasks:[{text:"Какая средняя сложность поиска элемента в хеш-таблице?",type:"choice",answer:"O(1)",options:["O(n)","O(log n)","O(1)","O(n^2)"],hint:"Прямой доступ по ключу это константа при отсутствии коллизий",difficulty:"Легко"},{text:"Как может находиться индекс элемента при добавлении в хеш-таблицу?",type:"choice",answer:"применяется хеш-функция к ключу и берется остаток от деления на размер таблицы",options:["просто берется первый свободный индекс","применяется хеш-функция к ключу и берется остаток от деления на размер таблицы","индекс совпадает с самим ключом","индекс выбирается случайно"],hint:"index = hash(key) % table_size",difficulty:"Средне"},{text:"Что происходит когда две разные ключи дают один и тот же хеш?",type:"choice",answer:"коллизия хеширования",options:["программа выдает ошибку","второе значение перезаписывает первое","коллизия хеширования","хеш-таблица игнорирует второе значение"],hint:"Hash collision - это нормальная ситуация которую нужно разрешать",difficulty:"Средне"},{text:"Что такое Chaining (цепочка) для разрешения коллизий?",type:"choice",answer:"каждая ячейка таблицы хранит список всех элементов с одинаковым хешем",options:["поиск следующей свободной ячейки для размещения элемента","каждая ячейка таблицы хранит список всех элементов с одинаковым хешем","удаление предыдущего значения и добавление нового","двойное хеширование для поиска другого индекса"],hint:"Separate chaining - метод цепочек",difficulty:"Средне"},{text:"Что такое Double Hashing (двойное хеширование)?",type:"choice",answer:"при коллизии используется вторая хеш-функция для поиска другой позиции",options:["хеширование ключа два раза подряд","при коллизии используется вторая хеш-функция для поиска другой позиции","использование двух разных хеш-таблиц","хеширование и ключа и значения"],hint:"Open addressing метод - проверяем hash1, hash1+hash2, hash1+2*hash2...",difficulty:"Средне"},{text:"В Python dict - это хеш-таблица?",type:"choice",answer:"да, dict в Python реализован как хеш-таблица",options:["нет, это связный список","зависит от версии Python","да, dict в Python реализован как хеш-таблица","нет, это дерево"],hint:"dict в Python использует хеширование для быстрого доступа",difficulty:"Легко"},{text:"Какая сложность удаления элемента из хеш-таблицы в среднем случае?",type:"choice",answer:"O(1)",options:["O(log n)","O(n)","O(1)","O(n log n)"],hint:"Удаление так же быстро как поиск - нужен хеш ключа",difficulty:"Средне"},{text:"Что произойдет если в хеш-таблице слишком много коллизий?",type:"choice",answer:"сложность операций станет близка к O(n)",options:["все операции сразу станут O(1)","таблица автоматически удалится","сложность операций станет близка к O(n)","коллизии исчезнут сами собой"],hint:"В худшем случае все элементы в одной цепочке - O(n)",difficulty:"Средне"},{text:"Когда нужно увеличить размер хеш-таблицы (rehashing)?",type:"choice",answer:"когда коэффициент загрузки (количество элементов / размер таблицы) превысит порог (обычно 0.75)",options:["когда таблица совсем пустая","когда коэффициент загрузки (количество элементов / размер таблицы) превысит порог (обычно 0.75)","только когда она полностью заполнена","никогда"],hint:"Load factor = size / capacity. При >0.75 обычно увеличиваем размер",difficulty:"Средне"},{text:"В Python как получить значение по ключу из словаря dict и вернуть None если ключа нет?",type:"choice",answer:'dict.get("key")',options:['dict["key"] или None','dict.find("key")','dict.get("key")','dict.search("key")'],hint:"get() метод не выдает KeyError если ключа нет, возвращает None",difficulty:"Средне"}]}}function _m(){return{tasks:[{text:"Из скольких детей состоит бинарное дерево?",type:"input",answer:"2",hint:"Левый и правый потомок",difficulty:"Легко"},{text:"Как называется элемент в вершине дерева?",type:"choice",answer:"корень",options:["корень","лист","узел","ребро"],hint:"Root - верхний элемент дерева",difficulty:"Легко"},{text:"Какой результат поиска в сбалансированном BST?",type:"choice",answer:"O(log n)",options:["O(log n)","O(n)","O(1)","O(n^2)"],hint:"На каждом шаге исключаем половину элементов",difficulty:"Средне"},{text:"Какой вид обхода дерева существует?",type:"choice",answer:"in-order",options:["in-order","prev-order","all-order","level-order"],hint:"In-order (левый, родитель, правый), pre-order, post-order",difficulty:"Средне"},{text:"Что такое высота дерева?",type:"choice",answer:"путь",options:["путь","сумма","ширина","размер"],hint:"Максимальное расстояние от корня до листа",difficulty:"Средне"},{text:"В чём отличие между BST и обычным бинарным деревом?",type:"choice",answer:"порядок",options:["порядок","размер","высота","глубина"],hint:"BST имеет свойство упорядоченности: левый < родитель < правый",difficulty:"Сложно"}]}}function Em(){return{tasks:[{text:"Что такое Git?",type:"choice",answer:"система контроля версий для отслеживания изменений в коде",options:["язык программирования","система контроля версий для отслеживания изменений в коде","текстовый редактор","база данных"],hint:"Git помогает сохранять историю и работать в команде",difficulty:"Легко"},{text:"Какая команда инициализирует новый репозиторий?",type:"choice",answer:"git init",options:["git start","git init","git create","git new"],hint:"Первая команда когда начинаешь новый проект",difficulty:"Легко"},{text:"Как добавить все изменённые файлы в staging area?",type:"choice",answer:"git add .",options:["git add all","git add .","git stage","git commit all"],hint:"Точка означает все файлы в текущей директории",difficulty:"Легко"},{text:"Какая команда создаёт новый коммит?",type:"choice",answer:'git commit -m "сообщение"',options:["git save",'git commit -m "сообщение"',"git log","git push"],hint:"-m флаг нужен для написания описания",difficulty:"Легко"},{text:"Как создать новую ветку и переключиться на неё одной командой?",type:"choice",answer:"git checkout -b имя-ветки",options:["git branch имя-ветки","git checkout -b имя-ветки","git new-branch","git create-branch"],hint:"-b флаг создаёт ветку и переключается",difficulty:"Средне"},{text:"Какая команда отправляет коммиты на удалённый сервер?",type:"choice",answer:"git push",options:["git send","git push","git upload","git sync"],hint:"Это загруза твоих изменений на GitHub/GitLab",difficulty:"Средне"},{text:"Что такое Pull Request (PR)?",type:"choice",answer:"предложение своих изменений для рассмотрения перед включением в главный код",options:["команда git","способ скачать код","предложение своих изменений для рассмотрения перед включением в главный код","тип файла"],hint:"Это как бы просишь: посмотри мой код, он хороший?",difficulty:"Средне"},{text:"Какая команда показывает историю коммитов?",type:"choice",answer:"git log",options:["git history","git log","git commits","git timeline"],hint:"log отображает все сохранённые коммиты",difficulty:"Средне"},{text:"Какая платформа для хостинга репозиториев самая популярная?",type:"choice",answer:"GitHub",options:["GitLab","GitHub","Bitbucket","Gitea"],hint:"Самая популярная, принадлежит Microsoft",difficulty:"Легко"},{text:"Как скачать обновления с удалённого репозитория?",type:"choice",answer:"git pull",options:["git download","git pull","git fetch all","git sync"],hint:"pull = fetch + merge (скачивает и объединяет)",difficulty:"Средне"}]}}function Tm(){return{tasks:[{text:"Что такое LLM?",type:"choice",answer:"модель",options:["модель","язык","данные","algoritm"],hint:"Large Language Model - это нейросетевая...",difficulty:"Легко"},{text:"Какой самый популярный AI для кодинга?",type:"choice",answer:"copilot",options:["copilot","ChatGPT","Claude","Gemini"],hint:"GitHub Copilot, Claude Code",difficulty:"Легко"},{text:"Что такое промпт инженеринг?",type:"choice",answer:"вопрос",options:["вопрос","код","данные","модель"],hint:"Умение писать хорошие вопросы (prompts) для AI",difficulty:"Средне"},{text:"Можно ли генерировать код с помощью AI?",type:"choice",answer:"да",options:["да","нет","иногда","только простой код"],hint:"AI может писать код, тесты, документацию",difficulty:"Легко"},{text:"Нужно ли проверять код сгенерированный AI?",type:"choice",answer:"да",options:["да","нет","только если длинный","зависит от AI"],hint:"AI может делать ошибки, всегда проверяй код",difficulty:"Средне"},{text:"Что главное при работе с AI в разработке?",type:"choice",answer:"понимание",options:["понимание","скорость","качество","количество"],hint:"Понимай что генерирует AI и почему",difficulty:"Средне"}]}}function Cm(){return{tasks:[{text:"Что такое MVP в проекте?",type:"choice",answer:"минимум",options:["минимум","максимум","средство","версия"],hint:"Minimum Viable Product - самая минимальная версия",difficulty:"Легко"},{text:"Какой первый шаг при разработке проекта?",type:"choice",answer:"план",options:["план","код","тесты","развёртывание"],hint:"Спланируй что ты хочешь сделать",difficulty:"Легко"},{text:"Сколько тестов должно быть в проекте?",type:"choice",answer:"много",options:["много","несколько","один","не нужны"],hint:"Чем больше тестов тем лучше, минимум 50% покрытие",difficulty:"Средне"},{text:"Какие типы тестов существуют?",type:"choice",answer:"unit",options:["unit","integration","e2e","все варианты"],hint:"Unit, integration, e2e тесты",difficulty:"Средне"},{text:"Нужен ли README в проекте?",type:"choice",answer:"да",options:["да","нет","опционально","только для open source"],hint:"README должен описывать проект и как его использовать",difficulty:"Легко"},{text:"Что должно быть в README?",type:"choice",answer:"описание",options:["описание","код","тесты","лицензия"],hint:"Описание, как установить, как запустить, примеры",difficulty:"Средне"}]}}function Om(){return{tasks:[{text:"Сколько минут длится один «помидор» в технике Pomodoro?",type:"input",answer:"25",hint:"Стандартный рабочий интервал",difficulty:"Легко"},{text:"Кто разработал систему GTD (Getting Things Done)?",type:"choice",answer:"дэвид аллен",options:["дэвид аллен","франческо чирилло","брайан трейси","дуайт эйзенхауэр"],hint:"Автор книги Getting Things Done",difficulty:"Средне"},{text:"Сколько шагов в методе GTD?",type:"input",answer:"5",hint:"Сбор, Обработка, Организация, Обзор, Выполнение",difficulty:"Легко"},{text:"По правилу GTD: если задача занимает меньше скольки минут — сделай её сразу?",type:"input",answer:"2",hint:"Правило двух минут",difficulty:"Средне"},{text:"Какой квадрант матрицы Эйзенхауэра самый ценный (важно + не срочно)?",type:"input",answer:"2",hint:"Развитие, обучение, здоровье — именно здесь создаются результаты",difficulty:"Средне"},{text:"По матрице Эйзенхауэра задачи «не важно + срочно» нужно...",type:"choice",answer:"делегировать",options:["делегировать","делать сейчас","планировать","исключить"],hint:"Чужие просьбы создают иллюзию занятости",difficulty:"Средне"},{text:"Как называется метод, где самую неприятную задачу делают первой?",type:"choice",answer:"съешь лягушку",options:["съешь лягушку","съешь слона","pomodoro","time blocking"],hint:"Автор — Брайан Трейси",difficulty:"Легко"},{text:"Сколько максимум задач рекомендуют держать в колонке «В процессе» (WIP-лимит) в личном Канбане?",type:"input",answer:"3",hint:"Борьба с многозадачностью",difficulty:"Средне"},{text:'В методе MoSCoW буква "M" означает задачи, которые...',type:"choice",answer:"обязательно сделать",options:["обязательно сделать","можно сделать потом","хорошо бы сделать","не делаем"],hint:"Must Have — без этого проект не работает",difficulty:"Средне"},{text:"Согласно принципу Парето, какой процент усилий даёт 80% результата?",type:"input",answer:"20",hint:"Правило 80/20",difficulty:"Легко"}]}}function Lm(){return{tasks:[{text:"Какой язык стал де-факто стандартом в продакшене как типизированная надстройка над JavaScript?",type:"choice",answer:"typescript",options:["typescript","coffeescript","dart","python"],hint:"Добавляет типы к JS",difficulty:"Легко"},{text:"Какой фреймворк построен поверх React и добавляет серверный рендеринг (SSR) от компании Vercel?",type:"choice",answer:"next.js",options:["next.js","vue.js","svelte","astro"],hint:"SSR, SSG, маршрутизация из коробки",difficulty:"Средне"},{text:"Какой быстрый сборщик проектов заменяет Webpack в большинстве новых проектов?",type:"choice",answer:"vite",options:["vite","gulp","parcel","rollup"],hint:"Совпадает с итальянским словом «быстро»",difficulty:"Средне"},{text:"Какой Python-фреймворк с автоматической документацией (OpenAPI) стал популярным для REST API?",type:"choice",answer:"fastapi",options:["fastapi","django","flask","tornado"],hint:"Современный, высокопроизводительный",difficulty:"Средне"},{text:"Какой язык от Google создан для высоконагруженных систем и микросервисов?",type:"choice",answer:"go",options:["go","rust","kotlin","ruby"],hint:"Также называется Golang",difficulty:"Легко"},{text:"Какая реляционная БД является стандартом для большинства проектов?",type:"choice",answer:"postgresql",options:["postgresql","mongodb","redis","clickhouse"],hint:"Реляционная, не NoSQL",difficulty:"Средне"},{text:"Какая библиотека Python — основная для работы с табличными данными в аналитике?",type:"choice",answer:"pandas",options:["pandas","numpy","matplotlib","requests"],hint:'Названа в честь "panel data"',difficulty:"Средне"},{text:"Какой Deep Learning фреймворк доминирует для исследований и продакшена в 2026?",type:"choice",answer:"pytorch",options:["pytorch","tensorflow","keras","jax"],hint:"Разработан Meta, гибкий и питоновский",difficulty:"Средне"},{text:"Какой инструмент контейнеризации решает проблему «у меня работает, а на сервере нет»?",type:"choice",answer:"docker",options:["docker","kubernetes","vagrant","ansible"],hint:"Упаковывает приложение со всеми зависимостями",difficulty:"Легко"},{text:"Какая система контроля версий является абсолютным стандартом для командной работы?",type:"choice",answer:"git",options:["git","svn","mercurial","perforce"],hint:"GitHub, GitLab построены вокруг него",difficulty:"Легко"}]}}function bm(){return{tasks:[{text:"Какая SQL-команда выбирает данные из таблицы?",type:"choice",answer:"select",options:["select","get","fetch","find"],hint:"SELECT * FROM users",difficulty:"Легко"},{text:"Какое ключевое слово фильтрует строки по условию?",type:"choice",answer:"where",options:["where","filter","having","if"],hint:"SELECT * FROM users WHERE age > 18",difficulty:"Легко"},{text:"Что выберет запрос: SELECT * FROM users — сколько колонок вернётся, если в таблице 4 колонки?",type:"input",answer:"4",hint:"Звёздочка * означает «все колонки»",difficulty:"Легко"},{text:"Какое ключевое слово сортирует результат?",type:"choice",answer:"order by",options:["order by","sort","group by","arrange"],hint:"ORDER BY age DESC",difficulty:"Средне"},{text:"Что означает DESC в ORDER BY?",type:"choice",answer:"по убыванию",options:["по убыванию","по возрастанию","описание","удалить"],hint:"descending — от большего к меньшему",difficulty:"Средне"},{text:"Какой оператор проверяет вхождение в список: WHERE city ___ ('Москва', 'Сочи')?",type:"choice",answer:"in",options:["in","has","contains","between"],hint:"WHERE city IN (...)",difficulty:"Средне"},{text:"Какой оператор ищет по шаблону, например имена на букву А: WHERE name ___ 'А%'?",type:"choice",answer:"like",options:["like","match","similar","equals"],hint:"LIKE с символом % (любые символы)",difficulty:"Средне"},{text:"Какое ключевое слово оставляет только уникальные значения?",type:"choice",answer:"distinct",options:["distinct","unique","group","only"],hint:"SELECT DISTINCT city FROM users",difficulty:"Средне"},{text:"Какое ключевое слово ограничивает количество строк в результате?",type:"choice",answer:"limit",options:["limit","top","max","count"],hint:"ORDER BY age DESC LIMIT 3 — топ-3",difficulty:"Средне"},{text:"Что означает аббревиатура SQL?",type:"choice",answer:"structured query language",options:["structured query language","simple question logic","system quality level","standard query link"],hint:"Язык структурированных запросов",difficulty:"Легко"}]}}function Dm(){return{tasks:[{text:"Какая агрегатная функция считает количество строк?",type:"choice",answer:"count",options:["count","sum","total","number"],hint:"SELECT COUNT(*) FROM users",difficulty:"Легко"},{text:"Какая функция вычисляет среднее значение?",type:"choice",answer:"avg",options:["avg","mean","middle","sum"],hint:"AVG(age) — average",difficulty:"Легко"},{text:"Если возрасты пользователей 25, 31, 19, 42, 28 — что вернёт MAX(age)?",type:"input",answer:"42",hint:"MAX возвращает наибольшее значение",difficulty:"Легко"},{text:"Какое ключевое слово группирует строки по одинаковому значению?",type:"choice",answer:"group by",options:["group by","order by","having","union"],hint:"GROUP BY city — группировка по городу",difficulty:"Средне"},{text:"Чем HAVING отличается от WHERE?",type:"choice",answer:"фильтрует группы",options:["фильтрует группы","фильтрует строки","сортирует","соединяет таблицы"],hint:"WHERE — до группировки (строки), HAVING — после (группы)",difficulty:"Сложно"},{text:"Какая команда добавляет новую строку в таблицу?",type:"choice",answer:"insert",options:["insert","add","create","append"],hint:"INSERT INTO users VALUES (...)",difficulty:"Легко"},{text:"Какая команда изменяет существующие данные?",type:"choice",answer:"update",options:["update","change","modify","set"],hint:"UPDATE users SET city = ... WHERE id = ...",difficulty:"Средне"},{text:"Какая команда удаляет строки из таблицы?",type:"choice",answer:"delete",options:["delete","remove","drop","clear"],hint:"DELETE FROM users WHERE id = 6",difficulty:"Средне"},{text:"Что обязательно нужно писать в UPDATE и DELETE, чтобы не затронуть все строки?",type:"choice",answer:"where",options:["where","limit","having","select"],hint:"Без WHERE команда изменит/удалит ВСЕ строки!",difficulty:"Средне"},{text:"Какая функция вернёт сумму всех значений в колонке?",type:"choice",answer:"sum",options:["sum","count","total","add"],hint:"SUM(price) — сумма цен",difficulty:"Легко"}]}}function Am(){return{tasks:[{text:"Как называется уникальный идентификатор строки в таблице?",type:"choice",answer:"первичный ключ",options:["первичный ключ","внешний ключ","индекс","хеш"],hint:"PRIMARY KEY — уникален для каждой строки",difficulty:"Легко"},{text:"Как называется поле, которое ссылается на первичный ключ другой таблицы?",type:"choice",answer:"внешний ключ",options:["внешний ключ","первичный ключ","связь","указатель"],hint:"FOREIGN KEY связывает таблицы",difficulty:"Средне"},{text:"Какая команда соединяет две таблицы?",type:"choice",answer:"join",options:["join","merge","connect","union"],hint:"SELECT ... FROM a JOIN b ON ...",difficulty:"Легко"},{text:"Какой JOIN возвращает только строки с совпадением в обеих таблицах?",type:"choice",answer:"inner join",options:["inner join","left join","right join","full join"],hint:"INNER — только пересечение",difficulty:"Средне"},{text:"Какой JOIN вернёт ВСЕ строки из левой таблицы, даже без совпадений справа?",type:"choice",answer:"left join",options:["left join","inner join","right join","cross join"],hint:"LEFT JOIN — все слева + NULL где нет пары",difficulty:"Средне"},{text:"Что окажется в колонке справа при LEFT JOIN, если совпадения нет?",type:"choice",answer:"null",options:["null","0","пустая строка","ошибка"],hint:"Пустое значение — NULL",difficulty:"Средне"},{text:"Как называется разбиение данных на таблицы для устранения дублирования?",type:"choice",answer:"нормализация",options:["нормализация","индексация","агрегация","репликация"],hint:"Чтобы менять данные в одном месте",difficulty:"Сложно"},{text:"Какая из этих баз данных — NoSQL?",type:"choice",answer:"mongodb",options:["mongodb","postgresql","mysql","sqlite"],hint:"Документо-ориентированная БД",difficulty:"Средне"},{text:"Запрос JOIN + GROUP BY + SUM(price) посчитает...",type:"choice",answer:"сумму по каждому пользователю",options:["сумму по каждому пользователю","все заказы","одного пользователя","количество таблиц"],hint:"Соединяем таблицы и группируем по пользователю",difficulty:"Сложно"},{text:"Когда лучше выбрать SQL, а не NoSQL?",type:"choice",answer:"когда важны связи и структура",options:["когда важны связи и структура","когда нужна максимальная гибкость","для кэша","для логов"],hint:"Банк, магазин — структурированные данные со связями",difficulty:"Средне"}]}}function Pm(){return{tasks:[{text:"Что означает API?",type:"choice",answer:"интерфейс",options:["интерфейс","программа","протокол","сервер"],hint:"Application Programming Interface",difficulty:"Легко"},{text:"Что такое REST API?",type:"choice",answer:"http",options:["http","tcp","udp","websocket"],hint:"API основанный на HTTP методах",difficulty:"Легко"},{text:"Сколько основных HTTP методов?",type:"input",answer:"4",hint:"GET, POST, PUT, DELETE",difficulty:"Легко"},{text:"Какой HTTP метод используется для получения данных?",type:"choice",answer:"get",options:["get","post","put","delete"],hint:"GET запрос для получения информации",difficulty:"Легко"},{text:"Какой HTTP метод для создания данных?",type:"choice",answer:"post",options:["post","get","put","delete"],hint:"POST для отправки новых данных",difficulty:"Средне"},{text:"Что такое JSON?",type:"choice",answer:"формат",options:["формат","язык","протокол","сервер"],hint:"JavaScript Object Notation - формат данных",difficulty:"Легко"},{text:"Какой статус код для успешного запроса?",type:"input",answer:"200",hint:"200 OK означает успех, 404 Not Found, 500 Server Error",difficulty:"Средне"}]}}function Rm(){return{tasks:[{text:"Какая сложность bubble sort?",type:"choice",answer:"O(n^2)",options:["O(n^2)","O(n log n)","O(n)","O(1)"],hint:"Самый медленный алгоритм сортировки",difficulty:"Средне"},{text:"Какая сложность merge sort?",type:"choice",answer:"O(n log n)",options:["O(n log n)","O(n^2)","O(n)","O(log n)"],hint:"Быстрый и стабильный алгоритм",difficulty:"Средне"},{text:"Какая сложность quick sort в среднем?",type:"choice",answer:"O(n log n)",options:["O(n log n)","O(n^2)","O(n)","O(log n)"],hint:"Быстрая сортировка (в среднем случае)",difficulty:"Средне"},{text:"Какой алгоритм сортировки используется в Python?",type:"choice",answer:"timsort",options:["timsort","quicksort","mergesort","heapsort"],hint:"Timsort - комбинация merge и insertion sort",difficulty:"Сложно"},{text:"Какая сложность бинарного поиска?",type:"choice",answer:"O(log n)",options:["O(log n)","O(n)","O(n^2)","O(1)"],hint:"На каждом шаге половины массива исключаются",difficulty:"Средне"},{text:"Сколько операций для 1000 элементов при O(n log n)?",type:"input",answer:"10000",hint:"Примерно 1000 * log2(1000) ≈ 10000",difficulty:"Сложно"}]}}function Im(){return{tasks:[{text:"Что такое sliding window?",type:"choice",answer:"окно",options:["окно","указатель","стек","очередь"],hint:"Техника для работы с подмассивами и подстроками",difficulty:"Средне"},{text:"Что такое two pointers?",type:"choice",answer:"указатель",options:["указатель","окно","стек","дерево"],hint:"Два указателя которые движутся в разных направлениях",difficulty:"Средне"},{text:"Что такое fast and slow pointers?",type:"choice",answer:"черепаха",options:["черепаха","заяц","прыжок","шаг"],hint:"Один быстрый, один медленный - поиск цикла",difficulty:"Средне"},{text:"Что такое рекурсия?",type:"choice",answer:"функция",options:["функция","цикл","алгоритм","метод"],hint:"Функция которая вызывает саму себя",difficulty:"Легко"},{text:"Что такое мемоизация?",type:"choice",answer:"кэш",options:["кэш","память","таблица","список"],hint:"Сохранение результатов чтобы не пересчитывать",difficulty:"Средне"},{text:"Для чего нужна мемоизация?",type:"choice",answer:"скорость",options:["скорость","память","простота","чистота"],hint:"Для оптимизации рекурсивных алгоритмов",difficulty:"Средне"}]}}function Bm(){return{tasks:[{text:"Что такое SQL инъекция?",type:"choice",answer:"атака",options:["атака","запрос","команда","ошибка"],hint:"Атака через введение вредоносного SQL кода",difficulty:"Средне"},{text:"Что такое XSS?",type:"choice",answer:"скрипт",options:["скрипт","запрос","команда","атака"],hint:"Cross-Site Scripting - вставка вредоносного скрипта",difficulty:"Средне"},{text:"Как защитить от SQL инъекций?",type:"choice",answer:"параметры",options:["параметры","фильтры","проверки","логирование"],hint:"Параметризованные запросы или prepared statements",difficulty:"Средне"},{text:"Как защитить от XSS?",type:"choice",answer:"экранировать",options:["экранировать","удалить","заменить","скрыть"],hint:"Экранировать (escape) HTML символы",difficulty:"Средне"},{text:"Какой алгоритм использовать для хеша паролей?",type:"choice",answer:"bcrypt",options:["bcrypt","md5","sha1","sha256"],hint:"bcrypt, argon2 - специальные алгоритмы для паролей",difficulty:"Средне"},{text:"Всегда ли нужен HTTPS?",type:"choice",answer:"да",options:["да","нет","иногда","только для данных"],hint:"Шифрование обязательно в production",difficulty:"Легко"},{text:"Что такое OWASP Top 10?",type:"choice",answer:"уязвимости",options:["уязвимости","угрозы","риски","методы"],hint:"Список 10 самых опасных уязвимостей",difficulty:"Средне"}]}}function zm(){return{tasks:[{text:"Что такое синдром самозванца?",type:"choice",answer:"чувство",options:["чувство","болезнь","ошибка","метод"],hint:"Ощущение что ты не достоин своей позиции",difficulty:"Легко"},{text:"Как давать конструктивный фидбек?",type:"choice",answer:"sbi",options:["sbi","abc","xyz","oop"],hint:"Модель SBI: Situation, Behavior, Impact",difficulty:"Средне"},{text:"Что делать если не понимаешь задачу?",type:"choice",answer:"спросить",options:["спросить","молчать","гадать","начать кодить"],hint:"Спросить (лучше спросить чем молчать)",difficulty:"Легко"},{text:"Как правильно просить о помощи?",type:"choice",answer:"объясни",options:["объясни","просто спроси","жди сам","возьми чужой код"],hint:"Объясни что уже пробовал, показывай прогресс",difficulty:"Средне"},{text:"Почему важны soft skills?",type:"choice",answer:"общение",options:["общение","деньги","известность","успех"],hint:"Для работы в команде и карьерного роста",difficulty:"Легко"},{text:"Что важнее - hard или soft skills?",type:"choice",answer:"оба",options:["оба","hard skills","soft skills","depend"],hint:"Оба одинаково важны для успеха",difficulty:"Средне"}]}}function Fm(){return{tasks:[{text:"Какой процент информации помнишь если читаешь?",type:"input",answer:"10",hint:"Только 10% информации запомнится из прочитанного",difficulty:"Легко"},{text:"Какой процент помнишь если слышишь?",type:"input",answer:"50",hint:"Примерно 50% из услышанного",difficulty:"Легко"},{text:"Какой процент помнишь если делаешь?",type:"input",answer:"90",hint:"90% информации запомнится если ты это сделал",difficulty:"Легко"},{text:"Что такое метод Фейнмана?",type:"choice",answer:"объяснение",options:["объяснение","запись","чтение","слушание"],hint:"Объясни тему простыми словами как ребенку",difficulty:"Средне"},{text:"Какой минимум времени для эффективного обучения?",type:"choice",answer:"1-2",options:["1-2","3-4","5-6","7-8"],hint:"1-2 часа в день лучше чем 8 часов в выходной",difficulty:"Средне"},{text:"Что лучше для обучения - видео или практика?",type:"choice",answer:"практика",options:["практика","видео","чтение","лекции"],hint:"Практика и проекты более эффективны",difficulty:"Средне"},{text:"Как лучше учиться - читать код или писать?",type:"choice",answer:"писать",options:["писать","читать","смотреть","слушать"],hint:"Писать код лучше чем просто читать",difficulty:"Легко"}]}}function Mm(){return{tasks:[{text:"Сколько страниц должно быть в резюме джуна?",type:"input",answer:"1",hint:"Максимум одна страница для начинающего",difficulty:"Легко"},{text:"Что главное в резюме джуна?",type:"choice",answer:"проекты",options:["проекты","образование","сертификаты","опыт"],hint:"Ссылки на GitHub и портфолио проектов",difficulty:"Легко"},{text:"Нужен ли опыт для первой работы?",type:"choice",answer:"нет",options:["нет","да","желательно","обязательно"],hint:"Можно без опыта если есть хорошие проекты",difficulty:"Легко"},{text:"Что важнее - много навыков или глубокие знания?",type:"choice",answer:"глубокие",options:["глубокие","много","широкие","популярные"],hint:"Лучше 3 языка на хорошем уровне чем 10 поверхностно",difficulty:"Средне"},{text:"Нужно ли сопроводительное письмо?",type:"choice",answer:"желательно",options:["желательно","да","нет","опционально"],hint:"Помогает выделиться среди других кандидатов",difficulty:"Легко"},{text:"Как написать хорошее резюме?",type:"choice",answer:"честно",options:["честно","красиво","сложно","оригинально"],hint:"Честно опиши навыки и достижения без приукрас",difficulty:"Средне"},{text:"Что написать если нет работы в резюме?",type:"choice",answer:"проекты",options:["проекты","ничего","выдумать","школа"],hint:"Напиши о личных проектах, волонтёрстве, лагере",difficulty:"Средне"}]}}const Hm={2:xm,3:gm,4:jm,5:Nm,6:vm,7:wm,8:km,9:Sm,10:_m,11:Em,12:Tm,13:Cm,15:Om,16:Lm,17:bm,18:Dm,19:Am,20:Pm,23:Rm,24:Im,25:Bm,26:zm,27:Fm,29:Mm};function Um({question:e,taskIndex:n,totalTasks:s,onAnswer:r,isSolved:i,savedAnswer:l}){const[o,a]=E.useState(""),[c,u]=E.useState(!1),[m,y]=E.useState(null),[p,x]=E.useState(!1),w=e.type==="choice";E.useEffect(()=>{l&&l.answer?(a(l.answer),l.status&&y({correct:l.status==="correct",message:l.status==="correct"?"Правильно!":"Неправильно"})):(a(""),y(null))},[l,n]);const j=()=>{if(!o.trim()){y({correct:!1,message:"Выберите ответ"});return}x(!0),setTimeout(()=>{const f=o.trim().toLowerCase()===e.answer.toLowerCase();y({correct:f,message:f?"Правильно!":"Неправильно"}),x(!1),r(n,f,o.trim())},300)},L=()=>{a(""),y(null),u(!1)},h=l&&l.status,d={color:m!=null&&m.correct?"#00ff00":"#ff3333",fontSize:"13px",fontWeight:600,marginTop:"8px",minHeight:"20px"};return t.jsxs("div",{className:"question-card",children:[t.jsxs("div",{className:"question-header",children:[t.jsxs("span",{className:"question-number",children:["Задача ",n+1," из ",s]}),t.jsx("span",{className:"question-difficulty",children:e.difficulty})]}),t.jsx("p",{className:"question-text",children:e.text}),w?t.jsx("div",{className:"question-options",children:e.options.map((f,g)=>t.jsxs("label",{className:`question-option ${h&&(m!=null&&m.correct)&&f===o?"answered":""}`,children:[t.jsx("input",{type:"radio",name:`question-${n}`,value:f,checked:o===f,onChange:k=>a(k.target.value),disabled:p}),t.jsx("span",{className:"option-text",children:f})]},g))}):t.jsx("div",{className:"question-input-group",children:t.jsx("input",{type:"text",value:o,onChange:f=>a(f.target.value),placeholder:"Введите ваш ответ...",disabled:p,className:`question-input ${h&&(m!=null&&m.correct)?"answered":""}`,onKeyPress:f=>f.key==="Enter"&&j()})}),t.jsxs("div",{className:"question-actions",children:[t.jsxs("div",{className:"question-actions-left",children:[t.jsx("button",{onClick:()=>u(!c),className:"btn-hint",disabled:p,children:c?"Скрыть подсказку":"Подсказка"}),t.jsx("button",{onClick:L,className:"btn-clear",disabled:p,children:h?"Переделать":"Очистить"})]}),t.jsx("button",{onClick:j,className:`btn-check ${p?"checking":""}`,disabled:p||h&&(m==null?void 0:m.correct),children:p?"⟳":h&&(m!=null&&m.correct)?"✓ Решено":"Проверить"})]}),c&&t.jsxs("div",{className:"question-hint",children:[t.jsx("strong",{children:"Подсказка:"})," ",e.hint]}),m&&t.jsx("div",{style:d,children:m.message})]})}function Gm({totalTasks:e,taskStatuses:n,currentIndex:s,onSelectTask:r}){return t.jsx("div",{className:"task-indicators",children:Array.from({length:e}).map((i,l)=>{const o=n[l],c=`task-indicator ${o==="correct"?"correct":""} ${o==="incorrect"?"incorrect":""} ${l===s?"active":""}`;return t.jsx("button",{className:c,title:`Задача ${l+1}`,onClick:()=>r(l),children:l+1},l)})})}function kd({selectedDay:e,onBack:n}){const[s,r]=E.useState([]),[i,l]=E.useState({}),[o,a]=E.useState({}),[c,u]=E.useState(0),[m,y]=E.useState(!0),[p,x]=E.useState(!1);E.useEffect(()=>{const g=setTimeout(()=>{const k=Hm[e];if(k){const _=k();r(_.tasks||[]);const S=localStorage.getItem("taskStatuses"),O=S?JSON.parse(S):{},F=`day${e}`;l(O[F]||{});const b=localStorage.getItem("taskAnswers"),X=b?JSON.parse(b):{};a(X[F]||{})}u(0),y(!1)},300);return()=>clearTimeout(g)},[e]);const w=(g,k,_)=>{const S={...i,[g]:k?"correct":"incorrect"};l(S);const O=localStorage.getItem("taskStatuses"),F=O?JSON.parse(O):{};F[`day${e}`]=S,localStorage.setItem("taskStatuses",JSON.stringify(F));const b=localStorage.getItem("taskAnswers"),X=b?JSON.parse(b):{};X[`day${e}`]||(X[`day${e}`]={}),X[`day${e}`][g]={answer:_,status:k?"correct":"incorrect"},localStorage.setItem("taskAnswers",JSON.stringify(X))},j=g=>{const k=Math.max(0,Math.min(g,s.length-1));if(k===c)return;const _=localStorage.getItem("taskAnswers"),S=_?JSON.parse(_):{},O=`day${e}`,F=S[O]||{};a(F),x(!0),setTimeout(()=>{u(k),x(!1)},200)},L=()=>{j(c-1)},h=()=>{j(c+1)};function d(g){const k=Mt.find(_=>_.day===g);return k?k.title:`День ${g}`}if(m)return t.jsx("section",{className:"page active",children:t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-secondary)"},children:"Загрузка..."})})});if(!s.length)return t.jsxs("section",{className:"page active",children:[t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Задач для этого дня нет или они еще готовятся..."})}),t.jsx("button",{className:"btn-back",onClick:n,children:"← Вернуться в Библиотеку"})]});const f=s[c];return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"theory-breadcrumbs",children:[t.jsx("button",{className:"breadcrumb-link",onClick:n,children:"📚 Библиотека знаний"}),t.jsx("span",{className:"breadcrumb-sep",children:"/"}),t.jsxs("span",{className:"breadcrumb-current",children:["День ",e," · ",d(e)]})]}),t.jsxs("div",{className:"questions-container",children:[t.jsxs("div",{className:"questions-header",children:[t.jsx("h2",{className:"questions-title",children:"Задачи для тренировки"}),t.jsx(Gm,{totalTasks:s.length,taskStatuses:i,currentIndex:c,onSelectTask:j})]}),t.jsxs("div",{className:"single-question-view",children:[t.jsx("div",{className:`question-card-wrapper ${p?"switching":""}`,children:t.jsx(Um,{question:f,taskIndex:c,totalTasks:s.length,onAnswer:w,isSolved:i[c],savedAnswer:o[c]},`${e}-${c}`)}),t.jsxs("div",{className:"question-navigation",children:[t.jsx("button",{className:"nav-btn nav-prev",onClick:L,disabled:c===0,children:"← Предыдущая"}),t.jsxs("span",{className:"nav-counter",children:[c+1," из ",s.length]}),t.jsx("button",{className:"nav-btn nav-next",onClick:h,disabled:c===s.length-1,children:"Следующая →"})]})]})]}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:n,children:"Вернуться в Библиотеку знаний"})})]})}const ta={1:{title:"Дневник лагеря и инструменты",tasks:[{num:1,title:"Завести дневник лагеря",description:`Вы можете выбрать любой удобный для вас формат:
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

Подумай: какой тип связи между постами и лайками?`}]}};function Sd({selectedDay:e,onBack:n}){const[s,r]=E.useState(Mt);E.useEffect(()=>{Ke.schedule().then(r).catch(()=>{})},[]);const i=e||1,l=ta[i]||{title:"Домашние задания",tasks:[]};function o(a){var m;const c=s.find(y=>y.day===a);return c&&c.title?c.title:((m=ta[a])==null?void 0:m.title)||`День ${a}`}return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"theory-breadcrumbs",children:[t.jsx("button",{className:"breadcrumb-link",onClick:n,children:"📚 Библиотека знаний"}),t.jsx("span",{className:"breadcrumb-sep",children:"/"}),t.jsxs("span",{className:"breadcrumb-current",children:["День ",i," · ",o(i)]})]}),t.jsx("div",{style:{maxWidth:"900px",margin:"0 auto"},children:t.jsxs("div",{style:{marginTop:"24px"},children:[t.jsx("h2",{style:{fontSize:"18px",marginBottom:"16px"},children:l.title}),l.tasks.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Домашние задания еще не добавлены"}):t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:l.tasks.map((a,c)=>t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsxs("h3",{style:{margin:"0 0 8px 0",fontSize:"16px"},children:["Задача ",a.num,": ",a.title]}),t.jsx("p",{style:{margin:0,color:"var(--text-secondary)",whiteSpace:"pre-wrap",lineHeight:"1.6"},children:a.description})]},c))})]})}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:n,children:"Вернуться в Библиотеку знаний"})})]})}function _d({onBack:e}){const[n,s]=E.useState([]),[r,i]=E.useState(!0);return E.useEffect(()=>{const l=Date.now(),o=500;Ke.announcements().then(s).catch(()=>{}).finally(()=>{const a=Date.now()-l,c=Math.max(0,o-a);setTimeout(()=>i(!1),c)})},[]),t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Новости и обновления"}),t.jsx("p",{className:"page-subtitle",children:"Все объявления"})]}),t.jsx("div",{className:"widget",children:r?[1,2,3].map(l=>t.jsx(gd,{},l)):n.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13,padding:"4px 0"},children:"Объявлений пока нет"}):n.map((l,o)=>t.jsxs("div",{className:"news-card fade-in",style:{animationDelay:`${o*.05}s`},children:[t.jsxs("div",{className:"news-card-head",children:[t.jsxs("span",{className:"news-card-title",children:[l.icon||"📢"," ",l.title]}),t.jsx("span",{className:"news-card-date",children:l.published_at})]}),t.jsx("div",{className:"news-card-text",children:l.text})]},l.id))}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:e,children:"← Вернуться на дэшборд"})})]})}const Ed={dashboard:Nf,schedule:Nd,library:If,tasks:Uf,links:$f,theory:wd,questions:kd,homework:Sd,announcements:_d},$m=Object.keys(Ed);function Wm({user:e,onLogout:n}){const[s,r]=E.useState("dashboard"),[i,l]=E.useState(!1),[o,a]=E.useState(null),[c,u]=E.useState(null);E.useEffect(()=>(document.body.className="app-page",()=>{document.body.className=""}),[]);const m=h=>{$m.includes(h)&&(r(h),l(!1))},y=h=>{u(h.day),r("theory")},p=h=>{u(h.day),r("questions")},x=h=>{u(h.day),r("homework")},w=()=>{r("library")},j=()=>{r("dashboard")},L=Ed[s]||Nd;return t.jsxs(t.Fragment,{children:[t.jsx("aside",{id:"sidebar",className:`sidebar${i?" open":""}`,children:t.jsx(of,{user:e,currentPage:s,onNavigate:m,onLogout:n,onClose:()=>l(!1)})}),i&&t.jsx("div",{className:"sidebar-overlay active",onClick:()=>l(!1)}),t.jsxs("div",{className:"app-content",children:[t.jsx(df,{user:e,page:s,onMenuClick:()=>l(!0)}),t.jsx("main",{className:"pages-wrap",children:s==="theory"?t.jsx(wd,{selectedDay:c,onBack:w}):s==="questions"?t.jsx(kd,{selectedDay:c,onBack:w}):s==="homework"?t.jsx(Sd,{selectedDay:c,onBack:w}):s==="announcements"?t.jsx(_d,{onBack:j}):t.jsx(L,{user:e,onNavigate:m,onOpenDay:a,onOpenTheory:y,onOpenQuestions:p,onOpenHomework:x})})]}),o&&t.jsx(uf,{day:o,onClose:()=>a(null)})]})}function na(e){if(!e)return!1;if(e.expiresAt){const n=new Date(e.expiresAt).getTime();return new Date().getTime()<n}return!0}function Vm(){const[e,n]=E.useState(()=>{try{const i=JSON.parse(localStorage.getItem("kiro_user"));return i&&na(i)?i:(localStorage.removeItem("kiro_user"),i&&localStorage.setItem("sessionExpired","true"),null)}catch{return null}});E.useEffect(()=>{const i=()=>{try{const a=localStorage.getItem("kiro_user");if(!a){e&&n(null);return}const c=JSON.parse(a);na(c)||(localStorage.removeItem("kiro_user"),localStorage.setItem("sessionExpired","true"),n(null))}catch{localStorage.removeItem("kiro_user"),n(null)}};i();const l=()=>{document.visibilityState==="visible"&&i()};document.addEventListener("visibilitychange",l);const o=setInterval(i,6e4);return()=>{clearInterval(o),document.removeEventListener("visibilitychange",l)}},[]);const s=E.useCallback(i=>{localStorage.setItem("kiro_user",JSON.stringify(i)),n(i)},[]),r=E.useCallback(()=>{localStorage.removeItem("kiro_user"),localStorage.setItem("sessionExpired","true"),n(null)},[]);return e?t.jsx(Wm,{user:e,onLogout:r}):t.jsx(sf,{onLogin:s})}ti.createRoot(document.getElementById("root")).render(t.jsx(Gd.StrictMode,{children:t.jsx(Vm,{})}));
