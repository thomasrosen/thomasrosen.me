"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[326],{9524:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),r(1801),Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"addLocale",{enumerable:!0,get:function(){return n}}),r(3997);var n=function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return e};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4549:function(e,t,r){function n(e,t,r,n){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),r(3997),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8326:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=r(5029),o=r(8001),a=r(4670);r(3353),Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return P}});var u=r(1024)._(r(2265)),i=r(9121),l=r(8664),c=r(8130),s=r(6681),f=r(9524),d=r(6304),p=r(6313),h=r(1581),v=r(4549),m=r(9872),g=r(9706),y=new Set;function _(e,t,r,n,o,a){if(a||(0,l.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){var u=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(y.has(u))return;y.add(u)}Promise.resolve(a?e.prefetch(t,o):e.prefetch(t,r,n)).catch(function(e){})}}function b(e){return"string"==typeof e?e:(0,c.formatUrl)(e)}var P=u.default.forwardRef(function(e,t){var r,c,y=e.href,P=e.as,R=e.children,O=e.prefetch,j=void 0===O?null:O,E=e.passHref,M=e.replace,S=e.shallow,w=e.scroll,N=e.locale,k=e.onClick,x=e.onMouseEnter,C=e.onTouchStart,I=e.legacyBehavior,T=void 0!==I&&I,L=o._(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);r=R,T&&("string"==typeof r||"number"==typeof r)&&(r=u.default.createElement("a",null,r));var U=u.default.useContext(d.RouterContext),A=u.default.useContext(p.AppRouterContext),W=null!=U?U:A,K=!U,z=!1!==j,D=null===j?g.PrefetchKind.AUTO:g.PrefetchKind.FULL,q=u.default.useMemo(function(){if(!U){var e=b(y);return{href:e,as:P?b(P):e}}var t=a._((0,i.resolveHref)(U,y,!0),2),r=t[0],n=t[1];return{href:r,as:P?(0,i.resolveHref)(U,P):n||r}},[U,y,P]),B=q.href,F=q.as,$=u.default.useRef(B),Y=u.default.useRef(F);T&&(c=u.default.Children.only(r));var H=T?c&&"object"==typeof c&&c.ref:t,Q=a._((0,h.useIntersection)({rootMargin:"200px"}),3),V=Q[0],Z=Q[1],G=Q[2],J=u.default.useCallback(function(e){(Y.current!==F||$.current!==B)&&(G(),Y.current=F,$.current=B),V(e),H&&("function"==typeof H?H(e):"object"==typeof H&&(H.current=e))},[F,H,B,G,V]);u.default.useEffect(function(){W&&Z&&z&&_(W,B,F,{locale:N},{kind:D},K)},[F,B,Z,N,z,null==U?void 0:U.locale,W,K,D]);var X={ref:J,onClick:function(e){T||"function"!=typeof k||k(e),T&&c.props&&"function"==typeof c.props.onClick&&c.props.onClick(e),W&&!e.defaultPrevented&&function(e,t,r,n,o,a,i,c,s){if(!("A"===e.currentTarget.nodeName.toUpperCase()&&((f=e.currentTarget.getAttribute("target"))&&"_self"!==f||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which||!s&&!(0,l.isLocalURL)(r)))){e.preventDefault();var f,d=function(){var e=null==i||i;"beforePopState"in t?t[o?"replace":"push"](r,n,{shallow:a,locale:c,scroll:e}):t[o?"replace":"push"](n||r,{scroll:e})};s?u.default.startTransition(d):d()}}(e,W,B,F,M,S,w,N,K)},onMouseEnter:function(e){T||"function"!=typeof x||x(e),T&&c.props&&"function"==typeof c.props.onMouseEnter&&c.props.onMouseEnter(e),W&&(z||!K)&&_(W,B,F,{locale:N,priority:!0,bypassPrefetchedCheck:!0},{kind:D},K)},onTouchStart:function(e){T||"function"!=typeof C||C(e),T&&c.props&&"function"==typeof c.props.onTouchStart&&c.props.onTouchStart(e),W&&(z||!K)&&_(W,B,F,{locale:N,priority:!0,bypassPrefetchedCheck:!0},{kind:D},K)}};if((0,s.isAbsoluteUrl)(F))X.href=F;else if(!T||E||"a"===c.type&&!("href"in c.props)){var ee=void 0!==N?N:null==U?void 0:U.locale,et=(null==U?void 0:U.isLocaleDomain)&&(0,v.getDomainLocale)(F,ee,null==U?void 0:U.locales,null==U?void 0:U.domainLocales);X.href=et||(0,m.addBasePath)((0,f.addLocale)(F,ee,null==U?void 0:U.defaultLocale))}return T?u.default.cloneElement(c,X):u.default.createElement("a",n._({},L,X),r)});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2389:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{requestIdleCallback:function(){return r},cancelIdleCallback:function(){return n}});var r="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){var t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},n="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9121:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"resolveHref",{enumerable:!0,get:function(){return f}});var n=r(5991),o=r(8130),a=r(8137),u=r(6681),i=r(3997),l=r(8664),c=r(9289),s=r(948);function f(e,t,r){var f,d="string"==typeof t?t:(0,o.formatWithValidation)(t),p=d.match(/^[a-zA-Z]{1,}:\/\//),h=p?d.slice(p[0].length):d;if((h.split("?",1)[0]||"").match(/(\/\/|\\)/)){console.error("Invalid href '"+d+"' passed to next/router in page: '"+e.pathname+"'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");var v=(0,u.normalizeRepeatedSlashes)(h);d=(p?p[0]:"")+v}if(!(0,l.isLocalURL)(d))return r?[d]:d;try{f=new URL(d.startsWith("#")?e.asPath:e.pathname,"http://n")}catch(e){f=new URL("/","http://n")}try{var m=new URL(d,f);m.pathname=(0,i.normalizePathTrailingSlash)(m.pathname);var g="";if((0,c.isDynamicRoute)(m.pathname)&&m.searchParams&&r){var y=(0,n.searchParamsToUrlQuery)(m.searchParams),_=(0,s.interpolateAs)(m.pathname,m.pathname,y),b=_.result,P=_.params;b&&(g=(0,o.formatWithValidation)({pathname:b,hash:m.hash,query:(0,a.omit)(y,P)}))}var R=m.origin===f.origin?m.href.slice(m.origin.length):m.href;return r?[R,g||R]:R}catch(e){return r?[d]:d}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1581:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=r(4670);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return c}});var o=r(2265),a=r(2389),u="function"==typeof IntersectionObserver,i=new Map,l=[];function c(e){var t=e.rootRef,r=e.rootMargin,c=e.disabled||!u,s=n._((0,o.useState)(!1),2),f=s[0],d=s[1],p=(0,o.useRef)(null),h=(0,o.useCallback)(function(e){p.current=e},[]);return(0,o.useEffect)(function(){if(u){if(!c&&!f){var e,n,o,s,h=p.current;if(h&&h.tagName)return n=(e=function(e){var t,r={root:e.root||null,margin:e.rootMargin||""},n=l.find(function(e){return e.root===r.root&&e.margin===r.margin});if(n&&(t=i.get(n)))return t;var o=new Map;return t={id:r,observer:new IntersectionObserver(function(e){e.forEach(function(e){var t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:o},l.push(r),i.set(r,t),t}({root:null==t?void 0:t.current,rootMargin:r})).id,o=e.observer,(s=e.elements).set(h,function(e){return e&&d(e)}),o.observe(h),function(){if(s.delete(h),o.unobserve(h),0===s.size){o.disconnect(),i.delete(n);var e=l.findIndex(function(e){return e.root===n.root&&e.margin===n.margin});e>-1&&l.splice(e,1)}}}}else if(!f){var v=(0,a.requestIdleCallback)(function(){return d(!0)});return function(){return(0,a.cancelIdleCallback)(v)}}},[c,r,t,f,p.current]),[h,f,(0,o.useCallback)(function(){d(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4910:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"escapeStringRegexp",{enumerable:!0,get:function(){return o}});var r=/[|\\{}()[\]^$+*?.-]/,n=/[|\\{}()[\]^$+*?.-]/g;function o(e){return r.test(e)?e.replace(n,"\\$&"):e}},6304:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return n}});var n=r(1024)._(r(2265)).default.createContext(null)},8130:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{formatUrl:function(){return a},urlObjectKeys:function(){return u},formatWithValidation:function(){return i}});var n=r(8533)._(r(5991)),o=/https?|ftp|gopher|file/;function a(e){var t=e.auth,r=e.hostname,a=e.protocol||"",u=e.pathname||"",i=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?"["+r+"]":r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(n.urlQueryToSearchParams(l)));var s=e.search||l&&"?"+l||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||o.test(a))&&!1!==c?(c="//"+(c||""),u&&"/"!==u[0]&&(u="/"+u)):c||(c=""),i&&"#"!==i[0]&&(i="#"+i),s&&"?"!==s[0]&&(s="?"+s),""+a+c+(u=u.replace(/[?#]/g,encodeURIComponent))+(s=s.replace("#","%23"))+i}var u=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function i(e){return a(e)}},9289:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{getSortedRoutes:function(){return n.getSortedRoutes},isDynamicRoute:function(){return o.isDynamicRoute}});var n=r(9255),o=r(5321)},948:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"interpolateAs",{enumerable:!0,get:function(){return a}});var n=r(1670),o=r(7414);function a(e,t,r){var a="",u=(0,o.getRouteRegex)(e),i=u.groups,l=(t!==e?(0,n.getRouteMatcher)(u)(t):"")||r;a=e;var c=Object.keys(i);return c.every(function(e){var t=l[e]||"",r=i[e],n=r.repeat,o=r.optional,u="["+(n?"...":"")+e+"]";return o&&(u=(t?"":"/")+"["+u+"]"),n&&!Array.isArray(t)&&(t=[t]),(o||e in l)&&(a=a.replace(u,n?t.map(function(e){return encodeURIComponent(e)}).join("/"):encodeURIComponent(t))||"/")})||(a=""),{params:c,result:a}}},5321:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isDynamicRoute",{enumerable:!0,get:function(){return a}});var n=r(4507),o=/\/\[[^/]+?\](?=\/|$)/;function a(e){return(0,n.isInterceptionRouteAppPath)(e)&&(e=(0,n.extractInterceptionRouteInformation)(e).interceptedRoute),o.test(e)}},8664:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isLocalURL",{enumerable:!0,get:function(){return a}});var n=r(6681),o=r(6746);function a(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{var t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},8137:function(e,t){function r(e,t){var r={};return Object.keys(e).forEach(function(n){t.includes(n)||(r[n]=e[n])}),r}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"omit",{enumerable:!0,get:function(){return r}})},5991:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=r(4670);function o(e){var t={};return e.forEach(function(e,r){void 0===t[r]?t[r]=e:Array.isArray(t[r])?t[r].push(e):t[r]=[t[r],e]}),t}function a(e){return"string"!=typeof e&&("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function u(e){var t=new URLSearchParams;return Object.entries(e).forEach(function(e){var r=n._(e,2),o=r[0],u=r[1];Array.isArray(u)?u.forEach(function(e){return t.append(o,a(e))}):t.set(o,a(u))}),t}function i(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return r.forEach(function(t){Array.from(t.keys()).forEach(function(t){return e.delete(t)}),t.forEach(function(t,r){return e.append(r,t)})}),e}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{searchParamsToUrlQuery:function(){return o},urlQueryToSearchParams:function(){return u},assign:function(){return i}})},1670:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getRouteMatcher",{enumerable:!0,get:function(){return o}});var n=r(6681);function o(e){var t=e.re,r=e.groups;return function(e){var o=t.exec(e);if(!o)return!1;var a=function(e){try{return decodeURIComponent(e)}catch(e){throw new n.DecodeError("failed to decode param")}},u={};return Object.keys(r).forEach(function(e){var t=r[e],n=o[t.pos];void 0!==n&&(u[e]=~n.indexOf("/")?n.split("/").map(function(e){return a(e)}):t.repeat?[a(n)]:a(n))}),u}}},7414:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=r(5029),o=r(8965);Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{getRouteRegex:function(){return s},getNamedRouteRegex:function(){return p},getNamedMiddlewareRegex:function(){return h}});var a=r(4507),u=r(4910),i=r(9006);function l(e){var t=e.startsWith("[")&&e.endsWith("]");t&&(e=e.slice(1,-1));var r=e.startsWith("...");return r&&(e=e.slice(3)),{key:e,repeat:r,optional:t}}function c(e){var t=(0,i.removeTrailingSlash)(e).slice(1).split("/"),r={},n=1;return{parameterizedRoute:t.map(function(e){var t=a.INTERCEPTION_ROUTE_MARKERS.find(function(t){return e.startsWith(t)}),o=e.match(/\[((?:\[.*\])|.+)\]/);if(t&&o){var i=l(o[1]),c=i.key,s=i.optional,f=i.repeat;return r[c]={pos:n++,repeat:f,optional:s},"/"+(0,u.escapeStringRegexp)(t)+"([^/]+?)"}if(!o)return"/"+(0,u.escapeStringRegexp)(e);var d=l(o[1]),p=d.key,h=d.repeat,v=d.optional;return r[p]={pos:n++,repeat:h,optional:v},h?v?"(?:/(.+?))?":"/(.+?)":"/([^/]+?)"}).join(""),groups:r}}function s(e){var t=c(e),r=t.parameterizedRoute,n=t.groups;return{re:RegExp("^"+r+"(?:/)?$"),groups:n}}function f(e){var t=e.getSafeRouteKey,r=e.segment,n=e.routeKeys,o=e.keyPrefix,a=l(r),u=a.key,i=a.optional,c=a.repeat,s=u.replace(/\W/g,"");o&&(s=""+o+s);var f=!1;return(0===s.length||s.length>30)&&(f=!0),isNaN(parseInt(s.slice(0,1)))||(f=!0),f&&(s=t()),o?n[s]=""+o+u:n[s]=""+u,c?i?"(?:/(?<"+s+">.+?))?":"/(?<"+s+">.+?)":"/(?<"+s+">[^/]+?)"}function d(e,t){var r,n=(0,i.removeTrailingSlash)(e).slice(1).split("/"),o=(r=0,function(){for(var e="",t=++r;t>0;)e+=String.fromCharCode(97+(t-1)%26),t=Math.floor((t-1)/26);return e}),l={};return{namedParameterizedRoute:n.map(function(e){var r=a.INTERCEPTION_ROUTE_MARKERS.some(function(t){return e.startsWith(t)}),n=e.match(/\[((?:\[.*\])|.+)\]/);return r&&n?f({getSafeRouteKey:o,segment:n[1],routeKeys:l,keyPrefix:t?"nxtI":void 0}):n?f({getSafeRouteKey:o,segment:n[1],routeKeys:l,keyPrefix:t?"nxtP":void 0}):"/"+(0,u.escapeStringRegexp)(e)}).join(""),routeKeys:l}}function p(e,t){var r=d(e,t);return o._(n._({},s(e)),{namedRegex:"^"+r.namedParameterizedRoute+"(?:/)?$",routeKeys:r.routeKeys})}function h(e,t){var r=c(e).parameterizedRoute,n=t.catchAll,o=void 0===n||n;return"/"===r?{namedRegex:"^/"+(o?".*":"")+"$"}:{namedRegex:"^"+d(e,!1).namedParameterizedRoute+(o?"(?:(/.*)?)":"")+"$"}}},9255:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=r(2977),o=r(8449),a=r(1801);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getSortedRoutes",{enumerable:!0,get:function(){return i}});var u=function(){function e(){n._(this,e),this.placeholder=!0,this.children=new Map,this.slugName=null,this.restSlugName=null,this.optionalRestSlugName=null}return o._(e,[{key:"insert",value:function(e){this._insert(e.split("/").filter(Boolean),[],!1)}},{key:"smoosh",value:function(){return this._smoosh()}},{key:"_smoosh",value:function(e){var t=this;void 0===e&&(e="/");var r=a._(this.children.keys()).sort();null!==this.slugName&&r.splice(r.indexOf("[]"),1),null!==this.restSlugName&&r.splice(r.indexOf("[...]"),1),null!==this.optionalRestSlugName&&r.splice(r.indexOf("[[...]]"),1);var n=r.map(function(r){return t.children.get(r)._smoosh(""+e+r+"/")}).reduce(function(e,t){return a._(e).concat(a._(t))},[]);if(null!==this.slugName&&n.push.apply(n,a._(this.children.get("[]")._smoosh(e+"["+this.slugName+"]/"))),!this.placeholder){var o="/"===e?"/":e.slice(0,-1);if(null!=this.optionalRestSlugName)throw Error('You cannot define a route with the same specificity as a optional catch-all route ("'+o+'" and "'+o+"[[..."+this.optionalRestSlugName+']]").');n.unshift(o)}return null!==this.restSlugName&&n.push.apply(n,a._(this.children.get("[...]")._smoosh(e+"[..."+this.restSlugName+"]/"))),null!==this.optionalRestSlugName&&n.push.apply(n,a._(this.children.get("[[...]]")._smoosh(e+"[[..."+this.optionalRestSlugName+"]]/"))),n}},{key:"_insert",value:function(t,r,n){if(0===t.length){this.placeholder=!1;return}if(n)throw Error("Catch-all must be the last part of the URL.");var o=t[0];if(o.startsWith("[")&&o.endsWith("]")){var a=o.slice(1,-1),u=!1;if(a.startsWith("[")&&a.endsWith("]")&&(a=a.slice(1,-1),u=!0),a.startsWith("...")&&(a=a.substring(3),n=!0),a.startsWith("[")||a.endsWith("]"))throw Error("Segment names may not start or end with extra brackets ('"+a+"').");if(a.startsWith("."))throw Error("Segment names may not start with erroneous periods ('"+a+"').");function i(e,t){if(null!==e&&e!==t)throw Error("You cannot use different slug names for the same dynamic path ('"+e+"' !== '"+t+"').");r.forEach(function(e){if(e===t)throw Error('You cannot have the same slug name "'+t+'" repeat within a single dynamic path');if(e.replace(/\W/g,"")===o.replace(/\W/g,""))throw Error('You cannot have the slug names "'+e+'" and "'+t+'" differ only by non-word symbols within a single dynamic path')}),r.push(t)}if(n){if(u){if(null!=this.restSlugName)throw Error('You cannot use both an required and optional catch-all route at the same level ("[...'+this.restSlugName+']" and "'+t[0]+'" ).');i(this.optionalRestSlugName,a),this.optionalRestSlugName=a,o="[[...]]"}else{if(null!=this.optionalRestSlugName)throw Error('You cannot use both an optional and required catch-all route at the same level ("[[...'+this.optionalRestSlugName+']]" and "'+t[0]+'").');i(this.restSlugName,a),this.restSlugName=a,o="[...]"}}else{if(u)throw Error('Optional route parameters are not yet supported ("'+t[0]+'").');i(this.slugName,a),this.slugName=a,o="[]"}}this.children.has(o)||this.children.set(o,new e),this.children.get(o)._insert(t.slice(1),r,n)}}]),e}();function i(e){var t=new u;return e.forEach(function(e){return t.insert(e)}),t.smoosh()}},6681:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=r(6687),o=r(2977),a=r(6408),u=r(1801),i=r(6417),l=r(3891),c=r(9623);Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{WEB_VITALS:function(){return s},execOnce:function(){return f},isAbsoluteUrl:function(){return p},getLocationOrigin:function(){return h},getURL:function(){return v},getDisplayName:function(){return m},isResSent:function(){return g},normalizeRepeatedSlashes:function(){return y},loadGetInitialProps:function(){return _},SP:function(){return P},ST:function(){return R},DecodeError:function(){return O},NormalizeError:function(){return j},PageNotFoundError:function(){return E},MissingStaticPage:function(){return M},MiddlewareNotFoundError:function(){return S},stringifyError:function(){return w}});var s=["CLS","FCP","FID","INP","LCP","TTFB"];function f(e){var t,r=!1;return function(){for(var n=arguments.length,o=Array(n),a=0;a<n;a++)o[a]=arguments[a];return r||(r=!0,t=e.apply(void 0,u._(o))),t}}var d=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,p=function(e){return d.test(e)};function h(){var e=window.location,t=e.protocol,r=e.hostname,n=e.port;return t+"//"+r+(n?":"+n:"")}function v(){var e=window.location.href,t=h();return e.substring(t.length)}function m(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function g(e){return e.finished||e.headersSent}function y(e){var t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?"?"+t.slice(1).join("?"):"")}function _(e,t){return b.apply(this,arguments)}function b(){return(b=n._(function(e,t){var r,n,o;return c._(this,function(a){switch(a.label){case 0:if(r=t.res||t.ctx&&t.ctx.res,e.getInitialProps)return[3,3];if(!(t.ctx&&t.Component))return[3,2];return n={},[4,_(t.Component,t.ctx)];case 1:return[2,(n.pageProps=a.sent(),n)];case 2:return[2,{}];case 3:return[4,e.getInitialProps(t)];case 4:if(o=a.sent(),r&&g(r))return[2,o];if(!o)throw Error('"'+m(e)+'.getInitialProps()" should resolve to an object. But found "'+o+'" instead.');return[2,o]}})})).apply(this,arguments)}var P="undefined"!=typeof performance,R=P&&["mark","measure","getEntriesByName"].every(function(e){return"function"==typeof performance[e]}),O=function(e){a._(r,e);var t=l._(r);function r(){return o._(this,r),t.apply(this,arguments)}return r}(i._(Error)),j=function(e){a._(r,e);var t=l._(r);function r(){return o._(this,r),t.apply(this,arguments)}return r}(i._(Error)),E=function(e){a._(r,e);var t=l._(r);function r(e){var n;return o._(this,r),(n=t.call(this)).code="ENOENT",n.name="PageNotFoundError",n.message="Cannot find module for page: "+e,n}return r}(i._(Error)),M=function(e){a._(r,e);var t=l._(r);function r(e,n){var a;return o._(this,r),(a=t.call(this)).message="Failed to load static file for page: "+e+" "+n,a}return r}(i._(Error)),S=function(e){a._(r,e);var t=l._(r);function r(){var e;return o._(this,r),(e=t.call(this)).code="ENOENT",e.message="Cannot find the middleware module",e}return r}(i._(Error));function w(e){return JSON.stringify({message:e.message,stack:e.stack})}}}]);