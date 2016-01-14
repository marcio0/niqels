/*
 AngularJS v1.2.3
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(X,O,r){'use strict';function A(b){return function(){var a=arguments[0],c,a="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.2.3/"+(b?b+"/":"")+a;for(c=1;c<arguments.length;c++)a=a+(1==c?"?":"&")+"p"+(c-1)+"="+encodeURIComponent("function"==typeof arguments[c]?arguments[c].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[c]?"undefined":"string"!=typeof arguments[c]?JSON.stringify(arguments[c]):arguments[c]);return Error(a)}}function pb(b){if(null==b||ya(b))return!1;var a=
b.length;return 1===b.nodeType&&a?!0:w(b)||K(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function q(b,a,c){var d;if(b)if(I(b))for(d in b)"prototype"!=d&&("length"!=d&&"name"!=d&&b.hasOwnProperty(d))&&a.call(c,b[d],d);else if(b.forEach&&b.forEach!==q)b.forEach(a,c);else if(pb(b))for(d=0;d<b.length;d++)a.call(c,b[d],d);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function Ob(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);return a.sort()}function Mc(b,a,c){for(var d=Ob(b),
e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function Pb(b){return function(a,c){b(c,a)}}function Za(){for(var b=ja.length,a;b;){b--;a=ja[b].charCodeAt(0);if(57==a)return ja[b]="A",ja.join("");if(90==a)ja[b]="0";else return ja[b]=String.fromCharCode(a+1),ja.join("")}ja.unshift("0");return ja.join("")}function Qb(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function F(b){var a=b.$$hashKey;q(arguments,function(a){a!==b&&q(a,function(a,c){b[c]=a})});Qb(b,a);return b}function S(b){return parseInt(b,
10)}function Rb(b,a){return F(new (F(function(){},{prototype:b})),a)}function v(){}function za(b){return b}function ba(b){return function(){return b}}function C(b){return"undefined"==typeof b}function B(b){return"undefined"!=typeof b}function V(b){return null!=b&&"object"==typeof b}function w(b){return"string"==typeof b}function qb(b){return"number"==typeof b}function Ka(b){return"[object Date]"==$a.apply(b)}function K(b){return"[object Array]"==$a.apply(b)}function I(b){return"function"==typeof b}
function ab(b){return"[object RegExp]"==$a.apply(b)}function ya(b){return b&&b.document&&b.location&&b.alert&&b.setInterval}function Nc(b){return b&&(b.nodeName||b.on&&b.find)}function Oc(b,a,c){var d=[];q(b,function(b,g,f){d.push(a.call(c,b,g,f))});return d}function bb(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function La(b,a){var c=bb(b,a);0<=c&&b.splice(c,1);return a}function ga(b,a){if(ya(b)||b&&b.$evalAsync&&b.$watch)throw Ma("cpws");if(a){if(b===
a)throw Ma("cpi");if(K(b))for(var c=a.length=0;c<b.length;c++)a.push(ga(b[c]));else{c=a.$$hashKey;q(a,function(b,c){delete a[c]});for(var d in b)a[d]=ga(b[d]);Qb(a,c)}}else(a=b)&&(K(b)?a=ga(b,[]):Ka(b)?a=new Date(b.getTime()):ab(b)?a=RegExp(b.source):V(b)&&(a=ga(b,{})));return a}function Pc(b,a){a=a||{};for(var c in b)b.hasOwnProperty(c)&&"$$"!==c.substr(0,2)&&(a[c]=b[c]);return a}function Aa(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&
"object"==c)if(K(b)){if(!K(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!Aa(b[d],a[d]))return!1;return!0}}else{if(Ka(b))return Ka(a)&&b.getTime()==a.getTime();if(ab(b)&&ab(a))return b.toString()==a.toString();if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&a.$watch||ya(b)||ya(a)||K(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!I(b[d])){if(!Aa(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==r&&!I(a[d]))return!1;return!0}return!1}function Sb(){return O.securityPolicy&&
O.securityPolicy.isActive||O.querySelector&&!(!O.querySelector("[ng-csp]")&&!O.querySelector("[data-ng-csp]"))}function rb(b,a){var c=2<arguments.length?ta.call(arguments,2):[];return!I(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(ta.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Qc(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)?c=r:ya(a)?c="$WINDOW":a&&O===a?c="$DOCUMENT":a&&(a.$evalAsync&&
a.$watch)&&(c="$SCOPE");return c}function oa(b,a){return"undefined"===typeof b?r:JSON.stringify(b,Qc,a?"  ":null)}function Tb(b){return w(b)?JSON.parse(b):b}function Na(b){b&&0!==b.length?(b=t(""+b),b=!("f"==b||"0"==b||"false"==b||"no"==b||"n"==b||"[]"==b)):b=!1;return b}function ha(b){b=x(b).clone();try{b.html("")}catch(a){}var c=x("<div>").append(b).html();try{return 3===b[0].nodeType?t(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+t(b)})}catch(d){return t(c)}}function Ub(b){try{return decodeURIComponent(b)}catch(a){}}
function Vb(b){var a={},c,d;q((b||"").split("&"),function(b){b&&(c=b.split("="),d=Ub(c[0]),B(d)&&(b=B(c[1])?Ub(c[1]):!0,a[d]?K(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Wb(b){var a=[];q(b,function(b,d){K(b)?q(b,function(b){a.push(ua(d,!0)+(!0===b?"":"="+ua(b,!0)))}):a.push(ua(d,!0)+(!0===b?"":"="+ua(b,!0)))});return a.length?a.join("&"):""}function sb(b){return ua(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ua(b,a){return encodeURIComponent(b).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,a?"%20":"+")}function Rc(b,a){function c(a){a&&d.push(a)}var d=[b],e,g,f=["ng:app","ng-app","x-ng-app","data-ng-app"],h=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;q(f,function(a){f[a]=!0;c(O.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(q(b.querySelectorAll("."+a),c),q(b.querySelectorAll("."+a+"\\:"),c),q(b.querySelectorAll("["+a+"]"),c))});q(d,function(a){if(!e){var b=h.exec(" "+a.className+" ");b?(e=a,g=
(b[2]||"").replace(/\s+/g,",")):q(a.attributes,function(b){!e&&f[b.name]&&(e=a,g=b.value)})}});e&&a(e,g?[g]:[])}function Xb(b,a){var c=function(){b=x(b);if(b.injector()){var c=b[0]===O?"document":ha(b);throw Ma("btstrpd",c);}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");c=Yb(a);c.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",function(a,b,c,d,e){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},d=/^NG_DEFER_BOOTSTRAP!/;
if(X&&!d.test(X.name))return c();X.name=X.name.replace(d,"");cb.resumeBootstrap=function(b){q(b,function(b){a.push(b)});c()}}function db(b,a){a=a||"_";return b.replace(Sc,function(b,d){return(d?a:"")+b.toLowerCase()})}function tb(b,a,c){if(!b)throw Ma("areq",a||"?",c||"required");return b}function Oa(b,a,c){c&&K(b)&&(b=b[b.length-1]);tb(I(b),a,"not a function, got "+(b&&"object"==typeof b?b.constructor.name||"Object":typeof b));return b}function va(b,a){if("hasOwnProperty"===b)throw Ma("badname",
a);}function ub(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,g=a.length,f=0;f<g;f++)d=a[f],b&&(b=(e=b)[d]);return!c&&I(b)?rb(e,b):b}function vb(b){if(b.startNode===b.endNode)return x(b.startNode);var a=b.startNode,c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b.endNode);return x(c)}function Tc(b){var a=A("$injector"),c=A("ng");b=b.angular||(b.angular={});b.$$minErr=b.$$minErr||A;return b.module||(b.module=function(){var b={};return function(e,g,f){if("hasOwnProperty"===e)throw c("badname",
"module");g&&b.hasOwnProperty(e)&&(b[e]=null);return b[e]||(b[e]=function(){function b(a,d,e){return function(){c[e||"push"]([a,d,arguments]);return n}}if(!g)throw a("nomod",e);var c=[],d=[],l=b("$injector","invoke"),n={_invokeQueue:c,_runBlocks:d,requires:g,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:b("$provide","value"),constant:b("$provide","constant","unshift"),animation:b("$animateProvider","register"),filter:b("$filterProvider",
"register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:l,run:function(a){d.push(a);return this}};f&&l(f);return n}())}}())}function Pa(b){return b.replace(Uc,function(a,b,d,e){return e?d.toUpperCase():d}).replace(Vc,"Moz$1")}function wb(b,a,c,d){function e(b){var e=c&&b?[this.filter(b)]:[this],m=a,k,l,n,p,s,D;if(!d||null!=b)for(;e.length;)for(k=e.shift(),l=0,n=k.length;l<n;l++)for(p=x(k[l]),m?p.triggerHandler("$destroy"):m=!m,s=0,p=(D=p.children()).length;s<
p;s++)e.push(Ba(D[s]));return g.apply(this,arguments)}var g=Ba.fn[b],g=g.$original||g;e.$original=g;Ba.fn[b]=e}function L(b){if(b instanceof L)return b;if(!(this instanceof L)){if(w(b)&&"<"!=b.charAt(0))throw xb("nosel");return new L(b)}if(w(b)){var a=O.createElement("div");a.innerHTML="<div>&#160;</div>"+b;a.removeChild(a.firstChild);yb(this,a.childNodes);x(O.createDocumentFragment()).append(this)}else yb(this,b)}function zb(b){return b.cloneNode(!0)}function Qa(b){Zb(b);var a=0;for(b=b.childNodes||
[];a<b.length;a++)Qa(b[a])}function $b(b,a,c,d){if(B(d))throw xb("offargs");var e=ka(b,"events");ka(b,"handle")&&(C(a)?q(e,function(a,c){Ab(b,c,a);delete e[c]}):q(a.split(" "),function(a){C(c)?(Ab(b,a,e[a]),delete e[a]):La(e[a]||[],c)}))}function Zb(b,a){var c=b[eb],d=Ra[c];d&&(a?delete Ra[c].data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),$b(b)),delete Ra[c],b[eb]=r))}function ka(b,a,c){var d=b[eb],d=Ra[d||-1];if(B(c))d||(b[eb]=d=++Wc,d=Ra[d]={}),d[a]=c;else return d&&d[a]}function ac(b,
a,c){var d=ka(b,"data"),e=B(c),g=!e&&B(a),f=g&&!V(a);d||f||ka(b,"data",d={});if(e)d[a]=c;else if(g){if(f)return d&&d[a];F(d,a)}else return d}function Bb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Cb(b,a){a&&b.setAttribute&&q(a.split(" "),function(a){b.setAttribute("class",$((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+$(a)+" "," ")))})}function Db(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||
"")+" ").replace(/[\n\t]/g," ");q(a.split(" "),function(a){a=$(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",$(c))}}function yb(b,a){if(a){a=a.nodeName||!B(a.length)||ya(a)?[a]:a;for(var c=0;c<a.length;c++)b.push(a[c])}}function bc(b,a){return fb(b,"$"+(a||"ngController")+"Controller")}function fb(b,a,c){b=x(b);9==b[0].nodeType&&(b=b.find("html"));for(a=K(a)?a:[a];b.length;){for(var d=0,e=a.length;d<e;d++)if((c=b.data(a[d]))!==r)return c;b=b.parent()}}function cc(b,a){var c=gb[a.toLowerCase()];
return c&&dc[b.nodeName]&&c}function Xc(b,a){var c=function(c,e){c.preventDefault||(c.preventDefault=function(){c.returnValue=!1});c.stopPropagation||(c.stopPropagation=function(){c.cancelBubble=!0});c.target||(c.target=c.srcElement||O);if(C(c.defaultPrevented)){var g=c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;g.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented||!1===c.returnValue};q(a[e||c.type],function(a){a.call(b,c)});8>=M?(c.preventDefault=
null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};c.elem=b;return c}function Ca(b){var a=typeof b,c;"object"==a&&null!==b?"function"==typeof(c=b.$$hashKey)?c=b.$$hashKey():c===r&&(c=b.$$hashKey=Za()):c=b;return a+":"+c}function Sa(b){q(b,this.put,this)}function ec(b){var a,c;"function"==typeof b?(a=b.$inject)||(a=[],b.length&&(c=b.toString().replace(Yc,""),c=c.match(Zc),q(c[1].split($c),function(b){b.replace(ad,function(b,
c,d){a.push(d)})})),b.$inject=a):K(b)?(c=b.length-1,Oa(b[c],"fn"),a=b.slice(0,c)):Oa(b,"fn",!0);return a}function Yb(b){function a(a){return function(b,c){if(V(b))q(b,Pb(a));else return a(b,c)}}function c(a,b){va(a,"service");if(I(b)||K(b))b=n.instantiate(b);if(!b.$get)throw Ta("pget",a);return l[a+h]=b}function d(a,b){return c(a,{$get:b})}function e(a){var b=[],c,d,h,g;q(a,function(a){if(!k.get(a)){k.put(a,!0);try{if(w(a))for(c=Ua(a),b=b.concat(e(c.requires)).concat(c._runBlocks),d=c._invokeQueue,
h=0,g=d.length;h<g;h++){var f=d[h],m=n.get(f[0]);m[f[1]].apply(m,f[2])}else I(a)?b.push(n.invoke(a)):K(a)?b.push(n.invoke(a)):Oa(a,"module")}catch(l){throw K(a)&&(a=a[a.length-1]),l.message&&(l.stack&&-1==l.stack.indexOf(l.message))&&(l=l.message+"\n"+l.stack),Ta("modulerr",a,l.stack||l.message||l);}}});return b}function g(a,b){function c(d){if(a.hasOwnProperty(d)){if(a[d]===f)throw Ta("cdep",m.join(" <- "));return a[d]}try{return m.unshift(d),a[d]=f,a[d]=b(d)}finally{m.shift()}}function d(a,b,e){var h=
[],g=ec(a),f,k,m;k=0;for(f=g.length;k<f;k++){m=g[k];if("string"!==typeof m)throw Ta("itkn",m);h.push(e&&e.hasOwnProperty(m)?e[m]:c(m))}a.$inject||(a=a[f]);switch(b?-1:h.length){case 0:return a();case 1:return a(h[0]);case 2:return a(h[0],h[1]);case 3:return a(h[0],h[1],h[2]);case 4:return a(h[0],h[1],h[2],h[3]);case 5:return a(h[0],h[1],h[2],h[3],h[4]);case 6:return a(h[0],h[1],h[2],h[3],h[4],h[5]);case 7:return a(h[0],h[1],h[2],h[3],h[4],h[5],h[6]);case 8:return a(h[0],h[1],h[2],h[3],h[4],h[5],h[6],
h[7]);case 9:return a(h[0],h[1],h[2],h[3],h[4],h[5],h[6],h[7],h[8]);case 10:return a(h[0],h[1],h[2],h[3],h[4],h[5],h[6],h[7],h[8],h[9]);default:return a.apply(b,h)}}return{invoke:d,instantiate:function(a,b){var c=function(){},e;c.prototype=(K(a)?a[a.length-1]:a).prototype;c=new c;e=d(a,c,b);return V(e)||I(e)?e:c},get:c,annotate:ec,has:function(b){return l.hasOwnProperty(b+h)||a.hasOwnProperty(b)}}}var f={},h="Provider",m=[],k=new Sa,l={$provide:{provider:a(c),factory:a(d),service:a(function(a,b){return d(a,
["$injector",function(a){return a.instantiate(b)}])}),value:a(function(a,b){return d(a,ba(b))}),constant:a(function(a,b){va(a,"constant");l[a]=b;p[a]=b}),decorator:function(a,b){var c=n.get(a+h),d=c.$get;c.$get=function(){var a=s.invoke(d,c);return s.invoke(b,null,{$delegate:a})}}}},n=l.$injector=g(l,function(){throw Ta("unpr",m.join(" <- "));}),p={},s=p.$injector=g(p,function(a){a=n.get(a+h);return s.invoke(a.$get,a)});q(e(b),function(a){s.invoke(a||v)});return s}function bd(){var b=!0;this.disableAutoScrolling=
function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;q(a,function(a){b||"a"!==t(a.nodeName)||(b=a)});return b}function g(){var b=c.hash(),d;b?(d=f.getElementById(b))?d.scrollIntoView():(d=e(f.getElementsByName(b)))?d.scrollIntoView():"top"===b&&a.scrollTo(0,0):a.scrollTo(0,0)}var f=a.document;b&&d.$watch(function(){return c.hash()},function(){d.$evalAsync(g)});return g}]}function cd(b,a,c,d){function e(a){try{a.apply(null,ta.call(arguments,1))}finally{if(D--,
0===D)for(;u.length;)try{u.pop()()}catch(b){c.error(b)}}}function g(a,b){(function la(){q(Q,function(a){a()});z=b(la,a)})()}function f(){y=null;Y!=h.url()&&(Y=h.url(),q(aa,function(a){a(h.url())}))}var h=this,m=a[0],k=b.location,l=b.history,n=b.setTimeout,p=b.clearTimeout,s={};h.isMock=!1;var D=0,u=[];h.$$completeOutstandingRequest=e;h.$$incOutstandingRequestCount=function(){D++};h.notifyWhenNoOutstandingRequests=function(a){q(Q,function(a){a()});0===D?a():u.push(a)};var Q=[],z;h.addPollFn=function(a){C(z)&&
g(100,n);Q.push(a);return a};var Y=k.href,H=a.find("base"),y=null;h.url=function(a,c){k!==b.location&&(k=b.location);if(a){if(Y!=a)return Y=a,d.history?c?l.replaceState(null,"",a):(l.pushState(null,"",a),H.attr("href",H.attr("href"))):(y=a,c?k.replace(a):k.href=a),h}else return y||k.href.replace(/%27/g,"'")};var aa=[],R=!1;h.onUrlChange=function(a){if(!R){if(d.history)x(b).on("popstate",f);if(d.hashchange)x(b).on("hashchange",f);else h.addPollFn(f);R=!0}aa.push(a);return a};h.baseHref=function(){var a=
H.attr("href");return a?a.replace(/^https?\:\/\/[^\/]*/,""):""};var E={},Z="",da=h.baseHref();h.cookies=function(a,b){var d,e,h,g;if(a)b===r?m.cookie=escape(a)+"=;path="+da+";expires=Thu, 01 Jan 1970 00:00:00 GMT":w(b)&&(d=(m.cookie=escape(a)+"="+escape(b)+";path="+da).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(m.cookie!==Z)for(Z=m.cookie,d=Z.split("; "),E={},h=0;h<d.length;h++)e=d[h],g=e.indexOf("="),0<g&&(a=unescape(e.substring(0,
g)),E[a]===r&&(E[a]=unescape(e.substring(g+1))));return E}};h.defer=function(a,b){var c;D++;c=n(function(){delete s[c];e(a)},b||0);s[c]=!0;return c};h.defer.cancel=function(a){return s[a]?(delete s[a],p(a),e(v),!0):!1}}function dd(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new cd(b,d,a,c)}]}function ed(){this.$get=function(){function b(b,d){function e(a){a!=n&&(p?p==a&&(p=a.n):p=a,g(a.n,a.p),g(a,n),n=a,n.n=null)}function g(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in
a)throw A("$cacheFactory")("iid",b);var f=0,h=F({},d,{id:b}),m={},k=d&&d.capacity||Number.MAX_VALUE,l={},n=null,p=null;return a[b]={put:function(a,b){var c=l[a]||(l[a]={key:a});e(c);if(!C(b))return a in m||f++,m[a]=b,f>k&&this.remove(p.key),b},get:function(a){var b=l[a];if(b)return e(b),m[a]},remove:function(a){var b=l[a];b&&(b==n&&(n=b.p),b==p&&(p=b.n),g(b.n,b.p),delete l[a],delete m[a],f--)},removeAll:function(){m={};f=0;l={};n=p=null},destroy:function(){l=h=m=null;delete a[b]},info:function(){return F({},
h,{size:f})}}}var a={};b.info=function(){var b={};q(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function fd(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function gc(b,a){var c={},d="Directive",e=/^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,g=/(([\d\w\-_]+)(?:\:([^;]+))?;?)/,f=/^(on[a-z]+|formaction)$/;this.directive=function m(a,e){va(a,"directive");w(a)?(tb(e,"directiveFactory"),c.hasOwnProperty(a)||(c[a]=[],b.factory(a+d,["$injector","$exceptionHandler",
function(b,d){var e=[];q(c[a],function(c,g){try{var f=b.invoke(c);I(f)?f={compile:ba(f)}:!f.compile&&f.link&&(f.compile=ba(f.link));f.priority=f.priority||0;f.index=g;f.name=f.name||a;f.require=f.require||f.controller&&f.name;f.restrict=f.restrict||"A";e.push(f)}catch(m){d(m)}});return e}])),c[a].push(e)):q(a,Pb(m));return this};this.aHrefSanitizationWhitelist=function(b){return B(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return B(b)?
(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};this.$get=["$injector","$interpolate","$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,l,n,p,s,D,u,Q,z,Y,H){function y(a,b,c,d,e){a instanceof x||(a=x(a));q(a,function(b,c){3==b.nodeType&&b.nodeValue.match(/\S+/)&&(a[c]=x(b).wrap("<span></span>").parent()[0])});var g=R(a,b,a,c,d,e);return function(b,c,d){tb(b,"scope");var e=c?Da.clone.call(a):
a;q(d,function(a,b){e.data("$"+b+"Controller",a)});d=0;for(var f=e.length;d<f;d++){var k=e[d];1!=k.nodeType&&9!=k.nodeType||e.eq(d).data("$scope",b)}aa(e,"ng-scope");c&&c(e,b);g&&g(b,e,e);return e}}function aa(a,b){try{a.addClass(b)}catch(c){}}function R(a,b,c,d,e,g){function f(a,c,d,e){var g,m,l,n,p,s,D,ca=[];p=0;for(s=c.length;p<s;p++)ca.push(c[p]);D=p=0;for(s=k.length;p<s;D++)m=ca[D],c=k[p++],g=k[p++],l=x(m),c?(c.scope?(n=a.$new(),l.data("$scope",n),aa(l,"ng-scope")):n=a,(l=c.transclude)||!e&&
b?c(g,n,m,d,E(a,l||b)):c(g,n,m,r,e)):g&&g(a,m.childNodes,r,e)}for(var k=[],m,l,n,p=0;p<a.length;p++)l=new Eb,m=Z(a[p],[],l,0===p?d:r,e),m=(g=m.length?N(m,a[p],l,b,c,null,[],[],g):null)&&g.terminal||!a[p].childNodes||!a[p].childNodes.length?null:R(a[p].childNodes,g?g.transclude:b),k.push(g),k.push(m),n=n||g||m,g=null;return n?f:null}function E(a,b){return function(c,d,e){var g=!1;c||(c=a.$new(),g=c.$$transcluded=!0);d=b(c,d,e);if(g)d.on("$destroy",rb(c,c.$destroy));return d}}function Z(a,b,c,d,f){var k=
c.$attr,m;switch(a.nodeType){case 1:la(b,ma(Ea(a).toLowerCase()),"E",d,f);var l,n,p;m=a.attributes;for(var s=0,D=m&&m.length;s<D;s++){var y=!1,u=!1;l=m[s];if(!M||8<=M||l.specified){n=l.name;p=ma(n);Fa.test(p)&&(n=db(p.substr(6),"-"));var Y=p.replace(/(Start|End)$/,"");p===Y+"Start"&&(y=n,u=n.substr(0,n.length-5)+"end",n=n.substr(0,n.length-6));p=ma(n.toLowerCase());k[p]=n;c[p]=l=$(M&&"href"==n?decodeURIComponent(a.getAttribute(n,2)):l.value);cc(a,p)&&(c[p]=!0);L(a,b,l,p);la(b,p,"A",d,f,y,u)}}a=a.className;
if(w(a)&&""!==a)for(;m=g.exec(a);)p=ma(m[2]),la(b,p,"C",d,f)&&(c[p]=$(m[3])),a=a.substr(m.index+m[0].length);break;case 3:t(b,a.nodeValue);break;case 8:try{if(m=e.exec(a.nodeValue))p=ma(m[1]),la(b,p,"M",d,f)&&(c[p]=$(m[2]))}catch(q){}}b.sort(v);return b}function da(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ia("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return x(d)}function P(a,b,
c){return function(d,e,g,f,k){e=da(e[0],b,c);return a(d,e,g,f,k)}}function N(a,c,d,e,g,f,m,n,p){function u(a,b,c,d){if(a){c&&(a=P(a,c,d));a.require=G.require;if(E===G||G.$$isolateScope)a=U(a,{isolateScope:!0});m.push(a)}if(b){c&&(b=P(b,c,d));b.require=G.require;if(E===G||G.$$isolateScope)b=U(b,{isolateScope:!0});n.push(b)}}function Y(a,b,c){var d,e="data",g=!1;if(w(a)){for(;"^"==(d=a.charAt(0))||"?"==d;)a=a.substr(1),"^"==d&&(e="inheritedData"),g=g||"?"==d;d=null;c&&"data"===e&&(d=c[a]);d=d||b[e]("$"+
a+"Controller");if(!d&&!g)throw ia("ctreq",a,ea);}else K(a)&&(d=[],q(a,function(a){d.push(Y(a,b,c))}));return d}function Q(a,e,g,f,p){function y(a,b){var c;2>arguments.length&&(b=a,a=r);Ga&&(c=P);return p(a,b,c)}var u,ca,H,R,da,J,P={},Z;u=c===g?d:Pc(d,new Eb(x(g),d.$attr));ca=u.$$element;if(E){var T=/^\s*([@=&])(\??)\s*(\w*)\s*$/;f=x(g);J=e.$new(!0);N&&N===E.$$originalDirective?f.data("$isolateScope",J):f.data("$isolateScopeNoTemplate",J);aa(f,"ng-isolate-scope");q(E.scope,function(a,c){var d=a.match(T)||
[],g=d[3]||c,f="?"==d[2],d=d[1],m,l,n;J.$$isolateBindings[c]=d+g;switch(d){case "@":u.$observe(g,function(a){J[c]=a});u.$$observers[g].$$scope=e;u[g]&&(J[c]=b(u[g])(e));break;case "=":if(f&&!u[g])break;l=s(u[g]);n=l.assign||function(){m=J[c]=l(e);throw ia("nonassign",u[g],E.name);};m=J[c]=l(e);J.$watch(function(){var a=l(e);a!==J[c]&&(a!==m?m=J[c]=a:n(e,a=m=J[c]));return a});break;case "&":l=s(u[g]);J[c]=function(a){return l(e,a)};break;default:throw ia("iscp",E.name,c,a);}})}Z=p&&y;z&&q(z,function(a){var b=
{$scope:a===E||a.$$isolateScope?J:e,$element:ca,$attrs:u,$transclude:Z},c;da=a.controller;"@"==da&&(da=u[a.name]);c=D(da,b);P[a.name]=c;Ga||ca.data("$"+a.name+"Controller",c);a.controllerAs&&(b.$scope[a.controllerAs]=c)});f=0;for(H=m.length;f<H;f++)try{R=m[f],R(R.isolateScope?J:e,ca,u,R.require&&Y(R.require,ca,P),Z)}catch(t){l(t,ha(ca))}f=e;E&&(E.template||null===E.templateUrl)&&(f=J);a&&a(f,g.childNodes,r,p);for(f=n.length-1;0<=f;f--)try{R=n[f],R(R.isolateScope?J:e,ca,u,R.require&&Y(R.require,ca,
P),Z)}catch(v){l(v,ha(ca))}}p=p||{};var H=-Number.MAX_VALUE,R,z=p.controllerDirectives,E=p.newIsolateScopeDirective,N=p.templateDirective;p=p.nonTlbTranscludeDirective;for(var la=!1,Ga=!1,v=d.$$element=x(c),G,ea,t,F=e,A,L=0,M=a.length;L<M;L++){G=a[L];var Va=G.$$start,Fa=G.$$end;Va&&(v=da(c,Va,Fa));t=r;if(H>G.priority)break;if(t=G.scope)R=R||G,G.templateUrl||(C("new/isolated scope",E,G,v),V(t)&&(E=G));ea=G.name;!G.templateUrl&&G.controller&&(t=G.controller,z=z||{},C("'"+ea+"' controller",z[ea],G,v),
z[ea]=G);if(t=G.transclude)la=!0,G.$$tlb||(C("transclusion",p,G,v),p=G),"element"==t?(Ga=!0,H=G.priority,t=da(c,Va,Fa),v=d.$$element=x(O.createComment(" "+ea+": "+d[ea]+" ")),c=v[0],S(g,x(ta.call(t,0)),c),F=y(t,e,H,f&&f.name,{nonTlbTranscludeDirective:p})):(t=x(zb(c)).contents(),v.html(""),F=y(t,e));if(G.template)if(C("template",N,G,v),N=G,t=I(G.template)?G.template(v,d):G.template,t=hc(t),G.replace){f=G;t=x("<div>"+$(t)+"</div>").contents();c=t[0];if(1!=t.length||1!==c.nodeType)throw ia("tplrt",
ea,"");S(g,v,c);M={$attr:{}};t=Z(c,[],M);var W=a.splice(L+1,a.length-(L+1));E&&T(t);a=a.concat(t).concat(W);fc(d,M);M=a.length}else v.html(t);if(G.templateUrl)C("template",N,G,v),N=G,G.replace&&(f=G),Q=B(a.splice(L,a.length-L),v,d,g,F,m,n,{controllerDirectives:z,newIsolateScopeDirective:E,templateDirective:N,nonTlbTranscludeDirective:p}),M=a.length;else if(G.compile)try{A=G.compile(v,d,F),I(A)?u(null,A,Va,Fa):A&&u(A.pre,A.post,Va,Fa)}catch(X){l(X,ha(v))}G.terminal&&(Q.terminal=!0,H=Math.max(H,G.priority))}Q.scope=
R&&!0===R.scope;Q.transclude=la&&F;return Q}function T(a){for(var b=0,c=a.length;b<c;b++)a[b]=Rb(a[b],{$$isolateScope:!0})}function la(b,e,g,f,k,n,p){if(e===k)return null;k=null;if(c.hasOwnProperty(e)){var s;e=a.get(e+d);for(var D=0,u=e.length;D<u;D++)try{s=e[D],(f===r||f>s.priority)&&-1!=s.restrict.indexOf(g)&&(n&&(s=Rb(s,{$$start:n,$$end:p})),b.push(s),k=s)}catch(y){l(y)}}return k}function fc(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;q(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&(d+=("style"===e?
";":" ")+b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,g){"class"==g?(aa(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==g?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==g.charAt(0)||a.hasOwnProperty(g)||(a[g]=b,d[g]=c[g])})}function B(a,b,c,d,e,g,f,m){var k=[],l,s,D=b[0],u=a.shift(),y=F({},u,{templateUrl:null,transclude:null,replace:null,$$originalDirective:u}),Y=I(u.templateUrl)?u.templateUrl(b,c):u.templateUrl;b.html("");n.get(z.getTrustedResourceUrl(Y),
{cache:p}).success(function(n){var p,Q;n=hc(n);if(u.replace){n=x("<div>"+$(n)+"</div>").contents();p=n[0];if(1!=n.length||1!==p.nodeType)throw ia("tplrt",u.name,Y);n={$attr:{}};S(d,b,p);var H=Z(p,[],n);V(u.scope)&&T(H);a=H.concat(a);fc(c,n)}else p=D,b.html(n);a.unshift(y);l=N(a,p,c,e,b,u,g,f,m);q(d,function(a,c){a==p&&(d[c]=b[0])});for(s=R(b[0].childNodes,e);k.length;){n=k.shift();Q=k.shift();var aa=k.shift(),z=k.shift(),H=b[0];Q!==D&&(H=zb(p),S(aa,x(Q),H));Q=l.transclude?E(n,l.transclude):z;l(s,
n,H,d,Q)}k=null}).error(function(a,b,c,d){throw ia("tpload",d.url);});return function(a,b,c,d,e){k?(k.push(b),k.push(c),k.push(d),k.push(e)):l(s,b,c,d,e)}}function v(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function C(a,b,c,d){if(b)throw ia("multidir",b.name,c.name,a,ha(d));}function t(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:ba(function(a,b){var c=b.parent(),e=c.data("$binding")||[];e.push(d);aa(c.data("$binding",e),"ng-binding");
a.$watch(d,function(a){b[0].nodeValue=a})})})}function A(a,b){if("srcdoc"==b)return z.HTML;var c=Ea(a);if("xlinkHref"==b||"FORM"==c&&"action"==b||"IMG"!=c&&("src"==b||"ngSrc"==b))return z.RESOURCE_URL}function L(a,c,d,e){var g=b(d,!0);if(g){if("multiple"===e&&"SELECT"===Ea(a))throw ia("selmulti",ha(a));c.push({priority:100,compile:function(){return{pre:function(c,d,m){d=m.$$observers||(m.$$observers={});if(f.test(e))throw ia("nodomevents");if(g=b(m[e],!0,A(a,e)))m[e]=g(c),(d[e]||(d[e]=[])).$$inter=
!0,(m.$$observers&&m.$$observers[e].$$scope||c).$watch(g,function(a,b){"class"===e&&a!=b?m.$updateClass(a,b):m.$set(e,a)})}}}})}}function S(a,b,c){var d=b[0],e=b.length,g=d.parentNode,f,m;if(a)for(f=0,m=a.length;f<m;f++)if(a[f]==d){a[f++]=c;m=f+e-1;for(var k=a.length;f<k;f++,m++)m<k?a[f]=a[m]:delete a[f];a.length-=e-1;break}g&&g.replaceChild(c,d);a=O.createDocumentFragment();a.appendChild(d);c[x.expando]=d[x.expando];d=1;for(e=b.length;d<e;d++)g=b[d],x(g).remove(),a.appendChild(g),delete b[d];b[0]=
c;b.length=1}function U(a,b){return F(function(){return a.apply(null,arguments)},a,b)}var Eb=function(a,b){this.$$element=a;this.$attr=b||{}};Eb.prototype={$normalize:ma,$addClass:function(a){a&&0<a.length&&Y.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&Y.removeClass(this.$$element,a)},$updateClass:function(a,b){this.$removeClass(ic(b,a));this.$addClass(ic(a,b))},$set:function(a,b,c,d){var e=cc(this.$$element[0],a);e&&(this.$$element.prop(a,b),d=e);this[a]=b;d?this.$attr[a]=
d:(d=this.$attr[a])||(this.$attr[a]=d=db(a,"-"));e=Ea(this.$$element);if("A"===e&&"href"===a||"IMG"===e&&"src"===a)this[a]=b=H(b,"src"===a);!1!==c&&(null===b||b===r?this.$$element.removeAttr(d):this.$$element.attr(d,b));(c=this.$$observers)&&q(c[a],function(a){try{a(b)}catch(c){l(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=[]);e.push(b);u.$evalAsync(function(){e.$$inter||b(c[a])});return b}};var ea=b.startSymbol(),Ga=b.endSymbol(),hc="{{"==ea||"}}"==
Ga?za:function(a){return a.replace(/\{\{/g,ea).replace(/}}/g,Ga)},Fa=/^ngAttr[A-Z]/;return y}]}function ma(b){return Pa(b.replace(gd,""))}function ic(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),g=0;a:for(;g<d.length;g++){for(var f=d[g],h=0;h<e.length;h++)if(f==e[h])continue a;c+=(0<c.length?" ":"")+f}return c}function hd(){var b={},a=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,d){va(a,"controller");V(a)?F(b,a):b[a]=d};this.$get=["$injector","$window",function(c,d){return function(e,g){var f,
h,m;w(e)&&(f=e.match(a),h=f[1],m=f[3],e=b.hasOwnProperty(h)?b[h]:ub(g.$scope,h,!0)||ub(d,h,!0),Oa(e,h,!0));f=c.instantiate(e,g);if(m){if(!g||"object"!=typeof g.$scope)throw A("$controller")("noscp",h||e.name,m);g.$scope[m]=f}return f}}]}function id(){this.$get=["$window",function(b){return x(b.document)}]}function jd(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function jc(b){var a={},c,d,e;if(!b)return a;q(b.split("\n"),function(b){e=b.indexOf(":");c=t($(b.substr(0,
e)));d=$(b.substr(e+1));c&&(a[c]=a[c]?a[c]+(", "+d):d)});return a}function kc(b){var a=V(b)?b:r;return function(c){a||(a=jc(b));return c?a[t(c)]||null:a}}function lc(b,a,c){if(I(c))return c(b,a);q(c,function(c){b=c(b,a)});return b}function kd(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults={transformResponse:[function(d){w(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=Tb(d)));return d}],transformRequest:[function(a){return V(a)&&
"[object File]"!==$a.apply(a)?oa(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:d,put:d,patch:d},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},g=this.interceptors=[],f=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,n,p){function s(a){function c(a){var b=F({},a,{data:lc(a.data,a.headers,d.transformResponse)});return 200<=a.status&&300>a.status?b:n.reject(b)}var d={transformRequest:e.transformRequest,
transformResponse:e.transformResponse},g=function(a){function b(a){var c;q(a,function(b,d){I(b)&&(c=b(),null!=c?a[d]=c:delete a[d])})}var c=e.headers,d=F({},a.headers),g,f,c=F({},c.common,c[t(a.method)]);b(c);b(d);a:for(g in c){a=t(g);for(f in d)if(t(f)===a)continue a;d[g]=c[g]}return d}(a);F(d,a);d.headers=g;d.method=Ha(d.method);(a=Fb(d.url)?b.cookies()[d.xsrfCookieName||e.xsrfCookieName]:r)&&(g[d.xsrfHeaderName||e.xsrfHeaderName]=a);var h=[function(a){g=a.headers;var b=lc(a.data,kc(g),a.transformRequest);
C(a.data)&&q(g,function(a,b){"content-type"===t(b)&&delete g[b]});C(a.withCredentials)&&!C(e.withCredentials)&&(a.withCredentials=e.withCredentials);return D(a,b,g).then(c,c)},r],f=n.when(d);for(q(z,function(a){(a.request||a.requestError)&&h.unshift(a.request,a.requestError);(a.response||a.responseError)&&h.push(a.response,a.responseError)});h.length;){a=h.shift();var k=h.shift(),f=f.then(a,k)}f.success=function(a){f.then(function(b){a(b.data,b.status,b.headers,d)});return f};f.error=function(a){f.then(null,
function(b){a(b.data,b.status,b.headers,d)});return f};return f}function D(b,c,g){function f(a,b,c){q&&(200<=a&&300>a?q.put(r,[a,b,jc(c)]):q.remove(r));m(b,a,c);d.$$phase||d.$apply()}function m(a,c,d){c=Math.max(c,0);(200<=c&&300>c?p.resolve:p.reject)({data:a,status:c,headers:kc(d),config:b})}function k(){var a=bb(s.pendingRequests,b);-1!==a&&s.pendingRequests.splice(a,1)}var p=n.defer(),D=p.promise,q,z,r=u(b.url,b.params);s.pendingRequests.push(b);D.then(k,k);(b.cache||e.cache)&&(!1!==b.cache&&"GET"==
b.method)&&(q=V(b.cache)?b.cache:V(e.cache)?e.cache:Q);if(q)if(z=q.get(r),B(z)){if(z.then)return z.then(k,k),z;K(z)?m(z[1],z[0],ga(z[2])):m(z,200,{})}else q.put(r,D);C(z)&&a(b.method,r,c,f,g,b.timeout,b.withCredentials,b.responseType);return D}function u(a,b){if(!b)return a;var c=[];Mc(b,function(a,b){null===a||C(a)||(K(a)||(a=[a]),q(a,function(a){V(a)&&(a=oa(a));c.push(ua(b)+"="+ua(a))}))});return a+(-1==a.indexOf("?")?"?":"&")+c.join("&")}var Q=c("$http"),z=[];q(g,function(a){z.unshift(w(a)?p.get(a):
p.invoke(a))});q(f,function(a,b){var c=w(a)?p.get(a):p.invoke(a);z.splice(b,0,{response:function(a){return c(n.when(a))},responseError:function(a){return c(n.reject(a))}})});s.pendingRequests=[];(function(a){q(arguments,function(a){s[a]=function(b,c){return s(F(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){s[a]=function(b,c,d){return s(F(d||{},{method:a,url:b,data:c}))}})})("post","put");s.defaults=e;return s}]}function ld(){this.$get=["$browser",
"$window","$document",function(b,a,c){return md(b,nd,b.defer,a.angular.callbacks,c[0])}]}function md(b,a,c,d,e){function g(a,b){var c=e.createElement("script"),d=function(){c.onreadystatechange=c.onload=c.onerror=null;e.body.removeChild(c);b&&b()};c.type="text/javascript";c.src=a;M&&8>=M?c.onreadystatechange=function(){/loaded|complete/.test(c.readyState)&&d()}:c.onload=c.onerror=function(){d()};e.body.appendChild(c);return d}var f=-1;return function(e,m,k,l,n,p,s,D){function u(){z=f;H&&H();y&&y.abort()}
function Q(a,d,e,g){var f=wa(m).protocol;aa&&c.cancel(aa);H=y=null;d="file"==f&&0===d?e?200:404:d;a(1223==d?204:d,e,g);b.$$completeOutstandingRequest(v)}var z;b.$$incOutstandingRequestCount();m=m||b.url();if("jsonp"==t(e)){var r="_"+(d.counter++).toString(36);d[r]=function(a){d[r].data=a};var H=g(m.replace("JSON_CALLBACK","angular.callbacks."+r),function(){d[r].data?Q(l,200,d[r].data):Q(l,z||-2);delete d[r]})}else{var y=new a;y.open(e,m,!0);q(n,function(a,b){B(a)&&y.setRequestHeader(b,a)});y.onreadystatechange=
function(){if(4==y.readyState){var a=null,b=null;z!==f&&(a=y.getAllResponseHeaders(),b=y.responseType?y.response:y.responseText);Q(l,z||y.status,b,a)}};s&&(y.withCredentials=!0);D&&(y.responseType=D);y.send(k||null)}if(0<p)var aa=c(u,p);else p&&p.then&&p.then(u)}}function od(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function g(g,k,l){for(var n,p,s=0,D=[],u=
g.length,q=!1,z=[];s<u;)-1!=(n=g.indexOf(b,s))&&-1!=(p=g.indexOf(a,n+f))?(s!=n&&D.push(g.substring(s,n)),D.push(s=c(q=g.substring(n+f,p))),s.exp=q,s=p+h,q=!0):(s!=u&&D.push(g.substring(s)),s=u);(u=D.length)||(D.push(""),u=1);if(l&&1<D.length)throw mc("noconcat",g);if(!k||q)return z.length=u,s=function(a){try{for(var b=0,c=u,f;b<c;b++)"function"==typeof(f=D[b])&&(f=f(a),f=l?e.getTrusted(l,f):e.valueOf(f),null===f||C(f)?f="":"string"!=typeof f&&(f=oa(f))),z[b]=f;return z.join("")}catch(h){a=mc("interr",
g,h.toString()),d(a)}},s.exp=g,s.parts=D,s}var f=b.length,h=a.length;g.startSymbol=function(){return b};g.endSymbol=function(){return a};return g}]}function pd(){this.$get=["$rootScope","$window","$q",function(b,a,c){function d(d,f,h,m){var k=a.setInterval,l=a.clearInterval,n=c.defer(),p=n.promise,s=0,D=B(m)&&!m;h=B(h)?h:0;p.then(null,null,d);p.$$intervalId=k(function(){n.notify(s++);0<h&&s>=h&&(n.resolve(s),l(p.$$intervalId),delete e[p.$$intervalId]);D||b.$apply()},f);e[p.$$intervalId]=n;return p}
var e={};d.cancel=function(a){return a&&a.$$intervalId in e?(e[a.$$intervalId].reject("canceled"),clearInterval(a.$$intervalId),delete e[a.$$intervalId],!0):!1};return d}]}function qd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),
SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function nc(b){b=b.split("/");for(var a=b.length;a--;)b[a]=
sb(b[a]);return b.join("/")}function oc(b,a,c){b=wa(b,c);a.$$protocol=b.protocol;a.$$host=b.hostname;a.$$port=S(b.port)||rd[b.protocol]||null}function pc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=wa(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=Vb(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function na(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Wa(b){var a=
b.indexOf("#");return-1==a?b:b.substr(0,a)}function Gb(b){return b.substr(0,Wa(b).lastIndexOf("/")+1)}function qc(b,a){this.$$html5=!0;a=a||"";var c=Gb(b);oc(b,this,b);this.$$parse=function(a){var e=na(c,a);if(!w(e))throw Hb("ipthprfx",a,c);pc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Wb(this.$$search),b=this.$$hash?"#"+sb(this.$$hash):"";this.$$url=nc(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$rewrite=function(d){var e;
if((e=na(b,d))!==r)return d=e,(e=na(a,e))!==r?c+(na("/",e)||e):b+d;if((e=na(c,d))!==r)return c+e;if(c==d+"/")return c}}function Ib(b,a){var c=Gb(b);oc(b,this,b);this.$$parse=function(d){var e=na(b,d)||na(c,d),e="#"==e.charAt(0)?na(a,e):this.$$html5?e:"";if(!w(e))throw Hb("ihshprfx",d,a);pc(e,this,b);d=this.$$path;var g=/^\/?.*?:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));g.exec(e)||(d=(e=g.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Wb(this.$$search),e=this.$$hash?
"#"+sb(this.$$hash):"";this.$$url=nc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$rewrite=function(a){if(Wa(b)==Wa(a))return a}}function rc(b,a){this.$$html5=!0;Ib.apply(this,arguments);var c=Gb(b);this.$$rewrite=function(d){var e;if(b==Wa(d))return d;if(e=na(c,d))return b+a+e;if(c===d+"/")return c}}function hb(b){return function(){return this[b]}}function sc(b,a){return function(c){if(C(c))return this[b];this[b]=a(c);this.$$compose();return this}}function sd(){var b=
"",a=!1;this.hashPrefix=function(a){return B(a)?(b=a,this):b};this.html5Mode=function(b){return B(b)?(a=b,this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,g){function f(a){c.$broadcast("$locationChangeSuccess",h.absUrl(),a)}var h,m=d.baseHref(),k=d.url();a?(m=k.substring(0,k.indexOf("/",k.indexOf("//")+2))+(m||"/"),e=e.history?qc:rc):(m=Wa(k),e=Ib);h=new e(m,"#"+b);h.$$parse(h.$$rewrite(k));g.on("click",function(a){if(!a.ctrlKey&&!a.metaKey&&2!=a.which){for(var b=
x(a.target);"a"!==t(b[0].nodeName);)if(b[0]===g[0]||!(b=b.parent())[0])return;var e=b.prop("href"),f=h.$$rewrite(e);e&&(!b.attr("target")&&f&&!a.isDefaultPrevented())&&(a.preventDefault(),f!=d.url()&&(h.$$parse(f),c.$apply(),X.angular["ff-684208-preventDefault"]=!0))}});h.absUrl()!=k&&d.url(h.absUrl(),!0);d.onUrlChange(function(a){h.absUrl()!=a&&(c.$broadcast("$locationChangeStart",a,h.absUrl()).defaultPrevented?d.url(h.absUrl()):(c.$evalAsync(function(){var b=h.absUrl();h.$$parse(a);f(b)}),c.$$phase||
c.$digest()))});var l=0;c.$watch(function(){var a=d.url(),b=h.$$replace;l&&a==h.absUrl()||(l++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",h.absUrl(),a).defaultPrevented?h.$$parse(a):(d.url(h.absUrl(),b),f(a))}));h.$$replace=!1;return l});return h}]}function td(){var b=!0,a=this;this.debugEnabled=function(a){return B(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:
a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||v;return e.apply?function(){var a=[];q(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function pa(b,a){if("constructor"===b)throw xa("isecfld",a);return b}function Xa(b,a){if(b&&b.constructor===
b)throw xa("isecfn",a);if(b&&b.document&&b.location&&b.alert&&b.setInterval)throw xa("isecwindow",a);if(b&&(b.nodeName||b.on&&b.find))throw xa("isecdom",a);return b}function ib(b,a,c,d,e){e=e||{};a=a.split(".");for(var g,f=0;1<a.length;f++){g=pa(a.shift(),d);var h=b[g];h||(h={},b[g]=h);b=h;b.then&&e.unwrapPromises&&(qa(d),"$$v"in b||function(a){a.then(function(b){a.$$v=b})}(b),b.$$v===r&&(b.$$v={}),b=b.$$v)}g=pa(a.shift(),d);return b[g]=c}function tc(b,a,c,d,e,g,f){pa(b,g);pa(a,g);pa(c,g);pa(d,g);
pa(e,g);return f.unwrapPromises?function(f,m){var k=m&&m.hasOwnProperty(b)?m:f,l;if(null===k||k===r)return k;(k=k[b])&&k.then&&(qa(g),"$$v"in k||(l=k,l.$$v=r,l.then(function(a){l.$$v=a})),k=k.$$v);if(!a||null===k||k===r)return k;(k=k[a])&&k.then&&(qa(g),"$$v"in k||(l=k,l.$$v=r,l.then(function(a){l.$$v=a})),k=k.$$v);if(!c||null===k||k===r)return k;(k=k[c])&&k.then&&(qa(g),"$$v"in k||(l=k,l.$$v=r,l.then(function(a){l.$$v=a})),k=k.$$v);if(!d||null===k||k===r)return k;(k=k[d])&&k.then&&(qa(g),"$$v"in
k||(l=k,l.$$v=r,l.then(function(a){l.$$v=a})),k=k.$$v);if(!e||null===k||k===r)return k;(k=k[e])&&k.then&&(qa(g),"$$v"in k||(l=k,l.$$v=r,l.then(function(a){l.$$v=a})),k=k.$$v);return k}:function(f,g){var k=g&&g.hasOwnProperty(b)?g:f;if(null===k||k===r)return k;k=k[b];if(!a||null===k||k===r)return k;k=k[a];if(!c||null===k||k===r)return k;k=k[c];if(!d||null===k||k===r)return k;k=k[d];return e&&null!==k&&k!==r?k=k[e]:k}}function uc(b,a,c){if(Jb.hasOwnProperty(b))return Jb[b];var d=b.split("."),e=d.length,
g;if(a.csp)g=6>e?tc(d[0],d[1],d[2],d[3],d[4],c,a):function(b,g){var f=0,h;do h=tc(d[f++],d[f++],d[f++],d[f++],d[f++],c,a)(b,g),g=r,b=h;while(f<e);return h};else{var f="var l, fn, p;\n";q(d,function(b,d){pa(b,c);f+="if(s === null || s === undefined) return s;\nl=s;\ns="+(d?"s":'((k&&k.hasOwnProperty("'+b+'"))?k:s)')+'["'+b+'"];\n'+(a.unwrapPromises?'if (s && s.then) {\n pw("'+c.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n':
"")});var f=f+"return s;",h=new Function("s","k","pw",f);h.toString=function(){return f};g=function(a,b){return h(a,b,qa)}}"hasOwnProperty"!==b&&(Jb[b]=g);return g}function ud(){var b={},a={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0};this.unwrapPromises=function(b){return B(b)?(a.unwrapPromises=!!b,this):a.unwrapPromises};this.logPromiseWarnings=function(b){return B(b)?(a.logPromiseWarnings=b,this):a.logPromiseWarnings};this.$get=["$filter","$sniffer","$log",function(c,d,e){a.csp=d.csp;qa=function(b){a.logPromiseWarnings&&
!vc.hasOwnProperty(b)&&(vc[b]=!0,e.warn("[$parse] Promise found in the expression `"+b+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))};return function(d){var e;switch(typeof d){case "string":if(b.hasOwnProperty(d))return b[d];e=new Kb(a);e=(new Ya(e,c,a)).parse(d,!1);"hasOwnProperty"!==d&&(b[d]=e);return e;case "function":return d;default:return v}}}]}function vd(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return wd(function(a){b.$evalAsync(a)},a)}]}
function wd(b,a){function c(a){return a}function d(a){return f(a)}var e=function(){var h=[],m,k;return k={resolve:function(a){if(h){var c=h;h=r;m=g(a);c.length&&b(function(){for(var a,b=0,d=c.length;b<d;b++)a=c[b],m.then(a[0],a[1],a[2])})}},reject:function(a){k.resolve(f(a))},notify:function(a){if(h){var c=h;h.length&&b(function(){for(var b,d=0,e=c.length;d<e;d++)b=c[d],b[2](a)})}},promise:{then:function(b,f,g){var k=e(),D=function(d){try{k.resolve((I(b)?b:c)(d))}catch(e){k.reject(e),a(e)}},u=function(b){try{k.resolve((I(f)?
f:d)(b))}catch(c){k.reject(c),a(c)}},q=function(b){try{k.notify((I(g)?g:c)(b))}catch(d){a(d)}};h?h.push([D,u,q]):m.then(D,u,q);return k.promise},"catch":function(a){return this.then(null,a)},"finally":function(a){function b(a,c){var d=e();c?d.resolve(a):d.reject(a);return d.promise}function d(e,f){var g=null;try{g=(a||c)()}catch(h){return b(h,!1)}return g&&I(g.then)?g.then(function(){return b(e,f)},function(a){return b(a,!1)}):b(e,f)}return this.then(function(a){return d(a,!0)},function(a){return d(a,
!1)})}}}},g=function(a){return a&&I(a.then)?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},f=function(c){return{then:function(f,g){var l=e();b(function(){try{l.resolve((I(g)?g:d)(c))}catch(b){l.reject(b),a(b)}});return l.promise}}};return{defer:e,reject:f,when:function(h,m,k,l){var n=e(),p,s=function(b){try{return(I(m)?m:c)(b)}catch(d){return a(d),f(d)}},D=function(b){try{return(I(k)?k:d)(b)}catch(c){return a(c),f(c)}},u=function(b){try{return(I(l)?l:c)(b)}catch(d){a(d)}};
b(function(){g(h).then(function(a){p||(p=!0,n.resolve(g(a).then(s,D,u)))},function(a){p||(p=!0,n.resolve(D(a)))},function(a){p||n.notify(u(a))})});return n.promise},all:function(a){var b=e(),c=0,d=K(a)?[]:{};q(a,function(a,e){c++;g(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise}}}function xd(){var b=10,a=A("$rootScope");this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=
["$injector","$exceptionHandler","$parse","$browser",function(c,d,e,g){function f(){this.$id=Za();this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;this.$$destroyed=!1;this.$$asyncQueue=[];this.$$postDigestQueue=[];this.$$listeners={};this.$$isolateBindings={}}function h(b){if(l.$$phase)throw a("inprog",l.$$phase);l.$$phase=b}function m(a,b){var c=e(a);Oa(c,b);return c}function k(){}f.prototype={constructor:f,
$new:function(a){a?(a=new f,a.$root=this.$root,a.$$asyncQueue=this.$$asyncQueue,a.$$postDigestQueue=this.$$postDigestQueue):(a=function(){},a.prototype=this,a=new a,a.$id=Za());a["this"]=a;a.$$listeners={};a.$parent=this;a.$$watchers=a.$$nextSibling=a.$$childHead=a.$$childTail=null;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,c){var d=m(a,"watch"),e=this.$$watchers,f={fn:b,last:k,
get:d,exp:a,eq:!!c};if(!I(b)){var g=m(b||v,"listener");f.fn=function(a,b,c){g(c)}}if("string"==typeof a&&d.constant){var h=f.fn;f.fn=function(a,b,c){h.call(this,a,b,c);La(e,f)}}e||(e=this.$$watchers=[]);e.unshift(f);return function(){La(e,f)}},$watchCollection:function(a,b){var c=this,d,f,g=0,h=e(a),k=[],m={},l=0;return this.$watch(function(){f=h(c);var a,b;if(V(f))if(pb(f))for(d!==k&&(d=k,l=d.length=0,g++),a=f.length,l!==a&&(g++,d.length=l=a),b=0;b<a;b++)d[b]!==f[b]&&(g++,d[b]=f[b]);else{d!==m&&
(d=m={},l=0,g++);a=0;for(b in f)f.hasOwnProperty(b)&&(a++,d.hasOwnProperty(b)?d[b]!==f[b]&&(g++,d[b]=f[b]):(l++,d[b]=f[b],g++));if(l>a)for(b in g++,d)d.hasOwnProperty(b)&&!f.hasOwnProperty(b)&&(l--,delete d[b])}else d!==f&&(d=f,g++);return g},function(){b(f,d,c)})},$digest:function(){var c,e,f,g,m=this.$$asyncQueue,q=this.$$postDigestQueue,r,t,H=b,y,v=[],x,E,Z;h("$digest");do{t=!1;for(y=this;m.length;)try{Z=m.shift(),Z.scope.$eval(Z.expression)}catch(B){d(B)}do{if(g=y.$$watchers)for(r=g.length;r--;)try{(c=
g[r])&&((e=c.get(y))!==(f=c.last)&&!(c.eq?Aa(e,f):"number"==typeof e&&"number"==typeof f&&isNaN(e)&&isNaN(f)))&&(t=!0,c.last=c.eq?ga(e):e,c.fn(e,f===k?e:f,y),5>H&&(x=4-H,v[x]||(v[x]=[]),E=I(c.exp)?"fn: "+(c.exp.name||c.exp.toString()):c.exp,E+="; newVal: "+oa(e)+"; oldVal: "+oa(f),v[x].push(E)))}catch(P){d(P)}if(!(g=y.$$childHead||y!==this&&y.$$nextSibling))for(;y!==this&&!(g=y.$$nextSibling);)y=y.$parent}while(y=g);if(t&&!H--)throw l.$$phase=null,a("infdig",b,oa(v));}while(t||m.length);for(l.$$phase=
null;q.length;)try{q.shift()()}catch(N){d(N)}},$destroy:function(){if(l!=this&&!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=
null}},$eval:function(a,b){return e(a)(this,b)},$evalAsync:function(a){l.$$phase||l.$$asyncQueue.length||g.defer(function(){l.$$asyncQueue.length&&l.$digest()});this.$$asyncQueue.push({scope:this,expression:a})},$$postDigest:function(a){this.$$postDigestQueue.push(a)},$apply:function(a){try{return h("$apply"),this.$eval(a)}catch(b){d(b)}finally{l.$$phase=null;try{l.$digest()}catch(c){throw d(c),c;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);return function(){c[bb(c,
b)]=null}},$emit:function(a,b){var c=[],e,f=this,g=!1,h={name:a,targetScope:f,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=[h].concat(ta.call(arguments,1)),m,l;do{e=f.$$listeners[a]||c;h.currentScope=f;m=0;for(l=e.length;m<l;m++)if(e[m])try{e[m].apply(null,k)}catch(q){d(q)}else e.splice(m,1),m--,l--;if(g)break;f=f.$parent}while(f);return h},$broadcast:function(a,b){var c=this,e=this,f={name:a,targetScope:this,preventDefault:function(){f.defaultPrevented=
!0},defaultPrevented:!1},g=[f].concat(ta.call(arguments,1)),h,k;do{c=e;f.currentScope=c;e=c.$$listeners[a]||[];h=0;for(k=e.length;h<k;h++)if(e[h])try{e[h].apply(null,g)}catch(m){d(m)}else e.splice(h,1),h--,k--;if(!(e=c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(e=c.$$nextSibling);)c=c.$parent}while(c=e);return f}};var l=new f;return l}]}function yd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*(https?|ftp|file):|data:image\//;this.aHrefSanitizationWhitelist=function(a){return B(a)?
(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return B(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,g;if(!M||8<=M)if(g=wa(c).href,""!==g&&!g.match(e))return"unsafe:"+g;return c}}}function zd(b){if("self"===b)return b;if(w(b)){if(-1<b.indexOf("***"))throw ra("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08").replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return RegExp("^"+b+"$")}if(ab(b))return RegExp("^"+b.source+"$");
throw ra("imatcher");}function wc(b){var a=[];B(b)&&q(b,function(b){a.push(zd(b))});return a}function Ad(){this.SCE_CONTEXTS=fa;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=wc(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=wc(b));return a};this.$get=["$injector",function(c){function d(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};
b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw ra("unsafe");};c.has("$sanitize")&&(e=c.get("$sanitize"));var g=d(),f={};f[fa.HTML]=d(g);f[fa.CSS]=d(g);f[fa.URL]=d(g);f[fa.JS]=d(g);f[fa.RESOURCE_URL]=d(f[fa.URL]);return{trustAs:function(a,b){var c=f.hasOwnProperty(a)?f[a]:null;if(!c)throw ra("icontext",a,b);if(null===b||b===r||""===b)return b;if("string"!==typeof b)throw ra("itype",a);return new c(b)},getTrusted:function(c,d){if(null===
d||d===r||""===d)return d;var g=f.hasOwnProperty(c)?f[c]:null;if(g&&d instanceof g)return d.$$unwrapTrustedValue();if(c===fa.RESOURCE_URL){var g=wa(d.toString()),l,n,p=!1;l=0;for(n=b.length;l<n;l++)if("self"===b[l]?Fb(g):b[l].exec(g.href)){p=!0;break}if(p)for(l=0,n=a.length;l<n;l++)if("self"===a[l]?Fb(g):a[l].exec(g.href)){p=!1;break}if(p)return d;throw ra("insecurl",d.toString());}if(c===fa.HTML)return e(d);throw ra("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}
function Bd(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sniffer","$sceDelegate",function(a,c,d){if(b&&c.msie&&8>c.msieDocumentMode)throw ra("iequirks");var e=ga(fa);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},e.valueOf=za);e.parseAs=function(b,c){var d=a(c);return d.literal&&d.constant?d:function(a,c){return e.getTrusted(b,d(a,c))}};var g=e.parseAs,
f=e.getTrusted,h=e.trustAs;q(fa,function(a,b){var c=t(b);e[Pa("parse_as_"+c)]=function(b){return g(a,b)};e[Pa("get_trusted_"+c)]=function(b){return f(a,b)};e[Pa("trust_as_"+c)]=function(b){return h(a,b)}});return e}]}function Cd(){this.$get=["$window","$document",function(b,a){var c={},d=S((/android (\d+)/.exec(t((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),g=a[0]||{},f=g.documentMode,h,m=/^(Moz|webkit|O|ms)(?=[A-Z])/,k=g.body&&g.body.style,l=!1,n=!1;if(k){for(var p in k)if(l=
m.exec(p)){h=l[0];h=h.substr(0,1).toUpperCase()+h.substr(1);break}h||(h="WebkitOpacity"in k&&"webkit");l=!!("transition"in k||h+"Transition"in k);n=!!("animation"in k||h+"Animation"in k);!d||l&&n||(l=w(g.body.style.webkitTransition),n=w(g.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hashchange:"onhashchange"in b&&(!f||7<f),hasEvent:function(a){if("input"==a&&9==M)return!1;if(C(c[a])){var b=g.createElement("div");c[a]="on"+a in b}return c[a]},csp:Sb(),vendorPrefix:h,
transitions:l,animations:n,msie:M,msieDocumentMode:f}}]}function Dd(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(b,a,c,d){function e(e,h,m){var k=c.defer(),l=k.promise,n=B(m)&&!m;h=a.defer(function(){try{k.resolve(e())}catch(a){k.reject(a),d(a)}finally{delete g[l.$$timeoutId]}n||b.$apply()},h);l.$$timeoutId=h;g[h]=k;return l}var g={};e.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):
!1};return e}]}function wa(b,a){var c=b;M&&(U.setAttribute("href",c),c=U.href);U.setAttribute("href",c);return{href:U.href,protocol:U.protocol?U.protocol.replace(/:$/,""):"",host:U.host,search:U.search?U.search.replace(/^\?/,""):"",hash:U.hash?U.hash.replace(/^#/,""):"",hostname:U.hostname,port:U.port,pathname:"/"===U.pathname.charAt(0)?U.pathname:"/"+U.pathname}}function Fb(b){b=w(b)?wa(b):b;return b.protocol===xc.protocol&&b.host===xc.host}function Ed(){this.$get=ba(X)}function yc(b){function a(d,
e){if(V(d)){var g={};q(d,function(b,c){g[c]=a(c,b)});return g}return b.factory(d+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",zc);a("date",Ac);a("filter",Fd);a("json",Gd);a("limitTo",Hd);a("lowercase",Id);a("number",Bc);a("orderBy",Cc);a("uppercase",Jd)}function Fd(){return function(b,a,c){if(!K(b))return b;var d=typeof c,e=[];e.check=function(a){for(var b=0;b<e.length;b++)if(!e[b](a))return!1;return!0};"function"!==d&&
(c="boolean"===d&&c?function(a,b){return cb.equals(a,b)}:function(a,b){b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var g=function(a,b){if("string"==typeof b&&"!"===b.charAt(0))return!g(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,b);case "object":switch(typeof b){case "object":return c(a,b);default:for(var d in a)if("$"!==d.charAt(0)&&g(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(g(a[d],b))return!0;return!1;default:return!1}};
switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var f in a)"$"==f?function(){if(a[f]){var b=f;e.push(function(c){return g(c,a[b])})}}():function(){if("undefined"!=typeof a[f]){var b=f;e.push(function(c){return g(ub(c,b),a[b])})}}();break;case "function":e.push(a);break;default:return b}for(var d=[],h=0;h<b.length;h++){var m=b[h];e.check(m)&&d.push(m)}return d}}function zc(b){var a=b.NUMBER_FORMATS;return function(b,d){C(d)&&(d=a.CURRENCY_SYM);return Dc(b,a.PATTERNS[1],
a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Bc(b){var a=b.NUMBER_FORMATS;return function(b,d){return Dc(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Dc(b,a,c,d,e){if(isNaN(b)||!isFinite(b))return"";var g=0>b;b=Math.abs(b);var f=b+"",h="",m=[],k=!1;if(-1!==f.indexOf("e")){var l=f.match(/([\d\.]+)e(-?)(\d+)/);l&&"-"==l[2]&&l[3]>e+1?f="0":(h=f,k=!0)}if(k)0<e&&(-1<b&&1>b)&&(h=b.toFixed(e));else{f=(f.split(Ec)[1]||"").length;C(e)&&(e=Math.min(Math.max(a.minFrac,f),a.maxFrac));
f=Math.pow(10,e);b=Math.round(b*f)/f;b=(""+b).split(Ec);f=b[0];b=b[1]||"";var l=0,n=a.lgSize,p=a.gSize;if(f.length>=n+p)for(l=f.length-n,k=0;k<l;k++)0===(l-k)%p&&0!==k&&(h+=c),h+=f.charAt(k);for(k=l;k<f.length;k++)0===(f.length-k)%n&&0!==k&&(h+=c),h+=f.charAt(k);for(;b.length<e;)b+="0";e&&"0"!==e&&(h+=d+b.substr(0,e))}m.push(g?a.negPre:a.posPre);m.push(h);m.push(g?a.negSuf:a.posSuf);return m.join("")}function Lb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-
a));return d+b}function W(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Lb(e,a,d)}}function jb(b,a){return function(c,d){var e=c["get"+b](),g=Ha(a?"SHORT"+b:b);return d[g][e]}}function Ac(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var g=0,f=0,h=b[8]?a.setUTCFullYear:a.setFullYear,m=b[8]?a.setUTCHours:a.setHours;b[9]&&(g=S(b[9]+b[10]),f=S(b[9]+b[11]));h.call(a,S(b[1]),S(b[2])-1,S(b[3]));g=S(b[4]||0)-g;f=S(b[5]||0)-f;h=S(b[6]||0);b=Math.round(1E3*
parseFloat("0."+(b[7]||0)));m.call(a,g,f,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e){var g="",f=[],h,m;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;w(c)&&(c=Kd.test(c)?S(c):a(c));qb(c)&&(c=new Date(c));if(!Ka(c))return c;for(;e;)(m=Ld.exec(e))?(f=f.concat(ta.call(m,1)),e=f.pop()):(f.push(e),e=null);q(f,function(a){h=Md[a];g+=h?h(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}
function Gd(){return function(b){return oa(b,!0)}}function Hd(){return function(b,a){if(!K(b)&&!w(b))return b;a=S(a);if(w(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function Cc(b){return function(a,c,d){function e(a,b){return Na(b)?function(b,c){return a(c,b)}:a}if(!K(a)||!c)return a;c=K(c)?c:[c];c=Oc(c,function(a){var c=!1,d=a||za;if(w(a)){if("+"==a.charAt(0)||
"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);d=b(a)}return e(function(a,b){var c;c=d(a);var e=d(b),f=typeof c,g=typeof e;f==g?("string"==f&&(c=c.toLowerCase(),e=e.toLowerCase()),c=c===e?0:c<e?-1:1):c=f<g?-1:1;return c},c)});for(var g=[],f=0;f<a.length;f++)g.push(a[f]);return g.sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function sa(b){I(b)&&(b={link:b});b.restrict=b.restrict||"AC";return ba(b)}function Fc(b,a){function c(a,c){c=c?"-"+db(c,
"-"):"";b.removeClass((a?kb:lb)+c).addClass((a?lb:kb)+c)}var d=this,e=b.parent().controller("form")||mb,g=0,f=d.$error={},h=[];d.$name=a.name||a.ngForm;d.$dirty=!1;d.$pristine=!0;d.$valid=!0;d.$invalid=!1;e.$addControl(d);b.addClass(Ia);c(!0);d.$addControl=function(a){va(a.$name,"input");h.push(a);a.$name&&(d[a.$name]=a)};d.$removeControl=function(a){a.$name&&d[a.$name]===a&&delete d[a.$name];q(f,function(b,c){d.$setValidity(c,!0,a)});La(h,a)};d.$setValidity=function(a,b,h){var n=f[a];if(b)n&&(La(n,
h),n.length||(g--,g||(c(b),d.$valid=!0,d.$invalid=!1),f[a]=!1,c(!0,a),e.$setValidity(a,!0,d)));else{g||c(b);if(n){if(-1!=bb(n,h))return}else f[a]=n=[],g++,c(!1,a),e.$setValidity(a,!1,d);n.push(h);d.$valid=!1;d.$invalid=!0}};d.$setDirty=function(){b.removeClass(Ia).addClass(nb);d.$dirty=!0;d.$pristine=!1;e.$setDirty()};d.$setPristine=function(){b.removeClass(nb).addClass(Ia);d.$dirty=!1;d.$pristine=!0;q(h,function(a){a.$setPristine()})}}function ob(b,a,c,d,e,g){var f=!1;a.on("compositionstart",function(){f=
!0});a.on("compositionend",function(){f=!1});var h=function(){if(!f){var e=a.val();Na(c.ngTrim||"T")&&(e=$(e));d.$viewValue!==e&&b.$apply(function(){d.$setViewValue(e)})}};if(e.hasEvent("input"))a.on("input",h);else{var m,k=function(){m||(m=g.defer(function(){h();m=null}))};a.on("keydown",function(a){a=a.keyCode;91===a||(15<a&&19>a||37<=a&&40>=a)||k()});if(e.hasEvent("paste"))a.on("paste cut",k)}a.on("change",h);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)};var l=c.ngPattern,
n=function(a,b){if(d.$isEmpty(b)||a.test(b))return d.$setValidity("pattern",!0),b;d.$setValidity("pattern",!1);return r};l&&((e=l.match(/^\/(.*)\/([gim]*)$/))?(l=RegExp(e[1],e[2]),e=function(a){return n(l,a)}):e=function(c){var d=b.$eval(l);if(!d||!d.test)throw A("ngPattern")("noregexp",l,d,ha(a));return n(d,c)},d.$formatters.push(e),d.$parsers.push(e));if(c.ngMinlength){var p=S(c.ngMinlength);e=function(a){if(!d.$isEmpty(a)&&a.length<p)return d.$setValidity("minlength",!1),r;d.$setValidity("minlength",
!0);return a};d.$parsers.push(e);d.$formatters.push(e)}if(c.ngMaxlength){var s=S(c.ngMaxlength);e=function(a){if(!d.$isEmpty(a)&&a.length>s)return d.$setValidity("maxlength",!1),r;d.$setValidity("maxlength",!0);return a};d.$parsers.push(e);d.$formatters.push(e)}}function Mb(b,a){b="ngClass"+b;return function(){return{restrict:"AC",link:function(c,d,e){function g(b){if(!0===a||c.$index%2===a){var d=f(b||"");h?Aa(b,h)||e.$updateClass(d,f(h)):e.$addClass(d)}h=ga(b)}function f(a){if(K(a))return a.join(" ");
if(V(a)){var b=[];q(a,function(a,c){a&&b.push(c)});return b.join(" ")}return a}var h;c.$watch(e[b],g,!0);e.$observe("class",function(a){g(c.$eval(e[b]))});"ngClass"!==b&&c.$watch("$index",function(d,g){var h=d&1;if(h!==g&1){var n=f(c.$eval(e[b]));h===a?e.$addClass(n):e.$removeClass(n)}})}}}}var t=function(b){return w(b)?b.toLowerCase():b},Ha=function(b){return w(b)?b.toUpperCase():b},M,x,Ba,ta=[].slice,Nd=[].push,$a=Object.prototype.toString,Ma=A("ng"),cb=X.angular||(X.angular={}),Ua,Ea,ja=["0","0",
"0"];M=S((/msie (\d+)/.exec(t(navigator.userAgent))||[])[1]);isNaN(M)&&(M=S((/trident\/.*; rv:(\d+)/.exec(t(navigator.userAgent))||[])[1]));v.$inject=[];za.$inject=[];var $=function(){return String.prototype.trim?function(b){return w(b)?b.trim():b}:function(b){return w(b)?b.replace(/^\s\s*/,"").replace(/\s\s*$/,""):b}}();Ea=9>M?function(b){b=b.nodeName?b:b[0];return b.scopeName&&"HTML"!=b.scopeName?Ha(b.scopeName+":"+b.nodeName):b.nodeName}:function(b){return b.nodeName?b.nodeName:b[0].nodeName};
var Sc=/[A-Z]/g,Od={full:"1.2.3",major:1,minor:2,dot:3,codeName:"unicorn-zapper"},Ra=L.cache={},eb=L.expando="ng-"+(new Date).getTime(),Wc=1,Gc=X.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},Ab=X.document.removeEventListener?function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)},Uc=/([\:\-\_]+(.))/g,Vc=/^moz([A-Z])/,xb=A("jqLite"),Da=L.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;
"complete"===O.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),L(X).on("load",a))},toString:function(){var b=[];q(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?x(this[b]):x(this[this.length+b])},length:0,push:Nd,sort:[].sort,splice:[].splice},gb={};q("multiple selected checked disabled readOnly required open".split(" "),function(b){gb[t(b)]=b});var dc={};q("input select option textarea button form details".split(" "),function(b){dc[Ha(b)]=!0});q({data:ac,
inheritedData:fb,scope:function(b){return x(b).data("$scope")||fb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return x(b).data("$isolateScope")||x(b).data("$isolateScopeNoTemplate")},controller:bc,injector:function(b){return fb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Bb,css:function(b,a,c){a=Pa(a);if(B(c))b.style[a]=c;else{var d;8>=M&&(d=b.currentStyle&&b.currentStyle[a],""===d&&(d="auto"));d=d||b.style[a];8>=M&&(d=""===d?r:d);return d}},attr:function(b,
a,c){var d=t(a);if(gb[d])if(B(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||v).specified?d:r;else if(B(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?r:b},prop:function(b,a,c){if(B(c))b[a]=c;else return b[a]},text:function(){function b(b,d){var e=a[b.nodeType];if(C(d))return e?b[e]:"";b[e]=d}var a=[];9>M?(a[1]="innerText",a[3]="nodeValue"):a[1]=a[3]="textContent";b.$dv="";return b}(),val:function(b,
a){if(C(a)){if("SELECT"===Ea(b)&&b.multiple){var c=[];q(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(C(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)Qa(d[c]);b.innerHTML=a}},function(b,a){L.prototype[a]=function(a,d){var e,g;if((2==b.length&&b!==Bb&&b!==bc?a:d)===r){if(V(a)){for(e=0;e<this.length;e++)if(b===ac)b(this[e],a);else for(g in a)b(this[e],g,a[g]);return this}e=b.$dv;g=e===r?Math.min(this.length,
1):this.length;for(var f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<this.length;e++)b(this[e],a,d);return this}});q({removeData:Zb,dealoc:Qa,on:function a(c,d,e,g){if(B(g))throw xb("onargs");var f=ka(c,"events"),h=ka(c,"handle");f||ka(c,"events",f={});h||ka(c,"handle",h=Xc(c,f));q(d.split(" "),function(d){var g=f[d];if(!g){if("mouseenter"==d||"mouseleave"==d){var l=O.body.contains||O.body.compareDocumentPosition?function(a,c){var d=9===a.nodeType?a.documentElement:a,e=c&&c.parentNode;
return a===e||!!(e&&1===e.nodeType&&(d.contains?d.contains(e):a.compareDocumentPosition&&a.compareDocumentPosition(e)&16))}:function(a,c){if(c)for(;c=c.parentNode;)if(c===a)return!0;return!1};f[d]=[];a(c,{mouseleave:"mouseout",mouseenter:"mouseover"}[d],function(a){var c=a.relatedTarget;c&&(c===this||l(this,c))||h(a,d)})}else Gc(c,d,h),f[d]=[];g=f[d]}g.push(e)})},off:$b,replaceWith:function(a,c){var d,e=a.parentNode;Qa(a);q(new L(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);
d=c})},children:function(a){var c=[];q(a.childNodes,function(a){1===a.nodeType&&c.push(a)});return c},contents:function(a){return a.childNodes||[]},append:function(a,c){q(new L(c),function(c){1!==a.nodeType&&11!==a.nodeType||a.appendChild(c)})},prepend:function(a,c){if(1===a.nodeType){var d=a.firstChild;q(new L(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=x(c)[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){Qa(a);var c=a.parentNode;c&&c.removeChild(a)},
after:function(a,c){var d=a,e=a.parentNode;q(new L(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:Db,removeClass:Cb,toggleClass:function(a,c,d){C(d)&&(d=!Bb(a,c));(d?Db:Cb)(a,c)},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){if(a.nextElementSibling)return a.nextElementSibling;for(a=a.nextSibling;null!=a&&1!==a.nodeType;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName(c)},clone:zb,triggerHandler:function(a,c,d){c=(ka(a,
"events")||{})[c];d=d||[];var e=[{preventDefault:v,stopPropagation:v}];q(c,function(c){c.apply(a,e.concat(d))})}},function(a,c){L.prototype[c]=function(c,e,g){for(var f,h=0;h<this.length;h++)C(f)?(f=a(this[h],c,e,g),B(f)&&(f=x(f))):yb(f,a(this[h],c,e,g));return B(f)?f:this};L.prototype.bind=L.prototype.on;L.prototype.unbind=L.prototype.off});Sa.prototype={put:function(a,c){this[Ca(a)]=c},get:function(a){return this[Ca(a)]},remove:function(a){var c=this[a=Ca(a)];delete this[a];return c}};var Zc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,
$c=/,/,ad=/^\s*(_?)(\S+?)\1\s*$/,Yc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ta=A("$injector"),Pd=A("$animate"),Qd=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Pd("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.$get=["$timeout",function(a){return{enter:function(d,e,g,f){g?g.after(d):(e&&e[0]||(e=g.parent()),e.append(d));f&&a(f,0,!1)},leave:function(d,e){d.remove();e&&a(e,0,!1)},move:function(a,c,g,f){this.enter(a,
c,g,f)},addClass:function(d,e,g){e=w(e)?e:K(e)?e.join(" "):"";q(d,function(a){Db(a,e)});g&&a(g,0,!1)},removeClass:function(d,e,g){e=w(e)?e:K(e)?e.join(" "):"";q(d,function(a){Cb(a,e)});g&&a(g,0,!1)},enabled:v}}]}],ia=A("$compile");gc.$inject=["$provide","$$sanitizeUriProvider"];var gd=/^(x[\:\-_]|data[\:\-_])/i,nd=X.XMLHttpRequest||function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(c){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(d){}throw A("$httpBackend")("noxhr");
},mc=A("$interpolate"),Rd=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,rd={http:80,https:443,ftp:21},Hb=A("$location");rc.prototype=Ib.prototype=qc.prototype={$$html5:!1,$$replace:!1,absUrl:hb("$$absUrl"),url:function(a,c){if(C(a))return this.$$url;var d=Rd.exec(a);d[1]&&this.path(decodeURIComponent(d[1]));(d[2]||d[1])&&this.search(d[3]||"");this.hash(d[5]||"",c);return this},protocol:hb("$$protocol"),host:hb("$$host"),port:hb("$$port"),path:sc("$$path",function(a){return"/"==a.charAt(0)?a:"/"+a}),search:function(a,
c){switch(arguments.length){case 0:return this.$$search;case 1:if(w(a))this.$$search=Vb(a);else if(V(a))this.$$search=a;else throw Hb("isrcharg");break;default:C(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:sc("$$hash",za),replace:function(){this.$$replace=!0;return this}};var xa=A("$parse"),vc={},qa,Ja={"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:v,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return B(d)?
B(e)?d+e:d:B(e)?e:r},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(B(d)?d:0)-(B(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^e(a,c)},"=":v,"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},
">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"&":function(a,c,d,e){return d(a,c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},Sd={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},Kb=function(a){this.options=a};Kb.prototype={constructor:Kb,lex:function(a){this.text=a;
this.index=0;this.ch=r;this.lastCh=":";this.tokens=[];var c;for(a=[];this.index<this.text.length;){this.ch=this.text.charAt(this.index);if(this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent(),this.was("{,")&&("{"===a[0]&&(c=this.tokens[this.tokens.length-1]))&&(c.json=-1===c.text.indexOf("."));else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch,json:this.was(":[,")&&
this.is("{[")||this.is("}]:,")}),this.is("{[")&&a.unshift(this.ch),this.is("}]")&&a.shift(),this.index++;else if(this.isWhitespace(this.ch)){this.index++;continue}else{var d=this.ch+this.peek(),e=d+this.peek(2),g=Ja[this.ch],f=Ja[d],h=Ja[e];h?(this.tokens.push({index:this.index,text:e,fn:h}),this.index+=3):f?(this.tokens.push({index:this.index,text:d,fn:f}),this.index+=2):g?(this.tokens.push({index:this.index,text:this.ch,fn:g,json:this.was("[,:")&&this.is("+-")}),this.index+=1):this.throwError("Unexpected next character ",
this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},was:function(a){return-1!==a.indexOf(this.lastCh)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===
a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=B(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw xa("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=t(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||
e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,json:!0,fn:function(){return a}})},readIdent:function(){for(var a=this,c="",d=this.index,e,g,f,h;this.index<this.text.length;){h=this.text.charAt(this.index);if("."===h||this.isIdent(h)||this.isNumber(h))"."===h&&(e=this.index),c+=h;else break;this.index++}if(e)for(g=this.index;g<this.text.length;){h=this.text.charAt(g);if("("===h){f=c.substr(e-d+1);c=c.substr(0,
e-d);this.index=g;break}if(this.isWhitespace(h))g++;else break}d={index:d,text:c};if(Ja.hasOwnProperty(c))d.fn=Ja[c],d.json=Ja[c];else{var m=uc(c,this.options,this.text);d.fn=F(function(a,c){return m(a,c)},{assign:function(d,e){return ib(d,c,e,a.text,a.options)}})}this.tokens.push(d);f&&(this.tokens.push({index:e,text:".",json:!1}),this.tokens.push({index:e+1,text:f,json:!1}))},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,g=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),
e=e+f;if(g)"u"===f?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d=(g=Sd[f])?d+g:d+f,g=!1;else if("\\"===f)g=!0;else{if(f===a){this.index++;this.tokens.push({index:c,text:e,string:d,json:!0,fn:function(){return d}});return}d+=f}this.index++}this.throwError("Unterminated quote",c)}};var Ya=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};Ya.ZERO=function(){return 0};
Ya.prototype={constructor:Ya,parse:function(a,c){this.text=a;this.json=c;this.tokens=this.lexer.lex(a);c&&(this.assignment=this.logicalOR,this.functionCall=this.fieldAccess=this.objectIndex=this.filterChain=function(){this.throwError("is not valid json",{text:a,index:0})});var d=c?this.primary():this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);d.literal=!!d.literal;d.constant=!!d.constant;return d},primary:function(){var a;if(this.expect("("))a=this.filterChain(),
this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);c.json&&(a.constant=!0,a.literal=!0)}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw xa("syntax",c.text,a,c.index+1,this.text,
this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw xa("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var g=this.tokens[0],f=g.text;if(f===a||f===c||f===d||f===e||!(a||c||d||e))return g}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.json&&!a.json&&this.throwError("is not valid json",a),this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},
unaryFn:function(a,c){return F(function(d,e){return a(d,e,c)},{constant:c.constant})},ternaryFn:function(a,c,d){return F(function(e,g){return a(e,g)?c(e,g):d(e,g)},{constant:a.constant&&c.constant&&d.constant})},binaryFn:function(a,c,d){return F(function(e,g){return c(e,g,a,d)},{constant:a.constant&&d.constant})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,g=
0;g<a.length;g++){var f=a[g];f&&(e=f(c,d))}return e}},filterChain:function(){for(var a=this.expression(),c;;)if(c=this.expect("|"))a=this.binaryFn(a,c.fn,this.filter());else return a},filter:function(){for(var a=this.expect(),c=this.$filter(a.text),d=[];;)if(a=this.expect(":"))d.push(this.expression());else{var e=function(a,e,h){h=[h];for(var m=0;m<d.length;m++)h.push(d[m](a,e));return c.apply(a,h)};return function(){return e}}},expression:function(){return this.assignment()},assignment:function(){var a=
this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),function(d,g){return a.assign(d,c(d,g),g)}):a},ternary:function(){var a=this.logicalOR(),c,d;if(this.expect("?")){c=this.ternary();if(d=this.expect(":"))return this.ternaryFn(a,c,this.ternary());this.throwError("expected :",d)}else return a},logicalOR:function(){for(var a=this.logicalAND(),c;;)if(c=this.expect("||"))a=this.binaryFn(a,
c.fn,this.logicalAND());else return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND());return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+",
"-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(Ya.ZERO,a.fn,this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this,d=this.expect().text,e=uc(d,this.options,this.text);return F(function(c,d,h){return e(h||
a(c,d),d)},{assign:function(e,f,h){return ib(a(e,h),d,f,c.text,c.options)}})},objectIndex:function(a){var c=this,d=this.expression();this.consume("]");return F(function(e,g){var f=a(e,g),h=d(e,g),m;if(!f)return r;(f=Xa(f[h],c.text))&&(f.then&&c.options.unwrapPromises)&&(m=f,"$$v"in f||(m.$$v=r,m.then(function(a){m.$$v=a})),f=f.$$v);return f},{assign:function(e,g,f){var h=d(e,f);return Xa(a(e,f),c.text)[h]=g}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());
while(this.expect(","))}this.consume(")");var e=this;return function(g,f){for(var h=[],m=c?c(g,f):g,k=0;k<d.length;k++)h.push(d[k](g,f));k=a(g,f,m)||v;Xa(m,e.text);Xa(k,e.text);h=k.apply?k.apply(m,h):k(h[0],h[1],h[2],h[3],h[4]);return Xa(h,e.text)}},arrayDeclaration:function(){var a=[],c=!0;if("]"!==this.peekToken().text){do{var d=this.expression();a.push(d);d.constant||(c=!1)}while(this.expect(","))}this.consume("]");return F(function(c,d){for(var f=[],h=0;h<a.length;h++)f.push(a[h](c,d));return f},
{literal:!0,constant:c})},object:function(){var a=[],c=!0;if("}"!==this.peekToken().text){do{var d=this.expect(),d=d.string||d.text;this.consume(":");var e=this.expression();a.push({key:d,value:e});e.constant||(c=!1)}while(this.expect(","))}this.consume("}");return F(function(c,d){for(var e={},m=0;m<a.length;m++){var k=a[m];e[k.key]=k.value(c,d)}return e},{literal:!0,constant:c})}};var Jb={},ra=A("$sce"),fa={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},U=O.createElement("a"),
xc=wa(X.location.href,!0);yc.$inject=["$provide"];zc.$inject=["$locale"];Bc.$inject=["$locale"];var Ec=".",Md={yyyy:W("FullYear",4),yy:W("FullYear",2,0,!0),y:W("FullYear",1),MMMM:jb("Month"),MMM:jb("Month",!0),MM:W("Month",2,1),M:W("Month",1,1),dd:W("Date",2),d:W("Date",1),HH:W("Hours",2),H:W("Hours",1),hh:W("Hours",2,-12),h:W("Hours",1,-12),mm:W("Minutes",2),m:W("Minutes",1),ss:W("Seconds",2),s:W("Seconds",1),sss:W("Milliseconds",3),EEEE:jb("Day"),EEE:jb("Day",!0),a:function(a,c){return 12>a.getHours()?
c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Lb(Math[0<a?"floor":"ceil"](a/60),2)+Lb(Math.abs(a%60),2))}},Ld=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,Kd=/^\-?\d+$/;Ac.$inject=["$locale"];var Id=ba(t),Jd=ba(Ha);Cc.$inject=["$parse"];var Td=ba({restrict:"E",compile:function(a,c){8>=M&&(c.href||c.name||c.$set("href",""),a.append(O.createComment("IE fix")));return function(a,c){c.on("click",function(a){c.attr("href")||a.preventDefault()})}}}),
Nb={};q(gb,function(a,c){if("multiple"!=a){var d=ma("ng-"+c);Nb[d]=function(){return{priority:100,compile:function(){return function(a,g,f){a.$watch(f[d],function(a){f.$set(c,!!a)})}}}}}});q(["src","srcset","href"],function(a){var c=ma("ng-"+a);Nb[c]=function(){return{priority:99,link:function(d,e,g){g.$observe(c,function(c){c&&(g.$set(a,c),M&&e.prop(a,g[a]))})}}}});var mb={$addControl:v,$removeControl:v,$setValidity:v,$setDirty:v,$setPristine:v};Fc.$inject=["$element","$attrs","$scope"];var Hc=function(a){return["$timeout",
function(c){return{name:"form",restrict:a?"EAC":"E",controller:Fc,compile:function(){return{pre:function(a,e,g,f){if(!g.action){var h=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};Gc(e[0],"submit",h);e.on("$destroy",function(){c(function(){Ab(e[0],"submit",h)},0,!1)})}var m=e.parent().controller("form"),k=g.name||g.ngForm;k&&ib(a,k,f,k);if(m)e.on("$destroy",function(){m.$removeControl(f);k&&ib(a,k,r,k);F(f,mb)})}}}}}]},Ud=Hc(),Vd=Hc(!0),Wd=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
Xd=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,Yd=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Ic={text:ob,number:function(a,c,d,e,g,f){ob(a,c,d,e,g,f);e.$parsers.push(function(a){var c=e.$isEmpty(a);if(c||Yd.test(a))return e.$setValidity("number",!0),""===a?null:c?a:parseFloat(a);e.$setValidity("number",!1);return r});e.$formatters.push(function(a){return e.$isEmpty(a)?"":""+a});d.min&&(a=function(a){var c=parseFloat(d.min);if(!e.$isEmpty(a)&&a<c)return e.$setValidity("min",!1),r;e.$setValidity("min",
!0);return a},e.$parsers.push(a),e.$formatters.push(a));d.max&&(a=function(a){var c=parseFloat(d.max);if(!e.$isEmpty(a)&&a>c)return e.$setValidity("max",!1),r;e.$setValidity("max",!0);return a},e.$parsers.push(a),e.$formatters.push(a));e.$formatters.push(function(a){if(e.$isEmpty(a)||qb(a))return e.$setValidity("number",!0),a;e.$setValidity("number",!1);return r})},url:function(a,c,d,e,g,f){ob(a,c,d,e,g,f);a=function(a){if(e.$isEmpty(a)||Wd.test(a))return e.$setValidity("url",!0),a;e.$setValidity("url",
!1);return r};e.$formatters.push(a);e.$parsers.push(a)},email:function(a,c,d,e,g,f){ob(a,c,d,e,g,f);a=function(a){if(e.$isEmpty(a)||Xd.test(a))return e.$setValidity("email",!0),a;e.$setValidity("email",!1);return r};e.$formatters.push(a);e.$parsers.push(a)},radio:function(a,c,d,e){C(d.name)&&c.attr("name",Za());c.on("click",function(){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value)})});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,
c,d,e){var g=d.ngTrueValue,f=d.ngFalseValue;w(g)||(g=!0);w(f)||(f=!1);c.on("click",function(){a.$apply(function(){e.$setViewValue(c[0].checked)})});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==g};e.$formatters.push(function(a){return a===g});e.$parsers.push(function(a){return a?g:f})},hidden:v,button:v,submit:v,reset:v},Jc=["$browser","$sniffer",function(a,c){return{restrict:"E",require:"?ngModel",link:function(d,e,g,f){f&&(Ic[t(g.type)]||Ic.text)(d,e,g,f,c,a)}}}],
lb="ng-valid",kb="ng-invalid",Ia="ng-pristine",nb="ng-dirty",Zd=["$scope","$exceptionHandler","$attrs","$element","$parse",function(a,c,d,e,g){function f(a,c){c=c?"-"+db(c,"-"):"";e.removeClass((a?kb:lb)+c).addClass((a?lb:kb)+c)}this.$modelValue=this.$viewValue=Number.NaN;this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$name=d.name;var h=g(d.ngModel),m=h.assign;if(!m)throw A("ngModel")("nonassign",d.ngModel,ha(e));
this.$render=v;this.$isEmpty=function(a){return C(a)||""===a||null===a||a!==a};var k=e.inheritedData("$formController")||mb,l=0,n=this.$error={};e.addClass(Ia);f(!0);this.$setValidity=function(a,c){n[a]!==!c&&(c?(n[a]&&l--,l||(f(!0),this.$valid=!0,this.$invalid=!1)):(f(!1),this.$invalid=!0,this.$valid=!1,l++),n[a]=!c,f(c,a),k.$setValidity(a,c,this))};this.$setPristine=function(){this.$dirty=!1;this.$pristine=!0;e.removeClass(nb).addClass(Ia)};this.$setViewValue=function(d){this.$viewValue=d;this.$pristine&&
(this.$dirty=!0,this.$pristine=!1,e.removeClass(Ia).addClass(nb),k.$setDirty());q(this.$parsers,function(a){d=a(d)});this.$modelValue!==d&&(this.$modelValue=d,m(a,d),q(this.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}}))};var p=this;a.$watch(function(){var c=h(a);if(p.$modelValue!==c){var d=p.$formatters,e=d.length;for(p.$modelValue=c;e--;)c=d[e](c);p.$viewValue!==c&&(p.$viewValue=c,p.$render())}})}],$d=function(){return{require:["ngModel","^?form"],controller:Zd,link:function(a,c,d,e){var g=
e[0],f=e[1]||mb;f.$addControl(g);a.$on("$destroy",function(){f.$removeControl(g)})}}},ae=ba({require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),Kc=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){d.required=!0;var g=function(a){if(d.required&&e.$isEmpty(a))e.$setValidity("required",!1);else return e.$setValidity("required",!0),a};e.$formatters.push(g);e.$parsers.unshift(g);d.$observe("required",function(){g(e.$viewValue)})}}}},
be=function(){return{require:"ngModel",link:function(a,c,d,e){var g=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||d.ngList||",";e.$parsers.push(function(a){if(!C(a)){var c=[];a&&q(a.split(g),function(a){a&&c.push($(a))});return c}});e.$formatters.push(function(a){return K(a)?a.join(", "):r});e.$isEmpty=function(a){return!a||!a.length}}}},ce=/^(true|false|\d+)$/,de=function(){return{priority:100,compile:function(a,c){return ce.test(c.ngValue)?function(a,c,g){g.$set("value",a.$eval(g.ngValue))}:function(a,
c,g){a.$watch(g.ngValue,function(a){g.$set("value",a)})}}}},ee=sa(function(a,c,d){c.addClass("ng-binding").data("$binding",d.ngBind);a.$watch(d.ngBind,function(a){c.text(a==r?"":a)})}),fe=["$interpolate",function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],ge=["$sce","$parse",function(a,c){return function(d,e,g){e.addClass("ng-binding").data("$binding",g.ngBindHtml);var f=c(g.ngBindHtml);
d.$watch(function(){return(f(d)||"").toString()},function(c){e.html(a.getTrustedHtml(f(d))||"")})}}],he=Mb("",!0),ie=Mb("Odd",0),je=Mb("Even",1),ke=sa({compile:function(a,c){c.$set("ngCloak",r);a.removeClass("ng-cloak")}}),le=[function(){return{scope:!0,controller:"@",priority:500}}],Lc={};q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=ma("ng-"+a);Lc[c]=["$parse",function(d){return{compile:function(e,
g){var f=d(g[c]);return function(c,d,e){d.on(t(a),function(a){c.$apply(function(){f(c,{$event:a})})})}}}}]});var me=["$animate",function(a){return{transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,g,f){var h,m;c.$watch(e.ngIf,function(g){Na(g)?m||(m=c.$new(),f(m,function(c){h={startNode:c[0],endNode:c[c.length++]=O.createComment(" end ngIf: "+e.ngIf+" ")};a.enter(c,d.parent(),d)})):(m&&(m.$destroy(),m=null),h&&(a.leave(vb(h)),h=null))})}}}],ne=["$http","$templateCache",
"$anchorScroll","$compile","$animate","$sce",function(a,c,d,e,g,f){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",compile:function(h,m){var k=m.ngInclude||m.src,l=m.onload||"",n=m.autoscroll;return function(h,m,q,r,t){var z=0,x,H,y=function(){x&&(x.$destroy(),x=null);H&&(g.leave(H),H=null)};h.$watch(f.parseAsResourceUrl(k),function(f){var k=function(){!B(n)||n&&!h.$eval(n)||d()},q=++z;f?(a.get(f,{cache:c}).success(function(a){if(q===z){var c=h.$new(),d=t(c,v);y();x=c;H=d;H.html(a);
g.enter(H,null,m,k);e(H.contents())(x);x.$emit("$includeContentLoaded");h.$eval(l)}}).error(function(){q===z&&y()}),h.$emit("$includeContentRequested")):y()})}}}}],oe=sa({compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),pe=sa({terminal:!0,priority:1E3}),qe=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,g,f){var h=f.count,m=f.$attr.when&&g.attr(f.$attr.when),k=f.offset||0,l=e.$eval(m)||{},n={},p=c.startSymbol(),s=c.endSymbol(),r=/^when(Minus)?(.+)$/;
q(f,function(a,c){r.test(c)&&(l[t(c.replace("when","").replace("Minus","-"))]=g.attr(f.$attr[c]))});q(l,function(a,e){n[e]=c(a.replace(d,p+h+"-"+k+s))});e.$watch(function(){var c=parseFloat(e.$eval(h));if(isNaN(c))return"";c in l||(c=a.pluralCat(c-k));return n[c](e,g,!0)},function(a){g.text(a)})}}}],re=["$parse","$animate",function(a,c){var d=A("ngRepeat");return{transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,link:function(e,g,f,h,m){var k=f.ngRepeat,l=k.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
n,p,s,r,u,t,v={$id:Ca};if(!l)throw d("iexp",k);f=l[1];h=l[2];(l=l[4])?(n=a(l),p=function(a,c,d){t&&(v[t]=a);v[u]=c;v.$index=d;return n(e,v)}):(s=function(a,c){return Ca(c)},r=function(a){return a});l=f.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!l)throw d("iidexp",f);u=l[3]||l[1];t=l[2];var B={};e.$watchCollection(h,function(a){var f,h,l=g[0],n,v={},z,P,N,T,C,w,F=[];if(pb(a))C=a,n=p||s;else{n=p||r;C=[];for(N in a)a.hasOwnProperty(N)&&"$"!=N.charAt(0)&&C.push(N);C.sort()}z=C.length;
h=F.length=C.length;for(f=0;f<h;f++)if(N=a===C?f:C[f],T=a[N],T=n(N,T,f),va(T,"`track by` id"),B.hasOwnProperty(T))w=B[T],delete B[T],v[T]=w,F[f]=w;else{if(v.hasOwnProperty(T))throw q(F,function(a){a&&a.startNode&&(B[a.id]=a)}),d("dupes",k,T);F[f]={id:T};v[T]=!1}for(N in B)B.hasOwnProperty(N)&&(w=B[N],f=vb(w),c.leave(f),q(f,function(a){a.$$NG_REMOVED=!0}),w.scope.$destroy());f=0;for(h=C.length;f<h;f++){N=a===C?f:C[f];T=a[N];w=F[f];F[f-1]&&(l=F[f-1].endNode);if(w.startNode){P=w.scope;n=l;do n=n.nextSibling;
while(n&&n.$$NG_REMOVED);w.startNode!=n&&c.move(vb(w),null,x(l));l=w.endNode}else P=e.$new();P[u]=T;t&&(P[t]=N);P.$index=f;P.$first=0===f;P.$last=f===z-1;P.$middle=!(P.$first||P.$last);P.$odd=!(P.$even=0===(f&1));w.startNode||m(P,function(a){a[a.length++]=O.createComment(" end ngRepeat: "+k+" ");c.enter(a,null,x(l));l=a;w.scope=P;w.startNode=l&&l.endNode?l.endNode:a[0];w.endNode=a[a.length-1];v[w.id]=w})}B=v})}}}],se=["$animate",function(a){return function(c,d,e){c.$watch(e.ngShow,function(c){a[Na(c)?
"removeClass":"addClass"](d,"ng-hide")})}}],te=["$animate",function(a){return function(c,d,e){c.$watch(e.ngHide,function(c){a[Na(c)?"addClass":"removeClass"](d,"ng-hide")})}}],ue=sa(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&q(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),ve=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,g){var f,h,m=[];c.$watch(e.ngSwitch||e.on,function(d){for(var l=0,n=m.length;l<
n;l++)m[l].$destroy(),a.leave(h[l]);h=[];m=[];if(f=g.cases["!"+d]||g.cases["?"])c.$eval(e.change),q(f,function(d){var e=c.$new();m.push(e);d.transclude(e,function(c){var e=d.element;h.push(c);a.enter(c,e.parent(),e)})})})}}}],we=sa({transclude:"element",priority:800,require:"^ngSwitch",compile:function(a,c){return function(a,e,g,f,h){f.cases["!"+c.ngSwitchWhen]=f.cases["!"+c.ngSwitchWhen]||[];f.cases["!"+c.ngSwitchWhen].push({transclude:h,element:e})}}}),xe=sa({transclude:"element",priority:800,require:"^ngSwitch",
link:function(a,c,d,e,g){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:g,element:c})}}),ye=sa({controller:["$element","$transclude",function(a,c){if(!c)throw A("ngTransclude")("orphan",ha(a));this.$transclude=c}],link:function(a,c,d,e){e.$transclude(function(a){c.html("");c.append(a)})}}),ze=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],Ae=A("ngOptions"),Be=ba({terminal:!0}),Ce=["$compile","$parse",
function(a,c){var d=/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/,e={$setViewValue:v};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var m=this,k={},l=e,n;m.databound=d.ngModel;m.init=function(a,c,d){l=a;n=d};m.addOption=function(c){va(c,'"option value"');k[c]=!0;l.$viewValue==c&&(a.val(c),n.parent()&&n.remove())};
m.removeOption=function(a){this.hasOption(a)&&(delete k[a],l.$viewValue==a&&this.renderUnknownOption(a))};m.renderUnknownOption=function(c){c="? "+Ca(c)+" ?";n.val(c);a.prepend(n);a.val(c);n.prop("selected",!0)};m.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){m.renderUnknownOption=v})}],link:function(e,f,h,m){function k(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(y.parent()&&y.remove(),c.val(a),""===a&&z.prop("selected",!0)):C(a)&&z?c.val(""):e.renderUnknownOption(a)};
c.on("change",function(){a.$apply(function(){y.parent()&&y.remove();d.$setViewValue(c.val())})})}function l(a,c,d){var e;d.$render=function(){var a=new Sa(d.$viewValue);q(c.find("option"),function(c){c.selected=B(a.get(c.value))})};a.$watch(function(){Aa(e,d.$viewValue)||(e=ga(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];q(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,g){function h(){var a={"":[]},c=[""],d,k,
r,t,u;t=g.$modelValue;u=s(e)||[];var z=n?Ob(u):u,C,A,J;A={};r=!1;var E,I;if(v)if(x&&K(t))for(r=new Sa([]),J=0;J<t.length;J++)A[l]=t[J],r.put(x(e,A),t[J]);else r=new Sa(t);for(J=0;C=z.length,J<C;J++){k=J;if(n){k=z[J];if("$"===k.charAt(0))continue;A[n]=k}A[l]=u[k];d=p(e,A)||"";(k=a[d])||(k=a[d]=[],c.push(d));v?d=B(r.remove(x?x(e,A):q(e,A))):(x?(d={},d[l]=t,d=x(e,d)===x(e,A)):d=t===q(e,A),r=r||d);E=m(e,A);E=B(E)?E:"";k.push({id:x?x(e,A):n?z[J]:J,label:E,selected:d})}v||(w||null===t?a[""].unshift({id:"",
label:"",selected:!r}):r||a[""].unshift({id:"?",label:"",selected:!0}));A=0;for(z=c.length;A<z;A++){d=c[A];k=a[d];y.length<=A?(t={element:H.clone().attr("label",d),label:k.label},u=[t],y.push(u),f.append(t.element)):(u=y[A],t=u[0],t.label!=d&&t.element.attr("label",t.label=d));E=null;J=0;for(C=k.length;J<C;J++)r=k[J],(d=u[J+1])?(E=d.element,d.label!==r.label&&E.text(d.label=r.label),d.id!==r.id&&E.val(d.id=r.id),E[0].selected!==r.selected&&E.prop("selected",d.selected=r.selected)):(""===r.id&&w?I=
w:(I=F.clone()).val(r.id).attr("selected",r.selected).text(r.label),u.push({element:I,label:r.label,id:r.id,selected:r.selected}),E?E.after(I):t.element.append(I),E=I);for(J++;u.length>J;)u.pop().element.remove()}for(;y.length>A;)y.pop()[0].element.remove()}var k;if(!(k=t.match(d)))throw Ae("iexp",t,ha(f));var m=c(k[2]||k[1]),l=k[4]||k[6],n=k[5],p=c(k[3]||""),q=c(k[2]?k[1]:l),s=c(k[7]),x=k[8]?c(k[8]):null,y=[[{element:f,label:""}]];w&&(a(w)(e),w.removeClass("ng-scope"),w.remove());f.html("");f.on("change",
function(){e.$apply(function(){var a,c=s(e)||[],d={},h,k,m,p,t,u,w;if(v)for(k=[],p=0,u=y.length;p<u;p++)for(a=y[p],m=1,t=a.length;m<t;m++){if((h=a[m].element)[0].selected){h=h.val();n&&(d[n]=h);if(x)for(w=0;w<c.length&&(d[l]=c[w],x(e,d)!=h);w++);else d[l]=c[h];k.push(q(e,d))}}else if(h=f.val(),"?"==h)k=r;else if(""===h)k=null;else if(x)for(w=0;w<c.length;w++){if(d[l]=c[w],x(e,d)==h){k=q(e,d);break}}else d[l]=c[h],n&&(d[n]=h),k=q(e,d);g.$setViewValue(k)})});g.$render=h;e.$watch(h)}if(m[1]){var p=m[0],
s=m[1],v=h.multiple,t=h.ngOptions,w=!1,z,F=x(O.createElement("option")),H=x(O.createElement("optgroup")),y=F.clone();m=0;for(var A=f.children(),I=A.length;m<I;m++)if(""===A[m].value){z=w=A.eq(m);break}p.init(s,w,y);if(v&&(h.required||h.ngRequired)){var E=function(a){s.$setValidity("required",!h.required||a&&a.length);return a};s.$parsers.push(E);s.$formatters.unshift(E);h.$observe("required",function(){E(s.$viewValue)})}t?n(e,f,s):v?l(e,f,s):k(e,f,s,p)}}}}],De=["$interpolate",function(a){var c={addOption:v,
removeOption:v};return{restrict:"E",priority:100,compile:function(d,e){if(C(e.value)){var g=a(d.text(),!0);g||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),l=k.data("$selectController")||k.parent().data("$selectController");l&&l.databound?d.prop("selected",!1):l=c;g?a.$watch(g,function(a,c){e.$set("value",a);a!==c&&l.removeOption(c);l.addOption(a)}):l.addOption(e.value);d.on("$destroy",function(){l.removeOption(e.value)})}}}}],Ee=ba({restrict:"E",terminal:!0});(Ba=X.jQuery)?(x=
Ba,F(Ba.fn,{scope:Da.scope,isolateScope:Da.isolateScope,controller:Da.controller,injector:Da.injector,inheritedData:Da.inheritedData}),wb("remove",!0,!0,!1),wb("empty",!1,!1,!1),wb("html",!1,!1,!0)):x=L;cb.element=x;(function(a){F(a,{bootstrap:Xb,copy:ga,extend:F,equals:Aa,element:x,forEach:q,injector:Yb,noop:v,bind:rb,toJson:oa,fromJson:Tb,identity:za,isUndefined:C,isDefined:B,isString:w,isFunction:I,isObject:V,isNumber:qb,isElement:Nc,isArray:K,version:Od,isDate:Ka,lowercase:t,uppercase:Ha,callbacks:{counter:0},
$$minErr:A,$$csp:Sb});Ua=Tc(X);try{Ua("ngLocale")}catch(c){Ua("ngLocale",[]).provider("$locale",qd)}Ua("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:yd});a.provider("$compile",gc).directive({a:Td,input:Jc,textarea:Jc,form:Ud,script:ze,select:Ce,style:Ee,option:De,ngBind:ee,ngBindHtml:ge,ngBindTemplate:fe,ngClass:he,ngClassEven:je,ngClassOdd:ie,ngCloak:ke,ngController:le,ngForm:Vd,ngHide:te,ngIf:me,ngInclude:ne,ngInit:oe,ngNonBindable:pe,ngPluralize:qe,ngRepeat:re,ngShow:se,ngStyle:ue,
ngSwitch:ve,ngSwitchWhen:we,ngSwitchDefault:xe,ngOptions:Be,ngTransclude:ye,ngModel:$d,ngList:be,ngChange:ae,required:Kc,ngRequired:Kc,ngValue:de}).directive(Nb).directive(Lc);a.provider({$anchorScroll:bd,$animate:Qd,$browser:dd,$cacheFactory:ed,$controller:hd,$document:id,$exceptionHandler:jd,$filter:yc,$interpolate:od,$interval:pd,$http:kd,$httpBackend:ld,$location:sd,$log:td,$parse:ud,$rootScope:xd,$q:vd,$sce:Bd,$sceDelegate:Ad,$sniffer:Cd,$templateCache:fd,$timeout:Dd,$window:Ed})}])})(cb);x(O).ready(function(){Rc(O,
Xb)})})(window,document);!angular.$$csp()&&angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-start{border-spacing:1px 1px;-ms-zoom:1.0001;}.ng-animate-active{border-spacing:0px 0px;-ms-zoom:1;}</style>');
//# sourceMappingURL=angular.min.js.map

/*
 AngularJS v1.2.3
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(H,f,z){'use strict';var u=f.$$minErr("$resource"),A=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;f.module("ngResource",["ng"]).factory("$resource",["$http","$q",function(D,E){function n(f,h){this.template=f;this.defaults=h||{};this.urlParams={}}function v(m,h,k){function r(d,c){var e={};c=w({},h,c);s(c,function(a,c){t(a)&&(a=a());var g;if(a&&a.charAt&&"@"==a.charAt(0)){g=d;var b=a.substr(1);if(null==b||""===b||"hasOwnProperty"===b||!A.test("."+b))throw u("badmember",b);for(var b=b.split("."),f=0,h=
b.length;f<h&&g!==z;f++){var q=b[f];g=null!==g?g[q]:z}}else g=a;e[c]=g});return e}function e(b){return b.resource}function b(b){B(b||{},this)}var F=new n(m);k=w({},G,k);s(k,function(d,c){var h=/^(POST|PUT|PATCH)$/i.test(d.method);b[c]=function(a,c,g,m){var p={},k,q,x;switch(arguments.length){case 4:x=m,q=g;case 3:case 2:if(t(c)){if(t(a)){q=a;x=c;break}q=c;x=g}else{p=a;k=c;q=g;break}case 1:t(a)?q=a:h?k=a:p=a;break;case 0:break;default:throw u("badargs",arguments.length);}var n=this instanceof b,l=
n?k:d.isArray?[]:new b(k),y={},v=d.interceptor&&d.interceptor.response||e,A=d.interceptor&&d.interceptor.responseError||z;s(d,function(b,a){"params"!=a&&("isArray"!=a&&"interceptor"!=a)&&(y[a]=B(b))});h&&(y.data=k);F.setUrlParams(y,w({},r(k,d.params||{}),p),d.url);p=D(y).then(function(a){var c=a.data,g=l.$promise;if(c){if(f.isArray(c)!==!!d.isArray)throw u("badcfg",d.isArray?"array":"object",f.isArray(c)?"array":"object");d.isArray?(l.length=0,s(c,function(a){l.push(new b(a))})):(B(c,l),l.$promise=
g)}l.$resolved=!0;a.resource=l;return a},function(a){l.$resolved=!0;(x||C)(a);return E.reject(a)});p=p.then(function(a){var c=v(a);(q||C)(c,a.headers);return c},A);return n?p:(l.$promise=p,l.$resolved=!1,l)};b.prototype["$"+c]=function(a,d,g){t(a)&&(g=d,d=a,a={});a=b[c].call(this,a,this,d,g);return a.$promise||a}});b.bind=function(b){return v(m,w({},h,b),k)};return b}var G={get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}},
C=f.noop,s=f.forEach,w=f.extend,B=f.copy,t=f.isFunction;n.prototype={setUrlParams:function(m,h,k){var r=this,e=k||r.template,b,n,d=r.urlParams={};s(e.split(/\W/),function(c){if("hasOwnProperty"===c)throw u("badname");!/^\d+$/.test(c)&&(c&&RegExp("(^|[^\\\\]):"+c+"(\\W|$)").test(e))&&(d[c]=!0)});e=e.replace(/\\:/g,":");h=h||{};s(r.urlParams,function(c,d){b=h.hasOwnProperty(d)?h[d]:r.defaults[d];f.isDefined(b)&&null!==b?(n=encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,
"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),e=e.replace(RegExp(":"+d+"(\\W|$)","g"),n+"$1")):e=e.replace(RegExp("(/?):"+d+"(\\W|$)","g"),function(a,c,b){return"/"==b.charAt(0)?b:c+b})});e=e.replace(/\/+$/,"");e=e.replace(/\/\.(?=\w+($|\?))/,".");m.url=e.replace(/\/\\\./,"/.");s(h,function(b,d){r.urlParams[d]||(m.params=m.params||{},m.params[d]=b)})}};return v}])})(window,window.angular);
//# sourceMappingURL=angular-resource.min.js.map

/**
 * State-based routing for AngularJS
 * @version v0.2.0
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(r,t,e){"use strict";function n(r,t){return P(new(P(function(){},{prototype:r})),t)}function a(r){return y(arguments,function(t){t!==r&&y(t,function(t,e){r.hasOwnProperty(e)||(r[e]=t)})}),r}function o(r,t){var e=[];for(var n in r.path)if(""!==r.path[n]){if(!t.path[n])break;e.push(r.path[n])}return e}function i(r,t,e,n){var a,i=o(e,n),u={},s=[];for(var l in i)if(i[l].params&&i[l].params.length){a=i[l].params;for(var c in a)s.indexOf(a[c])>=0||(s.push(a[c]),u[a[c]]=r[a[c]])}return P({},u,t)}function u(r,t){var n=1,o=2,i={},u=[],s=i,l=P(r.when(i),{$$promises:i,$$values:i});this.study=function(i){function c(r,e){if(v[e]!==o){if(p.push(e),v[e]===n)throw p.splice(0,p.indexOf(e)),Error("Cyclic dependency: "+p.join(" -> "));if(v[e]=n,b(r))h.push(e,[function(){return t.get(e)}],u);else{var a=t.annotate(r);y(a,function(r){r!==e&&i.hasOwnProperty(r)&&c(i[r],r)}),h.push(e,r,a)}p.pop(),v[e]=o}}function f(r){return E(r)&&r.then&&r.$$promises}if(!E(i))throw Error("'invocables' must be an object");var h=[],p=[],v={};return y(i,c),i=p=v=null,function(n,o,i){function u(){--w||(b||a(d,o.$$values),$.$$values=d,$.$$promises=!0,v.resolve(d))}function c(r){$.$$failure=r,v.reject(r)}function p(e,a,o){function s(r){f.reject(r),c(r)}function l(){if(!g($.$$failure))try{f.resolve(t.invoke(a,i,d)),f.promise.then(function(r){d[e]=r,u()},s)}catch(r){s(r)}}var f=r.defer(),h=0;o.forEach(function(r){m.hasOwnProperty(r)&&!n.hasOwnProperty(r)&&(h++,m[r].then(function(t){d[r]=t,--h||l()},s))}),h||l(),m[e]=f.promise}if(f(n)&&i===e&&(i=o,o=n,n=null),n){if(!E(n))throw Error("'locals' must be an object")}else n=s;if(o){if(!f(o))throw Error("'parent' must be a promise returned by $resolve.resolve()")}else o=l;var v=r.defer(),$=v.promise,m=$.$$promises={},d=P({},n),w=1+h.length/3,b=!1;if(g(o.$$failure))return c(o.$$failure),$;o.$$values?(b=a(d,o.$$values),u()):(P(m,o.$$promises),o.then(u,c));for(var x=0,y=h.length;y>x;x+=3)n.hasOwnProperty(h[x])?u():p(h[x],h[x+1],h[x+2]);return $}},this.resolve=function(r,t,e,n){return this.study(r)(t,e,n)}}function s(r,t,e){this.fromConfig=function(r,t,e){return g(r.template)?this.fromString(r.template,t):g(r.templateUrl)?this.fromUrl(r.templateUrl,t):g(r.templateProvider)?this.fromProvider(r.templateProvider,t,e):null},this.fromString=function(r,t){return w(r)?r(t):r},this.fromUrl=function(e,n){return w(e)&&(e=e(n)),null==e?null:r.get(e,{cache:t}).then(function(r){return r.data})},this.fromProvider=function(r,t,n){return e.invoke(r,null,n||{params:t})}}function l(r){function t(t){if(!/^\w+(-+\w+)*$/.test(t))throw Error("Invalid parameter name '"+t+"' in pattern '"+r+"'");if(o[t])throw Error("Duplicate parameter name '"+t+"' in pattern '"+r+"'");o[t]=!0,l.push(t)}function e(r){return r.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&")}var n,a=/([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,o={},i="^",u=0,s=this.segments=[],l=this.params=[];this.source=r;for(var c,f,h;(n=a.exec(r))&&(c=n[2]||n[3],f=n[4]||("*"==n[1]?".*":"[^/]*"),h=r.substring(u,n.index),!(h.indexOf("?")>=0));)i+=e(h)+"("+f+")",t(c),s.push(h),u=a.lastIndex;h=r.substring(u);var p=h.indexOf("?");if(p>=0){var v=this.sourceSearch=h.substring(p);h=h.substring(0,p),this.sourcePath=r.substring(0,u+p),y(v.substring(1).split(/[&?]/),t)}else this.sourcePath=r,this.sourceSearch="";i+=e(h)+"$",s.push(h),this.regexp=RegExp(i),this.prefix=s[0]}function c(){this.compile=function(r){return new l(r)},this.isMatcher=function(r){return E(r)&&w(r.exec)&&w(r.format)&&w(r.concat)},this.$get=function(){return this}}function f(r){function t(r){var t=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(r.source);return null!=t?t[1].replace(/\\(.)/g,"$1"):""}function e(r,t){return r.replace(/\$(\$|\d{1,2})/,function(r,e){return t["$"===e?0:Number(e)]})}function n(r,t,e){if(!e)return!1;var n=r.invoke(t,t,{$match:e});return g(n)?n:!0}var a=[],o=null;this.rule=function(r){if(!w(r))throw Error("'rule' must be a function");return a.push(r),this},this.otherwise=function(r){if(b(r)){var t=r;r=function(){return t}}else if(!w(r))throw Error("'rule' must be a function");return o=r,this},this.when=function(a,o){var i,u=b(o);if(b(a)&&(a=r.compile(a)),!u&&!w(o)&&!x(o))throw Error("invalid 'handler' in when()");var s={matcher:function(t,e){return u&&(i=r.compile(e),e=["$match",function(r){return i.format(r)}]),P(function(r,a){return n(r,e,t.exec(a.path(),a.search()))},{prefix:b(t.prefix)?t.prefix:""})},regex:function(r,a){if(r.global||r.sticky)throw Error("when() RegExp must not be global or sticky");return u&&(i=a,a=["$match",function(r){return e(i,r)}]),P(function(t,e){return n(t,a,r.exec(e.path()))},{prefix:t(r)})}},l={matcher:r.isMatcher(a),regex:a instanceof RegExp};for(var c in l)if(l[c])return this.rule(s[c](a,o));throw Error("invalid 'what' in when()")},this.$get=["$location","$rootScope","$injector",function(r,t,e){function n(){function t(t){var n=t(e,r);return n?(b(n)&&r.replace().url(n),!0):!1}var n,i=a.length;for(n=0;i>n;n++)if(t(a[n]))return;o&&t(o)}return t.$on("$locationChangeSuccess",n),{}}]}function h(r,a,o){function u(r,t){var n=b(r),a=n?r:r.name,o=0===a.indexOf(".")||0===a.indexOf("^");if(o){if(!t)throw Error("No reference point given for path '"+a+"'");for(var i=a.split("."),u=0,s=i.length,l=t;s>u;u++)if(""!==i[u]||0!==u){if("^"!==i[u])break;if(!l.parent)throw Error("Path '"+a+"' not valid for state '"+t.name+"'");l=l.parent}else l=t;i=i.slice(u).join("."),a=l.name+(l.name&&i?".":"")+i}var c=m[a];return!c||!n&&(n||c!==r&&c.self!==r)?e:c}function s(t){t=n(t,{self:t,resolve:t.resolve||{},toString:function(){return this.name}});var e=t.name;if(!b(e)||e.indexOf("@")>=0)throw Error("State must have a valid name");if(m[e])throw Error("State '"+e+"'' is already defined");for(var a in d)t[a]=d[a](t);return m[e]=t,!t["abstract"]&&t.url&&r.when(t.url,["$match","$stateParams",function(r,e){$.$current.navigable==t&&h(r,e)||$.transitionTo(t,r,!1)}]),t}function l(r,t){return E(r)?t=r:t.name=r,s(t),this}function c(r,t,a,s,l,c,m){function d(r,e,n,o,i){var u=n?e:p(r.params,e),s={$stateParams:u};i.resolve=l.resolve(r.resolve,s,i.resolve,r);var c=[i.resolve.then(function(r){i.globals=r})];return o&&c.push(o),y(r.views,function(t,e){var n=t.resolve&&t.resolve!==r.resolve?t.resolve:{};n.$template=[function(){return a.load(e,{view:t,locals:s,params:u,notify:!1})||""}],c.push(l.resolve(n,s,i.resolve,r).then(function(n){n.$$controller=t.controller,n.$$state=r,i[e]=n}))}),t.all(c).then(function(){return i})}var w=t.reject(Error("transition superseded")),b=t.reject(Error("transition prevented"));return v.locals={resolve:null,globals:{$stateParams:{}}},$={params:{},current:v.self,$current:v,transition:null},$.go=function(r,t,e){return this.transitionTo(r,t,P({inherit:!0,relative:$.$current},e))},$.transitionTo=function(e,a,o){g(o)||(o=o===!0||o===!1?{location:o}:{}),a=a||{},o=P({location:!0,inherit:!1,relative:null},o);var l=u(e,o.relative);if(!g(l))throw Error("No such state "+l);if(l["abstract"])throw Error("Cannot transition to abstract state '"+e+"'");o.inherit&&(a=i(c,a||{},$.$current,l)),e=l;var p,E,x=e.path,y=$.$current,C=$.params,S=y.path,O=v.locals,k=[];for(p=0,E=x[p];E&&E===S[p]&&h(a,C,E.ownParams);p++,E=x[p])O=k[p]=E.locals;if(e===y&&O===y.locals)return $.transition=null,t.when($.current);a=f(e.params,a||{});var R=r.$broadcast("$stateChangeStart",e.self,a,y.self,C);if(R.defaultPrevented)return b;for(var I=t.when(O),M=p;x.length>M;M++,E=x[M])O=k[M]=n(O),I=d(E,a,E===e,I,O);var U=$.transition=I.then(function(){var t,n,i;if($.transition!==U)return w;for(t=S.length-1;t>=p;t--)i=S[t],i.self.onExit&&s.invoke(i.self.onExit,i.self,i.locals.globals),i.locals=null;for(t=p;x.length>t;t++)n=x[t],n.locals=k[t],n.self.onEnter&&s.invoke(n.self.onEnter,n.self,n.locals.globals);$.$current=e,$.current=e.self,$.params=a,j($.params,c),$.transition=null;var u=e.navigable;return o.location&&u&&m.url(u.url.format(u.locals.globals.$stateParams)),r.$broadcast("$stateChangeSuccess",e.self,a,y.self,C),$.current},function(n){return $.transition!==U?w:($.transition=null,r.$broadcast("$stateChangeError",e.self,a,y.self,C,n),t.reject(n))});return U},$.is=function(r){var t=u(r);return g(t)?$.$current===t:e},$.includes=function(r){var t=u(r);return g(t)?g($.$current.includes[t.name]):e},$.href=function(r,t,e){e=P({lossy:!0,inherit:!1,relative:$.$current},e||{});var n=u(r,e.relative);if(!g(n))return null;t=i(c,t||{},$.$current,n);var a=n&&e.lossy?n.navigable:n,s=a&&a.url?a.url.format(f(n.params,t||{})):null;return!o.html5Mode()&&s?"#"+s:s},$.get=function(r){var t=u(r);return t&&t.self?t.self:null},$}function f(r,t){var e={};return y(r,function(r){var n=t[r];e[r]=null!=n?n+"":null}),e}function h(r,t,e){if(!e){e=[];for(var n in r)e.push(n)}for(var a=0;e.length>a;a++){var o=e[a];if(r[o]!=t[o])return!1}return!0}function p(r,t){var e={};return y(r,function(r){e[r]=t[r]}),e}var v,$,m={},d={parent:function(r){if(g(r.parent)&&r.parent)return u(r.parent);var t=/^(.+)\.[^.]+$/.exec(r.name);return t?u(t[1]):v},data:function(r){return r.parent&&r.parent.data&&(r.data=r.self.data=t.extend({},r.parent.data,r.data)),r.data},url:function(r){var t=r.url;if(b(t))return"^"==t.charAt(0)?a.compile(t.substring(1)):(r.parent.navigable||v).url.concat(t);if(a.isMatcher(t)||null==t)return t;throw Error("Invalid url '"+t+"' in state '"+r+"'")},navigable:function(r){return r.url?r:r.parent?r.parent.navigable:null},params:function(r){if(!r.params)return r.url?r.url.parameters():r.parent.params;if(!x(r.params))throw Error("Invalid params in state '"+r+"'");if(r.url)throw Error("Both params and url specicified in state '"+r+"'");return r.params},views:function(r){var t={};return y(g(r.views)?r.views:{"":r},function(e,n){0>n.indexOf("@")&&(n+="@"+r.parent.name),t[n]=e}),t},ownParams:function(r){if(!r.parent)return r.params;var t={};y(r.params,function(r){t[r]=!0}),y(r.parent.params,function(e){if(!t[e])throw Error("Missing required parameter '"+e+"' in state '"+r.name+"'");t[e]=!1});var e=[];return y(t,function(r,t){r&&e.push(t)}),e},path:function(r){return r.parent?r.parent.path.concat(r):[]},includes:function(r){var t=r.parent?P({},r.parent.includes):{};return t[r.name]=!0,t}};v=s({name:"",url:"^",views:null,"abstract":!0}),v.navigable=null,this.state=l,this.$get=c,c.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$location","$urlRouter"]}function p(){function r(r,t){return{load:function(e,n){var a,o={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return n=P(o,n),n.view&&(a=t.fromConfig(n.view,n.params,n.locals)),a&&n.notify&&r.$broadcast("$viewContentLoading",n),a}}}this.$get=r,r.$inject=["$rootScope","$templateFactory"]}function v(r,e,n,a,o){var i;try{i=a.get("$animator")}catch(u){}var s=!1,l={restrict:"ECA",terminal:!0,transclude:!0,compile:function(a,u,c){return function(a,u,f){function h(t){var i=r.$current&&r.$current.locals[$];if(i!==v){var s=w(d&&t);if(s.remove(u),p&&(p.$destroy(),p=null),!i)return v=null,E.state=null,s.restore(c(a),u);v=i,E.state=i.$$state;var l=e(s.populate(i.$template,u));if(p=a.$new(),i.$$controller){i.$scope=p;var f=n(i.$$controller,i);u.children().data("$ngControllerController",f)}l(p),p.$emit("$viewContentLoaded"),m&&p.$eval(m),o()}}var p,v,$=f[l.name]||f.name||"",m=f.onload||"",d=g(i)&&i(a,f),w=function(r){return{"true":{remove:function(r){d.leave(r.contents(),r)},restore:function(r,t){d.enter(r,t)},populate:function(r,e){var n=t.element("<div></div>").html(r).contents();return d.enter(n,e),n}},"false":{remove:function(r){r.html("")},restore:function(r,t){t.append(r)},populate:function(r,t){return t.html(r),t.contents()}}}[""+r]};u.append(c(a));var b=u.parent().inheritedData("$uiView");0>$.indexOf("@")&&($=$+"@"+(b?b.state.name:""));var E={name:$,state:null};u.data("$uiView",E);var x=function(){if(!s){s=!0;try{h(!0)}catch(r){throw s=!1,r}s=!1}};a.$on("$stateChangeSuccess",x),a.$on("$viewContentLoading",x),h(!1)}}};return l}function $(r){var t=r.match(/^([^(]+?)\s*(\((.*)\))?$/);if(!t||4!==t.length)throw Error("Invalid state ref '"+r+"'");return{state:t[1],paramExpr:t[3]||null}}function m(r){return{restrict:"A",link:function(t,n,a){var o=$(a.uiSref),i=null,u=r.$current,s="FORM"===n[0].nodeName,l=s?"action":"href",c=!0,f=n.parent().inheritedData("$uiView");f&&f.state&&f.state.name&&(u=f.state);var h=function(t){if(t&&(i=t),c){var a=r.href(o.state,i,{relative:u});return a?(n[0][l]=a,e):(c=!1,!1)}};o.paramExpr&&(t.$watch(o.paramExpr,function(r,t){r!==t&&h(r)},!0),i=t.$eval(o.paramExpr)),h(),s||n.bind("click",function(e){1!=e.which||e.ctrlKey||e.metaKey||e.shiftKey||(r.go(o.state,i,{relative:u}),t.$apply(),e.preventDefault())})}}}function d(r,t){function a(r){this.locals=r.locals.globals,this.params=this.locals.$stateParams}function o(){this.locals=null,this.params=null}function i(e,i){if(null!=i.redirectTo){var u,l=i.redirectTo;if(b(l))u=l;else{if(!w(l))throw Error("Invalid 'redirectTo' in when()");u=function(r,t){return l(r,t.path(),t.search())}}t.when(e,u)}else r.state(n(i,{parent:null,name:"route:"+encodeURIComponent(e),url:e,onEnter:a,onExit:o}));return s.push(i),this}function u(r,t,n){function a(r){return""!==r.name?r:e}var o={routes:s,params:n,current:e};return t.$on("$stateChangeStart",function(r,e,n,o){t.$broadcast("$routeChangeStart",a(e),a(o))}),t.$on("$stateChangeSuccess",function(r,e,n,i){o.current=a(e),t.$broadcast("$routeChangeSuccess",a(e),a(i)),j(n,o.params)}),t.$on("$stateChangeError",function(r,e,n,o,i,u){t.$broadcast("$routeChangeError",a(e),a(o),u)}),o}var s=[];a.$inject=["$$state"],this.when=i,this.$get=u,u.$inject=["$state","$rootScope","$routeParams"]}var g=t.isDefined,w=t.isFunction,b=t.isString,E=t.isObject,x=t.isArray,y=t.forEach,P=t.extend,j=t.copy;t.module("ui.router.util",["ng"]),t.module("ui.router.router",["ui.router.util"]),t.module("ui.router.state",["ui.router.router","ui.router.util"]),t.module("ui.router",["ui.router.state"]),t.module("ui.router.compat",["ui.router"]),u.$inject=["$q","$injector"],t.module("ui.router.util").service("$resolve",u),s.$inject=["$http","$templateCache","$injector"],t.module("ui.router.util").service("$templateFactory",s),l.prototype.concat=function(r){return new l(this.sourcePath+r+this.sourceSearch)},l.prototype.toString=function(){return this.source},l.prototype.exec=function(r,t){var e=this.regexp.exec(r);if(!e)return null;var n,a=this.params,o=a.length,i=this.segments.length-1,u={};if(i!==e.length-1)throw Error("Unbalanced capture group in route '"+this.source+"'");for(n=0;i>n;n++)u[a[n]]=e[n+1];for(;o>n;n++)u[a[n]]=t[a[n]];return u},l.prototype.parameters=function(){return this.params},l.prototype.format=function(r){var t=this.segments,e=this.params;if(!r)return t.join("");var n,a,o,i=t.length-1,u=e.length,s=t[0];for(n=0;i>n;n++)o=r[e[n]],null!=o&&(s+=encodeURIComponent(o)),s+=t[n+1];for(;u>n;n++)o=r[e[n]],null!=o&&(s+=(a?"&":"?")+e[n]+"="+encodeURIComponent(o),a=!0);return s},t.module("ui.router.util").provider("$urlMatcherFactory",c),f.$inject=["$urlMatcherFactoryProvider"],t.module("ui.router.router").provider("$urlRouter",f),h.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider","$locationProvider"],t.module("ui.router.state").value("$stateParams",{}).provider("$state",h),p.$inject=[],t.module("ui.router.state").provider("$view",p),v.$inject=["$state","$compile","$controller","$injector","$anchorScroll"],t.module("ui.router.state").directive("uiView",v),m.$inject=["$state"],t.module("ui.router.state").directive("uiSref",m),d.$inject=["$stateProvider","$urlRouterProvider"],t.module("ui.router.compat").provider("$route",d).directive("ngView",v)})(window,window.angular);
/*
 AngularJS v1.2.3
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(C,k,F){'use strict';k.module("ngAnimate",["ng"]).config(["$provide","$animateProvider",function(M,G){var p=k.noop,r=k.forEach,N=G.$$selectors,T=1,h="$$ngAnimateState",H="ng-animate",l={running:!0};M.decorator("$animate",["$delegate","$injector","$sniffer","$rootElement","$timeout","$rootScope","$document",function(v,C,I,g,s,q,F){function O(a){if(a){var d=[],c={};a=a.substr(1).split(".");(I.transitions||I.animations)&&a.push("");for(var e=0;e<a.length;e++){var b=a[e],h=N[b];h&&!c[b]&&(d.push(C.get(h)),
c[b]=!0)}return d}}function m(a,d,c,e,b,l,q){function w(a){t();if(!0===a)u();else{if(a=c.data(h))a.done=u,c.data(h,a);m(x,"after",u)}}function m(e,b,h){var k=b+"End";r(e,function(l,f){var B=function(){a:{var B=b+"Complete",a=e[f];a[B]=!0;(a[k]||p)();for(a=0;a<e.length;a++)if(!e[a][B])break a;h()}};"before"!=b||"enter"!=a&&"move"!=a?l[b]?l[k]=y?l[b](c,d,B):l[b](c,B):B():B()})}function g(){q&&s(q,0,!1)}function t(){t.hasBeenRun||(t.hasBeenRun=!0,l())}function u(){if(!u.hasBeenRun){u.hasBeenRun=!0;var a=
c.data(h);a&&(y?z(c):(a.closeAnimationTimeout=s(function(){z(c)},0,!1),c.data(h,a)));g()}}var k=c.attr("class")||"",v=(" "+(k+" "+d)).replace(/\s+/g,".");e||(e=b?b.parent():c.parent());var v=O(v),y="addClass"==a||"removeClass"==a;b=c.data(h)||{};if(J(c,e)||0===v.length)t(),u();else{var x=[];b.running&&y&&b.structural||r(v,function(b){if(!b.allowCancel||b.allowCancel(c,a,d)){var e=b[a];"leave"==a?(b=e,e=null):b=b["before"+a.charAt(0).toUpperCase()+a.substr(1)];x.push({before:b,after:e})}});0===x.length?
(t(),g()):(e=" "+k+" ",b.running&&(s.cancel(b.closeAnimationTimeout),z(c),L(b.animations),b.beforeComplete?(b.done||p)(!0):y&&!b.structural&&(e="removeClass"==b.event?e.replace(b.className,""):e+b.className+" ")),k=" "+d+" ","addClass"==a&&0<=e.indexOf(k)||"removeClass"==a&&-1==e.indexOf(k)?(t(),g()):(c.addClass(H),c.data(h,{running:!0,event:a,className:d,structural:!y,animations:x,done:w}),m(x,"before",w)))}}function E(a){a=a[0];a.nodeType==T&&r(a.querySelectorAll("."+H),function(a){a=k.element(a);
var c=a.data(h);c&&(L(c.animations),z(a))})}function L(a){r(a,function(d){a.beforeComplete||(d.beforeEnd||p)(!0);a.afterComplete||(d.afterEnd||p)(!0)})}function z(a){a[0]==g[0]?l.disabled||(l.running=!1,l.structural=!1):(a.removeClass(H),a.removeData(h))}function J(a,d){if(l.disabled)return!0;if(a[0]==g[0])return l.disabled||l.running;do{if(0===d.length)break;var c=d[0]==g[0],e=c?l:d.data(h),e=e&&(!!e.disabled||!!e.running);if(c||e)return e;if(c)break}while(d=d.parent());return!0}g.data(h,l);q.$$postDigest(function(){q.$$postDigest(function(){l.running=
!1})});return{enter:function(a,d,c,e){this.enabled(!1,a);v.enter(a,d,c);q.$$postDigest(function(){m("enter","ng-enter",a,d,c,p,e)})},leave:function(a,d){E(a);this.enabled(!1,a);q.$$postDigest(function(){m("leave","ng-leave",a,null,null,function(){v.leave(a)},d)})},move:function(a,d,c,e){E(a);this.enabled(!1,a);v.move(a,d,c);q.$$postDigest(function(){m("move","ng-move",a,d,c,p,e)})},addClass:function(a,d,c){m("addClass",d,a,null,null,function(){v.addClass(a,d)},c)},removeClass:function(a,d,c){m("removeClass",
d,a,null,null,function(){v.removeClass(a,d)},c)},enabled:function(a,d){switch(arguments.length){case 2:if(a)z(d);else{var c=d.data(h)||{};c.disabled=!0;d.data(h,c)}break;case 1:l.disabled=!a;break;default:a=!l.disabled}return!!a}}}]);G.register("",["$window","$sniffer","$timeout",function(l,h,I){function g(f){R.push(f);I.cancel(S);S=I(function(){r(R,function(f){f()});R=[];S=null;D={}},10,!1)}function s(f,a){var K=a?D[a]:null;if(!K){var b=0,c=0,d=0,e=0,h,k,g,m;r(f,function(f){if(f.nodeType==T){f=l.getComputedStyle(f)||
{};g=f[A+G];b=Math.max(q(g),b);m=f[A+t];h=f[A+u];c=Math.max(q(h),c);k=f[w+u];e=Math.max(q(k),e);var a=q(f[w+G]);0<a&&(a*=parseInt(f[w+M],10)||1);d=Math.max(a,d)}});K={total:0,transitionPropertyStyle:m,transitionDurationStyle:g,transitionDelayStyle:h,transitionDelay:c,transitionDuration:b,animationDelayStyle:k,animationDelay:e,animationDuration:d};a&&(D[a]=K)}return K}function q(f){var a=0;f=k.isString(f)?f.split(/\s*,\s*/):[];r(f,function(f){a=Math.max(parseFloat(f)||0,a)});return a}function H(f){var a=
f.parent(),b=a.data(V);b||(a.data(V,++U),b=U);return b+"-"+f[0].className}function O(f,a){var b=H(f),c=b+" "+a,d={},e=D[c]?++D[c].total:0;if(0<e){var h=a+"-stagger",d=b+" "+h;(b=!D[d])&&f.addClass(h);d=s(f,d);b&&f.removeClass(h)}f.addClass(a);c=s(f,c);h=Math.max(c.transitionDuration,c.animationDuration);if(0===h)return f.removeClass(a),!1;var k="";0<c.transitionDuration?(f.addClass(x),k+=N+" ",f[0].style[A+t]="none"):f[0].style[w]="none 0s";r(a.split(" "),function(a,f){k+=(0<f?" ":"")+a+"-active"});
f.data(y,{className:a,activeClassName:k,maxDuration:h,classes:a+" "+k,timings:c,stagger:d,ii:e});return!0}function m(a){a=a[0];var b=A+t;a.style[b]&&0<a.style[b].length&&(a.style[b]="")}function E(a){var b=a[0],c=w;b.style[c]&&0<b.style[c].length&&(a[0].style[c]="")}function L(a,d,e){function k(a){a.stopPropagation();a=a.originalEvent||a;var f=a.$manualTimeStamp||a.timeStamp||Date.now();Math.max(f-w,0)>=v&&a.elapsedTime>=q&&e()}var n=a.data(y);if(a.hasClass(d)&&n){var l=a[0],g=n.timings,m=n.stagger,
q=n.maxDuration,r=n.activeClassName,v=1E3*Math.max(g.transitionDelay,g.animationDelay),w=Date.now(),t=Q+" "+P,u=n.ii,x,n="",p=[];if(0<g.transitionDuration){var s=g.transitionPropertyStyle;-1==s.indexOf("all")&&(x=!0,n+=b+"transition-property: "+s+", "+(h.msie?"-ms-zoom":"border-spacing")+"; ",n+=b+"transition-duration: "+g.transitionDurationStyle+", "+g.transitionDuration+"s; ",p.push(b+"transition-property"),p.push(b+"transition-duration"))}0<u&&(0<m.transitionDelay&&0===m.transitionDuration&&(s=
g.transitionDelayStyle,x&&(s+=", "+g.transitionDelay+"s"),n+=b+"transition-delay: "+z(s,m.transitionDelay,u)+"; ",p.push(b+"transition-delay")),0<m.animationDelay&&0===m.animationDuration&&(n+=b+"animation-delay: "+z(g.animationDelayStyle,m.animationDelay,u)+"; ",p.push(b+"animation-delay")));0<p.length&&(g=l.getAttribute("style")||"",l.setAttribute("style",g+" "+n));a.on(t,k);a.addClass(r);return function(b){a.off(t,k);a.removeClass(r);c(a,d);for(var e in p)l.style.removeProperty(p[e])}}e()}function z(a,
b,c){var d="";r(a.split(","),function(a,f){d+=(0<f?",":"")+(c*b+parseInt(a,10))+"s"});return d}function J(a,b){if(O(a,b))return function(d){d&&c(a,b)}}function a(a,b,d){if(a.data(y))return L(a,b,d);c(a,b);d()}function d(f,b,c){var d=J(f,b);if(d){var e=d;g(function(){m(f);E(f);e=a(f,b,c)});return function(a){(e||p)(a)}}c()}function c(a,b){a.removeClass(b);a.removeClass(x);a.removeData(y)}function e(a,b){var c="";a=k.isArray(a)?a:a.split(/\s+/);r(a,function(a,f){a&&0<a.length&&(c+=(0<f?" ":"")+a+b)});
return c}var b="",A,P,w,Q;C.ontransitionend===F&&C.onwebkittransitionend!==F?(b="-webkit-",A="WebkitTransition",P="webkitTransitionEnd transitionend"):(A="transition",P="transitionend");C.onanimationend===F&&C.onwebkitanimationend!==F?(b="-webkit-",w="WebkitAnimation",Q="webkitAnimationEnd animationend"):(w="animation",Q="animationend");var G="Duration",t="Property",u="Delay",M="IterationCount",V="$$ngAnimateKey",y="$$ngAnimateCSS3Data",x="ng-animate-start",N="ng-animate-active",D={},U=0,R=[],S;return{allowCancel:function(a,
b,c){var d=(a.data(y)||{}).classes;if(!d||0<=["enter","leave","move"].indexOf(b))return!0;var h=a.parent(),g=k.element(a[0].cloneNode());g.attr("style","position:absolute; top:-9999px; left:-9999px");g.removeAttr("id");g.html("");r(d.split(" "),function(a){g.removeClass(a)});g.addClass(e(c,"addClass"==b?"-add":"-remove"));h.append(g);a=s(g);g.remove();return 0<Math.max(a.transitionDuration,a.animationDuration)},enter:function(a,b){return d(a,"ng-enter",b)},leave:function(a,b){return d(a,"ng-leave",
b)},move:function(a,b){return d(a,"ng-move",b)},beforeAddClass:function(a,b,c){if(b=J(a,e(b,"-add")))return g(function(){m(a);E(a);c()}),b;c()},addClass:function(b,c,d){return a(b,e(c,"-add"),d)},beforeRemoveClass:function(a,b,c){if(b=J(a,e(b,"-remove")))return g(function(){m(a);E(a);c()}),b;c()},removeClass:function(b,c,d){return a(b,e(c,"-remove"),d)}}}])}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map

/* Copyright (c) 2010-2013 Marcus Westin */
"use strict";(function(e,t){typeof define=="function"&&define.amd?define([],t):typeof exports=="object"?module.exports=t():e.store=t()})(this,function(){function o(){try{return r in t&&t[r]}catch(e){return!1}}var e={},t=typeof window!="undefined"?window:global,n=t.document,r="localStorage",i="script",s;e.disabled=!1,e.version="1.3.20",e.set=function(e,t){},e.get=function(e,t){},e.has=function(t){return e.get(t)!==undefined},e.remove=function(e){},e.clear=function(){},e.transact=function(t,n,r){r==null&&(r=n,n=null),n==null&&(n={});var i=e.get(t,n);r(i),e.set(t,i)},e.getAll=function(){},e.forEach=function(){},e.serialize=function(e){return JSON.stringify(e)},e.deserialize=function(e){if(typeof e!="string")return undefined;try{return JSON.parse(e)}catch(t){return e||undefined}};if(o())s=t[r],e.set=function(t,n){return n===undefined?e.remove(t):(s.setItem(t,e.serialize(n)),n)},e.get=function(t,n){var r=e.deserialize(s.getItem(t));return r===undefined?n:r},e.remove=function(e){s.removeItem(e)},e.clear=function(){s.clear()},e.getAll=function(){var t={};return e.forEach(function(e,n){t[e]=n}),t},e.forEach=function(t){for(var n=0;n<s.length;n++){var r=s.key(n);t(r,e.get(r))}};else if(n&&n.documentElement.addBehavior){var u,a;try{a=new ActiveXObject("htmlfile"),a.open(),a.write("<"+i+">document.w=window</"+i+'><iframe src="/favicon.ico"></iframe>'),a.close(),u=a.w.frames[0].document,s=u.createElement("div")}catch(f){s=n.createElement("div"),u=n.body}var l=function(t){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(s),u.appendChild(s),s.addBehavior("#default#userData"),s.load(r);var i=t.apply(e,n);return u.removeChild(s),i}},c=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),h=function(e){return e.replace(/^d/,"___$&").replace(c,"___")};e.set=l(function(t,n,i){return n=h(n),i===undefined?e.remove(n):(t.setAttribute(n,e.serialize(i)),t.save(r),i)}),e.get=l(function(t,n,r){n=h(n);var i=e.deserialize(t.getAttribute(n));return i===undefined?r:i}),e.remove=l(function(e,t){t=h(t),e.removeAttribute(t),e.save(r)}),e.clear=l(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(r);for(var n=t.length-1;n>=0;n--)e.removeAttribute(t[n].name);e.save(r)}),e.getAll=function(t){var n={};return e.forEach(function(e,t){n[e]=t}),n},e.forEach=l(function(t,n){var r=t.XMLDocument.documentElement.attributes;for(var i=0,s;s=r[i];++i)n(s.name,e.deserialize(t.getAttribute(s.name)))})}try{var p="__storejs__";e.set(p,p),e.get(p)!=p&&(e.disabled=!0),e.remove(p)}catch(f){e.disabled=!0}return e.enabled=!e.disabled,e});
/**
 * angular-strap
 * @version v2.0.0-rc.2 - 2014-01-29
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"use strict";angular.module("mgcrea.ngStrap.helpers.dimensions",[]).factory("dimensions",["$document","$window",function(){var a=(angular.element,{}),b=a.nodeName=function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()};a.css=function(a,b,c){var d;return d=a.currentStyle?a.currentStyle[b]:window.getComputedStyle?window.getComputedStyle(a)[b]:a.style[b],c===!0?parseFloat(d)||0:d},a.offset=function(a){var b=a.getBoundingClientRect(),c=a.ownerDocument;return{width:a.offsetWidth,height:a.offsetHeight,top:b.top+(window.pageYOffset||c.documentElement.scrollTop)-(c.documentElement.clientTop||0),left:b.left+(window.pageXOffset||c.documentElement.scrollLeft)-(c.documentElement.clientLeft||0)}},a.position=function(d){var e,f,g={top:0,left:0};return"fixed"===a.css(d,"position")?f=d.getBoundingClientRect():(e=c(d),f=a.offset(d),f=a.offset(d),b(e,"html")||(g=a.offset(e)),g.top+=a.css(e,"borderTopWidth",!0),g.left+=a.css(e,"borderLeftWidth",!0)),{width:d.offsetWidth,height:d.offsetHeight,top:f.top-g.top-a.css(d,"marginTop",!0),left:f.left-g.left-a.css(d,"marginLeft",!0)}};var c=function(c){var d=c.ownerDocument,e=c.offsetParent||d;if(b(e,"#document"))return d.documentElement;for(;e&&!b(e,"html")&&"static"===a.css(e,"position");)e=e.offsetParent;return e||d.documentElement};return a.height=function(b,c){var d=b.offsetHeight;return c?d+=a.css(b,"marginTop",!0)+a.css(b,"marginBottom",!0):d-=a.css(b,"paddingTop",!0)+a.css(b,"paddingBottom",!0)+a.css(b,"borderTopWidth",!0)+a.css(b,"borderBottomWidth",!0),d},a.width=function(b,c){var d=b.offsetWidth;return c?d+=a.css(b,"marginLeft",!0)+a.css(b,"marginRight",!0):d-=a.css(b,"paddingLeft",!0)+a.css(b,"paddingRight",!0)+a.css(b,"borderLeftWidth",!0)+a.css(b,"borderRightWidth",!0),d},a}]);
//# sourceMappingURL=dimensions.min.map
/**
 * angular-strap
 * @version v2.0.0-rc.2 - 2014-01-29
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"use strict";angular.module("mgcrea.ngStrap.modal",["mgcrea.ngStrap.helpers.dimensions"]).provider("$modal",function(){var a=this.defaults={animation:"am-fade",prefixClass:"modal",placement:"top",template:"modal/modal.tpl.html",contentTemplate:!1,container:!1,element:null,backdrop:!0,keyboard:!0,html:!1,show:!0};this.$get=["$window","$rootScope","$compile","$q","$templateCache","$http","$animate","$timeout","dimensions",function(b,c,d,e,f,g,h){function i(b){function i(a){a.target===a.currentTarget&&("static"===q.backdrop?p.focus():p.hide())}var p={},q=angular.extend({},a,b);p.$promise=e.when(f.get(q.template)||g.get(q.template));var r=p.$scope=q.scope&&q.scope.$new()||c.$new();q.element||q.container||(q.container="body"),q.scope||j(["title","content"],function(a){q[a]&&(r[a]=q[a])}),r.$hide=function(){r.$$postDigest(function(){p.hide()})},r.$show=function(){r.$$postDigest(function(){p.show()})},r.$toggle=function(){r.$$postDigest(function(){p.toggle()})},q.contentTemplate&&(p.$promise=p.$promise.then(function(a){angular.isObject(a)&&(a=a.data);var c=angular.element(a);return e.when(f.get(q.contentTemplate)||g.get(q.contentTemplate)).then(function(a){angular.isObject(a)&&(a=a.data);var d=o('[ng-bind="content"]',c[0]).removeAttr("ng-bind").html(a);return b.template||d.next().remove(),c[0].outerHTML})}));var s,t,u=angular.element('<div class="'+q.prefixClass+'-backdrop"/>');return p.$promise.then(function(a){angular.isObject(a)&&(a=a.data),q.html&&(a=a.replace(n,'ng-bind-html="')),a=k.apply(a),s=d(a),p.init()}),p.init=function(){q.show&&r.$$postDigest(function(){p.show()})},p.destroy=function(){t&&(t.remove(),t=null),u&&(u.remove(),u=null),r.$destroy()},p.show=function(){var a=q.container?o(q.container):null,b=q.container?null:q.element;t=p.$element=s(r,function(){}),t.css({display:"block"}).addClass(q.placement),q.animation&&(q.backdrop&&u.addClass("am-fade"),t.addClass(q.animation)),q.backdrop&&h.enter(u,m,null,function(){}),h.enter(t,a,b,function(){}),r.$isShown=!0,r.$$phase||r.$digest();var c=t[0];l(function(){c.focus()}),m.addClass(q.prefixClass+"-open"),q.backdrop&&(t.on("click",i),u.on("click",i)),q.keyboard&&t.on("keyup",p.$onKeyUp)},p.hide=function(){h.leave(t,function(){m.removeClass(q.prefixClass+"-open")}),q.backdrop&&h.leave(u,function(){}),r.$$phase||r.$digest(),r.$isShown=!1,q.backdrop&&(t.off("click",i),u.off("click",i)),q.keyboard&&t.off("keyup",p.$onKeyUp)},p.toggle=function(){r.$isShown?p.hide():p.show()},p.focus=function(){t[0].focus()},p.$onKeyUp=function(a){27===a.which&&p.hide()},p}var j=angular.forEach,k=String.prototype.trim,l=b.requestAnimationFrame||b.setTimeout,m=angular.element(b.document.body),n=/ng-bind="/gi,o=function(a,b){return angular.element((b||document).querySelectorAll(a))};return i}]}).directive("bsModal",["$window","$location","$sce","$modal",function(a,b,c,d){return{restrict:"EAC",scope:!0,link:function(a,b,c){var e={scope:a,element:b,show:!1};angular.forEach(["template","contentTemplate","placement","backdrop","keyboard","html","container","animation"],function(a){angular.isDefined(c[a])&&(e[a]=c[a])}),angular.forEach(["title","content"],function(b){c[b]&&c.$observe(b,function(c){a[b]=c})}),c.bsModal&&a.$watch(c.bsModal,function(b){angular.isObject(b)?angular.extend(a,b):a.content=b},!0);var f=d(e);b.on(c.trigger||"click",f.toggle),a.$on("$destroy",function(){f.destroy(),e=null,f=null})}}}]),angular.module("mgcrea.ngStrap.modal").run(["$templateCache",function(a){a.put("modal/modal.tpl.html",'<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="modal-title" ng-bind="title"></h4></div><div class="modal-body" ng-bind="content"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="$hide()">Close</button></div></div></div></div>')}]);
//# sourceMappingURL=modal.min.map
/**
 * angular-strap
 * @version v2.0.0-rc.2 - 2014-01-29
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"use strict";angular.module("mgcrea.ngStrap.tooltip",["mgcrea.ngStrap.helpers.dimensions"]).provider("$tooltip",function(){var a=this.defaults={animation:"am-fade",prefixClass:"tooltip",container:!1,placement:"top",template:"tooltip/tooltip.tpl.html",contentTemplate:!1,trigger:"hover focus",keyboard:!1,html:!1,show:!1,title:"",type:"",delay:0};this.$get=["$window","$rootScope","$compile","$q","$templateCache","$http","$animate","$timeout","dimensions",function(b,c,d,e,f,g,h,i,j){function k(b,i){function k(){return"body"===r.container?j.offset(b[0]):j.position(b[0])}function p(a,b,c,d){var e,f=a.split("-");switch(f[0]){case"right":e={top:b.top+b.height/2-d/2,left:b.left+b.width};break;case"bottom":e={top:b.top+b.height,left:b.left+b.width/2-c/2};break;case"left":e={top:b.top+b.height/2-d/2,left:b.left-c};break;default:e={top:b.top-d,left:b.left+b.width/2-c/2}}if(!f[1])return e;if("top"===f[0]||"bottom"===f[0])switch(f[1]){case"left":e.left=b.left;break;case"right":e.left=b.left+b.width-c}else if("left"===f[0]||"right"===f[0])switch(f[1]){case"top":e.top=b.top-d;break;case"bottom":e.top=b.top+b.height}return e}var q={},r=q.$options=angular.extend({},a,i);q.$promise=e.when(f.get(r.template)||g.get(r.template));var s=q.$scope=r.scope&&r.scope.$new()||c.$new();r.delay&&angular.isString(r.delay)&&(r.delay=parseFloat(r.delay)),r.title&&(q.$scope.title=r.title),s.$hide=function(){s.$$postDigest(function(){q.hide()})},s.$show=function(){s.$$postDigest(function(){q.show()})},s.$toggle=function(){s.$$postDigest(function(){q.toggle()})},q.$isShown=!1;var t,u;r.contentTemplate&&(q.$promise=q.$promise.then(function(a){angular.isObject(a)&&(a=a.data);var b=angular.element(a);return e.when(f.get(r.contentTemplate)||g.get(r.contentTemplate,{cache:f})).then(function(a){return angular.isObject(a)&&(a=a.data),o('[ng-bind="content"]',b[0]).removeAttr("ng-bind").html(a),b[0].outerHTML})}));var v,w,x;return q.$promise.then(function(a){angular.isObject(a)&&(a=a.data),r.html&&(a=a.replace(n,'ng-bind-html="')),a=l.apply(a),x=a,v=d(a),q.init()}),q.init=function(){r.delay&&angular.isNumber(r.delay)&&(r.delay={show:r.delay,hide:r.delay});for(var a=r.trigger.split(" "),c=a.length;c--;){var d=a[c];"click"===d?b.on("click",q.toggle):"manual"!==d&&(b.on("hover"===d?"mouseenter":"focus",q.enter),b.on("hover"===d?"mouseleave":"blur",q.leave))}r.show&&s.$$postDigest(function(){"focus"===r.trigger?b[0].focus():q.show()})},q.destroy=function(){for(var a=r.trigger.split(" "),c=a.length;c--;){var d=a[c];"click"===d?b.off("click",q.toggle):"manual"!==d&&(b.off("hover"===d?"mouseenter":"focus",q.enter),b.off("hover"===d?"mouseleave":"blur",q.leave))}w&&(w.remove(),w=null),s.$destroy()},q.enter=function(){return clearTimeout(t),u="in",r.delay&&r.delay.show?void(t=setTimeout(function(){"in"===u&&q.show()},r.delay.show)):q.show()},q.show=function(){var a=r.container?o(r.container):null,c=r.container?null:b;w=q.$element=v(s,function(){}),w.css({top:"0px",left:"0px",display:"block"}).addClass(r.placement),r.animation&&w.addClass(r.animation),r.type&&w.addClass(r.prefixClass+"-"+r.type),h.enter(w,a,c,function(){}),q.$isShown=!0,s.$$phase||s.$digest(),m(q.$applyPlacement),r.keyboard&&("focus"!==r.trigger?(q.focus(),w.on("keyup",q.$onKeyUp)):b.on("keyup",q.$onFocusKeyUp))},q.leave=function(){return q.$isShown?(clearTimeout(t),u="out",r.delay&&r.delay.hide?void(t=setTimeout(function(){"out"===u&&q.hide()},r.delay.hide)):q.hide()):void 0},q.hide=function(a){return h.leave(w,function(){}),s.$$phase||s.$digest(),q.$isShown=!1,r.keyboard&&w.off("keyup",q.$onKeyUp),a&&"focus"===r.trigger?b[0].blur():void 0},q.toggle=function(){q.$isShown?q.leave():q.enter()},q.focus=function(){w[0].focus()},q.$applyPlacement=function(){if(w){var a=k(),b=w.prop("offsetWidth"),c=w.prop("offsetHeight"),d=p(r.placement,a,b,c);d.top+="px",d.left+="px",w.css(d)}},q.$onKeyUp=function(a){27===a.which&&q.hide()},q.$onFocusKeyUp=function(a){27===a.which&&b[0].blur()},q}var l=String.prototype.trim,m=b.requestAnimationFrame||b.setTimeout,n=("createTouch"in b.document,/ng-bind="/gi),o=function(a,b){return angular.element((b||document).querySelectorAll(a))};return k}]}).directive("bsTooltip",["$window","$location","$sce","$tooltip",function(a,b,c,d){var e=a.requestAnimationFrame||a.setTimeout;return{restrict:"EAC",scope:!0,link:function(a,b,c){var f={scope:a};angular.forEach(["template","contentTemplate","placement","container","delay","trigger","keyboard","html","animation","type"],function(a){angular.isDefined(c[a])&&(f[a]=c[a])}),angular.forEach(["title"],function(b){c[b]&&c.$observe(b,function(c,d){a[b]=c,angular.isDefined(d)&&e(function(){g&&g.$applyPlacement()})})}),c.bsTooltip&&a.$watch(c.bsTooltip,function(b,c){angular.isObject(b)?angular.extend(a,b):a.content=b,angular.isDefined(c)&&e(function(){g&&g.$applyPlacement()})},!0);var g=d(b,f);a.$on("$destroy",function(){g.destroy(),f=null,g=null})}}}]),angular.module("mgcrea.ngStrap.tooltip").run(["$templateCache",function(a){a.put("tooltip/tooltip.tpl.html",'<div class="tooltip" ng-show="title"><div class="tooltip-arrow"></div><div class="tooltip-inner" ng-bind="title"></div></div>')}]);
//# sourceMappingURL=tooltip.min.map
/**
 * angular-strap
 * @version v2.0.0-rc.2 - 2014-01-29
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"use strict";angular.module("mgcrea.ngStrap.popover",["mgcrea.ngStrap.tooltip"]).provider("$popover",function(){var a=this.defaults={animation:"am-fade",placement:"right",template:"popover/popover.tpl.html",contentTemplate:!1,trigger:"click",keyboard:!0,html:!1,title:"",content:"",delay:0,container:!1};this.$get=["$tooltip",function(b){function c(c,d){var e=angular.extend({},a,d),f=b(c,e);return e.content&&(f.$scope.content=e.content),f}return c}]}).directive("bsPopover",["$window","$location","$sce","$popover",function(a,b,c,d){var e=a.requestAnimationFrame||a.setTimeout;return{restrict:"EAC",scope:!0,link:function(a,b,c){var f={scope:a};angular.forEach(["template","contentTemplate","placement","container","delay","trigger","keyboard","html","animation"],function(a){angular.isDefined(c[a])&&(f[a]=c[a])}),angular.forEach(["title","content"],function(b){c[b]&&c.$observe(b,function(c,d){a[b]=c,angular.isDefined(d)&&e(function(){g&&g.$applyPlacement()})})}),c.bsPopover&&a.$watch(c.bsPopover,function(b,c){angular.isObject(b)?angular.extend(a,b):a.content=b,angular.isDefined(c)&&e(function(){g&&g.$applyPlacement()})},!0);var g=d(b,f);a.$on("$destroy",function(){g.destroy(),f=null,g=null})}}}]),angular.module("mgcrea.ngStrap.popover").run(["$templateCache",function(a){a.put("popover/popover.tpl.html",'<div class="popover" ng-show="content"><div class="arrow"></div><h3 class="popover-title" ng-bind="title" ng-show="title"></h3><div class="popover-content" ng-bind="content"></div></div>')}]);
//# sourceMappingURL=popover.min.map
/* =========================================================
 * bootstrap-datepicker.js
 * Repo: https://github.com/eternicode/bootstrap-datepicker/
 * Demo: http://eternicode.github.io/bootstrap-datepicker/
 * Docs: http://bootstrap-datepicker.readthedocs.org/
 * Forked from http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function($, undefined){

	var $window = $(window);

	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}
	function alias(method){
		return function(){
			return this[method].apply(this, arguments);
		};
	}

	var DateArray = (function(){
		var extras = {
			get: function(i){
				return this.slice(i)[0];
			},
			contains: function(d){
				// Array.indexOf is not cross-browser;
				// $.inArray doesn't work with Dates
				var val = d && d.valueOf();
				for (var i=0, l=this.length; i < l; i++)
					if (this[i].valueOf() === val)
						return i;
				return -1;
			},
			remove: function(i){
				this.splice(i,1);
			},
			replace: function(new_array){
				if (!new_array)
					return;
				if (!$.isArray(new_array))
					new_array = [new_array];
				this.clear();
				this.push.apply(this, new_array);
			},
			clear: function(){
				this.length = 0;
			},
			copy: function(){
				var a = new DateArray();
				a.replace(this);
				return a;
			}
		};

		return function(){
			var a = [];
			a.push.apply(a, arguments);
			$.extend(a, extras);
			return a;
		};
	})();


	// Picker object

	var Datepicker = function(element, options){
		this.dates = new DateArray();
		this.viewDate = UTCToday();
		this.focusDate = null;

		this._process_options(options);

		this.element = $(element);
		this.isInline = false;
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
		this.hasInput = this.component && this.element.find('input').length;
		if (this.component && this.component.length === 0)
			this.component = false;

		this.picker = $(DPGlobal.template);
		this._buildEvents();
		this._attachEvents();

		if (this.isInline){
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		}
		else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
		}

		this.viewMode = this.o.startView;

		if (this.o.calendarWeeks)
			this.picker.find('tfoot th.today, tfoot th.clear')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});

		this._allow_update = false;

		this.setStartDate(this._o.startDate);
		this.setEndDate(this._o.endDate);
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if (this.isInline){
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			switch (o.startView){
				case 2:
				case 'decade':
					o.startView = 2;
					break;
				case 1:
				case 'year':
					o.startView = 1;
					break;
				default:
					o.startView = 0;
			}

			switch (o.minViewMode){
				case 1:
				case 'months':
					o.minViewMode = 1;
					break;
				case 2:
				case 'years':
					o.minViewMode = 2;
					break;
				default:
					o.minViewMode = 0;
			}

			o.startView = Math.max(o.startView, o.minViewMode);

			// true, false, or Number > 0
			if (o.multidate !== true){
				o.multidate = Number(o.multidate) || false;
				if (o.multidate !== false)
					o.multidate = Math.max(0, o.multidate);
				else
					o.multidate = 1;
			}
			o.multidateSeparator = String(o.multidateSeparator);

			o.weekStart %= 7;
			o.weekEnd = ((o.weekStart + 6) % 7);

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity){
				if (!!o.startDate){
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
				}
				else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity){
				if (!!o.endDate){
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
				}
				else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
			if (!$.isArray(o.daysOfWeekDisabled))
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
				return parseInt(d, 10);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return (/^auto|left|right|top|bottom$/).test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch (plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			}
			else {
				_plc = $.grep(plc, function(word){
					return (/^left|right$/).test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return (/^top|bottom$/).test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ch, ev; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.on(ev, ch);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev, ch; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.off(ev, ch);
			}
		},
		_buildEvents: function(){
			if (this.isInput){ // single input
				this._events = [
					[this.element, {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(function(e){
							if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
								this.update();
						}, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			else if (this.component && this.hasInput){ // component: input + button
				this._events = [
					// For components that are not readonly, allow keyboard nav
					[this.element.find('input'), {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(function(e){
							if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
								this.update();
						}, this),
						keydown: $.proxy(this.keydown, this)
					}],
					[this.component, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			else if (this.element.is('div')){  // inline datepicker
				this.isInline = true;
			}
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			this._events.push(
				// Component: listen for blur on element descendants
				[this.element, '*', {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}],
				// Input: listen for blur on element
				[this.element, {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}]
			);

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					'mousedown touchstart': $.proxy(function(e){
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length
						)){
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.dates.get(-1),
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				dates: $.map(this.dates, this._utc_to_local),
				format: $.proxy(function(ix, format){
					if (arguments.length === 0){
						ix = this.dates.length - 1;
						format = this.o.format;
					}
					else if (typeof ix === 'string'){
						format = ix;
						ix = this.dates.length - 1;
					}
					format = format || this.o.format;
					var date = this.dates.get(ix);
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},

		show: function(){
			if (!this.isInline)
				this.picker.appendTo('body');
			this.picker.show();
			this.place();
			this._attachSecondaryEvents();
			this._trigger('show');
		},

		hide: function(){
			if (this.isInline)
				return;
			if (!this.picker.is(':visible'))
				return;
			this.focusDate = null;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.o.startView;
			this.showMode();

			if (
				this.o.forceParse &&
				(
					this.isInput && this.element.val() ||
					this.hasInput && this.element.find('input').val()
				)
			)
				this.setValue();
			this._trigger('hide');
		},

		remove: function(){
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput){
				delete this.element.data().date;
			}
		},

		_utc_to_local: function(utc){
			return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
		},
		_local_to_utc: function(local){
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
		},

		getDates: function(){
			return $.map(this.dates, this._utc_to_local);
		},

		getUTCDates: function(){
			return $.map(this.dates, function(d){
				return new Date(d);
			});
		},

		getDate: function(){
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function(){
			return new Date(this.dates.get(-1));
		},

		setDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, args);
			this._trigger('changeDate');
			this.setValue();
		},

		setUTCDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, $.map(args, this._utc_to_local));
			this._trigger('changeDate');
			this.setValue();
		},

		setDate: alias('setDates'),
		setUTCDate: alias('setUTCDates'),

		setValue: function(){
			var formatted = this.getFormattedDate();
			if (!this.isInput){
				if (this.component){
					this.element.find('input').val(formatted).change();
				}
			}
			else {
				this.element.val(formatted).change();
			}
		},

		getFormattedDate: function(format){
			if (format === undefined)
				format = this.o.format;

			var lang = this.o.language;
			return $.map(this.dates, function(d){
				return DPGlobal.formatDate(d, format, lang);
			}).join(this.o.multidateSeparator);
		},

		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			this.updateNavArrows();
		},

		place: function(){
			if (this.isInline)
				return;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				windowWidth = $window.width(),
				windowHeight = $window.height(),
				scrollTop = $window.scrollTop();

			var parentsZindex = [];
			this.element.parents().each(function() {
				var itemZIndex = $(this).css('z-index');
				if ( itemZIndex !== 'auto' && itemZIndex !== 0 ) parentsZindex.push( parseInt( itemZIndex ) );
			});
			var zIndex = Math.max.apply( Math, parentsZindex ) + 10;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left,
				top = offset.top;

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto'){
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				// Default to left
				this.picker.addClass('datepicker-orient-left');
				if (offset.left < 0)
					left -= offset.left - visualPadding;
				else if (offset.left + calendarWidth > windowWidth)
					left = windowWidth - calendarWidth - visualPadding;
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow, bottom_overflow;
			if (yorient === 'auto'){
				top_overflow = -scrollTop + offset.top - calendarHeight;
				bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
				if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
					yorient = 'top';
				else
					yorient = 'bottom';
			}
			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top += height;
			else
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));

			this.picker.css({
				top: top,
				left: left,
				zIndex: zIndex
			});
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update)
				return;

			var oldDates = this.dates.copy(),
				dates = [],
				fromArgs = false;
			if (arguments.length){
				$.each(arguments, $.proxy(function(i, date){
					if (date instanceof Date)
						date = this._local_to_utc(date);
					dates.push(date);
				}, this));
				fromArgs = true;
			}
			else {
				dates = this.isInput
						? this.element.val()
						: this.element.data('date') || this.element.find('input').val();
				if (dates && this.o.multidate)
					dates = dates.split(this.o.multidateSeparator);
				else
					dates = [dates];
				delete this.element.data().date;
			}

			dates = $.map(dates, $.proxy(function(date){
				return DPGlobal.parseDate(date, this.o.format, this.o.language);
			}, this));
			dates = $.grep(dates, $.proxy(function(date){
				return (
					date < this.o.startDate ||
					date > this.o.endDate ||
					!date
				);
			}, this), true);
			this.dates.replace(dates);

			if (this.dates.length)
				this.viewDate = new Date(this.dates.get(-1));
			else if (this.viewDate < this.o.startDate)
				this.viewDate = new Date(this.o.startDate);
			else if (this.viewDate > this.o.endDate)
				this.viewDate = new Date(this.o.endDate);

			if (fromArgs){
				// setting date by clicking
				this.setValue();
			}
			else if (dates.length){
				// setting date by typing
				if (String(oldDates) !== String(this.dates))
					this._trigger('changeDate');
			}
			if (!this.dates.length && oldDates.length)
				this._trigger('clearDate');

			this.fill();
		},

		fillDow: function(){
			var dowCnt = this.o.weekStart,
				html = '<tr>';
			if (this.o.calendarWeeks){
				var cell = '<th class="cw">&nbsp;</th>';
				html += cell;
				this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
			}
			while (dowCnt < this.o.weekStart + 7){
				html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
			var html = '',
			i = 0;
			while (i < 12){
				html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){
					return d.valueOf();
				});
			this.fill();
		},

		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				today = new Date();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
				cls.push('old');
			}
			else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
				cls.push('new');
			}
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
				cls.push('focused');
			// Compare internal UTC date with local today, not UTC today
			if (this.o.todayHighlight &&
				date.getUTCFullYear() === today.getFullYear() &&
				date.getUTCMonth() === today.getMonth() &&
				date.getUTCDate() === today.getDate()){
				cls.push('today');
			}
			if (this.dates.contains(date) !== -1)
				cls.push('active');
			if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
				$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){
				cls.push('disabled');
			}
			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) !== -1){
					cls.push('selected');
				}
			}
			return cls;
		},

		fill: function(){
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				todaytxt = dates[this.o.language].today || dates['en'].today || '',
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
				tooltip;
			if (isNaN(year) || isNaN(month)) return;
			this.picker.find('.datepicker-days thead th.datepicker-switch')
						.text(dates[this.o.language].months[month]+' '+year);
			this.picker.find('tfoot th.today')
						.text(todaytxt)
						.toggle(this.o.todayBtn !== false);
			this.picker.find('tfoot th.clear')
						.text(cleartxt)
						.toggle(this.o.clearBtn !== false);
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month-1, 28),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth){
				if (prevMonth.getUTCDay() === this.o.weekStart){
					html.push('<tr>');
					if (this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek =  (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');

					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				if (this.o.beforeShowDay !== $.noop){
					var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
				}

				clsName = $.unique(clsName);
				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				tooltip = null;
				if (prevMonth.getUTCDay() === this.o.weekEnd){
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');

			$.each(this.dates, function(i, d){
				if (d.getUTCFullYear() === year)
					months.eq(d.getUTCMonth()).addClass('active');
			});

			if (year < startYear || year > endYear){
				months.addClass('disabled');
			}
			if (year === startYear){
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year === endYear){
				months.slice(endMonth+1).addClass('disabled');
			}

			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			var years = $.map(this.dates, function(d){
					return d.getUTCFullYear();
				}),
				classes;
			for (var i = -1; i < 11; i++){
				classes = ['year'];
				if (i === -1)
					classes.push('old');
				else if (i === 10)
					classes.push('new');
				if ($.inArray(year, years) !== -1)
					classes.push('active');
				if (year < startYear || year > endYear)
					classes.push('disabled');
				html += '<span class="' + classes.join(' ') + '">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},

		updateNavArrows: function(){
			if (!this._allow_update)
				return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode){
				case 0:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e){
			e.preventDefault();
			var target = $(e.target).closest('span, td, th'),
				year, month, day;
			if (target.length === 1){
				switch (target[0].nodeName.toLowerCase()){
					case 'th':
						switch (target[0].className){
							case 'datepicker-switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
								switch (this.viewMode){
									case 0:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										this._trigger('changeMonth', this.viewDate);
										break;
									case 1:
									case 2:
										this.viewDate = this.moveYear(this.viewDate, dir);
										if (this.viewMode === 1)
											this._trigger('changeYear', this.viewDate);
										break;
								}
								this.fill();
								break;
							case 'today':
								var date = new Date();
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

								this.showMode(-2);
								var which = this.o.todayBtn === 'linked' ? null : 'view';
								this._setDate(date, which);
								break;
							case 'clear':
								var element;
								if (this.isInput)
									element = this.element;
								else if (this.component)
									element = this.element.find('input');
								if (element)
									element.val("").change();
								this.update();
								this._trigger('changeDate');
								if (this.o.autoclose)
									this.hide();
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled')){
							this.viewDate.setUTCDate(1);
							if (target.is('.month')){
								day = 1;
								month = target.parent().find('span').index(target);
								year = this.viewDate.getUTCFullYear();
								this.viewDate.setUTCMonth(month);
								this._trigger('changeMonth', this.viewDate);
								if (this.o.minViewMode === 1){
									this._setDate(UTCDate(year, month, day));
								}
							}
							else {
								day = 1;
								month = 0;
								year = parseInt(target.text(), 10)||0;
								this.viewDate.setUTCFullYear(year);
								this._trigger('changeYear', this.viewDate);
								if (this.o.minViewMode === 2){
									this._setDate(UTCDate(year, month, day));
								}
							}
							this.showMode(-1);
							this.fill();
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')){
							day = parseInt(target.text(), 10)||1;
							year = this.viewDate.getUTCFullYear();
							month = this.viewDate.getUTCMonth();
							if (target.is('.old')){
								if (month === 0){
									month = 11;
									year -= 1;
								}
								else {
									month -= 1;
								}
							}
							else if (target.is('.new')){
								if (month === 11){
									month = 0;
									year += 1;
								}
								else {
									month += 1;
								}
							}
							this._setDate(UTCDate(year, month, day));
						}
						break;
				}
			}
			if (this.picker.is(':visible') && this._focused_from){
				$(this._focused_from).focus();
			}
			delete this._focused_from;
		},

		_toggle_multidate: function(date){
			var ix = this.dates.contains(date);
			if (!date){
				this.dates.clear();
			}
			if (this.o.multidate === 1 && ix === 0){
                // single datepicker, don't remove selected date
            }
			else if (ix !== -1){
				this.dates.remove(ix);
			}
			else {
				this.dates.push(date);
			}
			if (typeof this.o.multidate === 'number')
				while (this.dates.length > this.o.multidate)
					this.dates.remove(0);
		},

		_setDate: function(date, which){
			if (!which || which === 'date')
				this._toggle_multidate(date && new Date(date));
			if (!which || which  === 'view')
				this.viewDate = date && new Date(date);

			this.fill();
			this.setValue();
			this._trigger('changeDate');
			var element;
			if (this.isInput){
				element = this.element;
			}
			else if (this.component){
				element = this.element.find('input');
			}
			if (element){
				element.change();
			}
			if (this.o.autoclose && (!which || which === 'date')){
				this.hide();
			}
		},

		moveMonth: function(date, dir){
			if (!date)
				return undefined;
			if (!dir)
				return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag === 1){
				test = dir === -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){
						return new_date.getUTCMonth() === month;
					}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){
						return new_date.getUTCMonth() !== new_month;
					};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			}
			else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){
					return new_month !== new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e){
			if (this.picker.is(':not(:visible)')){
				if (e.keyCode === 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dateChanged = false,
				dir, newDate, newViewDate,
				focusDate = this.focusDate || this.viewDate;
			switch (e.keyCode){
				case 27: // escape
					if (this.focusDate){
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
					}
					else
						this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					if (!this.o.keyboardNavigation)
						break;
					dir = e.keyCode === 37 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveYear(focusDate, dir);
						this._trigger('changeYear', this.viewDate);
					}
					else if (e.shiftKey){
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveMonth(focusDate, dir);
						this._trigger('changeMonth', this.viewDate);
					}
					else {
						newDate = new Date(this.dates.get(-1) || UTCToday());
						newDate.setUTCDate(newDate.getUTCDate() + dir);
						newViewDate = new Date(focusDate);
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
					}
					if (this.dateWithinRange(newDate)){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 38: // up
				case 40: // down
					if (!this.o.keyboardNavigation)
						break;
					dir = e.keyCode === 38 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveYear(focusDate, dir);
						this._trigger('changeYear', this.viewDate);
					}
					else if (e.shiftKey){
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveMonth(focusDate, dir);
						this._trigger('changeMonth', this.viewDate);
					}
					else {
						newDate = new Date(this.dates.get(-1) || UTCToday());
						newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
						newViewDate = new Date(focusDate);
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
					}
					if (this.dateWithinRange(newDate)){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 32: // spacebar
					// Spacebar is used in manually typing dates in some formats.
					// As such, its behavior should not be hijacked.
					break;
				case 13: // enter
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
					if (this.o.keyboardNavigation) {
						this._toggle_multidate(focusDate);
						dateChanged = true;
					}
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					if (this.picker.is(':visible')){
						e.preventDefault();
						if (this.o.autoclose)
							this.hide();
					}
					break;
				case 9: // tab
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide();
					break;
			}
			if (dateChanged){
				if (this.dates.length)
					this._trigger('changeDate');
				else
					this._trigger('clearDate');
				var element;
				if (this.isInput){
					element = this.element;
				}
				else if (this.component){
					element = this.element.find('input');
				}
				if (element){
					element.change();
				}
			}
		},

		showMode: function(dir){
			if (dir){
				this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
			}
			this.picker
				.find('>div')
				.hide()
				.filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName)
					.css('display', 'block');
			this.updateNavArrows();
		}
	};

	var DateRangePicker = function(element, options){
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){
			return i.jquery ? i[0] : i;
		});
		delete options.inputs;

		$(this.inputs)
			.datepicker(options)
			.bind('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i){
			return $(i).data('datepicker');
		});
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){
				return i.getUTCDate();
			});
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){
				return d.valueOf();
			});
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		dateUpdated: function(e){
			// `this.updating` is a workaround for preventing infinite recursion
			// between `changeDate` triggering and `setUTCDate` calling.  Until
			// there is a better mechanism.
			if (this.updating)
				return;
			this.updating = true;

			var dp = $(e.target).data('datepicker'),
				new_date = dp.getUTCDate(),
				i = $.inArray(e.target, this.inputs),
				l = this.inputs.length;
			if (i === -1)
				return;

			$.each(this.pickers, function(i, p){
				if (!p.getUTCDate())
					p.setUTCDate(new_date);
			});

			if (new_date < this.dates[i]){
				// Date being moved earlier/left
				while (i >= 0 && new_date < this.dates[i]){
					this.pickers[i--].setUTCDate(new_date);
				}
			}
			else if (new_date > this.dates[i]){
				// Date being moved later/right
				while (i < l && new_date > this.dates[i]){
					this.pickers[i++].setUTCDate(new_date);
				}
			}
			this.updateDates();

			delete this.updating;
		},
		remove: function(){
			$.map(this.pickers, function(p){ p.remove(); });
			delete this.element.data().datepicker;
		}
	};

	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
		prefix = new RegExp('^' + prefix.toLowerCase());
		function re_lower(_,a){
			return a.toLowerCase();
		}
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, re_lower);
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]){
			lang = lang.split('-')[0];
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepicker;
	$.fn.datepicker = function(option){
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function(){
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data){
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.is('.input-daterange') || opts.inputs){
					var ropts = {
						inputs: opts.inputs || $this.find('input').toArray()
					};
					$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
				}
				else {
					$this.data('datepicker', (data = new Datepicker(this, opts)));
				}
			}
			if (typeof option === 'string' && typeof data[option] === 'function'){
				internal_return = data[option].apply(data, args);
				if (internal_return !== undefined)
					return false;
			}
		});
		if (internal_return !== undefined)
			return internal_return;
		else
			return this;
	};

	var defaults = $.fn.datepicker.defaults = {
		autoclose: false,
		beforeShowDay: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		daysOfWeekDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'mm/dd/yyyy',
		keyboardNavigation: true,
		language: 'en',
		minViewMode: 0,
		multidate: false,
		multidateSeparator: ',',
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		weekStart: 0
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear"
		}
	};

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		isLeapYear: function(year){
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function(year, month){
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			// IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language){
			if (!date)
				return undefined;
			if (date instanceof Date)
				return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var part_re = /([\-+]\d+)([dmwy])/,
				parts = date.match(/([\-+]\d+)([dmwy])/g),
				part, dir, i;
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
				date = new Date();
				for (i=0; i < parts.length; i++){
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch (part[2]){
						case 'd':
							date.setUTCDate(date.getUTCDate() + dir);
							break;
						case 'm':
							date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
							break;
						case 'w':
							date.setUTCDate(date.getUTCDate() + dir * 7);
							break;
						case 'y':
							date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
							break;
					}
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
			}
			parts = date && date.match(this.nonpunctuation) || [];
			date = new Date();
			var parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){
						return d.setUTCFullYear(v);
					},
					yy: function(d,v){
						return d.setUTCFullYear(2000+v);
					},
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() !== v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){
						return d.setUTCDate(v);
					}
				},
				val, filtered;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length !== fparts.length){
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			function match_part(){
				var m = this.slice(0, parts[i].length),
					p = parts[i].slice(0, m.length);
				return m === p;
			}
			if (parts.length === fparts.length){
				var cnt;
				for (i=0, cnt = fparts.length; i < cnt; i++){
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)){
						switch (part){
							case 'MM':
								filtered = $(dates[language].months).filter(match_part);
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(match_part);
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				var _date, s;
				for (i=0; i < setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (!date)
				return '';
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			date = [];
			var seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev">&laquo;</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">&raquo;</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot>'+
							'<tr>'+
								'<th colspan="7" class="today"></th>'+
							'</tr>'+
							'<tr>'+
								'<th colspan="7" class="clear"></th>'+
							'</tr>'+
						'</tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class=" table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	* =================== */

	$.fn.datepicker.noConflict = function(){
		$.fn.datepicker = old;
		return this;
	};


	/* DATEPICKER DATA-API
	* ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker'))
				return;
			e.preventDefault();
			// component click requires us to explicitly show it
			$this.datepicker('show');
		}
	);
	$(function(){
		$('[data-provide="datepicker-inline"]').datepicker();
	});

}(window.jQuery));

!function(a){a(["jquery"],function(a){return function(){function b(a,b,c){return o({type:u.error,iconClass:p().iconClasses.error,message:a,optionsOverride:c,title:b})}function c(b,c){return b||(b=p()),r=a("#"+b.containerId),r.length?r:(c&&(r=l(b)),r)}function d(a,b,c){return o({type:u.info,iconClass:p().iconClasses.info,message:a,optionsOverride:c,title:b})}function e(a){s=a}function f(a,b,c){return o({type:u.success,iconClass:p().iconClasses.success,message:a,optionsOverride:c,title:b})}function g(a,b,c){return o({type:u.warning,iconClass:p().iconClasses.warning,message:a,optionsOverride:c,title:b})}function h(a){var b=p();r||c(b),k(a,b)||j(b)}function i(b){var d=p();return r||c(d),b&&0===a(":focus",b).length?void q(b):void(r.children().length&&r.remove())}function j(b){for(var c=r.children(),d=c.length-1;d>=0;d--)k(a(c[d]),b)}function k(b,c){return b&&0===a(":focus",b).length?(b[c.hideMethod]({duration:c.hideDuration,easing:c.hideEasing,complete:function(){q(b)}}),!0):!1}function l(b){return r=a("<div/>").attr("id",b.containerId).addClass(b.positionClass).attr("aria-live","polite").attr("role","alert"),r.appendTo(a(b.target)),r}function m(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body",closeHtml:"<button>&times;</button>",newestOnTop:!0}}function n(a){s&&s(a)}function o(b){function d(b){return!a(":focus",j).length||b?j[g.hideMethod]({duration:g.hideDuration,easing:g.hideEasing,complete:function(){q(j),g.onHidden&&"hidden"!==o.state&&g.onHidden(),o.state="hidden",o.endTime=new Date,n(o)}}):void 0}function e(){(g.timeOut>0||g.extendedTimeOut>0)&&(i=setTimeout(d,g.extendedTimeOut))}function f(){clearTimeout(i),j.stop(!0,!0)[g.showMethod]({duration:g.showDuration,easing:g.showEasing})}var g=p(),h=b.iconClass||g.iconClass;"undefined"!=typeof b.optionsOverride&&(g=a.extend(g,b.optionsOverride),h=b.optionsOverride.iconClass||h),t++,r=c(g,!0);var i=null,j=a("<div/>"),k=a("<div/>"),l=a("<div/>"),m=a(g.closeHtml),o={toastId:t,state:"visible",startTime:new Date,options:g,map:b};return b.iconClass&&j.addClass(g.toastClass).addClass(h),b.title&&(k.append(b.title).addClass(g.titleClass),j.append(k)),b.message&&(l.append(b.message).addClass(g.messageClass),j.append(l)),g.closeButton&&(m.addClass("toast-close-button").attr("role","button"),j.prepend(m)),j.hide(),g.newestOnTop?r.prepend(j):r.append(j),j[g.showMethod]({duration:g.showDuration,easing:g.showEasing,complete:g.onShown}),g.timeOut>0&&(i=setTimeout(d,g.timeOut)),j.hover(f,e),!g.onclick&&g.tapToDismiss&&j.click(d),g.closeButton&&m&&m.click(function(a){a.stopPropagation?a.stopPropagation():void 0!==a.cancelBubble&&a.cancelBubble!==!0&&(a.cancelBubble=!0),d(!0)}),g.onclick&&j.click(function(){g.onclick(),d()}),n(o),g.debug&&console&&console.log(o),j}function p(){return a.extend({},m(),v.options)}function q(a){r||(r=c()),a.is(":visible")||(a.remove(),a=null,0===r.children().length&&r.remove())}var r,s,t=0,u={error:"error",info:"info",success:"success",warning:"warning"},v={clear:h,remove:i,error:b,getContainer:c,info:d,options:{},subscribe:e,success:f,version:"2.0.3",warning:g};return v}()})}("function"==typeof define&&define.amd?define:function(a,b){"undefined"!=typeof module&&module.exports?module.exports=b(require("jquery")):window.toastr=b(window.jQuery)});
// moment.js
// version : 2.0.0
// author : Tim Wood
// license : MIT
// momentjs.com
(function(e){function O(e,t){return function(n){return j(e.call(this,n),t)}}function M(e){return function(t){return this.lang().ordinal(e.call(this,t))}}function _(){}function D(e){H(this,e)}function P(e){var t=this._data={},n=e.years||e.year||e.y||0,r=e.months||e.month||e.M||0,i=e.weeks||e.week||e.w||0,s=e.days||e.day||e.d||0,o=e.hours||e.hour||e.h||0,u=e.minutes||e.minute||e.m||0,a=e.seconds||e.second||e.s||0,f=e.milliseconds||e.millisecond||e.ms||0;this._milliseconds=f+a*1e3+u*6e4+o*36e5,this._days=s+i*7,this._months=r+n*12,t.milliseconds=f%1e3,a+=B(f/1e3),t.seconds=a%60,u+=B(a/60),t.minutes=u%60,o+=B(u/60),t.hours=o%24,s+=B(o/24),s+=i*7,t.days=s%30,r+=B(s/30),t.months=r%12,n+=B(r/12),t.years=n}function H(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function B(e){return e<0?Math.ceil(e):Math.floor(e)}function j(e,t){var n=e+"";while(n.length<t)n="0"+n;return n}function F(e,t,n){var r=t._milliseconds,i=t._days,s=t._months,o;r&&e._d.setTime(+e+r*n),i&&e.date(e.date()+i*n),s&&(o=e.date(),e.date(1).month(e.month()+s*n).date(Math.min(o,e.daysInMonth())))}function I(e){return Object.prototype.toString.call(e)==="[object Array]"}function q(e,t){var n=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),i=0,s;for(s=0;s<n;s++)~~e[s]!==~~t[s]&&i++;return i+r}function R(e,t){return t.abbr=e,s[e]||(s[e]=new _),s[e].set(t),s[e]}function U(e){return e?(!s[e]&&o&&require("./lang/"+e),s[e]):t.fn._lang}function z(e){return e.match(/\[.*\]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function W(e){var t=e.match(a),n,r;for(n=0,r=t.length;n<r;n++)A[t[n]]?t[n]=A[t[n]]:t[n]=z(t[n]);return function(i){var s="";for(n=0;n<r;n++)s+=typeof t[n].call=="function"?t[n].call(i,e):t[n];return s}}function X(e,t){function r(t){return e.lang().longDateFormat(t)||t}var n=5;while(n--&&f.test(t))t=t.replace(f,r);return C[t]||(C[t]=W(t)),C[t](e)}function V(e){switch(e){case"DDDD":return p;case"YYYY":return d;case"YYYYY":return v;case"S":case"SS":case"SSS":case"DDD":return h;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":case"a":case"A":return m;case"X":return b;case"Z":case"ZZ":return g;case"T":return y;case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return c;default:return new RegExp(e.replace("\\",""))}}function $(e,t,n){var r,i,s=n._a;switch(e){case"M":case"MM":s[1]=t==null?0:~~t-1;break;case"MMM":case"MMMM":r=U(n._l).monthsParse(t),r!=null?s[1]=r:n._isValid=!1;break;case"D":case"DD":case"DDD":case"DDDD":t!=null&&(s[2]=~~t);break;case"YY":s[0]=~~t+(~~t>68?1900:2e3);break;case"YYYY":case"YYYYY":s[0]=~~t;break;case"a":case"A":n._isPm=(t+"").toLowerCase()==="pm";break;case"H":case"HH":case"h":case"hh":s[3]=~~t;break;case"m":case"mm":s[4]=~~t;break;case"s":case"ss":s[5]=~~t;break;case"S":case"SS":case"SSS":s[6]=~~(("0."+t)*1e3);break;case"X":n._d=new Date(parseFloat(t)*1e3);break;case"Z":case"ZZ":n._useUTC=!0,r=(t+"").match(x),r&&r[1]&&(n._tzh=~~r[1]),r&&r[2]&&(n._tzm=~~r[2]),r&&r[0]==="+"&&(n._tzh=-n._tzh,n._tzm=-n._tzm)}t==null&&(n._isValid=!1)}function J(e){var t,n,r=[];if(e._d)return;for(t=0;t<7;t++)e._a[t]=r[t]=e._a[t]==null?t===2?1:0:e._a[t];r[3]+=e._tzh||0,r[4]+=e._tzm||0,n=new Date(0),e._useUTC?(n.setUTCFullYear(r[0],r[1],r[2]),n.setUTCHours(r[3],r[4],r[5],r[6])):(n.setFullYear(r[0],r[1],r[2]),n.setHours(r[3],r[4],r[5],r[6])),e._d=n}function K(e){var t=e._f.match(a),n=e._i,r,i;e._a=[];for(r=0;r<t.length;r++)i=(V(t[r]).exec(n)||[])[0],i&&(n=n.slice(n.indexOf(i)+i.length)),A[t[r]]&&$(t[r],i,e);e._isPm&&e._a[3]<12&&(e._a[3]+=12),e._isPm===!1&&e._a[3]===12&&(e._a[3]=0),J(e)}function Q(e){var t,n,r,i=99,s,o,u;while(e._f.length){t=H({},e),t._f=e._f.pop(),K(t),n=new D(t);if(n.isValid()){r=n;break}u=q(t._a,n.toArray()),u<i&&(i=u,r=n)}H(e,r)}function G(e){var t,n=e._i;if(w.exec(n)){e._f="YYYY-MM-DDT";for(t=0;t<4;t++)if(S[t][1].exec(n)){e._f+=S[t][0];break}g.exec(n)&&(e._f+=" Z"),K(e)}else e._d=new Date(n)}function Y(t){var n=t._i,r=u.exec(n);n===e?t._d=new Date:r?t._d=new Date(+r[1]):typeof n=="string"?G(t):I(n)?(t._a=n.slice(0),J(t)):t._d=n instanceof Date?new Date(+n):new Date(n)}function Z(e,t,n,r,i){return i.relativeTime(t||1,!!n,e,r)}function et(e,t,n){var i=r(Math.abs(e)/1e3),s=r(i/60),o=r(s/60),u=r(o/24),a=r(u/365),f=i<45&&["s",i]||s===1&&["m"]||s<45&&["mm",s]||o===1&&["h"]||o<22&&["hh",o]||u===1&&["d"]||u<=25&&["dd",u]||u<=45&&["M"]||u<345&&["MM",r(u/30)]||a===1&&["y"]||["yy",a];return f[2]=t,f[3]=e>0,f[4]=n,Z.apply({},f)}function tt(e,n,r){var i=r-n,s=r-e.day();return s>i&&(s-=7),s<i-7&&(s+=7),Math.ceil(t(e).add("d",s).dayOfYear()/7)}function nt(e){var n=e._i,r=e._f;return n===null||n===""?null:(typeof n=="string"&&(e._i=n=U().preparse(n)),t.isMoment(n)?(e=H({},n),e._d=new Date(+n._d)):r?I(r)?Q(e):K(e):Y(e),new D(e))}function rt(e,n){t.fn[e]=t.fn[e+"s"]=function(e){var t=this._isUTC?"UTC":"";return e!=null?(this._d["set"+t+n](e),this):this._d["get"+t+n]()}}function it(e){t.duration.fn[e]=function(){return this._data[e]}}function st(e,n){t.duration.fn["as"+e]=function(){return+this/n}}var t,n="2.0.0",r=Math.round,i,s={},o=typeof module!="undefined"&&module.exports,u=/^\/?Date\((\-?\d+)/i,a=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,f=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,l=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,c=/\d\d?/,h=/\d{1,3}/,p=/\d{3}/,d=/\d{1,4}/,v=/[+\-]?\d{1,6}/,m=/[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,g=/Z|[\+\-]\d\d:?\d\d/i,y=/T/i,b=/[\+\-]?\d+(\.\d{1,3})?/,w=/^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,E="YYYY-MM-DDTHH:mm:ssZ",S=[["HH:mm:ss.S",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],x=/([\+\-]|\d\d)/gi,T="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),N={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},C={},k="DDD w W M D d".split(" "),L="M D H h m s w W".split(" "),A={M:function(){return this.month()+1},MMM:function(e){return this.lang().monthsShort(this,e)},MMMM:function(e){return this.lang().months(this,e)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(e){return this.lang().weekdaysMin(this,e)},ddd:function(e){return this.lang().weekdaysShort(this,e)},dddd:function(e){return this.lang().weekdays(this,e)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return j(this.year()%100,2)},YYYY:function(){return j(this.year(),4)},YYYYY:function(){return j(this.year(),5)},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return~~(this.milliseconds()/100)},SS:function(){return j(~~(this.milliseconds()/10),2)},SSS:function(){return j(this.milliseconds(),3)},Z:function(){var e=-this.zone(),t="+";return e<0&&(e=-e,t="-"),t+j(~~(e/60),2)+":"+j(~~e%60,2)},ZZ:function(){var e=-this.zone(),t="+";return e<0&&(e=-e,t="-"),t+j(~~(10*e/6),4)},X:function(){return this.unix()}};while(k.length)i=k.pop(),A[i+"o"]=M(A[i]);while(L.length)i=L.pop(),A[i+i]=O(A[i],2);A.DDDD=O(A.DDD,3),_.prototype={set:function(e){var t,n;for(n in e)t=e[n],typeof t=="function"?this[n]=t:this["_"+n]=t},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(e){return this._months[e.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(e){return this._monthsShort[e.month()]},monthsParse:function(e){var n,r,i,s;this._monthsParse||(this._monthsParse=[]);for(n=0;n<12;n++){this._monthsParse[n]||(r=t([2e3,n]),i="^"+this.months(r,"")+"|^"+this.monthsShort(r,""),this._monthsParse[n]=new RegExp(i.replace(".",""),"i"));if(this._monthsParse[n].test(e))return n}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(e){return this._weekdays[e.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(e){return this._weekdaysShort[e.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(e){return this._weekdaysMin[e.day()]},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(e){var t=this._longDateFormat[e];return!t&&this._longDateFormat[e.toUpperCase()]&&(t=this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e]=t),t},meridiem:function(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},calendar:function(e,t){var n=this._calendar[e];return typeof n=="function"?n.apply(t):n},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(e,t,n,r){var i=this._relativeTime[n];return typeof i=="function"?i(e,t,n,r):i.replace(/%d/i,e)},pastFuture:function(e,t){var n=this._relativeTime[e>0?"future":"past"];return typeof n=="function"?n(t):n.replace(/%s/i,t)},ordinal:function(e){return this._ordinal.replace("%d",e)},_ordinal:"%d",preparse:function(e){return e},postformat:function(e){return e},week:function(e){return tt(e,this._week.dow,this._week.doy)},_week:{dow:0,doy:6}},t=function(e,t,n){return nt({_i:e,_f:t,_l:n,_isUTC:!1})},t.utc=function(e,t,n){return nt({_useUTC:!0,_isUTC:!0,_l:n,_i:e,_f:t})},t.unix=function(e){return t(e*1e3)},t.duration=function(e,n){var r=t.isDuration(e),i=typeof e=="number",s=r?e._data:i?{}:e,o;return i&&(n?s[n]=e:s.milliseconds=e),o=new P(s),r&&e.hasOwnProperty("_lang")&&(o._lang=e._lang),o},t.version=n,t.defaultFormat=E,t.lang=function(e,n){var r;if(!e)return t.fn._lang._abbr;n?R(e,n):s[e]||U(e),t.duration.fn._lang=t.fn._lang=U(e)},t.langData=function(e){return e&&e._lang&&e._lang._abbr&&(e=e._lang._abbr),U(e)},t.isMoment=function(e){return e instanceof D},t.isDuration=function(e){return e instanceof P},t.fn=D.prototype={clone:function(){return t(this)},valueOf:function(){return+this._d},unix:function(){return Math.floor(+this._d/1e3)},toString:function(){return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._d},toJSON:function(){return t.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var e=this;return[e.year(),e.month(),e.date(),e.hours(),e.minutes(),e.seconds(),e.milliseconds()]},isValid:function(){return this._isValid==null&&(this._a?this._isValid=!q(this._a,(this._isUTC?t.utc(this._a):t(this._a)).toArray()):this._isValid=!isNaN(this._d.getTime())),!!this._isValid},utc:function(){return this._isUTC=!0,this},local:function(){return this._isUTC=!1,this},format:function(e){var n=X(this,e||t.defaultFormat);return this.lang().postformat(n)},add:function(e,n){var r;return typeof e=="string"?r=t.duration(+n,e):r=t.duration(e,n),F(this,r,1),this},subtract:function(e,n){var r;return typeof e=="string"?r=t.duration(+n,e):r=t.duration(e,n),F(this,r,-1),this},diff:function(e,n,r){var i=this._isUTC?t(e).utc():t(e).local(),s=(this.zone()-i.zone())*6e4,o,u;return n&&(n=n.replace(/s$/,"")),n==="year"||n==="month"?(o=(this.daysInMonth()+i.daysInMonth())*432e5,u=(this.year()-i.year())*12+(this.month()-i.month()),u+=(this-t(this).startOf("month")-(i-t(i).startOf("month")))/o,n==="year"&&(u/=12)):(o=this-i-s,u=n==="second"?o/1e3:n==="minute"?o/6e4:n==="hour"?o/36e5:n==="day"?o/864e5:n==="week"?o/6048e5:o),r?u:B(u)},from:function(e,n){return t.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!n)},fromNow:function(e){return this.from(t(),e)},calendar:function(){var e=this.diff(t().startOf("day"),"days",!0),n=e<-6?"sameElse":e<-1?"lastWeek":e<0?"lastDay":e<1?"sameDay":e<2?"nextDay":e<7?"nextWeek":"sameElse";return this.format(this.lang().calendar(n,this))},isLeapYear:function(){var e=this.year();return e%4===0&&e%100!==0||e%400===0},isDST:function(){return this.zone()<t([this.year()]).zone()||this.zone()<t([this.year(),5]).zone()},day:function(e){var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return e==null?t:this.add({d:e-t})},startOf:function(e){e=e.replace(/s$/,"");switch(e){case"year":this.month(0);case"month":this.date(1);case"week":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return e==="week"&&this.day(0),this},endOf:function(e){return this.startOf(e).add(e.replace(/s?$/,"s"),1).subtract("ms",1)},isAfter:function(e,n){return n=typeof n!="undefined"?n:"millisecond",+this.clone().startOf(n)>+t(e).startOf(n)},isBefore:function(e,n){return n=typeof n!="undefined"?n:"millisecond",+this.clone().startOf(n)<+t(e).startOf(n)},isSame:function(e,n){return n=typeof n!="undefined"?n:"millisecond",+this.clone().startOf(n)===+t(e).startOf(n)},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return t.utc([this.year(),this.month()+1,0]).date()},dayOfYear:function(e){var n=r((t(this).startOf("day")-t(this).startOf("year"))/864e5)+1;return e==null?n:this.add("d",e-n)},isoWeek:function(e){var t=tt(this,1,4);return e==null?t:this.add("d",(e-t)*7)},week:function(e){var t=this.lang().week(this);return e==null?t:this.add("d",(e-t)*7)},lang:function(t){return t===e?this._lang:(this._lang=U(t),this)}};for(i=0;i<T.length;i++)rt(T[i].toLowerCase().replace(/s$/,""),T[i]);rt("year","FullYear"),t.fn.days=t.fn.day,t.fn.weeks=t.fn.week,t.fn.isoWeeks=t.fn.isoWeek,t.duration.fn=P.prototype={weeks:function(){return B(this.days()/7)},valueOf:function(){return this._milliseconds+this._days*864e5+this._months*2592e6},humanize:function(e){var t=+this,n=et(t,!e,this.lang());return e&&(n=this.lang().pastFuture(t,n)),this.lang().postformat(n)},lang:t.fn.lang};for(i in N)N.hasOwnProperty(i)&&(st(i,N[i]),it(i.toLowerCase()));st("Weeks",6048e5),t.lang("en",{ordinal:function(e){var t=e%10,n=~~(e%100/10)===1?"th":t===1?"st":t===2?"nd":t===3?"rd":"th";return e+n}}),o&&(module.exports=t),typeof ender=="undefined"&&(this.moment=t),typeof define=="function"&&define.amd&&define("moment",[],function(){return t})}).call(this);
/*!
 * bootstrap-select v1.4.3
 * http://silviomoreto.github.io/bootstrap-select/
 *
 * Copyright 2013 bootstrap-select
 * Licensed under the MIT license
 */
;!function(b){b.expr[":"].icontains=function(e,c,d){return b(e).text().toUpperCase().indexOf(d[3].toUpperCase())>=0};var a=function(d,c,f){if(f){f.stopPropagation();f.preventDefault()}this.$element=b(d);this.$newElement=null;this.$button=null;this.$menu=null;this.$lis=null;this.options=b.extend({},b.fn.selectpicker.defaults,this.$element.data(),typeof c=="object"&&c);if(this.options.title===null){this.options.title=this.$element.attr("title")}this.val=a.prototype.val;this.render=a.prototype.render;this.refresh=a.prototype.refresh;this.setStyle=a.prototype.setStyle;this.selectAll=a.prototype.selectAll;this.deselectAll=a.prototype.deselectAll;this.init()};a.prototype={constructor:a,init:function(){var c=this,d=this.$element.attr("id");this.$element.hide();this.multiple=this.$element.prop("multiple");this.autofocus=this.$element.prop("autofocus");this.$newElement=this.createView();this.$element.after(this.$newElement);this.$menu=this.$newElement.find("> .dropdown-menu");this.$button=this.$newElement.find("> button");this.$searchbox=this.$newElement.find("input");if(d!==undefined){this.$button.attr("data-id",d);b('label[for="'+d+'"]').click(function(f){f.preventDefault();c.$button.focus()})}this.checkDisabled();this.clickListener();if(this.options.liveSearch){this.liveSearchListener()}this.render();this.liHeight();this.setStyle();this.setWidth();if(this.options.container){this.selectPosition()}this.$menu.data("this",this);this.$newElement.data("this",this)},createDropdown:function(){var c=this.multiple?" show-tick":"";var g=this.autofocus?" autofocus":"";var f=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+"</div>":"";var e=this.options.liveSearch?'<div class="bootstrap-select-searchbox"><input type="text" class="input-block-level form-control" /></div>':"";var d='<div class="btn-group bootstrap-select'+c+'"><button type="button" class="btn dropdown-toggle selectpicker" data-toggle="dropdown"'+g+'><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">'+f+e+'<ul class="dropdown-menu inner selectpicker" role="menu"></ul></div></div>';return b(d)},createView:function(){var c=this.createDropdown();var d=this.createLi();c.find("ul").append(d);return c},reloadLi:function(){this.destroyLi();var c=this.createLi();this.$menu.find("ul").append(c)},destroyLi:function(){this.$menu.find("li").remove()},createLi:function(){var d=this,e=[],c="";this.$element.find("option").each(function(){var i=b(this);var g=i.attr("class")||"";var h=i.attr("style")||"";var m=i.data("content")?i.data("content"):i.html();var k=i.data("subtext")!==undefined?'<small class="muted text-muted">'+i.data("subtext")+"</small>":"";var j=i.data("icon")!==undefined?'<i class="'+d.options.iconBase+" "+i.data("icon")+'"></i> ':"";if(j!==""&&(i.is(":disabled")||i.parent().is(":disabled"))){j="<span>"+j+"</span>"}if(!i.data("content")){m=j+'<span class="text">'+m+k+"</span>"}if(d.options.hideDisabled&&(i.is(":disabled")||i.parent().is(":disabled"))){e.push('<a style="min-height: 0; padding: 0"></a>')}else{if(i.parent().is("optgroup")&&i.data("divider")!==true){if(i.index()===0){var l=i.parent().attr("label");var n=i.parent().data("subtext")!==undefined?'<small class="muted text-muted">'+i.parent().data("subtext")+"</small>":"";var f=i.parent().data("icon")?'<i class="'+i.parent().data("icon")+'"></i> ':"";l=f+'<span class="text">'+l+n+"</span>";if(i[0].index!==0){e.push('<div class="div-contain"><div class="divider"></div></div><dt>'+l+"</dt>"+d.createA(m,"opt "+g,h))}else{e.push("<dt>"+l+"</dt>"+d.createA(m,"opt "+g,h))}}else{e.push(d.createA(m,"opt "+g,h))}}else{if(i.data("divider")===true){e.push('<div class="div-contain"><div class="divider"></div></div>')}else{if(b(this).data("hidden")===true){e.push("")}else{e.push(d.createA(m,g,h))}}}}});b.each(e,function(f,g){c+="<li rel="+f+">"+g+"</li>"});if(!this.multiple&&this.$element.find("option:selected").length===0&&!this.options.title){this.$element.find("option").eq(0).prop("selected",true).attr("selected","selected")}return b(c)},createA:function(e,c,d){return'<a tabindex="0" class="'+c+'" style="'+d+'">'+e+'<i class="'+this.options.iconBase+" "+this.options.tickIcon+' icon-ok check-mark"></i></a>'},render:function(e){var d=this;if(e!==false){this.$element.find("option").each(function(i){d.setDisabled(i,b(this).is(":disabled")||b(this).parent().is(":disabled"));d.setSelected(i,b(this).is(":selected"))})}this.tabIndex();var h=this.$element.find("option:selected").map(function(){var k=b(this);var j=k.data("icon")&&d.options.showIcon?'<i class="'+d.options.iconBase+" "+k.data("icon")+'"></i> ':"";var i;if(d.options.showSubtext&&k.attr("data-subtext")&&!d.multiple){i=' <small class="muted text-muted">'+k.data("subtext")+"</small>"}else{i=""}if(k.data("content")&&d.options.showContent){return k.data("content")}else{if(k.attr("title")!==undefined){return k.attr("title")}else{return j+k.html()+i}}}).toArray();var g=!this.multiple?h[0]:h.join(this.options.multipleSeparator);if(this.multiple&&this.options.selectedTextFormat.indexOf("count")>-1){var c=this.options.selectedTextFormat.split(">");var f=this.options.hideDisabled?":not([disabled])":"";if((c.length>1&&h.length>c[1])||(c.length==1&&h.length>=2)){g=this.options.countSelectedText.replace("{0}",h.length).replace("{1}",this.$element.find('option:not([data-divider="true"]):not([data-hidden="true"])'+f).length)}}if(!g){g=this.options.title!==undefined?this.options.title:this.options.noneSelectedText}this.$button.attr("title",b.trim(g));this.$newElement.find(".filter-option").html(g)},setStyle:function(e,d){if(this.$element.attr("class")){this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device/gi,""))}var c=e?e:this.options.style;if(d=="add"){this.$button.addClass(c)}else{if(d=="remove"){this.$button.removeClass(c)}else{this.$button.removeClass(this.options.style);this.$button.addClass(c)}}},liHeight:function(){var e=this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus",false).end().appendTo("body"),f=e.addClass("open").find("> .dropdown-menu"),d=f.find("li > a").outerHeight(),c=this.options.header?f.find(".popover-title").outerHeight():0,g=this.options.liveSearch?f.find(".bootstrap-select-searchbox").outerHeight():0;e.remove();this.$newElement.data("liHeight",d).data("headerHeight",c).data("searchHeight",g)},setSize:function(){var h=this,d=this.$menu,i=d.find(".inner"),t=this.$newElement.outerHeight(),f=this.$newElement.data("liHeight"),r=this.$newElement.data("headerHeight"),l=this.$newElement.data("searchHeight"),k=d.find("li .divider").outerHeight(true),q=parseInt(d.css("padding-top"))+parseInt(d.css("padding-bottom"))+parseInt(d.css("border-top-width"))+parseInt(d.css("border-bottom-width")),o=this.options.hideDisabled?":not(.disabled)":"",n=b(window),g=q+parseInt(d.css("margin-top"))+parseInt(d.css("margin-bottom"))+2,p,u,s,j=function(){u=h.$newElement.offset().top-n.scrollTop();s=n.height()-u-t};j();if(this.options.header){d.css("padding-top",0)}if(this.options.size=="auto"){var e=function(){var v;j();p=s-g;if(h.options.dropupAuto){h.$newElement.toggleClass("dropup",(u>s)&&((p-g)<d.height()))}if(h.$newElement.hasClass("dropup")){p=u-g}if((d.find("li").length+d.find("dt").length)>3){v=f*3+g-2}else{v=0}d.css({"max-height":p+"px",overflow:"hidden","min-height":v+"px"});i.css({"max-height":p-r-l-q+"px","overflow-y":"auto","min-height":v-q+"px"})};e();b(window).resize(e);b(window).scroll(e)}else{if(this.options.size&&this.options.size!="auto"&&d.find("li"+o).length>this.options.size){var m=d.find("li"+o+" > *").filter(":not(.div-contain)").slice(0,this.options.size).last().parent().index();var c=d.find("li").slice(0,m+1).find(".div-contain").length;p=f*this.options.size+c*k+q;if(h.options.dropupAuto){this.$newElement.toggleClass("dropup",(u>s)&&(p<d.height()))}d.css({"max-height":p+r+l+"px",overflow:"hidden"});i.css({"max-height":p-q+"px","overflow-y":"auto"})}}},setWidth:function(){if(this.options.width=="auto"){this.$menu.css("min-width","0");var d=this.$newElement.clone().appendTo("body");var c=d.find("> .dropdown-menu").css("width");d.remove();this.$newElement.css("width",c)}else{if(this.options.width=="fit"){this.$menu.css("min-width","");this.$newElement.css("width","").addClass("fit-width")}else{if(this.options.width){this.$menu.css("min-width","");this.$newElement.css("width",this.options.width)}else{this.$menu.css("min-width","");this.$newElement.css("width","")}}}if(this.$newElement.hasClass("fit-width")&&this.options.width!=="fit"){this.$newElement.removeClass("fit-width")}},selectPosition:function(){var e=this,d="<div />",f=b(d),h,g,c=function(i){f.addClass(i.attr("class")).toggleClass("dropup",i.hasClass("dropup"));h=i.offset();g=i.hasClass("dropup")?0:i[0].offsetHeight;f.css({top:h.top+g,left:h.left,width:i[0].offsetWidth,position:"absolute"})};this.$newElement.on("click",function(){c(b(this));f.appendTo(e.options.container);f.toggleClass("open",!b(this).hasClass("open"));f.append(e.$menu)});b(window).resize(function(){c(e.$newElement)});b(window).on("scroll",function(){c(e.$newElement)});b("html").on("click",function(i){if(b(i.target).closest(e.$newElement).length<1){f.removeClass("open")}})},mobile:function(){this.$element.addClass("mobile-device").appendTo(this.$newElement);if(this.options.container){this.$menu.hide()}},refresh:function(){this.$lis=null;this.reloadLi();this.render();this.setWidth();this.setStyle();this.checkDisabled();this.liHeight()},update:function(){this.reloadLi();this.setWidth();this.setStyle();this.checkDisabled();this.liHeight()},setSelected:function(c,d){if(this.$lis==null){this.$lis=this.$menu.find("li")}b(this.$lis[c]).toggleClass("selected",d)},setDisabled:function(c,d){if(this.$lis==null){this.$lis=this.$menu.find("li")}if(d){b(this.$lis[c]).addClass("disabled").find("a").attr("href","#").attr("tabindex",-1)}else{b(this.$lis[c]).removeClass("disabled").find("a").removeAttr("href").attr("tabindex",0)}},isDisabled:function(){return this.$element.is(":disabled")},checkDisabled:function(){var c=this;if(this.isDisabled()){this.$button.addClass("disabled").attr("tabindex",-1)}else{if(this.$button.hasClass("disabled")){this.$button.removeClass("disabled")}if(this.$button.attr("tabindex")==-1){if(!this.$element.data("tabindex")){this.$button.removeAttr("tabindex")}}}this.$button.click(function(){return !c.isDisabled()})},tabIndex:function(){if(this.$element.is("[tabindex]")){this.$element.data("tabindex",this.$element.attr("tabindex"));this.$button.attr("tabindex",this.$element.data("tabindex"))}},clickListener:function(){var c=this;b("body").on("touchstart.dropdown",".dropdown-menu",function(d){d.stopPropagation()});this.$newElement.on("click",function(){c.setSize();if(!c.options.liveSearch&&!c.multiple){setTimeout(function(){c.$menu.find(".selected a").focus()},10)}});this.$menu.on("click","li a",function(k){var g=b(this).parent().index(),j=c.$element.val(),f=c.$element.prop("selectedIndex");if(c.multiple){k.stopPropagation()}k.preventDefault();if(!c.isDisabled()&&!b(this).parent().hasClass("disabled")){var d=c.$element.find("option"),i=d.eq(g),h=i.prop("selected");if(!c.multiple){d.prop("selected",false);i.prop("selected",true);c.$menu.find(".selected").removeClass("selected");c.setSelected(g,true)}else{i.prop("selected",!h);c.setSelected(g,!h)}if(!c.multiple){c.$button.focus()}else{if(c.options.liveSearch){c.$searchbox.focus()}}if((j!=c.$element.val()&&c.multiple)||(f!=c.$element.prop("selectedIndex")&&!c.multiple)){c.$element.change()}}});this.$menu.on("click","li.disabled a, li dt, li .div-contain, .popover-title, .popover-title :not(.close)",function(d){if(d.target==this){d.preventDefault();d.stopPropagation();if(!c.options.liveSearch){c.$button.focus()}else{c.$searchbox.focus()}}});this.$menu.on("click",".popover-title .close",function(){c.$button.focus()});this.$searchbox.on("click",function(d){d.stopPropagation()});this.$element.change(function(){c.render(false)})},liveSearchListener:function(){var d=this,c=b('<li class="no-results"></li>');this.$newElement.on("click.dropdown.data-api",function(){d.$menu.find(".active").removeClass("active");if(!!d.$searchbox.val()){d.$searchbox.val("");d.$menu.find("li").show();if(!!c.parent().length){c.remove()}}if(!d.multiple){d.$menu.find(".selected").addClass("active")}setTimeout(function(){d.$searchbox.focus()},10)});this.$searchbox.on("input propertychange",function(){if(d.$searchbox.val()){d.$menu.find("li").show().not(":icontains("+d.$searchbox.val()+")").hide();if(!d.$menu.find("li").filter(":visible:not(.no-results)").length){if(!!c.parent().length){c.remove()}c.html(d.options.noneResultsText+' "'+d.$searchbox.val()+'"').show();d.$menu.find("li").last().after(c)}else{if(!!c.parent().length){c.remove()}}}else{d.$menu.find("li").show();if(!!c.parent().length){c.remove()}}d.$menu.find("li.active").removeClass("active");d.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus();b(this).focus()});this.$menu.on("mouseenter","a",function(f){d.$menu.find(".active").removeClass("active");b(f.currentTarget).parent().not(".disabled").addClass("active")});this.$menu.on("mouseleave","a",function(){d.$menu.find(".active").removeClass("active")})},val:function(c){if(c!==undefined){this.$element.val(c);this.$element.change();return this.$element}else{return this.$element.val()}},selectAll:function(){this.$element.find("option").prop("selected",true).attr("selected","selected");this.render()},deselectAll:function(){this.$element.find("option").prop("selected",false).removeAttr("selected");this.render()},keydown:function(p){var q,o,i,n,k,j,r,f,h,m,d,s,g={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};q=b(this);i=q.parent();if(q.is("input")){i=q.parent().parent()}m=i.data("this");if(m.options.liveSearch){i=q.parent().parent()}if(m.options.container){i=m.$menu}o=b("[role=menu] li:not(.divider) a",i);s=m.$menu.parent().hasClass("open");if(m.options.liveSearch){if(/(^9$|27)/.test(p.keyCode)&&s&&m.$menu.find(".active").length===0){p.preventDefault();m.$menu.parent().removeClass("open");m.$button.focus()}o=b("[role=menu] li:not(.divider):visible",i);if(!q.val()&&!/(38|40)/.test(p.keyCode)){if(o.filter(".active").length===0){o=m.$newElement.find("li").filter(":icontains("+g[p.keyCode]+")")}}}if(!o.length){return}if(/(38|40)/.test(p.keyCode)){if(!s){m.$menu.parent().addClass("open")}n=o.index(o.filter(":focus"));j=o.parent(":not(.disabled):visible").first().index();r=o.parent(":not(.disabled):visible").last().index();k=o.eq(n).parent().nextAll(":not(.disabled):visible").eq(0).index();f=o.eq(n).parent().prevAll(":not(.disabled):visible").eq(0).index();h=o.eq(k).parent().prevAll(":not(.disabled):visible").eq(0).index();if(m.options.liveSearch){o.each(function(e){if(b(this).is(":not(.disabled)")){b(this).data("index",e)}});n=o.index(o.filter(".active"));j=o.filter(":not(.disabled):visible").first().data("index");r=o.filter(":not(.disabled):visible").last().data("index");k=o.eq(n).nextAll(":not(.disabled):visible").eq(0).data("index");f=o.eq(n).prevAll(":not(.disabled):visible").eq(0).data("index");h=o.eq(k).prevAll(":not(.disabled):visible").eq(0).data("index")}d=q.data("prevIndex");if(p.keyCode==38){if(m.options.liveSearch){n-=1}if(n!=h&&n>f){n=f}if(n<j){n=j}if(n==d){n=r}}if(p.keyCode==40){if(m.options.liveSearch){n+=1}if(n==-1){n=0}if(n!=h&&n<k){n=k}if(n>r){n=r}if(n==d){n=j}}q.data("prevIndex",n);if(!m.options.liveSearch){o.eq(n).focus()}else{p.preventDefault();if(!q.is(".dropdown-toggle")){o.removeClass("active");o.eq(n).addClass("active").find("a").focus();q.focus()}}}else{if(!q.is("input")){var c=[],l,t;o.each(function(){if(b(this).parent().is(":not(.disabled)")){if(b.trim(b(this).text().toLowerCase()).substring(0,1)==g[p.keyCode]){c.push(b(this).parent().index())}}});l=b(document).data("keycount");l++;b(document).data("keycount",l);t=b.trim(b(":focus").text().toLowerCase()).substring(0,1);if(t!=g[p.keyCode]){l=1;b(document).data("keycount",l)}else{if(l>=c.length){b(document).data("keycount",0);if(l>c.length){l=1}}}o.eq(c[l-1]).focus()}}if(/(13|32|^9$)/.test(p.keyCode)&&s){if(!/(32)/.test(p.keyCode)){p.preventDefault()}if(!m.options.liveSearch){b(":focus").click()}else{if(!/(32)/.test(p.keyCode)){m.$menu.find(".active a").click();q.focus()}}b(document).data("keycount",0)}if((/(^9$|27)/.test(p.keyCode)&&s&&(m.multiple||m.options.liveSearch))||(/(27)/.test(p.keyCode)&&!s)){m.$menu.parent().removeClass("open");m.$button.focus()}},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},destroy:function(){this.$newElement.remove();this.$element.remove()}};b.fn.selectpicker=function(e,f){var c=arguments;var g;var d=this.each(function(){if(b(this).is("select")){var m=b(this),l=m.data("selectpicker"),h=typeof e=="object"&&e;if(!l){m.data("selectpicker",(l=new a(this,h,f)))}else{if(h){for(var j in h){l.options[j]=h[j]}}}if(typeof e=="string"){var k=e;if(l[k] instanceof Function){[].shift.apply(c);g=l[k].apply(l,c)}else{g=l.options[k]}}}});if(g!==undefined){return g}else{return d}};b.fn.selectpicker.defaults={style:"btn-default",size:"auto",title:null,selectedTextFormat:"values",noneSelectedText:"Nothing selected",noneResultsText:"No results match",countSelectedText:"{0} of {1} selected",width:false,container:false,hideDisabled:false,showSubtext:false,showIcon:true,showContent:true,dropupAuto:true,header:false,liveSearch:false,multipleSeparator:", ",iconBase:"glyphicon",tickIcon:"glyphicon-ok"};b(document).data("keycount",0).on("keydown",".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input",a.prototype.keydown).on("focusin.modal",".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input",function(c){c.stopPropagation()})}(window.jQuery);
/* ===========================================================
# bootstrap-tour - v0.8.0
# http://bootstraptour.com
# ==============================================================
# Copyright 2012-2013 Ulrich Sossou
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/
!function(a,b){var c,d;return d=b.document,c=function(){function c(c){this._options=a.extend({name:"tour",container:"body",keyboard:!0,storage:b.localStorage,debug:!1,backdrop:!1,redirect:!0,orphan:!1,duration:!1,basePath:"",template:"<div class='popover'>          <div class='arrow'></div>          <h3 class='popover-title'></h3>          <div class='popover-content'></div>          <div class='popover-navigation'>            <div class='btn-group'>              <button class='btn btn-sm btn-default' data-role='prev'>&laquo; Prev</button>              <button class='btn btn-sm btn-default' data-role='next'>Next &raquo;</button>              <button class='btn btn-sm btn-default' data-role='pause-resume'                data-pause-text='Pause'                data-resume-text='Resume'              >Pause</button>            </div>            <button class='btn btn-sm btn-default' data-role='end'>End tour</button>          </div>        </div>",afterSetState:function(){},afterGetState:function(){},afterRemoveState:function(){},onStart:function(){},onEnd:function(){},onShow:function(){},onShown:function(){},onHide:function(){},onHidden:function(){},onNext:function(){},onPrev:function(){},onPause:function(){},onResume:function(){}},c),this._force=!1,this._inited=!1,this._steps=[],this.backdrop={overlay:null,$element:null,$background:null,backgroundShown:!1,overlayElementShown:!1}}return c.prototype.setState=function(a,b){var c,d;if(this._options.storage){d=""+this._options.name+"_"+a;try{this._options.storage.setItem(d,b)}catch(e){c=e,c.code===DOMException.QUOTA_EXCEEDED_ERR&&this.debug("LocalStorage quota exceeded. setState failed.")}return this._options.afterSetState(d,b)}return null==this._state&&(this._state={}),this._state[a]=b},c.prototype.removeState=function(a){var b;return this._options.storage?(b=""+this._options.name+"_"+a,this._options.storage.removeItem(b),this._options.afterRemoveState(b)):null!=this._state?delete this._state[a]:void 0},c.prototype.getState=function(a){var b,c;return this._options.storage?(b=""+this._options.name+"_"+a,c=this._options.storage.getItem(b)):null!=this._state&&(c=this._state[a]),(void 0===c||"null"===c)&&(c=null),this._options.afterGetState(a,c),c},c.prototype.addSteps=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this.addStep(b));return e},c.prototype.addStep=function(a){return this._steps.push(a)},c.prototype.getStep=function(b){return null!=this._steps[b]?a.extend({id:"step-"+b,path:"",placement:"right",title:"",content:"<p></p>",next:b===this._steps.length-1?-1:b+1,prev:b-1,animation:!0,container:this._options.container,backdrop:this._options.backdrop,redirect:this._options.redirect,orphan:this._options.orphan,duration:this._options.duration,template:this._options.template,onShow:this._options.onShow,onShown:this._options.onShown,onHide:this._options.onHide,onHidden:this._options.onHidden,onNext:this._options.onNext,onPrev:this._options.onPrev,onPause:this._options.onPause,onResume:this._options.onResume},this._steps[b]):void 0},c.prototype.init=function(a){var b=this;return this._force=a,this.ended()?this._debug("Tour ended, init prevented."):(this.setCurrentStep(),this._setupMouseNavigation(),this._setupKeyboardNavigation(),this._onResize(function(){return b.showStep(b._current)}),null!==this._current&&this.showStep(this._current),this._inited=!0,this)},c.prototype.start=function(a){var b;return null==a&&(a=!1),this._inited||this.init(a),null===this._current?(b=this._makePromise(null!=this._options.onStart?this._options.onStart(this):void 0),this._callOnPromiseDone(b,this.showStep,0)):void 0},c.prototype.next=function(){var a;return this.ended()?this._debug("Tour ended, next prevented."):(a=this.hideStep(this._current),this._callOnPromiseDone(a,this._showNextStep))},c.prototype.prev=function(){var a;return this.ended()?this._debug("Tour ended, prev prevented."):(a=this.hideStep(this._current),this._callOnPromiseDone(a,this._showPrevStep))},c.prototype.goTo=function(a){var b;return this.ended()?this._debug("Tour ended, goTo prevented."):(b=this.hideStep(this._current),this._callOnPromiseDone(b,this.showStep,a))},c.prototype.end=function(){var c,e,f=this;return c=function(){return a(d).off("click.tour-"+f._options.name),a(d).off("keyup.tour-"+f._options.name),a(b).off("resize.tour-"+f._options.name),f.setState("end","yes"),f._inited=!1,f._force=!1,f._clearTimer(),null!=f._options.onEnd?f._options.onEnd(f):void 0},e=this.hideStep(this._current),this._callOnPromiseDone(e,c)},c.prototype.ended=function(){return!this._force&&!!this.getState("end")},c.prototype.restart=function(){return this.removeState("current_step"),this.removeState("end"),this.setCurrentStep(0),this.start()},c.prototype.pause=function(){var a;return a=this.getStep(this._current),a&&a.duration?(this._paused=!0,this._duration-=(new Date).getTime()-this._start,b.clearTimeout(this._timer),this._debug("Paused/Stopped step "+(this._current+1)+" timer ("+this._duration+" remaining)."),null!=a.onPause?a.onPause(this,this._duration):void 0):void 0},c.prototype.resume=function(){var a,c=this;return a=this.getStep(this._current),a&&a.duration?(this._paused=!1,this._start=(new Date).getTime(),this._duration=this._duration||a.duration,this._timer=b.setTimeout(function(){return c._isLast()?c.next():c.end()},this._duration),this._debug("Started step "+(this._current+1)+" timer with duration "+this._duration),null!=a.onResume&&this._duration!==a.duration?a.onResume(this,this._duration):void 0):void 0},c.prototype.hideStep=function(b){var c,d,e,f=this;return(e=this.getStep(b))?(this._clearTimer(),d=this._makePromise(null!=e.onHide?e.onHide(this,b):void 0),c=function(){var b;return b=a(e.element),b.data("bs.popover")||b.data("popover")||(b=a("body")),b.popover("destroy"),e.reflex&&b.css("cursor","").off("click.tour-"+f._options.name),e.backdrop&&f._hideBackdrop(),null!=e.onHidden?e.onHidden(f):void 0},this._callOnPromiseDone(d,c),d):void 0},c.prototype.showStep=function(b){var c,e,f,g,h=this;return(g=this.getStep(b))?(f=b<this._current,c=this._makePromise(null!=g.onShow?g.onShow(this,b):void 0),e=function(){var c,e;if(h.setCurrentStep(b),e=a.isFunction(g.path)?g.path.call():h._options.basePath+g.path,c=[d.location.pathname,d.location.hash].join(""),h._isRedirect(e,c))return h._redirect(g,e),void 0;if(h._isOrphan(g)){if(!g.orphan)return h._debug("Skip the orphan step "+(h._current+1)+". Orphan option is false and the element doesn't exist or is hidden."),f?h._showPrevStep():h._showNextStep(),void 0;h._debug("Show the orphan step "+(h._current+1)+". Orphans option is true.")}return g.backdrop&&h._showBackdrop(h._isOrphan(g)?void 0:g.element),h._scrollIntoView(g.element,function(){return null!=g.element&&g.backdrop&&h._showOverlayElement(g.element),h._showPopover(g,b),null!=g.onShown&&g.onShown(h),h._debug("Step "+(h._current+1)+" of "+h._steps.length)}),g.duration?h.resume():void 0},this._callOnPromiseDone(c,e),c):void 0},c.prototype.setCurrentStep=function(a){return null!=a?(this._current=a,this.setState("current_step",a)):(this._current=this.getState("current_step"),this._current=null===this._current?null:parseInt(this._current,10)),this},c.prototype._showNextStep=function(){var a,b,c,d=this;return c=this.getStep(this._current),b=function(){return d.showStep(c.next)},a=this._makePromise(null!=c.onNext?c.onNext(this):void 0),this._callOnPromiseDone(a,b)},c.prototype._showPrevStep=function(){var a,b,c,d=this;return c=this.getStep(this._current),b=function(){return d.showStep(c.prev)},a=this._makePromise(null!=c.onPrev?c.onPrev(this):void 0),this._callOnPromiseDone(a,b)},c.prototype._debug=function(a){return this._options.debug?b.console.log("Bootstrap Tour '"+this._options.name+"' | "+a):void 0},c.prototype._isRedirect=function(a,b){return null!=a&&""!==a&&a.replace(/\?.*$/,"").replace(/\/?$/,"")!==b.replace(/\/?$/,"")},c.prototype._redirect=function(b,c){return a.isFunction(b.redirect)?b.redirect.call(this,c):b.redirect===!0?(this._debug("Redirect to "+c),d.location.href=c):void 0},c.prototype._isOrphan=function(b){return null==b.element||!a(b.element).length||a(b.element).is(":hidden")&&"http://www.w3.org/2000/svg"!==a(b.element)[0].namespaceURI},c.prototype._isLast=function(){return this._current<this._steps.length-1},c.prototype._showPopover=function(b,c){var d,e,f,g,h,i,j=this;return i=a.extend({},this._options),f=a.isFunction(b.template)?a(b.template(c,b)):a(b.template),e=f.find(".popover-navigation"),h=this._isOrphan(b),h&&(b.element="body",b.placement="top",f=f.addClass("orphan")),d=a(b.element),f.addClass("tour-"+this._options.name),b.options&&a.extend(i,b.options),b.reflex&&d.css("cursor","pointer").on("click.tour-"+this._options.name,function(){return j._isLast()?j.next():j.end()}),b.prev<0&&e.find("*[data-role=prev]").addClass("disabled"),b.next<0&&e.find("*[data-role=next]").addClass("disabled"),b.duration||e.find("*[data-role='pause-resume']").remove(),b.template=f.clone().wrap("<div>").parent().html(),d.popover({placement:b.placement,trigger:"manual",title:b.title,content:b.content,html:!0,animation:b.animation,container:b.container,template:b.template,selector:b.element}).popover("show"),g=d.data("bs.popover")?d.data("bs.popover").tip():d.data("popover").tip(),g.attr("id",b.id),this._reposition(g,b),h?this._center(g):void 0},c.prototype._reposition=function(b,c){var e,f,g,h,i,j,k;if(h=b[0].offsetWidth,f=b[0].offsetHeight,k=b.offset(),i=k.left,j=k.top,e=a(d).outerHeight()-k.top-b.outerHeight(),0>e&&(k.top=k.top+e),g=a("html").outerWidth()-k.left-b.outerWidth(),0>g&&(k.left=k.left+g),k.top<0&&(k.top=0),k.left<0&&(k.left=0),b.offset(k),"bottom"===c.placement||"top"===c.placement){if(i!==k.left)return this._replaceArrow(b,2*(k.left-i),h,"left")}else if(j!==k.top)return this._replaceArrow(b,2*(k.top-j),f,"top")},c.prototype._center=function(c){return c.css("top",a(b).outerHeight()/2-c.outerHeight()/2)},c.prototype._replaceArrow=function(a,b,c,d){return a.find(".arrow").css(d,b?50*(1-b/c)+"%":"")},c.prototype._scrollIntoView=function(c,d){var e,f,g,h,i,j=this;return c?(e=a(c),f=a(b),g=e.offset().top,i=f.height(),h=Math.max(0,g-i/2),this._debug("Scroll into view. ScrollTop: "+h+". Element offset: "+g+". Window height: "+i+"."),a("body").stop().animate({scrollTop:Math.ceil(h)},function(){return d(),j._debug("Scroll into view. Animation end element offset: "+e.offset().top+". Window height: "+f.height()+".")})):d()},c.prototype._onResize=function(c,d){return a(b).on("resize.tour-"+this._options.name,function(){return clearTimeout(d),d=setTimeout(c,100)})},c.prototype._setupMouseNavigation=function(){var b=this;return b=this,a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=next]:not(.disabled)").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=next]:not(.disabled)",function(a){return a.preventDefault(),b.next()}),a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=prev]:not(.disabled)").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=prev]:not(.disabled)",function(a){return a.preventDefault(),b.prev()}),a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=end]").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=end]",function(a){return a.preventDefault(),b.end()}),a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=pause-resume]").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=pause-resume]",function(c){var d;return c.preventDefault(),d=a(this),d.text(b._paused?d.data("pause-text"):d.data("resume-text")),b._paused?b.resume():b.pause()})},c.prototype._setupKeyboardNavigation=function(){var b=this;if(this._options.keyboard)return a(d).on("keyup.tour-"+this._options.name,function(a){if(a.which)switch(a.which){case 39:return a.preventDefault(),b._isLast()?b.next():b.end();case 37:if(a.preventDefault(),b._current>0)return b.prev();break;case 27:return a.preventDefault(),b.end()}})},c.prototype._makePromise=function(b){return b&&a.isFunction(b.then)?b:null},c.prototype._callOnPromiseDone=function(a,b,c){var d=this;return a?a.then(function(){return b.call(d,c)}):b.call(this,c)},c.prototype._showBackdrop=function(){return this.backdrop.backgroundShown?void 0:(this.backdrop=a("<div/>",{"class":"tour-backdrop"}),this.backdrop.backgroundShown=!0,a("body").append(this.backdrop))},c.prototype._hideBackdrop=function(){return this._hideOverlayElement(),this._hideBackground()},c.prototype._hideBackground=function(){return this.backdrop.remove(),this.backdrop.overlay=null,this.backdrop.backgroundShown=!1},c.prototype._showOverlayElement=function(b){var c,d,e;if(!this.backdrop.overlayElementShown)return this.backdrop.overlayElementShown=!0,d=a(b),c=a("<div/>"),e=d.offset(),e.top=e.top,e.left=e.left,c.width(d.innerWidth()).height(d.innerHeight()).addClass("tour-step-background").offset(e),d.addClass("tour-step-backdrop"),a("body").append(c),this.backdrop.$element=d,this.backdrop.$background=c},c.prototype._hideOverlayElement=function(){return this.backdrop.overlayElementShown?(this.backdrop.$element.removeClass("tour-step-backdrop"),this.backdrop.$background.remove(),this.backdrop.$element=null,this.backdrop.$background=null,this.backdrop.overlayElementShown=!1):void 0},c.prototype._clearTimer=function(){return b.clearTimeout(this._timer),this._timer=null,this._duration=null},c}(),b.Tour=c}(jQuery,window);
/*!
 * accounting.js v0.3.2, copyright 2011 Joss Crowcroft, MIT license, http://josscrowcroft.github.com/accounting.js
 */
(function(p,z){function q(a){return!!(""===a||a&&a.charCodeAt&&a.substr)}function m(a){return u?u(a):"[object Array]"===v.call(a)}function r(a){return"[object Object]"===v.call(a)}function s(a,b){var d,a=a||{},b=b||{};for(d in b)b.hasOwnProperty(d)&&null==a[d]&&(a[d]=b[d]);return a}function j(a,b,d){var c=[],e,h;if(!a)return c;if(w&&a.map===w)return a.map(b,d);for(e=0,h=a.length;e<h;e++)c[e]=b.call(d,a[e],e,a);return c}function n(a,b){a=Math.round(Math.abs(a));return isNaN(a)?b:a}function x(a){var b=c.settings.currency.format;"function"===typeof a&&(a=a());return q(a)&&a.match("%v")?{pos:a,neg:a.replace("-","").replace("%v","-%v"),zero:a}:!a||!a.pos||!a.pos.match("%v")?!q(b)?b:c.settings.currency.format={pos:b,neg:b.replace("%v","-%v"),zero:b}:a}var c={version:"0.3.2",settings:{currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}}},w=Array.prototype.map,u=Array.isArray,v=Object.prototype.toString,o=c.unformat=c.parse=function(a,b){if(m(a))return j(a,function(a){return o(a,b)});a=a||0;if("number"===typeof a)return a;var b=b||".",c=RegExp("[^0-9-"+b+"]",["g"]),c=parseFloat((""+a).replace(/\((.*)\)/,"-$1").replace(c,"").replace(b,"."));return!isNaN(c)?c:0},y=c.toFixed=function(a,b){var b=n(b,c.settings.number.precision),d=Math.pow(10,b);return(Math.round(c.unformat(a)*d)/d).toFixed(b)},t=c.formatNumber=function(a,b,d,i){if(m(a))return j(a,function(a){return t(a,b,d,i)});var a=o(a),e=s(r(b)?b:{precision:b,thousand:d,decimal:i},c.settings.number),h=n(e.precision),f=0>a?"-":"",g=parseInt(y(Math.abs(a||0),h),10)+"",l=3<g.length?g.length%3:0;return f+(l?g.substr(0,l)+e.thousand:"")+g.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+e.thousand)+(h?e.decimal+y(Math.abs(a),h).split(".")[1]:"")},A=c.formatMoney=function(a,b,d,i,e,h){if(m(a))return j(a,function(a){return A(a,b,d,i,e,h)});var a=o(a),f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format);return(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal))};c.formatColumn=function(a,b,d,i,e,h){if(!a)return[];var f=s(r(b)?b:{symbol:b,precision:d,thousand:i,decimal:e,format:h},c.settings.currency),g=x(f.format),l=g.pos.indexOf("%s")<g.pos.indexOf("%v")?!0:!1,k=0,a=j(a,function(a){if(m(a))return c.formatColumn(a,f);a=o(a);a=(0<a?g.pos:0>a?g.neg:g.zero).replace("%s",f.symbol).replace("%v",t(Math.abs(a),n(f.precision),f.thousand,f.decimal));if(a.length>k)k=a.length;return a});return j(a,function(a){return q(a)&&a.length<k?l?a.replace(f.symbol,f.symbol+Array(k-a.length+1).join(" ")):Array(k-a.length+1).join(" ")+a:a})};if("undefined"!==typeof exports){if("undefined"!==typeof module&&module.exports)exports=module.exports=c;exports.accounting=c}else"function"===typeof define&&define.amd?define([],function(){return c}):(c.noConflict=function(a){return function(){p.accounting=a;c.noConflict=z;return c}}(p.accounting),p.accounting=c)})(this);
/*
 Highcharts JS v3.0.4 (2013-08-02)

 (c) 2009-2013 Torstein Hønsi

 License: www.highcharts.com/license
*/
(function(){function r(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a}function x(){var a,b=arguments.length,c={},d=function(a,b){var c,h;typeof a!=="object"&&(a={});for(h in b)b.hasOwnProperty(h)&&(c=b[h],a[h]=c&&typeof c==="object"&&Object.prototype.toString.call(c)!=="[object Array]"&&typeof c.nodeType!=="number"?d(a[h]||{},c):b[h]);return a};for(a=0;a<b;a++)c=d(c,arguments[a]);return c}function A(a,b){return parseInt(a,b||10)}function da(a){return typeof a==="string"}function U(a){return typeof a===
"object"}function Ha(a){return Object.prototype.toString.call(a)==="[object Array]"}function pa(a){return typeof a==="number"}function ma(a){return N.log(a)/N.LN10}function ea(a){return N.pow(10,a)}function fa(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function t(a){return a!==v&&a!==null}function w(a,b,c){var d,e;if(da(b))t(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(t(b)&&U(b))for(d in b)a.setAttribute(d,b[d]);return e}function ha(a){return Ha(a)?
a:[a]}function p(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],typeof c!=="undefined"&&c!==null)return c}function M(a,b){if(qa&&b&&b.opacity!==v)b.filter="alpha(opacity="+b.opacity*100+")";r(a.style,b)}function T(a,b,c,d,e){a=z.createElement(a);b&&r(a,b);e&&M(a,{padding:0,border:R,margin:0});c&&M(a,c);d&&d.appendChild(a);return a}function ga(a,b){var c=function(){};c.prototype=new a;r(c.prototype,b);return c}function ya(a,b,c,d){var e=O.lang,a=+a||0,f=b===-1?(a.toString().split(".")[1]||
"").length:isNaN(b=P(b))?2:b,b=c===void 0?e.decimalPoint:c,d=d===void 0?e.thousandsSep:d,e=a<0?"-":"",c=String(A(a=P(a).toFixed(f))),g=c.length>3?c.length%3:0;return e+(g?c.substr(0,g)+d:"")+c.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+d)+(f?b+P(a-c).toFixed(f).slice(2):"")}function za(a,b){return Array((b||2)+1-String(a).length).join(0)+a}function Bb(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);return c.apply(this,a)}}function Aa(a,b){for(var c="{",d=!1,
e,f,g,h,i,j=[];(c=a.indexOf(c))!==-1;){e=a.slice(0,c);if(d){f=e.split(":");g=f.shift().split(".");i=g.length;e=b;for(h=0;h<i;h++)e=e[g[h]];if(f.length)f=f.join(":"),g=/\.([0-9])/,h=O.lang,i=void 0,/f$/.test(f)?(i=(i=f.match(g))?i[1]:-1,e=ya(e,i,h.decimalPoint,f.indexOf(",")>-1?h.thousandsSep:"")):e=Xa(f,e)}j.push(e);a=a.slice(c+1);c=(d=!d)?"}":"{"}j.push(a);return j.join("")}function lb(a){return N.pow(10,S(N.log(a)/N.LN10))}function mb(a,b,c,d){var e,c=p(c,1);e=a/c;b||(b=[1,2,2.5,5,10],d&&d.allowDecimals===
!1&&(c===1?b=[1,2,5,10]:c<=0.1&&(b=[1/c])));for(d=0;d<b.length;d++)if(a=b[d],e<=(b[d]+(b[d+1]||b[d]))/2)break;a*=c;return a}function Cb(a,b){var c=b||[[Db,[1,2,5,10,20,25,50,100,200,500]],[nb,[1,2,5,10,15,30]],[Ya,[1,2,5,10,15,30]],[Qa,[1,2,3,4,6,8,12]],[ra,[1,2]],[Za,[1,2]],[Ra,[1,2,3,4,6]],[sa,null]],d=c[c.length-1],e=y[d[0]],f=d[1],g;for(g=0;g<c.length;g++)if(d=c[g],e=y[d[0]],f=d[1],c[g+1]&&a<=(e*f[f.length-1]+y[c[g+1][0]])/2)break;e===y[sa]&&a<5*e&&(f=[1,2,5]);e===y[sa]&&a<5*e&&(f=[1,2,5]);c=
mb(a/e,f,d[0]===sa?lb(a/e):1);return{unitRange:e,count:c,unitName:d[0]}}function Eb(a,b,c,d){var e=[],f={},g=O.global.useUTC,h,i=new Date(b),j=a.unitRange,k=a.count;if(t(b)){j>=y[nb]&&(i.setMilliseconds(0),i.setSeconds(j>=y[Ya]?0:k*S(i.getSeconds()/k)));if(j>=y[Ya])i[Fb](j>=y[Qa]?0:k*S(i[ob]()/k));if(j>=y[Qa])i[Gb](j>=y[ra]?0:k*S(i[pb]()/k));if(j>=y[ra])i[qb](j>=y[Ra]?1:k*S(i[Sa]()/k));j>=y[Ra]&&(i[Hb](j>=y[sa]?0:k*S(i[$a]()/k)),h=i[ab]());j>=y[sa]&&(h-=h%k,i[Ib](h));if(j===y[Za])i[qb](i[Sa]()-i[rb]()+
p(d,1));b=1;h=i[ab]();for(var d=i.getTime(),l=i[$a](),m=i[Sa](),o=g?0:(864E5+i.getTimezoneOffset()*6E4)%864E5;d<c;)e.push(d),j===y[sa]?d=bb(h+b*k,0):j===y[Ra]?d=bb(h,l+b*k):!g&&(j===y[ra]||j===y[Za])?d=bb(h,l,m+b*k*(j===y[ra]?1:7)):d+=j*k,b++;e.push(d);n(sb(e,function(a){return j<=y[Qa]&&a%y[ra]===o}),function(a){f[a]=ra})}e.info=r(a,{higherRanks:f,totalRange:j*k});return e}function Jb(){this.symbol=this.color=0}function Kb(a,b){var c=a.length,d,e;for(e=0;e<c;e++)a[e].ss_i=e;a.sort(function(a,c){d=
b(a,c);return d===0?a.ss_i-c.ss_i:d});for(e=0;e<c;e++)delete a[e].ss_i}function Ia(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function ta(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);return c}function Ja(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function Ta(a){cb||(cb=T(Ba));a&&cb.appendChild(a);cb.innerHTML=""}function ua(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw c;else E.console&&console.log(c)}function ia(a){return parseFloat(a.toPrecision(14))}
function Ka(a,b){Ca=p(a,b.animation)}function Lb(){var a=O.global.useUTC,b=a?"getUTC":"get",c=a?"setUTC":"set";bb=a?Date.UTC:function(a,b,c,g,h,i){return(new Date(a,b,p(c,1),p(g,0),p(h,0),p(i,0))).getTime()};ob=b+"Minutes";pb=b+"Hours";rb=b+"Day";Sa=b+"Date";$a=b+"Month";ab=b+"FullYear";Fb=c+"Minutes";Gb=c+"Hours";qb=c+"Date";Hb=c+"Month";Ib=c+"FullYear"}function va(){}function La(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;!c&&!d&&this.addLabel()}function tb(a,b){this.axis=a;if(b)this.options=
b,this.id=b.id}function Mb(a,b,c,d,e,f){var g=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.total=0;this.points={};this.stack=e;this.percent=f==="percent";this.alignOptions={align:b.align||(g?c?"left":"right":"center"),verticalAlign:b.verticalAlign||(g?"middle":c?"bottom":"top"),y:p(b.y,g?4:c?14:-6),x:p(b.x,g?c?-6:6:0)};this.textAlign=b.textAlign||(g?c?"right":"left":"center")}function db(){this.init.apply(this,arguments)}function ub(){this.init.apply(this,arguments)}
function vb(a,b){this.init(a,b)}function wb(a,b){this.init(a,b)}function xb(){this.init.apply(this,arguments)}var v,z=document,E=window,N=Math,s=N.round,S=N.floor,ja=N.ceil,u=N.max,I=N.min,P=N.abs,V=N.cos,ba=N.sin,Ma=N.PI,Ua=Ma*2/360,Da=navigator.userAgent,Nb=E.opera,qa=/msie/i.test(Da)&&!Nb,eb=z.documentMode===8,fb=/AppleWebKit/.test(Da),gb=/Firefox/.test(Da),Ob=/(Mobile|Android|Windows Phone)/.test(Da),wa="http://www.w3.org/2000/svg",Y=!!z.createElementNS&&!!z.createElementNS(wa,"svg").createSVGRect,
Vb=gb&&parseInt(Da.split("Firefox/")[1],10)<4,Z=!Y&&!qa&&!!z.createElement("canvas").getContext,Va,hb=z.documentElement.ontouchstart!==v,Pb={},yb=0,cb,O,Xa,Ca,zb,y,xa=function(){},Ea=[],Ba="div",R="none",Qb="rgba(192,192,192,"+(Y?1.0E-4:0.002)+")",Db="millisecond",nb="second",Ya="minute",Qa="hour",ra="day",Za="week",Ra="month",sa="year",Rb="stroke-width",bb,ob,pb,rb,Sa,$a,ab,Fb,Gb,qb,Hb,Ib,$={};E.Highcharts=E.Highcharts?ua(16,!0):{};Xa=function(a,b,c){if(!t(b)||isNaN(b))return"Invalid date";var a=
p(a,"%Y-%m-%d %H:%M:%S"),d=new Date(b),e,f=d[pb](),g=d[rb](),h=d[Sa](),i=d[$a](),j=d[ab](),k=O.lang,l=k.weekdays,d=r({a:l[g].substr(0,3),A:l[g],d:za(h),e:h,b:k.shortMonths[i],B:k.months[i],m:za(i+1),y:j.toString().substr(2,2),Y:j,H:za(f),I:za(f%12||12),l:f%12||12,M:za(d[ob]()),p:f<12?"AM":"PM",P:f<12?"am":"pm",S:za(d.getSeconds()),L:za(s(b%1E3),3)},Highcharts.dateFormats);for(e in d)for(;a.indexOf("%"+e)!==-1;)a=a.replace("%"+e,typeof d[e]==="function"?d[e](b):d[e]);return c?a.substr(0,1).toUpperCase()+
a.substr(1):a};Jb.prototype={wrapColor:function(a){if(this.color>=a)this.color=0},wrapSymbol:function(a){if(this.symbol>=a)this.symbol=0}};y=function(){for(var a=0,b=arguments,c=b.length,d={};a<c;a++)d[b[a++]]=b[a];return d}(Db,1,nb,1E3,Ya,6E4,Qa,36E5,ra,864E5,Za,6048E5,Ra,26784E5,sa,31556952E3);zb={init:function(a,b,c){var b=b||"",d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g,b=b.split(" "),c=[].concat(c),h,i,j=function(a){for(g=a.length;g--;)a[g]==="M"&&a.splice(g+1,0,a[g+1],a[g+2],a[g+1],a[g+2])};e&&
(j(b),j(c));a.isArea&&(h=b.splice(b.length-6,6),i=c.splice(c.length-6,6));if(d<=c.length/f)for(;d--;)c=[].concat(c).splice(0,f).concat(c);a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=[].concat(b).splice(b.length-f,f),e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),b=b.concat(d);h&&(b=b.concat(h),c=c.concat(i));return[b,c]},step:function(a,b,c,d){var e=[],f=a.length;if(c===1)e=d;else if(f===b.length&&c<1)for(;f--;)d=parseFloat(a[f]),e[f]=isNaN(d)?a[f]:c*parseFloat(b[f]-d)+d;else e=b;return e}};(function(a){E.HighchartsAdapter=
E.HighchartsAdapter||a&&{init:function(b){var c=a.fx,d=c.step,e,f=a.Tween,g=f&&f.propHooks;e=a.cssHooks.opacity;a.extend(a.easing,{easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c}});a.each(["cur","_default","width","height","opacity"],function(a,b){var e=d,k,l;b==="cur"?e=c.prototype:b==="_default"&&f&&(e=g[b],b="set");(k=e[b])&&(e[b]=function(c){c=a?c:this;l=c.elem;return l.attr?l.attr(c.prop,b==="cur"?v:c.now):k.apply(this,arguments)})});Bb(e,"get",function(a,b,c){return b.attr?b.opacity||
0:a.call(this,b,c)});e=function(a){var c=a.elem,d;if(!a.started)d=b.init(c,c.d,c.toD),a.start=d[0],a.end=d[1],a.started=!0;c.attr("d",b.step(a.start,a.end,a.pos,c.toD))};f?g.d={set:e}:d.d=e;this.each=Array.prototype.forEach?function(a,b){return Array.prototype.forEach.call(a,b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(b.call(a[c],a[c],c,a)===!1)return c};a.fn.highcharts=function(){var a="Chart",b=arguments,c,d;da(b[0])&&(a=b[0],b=Array.prototype.slice.call(b,1));c=b[0];if(c!==v)c.chart=c.chart||
{},c.chart.renderTo=this[0],new Highcharts[a](c,b[1]),d=this;c===v&&(d=Ea[w(this[0],"data-highcharts-chart")]);return d}},getScript:a.getScript,inArray:a.inArray,adapterRun:function(b,c){return a(b)[c]()},grep:a.grep,map:function(a,c){for(var d=[],e=0,f=a.length;e<f;e++)d[e]=c.call(a[e],a[e],e,a);return d},offset:function(b){return a(b).offset()},addEvent:function(b,c,d){a(b).bind(c,d)},removeEvent:function(b,c,d){var e=z.removeEventListener?"removeEventListener":"detachEvent";z[e]&&b&&!b[e]&&(b[e]=
function(){});a(b).unbind(c,d)},fireEvent:function(b,c,d,e){var f=a.Event(c),g="detached"+c,h;!qa&&d&&(delete d.layerX,delete d.layerY);r(f,d);b[c]&&(b[g]=b[c],b[c]=null);a.each(["preventDefault","stopPropagation"],function(a,b){var c=f[b];f[b]=function(){try{c.call(f)}catch(a){b==="preventDefault"&&(h=!0)}}});a(b).trigger(f);b[g]&&(b[c]=b[g],b[g]=null);e&&!f.isDefaultPrevented()&&!h&&e(f)},washMouseEvent:function(a){var c=a.originalEvent||a;if(c.pageX===v)c.pageX=a.pageX,c.pageY=a.pageY;return c},
animate:function(b,c,d){var e=a(b);if(!b.style)b.style={};if(c.d)b.toD=c.d,c.d=1;e.stop();e.animate(c,d)},stop:function(b){a(b).stop()}}})(E.jQuery);var W=E.HighchartsAdapter,L=W||{};W&&W.init.call(W,zb);var ib=L.adapterRun,Wb=L.getScript,na=L.inArray,n=L.each,sb=L.grep,Xb=L.offset,Na=L.map,J=L.addEvent,aa=L.removeEvent,C=L.fireEvent,Sb=L.washMouseEvent,Ab=L.animate,Wa=L.stop,L={enabled:!0,x:0,y:15,style:{color:"#666",cursor:"default",fontSize:"11px",lineHeight:"14px"}};O={colors:"#2f7ed8,#0d233a,#8bbc21,#910000,#1aadce,#492970,#f28f43,#77a1e5,#c42525,#a6c96a".split(","),
symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),decimalPoint:".",numericSymbols:"k,M,G,T,P,E".split(","),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:!0,
canvasToolsURL:"http://code.highcharts.com/3.0.4/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/3.0.4/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:5,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacingTop:10,spacingRight:10,spacingBottom:15,spacingLeft:10,style:{fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',fontSize:"12px"},backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},
position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#274b6d",fontSize:"16px"}},subtitle:{text:"",align:"center",style:{color:"#4d759e"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,marker:{enabled:!0,lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0},select:{fillColor:"#FFFFFF",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:x(L,{align:"center",enabled:!1,formatter:function(){return this.y===
null?"":ya(this.y,-1)},verticalAlign:"bottom",y:0}),cropThreshold:300,pointRange:0,showInLegend:!0,states:{hover:{marker:{}},select:{marker:{}}},stickyTracking:!0}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderWidth:1,borderColor:"#909090",borderRadius:5,navigation:{activeColor:"#274b6d",inactiveColor:"#CCC"},shadow:!1,itemStyle:{cursor:"pointer",color:"#274b6d",fontSize:"12px"},itemHoverStyle:{color:"#000"},
itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolWidth:16,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"1em"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:Y,backgroundColor:"rgba(255, 255, 255, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',shadow:!0,snap:Ob?25:10,style:{color:"#333333",cursor:"default",fontSize:"12px",padding:"8px",whiteSpace:"nowrap"}},credits:{enabled:!0,text:"Highcharts.com",href:"http://www.highcharts.com",
position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};var X=O.plotOptions,W=X.line;Lb();var oa=function(a){var b=[],c,d;(function(a){a&&a.stops?d=Na(a.stops,function(a){return oa(a[1])}):(c=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a))?b=[A(c[1]),A(c[2]),A(c[3]),parseFloat(c[4],10)]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))?b=[A(c[1],16),A(c[2],16),A(c[3],
16),1]:(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))&&(b=[A(c[1]),A(c[2]),A(c[3]),1])})(a);return{get:function(c){var f;d?(f=x(a),f.stops=[].concat(f.stops),n(d,function(a,b){f.stops[b]=[f.stops[b][0],a.get(c)]})):f=b&&!isNaN(b[0])?c==="rgb"?"rgb("+b[0]+","+b[1]+","+b[2]+")":c==="a"?b[3]:"rgba("+b.join(",")+")":a;return f},brighten:function(a){if(d)n(d,function(b){b.brighten(a)});else if(pa(a)&&a!==0){var c;for(c=0;c<3;c++)b[c]+=A(a*255),b[c]<0&&(b[c]=0),b[c]>255&&
(b[c]=255)}return this},rgba:b,setOpacity:function(a){b[3]=a;return this}}};va.prototype={init:function(a,b){this.element=b==="span"?T(b):z.createElementNS(wa,b);this.renderer=a;this.attrSetters={}},opacity:1,animate:function(a,b,c){b=p(b,Ca,!0);Wa(this);if(b){b=x(b);if(c)b.complete=c;Ab(this,a,b)}else this.attr(a),c&&c()},attr:function(a,b){var c,d,e,f,g=this.element,h=g.nodeName.toLowerCase(),i=this.renderer,j,k=this.attrSetters,l=this.shadows,m,o,q=this;da(a)&&t(b)&&(c=a,a={},a[c]=b);if(da(a))c=
a,h==="circle"?c={x:"cx",y:"cy"}[c]||c:c==="strokeWidth"&&(c="stroke-width"),q=w(g,c)||this[c]||0,c!=="d"&&c!=="visibility"&&(q=parseFloat(q));else{for(c in a)if(j=!1,d=a[c],e=k[c]&&k[c].call(this,d,c),e!==!1){e!==v&&(d=e);if(c==="d")d&&d.join&&(d=d.join(" ")),/(NaN| {2}|^$)/.test(d)&&(d="M 0 0");else if(c==="x"&&h==="text")for(e=0;e<g.childNodes.length;e++)f=g.childNodes[e],w(f,"x")===w(g,"x")&&w(f,"x",d);else if(this.rotation&&(c==="x"||c==="y"))o=!0;else if(c==="fill")d=i.color(d,g,c);else if(h===
"circle"&&(c==="x"||c==="y"))c={x:"cx",y:"cy"}[c]||c;else if(h==="rect"&&c==="r")w(g,{rx:d,ry:d}),j=!0;else if(c==="translateX"||c==="translateY"||c==="rotation"||c==="verticalAlign"||c==="scaleX"||c==="scaleY")j=o=!0;else if(c==="stroke")d=i.color(d,g,c);else if(c==="dashstyle")if(c="stroke-dasharray",d=d&&d.toLowerCase(),d==="solid")d=R;else{if(d){d=d.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash",
"8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(e=d.length;e--;)d[e]=A(d[e])*p(a["stroke-width"],this["stroke-width"]);d=d.join(",")}}else if(c==="width")d=A(d);else if(c==="align")c="text-anchor",d={left:"start",center:"middle",right:"end"}[d];else if(c==="title")e=g.getElementsByTagName("title")[0],e||(e=z.createElementNS(wa,"title"),g.appendChild(e)),e.textContent=d;c==="strokeWidth"&&(c="stroke-width");if(c==="stroke-width"||c==="stroke"){this[c]=d;if(this.stroke&&
this["stroke-width"])w(g,"stroke",this.stroke),w(g,"stroke-width",this["stroke-width"]),this.hasStroke=!0;else if(c==="stroke-width"&&d===0&&this.hasStroke)g.removeAttribute("stroke"),this.hasStroke=!1;j=!0}this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c)&&(m||(this.symbolAttr(a),m=!0),j=!0);if(l&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c))for(e=l.length;e--;)w(l[e],c,c==="height"?u(d-(l[e].cutHeight||0),0):d);if((c==="width"||c==="height")&&h===
"rect"&&d<0)d=0;this[c]=d;c==="text"?(d!==this.textStr&&delete this.bBox,this.textStr=d,this.added&&i.buildText(this)):j||w(g,c,d)}o&&this.updateTransform()}return q},addClass:function(a){var b=this.element,c=w(b,"class")||"";c.indexOf(a)===-1&&w(b,"class",c+" "+a);return this},symbolAttr:function(a){var b=this;n("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(c){b[c]=p(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",
a?"url("+this.renderer.url+"#"+a.id+")":R)},crisp:function(a,b,c,d,e){var f,g={},h={},i,a=a||this.strokeWidth||this.attr&&this.attr("stroke-width")||0;i=s(a)%2/2;h.x=S(b||this.x||0)+i;h.y=S(c||this.y||0)+i;h.width=S((d||this.width||0)-2*i);h.height=S((e||this.height||0)-2*i);h.strokeWidth=a;for(f in h)this[f]!==h[f]&&(this[f]=g[f]=h[f]);return g},css:function(a){var b=this.element,c=a&&a.width&&b.nodeName.toLowerCase()==="text",d,e="",f=function(a,b){return"-"+b.toLowerCase()};if(a&&a.color)a.fill=
a.color;this.styles=a=r(this.styles,a);Z&&c&&delete a.width;if(qa&&!Y)c&&delete a.width,M(this.element,a);else{for(d in a)e+=d.replace(/([A-Z])/g,f)+":"+a[d]+";";w(b,"style",e)}c&&this.added&&this.renderer.buildText(this);return this},on:function(a,b){var c=this.element;if(hb&&a==="click")c.ontouchstart=function(a){a.preventDefault();b.call(c,a)};c["on"+a]=b;return this},setRadialReference:function(a){this.element.radialReference=a;return this},translate:function(a,b){return this.attr({translateX:a,
translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},htmlCss:function(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width)delete a.width,this.textWidth=b,this.updateTransform();this.styles=r(this.styles,a);M(this.element,a);return this},htmlGetBBox:function(){var a=this.element,b=this.bBox;if(!b){if(a.nodeName==="text")a.style.position="absolute";b=this.bBox={x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}}return b},htmlUpdateTransform:function(){if(this.added){var a=
this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,e=this.x||0,f=this.y||0,g=this.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=g&&g!=="left",j=this.shadows;M(b,{marginLeft:c,marginTop:d});j&&n(j,function(a){M(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&n(b.childNodes,function(c){a.invertChild(c,b)});if(b.tagName==="SPAN"){var k,l,j=this.rotation,m;k=0;var o=1,q=0,ka;m=A(this.textWidth);var D=this.xCorr||0,F=this.yCorr||0,Tb=[j,g,b.innerHTML,this.textWidth].join(",");
if(Tb!==this.cTT){t(j)&&(k=j*Ua,o=V(k),q=ba(k),this.setSpanRotation(j,q,o));k=p(this.elemWidth,b.offsetWidth);l=p(this.elemHeight,b.offsetHeight);if(k>m&&/[ \-]/.test(b.textContent||b.innerText))M(b,{width:m+"px",display:"block",whiteSpace:"normal"}),k=m;m=a.fontMetrics(b.style.fontSize).b;D=o<0&&-k;F=q<0&&-l;ka=o*q<0;D+=q*m*(ka?1-h:h);F-=o*m*(j?ka?h:1-h:1);i&&(D-=k*h*(o<0?-1:1),j&&(F-=l*h*(q<0?-1:1)),M(b,{textAlign:g}));this.xCorr=D;this.yCorr=F}M(b,{left:e+D+"px",top:f+F+"px"});if(fb)l=b.offsetHeight;
this.cTT=Tb}}else this.alignOnAdd=!0},setSpanRotation:function(a){var b={};b[qa?"-ms-transform":fb?"-webkit-transform":gb?"MozTransform":Nb?"-o-transform":""]=b.transform="rotate("+a+"deg)";M(this.element,b)},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,c=this.scaleX,d=this.scaleY,e=this.inverted,f=this.rotation;e&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+(this.x||0)+" "+(this.y||
0)+")");(t(c)||t(d))&&a.push("scale("+p(c,1)+" "+p(d,1)+")");a.length&&w(this.element,"transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){var d,e,f,g,h={};e=this.renderer;f=e.alignedObjects;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!c||da(c))this.alignTo=d=c||"renderer",fa(f,this),f.push(this),c=null}else a=this.alignOptions,b=this.alignByTranslate,d=this.alignTo;c=p(c,e[d],e);d=a.align;e=a.verticalAlign;f=(c.x||
0)+(a.x||0);g=(c.y||0)+(a.y||0);if(d==="right"||d==="center")f+=(c.width-(a.width||0))/{right:1,center:2}[d];h[b?"translateX":"x"]=s(f);if(e==="bottom"||e==="middle")g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||1);h[b?"translateY":"y"]=s(g);this[this.placed?"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this},getBBox:function(){var a=this.bBox,b=this.renderer,c,d=this.rotation;c=this.element;var e=this.styles,f=d*Ua;if(!a){if(c.namespaceURI===wa||b.forExport){try{a=c.getBBox?
r({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight}}catch(g){}if(!a||a.width<0)a={width:0,height:0}}else a=this.htmlGetBBox();if(b.isSVG){b=a.width;c=a.height;if(qa&&e&&e.fontSize==="11px"&&c.toPrecision(3)==="22.7")a.height=c=14;if(d)a.width=P(c*ba(f))+P(b*V(f)),a.height=P(c*V(f))+P(b*ba(f))}this.bBox=a}return a},show:function(){return this.attr({visibility:"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||
150,complete:function(){b.hide()}})},add:function(a){var b=this.renderer,c=a||b,d=c.element||b.box,e=d.childNodes,f=this.element,g=w(f,"zIndex"),h;if(a)this.parentGroup=a;this.parentInverted=a&&a.inverted;this.textStr!==void 0&&b.buildText(this);if(g)c.handleZ=!0,g=A(g);if(c.handleZ)for(c=0;c<e.length;c++)if(a=e[c],b=w(a,"zIndex"),a!==f&&(A(b)>g||!t(g)&&t(b))){d.insertBefore(f,a);h=!0;break}h||d.appendChild(f);this.added=!0;C(this,"add");return this},safeRemoveChild:function(a){var b=a.parentNode;
b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&b.nodeName==="SPAN"&&b.parentNode,e,f;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;Wa(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(f=0;f<a.stops.length;f++)a.stops[f]=a.stops[f].destroy();a.stops=null}a.safeRemoveChild(b);for(c&&n(c,function(b){a.safeRemoveChild(b)});d&&d.childNodes.length===0;)b=d.parentNode,a.safeRemoveChild(d),d=b;a.alignTo&&fa(a.renderer.alignedObjects,
a);for(e in a)delete a[e];return null},shadow:function(a,b,c){var d=[],e,f,g=this.element,h,i,j,k;if(a){i=p(a.width,3);j=(a.opacity||0.15)/i;k=this.parentInverted?"(-1,-1)":"("+p(a.offsetX,1)+", "+p(a.offsetY,1)+")";for(e=1;e<=i;e++){f=g.cloneNode(0);h=i*2+1-2*e;w(f,{isShadow:"true",stroke:a.color||"black","stroke-opacity":j*e,"stroke-width":h,transform:"translate"+k,fill:R});if(c)w(f,"height",u(w(f,"height")-h,0)),f.cutHeight=h;b?b.element.appendChild(f):g.parentNode.insertBefore(f,g);d.push(f)}this.shadows=
d}return this}};var Fa=function(){this.init.apply(this,arguments)};Fa.prototype={Element:va,init:function(a,b,c,d){var e=location,f,g;f=this.createElement("svg").attr({version:"1.1"});g=f.element;a.appendChild(g);a.innerHTML.indexOf("xmlns")===-1&&w(g,"xmlns",wa);this.isSVG=!0;this.box=g;this.boxWrapper=f;this.alignedObjects=[];this.url=(gb||fb)&&z.getElementsByTagName("base").length?e.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(z.createTextNode("Created with Highcharts 3.0.4"));
this.defs=this.createElement("defs").add();this.forExport=d;this.gradients={};this.setSize(b,c,!1);var h;if(gb&&a.getBoundingClientRect)this.subPixelFix=b=function(){M(a,{left:0,top:0});h=a.getBoundingClientRect();M(a,{left:ja(h.left)-h.left+"px",top:ja(h.top)-h.top+"px"})},b(),J(E,"resize",b)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();Ja(this.gradients||{});this.gradients=null;if(a)this.defs=
a.destroy();this.subPixelFix&&aa(E,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:function(){},buildText:function(a){for(var b=a.element,c=this,d=c.forExport,e=p(a.textStr,"").toString().replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g),f=b.childNodes,g=/style="([^"]+)"/,
h=/href="(http[^"]+)"/,i=w(b,"x"),j=a.styles,k=j&&j.width&&A(j.width),l=j&&j.lineHeight,m=f.length;m--;)b.removeChild(f[m]);k&&!a.added&&this.box.appendChild(b);e[e.length-1]===""&&e.pop();n(e,function(e,f){var m,p=0,e=e.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");m=e.split("|||");n(m,function(e){if(e!==""||m.length===1){var o={},n=z.createElementNS(wa,"tspan"),t;g.test(e)&&(t=e.match(g)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),w(n,"style",t));h.test(e)&&!d&&(w(n,"onclick",'location.href="'+
e.match(h)[1]+'"'),M(n,{cursor:"pointer"}));e=(e.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");if(e!==" "&&(n.appendChild(z.createTextNode(e)),p?o.dx=0:o.x=i,w(n,o),!p&&f&&(!Y&&d&&M(n,{display:"block"}),w(n,"dy",l||c.fontMetrics(/px$/.test(n.style.fontSize)?n.style.fontSize:j.fontSize).h,fb&&n.offsetHeight)),b.appendChild(n),p++,k))for(var e=e.replace(/([^\^])-/g,"$1- ").split(" "),u,s=[];e.length||s.length;)delete a.bBox,u=a.getBBox().width,o=u>k,!o||e.length===1?(e=s,
s=[],e.length&&(n=z.createElementNS(wa,"tspan"),w(n,{dy:l||16,x:i}),t&&w(n,"style",t),b.appendChild(n),u>k&&(k=u))):(n.removeChild(n.firstChild),s.unshift(e.pop())),e.length&&n.appendChild(z.createTextNode(e.join(" ").replace(/- /g,"-")))}})})},button:function(a,b,c,d,e,f,g){var h=this.label(a,b,c,null,null,null,null,null,"button"),i=0,j,k,l,m,o,a={x1:0,y1:0,x2:0,y2:1},e=x({"stroke-width":1,stroke:"#CCCCCC",fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},
e);l=e.style;delete e.style;f=x(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},f);m=f.style;delete f.style;g=x(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},g);o=g.style;delete g.style;J(h.element,qa?"mouseover":"mouseenter",function(){h.attr(f).css(m)});J(h.element,qa?"mouseout":"mouseleave",function(){j=[e,f,g][i];k=[l,m,o][i];h.attr(j).css(k)});h.setState=function(a){(i=a)?a===2&&h.attr(g).css(o):h.attr(e).css(l)};return h.on("click",function(){d.call(h)}).attr(e).css(r({cursor:"default"},
l))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=s(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=s(a[2])+b%2/2);return a},path:function(a){var b={fill:R};Ha(a)?b.d=a:U(a)&&r(b,a);return this.createElement("path").attr(b)},circle:function(a,b,c){a=U(a)?a:{x:a,y:b,r:c};return this.createElement("circle").attr(a)},arc:function(a,b,c,d,e,f){if(U(a))b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x;a=this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:e||0,end:f||0});a.r=c;return a},rect:function(a,b,c,d,
e,f){e=U(a)?a.r:e;e=this.createElement("rect").attr({rx:e,ry:e,fill:R});return e.attr(U(a)?a:e.crisp(f,a,b,u(c,0),u(d,0)))},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[p(c,!0)?"animate":"attr"]({width:a,height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");return t(a)?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,e){var f={preserveAspectRatio:R};arguments.length>1&&r(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);
f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e,f){var g,h=this.symbols[a],h=h&&h(s(b),s(c),d,e,f),i=/^url\((.*?)\)$/,j,k;if(h)g=this.path(h),r(g,{symbolName:a,x:b,y:c,width:d,height:e}),f&&r(g,f);else if(i.test(a))k=function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(s((d-b[0])/2),s((e-b[1])/2)))},j=a.match(i)[1],a=Pb[j],g=this.image(j).attr({x:b,
y:c}),g.isImg=!0,a?k(g,a):(g.attr({width:0,height:0}),T("img",{onload:function(){k(g,Pb[j]=[this.width,this.height])},src:j}));return g},symbols:{circle:function(a,b,c,d){var e=0.166*c;return["M",a+c/2,b,"C",a+c+e,b,a+c+e,b+d,a+c/2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,
b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"]},arc:function(a,b,c,d,e){var f=e.start,c=e.r||c||d,g=e.end-0.001,d=e.innerR,h=e.open,i=V(f),j=ba(f),k=V(g),g=ba(g),e=e.end-f<Ma?0:1;return["M",a+c*i,b+c*j,"A",c,c,0,e,1,a+c*k,b+c*g,h?"M":"L",a+d*k,b+d*g,"A",d,d,0,e,0,a+d*i,b+d*j,h?"":"Z"]}},clipRect:function(a,b,c,d){var e="highcharts-"+yb++,f=this.createElement("clipPath").attr({id:e}).add(this.defs),a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;return a},color:function(a,b,c){var d=
this,e,f=/^rgba/,g,h,i,j,k,l,m,o=[];a&&a.linearGradient?g="linearGradient":a&&a.radialGradient&&(g="radialGradient");if(g){c=a[g];h=d.gradients;j=a.stops;b=b.radialReference;Ha(c)&&(a[g]=c={x1:c[0],y1:c[1],x2:c[2],y2:c[3],gradientUnits:"userSpaceOnUse"});g==="radialGradient"&&b&&!t(c.gradientUnits)&&(c=x(c,{cx:b[0]-b[2]/2+c.cx*b[2],cy:b[1]-b[2]/2+c.cy*b[2],r:c.r*b[2],gradientUnits:"userSpaceOnUse"}));for(m in c)m!=="id"&&o.push(m,c[m]);for(m in j)o.push(j[m]);o=o.join(",");h[o]?a=h[o].id:(c.id=a=
"highcharts-"+yb++,h[o]=i=d.createElement(g).attr(c).add(d.defs),i.stops=[],n(j,function(a){f.test(a[1])?(e=oa(a[1]),k=e.get("rgb"),l=e.get("a")):(k=a[1],l=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":k,"stop-opacity":l}).add(i);i.stops.push(a)}));return"url("+d.url+"#"+a+")"}else return f.test(a)?(e=oa(a),w(b,c+"-opacity",e.get("a")),e.get("rgb")):(b.removeAttribute(c+"-opacity"),a)},text:function(a,b,c,d){var e=O.chart.style,f=Z||!Y&&this.forExport;if(d&&!this.forExport)return this.html(a,
b,c);b=s(p(b,0));c=s(p(c,0));a=this.createElement("text").attr({x:b,y:c,text:a}).css({fontFamily:e.fontFamily,fontSize:e.fontSize});f&&a.css({position:"absolute"});a.x=b;a.y=c;return a},html:function(a,b,c){var d=O.chart.style,e=this.createElement("span"),f=e.attrSetters,g=e.element,h=e.renderer;f.text=function(a){a!==g.innerHTML&&delete this.bBox;g.innerHTML=a;return!1};f.x=f.y=f.align=function(a,b){b==="align"&&(b="textAlign");e[b]=a;e.htmlUpdateTransform();return!1};e.attr({text:a,x:s(b),y:s(c)}).css({position:"absolute",
whiteSpace:"nowrap",fontFamily:d.fontFamily,fontSize:d.fontSize});e.css=e.htmlCss;if(h.isSVG)e.add=function(a){var b,c=h.box.parentNode,d=[];if(a){if(b=a.div,!b){for(;a;)d.push(a),a=a.parentGroup;n(d.reverse(),function(a){var d;b=a.div=a.div||T(Ba,{className:w(a.element,"class")},{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px"},b||c);d=b.style;r(a.attrSetters,{translateX:function(a){d.left=a+"px"},translateY:function(a){d.top=a+"px"},visibility:function(a,b){d[b]=a}})})}}else b=
c;b.appendChild(g);e.added=!0;e.alignOnAdd&&e.htmlUpdateTransform();return e};return e},fontMetrics:function(a){var a=A(a||11),a=a<24?a+4:s(a*1.2),b=s(a*0.8);return{h:a,b:b}},label:function(a,b,c,d,e,f,g,h,i){function j(){var a,b;a=p.element.style;F=(Oa===void 0||Ga===void 0||q.styles.textAlign)&&p.getBBox();q.width=(Oa||F.width||0)+2*ca+jb;q.height=(Ga||F.height||0)+2*ca;w=ca+o.fontMetrics(a&&a.fontSize).b;if(A){if(!D)a=s(-u*ca),b=h?-w:0,q.box=D=d?o.symbol(d,a,b,q.width,q.height):o.rect(a,b,q.width,
q.height,0,kb[Rb]),D.add(q);D.isImg||D.attr(x({width:q.width,height:q.height},kb));kb=null}}function k(){var a=q.styles,a=a&&a.textAlign,b=jb+ca*(1-u),c;c=h?0:w;if(t(Oa)&&(a==="center"||a==="right"))b+={center:0.5,right:1}[a]*(Oa-F.width);(b!==p.x||c!==p.y)&&p.attr({x:b,y:c});p.x=b;p.y=c}function l(a,b){D?D.attr(a,b):kb[a]=b}function m(){p.add(q);q.attr({text:a,x:b,y:c});D&&t(e)&&q.attr({anchorX:e,anchorY:f})}var o=this,q=o.g(i),p=o.text("",0,0,g).attr({zIndex:1}),D,F,u=0,ca=3,jb=0,Oa,Ga,G,H,B=0,
kb={},w,g=q.attrSetters,A;J(q,"add",m);g.width=function(a){Oa=a;return!1};g.height=function(a){Ga=a;return!1};g.padding=function(a){t(a)&&a!==ca&&(ca=a,k());return!1};g.paddingLeft=function(a){t(a)&&a!==jb&&(jb=a,k());return!1};g.align=function(a){u={left:0,center:0.5,right:1}[a];return!1};g.text=function(a,b){p.attr(b,a);j();k();return!1};g[Rb]=function(a,b){A=!0;B=a%2/2;l(b,a);return!1};g.stroke=g.fill=g.r=function(a,b){b==="fill"&&(A=!0);l(b,a);return!1};g.anchorX=function(a,b){e=a;l(b,a+B-G);
return!1};g.anchorY=function(a,b){f=a;l(b,a-H);return!1};g.x=function(a){q.x=a;a-=u*((Oa||F.width)+ca);G=s(a);q.attr("translateX",G);return!1};g.y=function(a){H=q.y=s(a);q.attr("translateY",H);return!1};var z=q.css;return r(q,{css:function(a){if(a){var b={},a=x(a);n("fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration".split(","),function(c){a[c]!==v&&(b[c]=a[c],delete a[c])});p.css(b)}return z.call(q,a)},getBBox:function(){return{width:F.width+2*ca,height:F.height+2*ca,x:F.x-ca,
y:F.y-ca}},shadow:function(a){D&&D.shadow(a);return q},destroy:function(){aa(q,"add",m);aa(q.element,"mouseenter");aa(q.element,"mouseleave");p&&(p=p.destroy());D&&(D=D.destroy());va.prototype.destroy.call(q);q=o=j=k=l=m=null}})}};Va=Fa;var K;if(!Y&&!Z){Highcharts.VMLElement=K={init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],e=b===Ba;(b==="shape"||e)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",e?"hidden":"visible");c.push(' style="',
d.join(""),'"/>');if(b)c=e||b==="span"||b==="img"?c.join(""):a.prepVML(c),this.element=T(c);this.renderer=a;this.attrSetters={}},add:function(a){var b=this.renderer,c=this.element,d=b.box,d=a?a.element||a:d;a&&a.inverted&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();C(this,"add");return this},updateTransform:va.prototype.htmlUpdateTransform,setSpanRotation:function(a,b,c){M(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",
c,", M12=",-b,", M21=",b,", M22=",c,", sizingMethod='auto expand')"].join(""):R})},attr:function(a,b){var c,d,e,f=this.element||{},g=f.style,h=f.nodeName,i=this.renderer,j=this.symbolName,k,l=this.shadows,m,o=this.attrSetters,q=this;da(a)&&t(b)&&(c=a,a={},a[c]=b);if(da(a))c=a,q=c==="strokeWidth"||c==="stroke-width"?this.strokeweight:this[c];else for(c in a)if(d=a[c],m=!1,e=o[c]&&o[c].call(this,d,c),e!==!1&&d!==null){e!==v&&(d=e);if(j&&/^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(c))k||
(this.symbolAttr(a),k=!0),m=!0;else if(c==="d"){d=d||[];this.d=d.join(" ");e=d.length;m=[];for(var p;e--;)if(pa(d[e]))m[e]=s(d[e]*10)-5;else if(d[e]==="Z")m[e]="x";else if(m[e]=d[e],d.isArc&&(d[e]==="wa"||d[e]==="at"))p=d[e]==="wa"?1:-1,m[e+5]===m[e+7]&&(m[e+7]-=p),m[e+6]===m[e+8]&&(m[e+8]-=p);d=m.join(" ")||"x";f.path=d;if(l)for(e=l.length;e--;)l[e].path=l[e].cutOff?this.cutOffPath(d,l[e].cutOff):d;m=!0}else if(c==="visibility"){if(l)for(e=l.length;e--;)l[e].style[c]=d;h==="DIV"&&(d=d==="hidden"?
"-999em":0,eb||(g[c]=d?"visible":"hidden"),c="top");g[c]=d;m=!0}else if(c==="zIndex")d&&(g[c]=d),m=!0;else if(na(c,["x","y","width","height"])!==-1)this[c]=d,c==="x"||c==="y"?c={x:"left",y:"top"}[c]:d=u(0,d),this.updateClipping?(this[c]=d,this.updateClipping()):g[c]=d,m=!0;else if(c==="class"&&h==="DIV")f.className=d;else if(c==="stroke")d=i.color(d,f,c),c="strokecolor";else if(c==="stroke-width"||c==="strokeWidth")f.stroked=d?!0:!1,c="strokeweight",this[c]=d,pa(d)&&(d+="px");else if(c==="dashstyle")(f.getElementsByTagName("stroke")[0]||
T(i.prepVML(["<stroke/>"]),null,null,f))[c]=d||"solid",this.dashstyle=d,m=!0;else if(c==="fill")if(h==="SPAN")g.color=d;else{if(h!=="IMG")f.filled=d!==R?!0:!1,d=i.color(d,f,c,this),c="fillcolor"}else if(c==="opacity")m=!0;else if(h==="shape"&&c==="rotation")this[c]=f.style[c]=d,f.style.left=-s(ba(d*Ua)+1)+"px",f.style.top=s(V(d*Ua))+"px";else if(c==="translateX"||c==="translateY"||c==="rotation")this[c]=d,this.updateTransform(),m=!0;else if(c==="text")this.bBox=null,f.innerHTML=d,m=!0;m||(eb?f[c]=
d:w(f,c,d))}return q},clip:function(a){var b=this,c;a?(c=a.members,fa(c,b),c.push(b),b.destroyClip=function(){fa(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:eb?"inherit":"rect(auto)"});return b.css(a)},css:va.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&Ta(a)},destroy:function(){this.destroyClip&&this.destroyClip();return va.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=E.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,
b){var c,a=a.split(/[ ,]/);c=a.length;if(c===9||c===11)a[c-4]=a[c-2]=A(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],e,f=this.element,g=this.renderer,h,i=f.style,j,k=f.path,l,m,o,q;k&&typeof k.value!=="string"&&(k="x");m=k;if(a){o=p(a.width,3);q=(a.opacity||0.15)/o;for(e=1;e<=3;e++){l=o*2+1-2*e;c&&(m=this.cutOffPath(k.value,l+0.5));j=['<shape isShadow="true" strokeweight="',l,'" filled="false" path="',m,'" coordsize="10 10" style="',f.style.cssText,'" />'];h=T(g.prepVML(j),null,
{left:A(i.left)+p(a.offsetX,1),top:A(i.top)+p(a.offsetY,1)});if(c)h.cutOff=l+1;j=['<stroke color="',a.color||"black",'" opacity="',q*e,'"/>'];T(g.prepVML(j),null,null,h);b?b.element.appendChild(h):f.parentNode.insertBefore(h,f);d.push(h)}this.shadows=d}return this}};K=ga(va,K);var la={Element:K,isIE8:Da.indexOf("MSIE 8.0")>-1,init:function(a,b,c){var d,e;this.alignedObjects=[];d=this.createElement(Ba);e=d.element;e.style.position="relative";a.appendChild(d.element);this.isVML=!0;this.box=e;this.boxWrapper=
d;this.setSize(b,c,!1);if(!z.namespaces.hcv)z.namespaces.add("hcv","urn:schemas-microsoft-com:vml"),z.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var e=this.createElement(),f=U(a);return r(e,{members:[],left:f?a.x:a,top:f?a.y:b,width:f?a.width:c,height:f?a.height:d,getCSS:function(a){var b=a.element,c=b.nodeName,a=a.inverted,d=this.top-
(c==="shape"?b.offsetTop:0),e=this.left,b=e+this.width,f=d+this.height,d={clip:"rect("+s(a?e:d)+"px,"+s(a?f:b)+"px,"+s(a?b:f)+"px,"+s(a?d:e)+"px)"};!a&&eb&&c==="DIV"&&r(d,{width:b+"px",height:f+"px"});return d},updateClipping:function(){n(e.members,function(a){a.css(e.getCSS(a))})}})},color:function(a,b,c,d){var e=this,f,g=/^rgba/,h,i,j=R;a&&a.linearGradient?i="gradient":a&&a.radialGradient&&(i="pattern");if(i){var k,l,m=a.linearGradient||a.radialGradient,o,q,p,D,F,u="",a=a.stops,t,s=[],v=function(){h=
['<fill colors="'+s.join(",")+'" opacity="',p,'" o:opacity2="',q,'" type="',i,'" ',u,'focus="100%" method="any" />'];T(e.prepVML(h),null,null,b)};o=a[0];t=a[a.length-1];o[0]>0&&a.unshift([0,o[1]]);t[0]<1&&a.push([1,t[1]]);n(a,function(a,b){g.test(a[1])?(f=oa(a[1]),k=f.get("rgb"),l=f.get("a")):(k=a[1],l=1);s.push(a[0]*100+"% "+k);b?(p=l,D=k):(q=l,F=k)});if(c==="fill")if(i==="gradient")c=m.x1||m[0]||0,a=m.y1||m[1]||0,o=m.x2||m[2]||0,m=m.y2||m[3]||0,u='angle="'+(90-N.atan((m-a)/(o-c))*180/Ma)+'"',v();
else{var j=m.r,r=j*2,G=j*2,H=m.cx,B=m.cy,x=b.radialReference,w,j=function(){x&&(w=d.getBBox(),H+=(x[0]-w.x)/w.width-0.5,B+=(x[1]-w.y)/w.height-0.5,r*=x[2]/w.width,G*=x[2]/w.height);u='src="'+O.global.VMLRadialGradientURL+'" size="'+r+","+G+'" origin="0.5,0.5" position="'+H+","+B+'" color2="'+F+'" ';v()};d.added?j():J(d,"add",j);j=D}else j=k}else if(g.test(a)&&b.tagName!=="IMG")f=oa(a),h=["<",c,' opacity="',f.get("a"),'"/>'],T(this.prepVML(h),null,null,b),j=f.get("rgb");else{j=b.getElementsByTagName(c);
if(j.length)j[0].opacity=1,j[0].type="solid";j=a}return j},prepVML:function(a){var b=this.isIE8,a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:Fa.prototype.html,path:function(a){var b={coordsize:"10 10"};Ha(a)?b.d=a:U(a)&&r(b,a);return this.createElement("shape").attr(b)},
circle:function(a,b,c){var d=this.symbol("circle");if(U(a))c=a.r,b=a.y,a=a.x;d.isCircle=!0;return d.attr({x:a,y:b,width:2*c,height:2*c})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(Ba).attr(b)},image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>1&&f.attr({x:b,y:c,width:d,height:e});return f},rect:function(a,b,c,d,e,f){if(U(a))b=a.y,c=a.width,d=a.height,f=a.strokeWidth,a=a.x;var g=this.symbol("rect");
g.r=e;return g.attr(g.crisp(f,a,b,u(c,0),u(d,0)))},invertChild:function(a,b){var c=b.style;M(a,{flip:"x",left:A(c.width)-1,top:A(c.height)-1,rotation:-90})},symbols:{arc:function(a,b,c,d,e){var f=e.start,g=e.end,h=e.r||c||d,c=e.innerR,d=V(f),i=ba(f),j=V(g),k=ba(g);if(g-f===0)return["x"];f=["wa",a-h,b-h,a+h,b+h,a+h*d,b+h*i,a+h*j,b+h*k];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*j,b+c*k,a+c*d,b+c*i,"x","e");f.isArc=!0;return f},circle:function(a,b,c,d,e){e&&e.isCircle&&(a-=c/2,
b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){var f=a+c,g=b+d,h;!t(e)||!e.r?f=Fa.prototype.symbols.square.apply(0,arguments):(h=I(e.r,c,d),f=["M",a+h,b,"L",f-h,b,"wa",f-2*h,b,f,b+2*h,f-h,b,f,b+h,"L",f,g-h,"wa",f-2*h,g-2*h,f,g,f,g-h,f-h,g,"L",a+h,g,"wa",a,g-2*h,a+2*h,g,a+h,g,a,g-h,"L",a,b+h,"wa",a,b,a+2*h,b+2*h,a,b+h,a+h,b,"x","e"]);return f}}};Highcharts.VMLRenderer=K=function(){this.init.apply(this,arguments)};K.prototype=x(Fa.prototype,la);Va=K}var Ub;if(Z)Highcharts.CanVGRenderer=
K=function(){wa="http://www.w3.org/1999/xhtml"},K.prototype.symbols={},Ub=function(){function a(){var a=b.length,d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){b.length===0&&Wb(d,a);b.push(c)}}}(),Va=K;La.prototype={addLabel:function(){var a=this.axis,b=a.options,c=a.chart,d=a.horiz,e=a.categories,f=a.series[0]&&a.series[0].names,g=this.pos,h=b.labels,i=a.tickPositions,d=d&&e&&!h.step&&!h.staggerLines&&!h.rotation&&c.plotWidth/i.length||!d&&(c.optionsMarginLeft||c.chartWidth*0.33),
j=g===i[0],k=g===i[i.length-1],f=e?p(e[g],f&&f[g],g):g,e=this.label,i=i.info,l;a.isDatetimeAxis&&i&&(l=b.dateTimeLabelFormats[i.higherRanks[g]||i.unitName]);this.isFirst=j;this.isLast=k;b=a.labelFormatter.call({axis:a,chart:c,isFirst:j,isLast:k,dateTimeLabelFormat:l,value:a.isLog?ia(ea(f)):f});g=d&&{width:u(1,s(d-2*(h.padding||10)))+"px"};g=r(g,h.style);if(t(e))e&&e.attr({text:b}).css(g);else{d={align:a.labelAlign};if(pa(h.rotation))d.rotation=h.rotation;this.label=t(b)&&h.enabled?c.renderer.text(b,
0,0,h.useHTML).attr(d).css(g).add(a.labelGroup):null}},getLabelSize:function(){var a=this.label,b=this.axis;return a?(this.labelBBox=a.getBBox())[b.horiz?"height":"width"]:0},getLabelSides:function(){var a=this.axis,b=this.labelBBox.width,a=b*{left:0,center:0.5,right:1}[a.labelAlign]-a.options.labels.x;return[-a,b-a]},handleOverflow:function(a,b){var c=!0,d=this.axis,e=d.chart,f=this.isFirst,g=this.isLast,h=b.x,i=d.reversed,j=d.tickPositions;if(f||g){var k=this.getLabelSides(),l=k[0],k=k[1],e=e.plotLeft,
m=e+d.len,j=(d=d.ticks[j[a+(f?1:-1)]])&&d.label.xy&&d.label.xy.x+d.getLabelSides()[f?0:1];f&&!i||g&&i?h+l<e&&(h=e-l,d&&h+k>j&&(c=!1)):h+k>m&&(h=m-k,d&&h+l<j&&(c=!1));b.x=h}return c},getPosition:function(a,b,c,d){var e=this.axis,f=e.chart,g=d&&f.oldChartHeight||f.chartHeight;return{x:a?e.translate(b+c,null,null,d)+e.transB:e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-e.left:0),y:a?g-e.bottom+e.offset-(e.opposite?e.height:0):g-e.translate(b+c,null,null,d)-e.transB}},getLabelPosition:function(a,
b,c,d,e,f,g,h){var i=this.axis,j=i.transA,k=i.reversed,l=i.staggerLines,m=i.chart.renderer.fontMetrics(e.style.fontSize).b,o=e.rotation,a=a+e.x-(f&&d?f*j*(k?-1:1):0),b=b+e.y-(f&&!d?f*j*(k?1:-1):0);o&&i.side===2&&(b-=m-m*V(o*Ua));!t(e.y)&&!o&&(b+=m-c.getBBox().height/2);l&&(b+=g/(h||1)%l*(i.labelOffset/l));return{x:a,y:b}},getMarkPath:function(a,b,c,d,e,f){return f.crispLine(["M",a,b,"L",a+(e?0:-c),b+(e?c:0)],d)},render:function(a,b,c){var d=this.axis,e=d.options,f=d.chart.renderer,g=d.horiz,h=this.type,
i=this.label,j=this.pos,k=e.labels,l=this.gridLine,m=h?h+"Grid":"grid",o=h?h+"Tick":"tick",q=e[m+"LineWidth"],n=e[m+"LineColor"],D=e[m+"LineDashStyle"],F=e[o+"Length"],m=e[o+"Width"]||0,u=e[o+"Color"],t=e[o+"Position"],o=this.mark,s=k.step,r=!0,w=d.tickmarkOffset,G=this.getPosition(g,j,w,b),H=G.x,G=G.y,B=g&&H===d.pos||!g&&G===d.pos+d.len?-1:1,x=d.staggerLines;this.isActive=!0;if(q){j=d.getPlotLinePath(j+w,q*B,b,!0);if(l===v){l={stroke:n,"stroke-width":q};if(D)l.dashstyle=D;if(!h)l.zIndex=1;if(b)l.opacity=
0;this.gridLine=l=q?f.path(j).attr(l).add(d.gridGroup):null}if(!b&&l&&j)l[this.isNew?"attr":"animate"]({d:j,opacity:c})}if(m&&F)t==="inside"&&(F=-F),d.opposite&&(F=-F),b=this.getMarkPath(H,G,F,m*B,g,f),o?o.animate({d:b,opacity:c}):this.mark=f.path(b).attr({stroke:u,"stroke-width":m,opacity:c}).add(d.axisGroup);if(i&&!isNaN(H))i.xy=G=this.getLabelPosition(H,G,i,g,k,w,a,s),this.isFirst&&!p(e.showFirstLabel,1)||this.isLast&&!p(e.showLastLabel,1)?r=!1:!x&&g&&k.overflow==="justify"&&!this.handleOverflow(a,
G)&&(r=!1),s&&a%s&&(r=!1),r&&!isNaN(G.y)?(G.opacity=c,i[this.isNew?"attr":"animate"](G),this.isNew=!1):i.attr("y",-9999)},destroy:function(){Ja(this,this.axis)}};tb.prototype={render:function(){var a=this,b=a.axis,c=b.horiz,d=(b.pointRange||0)/2,e=a.options,f=e.label,g=a.label,h=e.width,i=e.to,j=e.from,k=t(j)&&t(i),l=e.value,m=e.dashStyle,o=a.svgElem,q=[],n,D=e.color,F=e.zIndex,s=e.events,r=b.chart.renderer;b.isLog&&(j=ma(j),i=ma(i),l=ma(l));if(h){if(q=b.getPlotLinePath(l,h),d={stroke:D,"stroke-width":h},
m)d.dashstyle=m}else if(k){if(j=u(j,b.min-d),i=I(i,b.max+d),q=b.getPlotBandPath(j,i,e),d={fill:D},e.borderWidth)d.stroke=e.borderColor,d["stroke-width"]=e.borderWidth}else return;if(t(F))d.zIndex=F;if(o)q?o.animate({d:q},null,o.onGetPath):(o.hide(),o.onGetPath=function(){o.show()});else if(q&&q.length&&(a.svgElem=o=r.path(q).attr(d).add(),s))for(n in e=function(b){o.on(b,function(c){s[b].apply(a,[c])})},s)e(n);if(f&&t(f.text)&&q&&q.length&&b.width>0&&b.height>0){f=x({align:c&&k&&"center",x:c?!k&&
4:10,verticalAlign:!c&&k&&"middle",y:c?k?16:10:k?6:-4,rotation:c&&!k&&90},f);if(!g)a.label=g=r.text(f.text,0,0,f.useHTML).attr({align:f.textAlign||f.align,rotation:f.rotation,zIndex:F}).css(f.style).add();b=[q[1],q[4],p(q[6],q[1])];q=[q[2],q[5],p(q[7],q[2])];c=Ia(b);k=Ia(q);g.align(f,!1,{x:c,y:k,width:ta(b)-c,height:ta(q)-k});g.show()}else g&&g.hide();return a},destroy:function(){fa(this.axis.plotLinesAndBands,this);delete this.axis;Ja(this)}};Mb.prototype={destroy:function(){Ja(this,this.axis)},
setTotal:function(a){this.cum=this.total=a},addValue:function(a){this.setTotal(ia(this.total+a))},render:function(a){var b=this.options,c=b.format,c=c?Aa(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,0,0,b.useHTML).css(b.style).attr({align:this.textAlign,rotation:b.rotation,visibility:"hidden"}).add(a)},cacheExtremes:function(a,b){this.points[a.index]=b},setOffset:function(a,b){var c=this.axis,d=c.chart,e=d.inverted,
f=this.isNegative,g=c.translate(this.percent?100:this.total,0,0,0,1),c=c.translate(0),c=P(g-c),h=d.xAxis[0].translate(this.x)+a,i=d.plotHeight,f={x:e?f?g:g-c:h,y:e?i-h-b:f?i-g-c:i-g,width:e?c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e.attr({visibility:this.options.crop===!1||d.isInsidePlot(f.x,f.y)?Y?"inherit":"visible":"hidden"})}};db.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",
week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#C0C0C0",labels:L,lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:5,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{align:"middle",style:{color:"#4d759e",fontWeight:"bold"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,
gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:!0,tickWidth:0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return ya(this.total,-1)},style:L.style}},defaultLeftAxisOptions:{labels:{x:-8,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:8,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{x:0,y:14},title:{rotation:0}},defaultTopAxisOptions:{labels:{x:0,y:-5},
title:{rotation:0}},init:function(a,b){var c=b.isX;this.horiz=a.inverted?!c:c;this.xOrY=(this.isXAxis=c)?"x":"y";this.opposite=b.opposite;this.side=this.horiz?this.opposite?0:2:this.opposite?1:3;this.setOptions(b);var d=this.options,e=d.type;this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.chart=a;this.reversed=d.reversed;this.zoomEnabled=d.zoomEnabled!==!1;this.categories=d.categories||e==="category";this.isLog=e==="logarithmic";this.isDatetimeAxis=
e==="datetime";this.isLinked=t(d.linkedTo);this.tickmarkOffset=this.categories&&d.tickmarkPlacement==="between"?0.5:0;this.ticks={};this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stacksMax={};this._stacksTouched=0;this.min=this.max=null;var f,d=this.options.events;na(this,a.axes)===-1&&(a.axes.push(this),a[c?"xAxis":"yAxis"].push(this));
this.series=this.series||[];if(a.inverted&&c&&this.reversed===v)this.reversed=!0;this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(f in d)J(this,f,d[f]);if(this.isLog)this.val2lin=ma,this.lin2val=ea},setOptions:function(a){this.options=x(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],x(O[this.isXAxis?"xAxis":"yAxis"],a))},update:function(a,
b){var c=this.chart,a=c.options[this.xOrY+"Axis"][this.options.index]=x(this.userOptions,a);this.destroy(!0);this._addedPlotLB=!1;this.init(c,r(a,{events:v}));c.isDirtyBox=!0;p(b,!0)&&c.redraw()},remove:function(a){var b=this.chart,c=this.xOrY+"Axis";n(this.series,function(a){a.remove(!1)});fa(b.axes,this);fa(b[c],this);b.options[c].splice(this.options.index,1);n(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;p(a,!0)&&b.redraw()},defaultLabelFormatter:function(){var a=this.axis,
b=this.value,c=a.categories,d=this.dateTimeLabelFormat,e=O.lang.numericSymbols,f=e&&e.length,g,h=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(h)g=Aa(h,this);else if(c)g=b;else if(d)g=Xa(d,b);else if(f&&a>=1E3)for(;f--&&g===v;)c=Math.pow(1E3,f+1),a>=c&&e[f]!==null&&(g=ya(b/c,-1)+e[f]);g===v&&(g=b>=1E3?ya(b,0):ya(b,-1));return g},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=null;a.stacksMax={};a.buildStacks();n(a.series,function(c){if(c.visible||
!b.options.chart.ignoreHiddenSeries){var d=c.options,e;e=d.threshold;a.hasVisibleSeries=!0;a.isLog&&e<=0&&(e=null);if(a.isXAxis){if(e=c.xData,e.length)a.dataMin=I(p(a.dataMin,e[0]),Ia(e)),a.dataMax=u(p(a.dataMax,e[0]),ta(e))}else{d=d.stacking;a.usePercentage=d==="percent";if(a.usePercentage)a.dataMin=0,a.dataMax=99;c.getExtremes();d=c.dataMax;c=c.dataMin;if(!a.usePercentage&&t(c)&&t(d))a.dataMin=I(p(a.dataMin,c),c),a.dataMax=u(p(a.dataMax,d),d);if(t(e))if(a.dataMin>=e)a.dataMin=e,a.ignoreMinPadding=
!0;else if(a.dataMax<e)a.dataMax=e,a.ignoreMaxPadding=!0}}})},translate:function(a,b,c,d,e,f){var g=this.len,h=1,i=0,j=d?this.oldTransA:this.transA,d=d?this.oldMin:this.min,k=this.minPixelPadding,e=(this.options.ordinal||this.isLog&&e)&&this.lin2val;if(!j)j=this.transA;c&&(h*=-1,i=g);this.reversed&&(h*=-1,i-=h*g);b?(a=a*h+i,a-=k,a=a/j+d,e&&(a=this.lin2val(a))):(e&&(a=this.val2lin(a)),f==="between"&&(f=0.5),a=h*(a-d)*j+i+h*k+(pa(f)?j*f*this.pointRange:0));return a},toPixels:function(a,b){return this.translate(a,
!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d){var e=this.chart,f=this.left,g=this.top,h,i,j,a=this.translate(a,null,null,c),k=c&&e.oldChartHeight||e.chartHeight,l=c&&e.oldChartWidth||e.chartWidth,m;h=this.transB;c=i=s(a+h);h=j=s(k-a-h);if(isNaN(a))m=!0;else if(this.horiz){if(h=g,j=k-this.bottom,c<f||c>f+this.width)m=!0}else if(c=f,i=l-this.right,h<g||h>g+this.height)m=!0;return m&&!d?
null:e.renderer.crispLine(["M",c,h,"L",i,j],b||0)},getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b),d=this.getPlotLinePath(a);d&&c?d.push(c[4],c[5],c[1],c[2]):d=null;return d},getLinearTickPositions:function(a,b,c){for(var d,b=ia(S(b/a)*a),c=ia(ja(c/a)*a),e=[];b<=c;){e.push(b);b=ia(b+a);if(b===d)break;d=b}return e},getLogTickPositions:function(a,b,c,d){var e=this.options,f=this.len,g=[];if(!d)this._minorAutoInterval=null;if(a>=0.5)a=s(a),g=this.getLinearTickPositions(a,b,c);else if(a>=
0.08)for(var f=S(b),h,i,j,k,l,e=a>0.3?[1,2,4]:a>0.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!l;f++){i=e.length;for(h=0;h<i&&!l;h++)j=ma(ea(f)*e[h]),j>b&&(!d||k<=c)&&g.push(k),k>c&&(l=!0),k=j}else if(b=ea(b),c=ea(c),a=e[d?"minorTickInterval":"tickInterval"],a=p(a==="auto"?null:a,this._minorAutoInterval,(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=mb(a,null,lb(a)),g=Na(this.getLinearTickPositions(a,b,c),ma),!d)this._minorAutoInterval=a/5;if(!d)this.tickInterval=a;return g},
getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],e;if(this.isLog){e=b.length;for(a=1;a<e;a++)d=d.concat(this.getLogTickPositions(c,b[a-1],b[a],!0))}else if(this.isDatetimeAxis&&a.minorTickInterval==="auto")d=d.concat(Eb(Cb(c),this.min,this.max,a.startOfWeek)),d[0]<this.min&&d.shift();else for(b=this.min+(b[0]-this.min)%c;b<=this.max;b+=c)d.push(b);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,e=this.dataMax-
this.dataMin>=this.minRange,f,g,h,i,j;if(this.isXAxis&&this.minRange===v&&!this.isLog)t(a.min)||t(a.max)?this.minRange=null:(n(this.series,function(a){i=a.xData;for(g=j=a.xIncrement?1:i.length-1;g>0;g--)if(h=i[g]-i[g-1],f===v||h<f)f=h}),this.minRange=I(f*5,this.dataMax-this.dataMin));if(c-b<this.minRange){var k=this.minRange;d=(k-c+b)/2;d=[b-d,p(a.min,b-d)];if(e)d[2]=this.dataMin;b=ta(d);c=[b+k,p(a.max,b+k)];if(e)c[2]=this.dataMax;c=Ia(c);c-b<k&&(d[0]=c-k,d[1]=p(a.min,c-k),b=ta(d))}this.min=b;this.max=
c},setAxisTranslation:function(a){var b=this.max-this.min,c=0,d,e=0,f=0,g=this.linkedParent,h=this.transA;if(this.isXAxis)g?(e=g.minPointOffset,f=g.pointRangePadding):n(this.series,function(a){var g=a.pointRange,h=a.options.pointPlacement,l=a.closestPointRange;g>b&&(g=0);c=u(c,g);e=u(e,da(h)?0:g/2);f=u(f,h==="on"?0:g);!a.noSharedTooltip&&t(l)&&(d=t(d)?I(d,l):l)}),g=this.ordinalSlope&&d?this.ordinalSlope/d:1,this.minPointOffset=e*=g,this.pointRangePadding=f*=g,this.pointRange=I(c,b),this.closestPointRange=
d;if(a)this.oldTransA=h;this.translationSlope=this.transA=h=this.len/(b+f||1);this.transB=this.horiz?this.left:this.bottom;this.minPixelPadding=h*e},setTickPositions:function(a){var b=this,c=b.chart,d=b.options,e=b.isLog,f=b.isDatetimeAxis,g=b.isXAxis,h=b.isLinked,i=b.options.tickPositioner,j=d.maxPadding,k=d.minPadding,l=d.tickInterval,m=d.minTickInterval,o=d.tickPixelInterval,q=b.categories;h?(b.linkedParent=c[g?"xAxis":"yAxis"][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=p(c.min,c.dataMin),
b.max=p(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&ua(11,1)):(b.min=p(b.userMin,d.min,b.dataMin),b.max=p(b.userMax,d.max,b.dataMax));if(e)!a&&I(b.min,p(b.dataMin,b.min))<=0&&ua(10,1),b.min=ia(ma(b.min)),b.max=ia(ma(b.max));if(b.range&&(b.userMin=b.min=u(b.min,b.max-b.range),b.userMax=b.max,a))b.range=null;b.beforePadding&&b.beforePadding();b.adjustForMinRange();if(!q&&!b.usePercentage&&!h&&t(b.min)&&t(b.max)&&(c=b.max-b.min)){if(!t(d.min)&&!t(b.userMin)&&k&&(b.dataMin<0||!b.ignoreMinPadding))b.min-=
c*k;if(!t(d.max)&&!t(b.userMax)&&j&&(b.dataMax>0||!b.ignoreMaxPadding))b.max+=c*j}b.tickInterval=b.min===b.max||b.min===void 0||b.max===void 0?1:h&&!l&&o===b.linkedParent.options.tickPixelInterval?b.linkedParent.tickInterval:p(l,q?1:(b.max-b.min)*o/(b.len||1));g&&!a&&n(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();if(b.postProcessTickInterval)b.tickInterval=b.postProcessTickInterval(b.tickInterval);
if(b.pointRange)b.tickInterval=u(b.pointRange,b.tickInterval);if(!l&&b.tickInterval<m)b.tickInterval=m;if(!f&&!e&&!l)b.tickInterval=mb(b.tickInterval,null,lb(b.tickInterval),d);b.minorTickInterval=d.minorTickInterval==="auto"&&b.tickInterval?b.tickInterval/5:d.minorTickInterval;b.tickPositions=a=d.tickPositions?[].concat(d.tickPositions):i&&i.apply(b,[b.min,b.max]);if(!a)a=f?(b.getNonLinearTimeTicks||Eb)(Cb(b.tickInterval,d.units),b.min,b.max,d.startOfWeek,b.ordinalPositions,b.closestPointRange,!0):
e?b.getLogTickPositions(b.tickInterval,b.min,b.max):b.getLinearTickPositions(b.tickInterval,b.min,b.max),b.tickPositions=a;if(!h)e=a[0],f=a[a.length-1],h=b.minPointOffset||0,d.startOnTick?b.min=e:b.min-h>e&&a.shift(),d.endOnTick?b.max=f:b.max+h<f&&a.pop(),a.length===1&&(b.min-=0.001,b.max+=0.001)},setMaxTicks:function(){var a=this.chart,b=a.maxTicks||{},c=this.tickPositions,d=this._maxTicksKey=[this.xOrY,this.pos,this.len].join("-");if(!this.isLinked&&!this.isDatetimeAxis&&c&&c.length>(b[d]||0)&&
this.options.alignTicks!==!1)b[d]=c.length;a.maxTicks=b},adjustTickAmount:function(){var a=this._maxTicksKey,b=this.tickPositions,c=this.chart.maxTicks;if(c&&c[a]&&!this.isDatetimeAxis&&!this.categories&&!this.isLinked&&this.options.alignTicks!==!1){var d=this.tickAmount,e=b.length;this.tickAmount=a=c[a];if(e<a){for(;b.length<a;)b.push(ia(b[b.length-1]+this.tickInterval));this.transA*=(e-1)/(a-1);this.max=b[b.length-1]}if(t(d)&&a!==d)this.isDirty=!0}},setScale:function(){var a=this.stacks,b,c,d,e;
this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();e=this.len!==this.oldAxisLength;n(this.series,function(a){if(a.isDirtyData||a.isDirty||a.xAxis.isDirty)d=!0});if(e||d||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax){if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].total=null;this.forceRedraw=!1;this.getSeriesExtremes();this.setTickPositions();this.oldUserMin=this.userMin;this.oldUserMax=this.userMax;if(!this.isDirty)this.isDirty=
e||this.min!==this.oldMin||this.max!==this.oldMax}else if(!this.isXAxis){if(this.oldStacks)a=this.stacks=this.oldStacks;for(b in a)for(c in a[b])a[b][c].cum=a[b][c].total}this.setMaxTicks()},setExtremes:function(a,b,c,d,e){var f=this,g=f.chart,c=p(c,!0),e=r(e,{min:a,max:b});C(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.isDirtyExtremes=!0;c&&g.redraw(d)})},zoom:function(a,b){this.allowZoomOutside||(t(this.dataMin)&&a<=this.dataMin&&(a=v),t(this.dataMax)&&b>=this.dataMax&&(b=v));this.displayBtn=
a!==v||b!==v;this.setExtremes(a,b,!1,v,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=b.offsetRight||0,e=this.horiz,f,g;this.left=g=p(b.left,a.plotLeft+c);this.top=f=p(b.top,a.plotTop);this.width=c=p(b.width,a.plotWidth-c+d);this.height=b=p(b.height,a.plotHeight);this.bottom=a.chartHeight-b-f;this.right=a.chartWidth-c-g;this.len=u(e?c:b,0);this.pos=e?g:f},getExtremes:function(){var a=this.isLog;return{min:a?ia(ea(this.min)):this.min,max:a?ia(ea(this.max)):
this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=b?ea(this.min):this.min,b=b?ea(this.max):this.max;c>a||a===null?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},addPlotBand:function(a){this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(a,b){var c=(new tb(this,a)).render(),d=this.userOptions;b&&(d[b]=d[b]||[],d[b].push(a));this.plotLinesAndBands.push(c);
return c},autoLabelAlign:function(a){a=(p(a,0)-this.side*90+720)%360;return a>15&&a<165?"right":a>195&&a<345?"left":"center"},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.tickPositions,f=a.ticks,g=a.horiz,h=a.side,i=b.inverted?[1,0,3,2][h]:h,j,k=0,l,m=0,o=d.title,q=d.labels,ka=0,D=b.axisOffset,F=b.clipOffset,s=[-1,1,1,-1][h],r,w=1,x=p(q.maxStaggerLines,5),Ga,G,H,B;a.hasData=j=a.hasVisibleSeries||t(a.min)&&t(a.max)&&!!e;a.showAxis=b=j||p(d.showEmpty,!0);a.staggerLines=a.horiz&&
q.staggerLines;if(!a.axisGroup)a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(),a.labelGroup=c.g("axis-labels").attr({zIndex:q.zIndex||7}).add();if(j||a.isLinked){a.labelAlign=p(q.align||a.autoLabelAlign(q.rotation));n(e,function(b){f[b]?f[b].addLabel():f[b]=new La(a,b)});if(a.horiz&&!a.staggerLines&&x&&!q.rotation){for(r=a.reversed?[].concat(e).reverse():e;w<x;){j=[];Ga=!1;for(q=0;q<r.length;q++)G=r[q],H=(H=f[G].label&&f[G].label.bBox)?
H.width:0,B=q%w,H&&(G=a.translate(G),j[B]!==v&&G<j[B]&&(Ga=!0),j[B]=G+H);if(Ga)w++;else break}if(w>1)a.staggerLines=w}n(e,function(b){if(h===0||h===2||{1:"left",3:"right"}[h]===a.labelAlign)ka=u(f[b].getLabelSize(),ka)});if(a.staggerLines)ka*=a.staggerLines,a.labelOffset=ka}else for(r in f)f[r].destroy(),delete f[r];if(o&&o.text&&o.enabled!==!1){if(!a.axisTitle)a.axisTitle=c.text(o.text,0,0,o.useHTML).attr({zIndex:7,rotation:o.rotation||0,align:o.textAlign||{low:"left",middle:"center",high:"right"}[o.align]}).css(o.style).add(a.axisGroup),
a.axisTitle.isNew=!0;if(b)k=a.axisTitle.getBBox()[g?"height":"width"],m=p(o.margin,g?5:10),l=o.offset;a.axisTitle[b?"show":"hide"]()}a.offset=s*p(d.offset,D[h]);a.axisTitleMargin=p(l,ka+m+(h!==2&&ka&&s*d.labels[g?"y":"x"]));D[h]=u(D[h],a.axisTitleMargin+k+s*a.offset);F[i]=u(F[i],d.lineWidth)},getLinePath:function(a){var b=this.chart,c=this.opposite,d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d;this.lineTop=d=b.chartHeight-this.bottom-(c?this.height:0)+d;c||(a*=-1);return b.renderer.crispLine(["M",
e?this.left:f,e?d:this.top,"L",e?b.chartWidth-this.right:f,e?d:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=this.len,e=this.options.title,f=a?b:c,g=this.opposite,h=this.offset,i=A(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+(this.side===2?i:0);return{x:a?d:b+(g?this.width:0)+h+(e.x||0),y:a?b-(g?this.height:0)+h:d+(e.y||0)}},render:function(){var a=this,
b=a.chart,c=b.renderer,d=a.options,e=a.isLog,f=a.isLinked,g=a.tickPositions,h=a.axisTitle,i=a.stacks,j=a.ticks,k=a.minorTicks,l=a.alternateBands,m=d.stackLabels,o=d.alternateGridColor,q=a.tickmarkOffset,p=d.lineWidth,D,F=b.hasRendered&&t(a.oldMin)&&!isNaN(a.oldMin);D=a.hasData;var u=a.showAxis,s,r;n([j,k,l],function(a){for(var b in a)a[b].isActive=!1});if(D||f)if(a.minorTickInterval&&!a.categories&&n(a.getMinorTickPositions(),function(b){k[b]||(k[b]=new La(a,b,"minor"));F&&k[b].isNew&&k[b].render(null,
!0);k[b].render(null,!1,1)}),g.length&&(n(g.slice(1).concat([g[0]]),function(b,c){c=c===g.length-1?0:c+1;if(!f||b>=a.min&&b<=a.max)j[b]||(j[b]=new La(a,b)),F&&j[b].isNew&&j[b].render(c,!0),j[b].render(c,!1,1)}),q&&a.min===0&&(j[-1]||(j[-1]=new La(a,-1,null,!0)),j[-1].render(-1))),o&&n(g,function(b,c){if(c%2===0&&b<a.max)l[b]||(l[b]=new tb(a)),s=b+q,r=g[c+1]!==v?g[c+1]+q:a.max,l[b].options={from:e?ea(s):s,to:e?ea(r):r,color:o},l[b].render(),l[b].isActive=!0}),!a._addedPlotLB)n((d.plotLines||[]).concat(d.plotBands||
[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0;n([j,k,l],function(a){var c,d,e=[],f=Ca?Ca.duration||500:0,g=function(){for(d=e.length;d--;)a[e[d]]&&!a[e[d]].isActive&&(a[e[d]].destroy(),delete a[e[d]])};for(c in a)if(!a[c].isActive)a[c].render(c,!1,0),a[c].isActive=!1,e.push(c);a===l||!b.hasRendered||!f?g():f&&setTimeout(g,f)});if(p)D=a.getLinePath(p),a.axisLine?a.axisLine.animate({d:D}):a.axisLine=c.path(D).attr({stroke:d.lineColor,"stroke-width":p,zIndex:7}).add(a.axisGroup),a.axisLine[u?
"show":"hide"]();if(h&&u)h[h.isNew?"attr":"animate"](a.getTitlePosition()),h.isNew=!1;if(m&&m.enabled){var w,x,d=a.stackTotalGroup;if(!d)a.stackTotalGroup=d=c.g("stack-labels").attr({visibility:"visible",zIndex:6}).add();d.translate(b.plotLeft,b.plotTop);for(w in i)for(x in c=i[w],c)c[x].render(d)}a.isDirty=!1},removePlotBandOrLine:function(a){for(var b=this.plotLinesAndBands,c=this.options,d=this.userOptions,e=b.length;e--;)b[e].id===a&&b[e].destroy();n([c.plotLines||[],d.plotLines||[],c.plotBands||
[],d.plotBands||[]],function(b){for(e=b.length;e--;)b[e].id===a&&fa(b,b[e])})},setTitle:function(a,b){this.update({title:a},b)},redraw:function(){var a=this.chart.pointer;a.reset&&a.reset(!0);this.render();n(this.plotLinesAndBands,function(a){a.render()});n(this.series,function(a){a.isDirty=!0})},buildStacks:function(){this.isXAxis||n(this.series,function(a){a.setStackedPoints()})},setCategories:function(a,b){this.update({categories:a},b)},destroy:function(a){var b=this,c=b.stacks,d,e=b.plotLinesAndBands;
a||aa(b);for(d in c)Ja(c[d]),c[d]=null;n([b.ticks,b.minorTicks,b.alternateBands],function(a){Ja(a)});for(a=e.length;a--;)e[a].destroy();n("stackTotalGroup,axisLine,axisGroup,gridGroup,labelGroup,axisTitle".split(","),function(a){b[a]&&(b[a]=b[a].destroy())})}};ub.prototype={init:function(a,b){var c=b.borderWidth,d=b.style,e=A(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape,null,null,b.useHTML,null,"tooltip").attr({padding:e,
fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).hide().add();Z||this.label.shadow(b.shadow);this.shared=b.shared},destroy:function(){n(this.crosshairs,function(a){a&&a.destroy()});if(this.label)this.label=this.label.destroy();clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,c,d){var e=this,f=e.now,g=e.options.animation!==!1&&!e.isHidden;r(f,{x:g?(2*f.x+a)/3:a,y:g?(f.y+b)/2:b,anchorX:g?(2*f.anchorX+c)/3:c,anchorY:g?(f.anchorY+
d)/2:d});e.label.attr(f);if(g&&(P(a-f.x)>1||P(b-f.y)>1))clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,b,c,d)},32)},hide:function(){var a=this,b;clearTimeout(this.hideTimer);if(!this.isHidden)b=this.chart.hoverPoints,this.hideTimer=setTimeout(function(){a.label.fadeOut();a.isHidden=!0},p(this.options.hideDelay,500)),b&&n(b,function(a){a.setState()}),this.chart.hoverPoints=null},hideCrosshairs:function(){n(this.crosshairs,function(a){a&&a.hide()})},getAnchor:function(a,
b){var c,d=this.chart,e=d.inverted,f=d.plotTop,g=0,h=0,i,a=ha(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===v&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-f]);c||(n(a,function(a){i=a.series.yAxis;g+=a.plotX;h+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&i?i.top-f:0)}),g/=a.length,h/=a.length,c=[e?d.plotWidth-h:g,this.shared&&!e&&a.length>1&&b?b.chartY-f:e?d.plotHeight-g:h]);return Na(c,s)},getPosition:function(a,b,c){var d=this.chart,e=d.plotLeft,f=d.plotTop,g=d.plotWidth,
h=d.plotHeight,i=p(this.options.distance,12),j=c.plotX,c=c.plotY,d=j+e+(d.inverted?i:-a-i),k=c-b+f+15,l;d<7&&(d=e+u(j,0)+i);d+a>e+g&&(d-=d+a-(e+g),k=c-b+f-i,l=!0);k<f+5&&(k=f+5,l&&c>=k&&c<=k+b&&(k=c+f+i));k+b>f+h&&(k=u(f,f+h-b-i));return{x:d,y:k}},defaultFormatter:function(a){var b=this.points||ha(this),c=b[0].series,d;d=[c.tooltipHeaderFormatter(b[0])];n(b,function(a){c=a.series;d.push(c.tooltipFormatter&&c.tooltipFormatter(a)||a.point.tooltipFormatter(c.tooltipOptions.pointFormat))});d.push(a.options.footerFormat||
"");return d.join("")},refresh:function(a,b){var c=this.chart,d=this.label,e=this.options,f,g,h,i={},j,k=[];j=e.formatter||this.defaultFormatter;var i=c.hoverPoints,l,m=e.crosshairs;h=this.shared;clearTimeout(this.hideTimer);this.followPointer=ha(a)[0].series.tooltipOptions.followPointer;g=this.getAnchor(a,b);f=g[0];g=g[1];h&&(!a.series||!a.series.noSharedTooltip)?(c.hoverPoints=a,i&&n(i,function(a){a.setState()}),n(a,function(a){a.setState("hover");k.push(a.getLabelConfig())}),i={x:a[0].category,
y:a[0].y},i.points=k,a=a[0]):i=a.getLabelConfig();j=j.call(i,this);i=a.series;h=h||!i.isCartesian||i.tooltipOutsidePlot||c.isInsidePlot(f,g);j===!1||!h?this.hide():(this.isHidden&&(Wa(d),d.attr("opacity",1).show()),d.attr({text:j}),l=e.borderColor||a.color||i.color||"#606060",d.attr({stroke:l}),this.updatePosition({plotX:f,plotY:g}),this.isHidden=!1);if(m){m=ha(m);for(d=m.length;d--;)if(i=a.series,e=i[d?"yAxis":"xAxis"],m[d]&&e)if(h=d?p(a.stackY,a.y):a.x,e.isLog&&(h=ma(h)),i.modifyValue&&(h=i.modifyValue(h)),
e=e.getPlotLinePath(h,1),this.crosshairs[d])this.crosshairs[d].attr({d:e,visibility:"visible"});else{h={"stroke-width":m[d].width||1,stroke:m[d].color||"#C0C0C0",zIndex:m[d].zIndex||2};if(m[d].dashStyle)h.dashstyle=m[d].dashStyle;this.crosshairs[d]=c.renderer.path(e).attr(h).add()}}C(c,"tooltipRefresh",{text:j,x:f+c.plotLeft,y:g+c.plotTop,borderColor:l})},updatePosition:function(a){var b=this.chart,c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(s(c.x),
s(c.y),a.plotX+b.plotLeft,a.plotY+b.plotTop)}};vb.prototype={init:function(a,b){var c=Z?"":b.chart.zoomType,d=a.inverted,e;this.options=b;this.chart=a;this.zoomX=e=/x/.test(c);this.zoomY=c=/y/.test(c);this.zoomHor=e&&!d||c&&d;this.zoomVert=c&&!d||e&&d;this.pinchDown=[];this.lastValidTouch={};if(b.tooltip.enabled)a.tooltip=new ub(a,b.tooltip);this.setDOMEvents()},normalize:function(a){var b,c,a=a||E.event;if(!a.target)a.target=a.srcElement;a=Sb(a);c=a.touches?a.touches.item(0):a;this.chartPosition=
b=Xb(this.chart.container);return r(a,{chartX:s(p(c.pageX,c.clientX)-b.left),chartY:s(p(c.pageY,c.clientY)-b.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};n(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},getIndex:function(a){var b=this.chart;return b.inverted?b.plotHeight+b.plotTop-a.chartY:a.chartX-b.plotLeft},runPointActions:function(a){var b=this.chart,c=b.series,d=b.tooltip,e,f=b.hoverPoint,g=b.hoverSeries,
h,i,j=b.chartWidth,k=this.getIndex(a);if(d&&this.options.tooltip.shared&&(!g||!g.noSharedTooltip)){e=[];h=c.length;for(i=0;i<h;i++)if(c[i].visible&&c[i].options.enableMouseTracking!==!1&&!c[i].noSharedTooltip&&c[i].tooltipPoints.length&&(b=c[i].tooltipPoints[k],b.series))b._dist=P(k-b.clientX),j=I(j,b._dist),e.push(b);for(h=e.length;h--;)e[h]._dist>j&&e.splice(h,1);if(e.length&&e[0].clientX!==this.hoverX)d.refresh(e,a),this.hoverX=e[0].clientX}if(g&&g.tracker){if((b=g.tooltipPoints[k])&&b!==f)b.onMouseOver(a)}else d&&
d.followPointer&&!d.isHidden&&(a=d.getAnchor([{}],a),d.updatePosition({plotX:a[0],plotY:a[1]}))},reset:function(a){var b=this.chart,c=b.hoverSeries,d=b.hoverPoint,e=b.tooltip,b=e&&e.shared?b.hoverPoints:d;(a=a&&e&&b)&&ha(b)[0].plotX===v&&(a=!1);if(a)e.refresh(b);else{if(d)d.onMouseOut();if(c)c.onMouseOut();e&&(e.hide(),e.hideCrosshairs());this.hoverX=null}},scaleGroups:function(a,b){var c=this.chart,d;n(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&(e.group.attr(d),e.markerGroup&&
(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},pinchTranslateDirection:function(a,b,c,d,e,f,g){var h=this.chart,i=a?"x":"y",j=a?"X":"Y",k="chart"+j,l=a?"width":"height",m=h["plot"+(a?"Left":"Top")],o,q,p=1,n=h.inverted,u=h.bounds[a?"h":"v"],s=b.length===1,t=b[0][k],r=c[0][k],w=!s&&b[1][k],v=!s&&c[1][k],x,c=function(){!s&&P(t-w)>20&&(p=P(r-v)/P(t-w));q=(m-r)/p+t;o=h["plot"+(a?"Width":"Height")]/p};c();b=q;
b<u.min?(b=u.min,x=!0):b+o>u.max&&(b=u.max-o,x=!0);x?(r-=0.8*(r-g[i][0]),s||(v-=0.8*(v-g[i][1])),c()):g[i]=[r,v];n||(f[i]=q-m,f[l]=o);f=n?1/p:p;e[l]=o;e[i]=b;d[n?a?"scaleY":"scaleX":"scale"+j]=p;d["translate"+j]=f*m+(r-f*t)},pinch:function(a){var b=this,c=b.chart,d=b.pinchDown,e=c.tooltip&&c.tooltip.options.followTouchMove,f=a.touches,g=f.length,h=b.lastValidTouch,i=b.zoomHor||b.pinchHor,j=b.zoomVert||b.pinchVert,k=i||j,l=b.selectionMarker,m={},o={};a.type==="touchstart"&&(e||k)&&a.preventDefault();
Na(f,function(a){return b.normalize(a)});if(a.type==="touchstart")n(f,function(a,b){d[b]={chartX:a.chartX,chartY:a.chartY}}),h.x=[d[0].chartX,d[1]&&d[1].chartX],h.y=[d[0].chartY,d[1]&&d[1].chartY],n(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,e=a.toPixels(a.dataMin),f=a.toPixels(a.dataMax),g=I(e,f),e=u(e,f);b.min=I(a.pos,g-d);b.max=u(a.pos+a.len,e+d)}});else if(d.length){if(!l)b.selectionMarker=l=r({destroy:xa},c.plotBox);i&&b.pinchTranslateDirection(!0,
d,f,m,l,o,h);j&&b.pinchTranslateDirection(!1,d,f,m,l,o,h);b.hasPinched=k;b.scaleGroups(m,o);!k&&e&&g===1&&this.runPointActions(b.normalize(a))}},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,a=a.chartY,e=this.zoomHor,f=this.zoomVert,g=b.plotLeft,h=b.plotTop,i=b.plotWidth,j=b.plotHeight,k,l=this.mouseDownX,m=this.mouseDownY;d<g?d=g:d>g+i&&(d=
g+i);a<h?a=h:a>h+j&&(a=h+j);this.hasDragged=Math.sqrt(Math.pow(l-d,2)+Math.pow(m-a,2));if(this.hasDragged>10){k=b.isInsidePlot(l-g,m-h);if(b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&k&&!this.selectionMarker)this.selectionMarker=b.renderer.rect(g,h,e?1:i,f?1:j,0).attr({fill:c.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add();this.selectionMarker&&e&&(e=d-l,this.selectionMarker.attr({width:P(e),x:(e>0?0:e)+l}));this.selectionMarker&&f&&(e=a-m,this.selectionMarker.attr({height:P(e),
y:(e>0?0:e)+m}));k&&!this.selectionMarker&&c.panning&&b.pan(d)}},drop:function(a){var b=this.chart,c=this.hasPinched;if(this.selectionMarker){var d={xAxis:[],yAxis:[],originalEvent:a.originalEvent||a},e=this.selectionMarker,f=e.x,g=e.y,h;if(this.hasDragged||c)n(b.axes,function(a){if(a.zoomEnabled){var b=a.horiz,c=a.toValue(b?f:g),b=a.toValue(b?f+e.width:g+e.height);!isNaN(c)&&!isNaN(b)&&(d[a.xOrY+"Axis"].push({axis:a,min:I(c,b),max:u(c,b)}),h=!0)}}),h&&C(b,"selection",d,function(a){b.zoom(r(a,c?{animation:!1}:
null))});this.selectionMarker=this.selectionMarker.destroy();c&&this.scaleGroups()}if(b)M(b.container,{cursor:b._cursor}),b.cancelClick=this.hasDragged>10,b.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[]},onContainerMouseDown:function(a){a=this.normalize(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(a){this.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition,d=b.hoverSeries,a=Sb(a);c&&d&&d.isCartesian&&!b.isInsidePlot(a.pageX-
c.left-b.plotLeft,a.pageY-c.top-b.plotTop)&&this.reset()},onContainerMouseLeave:function(){this.reset();this.chartPosition=null},onContainerMouseMove:function(a){var b=this.chart,a=this.normalize(a);a.returnValue=!1;b.mouseIsDown==="mousedown"&&this.drag(a);b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)&&!b.openMenu&&this.runPointActions(a)},inClass:function(a,b){for(var c;a;){if(c=w(a,"class"))if(c.indexOf(b)!==-1)return!0;else if(c.indexOf("highcharts-container")!==-1)return!1;a=a.parentNode}},
onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;if(b&&!b.options.stickyTracking&&!this.inClass(a.toElement||a.relatedTarget,"highcharts-tooltip"))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop,f=b.inverted,g,h,i,a=this.normalize(a);a.cancelBubble=!0;if(!b.cancelClick)c&&this.inClass(a.target,"highcharts-tracker")?(g=this.chartPosition,h=c.plotX,i=c.plotY,r(c,{pageX:g.left+d+(f?b.plotWidth-i:h),pageY:g.top+e+(f?b.plotHeight-h:i)}),C(c.series,
"click",r(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(r(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&C(b,"click",a))},onContainerTouchStart:function(a){var b=this.chart;a.touches.length===1?(a=this.normalize(a),b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)?(this.runPointActions(a),this.pinch(a)):this.reset()):a.touches.length===2&&this.pinch(a)},onContainerTouchMove:function(a){(a.touches.length===1||a.touches.length===2)&&this.pinch(a)},onDocumentTouchEnd:function(a){this.drop(a)},
setDOMEvents:function(){var a=this,b=a.chart.container,c;this._events=c=[[b,"onmousedown","onContainerMouseDown"],[b,"onmousemove","onContainerMouseMove"],[b,"onclick","onContainerClick"],[b,"mouseleave","onContainerMouseLeave"],[z,"mousemove","onDocumentMouseMove"],[z,"mouseup","onDocumentMouseUp"]];hb&&c.push([b,"ontouchstart","onContainerTouchStart"],[b,"ontouchmove","onContainerTouchMove"],[z,"touchend","onDocumentTouchEnd"]);n(c,function(b){a["_"+b[2]]=function(c){a[b[2]](c)};b[1].indexOf("on")===
0?b[0][b[1]]=a["_"+b[2]]:J(b[0],b[1],a["_"+b[2]])})},destroy:function(){var a=this;n(a._events,function(b){b[1].indexOf("on")===0?b[0][b[1]]=null:aa(b[0],b[1],a["_"+b[2]])});delete a._events;clearInterval(a.tooltipTimeout)}};wb.prototype={init:function(a,b){var c=this,d=b.itemStyle,e=p(b.padding,8),f=b.itemMarginTop||0;this.options=b;if(b.enabled)c.baseline=A(d.fontSize)+3+f,c.itemStyle=d,c.itemHiddenStyle=x(d,b.itemHiddenStyle),c.itemMarginTop=f,c.padding=e,c.initialItemX=e,c.initialItemY=e-5,c.maxItemWidth=
0,c.chart=a,c.itemHeight=0,c.lastLineHeight=0,c.render(),J(c.chart,"endResize",function(){c.positionCheckboxes()})},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,g=this.itemHiddenStyle.color,c=b?c.itemStyle.color:g,h=b?a.color:g,g=a.options&&a.options.marker,i={stroke:h,fill:h},j;d&&d.css({fill:c,color:c});e&&e.attr({stroke:h});if(f){if(g&&f.isMarker)for(j in g=a.convertAttribs(g),g)d=g[j],d!==v&&(i[j]=d);f.attr(i)}},positionItem:function(a){var b=this.options,
c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;a.legendGroup&&a.legendGroup.translate(b?e:this.legendWidth-e-2*c-4,d);if(f)f.x=e,f.y=d},destroyItem:function(a){var b=a.checkbox;n(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&Ta(a.checkbox)},destroy:function(){var a=this.group,b=this.box;if(b)this.box=b.destroy();if(a)this.group=a.destroy()},positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||
this.legendHeight;if(b)c=b.translateY,n(this.allItems,function(e){var f=e.checkbox,g;f&&(g=c+f.y+(a||0)+3,M(f,{left:b.translateX+e.legendItemWidth+f.x-20+"px",top:g+"px",display:g>c-6&&g<c+d-6?"":R}))})},renderTitle:function(){var a=this.padding,b=this.options.title,c=0;if(b.text){if(!this.title)this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group);a=this.title.getBBox();c=a.height;this.offsetWidth=a.width;this.contentGroup.attr({translateY:c})}this.titleHeight=
c},renderItem:function(a){var B;var b=this,c=b.chart,d=c.renderer,e=b.options,f=e.layout==="horizontal",g=e.symbolWidth,h=e.symbolPadding,i=b.itemStyle,j=b.itemHiddenStyle,k=b.padding,l=f?p(e.itemDistance,8):0,m=!e.rtl,o=e.width,q=e.itemMarginBottom||0,n=b.itemMarginTop,s=b.initialItemX,t=a.legendItem,r=a.series||a,w=r.options,v=w.showCheckbox,A=e.useHTML;if(!t&&(a.legendGroup=d.g("legend-item").attr({zIndex:1}).add(b.scrollGroup),r.drawLegendSymbol(b,a),a.legendItem=t=d.text(e.labelFormat?Aa(e.labelFormat,
a):e.labelFormatter.call(a),m?g+h:-h,b.baseline,A).css(x(a.visible?i:j)).attr({align:m?"left":"right",zIndex:2}).add(a.legendGroup),(A?t:a.legendGroup).on("mouseover",function(){a.setState("hover");t.css(b.options.itemHoverStyle)}).on("mouseout",function(){t.css(a.visible?i:j);a.setState()}).on("click",function(b){var c=function(){a.setVisible()},b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):C(a,"legendItemClick",b,c)}),b.colorizeItem(a,a.visible),w&&v))a.checkbox=T("input",
{type:"checkbox",checked:a.selected,defaultChecked:a.selected},e.itemCheckboxStyle,c.container),J(a.checkbox,"click",function(b){C(a,"checkboxClick",{checked:b.target.checked},function(){a.select()})});d=t.getBBox();B=a.legendItemWidth=e.itemWidth||g+h+d.width+l+(v?20:0),e=B;b.itemHeight=g=d.height;if(f&&b.itemX-s+e>(o||c.chartWidth-2*k-s))b.itemX=s,b.itemY+=n+b.lastLineHeight+q,b.lastLineHeight=0;b.maxItemWidth=u(b.maxItemWidth,e);b.lastItemY=n+b.itemY+q;b.lastLineHeight=u(g,b.lastLineHeight);a._legendItemPos=
[b.itemX,b.itemY];f?b.itemX+=e:(b.itemY+=n+g+q,b.lastLineHeight=g);b.offsetWidth=o||u((f?b.itemX-s-l:e)+k,b.offsetWidth)},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.group,e,f,g,h,i=a.box,j=a.options,k=a.padding,l=j.borderWidth,m=j.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;if(!d)a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup);a.renderTitle();e=[];n(b.series,
function(a){var b=a.options;b.showInLegend&&!t(b.linkedTo)&&(e=e.concat(a.legendItems||(b.legendType==="point"?a.data:a)))});Kb(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});j.reversed&&e.reverse();a.allItems=e;a.display=f=!!e.length;n(e,function(b){a.renderItem(b)});g=j.width||a.offsetWidth;h=a.lastItemY+a.lastLineHeight+a.titleHeight;h=a.handleOverflow(h);if(l||m){g+=k;h+=k;if(i){if(g>0&&h>0)i[i.isNew?"attr":"animate"](i.crisp(null,null,null,
g,h)),i.isNew=!1}else a.box=i=c.rect(0,0,g,h,j.borderRadius,l||0).attr({stroke:j.borderColor,"stroke-width":l||0,fill:m||R}).add(d).shadow(j.shadow),i.isNew=!0;i[f?"show":"hide"]()}a.legendWidth=g;a.legendHeight=h;n(e,function(b){a.positionItem(b)});f&&d.align(r({width:g,height:h},j),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+(e.verticalAlign==="top"?-f:f)-this.padding,g=e.maxHeight,
h=this.clipRect,i=e.navigation,j=p(i.animation,!0),k=i.arrowSize||12,l=this.nav;e.layout==="horizontal"&&(f/=2);g&&(f=I(f,g));if(a>f&&!e.useHTML){this.clipHeight=c=f-20-this.titleHeight;this.pageCount=ja(a/c);this.currentPage=p(this.currentPage,1);this.fullHeight=a;if(!h)h=b.clipRect=d.clipRect(0,0,9999,0),b.contentGroup.clip(h);h.attr({height:c});if(!l)this.nav=l=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,k,k).on("click",function(){b.scroll(-1,j)}).add(l),this.pager=d.text("",
15,10).css(i.style).add(l),this.down=d.symbol("triangle-down",0,0,k,k).on("click",function(){b.scroll(1,j)}).add(l);b.scroll(0);a=f}else if(l)h.attr({height:c.chartHeight}),l.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0;return a},scroll:function(a,b){var c=this.pageCount,d=this.currentPage+a,e=this.clipHeight,f=this.options.navigation,g=f.activeColor,h=f.inactiveColor,f=this.pager,i=this.padding;d>c&&(d=c);if(d>0)b!==v&&Ka(b,this.chart),this.nav.attr({translateX:i,translateY:e+7+
this.titleHeight,visibility:"visible"}),this.up.attr({fill:d===1?h:g}).css({cursor:d===1?"default":"pointer"}),f.attr({text:d+"/"+this.pageCount}),this.down.attr({x:18+this.pager.getBBox().width,fill:d===c?h:g}).css({cursor:d===c?"default":"pointer"}),e=-I(e*(d-1),this.fullHeight-e+i)+1,this.scrollGroup.animate({translateY:e}),f.attr({text:d+"/"+c}),this.currentPage=d,this.positionCheckboxes(e)}};xb.prototype={init:function(a,b){var c,d=a.series;a.series=null;c=x(O,a);c.series=a.series=d;var d=c.chart,
e=d.margin,e=U(e)?e:[e,e,e,e];this.optionsMarginTop=p(d.marginTop,e[0]);this.optionsMarginRight=p(d.marginRight,e[1]);this.optionsMarginBottom=p(d.marginBottom,e[2]);this.optionsMarginLeft=p(d.marginLeft,e[3]);e=d.events;this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var f=this,g;f.index=Ea.length;Ea.push(f);d.reflow!==!1&&J(f,"load",function(){f.initReflow()});if(e)for(g in e)J(f,g,e[g]);f.xAxis=[];f.yAxis=[];
f.animation=Z?!1:p(d.animation,!0);f.pointCount=0;f.counters=new Jb;f.firstRender()},initSeries:function(a){var b=this.options.chart;(b=$[a.type||b.type||b.defaultSeriesType])||ua(17,!0);b=new b;b.init(this,a);return b},addSeries:function(a,b,c){var d,e=this;a&&(b=p(b,!0),C(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;b&&e.redraw(c)}));return d},addAxis:function(a,b,c,d){var e=b?"xAxis":"yAxis",f=this.options;new db(this,x(a,{index:this[e].length,isX:b}));f[e]=ha(f[e]||
{});f[e].push(a);p(c,!0)&&this.redraw(d)},isInsidePlot:function(a,b,c){var d=c?b:a,a=c?a:b;return d>=0&&d<=this.plotWidth&&a>=0&&a<=this.plotHeight},adjustTickAmounts:function(){this.options.chart.alignTicks!==!1&&n(this.axes,function(a){a.adjustTickAmount()});this.maxTicks=null},redraw:function(a){var b=this.axes,c=this.series,d=this.pointer,e=this.legend,f=this.isDirtyLegend,g,h,i=this.isDirtyBox,j=c.length,k=j,l=this.renderer,m=l.isHidden(),o=[];Ka(a,this);m&&this.cloneRenderTo();for(this.layOutTitles();k--;)if(a=
c[k],a.options.stacking&&(g=!0,a.isDirty)){h=!0;break}if(h)for(k=j;k--;)if(a=c[k],a.options.stacking)a.isDirty=!0;n(c,function(a){a.isDirty&&a.options.legendType==="point"&&(f=!0)});if(f&&e.options.enabled)e.render(),this.isDirtyLegend=!1;g&&this.getStacks();if(this.hasCartesianSeries){if(!this.isResizing)this.maxTicks=null,n(b,function(a){a.setScale()});this.adjustTickAmounts();this.getMargins();n(b,function(a){if(a.isDirtyExtremes)a.isDirtyExtremes=!1,o.push(function(){C(a,"afterSetExtremes",a.getExtremes())});
if(a.isDirty||i||g)a.redraw(),i=!0})}i&&this.drawChartBox();n(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset&&d.reset(!0);l.draw();C(this,"redraw");m&&this.cloneRenderTo(!0);n(o,function(a){a.call()})},showLoading:function(a){var b=this.options,c=this.loadingDiv,d=b.loading;if(!c)this.loadingDiv=c=T(Ba,{className:"highcharts-loading"},r(d.style,{zIndex:10,display:R}),this.container),this.loadingSpan=T("span",null,d.labelStyle,c);this.loadingSpan.innerHTML=a||
b.lang.loading;if(!this.loadingShown)M(c,{opacity:0,display:"",left:this.plotLeft+"px",top:this.plotTop+"px",width:this.plotWidth+"px",height:this.plotHeight+"px"}),Ab(c,{opacity:d.style.opacity},{duration:d.showDuration||0}),this.loadingShown=!0},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&Ab(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){M(b,{display:R})}});this.loadingShown=!1},get:function(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++)if(b[d].options.id===
a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++){e=c[d].points||[];for(b=0;b<e.length;b++)if(e[b].id===a)return e[b]}return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=ha(b.xAxis||{}),b=b.yAxis=ha(b.yAxis||{});n(c,function(a,b){a.index=b;a.isX=!0});n(b,function(a,b){a.index=b});c=c.concat(b);n(c,function(b){new db(a,b)});a.adjustTickAmounts()},getSelectedPoints:function(){var a=[];n(this.series,function(b){a=a.concat(sb(b.points||[],
function(a){return a.selected}))});return a},getSelectedSeries:function(){return sb(this.series,function(a){return a.selected})},getStacks:function(){var a=this;n(a.yAxis,function(a){if(a.stacks&&a.hasVisibleSeries)a.oldStacks=a.stacks});n(a.series,function(b){if(b.options.stacking&&(b.visible===!0||a.options.chart.ignoreHiddenSeries===!1))b.stackKey=b.type+p(b.options.stack,"")})},showResetZoom:function(){var a=this,b=O.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f=c.relativeTo===
"chart"?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,!1,f)},zoomOut:function(){var a=this;C(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?n(this.axes,function(a){b=a.zoom()}):n(a.xAxis.concat(a.yAxis),function(a){var e=a.axis,h=e.isXAxis;if(c[h?"zoomX":"zoomY"]||c[h?"pinchX":"pinchY"])b=
e.zoom(a.min,a.max),e.displayBtn&&(d=!0)});e=this.resetZoomButton;if(d&&!e)this.showResetZoom();else if(!d&&U(e))this.resetZoomButton=e.destroy();b&&this.redraw(p(this.options.chart.animation,a&&a.animation,this.pointCount<100))},pan:function(a){var b=this.xAxis[0],c=this.mouseDownX,d=b.pointRange/2,e=b.getExtremes(),f=b.translate(c-a,!0)+d,c=b.translate(c+this.plotWidth-a,!0)-d;(d=this.hoverPoints)&&n(d,function(a){a.setState()});b.series.length&&f>I(e.dataMin,e.min)&&c<u(e.dataMax,e.max)&&b.setExtremes(f,
c,!0,!1,{trigger:"pan"});this.mouseDownX=a;M(this.container,{cursor:"move"})},setTitle:function(a,b){var f;var c=this,d=c.options,e;e=d.title=x(d.title,a);f=d.subtitle=x(d.subtitle,b),d=f;n([["title",a,e],["subtitle",b,d]],function(a){var b=a[0],d=c[b],e=a[1],a=a[2];d&&e&&(c[b]=d=d.destroy());a&&a.text&&!d&&(c[b]=c.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add())});c.layOutTitles()},layOutTitles:function(){var a=0,b=this.title,
c=this.subtitle,d=this.options,e=d.title,d=d.subtitle,f=this.spacingBox.width-44;if(b&&(b.css({width:(e.width||f)+"px"}).align(r({y:15},e),!1,"spacingBox"),!e.floating&&!e.verticalAlign))a=b.getBBox().height,a>=18&&a<=25&&(a=15);c&&(c.css({width:(d.width||f)+"px"}).align(r({y:a+e.margin},d),!1,"spacingBox"),!d.floating&&!d.verticalAlign&&(a=ja(a+c.getBBox().height)));this.titleOffset=a},getChartSize:function(){var a=this.options.chart,b=this.renderToClone||this.renderTo;this.containerWidth=ib(b,"width");
this.containerHeight=ib(b,"height");this.chartWidth=u(0,a.width||this.containerWidth||600);this.chartHeight=u(0,p(a.height,this.containerHeight>19?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),Ta(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),M(b,{position:"absolute",top:"-9999px",display:"block"}),z.body.appendChild(b),
c&&b.appendChild(c))},getContainer:function(){var a,b=this.options.chart,c,d,e;this.renderTo=a=b.renderTo;e="highcharts-"+yb++;if(da(a))this.renderTo=a=z.getElementById(a);a||ua(13,!0);c=A(w(a,"data-highcharts-chart"));!isNaN(c)&&Ea[c]&&Ea[c].destroy();w(a,"data-highcharts-chart",this.index);a.innerHTML="";a.offsetWidth||this.cloneRenderTo();this.getChartSize();c=this.chartWidth;d=this.chartHeight;this.container=a=T(Ba,{className:"highcharts-container"+(b.className?" "+b.className:""),id:e},r({position:"relative",
overflow:"hidden",width:c+"px",height:d+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},b.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=b.forExport?new Fa(a,c,d,!0):new Va(a,c,d);Z&&this.renderer.create(this,a,c,d)},getMargins:function(){var a=this.options.chart,b=a.spacingTop,c=a.spacingRight,d=a.spacingBottom,a=a.spacingLeft,e,f=this.legend,g=this.optionsMarginTop,h=this.optionsMarginLeft,i=this.optionsMarginRight,j=this.optionsMarginBottom,
k=this.options.legend,l=p(k.margin,10),m=k.x,o=k.y,q=k.align,s=k.verticalAlign,r=this.titleOffset;this.resetMargins();e=this.axisOffset;if(r&&!t(g))this.plotTop=u(this.plotTop,r+this.options.title.margin+b);if(f.display&&!k.floating)if(q==="right"){if(!t(i))this.marginRight=u(this.marginRight,f.legendWidth-m+l+c)}else if(q==="left"){if(!t(h))this.plotLeft=u(this.plotLeft,f.legendWidth+m+l+a)}else if(s==="top"){if(!t(g))this.plotTop=u(this.plotTop,f.legendHeight+o+l+b)}else if(s==="bottom"&&!t(j))this.marginBottom=
u(this.marginBottom,f.legendHeight-o+l+d);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);this.hasCartesianSeries&&n(this.axes,function(a){a.getOffset()});t(h)||(this.plotLeft+=e[3]);t(g)||(this.plotTop+=e[0]);t(j)||(this.marginBottom+=e[2]);t(i)||(this.marginRight+=e[1]);this.setChartSize()},initReflow:function(){function a(a){var g=c.width||ib(d,"width"),h=c.height||ib(d,"height"),a=a?a.target:E;if(!b.hasUserSize&&g&&h&&
(a===E||a===z)){if(g!==b.containerWidth||h!==b.containerHeight)clearTimeout(e),b.reflowTimeout=e=setTimeout(function(){if(b.container)b.setSize(g,h,!1),b.hasUserSize=null},100);b.containerWidth=g;b.containerHeight=h}}var b=this,c=b.options.chart,d=b.renderTo,e;J(E,"resize",a);J(b,"destroy",function(){aa(E,"resize",a)})},setSize:function(a,b,c){var d=this,e,f,g;d.isResizing+=1;g=function(){d&&C(d,"endResize",null,function(){d.isResizing-=1})};Ka(c,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=
d.chartWidth;if(t(a))d.chartWidth=e=u(0,s(a)),d.hasUserSize=!!e;if(t(b))d.chartHeight=f=u(0,s(b));M(d.container,{width:e+"px",height:f+"px"});d.setChartSize(!0);d.renderer.setSize(e,f,c);d.maxTicks=null;n(d.axes,function(a){a.isDirty=!0;a.setScale()});n(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.getMargins();d.redraw(c);d.oldChartHeight=null;C(d,"resize");Ca===!1?g():setTimeout(g,Ca&&Ca.duration||500)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,
e=this.chartHeight,f=this.options.chart,g=f.spacingTop,h=f.spacingRight,i=f.spacingBottom,j=f.spacingLeft,k=this.clipOffset,l,m,o,q;this.plotLeft=l=s(this.plotLeft);this.plotTop=m=s(this.plotTop);this.plotWidth=o=u(0,s(d-l-this.marginRight));this.plotHeight=q=u(0,s(e-m-this.marginBottom));this.plotSizeX=b?q:o;this.plotSizeY=b?o:q;this.plotBorderWidth=b=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:j,y:g,width:d-j-h,height:e-g-i};this.plotBox=c.plotBox={x:l,y:m,width:o,height:q};c=ja(u(b,k[3])/
2);d=ja(u(b,k[0])/2);this.clipBox={x:c,y:d,width:S(this.plotSizeX-u(b,k[1])/2-c),height:S(this.plotSizeY-u(b,k[2])/2-d)};a||n(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this.options.chart,b=a.spacingRight,c=a.spacingBottom,d=a.spacingLeft;this.plotTop=p(this.optionsMarginTop,a.spacingTop);this.marginRight=p(this.optionsMarginRight,b);this.marginBottom=p(this.optionsMarginBottom,c);this.plotLeft=p(this.optionsMarginLeft,d);this.axisOffset=[0,0,0,0];
this.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,g=this.plotBorder,h=this.plotBGImage,i=a.borderWidth||0,j=a.backgroundColor,k=a.plotBackgroundColor,l=a.plotBackgroundImage,m=a.plotBorderWidth||0,o,q=this.plotLeft,p=this.plotTop,n=this.plotWidth,s=this.plotHeight,t=this.plotBox,u=this.clipRect,r=this.clipBox;o=i+(a.shadow?8:0);if(i||j)if(e)e.animate(e.crisp(null,null,null,c-
o,d-o));else{e={fill:j||R};if(i)e.stroke=a.borderColor,e["stroke-width"]=i;this.chartBackground=b.rect(o/2,o/2,c-o,d-o,a.borderRadius,i).attr(e).add().shadow(a.shadow)}if(k)f?f.animate(t):this.plotBackground=b.rect(q,p,n,s,0).attr({fill:k}).add().shadow(a.plotShadow);if(l)h?h.animate(t):this.plotBGImage=b.image(l,q,p,n,s).add();u?u.animate({width:r.width,height:r.height}):this.clipRect=b.clipRect(r);if(m)g?g.animate(g.crisp(null,q,p,n,s)):this.plotBorder=b.rect(q,p,n,s,0,m).attr({stroke:a.plotBorderColor,
"stroke-width":m,zIndex:1}).add();this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,e,f;n(["inverted","angular","polar"],function(g){c=$[b.type||b.defaultSeriesType];f=a[g]||b[g]||c&&c.prototype[g];for(e=d&&d.length;!f&&e--;)(c=$[d[e].type])&&c.prototype[g]&&(f=!0);a[g]=f})},render:function(){var a=this,b=a.axes,c=a.renderer,d=a.options,e=d.labels,f=d.credits,g;a.setTitle();a.legend=new wb(a,d.legend);a.getStacks();n(b,function(a){a.setScale()});a.getMargins();
a.maxTicks=null;n(b,function(a){a.setTickPositions(!0);a.setMaxTicks()});a.adjustTickAmounts();a.getMargins();a.drawChartBox();a.hasCartesianSeries&&n(b,function(a){a.render()});if(!a.seriesGroup)a.seriesGroup=c.g("series-group").attr({zIndex:3}).add();n(a.series,function(a){a.translate();a.setTooltipPoints();a.render()});e.items&&n(e.items,function(b){var d=r(e.style,b.style),f=A(d.left)+a.plotLeft,g=A(d.top)+a.plotTop+12;delete d.left;delete d.top;c.text(b.html,f,g).attr({zIndex:2}).css(d).add()});
if(f.enabled&&!a.credits)g=f.href,a.credits=c.text(f.text,0,0).on("click",function(){if(g)location.href=g}).attr({align:f.position.align,zIndex:8}).css(f.style).add().align(f.position);a.hasRendered=!0},destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;C(a,"destroy");Ea[a.index]=v;a.renderTo.removeAttribute("data-highcharts-chart");aa(a);for(e=b.length;e--;)b[e]=b[e].destroy();for(e=c.length;e--;)c[e]=c[e].destroy();n("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),
function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});if(d)d.innerHTML="",aa(d),f&&Ta(d);for(e in a)delete a[e]},isReadyToRender:function(){var a=this;return!Y&&E==E.top&&z.readyState!=="complete"||Z&&!E.canvg?(Z?Ub.push(function(){a.firstRender()},a.options.global.canvasToolsURL):z.attachEvent("onreadystatechange",function(){z.detachEvent("onreadystatechange",a.firstRender);z.readyState==="complete"&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options,c=a.callback;if(a.isReadyToRender())a.getContainer(),
C(a,"init"),a.resetMargins(),a.setChartSize(),a.propFromSeries(),a.getAxes(),n(b.series||[],function(b){a.initSeries(b)}),C(a,"beforeRender"),a.pointer=new vb(a,b),a.render(),a.renderer.draw(),c&&c.apply(a,[a]),n(a.callbacks,function(b){b.apply(a,[a])}),a.cloneRenderTo(!0),C(a,"load")}};xb.prototype.callbacks=[];var Pa=function(){};Pa.prototype={init:function(a,b,c){this.series=a;this.applyOptions(b,c);this.pointAttr={};if(a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,this.color=
this.color||b[a.colorCounter++],a.colorCounter===b.length))a.colorCounter=0;a.chart.pointCount++;return this},applyOptions:function(a,b){var c=this.series,d=c.pointValKey,a=Pa.prototype.optionsToObject.call(this,a);r(this,a);this.options=this.options?r(this.options,a):a;if(d)this.y=this[d];if(this.x===v&&c)this.x=b===v?c.autoIncrement():b;return this},optionsToObject:function(a){var b,c=this.series,d=c.pointArrayMap||["y"],e=d.length,f=0,g=0;if(typeof a==="number"||a===null)b={y:a};else if(Ha(a)){b=
{};if(a.length>e){c=typeof a[0];if(c==="string")b.name=a[0];else if(c==="number")b.x=a[0];f++}for(;g<e;)b[d[g++]]=a[f++]}else if(typeof a==="object"){b=a;if(a.dataLabels)c._hasPointLabels=!0;if(a.marker)c._hasPointMarkers=!0}return b},destroy:function(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;if(b&&(this.setState(),fa(b,this),!b.length))a.hoverPoints=null;if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)aa(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);
for(c in this)this[c]=null},destroyElements:function(){for(var a="graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","),b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},select:function(a,b){var c=this,d=c.series,e=d.chart,a=p(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},
function(){c.selected=c.options.selected=a;d.options.data[na(c,d.data)]=c.options;c.setState(a&&"select");b||n(e.getSelectedPoints(),function(a){if(a.selected&&a!==c)a.selected=a.options.selected=!1,d.options.data[na(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect")})})},onMouseOver:function(a){var b=this.series,c=b.chart,d=c.tooltip,e=c.hoverPoint;if(e&&e!==this)e.onMouseOut();this.firePointEvent("mouseOver");d&&(!d.shared||b.noSharedTooltip)&&d.refresh(this,a);this.setState("hover");
c.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;if(!b||na(this,b)===-1)this.firePointEvent("mouseOut"),this.setState(),a.hoverPoint=null},tooltipFormatter:function(a){var b=this.series,c=b.tooltipOptions,d=p(c.valueDecimals,""),e=c.valuePrefix||"",f=c.valueSuffix||"";n(b.pointArrayMap||["y"],function(b){b="{point."+b;if(e||f)a=a.replace(b+"}",e+b+"}"+f);a=a.replace(b+"}",b+":,."+d+"f}")});return Aa(a,{point:this,series:this.series})},update:function(a,b,c){var d=this,
e=d.series,f=d.graphic,g,h=e.data,i=e.chart,j=e.options,b=p(b,!0);d.firePointEvent("update",{options:a},function(){d.applyOptions(a);U(a)&&(e.getAttribs(),f&&f.attr(d.pointAttr[e.state]));g=na(d,h);e.xData[g]=d.x;e.yData[g]=e.toYData?e.toYData(d):d.y;e.zData[g]=d.z;j.data[g]=d.options;e.isDirty=e.isDirtyData=i.isDirtyBox=!0;j.legendType==="point"&&i.legend.destroyItem(d);b&&i.redraw(c)})},remove:function(a,b){var c=this,d=c.series,e=d.chart,f,g=d.data;Ka(b,e);a=p(a,!0);c.firePointEvent("remove",null,
function(){f=na(c,g);g.splice(f,1);d.options.data.splice(f,1);d.xData.splice(f,1);d.yData.splice(f,1);d.zData.splice(f,1);c.destroy();d.isDirty=!0;d.isDirtyData=!0;a&&e.redraw()})},firePointEvent:function(a,b,c){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();a==="click"&&e.allowPointSelect&&(c=function(a){d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});C(this,a,b,c)},importEvents:function(){if(!this.hasImportedEvents){var a=
x(this.series.options.point,this.options).events,b;this.events=a;for(b in a)J(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a){var b=this.plotX,c=this.plotY,d=this.series,e=d.options.states,f=X[d.type].marker&&d.options.marker,g=f&&!f.enabled,h=f&&f.states[a],i=h&&h.enabled===!1,j=d.stateMarkerGraphic,k=this.marker||{},l=d.chart,m=this.pointAttr,a=a||"";if(!(a===this.state||this.selected&&a!=="select"||e[a]&&e[a].enabled===!1||a&&(i||g&&!h.enabled))){if(this.graphic)e=f&&this.graphic.symbolName&&
m[a].r,this.graphic.attr(x(m[a],e?{x:b-e,y:c-e,width:2*e,height:2*e}:{}));else{if(a&&h)e=h.radius,k=k.symbol||d.symbol,j&&j.currentSymbol!==k&&(j=j.destroy()),j?j.attr({x:b-e,y:c-e}):(d.stateMarkerGraphic=j=l.renderer.symbol(k,b-e,c-e,2*e,2*e).attr(m[a]).add(d.markerGroup),j.currentSymbol=k);if(j)j[a&&l.isInsidePlot(b,c)?"show":"hide"]()}this.state=a}}};var Q=function(){};Q.prototype={isCartesian:!0,type:"line",pointClass:Pa,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",
fill:"fillColor",r:"radius"},colorCounter:0,init:function(a,b){var c,d,e=a.series;this.chart=a;this.options=b=this.setOptions(b);this.bindAxes();r(this,{name:b.name,state:"",pointAttr:{},visible:b.visible!==!1,selected:b.selected===!0});if(Z)b.animation=!1;d=b.events;for(c in d)J(this,c,d[c]);if(d&&d.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;this.getColor();this.getSymbol();this.setData(b.data,!1);if(this.isCartesian)a.hasCartesianSeries=!0;e.push(this);
this._i=e.length-1;Kb(e,function(a,b){return p(a.options.index,a._i)-p(b.options.index,a._i)});n(e,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)});c=b.linkedTo;this.linkedSeries=[];if(da(c)&&(c=c===":previous"?e[this.index-1]:a.get(c)))c.linkedSeries.push(this),this.linkedParent=c},bindAxes:function(){var a=this,b=a.options,c=a.chart,d;a.isCartesian&&n(["xAxis","yAxis"],function(e){n(c[e],function(c){d=c.options;if(b[e]===d.index||b[e]!==v&&b[e]===d.id||b[e]===v&&d.index===0)c.series.push(a),
a[e]=c,c.isDirty=!0});a[e]||ua(18,!0)})},autoIncrement:function(){var a=this.options,b=this.xIncrement,b=p(b,a.pointStart,0);this.pointInterval=p(this.pointInterval,a.pointInterval,1);this.xIncrement=b+this.pointInterval;return b},getSegments:function(){var a=-1,b=[],c,d=this.points,e=d.length;if(e)if(this.options.connectNulls){for(c=e;c--;)d[c].y===null&&d.splice(c,1);d.length&&(b=[d])}else n(d,function(c,g){c.y===null?(g>a+1&&b.push(d.slice(a+1,g)),a=g):g===e-1&&b.push(d.slice(a+1,g+1))});this.segments=
b},setOptions:function(a){var b=this.chart.options,c=b.plotOptions,d=c[this.type];this.userOptions=a;a=x(d,c.series,a);this.tooltipOptions=x(b.tooltip,a.tooltip);d.marker===null&&delete a.marker;return a},getColor:function(){var a=this.options,b=this.userOptions,c=this.chart.options.colors,d=this.chart.counters,e;e=a.color||X[this.type].color;if(!e&&!a.colorByPoint)t(b._colorIndex)?a=b._colorIndex:(b._colorIndex=d.color,a=d.color++),e=c[a];this.color=e;d.wrapColor(c.length)},getSymbol:function(){var a=
this.userOptions,b=this.options.marker,c=this.chart,d=c.options.symbols,c=c.counters;this.symbol=b.symbol;if(!this.symbol)t(a._symbolIndex)?a=a._symbolIndex:(a._symbolIndex=c.symbol,a=c.symbol++),this.symbol=d[a];if(/^url/.test(this.symbol))b.radius=0;c.wrapSymbol(d.length)},drawLegendSymbol:function(a){var b=this.options,c=b.marker,d=a.options,e;e=d.symbolWidth;var f=this.chart.renderer,g=this.legendGroup,a=a.baseline-s(f.fontMetrics(d.itemStyle.fontSize).b*0.3);if(b.lineWidth){d={"stroke-width":b.lineWidth};
if(b.dashStyle)d.dashstyle=b.dashStyle;this.legendLine=f.path(["M",0,a,"L",e,a]).attr(d).add(g)}if(c&&c.enabled)b=c.radius,this.legendSymbol=e=f.symbol(this.symbol,e/2-b,a-b,2*b,2*b).add(g),e.isMarker=!0},addPoint:function(a,b,c,d){var e=this.options,f=this.data,g=this.graph,h=this.area,i=this.chart,j=this.xData,k=this.yData,l=this.zData,m=this.names,o=g&&g.shift||0,q=e.data;Ka(d,i);c&&n([g,h,this.graphNeg,this.areaNeg],function(a){if(a)a.shift=o+1});if(h)h.isArea=!0;b=p(b,!0);d={series:this};this.pointClass.prototype.applyOptions.apply(d,
[a]);j.push(d.x);k.push(this.toYData?this.toYData(d):d.y);l.push(d.z);if(m)m[d.x]=d.name;q.push(a);e.legendType==="point"&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),j.shift(),k.shift(),l.shift(),q.shift()));this.isDirtyData=this.isDirty=!0;b&&(this.getAttribs(),i.redraw())},setData:function(a,b){var c=this.points,d=this.options,e=this.chart,f=null,g=this.xAxis,h=g&&g.categories&&!g.categories.length?[]:null,i;this.xIncrement=null;this.pointRange=g&&g.categories?1:d.pointRange;
this.colorCounter=0;var j=[],k=[],l=[],m=a?a.length:[];i=p(d.turboThreshold,1E3);var o=this.pointArrayMap,o=o&&o.length,q=!!this.toYData;if(i&&m>i){for(i=0;f===null&&i<m;)f=a[i],i++;if(pa(f)){f=p(d.pointStart,0);d=p(d.pointInterval,1);for(i=0;i<m;i++)j[i]=f,k[i]=a[i],f+=d;this.xIncrement=f}else if(Ha(f))if(o)for(i=0;i<m;i++)d=a[i],j[i]=d[0],k[i]=d.slice(1,o+1);else for(i=0;i<m;i++)d=a[i],j[i]=d[0],k[i]=d[1]}else for(i=0;i<m;i++)if(a[i]!==v&&(d={series:this},this.pointClass.prototype.applyOptions.apply(d,
[a[i]]),j[i]=d.x,k[i]=q?this.toYData(d):d.y,l[i]=d.z,h&&d.name))h[d.x]=d.name;da(k[0])&&ua(14,!0);this.data=[];this.options.data=a;this.xData=j;this.yData=k;this.zData=l;this.names=h;for(i=c&&c.length||0;i--;)c[i]&&c[i].destroy&&c[i].destroy();if(g)g.minRange=g.userMinRange;this.isDirty=this.isDirtyData=e.isDirtyBox=!0;p(b,!0)&&e.redraw(!1)},remove:function(a,b){var c=this,d=c.chart,a=p(a,!0);if(!c.isRemoving)c.isRemoving=!0,C(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;
a&&d.redraw(b)});c.isRemoving=!1},processData:function(a){var b=this.xData,c=this.yData,d=b.length,e;e=0;var f,g,h=this.xAxis,i=this.options,j=i.cropThreshold,k=this.isCartesian;if(k&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(k&&this.sorted&&(!j||d>j||this.forceCrop))if(a=h.min,h=h.max,b[d-1]<a||b[0]>h)b=[],c=[];else if(b[0]<a||b[d-1]>h)e=this.cropData(this.xData,this.yData,a,h),b=e.xData,c=e.yData,e=e.start,f=!0;for(h=b.length-1;h>=0;h--)d=b[h]-b[h-1],d>0&&(g===v||d<g)?g=d:d<
0&&this.requireSorting&&ua(15);this.cropped=f;this.cropStart=e;this.processedXData=b;this.processedYData=c;if(i.pointRange===null)this.pointRange=g||1;this.closestPointRange=g},cropData:function(a,b,c,d){var e=a.length,f=0,g=e,h;for(h=0;h<e;h++)if(a[h]>=c){f=u(0,h-1);break}for(;h<e;h++)if(a[h]>d){g=h+1;break}return{xData:a.slice(f,g),yData:b.slice(f,g),start:f,end:g}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,g=d.length,
h=this.cropStart||0,i,j=this.hasGroupedData,k,l=[],m;if(!b&&!j)b=[],b.length=a.length,b=this.data=b;for(m=0;m<g;m++)i=h+m,j?l[m]=(new f).init(this,[d[m]].concat(ha(e[m]))):(b[i]?k=b[i]:a[i]!==v&&(b[i]=k=(new f).init(this,a[i],d[m])),l[m]=k);if(b&&(g!==(c=b.length)||j))for(m=0;m<c;m++)if(m===h&&!j&&(m+=g),b[m])b[m].destroyElements(),b[m].plotX=v;this.data=b;this.points=l},setStackedPoints:function(){if(this.options.stacking&&!(this.visible!==!0&&this.chart.options.chart.ignoreHiddenSeries!==!1)){var a=
this.processedXData,b=this.processedYData,c=b.length,d=this.options,e=d.threshold,f=d.stack,d=d.stacking,g=this.stackKey,h="-"+g,i=this.yAxis,j=i.stacks,k=i.oldStacks,l=i.stacksMax,m,o,p,n,s,t;for(s=0;s<c;s++){o=a[s];t=b[s];n=(m=t<e)?h:g;l[n]||(l[n]=t);j[n]||(j[n]={});if(!j[n][o])k[n]&&k[n][o]?(j[n][o]=k[n][o],j[n][o].total=null):j[n][o]=new Mb(i,i.options.stackLabels,m,o,f,d);p=j[n][o];o=p.total;p.addValue(t);p.cacheExtremes(this,[o,o+t]);if(p.total>l[n]&&!m)l[n]=p.total;else if(p.total<l[n]&&m)l[n]=
p.total}i.oldStacks={}}},getExtremes:function(){var a=this.xAxis,b=this.yAxis,c=this.stackKey,d=this.options,e=d.threshold,f=this.processedXData,g=this.processedYData,h=g.length,i=[],j=0,k=a.min,a=a.max,l,m,o;d.stacking&&(m=b.stacksMax["-"+c]||e,o=b.stacksMax[c]||e);if(!t(m)||!t(o)){for(d=0;d<h;d++)if(l=f[d],c=g[d],e=c!==null&&c!==v&&(!b.isLog||c.length||c>0),l=this.getExtremesFromAll||this.cropped||(f[d+1]||l)>=k&&(f[d-1]||l)<=a,e&&l)if(e=c.length)for(;e--;)c[e]!==null&&(i[j++]=c[e]);else i[j++]=
c;m=p(m,Ia(i));o=p(o,ta(i))}this.dataMin=m;this.dataMax=o},translate:function(){this.processedXData||this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,g=f.length,h=!!this.modifyValue,i=a.pointPlacement,j=i==="between"||pa(i),k=a.threshold,a=0;a<g;a++){var l=f[a],m=l.x,o=l.y,n=l.low,u=e.stacks[(o<k?"-":"")+this.stackKey],r;if(e.isLog&&o<=0)l.y=o=null;l.plotX=c.translate(m,0,0,0,1,i);if(b&&this.visible&&u&&u[m])u=u[m],
r=u.total,u.cum=n=u.cum-o,o=n+o,u.cum===0&&(n=p(k,e.min)),e.isLog&&n<=0&&(n=null),b==="percent"&&(n=r?n*100/r:0,o=r?o*100/r:0),l.percentage=r?l.y*100/r:0,l.total=l.stackTotal=r,l.stackY=o,u.setOffset(this.pointXOffset||0,this.barW||0);l.yBottom=t(n)?e.translate(n,0,1,0,1):null;h&&(o=this.modifyValue(o,l));l.plotY=typeof o==="number"&&o!==Infinity?s(e.translate(o,0,1,0,1)*10)/10:v;l.clientX=j?c.translate(m,0,0,0,1):l.plotX;l.negative=l.y<(k||0);l.category=d&&d[l.x]!==v?d[l.x]:l.x}this.getSegments()},
setTooltipPoints:function(a){var b=[],c,d,e=(c=this.xAxis)?c.tooltipLen||c.len:this.chart.plotSizeX,f,g,h,i=[];if(this.options.enableMouseTracking!==!1){if(a)this.tooltipPoints=null;n(this.segments||this.points,function(a){b=b.concat(a)});c&&c.reversed&&(b=b.reverse());this.orderTooltipPoints&&this.orderTooltipPoints(b);a=b.length;for(h=0;h<a;h++){f=b[h];g=b[h+1];c=b[h-1]?d+1:0;for(d=b[h+1]?I(u(0,S((f.clientX+(g?g.wrappedClientX||g.clientX:e))/2)),e):e;c>=0&&c<=d;)i[c++]=f}this.tooltipPoints=i}},
tooltipHeaderFormatter:function(a){var b=this.tooltipOptions,c=b.xDateFormat,d=b.dateTimeLabelFormats,e=this.xAxis,f=e&&e.options.type==="datetime",b=b.headerFormat,e=e&&e.closestPointRange,g;if(f&&!c)if(e)for(g in y){if(y[g]>=e){c=d[g];break}}else c=d.day;f&&c&&pa(a.key)&&(b=b.replace("{point.key}","{point.key:"+c+"}"));return Aa(b,{point:a,series:this})},onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&C(this,"mouseOver");this.setState("hover");
a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;if(d)d.onMouseOut();this&&a.events.mouseOut&&C(this,"mouseOut");c&&!a.stickyTracking&&(!c.shared||this.noSharedTooltip)&&c.hide();this.setState();b.hoverSeries=null},animate:function(a){var b=this,c=b.chart,d=c.renderer,e;e=b.options.animation;var f=c.clipBox,g=c.inverted,h;if(e&&!U(e))e=X[b.type].animation;h="_sharedClip"+e.duration+e.easing;if(a)a=c[h],e=c[h+"m"],a||(c[h]=a=d.clipRect(r(f,{width:0})),
c[h+"m"]=e=d.clipRect(-99,g?-c.plotLeft:-c.plotTop,99,g?c.chartWidth:c.chartHeight)),b.group.clip(a),b.markerGroup.clip(e),b.sharedClipKey=h;else{if(a=c[h])a.animate({width:c.plotSizeX},e),c[h+"m"].animate({width:c.plotSizeX+99},e);b.animate=null;b.animationTimeout=setTimeout(function(){b.afterAnimate()},e.duration)}},afterAnimate:function(){var a=this.chart,b=this.sharedClipKey,c=this.group;c&&this.options.clip!==!1&&(c.clip(a.clipRect),this.markerGroup.clip());setTimeout(function(){b&&a[b]&&(a[b]=
a[b].destroy(),a[b+"m"]=a[b+"m"].destroy())},100)},drawPoints:function(){var a,b=this.points,c=this.chart,d,e,f,g,h,i,j,k,l=this.options.marker,m,o=this.markerGroup;if(l.enabled||this._hasPointMarkers)for(f=b.length;f--;)if(g=b[f],d=S(g.plotX),e=g.plotY,k=g.graphic,i=g.marker||{},a=l.enabled&&i.enabled===v||i.enabled,m=c.isInsidePlot(s(d),e,c.inverted),a&&e!==v&&!isNaN(e)&&g.y!==null)if(a=g.pointAttr[g.selected?"select":""],h=a.r,i=p(i.symbol,this.symbol),j=i.indexOf("url")===0,k)k.attr({visibility:m?
Y?"inherit":"visible":"hidden"}).animate(r({x:d-h,y:e-h},k.symbolName?{width:2*h,height:2*h}:{}));else{if(m&&(h>0||j))g.graphic=c.renderer.symbol(i,d-h,e-h,2*h,2*h).attr(a).add(o)}else if(k)g.graphic=k.destroy()},convertAttribs:function(a,b,c,d){var e=this.pointAttrToOptions,f,g,h={},a=a||{},b=b||{},c=c||{},d=d||{};for(f in e)g=e[f],h[f]=p(a[g],b[f],c[f],d[f]);return h},getAttribs:function(){var a=this,b=a.options,c=X[a.type].marker?b.marker:b,d=c.states,e=d.hover,f,g=a.color,h={stroke:g,fill:g},
i=a.points||[],j=[],k,l=a.pointAttrToOptions,m=b.negativeColor,o;b.marker?(e.radius=e.radius||c.radius+2,e.lineWidth=e.lineWidth||c.lineWidth+1):e.color=e.color||oa(e.color||g).brighten(e.brightness).get();j[""]=a.convertAttribs(c,h);n(["hover","select"],function(b){j[b]=a.convertAttribs(d[b],j[""])});a.pointAttr=j;for(g=i.length;g--;){h=i[g];if((c=h.options&&h.options.marker||h.options)&&c.enabled===!1)c.radius=0;if(h.negative&&m)h.color=h.fillColor=m;f=b.colorByPoint||h.color;if(h.options)for(o in l)t(c[l[o]])&&
(f=!0);if(f){c=c||{};k=[];d=c.states||{};f=d.hover=d.hover||{};if(!b.marker)f.color=oa(f.color||h.color).brighten(f.brightness||e.brightness).get();k[""]=a.convertAttribs(r({color:h.color},c),j[""]);k.hover=a.convertAttribs(d.hover,j.hover,k[""]);k.select=a.convertAttribs(d.select,j.select,k[""]);if(h.negative&&b.marker&&m)k[""].fill=k.hover.fill=k.select.fill=a.convertAttribs({fillColor:m}).fill}else k=j;h.pointAttr=k}},update:function(a,b){var c=this.chart,d=this.type,a=x(this.userOptions,{animation:!1,
index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1);r(this,$[a.type||d].prototype);this.init(c,a);p(b,!0)&&c.redraw(!1)},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(Da),d,e,f=a.data||[],g,h,i;C(a,"destroy");aa(a);n(["xAxis","yAxis"],function(b){if(i=a[b])fa(i.series,a),i.isDirty=i.forceRedraw=!0});a.legendItem&&a.chart.legend.destroyItem(a);for(e=f.length;e--;)(g=f[e])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);n("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","),
function(b){a[b]&&(d=c&&b==="group"?"hide":"destroy",a[b][d]())});if(b.hoverSeries===a)b.hoverSeries=null;fa(b.series,a);for(h in a)delete a[h]},drawDataLabels:function(){var a=this,b=a.options.dataLabels,c=a.points,d,e,f,g;if(b.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(b),g=a.plotGroup("dataLabelsGroup","data-labels",a.visible?"visible":"hidden",b.zIndex||6),e=b,n(c,function(c){var i,j=c.dataLabel,k,l,m=c.connector,o=!0;d=c.options&&c.options.dataLabels;i=e.enabled||d&&d.enabled;
if(j&&!i)c.dataLabel=j.destroy();else if(i){b=x(e,d);i=b.rotation;k=c.getLabelConfig();f=b.format?Aa(b.format,k):b.formatter.call(k,b);b.style.color=p(b.color,b.style.color,a.color,"black");if(j)if(t(f))j.attr({text:f}),o=!1;else{if(c.dataLabel=j=j.destroy(),m)c.connector=m.destroy()}else if(t(f)){j={fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,r:b.borderRadius||0,rotation:i,padding:b.padding,zIndex:1};for(l in j)j[l]===v&&delete j[l];j=c.dataLabel=a.chart.renderer[i?"text":
"label"](f,0,-999,null,null,null,b.useHTML).attr(j).css(b.style).add(g).shadow(b.shadow)}j&&a.alignDataLabel(c,j,b,null,o)}})},alignDataLabel:function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=p(a.plotX,-999),i=p(a.plotY,-999),a=b.getBBox(),d=r({x:g?f.plotWidth-i:h,y:s(g?f.plotHeight-h:i),width:0,height:0},d);r(c,{width:a.width,height:a.height});c.rotation?(d={align:c.align,x:d.x+c.x+d.width/2,y:d.y+c.y+d.height/2},b[e?"attr":"animate"](d)):(b.align(c,null,d),d=b.alignAttr);b.attr({visibility:c.crop===
!1||f.isInsidePlot(d.x,d.y)&&f.isInsidePlot(d.x+a.width,d.y+a.height)?f.renderer.isSVG?"inherit":"visible":"hidden"})},getSegmentPath:function(a){var b=this,c=[],d=b.options.step;n(a,function(e,f){var g=e.plotX,h=e.plotY,i;b.getPointSpline?c.push.apply(c,b.getPointSpline(a,e,f)):(c.push(f?"L":"M"),d&&f&&(i=a[f-1],d==="right"?c.push(i.plotX,h):d==="center"?c.push((i.plotX+g)/2,i.plotY,(i.plotX+g)/2,h):c.push(g,i.plotY)),c.push(e.plotX,e.plotY))});return c},getGraphPath:function(){var a=this,b=[],c,
d=[];n(a.segments,function(e){c=a.getSegmentPath(e);e.length>1?b=b.concat(c):d.push(e[0])});a.singlePoints=d;return a.graphPath=b},drawGraph:function(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color]],d=b.lineWidth,e=b.dashStyle,f=this.getGraphPath(),g=b.negativeColor;g&&c.push(["graphNeg",g]);n(c,function(c,g){var j=c[0],k=a[j];if(k)Wa(k),k.animate({d:f});else if(d&&f.length){k={stroke:c[1],"stroke-width":d,zIndex:1};if(e)k.dashstyle=e;a[j]=a.chart.renderer.path(f).attr(k).add(a.group).shadow(!g&&
b.shadow)}})},clipNeg:function(){var a=this.options,b=this.chart,c=b.renderer,d=a.negativeColor||a.negativeFillColor,e,f=this.graph,g=this.area,h=this.posClip,i=this.negClip;e=b.chartWidth;var j=b.chartHeight,k=u(e,j),l=this.yAxis;if(d&&(f||g)){d=s(l.toPixels(a.threshold||0,!0));a={x:0,y:0,width:k,height:d};k={x:0,y:d,width:k,height:k};if(b.inverted)a.height=k.y=b.plotWidth-d,c.isVML&&(a={x:b.plotWidth-d-b.plotLeft,y:0,width:e,height:j},k={x:d+b.plotLeft-e,y:0,width:b.plotLeft+d,height:e});l.reversed?
(b=k,e=a):(b=a,e=k);h?(h.animate(b),i.animate(e)):(this.posClip=h=c.clipRect(b),this.negClip=i=c.clipRect(e),f&&this.graphNeg&&(f.clip(h),this.graphNeg.clip(i)),g&&(g.clip(h),this.areaNeg.clip(i)))}},invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};n(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;if(b.xAxis)J(c,"resize",a),J(b,"destroy",function(){aa(c,"resize",a)}),a(),b.invertGroups=a},plotGroup:function(a,b,c,d,e){var f=this[a],
g=!f;g&&(this[a]=f=this.chart.renderer.g(b).attr({visibility:c,zIndex:d||0.1}).add(e));f[g?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){return{translateX:this.xAxis?this.xAxis.left:this.chart.plotLeft,translateY:this.yAxis?this.yAxis.top:this.chart.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this.chart,b,c=this.options,d=c.animation&&!!this.animate&&a.renderer.isSVG,e=this.visible?"visible":"hidden",f=c.zIndex,g=this.hasRendered,h=a.seriesGroup;b=this.plotGroup("group",
"series",e,f,h);this.markerGroup=this.plotGroup("markerGroup","markers",e,f,h);d&&this.animate(!0);this.getAttribs();b.inverted=this.isCartesian?a.inverted:!1;this.drawGraph&&(this.drawGraph(),this.clipNeg());this.drawDataLabels();this.drawPoints();this.options.enableMouseTracking!==!1&&this.drawTracker();a.inverted&&this.invertGroups();c.clip!==!1&&!this.sharedClipKey&&!g&&b.clip(a.clipRect);d?this.animate():g||this.afterAnimate();this.isDirty=this.isDirtyData=!1;this.hasRendered=!0},redraw:function(){var a=
this.chart,b=this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:p(d&&d.left,a.plotLeft),translateY:p(e&&e.top,a.plotTop)}));this.translate();this.setTooltipPoints(!0);this.render();b&&C(this,"updatedData")},setState:function(a){var b=this.options,c=this.graph,d=this.graphNeg,e=b.states,b=b.lineWidth,a=a||"";if(this.state!==a)this.state=a,e[a]&&e[a].enabled===!1||(a&&(b=e[a].lineWidth||b+1),c&&!c.dashstyle&&
(a={"stroke-width":b},c.attr(a),d&&d.attr(a)))},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,h=c.visible;f=(c.visible=a=c.userOptions.visible=a===v?!h:a)?"show":"hide";n(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&n(d.series,function(a){if(a.options.stacking&&a.visible)a.isDirty=!0});n(c.linkedSeries,function(b){b.setVisible(a,
!1)});if(g)d.isDirtyBox=!0;b!==!1&&d.redraw();C(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=a===v?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;C(this,a?"select":"unselect")},drawTracker:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,g=f.pointer,h=f.renderer,i=f.options.tooltip.snap,j=a.tracker,k=b.cursor,k=k&&{cursor:k},l=a.singlePoints,m,o=function(){if(f.hoverSeries!==
a)a.onMouseOver()};if(e&&!c)for(m=e+1;m--;)d[m]==="M"&&d.splice(m+1,0,d[m+1]-i,d[m+2],"L"),(m&&d[m]==="M"||m===e)&&d.splice(m,0,"L",d[m-2]+i,d[m-1]);for(m=0;m<l.length;m++)e=l[m],d.push("M",e.plotX-i,e.plotY,"L",e.plotX+i,e.plotY);if(j)j.attr({d:d});else if(a.tracker=j=h.path(d).attr({"class":"highcharts-tracker","stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:Qb,fill:c?Qb:R,"stroke-width":b.lineWidth+(c?0:2*i),zIndex:2}).addClass("highcharts-tracker").on("mouseover",o).on("mouseout",
function(a){g.onTrackerMouseOut(a)}).css(k).add(a.markerGroup),hb)j.on("touchstart",o)}};L=ga(Q);$.line=L;X.area=x(W,{threshold:0});L=ga(Q,{type:"area",getSegments:function(){var a=[],b=[],c=[],d=this.xAxis,e=this.yAxis,f=e.stacks[this.stackKey],g={},h,i,j=this.points,k,l,m;if(this.options.stacking&&!this.cropped){for(l=0;l<j.length;l++)g[j[l].x]=j[l];for(m in f)c.push(+m);c.sort(function(a,b){return a-b});n(c,function(a){g[a]?b.push(g[a]):(h=d.translate(a),k=f[a].percent?f[a].total?f[a].cum*100/
f[a].total:0:f[a].cum,i=e.toPixels(k,!0),b.push({y:null,plotX:h,clientX:h,plotY:i,yBottom:i,onMouseOver:xa}))});b.length&&a.push(b)}else Q.prototype.getSegments.call(this),a=this.segments;this.segments=a},getSegmentPath:function(a){var b=Q.prototype.getSegmentPath.call(this,a),c=[].concat(b),d,e=this.options;b.length===3&&c.push("L",b[1],b[2]);if(e.stacking&&!this.closedStacks)for(d=a.length-1;d>=0;d--)d<a.length-1&&e.step&&c.push(a[d+1].plotX,a[d].yBottom),c.push(a[d].plotX,a[d].yBottom);else this.closeSegment(c,
a);this.areaPath=this.areaPath.concat(c);return b},closeSegment:function(a,b){var c=this.yAxis.getThreshold(this.options.threshold);a.push("L",b[b.length-1].plotX,c,"L",b[0].plotX,c)},drawGraph:function(){this.areaPath=[];Q.prototype.drawGraph.apply(this);var a=this,b=this.areaPath,c=this.options,d=c.negativeColor,e=c.negativeFillColor,f=[["area",this.color,c.fillColor]];(d||e)&&f.push(["areaNeg",d,e]);n(f,function(d){var e=d[0],f=a[e];f?f.animate({d:b}):a[e]=a.chart.renderer.path(b).attr({fill:p(d[2],
oa(d[1]).setOpacity(p(c.fillOpacity,0.75)).get()),zIndex:0}).add(a.group)})},drawLegendSymbol:function(a,b){b.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,a.options.symbolWidth,12,2).attr({zIndex:3}).add(b.legendGroup)}});$.area=L;X.spline=x(W);K=ga(Q,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],g=a[c+1],h,i,j,k;if(f&&g){a=f.plotY;j=g.plotX;var g=g.plotY,l;h=(1.5*d+f.plotX)/2.5;i=(1.5*e+a)/2.5;j=(1.5*d+j)/2.5;k=(1.5*e+g)/2.5;l=(k-i)*(j-d)/(j-h)+e-k;i+=l;
k+=l;i>a&&i>e?(i=u(a,e),k=2*e-i):i<a&&i<e&&(i=I(a,e),k=2*e-i);k>g&&k>e?(k=u(g,e),i=2*e-k):k<g&&k<e&&(k=I(g,e),i=2*e-k);b.rightContX=j;b.rightContY=k}c?(b=["C",f.rightContX||f.plotX,f.rightContY||f.plotY,h||d,i||e,d,e],f.rightContX=f.rightContY=null):b=["M",d,e];return b}});$.spline=K;X.areaspline=x(X.area);la=L.prototype;K=ga(K,{type:"areaspline",closedStacks:!0,getSegmentPath:la.getSegmentPath,closeSegment:la.closeSegment,drawGraph:la.drawGraph,drawLegendSymbol:la.drawLegendSymbol});$.areaspline=
K;X.column=x(W,{borderColor:"#FFFFFF",borderWidth:1,borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},stickyTracking:!1,threshold:0});K=ga(Q,{type:"column",tooltipOutsidePlot:!0,pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",r:"borderRadius"},trackerGroups:["group",
"dataLabelsGroup"],init:function(){Q.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&n(b.series,function(b){if(b.type===a.type)b.isDirty=!0})},getColumnMetrics:function(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,e=c.reversed,f,g={},h,i=0;b.grouping===!1?i=1:n(a.chart.series,function(b){var c=b.options,e=b.yAxis;if(b.type===a.type&&b.visible&&d.len===e.len&&d.pos===e.pos)c.stacking?(f=b.stackKey,g[f]===v&&(g[f]=i++),h=g[f]):c.grouping!==!1&&(h=i++),b.columnIndex=h});var c=
I(P(c.transA)*(c.ordinalSlope||b.pointRange||c.closestPointRange||1),c.len),j=c*b.groupPadding,k=(c-2*j)/i,l=b.pointWidth,b=t(l)?(k-l)/2:k*b.pointPadding,l=p(l,k-2*b);return a.columnMetrics={width:l,offset:b+(j+((e?i-(a.columnIndex||0):a.columnIndex)||0)*k-c/2)*(e?-1:1)}},translate:function(){var a=this.chart,b=this.options,c=b.borderWidth,d=this.yAxis,e=this.translatedThreshold=d.getThreshold(b.threshold),f=p(b.minPointLength,5),b=this.getColumnMetrics(),g=b.width,h=this.barW=ja(u(g,1+2*c)),i=this.pointXOffset=
b.offset;Q.prototype.translate.apply(this);n(this.points,function(b){var k=I(u(-999,b.plotY),d.len+999),l=p(b.yBottom,e),m=b.plotX+i,o=ja(I(k,l)),k=ja(u(k,l)-o);P(k)<f&&f&&(k=f,o=s(P(o-e)>f?l-f:e-(d.translate(b.y,0,1,0,1)<=e?f:0)));b.barX=m;b.pointWidth=g;b.shapeType="rect";b.shapeArgs=b=a.renderer.Element.prototype.crisp.call(0,c,m,o,h,k);c%2&&(b.y-=1,b.height+=1)})},getSymbol:xa,drawLegendSymbol:L.prototype.drawLegendSymbol,drawGraph:xa,drawPoints:function(){var a=this,b=a.options,c=a.chart.renderer,
d;n(a.points,function(e){var f=e.plotY,g=e.graphic;if(f!==v&&!isNaN(f)&&e.y!==null)d=e.shapeArgs,g?(Wa(g),g.animate(x(d))):e.graphic=c[e.shapeType](d).attr(e.pointAttr[e.selected?"select":""]).add(a.group).shadow(b.shadow,null,b.stacking&&!b.borderRadius);else if(g)e.graphic=g.destroy()})},drawTracker:function(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,e=d&&{cursor:d},f=function(c){var d=c.target,e;if(b.hoverSeries!==a)a.onMouseOver();for(;d&&!e;)e=d.point,d=d.parentNode;if(e!==v&&e!==
b.hoverPoint)e.onMouseOver(c)};n(a.points,function(a){if(a.graphic)a.graphic.element.point=a;if(a.dataLabel)a.dataLabel.element.point=a});a._hasTracking?a._hasTracking=!0:n(a.trackerGroups,function(b){if(a[b]&&(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){c.onTrackerMouseOut(a)}).css(e),hb))a[b].on("touchstart",f)})},alignDataLabel:function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=a.dlBox||a.shapeArgs,i=a.below||a.plotY>p(this.translatedThreshold,f.plotSizeY),
j=p(c.inside,!!this.options.stacking);if(h&&(d=x(h),g&&(d={x:f.plotWidth-d.y-d.height,y:f.plotHeight-d.x-d.width,width:d.height,height:d.width}),!j))g?(d.x+=i?0:d.width,d.width=0):(d.y+=i?d.height:0,d.height=0);c.align=p(c.align,!g||j?"center":i?"right":"left");c.verticalAlign=p(c.verticalAlign,g||j?"middle":i?"top":"bottom");Q.prototype.alignDataLabel.call(this,a,b,c,d,e)},animate:function(a){var b=this.yAxis,c=this.options,d=this.chart.inverted,e={};if(Y)a?(e.scaleY=0.001,a=I(b.pos+b.len,u(b.pos,
b.toPixels(c.threshold))),d?e.translateX=a-b.len:e.translateY=a,this.group.attr(e)):(e.scaleY=1,e[d?"translateX":"translateY"]=b.pos,this.group.animate(e,this.options.animation),this.animate=null)},remove:function(){var a=this,b=a.chart;b.hasRendered&&n(b.series,function(b){if(b.type===a.type)b.isDirty=!0});Q.prototype.remove.apply(a,arguments)}});$.column=K;X.bar=x(X.column);la=ga(K,{type:"bar",inverted:!0});$.bar=la;X.scatter=x(W,{lineWidth:0,tooltip:{headerFormat:'<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>',
pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",followPointer:!0},stickyTracking:!1});la=ga(Q,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["markerGroup"],drawTracker:K.prototype.drawTracker,setTooltipPoints:xa});$.scatter=la;X.pie=x(W,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.name}},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,
showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});W={type:"pie",isCartesian:!1,pointClass:ga(Pa,{init:function(){Pa.prototype.init.apply(this,arguments);var a=this,b;if(a.y<0)a.y=null;r(a,{visible:a.visible!==!1,name:p(a.name,"Slice")});b=function(b){a.slice(b.type==="select")};J(a,"select",b);J(a,"unselect",b);return a},setVisible:function(a){var b=this,c=b.series,d=c.chart,e;b.visible=b.options.visible=a=a===v?!b.visible:a;c.options.data[na(b,
c.data)]=b.options;e=a?"show":"hide";n(["graphic","dataLabel","connector","shadowGroup"],function(a){if(b[a])b[a][e]()});b.legendItem&&d.legend.colorizeItem(b,a);if(!c.isDirty&&c.options.ignoreHiddenPoint)c.isDirty=!0,d.redraw()},slice:function(a,b,c){var d=this.series;Ka(c,d.chart);p(b,!0);this.sliced=this.options.sliced=a=t(a)?a:!this.sliced;d.options.data[na(this,d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)}}),
requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},getColor:xa,animate:function(a){var b=this,c=b.points,d=b.startAngleRad;if(!a)n(c,function(a){var c=a.graphic,a=a.shapeArgs;c&&(c.attr({r:b.center[3]/2,start:d,end:d}),c.animate({r:a.r,start:a.start,end:a.end},b.options.animation))}),b.animate=null},setData:function(a,b){Q.prototype.setData.call(this,a,!1);this.processData();this.generatePoints();
p(b,!0)&&this.chart.redraw()},generatePoints:function(){var a,b=0,c,d,e,f=this.options.ignoreHiddenPoint;Q.prototype.generatePoints.call(this);c=this.points;d=c.length;for(a=0;a<d;a++)e=c[a],b+=f&&!e.visible?0:e.y;this.total=b;for(a=0;a<d;a++)e=c[a],e.percentage=e.y/b*100,e.total=b},getCenter:function(){var a=this.options,b=this.chart,c=2*(a.slicedOffset||0),d,e=b.plotWidth-2*c,f=b.plotHeight-2*c,b=a.center,a=[p(b[0],"50%"),p(b[1],"50%"),a.size||"100%",a.innerSize||0],g=I(e,f),h;return Na(a,function(a,
b){h=/%$/.test(a);d=b<2||b===2&&h;return(h?[e,f,g,g][b]*A(a)/100:a)+(d?c:0)})},translate:function(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,g,h,i=this.startAngleRad=Ma/180*((c.startAngle||0)%360-90),j=this.points,k=2*Ma,l=c.dataLabels.distance,c=c.ignoreHiddenPoint,m,o=j.length,n;if(!a)this.center=a=this.getCenter();this.getX=function(b,c){h=N.asin((b-a[1])/(a[2]/2+l));return a[0]+(c?-1:1)*V(h)*(a[2]/2+l)};for(m=0;m<o;m++){n=j[m];f=s((i+b*k)*1E3)/1E3;if(!c||
n.visible)b+=n.percentage/100;g=s((i+b*k)*1E3)/1E3;n.shapeType="arc";n.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:f,end:g};h=(g+f)/2;h>0.75*k&&(h-=2*Ma);n.slicedTranslation={translateX:s(V(h)*d),translateY:s(ba(h)*d)};f=V(h)*a[2]/2;g=ba(h)*a[2]/2;n.tooltipPos=[a[0]+f*0.7,a[1]+g*0.7];n.half=h<k/4?0:1;n.angle=h;e=I(e,l/2);n.labelPos=[a[0]+f+V(h)*l,a[1]+g+ba(h)*l,a[0]+f+V(h)*e,a[1]+g+ba(h)*e,a[0]+f,a[1]+g,l<0?"center":n.half?"right":"left",h]}this.setTooltipPoints()},drawGraph:null,drawPoints:function(){var a=
this,b=a.chart.renderer,c,d,e=a.options.shadow,f,g;if(e&&!a.shadowGroup)a.shadowGroup=b.g("shadow").add(a.group);n(a.points,function(h){d=h.graphic;g=h.shapeArgs;f=h.shadowGroup;if(e&&!f)f=h.shadowGroup=b.g("shadow").add(a.shadowGroup);c=h.sliced?h.slicedTranslation:{translateX:0,translateY:0};f&&f.attr(c);d?d.animate(r(g,c)):h.graphic=d=b.arc(g).setRadialReference(a.center).attr(h.pointAttr[h.selected?"select":""]).attr({"stroke-linejoin":"round"}).attr(c).add(a.group).shadow(e,f);h.visible===!1&&
h.setVisible(!1)})},drawDataLabels:function(){var a=this,b=a.data,c,d=a.chart,e=a.options.dataLabels,f=p(e.connectorPadding,10),g=p(e.connectorWidth,1),h=d.plotWidth,d=d.plotHeight,i,j,k=p(e.softConnector,!0),l=e.distance,m=a.center,o=m[2]/2,q=m[1],t=l>0,r,w,v,x,A=[[],[]],z,y,G,H,B,C=[0,0,0,0],I=function(a,b){return b.y-a.y},M=function(a,b){a.sort(function(a,c){return a.angle!==void 0&&(c.angle-a.angle)*b})};if(a.visible&&(e.enabled||a._hasPointLabels)){Q.prototype.drawDataLabels.apply(a);n(b,function(a){a.dataLabel&&
A[a.half].push(a)});for(H=0;!x&&b[H];)x=b[H]&&b[H].dataLabel&&(b[H].dataLabel.getBBox().height||21),H++;for(H=2;H--;){var b=[],L=[],J=A[H],K=J.length,E;M(J,H-0.5);if(l>0){for(B=q-o-l;B<=q+o+l;B+=x)b.push(B);w=b.length;if(K>w){c=[].concat(J);c.sort(I);for(B=K;B--;)c[B].rank=B;for(B=K;B--;)J[B].rank>=w&&J.splice(B,1);K=J.length}for(B=0;B<K;B++){c=J[B];v=c.labelPos;c=9999;var O,N;for(N=0;N<w;N++)O=P(b[N]-v[1]),O<c&&(c=O,E=N);if(E<B&&b[B]!==null)E=B;else for(w<K-B+E&&b[B]!==null&&(E=w-K+B);b[E]===null;)E++;
L.push({i:E,y:b[E]});b[E]=null}L.sort(I)}for(B=0;B<K;B++){c=J[B];v=c.labelPos;r=c.dataLabel;G=c.visible===!1?"hidden":"visible";c=v[1];if(l>0){if(w=L.pop(),E=w.i,y=w.y,c>y&&b[E+1]!==null||c<y&&b[E-1]!==null)y=c}else y=c;z=e.justify?m[0]+(H?-1:1)*(o+l):a.getX(E===0||E===b.length-1?c:y,H);r._attr={visibility:G,align:v[6]};r._pos={x:z+e.x+({left:f,right:-f}[v[6]]||0),y:y+e.y-10};r.connX=z;r.connY=y;if(this.options.size===null)w=r.width,z-w<f?C[3]=u(s(w-z+f),C[3]):z+w>h-f&&(C[1]=u(s(z+w-h+f),C[1])),y-
x/2<0?C[0]=u(s(-y+x/2),C[0]):y+x/2>d&&(C[2]=u(s(y+x/2-d),C[2]))}}if(ta(C)===0||this.verifyDataLabelOverflow(C))this.placeDataLabels(),t&&g&&n(this.points,function(b){i=b.connector;v=b.labelPos;if((r=b.dataLabel)&&r._pos)G=r._attr.visibility,z=r.connX,y=r.connY,j=k?["M",z+(v[6]==="left"?5:-5),y,"C",z,y,2*v[2]-v[4],2*v[3]-v[5],v[2],v[3],"L",v[4],v[5]]:["M",z+(v[6]==="left"?5:-5),y,"L",v[2],v[3],"L",v[4],v[5]],i?(i.animate({d:j}),i.attr("visibility",G)):b.connector=i=a.chart.renderer.path(j).attr({"stroke-width":g,
stroke:e.connectorColor||b.color||"#606060",visibility:G}).add(a.group);else if(i)b.connector=i.destroy()})}},verifyDataLabelOverflow:function(a){var b=this.center,c=this.options,d=c.center,e=c=c.minSize||80,f;d[0]!==null?e=u(b[2]-u(a[1],a[3]),c):(e=u(b[2]-a[1]-a[3],c),b[0]+=(a[3]-a[1])/2);d[1]!==null?e=u(I(e,b[2]-u(a[0],a[2])),c):(e=u(I(e,b[2]-a[0]-a[2]),c),b[1]+=(a[0]-a[2])/2);e<b[2]?(b[2]=e,this.translate(b),n(this.points,function(a){if(a.dataLabel)a.dataLabel._pos=null}),this.drawDataLabels()):
f=!0;return f},placeDataLabels:function(){n(this.points,function(a){var a=a.dataLabel,b;if(a)(b=a._pos)?(a.attr(a._attr),a[a.moved?"animate":"attr"](b),a.moved=!0):a&&a.attr({y:-999})})},alignDataLabel:xa,drawTracker:K.prototype.drawTracker,drawLegendSymbol:L.prototype.drawLegendSymbol,getSymbol:xa};W=ga(Q,W);$.pie=W;r(Highcharts,{Axis:db,Chart:xb,Color:oa,Legend:wb,Pointer:vb,Point:Pa,Tick:La,Tooltip:ub,Renderer:Va,Series:Q,SVGElement:va,SVGRenderer:Fa,arrayMin:Ia,arrayMax:ta,charts:Ea,dateFormat:Xa,
format:Aa,pathAnim:zb,getOptions:function(){return O},hasBidiBug:Vb,isTouchDevice:Ob,numberFormat:ya,seriesTypes:$,setOptions:function(a){O=x(O,a);Lb();return O},addEvent:J,removeEvent:aa,createElement:T,discardElement:Ta,css:M,each:n,extend:r,map:Na,merge:x,pick:p,splat:ha,extendClass:ga,pInt:A,wrap:Bb,svg:Y,canvas:Z,vml:!Y&&!Z,product:"Highcharts",version:"3.0.4"})})();

/* Modernizr 2.6.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-input-inputtypes-load
 */
;window.Modernizr=function(a,b,c){function u(a){i.cssText=a}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function w(a,b){return typeof a===b}function x(a,b){return!!~(""+a).indexOf(b)}function y(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:w(f,"function")?f.bind(d||b):f}return!1}function z(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)o[c[d]]=c[d]in j;return o.list&&(o.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),o}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,g,h,i=a.length;d<i;d++)j.setAttribute("type",g=a[d]),e=j.type!=="text",e&&(j.value=k,j.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(g)&&j.style.WebkitAppearance!==c?(f.appendChild(j),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(j,null).WebkitAppearance!=="textfield"&&j.offsetHeight!==0,f.removeChild(j)):/^(search|tel)$/.test(g)||(/^(url|email)$/.test(g)?e=j.checkValidity&&j.checkValidity()===!1:e=j.value!=k)),n[a[d]]=!!e;return n}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j=b.createElement("input"),k=":)",l={}.toString,m={},n={},o={},p=[],q=p.slice,r,s={}.hasOwnProperty,t;!w(s,"undefined")&&!w(s.call,"undefined")?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e});for(var A in m)t(m,A)&&(r=A.toLowerCase(),e[r]=m[A](),p.push((e[r]?"":"no-")+r));return e.input||z(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)t(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},u(""),h=j=null,e._version=d,e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:{0:"AM",1:"PM"},DAY:{0:"domingo",1:"segunda-feira",2:"terça-feira",3:"quarta-feira",4:"quinta-feira",5:"sexta-feira",6:"sábado"},MONTH:{0:"janeiro",1:"fevereiro",2:"março",3:"abril",4:"maio",5:"junho",6:"julho",7:"agosto",8:"setembro",9:"outubro",10:"novembro",11:"dezembro"},SHORTDAY:{0:"dom",1:"seg",2:"ter",3:"qua",4:"qui",5:"sex",6:"sáb"},SHORTMONTH:{0:"jan",1:"fev",2:"mar",3:"abr",4:"mai",5:"jun",6:"jul",7:"ago",8:"set",9:"out",10:"nov",11:"dez"},fullDate:"EEEE, d 'de' MMMM 'de' y",longDate:"d 'de' MMMM 'de' y",medium:"dd/MM/yyyy HH:mm:ss",mediumDate:"dd/MM/yyyy",mediumTime:"HH:mm:ss","short":"dd/MM/yy HH:mm",shortDate:"dd/MM/yy",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"R$",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:{0:{gSize:3,lgSize:3,macFrac:0,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},1:{gSize:3,lgSize:3,macFrac:0,maxFrac:2,minFrac:2,minInt:1,negPre:"- ¤",negSuf:"",posPre:"¤",posSuf:""}}},id:"pt-br",pluralCat:function(a){return 1==a?b.ONE:b.OTHER}})}]),function(a){a.fn.datepicker.dates["pt-br"]={days:["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"],daysShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],daysMin:["Do","Se","Te","Qu","Qu","Se","Sa","Do"],months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],today:"Hoje"}}(jQuery),!function(){function a(a){a.lang("pt-br",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY LT",LLLL:"dddd, D [de] MMMM [de] YYYY LT"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinal:"%dº"})}"function"==typeof define&&define.amd&&define(["moment"],a),"undefined"!=typeof window&&window.moment&&a(window.moment)}();
function BalancePanelCtrl(a,b,c,d,e){"use strict";a.updateBalance=function(){if(void 0!==b.filterDate){var d,e;e=b.filterDate.endOf("month"),d=b.filterDate.startOf("month");var f={date_start:d.format("YYYY-MM-DD"),date_end:e.format("YYYY-MM-DD")};c.fetchData(f).then(function(b){var c=b.result,d=c[0];return a.renevues=parseFloat(d.renevues),a.expenses=parseFloat(d.expenses),b})}},b.$on(d.EVENT_CREATE,a.updateBalance),b.$on(d.EVENT_UPDATE,a.updateBalance),b.$on(e.EVENT_CREATE,a.updateBalance),b.$on(d.EVENT_DELETE,a.updateBalance),b.$watch("filterDate",a.updateBalance)}function FeedbackFormCtrl(a,b){"use strict";a.formData={},a.url="",a.sending=!1,a.sendFeedback=function(){a.sending=!0,b.post(a.url,a.formData,{headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(){a.formData.message="",toastr.success(gettext("Sua mensagem foi enviada.\nResponderemos em breve.")),a.sending=!1}).error(function(){toastr.error(gettext("Houve um problema para enviar sua mensagem.\nPor favor, tente novamente mais tarde.")),a.sending=!1})}}function InstallmentFormCtrl(a){"use strict";function b(){var b=a.installment.installment_value;return accounting.toFixed(b*a.installment.installments,2)}function c(){var b=a.installment.total_value;return accounting.toFixed(b/a.installment.installments,2)}a.$watch("is_split_transaction",function(b){b&&(a.installment.total_value=a.formData.value,a.updateTotalValue())}),a.updateQtyInstallments=function(){a.installment.installment_value=c()},a.updateInstallmentValue=function(){a.installment.total_value=b()},a.updateTotalValue=function(){a.installment.installment_value=c()}}function ReportsCtrl(a,b,c){"use strict";function d(){var b={date_start:a.options.dateStart.startOf("month").format("YYYY-MM-DD"),date_end:a.options.dateEnd.endOf("month").format("YYYY-MM-DD")};return b.date__gte=b.date_start,b.date__lte=b.date_end,b}a.period=c.setDefault("reports-period",2),a.$watch("period",function(a){4!=a&&c.set("reports-period",a)}),a.options={dateStart:moment().startOf("month").subtract(5,"months"),dateEnd:moment().endOf("month")},a.customPeriod=angular.copy(a.options),a.queryPeriods=[{name:gettext("This month"),value:0},{name:gettext("Three months"),value:1},{name:gettext("Six months"),value:2},{name:gettext("A year"),value:3},{name:gettext("Custom")+"...",value:4}],a._getInterval=function(a){return[moment().startOf("month").subtract(a,"months"),moment().endOf("month")]},a._getCustomIntervals=function(){return[a.customPeriod.dateStart,a.customPeriod.dateEnd]};var e={0:function(){return a._getInterval(0)},1:function(){return a._getInterval(2)},2:function(){return a._getInterval(5)},3:function(){return a._getInterval(12)},4:a._getCustomIntervals};a.$watch("period",function(a){if(void 0!==a){var b="";b=4===a?"show":"hide",$("#custom-period-panel").collapse(b)}}),a._getParams=d,a.updateCharts=function(){var b=e[a.period]();return a.options.dateStart=b[0],a.options.dateEnd=b[1],a.options.dateEnd.diff(a.options.dateStart,"months")>13?void toastr.warning(gettext("The period must be 12 months or lower.")):a.options.dateStart>a.options.dateEnd?void toastr.warning(gettext("The start date must be lower than the end date.")):void a.$broadcast("update-charts")}}function CategoryComparisonCtrl(a,b,c,d,e){"use strict";function f(){var b=a._getParams();d.fetchData(b).then(function(b){var c=gettext("Renevues"),d=gettext("Expenses");for(var e in b.options.series){var f=b.options.series[e];h[f.name]=f}return b.options.series=[h[c],h[d]],a.$watch("category1",g),a.$watch("category2",g),a.categoryComparisonData=b,b})}function g(b){function c(a){for(var b={name:a,data:[]},c=0;f>c;c++)b.data.push(0);return b}if(b){var d=h[a.category1.name],e=h[a.category2.name],f=a.options.dateEnd.diff(a.options.dateStart,"months");d=d||c(a.category1.name),e=e||c(a.category2.name);for(var g=d.data.length;f+1>g;g++)d.data.push(0);for(var i=e.data.length;f+1>i;i++)e.data.push(0);var j=angular.copy(a.categoryComparisonData);j.options.series=[d,e],a.categoryComparisonData=j}}var h={};e.query().$promise.then(function(b){var c=b,d={name:gettext("Renevues"),group:gettext("Balance data")},e={name:gettext("Expenses"),group:gettext("Balance data")};c.unshift(d,e),a.categories=c,a.category1=d,a.category2=e,g()});var i=!1;a.$watch("category1",function(a){return a?i?void c.$emit("category-comparison-category-selected",a):void(i=!0):void 0});var j=!1;a.$watch("category2",function(a){return a?j?void c.$emit("category-comparison-category-selected",a):void(j=!0):void 0}),a.$on("update-charts",f),f()}function TopCategoriesChartCtrl(a,b,c){"use strict";function d(){var a=b._getParams();c.fetchData(a).then(function(a){b.topCategoriesData=a})}b.$on("update-charts",d),d()}function BalanceChartCtrl(a,b,c){"use strict";function d(){var a=b._getParams();c.fetchData(a).then(function(a){b.balanceData=a})}b.$on("update-charts",d),d()}function TransactionActionBarCtrl(a,b,c){"use strict";a.removeTransaction=function(){b["delete"]({id:a.transaction.id}).$promise.then(function(){for(var d in a.days){var e=a.days[d];e.day===a.transaction.date&&(e.transactions.splice(e.transactions.indexOf(a.transaction),1),0===e.transactions.length&&a.days.splice(a.days.indexOf(e),1))}c.$emit(b.EVENT_DELETE,a.transaction)})}}function TransactionFormCtrl(a,b,c,d,e){"use strict";function f(d){var e;return e=a.isEditing?c.update({id:d.id},d).$promise.then(function(c){return b.$emit("transaction-updated",c),a.$hide(),c}):c.save(d).$promise.then(function(a){return h(),b.$emit("transaction-created",a),a})}function g(a,c){a.first_installment_date=a.date,delete a.date,function(){a.total_value=accounting.formatNumber(c.total_value)}(),delete a.value,a.installments=c.installments;var d;return d=e.save(a).$promise.then(function(a){return h(),b.$emit("split-transaction-created",a),a})}a.formData={},a.selected_category=null,a.formData.date=moment(),a.isEditing=!1;var h=function(){a.sending=!1,a.formData.description="",a.formData.value="",a.category="",a.is_split_transaction=!1,a.installment={installments:1}};d.query().$promise.then(function(b){var c={name:gettext("Select a category")};b.unshift(c),a.categories=b}),h(),a.editingTransaction&&(a.isEditing=!0,a.formData=angular.copy(a.editingTransaction),a.formData.category=a.editingTransaction.category.resource_uri),a.submit=function(){var b,c=angular.copy(a.formData),d=this.transactionForm;d.$valid?(a.sending=!0,function(){c.value=accounting.formatNumber(c.value),c.date=c.date.format("DD/MM/YYYY")}(),b=a.is_split_transaction?g(c,a.installment):f(c),b["finally"](function(){d.$setPristine(),a.sending=!1})):(d.category.$dirty=!0,toastr.warning(gettext("Please fill in the fields correctly.")))},a.removeTransaction=function(d){c["delete"]({id:d.id}).$promise.then(function(){b.$emit("transaction-removed",d),a.$hide()})}}function TransactionListCtrl(a,b,c,d,e,f,g,h){"use strict";function i(){for(var b=[],c=e(a.groupBy),d=a.allTransactions,f={},g=0;g<d.length;g++){var h=d[g],i=c(h);i in f||(f[i]=[]),f[i].push(h)}for(var j in f){var k={name:j,transactions:f[j],total:0};for(var l in k.transactions){var m=parseFloat(k.transactions[l].value);k.total+=m}b.push(k)}return b}function j(b){a.allTransactions.push(b);var c=e(a.groupBy)(b);for(var d in a.transactionGroups){var f=a.transactionGroups[d];if(f.name===c)return f.transactions.unshift(b),void(f.total+=parseFloat(b.value))}a.transactionGroups.push({name:c,transactions:[b],total:parseFloat(b.value)})}a.days=[],a.groupBy=h.setDefault("transaction-list-group-by","category.name"),a.categories=[],a.filterDate=moment(),a.loading=!0,a.allTransactions=[],a.transactionGroups=[],a.orderDesc=h.setDefault("transaction-list-order-desc",!0),h.watch(a,"groupBy","transaction-list-group-by"),h.watch(a,"orderDesc","transaction-list-order-desc"),a.editTransaction=function(a){var c=b.$new();c.editingTransaction=a,g({scope:c,template:"/partials/transactions/transaction-edit"})},a.getAbsTotal=function(a){return Math.abs(a.total)};var k=function(d){var e,f,g;b.filterDate=d,a.transactionGroups=[],a.loading=!0,e=d.startOf("month"),f=moment(e).endOf("month"),g={date__gte:e.format("YYYY-MM-D"),date__lte:f.format("YYYY-MM-D"),limit:0},c.query(g).$promise.then(function(b){$.each(b,function(){this.loadInstallmentData()}),a.allTransactions=b,a.transactionGroups=i()})["finally"](function(){a.loading=!1})};a.moveMonth=function(b){a.filterDate=a.filterDate.clone()[b]("month",1)},a.isEmpty=function(){return 0===a.transactionGroups.length&&!a.loading},b.$on("transaction-updated",function(b,c){var d=$.grep(a.allTransactions,function(a){return a.id===c.id});if(d){d=d[0];var e=a.allTransactions.indexOf(d);a.allTransactions[e]=c,a.transactionGroups=i()}}),b.$on("transaction-created",function(b,c){var d=a.filterDate.month()+1,e=parseInt(c.date.split("-")[1]);d===e&&j(c)}),b.$on("split-transaction-created",function(b,d){var e=a.filterDate.month()+1;for(var f in d.transactions){var g=new c(d.transactions[f]),h=parseInt(g.date.split("-")[1]);if(h===e){g.setInstallmentData(d),j(g);break}}}),b.$on("transaction-removed",function(b,c){var d=a.allTransactions.indexOf(c);-1!==d&&(a.allTransactions.splice(d,1),a.transactionGroups=i())}),a.$watch("filterDate",k),a.$watch("filterDate",function(a){b.$emit("transaction-list-filter-date-changed",a)}),a.$watch("groupBy",function(){a.transactionGroups=i()})}!function(){"use strict";angular.module("webapp",["models","interceptor","ui.router","charts","ga","hashtags","ngAnimate","accounting","tutorial","mgcrea.ngStrap.modal","mgcrea.ngStrap.popover","mgcrea.ngStrap.tooltip"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/movimentacoes"),a.state("transactions",{url:gettext("/movimentacoes"),templateUrl:"/partials/transaction-list",controller:"TransactionListCtrl"}).state("reports",{url:gettext("/relatorios"),templateUrl:"/partials/reports",controller:"ReportsCtrl"}).state("reports.balance",{url:gettext("/balanco"),templateUrl:"/partials/reports/balance",controller:"BalanceChartCtrl"}).state("reports.top-categories",{url:gettext("/top-categorias"),templateUrl:"/partials/reports/top-categories",controller:"TopCategoriesChartCtrl"}).state("reports.category-comparison",{url:gettext("/comparacao-categorias"),templateUrl:"/partials/reports/category-comparison",controller:"CategoryComparisonCtrl"}),c.html5Mode(!1)}]).config(["$httpProvider",function(a){a.defaults.headers.common["X-CSRFToken"]=$("body > input[name=csrfmiddlewaretoken]").val(),a.responseInterceptors.push("sessionInterceptor")}]).config(["$interpolateProvider",function(a){a.startSymbol("(("),a.endSymbol("))")}]).run(["$locale",function(a){moment().lang(a.id)}]).run(["$rootScope","$state","$window","Category",function(a,b,c,d){a.gettext=function(a){return gettext(a)},a.interpolate=function(a,b,c){return interpolate(a,b,c)},a.$state=b,a.$on("$stateChangeSuccess",function(a,c){"reports"===c.name&&b.go("reports.balance")}),toastr.options={positionClass:"toast-bottom-right",fadeIn:400,fadeOut:500,timeOut:3e3,extendedTimeOut:3e3},toastr.notifyCreationSuccess=function(a,b){toastr.success(gettext("%s sucessfuly created!").replace("%s",a))},toastr.notifyUpdateSuccess=function(a,b){toastr.success(gettext("%s sucessfuly updated!").replace("%s",a))},toastr.notifyCreationFailure=function(a,b){toastr.error(gettext("An error ocurred creating %s.").replace("%s",a.toLowerCase()))},toastr.notifyRemovalSuccess=function(a,b){toastr.success(gettext("%s sucessfuly removed.").replace("%s",a))},String.prototype.format||(String.prototype.format=function(){var a=arguments;return this.replace(/{(\d+)}/g,function(b,c){return"undefined"!=typeof a[c]?a[c]:b})})}]).run(["$rootScope","Category","CategoryThreshold",function(a,b,c){b.query().$promise.then(function(b){return a.categories=b,b}),c.query().$promise.then(function(a){return a})}]).run(["$rootScope","$window",function(a,b){var c=768,d=992,e=1200,f=function(){var b=document.width,f="";f=c>b?"phone":d>b?"tablet":e>b?"desktop":"desktop-lg",f!==a.device&&(a.device=f,""!==f&&a.$broadcast("devicechanged",f))};b.onresize=function(){a.$apply(function(){f()})},f(),a.mobile=function(){var a=!1;return function(b){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,4)))&&(a=!0)}(navigator.userAgent||navigator.vendor||window.opera),a}(),a.mobile&&(toastr.options={positionClass:"toast-bottom-full-width"})}])}(),function(){"use strict";angular.module("webapp").directive("categoryCollapse",["$rootScope","$parse",function(a,b){function c(c,d,e){function f(f){if(f&&moment(f.date).month()===a.filterDate.month()){var g=b(e.categoryCollapse)(c);f.category.name===g?d.collapse("show"):d.collapse("hide")}}d.collapse({toggle:!1});var g=a.$on("transaction-created",function(a,b){f(b)});c.$on("$destroy",function(){g()}),f(a.lastCreatedTransaction)}function d(b,d){return a.$on("transaction-created",function(b,c){a.lastCreatedTransaction=c}),c}return a.lastCreatedTransaction=null,{compile:d}}]).directive("monthSelector",["$locale",function(a){return{scope:{date:"=monthSelector"},link:function(b,c,d,e){var f=function(a){var b=moment(a).format("MMMM - YYYY");c.text(b)},g=function(a){a=a.toDate(),f(a),c.data("datepicker").update(a)};b.$watch("date",g);var h=function(a){f(a.date);var d=c.data("datepicker");d.hide(),b.$apply(function(){b.date=moment(a.date)})};c.datepicker({format:"dd-mm-yyyy",language:a.id,keyboardNavigation:!1,startView:1,minViewMode:1,todayBtn:"linked",todayHighlight:!0}).on("changeDate",h)}}}]).directive("isPositiveClass",["$filter","$parse",function(a,b){return{link:function(a,c,d){var e=b(d.isPositiveClass),f=parseFloat(e(a)),g="";f>0?g="renevue":0>f&&(g="expense"),c.addClass(g)}}}]).directive("confirmationNeeded",function(){return{link:{pre:function(a,b,c){var d=c.confirmationNeeded||gettext("Confirm action");c.ngClick;b.bind("click",function(b){a.$apply(function(){window.confirm(d)||(b.stopImmediatePropagation(),b.preventDefault())})})}}}}).directive("tooltip",function(){return{link:function(a,b,c){"tooltip"===c.toggle&&b.tooltip()}}}).directive("categoryField",["Category","$rootScope",function(a,b){return{require:"?ngModel",restrict:"A",link:function(a,c,d,e){b.mobile||(c.removeClass("form-control"),c.addClass("selectpicker"),c.selectpicker({noneSelectedText:gettext("Select one")}),a.$watch("categories",function(){c.selectpicker("refresh")}),a.$watch(d.ngModel,function(a,b){c.selectpicker("render")}))}}}]).directive("exActionbar",function(){return{restrict:"A",link:function(a,b,c,d){b.bind("click",function(a){a.stopImmediatePropagation(),a.target.tooltip&&a.target.tooltip("destroy")}),b.parent().hover(function(){$(this).addClass("tr-hover")},function(){$(this).removeClass("tr-hover")})}}}).directive("dateField",["$locale","$rootScope",function(a,b){var c,d,e,f=b.mobile;return f?(Modernizr.inputtypes.date?(c='<input type="date" ng-model="inputDate" pattern="dd/mm/yyyy" class="form-control" required></input>',e="YYYY-MM-DD"):(c='<input type="text" ng-model="inputDate" class="form-control" required></input>',e="DD/MM/YYYY"),d=function(a,b){var c=$('<i class="icon-calendar input-icon-prepend"></i>');c.insertBefore(b),a.inputDate=moment().format(e),a.$watch("inputDate",function(b){a.date=moment(b,e)})}):(c="<div></div>",d=function(b,c){c.removeClass("form-control"),b.$watch("date",function(a){moment.isMoment(a)&&(a=a.toDate()),c.datepicker("update",a)});var d=function(a){b.$apply(function(){b.date=moment(a.date)})};c.datepicker({language:a.id,format:"yyyy-mm-dd",keyboardNavigation:!1,todayHighlight:!0,todayBtn:"linked"}).on("changeDate",d)}),{restrict:"A",scope:{date:"=dateFieldModel"},replace:!0,template:c,link:d}}]).directive("thresholdIndicator",["$popover","$cacheFactory","CategoryThreshold","$rootScope",function(a,b,c,d){return{template:'<div class="threshold-indicator" ng-class="style_threshold_completion(group)">&nbsp;</div>',scope:{category:"=thresholdIndicator"},link:function(e,f){function g(){return e.formData={},window.has_subscription?void(e.category.threshold?e.state=e.STATES.FLAT:e.state=e.STATES.NEW):void(e.state=e.STATES.NO_PLAN_MSG)}e.STATES={NO_PLAN_MSG:-1,FLAT:0,NEW:1,ALTER:2};var h=e.$watch(function(){return e.categoryObj=b.get("category").get(e.category.name)},function(){if(e.categoryObj&&e.categoryObj.is_negative){e.style_threshold_completion=function(){var a,b=e.category.threshold;return b&&void 0!==b.completion?(a=Math.abs(b.completion/b.value),a=Math.round(10*a),a=Math.max(1,a),a=Math.min(9,a),"threshold-indicator-"+a):"fa fa-bell-o"};var c=a(f,{trigger:"manual",container:"body",scope:e,contentTemplate:"threshold/popover_content.tpl.html"});if(f.click(function(a){a.stopPropagation(),c.toggle()}),$("body").on("click",function(a){var b=c.$element;c.$isShown&&($(b).is(a.target)||0!==$(b).has(a.target).length||(c.hide(),g()))}),!window.has_subscription)return void(e.state=e.STATES.NO_PLAN_MSG);var d=e.$watch(function(){return e.category.threshold=b.get("category-threshold").get(e.category.name)},function(){e.category.threshold?e.state=e.STATES.FLAT:e.state=e.STATES.NEW,e.$watch("category.total",function(a){e.category.threshold&&(e.category.threshold.completion=a)}),e.formData={value:null},d()});h()}});e.startEdit=function(a){a.stopPropagation(),e.state=e.STATES.ALTER,e.formData=angular.copy(e.category.threshold)},e.removeThreshold=function(a){a.stopPropagation();var b=e.category.threshold;c["delete"]({id:b.id},function(){e.category.threshold=null,g(),d.$emit(c.EVENT_DELETE,b)})},e.submit=function(){var a,b,f={value:e.formData.value,category:e.categoryObj.resource_uri};e.category.threshold&&(f.id=e.category.threshold.id);var g=new c(f);g.id?(a=g.$update({id:g.id}),b="updated"):(a=g.$save(),b="created"),a.then(function(a){e.state=e.STATES.FLAT,a.completion=e.category.total,e.category.threshold=a,d.$emit("category-threshold-"+b,a)})}}}}])}(),function(){"use strict";angular.module("webapp").factory("UserOptions",["$window",function(a){var b="nq-";return{get:function(c){return a.localStorage.getItem(b+c)},set:function(c,d){a.localStorage.setItem(b+c,d)},setDefault:function(c,d){var e=a.store.get(b+c);return void 0===e?a.store.set(b+c,d):e},watch:function(c,d,e){c.$watch(d,function(c){a.store.set(b+e,c)})}}}]),angular.module("interceptor",[]).factory("sessionInterceptor",["$q","$window",function(a,b){return function(c){return c.then(null,function(c){return 401===c.status&&(b.location.href="/login"),(0===c.status||c.status>=400||c.status<600)&&toastr.error(gettext("Oops! Something went wrong. Please try again later.")),a.reject(c)})}}])}(),BalancePanelCtrl.$inject=["$scope","$rootScope","BalanceChart","Transaction","SplitTransaction"],FeedbackFormCtrl.$inject=["$scope","$http"],InstallmentFormCtrl.$inject=["$scope","$filter"],ReportsCtrl.$inject=["$scope","$rootScope","UserOptions"],CategoryComparisonCtrl.$inject=["$scope","$q","$rootScope","CategoryComparison","Category"],TopCategoriesChartCtrl.$inject=["$q","$scope","TopCategories"],BalanceChartCtrl.$inject=["$q","$scope","BalanceChart"],TransactionActionBarCtrl.$inject=["$scope","Transaction","$rootScope"],TransactionFormCtrl.$inject=["$scope","$rootScope","Transaction","Category","SplitTransaction"],TransactionListCtrl.$inject=["$scope","$rootScope","Transaction","$filter","$parse","SplitTransaction","$modal","UserOptions"],function(){"use strict";angular.module("accounting",[]).config(function(){accounting.settings={currency:{symbol:"R$",decimal:",",thousand:".",precision:2,format:{pos:"%s %v",neg:"- %s %v",zero:"%s %v"}},number:{precision:2,thousand:".",decimal:","}}}).directive("currencyField",function(){return{restrict:"A",require:"?ngModel",link:function(a,b,c,d){var e=accounting.settings.currency.decimal,f=accounting.settings.currency.thousand;b.on("keydown",function(c){var f,g,h=c.keyCode,i=accounting.toFixed(accounting.unformat(b.val(),e),2).replace(".","");if(9!==h&&13!==h){if(c.preventDefault(),h>=48&&57>=h)g=c.keyCode-48,f=i+g;else if(h>=96&&105>=h)g=c.keyCode-96,f=i+g;else{if(8!==h)return;f=i.substr(0,i.length-1)}f=f.substring(0,f.length-2)+"."+f.substring(f.length-2),f=accounting.formatMoney(f),b.val(f),d.$setViewValue(f),a.$apply()}}),d.$parsers.push(function(a){return a=accounting.unformat(a,e,f)}),d.$formatters.push(function(a){return a=accounting.formatMoney(a)})}}})}(),function(){"use strict";function a(a){var b,c=[];for(var d in a){var e=a[d],f="MMM";e.year()!==b&&(b=e.year(),f="MMM YYYY"),c.push(e.format(f))}return c}angular.module("charts",[]).config(function(){Highcharts.setOptions({chart:{backgroundColor:"rgba(255, 255, 255, 0.002)"},credits:{enabled:!1},plotOptions:{series:{dataLabels:{crop:!1,style:{textShadow:"1px 1px 0px #FFF, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff, 2px 2px 0px #FFF, -2px 2px 0px #fff, 2px -2px 0px #fff, -2px -2px 0px #fff"}}}}})}).factory("BalanceChart",["$http","$filter","$q",function(b,c,d){return{fetchData:function(c){var e=this,f=d.defer();return b.get("/api/v1/data/balance/",{params:c}).then(function(b){var c={},d=[],g={data:[],name:gettext("Renevues"),color:"#46a546",codename:"renevues"},h={data:[],name:gettext("Expenses"),color:"#9d261d",codename:"expenses"},i={data:[],name:gettext("Total"),type:"area",visible:!1},j={data:[],name:gettext("Average"),type:"spline",visible:!1},k=[];$.extend(!0,c,e.chartOptions);for(var l in b.data){var m=b.data[l],n=parseFloat(m.renevues),o=parseFloat(m.expenses),p=n+o,q=0,r=1;k.push(p);for(var s=5>l?0:l-5;l>=s;s++){var t=parseFloat(b.data[s].renevues)+parseFloat(b.data[s].expenses);0!==t&&r++,q+=t}q/=r,d.push(moment(m.period,"YYYY-MM-DD")),g.data.push(n),h.data.push(Math.abs(o)),i.data.push(p),j.data.push(q)}c.xAxis.categories=a(d),c.series=[g,h,i,j],f.resolve({options:c,result:b.data})},function(a){f.reject(a)}),f.promise},chartOptions:{chart:{type:"column",spacingLeft:3,spacingRight:3},title:{text:null},xAxis:{},legend:{enabled:"true"},yAxis:{title:null,plotLines:[{value:0,color:"#000",width:1,zIndex:4}]},tooltip:{enabled:!1,formatter:function(){var a=this.points[0],b=this.points[1],d=0,e=0;return"expenses"===a.series.codename?(d=b.y,e=-a.y):(d=a.y,e=-b.y),'<p class="total">Total: <b>{0}</b></p>'.format(c("currency")(d+e))},borderRadius:0,borderWidth:1,shadow:!1,shared:!0,animation:!1,useHTML:!0},plotOptions:{spline:{dataLabels:{enabled:!0,formatter:function(){return 0!==this.y?c("currency")(this.y):""}}},column:{pointPadding:.1,borderWidth:0,dataLabels:{enabled:!0,formatter:function(){return 0!==this.y?c("currency")(this.y):""}}},area:{fillOpacity:.1,lineWidth:1,lineColor:"#ccc",dataLabels:{enabled:!0,formatter:function(){return 0!==this.y?c("currency")(this.y):""}}}}}}}]).factory("TopCategories",["$q","$filter","Transaction",function(a,b,c){return{fetchData:function(b){var d=this,e=a.defer();return b=b||{},b.group_by=["category__name"],b.date__gte=b.date_start,b.date__lte=b.date_end,c.query(b).$promise.then(function(a){var b={},c=[];$.extend(!0,b,d.chartOptions);for(var f in a){var g=a[f],h=g.sum;0>h&&(h=-1*h,c.push([g.category__name,h]))}b.series=[{data:c}],e.resolve({options:b,result:a})},function(a){e.reject(a)}),e.promise},chartOptions:{chart:{type:"pie"},title:{text:""},legend:{enabled:!0,layout:"vertical",align:"left",verticalAlign:"top",borderWidth:0},tooltip:{enabled:!1},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,formatter:function(){var a=b("currency")(this.point.y),c=this.point.percentage.toFixed(2),d=this.point.name;return"<b>{0}</b> <br/>{1} ({2}%)".format(d,a,c)}},showInLegend:!0}}}}}]).factory("CategoryComparison",["$q","$filter","Transaction",function(b,c,d){return{fetchData:function(c){var e=this,f=b.defer();c=c||{},c.group_by="date__month,category__name";var g=[],h=moment(c.date_start),i=moment(c.date_end),j=[];do g.push(h.format("MMM YYYY")),j.push(h.clone()),h.add("months",1);while(i>h);g.length;return d.query(c).$promise.then(function(b){var c={},d=[],h=gettext("Expenses"),i=gettext("Renevues"),k={};k[h]={name:h,data:[],type:"area"},k[i]={name:i,data:[],type:"area"};for(var l=0;l<b.length;l++){var m=b[l],n=moment(m.date__month).format("MMM YYYY"),o=m.category__name,p=m.sum;k[o]=k[o]||{name:"",data:[]};var q=g.indexOf(n);k[o].data[q]=Math.abs(p),k[o].name=m.category__name,p>0?(k[i].data[q]=k[i].data[q]||0,k[i].data[q]+=p):(k[h].data[q]=k[h].data[q]||0,k[h].data[q]+=Math.abs(p))}for(var r in k){for(var s=0;s<k[r].data.length;s++)void 0===k[r].data[s]&&(k[r].data[s]=0);d.push(k[r])}$.extend(!0,c,e.chartOptions),c.series=d,c.xAxis.categories=a(j),f.resolve({options:c,result:b})},function(a){f.reject(a)}),f.promise},chartOptions:{chart:{type:"line"},title:{text:""},xAxis:{tickmarkPlacement:"on",title:{enabled:!1}},yAxis:{title:{text:""},labels:{formatter:function(){return this.value}}},tooltip:{enabled:!1,shared:!0,formatter:function(){for(var a="",b=0;b<this.points.length;b++){var c=this.points[b];a+="<p><strong>"+c.series.name+"</strong>"+c.y+"</p>"}return a}},plotOptions:{area:{fillOpacity:.1,lineWidth:1},series:{dataLabels:{enabled:!0,formatter:function(){return c("currency")(this.y)}}}}}}}]).directive("chart",[function(){return{restrict:"A",template:"<div></div>",scope:{chartData:"=value"},transclude:!0,replace:!0,link:function(a,b,c){var d={chart:{renderTo:b[0],type:c.type||null,height:c.height||null,width:c.width||null}};a.$watch("chartData",function(a){if(a){var b=!0,c={};$.extend(b,c,d,a.options);new Highcharts.Chart(c,c._loadCb)}})}}}])}(),function(){"use strict";angular.module("ga",[]).config(function(){void 0===window.ga&&(console.warn("Your attention please: ga is not present. Using '_ga' as a dummy instead."),window._ga=[],window.ga=function(){_ga.push(arguments)})}).directive("track",function(){return{retrict:"A",link:function(a,b,c){var d=c.track.split(","),e=d.splice(0,1)[0],f=d.shift(),g=d.shift(),h=d.shift();b.on(e,function(){ga("send","event",f,g,h)})}}}).factory("Tracker",function(){return{event:function(a,b,c,d){ga("send","event",a,b,c,d)},pageview:function(a){ga("send","pageview",a)}}}).run(["$rootScope","$location",function(a,b){var c="Transactions",d="Reports",e="Account";ga("send","event",e,"login",{metric2:1}),window.isUserFirstLogin?(ga("send","event",e,"create",{metric1:1}),window.isUserFirstTransaction=!0):window.isUserFirstTransaction=!1,a.$on("transaction-created",function(a,b){window.isUserFirstTransaction&&(ga("send","event",c,"create-first"),window.isUserFirstTransaction=!1),ga("send","event",c,"create",b.category.name,{metric3:1,dimension1:b.category.name})}),a.$on("transaction-removed",function(){ga("send","event","Transactions","remove")}),a.$on("category-comparison-category-selected",function(a,b){ga("send","event",d,"comparison-category-selection",b)}),a.$on("$stateChangeSuccess",function(){ga("send","pageview",b.path())})}]).run(["$rootScope","CategoryThreshold",function(a,b){var c="Threshold";a.$on(b.EVENT_CREATE,function(a,b){ga("send","event",c,"create",b.category.name)}),a.$on(b.EVENT_UPDATE,function(a,b){ga("send","event",c,"update",b.category.name)}),a.$on(b.EVENT_DELETE,function(a,b){ga("send","event",c,"delete",b.category.name)})}])}(),function(){"use strict";angular.module("hashtags",[]).directive("hashtagged",[function(){return{link:function(a,b,c){var d=/(#[a-zA-Zà-úÀ-Ú0-9\-]+)+/g,e='<span class="label label-primary">';a.$watch(c.ngBind,function(a,c){var f=a.match(d),g="",h=a;for(var i in f){var j=f[i],k=e+j+"</span>";h=h.replace(j,k);var l=h.indexOf(k)-1+k.length;g+=h.substring(0,l+1),h=h.substring(l+1),b.html(g)}})}}}])}(),function(){"use strict";var a=function(a){return a.defaults.transformResponse.concat([function(a,b){if(a.meta&&a.objects){var c=a.objects;return c.meta=a.meta,c}return a}])};angular.module("models",["ngResource"]).factory("CategoryThreshold",["$resource","$rootScope","$http","$cacheFactory",function(b,c,d,e){var f=e("category-threshold"),g=b("/api/v1/threshold/category/:id",{},{query:{method:"GET",isArray:!0,transformResponse:a(d).concat(function(a){f.removeAll(),$.each(a,function(a,b){f.put(b.category.name,b),f.put(b.category.resource_uri,b)})})},update:{method:"PUT"}});return g.EVENT_DELETE="category-threshold-deleted",g.EVENT_UPDATE="category-threshold-updated",g.EVENT_CREATE="category-threshold-created",c.$on(g.EVENT_CREATE,function(a,b,c){f.put(b.category.name,b),f.put(b.category.resource_uri,b),c=c||{},c&&!c.silent&&toastr.notifyCreationSuccess(gettext("Limite de gastos"))}),c.$on(g.EVENT_UPDATE,function(a,b,c){f.put(b.category.name,b),f.put(b.category.resource_uri,b),c=c||{},c&&!c.silent&&toastr.notifyUpdateSuccess(gettext("Limite de gastos"))}),c.$on(g.EVENT_DELETE,function(a,b,c){f.remove(b.category.name),f.remove(b.category.resource_uri),c=c||{},c&&!c.silent&&toastr.notifyRemovalSuccess(gettext("Limite de gastos"))}),g}]).factory("SplitTransaction",["$resource","$rootScope","$http",function(b,c,d){var e=b("/api/v1/split_transaction/:id",{},{query:{method:"GET",isArray:!0,cache:!0,transformResponse:a(d).concat(function(a,b){for(var c in a)a[c].total_value=parseFloat(a[c].total_value);return a})}});return e.EVENT_CREATE="split-transaction-created",c.$on(e.EVENT_CREATE,function(a,b,c){c=c||{},c&&!c.silent&&toastr.notifyCreationSuccess(gettext("Movimentação parcelada"))}),e}]).factory("Transaction",["$resource","$http","$rootScope","SplitTransaction",function(b,c,d,e){var f=b("/api/v1/transaction/:id",{},{query:{method:"GET",isArray:!0,transformResponse:a(c).concat(function(a,b){return $.each(a,function(a,b){b.value=parseFloat(b.value),void 0!==b.sum&&(b.sum=parseFloat(b.sum))}),a})},update:{method:"PUT"}});return f.prototype.setInstallmentData=function(a){this.installment_data="{0}/{1}".format(this.installment_number,a.transactions.length)},f.prototype.loadInstallmentData=function(){if(this.installment_data)return!1;if(this.installment_of){var a=this.installment_of.split("/"),b=a[a.length-1],c=this;return e.get({id:b},function(a){c.setInstallmentData(a)})}return!1},f.EVENT_CREATE="transaction-created",f.EVENT_UPDATE="transaction-updated",f.EVENT_DELETE="transaction-removed",d.$on(f.EVENT_CREATE,function(a,b,c){c=c||{},c&&!c.silent&&toastr.notifyCreationSuccess(gettext("Movimentação"));
}),d.$on(f.EVENT_UPDATE,function(a,b,c){c=c||{},c&&!c.silent&&toastr.notifyUpdateSuccess(gettext("Movimentação"))}),d.$on(f.EVENT_DELETE,function(a,b,c){c=c||{},c&&!c.silent&&toastr.notifyRemovalSuccess(gettext("Movimentação"))}),f}]).factory("Category",["$resource","$cacheFactory","$http",function(b,c,d){var e=c("category"),f=b("/api/v1/category/:id",{id:"@id",limit:100},{query:{method:"GET",isArray:!0,cache:e,transformResponse:a(d).concat(function(a){return $.each(a,function(a,b){e.put(b.name,b),e.put(b.resource_uri,b)}),a})},update:{method:"PUT"}});return f}])}(),function(){"use strict";function a(a,b){a=a.split("_");var d=a.splice(0,1),e=a.join("_");if("current_step"===e&&0===b)ga("send","event","Tutorial","started",d);else if("end"===e&&"yes"===b)return void ga("send","event","Tutorial","finish",d);var f=c+d+"/"+b;ga("send","pageview",f)}var b={},c="/tutorial/";angular.module("tutorial",[]).run(["$rootScope",function(c){function d(){if(!c.mobile&&window.isUserFirstLogin){var a=cxApi.chooseVariation(),b=angular.copy(e);b.name="interface-tutorial";var d=new Tour(b);if(d.addSteps([{title:gettext("Bem vindo!"),orphan:!0,content:gettext('Seja bem vindo ao Niqels! Vamos lhe mostrar um breve tutorial sobre como utilizar o site. Clique em "Próximo" para começar.')},{element:"#transaction-form-column",title:gettext("Nova movimentação"),content:gettext("Utilize este formulário para criar novas movimentaçoes."),onShow:function(){var a=$("form#transaction-form"),b=$("select",a);b.prop("disabled",!0),b.data("selectpicker").refresh(),$("input, button",a).prop("disabled",!0)},onHidden:function(){var a=$("form#transaction-form"),b=$("select",a);b.prop("disabled",!1),b.data("selectpicker").refresh(),$("input, button",a).prop("disabled",!1)}},{element:"#transaction-list-panel",title:gettext("Lista de movimentações"),content:gettext("Aqui você verá suas movimentações. Utilize os controles para customizar a listagem."),placement:"bottom",onShow:function(){$("#transaction-list-panel .area-header a").prop("disabled",!0),$("#transaction-list-panel .month-selector button").prop("disabled",!0)},onHidden:function(){$("#transaction-list-panel .area-header a").prop("disabled",!1),$("#transaction-list-panel .month-selector button").prop("disabled",!1)}},{element:"#balance-panel",title:gettext("Balanço"),content:gettext('Este painel mostrará seu balanço do mes atual. Para saber mais detalhes, use o link "Ver relatório completo..."'),placement:"left",onShow:function(a){var b=$("#balance-panel a");a.balanceLinkHref=b.prop("href"),b.prop("href","")},onHidden:function(a){var b=$("#balance-panel a");b.prop("href",a.balanceLinkHref)}},{element:"#transaction-form-column",title:gettext("Criar nova movimentação"),content:gettext("Você está pronto para usar o site! Experimente criar sua primeira movimentação.")}]),0===a){var f='<div>Welcome to Niqels, {0}!<br/>Gostaria de ver um tutorial?</div><div class="action-bar"><button type="button" id="watch-tutorial" class="btn btn-primary btn-sm">Sim</button><button type="button" id="do-nothing" class="btn btn-default btn-sm">Não</button></div>'.format(window.userName),g=toastr.info(f,null,{timeOut:"0",extendedTimeOut:"0",onclick:function(a){a.stopPropagation()}});$("#watch-tutorial",g).click(function(){g.remove(),d.init(),d.start()}),$("#do-nothing",g).click(function(){g.remove(),ga("send","event","Tutorial","skip",b.name)})}else 1===a&&(d.init(),d.start())}}var e;e={backdrop:!0,template:function(a,b){var c,d=gettext("Anterior"),e="<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'>";if(-1!==b.prev&&(e+="<button class='btn btn-link' data-role='prev'>« "+d+"</button>"),-1!==b.next&&-1!==b.prev&&(e+="<span data-role='separator'>|</span>"),-1!==b.next){var f;c=gettext("Sair"),f=0===b.next?gettext("Iniciar"):gettext("Próximo"),e+="<button class='btn btn-link' data-role='next'>"+f+" »</button>"}else c=gettext("Finalizar");return e+="<button class='btn btn-link' data-role='end'>"+c+"</button></div></div>"},afterSetState:a},b.interfaceTutorial=d}]).directive("showTutorial",[function(){return{scope:{tutorial:"@showTutorial"},link:function(a){b[a.tutorial]()}}}])}();