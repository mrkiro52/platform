(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();function ih(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var jc={exports:{}},Ks={},Nc={exports:{}},H={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pn=Symbol.for("react.element"),lh=Symbol.for("react.portal"),ah=Symbol.for("react.fragment"),oh=Symbol.for("react.strict_mode"),ch=Symbol.for("react.profiler"),dh=Symbol.for("react.provider"),uh=Symbol.for("react.context"),hh=Symbol.for("react.forward_ref"),ph=Symbol.for("react.suspense"),mh=Symbol.for("react.memo"),fh=Symbol.for("react.lazy"),Qa=Symbol.iterator;function xh(e){return e===null||typeof e!="object"?null:(e=Qa&&e[Qa]||e["@@iterator"],typeof e=="function"?e:null)}var vc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ec=Object.assign,Sc={};function Wr(e,r,n){this.props=e,this.context=r,this.refs=Sc,this.updater=n||vc}Wr.prototype.isReactComponent={};Wr.prototype.setState=function(e,r){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,r,"setState")};Wr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Tc(){}Tc.prototype=Wr.prototype;function Gl(e,r,n){this.props=e,this.context=r,this.refs=Sc,this.updater=n||vc}var $l=Gl.prototype=new Tc;$l.constructor=Gl;Ec($l,Wr.prototype);$l.isPureReactComponent=!0;var Ya=Array.isArray,wc=Object.prototype.hasOwnProperty,Vl={current:null},kc={key:!0,ref:!0,__self:!0,__source:!0};function bc(e,r,n){var s,i={},l=null,a=null;if(r!=null)for(s in r.ref!==void 0&&(a=r.ref),r.key!==void 0&&(l=""+r.key),r)wc.call(r,s)&&!kc.hasOwnProperty(s)&&(i[s]=r[s]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var c=Array(o),d=0;d<o;d++)c[d]=arguments[d+2];i.children=c}if(e&&e.defaultProps)for(s in o=e.defaultProps,o)i[s]===void 0&&(i[s]=o[s]);return{$$typeof:Pn,type:e,key:l,ref:a,props:i,_owner:Vl.current}}function yh(e,r){return{$$typeof:Pn,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}function Ql(e){return typeof e=="object"&&e!==null&&e.$$typeof===Pn}function gh(e){var r={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return r[n]})}var Ja=/\/+/g;function gi(e,r){return typeof e=="object"&&e!==null&&e.key!=null?gh(""+e.key):r.toString(36)}function ds(e,r,n,s,i){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(l){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case Pn:case lh:a=!0}}if(a)return a=e,i=i(a),e=s===""?"."+gi(a,0):s,Ya(i)?(n="",e!=null&&(n=e.replace(Ja,"$&/")+"/"),ds(i,r,n,"",function(d){return d})):i!=null&&(Ql(i)&&(i=yh(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(Ja,"$&/")+"/")+e)),r.push(i)),1;if(a=0,s=s===""?".":s+":",Ya(e))for(var o=0;o<e.length;o++){l=e[o];var c=s+gi(l,o);a+=ds(l,r,n,c,i)}else if(c=xh(e),typeof c=="function")for(e=c.call(e),o=0;!(l=e.next()).done;)l=l.value,c=s+gi(l,o++),a+=ds(l,r,n,c,i);else if(l==="object")throw r=String(e),Error("Objects are not valid as a React child (found: "+(r==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":r)+"). If you meant to render a collection of children, use an array instead.");return a}function qn(e,r,n){if(e==null)return e;var s=[],i=0;return ds(e,s,"","",function(l){return r.call(n,l,i++)}),s}function jh(e){if(e._status===-1){var r=e._result;r=r(),r.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=r)}if(e._status===1)return e._result.default;throw e._result}var Ce={current:null},us={transition:null},Nh={ReactCurrentDispatcher:Ce,ReactCurrentBatchConfig:us,ReactCurrentOwner:Vl};function Lc(){throw Error("act(...) is not supported in production builds of React.")}H.Children={map:qn,forEach:function(e,r,n){qn(e,function(){r.apply(this,arguments)},n)},count:function(e){var r=0;return qn(e,function(){r++}),r},toArray:function(e){return qn(e,function(r){return r})||[]},only:function(e){if(!Ql(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};H.Component=Wr;H.Fragment=ah;H.Profiler=ch;H.PureComponent=Gl;H.StrictMode=oh;H.Suspense=ph;H.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Nh;H.act=Lc;H.cloneElement=function(e,r,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var s=Ec({},e.props),i=e.key,l=e.ref,a=e._owner;if(r!=null){if(r.ref!==void 0&&(l=r.ref,a=Vl.current),r.key!==void 0&&(i=""+r.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(c in r)wc.call(r,c)&&!kc.hasOwnProperty(c)&&(s[c]=r[c]===void 0&&o!==void 0?o[c]:r[c])}var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){o=Array(c);for(var d=0;d<c;d++)o[d]=arguments[d+2];s.children=o}return{$$typeof:Pn,type:e.type,key:i,ref:l,props:s,_owner:a}};H.createContext=function(e){return e={$$typeof:uh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:dh,_context:e},e.Consumer=e};H.createElement=bc;H.createFactory=function(e){var r=bc.bind(null,e);return r.type=e,r};H.createRef=function(){return{current:null}};H.forwardRef=function(e){return{$$typeof:hh,render:e}};H.isValidElement=Ql;H.lazy=function(e){return{$$typeof:fh,_payload:{_status:-1,_result:e},_init:jh}};H.memo=function(e,r){return{$$typeof:mh,type:e,compare:r===void 0?null:r}};H.startTransition=function(e){var r=us.transition;us.transition={};try{e()}finally{us.transition=r}};H.unstable_act=Lc;H.useCallback=function(e,r){return Ce.current.useCallback(e,r)};H.useContext=function(e){return Ce.current.useContext(e)};H.useDebugValue=function(){};H.useDeferredValue=function(e){return Ce.current.useDeferredValue(e)};H.useEffect=function(e,r){return Ce.current.useEffect(e,r)};H.useId=function(){return Ce.current.useId()};H.useImperativeHandle=function(e,r,n){return Ce.current.useImperativeHandle(e,r,n)};H.useInsertionEffect=function(e,r){return Ce.current.useInsertionEffect(e,r)};H.useLayoutEffect=function(e,r){return Ce.current.useLayoutEffect(e,r)};H.useMemo=function(e,r){return Ce.current.useMemo(e,r)};H.useReducer=function(e,r,n){return Ce.current.useReducer(e,r,n)};H.useRef=function(e){return Ce.current.useRef(e)};H.useState=function(e){return Ce.current.useState(e)};H.useSyncExternalStore=function(e,r,n){return Ce.current.useSyncExternalStore(e,r,n)};H.useTransition=function(){return Ce.current.useTransition()};H.version="18.3.1";Nc.exports=H;var x=Nc.exports;const vh=ih(x);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Eh=x,Sh=Symbol.for("react.element"),Th=Symbol.for("react.fragment"),wh=Object.prototype.hasOwnProperty,kh=Eh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,bh={key:!0,ref:!0,__self:!0,__source:!0};function Cc(e,r,n){var s,i={},l=null,a=null;n!==void 0&&(l=""+n),r.key!==void 0&&(l=""+r.key),r.ref!==void 0&&(a=r.ref);for(s in r)wh.call(r,s)&&!bh.hasOwnProperty(s)&&(i[s]=r[s]);if(e&&e.defaultProps)for(s in r=e.defaultProps,r)i[s]===void 0&&(i[s]=r[s]);return{$$typeof:Sh,type:e,key:l,ref:a,props:i,_owner:kh.current}}Ks.Fragment=Th;Ks.jsx=Cc;Ks.jsxs=Cc;jc.exports=Ks;var t=jc.exports,Ji={},Rc={exports:{}},Ue={},Oc={exports:{}},_c={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function r(R,D){var P=R.length;R.push(D);e:for(;0<P;){var b=P-1>>>1,I=R[b];if(0<i(I,D))R[b]=D,R[P]=I,P=b;else break e}}function n(R){return R.length===0?null:R[0]}function s(R){if(R.length===0)return null;var D=R[0],P=R.pop();if(P!==D){R[0]=P;e:for(var b=0,I=R.length,_=I>>>1;b<_;){var J=2*(b+1)-1,Ot=R[J],yt=J+1,Wn=R[yt];if(0>i(Ot,P))yt<I&&0>i(Wn,Ot)?(R[b]=Wn,R[yt]=P,b=yt):(R[b]=Ot,R[J]=P,b=J);else if(yt<I&&0>i(Wn,P))R[b]=Wn,R[yt]=P,b=yt;else break e}}return D}function i(R,D){var P=R.sortIndex-D.sortIndex;return P!==0?P:R.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var a=Date,o=a.now();e.unstable_now=function(){return a.now()-o}}var c=[],d=[],u=1,m=null,y=3,g=!1,N=!1,j=!1,T=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(R){for(var D=n(d);D!==null;){if(D.callback===null)s(d);else if(D.startTime<=R)s(d),D.sortIndex=D.expirationTime,r(c,D);else break;D=n(d)}}function v(R){if(j=!1,f(R),!N)if(n(c)!==null)N=!0,er(E);else{var D=n(d);D!==null&&Ge(v,D.startTime-R)}}function E(R,D){N=!1,j&&(j=!1,p(C),C=-1),g=!0;var P=y;try{for(f(D),m=n(c);m!==null&&(!(m.expirationTime>D)||R&&!Y());){var b=m.callback;if(typeof b=="function"){m.callback=null,y=m.priorityLevel;var I=b(m.expirationTime<=D);D=e.unstable_now(),typeof I=="function"?m.callback=I:m===n(c)&&s(c),f(D)}else s(c);m=n(c)}if(m!==null)var _=!0;else{var J=n(d);J!==null&&Ge(v,J.startTime-D),_=!1}return _}finally{m=null,y=P,g=!1}}var L=!1,w=null,C=-1,B=5,A=-1;function Y(){return!(e.unstable_now()-A<B)}function pe(){if(w!==null){var R=e.unstable_now();A=R;var D=!0;try{D=w(!0,R)}finally{D?qe():(L=!1,w=null)}}else L=!1}var qe;if(typeof h=="function")qe=function(){h(pe)};else if(typeof MessageChannel<"u"){var me=new MessageChannel,fe=me.port2;me.port1.onmessage=pe,qe=function(){fe.postMessage(null)}}else qe=function(){T(pe,0)};function er(R){w=R,L||(L=!0,qe())}function Ge(R,D){C=T(function(){R(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(R){R.callback=null},e.unstable_continueExecution=function(){N||g||(N=!0,er(E))},e.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<R?Math.floor(1e3/R):5},e.unstable_getCurrentPriorityLevel=function(){return y},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(R){switch(y){case 1:case 2:case 3:var D=3;break;default:D=y}var P=y;y=D;try{return R()}finally{y=P}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(R,D){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var P=y;y=R;try{return D()}finally{y=P}},e.unstable_scheduleCallback=function(R,D,P){var b=e.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?b+P:b):P=b,R){case 1:var I=-1;break;case 2:I=250;break;case 5:I=1073741823;break;case 4:I=1e4;break;default:I=5e3}return I=P+I,R={id:u++,callback:D,priorityLevel:R,startTime:P,expirationTime:I,sortIndex:-1},P>b?(R.sortIndex=P,r(d,R),n(c)===null&&R===n(d)&&(j?(p(C),C=-1):j=!0,Ge(v,P-b))):(R.sortIndex=I,r(c,R),N||g||(N=!0,er(E))),R},e.unstable_shouldYield=Y,e.unstable_wrapCallback=function(R){var D=y;return function(){var P=y;y=D;try{return R.apply(this,arguments)}finally{y=P}}}})(_c);Oc.exports=_c;var Lh=Oc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ch=x,He=Lh;function k(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)r+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ic=new Set,gn={};function fr(e,r){Pr(e,r),Pr(e+"Capture",r)}function Pr(e,r){for(gn[e]=r,e=0;e<r.length;e++)Ic.add(r[e])}var wt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ki=Object.prototype.hasOwnProperty,Rh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ka={},Xa={};function Oh(e){return Ki.call(Xa,e)?!0:Ki.call(Ka,e)?!1:Rh.test(e)?Xa[e]=!0:(Ka[e]=!0,!1)}function _h(e,r,n,s){if(n!==null&&n.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return s?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ih(e,r,n,s){if(r===null||typeof r>"u"||_h(e,r,n,s))return!0;if(s)return!1;if(n!==null)switch(n.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function Re(e,r,n,s,i,l,a){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=s,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=r,this.sanitizeURL=l,this.removeEmptyString=a}var ge={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ge[e]=new Re(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var r=e[0];ge[r]=new Re(r,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ge[e]=new Re(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ge[e]=new Re(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ge[e]=new Re(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ge[e]=new Re(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ge[e]=new Re(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ge[e]=new Re(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ge[e]=new Re(e,5,!1,e.toLowerCase(),null,!1,!1)});var Yl=/[\-:]([a-z])/g;function Jl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var r=e.replace(Yl,Jl);ge[r]=new Re(r,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var r=e.replace(Yl,Jl);ge[r]=new Re(r,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var r=e.replace(Yl,Jl);ge[r]=new Re(r,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ge[e]=new Re(e,1,!1,e.toLowerCase(),null,!1,!1)});ge.xlinkHref=new Re("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ge[e]=new Re(e,1,!1,e.toLowerCase(),null,!0,!0)});function Kl(e,r,n,s){var i=ge.hasOwnProperty(r)?ge[r]:null;(i!==null?i.type!==0:s||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(Ih(r,n,i,s)&&(n=null),s||i===null?Oh(r)&&(n===null?e.removeAttribute(r):e.setAttribute(r,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(r=i.attributeName,s=i.attributeNamespace,n===null?e.removeAttribute(r):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,s?e.setAttributeNS(s,r,n):e.setAttribute(r,n))))}var Rt=Ch.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Gn=Symbol.for("react.element"),gr=Symbol.for("react.portal"),jr=Symbol.for("react.fragment"),Xl=Symbol.for("react.strict_mode"),Xi=Symbol.for("react.profiler"),Ac=Symbol.for("react.provider"),Dc=Symbol.for("react.context"),Zl=Symbol.for("react.forward_ref"),Zi=Symbol.for("react.suspense"),el=Symbol.for("react.suspense_list"),ea=Symbol.for("react.memo"),Dt=Symbol.for("react.lazy"),Pc=Symbol.for("react.offscreen"),Za=Symbol.iterator;function Yr(e){return e===null||typeof e!="object"?null:(e=Za&&e[Za]||e["@@iterator"],typeof e=="function"?e:null)}var te=Object.assign,ji;function sn(e){if(ji===void 0)try{throw Error()}catch(n){var r=n.stack.trim().match(/\n( *(at )?)/);ji=r&&r[1]||""}return`
`+ji+e}var Ni=!1;function vi(e,r){if(!e||Ni)return"";Ni=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(d){var s=d}Reflect.construct(e,[],r)}else{try{r.call()}catch(d){s=d}e.call(r.prototype)}else{try{throw Error()}catch(d){s=d}e()}}catch(d){if(d&&s&&typeof d.stack=="string"){for(var i=d.stack.split(`
`),l=s.stack.split(`
`),a=i.length-1,o=l.length-1;1<=a&&0<=o&&i[a]!==l[o];)o--;for(;1<=a&&0<=o;a--,o--)if(i[a]!==l[o]){if(a!==1||o!==1)do if(a--,o--,0>o||i[a]!==l[o]){var c=`
`+i[a].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=a&&0<=o);break}}}finally{Ni=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?sn(e):""}function Ah(e){switch(e.tag){case 5:return sn(e.type);case 16:return sn("Lazy");case 13:return sn("Suspense");case 19:return sn("SuspenseList");case 0:case 2:case 15:return e=vi(e.type,!1),e;case 11:return e=vi(e.type.render,!1),e;case 1:return e=vi(e.type,!0),e;default:return""}}function tl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case jr:return"Fragment";case gr:return"Portal";case Xi:return"Profiler";case Xl:return"StrictMode";case Zi:return"Suspense";case el:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Dc:return(e.displayName||"Context")+".Consumer";case Ac:return(e._context.displayName||"Context")+".Provider";case Zl:var r=e.render;return e=e.displayName,e||(e=r.displayName||r.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ea:return r=e.displayName||null,r!==null?r:tl(e.type)||"Memo";case Dt:r=e._payload,e=e._init;try{return tl(e(r))}catch{}}return null}function Dh(e){var r=e.type;switch(e.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=r.render,e=e.displayName||e.name||"",r.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return tl(r);case 8:return r===Xl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function Yt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Fc(e){var r=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function Ph(e){var r=Fc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,r),s=""+e[r];if(!e.hasOwnProperty(r)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,l=n.set;return Object.defineProperty(e,r,{configurable:!0,get:function(){return i.call(this)},set:function(a){s=""+a,l.call(this,a)}}),Object.defineProperty(e,r,{enumerable:n.enumerable}),{getValue:function(){return s},setValue:function(a){s=""+a},stopTracking:function(){e._valueTracker=null,delete e[r]}}}}function $n(e){e._valueTracker||(e._valueTracker=Ph(e))}function Bc(e){if(!e)return!1;var r=e._valueTracker;if(!r)return!0;var n=r.getValue(),s="";return e&&(s=Fc(e)?e.checked?"true":"false":e.value),e=s,e!==n?(r.setValue(e),!0):!1}function Ts(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function rl(e,r){var n=r.checked;return te({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function eo(e,r){var n=r.defaultValue==null?"":r.defaultValue,s=r.checked!=null?r.checked:r.defaultChecked;n=Yt(r.value!=null?r.value:n),e._wrapperState={initialChecked:s,initialValue:n,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function Mc(e,r){r=r.checked,r!=null&&Kl(e,"checked",r,!1)}function nl(e,r){Mc(e,r);var n=Yt(r.value),s=r.type;if(n!=null)s==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}r.hasOwnProperty("value")?sl(e,r.type,n):r.hasOwnProperty("defaultValue")&&sl(e,r.type,Yt(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(e.defaultChecked=!!r.defaultChecked)}function to(e,r,n){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var s=r.type;if(!(s!=="submit"&&s!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+e._wrapperState.initialValue,n||r===e.value||(e.value=r),e.defaultValue=r}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function sl(e,r,n){(r!=="number"||Ts(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var ln=Array.isArray;function Rr(e,r,n,s){if(e=e.options,r){r={};for(var i=0;i<n.length;i++)r["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=r.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&s&&(e[n].defaultSelected=!0)}else{for(n=""+Yt(n),r=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,s&&(e[i].defaultSelected=!0);return}r!==null||e[i].disabled||(r=e[i])}r!==null&&(r.selected=!0)}}function il(e,r){if(r.dangerouslySetInnerHTML!=null)throw Error(k(91));return te({},r,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ro(e,r){var n=r.value;if(n==null){if(n=r.children,r=r.defaultValue,n!=null){if(r!=null)throw Error(k(92));if(ln(n)){if(1<n.length)throw Error(k(93));n=n[0]}r=n}r==null&&(r=""),n=r}e._wrapperState={initialValue:Yt(n)}}function Hc(e,r){var n=Yt(r.value),s=Yt(r.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),r.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),s!=null&&(e.defaultValue=""+s)}function no(e){var r=e.textContent;r===e._wrapperState.initialValue&&r!==""&&r!==null&&(e.value=r)}function Uc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ll(e,r){return e==null||e==="http://www.w3.org/1999/xhtml"?Uc(r):e==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Vn,zc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,n,s,i){MSApp.execUnsafeLocalFunction(function(){return e(r,n,s,i)})}:e}(function(e,r){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=r;else{for(Vn=Vn||document.createElement("div"),Vn.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=Vn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;r.firstChild;)e.appendChild(r.firstChild)}});function jn(e,r){if(r){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=r;return}}e.textContent=r}var cn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Fh=["Webkit","ms","Moz","O"];Object.keys(cn).forEach(function(e){Fh.forEach(function(r){r=r+e.charAt(0).toUpperCase()+e.substring(1),cn[r]=cn[e]})});function Wc(e,r,n){return r==null||typeof r=="boolean"||r===""?"":n||typeof r!="number"||r===0||cn.hasOwnProperty(e)&&cn[e]?(""+r).trim():r+"px"}function qc(e,r){e=e.style;for(var n in r)if(r.hasOwnProperty(n)){var s=n.indexOf("--")===0,i=Wc(n,r[n],s);n==="float"&&(n="cssFloat"),s?e.setProperty(n,i):e[n]=i}}var Bh=te({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function al(e,r){if(r){if(Bh[e]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(k(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(k(61))}if(r.style!=null&&typeof r.style!="object")throw Error(k(62))}}function ol(e,r){if(e.indexOf("-")===-1)return typeof r.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var cl=null;function ta(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var dl=null,Or=null,_r=null;function so(e){if(e=Mn(e)){if(typeof dl!="function")throw Error(k(280));var r=e.stateNode;r&&(r=ri(r),dl(e.stateNode,e.type,r))}}function Gc(e){Or?_r?_r.push(e):_r=[e]:Or=e}function $c(){if(Or){var e=Or,r=_r;if(_r=Or=null,so(e),r)for(e=0;e<r.length;e++)so(r[e])}}function Vc(e,r){return e(r)}function Qc(){}var Ei=!1;function Yc(e,r,n){if(Ei)return e(r,n);Ei=!0;try{return Vc(e,r,n)}finally{Ei=!1,(Or!==null||_r!==null)&&(Qc(),$c())}}function Nn(e,r){var n=e.stateNode;if(n===null)return null;var s=ri(n);if(s===null)return null;n=s[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(k(231,r,typeof n));return n}var ul=!1;if(wt)try{var Jr={};Object.defineProperty(Jr,"passive",{get:function(){ul=!0}}),window.addEventListener("test",Jr,Jr),window.removeEventListener("test",Jr,Jr)}catch{ul=!1}function Mh(e,r,n,s,i,l,a,o,c){var d=Array.prototype.slice.call(arguments,3);try{r.apply(n,d)}catch(u){this.onError(u)}}var dn=!1,ws=null,ks=!1,hl=null,Hh={onError:function(e){dn=!0,ws=e}};function Uh(e,r,n,s,i,l,a,o,c){dn=!1,ws=null,Mh.apply(Hh,arguments)}function zh(e,r,n,s,i,l,a,o,c){if(Uh.apply(this,arguments),dn){if(dn){var d=ws;dn=!1,ws=null}else throw Error(k(198));ks||(ks=!0,hl=d)}}function xr(e){var r=e,n=e;if(e.alternate)for(;r.return;)r=r.return;else{e=r;do r=e,r.flags&4098&&(n=r.return),e=r.return;while(e)}return r.tag===3?n:null}function Jc(e){if(e.tag===13){var r=e.memoizedState;if(r===null&&(e=e.alternate,e!==null&&(r=e.memoizedState)),r!==null)return r.dehydrated}return null}function io(e){if(xr(e)!==e)throw Error(k(188))}function Wh(e){var r=e.alternate;if(!r){if(r=xr(e),r===null)throw Error(k(188));return r!==e?null:e}for(var n=e,s=r;;){var i=n.return;if(i===null)break;var l=i.alternate;if(l===null){if(s=i.return,s!==null){n=s;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===n)return io(i),e;if(l===s)return io(i),r;l=l.sibling}throw Error(k(188))}if(n.return!==s.return)n=i,s=l;else{for(var a=!1,o=i.child;o;){if(o===n){a=!0,n=i,s=l;break}if(o===s){a=!0,s=i,n=l;break}o=o.sibling}if(!a){for(o=l.child;o;){if(o===n){a=!0,n=l,s=i;break}if(o===s){a=!0,s=l,n=i;break}o=o.sibling}if(!a)throw Error(k(189))}}if(n.alternate!==s)throw Error(k(190))}if(n.tag!==3)throw Error(k(188));return n.stateNode.current===n?e:r}function Kc(e){return e=Wh(e),e!==null?Xc(e):null}function Xc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var r=Xc(e);if(r!==null)return r;e=e.sibling}return null}var Zc=He.unstable_scheduleCallback,lo=He.unstable_cancelCallback,qh=He.unstable_shouldYield,Gh=He.unstable_requestPaint,se=He.unstable_now,$h=He.unstable_getCurrentPriorityLevel,ra=He.unstable_ImmediatePriority,ed=He.unstable_UserBlockingPriority,bs=He.unstable_NormalPriority,Vh=He.unstable_LowPriority,td=He.unstable_IdlePriority,Xs=null,pt=null;function Qh(e){if(pt&&typeof pt.onCommitFiberRoot=="function")try{pt.onCommitFiberRoot(Xs,e,void 0,(e.current.flags&128)===128)}catch{}}var nt=Math.clz32?Math.clz32:Kh,Yh=Math.log,Jh=Math.LN2;function Kh(e){return e>>>=0,e===0?32:31-(Yh(e)/Jh|0)|0}var Qn=64,Yn=4194304;function an(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ls(e,r){var n=e.pendingLanes;if(n===0)return 0;var s=0,i=e.suspendedLanes,l=e.pingedLanes,a=n&268435455;if(a!==0){var o=a&~i;o!==0?s=an(o):(l&=a,l!==0&&(s=an(l)))}else a=n&~i,a!==0?s=an(a):l!==0&&(s=an(l));if(s===0)return 0;if(r!==0&&r!==s&&!(r&i)&&(i=s&-s,l=r&-r,i>=l||i===16&&(l&4194240)!==0))return r;if(s&4&&(s|=n&16),r=e.entangledLanes,r!==0)for(e=e.entanglements,r&=s;0<r;)n=31-nt(r),i=1<<n,s|=e[n],r&=~i;return s}function Xh(e,r){switch(e){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Zh(e,r){for(var n=e.suspendedLanes,s=e.pingedLanes,i=e.expirationTimes,l=e.pendingLanes;0<l;){var a=31-nt(l),o=1<<a,c=i[a];c===-1?(!(o&n)||o&s)&&(i[a]=Xh(o,r)):c<=r&&(e.expiredLanes|=o),l&=~o}}function pl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function rd(){var e=Qn;return Qn<<=1,!(Qn&4194240)&&(Qn=64),e}function Si(e){for(var r=[],n=0;31>n;n++)r.push(e);return r}function Fn(e,r,n){e.pendingLanes|=r,r!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,r=31-nt(r),e[r]=n}function ep(e,r){var n=e.pendingLanes&~r;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=r,e.mutableReadLanes&=r,e.entangledLanes&=r,r=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-nt(n),l=1<<i;r[i]=0,s[i]=-1,e[i]=-1,n&=~l}}function na(e,r){var n=e.entangledLanes|=r;for(e=e.entanglements;n;){var s=31-nt(n),i=1<<s;i&r|e[s]&r&&(e[s]|=r),n&=~i}}var W=0;function nd(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var sd,sa,id,ld,ad,ml=!1,Jn=[],Ut=null,zt=null,Wt=null,vn=new Map,En=new Map,Ft=[],tp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ao(e,r){switch(e){case"focusin":case"focusout":Ut=null;break;case"dragenter":case"dragleave":zt=null;break;case"mouseover":case"mouseout":Wt=null;break;case"pointerover":case"pointerout":vn.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":En.delete(r.pointerId)}}function Kr(e,r,n,s,i,l){return e===null||e.nativeEvent!==l?(e={blockedOn:r,domEventName:n,eventSystemFlags:s,nativeEvent:l,targetContainers:[i]},r!==null&&(r=Mn(r),r!==null&&sa(r)),e):(e.eventSystemFlags|=s,r=e.targetContainers,i!==null&&r.indexOf(i)===-1&&r.push(i),e)}function rp(e,r,n,s,i){switch(r){case"focusin":return Ut=Kr(Ut,e,r,n,s,i),!0;case"dragenter":return zt=Kr(zt,e,r,n,s,i),!0;case"mouseover":return Wt=Kr(Wt,e,r,n,s,i),!0;case"pointerover":var l=i.pointerId;return vn.set(l,Kr(vn.get(l)||null,e,r,n,s,i)),!0;case"gotpointercapture":return l=i.pointerId,En.set(l,Kr(En.get(l)||null,e,r,n,s,i)),!0}return!1}function od(e){var r=sr(e.target);if(r!==null){var n=xr(r);if(n!==null){if(r=n.tag,r===13){if(r=Jc(n),r!==null){e.blockedOn=r,ad(e.priority,function(){id(n)});return}}else if(r===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function hs(e){if(e.blockedOn!==null)return!1;for(var r=e.targetContainers;0<r.length;){var n=fl(e.domEventName,e.eventSystemFlags,r[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var s=new n.constructor(n.type,n);cl=s,n.target.dispatchEvent(s),cl=null}else return r=Mn(n),r!==null&&sa(r),e.blockedOn=n,!1;r.shift()}return!0}function oo(e,r,n){hs(e)&&n.delete(r)}function np(){ml=!1,Ut!==null&&hs(Ut)&&(Ut=null),zt!==null&&hs(zt)&&(zt=null),Wt!==null&&hs(Wt)&&(Wt=null),vn.forEach(oo),En.forEach(oo)}function Xr(e,r){e.blockedOn===r&&(e.blockedOn=null,ml||(ml=!0,He.unstable_scheduleCallback(He.unstable_NormalPriority,np)))}function Sn(e){function r(i){return Xr(i,e)}if(0<Jn.length){Xr(Jn[0],e);for(var n=1;n<Jn.length;n++){var s=Jn[n];s.blockedOn===e&&(s.blockedOn=null)}}for(Ut!==null&&Xr(Ut,e),zt!==null&&Xr(zt,e),Wt!==null&&Xr(Wt,e),vn.forEach(r),En.forEach(r),n=0;n<Ft.length;n++)s=Ft[n],s.blockedOn===e&&(s.blockedOn=null);for(;0<Ft.length&&(n=Ft[0],n.blockedOn===null);)od(n),n.blockedOn===null&&Ft.shift()}var Ir=Rt.ReactCurrentBatchConfig,Cs=!0;function sp(e,r,n,s){var i=W,l=Ir.transition;Ir.transition=null;try{W=1,ia(e,r,n,s)}finally{W=i,Ir.transition=l}}function ip(e,r,n,s){var i=W,l=Ir.transition;Ir.transition=null;try{W=4,ia(e,r,n,s)}finally{W=i,Ir.transition=l}}function ia(e,r,n,s){if(Cs){var i=fl(e,r,n,s);if(i===null)Ii(e,r,s,Rs,n),ao(e,s);else if(rp(i,e,r,n,s))s.stopPropagation();else if(ao(e,s),r&4&&-1<tp.indexOf(e)){for(;i!==null;){var l=Mn(i);if(l!==null&&sd(l),l=fl(e,r,n,s),l===null&&Ii(e,r,s,Rs,n),l===i)break;i=l}i!==null&&s.stopPropagation()}else Ii(e,r,s,null,n)}}var Rs=null;function fl(e,r,n,s){if(Rs=null,e=ta(s),e=sr(e),e!==null)if(r=xr(e),r===null)e=null;else if(n=r.tag,n===13){if(e=Jc(r),e!==null)return e;e=null}else if(n===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;e=null}else r!==e&&(e=null);return Rs=e,null}function cd(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch($h()){case ra:return 1;case ed:return 4;case bs:case Vh:return 16;case td:return 536870912;default:return 16}default:return 16}}var Mt=null,la=null,ps=null;function dd(){if(ps)return ps;var e,r=la,n=r.length,s,i="value"in Mt?Mt.value:Mt.textContent,l=i.length;for(e=0;e<n&&r[e]===i[e];e++);var a=n-e;for(s=1;s<=a&&r[n-s]===i[l-s];s++);return ps=i.slice(e,1<s?1-s:void 0)}function ms(e){var r=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&r===13&&(e=13)):e=r,e===10&&(e=13),32<=e||e===13?e:0}function Kn(){return!0}function co(){return!1}function ze(e){function r(n,s,i,l,a){this._reactName=n,this._targetInst=i,this.type=s,this.nativeEvent=l,this.target=a,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(l):l[o]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Kn:co,this.isPropagationStopped=co,this}return te(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Kn)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Kn)},persist:function(){},isPersistent:Kn}),r}var qr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},aa=ze(qr),Bn=te({},qr,{view:0,detail:0}),lp=ze(Bn),Ti,wi,Zr,Zs=te({},Bn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:oa,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Zr&&(Zr&&e.type==="mousemove"?(Ti=e.screenX-Zr.screenX,wi=e.screenY-Zr.screenY):wi=Ti=0,Zr=e),Ti)},movementY:function(e){return"movementY"in e?e.movementY:wi}}),uo=ze(Zs),ap=te({},Zs,{dataTransfer:0}),op=ze(ap),cp=te({},Bn,{relatedTarget:0}),ki=ze(cp),dp=te({},qr,{animationName:0,elapsedTime:0,pseudoElement:0}),up=ze(dp),hp=te({},qr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),pp=ze(hp),mp=te({},qr,{data:0}),ho=ze(mp),fp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},xp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},yp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gp(e){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(e):(e=yp[e])?!!r[e]:!1}function oa(){return gp}var jp=te({},Bn,{key:function(e){if(e.key){var r=fp[e.key]||e.key;if(r!=="Unidentified")return r}return e.type==="keypress"?(e=ms(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?xp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:oa,charCode:function(e){return e.type==="keypress"?ms(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ms(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Np=ze(jp),vp=te({},Zs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),po=ze(vp),Ep=te({},Bn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:oa}),Sp=ze(Ep),Tp=te({},qr,{propertyName:0,elapsedTime:0,pseudoElement:0}),wp=ze(Tp),kp=te({},Zs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),bp=ze(kp),Lp=[9,13,27,32],ca=wt&&"CompositionEvent"in window,un=null;wt&&"documentMode"in document&&(un=document.documentMode);var Cp=wt&&"TextEvent"in window&&!un,ud=wt&&(!ca||un&&8<un&&11>=un),mo=" ",fo=!1;function hd(e,r){switch(e){case"keyup":return Lp.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function pd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Nr=!1;function Rp(e,r){switch(e){case"compositionend":return pd(r);case"keypress":return r.which!==32?null:(fo=!0,mo);case"textInput":return e=r.data,e===mo&&fo?null:e;default:return null}}function Op(e,r){if(Nr)return e==="compositionend"||!ca&&hd(e,r)?(e=dd(),ps=la=Mt=null,Nr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return ud&&r.locale!=="ko"?null:r.data;default:return null}}var _p={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xo(e){var r=e&&e.nodeName&&e.nodeName.toLowerCase();return r==="input"?!!_p[e.type]:r==="textarea"}function md(e,r,n,s){Gc(s),r=Os(r,"onChange"),0<r.length&&(n=new aa("onChange","change",null,n,s),e.push({event:n,listeners:r}))}var hn=null,Tn=null;function Ip(e){wd(e,0)}function ei(e){var r=Sr(e);if(Bc(r))return e}function Ap(e,r){if(e==="change")return r}var fd=!1;if(wt){var bi;if(wt){var Li="oninput"in document;if(!Li){var yo=document.createElement("div");yo.setAttribute("oninput","return;"),Li=typeof yo.oninput=="function"}bi=Li}else bi=!1;fd=bi&&(!document.documentMode||9<document.documentMode)}function go(){hn&&(hn.detachEvent("onpropertychange",xd),Tn=hn=null)}function xd(e){if(e.propertyName==="value"&&ei(Tn)){var r=[];md(r,Tn,e,ta(e)),Yc(Ip,r)}}function Dp(e,r,n){e==="focusin"?(go(),hn=r,Tn=n,hn.attachEvent("onpropertychange",xd)):e==="focusout"&&go()}function Pp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ei(Tn)}function Fp(e,r){if(e==="click")return ei(r)}function Bp(e,r){if(e==="input"||e==="change")return ei(r)}function Mp(e,r){return e===r&&(e!==0||1/e===1/r)||e!==e&&r!==r}var lt=typeof Object.is=="function"?Object.is:Mp;function wn(e,r){if(lt(e,r))return!0;if(typeof e!="object"||e===null||typeof r!="object"||r===null)return!1;var n=Object.keys(e),s=Object.keys(r);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var i=n[s];if(!Ki.call(r,i)||!lt(e[i],r[i]))return!1}return!0}function jo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function No(e,r){var n=jo(e);e=0;for(var s;n;){if(n.nodeType===3){if(s=e+n.textContent.length,e<=r&&s>=r)return{node:n,offset:r-e};e=s}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=jo(n)}}function yd(e,r){return e&&r?e===r?!0:e&&e.nodeType===3?!1:r&&r.nodeType===3?yd(e,r.parentNode):"contains"in e?e.contains(r):e.compareDocumentPosition?!!(e.compareDocumentPosition(r)&16):!1:!1}function gd(){for(var e=window,r=Ts();r instanceof e.HTMLIFrameElement;){try{var n=typeof r.contentWindow.location.href=="string"}catch{n=!1}if(n)e=r.contentWindow;else break;r=Ts(e.document)}return r}function da(e){var r=e&&e.nodeName&&e.nodeName.toLowerCase();return r&&(r==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||r==="textarea"||e.contentEditable==="true")}function Hp(e){var r=gd(),n=e.focusedElem,s=e.selectionRange;if(r!==n&&n&&n.ownerDocument&&yd(n.ownerDocument.documentElement,n)){if(s!==null&&da(n)){if(r=s.start,e=s.end,e===void 0&&(e=r),"selectionStart"in n)n.selectionStart=r,n.selectionEnd=Math.min(e,n.value.length);else if(e=(r=n.ownerDocument||document)&&r.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,l=Math.min(s.start,i);s=s.end===void 0?l:Math.min(s.end,i),!e.extend&&l>s&&(i=s,s=l,l=i),i=No(n,l);var a=No(n,s);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(r=r.createRange(),r.setStart(i.node,i.offset),e.removeAllRanges(),l>s?(e.addRange(r),e.extend(a.node,a.offset)):(r.setEnd(a.node,a.offset),e.addRange(r)))}}for(r=[],e=n;e=e.parentNode;)e.nodeType===1&&r.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<r.length;n++)e=r[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Up=wt&&"documentMode"in document&&11>=document.documentMode,vr=null,xl=null,pn=null,yl=!1;function vo(e,r,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;yl||vr==null||vr!==Ts(s)||(s=vr,"selectionStart"in s&&da(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),pn&&wn(pn,s)||(pn=s,s=Os(xl,"onSelect"),0<s.length&&(r=new aa("onSelect","select",null,r,n),e.push({event:r,listeners:s}),r.target=vr)))}function Xn(e,r){var n={};return n[e.toLowerCase()]=r.toLowerCase(),n["Webkit"+e]="webkit"+r,n["Moz"+e]="moz"+r,n}var Er={animationend:Xn("Animation","AnimationEnd"),animationiteration:Xn("Animation","AnimationIteration"),animationstart:Xn("Animation","AnimationStart"),transitionend:Xn("Transition","TransitionEnd")},Ci={},jd={};wt&&(jd=document.createElement("div").style,"AnimationEvent"in window||(delete Er.animationend.animation,delete Er.animationiteration.animation,delete Er.animationstart.animation),"TransitionEvent"in window||delete Er.transitionend.transition);function ti(e){if(Ci[e])return Ci[e];if(!Er[e])return e;var r=Er[e],n;for(n in r)if(r.hasOwnProperty(n)&&n in jd)return Ci[e]=r[n];return e}var Nd=ti("animationend"),vd=ti("animationiteration"),Ed=ti("animationstart"),Sd=ti("transitionend"),Td=new Map,Eo="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Kt(e,r){Td.set(e,r),fr(r,[e])}for(var Ri=0;Ri<Eo.length;Ri++){var Oi=Eo[Ri],zp=Oi.toLowerCase(),Wp=Oi[0].toUpperCase()+Oi.slice(1);Kt(zp,"on"+Wp)}Kt(Nd,"onAnimationEnd");Kt(vd,"onAnimationIteration");Kt(Ed,"onAnimationStart");Kt("dblclick","onDoubleClick");Kt("focusin","onFocus");Kt("focusout","onBlur");Kt(Sd,"onTransitionEnd");Pr("onMouseEnter",["mouseout","mouseover"]);Pr("onMouseLeave",["mouseout","mouseover"]);Pr("onPointerEnter",["pointerout","pointerover"]);Pr("onPointerLeave",["pointerout","pointerover"]);fr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fr("onBeforeInput",["compositionend","keypress","textInput","paste"]);fr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));fr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var on="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qp=new Set("cancel close invalid load scroll toggle".split(" ").concat(on));function So(e,r,n){var s=e.type||"unknown-event";e.currentTarget=n,zh(s,r,void 0,e),e.currentTarget=null}function wd(e,r){r=(r&4)!==0;for(var n=0;n<e.length;n++){var s=e[n],i=s.event;s=s.listeners;e:{var l=void 0;if(r)for(var a=s.length-1;0<=a;a--){var o=s[a],c=o.instance,d=o.currentTarget;if(o=o.listener,c!==l&&i.isPropagationStopped())break e;So(i,o,d),l=c}else for(a=0;a<s.length;a++){if(o=s[a],c=o.instance,d=o.currentTarget,o=o.listener,c!==l&&i.isPropagationStopped())break e;So(i,o,d),l=c}}}if(ks)throw e=hl,ks=!1,hl=null,e}function V(e,r){var n=r[El];n===void 0&&(n=r[El]=new Set);var s=e+"__bubble";n.has(s)||(kd(r,e,2,!1),n.add(s))}function _i(e,r,n){var s=0;r&&(s|=4),kd(n,e,s,r)}var Zn="_reactListening"+Math.random().toString(36).slice(2);function kn(e){if(!e[Zn]){e[Zn]=!0,Ic.forEach(function(n){n!=="selectionchange"&&(qp.has(n)||_i(n,!1,e),_i(n,!0,e))});var r=e.nodeType===9?e:e.ownerDocument;r===null||r[Zn]||(r[Zn]=!0,_i("selectionchange",!1,r))}}function kd(e,r,n,s){switch(cd(r)){case 1:var i=sp;break;case 4:i=ip;break;default:i=ia}n=i.bind(null,r,n,e),i=void 0,!ul||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(i=!0),s?i!==void 0?e.addEventListener(r,n,{capture:!0,passive:i}):e.addEventListener(r,n,!0):i!==void 0?e.addEventListener(r,n,{passive:i}):e.addEventListener(r,n,!1)}function Ii(e,r,n,s,i){var l=s;if(!(r&1)&&!(r&2)&&s!==null)e:for(;;){if(s===null)return;var a=s.tag;if(a===3||a===4){var o=s.stateNode.containerInfo;if(o===i||o.nodeType===8&&o.parentNode===i)break;if(a===4)for(a=s.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;a=a.return}for(;o!==null;){if(a=sr(o),a===null)return;if(c=a.tag,c===5||c===6){s=l=a;continue e}o=o.parentNode}}s=s.return}Yc(function(){var d=l,u=ta(n),m=[];e:{var y=Td.get(e);if(y!==void 0){var g=aa,N=e;switch(e){case"keypress":if(ms(n)===0)break e;case"keydown":case"keyup":g=Np;break;case"focusin":N="focus",g=ki;break;case"focusout":N="blur",g=ki;break;case"beforeblur":case"afterblur":g=ki;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=uo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=op;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=Sp;break;case Nd:case vd:case Ed:g=up;break;case Sd:g=wp;break;case"scroll":g=lp;break;case"wheel":g=bp;break;case"copy":case"cut":case"paste":g=pp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=po}var j=(r&4)!==0,T=!j&&e==="scroll",p=j?y!==null?y+"Capture":null:y;j=[];for(var h=d,f;h!==null;){f=h;var v=f.stateNode;if(f.tag===5&&v!==null&&(f=v,p!==null&&(v=Nn(h,p),v!=null&&j.push(bn(h,v,f)))),T)break;h=h.return}0<j.length&&(y=new g(y,N,null,n,u),m.push({event:y,listeners:j}))}}if(!(r&7)){e:{if(y=e==="mouseover"||e==="pointerover",g=e==="mouseout"||e==="pointerout",y&&n!==cl&&(N=n.relatedTarget||n.fromElement)&&(sr(N)||N[kt]))break e;if((g||y)&&(y=u.window===u?u:(y=u.ownerDocument)?y.defaultView||y.parentWindow:window,g?(N=n.relatedTarget||n.toElement,g=d,N=N?sr(N):null,N!==null&&(T=xr(N),N!==T||N.tag!==5&&N.tag!==6)&&(N=null)):(g=null,N=d),g!==N)){if(j=uo,v="onMouseLeave",p="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(j=po,v="onPointerLeave",p="onPointerEnter",h="pointer"),T=g==null?y:Sr(g),f=N==null?y:Sr(N),y=new j(v,h+"leave",g,n,u),y.target=T,y.relatedTarget=f,v=null,sr(u)===d&&(j=new j(p,h+"enter",N,n,u),j.target=f,j.relatedTarget=T,v=j),T=v,g&&N)t:{for(j=g,p=N,h=0,f=j;f;f=yr(f))h++;for(f=0,v=p;v;v=yr(v))f++;for(;0<h-f;)j=yr(j),h--;for(;0<f-h;)p=yr(p),f--;for(;h--;){if(j===p||p!==null&&j===p.alternate)break t;j=yr(j),p=yr(p)}j=null}else j=null;g!==null&&To(m,y,g,j,!1),N!==null&&T!==null&&To(m,T,N,j,!0)}}e:{if(y=d?Sr(d):window,g=y.nodeName&&y.nodeName.toLowerCase(),g==="select"||g==="input"&&y.type==="file")var E=Ap;else if(xo(y))if(fd)E=Bp;else{E=Pp;var L=Dp}else(g=y.nodeName)&&g.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(E=Fp);if(E&&(E=E(e,d))){md(m,E,n,u);break e}L&&L(e,y,d),e==="focusout"&&(L=y._wrapperState)&&L.controlled&&y.type==="number"&&sl(y,"number",y.value)}switch(L=d?Sr(d):window,e){case"focusin":(xo(L)||L.contentEditable==="true")&&(vr=L,xl=d,pn=null);break;case"focusout":pn=xl=vr=null;break;case"mousedown":yl=!0;break;case"contextmenu":case"mouseup":case"dragend":yl=!1,vo(m,n,u);break;case"selectionchange":if(Up)break;case"keydown":case"keyup":vo(m,n,u)}var w;if(ca)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Nr?hd(e,n)&&(C="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(ud&&n.locale!=="ko"&&(Nr||C!=="onCompositionStart"?C==="onCompositionEnd"&&Nr&&(w=dd()):(Mt=u,la="value"in Mt?Mt.value:Mt.textContent,Nr=!0)),L=Os(d,C),0<L.length&&(C=new ho(C,e,null,n,u),m.push({event:C,listeners:L}),w?C.data=w:(w=pd(n),w!==null&&(C.data=w)))),(w=Cp?Rp(e,n):Op(e,n))&&(d=Os(d,"onBeforeInput"),0<d.length&&(u=new ho("onBeforeInput","beforeinput",null,n,u),m.push({event:u,listeners:d}),u.data=w))}wd(m,r)})}function bn(e,r,n){return{instance:e,listener:r,currentTarget:n}}function Os(e,r){for(var n=r+"Capture",s=[];e!==null;){var i=e,l=i.stateNode;i.tag===5&&l!==null&&(i=l,l=Nn(e,n),l!=null&&s.unshift(bn(e,l,i)),l=Nn(e,r),l!=null&&s.push(bn(e,l,i))),e=e.return}return s}function yr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function To(e,r,n,s,i){for(var l=r._reactName,a=[];n!==null&&n!==s;){var o=n,c=o.alternate,d=o.stateNode;if(c!==null&&c===s)break;o.tag===5&&d!==null&&(o=d,i?(c=Nn(n,l),c!=null&&a.unshift(bn(n,c,o))):i||(c=Nn(n,l),c!=null&&a.push(bn(n,c,o)))),n=n.return}a.length!==0&&e.push({event:r,listeners:a})}var Gp=/\r\n?/g,$p=/\u0000|\uFFFD/g;function wo(e){return(typeof e=="string"?e:""+e).replace(Gp,`
`).replace($p,"")}function es(e,r,n){if(r=wo(r),wo(e)!==r&&n)throw Error(k(425))}function _s(){}var gl=null,jl=null;function Nl(e,r){return e==="textarea"||e==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var vl=typeof setTimeout=="function"?setTimeout:void 0,Vp=typeof clearTimeout=="function"?clearTimeout:void 0,ko=typeof Promise=="function"?Promise:void 0,Qp=typeof queueMicrotask=="function"?queueMicrotask:typeof ko<"u"?function(e){return ko.resolve(null).then(e).catch(Yp)}:vl;function Yp(e){setTimeout(function(){throw e})}function Ai(e,r){var n=r,s=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(s===0){e.removeChild(i),Sn(r);return}s--}else n!=="$"&&n!=="$?"&&n!=="$!"||s++;n=i}while(n);Sn(r)}function qt(e){for(;e!=null;e=e.nextSibling){var r=e.nodeType;if(r===1||r===3)break;if(r===8){if(r=e.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return e}function bo(e){e=e.previousSibling;for(var r=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(r===0)return e;r--}else n==="/$"&&r++}e=e.previousSibling}return null}var Gr=Math.random().toString(36).slice(2),ht="__reactFiber$"+Gr,Ln="__reactProps$"+Gr,kt="__reactContainer$"+Gr,El="__reactEvents$"+Gr,Jp="__reactListeners$"+Gr,Kp="__reactHandles$"+Gr;function sr(e){var r=e[ht];if(r)return r;for(var n=e.parentNode;n;){if(r=n[kt]||n[ht]){if(n=r.alternate,r.child!==null||n!==null&&n.child!==null)for(e=bo(e);e!==null;){if(n=e[ht])return n;e=bo(e)}return r}e=n,n=e.parentNode}return null}function Mn(e){return e=e[ht]||e[kt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Sr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function ri(e){return e[Ln]||null}var Sl=[],Tr=-1;function Xt(e){return{current:e}}function Q(e){0>Tr||(e.current=Sl[Tr],Sl[Tr]=null,Tr--)}function $(e,r){Tr++,Sl[Tr]=e.current,e.current=r}var Jt={},Te=Xt(Jt),Ie=Xt(!1),cr=Jt;function Fr(e,r){var n=e.type.contextTypes;if(!n)return Jt;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===r)return s.__reactInternalMemoizedMaskedChildContext;var i={},l;for(l in n)i[l]=r[l];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=i),i}function Ae(e){return e=e.childContextTypes,e!=null}function Is(){Q(Ie),Q(Te)}function Lo(e,r,n){if(Te.current!==Jt)throw Error(k(168));$(Te,r),$(Ie,n)}function bd(e,r,n){var s=e.stateNode;if(r=r.childContextTypes,typeof s.getChildContext!="function")return n;s=s.getChildContext();for(var i in s)if(!(i in r))throw Error(k(108,Dh(e)||"Unknown",i));return te({},n,s)}function As(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Jt,cr=Te.current,$(Te,e),$(Ie,Ie.current),!0}function Co(e,r,n){var s=e.stateNode;if(!s)throw Error(k(169));n?(e=bd(e,r,cr),s.__reactInternalMemoizedMergedChildContext=e,Q(Ie),Q(Te),$(Te,e)):Q(Ie),$(Ie,n)}var vt=null,ni=!1,Di=!1;function Ld(e){vt===null?vt=[e]:vt.push(e)}function Xp(e){ni=!0,Ld(e)}function Zt(){if(!Di&&vt!==null){Di=!0;var e=0,r=W;try{var n=vt;for(W=1;e<n.length;e++){var s=n[e];do s=s(!0);while(s!==null)}vt=null,ni=!1}catch(i){throw vt!==null&&(vt=vt.slice(e+1)),Zc(ra,Zt),i}finally{W=r,Di=!1}}return null}var wr=[],kr=0,Ds=null,Ps=0,$e=[],Ve=0,dr=null,Et=1,St="";function rr(e,r){wr[kr++]=Ps,wr[kr++]=Ds,Ds=e,Ps=r}function Cd(e,r,n){$e[Ve++]=Et,$e[Ve++]=St,$e[Ve++]=dr,dr=e;var s=Et;e=St;var i=32-nt(s)-1;s&=~(1<<i),n+=1;var l=32-nt(r)+i;if(30<l){var a=i-i%5;l=(s&(1<<a)-1).toString(32),s>>=a,i-=a,Et=1<<32-nt(r)+i|n<<i|s,St=l+e}else Et=1<<l|n<<i|s,St=e}function ua(e){e.return!==null&&(rr(e,1),Cd(e,1,0))}function ha(e){for(;e===Ds;)Ds=wr[--kr],wr[kr]=null,Ps=wr[--kr],wr[kr]=null;for(;e===dr;)dr=$e[--Ve],$e[Ve]=null,St=$e[--Ve],$e[Ve]=null,Et=$e[--Ve],$e[Ve]=null}var Me=null,Be=null,K=!1,rt=null;function Rd(e,r){var n=Qe(5,null,null,0);n.elementType="DELETED",n.stateNode=r,n.return=e,r=e.deletions,r===null?(e.deletions=[n],e.flags|=16):r.push(n)}function Ro(e,r){switch(e.tag){case 5:var n=e.type;return r=r.nodeType!==1||n.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(e.stateNode=r,Me=e,Be=qt(r.firstChild),!0):!1;case 6:return r=e.pendingProps===""||r.nodeType!==3?null:r,r!==null?(e.stateNode=r,Me=e,Be=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(n=dr!==null?{id:Et,overflow:St}:null,e.memoizedState={dehydrated:r,treeContext:n,retryLane:1073741824},n=Qe(18,null,null,0),n.stateNode=r,n.return=e,e.child=n,Me=e,Be=null,!0):!1;default:return!1}}function Tl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function wl(e){if(K){var r=Be;if(r){var n=r;if(!Ro(e,r)){if(Tl(e))throw Error(k(418));r=qt(n.nextSibling);var s=Me;r&&Ro(e,r)?Rd(s,n):(e.flags=e.flags&-4097|2,K=!1,Me=e)}}else{if(Tl(e))throw Error(k(418));e.flags=e.flags&-4097|2,K=!1,Me=e}}}function Oo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Me=e}function ts(e){if(e!==Me)return!1;if(!K)return Oo(e),K=!0,!1;var r;if((r=e.tag!==3)&&!(r=e.tag!==5)&&(r=e.type,r=r!=="head"&&r!=="body"&&!Nl(e.type,e.memoizedProps)),r&&(r=Be)){if(Tl(e))throw Od(),Error(k(418));for(;r;)Rd(e,r),r=qt(r.nextSibling)}if(Oo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,r=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(r===0){Be=qt(e.nextSibling);break e}r--}else n!=="$"&&n!=="$!"&&n!=="$?"||r++}e=e.nextSibling}Be=null}}else Be=Me?qt(e.stateNode.nextSibling):null;return!0}function Od(){for(var e=Be;e;)e=qt(e.nextSibling)}function Br(){Be=Me=null,K=!1}function pa(e){rt===null?rt=[e]:rt.push(e)}var Zp=Rt.ReactCurrentBatchConfig;function en(e,r,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(k(309));var s=n.stateNode}if(!s)throw Error(k(147,e));var i=s,l=""+e;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===l?r.ref:(r=function(a){var o=i.refs;a===null?delete o[l]:o[l]=a},r._stringRef=l,r)}if(typeof e!="string")throw Error(k(284));if(!n._owner)throw Error(k(290,e))}return e}function rs(e,r){throw e=Object.prototype.toString.call(r),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":e))}function _o(e){var r=e._init;return r(e._payload)}function _d(e){function r(p,h){if(e){var f=p.deletions;f===null?(p.deletions=[h],p.flags|=16):f.push(h)}}function n(p,h){if(!e)return null;for(;h!==null;)r(p,h),h=h.sibling;return null}function s(p,h){for(p=new Map;h!==null;)h.key!==null?p.set(h.key,h):p.set(h.index,h),h=h.sibling;return p}function i(p,h){return p=Qt(p,h),p.index=0,p.sibling=null,p}function l(p,h,f){return p.index=f,e?(f=p.alternate,f!==null?(f=f.index,f<h?(p.flags|=2,h):f):(p.flags|=2,h)):(p.flags|=1048576,h)}function a(p){return e&&p.alternate===null&&(p.flags|=2),p}function o(p,h,f,v){return h===null||h.tag!==6?(h=zi(f,p.mode,v),h.return=p,h):(h=i(h,f),h.return=p,h)}function c(p,h,f,v){var E=f.type;return E===jr?u(p,h,f.props.children,v,f.key):h!==null&&(h.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Dt&&_o(E)===h.type)?(v=i(h,f.props),v.ref=en(p,h,f),v.return=p,v):(v=vs(f.type,f.key,f.props,null,p.mode,v),v.ref=en(p,h,f),v.return=p,v)}function d(p,h,f,v){return h===null||h.tag!==4||h.stateNode.containerInfo!==f.containerInfo||h.stateNode.implementation!==f.implementation?(h=Wi(f,p.mode,v),h.return=p,h):(h=i(h,f.children||[]),h.return=p,h)}function u(p,h,f,v,E){return h===null||h.tag!==7?(h=or(f,p.mode,v,E),h.return=p,h):(h=i(h,f),h.return=p,h)}function m(p,h,f){if(typeof h=="string"&&h!==""||typeof h=="number")return h=zi(""+h,p.mode,f),h.return=p,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Gn:return f=vs(h.type,h.key,h.props,null,p.mode,f),f.ref=en(p,null,h),f.return=p,f;case gr:return h=Wi(h,p.mode,f),h.return=p,h;case Dt:var v=h._init;return m(p,v(h._payload),f)}if(ln(h)||Yr(h))return h=or(h,p.mode,f,null),h.return=p,h;rs(p,h)}return null}function y(p,h,f,v){var E=h!==null?h.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return E!==null?null:o(p,h,""+f,v);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Gn:return f.key===E?c(p,h,f,v):null;case gr:return f.key===E?d(p,h,f,v):null;case Dt:return E=f._init,y(p,h,E(f._payload),v)}if(ln(f)||Yr(f))return E!==null?null:u(p,h,f,v,null);rs(p,f)}return null}function g(p,h,f,v,E){if(typeof v=="string"&&v!==""||typeof v=="number")return p=p.get(f)||null,o(h,p,""+v,E);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Gn:return p=p.get(v.key===null?f:v.key)||null,c(h,p,v,E);case gr:return p=p.get(v.key===null?f:v.key)||null,d(h,p,v,E);case Dt:var L=v._init;return g(p,h,f,L(v._payload),E)}if(ln(v)||Yr(v))return p=p.get(f)||null,u(h,p,v,E,null);rs(h,v)}return null}function N(p,h,f,v){for(var E=null,L=null,w=h,C=h=0,B=null;w!==null&&C<f.length;C++){w.index>C?(B=w,w=null):B=w.sibling;var A=y(p,w,f[C],v);if(A===null){w===null&&(w=B);break}e&&w&&A.alternate===null&&r(p,w),h=l(A,h,C),L===null?E=A:L.sibling=A,L=A,w=B}if(C===f.length)return n(p,w),K&&rr(p,C),E;if(w===null){for(;C<f.length;C++)w=m(p,f[C],v),w!==null&&(h=l(w,h,C),L===null?E=w:L.sibling=w,L=w);return K&&rr(p,C),E}for(w=s(p,w);C<f.length;C++)B=g(w,p,C,f[C],v),B!==null&&(e&&B.alternate!==null&&w.delete(B.key===null?C:B.key),h=l(B,h,C),L===null?E=B:L.sibling=B,L=B);return e&&w.forEach(function(Y){return r(p,Y)}),K&&rr(p,C),E}function j(p,h,f,v){var E=Yr(f);if(typeof E!="function")throw Error(k(150));if(f=E.call(f),f==null)throw Error(k(151));for(var L=E=null,w=h,C=h=0,B=null,A=f.next();w!==null&&!A.done;C++,A=f.next()){w.index>C?(B=w,w=null):B=w.sibling;var Y=y(p,w,A.value,v);if(Y===null){w===null&&(w=B);break}e&&w&&Y.alternate===null&&r(p,w),h=l(Y,h,C),L===null?E=Y:L.sibling=Y,L=Y,w=B}if(A.done)return n(p,w),K&&rr(p,C),E;if(w===null){for(;!A.done;C++,A=f.next())A=m(p,A.value,v),A!==null&&(h=l(A,h,C),L===null?E=A:L.sibling=A,L=A);return K&&rr(p,C),E}for(w=s(p,w);!A.done;C++,A=f.next())A=g(w,p,C,A.value,v),A!==null&&(e&&A.alternate!==null&&w.delete(A.key===null?C:A.key),h=l(A,h,C),L===null?E=A:L.sibling=A,L=A);return e&&w.forEach(function(pe){return r(p,pe)}),K&&rr(p,C),E}function T(p,h,f,v){if(typeof f=="object"&&f!==null&&f.type===jr&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Gn:e:{for(var E=f.key,L=h;L!==null;){if(L.key===E){if(E=f.type,E===jr){if(L.tag===7){n(p,L.sibling),h=i(L,f.props.children),h.return=p,p=h;break e}}else if(L.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Dt&&_o(E)===L.type){n(p,L.sibling),h=i(L,f.props),h.ref=en(p,L,f),h.return=p,p=h;break e}n(p,L);break}else r(p,L);L=L.sibling}f.type===jr?(h=or(f.props.children,p.mode,v,f.key),h.return=p,p=h):(v=vs(f.type,f.key,f.props,null,p.mode,v),v.ref=en(p,h,f),v.return=p,p=v)}return a(p);case gr:e:{for(L=f.key;h!==null;){if(h.key===L)if(h.tag===4&&h.stateNode.containerInfo===f.containerInfo&&h.stateNode.implementation===f.implementation){n(p,h.sibling),h=i(h,f.children||[]),h.return=p,p=h;break e}else{n(p,h);break}else r(p,h);h=h.sibling}h=Wi(f,p.mode,v),h.return=p,p=h}return a(p);case Dt:return L=f._init,T(p,h,L(f._payload),v)}if(ln(f))return N(p,h,f,v);if(Yr(f))return j(p,h,f,v);rs(p,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,h!==null&&h.tag===6?(n(p,h.sibling),h=i(h,f),h.return=p,p=h):(n(p,h),h=zi(f,p.mode,v),h.return=p,p=h),a(p)):n(p,h)}return T}var Mr=_d(!0),Id=_d(!1),Fs=Xt(null),Bs=null,br=null,ma=null;function fa(){ma=br=Bs=null}function xa(e){var r=Fs.current;Q(Fs),e._currentValue=r}function kl(e,r,n){for(;e!==null;){var s=e.alternate;if((e.childLanes&r)!==r?(e.childLanes|=r,s!==null&&(s.childLanes|=r)):s!==null&&(s.childLanes&r)!==r&&(s.childLanes|=r),e===n)break;e=e.return}}function Ar(e,r){Bs=e,ma=br=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&r&&(_e=!0),e.firstContext=null)}function Je(e){var r=e._currentValue;if(ma!==e)if(e={context:e,memoizedValue:r,next:null},br===null){if(Bs===null)throw Error(k(308));br=e,Bs.dependencies={lanes:0,firstContext:e}}else br=br.next=e;return r}var ir=null;function ya(e){ir===null?ir=[e]:ir.push(e)}function Ad(e,r,n,s){var i=r.interleaved;return i===null?(n.next=n,ya(r)):(n.next=i.next,i.next=n),r.interleaved=n,bt(e,s)}function bt(e,r){e.lanes|=r;var n=e.alternate;for(n!==null&&(n.lanes|=r),n=e,e=e.return;e!==null;)e.childLanes|=r,n=e.alternate,n!==null&&(n.childLanes|=r),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Pt=!1;function ga(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Dd(e,r){e=e.updateQueue,r.updateQueue===e&&(r.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Tt(e,r){return{eventTime:e,lane:r,tag:0,payload:null,callback:null,next:null}}function Gt(e,r,n){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,z&2){var i=s.pending;return i===null?r.next=r:(r.next=i.next,i.next=r),s.pending=r,bt(e,n)}return i=s.interleaved,i===null?(r.next=r,ya(s)):(r.next=i.next,i.next=r),s.interleaved=r,bt(e,n)}function fs(e,r,n){if(r=r.updateQueue,r!==null&&(r=r.shared,(n&4194240)!==0)){var s=r.lanes;s&=e.pendingLanes,n|=s,r.lanes=n,na(e,n)}}function Io(e,r){var n=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var i=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?i=l=a:l=l.next=a,n=n.next}while(n!==null);l===null?i=l=r:l=l.next=r}else i=l=r;n={baseState:s.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:s.shared,effects:s.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=r:e.next=r,n.lastBaseUpdate=r}function Ms(e,r,n,s){var i=e.updateQueue;Pt=!1;var l=i.firstBaseUpdate,a=i.lastBaseUpdate,o=i.shared.pending;if(o!==null){i.shared.pending=null;var c=o,d=c.next;c.next=null,a===null?l=d:a.next=d,a=c;var u=e.alternate;u!==null&&(u=u.updateQueue,o=u.lastBaseUpdate,o!==a&&(o===null?u.firstBaseUpdate=d:o.next=d,u.lastBaseUpdate=c))}if(l!==null){var m=i.baseState;a=0,u=d=c=null,o=l;do{var y=o.lane,g=o.eventTime;if((s&y)===y){u!==null&&(u=u.next={eventTime:g,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var N=e,j=o;switch(y=r,g=n,j.tag){case 1:if(N=j.payload,typeof N=="function"){m=N.call(g,m,y);break e}m=N;break e;case 3:N.flags=N.flags&-65537|128;case 0:if(N=j.payload,y=typeof N=="function"?N.call(g,m,y):N,y==null)break e;m=te({},m,y);break e;case 2:Pt=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,y=i.effects,y===null?i.effects=[o]:y.push(o))}else g={eventTime:g,lane:y,tag:o.tag,payload:o.payload,callback:o.callback,next:null},u===null?(d=u=g,c=m):u=u.next=g,a|=y;if(o=o.next,o===null){if(o=i.shared.pending,o===null)break;y=o,o=y.next,y.next=null,i.lastBaseUpdate=y,i.shared.pending=null}}while(!0);if(u===null&&(c=m),i.baseState=c,i.firstBaseUpdate=d,i.lastBaseUpdate=u,r=i.shared.interleaved,r!==null){i=r;do a|=i.lane,i=i.next;while(i!==r)}else l===null&&(i.shared.lanes=0);hr|=a,e.lanes=a,e.memoizedState=m}}function Ao(e,r,n){if(e=r.effects,r.effects=null,e!==null)for(r=0;r<e.length;r++){var s=e[r],i=s.callback;if(i!==null){if(s.callback=null,s=n,typeof i!="function")throw Error(k(191,i));i.call(s)}}}var Hn={},mt=Xt(Hn),Cn=Xt(Hn),Rn=Xt(Hn);function lr(e){if(e===Hn)throw Error(k(174));return e}function ja(e,r){switch($(Rn,r),$(Cn,e),$(mt,Hn),e=r.nodeType,e){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:ll(null,"");break;default:e=e===8?r.parentNode:r,r=e.namespaceURI||null,e=e.tagName,r=ll(r,e)}Q(mt),$(mt,r)}function Hr(){Q(mt),Q(Cn),Q(Rn)}function Pd(e){lr(Rn.current);var r=lr(mt.current),n=ll(r,e.type);r!==n&&($(Cn,e),$(mt,n))}function Na(e){Cn.current===e&&(Q(mt),Q(Cn))}var Z=Xt(0);function Hs(e){for(var r=e;r!==null;){if(r.tag===13){var n=r.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if(r.flags&128)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var Pi=[];function va(){for(var e=0;e<Pi.length;e++)Pi[e]._workInProgressVersionPrimary=null;Pi.length=0}var xs=Rt.ReactCurrentDispatcher,Fi=Rt.ReactCurrentBatchConfig,ur=0,ee=null,oe=null,ue=null,Us=!1,mn=!1,On=0,em=0;function je(){throw Error(k(321))}function Ea(e,r){if(r===null)return!1;for(var n=0;n<r.length&&n<e.length;n++)if(!lt(e[n],r[n]))return!1;return!0}function Sa(e,r,n,s,i,l){if(ur=l,ee=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,xs.current=e===null||e.memoizedState===null?sm:im,e=n(s,i),mn){l=0;do{if(mn=!1,On=0,25<=l)throw Error(k(301));l+=1,ue=oe=null,r.updateQueue=null,xs.current=lm,e=n(s,i)}while(mn)}if(xs.current=zs,r=oe!==null&&oe.next!==null,ur=0,ue=oe=ee=null,Us=!1,r)throw Error(k(300));return e}function Ta(){var e=On!==0;return On=0,e}function ut(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ue===null?ee.memoizedState=ue=e:ue=ue.next=e,ue}function Ke(){if(oe===null){var e=ee.alternate;e=e!==null?e.memoizedState:null}else e=oe.next;var r=ue===null?ee.memoizedState:ue.next;if(r!==null)ue=r,oe=e;else{if(e===null)throw Error(k(310));oe=e,e={memoizedState:oe.memoizedState,baseState:oe.baseState,baseQueue:oe.baseQueue,queue:oe.queue,next:null},ue===null?ee.memoizedState=ue=e:ue=ue.next=e}return ue}function _n(e,r){return typeof r=="function"?r(e):r}function Bi(e){var r=Ke(),n=r.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var s=oe,i=s.baseQueue,l=n.pending;if(l!==null){if(i!==null){var a=i.next;i.next=l.next,l.next=a}s.baseQueue=i=l,n.pending=null}if(i!==null){l=i.next,s=s.baseState;var o=a=null,c=null,d=l;do{var u=d.lane;if((ur&u)===u)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),s=d.hasEagerState?d.eagerState:e(s,d.action);else{var m={lane:u,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(o=c=m,a=s):c=c.next=m,ee.lanes|=u,hr|=u}d=d.next}while(d!==null&&d!==l);c===null?a=s:c.next=o,lt(s,r.memoizedState)||(_e=!0),r.memoizedState=s,r.baseState=a,r.baseQueue=c,n.lastRenderedState=s}if(e=n.interleaved,e!==null){i=e;do l=i.lane,ee.lanes|=l,hr|=l,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[r.memoizedState,n.dispatch]}function Mi(e){var r=Ke(),n=r.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var s=n.dispatch,i=n.pending,l=r.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do l=e(l,a.action),a=a.next;while(a!==i);lt(l,r.memoizedState)||(_e=!0),r.memoizedState=l,r.baseQueue===null&&(r.baseState=l),n.lastRenderedState=l}return[l,s]}function Fd(){}function Bd(e,r){var n=ee,s=Ke(),i=r(),l=!lt(s.memoizedState,i);if(l&&(s.memoizedState=i,_e=!0),s=s.queue,wa(Ud.bind(null,n,s,e),[e]),s.getSnapshot!==r||l||ue!==null&&ue.memoizedState.tag&1){if(n.flags|=2048,In(9,Hd.bind(null,n,s,i,r),void 0,null),he===null)throw Error(k(349));ur&30||Md(n,r,i)}return i}function Md(e,r,n){e.flags|=16384,e={getSnapshot:r,value:n},r=ee.updateQueue,r===null?(r={lastEffect:null,stores:null},ee.updateQueue=r,r.stores=[e]):(n=r.stores,n===null?r.stores=[e]:n.push(e))}function Hd(e,r,n,s){r.value=n,r.getSnapshot=s,zd(r)&&Wd(e)}function Ud(e,r,n){return n(function(){zd(r)&&Wd(e)})}function zd(e){var r=e.getSnapshot;e=e.value;try{var n=r();return!lt(e,n)}catch{return!0}}function Wd(e){var r=bt(e,1);r!==null&&st(r,e,1,-1)}function Do(e){var r=ut();return typeof e=="function"&&(e=e()),r.memoizedState=r.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:_n,lastRenderedState:e},r.queue=e,e=e.dispatch=nm.bind(null,ee,e),[r.memoizedState,e]}function In(e,r,n,s){return e={tag:e,create:r,destroy:n,deps:s,next:null},r=ee.updateQueue,r===null?(r={lastEffect:null,stores:null},ee.updateQueue=r,r.lastEffect=e.next=e):(n=r.lastEffect,n===null?r.lastEffect=e.next=e:(s=n.next,n.next=e,e.next=s,r.lastEffect=e)),e}function qd(){return Ke().memoizedState}function ys(e,r,n,s){var i=ut();ee.flags|=e,i.memoizedState=In(1|r,n,void 0,s===void 0?null:s)}function si(e,r,n,s){var i=Ke();s=s===void 0?null:s;var l=void 0;if(oe!==null){var a=oe.memoizedState;if(l=a.destroy,s!==null&&Ea(s,a.deps)){i.memoizedState=In(r,n,l,s);return}}ee.flags|=e,i.memoizedState=In(1|r,n,l,s)}function Po(e,r){return ys(8390656,8,e,r)}function wa(e,r){return si(2048,8,e,r)}function Gd(e,r){return si(4,2,e,r)}function $d(e,r){return si(4,4,e,r)}function Vd(e,r){if(typeof r=="function")return e=e(),r(e),function(){r(null)};if(r!=null)return e=e(),r.current=e,function(){r.current=null}}function Qd(e,r,n){return n=n!=null?n.concat([e]):null,si(4,4,Vd.bind(null,r,e),n)}function ka(){}function Yd(e,r){var n=Ke();r=r===void 0?null:r;var s=n.memoizedState;return s!==null&&r!==null&&Ea(r,s[1])?s[0]:(n.memoizedState=[e,r],e)}function Jd(e,r){var n=Ke();r=r===void 0?null:r;var s=n.memoizedState;return s!==null&&r!==null&&Ea(r,s[1])?s[0]:(e=e(),n.memoizedState=[e,r],e)}function Kd(e,r,n){return ur&21?(lt(n,r)||(n=rd(),ee.lanes|=n,hr|=n,e.baseState=!0),r):(e.baseState&&(e.baseState=!1,_e=!0),e.memoizedState=n)}function tm(e,r){var n=W;W=n!==0&&4>n?n:4,e(!0);var s=Fi.transition;Fi.transition={};try{e(!1),r()}finally{W=n,Fi.transition=s}}function Xd(){return Ke().memoizedState}function rm(e,r,n){var s=Vt(e);if(n={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null},Zd(e))eu(r,n);else if(n=Ad(e,r,n,s),n!==null){var i=Le();st(n,e,s,i),tu(n,r,s)}}function nm(e,r,n){var s=Vt(e),i={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null};if(Zd(e))eu(r,i);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=r.lastRenderedReducer,l!==null))try{var a=r.lastRenderedState,o=l(a,n);if(i.hasEagerState=!0,i.eagerState=o,lt(o,a)){var c=r.interleaved;c===null?(i.next=i,ya(r)):(i.next=c.next,c.next=i),r.interleaved=i;return}}catch{}finally{}n=Ad(e,r,i,s),n!==null&&(i=Le(),st(n,e,s,i),tu(n,r,s))}}function Zd(e){var r=e.alternate;return e===ee||r!==null&&r===ee}function eu(e,r){mn=Us=!0;var n=e.pending;n===null?r.next=r:(r.next=n.next,n.next=r),e.pending=r}function tu(e,r,n){if(n&4194240){var s=r.lanes;s&=e.pendingLanes,n|=s,r.lanes=n,na(e,n)}}var zs={readContext:Je,useCallback:je,useContext:je,useEffect:je,useImperativeHandle:je,useInsertionEffect:je,useLayoutEffect:je,useMemo:je,useReducer:je,useRef:je,useState:je,useDebugValue:je,useDeferredValue:je,useTransition:je,useMutableSource:je,useSyncExternalStore:je,useId:je,unstable_isNewReconciler:!1},sm={readContext:Je,useCallback:function(e,r){return ut().memoizedState=[e,r===void 0?null:r],e},useContext:Je,useEffect:Po,useImperativeHandle:function(e,r,n){return n=n!=null?n.concat([e]):null,ys(4194308,4,Vd.bind(null,r,e),n)},useLayoutEffect:function(e,r){return ys(4194308,4,e,r)},useInsertionEffect:function(e,r){return ys(4,2,e,r)},useMemo:function(e,r){var n=ut();return r=r===void 0?null:r,e=e(),n.memoizedState=[e,r],e},useReducer:function(e,r,n){var s=ut();return r=n!==void 0?n(r):r,s.memoizedState=s.baseState=r,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},s.queue=e,e=e.dispatch=rm.bind(null,ee,e),[s.memoizedState,e]},useRef:function(e){var r=ut();return e={current:e},r.memoizedState=e},useState:Do,useDebugValue:ka,useDeferredValue:function(e){return ut().memoizedState=e},useTransition:function(){var e=Do(!1),r=e[0];return e=tm.bind(null,e[1]),ut().memoizedState=e,[r,e]},useMutableSource:function(){},useSyncExternalStore:function(e,r,n){var s=ee,i=ut();if(K){if(n===void 0)throw Error(k(407));n=n()}else{if(n=r(),he===null)throw Error(k(349));ur&30||Md(s,r,n)}i.memoizedState=n;var l={value:n,getSnapshot:r};return i.queue=l,Po(Ud.bind(null,s,l,e),[e]),s.flags|=2048,In(9,Hd.bind(null,s,l,n,r),void 0,null),n},useId:function(){var e=ut(),r=he.identifierPrefix;if(K){var n=St,s=Et;n=(s&~(1<<32-nt(s)-1)).toString(32)+n,r=":"+r+"R"+n,n=On++,0<n&&(r+="H"+n.toString(32)),r+=":"}else n=em++,r=":"+r+"r"+n.toString(32)+":";return e.memoizedState=r},unstable_isNewReconciler:!1},im={readContext:Je,useCallback:Yd,useContext:Je,useEffect:wa,useImperativeHandle:Qd,useInsertionEffect:Gd,useLayoutEffect:$d,useMemo:Jd,useReducer:Bi,useRef:qd,useState:function(){return Bi(_n)},useDebugValue:ka,useDeferredValue:function(e){var r=Ke();return Kd(r,oe.memoizedState,e)},useTransition:function(){var e=Bi(_n)[0],r=Ke().memoizedState;return[e,r]},useMutableSource:Fd,useSyncExternalStore:Bd,useId:Xd,unstable_isNewReconciler:!1},lm={readContext:Je,useCallback:Yd,useContext:Je,useEffect:wa,useImperativeHandle:Qd,useInsertionEffect:Gd,useLayoutEffect:$d,useMemo:Jd,useReducer:Mi,useRef:qd,useState:function(){return Mi(_n)},useDebugValue:ka,useDeferredValue:function(e){var r=Ke();return oe===null?r.memoizedState=e:Kd(r,oe.memoizedState,e)},useTransition:function(){var e=Mi(_n)[0],r=Ke().memoizedState;return[e,r]},useMutableSource:Fd,useSyncExternalStore:Bd,useId:Xd,unstable_isNewReconciler:!1};function et(e,r){if(e&&e.defaultProps){r=te({},r),e=e.defaultProps;for(var n in e)r[n]===void 0&&(r[n]=e[n]);return r}return r}function bl(e,r,n,s){r=e.memoizedState,n=n(s,r),n=n==null?r:te({},r,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ii={isMounted:function(e){return(e=e._reactInternals)?xr(e)===e:!1},enqueueSetState:function(e,r,n){e=e._reactInternals;var s=Le(),i=Vt(e),l=Tt(s,i);l.payload=r,n!=null&&(l.callback=n),r=Gt(e,l,i),r!==null&&(st(r,e,i,s),fs(r,e,i))},enqueueReplaceState:function(e,r,n){e=e._reactInternals;var s=Le(),i=Vt(e),l=Tt(s,i);l.tag=1,l.payload=r,n!=null&&(l.callback=n),r=Gt(e,l,i),r!==null&&(st(r,e,i,s),fs(r,e,i))},enqueueForceUpdate:function(e,r){e=e._reactInternals;var n=Le(),s=Vt(e),i=Tt(n,s);i.tag=2,r!=null&&(i.callback=r),r=Gt(e,i,s),r!==null&&(st(r,e,s,n),fs(r,e,s))}};function Fo(e,r,n,s,i,l,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,l,a):r.prototype&&r.prototype.isPureReactComponent?!wn(n,s)||!wn(i,l):!0}function ru(e,r,n){var s=!1,i=Jt,l=r.contextType;return typeof l=="object"&&l!==null?l=Je(l):(i=Ae(r)?cr:Te.current,s=r.contextTypes,l=(s=s!=null)?Fr(e,i):Jt),r=new r(n,l),e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=ii,e.stateNode=r,r._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=l),r}function Bo(e,r,n,s){e=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(n,s),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(n,s),r.state!==e&&ii.enqueueReplaceState(r,r.state,null)}function Ll(e,r,n,s){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},ga(e);var l=r.contextType;typeof l=="object"&&l!==null?i.context=Je(l):(l=Ae(r)?cr:Te.current,i.context=Fr(e,l)),i.state=e.memoizedState,l=r.getDerivedStateFromProps,typeof l=="function"&&(bl(e,r,l,n),i.state=e.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(r=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),r!==i.state&&ii.enqueueReplaceState(i,i.state,null),Ms(e,n,i,s),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Ur(e,r){try{var n="",s=r;do n+=Ah(s),s=s.return;while(s);var i=n}catch(l){i=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:r,stack:i,digest:null}}function Hi(e,r,n){return{value:e,source:null,stack:n??null,digest:r??null}}function Cl(e,r){try{console.error(r.value)}catch(n){setTimeout(function(){throw n})}}var am=typeof WeakMap=="function"?WeakMap:Map;function nu(e,r,n){n=Tt(-1,n),n.tag=3,n.payload={element:null};var s=r.value;return n.callback=function(){qs||(qs=!0,Ml=s),Cl(e,r)},n}function su(e,r,n){n=Tt(-1,n),n.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var i=r.value;n.payload=function(){return s(i)},n.callback=function(){Cl(e,r)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){Cl(e,r),typeof s!="function"&&($t===null?$t=new Set([this]):$t.add(this));var a=r.stack;this.componentDidCatch(r.value,{componentStack:a!==null?a:""})}),n}function Mo(e,r,n){var s=e.pingCache;if(s===null){s=e.pingCache=new am;var i=new Set;s.set(r,i)}else i=s.get(r),i===void 0&&(i=new Set,s.set(r,i));i.has(n)||(i.add(n),e=vm.bind(null,e,r,n),r.then(e,e))}function Ho(e){do{var r;if((r=e.tag===13)&&(r=e.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return e;e=e.return}while(e!==null);return null}function Uo(e,r,n,s,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===r?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(r=Tt(-1,1),r.tag=2,Gt(n,r,1))),n.lanes|=1),e)}var om=Rt.ReactCurrentOwner,_e=!1;function ke(e,r,n,s){r.child=e===null?Id(r,null,n,s):Mr(r,e.child,n,s)}function zo(e,r,n,s,i){n=n.render;var l=r.ref;return Ar(r,i),s=Sa(e,r,n,s,l,i),n=Ta(),e!==null&&!_e?(r.updateQueue=e.updateQueue,r.flags&=-2053,e.lanes&=~i,Lt(e,r,i)):(K&&n&&ua(r),r.flags|=1,ke(e,r,s,i),r.child)}function Wo(e,r,n,s,i){if(e===null){var l=n.type;return typeof l=="function"&&!Aa(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(r.tag=15,r.type=l,iu(e,r,l,s,i)):(e=vs(n.type,null,s,r,r.mode,i),e.ref=r.ref,e.return=r,r.child=e)}if(l=e.child,!(e.lanes&i)){var a=l.memoizedProps;if(n=n.compare,n=n!==null?n:wn,n(a,s)&&e.ref===r.ref)return Lt(e,r,i)}return r.flags|=1,e=Qt(l,s),e.ref=r.ref,e.return=r,r.child=e}function iu(e,r,n,s,i){if(e!==null){var l=e.memoizedProps;if(wn(l,s)&&e.ref===r.ref)if(_e=!1,r.pendingProps=s=l,(e.lanes&i)!==0)e.flags&131072&&(_e=!0);else return r.lanes=e.lanes,Lt(e,r,i)}return Rl(e,r,n,s,i)}function lu(e,r,n){var s=r.pendingProps,i=s.children,l=e!==null?e.memoizedState:null;if(s.mode==="hidden")if(!(r.mode&1))r.memoizedState={baseLanes:0,cachePool:null,transitions:null},$(Cr,Fe),Fe|=n;else{if(!(n&1073741824))return e=l!==null?l.baseLanes|n:n,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:e,cachePool:null,transitions:null},r.updateQueue=null,$(Cr,Fe),Fe|=e,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=l!==null?l.baseLanes:n,$(Cr,Fe),Fe|=s}else l!==null?(s=l.baseLanes|n,r.memoizedState=null):s=n,$(Cr,Fe),Fe|=s;return ke(e,r,i,n),r.child}function au(e,r){var n=r.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(r.flags|=512,r.flags|=2097152)}function Rl(e,r,n,s,i){var l=Ae(n)?cr:Te.current;return l=Fr(r,l),Ar(r,i),n=Sa(e,r,n,s,l,i),s=Ta(),e!==null&&!_e?(r.updateQueue=e.updateQueue,r.flags&=-2053,e.lanes&=~i,Lt(e,r,i)):(K&&s&&ua(r),r.flags|=1,ke(e,r,n,i),r.child)}function qo(e,r,n,s,i){if(Ae(n)){var l=!0;As(r)}else l=!1;if(Ar(r,i),r.stateNode===null)gs(e,r),ru(r,n,s),Ll(r,n,s,i),s=!0;else if(e===null){var a=r.stateNode,o=r.memoizedProps;a.props=o;var c=a.context,d=n.contextType;typeof d=="object"&&d!==null?d=Je(d):(d=Ae(n)?cr:Te.current,d=Fr(r,d));var u=n.getDerivedStateFromProps,m=typeof u=="function"||typeof a.getSnapshotBeforeUpdate=="function";m||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==s||c!==d)&&Bo(r,a,s,d),Pt=!1;var y=r.memoizedState;a.state=y,Ms(r,s,a,i),c=r.memoizedState,o!==s||y!==c||Ie.current||Pt?(typeof u=="function"&&(bl(r,n,u,s),c=r.memoizedState),(o=Pt||Fo(r,n,o,s,y,c,d))?(m||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(r.flags|=4194308)):(typeof a.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=s,r.memoizedState=c),a.props=s,a.state=c,a.context=d,s=o):(typeof a.componentDidMount=="function"&&(r.flags|=4194308),s=!1)}else{a=r.stateNode,Dd(e,r),o=r.memoizedProps,d=r.type===r.elementType?o:et(r.type,o),a.props=d,m=r.pendingProps,y=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=Je(c):(c=Ae(n)?cr:Te.current,c=Fr(r,c));var g=n.getDerivedStateFromProps;(u=typeof g=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==m||y!==c)&&Bo(r,a,s,c),Pt=!1,y=r.memoizedState,a.state=y,Ms(r,s,a,i);var N=r.memoizedState;o!==m||y!==N||Ie.current||Pt?(typeof g=="function"&&(bl(r,n,g,s),N=r.memoizedState),(d=Pt||Fo(r,n,d,s,y,N,c)||!1)?(u||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(s,N,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(s,N,c)),typeof a.componentDidUpdate=="function"&&(r.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&y===e.memoizedState||(r.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&y===e.memoizedState||(r.flags|=1024),r.memoizedProps=s,r.memoizedState=N),a.props=s,a.state=N,a.context=c,s=d):(typeof a.componentDidUpdate!="function"||o===e.memoizedProps&&y===e.memoizedState||(r.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&y===e.memoizedState||(r.flags|=1024),s=!1)}return Ol(e,r,n,s,l,i)}function Ol(e,r,n,s,i,l){au(e,r);var a=(r.flags&128)!==0;if(!s&&!a)return i&&Co(r,n,!1),Lt(e,r,l);s=r.stateNode,om.current=r;var o=a&&typeof n.getDerivedStateFromError!="function"?null:s.render();return r.flags|=1,e!==null&&a?(r.child=Mr(r,e.child,null,l),r.child=Mr(r,null,o,l)):ke(e,r,o,l),r.memoizedState=s.state,i&&Co(r,n,!0),r.child}function ou(e){var r=e.stateNode;r.pendingContext?Lo(e,r.pendingContext,r.pendingContext!==r.context):r.context&&Lo(e,r.context,!1),ja(e,r.containerInfo)}function Go(e,r,n,s,i){return Br(),pa(i),r.flags|=256,ke(e,r,n,s),r.child}var _l={dehydrated:null,treeContext:null,retryLane:0};function Il(e){return{baseLanes:e,cachePool:null,transitions:null}}function cu(e,r,n){var s=r.pendingProps,i=Z.current,l=!1,a=(r.flags&128)!==0,o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:(i&2)!==0),o?(l=!0,r.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),$(Z,i&1),e===null)return wl(r),e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(r.mode&1?e.data==="$!"?r.lanes=8:r.lanes=1073741824:r.lanes=1,null):(a=s.children,e=s.fallback,l?(s=r.mode,l=r.child,a={mode:"hidden",children:a},!(s&1)&&l!==null?(l.childLanes=0,l.pendingProps=a):l=oi(a,s,0,null),e=or(e,s,n,null),l.return=r,e.return=r,l.sibling=e,r.child=l,r.child.memoizedState=Il(n),r.memoizedState=_l,e):ba(r,a));if(i=e.memoizedState,i!==null&&(o=i.dehydrated,o!==null))return cm(e,r,a,s,o,i,n);if(l){l=s.fallback,a=r.mode,i=e.child,o=i.sibling;var c={mode:"hidden",children:s.children};return!(a&1)&&r.child!==i?(s=r.child,s.childLanes=0,s.pendingProps=c,r.deletions=null):(s=Qt(i,c),s.subtreeFlags=i.subtreeFlags&14680064),o!==null?l=Qt(o,l):(l=or(l,a,n,null),l.flags|=2),l.return=r,s.return=r,s.sibling=l,r.child=s,s=l,l=r.child,a=e.child.memoizedState,a=a===null?Il(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},l.memoizedState=a,l.childLanes=e.childLanes&~n,r.memoizedState=_l,s}return l=e.child,e=l.sibling,s=Qt(l,{mode:"visible",children:s.children}),!(r.mode&1)&&(s.lanes=n),s.return=r,s.sibling=null,e!==null&&(n=r.deletions,n===null?(r.deletions=[e],r.flags|=16):n.push(e)),r.child=s,r.memoizedState=null,s}function ba(e,r){return r=oi({mode:"visible",children:r},e.mode,0,null),r.return=e,e.child=r}function ns(e,r,n,s){return s!==null&&pa(s),Mr(r,e.child,null,n),e=ba(r,r.pendingProps.children),e.flags|=2,r.memoizedState=null,e}function cm(e,r,n,s,i,l,a){if(n)return r.flags&256?(r.flags&=-257,s=Hi(Error(k(422))),ns(e,r,a,s)):r.memoizedState!==null?(r.child=e.child,r.flags|=128,null):(l=s.fallback,i=r.mode,s=oi({mode:"visible",children:s.children},i,0,null),l=or(l,i,a,null),l.flags|=2,s.return=r,l.return=r,s.sibling=l,r.child=s,r.mode&1&&Mr(r,e.child,null,a),r.child.memoizedState=Il(a),r.memoizedState=_l,l);if(!(r.mode&1))return ns(e,r,a,null);if(i.data==="$!"){if(s=i.nextSibling&&i.nextSibling.dataset,s)var o=s.dgst;return s=o,l=Error(k(419)),s=Hi(l,s,void 0),ns(e,r,a,s)}if(o=(a&e.childLanes)!==0,_e||o){if(s=he,s!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(s.suspendedLanes|a)?0:i,i!==0&&i!==l.retryLane&&(l.retryLane=i,bt(e,i),st(s,e,i,-1))}return Ia(),s=Hi(Error(k(421))),ns(e,r,a,s)}return i.data==="$?"?(r.flags|=128,r.child=e.child,r=Em.bind(null,e),i._reactRetry=r,null):(e=l.treeContext,Be=qt(i.nextSibling),Me=r,K=!0,rt=null,e!==null&&($e[Ve++]=Et,$e[Ve++]=St,$e[Ve++]=dr,Et=e.id,St=e.overflow,dr=r),r=ba(r,s.children),r.flags|=4096,r)}function $o(e,r,n){e.lanes|=r;var s=e.alternate;s!==null&&(s.lanes|=r),kl(e.return,r,n)}function Ui(e,r,n,s,i){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:i}:(l.isBackwards=r,l.rendering=null,l.renderingStartTime=0,l.last=s,l.tail=n,l.tailMode=i)}function du(e,r,n){var s=r.pendingProps,i=s.revealOrder,l=s.tail;if(ke(e,r,s.children,n),s=Z.current,s&2)s=s&1|2,r.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=r.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&$o(e,n,r);else if(e.tag===19)$o(e,n,r);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===r)break e;for(;e.sibling===null;){if(e.return===null||e.return===r)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if($(Z,s),!(r.mode&1))r.memoizedState=null;else switch(i){case"forwards":for(n=r.child,i=null;n!==null;)e=n.alternate,e!==null&&Hs(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=r.child,r.child=null):(i=n.sibling,n.sibling=null),Ui(r,!1,i,n,l);break;case"backwards":for(n=null,i=r.child,r.child=null;i!==null;){if(e=i.alternate,e!==null&&Hs(e)===null){r.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Ui(r,!0,n,null,l);break;case"together":Ui(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function gs(e,r){!(r.mode&1)&&e!==null&&(e.alternate=null,r.alternate=null,r.flags|=2)}function Lt(e,r,n){if(e!==null&&(r.dependencies=e.dependencies),hr|=r.lanes,!(n&r.childLanes))return null;if(e!==null&&r.child!==e.child)throw Error(k(153));if(r.child!==null){for(e=r.child,n=Qt(e,e.pendingProps),r.child=n,n.return=r;e.sibling!==null;)e=e.sibling,n=n.sibling=Qt(e,e.pendingProps),n.return=r;n.sibling=null}return r.child}function dm(e,r,n){switch(r.tag){case 3:ou(r),Br();break;case 5:Pd(r);break;case 1:Ae(r.type)&&As(r);break;case 4:ja(r,r.stateNode.containerInfo);break;case 10:var s=r.type._context,i=r.memoizedProps.value;$(Fs,s._currentValue),s._currentValue=i;break;case 13:if(s=r.memoizedState,s!==null)return s.dehydrated!==null?($(Z,Z.current&1),r.flags|=128,null):n&r.child.childLanes?cu(e,r,n):($(Z,Z.current&1),e=Lt(e,r,n),e!==null?e.sibling:null);$(Z,Z.current&1);break;case 19:if(s=(n&r.childLanes)!==0,e.flags&128){if(s)return du(e,r,n);r.flags|=128}if(i=r.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),$(Z,Z.current),s)break;return null;case 22:case 23:return r.lanes=0,lu(e,r,n)}return Lt(e,r,n)}var uu,Al,hu,pu;uu=function(e,r){for(var n=r.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===r)break;for(;n.sibling===null;){if(n.return===null||n.return===r)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Al=function(){};hu=function(e,r,n,s){var i=e.memoizedProps;if(i!==s){e=r.stateNode,lr(mt.current);var l=null;switch(n){case"input":i=rl(e,i),s=rl(e,s),l=[];break;case"select":i=te({},i,{value:void 0}),s=te({},s,{value:void 0}),l=[];break;case"textarea":i=il(e,i),s=il(e,s),l=[];break;default:typeof i.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=_s)}al(n,s);var a;n=null;for(d in i)if(!s.hasOwnProperty(d)&&i.hasOwnProperty(d)&&i[d]!=null)if(d==="style"){var o=i[d];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(gn.hasOwnProperty(d)?l||(l=[]):(l=l||[]).push(d,null));for(d in s){var c=s[d];if(o=i!=null?i[d]:void 0,s.hasOwnProperty(d)&&c!==o&&(c!=null||o!=null))if(d==="style")if(o){for(a in o)!o.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&o[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(l||(l=[]),l.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,o=o?o.__html:void 0,c!=null&&o!==c&&(l=l||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(l=l||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(gn.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&V("scroll",e),l||o===c||(l=[])):(l=l||[]).push(d,c))}n&&(l=l||[]).push("style",n);var d=l;(r.updateQueue=d)&&(r.flags|=4)}};pu=function(e,r,n,s){n!==s&&(r.flags|=4)};function tn(e,r){if(!K)switch(e.tailMode){case"hidden":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?r||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function Ne(e){var r=e.alternate!==null&&e.alternate.child===e.child,n=0,s=0;if(r)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,s|=i.subtreeFlags&14680064,s|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,s|=i.subtreeFlags,s|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=s,e.childLanes=n,r}function um(e,r,n){var s=r.pendingProps;switch(ha(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ne(r),null;case 1:return Ae(r.type)&&Is(),Ne(r),null;case 3:return s=r.stateNode,Hr(),Q(Ie),Q(Te),va(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(ts(r)?r.flags|=4:e===null||e.memoizedState.isDehydrated&&!(r.flags&256)||(r.flags|=1024,rt!==null&&(zl(rt),rt=null))),Al(e,r),Ne(r),null;case 5:Na(r);var i=lr(Rn.current);if(n=r.type,e!==null&&r.stateNode!=null)hu(e,r,n,s,i),e.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!s){if(r.stateNode===null)throw Error(k(166));return Ne(r),null}if(e=lr(mt.current),ts(r)){s=r.stateNode,n=r.type;var l=r.memoizedProps;switch(s[ht]=r,s[Ln]=l,e=(r.mode&1)!==0,n){case"dialog":V("cancel",s),V("close",s);break;case"iframe":case"object":case"embed":V("load",s);break;case"video":case"audio":for(i=0;i<on.length;i++)V(on[i],s);break;case"source":V("error",s);break;case"img":case"image":case"link":V("error",s),V("load",s);break;case"details":V("toggle",s);break;case"input":eo(s,l),V("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!l.multiple},V("invalid",s);break;case"textarea":ro(s,l),V("invalid",s)}al(n,l),i=null;for(var a in l)if(l.hasOwnProperty(a)){var o=l[a];a==="children"?typeof o=="string"?s.textContent!==o&&(l.suppressHydrationWarning!==!0&&es(s.textContent,o,e),i=["children",o]):typeof o=="number"&&s.textContent!==""+o&&(l.suppressHydrationWarning!==!0&&es(s.textContent,o,e),i=["children",""+o]):gn.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&V("scroll",s)}switch(n){case"input":$n(s),to(s,l,!0);break;case"textarea":$n(s),no(s);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(s.onclick=_s)}s=i,r.updateQueue=s,s!==null&&(r.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Uc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=a.createElement(n,{is:s.is}):(e=a.createElement(n),n==="select"&&(a=e,s.multiple?a.multiple=!0:s.size&&(a.size=s.size))):e=a.createElementNS(e,n),e[ht]=r,e[Ln]=s,uu(e,r,!1,!1),r.stateNode=e;e:{switch(a=ol(n,s),n){case"dialog":V("cancel",e),V("close",e),i=s;break;case"iframe":case"object":case"embed":V("load",e),i=s;break;case"video":case"audio":for(i=0;i<on.length;i++)V(on[i],e);i=s;break;case"source":V("error",e),i=s;break;case"img":case"image":case"link":V("error",e),V("load",e),i=s;break;case"details":V("toggle",e),i=s;break;case"input":eo(e,s),i=rl(e,s),V("invalid",e);break;case"option":i=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},i=te({},s,{value:void 0}),V("invalid",e);break;case"textarea":ro(e,s),i=il(e,s),V("invalid",e);break;default:i=s}al(n,i),o=i;for(l in o)if(o.hasOwnProperty(l)){var c=o[l];l==="style"?qc(e,c):l==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&zc(e,c)):l==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&jn(e,c):typeof c=="number"&&jn(e,""+c):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(gn.hasOwnProperty(l)?c!=null&&l==="onScroll"&&V("scroll",e):c!=null&&Kl(e,l,c,a))}switch(n){case"input":$n(e),to(e,s,!1);break;case"textarea":$n(e),no(e);break;case"option":s.value!=null&&e.setAttribute("value",""+Yt(s.value));break;case"select":e.multiple=!!s.multiple,l=s.value,l!=null?Rr(e,!!s.multiple,l,!1):s.defaultValue!=null&&Rr(e,!!s.multiple,s.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=_s)}switch(n){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return Ne(r),null;case 6:if(e&&r.stateNode!=null)pu(e,r,e.memoizedProps,s);else{if(typeof s!="string"&&r.stateNode===null)throw Error(k(166));if(n=lr(Rn.current),lr(mt.current),ts(r)){if(s=r.stateNode,n=r.memoizedProps,s[ht]=r,(l=s.nodeValue!==n)&&(e=Me,e!==null))switch(e.tag){case 3:es(s.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&es(s.nodeValue,n,(e.mode&1)!==0)}l&&(r.flags|=4)}else s=(n.nodeType===9?n:n.ownerDocument).createTextNode(s),s[ht]=r,r.stateNode=s}return Ne(r),null;case 13:if(Q(Z),s=r.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(K&&Be!==null&&r.mode&1&&!(r.flags&128))Od(),Br(),r.flags|=98560,l=!1;else if(l=ts(r),s!==null&&s.dehydrated!==null){if(e===null){if(!l)throw Error(k(318));if(l=r.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(k(317));l[ht]=r}else Br(),!(r.flags&128)&&(r.memoizedState=null),r.flags|=4;Ne(r),l=!1}else rt!==null&&(zl(rt),rt=null),l=!0;if(!l)return r.flags&65536?r:null}return r.flags&128?(r.lanes=n,r):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(r.child.flags|=8192,r.mode&1&&(e===null||Z.current&1?ce===0&&(ce=3):Ia())),r.updateQueue!==null&&(r.flags|=4),Ne(r),null);case 4:return Hr(),Al(e,r),e===null&&kn(r.stateNode.containerInfo),Ne(r),null;case 10:return xa(r.type._context),Ne(r),null;case 17:return Ae(r.type)&&Is(),Ne(r),null;case 19:if(Q(Z),l=r.memoizedState,l===null)return Ne(r),null;if(s=(r.flags&128)!==0,a=l.rendering,a===null)if(s)tn(l,!1);else{if(ce!==0||e!==null&&e.flags&128)for(e=r.child;e!==null;){if(a=Hs(e),a!==null){for(r.flags|=128,tn(l,!1),s=a.updateQueue,s!==null&&(r.updateQueue=s,r.flags|=4),r.subtreeFlags=0,s=n,n=r.child;n!==null;)l=n,e=s,l.flags&=14680066,a=l.alternate,a===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=a.childLanes,l.lanes=a.lanes,l.child=a.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=a.memoizedProps,l.memoizedState=a.memoizedState,l.updateQueue=a.updateQueue,l.type=a.type,e=a.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return $(Z,Z.current&1|2),r.child}e=e.sibling}l.tail!==null&&se()>zr&&(r.flags|=128,s=!0,tn(l,!1),r.lanes=4194304)}else{if(!s)if(e=Hs(a),e!==null){if(r.flags|=128,s=!0,n=e.updateQueue,n!==null&&(r.updateQueue=n,r.flags|=4),tn(l,!0),l.tail===null&&l.tailMode==="hidden"&&!a.alternate&&!K)return Ne(r),null}else 2*se()-l.renderingStartTime>zr&&n!==1073741824&&(r.flags|=128,s=!0,tn(l,!1),r.lanes=4194304);l.isBackwards?(a.sibling=r.child,r.child=a):(n=l.last,n!==null?n.sibling=a:r.child=a,l.last=a)}return l.tail!==null?(r=l.tail,l.rendering=r,l.tail=r.sibling,l.renderingStartTime=se(),r.sibling=null,n=Z.current,$(Z,s?n&1|2:n&1),r):(Ne(r),null);case 22:case 23:return _a(),s=r.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(r.flags|=8192),s&&r.mode&1?Fe&1073741824&&(Ne(r),r.subtreeFlags&6&&(r.flags|=8192)):Ne(r),null;case 24:return null;case 25:return null}throw Error(k(156,r.tag))}function hm(e,r){switch(ha(r),r.tag){case 1:return Ae(r.type)&&Is(),e=r.flags,e&65536?(r.flags=e&-65537|128,r):null;case 3:return Hr(),Q(Ie),Q(Te),va(),e=r.flags,e&65536&&!(e&128)?(r.flags=e&-65537|128,r):null;case 5:return Na(r),null;case 13:if(Q(Z),e=r.memoizedState,e!==null&&e.dehydrated!==null){if(r.alternate===null)throw Error(k(340));Br()}return e=r.flags,e&65536?(r.flags=e&-65537|128,r):null;case 19:return Q(Z),null;case 4:return Hr(),null;case 10:return xa(r.type._context),null;case 22:case 23:return _a(),null;case 24:return null;default:return null}}var ss=!1,Se=!1,pm=typeof WeakSet=="function"?WeakSet:Set,O=null;function Lr(e,r){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(s){re(e,r,s)}else n.current=null}function Dl(e,r,n){try{n()}catch(s){re(e,r,s)}}var Vo=!1;function mm(e,r){if(gl=Cs,e=gd(),da(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var i=s.anchorOffset,l=s.focusNode;s=s.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var a=0,o=-1,c=-1,d=0,u=0,m=e,y=null;t:for(;;){for(var g;m!==n||i!==0&&m.nodeType!==3||(o=a+i),m!==l||s!==0&&m.nodeType!==3||(c=a+s),m.nodeType===3&&(a+=m.nodeValue.length),(g=m.firstChild)!==null;)y=m,m=g;for(;;){if(m===e)break t;if(y===n&&++d===i&&(o=a),y===l&&++u===s&&(c=a),(g=m.nextSibling)!==null)break;m=y,y=m.parentNode}m=g}n=o===-1||c===-1?null:{start:o,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(jl={focusedElem:e,selectionRange:n},Cs=!1,O=r;O!==null;)if(r=O,e=r.child,(r.subtreeFlags&1028)!==0&&e!==null)e.return=r,O=e;else for(;O!==null;){r=O;try{var N=r.alternate;if(r.flags&1024)switch(r.tag){case 0:case 11:case 15:break;case 1:if(N!==null){var j=N.memoizedProps,T=N.memoizedState,p=r.stateNode,h=p.getSnapshotBeforeUpdate(r.elementType===r.type?j:et(r.type,j),T);p.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var f=r.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(v){re(r,r.return,v)}if(e=r.sibling,e!==null){e.return=r.return,O=e;break}O=r.return}return N=Vo,Vo=!1,N}function fn(e,r,n){var s=r.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var i=s=s.next;do{if((i.tag&e)===e){var l=i.destroy;i.destroy=void 0,l!==void 0&&Dl(r,n,l)}i=i.next}while(i!==s)}}function li(e,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var n=r=r.next;do{if((n.tag&e)===e){var s=n.create;n.destroy=s()}n=n.next}while(n!==r)}}function Pl(e){var r=e.ref;if(r!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof r=="function"?r(e):r.current=e}}function mu(e){var r=e.alternate;r!==null&&(e.alternate=null,mu(r)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(r=e.stateNode,r!==null&&(delete r[ht],delete r[Ln],delete r[El],delete r[Jp],delete r[Kp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function fu(e){return e.tag===5||e.tag===3||e.tag===4}function Qo(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||fu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fl(e,r,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,r?n.nodeType===8?n.parentNode.insertBefore(e,r):n.insertBefore(e,r):(n.nodeType===8?(r=n.parentNode,r.insertBefore(e,n)):(r=n,r.appendChild(e)),n=n._reactRootContainer,n!=null||r.onclick!==null||(r.onclick=_s));else if(s!==4&&(e=e.child,e!==null))for(Fl(e,r,n),e=e.sibling;e!==null;)Fl(e,r,n),e=e.sibling}function Bl(e,r,n){var s=e.tag;if(s===5||s===6)e=e.stateNode,r?n.insertBefore(e,r):n.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(Bl(e,r,n),e=e.sibling;e!==null;)Bl(e,r,n),e=e.sibling}var xe=null,tt=!1;function _t(e,r,n){for(n=n.child;n!==null;)xu(e,r,n),n=n.sibling}function xu(e,r,n){if(pt&&typeof pt.onCommitFiberUnmount=="function")try{pt.onCommitFiberUnmount(Xs,n)}catch{}switch(n.tag){case 5:Se||Lr(n,r);case 6:var s=xe,i=tt;xe=null,_t(e,r,n),xe=s,tt=i,xe!==null&&(tt?(e=xe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):xe.removeChild(n.stateNode));break;case 18:xe!==null&&(tt?(e=xe,n=n.stateNode,e.nodeType===8?Ai(e.parentNode,n):e.nodeType===1&&Ai(e,n),Sn(e)):Ai(xe,n.stateNode));break;case 4:s=xe,i=tt,xe=n.stateNode.containerInfo,tt=!0,_t(e,r,n),xe=s,tt=i;break;case 0:case 11:case 14:case 15:if(!Se&&(s=n.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){i=s=s.next;do{var l=i,a=l.destroy;l=l.tag,a!==void 0&&(l&2||l&4)&&Dl(n,r,a),i=i.next}while(i!==s)}_t(e,r,n);break;case 1:if(!Se&&(Lr(n,r),s=n.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=n.memoizedProps,s.state=n.memoizedState,s.componentWillUnmount()}catch(o){re(n,r,o)}_t(e,r,n);break;case 21:_t(e,r,n);break;case 22:n.mode&1?(Se=(s=Se)||n.memoizedState!==null,_t(e,r,n),Se=s):_t(e,r,n);break;default:_t(e,r,n)}}function Yo(e){var r=e.updateQueue;if(r!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new pm),r.forEach(function(s){var i=Sm.bind(null,e,s);n.has(s)||(n.add(s),s.then(i,i))})}}function Ze(e,r){var n=r.deletions;if(n!==null)for(var s=0;s<n.length;s++){var i=n[s];try{var l=e,a=r,o=a;e:for(;o!==null;){switch(o.tag){case 5:xe=o.stateNode,tt=!1;break e;case 3:xe=o.stateNode.containerInfo,tt=!0;break e;case 4:xe=o.stateNode.containerInfo,tt=!0;break e}o=o.return}if(xe===null)throw Error(k(160));xu(l,a,i),xe=null,tt=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(d){re(i,r,d)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)yu(r,e),r=r.sibling}function yu(e,r){var n=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ze(r,e),ct(e),s&4){try{fn(3,e,e.return),li(3,e)}catch(j){re(e,e.return,j)}try{fn(5,e,e.return)}catch(j){re(e,e.return,j)}}break;case 1:Ze(r,e),ct(e),s&512&&n!==null&&Lr(n,n.return);break;case 5:if(Ze(r,e),ct(e),s&512&&n!==null&&Lr(n,n.return),e.flags&32){var i=e.stateNode;try{jn(i,"")}catch(j){re(e,e.return,j)}}if(s&4&&(i=e.stateNode,i!=null)){var l=e.memoizedProps,a=n!==null?n.memoizedProps:l,o=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{o==="input"&&l.type==="radio"&&l.name!=null&&Mc(i,l),ol(o,a);var d=ol(o,l);for(a=0;a<c.length;a+=2){var u=c[a],m=c[a+1];u==="style"?qc(i,m):u==="dangerouslySetInnerHTML"?zc(i,m):u==="children"?jn(i,m):Kl(i,u,m,d)}switch(o){case"input":nl(i,l);break;case"textarea":Hc(i,l);break;case"select":var y=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!l.multiple;var g=l.value;g!=null?Rr(i,!!l.multiple,g,!1):y!==!!l.multiple&&(l.defaultValue!=null?Rr(i,!!l.multiple,l.defaultValue,!0):Rr(i,!!l.multiple,l.multiple?[]:"",!1))}i[Ln]=l}catch(j){re(e,e.return,j)}}break;case 6:if(Ze(r,e),ct(e),s&4){if(e.stateNode===null)throw Error(k(162));i=e.stateNode,l=e.memoizedProps;try{i.nodeValue=l}catch(j){re(e,e.return,j)}}break;case 3:if(Ze(r,e),ct(e),s&4&&n!==null&&n.memoizedState.isDehydrated)try{Sn(r.containerInfo)}catch(j){re(e,e.return,j)}break;case 4:Ze(r,e),ct(e);break;case 13:Ze(r,e),ct(e),i=e.child,i.flags&8192&&(l=i.memoizedState!==null,i.stateNode.isHidden=l,!l||i.alternate!==null&&i.alternate.memoizedState!==null||(Ra=se())),s&4&&Yo(e);break;case 22:if(u=n!==null&&n.memoizedState!==null,e.mode&1?(Se=(d=Se)||u,Ze(r,e),Se=d):Ze(r,e),ct(e),s&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!u&&e.mode&1)for(O=e,u=e.child;u!==null;){for(m=O=u;O!==null;){switch(y=O,g=y.child,y.tag){case 0:case 11:case 14:case 15:fn(4,y,y.return);break;case 1:Lr(y,y.return);var N=y.stateNode;if(typeof N.componentWillUnmount=="function"){s=y,n=y.return;try{r=s,N.props=r.memoizedProps,N.state=r.memoizedState,N.componentWillUnmount()}catch(j){re(s,n,j)}}break;case 5:Lr(y,y.return);break;case 22:if(y.memoizedState!==null){Ko(m);continue}}g!==null?(g.return=y,O=g):Ko(m)}u=u.sibling}e:for(u=null,m=e;;){if(m.tag===5){if(u===null){u=m;try{i=m.stateNode,d?(l=i.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(o=m.stateNode,c=m.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,o.style.display=Wc("display",a))}catch(j){re(e,e.return,j)}}}else if(m.tag===6){if(u===null)try{m.stateNode.nodeValue=d?"":m.memoizedProps}catch(j){re(e,e.return,j)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;u===m&&(u=null),m=m.return}u===m&&(u=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ze(r,e),ct(e),s&4&&Yo(e);break;case 21:break;default:Ze(r,e),ct(e)}}function ct(e){var r=e.flags;if(r&2){try{e:{for(var n=e.return;n!==null;){if(fu(n)){var s=n;break e}n=n.return}throw Error(k(160))}switch(s.tag){case 5:var i=s.stateNode;s.flags&32&&(jn(i,""),s.flags&=-33);var l=Qo(e);Bl(e,l,i);break;case 3:case 4:var a=s.stateNode.containerInfo,o=Qo(e);Fl(e,o,a);break;default:throw Error(k(161))}}catch(c){re(e,e.return,c)}e.flags&=-3}r&4096&&(e.flags&=-4097)}function fm(e,r,n){O=e,gu(e)}function gu(e,r,n){for(var s=(e.mode&1)!==0;O!==null;){var i=O,l=i.child;if(i.tag===22&&s){var a=i.memoizedState!==null||ss;if(!a){var o=i.alternate,c=o!==null&&o.memoizedState!==null||Se;o=ss;var d=Se;if(ss=a,(Se=c)&&!d)for(O=i;O!==null;)a=O,c=a.child,a.tag===22&&a.memoizedState!==null?Xo(i):c!==null?(c.return=a,O=c):Xo(i);for(;l!==null;)O=l,gu(l),l=l.sibling;O=i,ss=o,Se=d}Jo(e)}else i.subtreeFlags&8772&&l!==null?(l.return=i,O=l):Jo(e)}}function Jo(e){for(;O!==null;){var r=O;if(r.flags&8772){var n=r.alternate;try{if(r.flags&8772)switch(r.tag){case 0:case 11:case 15:Se||li(5,r);break;case 1:var s=r.stateNode;if(r.flags&4&&!Se)if(n===null)s.componentDidMount();else{var i=r.elementType===r.type?n.memoizedProps:et(r.type,n.memoizedProps);s.componentDidUpdate(i,n.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var l=r.updateQueue;l!==null&&Ao(r,l,s);break;case 3:var a=r.updateQueue;if(a!==null){if(n=null,r.child!==null)switch(r.child.tag){case 5:n=r.child.stateNode;break;case 1:n=r.child.stateNode}Ao(r,a,n)}break;case 5:var o=r.stateNode;if(n===null&&r.flags&4){n=o;var c=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var d=r.alternate;if(d!==null){var u=d.memoizedState;if(u!==null){var m=u.dehydrated;m!==null&&Sn(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}Se||r.flags&512&&Pl(r)}catch(y){re(r,r.return,y)}}if(r===e){O=null;break}if(n=r.sibling,n!==null){n.return=r.return,O=n;break}O=r.return}}function Ko(e){for(;O!==null;){var r=O;if(r===e){O=null;break}var n=r.sibling;if(n!==null){n.return=r.return,O=n;break}O=r.return}}function Xo(e){for(;O!==null;){var r=O;try{switch(r.tag){case 0:case 11:case 15:var n=r.return;try{li(4,r)}catch(c){re(r,n,c)}break;case 1:var s=r.stateNode;if(typeof s.componentDidMount=="function"){var i=r.return;try{s.componentDidMount()}catch(c){re(r,i,c)}}var l=r.return;try{Pl(r)}catch(c){re(r,l,c)}break;case 5:var a=r.return;try{Pl(r)}catch(c){re(r,a,c)}}}catch(c){re(r,r.return,c)}if(r===e){O=null;break}var o=r.sibling;if(o!==null){o.return=r.return,O=o;break}O=r.return}}var xm=Math.ceil,Ws=Rt.ReactCurrentDispatcher,La=Rt.ReactCurrentOwner,Ye=Rt.ReactCurrentBatchConfig,z=0,he=null,le=null,ye=0,Fe=0,Cr=Xt(0),ce=0,An=null,hr=0,ai=0,Ca=0,xn=null,Oe=null,Ra=0,zr=1/0,Nt=null,qs=!1,Ml=null,$t=null,is=!1,Ht=null,Gs=0,yn=0,Hl=null,js=-1,Ns=0;function Le(){return z&6?se():js!==-1?js:js=se()}function Vt(e){return e.mode&1?z&2&&ye!==0?ye&-ye:Zp.transition!==null?(Ns===0&&(Ns=rd()),Ns):(e=W,e!==0||(e=window.event,e=e===void 0?16:cd(e.type)),e):1}function st(e,r,n,s){if(50<yn)throw yn=0,Hl=null,Error(k(185));Fn(e,n,s),(!(z&2)||e!==he)&&(e===he&&(!(z&2)&&(ai|=n),ce===4&&Bt(e,ye)),De(e,s),n===1&&z===0&&!(r.mode&1)&&(zr=se()+500,ni&&Zt()))}function De(e,r){var n=e.callbackNode;Zh(e,r);var s=Ls(e,e===he?ye:0);if(s===0)n!==null&&lo(n),e.callbackNode=null,e.callbackPriority=0;else if(r=s&-s,e.callbackPriority!==r){if(n!=null&&lo(n),r===1)e.tag===0?Xp(Zo.bind(null,e)):Ld(Zo.bind(null,e)),Qp(function(){!(z&6)&&Zt()}),n=null;else{switch(nd(s)){case 1:n=ra;break;case 4:n=ed;break;case 16:n=bs;break;case 536870912:n=td;break;default:n=bs}n=ku(n,ju.bind(null,e))}e.callbackPriority=r,e.callbackNode=n}}function ju(e,r){if(js=-1,Ns=0,z&6)throw Error(k(327));var n=e.callbackNode;if(Dr()&&e.callbackNode!==n)return null;var s=Ls(e,e===he?ye:0);if(s===0)return null;if(s&30||s&e.expiredLanes||r)r=$s(e,s);else{r=s;var i=z;z|=2;var l=vu();(he!==e||ye!==r)&&(Nt=null,zr=se()+500,ar(e,r));do try{jm();break}catch(o){Nu(e,o)}while(!0);fa(),Ws.current=l,z=i,le!==null?r=0:(he=null,ye=0,r=ce)}if(r!==0){if(r===2&&(i=pl(e),i!==0&&(s=i,r=Ul(e,i))),r===1)throw n=An,ar(e,0),Bt(e,s),De(e,se()),n;if(r===6)Bt(e,s);else{if(i=e.current.alternate,!(s&30)&&!ym(i)&&(r=$s(e,s),r===2&&(l=pl(e),l!==0&&(s=l,r=Ul(e,l))),r===1))throw n=An,ar(e,0),Bt(e,s),De(e,se()),n;switch(e.finishedWork=i,e.finishedLanes=s,r){case 0:case 1:throw Error(k(345));case 2:nr(e,Oe,Nt);break;case 3:if(Bt(e,s),(s&130023424)===s&&(r=Ra+500-se(),10<r)){if(Ls(e,0)!==0)break;if(i=e.suspendedLanes,(i&s)!==s){Le(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=vl(nr.bind(null,e,Oe,Nt),r);break}nr(e,Oe,Nt);break;case 4:if(Bt(e,s),(s&4194240)===s)break;for(r=e.eventTimes,i=-1;0<s;){var a=31-nt(s);l=1<<a,a=r[a],a>i&&(i=a),s&=~l}if(s=i,s=se()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*xm(s/1960))-s,10<s){e.timeoutHandle=vl(nr.bind(null,e,Oe,Nt),s);break}nr(e,Oe,Nt);break;case 5:nr(e,Oe,Nt);break;default:throw Error(k(329))}}}return De(e,se()),e.callbackNode===n?ju.bind(null,e):null}function Ul(e,r){var n=xn;return e.current.memoizedState.isDehydrated&&(ar(e,r).flags|=256),e=$s(e,r),e!==2&&(r=Oe,Oe=n,r!==null&&zl(r)),e}function zl(e){Oe===null?Oe=e:Oe.push.apply(Oe,e)}function ym(e){for(var r=e;;){if(r.flags&16384){var n=r.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var s=0;s<n.length;s++){var i=n[s],l=i.getSnapshot;i=i.value;try{if(!lt(l(),i))return!1}catch{return!1}}}if(n=r.child,r.subtreeFlags&16384&&n!==null)n.return=r,r=n;else{if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function Bt(e,r){for(r&=~Ca,r&=~ai,e.suspendedLanes|=r,e.pingedLanes&=~r,e=e.expirationTimes;0<r;){var n=31-nt(r),s=1<<n;e[n]=-1,r&=~s}}function Zo(e){if(z&6)throw Error(k(327));Dr();var r=Ls(e,0);if(!(r&1))return De(e,se()),null;var n=$s(e,r);if(e.tag!==0&&n===2){var s=pl(e);s!==0&&(r=s,n=Ul(e,s))}if(n===1)throw n=An,ar(e,0),Bt(e,r),De(e,se()),n;if(n===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=r,nr(e,Oe,Nt),De(e,se()),null}function Oa(e,r){var n=z;z|=1;try{return e(r)}finally{z=n,z===0&&(zr=se()+500,ni&&Zt())}}function pr(e){Ht!==null&&Ht.tag===0&&!(z&6)&&Dr();var r=z;z|=1;var n=Ye.transition,s=W;try{if(Ye.transition=null,W=1,e)return e()}finally{W=s,Ye.transition=n,z=r,!(z&6)&&Zt()}}function _a(){Fe=Cr.current,Q(Cr)}function ar(e,r){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Vp(n)),le!==null)for(n=le.return;n!==null;){var s=n;switch(ha(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&Is();break;case 3:Hr(),Q(Ie),Q(Te),va();break;case 5:Na(s);break;case 4:Hr();break;case 13:Q(Z);break;case 19:Q(Z);break;case 10:xa(s.type._context);break;case 22:case 23:_a()}n=n.return}if(he=e,le=e=Qt(e.current,null),ye=Fe=r,ce=0,An=null,Ca=ai=hr=0,Oe=xn=null,ir!==null){for(r=0;r<ir.length;r++)if(n=ir[r],s=n.interleaved,s!==null){n.interleaved=null;var i=s.next,l=n.pending;if(l!==null){var a=l.next;l.next=i,s.next=a}n.pending=s}ir=null}return e}function Nu(e,r){do{var n=le;try{if(fa(),xs.current=zs,Us){for(var s=ee.memoizedState;s!==null;){var i=s.queue;i!==null&&(i.pending=null),s=s.next}Us=!1}if(ur=0,ue=oe=ee=null,mn=!1,On=0,La.current=null,n===null||n.return===null){ce=1,An=r,le=null;break}e:{var l=e,a=n.return,o=n,c=r;if(r=ye,o.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,u=o,m=u.tag;if(!(u.mode&1)&&(m===0||m===11||m===15)){var y=u.alternate;y?(u.updateQueue=y.updateQueue,u.memoizedState=y.memoizedState,u.lanes=y.lanes):(u.updateQueue=null,u.memoizedState=null)}var g=Ho(a);if(g!==null){g.flags&=-257,Uo(g,a,o,l,r),g.mode&1&&Mo(l,d,r),r=g,c=d;var N=r.updateQueue;if(N===null){var j=new Set;j.add(c),r.updateQueue=j}else N.add(c);break e}else{if(!(r&1)){Mo(l,d,r),Ia();break e}c=Error(k(426))}}else if(K&&o.mode&1){var T=Ho(a);if(T!==null){!(T.flags&65536)&&(T.flags|=256),Uo(T,a,o,l,r),pa(Ur(c,o));break e}}l=c=Ur(c,o),ce!==4&&(ce=2),xn===null?xn=[l]:xn.push(l),l=a;do{switch(l.tag){case 3:l.flags|=65536,r&=-r,l.lanes|=r;var p=nu(l,c,r);Io(l,p);break e;case 1:o=c;var h=l.type,f=l.stateNode;if(!(l.flags&128)&&(typeof h.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&($t===null||!$t.has(f)))){l.flags|=65536,r&=-r,l.lanes|=r;var v=su(l,o,r);Io(l,v);break e}}l=l.return}while(l!==null)}Su(n)}catch(E){r=E,le===n&&n!==null&&(le=n=n.return);continue}break}while(!0)}function vu(){var e=Ws.current;return Ws.current=zs,e===null?zs:e}function Ia(){(ce===0||ce===3||ce===2)&&(ce=4),he===null||!(hr&268435455)&&!(ai&268435455)||Bt(he,ye)}function $s(e,r){var n=z;z|=2;var s=vu();(he!==e||ye!==r)&&(Nt=null,ar(e,r));do try{gm();break}catch(i){Nu(e,i)}while(!0);if(fa(),z=n,Ws.current=s,le!==null)throw Error(k(261));return he=null,ye=0,ce}function gm(){for(;le!==null;)Eu(le)}function jm(){for(;le!==null&&!qh();)Eu(le)}function Eu(e){var r=wu(e.alternate,e,Fe);e.memoizedProps=e.pendingProps,r===null?Su(e):le=r,La.current=null}function Su(e){var r=e;do{var n=r.alternate;if(e=r.return,r.flags&32768){if(n=hm(n,r),n!==null){n.flags&=32767,le=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ce=6,le=null;return}}else if(n=um(n,r,Fe),n!==null){le=n;return}if(r=r.sibling,r!==null){le=r;return}le=r=e}while(r!==null);ce===0&&(ce=5)}function nr(e,r,n){var s=W,i=Ye.transition;try{Ye.transition=null,W=1,Nm(e,r,n,s)}finally{Ye.transition=i,W=s}return null}function Nm(e,r,n,s){do Dr();while(Ht!==null);if(z&6)throw Error(k(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(ep(e,l),e===he&&(le=he=null,ye=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||is||(is=!0,ku(bs,function(){return Dr(),null})),l=(n.flags&15990)!==0,n.subtreeFlags&15990||l){l=Ye.transition,Ye.transition=null;var a=W;W=1;var o=z;z|=4,La.current=null,mm(e,n),yu(n,e),Hp(jl),Cs=!!gl,jl=gl=null,e.current=n,fm(n),Gh(),z=o,W=a,Ye.transition=l}else e.current=n;if(is&&(is=!1,Ht=e,Gs=i),l=e.pendingLanes,l===0&&($t=null),Qh(n.stateNode),De(e,se()),r!==null)for(s=e.onRecoverableError,n=0;n<r.length;n++)i=r[n],s(i.value,{componentStack:i.stack,digest:i.digest});if(qs)throw qs=!1,e=Ml,Ml=null,e;return Gs&1&&e.tag!==0&&Dr(),l=e.pendingLanes,l&1?e===Hl?yn++:(yn=0,Hl=e):yn=0,Zt(),null}function Dr(){if(Ht!==null){var e=nd(Gs),r=Ye.transition,n=W;try{if(Ye.transition=null,W=16>e?16:e,Ht===null)var s=!1;else{if(e=Ht,Ht=null,Gs=0,z&6)throw Error(k(331));var i=z;for(z|=4,O=e.current;O!==null;){var l=O,a=l.child;if(O.flags&16){var o=l.deletions;if(o!==null){for(var c=0;c<o.length;c++){var d=o[c];for(O=d;O!==null;){var u=O;switch(u.tag){case 0:case 11:case 15:fn(8,u,l)}var m=u.child;if(m!==null)m.return=u,O=m;else for(;O!==null;){u=O;var y=u.sibling,g=u.return;if(mu(u),u===d){O=null;break}if(y!==null){y.return=g,O=y;break}O=g}}}var N=l.alternate;if(N!==null){var j=N.child;if(j!==null){N.child=null;do{var T=j.sibling;j.sibling=null,j=T}while(j!==null)}}O=l}}if(l.subtreeFlags&2064&&a!==null)a.return=l,O=a;else e:for(;O!==null;){if(l=O,l.flags&2048)switch(l.tag){case 0:case 11:case 15:fn(9,l,l.return)}var p=l.sibling;if(p!==null){p.return=l.return,O=p;break e}O=l.return}}var h=e.current;for(O=h;O!==null;){a=O;var f=a.child;if(a.subtreeFlags&2064&&f!==null)f.return=a,O=f;else e:for(a=h;O!==null;){if(o=O,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:li(9,o)}}catch(E){re(o,o.return,E)}if(o===a){O=null;break e}var v=o.sibling;if(v!==null){v.return=o.return,O=v;break e}O=o.return}}if(z=i,Zt(),pt&&typeof pt.onPostCommitFiberRoot=="function")try{pt.onPostCommitFiberRoot(Xs,e)}catch{}s=!0}return s}finally{W=n,Ye.transition=r}}return!1}function ec(e,r,n){r=Ur(n,r),r=nu(e,r,1),e=Gt(e,r,1),r=Le(),e!==null&&(Fn(e,1,r),De(e,r))}function re(e,r,n){if(e.tag===3)ec(e,e,n);else for(;r!==null;){if(r.tag===3){ec(r,e,n);break}else if(r.tag===1){var s=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&($t===null||!$t.has(s))){e=Ur(n,e),e=su(r,e,1),r=Gt(r,e,1),e=Le(),r!==null&&(Fn(r,1,e),De(r,e));break}}r=r.return}}function vm(e,r,n){var s=e.pingCache;s!==null&&s.delete(r),r=Le(),e.pingedLanes|=e.suspendedLanes&n,he===e&&(ye&n)===n&&(ce===4||ce===3&&(ye&130023424)===ye&&500>se()-Ra?ar(e,0):Ca|=n),De(e,r)}function Tu(e,r){r===0&&(e.mode&1?(r=Yn,Yn<<=1,!(Yn&130023424)&&(Yn=4194304)):r=1);var n=Le();e=bt(e,r),e!==null&&(Fn(e,r,n),De(e,n))}function Em(e){var r=e.memoizedState,n=0;r!==null&&(n=r.retryLane),Tu(e,n)}function Sm(e,r){var n=0;switch(e.tag){case 13:var s=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(k(314))}s!==null&&s.delete(r),Tu(e,n)}var wu;wu=function(e,r,n){if(e!==null)if(e.memoizedProps!==r.pendingProps||Ie.current)_e=!0;else{if(!(e.lanes&n)&&!(r.flags&128))return _e=!1,dm(e,r,n);_e=!!(e.flags&131072)}else _e=!1,K&&r.flags&1048576&&Cd(r,Ps,r.index);switch(r.lanes=0,r.tag){case 2:var s=r.type;gs(e,r),e=r.pendingProps;var i=Fr(r,Te.current);Ar(r,n),i=Sa(null,r,s,e,i,n);var l=Ta();return r.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,Ae(s)?(l=!0,As(r)):l=!1,r.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,ga(r),i.updater=ii,r.stateNode=i,i._reactInternals=r,Ll(r,s,e,n),r=Ol(null,r,s,!0,l,n)):(r.tag=0,K&&l&&ua(r),ke(null,r,i,n),r=r.child),r;case 16:s=r.elementType;e:{switch(gs(e,r),e=r.pendingProps,i=s._init,s=i(s._payload),r.type=s,i=r.tag=wm(s),e=et(s,e),i){case 0:r=Rl(null,r,s,e,n);break e;case 1:r=qo(null,r,s,e,n);break e;case 11:r=zo(null,r,s,e,n);break e;case 14:r=Wo(null,r,s,et(s.type,e),n);break e}throw Error(k(306,s,""))}return r;case 0:return s=r.type,i=r.pendingProps,i=r.elementType===s?i:et(s,i),Rl(e,r,s,i,n);case 1:return s=r.type,i=r.pendingProps,i=r.elementType===s?i:et(s,i),qo(e,r,s,i,n);case 3:e:{if(ou(r),e===null)throw Error(k(387));s=r.pendingProps,l=r.memoizedState,i=l.element,Dd(e,r),Ms(r,s,null,n);var a=r.memoizedState;if(s=a.element,l.isDehydrated)if(l={element:s,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},r.updateQueue.baseState=l,r.memoizedState=l,r.flags&256){i=Ur(Error(k(423)),r),r=Go(e,r,s,n,i);break e}else if(s!==i){i=Ur(Error(k(424)),r),r=Go(e,r,s,n,i);break e}else for(Be=qt(r.stateNode.containerInfo.firstChild),Me=r,K=!0,rt=null,n=Id(r,null,s,n),r.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Br(),s===i){r=Lt(e,r,n);break e}ke(e,r,s,n)}r=r.child}return r;case 5:return Pd(r),e===null&&wl(r),s=r.type,i=r.pendingProps,l=e!==null?e.memoizedProps:null,a=i.children,Nl(s,i)?a=null:l!==null&&Nl(s,l)&&(r.flags|=32),au(e,r),ke(e,r,a,n),r.child;case 6:return e===null&&wl(r),null;case 13:return cu(e,r,n);case 4:return ja(r,r.stateNode.containerInfo),s=r.pendingProps,e===null?r.child=Mr(r,null,s,n):ke(e,r,s,n),r.child;case 11:return s=r.type,i=r.pendingProps,i=r.elementType===s?i:et(s,i),zo(e,r,s,i,n);case 7:return ke(e,r,r.pendingProps,n),r.child;case 8:return ke(e,r,r.pendingProps.children,n),r.child;case 12:return ke(e,r,r.pendingProps.children,n),r.child;case 10:e:{if(s=r.type._context,i=r.pendingProps,l=r.memoizedProps,a=i.value,$(Fs,s._currentValue),s._currentValue=a,l!==null)if(lt(l.value,a)){if(l.children===i.children&&!Ie.current){r=Lt(e,r,n);break e}}else for(l=r.child,l!==null&&(l.return=r);l!==null;){var o=l.dependencies;if(o!==null){a=l.child;for(var c=o.firstContext;c!==null;){if(c.context===s){if(l.tag===1){c=Tt(-1,n&-n),c.tag=2;var d=l.updateQueue;if(d!==null){d=d.shared;var u=d.pending;u===null?c.next=c:(c.next=u.next,u.next=c),d.pending=c}}l.lanes|=n,c=l.alternate,c!==null&&(c.lanes|=n),kl(l.return,n,r),o.lanes|=n;break}c=c.next}}else if(l.tag===10)a=l.type===r.type?null:l.child;else if(l.tag===18){if(a=l.return,a===null)throw Error(k(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),kl(a,n,r),a=l.sibling}else a=l.child;if(a!==null)a.return=l;else for(a=l;a!==null;){if(a===r){a=null;break}if(l=a.sibling,l!==null){l.return=a.return,a=l;break}a=a.return}l=a}ke(e,r,i.children,n),r=r.child}return r;case 9:return i=r.type,s=r.pendingProps.children,Ar(r,n),i=Je(i),s=s(i),r.flags|=1,ke(e,r,s,n),r.child;case 14:return s=r.type,i=et(s,r.pendingProps),i=et(s.type,i),Wo(e,r,s,i,n);case 15:return iu(e,r,r.type,r.pendingProps,n);case 17:return s=r.type,i=r.pendingProps,i=r.elementType===s?i:et(s,i),gs(e,r),r.tag=1,Ae(s)?(e=!0,As(r)):e=!1,Ar(r,n),ru(r,s,i),Ll(r,s,i,n),Ol(null,r,s,!0,e,n);case 19:return du(e,r,n);case 22:return lu(e,r,n)}throw Error(k(156,r.tag))};function ku(e,r){return Zc(e,r)}function Tm(e,r,n,s){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qe(e,r,n,s){return new Tm(e,r,n,s)}function Aa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function wm(e){if(typeof e=="function")return Aa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Zl)return 11;if(e===ea)return 14}return 2}function Qt(e,r){var n=e.alternate;return n===null?(n=Qe(e.tag,r,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=r,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,r=e.dependencies,n.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function vs(e,r,n,s,i,l){var a=2;if(s=e,typeof e=="function")Aa(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case jr:return or(n.children,i,l,r);case Xl:a=8,i|=8;break;case Xi:return e=Qe(12,n,r,i|2),e.elementType=Xi,e.lanes=l,e;case Zi:return e=Qe(13,n,r,i),e.elementType=Zi,e.lanes=l,e;case el:return e=Qe(19,n,r,i),e.elementType=el,e.lanes=l,e;case Pc:return oi(n,i,l,r);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ac:a=10;break e;case Dc:a=9;break e;case Zl:a=11;break e;case ea:a=14;break e;case Dt:a=16,s=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return r=Qe(a,n,r,i),r.elementType=e,r.type=s,r.lanes=l,r}function or(e,r,n,s){return e=Qe(7,e,s,r),e.lanes=n,e}function oi(e,r,n,s){return e=Qe(22,e,s,r),e.elementType=Pc,e.lanes=n,e.stateNode={isHidden:!1},e}function zi(e,r,n){return e=Qe(6,e,null,r),e.lanes=n,e}function Wi(e,r,n){return r=Qe(4,e.children!==null?e.children:[],e.key,r),r.lanes=n,r.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},r}function km(e,r,n,s,i){this.tag=r,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Si(0),this.expirationTimes=Si(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Si(0),this.identifierPrefix=s,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Da(e,r,n,s,i,l,a,o,c){return e=new km(e,r,n,o,c),r===1?(r=1,l===!0&&(r|=8)):r=0,l=Qe(3,null,null,r),e.current=l,l.stateNode=e,l.memoizedState={element:s,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ga(l),e}function bm(e,r,n){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:gr,key:s==null?null:""+s,children:e,containerInfo:r,implementation:n}}function bu(e){if(!e)return Jt;e=e._reactInternals;e:{if(xr(e)!==e||e.tag!==1)throw Error(k(170));var r=e;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(Ae(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(k(171))}if(e.tag===1){var n=e.type;if(Ae(n))return bd(e,n,r)}return r}function Lu(e,r,n,s,i,l,a,o,c){return e=Da(n,s,!0,e,i,l,a,o,c),e.context=bu(null),n=e.current,s=Le(),i=Vt(n),l=Tt(s,i),l.callback=r??null,Gt(n,l,i),e.current.lanes=i,Fn(e,i,s),De(e,s),e}function ci(e,r,n,s){var i=r.current,l=Le(),a=Vt(i);return n=bu(n),r.context===null?r.context=n:r.pendingContext=n,r=Tt(l,a),r.payload={element:e},s=s===void 0?null:s,s!==null&&(r.callback=s),e=Gt(i,r,a),e!==null&&(st(e,i,a,l),fs(e,i,a)),a}function Vs(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function tc(e,r){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<r?n:r}}function Pa(e,r){tc(e,r),(e=e.alternate)&&tc(e,r)}function Lm(){return null}var Cu=typeof reportError=="function"?reportError:function(e){console.error(e)};function Fa(e){this._internalRoot=e}di.prototype.render=Fa.prototype.render=function(e){var r=this._internalRoot;if(r===null)throw Error(k(409));ci(e,r,null,null)};di.prototype.unmount=Fa.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var r=e.containerInfo;pr(function(){ci(null,e,null,null)}),r[kt]=null}};function di(e){this._internalRoot=e}di.prototype.unstable_scheduleHydration=function(e){if(e){var r=ld();e={blockedOn:null,target:e,priority:r};for(var n=0;n<Ft.length&&r!==0&&r<Ft[n].priority;n++);Ft.splice(n,0,e),n===0&&od(e)}};function Ba(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ui(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function rc(){}function Cm(e,r,n,s,i){if(i){if(typeof s=="function"){var l=s;s=function(){var d=Vs(a);l.call(d)}}var a=Lu(r,s,e,0,null,!1,!1,"",rc);return e._reactRootContainer=a,e[kt]=a.current,kn(e.nodeType===8?e.parentNode:e),pr(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof s=="function"){var o=s;s=function(){var d=Vs(c);o.call(d)}}var c=Da(e,0,!1,null,null,!1,!1,"",rc);return e._reactRootContainer=c,e[kt]=c.current,kn(e.nodeType===8?e.parentNode:e),pr(function(){ci(r,c,n,s)}),c}function hi(e,r,n,s,i){var l=n._reactRootContainer;if(l){var a=l;if(typeof i=="function"){var o=i;i=function(){var c=Vs(a);o.call(c)}}ci(r,a,e,i)}else a=Cm(n,r,e,i,s);return Vs(a)}sd=function(e){switch(e.tag){case 3:var r=e.stateNode;if(r.current.memoizedState.isDehydrated){var n=an(r.pendingLanes);n!==0&&(na(r,n|1),De(r,se()),!(z&6)&&(zr=se()+500,Zt()))}break;case 13:pr(function(){var s=bt(e,1);if(s!==null){var i=Le();st(s,e,1,i)}}),Pa(e,1)}};sa=function(e){if(e.tag===13){var r=bt(e,134217728);if(r!==null){var n=Le();st(r,e,134217728,n)}Pa(e,134217728)}};id=function(e){if(e.tag===13){var r=Vt(e),n=bt(e,r);if(n!==null){var s=Le();st(n,e,r,s)}Pa(e,r)}};ld=function(){return W};ad=function(e,r){var n=W;try{return W=e,r()}finally{W=n}};dl=function(e,r,n){switch(r){case"input":if(nl(e,n),r=n.name,n.type==="radio"&&r!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<n.length;r++){var s=n[r];if(s!==e&&s.form===e.form){var i=ri(s);if(!i)throw Error(k(90));Bc(s),nl(s,i)}}}break;case"textarea":Hc(e,n);break;case"select":r=n.value,r!=null&&Rr(e,!!n.multiple,r,!1)}};Vc=Oa;Qc=pr;var Rm={usingClientEntryPoint:!1,Events:[Mn,Sr,ri,Gc,$c,Oa]},rn={findFiberByHostInstance:sr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Om={bundleType:rn.bundleType,version:rn.version,rendererPackageName:rn.rendererPackageName,rendererConfig:rn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Rt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Kc(e),e===null?null:e.stateNode},findFiberByHostInstance:rn.findFiberByHostInstance||Lm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ls=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ls.isDisabled&&ls.supportsFiber)try{Xs=ls.inject(Om),pt=ls}catch{}}Ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rm;Ue.createPortal=function(e,r){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ba(r))throw Error(k(200));return bm(e,r,null,n)};Ue.createRoot=function(e,r){if(!Ba(e))throw Error(k(299));var n=!1,s="",i=Cu;return r!=null&&(r.unstable_strictMode===!0&&(n=!0),r.identifierPrefix!==void 0&&(s=r.identifierPrefix),r.onRecoverableError!==void 0&&(i=r.onRecoverableError)),r=Da(e,1,!1,null,null,n,!1,s,i),e[kt]=r.current,kn(e.nodeType===8?e.parentNode:e),new Fa(r)};Ue.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var r=e._reactInternals;if(r===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=Kc(r),e=e===null?null:e.stateNode,e};Ue.flushSync=function(e){return pr(e)};Ue.hydrate=function(e,r,n){if(!ui(r))throw Error(k(200));return hi(null,e,r,!0,n)};Ue.hydrateRoot=function(e,r,n){if(!Ba(e))throw Error(k(405));var s=n!=null&&n.hydratedSources||null,i=!1,l="",a=Cu;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),r=Lu(r,null,e,1,n??null,i,!1,l,a),e[kt]=r.current,kn(e),s)for(e=0;e<s.length;e++)n=s[e],i=n._getVersion,i=i(n._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[n,i]:r.mutableSourceEagerHydrationData.push(n,i);return new di(r)};Ue.render=function(e,r,n){if(!ui(r))throw Error(k(200));return hi(null,e,r,!1,n)};Ue.unmountComponentAtNode=function(e){if(!ui(e))throw Error(k(40));return e._reactRootContainer?(pr(function(){hi(null,null,e,!1,function(){e._reactRootContainer=null,e[kt]=null})}),!0):!1};Ue.unstable_batchedUpdates=Oa;Ue.unstable_renderSubtreeIntoContainer=function(e,r,n,s){if(!ui(n))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return hi(e,r,n,!1,s)};Ue.version="18.3.1-next-f1338f8080-20240426";function Ru(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ru)}catch(e){console.error(e)}}Ru(),Rc.exports=Ue;var _m=Rc.exports,nc=_m;Ji.createRoot=nc.createRoot,Ji.hydrateRoot=nc.hydrateRoot;/**
 * react-router v7.18.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Ma=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,Ou=/^[\\/]{2}/;function Im(e,r){return r+e.replace(/\\/g,"/")}var sc="popstate";function ic(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function Am(e={}){function r(s,i){var d;let l=(d=i.state)==null?void 0:d.masked,{pathname:a,search:o,hash:c}=l||s.location;return Wl("",{pathname:a,search:o,hash:c},i.state&&i.state.usr||null,i.state&&i.state.key||"default",l?{pathname:s.location.pathname,search:s.location.search,hash:s.location.hash}:void 0)}function n(s,i){return typeof i=="string"?i:Dn(i)}return Pm(r,n,null,e)}function X(e,r){if(e===!1||e===null||typeof e>"u")throw new Error(r)}function at(e,r){if(!e){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}function Dm(){return Math.random().toString(36).substring(2,10)}function lc(e,r){return{usr:e.state,key:e.key,idx:r,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function Wl(e,r,n=null,s,i){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof r=="string"?$r(r):r,state:n,key:r&&r.key||s||Dm(),mask:i}}function Dn({pathname:e="/",search:r="",hash:n=""}){return r&&r!=="?"&&(e+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function $r(e){let r={};if(e){let n=e.indexOf("#");n>=0&&(r.hash=e.substring(n),e=e.substring(0,n));let s=e.indexOf("?");s>=0&&(r.search=e.substring(s),e=e.substring(0,s)),e&&(r.pathname=e)}return r}function Pm(e,r,n,s={}){let{window:i=document.defaultView,v5Compat:l=!1}=s,a=i.history,o="POP",c=null,d=u();d==null&&(d=0,a.replaceState({...a.state,idx:d},""));function u(){return(a.state||{idx:null}).idx}function m(){o="POP";let T=u(),p=T==null?null:T-d;d=T,c&&c({action:o,location:j.location,delta:p})}function y(T,p){o="PUSH";let h=ic(T)?T:Wl(j.location,T,p);d=u()+1;let f=lc(h,d),v=j.createHref(h.mask||h);try{a.pushState(f,"",v)}catch(E){if(E instanceof DOMException&&E.name==="DataCloneError")throw E;i.location.assign(v)}l&&c&&c({action:o,location:j.location,delta:1})}function g(T,p){o="REPLACE";let h=ic(T)?T:Wl(j.location,T,p);d=u();let f=lc(h,d),v=j.createHref(h.mask||h);a.replaceState(f,"",v),l&&c&&c({action:o,location:j.location,delta:0})}function N(T){return Fm(i,T)}let j={get action(){return o},get location(){return e(i,a)},listen(T){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(sc,m),c=T,()=>{i.removeEventListener(sc,m),c=null}},createHref(T){return r(i,T)},createURL:N,encodeLocation(T){let p=N(T);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:y,replace:g,go(T){return a.go(T)}};return j}function Fm(e,r,n=!1){let s="http://localhost";e&&(s=e.location.origin!=="null"?e.location.origin:e.location.href),X(s,"No window.location.(origin|href) available to create URL");let i=typeof r=="string"?r:Dn(r);return i=i.replace(/ $/,"%20"),!n&&Ou.test(i)&&(i=s+i),new URL(i,s)}function _u(e,r,n="/"){return Bm(e,r,n,!1)}function Bm(e,r,n,s,i){let l=typeof r=="string"?$r(r):r,a=Ct(l.pathname||"/",n);if(a==null)return null;let o=Mm(e),c=null,d=Jm(a);for(let u=0;c==null&&u<o.length;++u)c=Ym(o[u],d,s);return c}function Mm(e){let r=Iu(e);return Hm(r),r}function Iu(e,r=[],n=[],s="",i=!1){let l=(a,o,c=i,d)=>{let u={relativePath:d===void 0?a.path||"":d,caseSensitive:a.caseSensitive===!0,childrenIndex:o,route:a};if(u.relativePath.startsWith("/")){if(!u.relativePath.startsWith(s)&&c)return;X(u.relativePath.startsWith(s),`Absolute route path "${u.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),u.relativePath=u.relativePath.slice(s.length)}let m=it([s,u.relativePath]),y=n.concat(u);a.children&&a.children.length>0&&(X(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${m}".`),Iu(a.children,r,y,m,c)),!(a.path==null&&!a.index)&&r.push({path:m,score:Vm(m,a.index),routesMeta:y.map((g,N)=>{let[j,T]=Pu(g.relativePath,g.caseSensitive,N===y.length-1);return{...g,matcher:j,compiledParams:T}})})};return e.forEach((a,o)=>{var c;if(a.path===""||!((c=a.path)!=null&&c.includes("?")))l(a,o);else for(let d of Au(a.path))l(a,o,!0,d)}),r}function Au(e){let r=e.split("/");if(r.length===0)return[];let[n,...s]=r,i=n.endsWith("?"),l=n.replace(/\?$/,"");if(s.length===0)return i?[l,""]:[l];let a=Au(s.join("/")),o=[];return o.push(...a.map(c=>c===""?l:[l,c].join("/"))),i&&o.push(...a),o.map(c=>e.startsWith("/")&&c===""?"/":c)}function Hm(e){e.sort((r,n)=>r.score!==n.score?n.score-r.score:Qm(r.routesMeta.map(s=>s.childrenIndex),n.routesMeta.map(s=>s.childrenIndex)))}var Um=/^:[\w-]+$/,zm=3,Wm=2,qm=1,Gm=10,$m=-2,ac=e=>e==="*";function Vm(e,r){let n=e.split("/"),s=n.length;return n.some(ac)&&(s+=$m),r&&(s+=Wm),n.filter(i=>!ac(i)).reduce((i,l)=>i+(Um.test(l)?zm:l===""?qm:Gm),s)}function Qm(e,r){return e.length===r.length&&e.slice(0,-1).every((s,i)=>s===r[i])?e[e.length-1]-r[r.length-1]:0}function Ym(e,r,n=!1){let{routesMeta:s}=e,i={},l="/",a=[];for(let o=0;o<s.length;++o){let c=s[o],d=o===s.length-1,u=l==="/"?r:r.slice(l.length)||"/",m={path:c.relativePath,caseSensitive:c.caseSensitive,end:d},y=c.matcher&&c.compiledParams?Du(m,u,c.matcher,c.compiledParams):Qs(m,u),g=c.route;if(!y&&d&&n&&!s[s.length-1].route.index&&(y=Qs({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},u)),!y)return null;Object.assign(i,y.params),a.push({params:i,pathname:it([l,y.pathname]),pathnameBase:Zm(it([l,y.pathnameBase])),route:g}),y.pathnameBase!=="/"&&(l=it([l,y.pathnameBase]))}return a}function Qs(e,r){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,s]=Pu(e.path,e.caseSensitive,e.end);return Du(e,r,n,s)}function Du(e,r,n,s){let i=r.match(n);if(!i)return null;let l=i[0],a=l.replace(/(.)\/+$/,"$1"),o=i.slice(1);return{params:s.reduce((d,{paramName:u,isOptional:m},y)=>{if(u==="*"){let N=o[y]||"";a=l.slice(0,l.length-N.length).replace(/(.)\/+$/,"$1")}const g=o[y];return m&&!g?d[u]=void 0:d[u]=(g||"").replace(/%2F/g,"/"),d},{}),pathname:l,pathnameBase:a,pattern:e}}function Pu(e,r=!1,n=!0){at(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let s=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,o,c,d,u)=>{if(s.push({paramName:o,isOptional:c!=null}),c){let m=u.charAt(d+a.length);return m&&m!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(s.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,r?void 0:"i"),s]}function Jm(e){try{return e.split("/").map(r=>decodeURIComponent(r).replace(/\//g,"%2F")).join("/")}catch(r){return at(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`),e}}function Ct(e,r){if(r==="/")return e;if(!e.toLowerCase().startsWith(r.toLowerCase()))return null;let n=r.endsWith("/")?r.length-1:r.length,s=e.charAt(n);return s&&s!=="/"?null:e.slice(n)||"/"}function Km(e,r="/"){let{pathname:n,search:s="",hash:i=""}=typeof e=="string"?$r(e):e,l;return n?(n=Fu(n),n.startsWith("/")?l=oc(n.substring(1),"/"):l=oc(n,r)):l=r,{pathname:l,search:ef(s),hash:tf(i)}}function oc(e,r){let n=Ys(r).split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function qi(e,r,n,s){return`Cannot include a '${e}' character in a manually specified \`to.${r}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Xm(e){return e.filter((r,n)=>n===0||r.route.path&&r.route.path.length>0)}function Ha(e){let r=Xm(e);return r.map((n,s)=>s===r.length-1?n.pathname:n.pathnameBase)}function pi(e,r,n,s=!1){let i;typeof e=="string"?i=$r(e):(i={...e},X(!i.pathname||!i.pathname.includes("?"),qi("?","pathname","search",i)),X(!i.pathname||!i.pathname.includes("#"),qi("#","pathname","hash",i)),X(!i.search||!i.search.includes("#"),qi("#","search","hash",i)));let l=e===""||i.pathname==="",a=l?"/":i.pathname,o;if(a==null)o=n;else{let m=r.length-1;if(!s&&a.startsWith("..")){let y=a.split("/");for(;y[0]==="..";)y.shift(),m-=1;i.pathname=y.join("/")}o=m>=0?r[m]:"/"}let c=Km(i,o),d=a&&a!=="/"&&a.endsWith("/"),u=(l||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(d||u)&&(c.pathname+="/"),c}var Fu=e=>e.replace(/[\\/]{2,}/g,"/"),it=e=>Fu(e.join("/")),Ys=e=>e.replace(/\/+$/,""),Zm=e=>Ys(e).replace(/^\/*/,"/"),ef=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,tf=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,rf=class{constructor(e,r,n,s=!1){this.status=e,this.statusText=r||"",this.internal=s,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function nf(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function sf(e){let r=e.map(n=>n.route.path).filter(Boolean);return it(r)||"/"}var Bu=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Mu(e,r){let n=e;if(typeof n!="string"||!Ma.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let s=n,i=!1;if(Bu)try{let l=new URL(window.location.href),a=Ou.test(n)?new URL(Im(n,l.protocol)):new URL(n),o=Ct(a.pathname,r);a.origin===l.origin&&o!=null?n=o+a.search+a.hash:i=!0}catch{at(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:s,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Hu=["POST","PUT","PATCH","DELETE"];new Set(Hu);var lf=["GET",...Hu];new Set(lf);var af=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function of(e){try{return af.includes(new URL(e).protocol)}catch{return!1}}var Vr=x.createContext(null);Vr.displayName="DataRouter";var mi=x.createContext(null);mi.displayName="DataRouterState";var Uu=x.createContext(!1);function cf(){return x.useContext(Uu)}var zu=x.createContext({isTransitioning:!1});zu.displayName="ViewTransition";var df=x.createContext(new Map);df.displayName="Fetchers";var uf=x.createContext(null);uf.displayName="Await";var We=x.createContext(null);We.displayName="Navigation";var Un=x.createContext(null);Un.displayName="Location";var ot=x.createContext({outlet:null,matches:[],isDataRoute:!1});ot.displayName="Route";var Ua=x.createContext(null);Ua.displayName="RouteError";var Wu="REACT_ROUTER_ERROR",hf="REDIRECT",pf="ROUTE_ERROR_RESPONSE";function mf(e){if(e.startsWith(`${Wu}:${hf}:{`))try{let r=JSON.parse(e.slice(28));if(typeof r=="object"&&r&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.location=="string"&&typeof r.reloadDocument=="boolean"&&typeof r.replace=="boolean")return r}catch{}}function ff(e){if(e.startsWith(`${Wu}:${pf}:{`))try{let r=JSON.parse(e.slice(40));if(typeof r=="object"&&r&&typeof r.status=="number"&&typeof r.statusText=="string")return new rf(r.status,r.statusText,r.data)}catch{}}function xf(e,{relative:r}={}){X(Qr(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:s}=x.useContext(We),{hash:i,pathname:l,search:a}=zn(e,{relative:r}),o=l;return n!=="/"&&(o=l==="/"?n:it([n,l])),s.createHref({pathname:o,search:a,hash:i})}function Qr(){return x.useContext(Un)!=null}function Xe(){return X(Qr(),"useLocation() may be used only in the context of a <Router> component."),x.useContext(Un).location}var qu="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Gu(e){x.useContext(We).static||x.useLayoutEffect(e)}function xt(){let{isDataRoute:e}=x.useContext(ot);return e?Cf():yf()}function yf(){X(Qr(),"useNavigate() may be used only in the context of a <Router> component.");let e=x.useContext(Vr),{basename:r,navigator:n}=x.useContext(We),{matches:s}=x.useContext(ot),{pathname:i}=Xe(),l=JSON.stringify(Ha(s)),a=x.useRef(!1);return Gu(()=>{a.current=!0}),x.useCallback((c,d={})=>{if(at(a.current,qu),!a.current)return;if(typeof c=="number"){n.go(c);return}let u=pi(c,JSON.parse(l),i,d.relative==="path");e==null&&r!=="/"&&(u.pathname=u.pathname==="/"?r:it([r,u.pathname])),(d.replace?n.replace:n.push)(u,d.state,d)},[r,n,l,i,e])}x.createContext(null);function fi(){let{matches:e}=x.useContext(ot),r=e[e.length-1];return(r==null?void 0:r.params)??{}}function zn(e,{relative:r}={}){let{matches:n}=x.useContext(ot),{pathname:s}=Xe(),i=JSON.stringify(Ha(n));return x.useMemo(()=>pi(e,JSON.parse(i),s,r==="path"),[e,i,s,r])}function gf(e,r){return $u(e,r)}function $u(e,r,n){var T;X(Qr(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:s}=x.useContext(We),{matches:i}=x.useContext(ot),l=i[i.length-1],a=l?l.params:{},o=l?l.pathname:"/",c=l?l.pathnameBase:"/",d=l&&l.route;{let p=d&&d.path||"";Qu(o,!d||p.endsWith("*")||p.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${o}" (under <Route path="${p}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${p}"> to <Route path="${p==="/"?"*":`${p}/*`}">.`)}let u=Xe(),m;if(r){let p=typeof r=="string"?$r(r):r;X(c==="/"||((T=p.pathname)==null?void 0:T.startsWith(c)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${p.pathname}" was given in the \`location\` prop.`),m=p}else m=u;let y=m.pathname||"/",g=y;if(c!=="/"){let p=c.replace(/^\//,"").split("/");g="/"+y.replace(/^\//,"").split("/").slice(p.length).join("/")}let N=n&&n.state.matches.length?n.state.matches.map(p=>Object.assign(p,{route:n.manifest[p.route.id]||p.route})):_u(e,{pathname:g});at(d||N!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),at(N==null||N[N.length-1].route.element!==void 0||N[N.length-1].route.Component!==void 0||N[N.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let j=Sf(N&&N.map(p=>Object.assign({},p,{params:Object.assign({},a,p.params),pathname:it([c,s.encodeLocation?s.encodeLocation(p.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?c:it([c,s.encodeLocation?s.encodeLocation(p.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathnameBase])})),i,n);return r&&j?x.createElement(Un.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...m},navigationType:"POP"}},j):j}function jf(){let e=Lf(),r=nf(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,s="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:s},l={padding:"2px 4px",backgroundColor:s},a=null;return console.error("Error handled by React Router default ErrorBoundary:",e),a=x.createElement(x.Fragment,null,x.createElement("p",null,"💿 Hey developer 👋"),x.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",x.createElement("code",{style:l},"ErrorBoundary")," or"," ",x.createElement("code",{style:l},"errorElement")," prop on your route.")),x.createElement(x.Fragment,null,x.createElement("h2",null,"Unexpected Application Error!"),x.createElement("h3",{style:{fontStyle:"italic"}},r),n?x.createElement("pre",{style:i},n):null,a)}var Nf=x.createElement(jf,null),Vu=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,r){return r.location!==e.location||r.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:r.error,location:r.location,revalidation:e.revalidation||r.revalidation}}componentDidCatch(e,r){this.props.onError?this.props.onError(e,r):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=ff(e.digest);n&&(e=n)}let r=e!==void 0?x.createElement(ot.Provider,{value:this.props.routeContext},x.createElement(Ua.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?x.createElement(vf,{error:e},r):r}};Vu.contextType=Uu;var Gi=new WeakMap;function vf({children:e,error:r}){let{basename:n}=x.useContext(We);if(typeof r=="object"&&r&&"digest"in r&&typeof r.digest=="string"){let s=mf(r.digest);if(s){let i=Gi.get(r);if(i)throw i;let l=Mu(s.location,n),a=l.absoluteURL||l.to;if(of(a))throw new Error("Invalid redirect location");if(Bu&&!Gi.get(r))if(l.isExternal||s.reloadDocument)window.location.href=a;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(l.to,{replace:s.replace}));throw Gi.set(r,o),o}return x.createElement("meta",{httpEquiv:"refresh",content:`0;url=${a}`})}}return e}function Ef({routeContext:e,match:r,children:n}){let s=x.useContext(Vr);return s&&s.static&&s.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=r.route.id),x.createElement(ot.Provider,{value:e},n)}function Sf(e,r=[],n){let s=n==null?void 0:n.state;if(e==null){if(!s)return null;if(s.errors)e=s.matches;else if(r.length===0&&!s.initialized&&s.matches.length>0)e=s.matches;else return null}let i=e,l=s==null?void 0:s.errors;if(l!=null){let u=i.findIndex(m=>m.route.id&&(l==null?void 0:l[m.route.id])!==void 0);X(u>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(l).join(",")}`),i=i.slice(0,Math.min(i.length,u+1))}let a=!1,o=-1;if(n&&s){a=s.renderFallback;for(let u=0;u<i.length;u++){let m=i[u];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(o=u),m.route.id){let{loaderData:y,errors:g}=s,N=m.route.loader&&!y.hasOwnProperty(m.route.id)&&(!g||g[m.route.id]===void 0);if(m.route.lazy||N){n.isStatic&&(a=!0),o>=0?i=i.slice(0,o+1):i=[i[0]];break}}}}let c=n==null?void 0:n.onError,d=s&&c?(u,m)=>{var y,g;c(u,{location:s.location,params:((g=(y=s.matches)==null?void 0:y[0])==null?void 0:g.params)??{},pattern:sf(s.matches),errorInfo:m})}:void 0;return i.reduceRight((u,m,y)=>{let g,N=!1,j=null,T=null;s&&(g=l&&m.route.id?l[m.route.id]:void 0,j=m.route.errorElement||Nf,a&&(o<0&&y===0?(Qu("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),N=!0,T=null):o===y&&(N=!0,T=m.route.hydrateFallbackElement||null)));let p=r.concat(i.slice(0,y+1)),h=()=>{let f;return g?f=j:N?f=T:m.route.Component?f=x.createElement(m.route.Component,null):m.route.element?f=m.route.element:f=u,x.createElement(Ef,{match:m,routeContext:{outlet:u,matches:p,isDataRoute:s!=null},children:f})};return s&&(m.route.ErrorBoundary||m.route.errorElement||y===0)?x.createElement(Vu,{location:s.location,revalidation:s.revalidation,component:j,error:g,children:h(),routeContext:{outlet:null,matches:p,isDataRoute:!0},onError:d}):h()},null)}function za(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Tf(e){let r=x.useContext(Vr);return X(r,za(e)),r}function wf(e){let r=x.useContext(mi);return X(r,za(e)),r}function kf(e){let r=x.useContext(ot);return X(r,za(e)),r}function Wa(e){let r=kf(e),n=r.matches[r.matches.length-1];return X(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function bf(){return Wa("useRouteId")}function Lf(){var s;let e=x.useContext(Ua),r=wf("useRouteError"),n=Wa("useRouteError");return e!==void 0?e:(s=r.errors)==null?void 0:s[n]}function Cf(){let{router:e}=Tf("useNavigate"),r=Wa("useNavigate"),n=x.useRef(!1);return Gu(()=>{n.current=!0}),x.useCallback(async(i,l={})=>{at(n.current,qu),n.current&&(typeof i=="number"?await e.navigate(i):await e.navigate(i,{fromRouteId:r,...l}))},[e,r])}var cc={};function Qu(e,r,n){!r&&!cc[e]&&(cc[e]=!0,at(!1,n))}x.memo(Rf);function Rf({routes:e,manifest:r,future:n,state:s,isStatic:i,onError:l}){return $u(e,void 0,{manifest:r,state:s,isStatic:i,onError:l})}function Js({to:e,replace:r,state:n,relative:s}){X(Qr(),"<Navigate> may be used only in the context of a <Router> component.");let{static:i}=x.useContext(We);at(!i,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:l}=x.useContext(ot),{pathname:a}=Xe(),o=xt(),c=pi(e,Ha(l),a,s==="path"),d=JSON.stringify(c);return x.useEffect(()=>{o(JSON.parse(d),{replace:r,state:n,relative:s})},[o,d,s,r,n]),null}function we(e){X(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Of({basename:e="/",children:r=null,location:n,navigationType:s="POP",navigator:i,static:l=!1,useTransitions:a}){X(!Qr(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let o=e.replace(/^\/*/,"/"),c=x.useMemo(()=>({basename:o,navigator:i,static:l,useTransitions:a,future:{}}),[o,i,l,a]);typeof n=="string"&&(n=$r(n));let{pathname:d="/",search:u="",hash:m="",state:y=null,key:g="default",mask:N}=n,j=x.useMemo(()=>{let T=Ct(d,o);return T==null?null:{location:{pathname:T,search:u,hash:m,state:y,key:g,mask:N},navigationType:s}},[o,d,u,m,y,g,s,N]);return at(j!=null,`<Router basename="${o}"> is not able to match the URL "${d}${u}${m}" because it does not start with the basename, so the <Router> won't render anything.`),j==null?null:x.createElement(We.Provider,{value:c},x.createElement(Un.Provider,{children:r,value:j}))}function Yu({children:e,location:r}){return gf(ql(e),r)}function ql(e,r=[]){let n=[];return x.Children.forEach(e,(s,i)=>{if(!x.isValidElement(s))return;let l=[...r,i];if(s.type===x.Fragment){n.push.apply(n,ql(s.props.children,l));return}X(s.type===we,`[${typeof s.type=="string"?s.type:s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),X(!s.props.index||!s.props.children,"An index route cannot have child routes.");let a={id:s.props.id||l.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,middleware:s.props.middleware,loader:s.props.loader,action:s.props.action,hydrateFallbackElement:s.props.hydrateFallbackElement,HydrateFallback:s.props.HydrateFallback,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.hasErrorBoundary===!0||s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(a.children=ql(s.props.children,l)),n.push(a)}),n}var Es="get",Ss="application/x-www-form-urlencoded";function xi(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function _f(e){return xi(e)&&e.tagName.toLowerCase()==="button"}function If(e){return xi(e)&&e.tagName.toLowerCase()==="form"}function Af(e){return xi(e)&&e.tagName.toLowerCase()==="input"}function Df(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Pf(e,r){return e.button===0&&(!r||r==="_self")&&!Df(e)}var as=null;function Ff(){if(as===null)try{new FormData(document.createElement("form"),0),as=!1}catch{as=!0}return as}var Bf=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function $i(e){return e!=null&&!Bf.has(e)?(at(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ss}"`),null):e}function Mf(e,r){let n,s,i,l,a;if(If(e)){let o=e.getAttribute("action");s=o?Ct(o,r):null,n=e.getAttribute("method")||Es,i=$i(e.getAttribute("enctype"))||Ss,l=new FormData(e)}else if(_f(e)||Af(e)&&(e.type==="submit"||e.type==="image")){let o=e.form;if(o==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||o.getAttribute("action");if(s=c?Ct(c,r):null,n=e.getAttribute("formmethod")||o.getAttribute("method")||Es,i=$i(e.getAttribute("formenctype"))||$i(o.getAttribute("enctype"))||Ss,l=new FormData(o,e),!Ff()){let{name:d,type:u,value:m}=e;if(u==="image"){let y=d?`${d}.`:"";l.append(`${y}x`,"0"),l.append(`${y}y`,"0")}else d&&l.append(d,m)}}else{if(xi(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Es,s=null,i=Ss,a=e}return l&&i==="text/plain"&&(a=l,l=void 0),{action:s,method:n.toLowerCase(),encType:i,formData:l,body:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function qa(e,r){if(e===!1||e===null||typeof e>"u")throw new Error(r)}function Ju(e,r,n,s){let i=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?i.pathname.endsWith("/")?i.pathname=`${i.pathname}_.${s}`:i.pathname=`${i.pathname}.${s}`:i.pathname==="/"?i.pathname=`_root.${s}`:r&&Ct(i.pathname,r)==="/"?i.pathname=`${Ys(r)}/_root.${s}`:i.pathname=`${Ys(i.pathname)}.${s}`,i}async function Hf(e,r){if(e.id in r)return r[e.id];try{let n=await import(e.module);return r[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Uf(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function zf(e,r,n){let s=await Promise.all(e.map(async i=>{let l=r.routes[i.route.id];if(l){let a=await Hf(l,n);return a.links?a.links():[]}return[]}));return $f(s.flat(1).filter(Uf).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function dc(e,r,n,s,i,l){let a=(c,d)=>n[d]?c.route.id!==n[d].route.id:!0,o=(c,d)=>{var u;return n[d].pathname!==c.pathname||((u=n[d].route.path)==null?void 0:u.endsWith("*"))&&n[d].params["*"]!==c.params["*"]};return l==="assets"?r.filter((c,d)=>a(c,d)||o(c,d)):l==="data"?r.filter((c,d)=>{var m;let u=s.routes[c.route.id];if(!u||!u.hasLoader)return!1;if(a(c,d)||o(c,d))return!0;if(c.route.shouldRevalidate){let y=c.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:((m=n[0])==null?void 0:m.params)||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function Wf(e,r,{includeHydrateFallback:n}={}){return qf(e.map(s=>{let i=r.routes[s.route.id];if(!i)return[];let l=[i.module];return i.clientActionModule&&(l=l.concat(i.clientActionModule)),i.clientLoaderModule&&(l=l.concat(i.clientLoaderModule)),n&&i.hydrateFallbackModule&&(l=l.concat(i.hydrateFallbackModule)),i.imports&&(l=l.concat(i.imports)),l}).flat(1))}function qf(e){return[...new Set(e)]}function Gf(e){let r={},n=Object.keys(e).sort();for(let s of n)r[s]=e[s];return r}function $f(e,r){let n=new Set;return new Set(r),e.reduce((s,i)=>{let l=JSON.stringify(Gf(i));return n.has(l)||(n.add(l),s.push({key:l,link:i})),s},[])}function Ga(){let e=x.useContext(Vr);return qa(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Vf(){let e=x.useContext(mi);return qa(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var $a=x.createContext(void 0);$a.displayName="FrameworkContext";function yi(){let e=x.useContext($a);return qa(e,"You must render this element inside a <HydratedRouter> element"),e}function Qf(e,r){let n=x.useContext($a),[s,i]=x.useState(!1),[l,a]=x.useState(!1),{onFocus:o,onBlur:c,onMouseEnter:d,onMouseLeave:u,onTouchStart:m}=r,y=x.useRef(null);x.useEffect(()=>{if(e==="render"&&a(!0),e==="viewport"){let j=p=>{p.forEach(h=>{a(h.isIntersecting)})},T=new IntersectionObserver(j,{threshold:.5});return y.current&&T.observe(y.current),()=>{T.disconnect()}}},[e]),x.useEffect(()=>{if(s){let j=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(j)}}},[s]);let g=()=>{i(!0)},N=()=>{i(!1),a(!1)};return n?e!=="intent"?[l,y,{}]:[l,y,{onFocus:nn(o,g),onBlur:nn(c,N),onMouseEnter:nn(d,g),onMouseLeave:nn(u,N),onTouchStart:nn(m,g)}]:[!1,y,{}]}function nn(e,r){return n=>{e&&e(n),n.defaultPrevented||r(n)}}function Yf({page:e,...r}){let n=cf(),{nonce:s}=yi(),{router:i}=Ga(),l=x.useMemo(()=>_u(i.routes,e,i.basename),[i.routes,e,i.basename]);return l?(r.nonce==null&&s&&(r={...r,nonce:s}),n?x.createElement(Kf,{page:e,matches:l,...r}):x.createElement(Xf,{page:e,matches:l,...r})):null}function Jf(e){let{manifest:r,routeModules:n}=yi(),[s,i]=x.useState([]);return x.useEffect(()=>{let l=!1;return zf(e,r,n).then(a=>{l||i(a)}),()=>{l=!0}},[e,r,n]),s}function Kf({page:e,matches:r,...n}){let s=Xe(),{future:i}=yi(),{basename:l}=Ga(),a=x.useMemo(()=>{if(e===s.pathname+s.search+s.hash)return[];let o=Ju(e,l,i.v8_trailingSlashAwareDataRequests,"rsc"),c=!1,d=[];for(let u of r)typeof u.route.shouldRevalidate=="function"?c=!0:d.push(u.route.id);return c&&d.length>0&&o.searchParams.set("_routes",d.join(",")),[o.pathname+o.search]},[l,i.v8_trailingSlashAwareDataRequests,e,s,r]);return x.createElement(x.Fragment,null,a.map(o=>x.createElement("link",{key:o,rel:"prefetch",as:"fetch",href:o,...n})))}function Xf({page:e,matches:r,...n}){let s=Xe(),{future:i,manifest:l,routeModules:a}=yi(),{basename:o}=Ga(),{loaderData:c,matches:d}=Vf(),u=x.useMemo(()=>dc(e,r,d,l,s,"data"),[e,r,d,l,s]),m=x.useMemo(()=>dc(e,r,d,l,s,"assets"),[e,r,d,l,s]),y=x.useMemo(()=>{if(e===s.pathname+s.search+s.hash)return[];let j=new Set,T=!1;if(r.forEach(h=>{var v;let f=l.routes[h.route.id];!f||!f.hasLoader||(!u.some(E=>E.route.id===h.route.id)&&h.route.id in c&&((v=a[h.route.id])!=null&&v.shouldRevalidate)||f.hasClientLoader?T=!0:j.add(h.route.id))}),j.size===0)return[];let p=Ju(e,o,i.v8_trailingSlashAwareDataRequests,"data");return T&&j.size>0&&p.searchParams.set("_routes",r.filter(h=>j.has(h.route.id)).map(h=>h.route.id).join(",")),[p.pathname+p.search]},[o,i.v8_trailingSlashAwareDataRequests,c,s,l,u,r,e,a]),g=x.useMemo(()=>Wf(m,l),[m,l]),N=Jf(m);return x.createElement(x.Fragment,null,y.map(j=>x.createElement("link",{key:j,rel:"prefetch",as:"fetch",href:j,...n})),g.map(j=>x.createElement("link",{key:j,rel:"modulepreload",href:j,...n})),N.map(({key:j,link:T})=>x.createElement("link",{key:j,nonce:n.nonce,...T,crossOrigin:T.crossOrigin??n.crossOrigin})))}function Zf(...e){return r=>{e.forEach(n=>{typeof n=="function"?n(r):n!=null&&(n.current=r)})}}var ex=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{ex&&(window.__reactRouterVersion="7.18.0")}catch{}function tx({basename:e,children:r,useTransitions:n,window:s}){let i=x.useRef();i.current==null&&(i.current=Am({window:s,v5Compat:!0}));let l=i.current,[a,o]=x.useState({action:l.action,location:l.location}),c=x.useCallback(d=>{n===!1?o(d):x.startTransition(()=>o(d))},[n]);return x.useLayoutEffect(()=>l.listen(c),[l,c]),x.createElement(Of,{basename:e,children:r,location:a.location,navigationType:a.action,navigator:l,useTransitions:n})}var Ku=x.forwardRef(function({onClick:r,discover:n="render",prefetch:s="none",relative:i,reloadDocument:l,replace:a,mask:o,state:c,target:d,to:u,preventScrollReset:m,viewTransition:y,defaultShouldRevalidate:g,...N},j){let{basename:T,navigator:p,useTransitions:h}=x.useContext(We),f=typeof u=="string"&&Ma.test(u),v=Mu(u,T);u=v.to;let E=xf(u,{relative:i}),L=Xe(),w=null;if(o){let fe=pi(o,[],L.mask?L.mask.pathname:"/",!0);T!=="/"&&(fe.pathname=fe.pathname==="/"?T:it([T,fe.pathname])),w=p.createHref(fe)}let[C,B,A]=Qf(s,N),Y=ix(u,{replace:a,mask:o,state:c,target:d,preventScrollReset:m,relative:i,viewTransition:y,defaultShouldRevalidate:g,useTransitions:h});function pe(fe){r&&r(fe),fe.defaultPrevented||Y(fe)}let qe=!(v.isExternal||l),me=x.createElement("a",{...N,...A,href:(qe?w:void 0)||v.absoluteURL||E,onClick:qe?pe:r,ref:Zf(j,B),target:d,"data-discover":!f&&n==="render"?"true":void 0});return C&&!f?x.createElement(x.Fragment,null,me,x.createElement(Yf,{page:E})):me});Ku.displayName="Link";var rx=x.forwardRef(function({"aria-current":r="page",caseSensitive:n=!1,className:s="",end:i=!1,style:l,to:a,viewTransition:o,children:c,...d},u){let m=zn(a,{relative:d.relative}),y=Xe(),g=x.useContext(mi),{navigator:N,basename:j}=x.useContext(We),T=g!=null&&dx(m)&&o===!0,p=N.encodeLocation?N.encodeLocation(m).pathname:m.pathname,h=y.pathname,f=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;n||(h=h.toLowerCase(),f=f?f.toLowerCase():null,p=p.toLowerCase()),f&&j&&(f=Ct(f,j)||f);const v=p!=="/"&&p.endsWith("/")?p.length-1:p.length;let E=h===p||!i&&h.startsWith(p)&&h.charAt(v)==="/",L=f!=null&&(f===p||!i&&f.startsWith(p)&&f.charAt(p.length)==="/"),w={isActive:E,isPending:L,isTransitioning:T},C=E?r:void 0,B;typeof s=="function"?B=s(w):B=[s,E?"active":null,L?"pending":null,T?"transitioning":null].filter(Boolean).join(" ");let A=typeof l=="function"?l(w):l;return x.createElement(Ku,{...d,"aria-current":C,className:B,ref:u,style:A,to:a,viewTransition:o},typeof c=="function"?c(w):c)});rx.displayName="NavLink";var nx=x.forwardRef(({discover:e="render",fetcherKey:r,navigate:n,reloadDocument:s,replace:i,state:l,method:a=Es,action:o,onSubmit:c,relative:d,preventScrollReset:u,viewTransition:m,defaultShouldRevalidate:y,...g},N)=>{let{useTransitions:j}=x.useContext(We),T=ox(),p=cx(o,{relative:d}),h=a.toLowerCase()==="get"?"get":"post",f=typeof o=="string"&&Ma.test(o),v=E=>{if(c&&c(E),E.defaultPrevented)return;E.preventDefault();let L=E.nativeEvent.submitter,w=(L==null?void 0:L.getAttribute("formmethod"))||a,C=()=>T(L||E.currentTarget,{fetcherKey:r,method:w,navigate:n,replace:i,state:l,relative:d,preventScrollReset:u,viewTransition:m,defaultShouldRevalidate:y});j&&n!==!1?x.startTransition(()=>C()):C()};return x.createElement("form",{ref:N,method:h,action:p,onSubmit:s?c:v,...g,"data-discover":!f&&e==="render"?"true":void 0})});nx.displayName="Form";function sx(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Xu(e){let r=x.useContext(Vr);return X(r,sx(e)),r}function ix(e,{target:r,replace:n,mask:s,state:i,preventScrollReset:l,relative:a,viewTransition:o,defaultShouldRevalidate:c,useTransitions:d}={}){let u=xt(),m=Xe(),y=zn(e,{relative:a});return x.useCallback(g=>{if(Pf(g,r)){g.preventDefault();let N=n!==void 0?n:Dn(m)===Dn(y),j=()=>u(e,{replace:N,mask:s,state:i,preventScrollReset:l,relative:a,viewTransition:o,defaultShouldRevalidate:c});d?x.startTransition(()=>j()):j()}},[m,u,y,n,s,i,r,e,l,a,o,c,d])}var lx=0,ax=()=>`__${String(++lx)}__`;function ox(){let{router:e}=Xu("useSubmit"),{basename:r}=x.useContext(We),n=bf(),s=e.fetch,i=e.navigate;return x.useCallback(async(l,a={})=>{let{action:o,method:c,encType:d,formData:u,body:m}=Mf(l,r);if(a.navigate===!1){let y=a.fetcherKey||ax();await s(y,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:u,body:m,formMethod:a.method||c,formEncType:a.encType||d,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:u,body:m,formMethod:a.method||c,formEncType:a.encType||d,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[s,i,r,n])}function cx(e,{relative:r}={}){let{basename:n}=x.useContext(We),s=x.useContext(ot);X(s,"useFormAction must be used inside a RouteContext");let[i]=s.matches.slice(-1),l={...zn(e||".",{relative:r})},a=Xe();if(e==null){l.search=a.search;let o=new URLSearchParams(l.search),c=o.getAll("index");if(c.some(u=>u==="")){o.delete("index"),c.filter(m=>m).forEach(m=>o.append("index",m));let u=o.toString();l.search=u?`?${u}`:""}}return(!e||e===".")&&i.route.index&&(l.search=l.search?l.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(l.pathname=l.pathname==="/"?n:it([n,l.pathname])),Dn(l)}function dx(e,{relative:r}={}){let n=x.useContext(zu);X(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:s}=Xu("useViewTransitionState"),i=zn(e,{relative:r});if(!n.isTransitioning)return!1;let l=Ct(n.currentLocation.pathname,s)||n.currentLocation.pathname,a=Ct(n.nextLocation.pathname,s)||n.nextLocation.pathname;return Qs(i.pathname,a)!=null||Qs(i.pathname,l)!=null}const ux="";function hx(){var e;try{return((e=JSON.parse(localStorage.getItem("kiro_user")))==null?void 0:e.token)||null}catch{return null}}async function tr(e,r={}){const n=hx(),s={"Content-Type":"application/json",...r.headers||{}};n&&(s.Authorization=`Bearer ${n}`);const i=await fetch(`${ux}${e}`,{...r,headers:s});if(i.status===401&&!e.includes("/auth/")){localStorage.removeItem("kiro_user"),window.location.reload();return}if(!i.ok){const l=await i.json().catch(()=>({}));throw Object.assign(new Error(l.message||i.statusText),{status:i.status})}return i.json()}const ft={login:(e,r)=>tr("/api/auth/login",{method:"POST",body:JSON.stringify({email:e,password:r})}),schedule:()=>tr("/api/schedule"),library:()=>tr("/api/library"),tasks:()=>tr("/api/tasks"),setTaskStatus:(e,r)=>tr(`/api/tasks/${e}/status`,{method:"PATCH",body:JSON.stringify({status:r})}),announcements:()=>tr("/api/announcements"),links:()=>tr("/api/links")};function px({onLogin:e}){const[r,n]=x.useState(""),[s,i]=x.useState(""),[l,a]=x.useState(!1),[o,c]=x.useState(""),[d,u]=x.useState(!1),[m,y]=x.useState(!1),g=x.useRef(null);x.useEffect(()=>(document.body.className="login-page",localStorage.getItem("sessionExpired")&&(y(!0),localStorage.removeItem("sessionExpired")),()=>{document.body.className=""}),[]),x.useEffect(()=>{const j=g.current;if(!j)return;const T=j.getContext("2d");let p=[],h;const f=()=>{j.width=window.innerWidth,j.height=window.innerHeight},v=()=>({x:Math.random()*j.width,y:Math.random()*j.height,r:Math.random()*1.8+.4,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,o:Math.random()*.08+.03}),E=()=>{f(),p=Array.from({length:60},v)},L=()=>{T.clearRect(0,0,j.width,j.height),p.forEach(w=>{T.beginPath(),T.arc(w.x,w.y,w.r,0,Math.PI*2),T.fillStyle=`rgba(200,255,0,${w.o})`,T.fill(),w.x+=w.vx,w.y+=w.vy,w.x<-5&&(w.x=j.width+5),w.x>j.width+5&&(w.x=-5),w.y<-5&&(w.y=j.height+5),w.y>j.height+5&&(w.y=-5)}),h=requestAnimationFrame(L)};return E(),L(),window.addEventListener("resize",E,{passive:!0}),()=>{cancelAnimationFrame(h),window.removeEventListener("resize",E)}},[]);const N=async j=>{if(j.preventDefault(),!r||!s){c("Введите email и пароль");return}c(""),u(!0);try{const T=await ft.login(r,s);e({token:T.token,...T.user})}catch(T){c(T.message||"Неверный email или пароль"),u(!1)}};return t.jsxs(t.Fragment,{children:[t.jsx("canvas",{id:"login-canvas",ref:g}),t.jsx("div",{className:"login-wrap",children:t.jsxs("div",{className:"login-card",children:[t.jsxs("div",{className:"login-brand",children:[t.jsx("span",{className:"login-brand-kiro",children:"KIRO"}),t.jsx("div",{className:"login-brand-sep"}),t.jsx("span",{className:"login-brand-platform",children:"Platform"})]}),t.jsx("h1",{className:"login-title",children:"IT Summer Camp '26"}),t.jsx("p",{className:"login-subtitle",children:"Войдите чтобы получить доступ к платформе"}),t.jsxs("form",{onSubmit:N,noValidate:!0,children:[t.jsxs("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",htmlFor:"login-email",children:"Логин"}),t.jsx("input",{type:"text",id:"login-email",name:"username",placeholder:"Ваш логин",autoComplete:"username",value:r,onChange:j=>n(j.target.value)})]}),t.jsxs("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",htmlFor:"login-password",children:"Пароль"}),t.jsxs("div",{className:"password-wrap",children:[t.jsx("input",{type:l?"text":"password",id:"login-password",name:"password",placeholder:"••••••••",autoComplete:"current-password",value:s,onChange:j=>i(j.target.value)}),t.jsx("button",{type:"button",className:"password-toggle",tabIndex:-1,onClick:()=>a(j=>!j),children:t.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),t.jsx("circle",{cx:"12",cy:"12",r:"3"})]})})]})]}),m&&t.jsx("div",{className:"login-error",style:{background:"rgba(255, 153, 0, 0.1)",borderColor:"#ff9900"},children:"⏰ Ваша сессия истекла. Пожалуйста, войдите снова."}),o&&t.jsx("div",{className:"login-error",children:o}),t.jsx("button",{type:"submit",className:"btn-primary btn-full",style:{marginTop:4},disabled:d,children:d?"Входим...":"Войти →"})]}),t.jsxs("p",{className:"login-note",children:["🔒 Доступ выдаётся менеджером после оплаты.",t.jsx("br",{}),"Для получения доступа напишите"," ",t.jsx("a",{href:"https://t.me/kiro_team_manager",target:"_blank",rel:"noopener",children:"@kiro_team_manager"})]})]})})]})}function mx(e){return(e||"").split(" ").map(r=>r[0]||"").join("").toUpperCase().slice(0,2)||"?"}const fx=[{path:"/dashboard",label:"Дэшборд"},{path:"/schedule",label:"Расписание"},{path:"/library",label:"Библиотека знаний"},{path:"/links",label:"Полезные ссылки"},{path:"/likebezy",label:"Полные ликбезы"}];function xx({user:e,onLogout:r,onClose:n}){const[s,i]=x.useState(!1),l=xt(),a=Xe(),o=mx((e==null?void 0:e.name)||""),c=u=>{l(u),n()},d=u=>u==="/library"?a.pathname.startsWith("/library"):u==="/likebezy"?a.pathname.startsWith("/likebezy"):a.pathname===u;return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"sidebar-header",children:[t.jsxs("a",{className:"sidebar-logo",href:"#",children:[t.jsx("span",{className:"sidebar-logo-kiro",children:"KIRO"}),t.jsx("span",{className:"sidebar-logo-platform",children:"CAMP"})]}),t.jsx("button",{className:"sidebar-close-btn",onClick:n,children:"×"})]}),t.jsxs("div",{className:"sidebar-user",children:[t.jsx("div",{className:"sidebar-avatar",children:o}),t.jsx("div",{className:"sidebar-user-name",children:(e==null?void 0:e.name)||"—"})]}),t.jsx("nav",{className:"sidebar-nav",children:fx.map(u=>t.jsx("button",{className:`nav-item${d(u.path)?" active":""}`,onClick:()=>c(u.path),children:u.label},u.path))}),t.jsx("div",{className:"sidebar-footer",children:s?t.jsxs("div",{className:"logout-confirm",children:[t.jsx("div",{className:"logout-confirm-text",children:"Выйти из аккаунта?"}),t.jsxs("div",{className:"logout-confirm-btns",children:[t.jsx("button",{className:"logout-btn-yes",onClick:r,children:"Выйти"}),t.jsx("button",{className:"logout-btn-no",onClick:()=>i(!1),children:"Отменить"})]})]}):t.jsx("button",{className:"nav-item nav-item--logout",onClick:()=>i(!0),children:"Выйти"})})]})}const yx={"/dashboard":"Дэшборд","/schedule":"Расписание","/library":"Библиотека знаний","/links":"Полезные ссылки","/likebezy":"Полные ликбезы","/announcements":"Объявления"};function gx(e){return e.split(" ").map(r=>r[0]||"").join("").toUpperCase().slice(0,2)}function jx(e){return e.startsWith("/library/theory")?"Теория":e.startsWith("/library/questions")?"Тренировка":e.startsWith("/library/homework")?"Домашнее задание":e.startsWith("/library")?"Библиотека знаний":e.startsWith("/likebezy")?"Полные ликбезы":yx[e]||""}function Nx({user:e,onMenuClick:r}){const n=Xe(),s=e?gx(e.name):"??",i=jx(n.pathname);return t.jsxs("header",{className:"top-bar",children:[t.jsxs("button",{className:"hamburger",onClick:r,children:[t.jsx("span",{}),t.jsx("span",{}),t.jsx("span",{})]}),t.jsx("span",{className:"top-bar-title",children:i}),t.jsx("div",{className:"top-bar-avatar",children:s})]})}function vx({day:e,onClose:r}){var n;return x.useEffect(()=>{document.body.style.overflow="hidden";const s=i=>{i.key==="Escape"&&r()};return document.addEventListener("keydown",s),()=>{document.body.style.overflow="",document.removeEventListener("keydown",s)}},[r]),e?t.jsx("div",{className:"modal-overlay active",onClick:s=>{s.target===s.currentTarget&&r()},children:t.jsxs("div",{className:"modal-box",children:[t.jsxs("div",{className:"modal-header",children:[t.jsxs("div",{children:[t.jsxs("div",{className:"modal-day-num",children:["День ",e.num??e.id," · ",e.date]}),t.jsx("div",{className:"modal-day-title",children:e.title})]}),t.jsx("button",{className:"modal-close",onClick:r,children:"×"})]}),t.jsx("div",{className:"modal-body",children:(n=e.mats)!=null&&n.length?t.jsx("div",{className:"mat-links",children:e.mats.map((s,i)=>t.jsxs("a",{href:s.url,className:"mat-link",target:"_blank",rel:"noopener",children:[t.jsx("span",{className:"mat-link-title",children:s.title}),t.jsx("span",{className:"mat-link-arrow",children:"→"})]},i))}):t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Материалы появятся скоро."})})]})}):null}const mr=[{id:1,day:1,date:"пн, 1 июня",type:"intro",title:"Вводное занятие: старт лагеря",theory:["Знакомство с форматом: как устроены занятия, созвоны и ДЗ","Обзор платформы: где находить материалы, задания и расписание","Инструменты для старта: установка редактора кода и необходимого ПО","Рекомендации по учёбе, работе с ментором и одногруппниками","Знакомство участников: первый круговой созвон"],tasks:["Установить редактор кода и инструменты по инструкции на платформе",'Написать программу "Hello, World!" и запустить в терминале'],hw:'Установить все инструменты и написать в чат: "Готов(а) к старту!" — это твой первый ДЗ.'},{id:2,day:2,date:"вт, 2 июня",type:"lecture",title:"Основы программирования: переменные, типы, условия",theory:["Что такое программа: инструкции, данные, порядок выполнения","Переменные и типы данных: числа, строки, булевы значения, пустое значение","Арифметические, логические операторы и операторы сравнения","Условные операторы: if / elif / else — синтаксис и примеры","Ввод и вывод данных: как программа общается с пользователем"],tasks:["Написать калькулятор с 4 операциями (+, −, ×, ÷)",'Задача: "Угадай число" — пользователь вводит, программа сравнивает'],hw:"3 задачи на условия из Codeforces уровня A. Ссылки на платформе."},{id:3,day:3,date:"ср, 3 июня",type:"lecture",title:"Основы программирования: циклы, функции, коллекции",theory:["Циклы: повторение по счётчику и по условию — когда что","Прерывание и продолжение цикла","Функции: объявление, параметры, возвращаемое значение, область видимости","Работа с коллекциями: массивы/списки — добавление, удаление, срезы","Принципы читаемого кода: именование, отступы, минимум комментариев"],tasks:["FizzBuzz — классика программирования","Функция для проверки является ли число простым","Написать таблицу умножения через вложенные циклы"],hw:"Функция подсчёта суммы всех чётных чисел в массиве. Написать 2 варианта: через цикл и через встроенные инструменты языка."},{id:4,day:4,date:"чт, 4 июня",type:"lecture",title:"Алгоритмическое мышление и Big O",theory:["Что такое алгоритм: чёткость, конечность, результат","Нотация Big O: O(1), O(n), O(n²), O(log n), O(n log n)","Как анализировать время и память алгоритма","Примеры: линейный vs бинарный поиск, пузырьковая vs быстрая сортировка","Зачем это знать: каждое техническое собеседование спрашивает Big O"],tasks:["Определить сложность 5 данных алгоритмов","Написать два решения одной задачи с разной сложностью — сравнить"],hw:"Задача: найти пару элементов с заданной суммой — два решения разной сложности."},{id:5,day:5,date:"пт, 5 июня",type:"lecture",title:"Дискретная математика: логика и множества",theory:["Булева алгебра: AND, OR, NOT, XOR, импликация, эквивалентность","Таблицы истинности: как строить и читать","Теория множеств: объединение, пересечение, разность, подмножество","Применение в программировании: битовые операции, фильтрация данных, индексы"],tasks:["Построить таблицу истинности для формулы с 3 переменными","Single Number (LeetCode #136) — через XOR"],hw:"Number of 1 Bits (LeetCode #191) и Power of Two (LeetCode #231) — через битовые операции."},{id:6,day:6,date:"сб, 6 июня",type:"lecture",title:"Дискретная математика: графы и алгоритмы",theory:["Граф: вершины, рёбра, типы (орграф, взвешенный, цикличный)","Представление: матрица смежности, список смежности — плюсы и минусы","BFS (поиск в ширину): алгоритм на очереди, применение","DFS (поиск в глубину): рекурсия и стек, применение","Алгоритмы на графах, создание и обзор графа через код"],tasks:["Реализовать BFS и DFS","Number of Islands (LeetCode #200)"],hw:"Clone Graph (LeetCode #133)."},{id:7,day:7,date:"вс, 7 июня",type:"lecture",title:"Структуры данных: массивы и связанные списки",theory:["Массивы: хранение в памяти, доступ за O(1), вставка и удаление","Динамические массивы: как массив растёт под капотом при добавлении","Связанный список: узлы и указатели, операции и их сложность","Двусвязный список: обход в обе стороны","Когда массив, когда связный список — таблица сравнения"],tasks:["Реализовать LinkedList с методами: add, remove, find, print","Задача: перевернуть связанный список in-place"],hw:"Reverse Linked List (LeetCode #206) — итеративно и рекурсивно."},{id:8,day:8,date:"пн, 8 июня",type:"lecture",title:"Структуры данных: стек и очередь",theory:["Стек (Stack): принцип LIFO, операции push/pop/peek — O(1)","Применение стека: история браузера, undo/redo, вычисление выражений","Очередь (Queue): принцип FIFO, enqueue/dequeue","Применение очереди: очередь задач, BFS-обходы, буфер","Deque (двусторонняя очередь): когда нужны операции с обоих концов"],tasks:["Реализовать стек через массив и через связный список","Задача: Valid Parentheses (LeetCode #20)"],hw:"Implement Queue using Stacks (LeetCode #232) — реализовать очередь из двух стеков."},{id:9,day:9,date:"вт, 9 июня",type:"lecture",title:"Структуры данных: хэш-таблицы",theory:["Идея хеширования: ключ → индекс за O(1)","Хеш-функции: что делает функцию хорошей","Метод 1 — Chaining (цепочка): каждая ячейка хранит список (цепочку) всех элементов с одинаковым хешем","Метод 2 — Open Addressing / Linear Probing: при коллизии ищем следующую свободную ячейку (hash(key), hash(key)+1, hash(key)+2...)","Метод 3 — Double Hashing: две хеш-функции для более эффективного поиска (hash1(key), hash1(key)+hash2(key), hash1(key)+2*hash2(key)...)","Сравнение методов: Chaining проще, Double Hashing лучше для кэша","Словари и хэш-мапы: встроенные реализации в разных языках (Python dict, JavaScript Map)","Применение: кэширование, поиск, дедупликация, частотный анализ, индексирование"],tasks:["Two Sum (LeetCode #1) — решить с хэш-таблицей","Group Anagrams (LeetCode #49)"],hw:"Longest Substring Without Repeating Characters (LeetCode #3)."},{id:10,day:10,date:"ср, 10 июня",type:"lecture",title:"Структуры данных: деревья",theory:["Дерево: узлы, рёбра, корень, листья, высота, уровни","Бинарное дерево поиска (BST): свойство, вставка, поиск, удаление","Обходы: in-order, pre-order, post-order — рекурсивно и итеративно","AVL-деревья: самобалансирующееся дерево, коэффициент баланса, повороты (LL, RR, LR, RL)","AVL операции: O(log n) для поиска, вставки, удаления благодаря балансировке","Red-Black деревья: цвета узлов (красный/чёрный), правила балансировки, менее строгие чем AVL","Red-Black преимущества: меньше ротаций при вставке/удалении, проще реализация","Когда какое дерево: AVL для частого поиска, Red-Black для частых обновлений","Применение деревьев: файловая система, индексы в БД, STL map/set в C++"],tasks:["Реализовать BST с insert, search, min/max","Maximum Depth of Binary Tree (LeetCode #104)"],hw:"Validate Binary Search Tree (LeetCode #98)."}],Zu=[{month:"june",week:"Неделя 1 · 1–7 июня",days:[{id:1,date:"1 июня",title:"Введение. Алгоритмы и Big O",status:"done",mats:[]},{id:2,date:"2 июня",title:"Массивы и связанные списки",status:"done",mats:[]},{id:3,date:"3 июня",title:"Стеки, очереди, хэш-таблицы",status:"done",mats:[]},{id:4,date:"4 июня",title:"Деревья. BFS и DFS",status:"available",mats:[]},{id:5,date:"5 июня",title:"Графы и алгоритмы",status:"available",mats:[]},{id:6,date:"6 июня",title:"Динамическое программирование",status:"available",mats:[]},{id:7,date:"7 июня",title:"Обзор и закрепление недели 1",status:"available",mats:[]}]},{month:"june",week:"Неделя 2 · 8–10 июня",days:[{id:8,date:"8 июня",title:"Структуры данных: стеки и очереди",status:"available",mats:[]},{id:9,date:"9 июня",title:"Структуры данных: хеш-таблицы",status:"available",mats:[]},{id:10,date:"10 июня",title:"Структуры данных: деревья",status:"available",mats:[]}]}],Ex={intro:"#6eb5ff",lecture:"#c8ff00",insider:"#a07aff",project:"#ff9f50",org:"#8a8a9a",demo:"#ff5f5f"},eh={intro:"Введение",lecture:"Лекция",insider:"Insider Show",project:"Проект",org:"Орг",demo:"Демо-день"},th={intro:"badge--blue",lecture:"badge--lime",insider:"badge--purple",project:"badge--orange",org:"badge--gray",demo:"badge--red"},rh={1:"https://disk.yandex.ru/d/vBFq6jGQXn3XeQ",2:"https://disk.yandex.ru/d/8ND9CE1jN-KZag",3:"https://disk.yandex.ru/d/Dp9TSjAzcaPIzQ",4:"https://disk.yandex.ru/d/nGMtfv16ARM5Vw",5:"https://disk.yandex.ru/d/m6St3COwjHEWLA",6:"https://disk.yandex.ru/d/hwlCvydBRTSdDg",7:"https://disk.yandex.ru/d/SFt-fMhRjdX4cw",8:"https://disk.yandex.ru/d/5TtGY3PUU6jXTw",9:"https://disk.yandex.ru/d/BpbiXs33cjNrtQ",10:"https://disk.yandex.ru/d/S4ow_h8TF367kg"};function Sx(){return t.jsxs("div",{className:"skeleton-schedule-day",children:[t.jsx("div",{className:"skeleton skeleton-title"}),t.jsx("div",{className:"skeleton skeleton-block",style:{width:"60%"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"90%"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"85%"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"70%"}})]})}function Tx(){return t.jsxs("div",{className:"skeleton-schedule-day",children:[t.jsx("div",{className:"skeleton skeleton-block",style:{width:"80%",height:18}}),t.jsx("div",{className:"skeleton skeleton-title",style:{margin:"8px 0"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"50%"}})]})}function nh(){return t.jsxs("div",{className:"skeleton-news-card",children:[t.jsx("div",{className:"skeleton skeleton-news-card-title"}),t.jsx("div",{className:"skeleton skeleton-news-card-text"}),t.jsx("div",{className:"skeleton skeleton-news-card-text"})]})}function wx(){return t.jsxs("div",{className:"skeleton-schedule-day",children:[t.jsx("div",{className:"skeleton skeleton-block",style:{width:"30%",height:14}}),t.jsx("div",{className:"skeleton skeleton-title",style:{margin:"8px 0"}}),t.jsx("div",{className:"skeleton skeleton-text",style:{width:"65%"}})]})}function sh(){return t.jsx("div",{style:{marginBottom:24},children:[1,2,3].map(e=>t.jsxs("div",{style:{marginBottom:16},children:[t.jsxs("div",{style:{display:"flex",gap:10,marginBottom:8},children:[t.jsx("div",{className:"skeleton skeleton-block",style:{width:"80px"}}),t.jsx("div",{className:"skeleton skeleton-block",style:{flex:1}})]}),t.jsx("div",{className:"skeleton skeleton-block",style:{height:8}})]},e))})}const kx=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],bx=["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"];function Lx(){const e=new Date;e.setHours(0,0,0,0);const r=[{label:"Июнь",total:30,start:new Date(2026,5,1)},{label:"Июль",total:31,start:new Date(2026,6,1)},{label:"Август",total:31,start:new Date(2026,7,1)}];return t.jsx("div",{className:"camp-progress",children:r.map(n=>{let s=0;const i=Array.from({length:n.total},(l,a)=>{const o=new Date(n.start);o.setDate(o.getDate()+a);const c=o.getTime()===e.getTime(),d=o<e;return(c||d)&&s++,{isToday:c,isPast:d}});return t.jsxs("div",{className:"camp-month-bar",children:[t.jsxs("div",{className:"camp-month-head",children:[t.jsx("span",{className:"camp-month-name",children:n.label}),t.jsxs("span",{className:"camp-month-pct",children:[s,"/",n.total," · ",Math.round(s/n.total*100),"%"]})]}),t.jsx("div",{className:"camp-segs",children:i.map((l,a)=>t.jsx("div",{className:`camp-seg${l.isToday?" s-today":l.isPast?" s-past":""}`},a))})]},n.label)})})}function Cx(e){const r=Math.floor(e/3600),n=Math.floor(e%3600/60),s=e%60;return`${String(r).padStart(2,"0")}:${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function Rx({onOpenDay:e,onNavigate:r}){var P,b,I;const[n,s]=x.useState([]),[i,l]=x.useState(mr),[a,o]=x.useState(Zu),[c,d]=x.useState(()=>localStorage.getItem("kiro_notes")||""),[u,m]=x.useState(!0),[y,g]=x.useState(0),[N,j]=x.useState(25),[T,p]=x.useState(0),[h,f]=x.useState(null),[v,E]=x.useState(!1),L=x.useRef(null);x.useEffect(()=>{const _=Date.now(),J=500;Promise.all([ft.announcements().then(s).catch(()=>{}),ft.schedule().then(l).catch(()=>{}),ft.library().then(o).catch(()=>{})]).then(()=>{const Ot=Date.now()-_,yt=Math.max(0,J-Ot);setTimeout(()=>m(!1),yt)})},[]),x.useEffect(()=>(v?L.current=setInterval(()=>{f(_=>_<=1?(clearInterval(L.current),E(!1),0):_-1)},1e3):clearInterval(L.current),()=>clearInterval(L.current)),[v]);const w=y*3600+N*60+T,C=()=>{h===null&&f(w),E(!0)},B=()=>E(!1),A=()=>{E(!1),f(null)},Y=_=>{d(_.target.value),localStorage.setItem("kiro_notes",_.target.value)},pe=new Date,me=pe.getFullYear()===2026&&pe.getMonth()===5?pe.getDate():null,fe=me?rh[me]:null,er=a.flatMap(_=>_.days),Ge=me?er.find(_=>(_.num??_.id)===me):null,R=i.filter(_=>me?_.day>=me:!0).slice(0,3),D=`${bx[pe.getDay()]}, ${pe.getDate()} ${kx[pe.getMonth()]} ${pe.getFullYear()}`;return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Дэшборд"}),t.jsx("p",{className:"page-subtitle",style:{textTransform:"capitalize"},children:D})]}),u?t.jsx(sh,{}):t.jsx(Lx,{}),t.jsxs("div",{className:"dash-grid",children:[t.jsxs("div",{className:"dash-col",children:[t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:"Новости и обновления"})}),u?[1,2].map(_=>t.jsx(nh,{},_)):n.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13,padding:"4px 0"},children:"Объявлений пока нет"}):n.slice(0,3).map((_,J)=>t.jsxs("div",{className:"news-card fade-in",style:{animationDelay:`${J*.05}s`},children:[t.jsxs("div",{className:"news-card-head",children:[t.jsxs("span",{className:"news-card-title",children:[_.icon||"📢"," ",_.title]}),t.jsx("span",{className:"news-card-date",children:_.published_at})]}),t.jsx("div",{className:"news-card-text",children:_.text})]},_.id)),!u&&n.length>3&&t.jsx("div",{className:"dash-nav-link",style:{marginTop:10},onClick:()=>r("announcements"),children:"Показать еще →"})]}),t.jsxs("div",{className:"widget",children:[t.jsxs("div",{className:"widget-header",children:[t.jsx("span",{className:"widget-title",children:"Заметки"}),t.jsx("button",{onClick:()=>{d(""),localStorage.removeItem("kiro_notes")},style:{fontSize:12,color:"var(--text-tertiary)",background:"none",border:"none",cursor:"pointer"},children:"Очистить"})]}),t.jsx("textarea",{className:"notes-area",value:c,onChange:Y,placeholder:"Пиши здесь что угодно — сохраняется автоматически"})]})]}),t.jsxs("div",{className:"dash-col",children:[t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:me?`Сегодня — День ${me}`:"Сегодня"})}),me?t.jsxs(t.Fragment,{children:[fe&&t.jsx("a",{href:fe,target:"_blank",rel:"noopener",className:"today-block",children:t.jsxs("div",{children:[t.jsx("div",{className:"today-block-label",children:"Домашнее задание"}),t.jsx("div",{className:"today-block-link",children:"Открыть папку с ДЗ →"})]})}),Ge&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"today-block",style:(P=Ge.mats)!=null&&P.length?{cursor:"pointer"}:void 0,onClick:(b=Ge.mats)!=null&&b.length?()=>e(Ge):void 0,children:t.jsxs("div",{children:[t.jsx("div",{className:"today-block-label",children:"Материалы дня"}),t.jsxs("div",{className:"today-block-text",children:[Ge.title,(I=Ge.mats)!=null&&I.length?" →":""]})]})}),t.jsx("div",{className:"dash-nav-link",onClick:()=>r("library"),children:"Все материалы →"})]})]}):t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13},children:"Лагерь ещё не начался или завершился"})]}),t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:"Ближайшие события"})}),u?[1,2,3].map(_=>t.jsx(wx,{},_)):R.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13},children:"Событий нет"}):R.map((_,J)=>t.jsxs("div",{className:"event-mini fade-in",style:{animationDelay:`${J*.05}s`},children:[t.jsxs("div",{className:"event-mini-day",children:["День ",_.day]}),t.jsx("div",{className:"event-mini-title",children:_.title}),t.jsx("span",{className:`badge ${th[_.type]||"badge--gray"}`,style:{flexShrink:0},children:eh[_.type]||_.type})]},J)),t.jsx("div",{className:"dash-nav-link",style:{marginTop:10},onClick:()=>r("schedule"),children:"Все события →"})]}),t.jsxs("div",{className:"widget",children:[t.jsx("div",{className:"widget-header",children:t.jsx("span",{className:"widget-title",children:"Таймер"})}),h!==null?t.jsx("div",{className:`timer-display${h===0?" timer-done":""}`,children:h===0?"Время вышло!":Cx(h)}):t.jsxs("div",{className:"timer-setup",children:[t.jsx("input",{type:"number",min:"0",max:"23",value:y,onChange:_=>g(Math.max(0,Math.min(23,+_.target.value||0)))}),t.jsx("span",{children:"ч"}),t.jsx("input",{type:"number",min:"0",max:"59",value:N,onChange:_=>j(Math.max(0,Math.min(59,+_.target.value||0)))}),t.jsx("span",{children:"мин"}),t.jsx("input",{type:"number",min:"0",max:"59",value:T,onChange:_=>p(Math.max(0,Math.min(59,+_.target.value||0)))}),t.jsx("span",{children:"сек"})]}),t.jsxs("div",{className:"timer-btns",children:[h===null?t.jsx("button",{className:"timer-btn-start",onClick:C,disabled:w===0,children:"Старт"}):v?t.jsx("button",{className:"timer-btn-pause",onClick:B,children:"Пауза"}):h>0?t.jsx("button",{className:"timer-btn-start",onClick:C,children:"Продолжить"}):null,h!==null&&t.jsx("button",{className:"timer-btn-reset",onClick:A,children:"Сбросить"})]})]})]})]})]})}const Ox=[{value:"all",label:"Все"},{value:"lecture",label:"Лекции"},{value:"project",label:"Проекты"},{value:"insider",label:"Insider Show"},{value:"org",label:"Орг"}],_x=[{label:"Неделя 1 · 1–7 июня",start:1,end:7},{label:"Неделя 2 · 8–14 июня",start:8,end:14},{label:"Неделя 3 · 15–21 июня",start:15,end:21},{label:"Неделя 4 · 22–28 июня",start:22,end:28},{label:"Неделя 5 · 29–30 июня",start:29,end:99}];function Ix(e){return e<=30?new Date(2026,5,e):new Date(2026,6,e-30)}function Ax(e){const r=new Date;return r.setHours(0,0,0,0),Ix(e)<=r}function uc(e){const r=new Date;if(r.getFullYear()!==2026||r.getMonth()!==5)return null;const n=e.find(s=>s.day===r.getDate());return n?n.id:null}function Dx(){const e=new Date;e.setHours(0,0,0,0);const r=[{label:"Июнь",total:30,start:new Date(2026,5,1)},{label:"Июль",total:31,start:new Date(2026,6,1)},{label:"Август",total:31,start:new Date(2026,7,1)}];return t.jsx("div",{className:"camp-progress",children:r.map(n=>{let s=0;const i=Array.from({length:n.total},(a,o)=>{const c=new Date(n.start);c.setDate(c.getDate()+o);const d=c.getTime()===e.getTime(),u=c<e;return(d||u)&&s++,{isToday:d,isPast:u}}),l=Math.round(s/n.total*100);return t.jsxs("div",{className:"camp-month-bar",children:[t.jsxs("div",{className:"camp-month-head",children:[t.jsx("span",{className:"camp-month-name",children:n.label}),t.jsxs("span",{className:"camp-month-pct",children:[s,"/",n.total," · ",l,"%"]})]}),t.jsx("div",{className:"camp-segs",children:i.map((a,o)=>t.jsx("div",{className:`camp-seg${a.isToday?" s-today":a.isPast?" s-past":""}`},o))})]},n.label)})})}function Px({day:e,expanded:r,onToggle:n}){var c;const s=Ex[e.type]||"#8a8a9a",i=th[e.type]||"badge--gray",l=eh[e.type]||e.type,a=rh[e.day],o=Ax(e.day);return t.jsxs("div",{className:`sched-day${r?" sched-day--open":""}`,children:[t.jsxs("div",{className:"sched-day-header",onClick:n,children:[t.jsx("div",{className:"sched-day-stripe",style:{background:s}}),t.jsxs("div",{className:"sched-day-meta",children:[t.jsxs("span",{className:"sched-day-num",children:["День ",e.day]}),t.jsx("span",{className:"sched-day-sep",children:"·"}),t.jsx("span",{className:"sched-day-date",children:e.date})]}),t.jsx("div",{className:"sched-day-title",children:e.title}),t.jsx("span",{className:`badge ${i}`,children:l}),t.jsx("span",{className:"sched-chevron",children:r?"▴":"▾"})]}),r&&t.jsxs("div",{className:"sched-day-body",children:[(e.meeting_time||e.meeting_link)&&t.jsxs("div",{className:"sched-section",children:[t.jsx("div",{className:"sched-section-label",children:"Встреча"}),t.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"center"},children:[e.meeting_time&&t.jsxs("span",{style:{fontSize:"14px",fontWeight:600,color:"var(--accent-lime)"},children:["🕐 ",e.meeting_time]}),e.meeting_link&&(o?t.jsx("a",{href:e.meeting_link,target:"_blank",rel:"noopener",className:"hw-drive-btn",children:"🔗 Присоединиться →"}):t.jsxs("span",{className:"hw-drive-btn hw-drive-btn--locked",children:["🔒 Доступ ",e.date]}))]})]}),((c=e.theory)==null?void 0:c.length)>0&&t.jsxs("div",{className:"sched-section",children:[t.jsx("div",{className:"sched-section-label",children:"Теория"}),t.jsx("ul",{className:"sched-list",children:e.theory.map((d,u)=>t.jsx("li",{children:d},u))})]}),a&&t.jsxs("div",{className:"sched-section",children:[t.jsx("div",{className:"sched-section-label",children:"Домашнее задание"}),o?t.jsx("a",{href:a,className:"hw-drive-btn",target:"_blank",rel:"noopener",children:"Открыть папку с ДЗ →"}):t.jsxs("span",{className:"hw-drive-btn hw-drive-btn--locked",children:["🔒 Откроется ",e.date]})]})]})]})}function Fx(){const[e,r]=x.useState("all"),[n,s]=x.useState(mr),[i,l]=x.useState(()=>uc(mr)),[a,o]=x.useState(!0);x.useEffect(()=>{const u=Date.now(),m=500;ft.schedule().then(y=>{s(y);const g=uc(y);g!==null&&l(g);const N=Date.now()-u,j=Math.max(0,m-N);setTimeout(()=>o(!1),j)}).catch(()=>{const y=Date.now()-u,g=Math.max(0,m-y);setTimeout(()=>o(!1),g)})},[]);const c=e==="all"?n:n.filter(u=>u.type===e),d=u=>l(m=>m===u?null:u);return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Расписание"}),t.jsx("p",{className:"page-subtitle",children:"Программа лагеря — теория, задания и ДЗ по каждому дню"})]}),a?t.jsx(sh,{}):t.jsx(Dx,{}),t.jsx("div",{className:"schedule-controls",children:Ox.map(u=>t.jsx("button",{className:`filter-btn${e===u.value?" active":""}`,onClick:()=>{r(u.value),l(null)},disabled:a,children:u.label},u.value))}),a?t.jsx("div",{className:"sched-week",children:[1,2,3,4,5].map(u=>t.jsx(Sx,{},u))}):_x.map(u=>{const m=c.filter(y=>y.day>=u.start&&y.day<=u.end);return m.length?t.jsxs("div",{className:"sched-week",children:[t.jsx("div",{className:"schedule-date-label",children:u.label}),m.map((y,g)=>t.jsx("div",{className:"fade-in",style:{animationDelay:`${g*.02}s`},children:t.jsx(Px,{day:y,expanded:i===y.id,onToggle:()=>d(y.id)})},y.id))]},u.label):null}),!a&&!c.length&&t.jsx("p",{style:{color:"var(--text-tertiary)",padding:"20px 0"},children:"Нет занятий для этого фильтра"})]})}const Bx=[{value:"june",label:"Июнь — Фундамент",locked:!1},{value:"july",label:"Июль — Специализация",locked:!0},{value:"august",label:"Август — Карьера",locked:!0}],Mx=[{label:"Неделя 1 · 1–7 июня",start:1,end:7},{label:"Неделя 2 · 8–14 июня",start:8,end:14},{label:"Неделя 3 · 15–21 июня",start:15,end:21},{label:"Неделя 4 · 22–28 июня",start:22,end:28},{label:"Неделя 5 · 29–30 июня",start:29,end:99}],Hx=["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"],Ux=["ЯНВАРЯ","ФЕВРАЛЯ","МАРТА","АПРЕЛЯ","МАЯ","ИЮНЯ","ИЮЛЯ","АВГУСТА","СЕНТЯБРЯ","ОКТЯБРЯ","НОЯБРЯ","ДЕКАБРЯ"];function zx(e){const r=new Date(2026,5,e);return`${Hx[r.getDay()]}, ${e} ${Ux[r.getMonth()]}`}function Wx(e){const r=new Date;return r.setHours(0,0,0,0),new Date(2026,5,e)<=r}function qx(e){const n=new Date().getDate();return e>=2&&e<=n}function Gx(e,r){const n={};r.forEach(i=>{i.days.forEach(l=>{const a=l.num??l.id;n[a]={title:l.title,mats:l.mats||[],id:l.id}})});const s={};return e.filter(i=>i.day>=1&&i.day<=30).forEach(i=>{s[i.day]=i.title}),Array.from({length:30},(i,l)=>{const a=l+1,o=n[a];return{id:(o==null?void 0:o.id)??a,day:a,title:(o==null?void 0:o.title)||s[a]||`День ${a}`,mats:(o==null?void 0:o.mats)||[]}})}function $x({day:e,onOpen:r,onOpenTheory:n,onOpenQuestions:s,onOpenHomework:i}){var d;const l=!Wx(e.day),a=qx(e.day),o=l?"rgba(255,255,255,0.08)":"#c8ff00",c=((d=e.mats)==null?void 0:d.length)>0;return t.jsx("div",{className:`sched-day${!l&&c?" sched-day--open":""}`,style:l?{opacity:.4}:c?{cursor:"pointer",borderColor:"rgba(200,255,0,0.1)"}:{cursor:"default"},onClick:!l&&c?()=>r(e):void 0,children:t.jsxs("div",{className:"sched-day-header",style:{pointerEvents:"none"},children:[t.jsx("div",{className:"sched-day-stripe",style:{background:o}}),t.jsxs("div",{className:"sched-day-meta",children:[t.jsx("span",{className:"sched-day-num",children:String(e.day).padStart(2,"0")}),t.jsx("span",{className:"sched-day-sep",children:"·"}),t.jsx("span",{className:"sched-day-date",children:zx(e.day)})]}),t.jsx("div",{className:"sched-day-title",children:e.title}),t.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[a&&t.jsxs(t.Fragment,{children:[t.jsx("button",{className:"theory-file-btn",onClick:u=>{u.stopPropagation(),n(e)},title:"Открыть теорию",children:"📚"}),e.day!==13&&t.jsx("button",{className:"theory-file-btn",onClick:u=>{u.stopPropagation(),s(e)},title:"Открыть задачи для тренировки",children:"✅"}),t.jsx("button",{className:"theory-file-btn",onClick:u=>{u.stopPropagation(),i(e)},title:"Открыть домашние задания",children:"📝"})]}),!l&&c&&t.jsx("button",{className:"theory-file-btn",onClick:u=>{u.stopPropagation(),r(e)},title:"Открыть материалы",children:"🔗"})]})]})})}function Vx({onOpenDay:e,onOpenTheory:r,onOpenQuestions:n,onOpenHomework:s}){const[i,l]=x.useState("june"),[a,o]=x.useState(Zu),[c,d]=x.useState(mr),[u,m]=x.useState(!0);x.useEffect(()=>{const g=Date.now(),N=500;Promise.all([ft.library().then(o).catch(()=>{}),ft.schedule().then(d).catch(()=>{})]).then(()=>{const j=Date.now()-g,T=Math.max(0,N-j);setTimeout(()=>m(!1),T)})},[]);const y=Gx(c,a);return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Библиотека знаний"}),t.jsx("p",{className:"page-subtitle",children:"Материалы лагеря по дням — нажми на день чтобы открыть"})]}),t.jsx("div",{className:"library-tabs",children:Bx.map(g=>t.jsxs("button",{className:`lib-tab${i===g.value?" active":""}${g.locked?" lib-tab--locked":""}`,onClick:g.locked?void 0:()=>l(g.value),disabled:g.locked,children:[g.label,g.locked?" 🔒":""]},g.value))}),i==="june"?u?t.jsx("div",{className:"sched-week",children:[1,2,3,4,5,6].map(g=>t.jsx(Tx,{},g))}):Mx.map(g=>{const N=y.filter(j=>j.day>=g.start&&j.day<=g.end);return N.length?t.jsxs("div",{className:"sched-week",children:[t.jsx("div",{className:"schedule-date-label",children:g.label}),N.map((j,T)=>t.jsx("div",{className:"fade-in",style:{animationDelay:`${T*.02}s`},children:t.jsx($x,{day:j,onOpen:e,onOpenTheory:r,onOpenQuestions:n,onOpenHomework:s})},j.id))]},g.label):null}):t.jsx("p",{style:{color:"var(--text-tertiary)",padding:"20px 0"},children:"Материалы появятся позже"})]})}const Qx=[{href:"https://t.me/kiro_team",icon:"📣",title:"Канал KIRO Team",desc:"Главный канал сообщества. Объявления, новости и важная информация о лагере.",tag:"→ Открыть в Telegram"},{href:"https://t.me/kiro_team_manager",icon:"👨‍💼",title:"Менеджер",desc:"Вопросы по оплате, доступу и организационным моментам — пиши менеджеру.",tag:"→ Написать менеджеру"}];function Yx({onNavigate:e}){const[r,n]=x.useState([]);return x.useEffect(()=>{ft.links().then(n).catch(()=>{})},[]),t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Полезные ссылки"}),t.jsx("p",{className:"page-subtitle",children:"Каналы, контакты и материалы для участников"})]}),t.jsxs("div",{className:"community-grid",children:[Qx.map((s,i)=>t.jsxs("a",{className:"community-card",href:s.href,target:"_blank",rel:"noopener",children:[t.jsx("div",{className:"community-card-icon",children:s.icon}),t.jsx("div",{className:"community-card-title",children:s.title}),t.jsx("div",{className:"community-card-desc",children:s.desc}),t.jsx("div",{className:"community-card-tag",children:s.tag})]},i)),r.map(s=>t.jsxs("a",{className:"community-card",href:s.url,target:"_blank",rel:"noopener",children:[t.jsx("div",{className:"community-card-icon",children:"🔗"}),t.jsx("div",{className:"community-card-title",children:s.title}),t.jsx("div",{className:"community-card-desc",children:s.description}),t.jsx("div",{className:"community-card-tag",children:"→ Открыть"})]},s.id)),t.jsxs("div",{className:"community-card",style:{border:"2px dashed var(--border-color)",background:"rgba(200,255,0,0.02)",display:"flex",flexDirection:"column",cursor:"default"},children:[t.jsx("div",{className:"community-card-icon",children:"🔗"}),t.jsx("div",{className:"community-card-title",children:"Полезные материалы"}),t.jsx("div",{className:"community-card-desc",children:"Здесь будут размещаться ссылки на статьи, видео, документацию и другие материалы по ходу лагеря."}),t.jsx("div",{style:{fontSize:11,color:"var(--text-tertiary)",marginTop:"auto",paddingTop:8,borderTop:"1px solid var(--border-color)"},children:"Скоро добавим →"})]})]}),t.jsxs("div",{style:{marginTop:32,padding:"16px",background:"rgba(200,255,0,0.05)",borderRadius:"8px",fontSize:13,color:"var(--text-secondary)",lineHeight:1.6},children:[t.jsx("strong",{children:"Где найти другие материалы:"}),t.jsxs("ul",{style:{marginTop:8},children:[t.jsxs("li",{children:["Домашнее задание — в"," ",t.jsx("button",{onClick:()=>e("tasks"),style:{background:"none",border:"none",color:"var(--accent-lime)",fontWeight:700,cursor:"pointer",textDecoration:"underline",padding:0,font:"inherit"},children:"Заданиях"})]}),t.jsxs("li",{style:{marginTop:4},children:["Материалы по дням лагеря — в"," ",t.jsx("button",{onClick:()=>e("library"),style:{background:"none",border:"none",color:"var(--accent-lime)",fontWeight:700,cursor:"pointer",textDecoration:"underline",padding:0,font:"inherit"},children:"Библиотеке знаний"})]})]})]})]})}function Va({src:e}){const r=x.useRef(null),n=x.useRef(null),[s,i]=x.useState(!1),[l,a]=x.useState(0),[o,c]=x.useState(0),[d,u]=x.useState(1),[m,y]=x.useState(1),[g,N]=x.useState(!1),[j,T]=x.useState(0),[p,h]=x.useState(!1),[f,v]=x.useState(!1),[E,L]=x.useState(!1),[w,C]=x.useState(0),B=x.useRef(null),A=x.useRef(!1),Y=[.5,1,1.5,2],pe=x.useCallback(()=>{const b=B.current;b&&(document.fullscreenElement?document.exitFullscreen():b.requestFullscreen())},[]),qe=x.useCallback(()=>{const b=r.current;b&&(b.paused?(b.play(),i(!0)):(b.pause(),i(!1)))},[]),me=x.useCallback(b=>{const I=r.current;I&&(I.playbackRate=b),u(b),h(!1)},[]),fe=b=>{const I=n.current;if(!I)return 0;const _=I.getBoundingClientRect();return Math.max(0,Math.min(1,(b-_.left)/_.width))},er=x.useCallback(b=>{const I=r.current;!I||!I.duration||(A.current=I.paused,I.paused||I.pause(),L(!0),C(fe(b.clientX)*100))},[]);x.useEffect(()=>{const b=_=>{E&&C(fe(_.clientX)*100)},I=_=>{if(!E)return;const J=r.current;J&&J.duration&&(J.currentTime=fe(_.clientX)*J.duration),L(!1),!A.current&&J&&(J.play(),i(!0))};return document.addEventListener("mousemove",b),document.addEventListener("mouseup",I),()=>{document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",I)}},[E]);const Ge=x.useCallback(b=>{const I=r.current,_=parseFloat(b.target.value);I&&(I.volume=_,I.muted=_===0),y(_),N(_===0)},[]),R=x.useCallback(()=>{const b=r.current;b&&(b.muted=!b.muted,N(b.muted))},[]);x.useEffect(()=>{const b=r.current;if(!b)return;const I=()=>a(b.currentTime),_=()=>c(b.duration),J=()=>i(!1),Ot=()=>{b.buffered.length>0&&T(b.buffered.end(b.buffered.length-1)/b.duration*100)};return b.addEventListener("timeupdate",I),b.addEventListener("loadedmetadata",_),b.addEventListener("ended",J),b.addEventListener("progress",Ot),()=>{b.removeEventListener("timeupdate",I),b.removeEventListener("loadedmetadata",_),b.removeEventListener("ended",J),b.removeEventListener("progress",Ot)}},[]),x.useEffect(()=>{const b=I=>{I.target.closest("[data-speed-menu]")||h(!1)};return document.addEventListener("click",b),()=>document.removeEventListener("click",b)},[]),x.useEffect(()=>{const b=()=>v(!!document.fullscreenElement);return document.addEventListener("fullscreenchange",b),()=>document.removeEventListener("fullscreenchange",b)},[]);const D=b=>{if(!b||isNaN(b))return"0:00";const I=Math.floor(b/60),_=Math.floor(b%60);return`${I}:${_.toString().padStart(2,"0")}`},P=E?w:o?l/o*100:0;return t.jsxs("div",{ref:B,style:{maxWidth:800,margin:"0 auto 32px",background:"#0d0d18",borderRadius:f?0:"12px",overflow:"hidden",border:"1px solid var(--border-color)",...f&&{display:"flex",flexDirection:"column",width:"100vw",height:"100vh",maxWidth:"none",margin:0}},children:[t.jsxs("div",{style:{position:"relative",background:"#000",cursor:"pointer",...f&&{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}},onClick:qe,children:[t.jsx("video",{ref:r,src:e,style:{width:"100%",display:"block",...f?{width:"100%",height:"100%",objectFit:"contain"}:{maxHeight:"480px",objectFit:"contain"}},preload:"metadata"}),!s&&t.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"},children:t.jsx("div",{style:{width:64,height:64,borderRadius:"50%",background:"rgba(200,255,0,0.15)",backdropFilter:"blur(8px)",border:"2px solid var(--accent-lime)",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"var(--accent-lime)",children:t.jsx("polygon",{points:"5,3 19,12 5,21"})})})})]}),t.jsxs("div",{ref:n,onMouseDown:er,style:{height:E?6:4,background:"var(--bg-tertiary)",cursor:"pointer",position:"relative",transition:"height 0.1s",userSelect:"none"},children:[t.jsx("div",{style:{position:"absolute",left:0,top:0,height:"100%",width:`${j}%`,background:"rgba(255,255,255,0.1)",transition:"width 0.3s"}}),t.jsx("div",{style:{position:"absolute",left:0,top:0,height:"100%",width:`${P}%`,background:"var(--accent-lime)"}}),t.jsx("div",{style:{position:"absolute",top:"50%",left:`${P}%`,transform:"translate(-50%, -50%)",width:E?16:12,height:E?16:12,borderRadius:"50%",background:"var(--accent-lime)",boxShadow:E?"0 0 10px rgba(200,255,0,0.8)":"0 0 6px rgba(200,255,0,0.6)",transition:"width 0.1s, height 0.1s, box-shadow 0.1s"}})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:"var(--bg-secondary)"},children:[t.jsx("button",{onClick:qe,style:{width:40,height:40,borderRadius:"50%",background:"var(--accent-lime)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"transform 0.15s"},onMouseEnter:b=>b.currentTarget.style.transform="scale(1.1)",onMouseLeave:b=>b.currentTarget.style.transform="scale(1)",children:s?t.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"#000",children:[t.jsx("rect",{x:"6",y:"4",width:"4",height:"16"}),t.jsx("rect",{x:"14",y:"4",width:"4",height:"16"})]}):t.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"#000",children:t.jsx("polygon",{points:"5,3 19,12 5,21"})})}),t.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:13,fontVariantNumeric:"tabular-nums",flexShrink:0},children:[D(l)," / ",D(o)]}),t.jsx("div",{style:{flex:1}}),t.jsx("button",{onClick:R,style:Vi,children:g||m===0?t.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[t.jsx("polygon",{points:"11,5 6,9 2,9 2,15 6,15 11,19"}),t.jsx("line",{x1:"23",y1:"9",x2:"17",y2:"15"}),t.jsx("line",{x1:"17",y1:"9",x2:"23",y2:"15"})]}):t.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[t.jsx("polygon",{points:"11,5 6,9 2,9 2,15 6,15 11,19"}),t.jsx("path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07"})]})}),t.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:g?0:m,onChange:Ge,style:{width:70,accentColor:"var(--accent-lime)",cursor:"pointer"}}),t.jsxs("div",{style:{position:"relative"},"data-speed-menu":!0,children:[t.jsxs("button",{onClick:b=>{b.stopPropagation(),h(I=>!I)},style:{...Vi,padding:"4px 10px",borderRadius:6,background:p?"var(--bg-tertiary)":"transparent",fontSize:13,fontWeight:600,color:"var(--accent-lime)",minWidth:44,border:"1px solid var(--border-color)"},children:[d,"×"]}),p&&t.jsx("div",{style:{position:"absolute",bottom:"110%",right:0,background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:8,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.4)",zIndex:10},children:Y.map(b=>t.jsxs("button",{onClick:I=>{I.stopPropagation(),me(b)},style:{display:"block",width:"100%",padding:"8px 20px",background:b===d?"rgba(200,255,0,0.1)":"transparent",color:b===d?"var(--accent-lime)":"var(--text-primary)",border:"none",cursor:"pointer",fontSize:13,fontWeight:500,textAlign:"center",transition:"background 0.15s"},onMouseEnter:I=>{b!==d&&(I.currentTarget.style.background="rgba(255,255,255,0.05)")},onMouseLeave:I=>{b!==d&&(I.currentTarget.style.background="transparent")},children:[b,"×"]},b))})]}),t.jsx("button",{onClick:pe,style:Vi,title:f?"Свернуть":"На весь экран",children:f?t.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:[t.jsx("path",{d:"M8 3v3a2 2 0 0 1-2 2H3"}),t.jsx("path",{d:"M21 8h-3a2 2 0 0 1-2-2V3"}),t.jsx("path",{d:"M3 16h3a2 2 0 0 1 2 2v3"}),t.jsx("path",{d:"M16 21v-3a2 2 0 0 1 2-2h3"})]}):t.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:[t.jsx("path",{d:"M8 3H5a2 2 0 0 0-2 2v3"}),t.jsx("path",{d:"M21 8V5a2 2 0 0 0-2-2h-3"}),t.jsx("path",{d:"M3 16v3a2 2 0 0 0 2 2h3"}),t.jsx("path",{d:"M16 21h3a2 2 0 0 0 2-2v-3"})]})})]})]})}const Vi={background:"transparent",border:"none",color:"var(--text-secondary)",cursor:"pointer",padding:"4px",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",transition:"color 0.15s"};function Jx(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"KIRO IT SUMMER CAMP 2026"}),t.jsx("p",{className:"theory-subtitle",children:"Вводное занятие: старт лагеря"}),t.jsx("p",{className:"theory-date",children:"1 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Расписание занятий"}),t.jsxs("div",{className:"theory-card",children:[t.jsxs("div",{className:"theory-card-item",children:[t.jsx("span",{className:"theory-label",children:"Время проведения:"}),t.jsx("p",{className:"theory-text",children:"ежедневно примерно в 21:00 (9 вечера)"})]}),t.jsxs("div",{className:"theory-card-item",children:[t.jsx("span",{className:"theory-label",children:"Продолжительность:"}),t.jsx("p",{className:"theory-text",children:"примерно 1-1,5 часа"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Индивидуальный подход к обучению"}),t.jsx("p",{className:"theory-intro",children:"Интенсивность обучения регулируется по ходу лагеря в зависимости от ваших возможностей:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Объем домашнего задания подбирается индивидуально"}),t.jsx("li",{className:"theory-list-item",children:"Сколько времени в день вы можете уделять обучению — столько же мы будем давать вам в домашних заданиях"}),t.jsx("li",{className:"theory-list-item",children:"Если вы отстаете, вы можете только прослушать материал и попросить минимизировать или не давать домашнее задание"}),t.jsx("li",{className:"theory-list-item",children:"Все решения принимаются индивидуально с учетом ваших потребностей"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Выбор направления обучения"}),t.jsx("p",{className:"theory-intro",children:"В конце июня вы сможете выбрать специальность, на которой хотите сосредоточиться в июле-августе:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Если вы не можете выбрать направление — это совершенно нормально"}),t.jsx("li",{className:"theory-list-item",children:"Вы можете изучать все направления подряд"}),t.jsx("li",{className:"theory-list-item",children:"Кроме специализированных тем будут общие лекции"}),t.jsx("li",{className:"theory-list-item",children:"Вы сможете посещать лекции разных направлений по своему выбору"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Где найти материалы и домашние задания"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Записи занятий доступны на платформе лагеря"}),t.jsx("li",{className:"theory-list-item",children:"Домашние задания можно найти на платформе лагеря"}),t.jsx("li",{className:"theory-list-item",children:"Расписание занятий и ссылки на созвоны также находятся на платформе лагеря"}),t.jsx("li",{className:"theory-list-item",children:"Все важную информацию мы дублируем в беседе лагеря в Telegram"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Домашнее задание после первого занятия"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"1. Завести дневник лагеря"}),t.jsx("p",{className:"theory-intro",children:"Вы можете выбрать любой удобный для вас формат:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"На бумаге в тетради"}),t.jsx("li",{className:"theory-list-item",children:"В Google Таблице"}),t.jsx("li",{className:"theory-list-item",children:"В Notion"}),t.jsx("li",{className:"theory-list-item",children:"В любом другом удобном вам формате"})]}),t.jsx("p",{className:"theory-intro theory-mt",children:"В дневнике вы сможете:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Дублировать ссылки на материалы дня"}),t.jsx("li",{className:"theory-list-item",children:"Добавлять ссылки на домашние задания"}),t.jsx("li",{className:"theory-list-item",children:"Сохранять решения домашних заданий"}),t.jsx("li",{className:"theory-list-item",children:"Писать свои мысли и заметки"})]}),t.jsx("p",{className:"theory-highlight",children:"Дневник станет вашим личным хранилищем и конспектом на время обучения в лагере и после"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"2. Скачать Visual Studio Code"}),t.jsx("p",{className:"theory-text",children:"Это текстовый редактор для написания кода, который мы будем использовать на занятиях."}),t.jsx("p",{className:"theory-text",children:"Если у вас возникнут проблемы со скачиванием или установкой, обратитесь в беседе группы в Telegram — мы поможем!"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Добро пожаловать в KIRO IT SUMMER CAMP 2026! 🚀"})})]})}function M({headers:e,rows:r}){return t.jsx("div",{className:"theory-table-wrapper",children:t.jsxs("table",{className:"theory-table",children:[t.jsx("thead",{children:t.jsx("tr",{children:e.map((n,s)=>t.jsx("th",{children:n},s))})}),t.jsx("tbody",{children:r.map((n,s)=>t.jsx("tr",{children:n.map((i,l)=>t.jsx("td",{children:i},l))},s))})]})})}function S({code:e,language:r="js"}){return t.jsxs("div",{className:"theory-code-block",children:[t.jsx("div",{className:"theory-code-label",children:r}),t.jsx("pre",{className:"theory-code",children:t.jsx("code",{children:e})})]})}function F({title:e,children:r}){return t.jsxs("div",{className:"theory-example",children:[t.jsxs("div",{className:"theory-example-title",children:["💡 ",e]}),t.jsx("div",{className:"theory-example-content",children:r})]})}function be({name:e,columns:r,rows:n,highlightRows:s=[],highlightCols:i=[],caption:l}){return t.jsxs("div",{className:"db-table-illustration",style:{margin:"16px 0"},children:[e&&t.jsx("div",{style:{display:"inline-block",background:"var(--accent-lime)",color:"#0a0a14",fontWeight:700,fontSize:"12px",padding:"3px 12px",borderRadius:"6px 6px 0 0",fontFamily:"monospace"},children:e}),t.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:e?"0 8px 8px 8px":"8px"},children:t.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px",minWidth:"max-content"},children:[t.jsx("thead",{children:t.jsx("tr",{children:r.map((a,o)=>t.jsx("th",{style:{padding:"8px 14px",textAlign:"left",whiteSpace:"nowrap",background:i.includes(o)?"rgba(200,255,0,0.18)":"var(--bg-secondary)",color:i.includes(o)?"var(--accent-lime)":"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontFamily:"monospace",fontWeight:700},children:a},o))})}),t.jsx("tbody",{children:n.map((a,o)=>t.jsx("tr",{style:{background:s.includes(o)?"rgba(200,255,0,0.10)":"transparent"},children:a.map((c,d)=>t.jsx("td",{style:{padding:"7px 14px",whiteSpace:"nowrap",borderBottom:"1px solid var(--border-color)",color:i.includes(d)||s.includes(o)?"var(--text-primary)":"var(--text-secondary)",fontWeight:i.includes(d)?600:400},children:c},d))},o))})]})}),l&&t.jsx("div",{style:{fontSize:"12px",color:"var(--text-tertiary)",marginTop:"6px",fontStyle:"italic"},children:l})]})}function Kx(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 2"}),t.jsx("p",{className:"theory-subtitle",children:"Основы программирования: переменные, типы, условия"}),t.jsx("p",{className:"theory-date",children:"2 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое программа?"}),t.jsx("p",{className:"theory-text",children:"Программа — это набор инструкций, которые компьютер выполняет по порядку. Программист пишет код на специальном языке (например, Python, JavaScript), а компьютер этот код понимает и исполняет."}),t.jsx("p",{className:"theory-text",style:{marginTop:"12px"},children:"Каждая программа состоит из трёх основных частей:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Данные"})," — информация, с которой работает программа"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Инструкции"})," — команды, что делать с данными"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Порядок выполнения"})," — в каком порядке выполнять инструкции"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Переменные"}),t.jsx("p",{className:"theory-intro",children:'Переменная — это "ящик" в памяти компьютера, где можно хранить данные. У каждого ящика есть имя (название переменной) и значение (то, что в нём хранится).'}),t.jsxs(F,{title:"Аналогия из реальной жизни",children:[t.jsx("p",{children:"Представь, что переменная — это коробка, на которой написано имя:"}),t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Коробка"})," = переменная"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Надпись на коробке"}),' = имя переменной (например, "возраст")']}),t.jsxs("li",{children:[t.jsx("strong",{children:"То, что внутри коробки"})," = значение (например, число 17)"]})]})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Как объявить переменную:"}),t.jsx(S,{code:`// Python
name = "Иван"
age = 17
height = 180.5

// JavaScript
let name = "Иван"
let age = 17
let height = 180.5`}),t.jsx("p",{className:"theory-intro",children:"Правила для имён переменных:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Имя должно начинаться с буквы или подчёркивания (_)"}),t.jsx("li",{className:"theory-list-item",children:"В имени можно использовать буквы, цифры и подчёркивание"}),t.jsx("li",{className:"theory-list-item",children:"Имя не может содержать пробелы"}),t.jsx("li",{className:"theory-list-item",children:"Придумывай понятные имена (age лучше, чем x)"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Типы данных"}),t.jsx("p",{className:"theory-intro",children:"Тип данных — это категория информации. Например, число — это один тип, текст — другой."}),t.jsx(M,{headers:["Тип","Описание","Примеры","Для чего"],rows:[["int/число","Целое число (без запятой)","17, -5, 1000","Возраст, количество"],["float/число","Число с запятой","3.14, -0.5, 180.5","Высота, вес, вычисления"],["str/строка","Текст (в кавычках)",'"Иван", "Hello"',"Имена, сообщения"],["bool/логический","Истина или ложь","true, false","Проверки, условия"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"20px"},children:"Как проверить тип данных:"}),t.jsx(S,{code:`// Python
name = "Иван"
age = 17
print(type(name))  # <class 'str'>
print(type(age))   # <class 'int'>

// JavaScript
let name = "Иван"
let age = 17
console.log(typeof name)  // "string"
console.log(typeof age)   // "number"`})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Операторы"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Арифметические операторы"}),t.jsx("p",{className:"theory-intro",children:"Используются для математических операций:"}),t.jsx(M,{headers:["Оператор","Название","Пример","Результат"],rows:[["+","Сложение","5 + 3","8"],["-","Вычитание","10 - 4","6"],["*","Умножение","6 * 7","42"],["/","Деление","20 / 4","5"],["**","Возведение в степень","2 ** 3","8"],["%","Остаток от деления","17 % 5","2"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операторы сравнения"}),t.jsx("p",{className:"theory-intro",children:"Используются для проверки, сравнивают два значения и возвращают true или false:"}),t.jsx(M,{headers:["Оператор","Название","Пример","Результат"],rows:[["==","Равно","5 == 5","true"],["!=","Не равно","5 != 3","true"],[">","Больше","10 > 5","true"],["<","Меньше","3 < 10","true"],[">=","Больше или равно","5 >= 5","true"],["<=","Меньше или равно","3 <= 10","true"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Логические операторы"}),t.jsx("p",{className:"theory-intro",children:"Используются для объединения нескольких условий:"}),t.jsx(M,{headers:["Оператор","Название","Описание","Пример"],rows:[["and","И","true, если ОБА условия верны","age > 18 and age < 65"],["or","ИЛИ","true, если ХОТЬ ОДНО условие верно",'day == "Saturday" or day == "Sunday"'],["not","НЕ","Меняет true на false и наоборот","not is_raining"]]}),t.jsx(S,{code:`// Примеры логических операторов

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
    print("Можно гулять")  # Выведет это`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Условные операторы: if, else, elif"}),t.jsx("p",{className:"theory-intro",children:'Условные операторы позволяют программе принимать решения: "если происходит то-то, то делай то-то, иначе делай это".'}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура if-else"}),t.jsx(S,{code:`// Python
age = 17

if age >= 18:
    print("Ты взрослый")
else:
    print("Ты ещё не совершеннолетний")

# Выведет: "Ты ещё не совершеннолетний"`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура if-elif-else"}),t.jsx("p",{className:"theory-intro",children:'elif (else if) — "иначе если":'}),t.jsx(S,{code:`score = 75

if score >= 90:
    print("Отличная оценка! (A)")
elif score >= 80:
    print("Хорошая оценка! (B)")
elif score >= 70:
    print("Удовлетворительно (C)")
else:
    print("Плохая оценка (F)")

# Выведет: "Удовлетворительно (C)"`,language:"python"})]}),t.jsxs(F,{title:"Чтение кода",children:[t.jsx("p",{children:"Когда программа встречает if, она проверяет условие:"}),t.jsxs("ul",{children:[t.jsxs("li",{children:["Если условие ",t.jsx("strong",{children:"true"})," — выполняет код в блоке if"]}),t.jsxs("li",{children:["Если условие ",t.jsx("strong",{children:"false"})," — переходит к elif (если он есть)"]}),t.jsx("li",{children:"Если все elif false — выполняет код в блоке else"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Ввод и вывод данных"}),t.jsx("p",{className:"theory-intro",children:"Вывод (output) — когда программа отправляет информацию пользователю. Ввод (input) — когда пользователь вводит информацию в программу."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Вывод данных (print)"}),t.jsx(S,{code:`# Просто текст
print("Привет!")

# Переменные
name = "Алиса"
print("Меня зовут", name)  # Выведет: Меня зовут Алиса

# Несколько значений
age = 17
print("Мне", age, "лет")  # Выведет: Мне 17 лет`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Ввод данных (input)"}),t.jsx(S,{code:`# Простой ввод
name = input("Как тебя зовут? ")
print("Привет,", name)

# Ввод числа (важно: input всегда возвращает текст!)
age_text = input("Сколько тебе лет? ")
age = int(age_text)  # Превращаем текст в число
print("Тебе", age, "лет")`,language:"python"}),t.jsxs(F,{title:"Важно",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"input()"})," всегда возвращает ",t.jsx("strong",{children:"текст (строку)"}),", даже если пользователь вводит число!"]}),t.jsxs("p",{children:["Если нужно число — используй ",t.jsx("strong",{children:"int()"})," или ",t.jsx("strong",{children:"float()"})]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практический пример: калькулятор оценок"}),t.jsx(S,{code:`print("=== Калькулятор оценок ===")

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
print(f"{name}, твоя оценка: {grade}")`,language:"python"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь основы программирования!"})})]})}function Xx(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 3"}),t.jsx("p",{className:"theory-subtitle",children:"Основы программирования: циклы, функции, коллекции"}),t.jsx("p",{className:"theory-date",children:"3 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Циклы"}),t.jsx("p",{className:"theory-intro",children:"Цикл — это способ повторить блок кода много раз. Вместо того чтобы писать одну и ту же команду 100 раз, можно использовать цикл."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Цикл for"}),t.jsx("p",{className:"theory-intro",children:"Используется, когда знаешь, сколько раз нужно повторить код:"}),t.jsx(S,{code:`# Выведи числа от 1 до 5
for i in range(1, 6):
    print(i)
# Выведет: 1 2 3 4 5

# Выведи "Привет" 3 раза
for num in range(3):
    print("Привет!")
# Выведет:
# Привет!
# Привет!
# Привет!`,language:"python"}),t.jsx(F,{title:"Как работает range()",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"range"})," использует Start Stop и Step"]}),t.jsx("li",{children:"По умолчанию start = 0, stop = последнему элементу, step = 1"}),t.jsxs("li",{children:[t.jsx("strong",{children:"range(5)"})," — от 0 до 4 (не включает 5)"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"range(1, 6)"})," — от 1 до 5"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"range(0, 10, 2)"})," — от 0 до 10, шаг 2 (0, 2, 4, 6, 8)"]})]})})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Цикл while"}),t.jsx("p",{className:"theory-intro",children:"Повторяет код, пока условие true:"}),t.jsx(S,{code:`count = 0
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
        print("Угадал!")`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"break и continue"}),t.jsx("p",{className:"theory-intro",children:"Управляют ходом цикла:"}),t.jsx(M,{headers:["Команда","Что делает","Пример"],rows:[["break","Выходит из цикла сразу","if password_correct: break"],["continue","Пропускает остаток итерации","if user.age < 18: continue"]]}),t.jsx(S,{code:`# break - выход из цикла
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
# Выведет: 0 1 3 4`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Функции"}),t.jsx("p",{className:"theory-intro",children:"Функция — это блок кода, которому дали имя. Функция можно вызвать много раз, не переписывая код."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура функции"}),t.jsx(S,{code:`# Объявление функции
def greet(name):
    print(f"Привет, {name}!")

# Вызов функции
greet("Алиса")  # Выведет: Привет, Алиса!
greet("Боб")    # Выведет: Привет, Боб!`,language:"python"}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Части функции:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"def"})," — ключевое слово для определения функции"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"greet"})," — имя функции"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"(name)"})," — параметры (входные данные)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"тело функции"})," — код, который выполняется"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Возвращаемое значение (return)"}),t.jsx("p",{className:"theory-intro",children:"Функция может возвращать результат:"}),t.jsx(S,{code:`# Функция с return
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
print(calculate(10, 3, "-"))  # 7`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Параметры и аргументы"}),t.jsx(F,{title:"Разница",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Параметры"})," — переменные в скобках при объявлении функции"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Аргументы"})," — значения, которые передаёшь при вызове функции"]})]})}),t.jsx(S,{code:`# name, age — параметры
def profile(name, age):
    print(f"Имя: {name}, Возраст: {age}")

# "Алиса", 17 — аргументы
profile("Алиса", 17)`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Коллекции данных"}),t.jsx("p",{className:"theory-intro",children:"Коллекция — это контейнер, который хранит несколько значений вместе."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Список (list)"}),t.jsx("p",{className:"theory-intro",children:"Упорядоченная коллекция, которую можно менять:"}),t.jsx(S,{code:`# Создание списка
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
# Выведет: яблоко, апельсин, груша`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Кортеж (tuple)"}),t.jsx("p",{className:"theory-intro",children:"Как список, но не менять его нельзя:"}),t.jsx(S,{code:`# Создание кортежа (круглые скобки)
coords = (10, 20)
colors = ("red", "green", "blue")

# Доступ работает так же
print(coords[0])  # 10
print(colors[1])  # green

# Это НЕЛЬЗЯ менять!
coords[0] = 15  # ❌ Ошибка!

# Но можно создать новый:
coords = (15, 20)  # ✅ Это работает`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Словарь (dict)"}),t.jsx("p",{className:"theory-intro",children:'Хранит пары "ключ-значение":'}),t.jsx(S,{code:`# Создание словаря (фигурные скобки)
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
# city: Москва`,language:"python"})]}),t.jsx(M,{headers:["Тип","Символы","Можно менять?","Дубли?","Когда использовать"],rows:[["Список","[ ]","Да","Да","Данные, которые меняются"],["Кортеж","( )","Нет","Да","Данные, которые не меняются"],["Словарь","{ }","Да","Нет (ключи)","Связанные данные (ключ-значение)"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Читаемость кода"}),t.jsx("p",{className:"theory-intro",children:"Код пишется один раз, но читается много раз. Сделай его понятным!"}),t.jsxs(F,{title:"Плохо vs Хорошо",children:[t.jsx("p",{children:t.jsx("strong",{children:"Плохо:"})}),t.jsx("p",{style:{color:"#ff6b6b",fontSize:"13px",fontFamily:"monospace"},children:"x = 5; y = []; for i in range(x): y.append(i*2)"}),t.jsx("p",{style:{marginTop:"12px"},children:t.jsx("strong",{children:"Хорошо:"})}),t.jsx(S,{code:`numbers = []
limit = 5
for i in range(limit):
    doubled = i * 2
    numbers.append(doubled)`,language:"python"})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Правила:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Используй понятные имена переменных (age вместо a)"}),t.jsx("li",{className:"theory-list-item",children:"Добавляй пробелы: a + b вместо a+b"}),t.jsx("li",{className:"theory-list-item",children:"Один блок кода = одна задача"}),t.jsx("li",{className:"theory-list-item",children:"Комментарии только когда код неочевиден"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Ты уже почти профессионал!"})})]})}function Zx({videoUrl:e}){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 4"}),t.jsx("p",{className:"theory-subtitle",children:"Алгоритмическое мышление и Big O"}),t.jsx("p",{className:"theory-date",children:"4 июня 2026"})]}),e&&t.jsx(Va,{src:e}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое алгоритм?"}),t.jsx("p",{className:"theory-intro",children:"Алгоритм — это пошаговая инструкция для решения задачи. Как рецепт в кулинарии: нужно делать шаги в правильном порядке, чтобы получить результат."}),t.jsx("p",{className:"theory-intro",style:{marginTop:"12px"},children:"Свойства алгоритма:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Конечность"})," — алгоритм должен закончиться, не бежать вечно"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Определённость"})," — каждый шаг должен быть ясным и однозначным"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ввод"})," — алгоритм принимает входные данные"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Вывод"})," — алгоритм выдаёт результат"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Эффективность"})," — алгоритм должен работать за разумное время"]})]}),t.jsx(F,{title:"Пример: Рецепт чая",children:t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Налей воду в чайник"}),t.jsx("li",{children:"Включи чайник"}),t.jsx("li",{children:"Жди, пока вода закипит"}),t.jsx("li",{children:"Налей горячую воду в кружку"}),t.jsx("li",{children:"Положи пакетик чая"}),t.jsx("li",{children:"Жди 3-5 минут"}),t.jsx("li",{children:"Достань пакетик"}),t.jsx("li",{children:"Добавь сахар (по желанию)"}),t.jsx("li",{children:"Чай готов!"})]})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Примеры алгоритмов"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Алгоритм: Найти максимум в списке"}),t.jsx(S,{code:`def find_max(numbers):
    max_value = numbers[0]

    for num in numbers:
        if num > max_value:
            max_value = num

    return max_value

# Пример
scores = [45, 89, 23, 67, 92, 34]
print(find_max(scores))  # 92`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Алгоритм: Поиск элемента (Linear Search)"}),t.jsx(S,{code:`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Найдено на позиции i
    return -1  # Не найдено

# Пример
fruits = ["яблоко", "банан", "апельсин"]
print(linear_search(fruits, "банан"))  # 1
print(linear_search(fruits, "груша"))  # -1`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Алгоритм: Сортировка (Bubble Sort)"}),t.jsx(S,{code:`def bubble_sort(arr):
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
# [11, 12, 22, 25, 34, 64, 90]`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Нотация Big O (сложность алгоритма)"}),t.jsx("p",{className:"theory-intro",children:"Big O — это способ описать, как быстро растёт время выполнения алгоритма при увеличении входных данных."}),t.jsxs(F,{title:"Аналогия",children:[t.jsx("p",{children:"Представь, что у тебя есть большая библиотека:"}),t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"O(1)"})," — ты помнишь, где конкретная книга, берёшь её сразу"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"O(n)"})," — нужно проверить все полки, может на 100-й полке"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"O(n²)"})," — нужно проверить все полки и все книги на каждой полке"]})]})]}),t.jsx(M,{headers:["Нотация","Название","Что делает","Пример","Скорость"],rows:[["O(1)","Постоянная","Одна операция, не зависит от размера","Доступ к элементу по индексу","Молния"],["O(log n)","Логарифмическая","Каждый раз половина","Бинарный поиск","Очень быстро"],["O(n)","Линейная","Проверить все элементы","Поиск в списке","Быстро"],["O(n log n)","Линейно-логарифмическая","Разделяй и властвуй","Эффективная сортировка","Нормально"],["O(n²)","Квадратичная","Вложенные циклы","Пузырьковая сортировка","Медленно"],["O(n³)","Кубическая","Три вложенных цикла","Тройные циклы","Медленнее"],["O(2ⁿ)","Экспоненциальная","Растёт очень быстро","Некоторые рекурсивные алгоритмы","Очень медленно"]]}),t.jsxs("div",{className:"theory-subsection",style:{marginTop:"24px"},children:[t.jsx("h3",{className:"theory-heading-3",children:"Как анализировать Big O"}),t.jsx(S,{code:`# O(1) - одна операция
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
    return -1`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение скоростей"}),t.jsx("p",{className:"theory-intro",children:"Как быстро работают разные алгоритмы с 1 млн элементов:"}),t.jsx(M,{headers:["Big O","Операций","Время","Использовать?"],rows:[["O(1)","1","0.000001 сек","Идеально! ✅"],["O(log n)","20","0.00002 сек","Очень хорошо ✅"],["O(n)","1,000,000","0.001 сек","Хорошо ✅"],["O(n log n)","20,000,000","0.02 сек","Приемлемо ✅"],["O(n²)","1,000,000,000,000","16 минут","Плохо ❌"],["O(2ⁿ)","Огромное число","Вечность ","Очень плохо ❌"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как выбрать хороший алгоритм"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Для маленьких данных — важнее простота кода"}),t.jsx("li",{className:"theory-list-item",children:"Для больших данных — важнее скорость (Big O)"}),t.jsx("li",{className:"theory-list-item",children:"Всегда проверь граничные случаи (пустой список, один элемент)"}),t.jsx("li",{className:"theory-list-item",children:"O(n) лучше, чем O(n²), но O(1) ещё лучше!"})]}),t.jsxs(F,{title:"На собеседовании",children:[t.jsx("p",{children:"Когда спрашивают решить задачу, обязательно скажи:"}),t.jsxs("ul",{children:[t.jsx("li",{children:"Какая Big O временная сложность?"}),t.jsx("li",{children:"Какая Big O пространственная сложность (память)?"}),t.jsx("li",{children:"Можно ли оптимизировать?"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь, как писать быстрый код"})})]})}function ey(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 5"}),t.jsx("p",{className:"theory-subtitle",children:"Дискретная математика: логика и множества"}),t.jsx("p",{className:"theory-date",children:"5 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Булева алгебра"}),t.jsx("p",{className:"theory-intro",children:"Булева алгебра работает с двумя значениями: истина (True) и ложь (False). Это основа всей цифровой логики!"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Логические операции"}),t.jsx(M,{headers:["Операция","Символ","Описание","Пример","Результат"],rows:[["AND (И)","and, &","true, если ОБА значения true","True and False","False"],["OR (ИЛИ)","or, |","true, если ХОТЬ ОДНО true","True or False","True"],["NOT (НЕ)","not, !","Инвертирует значение","not True","False"],["XOR (исключающее ИЛИ)","xor, ^","true, если значения разные","True xor True","False"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Таблицы истинности"}),t.jsx("p",{className:"theory-intro",children:"AND — оба должны быть true:"}),t.jsx(M,{headers:["A","B","A AND B"],rows:[["true","true","true"],["true","false","false"],["false","true","false"],["false","false","false"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"OR — хоть одно true:"}),t.jsx(M,{headers:["A","B","A OR B"],rows:[["true","true","true"],["true","false","true"],["false","true","true"],["false","false","false"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"NOT — инверсия:"}),t.jsx(M,{headers:["A","NOT A"],rows:[["true","false"],["false","true"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Примеры в коде"}),t.jsx(S,{code:`# AND - оба условия должны быть true
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
    print("Нужен зонтик")  # Выведет это`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Множества (Sets)"}),t.jsx("p",{className:"theory-intro",children:"Множество — это неупорядоченная коллекция уникальных элементов. В отличие от списка, каждый элемент может быть только один раз."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции с множествами"}),t.jsx(S,{code:`# Создание множества
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
print(unique)  # {1, 2, 3}`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции между множествами"}),t.jsx(S,{code:`set_a = {1, 2, 3, 4}
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
print(sym_diff)  # {1, 2, 5, 6}`,language:"python"})]}),t.jsx(M,{headers:["Операция","Символ","Что делает","Пример"],rows:[["Объединение","|","Все элементы из обоих","{1,2} | {2,3} = {1,2,3}"],["Пересечение","&","Общие элементы","{1,2} & {2,3} = {2}"],["Разность","-","Только из первого","{1,2} - {2,3} = {1}"],["Симметричная разность","^","Уникальные для каждого","{1,2} ^ {2,3} = {1,3}"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Теория множеств"}),t.jsx("p",{className:"theory-intro",children:"Множество описывает коллекцию элементов, которые имеют общее свойство."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Основные понятия"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Элемент"})," — одно значение в множестве"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Пустое множество"})," — множество без элементов ∅"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Подмножество"})," — множество, все элементы которого содержатся в другом множестве"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Универсум"})," — все возможные элементы"]})]}),t.jsx(S,{code:`# Пустое множество
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
    print("numbers — надмножество evens")  # Выведет это`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Битовые операции"}),t.jsx("p",{className:"theory-intro",children:"Компьютер работает с битами (0 и 1). Битовые операции работают прямо с нулями и единицами в памяти."}),t.jsx(M,{headers:["Операция","Символ","Описание"],rows:[["AND","&","Побитовое И"],["OR","|","Побитовое ИЛИ"],["XOR","^","Побитовое исключающее ИЛИ"],["NOT","~","Побитовое НЕ"],["Левый сдвиг","<<","Сдвинуть влево на n позиций"],["Правый сдвиг",">>","Сдвинуть вправо на n позиций"]]}),t.jsx(S,{code:`# Примеры битовых операций
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
print(5 >> 1)  # 2 (5 / 2)`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практическое применение"}),t.jsxs(F,{title:"Пример: Проверка флагов",children:[t.jsx("p",{children:"Часто используют биты как флаги (на/выкл):"}),t.jsx(S,{code:`# Флаги: читать(1), писать(2), исполнять(4)
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
user_rights = user_rights & ~WRITE`,language:"python"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Логика — основа всего в программировании!"})})]})}function ty(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 6"}),t.jsx("p",{className:"theory-subtitle",children:"Дискретная математика: графы и алгоритмы"}),t.jsx("p",{className:"theory-date",children:"6 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое граф?"}),t.jsx("p",{className:"theory-intro",children:"Граф — это структура, которая состоит из точек (вершин) и линий (рёбер), соединяющих эти точки. Графы помогают моделировать реальные сиутации."}),t.jsx(F,{title:"Примеры графов в реальной жизни",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Социальная сеть"})," — люди это вершины, дружба это рёбра"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Карта города"})," — перекрёстки это вершины, дороги это рёбра"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Интернет"})," — компьютеры это вершины, кабели это рёбра"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Родственные связи"})," — люди это вершины, семейные связи это рёбра"]})]})}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Основные понятия"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Вершина (узел)"})," — точка в графе"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ребро"})," — линия, соединяющая два узла"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ориентированный граф"})," — рёбра имеют направление (стрелка)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Неориентированный граф"})," — рёбра без направления"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Взвешенный граф"})," — рёбра имеют вес (расстояние, стоимость)"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Представление графа"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Матрица смежности"}),t.jsx("p",{className:"theory-intro",children:"Используется, если много рёбер. Таблица, где строка и столбец = вершины, значение = есть ли ребро."}),t.jsx(S,{code:`# Матрица смежности для графа A-B, A-C, B-C
# 1 = есть ребро, 0 = нет ребра

adjacency_matrix = [
    [0, 1, 1],  # A: связь с B, C
    [1, 0, 1],  # B: связь с A, C
    [1, 1, 0]   # C: связь с A, B
]

# Проверка: есть ли ребро между A (0) и B (1)?
if adjacency_matrix[0][1] == 1:
    print("Есть ребро A-B")`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Список смежности"}),t.jsx("p",{className:"theory-intro",children:"Используется, если мало рёбер. Для каждой вершины список её соседей."}),t.jsx(S,{code:`# Список смежности для графа A-B, A-C, B-C
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
    print("A и B — соседи")`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Поиск в ширину (BFS)"}),t.jsx("p",{className:"theory-intro",children:"BFS (Breadth-First Search) — ищет уровень за уровнем, от стартовой вершины. Используется очередь."}),t.jsx(F,{title:"Как работает BFS",children:t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Начинаешь со стартовой вершины, добавляешь в очередь"}),t.jsx("li",{children:"Берёшь вершину из начала очереди"}),t.jsx("li",{children:"Проверяешь все её соседей"}),t.jsx("li",{children:"Еслиососед не посещён, добавляешь в очередь"}),t.jsx("li",{children:"Повторяешь, пока очередь не пуста"})]})}),t.jsx(S,{code:`from collections import deque

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

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D']`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Поиск в глубину (DFS)"}),t.jsx("p",{className:"theory-intro",children:"DFS (Depth-First Search) — идёт как глубже и глубже в один путь. Используется стек или рекурсия."}),t.jsx(F,{title:"Как работает DFS",children:t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Начинаешь со стартовой вершины"}),t.jsx("li",{children:"Идёшь как можно глубже в одного соседа"}),t.jsx("li",{children:"Когда зашёл в тупик, возвращаешься"}),t.jsx("li",{children:"Пробуешь следующего соседа"})]})}),t.jsx(S,{code:`def dfs(graph, node, visited=None):
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

print(dfs(graph, 'A'))  # ['A', 'B', 'D', 'C']`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение BFS vs DFS"}),t.jsx(M,{headers:["Критерий","BFS","DFS"],rows:[["Структура данных","Очередь","Стек или рекурсия"],["Как ищет","Уровень за уровнем","Как можно глубже"],["Находит кратчайший путь?","Да","Нет"],["Используется для","Кратчайший путь, ширина","Компоненты, цикли"],["Память","Может быть больше","Зависит от высоты"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Топологическая сортировка"}),t.jsx("p",{className:"theory-intro",children:"Порядок вершин в ориентированном графе без циклов, где для каждого ребра A→B вершина A идёт раньше B."}),t.jsx(S,{code:`from collections import deque

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

print(topological_sort(graph, in_degree))  # ['A', 'B', 'C', 'D']`,language:"python"}),t.jsx(F,{title:"Применение",children:t.jsx("p",{children:"Например, в системе сборки проектов: нужно скомпилировать файл A перед файлом B, если B зависит от A."})})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь графы"})})]})}function ry({videoUrl:e}){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 7"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: массивы и связанные списки"}),t.jsx("p",{className:"theory-date",children:"7 июня 2026"})]}),e&&t.jsx(Va,{src:e}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Массив (Array)"}),t.jsx("p",{className:"theory-intro",children:"Массив — это структура данных, которая хранит несколько элементов одного типа в смежных ячейках памяти. Каждый элемент имеет индекс."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Как работает массив в памяти"}),t.jsx("p",{className:"theory-intro",children:"Массив занимает последовательно блоки памяти. Если массив начинается с адреса 1000:"}),t.jsx(M,{headers:["Индекс","Адрес памяти","Значение"],rows:[["0","1000","45"],["1","1004","89"],["2","1008","23"],["3","1012","67"],["4","1016","92"]]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Поэтому доступ к элементу по индексу за O(1) — просто посчитай адрес!"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции с массивом"}),t.jsx(M,{headers:["Операция","Big O","Описание"],rows:[["Доступ по индексу","O(1)","arr[2] — мгновенно"],["Добавление в конец","O(1)","Если место есть"],["Вставка в середину","O(n)","Нужно сдвинуть элементы"],["Удаление из середины","O(n)","Нужно сдвинуть элементы"],["Поиск элемента","O(n)","Проверить все элементы"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Плюсы и минусы"}),t.jsx("p",{className:"theory-intro",children:t.jsx("strong",{children:"✅ Плюсы:"})}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Быстрый доступ к элементу по индексу O(1)"}),t.jsx("li",{className:"theory-list-item",children:"Экономит память (нет дополнительных указателей)"}),t.jsx("li",{className:"theory-list-item",children:"Можно быстро итерировать"})]}),t.jsx("p",{className:"theory-intro",children:t.jsx("strong",{children:"❌ Минусы:"})}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Фиксированный размер (в большинстве языков)"}),t.jsx("li",{className:"theory-list-item",children:"Вставка/удаление в середину O(n) — медленно"}),t.jsx("li",{className:"theory-list-item",children:"Нужно знать размер заранее"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Динамический массив"}),t.jsx("p",{className:"theory-intro",children:"Динамический массив (как list в Python) автоматически растёт, когда не хватает места. Так как это работает?"}),t.jsx(F,{title:"Как растёт динамический массив",children:t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Создаёшь список [] с местом на 10 элементов"}),t.jsx("li",{children:"Добавляешь 10 элементов — список полон"}),t.jsx("li",{children:"Добавляешь 11-й элемент — программа создаёт новый массив на 20 элементов"}),t.jsx("li",{children:"Копирует старые 10 элементов туда"}),t.jsx("li",{children:"Добавляет 11-й элемент"}),t.jsx("li",{children:"Удаляет старый массив"})]})}),t.jsx(S,{code:`# В Python это список
numbers = []  # Создан пустой список

# Добавляем элементы
for i in range(1000000):
    numbers.append(i)

# Каждый append работает как:
# 1. Если место есть → добавляем O(1)
# 2. Если нет места → копируем всё в новый массив O(n) + добавляем

# Но в среднем это O(1) за счёт группировки добавлений!`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Связанный список (Linked List)"}),t.jsx("p",{className:"theory-intro",children:"Связанный список — это список, где каждый элемент (узел) содержит данные и указатель на следующий узел."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура узла"}),t.jsx(S,{code:`class Node:
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
print(node1.next.next.data)  # 30`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Полная реализация"}),t.jsx(S,{code:`class LinkedList:
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
ll.display()  # [10, 30]`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции со связанным списком"}),t.jsx(M,{headers:["Операция","Big O","Описание"],rows:[["Доступ к элементу","O(n)","Нужно пройти от начала"],["Вставка в начало","O(1)","Просто меняем head"],["Вставка после узла","O(1)","Меняем указатели"],["Удаление из начала","O(1)","Меняем head"],["Поиск элемента","O(n)","Проходим по всем"]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение: Массив vs Связный список"}),t.jsx(M,{headers:["Критерий","Массив","Связный список"],rows:[["Доступ по индексу","O(1) ⚡","O(n) 🐢"],["Вставка/удаление в начало","O(n) 🐢","O(1) ⚡"],["Вставка/удаление в конец","O(1) ⚡","O(n) 🐢"],["Поиск","O(n)","O(n)"],["Память","Плотная","Дополнительная на указатели"],["Использовать когда","Нужен быстрый доступ","Много вставок/удалений"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Двусвязный список"}),t.jsx("p",{className:"theory-intro",children:"Как связный список, но каждый узел имеет указатель и на следующий, и на предыдущий. Позволяет идти в обе стороны."}),t.jsx(S,{code:`class DNode:
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
    current = current.prev`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Когда что использовать?"}),t.jsx(F,{title:"Примеры",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Массив:"})," Сохраняешь оценки студентов, часто нужен доступ к i-й оценке"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Динамический массив:"})," Собираешь данные, не знаешь количество заранее"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Связный список:"})," Реализуешь очередь или стек, много вставок/удалений"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Двусвязный список:"}),' Плеер с кнопками "вперёд/назад" по плейлисту']})]})})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Правильная структура данных = правильное решение!"})})]})}function ny(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 8"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: стек и очередь"}),t.jsx("p",{className:"theory-date",children:"8 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Стек (Stack)"}),t.jsx("p",{className:"theory-intro",children:"Стек работает по принципу LIFO (Last In, First Out) — последний добавленный элемент первым извлекается. Как стопка тарелок: берёшь с вершины."}),t.jsxs(F,{title:"Аналогия из жизни",children:[t.jsx("p",{children:"Думаешь о стопке книг:"}),t.jsxs("ul",{children:[t.jsx("li",{children:"Положил первую книгу (основание стека)"}),t.jsx("li",{children:"Положил вторую на первую"}),t.jsx("li",{children:"Положил третью на вторую (вершина стека)"}),t.jsx("li",{children:"Берёшь книги? Сначала третью, потом вторую, потом первую"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции со стеком"}),t.jsx(M,{headers:["Операция","Описание","Big O"],rows:[["push(x)","Добавить элемент на вершину","O(1)"],["pop()","Удалить и вернуть элемент с вершины","O(1)"],["peek()","Посмотреть элемент на вершине без удаления","O(1)"],["is_empty()","Проверить, пуст ли стек","O(1)"],["size()","Размер стека","O(1)"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Реализация стека"}),t.jsx(S,{code:`class Stack:
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
print(stack.size())  # 2`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Примеры использования стека"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Undo/Redo"})," — каждый шаг в стек, отменяешь — pop из стека"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"История браузера"}),' — нажимаешь "назад" → pop из стека URL']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Вычисление выражений"})," — (2 + 3) * 4 → используешь стек"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Рекурсия"})," — каждый вызов функции идёт в стек вызовов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"DFS (поиск в глубину)"})," — обход графа"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Очередь (Queue)"}),t.jsx("p",{className:"theory-intro",children:"Очередь работает по принципу FIFO (First In, First Out) — первый добавленный элемент первым извлекается. Как очередь в магазине."}),t.jsxs(F,{title:"Аналогия из жизни",children:[t.jsx("p",{children:"Очередь в магазине:"}),t.jsxs("ul",{children:[t.jsx("li",{children:"Первый пришёл — первый обслужился"}),t.jsx("li",{children:"Последний пришёл — последний обслужился"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции с очередью"}),t.jsx(M,{headers:["Операция","Описание","Big O"],rows:[["enqueue(x)","Добавить элемент в конец (задняя часть)","O(1)"],["dequeue()","Удалить и вернуть элемент с начала (передняя часть)","O(1)"],["front()","Посмотреть первый элемент без удаления","O(1)"],["is_empty()","Проверить, пуста ли очередь","O(1)"],["size()","Размер очереди","O(1)"]]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Реализация очереди"}),t.jsx(S,{code:`from collections import deque

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
print(queue.size())     # 2`,language:"python"}),t.jsx(F,{title:"Почему deque?",children:t.jsx("p",{children:"Используем deque из collections, потому что обычный list в Python медленный для удаления с начала (O(n)). deque быстрый для обоих концов (O(1))."})})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Примеры использования очереди"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Очередь печати"})," — отправляешь несколько файлов, принтер печатает по очереди"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BFS (поиск в ширину)"})," — обход графа уровень за уровнем"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Система обработки задач"})," — рабочий берёт первую задачу из очереди"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Буфер ввода-вывода"})," — данные идут в очередь, программа обрабатывает по порядку"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сравнение: Стек vs Очередь"}),t.jsx(M,{headers:["Критерий","Стек (LIFO)","Очередь (FIFO)"],rows:[["Добавление","В вершину (push)","В конец (enqueue)"],["Удаление","С вершины (pop)","С начала (dequeue)"],["Первым обслужен","Последний добавленный","Первый добавленный"],["Аналогия","Стопка тарелок","Очередь в магазине"],["Используется для","Undo/redo, DFS","BFS, обработка задач"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Деку (Deque) - двусторонняя очередь"}),t.jsx("p",{className:"theory-intro",children:"Deque (Double Ended Queue) — очередь, где можно добавлять и удалять элементы с обоих концов."}),t.jsx(S,{code:`from collections import deque

dq = deque([10, 20, 30])

# Добавлять можно с обоих концов
dq.append(40)        # Добавить в конец: [10, 20, 30, 40]
dq.appendleft(5)     # Добавить в начало: [5, 10, 20, 30, 40]

# Удалять можно с обоих концов
dq.pop()             # Удалить с конца: [5, 10, 20, 30]
dq.popleft()         # Удалить с начала: [10, 20, 30]

print(dq)            # deque([10, 20, 30])

# Все операции O(1)!`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практический пример: Проверка скобок"}),t.jsx("p",{className:"theory-intro",children:"Проверить, правильно ли расставлены скобки: (()), ()((, ()("}),t.jsx(S,{code:`def is_valid_parentheses(s):
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
print(is_valid_parentheses("("))         # False`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практический пример: BFS с очередью"}),t.jsx(S,{code:`from collections import deque

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

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D', 'E']`,language:"python"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Стек и очередь — это основа многих алгоритмов!"})})]})}function sy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 9"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: хэш-таблицы"}),t.jsx("p",{className:"theory-date",children:"9 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое хэш-таблица?"}),t.jsx("p",{className:"theory-intro",children:"Хэш-таблица (hash table) — это структура данных, которая использует хэш-функцию для превращения ключей в индексы массива. Позволяет очень быстро искать, добавлять и удалять элементы."}),t.jsxs(F,{title:"Аналогия",children:[t.jsx("p",{children:"Представь, что у тебя есть картотека:"}),t.jsxs("ul",{children:[t.jsx("li",{children:'Нужно найти запись по имени "Алиса"'}),t.jsx("li",{children:"Вместо того чтобы перелистывать все записи, применяешь хэш-функцию"}),t.jsx("li",{children:'Хэш("Алиса") = 7 → идёшь сразу на ящик 7 → находишь запись'})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как работает хэш-таблица"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Хэш-функция"}),t.jsx("p",{className:"theory-intro",children:"Хэш-функция — это функция, которая преобразует ключ любого типа в целое число (индекс)."}),t.jsx(S,{code:`# Простая хэш-функция для строк
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

# Хорошая хэш-функция распределяет ключи равномерно`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Структура хэш-таблицы"}),t.jsx("p",{className:"theory-intro",children:"Упрощённо это выглядит так:"}),t.jsx(M,{headers:["Индекс","Содержимое","Ключи"],rows:[["0",'[("Alice", 90)]',"Alice"],["1","[]","пусто"],["2",'[("Bob", 85)]',"Bob"],["3","[]","пусто"],["4",'[("Charlie", 92)]',"Charlie"],["5","[]","пусто"],["...","...","..."]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Коллизии"}),t.jsx("p",{className:"theory-intro",children:'Коллизия — когда две разные ключи дают один индекс. Например, "Alice" и "Bob" оба дают индекс 2. Нужно это решить.'}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод 1: Chaining (цепочка)"}),t.jsx("p",{className:"theory-intro",children:"Каждая ячейка содержит список (цепочку) элементов. Если коллизия — добавляем в список."}),t.jsx(S,{code:`# Хэш-таблица с chaining
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
print(ht.get("Bob"))     # 85`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод 2: Open Addressing"}),t.jsx("p",{className:"theory-intro",children:"Если ячейка занята, ищем следующую свободную ячейку. Например, линейный поиск: если индекс 2 занят, смотрим 3, потом 4, и т.д."}),t.jsx(S,{code:`class HashTableOpenAddressing:
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
print(ht.get("Alice"))  # 90`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод 3: Double Hashing (двойное хеширование)"}),t.jsx("p",{className:"theory-intro",children:"Используются две хэш-функции для более эффективного поиска следующей свободной ячейки. При коллизии вместо просто +1, применяем вторую функцию: hash1(key), hash1(key)+hash2(key), hash1(key)+2*hash2(key), и т.д."}),t.jsx("p",{className:"theory-intro",children:"Преимущества: лучше распределяет ключи, меньше кластеров (скопов занятых ячеек), лучше для кэша процессора."}),t.jsx(S,{code:`# Хэш-таблица с double hashing
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
print(ht.get("Bob"))     # 85`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Сравнение методов разрешения коллизий"}),t.jsx(M,{headers:["Метод","Преимущества","Недостатки"],rows:[["Chaining","Простая реализация, удаление O(1)","Требует доп. память для списков"],["Linear Probing","Не требует доп. память","Кластеризация, заполнение таблицы"],["Double Hashing","Меньше кластеров, лучше распределение","Сложнее реализация, нужны две функции"]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Big O для хэш-таблиц"}),t.jsx(M,{headers:["Операция","Лучший случай","Средний случай","Худший случай"],rows:[["Добавление","O(1)","O(1)","O(n)"],["Удаление","O(1)","O(1)","O(n)"],["Поиск","O(1)","O(1)","O(n)"]]}),t.jsx(F,{title:"Когда наступает худший случай?",children:t.jsx("p",{children:"Когда хэш-функция плохая и много коллизий. Хорошая хэш-функция дает O(1) в 99% случаев!"})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Словарь в Python"}),t.jsx("p",{className:"theory-intro",children:"Словарь (dict) в Python — это хэш-таблица! Он использует интерпретатор Python под капотом."}),t.jsx(S,{code:`# Словарь = хэш-таблица
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
print(student.get("age"))  # 17`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практические примеры"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Пример 1: Подсчёт частоты элементов"}),t.jsx(S,{code:`def count_frequency(arr):
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

print(dict(frequency))  # {1: 1, 2: 2, 3: 3, 4: 4}`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Пример 2: Two Sum — найти две числа, которые дают сумму"}),t.jsx(S,{code:`def two_sum(arr, target):
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

print(two_sum_v2(nums, 9))  # [0, 1]`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Пример 3: Найти дубли в массиве"}),t.jsx(S,{code:`def has_duplicates(arr):
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
    return len(arr) != len(set(arr))`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Когда использовать хэш-таблицу?"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Нужен быстрый поиск по ключу — используй словарь/хэш-таблицу"}),t.jsx("li",{className:"theory-list-item",children:"Подсчёт частоты элементов"}),t.jsx("li",{className:"theory-list-item",children:"Проверка, содержится ли элемент в наборе"}),t.jsx("li",{className:"theory-list-item",children:"Кэширование (запоминание результатов)"}),t.jsx("li",{className:"theory-list-item",children:"Группировка данных по ключам"})]}),t.jsx(F,{title:"На собеседовании",children:t.jsx("p",{children:"Если задача требует быстрого поиска — часто ответ это хэш-таблица или словарь. Подумай: можно ли использовать ключ для O(1) доступа?"})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Итоги 6 дней"}),t.jsx("p",{className:"theory-intro",children:"Ты изучил основные структуры данных:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 4:"})," Алгоритмы и Big O"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 5:"})," Логика и множества"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 6:"})," Графы и поиск"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 7:"})," Массивы и связные списки"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 8:"})," Стеки и очереди"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"День 9:"})," Хэш-таблицы"]})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Это основа для 99% задач на собеседованиях! Практикуйся на LeetCode, и ты будешь готов 🚀"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Ты на правильном пути! Только вперед!"})})]})}function iy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 10"}),t.jsx("p",{className:"theory-subtitle",children:"Структуры данных: деревья"}),t.jsx("p",{className:"theory-date",children:"10 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое дерево?"}),t.jsx("p",{className:"theory-intro",children:"Дерево — это иерархическая структура данных с узлами, где каждый узел может иметь несколько потомков, но только одного родителя."}),t.jsx(F,{title:"Аналогия",children:t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Файловая система:"})," папки и файлы образуют дерево"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Генеалогия:"})," родитель → дети → внуки"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Организация:"})," руководитель → отделы → сотрудники"]})]})}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Терминология"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Корень (root)"})," — верхний узел без родителя"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Листья (leaves)"})," — узлы без потомков"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Высота"})," — количество уровней в дереве"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Глубина узла"})," — расстояние до корня"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Поддерево"})," — узел и все его потомки"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Бинарное дерево (Binary Tree)"}),t.jsx("p",{className:"theory-intro",children:"Дерево, где каждый узел может иметь максимум 2 потомка (левый и правый)."}),t.jsx(S,{code:`class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Обходы дерева"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"1. In-order (левый-корень-правый)"}),t.jsx("p",{className:"theory-intro",children:"Для BST дает отсортированный порядок:"}),t.jsx(S,{code:`def inorder(node):
    if node is None:
        return
    inorder(node.left)
    print(node.data)
    inorder(node.right)

# Для дерева выше: 4 2 5 1 3`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"2. Pre-order (корень-левый-правый)"}),t.jsx("p",{className:"theory-intro",children:"Обходит корень первым:"}),t.jsx(S,{code:`def preorder(node):
    if node is None:
        return
    print(node.data)
    preorder(node.left)
    preorder(node.right)

# Для дерева выше: 1 2 4 5 3`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"3. Post-order (левый-правый-корень)"}),t.jsx("p",{className:"theory-intro",children:"Обходит корень последним:"}),t.jsx(S,{code:`def postorder(node):
    if node is None:
        return
    postorder(node.left)
    postorder(node.right)
    print(node.data)

# Для дерева выше: 4 5 2 3 1`,language:"python"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Бинарное дерево поиска (BST)"}),t.jsx("p",{className:"theory-intro",children:"BST — бинарное дерево с особым свойством: левый потомок < родитель < правый потомок."}),t.jsx(S,{code:`class BST:
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
print(bst.search(100)) # False`,language:"python"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операции в BST"}),t.jsx(M,{headers:["Операция","Big O (лучше)","Big O (хуже)","Когда худший случай"],rows:[["Поиск","O(log n)","O(n)","Несбалансированное дерево"],["Вставка","O(log n)","O(n)","Несбалансированное дерево"],["Удаление","O(log n)","O(n)","Несбалансированное дерево"]]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Высота и баланс дерева"}),t.jsx(F,{title:"Сбалансированное дерево O(log n)",children:t.jsx("p",{children:"Дерево где разница высот левого и правого поддеревьев ≤ 1"})}),t.jsx(F,{title:"Несбалансированное дерево O(n)",children:t.jsx("p",{children:"Дерево вырождается в список (все элементы в одну сторону)"})}),t.jsx(S,{code:`# Несбалансированное дерево (худший случай)
bst = BST()
for val in [1, 2, 3, 4, 5]:  # Уже отсортировано!
    bst.insert(val)

# Дерево выглядит как список:
# 1-2-3-4-5

# Поиск 5 требует O(5) операций!`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сбалансированные деревья"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"AVL-дерево"}),t.jsx("p",{className:"theory-intro",children:"Самобалансирующееся дерево, которое поддерживает баланс после вставки/удаления. Высота всегда O(log n)."}),t.jsx("p",{className:"theory-text",style:{marginTop:"12px"},children:"Гарантирует O(log n) для всех операций, но медленнее при вставке/удалении из-за переб алансировки."})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Red-Black дерево"}),t.jsx("p",{className:"theory-intro",children:"Другое сбалансированное дерево. Быстрее AVL при вставке/удалении."}),t.jsx("p",{className:"theory-text",style:{marginTop:"12px"},children:"Используется в Java TreeMap и C++ std::map."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практический пример: Проверка BST"}),t.jsx(S,{code:`def is_bst(node, min_val=float('-inf'), max_val=float('inf')):
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

print(is_bst(root))  # True`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Когда использовать деревья?"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BST:"})," Быстрый поиск, сортировка, диапазонные запросы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Файловая система:"})," Иерархия папок и файлов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"DOM дерево:"})," В браузерах для HTML документов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Индексы БД:"})," B-деревья в базах данных"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Парсеры:"})," Abstract Syntax Tree (AST)"]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Деревья — один из самых мощных инструментов программиста!"})})]})}function ly(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 11"}),t.jsx("p",{className:"theory-subtitle",children:"Git: версионирование и командная работа"}),t.jsx("p",{className:"theory-date",children:"11 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое Git?"}),t.jsx("p",{className:"theory-intro",children:"Git — это система контроля версий, которая отслеживает изменения в коде. Позволяет сохранять историю, откатываться назад, работать в команде и создавать отдельные ветки для новых фич."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Платформы хостинга репозиториев"}),t.jsx("p",{className:"theory-intro",children:"Git локальный, но для совместной работы используются платформы:"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"GitHub"})," — самая популярная, PR, Issues"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"GitLab"})," — открытый код, полный CI/CD"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Bitbucket"})," — от Atlassian"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Интерфейсы: CLI и GUI"}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"CLI (команды в терминале)"})," — самый мощный способ."]}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"GUI (визуальные приложения)"})," — GitHub Desktop, GitKraken, VS Code."]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Основные команды"}),t.jsx(S,{code:`git clone URL            # Клонировать репозиторий
git init                # Инициализировать новый
git status              # Текущий статус
git add .               # Добавить файлы в staging
git commit -m "msg"     # Создать коммит
git push                # Отправить на удалённый
git pull                # Скачать обновления
git checkout -b name    # Создать и перейти на ветку
git merge name          # Объединить ветку
git log --oneline       # История коммитов
git diff                # Что изменилось`,language:"bash"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Git Workflow для Junior"}),t.jsxs("ol",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"git pull (скачать свежий код)"}),t.jsx("li",{className:"theory-list-item",children:"git checkout -b feature/name (создать свою ветку)"}),t.jsx("li",{className:"theory-list-item",children:'Пишешь код и коммитишь: git add . && git commit -m "msg"'}),t.jsx("li",{className:"theory-list-item",children:"git push origin feature/name (отправляешь ветку)"}),t.jsx("li",{className:"theory-list-item",children:"На GitHub создаёшь Pull Request"}),t.jsx("li",{className:"theory-list-item",children:"Code Review от других разработчиков"}),t.jsx("li",{className:"theory-list-item",children:"После одобрения PR мержится в main"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Pull Request (PR)"}),t.jsx("p",{className:"theory-intro",children:"PR — способ предложить свои изменения для рассмотрения перед включением в главный код."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Code Review — другие смотрят твой код"}),t.jsx("li",{className:"theory-list-item",children:"Обсуждение улучшений и ошибок"}),t.jsx("li",{className:"theory-list-item",children:"Merge в main после одобрения"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Git это не просто инструмент — это часть культуры разработки. Каждый коммит это история. Пиши понятные коммиты и станешь хорошим разработчиком!"})})]})}function ay(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 12"}),t.jsx("p",{className:"theory-subtitle",children:"ИИ-инструменты разработчика"}),t.jsx("p",{className:"theory-date",children:"12 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как работают LLM?"}),t.jsx("p",{className:"theory-intro",children:"LLM (Large Language Model) — большая языковая модель. Это нейросеть, обученная на миллиардах слов из интернета. Модель предсказывает следующее слово на основе контекста, вычисляя вероятности для тысяч возможных вариантов."}),t.jsxs(F,{title:"Упрощённо: как модель думает",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Ты:"}),' "Напиши функцию, которая сортирует"']}),t.jsx("p",{children:t.jsx("strong",{children:"Модель внутренне:"})}),t.jsx("p",{children:'• Анализирует контекст: "функция", "сортирует" → скорее всего массив'}),t.jsx("p",{children:"• Проверяет статистику обучения: как обычно пишут сортировку"}),t.jsx("p",{children:"• Вычисляет вероятности: Python (60%), JavaScript (30%), Java (10%)"}),t.jsx("p",{children:"• Выбирает наиболее вероятный ответ"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Основные параметры LLM"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Токены"})," — куски текста (примерно 1 токен = 4 символа). При работе с Claude API нужно знать: входные токены дешевле, выходные дороже"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Контекстное окно"})," — сколько токенов модель может обработать одновременно. Claude 3.5 Sonnet: 200k входных, может вывести до 4k. Это целая книга!"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Температура"})," — 0 = всегда выбирает самый вероятный ответ (логичный), 1 = выбирает случайно (творческий). Для кода используй 0-0.3, для идей 0.7-1"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Max tokens"})," — максимальная длина ответа. Ограничивает стоимость"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Top-p"})," — выбирает из верхних N% вероятных вариантов (альтернатива температуре)"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Модели Claude: какую использовать?"}),t.jsx("p",{className:"theory-intro",children:"Claude выпускает несколько версий модели. Каждая имеет разные характеристики, цену и скорость."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Claude 3.5 Sonnet (Рекомендуется 🚀)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"🏆 Лучшее соотношение цена/производительность"}),t.jsx("li",{className:"theory-list-item",children:"💪 Отличное для программирования (анализ кода, рефакторинг, исправление ошибок)"}),t.jsx("li",{className:"theory-list-item",children:"⚡ Быстрая (2x быстрее чем Opus)"}),t.jsx("li",{className:"theory-list-item",children:"📚 200k контекстное окно = целые проекты можно скармливать"}),t.jsx("li",{className:"theory-list-item",children:"💰 Средняя цена"}),t.jsx("li",{className:"theory-list-item",children:"✅ Лучше всего для ежедневной разработки"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Claude 3 Opus"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:'🧠 Самая "умная" модель (чуть лучше в сложной логике)'}),t.jsx("li",{className:"theory-list-item",children:"⏱️ Медленнее чем Sonnet"}),t.jsx("li",{className:"theory-list-item",children:"💰 Дороже"}),t.jsx("li",{className:"theory-list-item",children:"📚 200k контекст"}),t.jsx("li",{className:"theory-list-item",children:"✅ Для очень сложных задач, когда нужна максимальная точность"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Claude 3 Haiku"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"⚡ Самая быстрая"}),t.jsx("li",{className:"theory-list-item",children:"💰 Самая дешёвая (в 10x раз дешевле Sonnet)"}),t.jsx("li",{className:"theory-list-item",children:"🧠 Менее умная, но достаточна для простых задач"}),t.jsx("li",{className:"theory-list-item",children:"📚 100k контекст"}),t.jsx("li",{className:"theory-list-item",children:"✅ Для быстрых ответов и прототипирования"})]})]}),t.jsx(F,{title:"Таблица сравнения",children:t.jsx(M,{headers:["Модель","Разум","Скорость","Цена","Контекст","Лучше всего для"],rows:[["Claude 3.5 Sonnet","⭐⭐⭐⭐","⚡⚡⚡⚡⚡","💰💰","200k","Разработка (ВЫБЕРИ ЭТО)"],["Claude 3 Opus","⭐⭐⭐⭐⭐","⚡⚡⚡","💰💰💰💰","200k","Очень сложные задачи"],["Claude 3 Haiku","⭐⭐⭐","⚡⚡⚡⚡⚡","💰","100k","Быстрые ответы"]]})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Искусство писать промпты (Prompt Engineering)"}),t.jsx("p",{className:"theory-intro",children:"Промпт — это твой запрос к ИИ. От качества промпта на 80% зависит качество ответа. Это настоящее искусство! Вот как писать хорошие промпты."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"❌ Плохой промпт vs ✅ Хороший промпт"}),t.jsxs(F,{title:"Пример 1: Простая задача",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"❌ Плохо:"}),' "Напиши код"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"✅ Хорошо:"}),' "Напиши функцию на Python, которая проверяет, является ли число простым. Входной параметр: целое число n. Выходной параметр: True если простое, False иначе. Используй эффективный алгоритм O(√n)"']})]}),t.jsxs(F,{title:"Пример 2: Анализ кода",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"❌ Плохо:"}),' "Почему это не работает?"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"✅ Хорошо:"}),' "Вот мой код: [код]. Ошибка: TypeError: NoneType. Я ожидаю, что функция должна вернуть список. Объясни, в чём проблема, и покажи исправленный вариант"']})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"📋 Структура хорошего промпта"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px",lineHeight:"1.8"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Контекст:"})," Для чего это нужно? Кто будет использовать?"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Задача:"})," Что ровно нужно сделать? (Глагол: напиши, объясни, исправь)"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Детали:"})," Язык программирования? Формат? Требования?"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Примеры:"})," Показать примеры входа/выхода"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Ограничения:"})," Не использовать библиотеки? О(n) или меньше?"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Формат ответа:"})," Только код? С объяснением? С комментариями?"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎯 Техника: Chain of Thought (думай пошагово)"}),t.jsx("p",{className:"theory-intro",children:"Явно попроси ИИ думать пошагово для сложных задач:"}),t.jsx(S,{code:`❌ Плохо:
"Реши задачу с массивом"

✅ Хорошо:
"Решение: тебе нужно найти два числа в массиве, которые в сумме дают target.
Сначала объясни алгоритм (что будет твой подход?), потом напиши код.
Покажи пример для массива [2, 7, 11, 15], target = 9"`})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"📚 Техника: Few-shot Learning (показывай примеры)"}),t.jsx("p",{className:"theory-intro",children:"Приведи примеры ПЕРЕД основным вопросом:"}),t.jsx(S,{code:`Перевод названий переменных из camelCase в snake_case:

userName → user_name
getUserId → get_user_id
isActive → is_active

Теперь переведи эти (используй тот же паттерн):
myAwesomeVariable → ?
totalCount → ?
calculateHashValue → ?`}),t.jsx("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:"Нейросеть видит примеры и легче понимает паттерн!"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎭 Техника: Role-based prompting (задай роль)"}),t.jsx(S,{code:`✅ Хороший промпт:
"Ты опытный разработчик Python с 10 лет опыта.
Напиши код для валидации email адреса.
Используй лучшие практики и обработку исключений.
Добавь типизацию (type hints)."`}),t.jsx("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:"Указание роли + опыта часто улучшает качество!"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Контекст: самое важное правило"}),t.jsx("p",{className:"theory-intro",children:'Чем больше контекста ты даешь ИИ, тем лучше ответ. Claude может "помнить" 200k токенов (целую книгу!), используй это!'}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"1️⃣ Указывай файлы и папки для работы"}),t.jsx(S,{code:`✅ Хорошо:
"Я использую инструмент Claude Code.
Давай вместе работать с проектом React.
Файлы находятся в src/components/

Основной файл: src/components/Button.jsx
Стили: src/styles/button.css

Сделай Button более доступным (accessibility)"

ИИ может читать файлы и редактировать их прямо!`})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"2️⃣ Давай информацию о структуре проекта"}),t.jsx(S,{code:`✅ Полезно сказать:
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
Какие файлы нужно изменить?"`})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"3️⃣ Скармливай весь релевантный код"}),t.jsx(S,{code:`✅ Вместо:
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

Ошибка: SyntaxError на строке 4. Помоги найти"`}),t.jsx("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:"ИИ видит точную проблему (пропущен двоеточие)!"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Инструкции в формате .md файла (Промпт как файл)"}),t.jsx("p",{className:"theory-intro",children:"Для больших проектов создай файл CLAUDE.md или INSTRUCTIONS.md, который опишет:"}),t.jsx(S,{code:`# Инструкции для ИИ помощника

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
npm install && npm start`}),t.jsx("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:"Если такой файл есть в проекте, ИИ его найдет и будет следовать правилам!"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Технические указания для точных результатов"}),t.jsx("p",{className:"theory-intro",children:"Чем точнее указания, тем лучше результат."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Ограничения (помогают фокусироваться)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Язык:"}),' "Только Python 3.9+, без numpy"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Размер:"}),' "Функция не более 20 строк"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сложность:"}),' "O(n) временная сложность, максимум"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Стиль:"}),' "В стиле Google, с docstrings"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Зависимости:"}),' "Используй только встроенные модули"']})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Формат ответа (скажи как именно ты хочешь ответ)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Структура:"}),' "Дай сначала объяснение, потом код, потом примеры"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Язык:"}),' "На русском / на английском"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Детальность:"}),' "Краткий ответ / подробный с объяснением каждой строки"']}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Комментарии:"}),' "Без комментариев / с комментариями на каждом шаге"']})]})]}),t.jsxs(F,{title:"Полный пример хорошего промпта",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Контекст:"}),' "Работаю над веб-приложением на React"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"Задача:"}),' "Напиши компонент Button"']}),t.jsx("p",{children:t.jsx("strong",{children:"Требования:"})}),t.jsx("p",{children:"• Функциональный компонент с Hooks"}),t.jsx("p",{children:"• Props: text, onClick, disabled, variant (primary/secondary)"}),t.jsx("p",{children:"• Использует CSS модули (не inline styles)"}),t.jsx("p",{children:"• Должен быть доступен (accessibility)"}),t.jsxs("p",{children:[t.jsx("strong",{children:"Формат:"}),' "Код + пример использования + PropTypes"']}),t.jsxs("p",{children:[t.jsx("strong",{children:"Ограничение:"}),' "Не более 50 строк, чистый код без лишнего"']})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"GitHub Copilot"}),t.jsx("p",{className:"theory-intro",children:"Расширение в IDE, которое автодополняет код во время печати. Работает как автозаполнение на телефоне, но для кода."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Как это работает"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Смотрит на контекст: названия переменных, функций, импорты"}),t.jsx("li",{className:"theory-list-item",children:"Предлагает код на основе миллионов примеров с GitHub"}),t.jsx("li",{className:"theory-list-item",children:"Работает в VS Code, JetBrains IDE, Neovim"}),t.jsx("li",{className:"theory-list-item",children:"Платно: $10/месяц (но бесплатно для студентов и open-source разработчиков)"})]})]}),t.jsxs(F,{title:"Как писать, чтобы Copilot помог",children:[t.jsx("p",{children:t.jsx("strong",{children:"❌ Плохо:"})}),t.jsx("p",{children:"def f(a, b):"}),t.jsx("p",{children:t.jsx("strong",{children:"✅ Хорошо:"})}),t.jsx("p",{children:"def validate_email_address(email: str) -> bool:"}),t.jsx("p",{children:"    # проверяет что email содержит @"}),t.jsx("p",{style:{marginTop:"8px"},children:"Copilot видит название + комментарий и предложит нужную функцию!"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Claude Code: IDE расширение"}),t.jsx("p",{className:"theory-intro",children:"Самое мощное: Claudeде может читать и редактировать файлы прямо в твоём проекте. Используй это максимально!"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Что он может делать"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:["📖 ",t.jsx("strong",{children:"Читать файлы:"}),' "Покажи мне файл Button.jsx"']}),t.jsxs("li",{className:"theory-list-item",children:["✏️ ",t.jsx("strong",{children:"Редактировать файлы:"})," Автоматически изменяет и сохраняет"]}),t.jsxs("li",{className:"theory-list-item",children:["🔍 ",t.jsx("strong",{children:"Поиск:"}),' "Найди все функции которые проверяют email"']}),t.jsxs("li",{className:"theory-list-item",children:["🔧 ",t.jsx("strong",{children:"Рефакторинг:"}),' "Переведи этот компонент на Hooks"']}),t.jsxs("li",{className:"theory-list-item",children:["🐛 ",t.jsx("strong",{children:"Исправление ошибок:"})," Видит error и исправляет"]}),t.jsxs("li",{className:"theory-list-item",children:["🧪 ",t.jsx("strong",{children:"Написание тестов:"})," Генерирует unit tests"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Как использовать эффективно"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px",lineHeight:"1.8"},children:[t.jsx("li",{children:'Скажи "Показать мне файл [путь]" чтобы ИИ прочитал файл'}),t.jsx("li",{children:'После того как ИИ прочитал контекст, пиши запросы: "Рефакторь этот компонент"'}),t.jsx("li",{children:"ИИ видит ошибки в терминале и может их исправлять автоматически"}),t.jsx("li",{children:"Для больших задач - скажи ИИ про всю структуру папки"})]})]}),t.jsxs(F,{title:"Практический пример",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Ты:"}),` "У меня есть проект React в папке src/. Есть ошибка в консоли: 'Cannot read property of undefined'. Помоги найти и исправить"`]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Claude (через IDE):"})," Откроет файлы, увидит проблему, исправит, сохранит"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Ограничения и опасности ИИ"}),t.jsx("p",{className:"theory-intro",children:"ИИ — мощный инструмент, но не волшебство. Вот о чём надо помнить."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🚫 Галлюцинации"}),t.jsx("p",{className:"theory-intro",children:"Модель может выдумать с полной уверенностью."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:'Факты которых нет ("Это функция была добавлена в Python 3.12")'}),t.jsx("li",{className:"theory-list-item",children:'Несуществующие библиотеки ("Используй numpy_super.array()")'}),t.jsx("li",{className:"theory-list-item",children:"Неправильный код, но написанный очень убедительно"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"})," ВСЕГДА проверяй код перед использованием. Гугли если сомневаешься."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"📅 Знания устаревают"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Claude обучена до определённой даты"}),t.jsx("li",{className:"theory-list-item",children:"О новых версиях библиотек может не знать"}),t.jsx("li",{className:"theory-list-item",children:"Новые API может не знать"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"}),' Скажи ИИ "Это новая версия, вот доки" и скармливай свежую информацию.']})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🧮 Ошибки в точных вычислениях"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Может неправильно считать математику"}),t.jsx("li",{className:"theory-list-item",children:"Путается в больших числах"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"})," Для математики и точных вычислений - проверь вручную или в Python."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎭 Может ошибаться в сложной логике"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Сложные алгоритмы может напереть неправильно"}),t.jsx("li",{className:"theory-list-item",children:"Может забыть edge case в коде"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"}),' Попроси "покажи примеры, включая edge cases" и протестируй.']})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🧠 Контекст конечен (хоть 200k большой)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Если скармливаешь ОЧЕНЬ много текста, может потеря качество"}),t.jsx("li",{className:"theory-list-item",children:"Может забыть начало длинной беседы"})]}),t.jsxs("p",{style:{marginTop:"12px",color:"var(--text-secondary)"},children:[t.jsx("strong",{children:"Решение:"})," Разбей большие задачи на несколько промптов. Напомни контекст если забыл."]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Этика использования ИИ"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:["✅ ",t.jsx("strong",{children:"ВСЕГДА"})," проверяй код перед использованием в production"]}),t.jsx("li",{className:"theory-list-item",children:"✅ Указывай что ты использовал ИИ (в коде, в документации, в резюме)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Проверяй лицензии и авторские права (не копируй чужой чужой лицензированный код)"}),t.jsx("li",{className:"theory-list-item",children:"✅ ИИ — помощник, а не замена. Ты должен понимать что пишешь"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не полагайся полностью на ИИ для критических систем"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Практические советы для разработчика"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"💡 ТОП-5 способов использовать ИИ каждый день"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px",lineHeight:"1.8"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Рефакторинг кода:"}),' "Переделай этот код чтобы он был более читаемым"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Объяснение чужого кода:"}),' "Объясни что делает эта функция пошагово"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Написание тестов:"}),' "Напиши unit tests для этой функции"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Документация:"}),' "Напиши подробный комментарий (docstring) для этой функции"']}),t.jsxs("li",{children:[t.jsx("strong",{children:"Отладка:"}),' "Помоги найти баг. Вот ошибка и код" (скармливай error message)']})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🎯 Когда НЕ использовать ИИ"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"❌ Для изучения основ (ты должен сам учиться, не копировать ответы)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Для хранения секретной информации (в бесплатных сервисах данные могут видеть)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Для очень специфичного знания про твой проект (ИИ может не знать деталей)"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"ИИ — твой помощник разработчика. Используй его мудро, проверяй результаты, и он сэкономит тебе часы работы!"})})]})}function oy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 13"}),t.jsx("p",{className:"theory-subtitle",children:"Практический проект: визуализация структур данных и алгоритмов"}),t.jsx("p",{className:"theory-date",children:"13 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"📋 Дедлайны и правила"}),t.jsxs("div",{style:{backgroundColor:"rgba(200,255,0,0.05)",padding:"16px",borderRadius:"8px",marginBottom:"24px"},children:[t.jsx("p",{style:{margin:"0 0 12px 0",fontWeight:600},children:"⏰ Когда можешь сдать:"}),t.jsxs("ul",{style:{margin:"0 0 12px 0",paddingLeft:"20px"},children:[t.jsx("li",{children:"✅ Суббота, 13 июня в 21:00"}),t.jsx("li",{children:"✅ Или в любой день в 21:00 в начале лекции"})]}),t.jsx("p",{style:{margin:"0 0 12px 0",fontWeight:600},children:"🎤 Выступление:"}),t.jsxs("ul",{style:{margin:"0 0 12px 0",paddingLeft:"20px"},children:[t.jsx("li",{children:"Время на выступление: 5 минут"}),t.jsx("li",{children:"Показать что реализовал (демонстрация программы)"}),t.jsx("li",{children:"Рассказать какое задание было"}),t.jsx("li",{children:"Объяснить что получилось"}),t.jsx("li",{children:"Рассказать какие трудности были"})]}),t.jsx("p",{style:{margin:"0",color:"var(--text-secondary)",fontSize:"13px"},children:"Дедлайна нет! Можешь сдать когда готово. Главное - показать свою работу и рассказать как её делал."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"🎯 Тебе мог попасться один из 10 вариантов"}),t.jsx("p",{className:"theory-intro",style:{marginBottom:"24px"},children:"Получи вариант в лс в телеграме и реализуй его. Используй Python или другой язык программирования. Допускается использование AI (Copilot, Claude, ChatGPT) для помощи. Код загрузи в GitHub репозиторий."}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 1: Поиск середины списка (slow/fast pointers)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм поиска середины односвязного списка с помощью указателей slow и fast"}),t.jsx("li",{children:"Программа должна пошагово показывать перемещение указателей по списку"}),t.jsx("li",{children:"Графический вывод: консоль с анимацией или выводом каждого шага по нажатию Enter"}),t.jsx("li",{children:"Необходимо реализовать создание списка и визуализацию позиций указателей"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 2: Проверка скобочной последовательности"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм проверки правильности скобочной последовательности с использованием стека"}),t.jsx("li",{children:"Визуально показывать содержимое стека после каждой операции push/pop"}),t.jsx("li",{children:"Графический вывод: браузер (HTML/CSS/JS) или консоль"}),t.jsx("li",{children:"Отображать текущий символ строки и текущее состояние стека на каждом шаге"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 3: Обход графа в ширину (BFS)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм обхода графа в ширину (BFS) с использованием очереди"}),t.jsx("li",{children:"Пошагово показывать добавление и удаление вершин из очереди"}),t.jsx("li",{children:"Графический вывод: браузер с визуализацией графа или библиотека графики"}),t.jsx("li",{children:"На каждом шаге подсвечивать текущую вершину и содержимое очереди"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 4: Обход графа в глубину (DFS)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм обхода графа в глубину (DFS) со стеком или рекурсией"}),t.jsx("li",{children:"Визуально показывать порядок посещения вершин графа"}),t.jsx("li",{children:"Графический вывод: браузер или библиотека для графики"}),t.jsx("li",{children:"На каждом этапе отображать текущую вершину и уже посещённые вершины"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 5: Двусвязный список"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать двусвязный список с операциями вставки и удаления элементов"}),t.jsx("li",{children:"Пошагово показывать изменение связей между узлами списка"}),t.jsx("li",{children:"Графический вывод: консоль или библиотека графики"}),t.jsx("li",{children:"Отображать указатели prev и next для каждого элемента списка"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 6: Удаление дубликатов из списка"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм удаления дубликатов из односвязного списка"}),t.jsx("li",{children:"Пошагово показывать обход списка и удаление повторяющихся элементов"}),t.jsx("li",{children:"Графический вывод: консоль, браузер или библиотека графики"}),t.jsx("li",{children:"На каждом шаге отображать текущий узел, проверяемое значение и итоговое состояние списка"}),t.jsx("li",{children:"Можно реализовать управление шагами через кнопки вперед/назад или автоматический показ через таймер"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 7: Хэш-таблица с разрешением коллизий"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать хэш-таблицу с разрешением коллизий методом цепочек или линейного пробирования"}),t.jsx("li",{children:"Пошагово показывать процесс вставки, поиска и обработки коллизий"}),t.jsx("li",{children:"Графический вывод: браузер или библиотека графики"}),t.jsx("li",{children:"На каждом шаге отображать индекс хэш-таблицы и действия алгоритма"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 8: Бинарное дерево поиска (BST)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать бинарное дерево поиска (BST) с операциями вставки и поиска элементов"}),t.jsx("li",{children:"Визуально показывать прохождение по дереву на каждом шаге алгоритма"}),t.jsx("li",{children:"Графический вывод: библиотека графики или браузер"}),t.jsx("li",{children:"Отображать текущий узел и направление перехода по дереву"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 9: Разворот односвязного списка"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм разворота односвязного списка"}),t.jsx("li",{children:"Пошагово показывать изменение ссылок между элементами списка"}),t.jsx("li",{children:"Графический вывод: консоль с задержкой по времени или браузер"}),t.jsx("li",{children:"На каждом шаге отображать текущий элемент, previous и next"})]})]}),t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"16px"},children:"Вариант 10: Алгоритм Дейкстры (кратчайший путь)"}),t.jsxs("ul",{style:{margin:"0",paddingLeft:"20px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:"1.6"},children:[t.jsx("li",{children:"Реализовать алгоритм поиска кратчайшего пути в графе (алгоритм Дейкстры)"}),t.jsx("li",{children:"Пошагово показывать обновление расстояний до вершин и выбор текущей вершины"}),t.jsx("li",{children:"Графический вывод: браузер или библиотека графики"}),t.jsx("li",{children:"Отображать таблицу расстояний и подсветку текущих рёбер графа"})]})]})]})]})]})}function cy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 15"}),t.jsx("p",{className:"theory-subtitle",children:"Тайм- и таск-менеджмент"}),t.jsx("p",{className:"theory-date",children:"15 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Что такое таск-менеджмент и зачем он нужен"}),t.jsx("p",{className:"theory-intro",children:"Таск-менеджмент — это система организации и управления задачами, которая помогает человеку или команде достигать целей без потери фокуса. В мире, где количество задач постоянно растёт, умение управлять временем становится ключевым профессиональным навыком."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Проблемы без системы управления задачами"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Задачи теряются или забываются"}),t.jsx("li",{className:"theory-list-item",children:"Непонятно, что делать в первую очередь"}),t.jsx("li",{className:"theory-list-item",children:"Ощущение постоянной перегруженности"}),t.jsx("li",{className:"theory-list-item",children:"Сложно оценить реальный прогресс по проектам"}),t.jsx("li",{className:"theory-list-item",children:"Прокрастинация и откладывание важных дел"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Метод GTD (Getting Things Done)"}),t.jsx("p",{className:"theory-intro",children:"GTD — система управления задачами Дэвида Аллена. Её суть: освободить голову от хранения задач и доверить их надёжной внешней системе. Мозг плохо хранит, но отлично обрабатывает."}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"12px",margin:"20px 0"},children:[{n:"1",t:"Сбор",en:"Capture",d:"Записывай всё во «входящий ящик» (Inbox). Не держи ничего в голове."},{n:"2",t:"Обработка",en:"Clarify",d:"Требует ли элемент действия? Если да — определи конкретный следующий шаг."},{n:"3",t:"Организация",en:"Organize",d:"Распредели по категориям: действия, проекты, ожидания, календарь."},{n:"4",t:"Обзор",en:"Reflect",d:"Еженедельно просматривай все списки и обновляй систему."},{n:"5",t:"Выполнение",en:"Engage",d:"Выбирай задачу по контексту, времени, энергии и приоритету."}].map((e,r)=>t.jsxs("div",{style:{flex:"1 1 150px",minWidth:"150px",background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:"var(--accent-lime)",color:"#0a0a14",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"8px"},children:e.n}),t.jsx("div",{style:{fontWeight:700,color:"var(--text-primary)",fontSize:"14px"},children:e.t}),t.jsx("div",{style:{fontSize:"11px",color:"var(--accent-lime)",marginBottom:"6px"},children:e.en}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)",lineHeight:"1.5"},children:e.d})]},r))}),t.jsx(F,{title:"Ключевое правило GTD (правило 2 минут)",children:t.jsx("p",{children:"Если задача занимает менее 2 минут — сделай её немедленно, не откладывая в систему."})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Техники управления временем"}),t.jsx("p",{className:"theory-intro",children:"Универсального метода нет — разные подходы подходят разным людям. Попробуй каждый и найди свой."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🍅 Техника Pomodoro"}),t.jsx("p",{className:"theory-text",style:{marginBottom:"12px"},children:"Работай 25 минут без прерываний (один «помидор»), затем 5 минут отдыха. После четырёх «помидоров» — длинный перерыв 15–30 минут."}),t.jsxs("p",{className:"theory-text",style:{marginBottom:"12px",fontSize:"12px",color:"var(--text-tertiary)"},children:["Используй таймер: ",t.jsx("a",{href:"https://www.forestapp.cc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Forest"}),", ",t.jsx("a",{href:"https://www.befocused.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Be Focused"})," или ",t.jsx("a",{href:"https://pomofocus.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Pomofocus.io"})]}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",alignItems:"center",margin:"12px 0"},children:[{l:"25 мин",w:"работа"},{l:"5",w:"отдых"},{l:"25 мин",w:"работа"},{l:"5",w:"отдых"},{l:"25 мин",w:"работа"},{l:"5",w:"отдых"},{l:"25 мин",w:"работа"},{l:"15-30",w:"длинный отдых"}].map((e,r)=>t.jsxs("div",{style:{flex:e.w==="работа"?"1 1 70px":"0 1 50px",minWidth:e.w==="работа"?"70px":"44px",background:e.w==="работа"?"rgba(200,255,0,0.15)":e.w==="длинный отдых"?"rgba(110,181,255,0.18)":"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:"6px",padding:"8px 6px",textAlign:"center"},children:[t.jsx("div",{style:{fontSize:"12px",fontWeight:700,color:"var(--text-primary)"},children:e.l}),t.jsx("div",{style:{fontSize:"10px",color:"var(--text-tertiary)"},children:e.w})]},r))}),t.jsxs("p",{className:"theory-text",children:[t.jsx("strong",{children:"Для кого:"})," тем, кого легко отвлечь, и тем, кто работает без пауз. Хорошо для монотонных задач — кодирование, тексты, учёба."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🐸 Метод «Съешь лягушку»"}),t.jsxs("p",{className:"theory-text",children:["«Лягушка» — самая неприятная задача дня. Выполняй её первой, пока энергия максимальна. Остаток дня ощущается легче. ",t.jsx("strong",{children:"Для кого:"})," тем, кто откладывает неприятное на конец дня."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🐘 Метод «Съешь слона по частям»"}),t.jsxs("p",{className:"theory-text",children:["Большую задачу разбей на маленькие шаги. «Написать диплом» — это проект, а «написать введение (1500 слов)» — задача. ",t.jsx("strong",{children:"Для кого:"})," тем, кто чувствует паралич перед крупными проектами."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🗓 Метод «Временные блоки» (Time Blocking)"}),t.jsxs("p",{className:"theory-text",children:["Заранее выделяй в календаре блоки под типы задач. Например: 9:00–11:00 — глубокая работа, 11:00–12:00 — встречи, после обеда — рутина. ",t.jsx("strong",{children:"Для кого:"})," тем, кто не чувствует контроля над днём."]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"1️⃣3️⃣5️⃣ Метод «1-3-5»"}),t.jsx("p",{className:"theory-text",children:"Каждый день планируй: 1 большую задачу, 3 средних и 5 маленьких. Реалистичный план, который не позволяет перегрузить список."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Личный Канбан"}),t.jsx("p",{className:"theory-intro",children:"Визуальная доска с тремя колонками. Задачи перемещаются слева направо. Ключевое правило: ограничивай количество задач «В процессе» (обычно не более 3) — это борьба с многозадачностью."}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"12px",margin:"20px 0"},children:[{title:"Нужно сделать",color:"var(--text-tertiary)",cards:["📝 Написать функцию","🧪 Добавить тесты","📚 Прочитать главу"]},{title:"В процессе",color:"var(--accent-lime)",limit:"WIP ≤ 3",cards:["🔍 Код-ревью PR","🐛 Чинить баг"]},{title:"Готово",color:"#64c864",cards:["✅ Настроить Git","✅ Залить проект"]}].map((e,r)=>t.jsxs("div",{style:{flex:"1 1 200px",minWidth:"180px",background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:"10px",padding:"12px"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px",paddingBottom:"8px",borderBottom:`2px solid ${e.color}`},children:[t.jsx("span",{style:{fontWeight:700,color:e.color,fontSize:"13px"},children:e.title}),e.limit&&t.jsx("span",{style:{fontSize:"10px",color:"var(--accent-lime)",border:"1px solid var(--accent-lime)",borderRadius:"4px",padding:"1px 5px"},children:e.limit})]}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:e.cards.map((n,s)=>t.jsx("div",{style:{background:"var(--bg-primary)",border:"1px solid var(--border-color)",borderRadius:"6px",padding:"8px",fontSize:"12px",color:"var(--text-secondary)"},children:n},s))})]},r))})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Приоритизация: матрица Эйзенхауэра"}),t.jsx("p",{className:"theory-intro",children:"Делит все задачи на 4 квадранта по двум осям: важность и срочность."}),t.jsxs("div",{style:{margin:"20px 0"},children:[t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto 1fr 1fr",gap:"8px",alignItems:"stretch"},children:[t.jsx("div",{}),t.jsx("div",{style:{textAlign:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",padding:"4px"},children:"СРОЧНО"}),t.jsx("div",{style:{textAlign:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",padding:"4px"},children:"НЕ СРОЧНО"}),t.jsx("div",{style:{display:"flex",alignItems:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",writingMode:"vertical-rl",transform:"rotate(180deg)",justifyContent:"center"},children:"ВАЖНО"}),t.jsxs("div",{style:{background:"rgba(255,95,95,0.15)",border:"1px solid rgba(255,95,95,0.4)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"#ff5f5f",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 1 · Делать"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Кризисы, дедлайны, аварии. Чинить баг в продакшене."})]}),t.jsxs("div",{style:{background:"rgba(110,181,255,0.15)",border:"1px solid rgba(110,181,255,0.4)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"#6eb5ff",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 2 · Планировать"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Развитие, обучение, здоровье. Самый ценный квадрант!"})]}),t.jsx("div",{style:{display:"flex",alignItems:"center",fontWeight:700,color:"var(--text-secondary)",fontSize:"12px",writingMode:"vertical-rl",transform:"rotate(180deg)",justifyContent:"center"},children:"НЕ ВАЖНО"}),t.jsxs("div",{style:{background:"rgba(255,159,80,0.15)",border:"1px solid rgba(255,159,80,0.4)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"#ff9f50",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 3 · Делегировать"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Чужие просьбы, часть встреч. Иллюзия занятости."})]}),t.jsxs("div",{style:{background:"rgba(138,138,154,0.12)",border:"1px solid var(--border-color)",borderRadius:"10px",padding:"14px"},children:[t.jsx("div",{style:{fontWeight:700,color:"var(--text-tertiary)",fontSize:"13px",marginBottom:"4px"},children:"Квадрант 4 · Исключить"}),t.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)"},children:"Соцсети, лишние встречи. Сокращай до минимума."})]})]}),t.jsxs("p",{className:"theory-text",style:{marginTop:"12px"},children:[t.jsx("strong",{children:"Главная мысль:"})," большинство живёт в квадрантах 1 и 3. Перенеси фокус в квадрант 2 — и кризисов станет меньше."]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Другие методы приоритизации"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод MoSCoW"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Must Have"})," — обязательно (без этого проект не работает)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Should Have"})," — важно, но не критично сейчас"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Could Have"})," — хорошо бы при наличии времени"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Won't Have"})," — не делаем сейчас, возможно потом"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Метод ABC"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"A"})," — серьёзные последствия за невыполнение (делай первыми)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"B"})," — умеренные последствия"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"C"})," — без последствий"]})]}),t.jsx("p",{className:"theory-text",children:"Никогда не берись за B, если не сделаны все A."})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Правило 80/20 (Принцип Парето)"}),t.jsx("p",{className:"theory-text",children:"20% усилий дают 80% результата. Найди те 20% задач, которые приносят наибольший вклад, и фокусируйся на них. Делать не меньше — делать умнее."})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Инструменты и приложения"}),t.jsx("p",{className:"theory-intro",children:"Инструмент — это не система. Сначала выбери подход (GTD, канбан, Pomodoro), потом подбери инструмент под него."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🍅 Pomodoro-приложения"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.forestapp.cc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Forest"})," — вырастить виртуальный лес во время работы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.befocused.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Be Focused"})," — простой Pomodoro-таймер для всех устройств"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://pomofocus.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Pomofocus.io"})," — веб-таймер Pomodoro (бесплатно)"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"📋 Таск-менеджеры и доски"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://trello.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Trello"})," — визуальные доски, канбан для личного и командного использования"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://notion.so",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Notion"})," — всё в одном (задачи, заметки, БД, документы)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.atlassian.com/software/jira",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Jira"})," — Agile, спринты, баг-трекинг для IT-команд"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://linear.app",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Linear"})," — быстрый трекер задач для стартапов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://todoist.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Todoist"})," — простой GTD-таск-менеджер"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.ticktick.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"TickTick"})," — задачи + привычки + встроенный Pomodoro"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"🧠 Управление знаниями и заметки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://obsidian.md",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Obsidian"})," — система личных заметок на основе Markdown (локально на диске)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://google.com/tasks",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Google Tasks"})," — простой список задач, интегрирован с Google Calendar и Gmail"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://calendar.google.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)"},children:"Google Calendar"})," — календарь для time blocking и планирования дней"]})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Инструмент следует за системой, а не наоборот. Регулярный обзор — ключ к любой системе. Время — самый ценный ресурс! ⏰"})})]})}function dy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 16"}),t.jsx("p",{className:"theory-subtitle",children:"Языки программирования и фреймворки в 2026 году"}),t.jsx("p",{className:"theory-date",children:"16 июня 2026"})]}),t.jsx("section",{className:"theory-section",children:t.jsxs("p",{className:"theory-intro",children:["Технологический ландшафт в 2026 году продолжает меняться. Цель — не выучить всё, а понять, на что ориентироваться при построении карьеры. Ниже обзор по ключевым направлениям. ",t.jsx("br",{}),t.jsx("br",{}),t.jsx("span",{style:{color:"var(--text-secondary)",fontSize:"12px"},children:"💡 В материале конспект есть подчеркнутые слова — по клику на них вы перейдёте на соответствующую документацию или сайт"})]})}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Фронтенд"}),t.jsx("p",{className:"theory-intro",children:"Фронтенд — всё, что видит пользователь в браузере. Основа неизменна: HTML, CSS, JavaScript. Всё остальное — инструменты поверх них."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Базовые технологии"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"HTML5"})," — структура страницы, семантическая разметка"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"CSS3"})," — стили, анимации, адаптивный дизайн. Flexbox и Grid — обязательны"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"JavaScript (ES2024+)"})," — логика, взаимодействие, работа с API"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"TypeScript"})," — типизированная надстройка над JS, де-факто стандарт в продакшене"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Фреймворки и библиотеки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://react.dev",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"React"})})," — самая популярная библиотека (Meta). В 2026 — React 19 с серверными компонентами"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://nextjs.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Next.js"})})," — фреймворк поверх React (Vercel): SSR, SSG, маршрутизация, API-роуты"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://vuejs.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Vue.js"})})," — лёгкий вход, Vue 3 с Composition API"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://svelte.dev",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Svelte / SvelteKit"})})," — компилируемый фреймворк без рантайм-оверхеда"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://astro.build",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Astro"})})," — быстрые контентные сайты, Islands Architecture"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Дополнительные инструменты"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://tailwindcss.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Tailwind CSS"})})," — утилитарный CSS-фреймворк"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://vitejs.dev",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Vite"})})," — быстрый сборщик, заменяет Webpack"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://figma.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Figma"})})," — основной инструмент дизайна"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://storybook.js.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Storybook"})})," — разработка и документирование UI-компонентов"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Бэкенд"}),t.jsx("p",{className:"theory-intro",children:"Бэкенд — серверная часть: обработка данных, бизнес-логика, базы данных, API. Выбор зависит от задачи, нагрузки и команды."}),t.jsx(M,{headers:["Язык","Фреймворки","Особенности"],rows:[["Python","FastAPI, Django, Flask","Простота, силён рядом с ML/аналитикой"],["Node.js (JS)","Express, NestJS, Hono","JS на клиенте и сервере, real-time приложения"],["Go","Gin, Echo, Fiber","Высоконагруженные системы, микросервисы"],["Java / Kotlin","Spring Boot","Корпоративный бэкенд, энтерпрайз"],["Rust","Actix Web, Axum","Производительность, безопасность памяти"]]}),t.jsx("div",{className:"theory-subsection",style:{marginTop:"16px"},children:t.jsxs("p",{style:{marginBottom:"12px",fontSize:"12px"},children:["📚 Документации:",t.jsx("a",{href:"https://www.python.org/doc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"Python"}),t.jsx("span",{style:{color:"var(--text-tertiary)"},children:" · "}),t.jsx("a",{href:"https://fastapi.tiangolo.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"FastAPI"}),t.jsx("span",{style:{color:"var(--text-tertiary)"},children:" · "}),t.jsx("a",{href:"https://www.djangoproject.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"Django"}),t.jsx("span",{style:{color:"var(--text-tertiary)"},children:" · "}),t.jsx("a",{href:"https://nodejs.org/en/docs",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"Node.js"}),t.jsx("span",{style:{color:"var(--text-tertiary)"},children:" · "}),t.jsx("a",{href:"https://go.dev/doc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"Go"}),t.jsx("span",{style:{color:"var(--text-tertiary)"},children:" · "}),t.jsx("a",{href:"https://www.rust-lang.org/documentation.html",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",marginLeft:"8px"},children:"Rust"})]})}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Базы данных"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.postgresql.org/docs",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"PostgreSQL"})})," — реляционная БД, стандарт большинства проектов"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://docs.mongodb.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"MongoDB"})})," — документо-ориентированная NoSQL"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://redis.io/docs",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Redis"})})," — кэш и брокер сообщений в памяти"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://clickhouse.com/docs",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"ClickHouse"})})," — колоночная БД для аналитики"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"ORM:"})," ",t.jsx("a",{href:"https://www.prisma.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Prisma"}),", ",t.jsx("a",{href:"https://docs.sqlalchemy.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"SQLAlchemy"}),", ",t.jsx("a",{href:"https://gorm.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"GORM"})]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Аналитика данных"}),t.jsx("p",{className:"theory-intro",children:"Аналитик собирает, обрабатывает, визуализирует и интерпретирует данные. Основной язык — Python, но SQL важен не меньше."}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://pandas.pydata.org/docs",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"pandas"})})," — работа с табличными данными"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://numpy.org/doc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"NumPy"})})," — численные вычисления, матрицы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Визуализация:"})," ",t.jsx("a",{href:"https://matplotlib.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Matplotlib"}),", ",t.jsx("a",{href:"https://seaborn.pydata.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Seaborn"}),", ",t.jsx("a",{href:"https://plotly.com/python",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Plotly"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://jupyter.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Jupyter Notebook"})})," — интерактивная среда анализа"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"SQL"})," — обязательный инструмент любого аналитика"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BI:"})," ",t.jsx("a",{href:"https://www.tableau.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Tableau"}),", ",t.jsx("a",{href:"https://powerbi.microsoft.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Power BI"}),", ",t.jsx("a",{href:"https://grafana.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Grafana"}),", ",t.jsx("a",{href:"https://superset.apache.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Superset"}),", ",t.jsx("a",{href:"https://www.metabase.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Metabase"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Machine Learning"}),t.jsx("p",{className:"theory-intro",children:"ML-инженер и Data Scientist работают на стыке математики, программирования и предметной области. Порог входа высокий, но спрос устойчив."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Базовые библиотеки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://scikit-learn.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"scikit-learn"})})," — классические ML-алгоритмы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Градиентный бустинг:"})," ",t.jsx("a",{href:"https://xgboost.readthedocs.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"XGBoost"}),", ",t.jsx("a",{href:"https://lightgbm.readthedocs.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"LightGBM"}),", ",t.jsx("a",{href:"https://catboost.ai",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"CatBoost"})," (лидер на табличных данных)"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Deep Learning и LLM (тренд 2024-2026)"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://pytorch.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"PyTorch"})})," — доминирующий фреймворк для исследований и продакшена"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://tensorflow.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"TensorFlow / Keras"})})," — по-прежнему используется в энтерпрайзе"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LLM фреймворки:"})," ",t.jsx("a",{href:"https://python.langchain.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"LangChain"}),", ",t.jsx("a",{href:"https://docs.llamaindex.ai",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"LlamaIndex"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://huggingface.co/docs/transformers",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Hugging Face Transformers"})})," — стандарт для NLP"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://ollama.ai",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Ollama"})})," — запуск локальных LLM"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Кибербезопасность"}),t.jsx("p",{className:"theory-intro",children:"Специалист должен понимать, как работают системы, сети и приложения — и как их взломать, чтобы защитить."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Языки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.python.org/doc",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Python"})})," — скрипты, автоматизация, инструменты анализа"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.gnu.org/software/bash/manual",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Bash / Shell"})})," — работа в Linux"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"C / C++"})," — уязвимости низкого уровня, reverse engineering"]})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Ключевые инструменты"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.kali.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Kali Linux"})})," / ",t.jsx("a",{href:"https://www.parrotsec.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Parrot OS"})})," — дистрибутивы для пентеста"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://nmap.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Nmap"})})," — сетевое сканирование, ",t.jsx("a",{href:"https://portswigger.net/burp",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Burp Suite"})})," — анализ веб-приложений"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://www.wireshark.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Wireshark"})})," — анализ трафика, ",t.jsx("a",{href:"https://www.metasploit.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Metasploit"})})," — тестирование на проникновение"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Универсальные инструменты разработчика"}),t.jsx("p",{className:"theory-intro",children:"Независимо от направления есть инструменты, которые нужны всем."}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://git-scm.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Git"})})," — система контроля версий (абсолютный стандарт). ",t.jsx("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"GitHub"}),", ",t.jsx("a",{href:"https://gitlab.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"GitLab"}),", ",t.jsx("a",{href:"https://bitbucket.org",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Bitbucket"}),", CI/CD"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Командная строка и Linux"})," — большинство серверов на Linux. ",t.jsx("a",{href:"https://www.man7.org/linux/man-pages/man1/ssh.1.html",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"SSH"}),", bash-скрипты"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://docker.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"Docker"})})," — контейнеризация, решает «у меня работает, а на сервере нет». ",t.jsx("a",{href:"https://kubernetes.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Kubernetes"})," для оркестрации"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Облачные платформы:"})," ",t.jsx("a",{href:"https://aws.amazon.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"AWS"}),", ",t.jsx("a",{href:"https://cloud.google.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Google Cloud"}),", ",t.jsx("a",{href:"https://azure.microsoft.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Azure"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"REST API и HTTP"})," — методы, статус-коды, JSON. ",t.jsx("a",{href:"https://www.postman.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Postman"})," для тестирования"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("a",{href:"https://code.visualstudio.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:t.jsx("strong",{children:"VS Code"})})," — самый популярный редактор. ",t.jsx("a",{href:"https://www.jetbrains.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"JetBrains IDE"}),", ",t.jsx("a",{href:"https://neovim.io",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Neovim"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"AI-инструменты:"})," ",t.jsx("a",{href:"https://github.com/features/copilot",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"GitHub Copilot"}),", ",t.jsx("a",{href:"https://cursor.sh",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Cursor"}),", ",t.jsx("a",{href:"https://claude.ai",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"Claude"}),", ",t.jsx("a",{href:"https://chatgpt.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--accent-lime)",textDecoration:"underline"},children:"ChatGPT"})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Рынок труда 2026: что выбрать"}),t.jsx(M,{headers:["Направление","Топ-стек"],rows:[["Фронтенд","TypeScript + React/Next.js, Tailwind + Vite"],["Бэкенд","Python (FastAPI/Django), Node.js (NestJS), Go"],["Аналитика","Python + SQL, dbt, BI-инструменты"],["ML/AI","PyTorch + scikit-learn, LangChain, Hugging Face"],["Кибербезопасность","Python + Linux + Bash"]]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Не пытайся выучить всё сразу. Выбери одно направление, освой базу, начни применять. Глубина важнее ширины! 🚀"})})]})}function uy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 17"}),t.jsx("p",{className:"theory-subtitle",children:"SQL — часть 1: основы"}),t.jsx("p",{className:"theory-date",children:"17 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"📊 SQL — часть 1: что такое база данных"}),t.jsx("p",{className:"theory-intro",children:"База данных (БД) — это место, где приложение надёжно хранит данные. Реляционная БД хранит данные в таблицах — как электронные таблицы Excel, со строками и столбцами."}),t.jsxs("p",{className:"theory-text",style:{marginBottom:"4px"},children:["Вот таблица ",t.jsx("strong",{children:"users"})," — каждая строка это один пользователь, каждый столбец — одно свойство:"]}),t.jsx(be,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"]],caption:"id — уникальный номер строки (первичный ключ)"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"SELECT — выборка данных"}),t.jsxs("p",{className:"theory-intro",children:["SELECT — главная команда SQL. Она говорит: «выбери эти колонки из этой таблицы». ",t.jsx("code",{children:"*"})," означает «все колонки»."]}),t.jsx(S,{language:"sql",code:"SELECT name, age FROM users;"}),t.jsx("p",{className:"theory-text",children:"Берём только колонки name и age из таблицы users:"}),t.jsx(be,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"]],highlightCols:[1,2],caption:"Подсвеченные колонки — это результат запроса"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"WHERE — фильтрация строк"}),t.jsx("p",{className:"theory-intro",children:"WHERE оставляет только те строки, которые подходят под условие. Остальные отбрасываются."}),t.jsx(S,{language:"sql",code:"SELECT * FROM users WHERE age > 25;"}),t.jsx("p",{className:"theory-text",children:"Останутся только пользователи старше 25 лет:"}),t.jsx(be,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"]],highlightRows:[1,3],caption:"Подсвечены строки, прошедшие условие age > 25 (Борис и Глеб)"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Операторы в WHERE"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сравнение:"})," = , > , < , >= , <= , != "]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"AND / OR:"})," ",t.jsx("code",{children:"WHERE age > 20 AND city = 'Москва'"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"IN:"})," ",t.jsx("code",{children:"WHERE city IN ('Москва', 'Сочи')"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"BETWEEN:"})," ",t.jsx("code",{children:"WHERE age BETWEEN 20 AND 30"})]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LIKE:"})," ",t.jsx("code",{children:"WHERE name LIKE 'А%'"})," — имена на букву «А»"]})]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"ORDER BY — сортировка"}),t.jsx("p",{className:"theory-intro",children:"ORDER BY сортирует результат. ASC — по возрастанию (по умолчанию), DESC — по убыванию."}),t.jsx(S,{language:"sql",code:"SELECT * FROM users ORDER BY age DESC;"}),t.jsx("p",{className:"theory-text",children:"Те же данные, но отсортированы от самого старшего к младшему:"}),t.jsx(be,{name:"результат",columns:["id","name","age","city"],rows:[["4","Глеб","42","Сочи"],["2","Борис","31","Казань"],["1","Анна","25","Москва"],["3","Вера","19","Москва"]],highlightCols:[2],caption:"Строки переставлены по убыванию возраста"}),t.jsxs("ul",{className:"theory-list",style:{marginTop:"12px"},children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LIMIT"})," — ограничить число строк: ",t.jsx("code",{children:"ORDER BY age DESC LIMIT 3"})," (топ-3 старших)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"DISTINCT"})," — только уникальные значения: ",t.jsx("code",{children:"SELECT DISTINCT city FROM users"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Будущее IT — за теми, кто постоянно учится. А SELECT, WHERE и ORDER BY — твой первый шаг в SQL! 📈"})})]})}function hy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 18"}),t.jsx("p",{className:"theory-subtitle",children:"Тестирование, комментарии и документация · SQL часть 2"}),t.jsx("p",{className:"theory-date",children:"18 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Типы тестов"}),t.jsx(M,{headers:["Тип","Что тестирует","Скорость","Пример"],rows:[["Unit","Одна функция","Быстро","def test_add()"],["Integration","Несколько компонентов","Медленнее","Фронтенд + API"],["E2E","Весь поток пользователя","Очень медленно","Открыть браузер, кликнуть"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Паттерн AAA"}),t.jsx("p",{className:"theory-intro",children:"Arrange → Act → Assert. Структура каждого теста:"}),t.jsx(S,{code:`def test_user_creation():
    # Arrange (подготовка)
    user_data = {"name": "Иван", "age": 17}

    # Act (выполнение)
    user = User(**user_data)

    # Assert (проверка)
    assert user.name == "Иван"
    assert user.age == 17`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"TDD (Test-Driven Development)"}),t.jsx("p",{className:"theory-intro",children:"Красный → Зелёный → Рефакторинг"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Напиши тест (сейчас fails) 🔴"}),t.jsx("li",{children:"Напиши код чтобы тест passed ✅"}),t.jsx("li",{children:"Рефакторь код (тесты всё ещё работают)"}),t.jsx("li",{children:"Повтори"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Документация"}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"README"}),t.jsx("p",{className:"theory-intro",children:"Лицо проекта. Должно быть понятно за 30 секунд."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Что это"}),t.jsx("li",{className:"theory-list-item",children:"Как установить"}),t.jsx("li",{className:"theory-list-item",children:"Как использовать"}),t.jsx("li",{className:"theory-list-item",children:"Примеры"})]})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Docstrings (Python)"}),t.jsx(S,{code:`def calculate_average(numbers):
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
    return sum(numbers) / len(numbers)`,language:"python"})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"JSDoc (JavaScript)"}),t.jsx(S,{code:`/**
 * Сортирует массив
 * @param {number[]} arr - Массив чисел
 * @returns {number[]} Отсортированный массив
 * @throws {Error} Если arr не массив
 */
function sortArray(arr) {
    return arr.sort((a, b) => a - b)
}`,language:"javascript"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Комментарии"}),t.jsxs(F,{title:"Плохо",children:[t.jsx("p",{children:"// Увеличиваем i на 1"}),t.jsx("p",{children:"i++"})]}),t.jsxs(F,{title:"Хорошо",children:[t.jsx("p",{children:"// Пропускаем элементы до первого позитивного отзыва"}),t.jsx("p",{children:"while (reviews[i].rating < 4) i++"})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Правило: комментируй ЧТО и ПОЧЕМУ, а не ЧТО делает код (это очевидно из кода)."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Хорошие привычки"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Пиши код для людей, компилятор уже поймёт"}),t.jsx("li",{className:"theory-list-item",children:"✅ Тесты это документация (показывают как использовать)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Код должен быть понятен без комментариев"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не комментируй очевидное"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не оставляй старый код в комментариях (это Git!)"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"📊 SQL — часть 2: агрегатные функции"}),t.jsxs("p",{className:"theory-intro",children:["Агрегатные функции считают что-то по целой группе строк и возвращают одно число. Используем ту же таблицу ",t.jsx("strong",{children:"users"})," из части 1."]}),t.jsx(be,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"],["5","Дина","28","Казань"]]}),t.jsx(M,{headers:["Функция","Что делает","Пример","Результат"],rows:[["COUNT(*)","Считает строки","SELECT COUNT(*) FROM users","5"],["AVG(age)","Среднее значение","SELECT AVG(age) FROM users","29"],["MAX(age)","Максимум","SELECT MAX(age) FROM users","42"],["MIN(age)","Минимум","SELECT MIN(age) FROM users","19"],["SUM(age)","Сумма","SELECT SUM(age) FROM users","145"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"GROUP BY — группировка"}),t.jsx("p",{className:"theory-intro",children:"GROUP BY собирает строки в группы по одинаковому значению, и агрегатная функция считается для каждой группы отдельно."}),t.jsx(S,{language:"sql",code:`SELECT city, COUNT(*) AS count
FROM users
GROUP BY city;`}),t.jsx("p",{className:"theory-text",children:"Строки сгруппировались по городу, и для каждого посчиталось количество:"}),t.jsx(be,{name:"результат",columns:["city","count"],rows:[["Москва","2"],["Казань","2"],["Сочи","1"]],highlightCols:[1],caption:"Анна+Вера → Москва (2), Борис+Дина → Казань (2), Глеб → Сочи (1)"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"HAVING — фильтр групп"}),t.jsxs("p",{className:"theory-intro",children:["HAVING фильтрует уже сгруппированные данные. Запомни разницу: ",t.jsx("strong",{children:"WHERE"})," фильтрует строки ДО группировки, ",t.jsx("strong",{children:"HAVING"})," — группы ПОСЛЕ."]}),t.jsx(S,{language:"sql",code:`SELECT city, COUNT(*) AS count
FROM users
GROUP BY city
HAVING COUNT(*) > 1;`}),t.jsx("p",{className:"theory-text",children:"Остались только города, где больше одного пользователя:"}),t.jsx(be,{name:"результат",columns:["city","count"],rows:[["Москва","2"],["Казань","2"]],highlightRows:[0,1],caption:"Сочи отброшен — там только 1 пользователь"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"INSERT — добавление данных"}),t.jsx(S,{language:"sql",code:`INSERT INTO users (id, name, age, city)
VALUES (6, 'Егор', 35, 'Москва');`}),t.jsx("p",{className:"theory-text",children:"В таблице появилась новая строка:"}),t.jsx(be,{name:"users",columns:["id","name","age","city"],rows:[["...","...","...","..."],["5","Дина","28","Казань"],["6","Егор","35","Москва"]],highlightRows:[2],caption:"Новая строка добавлена в конец таблицы"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"UPDATE и DELETE"}),t.jsx("p",{className:"theory-intro",children:"UPDATE меняет существующие строки, DELETE удаляет их. Условие WHERE определяет, какие именно строки затронуты."}),t.jsx(S,{language:"sql",code:`-- Изменить город пользователя с id=1
UPDATE users SET city = 'Сочи' WHERE id = 1;

-- Удалить пользователя с id=6
DELETE FROM users WHERE id = 6;`}),t.jsxs(F,{title:"⚠️ Главное правило безопасности",children:[t.jsxs("p",{children:["ВСЕГДА пиши WHERE в UPDATE и DELETE! Без условия команда изменит или удалит ",t.jsx("strong",{children:"ВСЕ"})," строки таблицы."]}),t.jsx("p",{style:{marginTop:"8px",color:"#ff5f5f"},children:"DELETE FROM users; — удалит вообще всех пользователей!"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Качество > количество кода. А GROUP BY и агрегаты превращают тысячи строк в осмысленные цифры! 🎯"})})]})}function py(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 19"}),t.jsx("p",{className:"theory-subtitle",children:"Основы баз данных и SQL · часть 3"}),t.jsx("p",{className:"theory-date",children:"19 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Связи между таблицами и ключи"}),t.jsx("p",{className:"theory-intro",children:"В реальных приложениях данные разбиты на несколько таблиц, связанных между собой. Это избавляет от дублирования — принцип нормализации."}),t.jsx(be,{name:"users",columns:["id 🔑","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"],["5","Дина","28","Казань"]],highlightCols:[0],caption:"id — первичный ключ (PRIMARY KEY), уникальный для каждой строки, не NULL"}),t.jsx(be,{name:"orders",columns:["id 🔑","user_id 🔗","product","price"],rows:[["1","1","Книга","500"],["2","1","Наушники","3000"],["3","2","Мышка","1200"],["4","3","Клавиатура","2500"],["5","5","Монитор","15000"]],highlightCols:[1],caption:"user_id — внешний ключ (FOREIGN KEY), ссылается на users.id"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"PRIMARY KEY 🔑"})," — уникальный идентификатор строки. Не повторяется, не бывает NULL."]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"FOREIGN KEY 🔗"})," — ссылка на PRIMARY KEY другой таблицы. Гарантирует целостность данных."]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Типы связей:"})," один-к-одному (1:1), один-ко-многим (1:N), многие-ко-многим (N:M через промежуточную таблицу)."]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"INNER JOIN — пересечение таблиц"}),t.jsxs("p",{className:"theory-intro",children:["JOIN соединяет строки двух таблиц по условию. INNER JOIN возвращает только строки, у которых есть совпадение в ",t.jsx("em",{children:"обеих"})," таблицах."]}),t.jsx(S,{language:"sql",code:`SELECT u.name, o.product, o.price
FROM users AS u
JOIN orders AS o ON u.id = o.user_id;`}),t.jsxs("p",{className:"theory-text",children:[t.jsx("code",{children:"AS u"})," и ",t.jsx("code",{children:"AS o"})," — псевдонимы таблиц. Делают запрос короче и читаемее."]}),t.jsx(be,{name:"результат INNER JOIN",columns:["name","product","price"],rows:[["Анна","Книга","500"],["Анна","Наушники","3000"],["Борис","Мышка","1200"],["Вера","Клавиатура","2500"],["Дина","Монитор","15000"]],highlightRows:[0,1,2,3,4],caption:"Глеб не попал — у него нет заказов. Строки с несуществующим user_id тоже отсеиваются."})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"LEFT JOIN — все строки из левой таблицы"}),t.jsxs("p",{className:"theory-intro",children:["LEFT JOIN берёт ",t.jsx("strong",{children:"все строки из левой таблицы"}),", даже если справа нет совпадения. Там где совпадения нет — будет NULL."]}),t.jsx(S,{language:"sql",code:`SELECT u.name, o.product
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id;`}),t.jsx(be,{name:"результат LEFT JOIN",columns:["name","product"],rows:[["Анна","Книга"],["Анна","Наушники"],["Борис","Мышка"],["Вера","Клавиатура"],["Глеб","NULL"],["Дина","Монитор"]],highlightRows:[4],caption:"Глеб попал в результат, хотя заказов нет — product = NULL"}),t.jsx(S,{language:"sql",code:`-- Найти пользователей БЕЗ заказов
SELECT u.name
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
WHERE o.id IS NULL;`}),t.jsxs("p",{className:"theory-text",children:["Фильтр ",t.jsx("code",{children:"WHERE o.id IS NULL"})," оставит только тех, у кого нет совпадений справа."]}),t.jsx(M,{headers:["Тип JOIN","Что возвращает","Когда использовать"],rows:[["INNER JOIN","Только строки с совпадением в обеих таблицах","Когда нужны только связанные данные"],["LEFT JOIN","Все строки слева + совпадения справа (NULL если нет)","Когда нужны все записи, даже без пары"],["RIGHT JOIN","Все строки справа + совпадения слева (NULL если нет)","Редко — обычно меняют порядок таблиц и пишут LEFT"],["FULL OUTER JOIN","Все строки из обеих таблиц","Когда нужно объединить всё (не в SQLite)"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"JOIN + GROUP BY — агрегация по связям"}),t.jsx("p",{className:"theory-intro",children:"Самая мощная комбинация: соединить таблицы и сразу посчитать статистику по группам."}),t.jsx(S,{language:"sql",code:`-- Сколько потратил каждый пользователь
SELECT u.name, COUNT(o.id) AS orders_count, SUM(o.price) AS total_spent
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;`}),t.jsx(be,{name:"результат",columns:["name","orders_count","total_spent"],rows:[["Дина","1","15000"],["Анна","2","3500"],["Вера","1","2500"],["Борис","1","1200"],["Глеб","0","NULL"]],highlightCols:[1,2],caption:"LEFT JOIN + GROUP BY — показывает всех пользователей, включая без заказов"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"NULL — отсутствие значения"}),t.jsx("p",{className:"theory-intro",children:"NULL — это не ноль и не пустая строка. Это «значение неизвестно или отсутствует». С NULL нужно работать через специальные операторы."}),t.jsx(M,{headers:["Оператор / функция","Что делает","Пример"],rows:[["IS NULL","Проверить, что значение NULL","WHERE city IS NULL"],["IS NOT NULL","Проверить, что значение не NULL","WHERE city IS NOT NULL"],["COALESCE(a, b, c)","Первое ненулевое значение из списка","COALESCE(phone, email, 'нет контакта')"],["IFNULL(a, b)","Если a = NULL — вернуть b (SQLite/MySQL)","IFNULL(price, 0)"],["NULLIF(a, b)","Если a = b — вернуть NULL, иначе a","NULLIF(score, 0)"]]}),t.jsx(S,{language:"sql",code:`-- Пользователи без указанного города
SELECT name FROM users WHERE city IS NULL;

-- Заменить NULL на текст "Не указан"
SELECT name, COALESCE(city, 'Не указан') AS city
FROM users;

-- Сумма с заменой NULL на 0
SELECT u.name, COALESCE(SUM(o.price), 0) AS total
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
GROUP BY u.id, u.name;`}),t.jsxs(F,{title:"Важно про NULL",children:[t.jsxs("p",{children:["NULL ≠ NULL. Сравнение ",t.jsx("code",{children:"WHERE city = NULL"})," никогда не сработает — используй ",t.jsx("code",{children:"IS NULL"}),"."]}),t.jsxs("p",{style:{marginTop:"8px"},children:["Агрегатные функции игнорируют NULL: ",t.jsx("code",{children:"AVG()"})," считает только ненулевые значения."]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"CASE WHEN — условная логика в SQL"}),t.jsxs("p",{className:"theory-intro",children:["CASE WHEN — это аналог ",t.jsx("code",{children:"if/else"})," прямо внутри SQL-запроса. Позволяет создавать новые поля на основе условий."]}),t.jsx(S,{language:"sql",code:`SELECT name, age,
  CASE
    WHEN age < 18 THEN 'несовершеннолетний'
    WHEN age BETWEEN 18 AND 25 THEN 'молодой'
    WHEN age BETWEEN 26 AND 40 THEN 'взрослый'
    ELSE 'старший'
  END AS age_group
FROM users;`}),t.jsx(be,{name:"результат",columns:["name","age","age_group"],rows:[["Анна","25","молодой"],["Борис","31","взрослый"],["Вера","19","молодой"],["Глеб","42","старший"],["Дина","28","взрослый"]],highlightCols:[2],caption:"CASE WHEN вычисляет новый столбец age_group для каждой строки"}),t.jsx(S,{language:"sql",code:`-- CASE WHEN внутри COUNT для подсчёта по условию
SELECT
  COUNT(*) AS total_users,
  COUNT(CASE WHEN city = 'Москва' THEN 1 END) AS moscow_users,
  COUNT(CASE WHEN age >= 30 THEN 1 END) AS users_30_plus
FROM users;`})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Подзапросы (Subqueries)"}),t.jsx("p",{className:"theory-intro",children:"Подзапрос — это SELECT внутри другого SELECT, WHERE или FROM. Выполняется первым, его результат используется внешним запросом."}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Подзапрос в WHERE"}),t.jsx(S,{language:"sql",code:`-- Найти пользователей старше среднего возраста
SELECT name, age
FROM users
WHERE age > (SELECT AVG(age) FROM users);`}),t.jsxs("p",{className:"theory-text",children:["Внутренний запрос ",t.jsx("code",{children:"SELECT AVG(age)"})," считается первым → возвращает число (29) → внешний запрос фильтрует строки с age > 29."]}),t.jsx(be,{name:"результат",columns:["name","age"],rows:[["Борис","31"],["Глеб","42"]],highlightRows:[0,1],caption:"AVG(age) = 29. Борис (31) и Глеб (42) старше среднего."})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Подзапрос с IN"}),t.jsx(S,{language:"sql",code:`-- Пользователи, сделавшие хотя бы один заказ
SELECT name FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- Пользователи, НЕ сделавшие ни одного заказа
SELECT name FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders);`})]}),t.jsxs("div",{className:"theory-subsection",children:[t.jsx("h3",{className:"theory-heading-3",children:"Подзапрос в FROM (derived table)"}),t.jsx(S,{language:"sql",code:`-- Средняя сумма заказа по городам через подзапрос
SELECT city, AVG(total) AS avg_total
FROM (
  SELECT u.city, SUM(o.price) AS total
  FROM users AS u
  JOIN orders AS o ON u.id = o.user_id
  GROUP BY u.id, u.city
) AS user_totals
GROUP BY city;`}),t.jsxs("p",{className:"theory-text",children:["Подзапрос в FROM создаёт временную таблицу ",t.jsx("code",{children:"user_totals"}),", по которой делается внешний запрос."]})]}),t.jsx(M,{headers:["Тип","Где пишется","Что возвращает","Пример"],rows:[["Скалярный","WHERE, SELECT","Одно значение","WHERE age > (SELECT AVG(age) FROM users)"],["Строчный","WHERE IN / NOT IN","Список значений","WHERE id IN (SELECT user_id FROM orders)"],["Табличный","FROM","Временная таблица","FROM (SELECT ...) AS sub"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"UNION — объединение результатов"}),t.jsx("p",{className:"theory-intro",children:"UNION объединяет результаты двух SELECT в один. Требует одинакового числа столбцов и совместимых типов."}),t.jsx(S,{language:"sql",code:`-- Все города из users + все города из другой таблицы
SELECT city, 'user' AS source FROM users
UNION
SELECT city, 'store' AS source FROM stores;

-- UNION ALL — включая дубликаты (быстрее)
SELECT city FROM users
UNION ALL
SELECT city FROM users;   -- дублирует строки

-- UNION — без дубликатов (делает DISTINCT автоматически)
SELECT city FROM users
UNION
SELECT city FROM users;`}),t.jsx(M,{headers:["","UNION","UNION ALL"],rows:[["Дубликаты","Удаляет (DISTINCT)","Оставляет все"],["Скорость","Медленнее (сортировка для DISTINCT)","Быстрее"],["Использование","Когда дубли не нужны","Когда дубли допустимы"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"CREATE TABLE и типы данных"}),t.jsx("p",{className:"theory-intro",children:"При создании таблицы каждый столбец получает тип данных. Тип определяет что можно хранить и сколько памяти занимает."}),t.jsx(S,{language:"sql",code:`CREATE TABLE products (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  name     TEXT NOT NULL,
  price    REAL DEFAULT 0,
  stock    INTEGER DEFAULT 0,
  category TEXT,
  created  TEXT DEFAULT (datetime('now'))  -- SQLite
);`}),t.jsx(M,{headers:["Тип (SQLite)","Аналог в других БД","Что хранит","Пример"],rows:[["INTEGER","INT, BIGINT","Целые числа","42, -5, 0"],["REAL","FLOAT, DOUBLE","Числа с точкой","3.14, -0.5"],["TEXT","VARCHAR, CHAR","Строки любой длины","'Анна', 'Москва'"],["BLOB","BINARY","Бинарные данные","файлы, изображения"],["NULL","—","Отсутствие значения","NULL"]]}),t.jsx(M,{headers:["Ограничение","Что делает","Пример"],rows:[["PRIMARY KEY","Уникальный идентификатор строки","id INTEGER PRIMARY KEY"],["NOT NULL","Запрещает NULL","name TEXT NOT NULL"],["UNIQUE","Значение не повторяется","email TEXT UNIQUE"],["DEFAULT","Значение по умолчанию","stock INTEGER DEFAULT 0"],["CHECK","Проверка условия","CHECK (price >= 0)"],["FOREIGN KEY","Ссылка на другую таблицу","FOREIGN KEY (user_id) REFERENCES users(id)"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Нормализация"}),t.jsx("p",{className:"theory-intro",children:"Нормализация — разбиение данных на таблицы так, чтобы избежать дублирования."}),t.jsxs(F,{title:"Без нормализации — плохо",children:[t.jsx("p",{children:"orders: id | user_name | user_city | product | price"}),t.jsx("p",{children:"Если Анна переезжает — нужно обновить city во ВСЕХ её заказах."})]}),t.jsxs(F,{title:"С нормализацией — хорошо",children:[t.jsx("p",{children:"users: id | name | city (Анна обновляется в ONE месте)"}),t.jsx("p",{children:"orders: id | user_id | product | price (ссылаемся на users.id)"})]}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"1НФ"})," — каждая ячейка хранит одно атомарное значение, нет повторяющихся групп"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"2НФ"})," — таблица в 1НФ, все неключевые поля зависят от всего первичного ключа"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"3НФ"})," — таблица в 2НФ, нет транзитивных зависимостей (поле не зависит от другого неключевого)"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"SQL vs NoSQL"}),t.jsx(M,{headers:["Критерий","SQL (реляционные)","NoSQL"],rows:[["Структура","Таблицы со схемой","Документы, ключ-значение, граф"],["Схема","Строгая (нужно определить заранее)","Гибкая (поля разные у каждой записи)"],["Связи","JOIN, FOREIGN KEY","Вложенные объекты или ссылки"],["Масштабирование","Вертикальное (мощнее сервер)","Горизонтальное (больше серверов)"],["Запросы","SQL — стандарт","Своё API у каждой БД"],["Примеры","PostgreSQL, MySQL, SQLite","MongoDB, Redis, Cassandra"],["Когда","Банк, магазин, CRM — строгие связи","Кэш, логи, соцсеть — гибкость и скорость"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Итог трёх дней SQL"}),t.jsx(M,{headers:["День","Тема","Что изучили"],rows:[["17","Основы","Таблицы, SELECT, WHERE, IN/BETWEEN/LIKE, ORDER BY, LIMIT, DISTINCT"],["18","Агрегация и изменение","COUNT/SUM/AVG/MAX/MIN, GROUP BY, HAVING, INSERT, UPDATE, DELETE"],["19","Связи и продвинутый SQL","Ключи, JOIN (INNER/LEFT), NULL, CASE WHEN, Подзапросы, UNION, CREATE TABLE, Нормализация"]]}),t.jsxs("div",{style:{marginTop:"20px"},children:[t.jsx("h3",{className:"theory-heading-3",children:"Полный порядок выполнения SELECT"}),t.jsx(S,{language:"sql",code:`SELECT   [DISTINCT] колонки     -- 6: выбрать колонки
FROM     таблица                  -- 1: из какой таблицы
JOIN     другая ON условие        -- 2: соединить
WHERE    условие_строк            -- 3: фильтр строк
GROUP BY колонка                  -- 4: сгруппировать
HAVING   условие_групп            -- 5: фильтр групп
ORDER BY колонка [ASC|DESC]       -- 7: сортировка
LIMIT    N OFFSET M;              -- 8: ограничение`}),t.jsxs("p",{className:"theory-text",style:{marginTop:"8px"},children:["Запомни: ",t.jsx("strong",{children:"SQL не выполняется сверху вниз"}),". Порядок выполнения: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT."]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"SQL — один из самых востребованных навыков в IT. Ты прошёл все основы за три дня. Теперь практикуйся на реальных данных! 📊"})})]})}function os({headers:e,rows:r}){return t.jsx("div",{style:{overflowX:"auto",margin:"16px 0"},children:t.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[t.jsx("thead",{children:t.jsx("tr",{children:e.map(n=>t.jsx("th",{style:{background:"var(--bg-tertiary)",color:"var(--accent-lime)",padding:"8px 14px",textAlign:"left",fontWeight:700,border:"1px solid var(--border-color)",whiteSpace:"nowrap"},children:n},n))})}),t.jsx("tbody",{children:r.map((n,s)=>t.jsx("tr",{style:{background:s%2===0?"var(--bg-secondary)":"transparent"},children:n.map((i,l)=>t.jsx("td",{style:{padding:"8px 14px",color:l===0?"var(--accent-lime)":"var(--text-secondary)",border:"1px solid var(--border-color)",fontWeight:l===0?600:400,fontFamily:l===0?"monospace":"inherit"},children:i},l))},s))})]})})}function my({children:e}){return t.jsx("div",{style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:8,padding:"16px 20px",margin:"16px 0",fontFamily:"monospace",fontSize:13,color:"var(--text-secondary)",lineHeight:2,whiteSpace:"pre"},children:e})}function fy({videoUrl:e}){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 20"}),t.jsx("p",{className:"theory-subtitle",children:"Сети и REST API"}),t.jsx("p",{className:"theory-date",children:"20 июня 2026"})]}),e&&t.jsx(Va,{src:e}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"1. Как работают сети"}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"Компьютерная сеть"})," — группа устройств, обменивающихся данными. Интернет — самая большая такая сеть, объединяющая миллиарды устройств."]}),t.jsxs("p",{className:"theory-intro",style:{marginTop:12},children:[t.jsx("strong",{children:"Аналогия:"})," сеть — почтовая система. Чтобы письмо дошло, нужен адрес отправителя, получателя и согласованные правила. В сетях эту роль играют IP-адреса и протоколы."]}),t.jsx(os,{headers:["Понятие","Что это","Пример"],rows:[["IP-адрес","Уникальный адрес устройства в сети","192.168.1.10"],["Домен","Человекочитаемое имя вместо IP","google.com"],["DNS","Сервис перевода доменов в IP","google.com → 172.217.16.142"],["Порт","Дверь для конкретного трафика","80=HTTP, 443=HTTPS, 22=SSH"],["Протокол","Набор правил обмена данными","HTTP, TCP/IP, FTP, SSH"]]}),t.jsx("h3",{className:"theory-heading-3",style:{marginTop:20},children:"Модель клиент-сервер"}),t.jsx(my,{children:`Клиент  ──── запрос GET /users ────▶   Сервер
         ◀──── ответ 200 OK + JSON ────`}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Клиент"})," — тот, кто запрашивает данные (браузер, мобильное приложение)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сервер"})," — тот, кто хранит данные и обрабатывает запросы"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"2. Протокол HTTP"}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"HTTP"})," (HyperText Transfer Protocol) — протокол передачи данных в вебе.",t.jsx("strong",{children:" HTTPS"})," = HTTP + шифрование TLS. Сегодня HTTPS — стандарт для всех серьёзных сайтов."]}),t.jsx("h3",{className:"theory-heading-3",style:{marginTop:16},children:"Из чего состоит запрос"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Метод"})," — что мы хотим сделать (GET, POST…)"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"URL"})," — куда обращаемся"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Заголовки (headers)"})," — метаданные: тип контента, авторизация"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Тело (body)"})," — данные, которые передаём (не всегда нужно)"]})]}),t.jsx(S,{lang:"http",code:`POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGci...

{
  "name": "Иван Иванов",
  "email": "ivan@example.com"
}`})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"3. Что такое REST API"}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"API"})," (Application Programming Interface) — интерфейс, через который одна программа обращается к функциям другой. Это контракт: что можно запросить и что вернётся."]}),t.jsxs("p",{className:"theory-intro",style:{marginTop:12},children:[t.jsx("strong",{children:"Аналогия:"})," API — меню в ресторане. Выбираете блюдо из меню (запрос), кухня готовит и приносит (ответ). Вы не идёте готовить сами."]}),t.jsxs("p",{className:"theory-intro",style:{marginTop:12},children:[t.jsx("strong",{children:"REST"})," (REpresentational State Transfer) — архитектурный стиль построения API, не протокол. API, следующий этим принципам, называют ",t.jsx("strong",{children:"RESTful"}),"."]}),t.jsx("h3",{className:"theory-heading-3",style:{marginTop:20},children:"Принципы REST"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Клиент-сервер"})," — разделены, развиваются независимо"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Stateless"})," — каждый запрос содержит всё необходимое; сервер не помнит предыдущие запросы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ресурсы и URL"})," — всё это ресурс с уникальным адресом: /users, /users/42"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Единообразный интерфейс"})," — одни методы (GET/POST/PUT/DELETE) для всех ресурсов"]})]}),t.jsx("h3",{className:"theory-heading-3",style:{marginTop:20},children:"Пример: API библиотеки книг"}),t.jsx(os,{headers:["Что делаем","Запрос"],rows:[["Получить список книг","GET /books"],["Получить книгу с id 5","GET /books/5"],["Добавить новую книгу","POST /books"],["Изменить книгу с id 5","PUT /books/5"],["Удалить книгу с id 5","DELETE /books/5"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"4. HTTP-методы, статус-коды и JSON"}),t.jsx("h3",{className:"theory-heading-3",children:"HTTP-методы (CRUD)"}),t.jsx(os,{headers:["Метод","Действие","CRUD"],rows:[["GET","Получить данные","Read"],["POST","Создать новый ресурс","Create"],["PUT","Полностью обновить ресурс","Update"],["PATCH","Частично обновить ресурс","Update"],["DELETE","Удалить ресурс","Delete"]]}),t.jsx("h3",{className:"theory-heading-3",style:{marginTop:20},children:"Коды ответов (status codes)"}),t.jsx(os,{headers:["Диапазон","Значение","Примеры"],rows:[["2xx","Успех","200 OK, 201 Created, 204 No Content"],["3xx","Перенаправление","301 Moved Permanently"],["4xx","Ошибка клиента","400 Bad Request, 401 Unauthorized, 404 Not Found"],["5xx","Ошибка сервера","500 Internal Server Error"]]}),t.jsxs("p",{className:"theory-intro",style:{marginTop:12},children:[t.jsx("strong",{children:"2xx"})," — всё хорошо  | ",t.jsx("strong",{children:"4xx"})," — ошибся клиент  | ",t.jsx("strong",{children:"5xx"})," — сломалось на сервере"]}),t.jsx("h3",{className:"theory-heading-3",style:{marginTop:20},children:"JSON — формат данных REST API"}),t.jsxs("p",{className:"theory-intro",children:[t.jsx("strong",{children:"JSON"})," (JavaScript Object Notation) — самый популярный формат передачи данных. Прост, читаем человеком, поддерживается всеми языками."]}),t.jsx(S,{lang:"json",code:`// Ответ на GET /users/1
{
  "id": 1,
  "name": "Анна Петрова",
  "email": "anna@example.com",
  "isActive": true,
  "orders": [101, 205]
}`}),t.jsx("h3",{className:"theory-heading-3",style:{marginTop:20},children:"Полный цикл запрос → ответ"}),t.jsx(S,{lang:"http",code:`// Запрос — создание пользователя
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Иван Иванов",
  "email": "ivan@example.com"
}

// Ответ сервера
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 102,
  "name": "Иван Иванов",
  "email": "ivan@example.com"
}`})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"5. Практика в браузере"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"DevTools → Network"})," — открой любой сайт, F12 → Network → перезагрузи. Увидишь все реальные HTTP-запросы."]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Публичный API прямо в браузере:"})," ",t.jsx("code",{children:"jsonplaceholder.typicode.com/posts/1"})," — откроет JSON-ответ"]}),t.jsx("li",{className:"theory-list-item",children:t.jsx("strong",{children:"curl в терминале:"})})]}),t.jsx(S,{lang:"bash",code:`curl https://jsonplaceholder.typicode.com/posts/1
# Ответ: { "userId": 1, "id": 1, "title": "...", "body": "..." }`})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Краткое резюме"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сеть"})," — устройства, обменивающиеся данными по протоколам"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"HTTP"})," — протокол веба: запрос → ответ; HTTPS добавляет шифрование"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"API"})," — контракт, по которому одна программа обращается к другой"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"REST"})," — стиль API: ресурсы, URL, единообразные методы, stateless"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"CRUD через HTTP:"})," GET / POST / PUT+PATCH / DELETE"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"JSON"})," — основной формат данных"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Статус-коды:"})," 2xx — успех, 4xx — ошибка клиента, 5xx — ошибка сервера"]})]})]})]})}function xy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 23"}),t.jsx("p",{className:"theory-subtitle",children:"Алгоритмы: сортировки и поиск"}),t.jsx("p",{className:"theory-date",children:"23 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Алгоритмы сортировки"}),t.jsx(M,{headers:["Алгоритм","Big O","Стабильный?","Когда использовать"],rows:[["Bubble Sort","O(n²)","Да","Только для обучения"],["Merge Sort","O(n log n)","Да","Нужна стабильность"],["Quick Sort","O(n log n)","Нет","Обычно быстрее"],["Heap Sort","O(n log n)","Нет","Гарантированно быстро"],["Insertion Sort","O(n²)","Да","Маленькие массивы"]]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Merge Sort"}),t.jsx(S,{code:`def merge_sort(arr):
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

    return result + left[i:] + right[j:]`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Quick Sort"}),t.jsx(S,{code:`def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[0]
    left = [x for x in arr[1:] if x < pivot]
    right = [x for x in arr[1:] if x >= pivot]

    return quick_sort(left) + [pivot] + quick_sort(right)`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Бинарный поиск"}),t.jsx(S,{code:`def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # Не найдено`,language:"python"}),t.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"⚠️ Работает только на отсортированном массиве!"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Алгоритм Кадане (Maximum Subarray)"}),t.jsx(S,{code:`def max_subarray(arr):
    max_ending_here = arr[0]
    max_so_far = arr[0]

    for i in range(1, len(arr)):
        max_ending_here = max(arr[i], max_ending_here + arr[i])
        max_so_far = max(max_so_far, max_ending_here)

    return max_so_far

# Пример: [−2,1,−3,4,−1,2,1,−5,4] → 6 (подмассив [4,−1,2,1])`,language:"python"})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Сортировка везде! Выучи хорошо! 📊"})})]})}function yy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 24"}),t.jsx("p",{className:"theory-subtitle",children:"Паттерны алгоритмических задач"}),t.jsx("p",{className:"theory-date",children:"24 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Sliding Window"}),t.jsx("p",{className:"theory-intro",children:"Использовать окно для работы с подмассивом"}),t.jsx(S,{code:`def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)

    return max_sum`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Two Pointers"}),t.jsx("p",{className:"theory-intro",children:"Два указателя с противоположных концов"}),t.jsx(S,{code:`def two_sum(arr, target):
    left, right = 0, len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return []`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Fast & Slow Pointers"}),t.jsx("p",{className:"theory-intro",children:"Обнаружение цикла в связном списке"}),t.jsx(S,{code:`def has_cycle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Рекурсия + Мемоизация"}),t.jsx(S,{code:`def fib(n, memo={}):
    if n in memo:
        return memo[n]

    if n <= 1:
        return n

    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как решать задачи на собеседовании"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Поймиляй задачу (спроси примеры)"}),t.jsx("li",{children:"Обсуди подход (не сразу пиши код)"}),t.jsx("li",{children:"Напиши решение (медленно и четко)"}),t.jsx("li",{children:"Тест на примерах"}),t.jsx("li",{children:"Обсуди Big O"}),t.jsx("li",{children:"Спроси можно ли оптимизировать"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Паттерны повторяются! Выучи и побеждай! 🎯"})})]})}function gy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 25"}),t.jsx("p",{className:"theory-subtitle",children:"Кибербезопасность для разработчика"}),t.jsx("p",{className:"theory-date",children:"25 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"OWASP Top 10"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"SQL-инъекции"}),t.jsx("li",{children:"Broken Authentication"}),t.jsx("li",{children:"Sensitive Data Exposure"}),t.jsx("li",{children:"XXE (XML External Entity)"}),t.jsx("li",{children:"Broken Access Control"}),t.jsx("li",{children:"Security Misconfiguration"}),t.jsx("li",{children:"XSS (Cross-Site Scripting)"}),t.jsx("li",{children:"Insecure Deserialization"}),t.jsx("li",{children:"Using Components with Known Vulnerabilities"}),t.jsx("li",{children:"Insufficient Logging & Monitoring"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"SQL-инъекции"}),t.jsx(S,{code:`# ❌ Плохо
username = request.form.get("username")
query = f"SELECT * FROM users WHERE name = '{username}'"

# Если user вводит: ' OR '1'='1
# Запрос: SELECT * FROM users WHERE name = '' OR '1'='1'
# Это вернёт всех пользователей!

# ✅ Хорошо
cursor.execute("SELECT * FROM users WHERE name = ?", (username,))`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"XSS (Cross-Site Scripting)"}),t.jsx(S,{code:`# ❌ Плохо (в JavaScript/React)
<div>{user_input}</div>

# ❌ Плохо (HTML)
<div>{{ user_input }}</div>

# ✅ Хорошо (React автоматом экранирует)
<div>{user_input}</div>  // React экранирует

# ✅ Хорошо (sanitize вручную)
import DOMPurify from 'dompurify'
<div>{DOMPurify.sanitize(user_input)}</div>`,language:"jsx"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Хеширование паролей"}),t.jsx(S,{code:`# ❌ Плохо
password_hash = hashlib.md5(password).hexdigest()

# ✅ Хорошо
import bcrypt
salt = bcrypt.gensalt()
password_hash = bcrypt.hashpw(password.encode(), salt)`,language:"python"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"HTTPS и TLS"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"ВСЕГДА используй HTTPS (не HTTP)"}),t.jsx("li",{className:"theory-list-item",children:"Шифрует данные между браузером и сервером"}),t.jsx("li",{className:"theory-list-item",children:"TLS 1.2+ обязателен"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Правила безопасности"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Валидируй весь пользовательский ввод"}),t.jsx("li",{className:"theory-list-item",children:"✅ Используй параметризованные запросы"}),t.jsx("li",{className:"theory-list-item",children:"✅ Экранируй output"}),t.jsx("li",{className:"theory-list-item",children:"✅ Не логируй пароли"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не храни секреты в коде"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не доверяй клиентским проверкам"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Security — ответственность разработчика! 🔒"})})]})}function jy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 26"}),t.jsx("p",{className:"theory-subtitle",children:"Soft skills: команда, фидбек, рост"}),t.jsx("p",{className:"theory-date",children:"26 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Работа в команде"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Коммуникация:"})," Ясно объясняй проблемы"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Слушание:"})," Слушай мнение других"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сотрудничество:"})," Помогай коллегам"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Ответственность:"})," Бери на себя задачи"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как давать фидбек (модель SBI)"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Situation:"})," Опиши ситуацию"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Behavior:"})," Что сделал человек"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Impact:"})," Какой был результат"]})]}),t.jsx(S,{code:`// ❌ Плохо
"Твой код плохой"

// ✅ Хорошо
"На код-ревью я заметил, что функция calcPrice()
не обрабатывает null значения. Это привело к ошибке
на продакшене. Давай добавим валидацию в начале функции."`,language:"text"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как просить о помощи"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Rubber duck debugging: объясни проблему игрушечной утке"}),t.jsx("li",{className:"theory-list-item",children:"✅ Google → StackOverflow → коллеги → менеджер"}),t.jsx("li",{className:"theory-list-item",children:"✅ Показывай что уже пробовал"}),t.jsx("li",{className:"theory-list-item",children:"❌ Сразу не звони с вопросом"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Синдром самозванца"}),t.jsx("p",{className:"theory-intro",children:"Чувство что ты не достоин, что все лучше, что вот-вот все поймут что ты фрод."}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Это нормально — даже опытные разработчики это чувствуют"}),t.jsx("li",{className:"theory-list-item",children:"✅ Пиши код, получай фидбек, улучшайся"}),t.jsx("li",{className:"theory-list-item",children:"✅ Помни о достижениях, а не только о ошибках"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Профессиональный рост"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"Читай чужой код — лучше всего учиться"}),t.jsx("li",{className:"theory-list-item",children:"Делись знаниями (статьи, переговоры, mentoring)"}),t.jsx("li",{className:"theory-list-item",children:"Проси фидбек и совета"}),t.jsx("li",{className:"theory-list-item",children:"Учись на ошибках (своих и чужих)"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Soft skills важны как hard skills! 🤝"})})]})}function Ny(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 27"}),t.jsx("p",{className:"theory-subtitle",children:"Как учиться программированию"}),t.jsx("p",{className:"theory-date",children:"27 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Активное vs Пассивное обучение"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"❌ Пассивное: Читать блоги, смотреть видео"}),t.jsx("li",{className:"theory-list-item",children:"✅ Активное: Писать код, делать проекты, объяснять"})]}),t.jsx("p",{className:"theory-intro",style:{marginTop:"12px"},children:"Статистика: помнишь 10% прочитанного, 50% услышанного, 90% сделанного!"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Метод Фейнмана"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Выбери концепцию"}),t.jsx("li",{children:"Объясни её простыми словами (как ребёнку)"}),t.jsx("li",{children:"Определи пробелы в понимании"}),t.jsx("li",{children:"Упрости и переделай объяснение"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Ресурсы для обучения"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Обучение:"})," CS50, Roadmap.sh, Udemy"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Практика:"})," LeetCode, Codeforces, HackerRank"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Проекты:"})," GitHub, собственные идеи"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Сообщество:"})," Reddit r/learnprogramming, Discord"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как учиться эффективно"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Уделяй 1-2 часа ежедневно, а не 8 часов в выходной"}),t.jsx("li",{className:"theory-list-item",children:"✅ Проектное обучение: делай реальные проекты"}),t.jsx("li",{className:"theory-list-item",children:"✅ Читай чужой код (GitHub, документация)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Объясняй другим (лучший способ учиться)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не зубри синтаксис (Google это за тебя)"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не начинай со сложного"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Публичное портфолио"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"GitHub:"})," README, примеры кода, проекты"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"LinkedIn:"})," Опыт, навыки, рекомендации"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Личный сайт:"})," Portfolio с примерами работ"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Блог:"})," Статьи о том что учишь"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как ставить цели (OKR)"}),t.jsxs(F,{title:"Пример OKR",children:[t.jsxs("p",{children:[t.jsx("strong",{children:"Objective:"})," Научиться веб-разработке"]}),t.jsx("p",{children:t.jsx("strong",{children:"Key Results:"})}),t.jsxs("ul",{style:{marginTop:"8px"},children:[t.jsx("li",{children:"1. Завершить 5 проектов на React"}),t.jsx("li",{children:"2. Сделать 30 задач на LeetCode (medium)"}),t.jsx("li",{children:"3. Прочитать 2 книги по вебу"})]})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Обучение — это путь, не пункт назначения! 📚"})})]})}function vy(){return t.jsxs("div",{className:"theory-container",children:[t.jsxs("section",{className:"theory-section",children:[t.jsx("h1",{className:"theory-title",children:"День 29"}),t.jsx("p",{className:"theory-subtitle",children:"Резюме IT-джуна: пишем первую версию"}),t.jsx("p",{className:"theory-date",children:"29 июня 2026"})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Структура резюме"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Контакты:"})," Имя, email, телефон, GitHub, LinkedIn"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Профессиональное резюме (summary):"})," 2-3 предложения кто ты"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Навыки:"})," Язык программирования, фреймворки, инструменты"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Опыт:"})," Стажировки, проекты, волонтёрство"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Образование:"})," Курсы, сертификаты, лагеря"]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Проекты:"})," GitHub ссылки на твои лучшие работы"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Советы для джуна"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Будь честен (не приукрашивай опыт)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Покажи что ты можешь (GitHub, проекты)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Сфокусируйся на качестве (5 хороших проектов > 20 так себе)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Напиши о том что ты выучил"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не претендуй на senior роль"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не списывай чужое резюме"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Как описывать проекты"}),t.jsx(F,{title:"❌ Плохо",children:t.jsx("p",{children:"«Написал сайт на React»"})}),t.jsx(F,{title:"✅ Хорошо",children:t.jsx("p",{children:"«Разработал образовательную платформу на React + Node.js для управления расписанием лагеря. Реализовал аутентификацию через JWT, интеграцию с API для расписания, динамическое кэширование данных. Развернул на VPS с Nginx. GitHub: [ссылка]»"})})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"GitHub как портфолио"}),t.jsxs("ul",{className:"theory-list",children:[t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"README для каждого проекта:"})," Что это, как запустить, примеры"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Хороший коммит история:"})," Осмысленные сообщения"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Чистый код:"})," Без мусора, хорошо организован"]}),t.jsxs("li",{className:"theory-list-item",children:[t.jsx("strong",{children:"Стабильные проекты:"})," Которые хорошо работают"]})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Сопроводительное письмо"}),t.jsx("p",{className:"theory-intro",children:"Не обязательно для джуна, но помогает!"}),t.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[t.jsx("li",{children:"Привет, я изучаю [технология]"}),t.jsx("li",{children:"Сделал [проект], это показывает [скиллы]"}),t.jsx("li",{children:"Интересуюсь вашей компанией потому что [причина]"}),t.jsx("li",{children:"Хотел бы присоединиться к команде и учиться!"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Поиск первой работы"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"🔍 LinkedIn Jobs, Indeed, HeadHunter"}),t.jsx("li",{className:"theory-list-item",children:"🔍 Job boards: dev.by (Беларусь), habr.career (Россия)"}),t.jsx("li",{className:"theory-list-item",children:"🔍 Компании напрямую (их сайты)"}),t.jsx("li",{className:"theory-list-item",children:"🤝 Сетвуринг: встречайся с разработчиками"}),t.jsx("li",{className:"theory-list-item",children:"💌 Отправляй резюме в компании которые тебе нравятся"})]})]}),t.jsxs("section",{className:"theory-section",children:[t.jsx("h2",{className:"theory-heading-2",children:"Во время интервью"}),t.jsxs("ul",{className:"theory-list",children:[t.jsx("li",{className:"theory-list-item",children:"✅ Приходи вовремя (за 5 минут)"}),t.jsx("li",{className:"theory-list-item",children:"✅ Задавай вопросы о команде и проектах"}),t.jsx("li",{className:"theory-list-item",children:"✅ Будь честен что не знаешь"}),t.jsx("li",{className:"theory-list-item",children:"✅ Покажи как думаешь при решении задач"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не будь самоуверен"}),t.jsx("li",{className:"theory-list-item",children:"❌ Не говори что тебе всё равно"})]})]}),t.jsx("section",{className:"theory-section theory-section--closing",children:t.jsx("p",{className:"theory-closing-text",children:"Первая работа — начало карьеры! Верь в себя! 💪"})})]})}const Ey={1:"",2:"",3:"",4:"https://s3.regru.cloud/kirocamp/day4.mp4",5:"",6:"",7:"https://s3.regru.cloud/kirocamp/day7.mp4",8:"",9:"",10:"",11:"",12:"",13:"",14:"",15:"",16:"",17:"",18:"",19:"",20:"",21:"",22:"",23:"",24:"",25:"",26:"",27:"",28:"",29:"",30:""},hc={1:Jx,2:Kx,3:Xx,4:Zx,5:ey,6:ty,7:ry,8:ny,9:sy,10:iy,11:ly,12:ay,13:oy,15:cy,16:dy,17:uy,18:hy,19:py,20:fy,23:xy,24:yy,25:gy,26:jy,27:Ny,29:vy};function Sy(e){const r=mr.find(n=>n.day===e);return r?r.title:`День ${e}`}function Ty({selectedDay:e,onBack:r}){const[n,s]=x.useState(null),[i,l]=x.useState(!0);return x.useEffect(()=>{const a=setTimeout(()=>{hc[e]&&s(()=>hc[e]),l(!1)},300);return()=>clearTimeout(a)},[e]),i?t.jsx("section",{className:"page active",children:t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-secondary)"},children:"Загрузка..."})})}):n?t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"theory-breadcrumbs",children:[t.jsx("button",{className:"breadcrumb-link",onClick:r,children:"📚 Библиотека знаний"}),t.jsx("span",{className:"breadcrumb-sep",children:"/"}),t.jsxs("span",{className:"breadcrumb-current",children:["День ",e," · ",Sy(e)]})]}),t.jsx(n,{videoUrl:Ey[e]||null}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:r,children:"Вернуться в Библиотеку знаний"})})]}):t.jsxs("section",{className:"page active",children:[t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Материалы для этого дня еще готовятся..."})}),t.jsx("button",{className:"btn-back",onClick:r,children:"← Вернуться в Библиотеку"})]})}function wy(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:'Что выведет: print(int("42"))?',options:["42",'"42"',"Ошибка","None"],answer:"42",hint:"int() преобразует строку в целое число"},{id:2,type:"choice",difficulty:"easy",text:"Что выведет: print(7 / 2)?",options:["3","3.5","3.0","2"],answer:"3.5",hint:"Оператор / всегда возвращает float"},{id:3,type:"choice",difficulty:"easy",text:"Что выведет: print(7 // 2)?",options:["3.5","3","4","Ошибка"],answer:"3",hint:"// — целочисленное деление (floor division)"},{id:4,type:"choice",difficulty:"easy",text:"Что выведет: print(7 % 3)?",options:["2","1","4","0"],answer:"1",hint:"% возвращает остаток от деления: 7 = 3*2 + 1"},{id:5,type:"choice",difficulty:"medium",text:"Какой приоритет операций верный? (от высшего к низшему)",options:["1) +, -   2) *, /   3) **","1) **   2) *, /, //, %   3) +, -","1) *   2) +   3) **","1) **   2) +   3) *"],answer:"1) **   2) *, /, //, %   3) +, -",hint:"Возведение в степень выполняется первым"},{id:6,type:"choice",difficulty:"easy",text:'Какие из этих значений считаются "ложными"?',options:["Только False",'0, "", None, [], False',"Только 0","True и 1"],answer:'0, "", None, [], False',hint:"Ложные значения: False, 0, пустая строка, None, пустые коллекции"},{id:7,type:"choice",difficulty:"easy",text:"Чем отличается is от ==?",options:["Нет разницы","== сравнивает значения, is сравнивает идентичность объектов","is быстрее чем ==","is работает только с числами"],answer:"== сравнивает значения, is сравнивает идентичность объектов",hint:"Для None правильно писать: x is None, а не x == None"},{id:8,type:"choice",difficulty:"medium",text:"Что выведет: print(True + True + False)?",options:["TrueTrueFalse","2","1","Ошибка"],answer:"2",hint:"True это 1, False это 0. Значит 1 + 1 + 0 = 2"},{id:9,type:"choice",difficulty:"easy",text:"Какой тип возвращает: print(type(1/1))?",options:["int","float","str","bool"],answer:"float",hint:"Оператор / ВСЕГДА возвращает float, даже 4/2 вернет 2.0"},{id:10,type:"choice",difficulty:"medium",text:"Что выведет: print(-7 // 2)?",options:["-3","-4","-3.5","Ошибка"],answer:"-4",hint:"Floor division округляет вниз: -3.5 округляется в -4"},{id:11,type:"choice",difficulty:"medium",text:"Как правильно сравнить переменную с None?",options:["x == None","x is None","Оба варианта одинаковы","None == x"],answer:"x is None",hint:"is проверяет идентичность объекта. Правильный способ: x is None"},{id:12,type:"choice",difficulty:"medium",text:"Как найти последнюю цифру числа 12345?",options:["12345 / 10","12345 // 10","12345 % 10","12345 - 10"],answer:"12345 % 10",hint:"Остаток от деления на 10 дает последнюю цифру"}]}}function ky(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Что выведет: for i in range(3): print(i)?",options:["0 1 2","1 2 3","0 1 2 3","Ошибка"],answer:"0 1 2",hint:"range(3) генерирует числа от 0 до 2 включительно"},{id:2,type:"choice",difficulty:"easy",text:"Какой результат даст while цикл при number = 0, while number < 3?",options:["Бесконечный цикл","Выполнится 3 раза","Не выполнится вообще","Ошибка"],answer:"Выполнится 3 раза",hint:"while проверяет условие. При number=0,1,2 условие истинно, при 3 - ложно"},{id:3,type:"choice",difficulty:"easy",text:"Что выведет? for i in range(10): if i == 5: break; print(i)",options:["0 1 2 3 4","0 1 2 3 4 5","0 1 2 3 4 5 6 7 8 9","Только 5"],answer:"0 1 2 3 4",hint:"break прерывает цикл. При i==5 цикл сразу прерывается"},{id:4,type:"choice",difficulty:"easy",text:"Что выведет? for i in range(5): if i == 2: continue; print(i)",options:["0 1 2 3 4","0 1 3 4","1 3 4","0 1 3 5"],answer:"0 1 3 4",hint:"continue пропускает текущую итерацию, переходит к следующей"},{id:5,type:"choice",difficulty:"easy",text:"Какой синтаксис правильный для определения функции в Python?",options:["def add(a, b) { return a + b }","def add(a, b): return a + b","function add(a, b) { return a + b }","def add(a, b) -> a + b"],answer:"def add(a, b): return a + b",hint:"В Python: def имя(параметры): тело функции"},{id:6,type:"choice",difficulty:"medium",text:`Что выведет? def greet(name, greeting="Привет"): return f"{greeting}, {name}!"
print(greet("Мария"))`,options:["Привет, Мария!","Привет, Привет!","Ошибка","greeting, Мария!"],answer:"Привет, Мария!",hint:"Параметры по умолчанию используются если аргумент не передан"},{id:7,type:"choice",difficulty:"easy",text:"Что выведет? numbers = [1, 2, 3]; print(numbers[-1])",options:["1","-1","3","Ошибка"],answer:"3",hint:"[-1] обращается к последнему элементу списка"},{id:8,type:"choice",difficulty:"medium",text:"Какой метод удаляет последний элемент из списка?",options:["remove()","pop()","delete()","clear()"],answer:"pop()",hint:"pop() удаляет и возвращает последний элемент"},{id:9,type:"choice",difficulty:"medium",text:"Что выведет? squares = [n ** 2 for n in [1, 2, 3]]; print(squares)",options:["[1, 4, 9]","[1, 2, 3]","[2, 4, 6]","Ошибка"],answer:"[1, 4, 9]",hint:"List comprehension: [выражение for элемент in список]"},{id:10,type:"choice",difficulty:"medium",text:"Что выведет? even = [n for n in [1, 2, 3, 4, 5] if n % 2 == 0]; print(even)",options:["[1, 3, 5]","[2, 4]","[1, 2, 3, 4, 5]","[]"],answer:"[2, 4]",hint:"[выражение for элемент in список if условие] - фильтрует элементы"}]}}function by(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Сколько операций выполняет O(1) алгоритм на n = 1 000 000?",options:["1 операция","1 млн операций","n операций","log(n) операций"],answer:"1 операция",hint:"O(1) - константная сложность, не зависит от размера входных данных"},{id:2,type:"choice",difficulty:"easy",text:"Какая сложность алгоритма если он делит задачу пополам на каждом шаге?",options:["O(n)","O(n²)","O(log n)","O(2^n)"],answer:"O(log n)",hint:"Бинарный поиск: n → n/2 → n/4 → 1. Глубина = log(n)"},{id:3,type:"choice",difficulty:"easy",text:"Сколько операций в одном цикле: for i in range(n): print(i)?",options:["O(1)","O(n)","O(n²)","O(log n)"],answer:"O(n)",hint:"Один цикл = n итераций = O(n)"},{id:4,type:"choice",difficulty:"easy",text:"Какая сложность двух вложенных циклов: for i in range(n): for j in range(n):?",options:["O(n)","O(2n)","O(n²)","O(n log n)"],answer:"O(n²)",hint:"Два вложенных цикла перемножаются: O(n) * O(n) = O(n²)"},{id:5,type:"choice",difficulty:"medium",text:"Упростите Big O: O(2n)",options:["O(2n)","O(n²)","O(n)","O(log n)"],answer:"O(n)",hint:"Отбрасываем константы: O(2n) = O(n)"},{id:6,type:"choice",difficulty:"medium",text:"Упростите Big O: O(n² + n)",options:["O(n)","O(n²)","O(n³)","O(n + n²)"],answer:"O(n²)",hint:"Оставляем доминирующий член: O(n²) > O(n)"},{id:7,type:"choice",difficulty:"medium",text:"На n = 1 000 000 - Сколько O(n) и O(n²) дают операций:",options:["оба - 1 млн","1 млн и 1 млн","1 млн и 1 триллион","1 млн и 1 млрд"],answer:"1 млн и 1 триллион",hint:"O(n) = 1 млн опер (миллисекунды). O(n²) = 1 трлн опер (часы!)"},{id:8,type:"choice",difficulty:"medium",text:"Какой алгоритм быстрее для поиска в отсортированном массиве?",options:["Линейный поиск O(n)","Бинарный поиск O(log n)","Оба одинаковые","Зависит от размера"],answer:"Бинарный поиск O(log n)",hint:"На n=1млн: линейный ~1млн опер, бинарный ~20 опер. Разница 50000х!"},{id:9,type:"choice",difficulty:"medium",text:"Определите сложность: for i in range(n): for j in range(i): print(i,j)",options:["O(n)","O(n²)","O(n³)","O(log n)"],answer:"O(n²)",hint:"n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)"},{id:10,type:"choice",difficulty:"hard",text:"Какая сложность у рекурсивного Фибоначчи: fib(n) = fib(n-1) + fib(n-2)?",options:["O(n)","O(n log n)","O(2^n)","O(log n)"],answer:"O(2^n)",hint:"Каждый вызов даёт 2 новых вызова. Дерево вызовов = 2^n"},{id:11,type:"choice",difficulty:"hard",text:"Какая сложность у Фибоначчи с мемоизацией (кэшированием)?",options:["O(n)","O(2^n)","O(n²)","O(n!)"],answer:"O(n)",hint:"С мемоизацией каждое число вычисляется один раз = O(n)"},{id:12,type:"choice",difficulty:"hard",text:"Какая операция имеет O(1) сложность?",options:["Поиск в неотсортированном массиве","Доступ к элементу по индексу arr[5]","Сортировка массива","Обход всех элементов"],answer:"Доступ к элементу по индексу arr[5]",hint:"Доступ по индексу, присваивание, поиск в словаре - все O(1)"}]}}function Ly(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Что означает операция A ∧ B (AND)?",options:["Истина если хотя бы одна переменная истина","Истина если обе переменные истины","Инверсия значения переменной","Истина если значения разные"],answer:"Истина если обе переменные истины",hint:"AND (И) требует чтобы ОБЕ переменные были истинны"},{id:2,type:"choice",difficulty:"easy",text:"Что означает операция A ∨ B (OR)?",options:["Истина если обе переменные истины","Истина если хотя бы одна переменная истина","Инверсия значения переменной","Истина если значения разные"],answer:"Истина если хотя бы одна переменная истина",hint:"OR (ИЛИ) требует чтобы ХОТЯ БЫ одна переменная была истинна"},{id:3,type:"choice",difficulty:"easy",text:"Что означает операция ¬A (NOT)?",options:["Истина если обе переменные истины","Истина если хотя бы одна истина","Инверсия (противоположное значение) переменной","Истина если значения разные"],answer:"Инверсия (противоположное значение) переменной",hint:"NOT (НЕ) просто меняет значение: 0→1, 1→0"},{id:4,type:"choice",difficulty:"medium",text:"Первый закон де Моргана: ¬(A ∧ B) =?",options:["A ∨ B","¬A ∨ ¬B","¬A ∧ ¬B","A ∧ B"],answer:"¬A ∨ ¬B",hint:"Отрицание конъюнкции равно дизъюнкции отрицаний"},{id:5,type:"choice",difficulty:"medium",text:"Второй закон де Моргана: ¬(A ∨ B) =?",options:["A ∧ B","¬A ∨ ¬B","¬A ∧ ¬B","A ∨ B"],answer:"¬A ∧ ¬B",hint:"Отрицание дизъюнкции равно конъюнкции отрицаний"},{id:6,type:"choice",difficulty:"easy",text:"Закон исключенного третьего: A ∨ ¬A =?",options:["0 (ложь)","1 (истина)","A","¬A"],answer:"1 (истина)",hint:"Переменная либо истинна, либо ложна - одно из двух всегда верно"},{id:7,type:"choice",difficulty:"easy",text:"Закон противоречия: A ∧ ¬A =?",options:["1 (истина)","0 (ложь)","A","¬A"],answer:"0 (ложь)",hint:"Невозможно чтобы переменная была одновременно истинной И ложной"},{id:8,type:"choice",difficulty:"medium",text:"Таблица истинности для A ∧ B имеет сколько строк истины из 4?",options:["1 строка","2 строки","3 строки","4 строки"],answer:"1 строка",hint:"AND истинен только когда обе переменные истины (1,1) - один случай"},{id:9,type:"choice",difficulty:"medium",text:"Что такое объединение множеств A ∪ B?",options:["Элементы которые есть только в A","Элементы которые есть в обоих множествах","Все элементы которые принадлежат либо A, либо B, либо обоим","Элементы которые есть только в B"],answer:"Все элементы которые принадлежат либо A, либо B, либо обоим",hint:'Объединение "собирает" все элементы из обоих множеств'},{id:10,type:"choice",difficulty:"medium",text:"Что такое пересечение множеств A ∩ B?",options:["Все элементы из обоих множеств","Элементы которые принадлежат одновременно и A, и B","Элементы которые есть только в A","Элементы которые есть только в B"],answer:"Элементы которые принадлежат одновременно и A, и B",hint:'Пересечение находит "общие" элементы двух множеств'},{id:11,type:"choice",difficulty:"medium",text:"A = {1, 2, 3}, B = {3, 4, 5}. Что такое A - B (разность)?",options:["{3, 4, 5}","{1, 2, 3, 4, 5}","{1, 2}","{3}"],answer:"{1, 2}",hint:"Разность A  B - это элементы A которые НЕ принадлежат B"},{id:12,type:"choice",difficulty:"hard",text:"Битовые операции: 5 (0101) & 3 (0011) =?",options:["0001 = 1","0101 = 5","0111 = 7","1111 = 15"],answer:"0001 = 1",hint:"& (AND) - битовое И. Единица только где обе позиции = 1"}]}}function Cy(){return{tasks:[{id:1,type:"choice",difficulty:"easy",text:"Что такое граф?",options:["Совокупность вершин и рёбер, где рёбра соединяют пары вершин","Последовательность чисел от 1 до n","Матрица целых чисел","Список чисел в порядке возрастания"],answer:"Совокупность вершин и рёбер, где рёбра соединяют пары вершин",hint:"Граф состоит из вершин (узлов) и рёбер (связей между ними)"},{id:2,type:"choice",difficulty:"easy",text:"Что такое полный граф?",options:["Граф где каждая вершина связана с каждой другой вершиной","Граф где нет циклов","Граф где все вершины на одной линии","Граф с одной вершиной"],answer:"Граф где каждая вершина связана с каждой другой вершиной",hint:"Полный граф обозначается K_n, где n - количество вершин"},{id:3,type:"choice",difficulty:"easy",text:"Что такое ориентированный граф?",options:["Граф где рёбра имеют направление (стрелки)","Граф где рёбра не имеют направления","Граф где все вершины связаны в кольцо","Граф без циклов"],answer:"Граф где рёбра имеют направление (стрелки)",hint:"В ориентированном графе есть направление: A→B ≠ B→A"},{id:4,type:"choice",difficulty:"easy",text:"Что такое неориентированный граф?",options:["Граф где рёбра имеют направление","Граф где рёбра НЕ имеют направления (двусторонние)","Граф только с одной вершиной","Граф с самопетлями"],answer:"Граф где рёбра НЕ имеют направления (двусторонние)",hint:"В неориентированном графе A-B = B-A (одно и то же ребро)"},{id:5,type:"choice",difficulty:"medium",text:"Что такое словарь смежности (adjacency list)?",options:["Словарь где ключ - вершина, значение - список соседних вершин","Список всех вершин графа","Матрица расстояний между вершинами","Список рёбер в порядке возрастания"],answer:"Словарь где ключ - вершина, значение - список соседних вершин",hint:"Пример: {A: [B, C], B: [A, D]} - это словарь смежности"},{id:6,type:"choice",difficulty:"medium",text:"В неориентированном графе матрица смежности должна быть:",options:["Симметричной относительно диагонали (A[i][j] = A[j][i])","Диагональной (ненулевые только на диагонали)","Треугольной (нули над/под диагональю)","Единичной (единицы на диагонали)"],answer:"Симметричной относительно диагонали (A[i][j] = A[j][i])",hint:"Симметрия нужна потому что A-B = B-A в неориентированном графе"},{id:7,type:"input",difficulty:"medium",text:"DFS (в глубину) обход графа: граф = {A: [B, C], B: [D], C: [D], D: []}. Начните с A. Записать последовательность посещения вершин (обходить соседей слева направо)",answer:"ABDC",hint:"DFS: идём вглубь. A→B (первый сосед)→D→(нет соседей, назад)→(B посещён)→C→D (уже посещена). Результат: A,B,D,C"},{id:8,type:"input",difficulty:"medium",text:"DFS обход: граф = {A: [B, C], B: [A, D], C: [A], D: [B]}. Начните с A. Последовательность (слева направо)",answer:"ABDC",hint:"DFS идёт в глубину: A→B→D→(нет новых)→назад→C"},{id:9,type:"input",difficulty:"medium",text:"BFS (в ширину) обход графа: граф = {A: [B, C], B: [D], C: [D], D: []}. Начните с A. Последовательность (обходить слева направо)",answer:"ABCD",hint:"BFS: идём в ширину. Уровень 1: A. Уровень 2: B, C. Уровень 3: D. Результат: A,B,C,D"},{id:10,type:"input",difficulty:"medium",text:"BFS обход: граф = {A: [B, C], B: [A, D], C: [A], D: [B]}. Начните с A. Последовательность",answer:"ABCD",hint:"BFS слой за слоем: A (слой 0)→B,C (слой 1)→D (слой 2)"},{id:11,type:"choice",difficulty:"hard",text:"Есть ли цикл в графе? граф = {A: [B, C], B: [D], C: [D], D: []}",options:["Да, есть цикл A→B→D→A","Да, есть цикл B→D→C→B","Нет цикла","Есть самопетля"],answer:"Нет цикла",hint:"Цикл - это путь который возвращается в исходную вершину. В этом графе нет такого пути"},{id:12,type:"choice",difficulty:"hard",text:"Есть ли цикл в графе? граф = {A: [B], B: [C], C: [A], D: [B]}",options:["Нет цикла","Да, цикл: A→B→C→A","Да, цикл: D→B→C","Нет рёбер"],answer:"Да, цикл: A→B→C→A",hint:"Следите за путем: A→B→C→A - это вернулось в исходную вершину!"}]}}function Ry(){return{tasks:[{text:"Какой индекс первого элемента в массиве?",type:"input",answer:"0",hint:"Индексация начинается с нуля",difficulty:"Легко"},{text:"Как получить элемент массива arr по индексу 2?",type:"choice",answer:"arr[2]",options:["arr[2]","arr.get(2)","arr(2)","arr-2"],hint:"Используй квадратные скобки",difficulty:"Легко"},{text:"Какая сложность доступа к элементу в массиве?",type:"choice",answer:"O(1)",options:["O(1)","O(n)","O(log n)","O(n^2)"],hint:"Прямой доступ по индексу это константа",difficulty:"Средне"},{text:"Какая сложность поиска в отсортированном массиве?",type:"choice",answer:"O(log n)",options:["O(log n)","O(n)","O(1)","O(n^2)"],hint:"Можно использовать бинарный поиск",difficulty:"Средне"},{text:"Какая сложность вставки элемента в начало массива?",type:"choice",answer:"O(n)",options:["O(n)","O(1)","O(log n)","O(n log n)"],hint:"Нужно сдвинуть все элементы",difficulty:"Средне"},{text:"Что такое связный список?",type:"choice",answer:"цепочка",options:["цепочка","дерево","граф","таблица"],hint:"Структура где каждый элемент указывает на следующий",difficulty:"Средне"},{text:"Как растет динамический массив при добавлении элемента?",type:"choice",answer:"выделяется новая память и копируются все элементы",options:["выделяется новая память и копируются все элементы","старая память расширяется","новый элемент добавляется в конец без изменений","ничего не происходит"],hint:"Когда массив переполнен, создаётся новый с большим размером",difficulty:"Средне"},{text:"Что такое односвязный список?",type:"choice",answer:"каждый узел имеет указатель только на следующий",options:["каждый узел имеет указатель только на следующий","каждый узел имеет указатели на предыдущий и следующий","это массив","это дерево"],hint:"Односвязный = one direction (одно направление)",difficulty:"Легко"},{text:"Что такое двусвязный список?",type:"choice",answer:"каждый узел имеет указатели на предыдущий и следующий",options:["каждый узел имеет указатель только на следующий","каждый узел имеет указатели на предыдущий и следующий","это граф","это стек"],hint:"Двусвязный = two directions (два направления)",difficulty:"Легко"},{text:"Односвязный список: [1] -> [2] -> [3]. Если current указывает на узел 1, что такое current.next.next?",type:"choice",answer:"узел с значением 3",options:["узел с значением 3","узел с значением 2","null","ошибка"],hint:"current.next это второй узел (2), current.next.next это третий узел (3)",difficulty:"Средне"},{text:"Какая сложность доступа к элементу по индексу? Массив vs Связный список",type:"choice",answer:"Массив O(1), Связный список O(n)",options:["Массив O(1), Связный список O(n)","Массив O(n), Связный список O(1)","Оба O(1)","Оба O(n)"],hint:"Массив знает адрес каждого элемента. Список нужно обходить от начала",difficulty:"Средне"},{text:"Двусвязный список: [1] ↔ [2] ↔ [3]. Если current указывает на узел 2, что такое current.prev?",type:"choice",answer:"узел с значением 1",options:["узел с значением 1","узел с значением 3","null","ошибка"],hint:"current.prev это указатель на предыдущий узел в двусвязном списке",difficulty:"Средне"}]}}function Oy(){return{tasks:[{text:"Что такое LIFO?",type:"choice",answer:"Last In First Out - последний вошедший первый вышедший",options:["Linear Input First Output","Last In First Out - последний вошедший первый вышедший","Load In First Out","List In File Output"],hint:"LIFO это принцип работы стека",difficulty:"Легко"},{text:"Что такое FIFO?",type:"choice",answer:"First In First Out - первый вошедший первый вышедший",options:["Field Information First Output","Final Input First Output","First In First Out - первый вошедший первый вышедший","File In First Out"],hint:"FIFO это принцип работы очереди",difficulty:"Легко"},{text:"Операция push в стеке это...",type:"choice",answer:"добавление элемента на вершину",options:["просмотр верхнего элемента","очистка стека","добавление элемента на вершину","удаление элемента с вершины"],hint:"push добавляет (вталкивает) элемент",difficulty:"Легко"},{text:"Операция pop в стеке это...",type:"choice",answer:"удаление и возврат элемента с вершины",options:["переворот стека","просмотр без удаления","удаление и возврат элемента с вершины","добавление элемента"],hint:"pop извлекает элемент с вершины",difficulty:"Легко"},{text:"Очередь операции: enqueue это добавление, dequeue это удаление. Какая сложность?",type:"choice",answer:"Оба O(1)",options:["enqueue O(n), dequeue O(1)","Оба O(n)","enqueue O(1), dequeue O(n)","Оба O(1)"],hint:"В очереди добавление в конец и удаление из начала обе O(1)",difficulty:"Средне"},{text:'История браузера - вы посещаете сайты 1 → 2 → 3, затем нажимаете "назад" дважды. Какая структура данных это?',type:"choice",answer:"стек (LIFO)",options:["граф","массив","очередь (FIFO)","стек (LIFO)"],hint:'Последний посещённый сайт первым в истории "назад"',difficulty:"Средне"},{text:"Список запросов к серверу от разных пользователей обрабатывается в порядке поступления. Какая структура это?",type:"choice",answer:"очередь (FIFO)",options:["приоритетный массив","дерево","очередь (FIFO)","стек (LIFO)"],hint:"Первый запрос первым обрабатывается - очередь",difficulty:"Средне"},{text:"Операция Undo/Redo при редактировании текста - какая структура?",type:"choice",answer:"стек для Undo, стек для Redo",options:["связный список","очередь для обеих","массив","стек для Undo, стек для Redo"],hint:"Отмена действий в обратном порядке - это LIFO",difficulty:"Средне"},{text:"Какая сложность push и pop операций в стеке?",type:"choice",answer:"Обе O(1)",options:["push O(log n), pop O(n)","Обе O(n)","Обе O(1)","push O(1), pop O(n)"],hint:"Добавление и удаление с вершины - константные операции",difficulty:"Средне"},{text:"Очередь печати (принтер): документы ждут печати в порядке отправки. Какая это очередь?",type:"choice",answer:"FIFO - первый отправленный печатается первым",options:["По размеру файла","Случайный порядок","LIFO - последний отправленный печатается первым","FIFO - первый отправленный печатается первым"],hint:"Справедливо: кто первый в очереди, тот первый печатается",difficulty:"Средне"}]}}function _y(){return{tasks:[{text:"Какая средняя сложность поиска элемента в хеш-таблице?",type:"choice",answer:"O(1)",options:["O(n)","O(log n)","O(1)","O(n^2)"],hint:"Прямой доступ по ключу это константа при отсутствии коллизий",difficulty:"Легко"},{text:"Как может находиться индекс элемента при добавлении в хеш-таблицу?",type:"choice",answer:"применяется хеш-функция к ключу и берется остаток от деления на размер таблицы",options:["просто берется первый свободный индекс","применяется хеш-функция к ключу и берется остаток от деления на размер таблицы","индекс совпадает с самим ключом","индекс выбирается случайно"],hint:"index = hash(key) % table_size",difficulty:"Средне"},{text:"Что происходит когда две разные ключи дают один и тот же хеш?",type:"choice",answer:"коллизия хеширования",options:["программа выдает ошибку","второе значение перезаписывает первое","коллизия хеширования","хеш-таблица игнорирует второе значение"],hint:"Hash collision - это нормальная ситуация которую нужно разрешать",difficulty:"Средне"},{text:"Что такое Chaining (цепочка) для разрешения коллизий?",type:"choice",answer:"каждая ячейка таблицы хранит список всех элементов с одинаковым хешем",options:["поиск следующей свободной ячейки для размещения элемента","каждая ячейка таблицы хранит список всех элементов с одинаковым хешем","удаление предыдущего значения и добавление нового","двойное хеширование для поиска другого индекса"],hint:"Separate chaining - метод цепочек",difficulty:"Средне"},{text:"Что такое Double Hashing (двойное хеширование)?",type:"choice",answer:"при коллизии используется вторая хеш-функция для поиска другой позиции",options:["хеширование ключа два раза подряд","при коллизии используется вторая хеш-функция для поиска другой позиции","использование двух разных хеш-таблиц","хеширование и ключа и значения"],hint:"Open addressing метод - проверяем hash1, hash1+hash2, hash1+2*hash2...",difficulty:"Средне"},{text:"В Python dict - это хеш-таблица?",type:"choice",answer:"да, dict в Python реализован как хеш-таблица",options:["нет, это связный список","зависит от версии Python","да, dict в Python реализован как хеш-таблица","нет, это дерево"],hint:"dict в Python использует хеширование для быстрого доступа",difficulty:"Легко"},{text:"Какая сложность удаления элемента из хеш-таблицы в среднем случае?",type:"choice",answer:"O(1)",options:["O(log n)","O(n)","O(1)","O(n log n)"],hint:"Удаление так же быстро как поиск - нужен хеш ключа",difficulty:"Средне"},{text:"Что произойдет если в хеш-таблице слишком много коллизий?",type:"choice",answer:"сложность операций станет близка к O(n)",options:["все операции сразу станут O(1)","таблица автоматически удалится","сложность операций станет близка к O(n)","коллизии исчезнут сами собой"],hint:"В худшем случае все элементы в одной цепочке - O(n)",difficulty:"Средне"},{text:"Когда нужно увеличить размер хеш-таблицы (rehashing)?",type:"choice",answer:"когда коэффициент загрузки (количество элементов / размер таблицы) превысит порог (обычно 0.75)",options:["когда таблица совсем пустая","когда коэффициент загрузки (количество элементов / размер таблицы) превысит порог (обычно 0.75)","только когда она полностью заполнена","никогда"],hint:"Load factor = size / capacity. При >0.75 обычно увеличиваем размер",difficulty:"Средне"},{text:"В Python как получить значение по ключу из словаря dict и вернуть None если ключа нет?",type:"choice",answer:'dict.get("key")',options:['dict["key"] или None','dict.find("key")','dict.get("key")','dict.search("key")'],hint:"get() метод не выдает KeyError если ключа нет, возвращает None",difficulty:"Средне"}]}}function Iy(){return{tasks:[{text:"Из скольких детей состоит бинарное дерево?",type:"input",answer:"2",hint:"Левый и правый потомок",difficulty:"Легко"},{text:"Как называется элемент в вершине дерева?",type:"choice",answer:"корень",options:["корень","лист","узел","ребро"],hint:"Root - верхний элемент дерева",difficulty:"Легко"},{text:"Какой результат поиска в сбалансированном BST?",type:"choice",answer:"O(log n)",options:["O(log n)","O(n)","O(1)","O(n^2)"],hint:"На каждом шаге исключаем половину элементов",difficulty:"Средне"},{text:"Какой вид обхода дерева существует?",type:"choice",answer:"in-order",options:["in-order","prev-order","all-order","level-order"],hint:"In-order (левый, родитель, правый), pre-order, post-order",difficulty:"Средне"},{text:"Что такое высота дерева?",type:"choice",answer:"путь",options:["путь","сумма","ширина","размер"],hint:"Максимальное расстояние от корня до листа",difficulty:"Средне"},{text:"В чём отличие между BST и обычным бинарным деревом?",type:"choice",answer:"порядок",options:["порядок","размер","высота","глубина"],hint:"BST имеет свойство упорядоченности: левый < родитель < правый",difficulty:"Сложно"}]}}function Ay(){return{tasks:[{text:"Что такое Git?",type:"choice",answer:"система контроля версий для отслеживания изменений в коде",options:["язык программирования","система контроля версий для отслеживания изменений в коде","текстовый редактор","база данных"],hint:"Git помогает сохранять историю и работать в команде",difficulty:"Легко"},{text:"Какая команда инициализирует новый репозиторий?",type:"choice",answer:"git init",options:["git start","git init","git create","git new"],hint:"Первая команда когда начинаешь новый проект",difficulty:"Легко"},{text:"Как добавить все изменённые файлы в staging area?",type:"choice",answer:"git add .",options:["git add all","git add .","git stage","git commit all"],hint:"Точка означает все файлы в текущей директории",difficulty:"Легко"},{text:"Какая команда создаёт новый коммит?",type:"choice",answer:'git commit -m "сообщение"',options:["git save",'git commit -m "сообщение"',"git log","git push"],hint:"-m флаг нужен для написания описания",difficulty:"Легко"},{text:"Как создать новую ветку и переключиться на неё одной командой?",type:"choice",answer:"git checkout -b имя-ветки",options:["git branch имя-ветки","git checkout -b имя-ветки","git new-branch","git create-branch"],hint:"-b флаг создаёт ветку и переключается",difficulty:"Средне"},{text:"Какая команда отправляет коммиты на удалённый сервер?",type:"choice",answer:"git push",options:["git send","git push","git upload","git sync"],hint:"Это загруза твоих изменений на GitHub/GitLab",difficulty:"Средне"},{text:"Что такое Pull Request (PR)?",type:"choice",answer:"предложение своих изменений для рассмотрения перед включением в главный код",options:["команда git","способ скачать код","предложение своих изменений для рассмотрения перед включением в главный код","тип файла"],hint:"Это как бы просишь: посмотри мой код, он хороший?",difficulty:"Средне"},{text:"Какая команда показывает историю коммитов?",type:"choice",answer:"git log",options:["git history","git log","git commits","git timeline"],hint:"log отображает все сохранённые коммиты",difficulty:"Средне"},{text:"Какая платформа для хостинга репозиториев самая популярная?",type:"choice",answer:"GitHub",options:["GitLab","GitHub","Bitbucket","Gitea"],hint:"Самая популярная, принадлежит Microsoft",difficulty:"Легко"},{text:"Как скачать обновления с удалённого репозитория?",type:"choice",answer:"git pull",options:["git download","git pull","git fetch all","git sync"],hint:"pull = fetch + merge (скачивает и объединяет)",difficulty:"Средне"}]}}function Dy(){return{tasks:[{text:"Что такое LLM?",type:"choice",answer:"модель",options:["модель","язык","данные","algoritm"],hint:"Large Language Model - это нейросетевая...",difficulty:"Легко"},{text:"Какой самый популярный AI для кодинга?",type:"choice",answer:"copilot",options:["copilot","ChatGPT","Claude","Gemini"],hint:"GitHub Copilot, Claude Code",difficulty:"Легко"},{text:"Что такое промпт инженеринг?",type:"choice",answer:"вопрос",options:["вопрос","код","данные","модель"],hint:"Умение писать хорошие вопросы (prompts) для AI",difficulty:"Средне"},{text:"Можно ли генерировать код с помощью AI?",type:"choice",answer:"да",options:["да","нет","иногда","только простой код"],hint:"AI может писать код, тесты, документацию",difficulty:"Легко"},{text:"Нужно ли проверять код сгенерированный AI?",type:"choice",answer:"да",options:["да","нет","только если длинный","зависит от AI"],hint:"AI может делать ошибки, всегда проверяй код",difficulty:"Средне"},{text:"Что главное при работе с AI в разработке?",type:"choice",answer:"понимание",options:["понимание","скорость","качество","количество"],hint:"Понимай что генерирует AI и почему",difficulty:"Средне"}]}}function Py(){return{tasks:[{text:"Что такое MVP в проекте?",type:"choice",answer:"минимум",options:["минимум","максимум","средство","версия"],hint:"Minimum Viable Product - самая минимальная версия",difficulty:"Легко"},{text:"Какой первый шаг при разработке проекта?",type:"choice",answer:"план",options:["план","код","тесты","развёртывание"],hint:"Спланируй что ты хочешь сделать",difficulty:"Легко"},{text:"Сколько тестов должно быть в проекте?",type:"choice",answer:"много",options:["много","несколько","один","не нужны"],hint:"Чем больше тестов тем лучше, минимум 50% покрытие",difficulty:"Средне"},{text:"Какие типы тестов существуют?",type:"choice",answer:"unit",options:["unit","integration","e2e","все варианты"],hint:"Unit, integration, e2e тесты",difficulty:"Средне"},{text:"Нужен ли README в проекте?",type:"choice",answer:"да",options:["да","нет","опционально","только для open source"],hint:"README должен описывать проект и как его использовать",difficulty:"Легко"},{text:"Что должно быть в README?",type:"choice",answer:"описание",options:["описание","код","тесты","лицензия"],hint:"Описание, как установить, как запустить, примеры",difficulty:"Средне"}]}}function Fy(){return{tasks:[{text:"Сколько минут длится один рабочий интервал в технике Pomodoro?",type:"choice",answer:"25",options:["25","30","45","20"],hint:"Придумал Франческо Чирилло — назвал по кухонному таймеру-помидору",difficulty:"Легко"},{text:"Что нужно сделать с задачей, которая займёт меньше 2 минут, по методу GTD?",type:"choice",answer:"Выполнить немедленно",options:["Выполнить немедленно","Занести в список и запланировать","Делегировать","Удалить"],hint:"Правило двух минут: если быстро — делай сейчас",difficulty:"Легко"},{text:"В матрице Эйзенхауэра задачи «важно + НЕ срочно» относятся к квадранту…",type:"choice",answer:"Второй (планирование)",options:["Второй (планирование)","Первый (кризис)","Третий (делегирование)","Четвёртый (мусор)"],hint:"Именно здесь — развитие, обучение, здоровье. Самый ценный квадрант.",difficulty:"Средне"},{text:"Что означает буква «M» в методе приоритизации MoSCoW?",type:"choice",answer:"Must Have — обязательно",options:["Must Have — обязательно","Maybe — возможно","Medium — средний приоритет","Measure — измерить"],hint:"Без Must Have — проект не работает вообще",difficulty:"Средне"},{text:"Как называется техника, когда самую неприятную задачу делают самой первой с утра?",type:"choice",answer:"Съешь лягушку",options:["Съешь лягушку","Съешь слона","Pomodoro","Time blocking"],hint:"Автор идеи — Брайан Трейси. Лягушка = неприятное дело.",difficulty:"Легко"},{text:"Согласно принципу Парето, какой процент усилий даёт 80% результата?",type:"choice",answer:"20%",options:["20%","50%","30%","10%"],hint:"Правило 80/20: малая часть действий даёт большую часть результата",difficulty:"Легко"},{text:"По матрице Эйзенхауэра — что нужно сделать с задачами «НЕ важно + срочно»?",type:"choice",answer:"Делегировать",options:["Делегировать","Делать немедленно","Планировать на потом","Удалить"],hint:"Чужие звонки и просьбы создают иллюзию занятости — передай другому",difficulty:"Средне"}]}}function By(){return{tasks:[{text:"Какой язык является типизированной надстройкой над JavaScript и стал стандартом в продакшене?",type:"choice",answer:"TypeScript",options:["TypeScript","CoffeeScript","Dart","Elm"],hint:"Добавляет статическую типизацию к JS, разработан Microsoft",difficulty:"Легко"},{text:"Какой фреймворк от Vercel добавляет серверный рендеринг (SSR) поверх React?",type:"choice",answer:"Next.js",options:["Next.js","Nuxt.js","Gatsby","Remix"],hint:"SSR, SSG, App Router — всё из коробки",difficulty:"Средне"},{text:"Какой Python-фреймворк автоматически генерирует OpenAPI-документацию и считается самым быстрым для REST API?",type:"choice",answer:"FastAPI",options:["FastAPI","Django","Flask","Tornado"],hint:"Основан на type hints, документация доступна по /docs",difficulty:"Средне"},{text:"Какой язык создала компания Google для высоконагруженных систем и микросервисов?",type:"choice",answer:"Go (Golang)",options:["Go (Golang)","Rust","Kotlin","Swift"],hint:"Компилируемый, с горутинами для параллелизма",difficulty:"Легко"},{text:"Какой современный сборщик заменяет Webpack в большинстве новых проектов благодаря скорости?",type:"choice",answer:"Vite",options:["Vite","Parcel","Rollup","esbuild"],hint:"Название переводится с французского как «быстро»",difficulty:"Средне"},{text:"Какая реляционная база данных считается стандартом для большинства production-проектов?",type:"choice",answer:"PostgreSQL",options:["PostgreSQL","MongoDB","Redis","SQLite"],hint:"Реляционная, не NoSQL. Поддерживает JSON, полнотекстовый поиск, транзакции.",difficulty:"Средне"},{text:"Какой Deep Learning фреймворк доминирует для исследований и продакшена в 2026 году?",type:"choice",answer:"PyTorch",options:["PyTorch","TensorFlow","Keras","JAX"],hint:"Разработан Meta, отличается питоновским стилем и динамическим графом",difficulty:"Средне"}]}}function My(){return{tasks:[{text:"Какая SQL-команда используется для выборки данных из таблицы?",type:"choice",answer:"SELECT",options:["SELECT","GET","FETCH","FIND"],hint:"SELECT * FROM users — выбрать все строки",difficulty:"Легко"},{text:"Какое ключевое слово фильтрует строки по условию в SQL?",type:"choice",answer:"WHERE",options:["WHERE","FILTER","HAVING","WHEN"],hint:"SELECT * FROM users WHERE age > 18",difficulty:"Легко"},{text:"Какой оператор SQL проверяет вхождение значения в список?",type:"choice",answer:"IN",options:["IN","HAS","CONTAINS","EXISTS"],hint:"WHERE city IN ('Москва', 'Сочи')",difficulty:"Средне"},{text:"Что выберет запрос: SELECT DISTINCT city FROM users?",type:"choice",answer:"Уникальные города без повторений",options:["Уникальные города без повторений","Все города включая дубли","Только первый город","Количество городов"],hint:"DISTINCT убирает дубликаты из результата",difficulty:"Средне"},{text:"Что означает символ % в операторе LIKE?",type:"choice",answer:"Любое количество любых символов",options:["Любое количество любых символов","Ровно один любой символ","Только цифры","Конец строки"],hint:"LIKE 'А%' — имена начинающиеся на А (любое продолжение)",difficulty:"Средне"},{text:"Какое ключевое слово ограничивает число строк в результате запроса?",type:"choice",answer:"LIMIT",options:["LIMIT","TOP","MAX","ROWCOUNT"],hint:"ORDER BY age DESC LIMIT 3 — топ-3 самых старших",difficulty:"Легко"},{text:"Что означает ASC в ORDER BY age ASC?",type:"choice",answer:"Сортировка по возрастанию (от меньшего к большему)",options:["Сортировка по возрастанию (от меньшего к большему)","Сортировка по убыванию","Ascending count — подсчёт","Это значение по умолчанию, ASC можно не писать"],hint:"ASC = ascending. По умолчанию ORDER BY сортирует именно так.",difficulty:"Средне"}]}}function Hy(){return{tasks:[{text:"Какая агрегатная функция SQL считает количество строк в таблице или группе?",type:"choice",answer:"COUNT(*)",options:["COUNT(*)","SUM(*)","TOTAL(*)","NUM(*)"],hint:"SELECT COUNT(*) FROM users — сколько всего пользователей",difficulty:"Легко"},{text:"Что вернёт запрос SELECT AVG(age) FROM users, если возрасты: 25, 31, 19, 42, 28?",type:"choice",answer:"29",options:["29","42","19","145"],hint:"(25+31+19+42+28) / 5 = 145 / 5 = 29",difficulty:"Средне"},{text:"Какое ключевое слово группирует строки с одинаковыми значениями?",type:"choice",answer:"GROUP BY",options:["GROUP BY","ORDER BY","PARTITION BY","CLUSTER BY"],hint:"GROUP BY city — одна строка результата на каждый город",difficulty:"Средне"},{text:"В чём принципиальное отличие HAVING от WHERE?",type:"choice",answer:"HAVING фильтрует группы после GROUP BY, WHERE — строки до группировки",options:["HAVING фильтрует группы после GROUP BY, WHERE — строки до группировки","HAVING работает быстрее WHERE","WHERE фильтрует группы, HAVING — строки","Разницы нет, они взаимозаменяемы"],hint:"WHERE → GROUP BY → HAVING — такой порядок выполнения",difficulty:"Сложно"},{text:"Какая команда SQL добавляет новую строку в таблицу?",type:"choice",answer:"INSERT INTO",options:["INSERT INTO","ADD TO","CREATE ROW","APPEND INTO"],hint:"INSERT INTO users (name, age) VALUES ('Егор', 22)",difficulty:"Легко"},{text:"Что произойдёт при выполнении DELETE FROM users без условия WHERE?",type:"choice",answer:"Удалятся все строки таблицы",options:["Удалятся все строки таблицы","Удалится только первая строка","Удалится сама таблица","Запрос не выполнится"],hint:"Без WHERE затрагиваются ВСЕ строки — это главное правило безопасности",difficulty:"Средне"},{text:"Какой запрос правильно обновит город пользователя с id=1?",type:"choice",answer:"UPDATE users SET city = 'Сочи' WHERE id = 1",options:["UPDATE users SET city = 'Сочи' WHERE id = 1","MODIFY users SET city = 'Сочи' WHERE id = 1","UPDATE users WHERE id = 1 SET city = 'Сочи'","CHANGE users city = 'Сочи' FOR id = 1"],hint:"Синтаксис: UPDATE таблица SET поле = значение WHERE условие",difficulty:"Средне"}]}}function Uy(){return{tasks:[{text:"Какой JOIN возвращает ТОЛЬКО строки с совпадением в обеих таблицах?",type:"choice",answer:"INNER JOIN",options:["INNER JOIN","LEFT JOIN","RIGHT JOIN","FULL OUTER JOIN"],hint:"INNER = пересечение. Строки без пары с обеих сторон не попадают в результат.",difficulty:"Средне"},{text:"Пользователь не сделал ни одного заказа. Что вернёт LEFT JOIN в колонке orders.product для него?",type:"choice",answer:"NULL",options:["NULL","0",'Пустую строку ""',"Ошибку"],hint:"LEFT JOIN включает все строки слева; там где нет пары справа — NULL",difficulty:"Средне"},{text:"Как правильно проверить, что значение в колонке равно NULL?",type:"choice",answer:"WHERE city IS NULL",options:["WHERE city IS NULL","WHERE city = NULL","WHERE city == NULL","WHERE ISNULL(city)"],hint:"NULL нельзя сравнивать через =. Используй IS NULL.",difficulty:"Средне"},{text:'Что вернёт COALESCE(NULL, NULL, "Не указан")?',type:"choice",answer:'"Не указан"',options:['"Не указан"',"NULL","Ошибку","0"],hint:"COALESCE возвращает первое ненулевое значение из списка",difficulty:"Средне"},{text:"Для чего используется CASE WHEN в SQL?",type:"choice",answer:"Для условной логики внутри запроса (аналог if/else)",options:["Для условной логики внутри запроса (аналог if/else)","Для объединения таблиц","Для группировки строк","Для удаления дубликатов"],hint:'CASE WHEN age < 18 THEN "юный" ELSE "взрослый" END AS group',difficulty:"Средне"},{text:"Что такое подзапрос (subquery) в SQL?",type:"choice",answer:"SELECT внутри другого SELECT, WHERE или FROM",options:["SELECT внутри другого SELECT, WHERE или FROM","Запрос к подтаблице (секции)","Сокращённая форма JOIN","Запрос без WHERE"],hint:"WHERE age > (SELECT AVG(age) FROM users) — подзапрос считается первым",difficulty:"Сложно"},{text:"В каком порядке SQL реально ВЫПОЛНЯЕТ части запроса SELECT?",type:"choice",answer:"FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",options:["FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY","SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY","WHERE → FROM → SELECT → GROUP BY → ORDER BY","SELECT → WHERE → FROM → ORDER BY → GROUP BY"],hint:"SQL не выполняется сверху вниз — FROM всегда первый, SELECT — предпоследний",difficulty:"Сложно"}]}}function zy(){return{tasks:[{text:"Что такое IP-адрес?",type:"choice",answer:"Уникальный адрес устройства в сети",options:["Уникальный адрес устройства в сети","Название сайта (например, google.com)","Протокол передачи данных","Порт для HTTP-соединения"],hint:"IP — это как почтовый адрес для устройства: 192.168.1.10",difficulty:"Легко"},{text:"Что делает DNS?",type:"choice",answer:"Переводит доменное имя в IP-адрес",options:["Переводит доменное имя в IP-адрес","Шифрует данные при передаче","Отправляет HTTP-запросы","Управляет портами устройства"],hint:"DNS — как телефонная книга: google.com → 172.217.16.142",difficulty:"Легко"},{text:"Чем HTTPS отличается от HTTP?",type:"choice",answer:"HTTPS добавляет шифрование через TLS",options:["HTTPS добавляет шифрование через TLS","HTTPS работает быстрее","HTTPS использует другой порт (не 80)","Отличий нет, это одно и то же"],hint:"S в HTTPS = Secure. Данные шифруются и не перехватываются",difficulty:"Легко"},{text:"Что такое REST API?",type:"choice",answer:"Архитектурный стиль построения API на основе принципов",options:["Архитектурный стиль построения API на основе принципов","Протокол передачи данных как HTTP или TCP","Язык программирования для серверов","База данных для хранения запросов"],hint:"REST — это набор принципов (stateless, ресурсы, URL), не протокол",difficulty:"Средне"},{text:"Какой HTTP-метод используют для создания нового ресурса?",type:"choice",answer:"POST",options:["POST","GET","PUT","DELETE"],hint:"POST /users — создаёт нового пользователя. CRUD: Create = POST",difficulty:"Легко"},{text:"Что означает статус-код 404?",type:"choice",answer:"Ресурс не найден (ошибка клиента)",options:["Ресурс не найден (ошибка клиента)","Сервер упал (внутренняя ошибка)","Запрос выполнен успешно","Нет доступа (не авторизован)"],hint:"4xx — ошибки клиента. 404 Not Found — запрошенного ресурса нет",difficulty:"Легко"},{text:"Что такое stateless в контексте REST?",type:"choice",answer:"Каждый запрос содержит всю необходимую информацию; сервер не помнит предыдущие запросы",options:["Каждый запрос содержит всю необходимую информацию; сервер не помнит предыдущие запросы","Сервер не хранит данные в базе данных","Клиент не сохраняет состояние между сессиями","API не требует авторизации"],hint:"Stateless = без сохранения состояния на стороне сервера между запросами",difficulty:"Средне"},{text:"Какой формат данных чаще всего используется в REST API?",type:"choice",answer:"JSON",options:["JSON","XML","HTML","CSV"],hint:"JavaScript Object Notation — прост, читаем, поддерживается везде",difficulty:"Легко"},{text:"Что вернёт сервер при успешном создании ресурса?",type:"choice",answer:"201 Created",options:["201 Created","200 OK","204 No Content","301 Moved"],hint:"200 = OK (получили), 201 = Created (создали), 204 = No Content (удалили)",difficulty:"Средне"},{text:"Какой HTTP-метод используют для частичного обновления ресурса?",type:"choice",answer:"PATCH",options:["PATCH","PUT","POST","UPDATE"],hint:"PUT заменяет ресурс полностью, PATCH — только изменённые поля",difficulty:"Средне"}]}}function Wy(){return{tasks:[{text:"Какая сложность bubble sort?",type:"choice",answer:"O(n^2)",options:["O(n^2)","O(n log n)","O(n)","O(1)"],hint:"Самый медленный алгоритм сортировки",difficulty:"Средне"},{text:"Какая сложность merge sort?",type:"choice",answer:"O(n log n)",options:["O(n log n)","O(n^2)","O(n)","O(log n)"],hint:"Быстрый и стабильный алгоритм",difficulty:"Средне"},{text:"Какая сложность quick sort в среднем?",type:"choice",answer:"O(n log n)",options:["O(n log n)","O(n^2)","O(n)","O(log n)"],hint:"Быстрая сортировка (в среднем случае)",difficulty:"Средне"},{text:"Какой алгоритм сортировки используется в Python?",type:"choice",answer:"timsort",options:["timsort","quicksort","mergesort","heapsort"],hint:"Timsort - комбинация merge и insertion sort",difficulty:"Сложно"},{text:"Какая сложность бинарного поиска?",type:"choice",answer:"O(log n)",options:["O(log n)","O(n)","O(n^2)","O(1)"],hint:"На каждом шаге половины массива исключаются",difficulty:"Средне"},{text:"Сколько операций для 1000 элементов при O(n log n)?",type:"input",answer:"10000",hint:"Примерно 1000 * log2(1000) ≈ 10000",difficulty:"Сложно"}]}}function qy(){return{tasks:[{text:"Что такое sliding window?",type:"choice",answer:"окно",options:["окно","указатель","стек","очередь"],hint:"Техника для работы с подмассивами и подстроками",difficulty:"Средне"},{text:"Что такое two pointers?",type:"choice",answer:"указатель",options:["указатель","окно","стек","дерево"],hint:"Два указателя которые движутся в разных направлениях",difficulty:"Средне"},{text:"Что такое fast and slow pointers?",type:"choice",answer:"черепаха",options:["черепаха","заяц","прыжок","шаг"],hint:"Один быстрый, один медленный - поиск цикла",difficulty:"Средне"},{text:"Что такое рекурсия?",type:"choice",answer:"функция",options:["функция","цикл","алгоритм","метод"],hint:"Функция которая вызывает саму себя",difficulty:"Легко"},{text:"Что такое мемоизация?",type:"choice",answer:"кэш",options:["кэш","память","таблица","список"],hint:"Сохранение результатов чтобы не пересчитывать",difficulty:"Средне"},{text:"Для чего нужна мемоизация?",type:"choice",answer:"скорость",options:["скорость","память","простота","чистота"],hint:"Для оптимизации рекурсивных алгоритмов",difficulty:"Средне"}]}}function Gy(){return{tasks:[{text:"Что такое SQL инъекция?",type:"choice",answer:"атака",options:["атака","запрос","команда","ошибка"],hint:"Атака через введение вредоносного SQL кода",difficulty:"Средне"},{text:"Что такое XSS?",type:"choice",answer:"скрипт",options:["скрипт","запрос","команда","атака"],hint:"Cross-Site Scripting - вставка вредоносного скрипта",difficulty:"Средне"},{text:"Как защитить от SQL инъекций?",type:"choice",answer:"параметры",options:["параметры","фильтры","проверки","логирование"],hint:"Параметризованные запросы или prepared statements",difficulty:"Средне"},{text:"Как защитить от XSS?",type:"choice",answer:"экранировать",options:["экранировать","удалить","заменить","скрыть"],hint:"Экранировать (escape) HTML символы",difficulty:"Средне"},{text:"Какой алгоритм использовать для хеша паролей?",type:"choice",answer:"bcrypt",options:["bcrypt","md5","sha1","sha256"],hint:"bcrypt, argon2 - специальные алгоритмы для паролей",difficulty:"Средне"},{text:"Всегда ли нужен HTTPS?",type:"choice",answer:"да",options:["да","нет","иногда","только для данных"],hint:"Шифрование обязательно в production",difficulty:"Легко"},{text:"Что такое OWASP Top 10?",type:"choice",answer:"уязвимости",options:["уязвимости","угрозы","риски","методы"],hint:"Список 10 самых опасных уязвимостей",difficulty:"Средне"}]}}function $y(){return{tasks:[{text:"Что такое синдром самозванца?",type:"choice",answer:"чувство",options:["чувство","болезнь","ошибка","метод"],hint:"Ощущение что ты не достоин своей позиции",difficulty:"Легко"},{text:"Как давать конструктивный фидбек?",type:"choice",answer:"sbi",options:["sbi","abc","xyz","oop"],hint:"Модель SBI: Situation, Behavior, Impact",difficulty:"Средне"},{text:"Что делать если не понимаешь задачу?",type:"choice",answer:"спросить",options:["спросить","молчать","гадать","начать кодить"],hint:"Спросить (лучше спросить чем молчать)",difficulty:"Легко"},{text:"Как правильно просить о помощи?",type:"choice",answer:"объясни",options:["объясни","просто спроси","жди сам","возьми чужой код"],hint:"Объясни что уже пробовал, показывай прогресс",difficulty:"Средне"},{text:"Почему важны soft skills?",type:"choice",answer:"общение",options:["общение","деньги","известность","успех"],hint:"Для работы в команде и карьерного роста",difficulty:"Легко"},{text:"Что важнее - hard или soft skills?",type:"choice",answer:"оба",options:["оба","hard skills","soft skills","depend"],hint:"Оба одинаково важны для успеха",difficulty:"Средне"}]}}function Vy(){return{tasks:[{text:"Какой процент информации помнишь если читаешь?",type:"input",answer:"10",hint:"Только 10% информации запомнится из прочитанного",difficulty:"Легко"},{text:"Какой процент помнишь если слышишь?",type:"input",answer:"50",hint:"Примерно 50% из услышанного",difficulty:"Легко"},{text:"Какой процент помнишь если делаешь?",type:"input",answer:"90",hint:"90% информации запомнится если ты это сделал",difficulty:"Легко"},{text:"Что такое метод Фейнмана?",type:"choice",answer:"объяснение",options:["объяснение","запись","чтение","слушание"],hint:"Объясни тему простыми словами как ребенку",difficulty:"Средне"},{text:"Какой минимум времени для эффективного обучения?",type:"choice",answer:"1-2",options:["1-2","3-4","5-6","7-8"],hint:"1-2 часа в день лучше чем 8 часов в выходной",difficulty:"Средне"},{text:"Что лучше для обучения - видео или практика?",type:"choice",answer:"практика",options:["практика","видео","чтение","лекции"],hint:"Практика и проекты более эффективны",difficulty:"Средне"},{text:"Как лучше учиться - читать код или писать?",type:"choice",answer:"писать",options:["писать","читать","смотреть","слушать"],hint:"Писать код лучше чем просто читать",difficulty:"Легко"}]}}function Qy(){return{tasks:[{text:"Сколько страниц должно быть в резюме джуна?",type:"input",answer:"1",hint:"Максимум одна страница для начинающего",difficulty:"Легко"},{text:"Что главное в резюме джуна?",type:"choice",answer:"проекты",options:["проекты","образование","сертификаты","опыт"],hint:"Ссылки на GitHub и портфолио проектов",difficulty:"Легко"},{text:"Нужен ли опыт для первой работы?",type:"choice",answer:"нет",options:["нет","да","желательно","обязательно"],hint:"Можно без опыта если есть хорошие проекты",difficulty:"Легко"},{text:"Что важнее - много навыков или глубокие знания?",type:"choice",answer:"глубокие",options:["глубокие","много","широкие","популярные"],hint:"Лучше 3 языка на хорошем уровне чем 10 поверхностно",difficulty:"Средне"},{text:"Нужно ли сопроводительное письмо?",type:"choice",answer:"желательно",options:["желательно","да","нет","опционально"],hint:"Помогает выделиться среди других кандидатов",difficulty:"Легко"},{text:"Как написать хорошее резюме?",type:"choice",answer:"честно",options:["честно","красиво","сложно","оригинально"],hint:"Честно опиши навыки и достижения без приукрас",difficulty:"Средне"},{text:"Что написать если нет работы в резюме?",type:"choice",answer:"проекты",options:["проекты","ничего","выдумать","школа"],hint:"Напиши о личных проектах, волонтёрстве, лагере",difficulty:"Средне"}]}}const Yy={2:wy,3:ky,4:by,5:Ly,6:Cy,7:Ry,8:Oy,9:_y,10:Iy,11:Ay,12:Dy,13:Py,15:Fy,16:By,17:My,18:Hy,19:Uy,20:zy,23:Wy,24:qy,25:Gy,26:$y,27:Vy,29:Qy};function Jy({question:e,taskIndex:r,totalTasks:n,onAnswer:s,isSolved:i,savedAnswer:l}){const[a,o]=x.useState(""),[c,d]=x.useState(!1),[u,m]=x.useState(null),[y,g]=x.useState(!1),N=e.type==="choice";x.useEffect(()=>{l&&l.answer?(o(l.answer),l.status&&m({correct:l.status==="correct",message:l.status==="correct"?"Правильно!":"Неправильно"})):(o(""),m(null))},[l,r]);const j=()=>{if(!a.trim()){m({correct:!1,message:"Выберите ответ"});return}g(!0),setTimeout(()=>{const f=a.trim().toLowerCase()===e.answer.toLowerCase();m({correct:f,message:f?"Правильно!":"Неправильно"}),g(!1),s(r,f,a.trim())},300)},T=()=>{o(""),m(null),d(!1)},p=l&&l.status,h={color:u!=null&&u.correct?"#00ff00":"#ff3333",fontSize:"13px",fontWeight:600,marginTop:"8px",minHeight:"20px"};return t.jsxs("div",{className:"question-card",children:[t.jsxs("div",{className:"question-header",children:[t.jsxs("span",{className:"question-number",children:["Задача ",r+1," из ",n]}),t.jsx("span",{className:"question-difficulty",children:e.difficulty})]}),t.jsx("p",{className:"question-text",children:e.text}),N?t.jsx("div",{className:"question-options",children:e.options.map((f,v)=>t.jsxs("label",{className:`question-option ${p&&(u!=null&&u.correct)&&f===a?"answered":""}`,children:[t.jsx("input",{type:"radio",name:`question-${r}`,value:f,checked:a===f,onChange:E=>o(E.target.value),disabled:y}),t.jsx("span",{className:"option-text",children:f})]},v))}):t.jsx("div",{className:"question-input-group",children:t.jsx("input",{type:"text",value:a,onChange:f=>o(f.target.value),placeholder:"Введите ваш ответ...",disabled:y,className:`question-input ${p&&(u!=null&&u.correct)?"answered":""}`,onKeyPress:f=>f.key==="Enter"&&j()})}),t.jsxs("div",{className:"question-actions",children:[t.jsxs("div",{className:"question-actions-left",children:[t.jsx("button",{onClick:()=>d(!c),className:"btn-hint",disabled:y,children:c?"Скрыть подсказку":"Подсказка"}),t.jsx("button",{onClick:T,className:"btn-clear",disabled:y,children:p?"Переделать":"Очистить"})]}),t.jsx("button",{onClick:j,className:`btn-check ${y?"checking":""}`,disabled:y||p&&(u==null?void 0:u.correct),children:y?"⟳":p&&(u!=null&&u.correct)?"✓ Решено":"Проверить"})]}),c&&t.jsxs("div",{className:"question-hint",children:[t.jsx("strong",{children:"Подсказка:"})," ",e.hint]}),u&&t.jsx("div",{style:h,children:u.message})]})}function Ky({totalTasks:e,taskStatuses:r,currentIndex:n,onSelectTask:s}){return t.jsx("div",{className:"task-indicators",children:Array.from({length:e}).map((i,l)=>{const a=r[l],c=`task-indicator ${a==="correct"?"correct":""} ${a==="incorrect"?"incorrect":""} ${l===n?"active":""}`;return t.jsx("button",{className:c,title:`Задача ${l+1}`,onClick:()=>s(l),children:l+1},l)})})}function Xy({selectedDay:e,onBack:r}){const[n,s]=x.useState([]),[i,l]=x.useState({}),[a,o]=x.useState({}),[c,d]=x.useState(0),[u,m]=x.useState(!0),[y,g]=x.useState(!1);x.useEffect(()=>{const v=setTimeout(()=>{const E=Yy[e];if(E){const L=E();s(L.tasks||[]);const w=localStorage.getItem("taskStatuses"),C=w?JSON.parse(w):{},B=`day${e}`;l(C[B]||{});const A=localStorage.getItem("taskAnswers"),Y=A?JSON.parse(A):{};o(Y[B]||{})}d(0),m(!1)},300);return()=>clearTimeout(v)},[e]);const N=(v,E,L)=>{const w={...i,[v]:E?"correct":"incorrect"};l(w);const C=localStorage.getItem("taskStatuses"),B=C?JSON.parse(C):{};B[`day${e}`]=w,localStorage.setItem("taskStatuses",JSON.stringify(B));const A=localStorage.getItem("taskAnswers"),Y=A?JSON.parse(A):{};Y[`day${e}`]||(Y[`day${e}`]={}),Y[`day${e}`][v]={answer:L,status:E?"correct":"incorrect"},localStorage.setItem("taskAnswers",JSON.stringify(Y))},j=v=>{const E=Math.max(0,Math.min(v,n.length-1));if(E===c)return;const L=localStorage.getItem("taskAnswers"),w=L?JSON.parse(L):{},C=`day${e}`,B=w[C]||{};o(B),g(!0),setTimeout(()=>{d(E),g(!1)},200)},T=()=>{j(c-1)},p=()=>{j(c+1)};function h(v){const E=mr.find(L=>L.day===v);return E?E.title:`День ${v}`}if(u)return t.jsx("section",{className:"page active",children:t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-secondary)"},children:"Загрузка..."})})});if(!n.length)return t.jsxs("section",{className:"page active",children:[t.jsx("div",{className:"page-header",children:t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Задач для этого дня нет или они еще готовятся..."})}),t.jsx("button",{className:"btn-back",onClick:r,children:"← Вернуться в Библиотеку"})]});const f=n[c];return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"theory-breadcrumbs",children:[t.jsx("button",{className:"breadcrumb-link",onClick:r,children:"📚 Библиотека знаний"}),t.jsx("span",{className:"breadcrumb-sep",children:"/"}),t.jsxs("span",{className:"breadcrumb-current",children:["День ",e," · ",h(e)]})]}),t.jsxs("div",{className:"questions-container",children:[t.jsxs("div",{className:"questions-header",children:[t.jsx("h2",{className:"questions-title",children:"Задачи для тренировки"}),t.jsx(Ky,{totalTasks:n.length,taskStatuses:i,currentIndex:c,onSelectTask:j})]}),t.jsxs("div",{className:"single-question-view",children:[t.jsx("div",{className:`question-card-wrapper ${y?"switching":""}`,children:t.jsx(Jy,{question:f,taskIndex:c,totalTasks:n.length,onAnswer:N,isSolved:i[c],savedAnswer:a[c]},`${e}-${c}`)}),t.jsxs("div",{className:"question-navigation",children:[t.jsx("button",{className:"nav-btn nav-prev",onClick:T,disabled:c===0,children:"← Предыдущая"}),t.jsxs("span",{className:"nav-counter",children:[c+1," из ",n.length]}),t.jsx("button",{className:"nav-btn nav-next",onClick:p,disabled:c===n.length-1,children:"Следующая →"})]})]})]}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:r,children:"Вернуться в Библиотеку знаний"})})]})}const pc={1:{title:"Дневник лагеря и инструменты",tasks:[{num:1,title:"Завести дневник лагеря",description:`Вы можете выбрать любой удобный для вас формат:
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

⚠️ ВАЖНО: всегда пиши WHERE в UPDATE и DELETE! Без него изменятся ВСЕ строки.`}]},19:{title:"SQL — часть 3: JOIN, NULL, CASE WHEN, подзапросы",tasks:[{num:1,title:"Подготовка: связанные таблицы",description:`Используй таблицу users из части 1. Создай вторую таблицу orders:

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

Обрати внимание: у Глеба (id=4) заказов нет — он понадобится для LEFT JOIN.`},{num:2,title:"INNER JOIN и псевдонимы",description:`Напиши запросы (используй псевдонимы AS u и AS o):
1) Покажи имя пользователя, товар и цену для всех заказов
   SELECT u.name, o.product, o.price
   FROM users AS u
   JOIN orders AS o ON u.id = o.user_id;
2) Покажи только заказы пользователей из Москвы (добавь WHERE)
3) Покажи общую сумму заказов каждого пользователя (JOIN + GROUP BY + SUM)`},{num:3,title:"LEFT JOIN и поиск «пустых»",description:`Напиши запросы:
1) Покажи ВСЕХ пользователей и их заказы — даже тех, у кого заказов нет
   (LEFT JOIN, у Глеба product будет NULL)
2) Найди пользователей, которые НЕ сделали ни одного заказа
   (LEFT JOIN + WHERE o.id IS NULL)
3) Для каждого пользователя покажи количество заказов (включая 0 у Глеба)
   Подсказка: используй COUNT(o.id) — COUNT(*) посчитает NULL как 1`},{num:4,title:"NULL — работа с отсутствующими значениями",description:`Добавь пользователя без города:
INSERT INTO users (id, name, age, city) VALUES (6, 'Егор', 22, NULL);

Теперь напиши запросы:
1) Найди всех пользователей, у которых НЕ указан город (IS NULL)
2) Выведи всех пользователей, заменив NULL в city на текст "Не указан"
   Используй COALESCE(city, 'Не указан') AS city
3) Подумай: почему WHERE city = NULL не работает? Запиши ответ в комментарии.`},{num:5,title:"CASE WHEN — категории",description:`Напиши запрос, который для каждого пользователя выводит колонку age_group:
• Меньше 20 → 'юный'
• 20–29 → 'молодой'
• 30–39 → 'взрослый'
• 40 и старше → 'опытный'

Используй CASE WHEN ... THEN ... WHEN ... THEN ... ELSE ... END AS age_group

Дополнительно: посчитай, сколько пользователей в каждой категории
(оберни запрос в подзапрос или используй GROUP BY age_group)`},{num:6,title:"Подзапросы (Subqueries)",description:`Напиши запросы с подзапросами:
1) Найди пользователей, возраст которых выше среднего по всей таблице
   WHERE age > (SELECT AVG(age) FROM users)

2) Найди пользователей, которые делали заказы (через IN):
   WHERE id IN (SELECT DISTINCT user_id FROM orders)

3) Найди пользователей, которые НЕ делали заказов (через NOT IN)

4) Сложное: найди пользователя с самой большой суммой заказов
   Подсказка: сначала посчитай суммы через подзапрос, потом найди MAX`},{num:7,title:"Проектирование схемы — интернет-магазин",description:`Спроектируй схему БД для интернет-магазина. Создай таблицы:

1. customers — покупатели (id, name, email, city)
2. products — товары (id, name, price, category, stock)
3. orders — заказы (id, customer_id, created_at)
4. order_items — позиции заказа (id, order_id, product_id, quantity, price)

Для каждой таблицы:
• Напиши CREATE TABLE с правильными типами и ограничениями
• Укажи PRIMARY KEY и FOREIGN KEY
• Добавь NOT NULL там, где поле обязательно

После создания вставь тестовые данные и напиши запрос:
"Общая выручка по каждой категории товаров за все заказы"`}]},20:{title:"Сети и REST API — практика с реальным API",tasks:[{num:1,title:"Знакомство с JSONPlaceholder",description:`JSONPlaceholder — бесплатный фейковый REST API для тренировки. Не требует регистрации.

Базовый URL: https://jsonplaceholder.typicode.com

Доступные ресурсы:
• /posts       — 100 публикаций
• /users       — 10 пользователей
• /comments    — 500 комментариев
• /todos       — 200 задач
• /albums      — 100 альбомов
• /photos      — 5000 фото

Сделай следующие GET-запросы прямо в браузере (просто открой ссылку):
1) Получи список всех пользователей: /users
2) Получи конкретного пользователя с id=3: /users/3
3) Получи все посты первого пользователя: /posts?userId=1

Что увидишь? Запиши в дневнике: структуру ответа (поля объекта, типы данных).`},{num:2,title:"GET-запросы через curl",description:`Открой терминал и выполни GET-запросы через curl:

# Получить одного пользователя
curl https://jsonplaceholder.typicode.com/users/1

# Получить все задачи (todos) конкретного пользователя
curl "https://jsonplaceholder.typicode.com/todos?userId=1"

# Красивый вывод JSON (если установлен jq):
curl https://jsonplaceholder.typicode.com/users/1 | python3 -m json.tool

Задание:
1) Найди пользователя с id=5 — как его зовут и из какого он города?
2) Сколько задач у пользователя с id=2? Сколько из них выполнено (completed: true)?`},{num:3,title:"POST-запрос с телом",description:`JSONPlaceholder принимает POST-запросы и возвращает "созданный" объект (данные не сохраняются, но API имитирует ответ).

Сделай POST-запрос для создания нового поста:

curl -X POST https://jsonplaceholder.typicode.com/posts \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Мой первый API-запрос",
    "body": "Это тело поста, созданного через REST API",
    "userId": 1
  }'

Что проверить в ответе:
• Какой статус-код вернул сервер?
• Какой id присвоил сервер новому посту?
• Как выглядит полный объект в ответе?

Дополнительно — попробуй также:
curl -X PUT https://jsonplaceholder.typicode.com/posts/1 \\
  -H "Content-Type: application/json" \\
  -d '{"id": 1, "title": "Обновлённый заголовок", "body": "Новое тело", "userId": 1}'`},{num:4,title:"Для тех, кто хочет углубиться: основные сетевые протоколы",description:`⚡ Это задание для тех, кто хочет понять, как работают сети глубже. Особенно важно для направлений: DevOps, Backend, Network Engineering, Cloud.

Изучи самостоятельно следующие протоколы:

TCP/IP — фундамент интернета
• Что такое трёхстороннее рукопожатие (SYN → SYN-ACK → ACK)?
• Почему TCP надёжен, а UDP — нет?
• Как данные делятся на пакеты и собираются обратно?

HTTPS/TLS — безопасность
• Как работает SSL/TLS-рукопожатие?
• Что такое сертификат и зачем он нужен?
• Симметричное vs асимметричное шифрование

FTP / SFTP — передача файлов
• Чем FTP отличается от SFTP?
• В каких случаях используют FTP сегодня?

SSH — защищённый доступ к серверам
• Как работает аутентификация по ключам?
• Чем SSH отличается от обычного пароля?

WebSocket — постоянное соединение
• Чем WebSocket отличается от HTTP?
• Когда нужен WebSocket (чат, трейдинг, игры)?

Для каких направлений IT это критически важно:
• DevOps / SRE — понимание сети на уровне пакетов обязательно
• Backend-разработка — TCP/IP, HTTPS, WebSocket нужны каждый день
• Кибербезопасность — без знания протоколов невозможно
• Network Engineering — это основная специальность
• Cloud / Инфраструктура — настройка load balancer, VPN, firewall

Формат ответа: напиши краткое описание каждого протокола своими словами (3-5 предложений).`}]}};function Zy({selectedDay:e,onBack:r}){const[n,s]=x.useState(mr);x.useEffect(()=>{ft.schedule().then(s).catch(()=>{})},[]);const i=e||1,l=pc[i]||{title:"Домашние задания",tasks:[]};function a(o){var u;const c=n.find(m=>m.day===o);return c&&c.title?c.title:((u=pc[o])==null?void 0:u.title)||`День ${o}`}return t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"theory-breadcrumbs",children:[t.jsx("button",{className:"breadcrumb-link",onClick:r,children:"📚 Библиотека знаний"}),t.jsx("span",{className:"breadcrumb-sep",children:"/"}),t.jsxs("span",{className:"breadcrumb-current",children:["День ",i," · ",a(i)]})]}),t.jsx("div",{style:{maxWidth:"900px",margin:"0 auto"},children:t.jsxs("div",{style:{marginTop:"24px"},children:[t.jsx("h2",{style:{fontSize:"18px",marginBottom:"16px"},children:l.title}),l.tasks.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)"},children:"Домашние задания еще не добавлены"}):t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:l.tasks.map((o,c)=>t.jsxs("div",{style:{padding:"16px",backgroundColor:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"8px"},children:[t.jsxs("h3",{style:{margin:"0 0 8px 0",fontSize:"16px"},children:["Задача ",o.num,": ",o.title]}),t.jsx("p",{style:{margin:0,color:"var(--text-secondary)",whiteSpace:"pre-wrap",lineHeight:"1.6"},children:o.description})]},c))})]})}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:r,children:"Вернуться в Библиотеку знаний"})})]})}function eg({onBack:e}){const[r,n]=x.useState([]),[s,i]=x.useState(!0);return x.useEffect(()=>{const l=Date.now(),a=500;ft.announcements().then(n).catch(()=>{}).finally(()=>{const o=Date.now()-l,c=Math.max(0,a-o);setTimeout(()=>i(!1),c)})},[]),t.jsxs("section",{className:"page active",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"Новости и обновления"}),t.jsx("p",{className:"page-subtitle",children:"Все объявления"})]}),t.jsx("div",{className:"widget",children:s?[1,2,3].map(l=>t.jsx(nh,{},l)):r.length===0?t.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:13,padding:"4px 0"},children:"Объявлений пока нет"}):r.map((l,a)=>t.jsxs("div",{className:"news-card fade-in",style:{animationDelay:`${a*.05}s`},children:[t.jsxs("div",{className:"news-card-head",children:[t.jsxs("span",{className:"news-card-title",children:[l.icon||"📢"," ",l.title]}),t.jsx("span",{className:"news-card-date",children:l.published_at})]}),t.jsx("div",{className:"news-card-text",children:l.text})]},l.id))}),t.jsx("div",{className:"theory-footer",children:t.jsx("button",{className:"btn-back",onClick:e,children:"← Вернуться на дэшборд"})})]})}function tg({q:e}){const[r,n]=x.useState(!1);return t.jsxs("div",{style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:10,padding:"16px 20px",marginBottom:10},children:[t.jsxs("p",{style:{color:"var(--text-primary)",fontWeight:500,fontSize:14,marginBottom:12},children:["❓ ",e.q]}),t.jsx("div",{style:{position:"relative"},children:t.jsx("p",{style:{color:"var(--text-secondary)",fontSize:13,lineHeight:1.6,filter:r?"none":"blur(6px)",userSelect:r?"auto":"none",transition:"filter 0.25s",margin:0,padding:"8px 12px",background:r?"rgba(200,255,0,0.05)":"rgba(0,0,0,0.2)",borderRadius:6,border:r?"1px solid rgba(200,255,0,0.15)":"1px solid transparent"},children:e.a})}),t.jsx("button",{onClick:()=>n(s=>!s),style:{marginTop:10,background:"transparent",border:"1px solid var(--border-color)",borderRadius:6,color:r?"var(--text-tertiary)":"var(--accent-lime)",fontSize:12,fontWeight:600,padding:"5px 14px",cursor:"pointer",transition:"border-color 0.15s, color 0.15s"},onMouseEnter:s=>s.currentTarget.style.borderColor="var(--accent-lime)",onMouseLeave:s=>s.currentTarget.style.borderColor="var(--border-color)",children:r?"Скрыть ↑":"Показать ответ →"})]})}function U({questions:e}){return t.jsxs("div",{style:{margin:"24px 0 8px",padding:"20px",background:"rgba(200,255,0,0.03)",border:"1px solid rgba(200,255,0,0.1)",borderRadius:12},children:[t.jsx("div",{style:{fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--accent-lime)",marginBottom:14,opacity:.8},children:"Самопроверка"}),e.map((r,n)=>t.jsx(tg,{q:r},n))]})}const q=({code:e,lang:r="python"})=>{const n=e.split(`
`);return t.jsxs("div",{className:"theory-code-block",children:[t.jsx("div",{className:"theory-code-label",children:r}),t.jsx("pre",{className:"theory-code",children:t.jsx("code",{children:n.map((s,i)=>{const l=s.indexOf("#");if(l===-1)return t.jsxs("span",{children:[s,i<n.length-1?`
`:""]},i);const a=s.slice(0,l),o=(a.match(/'/g)||[]).length,c=(a.match(/"/g)||[]).length;return o%2!==0||c%2!==0?t.jsxs("span",{children:[s,i<n.length-1?`
`:""]},i):t.jsxs("span",{children:[t.jsx("span",{style:{color:"var(--text-primary)"},children:s.slice(0,l)}),t.jsx("span",{style:{color:"#6b7280"},children:s.slice(l)}),i<n.length-1?`
`:""]},i)})})})]})},rg=({children:e})=>t.jsxs("div",{style:{background:"rgba(200,255,0,0.05)",border:"1px solid rgba(200,255,0,0.18)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13,lineHeight:1.7},children:[t.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700,marginRight:6},children:"💡"}),e]}),mc=({children:e})=>t.jsxs("div",{style:{background:"rgba(255,170,0,0.07)",border:"1px solid rgba(255,170,0,0.25)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13,lineHeight:1.7},children:[t.jsx("span",{style:{color:"#ffaa00",fontWeight:700,marginRight:6},children:"⚠️"}),e]}),ie=({id:e,children:r})=>t.jsx("h2",{id:e,style:{color:"var(--text-primary)",fontSize:"clamp(18px, 3vw, 22px)",fontWeight:700,margin:"40px 0 14px",paddingTop:8,borderBottom:"1px solid var(--border-color)",paddingBottom:10,scrollMarginTop:80},children:r}),Pe=({id:e,children:r})=>t.jsx("h3",{id:e,style:{color:"var(--text-primary)",fontSize:"clamp(14px, 2.5vw, 17px)",fontWeight:600,margin:"28px 0 10px",scrollMarginTop:80},children:r}),gt=({children:e,style:r})=>t.jsx("p",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.8,margin:"10px 0",...r},children:e}),ng=({items:e})=>t.jsx("ul",{style:{paddingLeft:20,margin:"10px 0"},children:e.map((r,n)=>t.jsx("li",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.8,marginBottom:4},children:r},n))}),jt=({caption:e,headers:r,rows:n,highlightCols:s=[],highlightRows:i=[]})=>t.jsxs("div",{style:{margin:"16px 0"},children:[e&&t.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:6,fontStyle:"italic"},children:e}),t.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8},children:t.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:"max-content"},children:[t.jsx("thead",{children:t.jsx("tr",{children:r.map((l,a)=>t.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:s.includes(a)?"rgba(200,255,0,0.18)":"var(--bg-secondary)",color:s.includes(a)?"var(--accent-lime)":"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontFamily:"monospace",fontWeight:700,whiteSpace:"nowrap"},children:l},a))})}),t.jsx("tbody",{children:n.map((l,a)=>t.jsx("tr",{style:{background:i.includes(a)?"rgba(200,255,0,0.08)":"transparent"},children:l.map((o,c)=>t.jsx("td",{style:{padding:"7px 14px",borderBottom:"1px solid var(--border-color)",color:s.includes(c)||i.includes(a)?"var(--text-primary)":"var(--text-secondary)",fontFamily:typeof o=="number"?"monospace":"inherit",whiteSpace:"nowrap"},children:o},c))},a))})]})})]}),It=({rows:e})=>t.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8,margin:"16px 0"},children:t.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[t.jsx("thead",{children:t.jsx("tr",{children:["Метод / атрибут","Описание","Пример"].map((r,n)=>t.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:"var(--bg-secondary)",color:"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontWeight:700},children:r},n))})}),t.jsx("tbody",{children:e.map(([r,n,s],i)=>t.jsxs("tr",{style:{borderBottom:"1px solid var(--border-color)"},children:[t.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--accent-lime)",whiteSpace:"nowrap"},children:r}),t.jsx("td",{style:{padding:"7px 14px",color:"var(--text-secondary)"},children:n}),t.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--text-secondary)",whiteSpace:"nowrap",fontSize:12},children:s})]},i))})]})}),sg=[{id:"intro",label:"1. Введение и установка"},{id:"series",label:"2. Series"},{id:"dataframe",label:"3. DataFrame"},{id:"io",label:"4. Чтение и запись данных"},{id:"explore",label:"5. Исследование данных"},{id:"indexing",label:"6. Индексация и выборка"},{id:"filtering",label:"7. Фильтрация"},{id:"missing",label:"8. Пропущенные значения"},{id:"columns",label:"9. Работа со столбцами"},{id:"types",label:"10. Типы данных"},{id:"sorting",label:"11. Сортировка"},{id:"groupby",label:"12. Группировка (groupby)"},{id:"apply",label:"13. apply / map"},{id:"merge",label:"14. Объединение данных"},{id:"strings",label:"15. Работа со строками"},{id:"datetime",label:"16. Даты и время"},{id:"pivot",label:"17. Pivot tables"},{id:"window",label:"18. Оконные функции"},{id:"performance",label:"19. Производительность"},{id:"cheatsheet",label:"20. Шпаргалка всех методов"}];function ig({onBack:e}){x.useEffect(()=>{window.scrollTo(0,0)},[]);const r=n=>{const s=document.getElementById(n);s&&s.scrollIntoView({behavior:"smooth"})};return t.jsxs("div",{style:{maxWidth:900,margin:"0 auto",padding:"clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)"},children:[t.jsx("button",{onClick:e,style:{background:"none",border:"1px solid var(--border-color)",color:"var(--text-secondary)",padding:"6px 14px",borderRadius:6,fontSize:13,cursor:"pointer",marginBottom:28,display:"inline-flex",alignItems:"center",gap:6},children:"← Назад к ликбезам"}),t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,padding:"clamp(20px, 4vw, 36px)",marginBottom:32},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:16,flexWrap:"wrap"},children:[t.jsx("div",{style:{background:"rgba(200,255,0,0.1)",border:"1px solid rgba(200,255,0,0.25)",borderRadius:8,padding:"6px 14px",color:"var(--accent-lime)",fontSize:12,fontWeight:700,letterSpacing:1},children:"PYTHON"}),t.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:12},children:"Junior → Middle"})]}),t.jsx("h1",{style:{fontFamily:"var(--font-syne)",fontSize:"clamp(24px, 5vw, 38px)",fontWeight:800,color:"var(--text-primary)",lineHeight:1.2,marginBottom:12},children:"Pandas — полный ликбез"}),t.jsx("p",{style:{color:"var(--text-secondary)",fontSize:15,lineHeight:1.7,maxWidth:640},children:"Всё необходимое для работы с данными в Python: от создания Series и DataFrame до группировки, объединения, работы с датами и оптимизации производительности."}),t.jsx("div",{style:{marginTop:20,display:"flex",gap:12,flexWrap:"wrap"},children:["pandas 2.x","Python 3.10+","~45 мин"].map(n=>t.jsx("span",{style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:6,padding:"4px 10px",fontSize:12,color:"var(--text-tertiary)"},children:n},n))})]}),t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:10,padding:"clamp(16px, 3vw, 24px)",marginBottom:40},children:[t.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:14},children:"Содержание"}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:"6px 24px"},children:sg.map(n=>t.jsx("button",{onClick:()=>r(n.id),style:{background:"none",border:"none",textAlign:"left",padding:"4px 0",color:"var(--text-secondary)",fontSize:13,cursor:"pointer",transition:"color 0.15s"},onMouseEnter:s=>s.target.style.color="var(--accent-lime)",onMouseLeave:s=>s.target.style.color="var(--text-secondary)",children:n.label},n.id))})]}),t.jsx(ie,{id:"intro",children:"1. Введение и установка"}),t.jsxs(gt,{children:[t.jsx("strong",{style:{color:"var(--text-primary)"},children:"Pandas"})," — главная библиотека Python для работы с табличными и временными данными. Она предоставляет два ключевых объекта: ",t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"Series"})," (одномерный массив) и ",t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"DataFrame"})," (двумерная таблица)."]}),t.jsx(q,{code:`pip install pandas          # базовая установка
pip install pandas openpyxl  # + поддержка Excel
pip install pandas pyarrow   # + Parquet / Arrow`,lang:"bash"}),t.jsx(q,{code:`import pandas as pd   # стандартное сокращение
import numpy as np    # часто используется вместе

print(pd.__version__)  # 2.x`}),t.jsx(U,{questions:[{q:"Что такое Pandas и для чего он используется?",a:"Pandas — библиотека Python для работы с табличными и временными данными. Она даёт удобные структуры (Series и DataFrame) и инструменты для загрузки, очистки, анализа и преобразования данных. Основа анализа данных и ML-пайплайнов."},{q:"Какие два главных объекта предоставляет Pandas?",a:"Series — одномерный массив с индексом (как один столбец). DataFrame — двумерная таблица, набор Series с общим индексом (как лист Excel или таблица SQL)."},{q:"Как принято импортировать Pandas?",a:"import pandas as pd — стандартное сокращение, которое использует всё сообщество. Часто рядом импортируют numpy as np, так как они работают вместе."}]}),t.jsx(ie,{id:"series",children:"2. Series"}),t.jsxs(gt,{children:[t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"Series"})," — это одномерный массив с метками (индексом). Думайте о нём как о столбце таблицы или о словаре, в котором ключи стали индексом."]}),t.jsx(q,{code:`# Создание из списка
s = pd.Series([10, 20, 30, 40])

# Создание с явным индексом
s = pd.Series(
    [10, 20, 30],
    index=['a', 'b', 'c'],
    name='score'
)

# Создание из словаря
s = pd.Series({'math': 90, 'english': 85, 'history': 78})

# Создание из скаляра (broadcast)
s = pd.Series(0, index=range(5))   # [0, 0, 0, 0, 0]`}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16,margin:"16px 0"},children:[t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:6},children:"s = pd.Series([10,20,30], index=['a','b','c'])"}),t.jsx(jt,{headers:["index","values"],rows:[["a",10],["b",20],["c",30]]})]}),t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:8,padding:16},children:[t.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:10},children:"Ключевые атрибуты"}),[["s.values","array([10, 20, 30])"],["s.index","Index(['a','b','c'])"],["s.dtype","int64"],["s.name","'score'"],["s.shape","(3,)"],["len(s)","3"]].map(([n,s])=>t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid var(--border-color)",fontSize:13},children:[t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:n}),t.jsx("code",{style:{fontFamily:"monospace",color:"var(--text-secondary)",fontSize:12},children:s})]},n))]})]}),t.jsx(q,{code:`# Доступ к элементам
s['a']        # по метке → 10
s[0]          # по позиции → 10 (устарело для строк-индексов)
s.iloc[0]     # по позиции → 10 (явный способ)
s.loc['a']    # по метке  → 10 (явный способ)

# Срезы
s['a':'b']    # 10, 20 (включая 'b')
s.iloc[0:2]   # 10, 20 (не включая 2)

# Арифметика (выравнивание по индексу)
s1 = pd.Series({'a': 1, 'b': 2})
s2 = pd.Series({'b': 10, 'c': 20})
s1 + s2  # a: NaN, b: 12, c: NaN`}),t.jsx(U,{questions:[{q:"Что такое Series в Pandas?",a:"Одномерный массив с метками-индексом. Можно думать о нём как о столбце таблицы или о словаре, где ключи стали индексом, а значения — данными."},{q:"Чем .loc[] отличается от .iloc[]?",a:".loc[] обращается по метке индекса (s.loc['a']), .iloc[] — по числовой позиции (s.iloc[0]). При строковом индексе для доступа по позиции нужен именно .iloc[]."},{q:"Что происходит при сложении двух Series с разными индексами?",a:"Pandas выравнивает значения по индексу: совпадающие метки складываются, а для меток, которые есть только в одной серии, результат будет NaN."}]}),t.jsx(ie,{id:"dataframe",children:"3. DataFrame"}),t.jsxs(gt,{children:[t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"DataFrame"})," — двумерная таблица. Каждый столбец — это ",t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"Series"})," с общим индексом."]}),t.jsx(q,{code:`# Из словаря списков
df = pd.DataFrame({
    'name':  ['Alice', 'Bob', 'Carol', 'Dave'],
    'age':   [24, 30, 22, 35],
    'score': [88.5, 92.0, 75.5, 95.0],
    'city':  ['Moscow', 'SPb', 'Moscow', 'Kazan'],
})

# Из списка словарей
df = pd.DataFrame([
    {'name': 'Alice', 'age': 24},
    {'name': 'Bob',   'age': 30},
])

# Из numpy-массива
import numpy as np
df = pd.DataFrame(
    np.arange(12).reshape(4, 3),
    columns=['A', 'B', 'C']
)

# Задать индекс при создании
df = pd.DataFrame(data, index=['r1', 'r2', 'r3'])`}),t.jsx(jt,{caption:"Пример: df с 4 строками",headers:["","name","age","score","city"],rows:[[0,"Alice",24,88.5,"Moscow"],[1,"Bob",30,92,"SPb"],[2,"Carol",22,75.5,"Moscow"],[3,"Dave",35,95,"Kazan"]]}),t.jsx(Pe,{children:"Атрибуты DataFrame"}),t.jsx(It,{rows:[["df.shape","Размер: (строки, столбцы)","(4, 4)"],["df.columns","Список столбцов","Index(['name','age',…])"],["df.index","Строковый индекс","RangeIndex(0, 4)"],["df.dtypes","Типы каждого столбца","name: object, age: int64…"],["df.values","numpy-массив всех данных","array([[…], …])"],["df.size","Общее число элементов","16"],["df.ndim","Размерность (всегда 2)","2"],["df.T","Транспонировать","—"]]}),t.jsx(U,{questions:[{q:"Что такое DataFrame?",a:"Двумерная таблица данных: строки с общим индексом и именованные столбцы. Каждый столбец — это Series. Аналог таблицы в Excel или базе данных."},{q:'Чем отличается df["col"] от df[["col"]]?',a:'df["col"] возвращает один столбец как Series. df[["col"]] с двойными скобками возвращает DataFrame (можно передать список из нескольких столбцов).'},{q:"Как из DataFrame получить только определённые столбцы?",a:'Передать список их имён: df[["name", "age"]]. Порядок в списке задаёт порядок столбцов в результате.'}]}),t.jsx(ie,{id:"io",children:"4. Чтение и запись данных"}),t.jsx(Pe,{children:"Чтение"}),t.jsx(q,{code:`# CSV
df = pd.read_csv('data.csv')
df = pd.read_csv(
    'data.csv',
    sep=';',             # разделитель
    encoding='utf-8',
    index_col='id',      # столбец → индекс
    usecols=['a', 'b'],  # только эти столбцы
    nrows=1000,          # первые N строк
    skiprows=[1, 2],     # пропустить строки
    na_values=['N/A', '?'],  # что считать NaN
    parse_dates=['date'],    # распарсить даты
    dtype={'age': int},      # явные типы
)

# Excel
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# JSON
df = pd.read_json('data.json')

# Parquet (быстро и компактно)
df = pd.read_parquet('data.parquet')

# SQL
import sqlite3
conn = sqlite3.connect('db.sqlite')
df = pd.read_sql('SELECT * FROM users', conn)

# Clipboard (удобно для отладки)
df = pd.read_clipboard()`}),t.jsx(Pe,{children:"Запись"}),t.jsx(q,{code:`df.to_csv('out.csv', index=False)        # без индекса
df.to_csv('out.csv', sep=';', encoding='utf-8')

df.to_excel('out.xlsx', index=False, sheet_name='Data')

df.to_json('out.json', orient='records', force_ascii=False)

df.to_parquet('out.parquet', index=False)

df.to_sql('table_name', conn, if_exists='replace', index=False)`}),t.jsx(U,{questions:[{q:"Каким методом прочитать CSV-файл в DataFrame?",a:'pd.read_csv("file.csv"). Для Excel — pd.read_excel(), для JSON — pd.read_json(), для SQL — pd.read_sql(). У read_csv много параметров: sep, encoding, usecols и др.'},{q:"Как сохранить DataFrame в CSV без столбца индекса?",a:'df.to_csv("file.csv", index=False). Параметр index=False убирает технический числовой индекс из файла, оставляя только данные.'},{q:'Что делать, если CSV использует другой разделитель, например ";"?',a:'Указать параметр sep: pd.read_csv("file.csv", sep=";"). Так часто оформляют файлы из европейского Excel, где запятая — десятичный знак.'}]}),t.jsx(ie,{id:"explore",children:"5. Исследование данных"}),t.jsx(gt,{children:"Первое, что делается при получении нового датасета — быстрое знакомство с его содержимым и структурой."}),t.jsx(q,{code:`df.head(5)      # первые 5 строк (по умолчанию)
df.tail(5)      # последние 5 строк
df.sample(5)    # 5 случайных строк
df.sample(frac=0.1)  # 10% случайных строк

df.shape        # (строки, столбцы) → (1000, 8)
df.info()       # типы, null-значения, память
df.describe()   # статистика числовых столбцов
df.describe(include='all')  # включая строковые
df.describe(include=[object])  # только строки

df.dtypes       # dtype каждого столбца
df.columns      # названия столбцов
df.index        # информация об индексе

df['city'].value_counts()           # частоты значений
df['city'].value_counts(normalize=True)  # в долях
df['city'].nunique()                # кол-во уникальных
df['city'].unique()                 # массив уникальных

df.isnull().sum()        # число NaN по столбцам
df.isnull().sum() / len(df)  # доля NaN

df.memory_usage(deep=True)  # память в байтах`}),t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:8,padding:16,margin:"16px 0",fontSize:13},children:[t.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:10},children:"ВЫВОД df.describe() для числовых столбцов"}),t.jsx(jt,{headers:["","age","score"],rows:[["count","4.000","4.000"],["mean","27.750","87.750"],["std","5.852","8.139"],["min","22.000","75.500"],["25%","23.500","85.375"],["50%","27.000","90.250"],["75%","31.250","92.625"],["max","35.000","95.000"]]})]}),t.jsx(U,{questions:[{q:"Какие методы используют при первом знакомстве с данными?",a:"df.head() — первые строки, df.info() — типы и пропуски, df.describe() — статистика числовых столбцов. Это стандартный первый шаг любого анализа."},{q:"Что показывает df.info()?",a:"Список столбцов, число непустых значений в каждом, типы данных (dtype) и объём занимаемой памяти. Помогает сразу увидеть пропуски и неверные типы."},{q:"Как быстро узнать число уникальных значений в столбце?",a:'df["col"].nunique() — количество уникальных значений, df["col"].value_counts() — частоту каждого значения. Полезно для категориальных признаков.'}]}),t.jsx(ie,{id:"indexing",children:"6. Индексация и выборка"}),t.jsxs(gt,{children:["Самая важная тема в pandas. Нужно чётко понимать разницу между ",t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"loc"})," и ",t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"iloc"}),"."]}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16,margin:"16px 0"},children:[t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid rgba(200,255,0,0.2)",borderRadius:8,padding:16},children:[t.jsx("div",{style:{color:"var(--accent-lime)",fontFamily:"monospace",fontWeight:700,marginBottom:8},children:"df.loc[ ]"}),t.jsxs("p",{style:{color:"var(--text-secondary)",fontSize:13,marginBottom:8},children:["Выборка по ",t.jsx("strong",{children:"меткам"})," (именам строк и столбцов). Конечный индекс ",t.jsx("strong",{children:"включается"}),"."]}),t.jsx(q,{code:`df.loc[0]          # строка 0
df.loc[0, 'name']  # конкретная ячейка
df.loc[0:2, 'age':'score']  # срез
df.loc[[0,2], ['name','city']]`})]}),t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid rgba(255,170,0,0.2)",borderRadius:8,padding:16},children:[t.jsx("div",{style:{color:"#ffaa00",fontFamily:"monospace",fontWeight:700,marginBottom:8},children:"df.iloc[ ]"}),t.jsxs("p",{style:{color:"var(--text-secondary)",fontSize:13,marginBottom:8},children:["Выборка по ",t.jsx("strong",{children:"позиции"})," (числовым индексам). Конечный индекс ",t.jsx("strong",{children:"НЕ включается"}),"."]}),t.jsx(q,{code:`df.iloc[0]         # строка 0
df.iloc[0, 1]      # строка 0, столбец 1
df.iloc[0:3, 1:3]  # срез строк и столбцов
df.iloc[[0,2], [0,2]]`})]})]}),t.jsx(q,{code:`# Выбор столбцов
df['name']          # Series одного столбца
df[['name', 'age']] # DataFrame нескольких столбцов
df.name             # атрибутный доступ (не рекомендуется)

# Выбор строк по условию (boolean indexing)
df[df['age'] > 25]
df[df['city'] == 'Moscow']

# Установка индекса
df2 = df.set_index('name')   # столбец name → индекс
df2.reset_index()             # индекс обратно в столбец

# Переиндексация
df.reindex([3, 1, 0, 2])    # изменить порядок строк
df.reindex(columns=['age', 'name', 'score', 'city'])`}),t.jsxs(mc,{children:["Не используйте цепочки индексации ",t.jsx("code",{style:{fontFamily:"monospace"},children:"df['col'][0] = val"})," — это ведёт к SettingWithCopyWarning. Всегда используйте ",t.jsx("code",{style:{fontFamily:"monospace"},children:"df.loc[0, 'col'] = val"}),"."]}),t.jsx(U,{questions:[{q:"Чем .loc[] отличается от .iloc[] в DataFrame?",a:'.loc[строка, столбец] обращается по меткам, .iloc[позиция, позиция] — по числовым индексам. Для фильтрации по условию используют .loc: df.loc[df["age"] > 18].'},{q:"Как выбрать конкретные строки и столбцы одновременно?",a:'df.loc[2:4, ["name", "age"]] — по меткам строк и именам столбцов, либо df.iloc[2:5, 0:2] — по числовым позициям. .loc включает правую границу, .iloc — нет.'},{q:"Почему рекомендуют использовать .loc/.iloc вместо цепочки []?",a:'Цепочка вида df[df.a>0]["b"] = 1 может менять копию, а не оригинал (SettingWithCopyWarning). .loc[] делает явную и безопасную выборку и присваивание.'}]}),t.jsx(ie,{id:"filtering",children:"7. Фильтрация"}),t.jsx(q,{code:`# Простые условия
df[df['age'] > 25]
df[df['city'] == 'Moscow']

# Несколько условий (& | ~ — НЕ and/or/not!)
df[(df['age'] > 25) & (df['score'] >= 90)]
df[(df['city'] == 'Moscow') | (df['city'] == 'SPb')]
df[~(df['city'] == 'Moscow')]  # инверсия

# query() — более читаемый синтаксис
df.query('age > 25')
df.query('city == "Moscow" and score >= 85')
df.query('age in [24, 30]')
df.query('score > @threshold')  # переменные через @

# isin() — проверка вхождения в список
df[df['city'].isin(['Moscow', 'SPb'])]
df[~df['city'].isin(['Kazan'])]   # исключить

# between() — диапазон включительно
df[df['age'].between(22, 30)]

# str.contains() — поиск по строке
df[df['name'].str.contains('Al')]
df[df['name'].str.startswith('A')]

# where() — заменяет не подходящие на NaN
df['score'].where(df['score'] >= 80)`}),t.jsx(jt,{caption:`df.query('city == "Moscow"') — выбранные строки`,headers:["","name","age","score","city"],rows:[[0,"Alice",24,88.5,"Moscow"],[2,"Carol",22,75.5,"Moscow"]],highlightRows:[0,1]}),t.jsx(U,{questions:[{q:"Как отфильтровать строки по условию age > 25?",a:'df[df["age"] > 25]. Внутри создаётся булева маска (True/False для каждой строки), и остаются только строки со значением True.'},{q:"Как объединить несколько условий фильтрации?",a:'Каждое условие в скобках, между ними & (и), | (или), ~ (не): df[(df["age"] > 25) & (df["city"] == "Москва")]. Обычные and/or здесь не работают.'},{q:"Что такое булева маска?",a:'Series из True/False той же длины, что и DataFrame. При передаче в df[mask] остаются строки, где True. Маску создаёт условие: df["age"] > 18.'}]}),t.jsx(ie,{id:"missing",children:"8. Пропущенные значения (NaN)"}),t.jsxs(gt,{children:["В реальных данных пропуски встречаются почти всегда. Pandas использует ",t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"NaN"})," (Not a Number) из NumPy для числовых столбцов и ",t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"None"})," / ",t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"pd.NA"})," для остальных."]}),t.jsx(q,{code:`# Обнаружение
df.isnull()             # True где NaN
df.notnull()            # True где НЕ NaN
df.isna().sum()         # кол-во NaN по столбцам
df.isna().sum().sum()   # всего NaN в DataFrame

# Удаление строк/столбцов с NaN
df.dropna()                        # строки с любым NaN
df.dropna(how='all')               # только если ВСЕ NaN
df.dropna(subset=['age', 'score']) # NaN в конкретных столбцах
df.dropna(thresh=3)                # оставить если ≥ 3 non-NaN

# Заполнение
df.fillna(0)                       # заполнить нулём
df.fillna({'age': 0, 'city': 'Unknown'})  # по столбцам
df['score'].fillna(df['score'].mean())     # средним

# Заполнение методами распространения
df.fillna(method='ffill')  # forward fill (предыдущим)
df.fillna(method='bfill')  # backward fill (следующим)
df['score'].interpolate()  # линейная интерполяция

# Замена конкретных значений
df.replace(-1, np.nan)
df.replace({'city': {'Msk': 'Moscow', 'Spb': 'SPb'}})`}),t.jsxs(rg,{children:[t.jsx("code",{style:{fontFamily:"monospace"},children:"dropna()"})," и ",t.jsx("code",{style:{fontFamily:"monospace"},children:"fillna()"})," по умолчанию возвращают новый DataFrame. Передайте ",t.jsx("code",{style:{fontFamily:"monospace"},children:"inplace=True"}),", чтобы изменить текущий — но лучше присваивайте результат: ",t.jsx("code",{style:{fontFamily:"monospace"},children:"df = df.fillna(0)"}),"."]}),t.jsx(U,{questions:[{q:"Как обозначаются пропущенные значения в Pandas?",a:"Как NaN (Not a Number). Найти их помогают df.isnull() и df.notnull(), а df.isnull().sum() покажет число пропусков в каждом столбце."},{q:"Чем fillna() отличается от dropna()?",a:'fillna(value) заменяет NaN на значение (0, среднее, "неизвестно"), сохраняя строки. dropna() удаляет строки или столбцы с пропусками. fillna безопаснее — не теряет данные.'},{q:"Как заполнить пропуски средним значением столбца?",a:'df["col"].fillna(df["col"].mean()). Для категориальных данных чаще используют моду или строку-заглушку вместо среднего.'}]}),t.jsx(ie,{id:"columns",children:"9. Работа со столбцами"}),t.jsx(q,{code:`# Добавить новый столбец
df['bonus'] = df['score'] * 0.1
df['full_info'] = df['name'] + ', ' + df['city']
df['is_senior'] = df['age'] > 30

# Вставить столбец на конкретную позицию
df.insert(2, 'rank', [4, 3, 1, 2])  # pos, name, values

# Удалить столбцы
df.drop('bonus', axis=1)            # один столбец
df.drop(['bonus', 'rank'], axis=1)  # несколько
del df['bonus']                     # in-place удаление

# Переименовать
df.rename(columns={'name': 'full_name', 'age': 'years'})
df.columns = ['a', 'b', 'c', 'd']  # переименовать все

# Переупорядочить столбцы
df = df[['name', 'score', 'age', 'city']]

# Скопировать столбец
df['score_copy'] = df['score'].copy()

# assign() — цепочки преобразований
df = (df
    .assign(bonus=df['score'] * 0.1)
    .assign(grade=lambda x: x['score'].apply(
        lambda s: 'A' if s >= 90 else 'B'
    ))
)`}),t.jsx(U,{questions:[{q:"Как создать новый столбец на основе существующих?",a:'Присвоить выражение: df["total"] = df["price"] * df["qty"]. Можно использовать арифметику над столбцами или apply для сложной логики.'},{q:"Как переименовать столбцы?",a:'df.rename(columns={"old": "new"}) переименует выбранные, а df.columns = [...] задаст все имена сразу. rename не меняет оригинал без inplace=True.'},{q:"Как удалить столбец из DataFrame?",a:'df.drop(columns=["col"]) или df.drop("col", axis=1). Чтобы изменить сам объект, добавляют inplace=True либо переприсваивают результат.'}]}),t.jsx(ie,{id:"types",children:"10. Типы данных"}),t.jsx(gt,{children:"Правильные типы данных экономят память и ускоряют операции."}),t.jsx(q,{code:`# Просмотр типов
df.dtypes

# Приведение типов
df['age'] = df['age'].astype(int)
df['score'] = df['score'].astype(float)
df['name'] = df['name'].astype(str)

# object → category (экономит память при малом числе уникальных значений)
df['city'] = df['city'].astype('category')
df['city'].cat.categories     # список категорий
df['city'].cat.codes          # числовые коды

# Числа в строки и обратно
pd.to_numeric(df['age'], errors='coerce')  # нечисловые → NaN
pd.to_datetime(df['date'], format='%Y-%m-%d')

# Проверка типа
df['age'].dtype          # dtype('int64')
pd.api.types.is_numeric_dtype(df['age'])     # True
pd.api.types.is_string_dtype(df['name'])     # True`}),t.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8,margin:"16px 0"},children:t.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[t.jsx("thead",{children:t.jsx("tr",{children:["dtype pandas","Описание","Память / эл-т","Когда использовать"].map(n=>t.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:"var(--bg-secondary)",color:"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontWeight:700},children:n},n))})}),t.jsx("tbody",{children:[["int8 / int16 / int32 / int64","Целые числа разного размера","1–8 байт","Счётчики, коды, возраст"],["float32 / float64","Числа с плавающей точкой","4–8 байт","Цены, проценты"],["bool","Логическое значение","1 байт","Флаги, маски"],["object","Python-объект (строки)","~50+ байт","Текст (сменить на string/category)"],["string","Строки (pd.StringDtype)","< object","Текст с явным NA"],["category","Перечисление","Очень мало","Повторяющиеся строки"],["datetime64[ns]","Дата и время","8 байт","Временные ряды"]].map((n,s)=>t.jsxs("tr",{children:[t.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--accent-lime)",borderBottom:"1px solid var(--border-color)"},children:n[0]}),t.jsx("td",{style:{padding:"7px 14px",color:"var(--text-secondary)",borderBottom:"1px solid var(--border-color)"},children:n[1]}),t.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--text-secondary)",borderBottom:"1px solid var(--border-color)"},children:n[2]}),t.jsx("td",{style:{padding:"7px 14px",color:"var(--text-secondary)",borderBottom:"1px solid var(--border-color)"},children:n[3]})]},s))})]})}),t.jsx(U,{questions:[{q:"Зачем приводить столбцы к правильным типам?",a:"Неверный тип замедляет работу и ломает операции: числа-строки нельзя суммировать, даты-строки нельзя сравнивать как даты. Правильные типы экономят память и ускоряют вычисления."},{q:"Как преобразовать столбец к числовому типу?",a:'pd.to_numeric(df["col"], errors="coerce"). Параметр errors="coerce" превращает непарсируемые значения в NaN вместо ошибки. Для общего приведения есть df["col"].astype(int).'},{q:"Что даёт тип category для строковых столбцов?",a:"Если строки часто повторяются (пол, город, статус), тип category хранит их как коды, экономя память и ускоряя группировку и сравнение."}]}),t.jsx(ie,{id:"sorting",children:"11. Сортировка"}),t.jsx(q,{code:`# Сортировка по значениям столбца
df.sort_values('age')                     # по возрастанию
df.sort_values('age', ascending=False)   # по убыванию

# По нескольким столбцам
df.sort_values(['city', 'score'], ascending=[True, False])

# NaN в конце или начале
df.sort_values('score', na_position='last')   # по умолчанию
df.sort_values('score', na_position='first')

# Сортировка по индексу
df.sort_index()               # по строковому индексу
df.sort_index(ascending=False)

# Топ N значений
df.nlargest(3, 'score')      # 3 строки с наибольшим score
df.nsmallest(2, 'age')       # 2 строки с наименьшим age

# rank() — ранжирование
df['rank'] = df['score'].rank(ascending=False, method='min')`}),t.jsx(jt,{caption:"df.sort_values('score', ascending=False)",headers:["","name","age","score","city"],rows:[[3,"Dave",35,95,"Kazan"],[1,"Bob",30,92,"SPb"],[0,"Alice",24,88.5,"Moscow"],[2,"Carol",22,75.5,"Moscow"]],highlightCols:[3]}),t.jsx(U,{questions:[{q:"Как отсортировать DataFrame по столбцу?",a:'df.sort_values("age") — по возрастанию, df.sort_values("age", ascending=False) — по убыванию. Можно сортировать по нескольким столбцам списком.'},{q:"Как сортировать по двум столбцам в разном порядке?",a:'df.sort_values(["city", "age"], ascending=[True, False]) — сначала по городу по возрастанию, внутри города по возрасту по убыванию.'},{q:"Чем sort_values отличается от sort_index?",a:"sort_values сортирует по значениям в столбцах, sort_index — по меткам индекса. Первый используют для упорядочивания данных, второй — для упорядочивания по индексу."}]}),t.jsx(ie,{id:"groupby",children:"12. Группировка (groupby)"}),t.jsxs(gt,{children:[t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"groupby()"})," работает по принципу «разбей → примени → собери» (split → apply → combine). Это самая мощная операция в pandas для агрегации."]}),t.jsx(q,{code:`# Базовая группировка
g = df.groupby('city')

# Одна агрегация
df.groupby('city')['score'].mean()
df.groupby('city')['score'].sum()
df.groupby('city')['age'].max()

# Несколько агрегаций сразу — agg()
df.groupby('city').agg({
    'score': ['mean', 'std', 'count'],
    'age':   ['min', 'max'],
})

# Переименование после agg
df.groupby('city').agg(
    avg_score=('score', 'mean'),
    total=('score', 'count'),
    max_age=('age', 'max'),
)

# Группировка по нескольким столбцам
df.groupby(['city', 'is_senior'])['score'].mean()

# transform() — применить функцию, сохранив индекс
df['city_avg'] = df.groupby('city')['score'].transform('mean')

# filter() — оставить только группы, прошедшие фильтр
df.groupby('city').filter(lambda x: x['score'].mean() > 85)`}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16,margin:"16px 0"},children:[t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:6},children:"df.groupby('city')['score'].mean()"}),t.jsx(jt,{headers:["city","score"],rows:[["Kazan",95],["Moscow",82],["SPb",92]]})]}),t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:6},children:"После transform — city_avg в каждой строке"}),t.jsx(jt,{headers:["name","city","score","city_avg"],rows:[["Alice","Moscow",88.5,82],["Bob","SPb",92,92],["Carol","Moscow",75.5,82],["Dave","Kazan",95,95]],highlightCols:[3]})]})]}),t.jsx(Pe,{children:"Стандартные агрегирующие функции"}),t.jsx(It,{rows:[["mean()","Среднее значение","g['score'].mean()"],["sum()","Сумма","g['score'].sum()"],["count()","Количество не-NaN","g['score'].count()"],["size()","Размер группы (с NaN)","g.size()"],["min()","Минимум","g['age'].min()"],["max()","Максимум","g['age'].max()"],["std()","Стандартное отклонение","g['score'].std()"],["var()","Дисперсия","g['score'].var()"],["median()","Медиана","g['score'].median()"],["first()","Первое значение","g['name'].first()"],["last()","Последнее значение","g['name'].last()"],["nunique()","Число уникальных","g['city'].nunique()"]]}),t.jsx(U,{questions:[{q:'Что делает df.groupby("city")["salary"].mean()?',a:"Группирует строки по уникальным значениям city и для каждой группы считает среднюю зарплату. Результат — Series: город → среднее значение."},{q:"Как применить несколько агрегаций сразу?",a:'df.groupby("city")["salary"].agg(["mean", "max", "count"]) или именованные агрегации .agg(avg=("salary","mean"), total=("salary","sum")).'},{q:"Что такое принцип split-apply-combine?",a:"Логика groupby: данные разбиваются на группы (split), к каждой применяется функция (apply), результаты собираются в итоговую таблицу (combine)."}]}),t.jsx(ie,{id:"apply",children:"13. apply / map / applymap"}),t.jsx(q,{code:`# map() — для Series (поэлементно)
df['name'].map(str.upper)
df['score'].map(lambda x: 'A' if x >= 90 else 'B')
df['city'].map({'Moscow': 'Мск', 'SPb': 'СПб'})  # через словарь

# apply() для Series — как map, но мощнее
df['score'].apply(lambda x: round(x))

# apply() для DataFrame по строкам (axis=1)
df.apply(lambda row: row['name'] + '_' + row['city'], axis=1)

# apply() для DataFrame по столбцам (axis=0, по умолчанию)
df[['age', 'score']].apply(lambda col: col - col.mean())

# applymap() / map() (pandas 2.1+) — для каждой ячейки DataFrame
df[['age', 'score']].map(lambda x: round(x, 1))

# Практические примеры
df['grade'] = df['score'].apply(
    lambda s: 'A' if s >= 90 else ('B' if s >= 80 else 'C')
)

# Векторизованные операции быстрее apply()
# Плохо:
df['score'].apply(lambda x: x * 2)
# Лучше:
df['score'] * 2`}),t.jsxs(mc,{children:[t.jsx("code",{style:{fontFamily:"monospace"},children:"apply()"})," — это Python-цикл. Если есть векторизованный аналог (арифметика, ",t.jsx("code",{style:{fontFamily:"monospace"},children:"str."}),", ",t.jsx("code",{style:{fontFamily:"monospace"},children:"dt."}),", numpy-функции), используйте его — он в 10–100 раз быстрее."]}),t.jsx(U,{questions:[{q:"Когда использовать apply() вместо векторных операций?",a:"apply() медленнее, поэтому его берут только для сложной логики, которую нельзя выразить векторно (через +, *, str-методы). Где возможно — векторные операции быстрее."},{q:"Чем map() отличается от apply()?",a:"map() работает только с Series и подходит для простых поэлементных преобразований. apply() работает и с Series, и со строками/столбцами DataFrame (через axis)."},{q:"Что делает axis=1 в df.apply(func, axis=1)?",a:"Функция применяется к каждой строке целиком (а не к столбцу). Это позволяет вычислять значение на основе нескольких столбцов одной строки."}]}),t.jsx(ie,{id:"merge",children:"14. Объединение данных"}),t.jsx(Pe,{children:"pd.concat() — склеить по оси"}),t.jsx(q,{code:`# Вертикально (добавить строки)
df_all = pd.concat([df1, df2], ignore_index=True)
df_all = pd.concat([df1, df2], ignore_index=True, sort=False)

# Горизонтально (добавить столбцы)
df_wide = pd.concat([df1, df2], axis=1)

# Несколько датафреймов
pd.concat([df1, df2, df3], ignore_index=True)`}),t.jsx(Pe,{children:"pd.merge() — JOIN по ключу"}),t.jsx(q,{code:`# INNER JOIN (пересечение)
result = pd.merge(df_left, df_right, on='id')

# LEFT JOIN
result = pd.merge(df_left, df_right, on='id', how='left')

# RIGHT JOIN
result = pd.merge(df_left, df_right, on='id', how='right')

# OUTER JOIN (объединение)
result = pd.merge(df_left, df_right, on='id', how='outer')

# Ключи называются по-разному
pd.merge(df1, df2, left_on='user_id', right_on='id')

# По нескольким ключам
pd.merge(df1, df2, on=['city', 'date'])

# Указатели на совпадающие столбцы (не ключи)
pd.merge(df1, df2, on='id', suffixes=('_left', '_right'))`}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:12,margin:"16px 0"},children:[{label:"LEFT",color:"rgba(200,255,0,0.15)",desc:"Все строки левого + совпадения правого"},{label:"INNER",color:"rgba(100,200,255,0.12)",desc:"Только строки с совпадением в обоих"},{label:"RIGHT",color:"rgba(255,100,100,0.12)",desc:"Все строки правого + совпадения левого"},{label:"OUTER",color:"rgba(200,100,255,0.12)",desc:"Все строки обоих, NaN где нет совпадения"}].map(({label:n,color:s,desc:i})=>t.jsxs("div",{style:{background:s,border:"1px solid var(--border-color)",borderRadius:8,padding:14,textAlign:"center"},children:[t.jsxs("div",{style:{fontFamily:"monospace",fontWeight:700,color:"var(--text-primary)",marginBottom:6},children:["how='",n.toLowerCase(),"'"]}),t.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)"},children:i})]},n))}),t.jsx(Pe,{children:"df.join() — объединить по индексу"}),t.jsx(q,{code:`# join по умолчанию использует индексы
df1.join(df2, how='left')
df1.join(df2, on='city')  # из df1 использовать столбец city`}),t.jsx(U,{questions:[{q:"Чем merge() отличается от concat()?",a:"merge() соединяет таблицы по ключевому столбцу (как SQL JOIN). concat() просто склеивает таблицы по строкам или столбцам без сопоставления ключей."},{q:"Что делает параметр how в merge()?",a:'Задаёт тип соединения: "inner" (только совпадения), "left" (все из левой), "right" (все из правой), "outer" (все строки обеих таблиц). По умолчанию inner.'},{q:"Как объединить два DataFrame по вертикали (друг под другом)?",a:"pd.concat([df1, df2]) с axis=0 (по умолчанию). Столбцы сопоставляются по именам; ignore_index=True пересоберёт индекс заново."}]}),t.jsx(ie,{id:"strings",children:"15. Работа со строками (str accessor)"}),t.jsxs(gt,{children:["Все строковые операции доступны через атрибут ",t.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:".str"})," — они векторизованы и корректно обрабатывают NaN."]}),t.jsx(q,{code:`s = df['name']

s.str.upper()            # ALICE, BOB, …
s.str.lower()            # alice, bob, …
s.str.title()            # Alice, Bob, …
s.str.strip()            # убрать пробелы по краям
s.str.lstrip('A')        # убрать символ слева
s.str.replace('o', '0')  # замена
s.str.replace(r'd', '', regex=True)  # regex

s.str.len()              # длина строки
s.str.contains('li')     # bool Series
s.str.startswith('A')    # bool Series
s.str.endswith('e')      # bool Series
s.str.count('l')         # кол-во вхождений

s.str.split(',')         # разбить → списки
s.str.split(',', expand=True)  # → DataFrame
s.str.join(', ')         # склеить элементы списков
s.str.get(0)             # первый элемент (если список)

s.str[0]                 # первый символ каждой строки
s.str[1:3]               # срез символов

s.str.extract(r'(w+)_(d+)')  # regex группы → DataFrame
s.str.findall(r'd+')           # все совпадения → списки

s.str.pad(10, fillchar='*')     # дополнить до длины
s.str.zfill(5)                  # дополнить нулями слева`}),t.jsx(U,{questions:[{q:"Как применить строковый метод ко всему столбцу?",a:'Через аксессор .str: df["name"].str.lower(), .str.strip(), .str.upper(). Он применяет операцию к каждому значению столбца сразу.'},{q:"Как проверить, содержит ли строка подстроку?",a:'df["city"].str.contains("Моск") возвращает булеву Series. Её используют для фильтрации: df[df["city"].str.contains("Моск")].'},{q:"Как разбить строку на части по разделителю?",a:'df["fio"].str.split(" ") вернёт списки, а с параметром expand=True — отдельные столбцы. Удобно для разбора ФИО, адресов и т.п.'}]}),t.jsx(ie,{id:"datetime",children:"16. Даты и время"}),t.jsx(q,{code:`# Создание дат
dates = pd.to_datetime(['2024-01-15', '2024-03-22'])
df['date'] = pd.to_datetime(df['date_str'], format='%d.%m.%Y')

# Генерация дат
pd.date_range('2024-01-01', periods=12, freq='M')  # 12 месяцев
pd.date_range('2024-01-01', '2024-12-31', freq='D')  # каждый день
pd.date_range('2024-01-01', periods=5, freq='B')   # рабочие дни`}),t.jsx(q,{code:`# Атрибуты через .dt accessor
df['date'].dt.year
df['date'].dt.month
df['date'].dt.day
df['date'].dt.hour
df['date'].dt.minute
df['date'].dt.second
df['date'].dt.dayofweek    # 0=Пн, 6=Вс
df['date'].dt.day_name()   # 'Monday', …
df['date'].dt.month_name() # 'January', …
df['date'].dt.quarter      # 1–4
df['date'].dt.is_month_end # bool
df['date'].dt.weekday      # alias для dayofweek

# Арифметика с датами
df['date'] + pd.Timedelta(days=7)
(df['end_date'] - df['start_date']).dt.days

# Временные ряды — resample()
# Нужен DatetimeIndex
df = df.set_index('date')
df['revenue'].resample('M').sum()    # по месяцам
df['revenue'].resample('Q').mean()   # по кварталам
df['revenue'].resample('D').ffill()  # заполнить по дням

# Сдвиг
df['score'].shift(1)   # сдвиг на 1 вперёд (предыдущее значение)
df['score'].shift(-1)  # сдвиг на 1 назад (следующее значение)
df['score'].diff()     # разница с предыдущей строкой`}),t.jsx(U,{questions:[{q:"Как преобразовать столбец со строками-датами в тип datetime?",a:'pd.to_datetime(df["date"]). После этого становится доступен аксессор .dt для работы с компонентами даты и времени.'},{q:"Как выделить год, месяц и день из даты?",a:'Через аксессор .dt: df["date"].dt.year, .dt.month, .dt.day. Также доступны .dt.hour, .dt.dayofweek и другие компоненты.'},{q:"Зачем устанавливать дату как индекс DataFrame?",a:'С DatetimeIndex доступны срезы по датам (df["2024-01"]), ресемплинг (resample) и удобная работа с временными рядами — группировка по дням, месяцам, годам.'}]}),t.jsx(ie,{id:"pivot",children:"17. Pivot tables"}),t.jsx(q,{code:`# pivot_table — сводная таблица
pt = df.pivot_table(
    values='score',
    index='city',
    columns='grade',     # если есть столбец 'grade'
    aggfunc='mean',      # 'sum', 'count', np.mean и т.д.
    fill_value=0,        # вместо NaN
    margins=True,        # добавить итоги (All)
)

# pivot — без агрегации (уникальные комбинации)
df.pivot(index='name', columns='subject', values='score')

# crosstab — частоты / кросстаб
pd.crosstab(df['city'], df['grade'])
pd.crosstab(df['city'], df['grade'], normalize='index')  # доли

# stack / unstack — трансформация индексов
df.stack()    # столбцы → уровень индекса
df.unstack()  # уровень индекса → столбцы

# melt — wide → long
df_long = df.melt(
    id_vars=['name', 'city'],
    value_vars=['score', 'age'],
    var_name='metric',
    value_name='value',
)`}),t.jsx(jt,{caption:"Пример pivot_table: средний score по city × grade",headers:["city","A","B","C","All"],rows:[["Kazan",95,"—","—",95],["Moscow","—",88.5,75.5,82],["SPb",92,"—","—",92],["All",93.5,88.5,75.5,87.75]],highlightRows:[3]}),t.jsx(U,{questions:[{q:"Чем pivot_table() отличается от pivot()?",a:"pivot() просто переставляет данные и требует уникальных комбинаций. pivot_table() умеет агрегировать (sum, mean) и корректно обрабатывает дубликаты."},{q:"Что задают параметры index, columns и values в pivot_table?",a:"index — что станет строками, columns — что станет столбцами, values — какие значения агрегировать. aggfunc определяет функцию агрегации (по умолчанию mean)."},{q:"Что делает параметр margins=True?",a:'Добавляет строку и столбец "All" с итогами по всем группам — удобно для сводных отчётов с общими суммами или средними.'}]}),t.jsx(ie,{id:"window",children:"18. Оконные функции"}),t.jsx(q,{code:`# rolling() — скользящее окно
df['score'].rolling(window=3).mean()   # скользящее среднее
df['score'].rolling(window=3).sum()
df['score'].rolling(window=3).std()
df['score'].rolling(window=3, min_periods=1).mean()  # неполные окна

# expanding() — расширяющееся окно (нарастающий итог)
df['score'].expanding().mean()
df['score'].expanding().sum()
df['score'].expanding().max()

# ewm() — экспоненциальное скользящее среднее
df['score'].ewm(span=3).mean()

# Пример: скользящее среднее продаж за 7 дней
df = df.set_index('date')
df['revenue_7d'] = df['revenue'].rolling('7D').mean()

# cumsum, cumprod, cummax, cummin
df['score'].cumsum()   # нарастающая сумма
df['score'].cummax()   # нарастающий максимум`}),t.jsx(jt,{caption:"rolling(window=3).mean() — скользящее среднее",headers:["день","score","rolling_mean_3"],rows:[[1,80,"NaN"],[2,85,"NaN"],[3,90,"85.0"],[4,70,"81.7"],[5,95,"85.0"]],highlightCols:[2]}),t.jsx(U,{questions:[{q:"Что такое скользящее среднее и как его посчитать?",a:'Среднее за последние N значений. df["col"].rolling(window=7).mean() даёт скользящее среднее за 7 периодов — сглаживает колебания во временных рядах.'},{q:"Чем rolling() отличается от expanding()?",a:"rolling(N) использует фиксированное окно из N последних значений. expanding() использует окно от начала до текущей строки, которое растёт. expanding().mean() — накопленное среднее."},{q:"Что делает метод shift()?",a:'Сдвигает значения столбца вверх или вниз: df["col"].shift(1) даёт значение предыдущей строки. Используется для расчёта изменений и сравнения с прошлым периодом.'}]}),t.jsx(ie,{id:"performance",children:"19. Производительность"}),t.jsx(ng,{items:["Используйте vectorized-операции вместо циклов и apply()","Задавайте типы данных явно: int32 вместо int64, category вместо object","Читайте только нужные столбцы: usecols=[…] в read_csv()","Используйте Parquet или Feather вместо CSV для больших файлов","query() и eval() компилируются в нативный код и работают быстрее","При работе с большими данными рассмотрите Polars или Dask"]}),t.jsx(q,{code:`# eval() — быстрые арифметические операции
df.eval('profit = revenue - cost')
df.eval('profit = revenue - cost', inplace=True)

# Сравнение производительности
# Медленно (Python-цикл):
result = [x * 2 for x in df['score']]

# Быстро (векторизация):
result = df['score'] * 2

# Быстро (apply только когда нет вектора):
df['grade'] = df['score'].apply(lambda x: 'A' if x >= 90 else 'B')

# Ещё быстрее:
df['grade'] = 'B'
df.loc[df['score'] >= 90, 'grade'] = 'A'

# Оценка памяти
df.memory_usage(deep=True).sum() / 1024**2  # МБ

# Оптимизация типов
def optimize_dtypes(df):
    for col in df.select_dtypes('object').columns:
        if df[col].nunique() / len(df) < 0.5:
            df[col] = df[col].astype('category')
    for col in df.select_dtypes('int64').columns:
        df[col] = pd.to_numeric(df[col], downcast='integer')
    return df`}),t.jsx(U,{questions:[{q:"Почему стоит избегать iterrows() и циклов по строкам?",a:"iterrows() очень медленный — обходит строки в Python-цикле и теряет преимущества векторизации NumPy. Лучше использовать векторные операции, apply или np.where."},{q:"Как уменьшить расход памяти большого DataFrame?",a:'Приводить числовые столбцы к меньшим типам (int32, float32) через astype, а повторяющиеся строки — к category. df.info(memory_usage="deep") покажет реальный размер.'},{q:"Что быстрее: векторная операция или apply?",a:'Векторная операция (df["a"] + df["b"]) почти всегда быстрее, так как выполняется на уровне NumPy в C. apply работает поэлементно в Python и медленнее.'}]}),t.jsx(ie,{id:"cheatsheet",children:"20. Шпаргалка всех методов"}),t.jsx(Pe,{children:"Создание"}),t.jsx(It,{rows:[["pd.Series(data)","Создать Series","pd.Series([1,2,3])"],["pd.DataFrame(data)","Создать DataFrame","pd.DataFrame({…})"],["pd.read_csv(path)","Прочитать CSV","pd.read_csv('f.csv')"],["pd.read_excel(path)","Прочитать Excel","pd.read_excel('f.xlsx')"],["pd.read_parquet(path)","Прочитать Parquet","pd.read_parquet('f.pq')"],["pd.date_range(…)","Диапазон дат","pd.date_range('2024', periods=5)"],["pd.concat([df1,df2])","Склеить DataFrameы","pd.concat([df1,df2])"],["pd.merge(df1,df2,on=…)","Объединить по ключу","pd.merge(a,b,on='id')"]]}),t.jsx(Pe,{children:"Просмотр"}),t.jsx(It,{rows:[["df.head(n)","Первые n строк","df.head(10)"],["df.tail(n)","Последние n строк","df.tail(5)"],["df.sample(n)","Случайные n строк","df.sample(3)"],["df.info()","Типы и null-значения","df.info()"],["df.describe()","Статистика столбцов","df.describe()"],["df.shape","Размер (строки, столбцы)","df.shape"],["df.dtypes","Типы данных столбцов","df.dtypes"],["df.value_counts()","Частоты значений","df['city'].value_counts()"]]}),t.jsx(Pe,{children:"Выборка и фильтрация"}),t.jsx(It,{rows:[["df.loc[…]","Выборка по меткам","df.loc[0, 'name']"],["df.iloc[…]","Выборка по позиции","df.iloc[0, 1]"],["df.query(expr)","Фильтр через строку","df.query('age > 25')"],["df.isin(vals)","Проверка вхождения","df['city'].isin(['Msk'])"],["df.between(a,b)","Проверка диапазона","df['age'].between(20,30)"],["df.duplicated()","Найти дубликаты","df.duplicated()"],["df.drop_duplicates()","Удалить дубликаты","df.drop_duplicates()"]]}),t.jsx(Pe,{children:"Преобразование"}),t.jsx(It,{rows:[["df.sort_values(by)","Сортировать по столбцу","df.sort_values('age')"],["df.rename(columns=…)","Переименовать столбцы","df.rename(columns={'a':'b'})"],["df.drop(cols, axis=1)","Удалить столбцы","df.drop('col', axis=1)"],["df.astype(dtype)","Привести тип","df['age'].astype(int)"],["df.apply(func)","Применить функцию","df.apply(lambda r: …, axis=1)"],["df.map(func)","Поэлементно для Series","s.map(str.upper)"],["df.assign(**cols)","Добавить столбцы","df.assign(bonus=df.score*0.1)"],["df.pipe(func)","Цепочка функций","df.pipe(clean).pipe(transform)"]]}),t.jsx(Pe,{children:"Пропущенные значения"}),t.jsx(It,{rows:[["df.isna() / isnull()","Маска пропущенных","df.isna().sum()"],["df.dropna()","Удалить строки с NaN","df.dropna(subset=['age'])"],["df.fillna(val)","Заполнить NaN","df.fillna(0)"],["df.interpolate()","Линейная интерполяция","df['x'].interpolate()"],["df.replace(old,new)","Заменить значения","df.replace(-1, np.nan)"]]}),t.jsx(Pe,{children:"Агрегация"}),t.jsx(It,{rows:[["df.groupby(col)","Группировка","df.groupby('city')"],["g.agg({col: funcs})","Несколько агрегаций","g.agg({'score': 'mean'})"],["g.transform(func)","Сохранить форму df","g['score'].transform('mean')"],["df.pivot_table(…)","Сводная таблица","df.pivot_table(values='s',…)"],["df.melt(…)","Wide → Long","df.melt(id_vars=['name'])"],["df.crosstab(…)","Таблица частот","pd.crosstab(df.a, df.b)"]]}),t.jsx(U,{questions:[{q:"Какие три метода всегда применяют при первом взгляде на данные?",a:"df.head() — первые строки, df.info() — типы и пропуски, df.describe() — статистика. Это базовый старт любого разведочного анализа (EDA)."},{q:"Какой метод покажет частоту значений в столбце?",a:'df["col"].value_counts() — частоту каждого уникального значения по убыванию. С normalize=True вернёт доли вместо абсолютных чисел.'},{q:"Чем фильтрация по маске отличается от .query()?",a:`Маска: df[df["age"] > 18]. query() позволяет писать условие строкой: df.query("age > 18 and city == 'Москва'"). query короче и читабельнее для сложных условий.`}]}),t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid rgba(200,255,0,0.15)",borderRadius:10,padding:"clamp(16px, 3vw, 24px)",margin:"40px 0 20px",textAlign:"center"},children:[t.jsx("div",{style:{color:"var(--accent-lime)",fontWeight:700,fontSize:16,marginBottom:8},children:"Официальная документация"}),t.jsx("p",{style:{color:"var(--text-secondary)",fontSize:13,marginBottom:12},children:"pandas.pydata.org — User Guide, API Reference и примеры от разработчиков"}),t.jsx("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"},children:["pandas.pydata.org/docs/","pandas.pydata.org/cheat_sheet.pdf"].map(n=>t.jsx("code",{style:{fontFamily:"monospace",fontSize:12,background:"var(--bg-tertiary)",padding:"4px 10px",borderRadius:4,color:"var(--text-secondary)"},children:n},n))})]})]})}const G=({code:e,lang:r="sql"})=>{const n=r==="sql"?"--":"#",s=e.split(`
`);return t.jsxs("div",{className:"theory-code-block",children:[t.jsx("div",{className:"theory-code-label",children:r}),t.jsx("pre",{className:"theory-code",children:t.jsx("code",{children:s.map((i,l)=>{const a=i.indexOf(n);if(a===-1)return t.jsxs("span",{children:[i,l<s.length-1?`
`:""]},l);const o=i.slice(0,a),c=(o.match(/'/g)||[]).length,d=(o.match(/"/g)||[]).length;return c%2!==0||d%2!==0?t.jsxs("span",{children:[i,l<s.length-1?`
`:""]},l):t.jsxs("span",{children:[t.jsx("span",{style:{color:"var(--text-primary)"},children:o}),t.jsx("span",{style:{color:"#6b7280"},children:i.slice(a)}),l<s.length-1?`
`:""]},l)})})})]})},lg=({children:e})=>t.jsxs("div",{style:{background:"rgba(200,255,0,0.05)",border:"1px solid rgba(200,255,0,0.18)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13,lineHeight:1.7},children:[t.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700,marginRight:6},children:"💡"}),e]}),Qi=({children:e})=>t.jsxs("div",{style:{background:"rgba(255,100,100,0.07)",border:"1px solid rgba(255,100,100,0.25)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13,lineHeight:1.7},children:[t.jsx("span",{style:{color:"#f87171",fontWeight:700,marginRight:6},children:"⚠️"}),e]}),ve=({id:e,children:r})=>t.jsx("h2",{id:e,style:{color:"var(--text-primary)",fontSize:"clamp(17px, 3vw, 21px)",fontWeight:700,margin:"44px 0 14px",paddingTop:8,borderBottom:"1px solid var(--border-color)",paddingBottom:10,scrollMarginTop:80},children:r}),ae=({id:e,children:r})=>t.jsx("h3",{id:e,style:{color:"var(--text-primary)",fontSize:"clamp(13px, 2vw, 16px)",fontWeight:600,margin:"26px 0 10px",scrollMarginTop:80},children:r}),Ee=({children:e,style:r})=>t.jsx("p",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.8,margin:"10px 0",...r},children:e}),ne=({name:e,cols:r,rows:n,hRows:s=[],hCols:i=[],caption:l})=>t.jsxs("div",{style:{margin:"18px 0"},children:[e&&t.jsx("div",{style:{display:"inline-block",background:"var(--accent-lime)",color:"#0a0a14",fontWeight:700,fontSize:12,padding:"3px 12px",borderRadius:"6px 6px 0 0",fontFamily:"monospace"},children:e}),t.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:e?"0 8px 8px 8px":8},children:t.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:"max-content"},children:[t.jsx("thead",{children:t.jsx("tr",{children:r.map((a,o)=>t.jsx("th",{style:{padding:"8px 14px",textAlign:"left",whiteSpace:"nowrap",background:i.includes(o)?"rgba(200,255,0,0.18)":"var(--bg-secondary)",color:i.includes(o)?"var(--accent-lime)":"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontFamily:"monospace",fontWeight:700},children:a},o))})}),t.jsx("tbody",{children:n.map((a,o)=>t.jsx("tr",{style:{background:s.includes(o)?"rgba(200,255,0,0.09)":"transparent"},children:a.map((c,d)=>t.jsx("td",{style:{padding:"7px 14px",borderBottom:"1px solid var(--border-color)",color:i.includes(d)||s.includes(o)?"var(--text-primary)":"var(--text-secondary)",whiteSpace:"nowrap",fontFamily:typeof c=="number"?"monospace":"inherit"},children:c},d))},o))})]})}),l&&t.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginTop:6,fontStyle:"italic"},children:l})]}),de=({label:e="Результат запроса",children:r})=>t.jsxs("div",{style:{margin:"6px 0 20px"},children:[t.jsx("div",{style:{fontSize:11,color:"var(--text-tertiary)",fontWeight:700,letterSpacing:.5,textTransform:"uppercase",marginBottom:6},children:e}),r]}),At=({rows:e})=>t.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8,margin:"14px 0"},children:t.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[t.jsx("thead",{children:t.jsx("tr",{children:["Команда / оператор","Что делает","Пример"].map((r,n)=>t.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:"var(--bg-secondary)",color:"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontWeight:700},children:r},n))})}),t.jsx("tbody",{children:e.map(([r,n,s],i)=>t.jsxs("tr",{style:{borderBottom:"1px solid var(--border-color)"},children:[t.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--accent-lime)",whiteSpace:"nowrap"},children:r}),t.jsx("td",{style:{padding:"7px 14px",color:"var(--text-secondary)"},children:n}),t.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--text-secondary)",fontSize:12,whiteSpace:"nowrap"},children:s})]},i))})]})}),Yi=({headers:e,rows:r})=>t.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8,margin:"14px 0"},children:t.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[t.jsx("thead",{children:t.jsx("tr",{children:e.map((n,s)=>t.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:"var(--bg-secondary)",color:s===0?"var(--text-secondary)":"var(--accent-lime)",borderBottom:"2px solid var(--border-color)",fontWeight:700},children:n},s))})}),t.jsx("tbody",{children:r.map((n,s)=>t.jsx("tr",{style:{borderBottom:"1px solid var(--border-color)"},children:n.map((i,l)=>t.jsx("td",{style:{padding:"7px 14px",color:l===0?"var(--text-secondary)":"var(--text-primary)",fontWeight:l===0?600:400},children:i},l))},s))})]})}),ag=[{id:"intro",label:"1. Что такое БД и SQL"},{id:"create",label:"2. CREATE TABLE"},{id:"insert",label:"3. INSERT — добавление данных"},{id:"select",label:"4. SELECT — выборка"},{id:"where",label:"5. WHERE — фильтрация"},{id:"orderby",label:"6. ORDER BY, LIMIT, DISTINCT"},{id:"aggregate",label:"7. Агрегатные функции"},{id:"groupby",label:"8. GROUP BY и HAVING"},{id:"update",label:"9. UPDATE и DELETE"},{id:"joins",label:"10. JOIN — соединение таблиц"},{id:"null",label:"11. NULL и COALESCE"},{id:"casewhen",label:"12. CASE WHEN"},{id:"subquery",label:"13. Подзапросы"},{id:"execorder",label:"14. Порядок выполнения"},{id:"databases",label:"15. Виды баз данных"},{id:"cheatsheet",label:"16. Шпаргалка"}],dt={cols:["id","name","age","city","email"],rows:[[1,"Анна",25,"Москва","anna@mail.ru"],[2,"Борис",31,"Казань","boris@ya.ru"],[3,"Вера",19,"Москва","vera@gmail.com"],[4,"Глеб",42,"Сочи","gleb@mail.ru"],[5,"Дина",28,"Казань","dina@ya.ru"],[6,"Егор",35,"Москва","egor@mail.ru"]]},fc={cols:["id","user_id","product","price","status"],rows:[[1,1,"Книга",500,"done"],[2,1,"Наушники",3e3,"done"],[3,2,"Мышка",1200,"pending"],[4,3,"Клавиатура",2500,"done"],[5,5,"Монитор",15e3,"done"],[6,6,"Веб-камера",4500,"pending"]]};function og({onBack:e}){x.useEffect(()=>{window.scrollTo(0,0)},[]);const r=n=>{const s=document.getElementById(n);s&&s.scrollIntoView({behavior:"smooth"})};return t.jsxs("div",{style:{maxWidth:920,margin:"0 auto",padding:"clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)"},children:[t.jsx("button",{onClick:e,style:{background:"none",border:"1px solid var(--border-color)",color:"var(--text-secondary)",padding:"6px 14px",borderRadius:6,fontSize:13,cursor:"pointer",marginBottom:28},children:"← Назад к ликбезам"}),t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,padding:"clamp(20px, 4vw, 36px)",marginBottom:32},children:[t.jsxs("div",{style:{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"},children:[t.jsx("div",{style:{background:"rgba(168,85,247,0.1)",border:"1px solid rgba(168,85,247,0.3)",borderRadius:8,padding:"6px 14px",color:"#c084fc",fontSize:12,fontWeight:700,letterSpacing:1},children:"DATABASE"}),t.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:12,display:"flex",alignItems:"center"},children:"Junior → Middle"})]}),t.jsx("h1",{style:{fontFamily:"var(--font-syne)",fontSize:"clamp(24px, 5vw, 38px)",fontWeight:800,color:"var(--text-primary)",lineHeight:1.2,marginBottom:12},children:"SQL — полный ликбез"}),t.jsx("p",{style:{color:"var(--text-secondary)",fontSize:15,lineHeight:1.7,maxWidth:640},children:"От создания таблиц до подзапросов и оконных функций. С визуальными примерами данных, подсветкой результатов и разбором различий между популярными СУБД."}),t.jsx("div",{style:{marginTop:20,display:"flex",gap:10,flexWrap:"wrap"},children:["SQL:2016","SQLite / PostgreSQL / MySQL","~50 мин"].map(n=>t.jsx("span",{style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:6,padding:"4px 10px",fontSize:12,color:"var(--text-tertiary)"},children:n},n))})]}),t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:10,padding:"clamp(16px, 3vw, 24px)",marginBottom:44},children:[t.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:14},children:"Содержание"}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:"6px 24px"},children:ag.map(n=>t.jsx("button",{onClick:()=>r(n.id),style:{background:"none",border:"none",textAlign:"left",padding:"4px 0",color:"var(--text-secondary)",fontSize:13,cursor:"pointer",transition:"color 0.15s"},onMouseEnter:s=>s.target.style.color="var(--accent-lime)",onMouseLeave:s=>s.target.style.color="var(--text-secondary)",children:n.label},n.id))})]}),t.jsx(ve,{id:"intro",children:"1. Что такое БД и SQL"}),t.jsxs(Ee,{children:[t.jsx("strong",{style:{color:"var(--text-primary)"},children:"База данных (БД)"})," — организованное хранилище данных, которым управляет специальная программа — СУБД (система управления базами данных). Почти каждое приложение хранит данные в БД: пользователи, заказы, посты, настройки."]}),t.jsxs(Ee,{children:[t.jsx("strong",{style:{color:"var(--text-primary)"},children:"SQL (Structured Query Language)"})," — язык запросов к реляционным базам данных. На нём описывают ",t.jsx("em",{children:"что"})," нужно получить, а не ",t.jsx("em",{children:"как"})," это найти."]}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12,margin:"20px 0"},children:[{label:"DDL",name:"Data Definition Language",cmds:"CREATE, ALTER, DROP",desc:"Создание и изменение структуры"},{label:"DML",name:"Data Manipulation Language",cmds:"INSERT, UPDATE, DELETE",desc:"Изменение данных"},{label:"DQL",name:"Data Query Language",cmds:"SELECT",desc:"Выборка данных"},{label:"DCL",name:"Data Control Language",cmds:"GRANT, REVOKE",desc:"Управление правами"}].map(n=>t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:8,padding:14},children:[t.jsx("div",{style:{fontFamily:"monospace",fontWeight:700,color:"var(--accent-lime)",fontSize:15,marginBottom:4},children:n.label}),t.jsx("div",{style:{fontSize:11,color:"var(--text-tertiary)",marginBottom:6},children:n.name}),t.jsx("div",{style:{fontFamily:"monospace",fontSize:12,color:"var(--text-primary)",marginBottom:4},children:n.cmds}),t.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)"},children:n.desc})]},n.label))}),t.jsxs(Ee,{children:["Реляционная БД хранит данные в ",t.jsx("strong",{style:{color:"var(--text-primary)"},children:"таблицах"})," — строки и столбцы, как в Excel. Таблицы могут быть связаны между собой. Вот пример двух таблиц, которые мы будем использовать на протяжении всего ликбеза:"]}),t.jsx(ne,{name:"users",cols:dt.cols,rows:dt.rows,caption:"Таблица пользователей — 6 записей, 5 полей"}),t.jsx(ne,{name:"orders",cols:fc.cols,rows:fc.rows,caption:"Таблица заказов — 6 записей, каждый заказ привязан к пользователю через user_id"}),t.jsx(U,{questions:[{q:"Чем база данных отличается от обычного файла Excel?",a:"БД рассчитана на одновременную работу многих пользователей, гарантирует целостность данных через ограничения и связи, и позволяет делать сложные запросы на языке SQL. Excel хорош для небольших таблиц, но не масштабируется и не обеспечивает надёжность транзакций."},{q:"Что такое SQL и для чего он нужен?",a:"SQL (Structured Query Language) — язык запросов к реляционным базам данных. С его помощью создают таблицы, добавляют, изменяют, удаляют и выбирают данные. Это стандарт, понятный большинству СУБД: PostgreSQL, MySQL, SQLite, SQL Server."},{q:"Что такое реляционная модель данных?",a:"Данные хранятся в таблицах (отношениях), состоящих из строк (записей) и столбцов (полей). Таблицы связаны между собой через ключи. Такая модель позволяет избегать дублирования и описывать связи между сущностями (пользователи ↔ заказы)."}]}),t.jsx(ve,{id:"create",children:"2. CREATE TABLE — создание таблиц"}),t.jsx(Ee,{children:"Прежде чем добавлять данные, нужно создать таблицу и описать её столбцы с типами."}),t.jsx(G,{code:`CREATE TABLE users (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT    NOT NULL,
    age     INTEGER CHECK (age >= 0),
    city    TEXT    DEFAULT 'Не указан',
    email   TEXT    UNIQUE NOT NULL
);

CREATE TABLE orders (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id  INTEGER NOT NULL,
    product  TEXT    NOT NULL,
    price    INTEGER CHECK (price > 0),
    status   TEXT    DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);`}),t.jsx(ae,{children:"Типы данных"}),t.jsx(Yi,{headers:["Тип","SQLite","PostgreSQL","MySQL","Что хранит"],rows:[["Целые числа","INTEGER","INTEGER / BIGINT","INT / BIGINT","id, возраст, количество"],["Числа с точкой","REAL","FLOAT / NUMERIC","FLOAT / DECIMAL","цены, координаты"],["Текст","TEXT","VARCHAR(n) / TEXT","VARCHAR(n) / TEXT","имена, описания"],["Булево","INTEGER (0/1)","BOOLEAN","TINYINT(1)","флаги, статусы"],["Дата и время","TEXT / INTEGER","TIMESTAMP / DATE","DATETIME","созданы, обновлены"],["Бинарные","BLOB","BYTEA","BLOB","файлы, картинки"]]}),t.jsx(ae,{children:"Ограничения (Constraints)"}),t.jsx(At,{rows:[["PRIMARY KEY","Уникальный идентификатор строки, не NULL","id INTEGER PRIMARY KEY"],["NOT NULL","Значение обязательно, не может быть NULL","name TEXT NOT NULL"],["UNIQUE","Значение не повторяется в таблице","email TEXT UNIQUE"],["DEFAULT","Значение по умолчанию если не указано","status TEXT DEFAULT 'pending'"],["CHECK","Проверка условия при вставке/обновлении","CHECK (price > 0)"],["FOREIGN KEY","Ссылка на первичный ключ другой таблицы","FOREIGN KEY (uid) REFERENCES users(id)"],["AUTOINCREMENT","Автоматическое увеличение числа (SQLite/MySQL)","id INTEGER PRIMARY KEY AUTOINCREMENT"]]}),t.jsx(G,{code:`-- Изменить таблицу после создания
ALTER TABLE users ADD COLUMN phone TEXT;       -- добавить столбец
ALTER TABLE users RENAME COLUMN phone TO tel;  -- переименовать (SQLite 3.25+)

-- Удалить таблицу полностью (осторожно!)
DROP TABLE IF EXISTS orders;

-- Удалить все данные, сохранив структуру
DELETE FROM users;   -- медленно, логируется
TRUNCATE TABLE users; -- быстро (не в SQLite)`}),t.jsx(U,{questions:[{q:"Зачем при создании таблицы указывают типы данных?",a:"Тип задаёт, какие значения можно хранить в столбце (INTEGER — числа, TEXT — строки, REAL — дробные, DATE — даты). Это экономит память, ускоряет запросы и защищает от ошибок — нельзя случайно записать текст туда, где ожидается число."},{q:"Что делает ограничение PRIMARY KEY?",a:"Делает столбец уникальным идентификатором строки: значения не могут повторяться и не могут быть NULL. По первичному ключу СУБД быстро находит конкретную запись и связывает таблицы через внешние ключи."},{q:"Чем NOT NULL отличается от DEFAULT?",a:"NOT NULL запрещает оставлять поле пустым — вставка без значения вызовет ошибку. DEFAULT задаёт значение по умолчанию, которое подставится автоматически, если значение не указано. Их часто используют вместе."}]}),t.jsx(ve,{id:"insert",children:"3. INSERT — добавление данных"}),t.jsx(G,{code:`-- Вставить одну строку
INSERT INTO users (name, age, city, email)
VALUES ('Анна', 25, 'Москва', 'anna@mail.ru');

-- Вставить несколько строк за один запрос (эффективнее)
INSERT INTO users (name, age, city, email) VALUES
('Борис',  31, 'Казань', 'boris@ya.ru'),
('Вера',   19, 'Москва', 'vera@gmail.com'),
('Глеб',   42, 'Сочи',   'gleb@mail.ru');

-- Вставить данные из другой таблицы
INSERT INTO users_archive (name, email)
SELECT name, email FROM users WHERE age > 40;`}),t.jsx(ne,{name:"users",cols:dt.cols,rows:dt.rows,hRows:[0,1,2,3],caption:"Первые 4 строки — только что вставленные данные"}),t.jsx(U,{questions:[{q:"Как добавить сразу несколько строк одним INSERT?",a:"Перечислить наборы значений через запятую: INSERT INTO users (name, age) VALUES ('Аня', 25), ('Боб', 30); Это быстрее и читабельнее, чем несколько отдельных INSERT."},{q:"Обязательно ли перечислять имена столбцов в INSERT?",a:"Не обязательно, если передаёшь значения для всех столбцов по порядку их объявления. Но указывать столбцы явно — хорошая практика: запрос не сломается при изменении структуры таблицы и его легче читать."},{q:"Что произойдёт при вставке дубля в столбец с PRIMARY KEY?",a:"СУБД вернёт ошибку нарушения уникальности и строка не будет добавлена. Первичный ключ не допускает повторяющихся значений — это гарантия уникальности каждой записи."}]}),t.jsx(ve,{id:"select",children:"4. SELECT — выборка данных"}),t.jsxs(Ee,{children:["SELECT — самая используемая команда SQL. Описывает ",t.jsx("em",{children:"что"})," и ",t.jsx("em",{children:"из какой таблицы"})," выбрать."]}),t.jsx(G,{code:`SELECT * FROM users;                        -- все столбцы
SELECT name, age FROM users;               -- конкретные столбцы
SELECT name AS "Имя", age AS "Возраст"    -- псевдонимы колонок
FROM users;`}),t.jsx(de,{children:t.jsx(ne,{cols:["name","age"],rows:[["Анна",25],["Борис",31],["Вера",19],["Глеб",42],["Дина",28],["Егор",35]],hCols:[0,1]})}),t.jsx(G,{code:`-- Вычисляемые колонки
SELECT
    name,
    age,
    age * 365 AS days_lived,          -- арифметика
    UPPER(name) AS name_upper,        -- функция строк
    ROUND(price * 1.2, 2) AS price_with_vat
FROM users;`}),t.jsx(U,{questions:[{q:"Чем SELECT * отличается от перечисления столбцов?",a:"SELECT * возвращает все столбцы — удобно для быстрой проверки, но в реальном коде лучше перечислять нужные столбцы: запрос быстрее, передаёт меньше данных и не ломается при изменении структуры таблицы."},{q:"Как задать псевдоним (алиас) для столбца?",a:"Через ключевое слово AS: SELECT price * 12 AS annual_price. Алиас задаёт удобное имя для столбца в результате. Слово AS можно опустить: SELECT price * 12 annual_price."},{q:"Можно ли в SELECT использовать вычисления?",a:"Да. Можно выполнять арифметику (price * 1.2), конкатенацию строк, вызывать функции (UPPER(name), ROUND(x)). Результат вычисления становится отдельным столбцом в выборке."}]}),t.jsx(ve,{id:"where",children:"5. WHERE — фильтрация строк"}),t.jsx(Ee,{children:"WHERE отбирает только те строки, которые удовлетворяют условию. Остальные отбрасываются."}),t.jsx(G,{code:`-- Сравнение
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE city = 'Москва';
SELECT * FROM users WHERE age != 19;

-- AND, OR, NOT
SELECT * FROM users WHERE age > 25 AND city = 'Казань';
SELECT * FROM users WHERE city = 'Москва' OR city = 'Сочи';
SELECT * FROM users WHERE NOT city = 'Казань';`}),t.jsx(de,{label:"WHERE age > 25 AND city = 'Казань'",children:t.jsx(ne,{cols:dt.cols,rows:dt.rows,hRows:[1,4],caption:"Борис (31, Казань) и Дина (28, Казань)"})}),t.jsx(G,{code:`-- IN — вхождение в список
SELECT * FROM users WHERE city IN ('Москва', 'Сочи');

-- NOT IN — исключение
SELECT * FROM users WHERE city NOT IN ('Казань');

-- BETWEEN — диапазон (включительно)
SELECT * FROM users WHERE age BETWEEN 25 AND 35;

-- LIKE — поиск по шаблону
SELECT * FROM users WHERE name LIKE 'А%';   -- начинается на А
SELECT * FROM users WHERE name LIKE '%а';   -- заканчивается на а
SELECT * FROM users WHERE email LIKE '%@ya.ru'; -- почта на ya.ru
SELECT * FROM users WHERE name LIKE 'Б_р_с'; -- _ — ровно 1 символ`}),t.jsx(de,{label:"WHERE city IN ('Москва', 'Сочи')",children:t.jsx(ne,{cols:dt.cols,rows:dt.rows,hRows:[0,2,3,5],caption:"Анна, Вера, Глеб, Егор — из Москвы или Сочи"})}),t.jsx(de,{label:"WHERE age BETWEEN 25 AND 35",children:t.jsx(ne,{cols:dt.cols,rows:dt.rows,hRows:[0,1,4,5],caption:"age >= 25 И age <= 35: Анна(25), Борис(31), Дина(28), Егор(35)"})}),t.jsx(lg,{children:"LIKE чувствителен к регистру в большинстве СУБД. В PostgreSQL используй ILIKE для регистронезависимого поиска."}),t.jsx(U,{questions:[{q:"Как отфильтровать строки по нескольким условиям одновременно?",a:"Через логические операторы AND и OR: WHERE age >= 18 AND city = 'Москва'. AND требует выполнения обоих условий, OR — хотя бы одного. Скобками управляют приоритетом."},{q:"Чем оператор IN удобнее цепочки OR?",a:"IN короче и читабельнее: WHERE city IN ('Москва', 'Питер', 'Казань') заменяет три условия через OR. Аналогично NOT IN исключает перечисленные значения."},{q:"Что делает оператор LIKE и подстановки % и _?",a:"LIKE ищет по шаблону строк. % заменяет любое количество символов ('А%' — всё, что начинается на А), _ заменяет ровно один символ. Используется для поиска по части текста."}]}),t.jsx(ve,{id:"orderby",children:"6. ORDER BY, LIMIT, DISTINCT"}),t.jsx(G,{code:`-- Сортировка
SELECT * FROM users ORDER BY age ASC;    -- по возрастанию (по умолчанию)
SELECT * FROM users ORDER BY age DESC;   -- по убыванию

-- По нескольким полям
SELECT * FROM users ORDER BY city ASC, age DESC;  -- сначала город, потом возраст

-- Ограничение числа строк
SELECT * FROM users ORDER BY age DESC LIMIT 3;    -- топ-3 старших
SELECT * FROM users LIMIT 10 OFFSET 20;           -- страница 3 (по 10 записей)

-- Уникальные значения
SELECT DISTINCT city FROM users;         -- список уникальных городов
SELECT DISTINCT city, age FROM users;    -- уникальные пары`}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:16,margin:"16px 0"},children:[t.jsx(de,{label:"ORDER BY age DESC LIMIT 3",children:t.jsx(ne,{cols:["name","age"],rows:[["Глеб",42],["Егор",35],["Борис",31]],hCols:[1]})}),t.jsx(de,{label:"SELECT DISTINCT city FROM users",children:t.jsx(ne,{cols:["city"],rows:[["Москва"],["Казань"],["Сочи"]],hRows:[0,1,2]})})]}),t.jsx(U,{questions:[{q:"Как отсортировать результат по убыванию?",a:"Добавить DESC после столбца: ORDER BY price DESC. По умолчанию сортировка идёт по возрастанию (ASC). Можно сортировать по нескольким столбцам: ORDER BY city ASC, age DESC."},{q:"Для чего нужен LIMIT?",a:"LIMIT ограничивает количество возвращаемых строк: ORDER BY price DESC LIMIT 5 даст 5 самых дорогих товаров. Вместе с OFFSET используется для постраничного вывода (пагинации)."},{q:"Что делает DISTINCT?",a:"Убирает дубликаты из результата, оставляя только уникальные значения: SELECT DISTINCT city FROM users вернёт список городов без повторов. Применяется ко всей комбинации выбранных столбцов."}]}),t.jsx(ve,{id:"aggregate",children:"7. Агрегатные функции"}),t.jsx(Ee,{children:"Агрегатные функции считают что-то по набору строк и возвращают одно значение."}),t.jsx(At,{rows:[["COUNT(*)","Количество строк","SELECT COUNT(*) FROM users"],["COUNT(col)","Количество строк где col не NULL","SELECT COUNT(email) FROM users"],["SUM(col)","Сумма значений","SELECT SUM(price) FROM orders"],["AVG(col)","Среднее значение","SELECT AVG(age) FROM users"],["MAX(col)","Максимум","SELECT MAX(age) FROM users"],["MIN(col)","Минимум","SELECT MIN(price) FROM orders"]]}),t.jsx(G,{code:`SELECT
    COUNT(*)        AS total_users,   -- 6
    AVG(age)        AS avg_age,       -- 30.0
    MAX(age)        AS max_age,       -- 42
    MIN(age)        AS min_age,       -- 19
    SUM(age)        AS sum_ages       -- 180
FROM users;`}),t.jsx(de,{children:t.jsx(ne,{cols:["total_users","avg_age","max_age","min_age","sum_ages"],rows:[[6,30,42,19,180]],hCols:[0,1,2,3,4]})}),t.jsx(U,{questions:[{q:"Какие основные агрегатные функции есть в SQL?",a:"COUNT — количество строк, SUM — сумма, AVG — среднее, MIN — минимум, MAX — максимум. Они сворачивают множество строк в одно итоговое значение."},{q:"Чем COUNT(*) отличается от COUNT(column)?",a:"COUNT(*) считает все строки, включая те, где есть NULL. COUNT(column) считает только строки, где этот столбец НЕ NULL. Для подсчёта заполненных значений используют второй вариант."},{q:"Игнорируют ли агрегатные функции значения NULL?",a:"Да, все агрегаты кроме COUNT(*) пропускают NULL. Например, AVG считает среднее только по заполненным значениям, а не делит на общее число строк. Это важно учитывать при расчётах."}]}),t.jsx(ve,{id:"groupby",children:"8. GROUP BY и HAVING"}),t.jsx(Ee,{children:"GROUP BY разбивает строки на группы по одинаковому значению, и агрегатная функция применяется к каждой группе отдельно."}),t.jsx(G,{code:`-- Сколько пользователей в каждом городе
SELECT city, COUNT(*) AS cnt
FROM users
GROUP BY city
ORDER BY cnt DESC;`}),t.jsx(de,{children:t.jsx(ne,{cols:["city","cnt"],rows:[["Москва",3],["Казань",2],["Сочи",1]],hCols:[1],caption:"Москва: Анна+Вера+Егор, Казань: Борис+Дина, Сочи: Глеб"})}),t.jsx(G,{code:`-- Несколько агрегатов сразу
SELECT city,
    COUNT(*)    AS users,
    AVG(age)    AS avg_age,
    MAX(age)    AS max_age
FROM users
GROUP BY city;`}),t.jsx(de,{children:t.jsx(ne,{cols:["city","users","avg_age","max_age"],rows:[["Казань",2,29.5,31],["Москва",3,26.3,35],["Сочи",1,42,42]],hCols:[1,2,3]})}),t.jsx(ae,{children:"HAVING — фильтрация групп"}),t.jsx(Ee,{children:"WHERE фильтрует строки ДО группировки. HAVING фильтрует группы ПОСЛЕ GROUP BY."}),t.jsx(G,{code:`-- Города с более чем 1 пользователем
SELECT city, COUNT(*) AS cnt
FROM users
GROUP BY city
HAVING COUNT(*) > 1;

-- Города со средним возрастом меньше 30
SELECT city, AVG(age) AS avg_age
FROM users
GROUP BY city
HAVING AVG(age) < 30;`}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16,margin:"16px 0"},children:[t.jsx(de,{label:"HAVING COUNT(*) > 1",children:t.jsx(ne,{cols:["city","cnt"],rows:[["Москва",3],["Казань",2]],hRows:[0,1],caption:"Сочи(1) отфильтрован"})}),t.jsx(de,{label:"HAVING AVG(age) < 30",children:t.jsx(ne,{cols:["city","avg_age"],rows:[["Казань",29.5],["Москва",26.3]],hRows:[0,1],caption:"Сочи(42) отфильтрован"})})]}),t.jsx(Qi,{children:"Нельзя писать WHERE после GROUP BY — используй HAVING. Нельзя использовать алиас из SELECT в HAVING — только исходные выражения."}),t.jsx(U,{questions:[{q:"Для чего нужен GROUP BY?",a:"Группирует строки с одинаковыми значениями в одну и позволяет применять агрегатные функции к каждой группе. Например, GROUP BY city + COUNT(*) даёт количество пользователей в каждом городе."},{q:"Чем HAVING отличается от WHERE?",a:"WHERE фильтрует строки ДО группировки, HAVING — группы ПОСЛЕ группировки. HAVING умеет работать с агрегатами: HAVING COUNT(*) > 10. WHERE с агрегатами работать не может."},{q:"Какие столбцы можно выбирать вместе с GROUP BY?",a:"Только те, по которым идёт группировка, и агрегатные функции. Выбирать необгруппированный столбец без агрегата нельзя — СУБД не знает, какое из множества значений группы показать."}]}),t.jsx(ve,{id:"update",children:"9. UPDATE и DELETE"}),t.jsx(G,{code:`-- Изменить город одного пользователя
UPDATE users
SET city = 'Санкт-Петербург'
WHERE id = 1;

-- Изменить несколько полей сразу
UPDATE users
SET city = 'Москва', age = age + 1
WHERE name = 'Дина';

-- Удалить конкретного пользователя
DELETE FROM users
WHERE id = 6;

-- Удалить пользователей старше 40
DELETE FROM users
WHERE age > 40;`}),t.jsx(Qi,{children:"ВСЕГДА добавляй WHERE в UPDATE и DELETE. Без WHERE изменятся или удалятся ВСЕ строки. Проверяй сначала через SELECT с тем же WHERE."}),t.jsx(G,{code:`-- Безопасный подход: сначала SELECT
SELECT * FROM users WHERE age > 40;  -- проверяем кто попадёт
-- Убедились? Тогда:
DELETE FROM users WHERE age > 40;`}),t.jsx(U,{questions:[{q:"Почему UPDATE без WHERE опасен?",a:"Без WHERE изменятся ВСЕ строки таблицы. Например, UPDATE users SET salary = 0 обнулит зарплату у всех. Всегда проверяй условие через SELECT перед выполнением UPDATE или DELETE."},{q:"Как безопасно удалить конкретные строки?",a:"Сначала проверить выборку: SELECT * FROM users WHERE id = 5. Убедившись, что выбираются нужные строки, заменить SELECT * на DELETE: DELETE FROM users WHERE id = 5."},{q:"Чем DELETE отличается от TRUNCATE?",a:"DELETE удаляет строки по условию WHERE и может откатываться в транзакции. TRUNCATE мгновенно очищает всю таблицу, работает быстрее, но без условий и обычно без возможности отката."}]}),t.jsx(ve,{id:"joins",children:"10. JOIN — соединение таблиц"}),t.jsx(Ee,{children:"JOIN объединяет строки из двух таблиц по условию. Результат — одна «широкая» таблица."}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:10,margin:"16px 0"},children:[{type:"INNER JOIN",color:"rgba(100,200,255,0.12)",border:"rgba(100,200,255,0.25)",desc:"Только строки с совпадением в обеих таблицах"},{type:"LEFT JOIN",color:"rgba(200,255,0,0.08)",border:"rgba(200,255,0,0.2)",desc:"Все строки слева + совпадения справа (NULL если нет)"},{type:"RIGHT JOIN",color:"rgba(255,170,0,0.08)",border:"rgba(255,170,0,0.2)",desc:"Все строки справа + совпадения слева (NULL если нет)"},{type:"FULL OUTER",color:"rgba(200,100,255,0.08)",border:"rgba(200,100,255,0.2)",desc:"Все строки из обеих таблиц (NULL где нет пары)"}].map(n=>t.jsxs("div",{style:{background:n.color,border:`1px solid ${n.border}`,borderRadius:8,padding:"12px 14px"},children:[t.jsx("div",{style:{fontFamily:"monospace",fontWeight:700,color:"var(--text-primary)",fontSize:13,marginBottom:6},children:n.type}),t.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)"},children:n.desc})]},n.type))}),t.jsx(ae,{children:"INNER JOIN"}),t.jsx(G,{code:`SELECT u.name, u.city, o.product, o.price
FROM users AS u
JOIN orders AS o ON u.id = o.user_id;`}),t.jsx(de,{label:"INNER JOIN — только пользователи у которых есть заказы",children:t.jsx(ne,{cols:["name","city","product","price"],rows:[["Анна","Москва","Книга",500],["Анна","Москва","Наушники",3e3],["Борис","Казань","Мышка",1200],["Вера","Москва","Клавиатура",2500],["Дина","Казань","Монитор",15e3],["Егор","Москва","Веб-камера",4500]],hRows:[0,1,2,3,4,5],caption:"Глеб(4) отсутствует — у него нет заказов"})}),t.jsx(ae,{children:"LEFT JOIN"}),t.jsx(G,{code:`SELECT u.name, u.city, o.product, o.price
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id;`}),t.jsx(de,{label:"LEFT JOIN — все пользователи, даже без заказов",children:t.jsx(ne,{cols:["name","city","product","price"],rows:[["Анна","Москва","Книга",500],["Анна","Москва","Наушники",3e3],["Борис","Казань","Мышка",1200],["Вера","Москва","Клавиатура",2500],["Глеб","Сочи","NULL","NULL"],["Дина","Казань","Монитор",15e3],["Егор","Москва","Веб-камера",4500]],hRows:[4],caption:"Глеб попал в результат — product и price = NULL"})}),t.jsx(ae,{children:"LEFT JOIN — поиск «сирот»"}),t.jsx(G,{code:`-- Пользователи БЕЗ заказов
SELECT u.name
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
WHERE o.id IS NULL;`}),t.jsx(de,{children:t.jsx(ne,{cols:["name"],rows:[["Глеб"]],hRows:[0],caption:"Только Глеб — у него нет ни одного заказа"})}),t.jsx(ae,{children:"JOIN + GROUP BY"}),t.jsx(G,{code:`-- Сколько заказов и сумма у каждого пользователя
SELECT
    u.name,
    COUNT(o.id)     AS orders_count,
    SUM(o.price)    AS total_spent,
    AVG(o.price)    AS avg_price
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;`}),t.jsx(de,{children:t.jsx(ne,{cols:["name","orders_count","total_spent","avg_price"],rows:[["Дина",1,15e3,15e3],["Егор",1,4500,4500],["Анна",2,3500,1750],["Вера",1,2500,2500],["Борис",1,1200,1200],["Глеб",0,"NULL","NULL"]],hCols:[1,2,3]})}),t.jsx(ae,{children:"JOIN нескольких таблиц"}),t.jsx(G,{code:`-- Если бы была таблица categories
SELECT u.name, o.product, c.category_name
FROM users AS u
JOIN orders AS o ON u.id = o.user_id
JOIN categories AS c ON o.category_id = c.id
WHERE u.city = 'Москва';`}),t.jsx(U,{questions:[{q:"Чем INNER JOIN отличается от LEFT JOIN?",a:"INNER JOIN возвращает только строки, где есть совпадение в обеих таблицах. LEFT JOIN возвращает все строки левой таблицы плюс совпадения из правой; где совпадения нет — NULL."},{q:"Что указывают в условии ON при соединении?",a:"Условие связи таблиц, обычно равенство ключей: ON orders.user_id = users.id. Оно определяет, какие строки одной таблицы соответствуют строкам другой."},{q:"Зачем используют псевдонимы таблиц в JOIN?",a:"Чтобы сократить запись и устранить неоднозначность при одинаковых именах столбцов: FROM users u JOIN orders o ON o.user_id = u.id. Особенно важно при самосоединении таблицы с самой собой."}]}),t.jsx(ve,{id:"null",children:"11. NULL и COALESCE"}),t.jsx(Ee,{children:"NULL — не ноль и не пустая строка. Это «значение неизвестно или отсутствует». NULL требует особого обращения."}),t.jsx(Qi,{children:"NULL = NULL → FALSE. Сравнение через = не работает. Используй IS NULL и IS NOT NULL."}),t.jsx(G,{code:`-- Проверка на NULL
SELECT * FROM users WHERE city IS NULL;
SELECT * FROM users WHERE city IS NOT NULL;

-- COALESCE — первое ненулевое значение
SELECT name, COALESCE(city, 'Не указан') AS city
FROM users;

-- COALESCE с несколькими аргументами
SELECT name, COALESCE(phone, email, 'Нет контакта') AS contact
FROM users;

-- IFNULL (MySQL / SQLite) — аналог COALESCE для двух аргументов
SELECT name, IFNULL(city, 'Не указан') AS city FROM users;

-- NULLIF — вернуть NULL если значения равны
SELECT NULLIF(score, 0) FROM results;  -- 0 превратится в NULL

-- NULL в агрегатах: COUNT(*) считает все строки,
-- COUNT(col) — только строки где col не NULL
SELECT COUNT(*), COUNT(city), COUNT(phone) FROM users;`}),t.jsx(U,{questions:[{q:"Почему нельзя проверять NULL через = NULL?",a:"NULL означает «значение неизвестно», поэтому NULL = NULL даёт не TRUE, а NULL. Для проверки используют IS NULL и IS NOT NULL. Это частая ошибка новичков."},{q:"Что делает функция COALESCE?",a:"Возвращает первое не-NULL значение из списка аргументов: COALESCE(phone, email, 'нет контакта'). Используется для подстановки значения по умолчанию вместо пустых полей."},{q:"Как NULL влияет на арифметику и сравнения?",a:"Любая операция с NULL даёт NULL: 100 + NULL = NULL. Сравнения с NULL дают неизвестность, поэтому такие строки не проходят фильтр WHERE. Это нужно учитывать в расчётах."}]}),t.jsx(ve,{id:"casewhen",children:"12. CASE WHEN — условная логика"}),t.jsx(Ee,{children:"CASE WHEN — аналог if/else прямо внутри SQL-запроса. Позволяет создавать вычисляемые поля на основе условий."}),t.jsx(G,{code:`-- Категория возраста
SELECT name, age,
    CASE
        WHEN age < 18 THEN 'несовершеннолетний'
        WHEN age BETWEEN 18 AND 25 THEN 'молодой'
        WHEN age BETWEEN 26 AND 35 THEN 'взрослый'
        ELSE 'старший'
    END AS age_group
FROM users;`}),t.jsx(de,{children:t.jsx(ne,{cols:["name","age","age_group"],rows:[["Анна",25,"молодой"],["Борис",31,"взрослый"],["Вера",19,"молодой"],["Глеб",42,"старший"],["Дина",28,"взрослый"],["Егор",35,"взрослый"]],hCols:[2]})}),t.jsx(G,{code:`-- CASE WHEN в агрегации
SELECT
    COUNT(*) AS total,
    COUNT(CASE WHEN city = 'Москва' THEN 1 END)  AS moscow,
    COUNT(CASE WHEN age >= 30 THEN 1 END)         AS aged_30_plus
FROM users;

-- CASE WHEN в ORDER BY
SELECT name, status
FROM orders
ORDER BY
    CASE status
        WHEN 'done'    THEN 1
        WHEN 'pending' THEN 2
        ELSE 3
    END;`}),t.jsx(U,{questions:[{q:"Для чего используют CASE WHEN?",a:"Для условной логики внутри запроса — аналог if/else. Возвращает разные значения в зависимости от условия: CASE WHEN age < 18 THEN 'юный' ELSE 'взрослый' END. Удобно для категоризации."},{q:"Что произойдёт, если не указать ветку ELSE?",a:"Если ни одно условие WHEN не выполнилось и ELSE отсутствует, CASE вернёт NULL. Поэтому ELSE добавляют, чтобы явно задать значение для всех остальных случаев."},{q:"Можно ли группировать по результату CASE WHEN?",a:"Да. Можно создать категорию через CASE WHEN и сгруппировать по ней: GROUP BY по выражению CASE позволяет считать, например, сколько сотрудников в каждой зарплатной категории."}]}),t.jsx(ve,{id:"subquery",children:"13. Подзапросы (Subqueries)"}),t.jsx(Ee,{children:"Подзапрос — SELECT внутри другого SELECT, WHERE или FROM. Выполняется первым, его результат используется внешним запросом."}),t.jsx(ae,{children:"Подзапрос в WHERE"}),t.jsx(G,{code:`-- Пользователи старше среднего возраста
SELECT name, age
FROM users
WHERE age > (SELECT AVG(age) FROM users);   -- подзапрос → 30.0`}),t.jsx(de,{label:"WHERE age > AVG(age) = 30.0",children:t.jsx(ne,{cols:["name","age"],rows:[["Борис",31],["Глеб",42],["Егор",35]],hRows:[0,1,2]})}),t.jsx(G,{code:`-- Пользователи, у которых есть заказы (через IN)
SELECT name FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- Пользователи БЕЗ заказов (через NOT IN)
SELECT name FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders);`}),t.jsx(ae,{children:"Подзапрос в FROM (derived table)"}),t.jsx(G,{code:`-- Сначала считаем суммы, потом фильтруем по ним
SELECT name, total_spent
FROM (
    SELECT u.name, SUM(o.price) AS total_spent
    FROM users AS u
    JOIN orders AS o ON u.id = o.user_id
    GROUP BY u.id, u.name
) AS user_totals
WHERE total_spent > 2000
ORDER BY total_spent DESC;`}),t.jsx(de,{children:t.jsx(ne,{cols:["name","total_spent"],rows:[["Дина",15e3],["Егор",4500],["Анна",3500],["Вера",2500]],hRows:[0,1,2,3]})}),t.jsx(ae,{children:"Подзапрос в SELECT (скалярный)"}),t.jsx(G,{code:`-- Для каждого пользователя — отклонение от среднего возраста
SELECT
    name,
    age,
    age - (SELECT AVG(age) FROM users) AS diff_from_avg
FROM users;`}),t.jsx(U,{questions:[{q:"Что такое подзапрос?",a:"Это SELECT, вложенный внутрь другого запроса. Сначала выполняется внутренний запрос, его результат используется внешним. Применяется, когда нужно сначала что-то вычислить, а потом отфильтровать по этому значению."},{q:"Чем отличается подзапрос в WHERE от подзапроса в FROM?",a:"В WHERE подзапрос фильтрует строки: WHERE id IN (SELECT ...). В FROM подзапрос создаёт временную таблицу, по которой строится дальнейший запрос. Второй вариант гибче для сложных вычислений."},{q:"Что делают операторы IN и EXISTS с подзапросами?",a:"IN проверяет, входит ли значение в результат подзапроса. EXISTS проверяет, вернул ли подзапрос хотя бы одну строку. EXISTS часто эффективнее на больших объёмах данных."}]}),t.jsx(ve,{id:"execorder",children:"14. Порядок выполнения SELECT"}),t.jsx(Ee,{children:"SQL не выполняется сверху вниз. Порядок выполнения отличается от порядка написания."}),t.jsx(G,{code:`SELECT   city, COUNT(*) AS cnt   -- 6. выбор колонок
FROM     users                    -- 1. из какой таблицы
JOIN     orders ON ...            -- 2. соединение
WHERE    age > 18                 -- 3. фильтр строк
GROUP BY city                     -- 4. группировка
HAVING   COUNT(*) > 1             -- 5. фильтр групп
ORDER BY cnt DESC                 -- 7. сортировка
LIMIT    3;                       -- 8. ограничение`}),t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:8,padding:16,margin:"16px 0"},children:[t.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:12,fontWeight:700,textTransform:"uppercase",letterSpacing:.5},children:"Реальный порядок выполнения"}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:[["1","FROM"],["2","JOIN"],["3","WHERE"],["4","GROUP BY"],["5","HAVING"],["6","SELECT"],["7","ORDER BY"],["8","LIMIT"]].map(([n,s])=>t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[t.jsx("span",{style:{background:"rgba(200,255,0,0.15)",color:"var(--accent-lime)",borderRadius:4,padding:"2px 7px",fontSize:11,fontWeight:700},children:n}),t.jsx("span",{style:{fontFamily:"monospace",color:"var(--text-primary)",fontSize:13},children:s}),n!=="8"&&t.jsx("span",{style:{color:"var(--text-tertiary)"},children:"→"})]},s))}),t.jsx(Ee,{style:{marginTop:12,fontSize:13},children:"Именно поэтому нельзя использовать алиас из SELECT в WHERE — WHERE выполняется раньше SELECT. А HAVING может использовать агрегаты — оно выполняется после GROUP BY."})]}),t.jsx(U,{questions:[{q:"В каком порядке SQL выполняет части запроса?",a:"FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Сначала берутся и фильтруются данные, потом группируются, и только затем выбираются столбцы и сортируется результат."},{q:"Почему нельзя использовать алиас из SELECT в WHERE?",a:"Потому что WHERE выполняется раньше SELECT — к моменту фильтрации алиасы ещё не созданы. Нужно либо повторить выражение в WHERE, либо обернуть запрос в подзапрос."},{q:"Почему ORDER BY может использовать алиасы из SELECT?",a:"Потому что ORDER BY выполняется ПОСЛЕ SELECT, когда алиасы уже определены. Поэтому сортировать по вычисленному столбцу-алиасу можно, а фильтровать в WHERE по нему — нет."}]}),t.jsx(ve,{id:"databases",children:"15. Виды баз данных"}),t.jsx(Ee,{children:"Не существует одной «лучшей» базы данных — каждая оптимизирована под определённый тип задач."}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16,margin:"20px 0"},children:[{name:"PostgreSQL",type:"Реляционная (SQL)",color:"#60a5fa",bg:"rgba(59,130,246,0.08)",border:"rgba(59,130,246,0.2)",tags:["ACID","JSON/JSONB","Полнотекстовый поиск","Расширения"],desc:"Самая мощная open-source реляционная СУБД. Стандарт для большинства backend-проектов.",use:"Банки, e-commerce, SaaS, стартапы"},{name:"MySQL / MariaDB",type:"Реляционная (SQL)",color:"#60a5fa",bg:"rgba(59,130,246,0.08)",border:"rgba(59,130,246,0.2)",tags:["ACID","Репликация","Хорошая документация","WordPress"],desc:"Очень распространена в веб-разработке, простая в настройке.",use:"Веб-сайты, CMS, LAMP-стек"},{name:"SQLite",type:"Реляционная (SQL)",color:"#60a5fa",bg:"rgba(59,130,246,0.08)",border:"rgba(59,130,246,0.2)",tags:["Файловая БД","Без сервера","Встраиваемая"],desc:"Вся БД — один файл. Не требует сервера. Идеальна для обучения и мобильных приложений.",use:"Мобильные приложения, тесты, IoT"},{name:"MongoDB",type:"Документная (NoSQL)",color:"#4ade80",bg:"rgba(74,222,128,0.08)",border:"rgba(74,222,128,0.2)",tags:["JSON-документы","Гибкая схема","Горизонтальное масштабирование"],desc:"Хранит данные как JSON-документы. Нет жёсткой схемы — поля могут различаться в документах.",use:"Каталоги товаров, контент, быстрые прототипы"},{name:"Redis",type:"Ключ-значение (NoSQL)",color:"#f87171",bg:"rgba(248,113,113,0.08)",border:"rgba(248,113,113,0.2)",tags:["In-memory","Миллисекунды","TTL","Pub/Sub"],desc:"Хранит данные в RAM. Сверхбыстрый. Используется как кэш или брокер сообщений.",use:"Кэш, сессии, очереди, счётчики"},{name:"ClickHouse",type:"Колоночная (NoSQL)",color:"#fb923c",bg:"rgba(251,146,60,0.08)",border:"rgba(251,146,60,0.2)",tags:["Колоночное хранение","OLAP","Петабайты","Аналитика"],desc:"Колоночная СУБД от Яндекса. Агрегирует миллиарды строк за секунды.",use:"Аналитика, логи, метрики, A/B тесты"}].map(n=>t.jsxs("div",{style:{background:n.bg,border:`1px solid ${n.border}`,borderRadius:10,padding:16},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8},children:[t.jsx("div",{style:{fontWeight:700,fontSize:16,color:"var(--text-primary)"},children:n.name}),t.jsx("span",{style:{fontSize:10,color:n.color,background:`${n.bg}`,border:`1px solid ${n.border}`,borderRadius:4,padding:"2px 7px",fontWeight:700},children:n.type.split(" ")[0]})]}),t.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:8},children:n.type}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10},children:n.tags.map(s=>t.jsx("span",{style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:4,padding:"2px 6px",fontSize:10,color:"var(--text-tertiary)"},children:s},s))}),t.jsx("div",{style:{fontSize:13,color:"var(--text-secondary)",marginBottom:8,lineHeight:1.6},children:n.desc}),t.jsxs("div",{style:{fontSize:12,color:n.color},children:[t.jsx("strong",{children:"Когда:"})," ",n.use]})]},n.name))}),t.jsx(ae,{children:"Сравнение синтаксиса по СУБД"}),t.jsx(Yi,{headers:["Задача","PostgreSQL","MySQL","SQLite"],rows:[["Автоинкремент","SERIAL / GENERATED ALWAYS AS IDENTITY","AUTO_INCREMENT","AUTOINCREMENT"],["Текущее время","NOW() / CURRENT_TIMESTAMP","NOW()","datetime('now')"],["Строковое concat","name || ' ' || city","CONCAT(name,' ',city)","name || ' ' || city"],["Регистронезав.","ILIKE","LIKE (по умолчанию)","LIKE COLLATE NOCASE"],["Ограничение строк","LIMIT n OFFSET m","LIMIT n OFFSET m","LIMIT n OFFSET m"],["JSON-поля","JSONB (нативно)","JSON (с 5.7)","TEXT (без поддержки)"],["Транзакции","BEGIN / COMMIT / ROLLBACK","START TRANSACTION","BEGIN / COMMIT"],["Резервная копия","pg_dump","mysqldump","cp file.db"]]}),t.jsx(ae,{children:"Когда что выбирать"}),t.jsx(Yi,{headers:["Сценарий","Лучший выбор","Почему"],rows:[["Веб-приложение с пользователями и заказами","PostgreSQL","ACID, сложные запросы, надёжность"],["Блог или сайт на WordPress","MySQL","Отличная совместимость, простота"],["Мобильное приложение / обучение","SQLite","Файловая БД, нет сервера"],["Кэш и сессии пользователей","Redis","Миллисекунды, TTL"],["Гибкий каталог с разными атрибутами","MongoDB","Разные поля у документов"],["Аналитика логов и событий","ClickHouse","Миллиарды строк, быстрая агрегация"],["Граф друзей в соцсети","Neo4j","Оптимизирован для обходов графа"]]}),t.jsx(U,{questions:[{q:"Чем реляционные БД отличаются от NoSQL?",a:"Реляционные (PostgreSQL, MySQL) хранят данные в таблицах со строгой схемой и связями, поддерживают сложные JOIN и транзакции. NoSQL (MongoDB, Redis) — гибкая схема, документы или ключ-значение, лучше масштабируются горизонтально."},{q:"Когда выбрать PostgreSQL, а когда MongoDB?",a:"PostgreSQL — для структурированных данных, сложных связей, транзакций (финансы, ERP). MongoDB — для гибких документов с меняющейся структурой, быстрого прототипирования и вложенных объектов."},{q:"Что такое принцип ACID?",a:"Atomicity (всё или ничего), Consistency (данные всегда валидны), Isolation (транзакции не мешают друг другу), Durability (после подтверждения данные не потеряются). Гарантирует надёжность реляционных БД."}]}),t.jsx(ve,{id:"cheatsheet",children:"16. Шпаргалка всех команд"}),t.jsx(ae,{children:"DDL — структура"}),t.jsx(At,{rows:[["CREATE TABLE","Создать таблицу","CREATE TABLE t (id INTEGER PRIMARY KEY)"],["ALTER TABLE","Изменить структуру таблицы","ALTER TABLE t ADD COLUMN phone TEXT"],["DROP TABLE","Удалить таблицу со всеми данными","DROP TABLE IF EXISTS t"],["TRUNCATE","Удалить все строки (быстро)","TRUNCATE TABLE t"]]}),t.jsx(ae,{children:"DML — данные"}),t.jsx(At,{rows:[["INSERT INTO","Добавить строку(и)","INSERT INTO t (a,b) VALUES (1,'x')"],["UPDATE SET","Изменить строки","UPDATE t SET a=2 WHERE id=1"],["DELETE FROM","Удалить строки","DELETE FROM t WHERE id=1"]]}),t.jsx(ae,{children:"SELECT — выборка и фильтрация"}),t.jsx(At,{rows:[["SELECT","Выбрать колонки","SELECT name, age FROM users"],["DISTINCT","Убрать дубликаты","SELECT DISTINCT city FROM users"],["WHERE","Фильтр строк","WHERE city = 'Москва'"],["AND / OR / NOT","Логические операторы","WHERE age > 20 AND city = …"],["IN","Вхождение в список","WHERE city IN ('Мск','СПб')"],["BETWEEN","Диапазон включительно","WHERE age BETWEEN 20 AND 30"],["LIKE","Поиск по шаблону","WHERE name LIKE 'А%'"],["IS NULL","Проверка на NULL","WHERE phone IS NULL"],["ORDER BY","Сортировка","ORDER BY age DESC"],["LIMIT / OFFSET","Ограничение + пагинация","LIMIT 10 OFFSET 20"]]}),t.jsx(ae,{children:"Агрегация и группировка"}),t.jsx(At,{rows:[["COUNT(*)","Количество строк","SELECT COUNT(*) FROM users"],["SUM / AVG","Сумма / среднее","SELECT SUM(price), AVG(price)"],["MAX / MIN","Максимум / минимум","SELECT MAX(age), MIN(age)"],["GROUP BY","Группировка","GROUP BY city"],["HAVING","Фильтр групп","HAVING COUNT(*) > 1"]]}),t.jsx(ae,{children:"JOIN и связи"}),t.jsx(At,{rows:[["INNER JOIN","Только совпадения в обеих таблицах","JOIN b ON a.id = b.a_id"],["LEFT JOIN","Все строки слева + совпадения","LEFT JOIN b ON a.id = b.a_id"],["RIGHT JOIN","Все строки справа + совпадения","RIGHT JOIN b ON a.id = b.a_id"],["FULL OUTER JOIN","Все строки из обеих таблиц","FULL OUTER JOIN b ON …"]]}),t.jsx(ae,{children:"Прочее"}),t.jsx(At,{rows:[["COALESCE","Первое ненулевое из списка","COALESCE(phone, 'Нет')"],["CASE WHEN","Условная логика","CASE WHEN age<18 THEN …END"],["AS","Псевдоним колонки или таблицы",'SELECT name AS "Имя"'],["UNION","Объединить результаты (без дублей)","SELECT … UNION SELECT …"],["UNION ALL","Объединить результаты (с дублями)","SELECT … UNION ALL SELECT …"],["EXISTS","Проверить наличие строк подзапроса","WHERE EXISTS (SELECT 1 …)"]]}),t.jsx(U,{questions:[{q:"В каком порядке пишутся ключевые слова в SELECT-запросе?",a:"SELECT … FROM … JOIN … ON … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT. Нарушение этого порядка вызовет синтаксическую ошибку, даже если логика запроса верна."},{q:"Какие три типа JOIN встречаются чаще всего?",a:"INNER JOIN (только совпадения), LEFT JOIN (все из левой таблицы + совпадения), и реже FULL OUTER JOIN (все строки обеих таблиц). RIGHT JOIN обычно заменяют LEFT JOIN, поменяв таблицы местами."},{q:"Какие операторы помогают работать с NULL и условиями?",a:"IS NULL / IS NOT NULL для проверки пустых значений, COALESCE для подстановки значения по умолчанию, CASE WHEN для условной логики. Эти инструменты нужны почти в каждом реальном запросе."}]}),t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid rgba(168,85,247,0.2)",borderRadius:10,padding:"clamp(16px,3vw,24px)",margin:"44px 0 20px",textAlign:"center"},children:[t.jsx("div",{style:{color:"#c084fc",fontWeight:700,fontSize:16,marginBottom:8},children:"Практика — лучший способ закрепить SQL"}),t.jsx("p",{style:{color:"var(--text-secondary)",fontSize:13,marginBottom:14},children:"Открой онлайн-песочницу и попробуй все запросы прямо сейчас"}),t.jsx("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"},children:["sqliteonline.com","sqlfiddle.com","leetcode.com/studyplan/top-sql-50"].map(n=>t.jsx("code",{style:{fontFamily:"monospace",fontSize:12,background:"var(--bg-tertiary)",padding:"4px 10px",borderRadius:4,color:"var(--text-secondary)"},children:n},n))})]})]})}const xc=[{id:"pandas",title:"Pandas",subtitle:"Работа с данными в Python",tag:"Python",level:"Junior → Middle",time:"~45 мин",topics:["Series & DataFrame","Фильтрация и индексация","GroupBy & Pivot","Merge & Concat","Работа с датами"],component:ig},{id:"sql",title:"SQL",subtitle:"Полный курс по базам данных",tag:"Database",level:"Новичок → Middle",time:"~50 мин",topics:["SELECT & WHERE","GROUP BY & JOIN","NULL & CASE WHEN","Подзапросы","PostgreSQL vs MongoDB"],component:og}],cg=[{title:"NumPy",tag:"Python",desc:"Массивы, линейная алгебра, векторизация"},{title:"Git & GitHub",tag:"DevOps",desc:"Ветки, merge, rebase, PR, CI/CD"}],cs={Python:{bg:"rgba(59,130,246,0.1)",border:"rgba(59,130,246,0.25)",text:"#60a5fa"},Database:{bg:"rgba(168,85,247,0.1)",border:"rgba(168,85,247,0.25)",text:"#c084fc"},DevOps:{bg:"rgba(251,146,60,0.1)",border:"rgba(251,146,60,0.25)",text:"#fb923c"},JavaScript:{bg:"rgba(234,179,8,0.1)",border:"rgba(234,179,8,0.25)",text:"#facc15"}};function yc(){const{id:e}=fi(),r=xt();if(e){const s=xc.find(i=>i.id===e);if(s){const i=s.component;return t.jsx(i,{onBack:()=>r("/likebezy")})}}const n=s=>r(`/likebezy/${s}`);return t.jsxs("div",{style:{maxWidth:1e3,margin:"0 auto",padding:"clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)"},children:[t.jsxs("div",{style:{marginBottom:36},children:[t.jsx("h1",{style:{fontFamily:"var(--font-syne)",fontSize:"clamp(24px, 5vw, 36px)",fontWeight:800,color:"var(--text-primary)",lineHeight:1.2,marginBottom:12},children:"Полные ликбезы"}),t.jsx("p",{style:{color:"var(--text-secondary)",fontSize:15,lineHeight:1.7,maxWidth:640},children:"Структурированные конспекты по конкретным технологиям — всё необходимое от основ до уверенного применения в одном месте. Читай, разбирай примеры и сразу применяй на практике."})]}),t.jsxs("div",{style:{marginBottom:40},children:[t.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:16},children:"Доступно"}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:16},children:xc.map(s=>{const i=cs[s.tag]||cs.Python;return t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,padding:"clamp(16px, 3vw, 24px)",cursor:"pointer",transition:"border-color 0.2s, transform 0.15s"},onMouseEnter:l=>{l.currentTarget.style.borderColor="rgba(200,255,0,0.4)",l.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:l=>{l.currentTarget.style.borderColor="var(--border-color)",l.currentTarget.style.transform="translateY(0)"},onClick:()=>n(s.id),children:[t.jsxs("div",{style:{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"},children:[t.jsx("span",{style:{background:i.bg,border:`1px solid ${i.border}`,color:i.text,borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700,letterSpacing:.5},children:s.tag}),t.jsx("span",{style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",color:"var(--text-tertiary)",borderRadius:6,padding:"3px 10px",fontSize:11},children:s.level})]}),t.jsx("h2",{style:{color:"var(--text-primary)",fontSize:"clamp(16px, 2.5vw, 20px)",fontWeight:700,marginBottom:4},children:s.title}),t.jsx("p",{style:{color:"var(--text-secondary)",fontSize:13,marginBottom:16},children:s.subtitle}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18},children:s.topics.map(l=>t.jsx("span",{style:{background:"var(--bg-tertiary)",borderRadius:4,padding:"3px 8px",fontSize:11,color:"var(--text-tertiary)",border:"1px solid var(--border-color)"},children:l},l))}),t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx("span",{style:{fontSize:12,color:"var(--text-tertiary)"},children:s.time}),t.jsx("span",{style:{background:"rgba(200,255,0,0.1)",border:"1px solid rgba(200,255,0,0.25)",color:"var(--accent-lime)",borderRadius:6,padding:"5px 14px",fontSize:12,fontWeight:600},children:"Читать →"})]})]},s.id)})})]}),t.jsxs("div",{children:[t.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:16},children:"Скоро"}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:12},children:cg.map(s=>{const i=cs[s.tag]||cs.Python;return t.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:10,padding:16,opacity:.6},children:[t.jsx("div",{style:{display:"flex",gap:8,marginBottom:10},children:t.jsx("span",{style:{background:i.bg,border:`1px solid ${i.border}`,color:i.text,borderRadius:6,padding:"2px 8px",fontSize:10,fontWeight:700},children:s.tag})}),t.jsx("div",{style:{color:"var(--text-primary)",fontWeight:600,fontSize:15,marginBottom:4},children:s.title}),t.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:12},children:s.desc})]},s.title)})})]})]})}function dg(){const{day:e}=fi(),r=xt();return t.jsx(Ty,{selectedDay:Number(e),onBack:()=>r("/library")})}function ug(){const{day:e}=fi(),r=xt();return t.jsx(Xy,{selectedDay:Number(e),onBack:()=>r("/library")})}function hg(){const{day:e}=fi(),r=xt();return t.jsx(Zy,{selectedDay:Number(e),onBack:()=>r("/library")})}function pg(){const e=xt();return t.jsx(eg,{onBack:()=>e("/dashboard")})}function mg({user:e,onLogout:r}){const n=xt(),[s,i]=x.useState(null),[l,a]=x.useState(!1);x.useEffect(()=>(document.body.className="app-page",()=>{document.body.className=""}),[]);const o=u=>n(`/library/theory/${u.day}`),c=u=>n(`/library/questions/${u.day}`),d=u=>n(`/library/homework/${u.day}`);return t.jsxs(t.Fragment,{children:[t.jsx("aside",{id:"sidebar",className:`sidebar${l?" open":""}`,children:t.jsx(xx,{user:e,onLogout:r,onClose:()=>a(!1)})}),l&&t.jsx("div",{className:"sidebar-overlay active",onClick:()=>a(!1)}),t.jsxs("div",{className:"app-content",children:[t.jsx(Nx,{user:e,onMenuClick:()=>a(!0)}),t.jsx("main",{className:"pages-wrap",children:t.jsxs(Yu,{children:[t.jsx(we,{path:"/",element:t.jsx(Js,{to:"/dashboard",replace:!0})}),t.jsx(we,{path:"/dashboard",element:t.jsx(Rx,{user:e,onNavigate:u=>n(`/${u}`)})}),t.jsx(we,{path:"/schedule",element:t.jsx(Fx,{})}),t.jsx(we,{path:"/library",element:t.jsx(Vx,{onOpenDay:i,onOpenTheory:o,onOpenQuestions:c,onOpenHomework:d})}),t.jsx(we,{path:"/library/theory/:day",element:t.jsx(dg,{})}),t.jsx(we,{path:"/library/questions/:day",element:t.jsx(ug,{})}),t.jsx(we,{path:"/library/homework/:day",element:t.jsx(hg,{})}),t.jsx(we,{path:"/links",element:t.jsx(Yx,{})}),t.jsx(we,{path:"/likebezy",element:t.jsx(yc,{})}),t.jsx(we,{path:"/likebezy/:id",element:t.jsx(yc,{})}),t.jsx(we,{path:"/announcements",element:t.jsx(pg,{})}),t.jsx(we,{path:"*",element:t.jsx(Js,{to:"/dashboard",replace:!0})})]})})]}),s&&t.jsx(vx,{day:s,onClose:()=>i(null)})]})}function gc(e){if(!e)return!1;if(e.expiresAt){const r=new Date(e.expiresAt).getTime();return new Date().getTime()<r}return!0}function fg(){const[e,r]=x.useState(()=>{try{const l=JSON.parse(localStorage.getItem("kiro_user"));return l&&gc(l)?l:(localStorage.removeItem("kiro_user"),l&&localStorage.setItem("sessionExpired","true"),null)}catch{return null}});x.useEffect(()=>{const l=()=>{try{const c=localStorage.getItem("kiro_user");if(!c){e&&r(null);return}const d=JSON.parse(c);gc(d)||(localStorage.removeItem("kiro_user"),localStorage.setItem("sessionExpired","true"),r(null))}catch{localStorage.removeItem("kiro_user"),r(null)}};l();const a=()=>{document.visibilityState==="visible"&&l()};document.addEventListener("visibilitychange",a);const o=setInterval(l,6e4);return()=>{clearInterval(o),document.removeEventListener("visibilitychange",a)}},[]);const n=xt(),s=x.useCallback(l=>{localStorage.setItem("kiro_user",JSON.stringify(l)),r(l),n("/dashboard")},[n]),i=x.useCallback(()=>{localStorage.removeItem("kiro_user"),localStorage.setItem("sessionExpired","true"),r(null),n("/login")},[n]);return t.jsxs(Yu,{children:[t.jsx(we,{path:"/login",element:e?t.jsx(Js,{to:"/dashboard",replace:!0}):t.jsx(px,{onLogin:s})}),t.jsx(we,{path:"/*",element:e?t.jsx(mg,{user:e,onLogout:i}):t.jsx(Js,{to:"/login",replace:!0})})]})}Ji.createRoot(document.getElementById("root")).render(t.jsx(vh.StrictMode,{children:t.jsx(tx,{children:t.jsx(fg,{})})}));
