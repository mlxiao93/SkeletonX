/** 骨架元素描述 */

/**
 * 提取骨架描述
 */
function getSkelentonDesc(opt) {
  const {
    node,
    level,
    index,
    parentDesc
  } = opt;

  if (![Node.ELEMENT_NODE, Node.TEXT_NODE].includes(node.nodeType)) {
    // 只处理元素节点和文本节点
    return null;
  }

  let element = node;
  /** 处理文本节点 */

  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.textContent.replace(/↵|\s/g, '')) {
      // 过滤无内容的文本节点
      return null;
    }

    element = node.parentElement;
  }

  const style = getComputedStyle(element);
  /** 过滤不可见元素 */

  let ignore = false;
  if (style.display === 'none') ignore = true;else if (style.visibility === 'hidden') ignore = true;else if (style.overflow === 'hidden' && element.offsetHeight * element.offsetWidth === 0) ignore = true;

  if (ignore) {
    return null;
  }

  const clientRect = element.getBoundingClientRect();
  return {
    parentId: parentDesc?.id,
    id: parentDesc ? `${parentDesc.id}[${index}]` : '',
    level,
    nodeType: node.nodeType,
    x: clientRect.left,
    y: clientRect.top,
    offsetHeight: element.offsetHeight,
    offsetWidth: element.offsetWidth,
    border: style.border,
    borderBottom: style.borderBottom,
    borderLeft: style.borderLeft,
    borderRight: style.borderRight,
    borderTop: style.borderTop,
    borderRadius: style.borderRadius,
    boxShadow: style.boxShadow,
    background: style.background // $node: node,    // for debug

  };
}
/**
 * 生成骨架元素扁平数据
 */

function generateSkeletonDescList(opt) {
  const {
    node,
    parentDesc,
    level = 0,
    index = 0,
    list = []
  } = opt;
  const skelentonDesc = getSkelentonDesc({
    node,
    level,
    index,
    parentDesc
  });
  if (!skelentonDesc) return;
  list.push(skelentonDesc);

  if (node.hasChildNodes()) {
    for (let i = 0; i < node.childNodes.length; i++) {
      generateSkeletonDescList({
        node: node.childNodes[i],
        parentDesc: skelentonDesc,
        level: level + 1,
        index: i,
        list
      });
    }
  }

  return list;
}

var n,u,i,t,o,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function v(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return h(n,f,i,t,null)}function h(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++n.__v:o};return null!=n.vnode&&n.vnode(r),r}function y(){return {current:null}}function p(n){return n.children}function d(n,l){this.props=n,this.context=l;}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?_(n):null}function w(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return w(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!g.__r++||t!==n.debounceRendering)&&((t=n.debounceRendering)||i)(g);}function g(){for(var n;g.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=s({},t)).__v=t.__v+1,$(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?_(t):o,t.__h),j(u,t),t.__e!=o&&w(t)));});}function m(n,l,u,i,t,o,r,c,s,v){var y,d,w,k,g,m,x,P=i&&i.__k||e,C=P.length;for(s==f&&(s=null!=r?r[0]:C?_(i,0):null),u.__k=[],y=0;y<l.length;y++)if(null!=(k=u.__k[y]=null==(k=l[y])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?h(null,k,null,null,k):Array.isArray(k)?h(p,{children:k},null,null,null):k.__b>0?h(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(w=P[y])||w&&k.key==w.key&&k.type===w.type)P[y]=void 0;else for(d=0;d<C;d++){if((w=P[d])&&k.key==w.key&&k.type===w.type){P[d]=void 0;break}w=null;}$(n,k,w=w||f,t,o,r,c,s,v),g=k.__e,(d=k.ref)&&w.ref!=d&&(x||(x=[]),w.ref&&x.push(w.ref,null,k),x.push(d,k.__c||g,k)),null!=g?(null==m&&(m=g),"function"==typeof k.type&&null!=k.__k&&k.__k===w.__k?k.__d=s=b(k,s,n):s=A(n,k,w,P,r,g,s),v||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&w.__e==s&&s.parentNode!=n&&(s=_(w));}if(u.__e=m,null!=r&&"function"!=typeof u.type)for(y=r.length;y--;)null!=r[y]&&a(r[y]);for(y=C;y--;)null!=P[y]&&("function"==typeof u.type&&null!=P[y].__e&&P[y].__e==u.__d&&(u.__d=_(i,y+1)),L(P[y],P[y]));if(x)for(y=0;y<x.length;y++)I(x[y],x[++y],x[++y]);}function b(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?b(t,l,u):A(u,t,t,n.__k,null,t.__e,l));return l}function x(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){x(n,l);}):l.push(n)),l}function A(n,l,u,i,t,o,r){var f,e,c;if(void 0!==l.__d)f=l.__d,l.__d=void 0;else if(t==u||o!=r||null==o.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(o),f=null;else {for(e=r,c=0;(e=e.nextSibling)&&c<i.length;c+=2)if(e==o)break n;n.insertBefore(o,r),f=r;}return void 0!==f?f:o.nextSibling}function P(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||z(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||z(n,o,l[o],u[o],i);}function C(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px";}function z(n,l,u,i,t){var o,r,f;if(t&&"className"==l&&(l="class"),"style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||C(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||C(n.style,l,u[l]);}else "o"===l[0]&&"n"===l[1]?(o=l!==(l=l.replace(/Capture$/,"")),(r=l.toLowerCase())in n&&(l=r),l=l.slice(2),n.l||(n.l={}),n.l[l+o]=u,f=o?T:N,u?i||n.addEventListener(l,f,o):n.removeEventListener(l,f,o)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&"download"!==l&&"href"!==l&&!t&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u));}function N(l){this.l[l.type+!1](n.event?n.event(l):l);}function T(l){this.l[l.type+!0](n.event?n.event(l):l);}function $(l,u,i,t,o,r,f,e,c){var a,v,h,y,_,w,k,g,b,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,b=(a=P.contextType)&&t[a.__c],x=a?b?b.props.value:a.__:t,i.__c?k=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new d(g,x),v.constructor=P,v.render=M),b&&b.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=s({},v.__s)),s(v.__s,P.getDerivedStateFromProps(g,v.__s))),y=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else {if(null==P.getDerivedStateFromProps&&g!==y&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(y,_,w);});}v.context=x,v.props=g,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=s(s({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(w=v.getSnapshotBeforeUpdate(y,_)),A=null!=a&&a.type===p&&null==a.key?a.props.children:a,m(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,c),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),k&&(v.__E=v.__=null),v.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=H(i.__e,u,i,t,o,r,f,c);(a=n.diffed)&&a(u);}catch(l){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),n.__e(l,u,i);}}function j(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n.__e(l,u.__v);}});}function H(n,l,u,i,t,o,r,c){var s,a,v,h,y,p=u.props,d=l.props;if(t="svg"===l.type||t,null!=o)for(s=0;s<o.length;s++)if(null!=(a=o[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,o[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),o=null,c=!1;}if(null===l.type)p===d||c&&n.data===d||(n.data=d);else {if(null!=o&&(o=e.slice.call(n.childNodes)),v=(p=u.props||f).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""));}P(n,d,p,t,c),h?l.__k=[]:(s=l.props.children,m(n,Array.isArray(s)?s:[s],l,u,i,"foreignObject"!==l.type&&t,o,r,f,c)),c||("value"in d&&void 0!==(s=d.value)&&(s!==n.value||"progress"===l.type&&!s)&&z(n,"value",s,p.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&z(n,"checked",s,p.checked,!1));}return n}function I(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,i);}}function L(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||I(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L(t[r],u,i);null!=o&&a(o);}function M(n,l,u){return this.constructor(n,u)}function O(l,u,i){var t,r,c;n.__&&n.__(l,u),r=(t=i===o)?null:i&&i.__k||u.__k,l=v(p,null,[l]),c=[],$(u,(t?u:i||u).__k=l,r||f,f,void 0!==u.ownerSVGElement,i&&!t?[i]:r?null:u.childNodes.length?e.slice.call(u.childNodes):null,c,i||f,t),j(c,l);}function S(n,l){O(n,l,o);}function q(n,l,u){var i,t,o,r=arguments,f=s({},n.props);for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),h(n.type,f,i||n.key,t||n.ref,null)}function B(n,l){var u={__c:l="__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k);},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t,o=l.__h;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return l.__h=o,u.__E=u}catch(l){n=l;}throw n},__v:0},d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(s({},u),this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this));},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this));},d.prototype.render=p,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0,o=f,r=0;

var t$1,u$1,r$1,o$1=0,i$1=[],c$1=n.__b,f$1=n.__r,e$1=n.diffed,a$1=n.__c,v$1=n.unmount;function m$1(t,r){n.__h&&n.__h(u$1,t,o$1||r),o$1=0;var i=u$1.__H||(u$1.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function l(n){return o$1=1,p$1(w$1,n)}function p$1(n,r,o){var i=m$1(t$1++,2);return i.t=n,i.__c||(i.__=[o?o(r):w$1(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}));}],i.__c=u$1),i.__}function y$1(r,o){var i=m$1(t$1++,3);!n.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u$1.__H.__h.push(i));}function h$1(r,o){var i=m$1(t$1++,4);!n.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u$1.__h.push(i));}function s$1(n){return o$1=5,d$1(function(){return {current:n}},[])}function _$1(n,t,u){o$1=6,h$1(function(){"function"==typeof n?n(t()):n&&(n.current=t());},null==u?u:u.concat(n));}function d$1(n,u){var r=m$1(t$1++,7);return k$1(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A$1(n,t){return o$1=8,d$1(function(){return n},t)}function F(n){var r=u$1.context[n.__c],o=m$1(t$1++,9);return o.__c=n,r?(null==o.__&&(o.__=!0,r.sub(u$1)),r.props.value):n.__}function T$1(t,u){n.useDebugValue&&n.useDebugValue(u?u(t):t);}function x$1(){i$1.forEach(function(t){if(t.__P)try{t.__H.__h.forEach(g$1),t.__H.__h.forEach(j$1),t.__H.__h=[];}catch(u){t.__H.__h=[],n.__e(u,t.__v);}}),i$1=[];}n.__b=function(n){u$1=null,c$1&&c$1(n);},n.__r=function(n){f$1&&f$1(n),t$1=0;var r=(u$1=n.__c).__H;r&&(r.__h.forEach(g$1),r.__h.forEach(j$1),r.__h=[]);},n.diffed=function(t){e$1&&e$1(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i$1.push(o)&&r$1===n.requestAnimationFrame||((r$1=n.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b$1&&cancelAnimationFrame(t),setTimeout(n);},r=setTimeout(u,100);b$1&&(t=requestAnimationFrame(u));})(x$1)),u$1=void 0;},n.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g$1),t.__h=t.__h.filter(function(n){return !n.__||j$1(n)});}catch(r){u.some(function(n){n.__h&&(n.__h=[]);}),u=[],n.__e(r,t.__v);}}),a$1&&a$1(t,u);},n.unmount=function(t){v$1&&v$1(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(g$1);}catch(t){n.__e(t,u.__v);}};var b$1="function"==typeof requestAnimationFrame;function g$1(n){var t=u$1;"function"==typeof n.__c&&n.__c(),u$1=t;}function j$1(n){var t=u$1;n.__c=n.__(),u$1=t;}function k$1(n,t){return !n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function w$1(n,t){return "function"==typeof t?t(n):t}

function C$1(n,t){for(var e in t)n[e]=t[e];return n}function S$1(n,t){for(var e in n)if("__source"!==e&&!(e in t))return !0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return !0;return !1}function E(n){this.props=n;}function g$2(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return !r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:S$1(this.props,n)}function r(t){return this.shouldComponentUpdate=e,v(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(E.prototype=new d).isPureReactComponent=!0,E.prototype.shouldComponentUpdate=function(n,t){return S$1(this.props,n)||S$1(this.state,t)};var w$2=n.__b;n.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),w$2&&w$2(n);};var R="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function x$2(n){function t(t,e){var r=C$1({},t);return delete r.ref,n(r,(e=t.ref||e)&&("object"!=typeof e||"current"in e)?e:null)}return t.$$typeof=R,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var N$1=function(n,t){return null==n?null:x(x(n).map(t))},k$2={map:N$1,forEach:N$1,count:function(n){return n?x(n).length:0},only:function(n){var t=x(n);if(1!==t.length)throw "Children.only";return t[0]},toArray:x},A$2=n.__e;function O$1(n){return n&&(n.__c&&n.__c.__H&&(n.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),n.__c.__H=null),(n=C$1({},n)).__c=null,n.__k=n.__k&&n.__k.map(O$1)),n}function L$1(n){return n&&(n.__v=null,n.__k=n.__k&&n.__k.map(L$1)),n}function U(){this.__u=0,this.t=null,this.__b=null;}function F$1(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function M$1(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n;},function(n){r=n;}),r)throw r;if(!e)throw t;return v(e,u)}return u.displayName="Lazy",u.__f=!0,u}function T$2(){this.u=null,this.o=null;}n.__e=function(n,t,e){if(n.then)for(var r,u=t;u=u.__;)if((r=u.__c)&&r.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),r.__c(n,t);A$2(n,t,e);},(U.prototype=new d).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=F$1(r.__v),o=!1,i=function(){o||(o=!0,e.componentWillUnmount=e.__c,u?u(l):l());};e.__c=e.componentWillUnmount,e.componentWillUnmount=function(){i(),e.__c&&e.__c();};var l=function(){var n;if(!--r.__u)for(r.state.__e&&(r.__v.__k[0]=L$1(r.state.__e)),r.setState({__e:r.__b=null});n=r.t.pop();)n.forceUpdate();},c=!0===t.__h;r.__u++||c||r.setState({__e:r.__b=r.__v.__k[0]}),n.then(i,i);},U.prototype.componentWillUnmount=function(){this.t=[];},U.prototype.render=function(n,t){this.__b&&(this.__v.__k&&(this.__v.__k[0]=O$1(this.__b)),this.__b=null);var e=t.__e&&v(p,null,n.fallback);return e&&(e.__h=null),[v(p,null,t.__e?null:n.children),e]};var D=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2];}};function I$1(n){return this.getChildContext=function(){return n.context},n.children}function W(n){var t=this,e=n.i;t.componentWillUnmount=function(){O(null,t.l),t.l=null,t.i=null;},t.i&&t.i!==e&&t.componentWillUnmount(),n.__v?(t.l||(t.i=e,t.l={nodeType:1,parentNode:e,childNodes:[],appendChild:function(n){this.childNodes.push(n),t.i.appendChild(n);},insertBefore:function(n,e){this.childNodes.push(n),t.i.appendChild(n);},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),t.i.removeChild(n);}}),O(v(I$1,{context:t.context},n.__v),t.l)):t.l&&t.componentWillUnmount();}function j$2(n,t){return v(W,{__v:n,i:t})}(T$2.prototype=new d).__e=function(n){var t=this,e=F$1(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),D(t,n,r)):u();};e?e(o):o();}},T$2.prototype.render=function(n){this.u=null,this.o=new Map;var t=x(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},T$2.prototype.componentDidUpdate=T$2.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){D(n,e,t);});};var P$1="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,z$1=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,B$1=function(n){return ("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function V(n,t,e){return null==t.__k&&(t.textContent=""),O(n,t),"function"==typeof e&&e(),n?n.__c:null}function H$1(n,t,e){return S(n,t),"function"==typeof e&&e(),n?n.__c:null}d.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(d.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t});}});});var Z=n.event;function Y(){}function $$1(){return this.cancelBubble}function q$1(){return this.defaultPrevented}n.event=function(n){return Z&&(n=Z(n)),n.persist=Y,n.isPropagationStopped=$$1,n.isDefaultPrevented=q$1,n.nativeEvent=n};var G,J={configurable:!0,get:function(){return this.class}},K=n.vnode;n.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){for(var u in r={},e){var o=e[u];"defaultValue"===u&&"value"in e&&null==e.value?u="value":"download"===u&&!0===o?o="":/ondoubleclick/i.test(u)?u="ondblclick":/^onchange(textarea|input)/i.test(u+t)&&!B$1(e.type)?u="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(u)?u=u.toLowerCase():z$1.test(u)?u=u.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===o&&(o=void 0),r[u]=o;}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=x(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value);})),"select"==t&&null!=r.defaultValue&&(r.value=x(e.children).forEach(function(n){n.props.selected=r.multiple?-1!=r.defaultValue.indexOf(n.props.value):r.defaultValue==n.props.value;})),n.props=r;}t&&e.class!=e.className&&(J.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",J)),n.$$typeof=P$1,K&&K(n);};var Q=n.__r;n.__r=function(n){Q&&Q(n),G=n.__c;};var X={ReactCurrentDispatcher:{current:{readContext:function(n){return G.__n[n.__c].props.value}}}};function tn(n){return v.bind(null,n)}function en(n){return !!n&&n.$$typeof===P$1}function rn(n){return en(n)?q.apply(null,arguments):n}function un(n){return !!n.__k&&(O(null,n),!0)}function on(n){return n&&(n.base||1===n.nodeType&&n)||null}var ln=function(n,t){return n(t)};var React = {useState:l,useReducer:p$1,useEffect:y$1,useLayoutEffect:h$1,useRef:s$1,useImperativeHandle:_$1,useMemo:d$1,useCallback:A$1,useContext:F,useDebugValue:T$1,version:"16.8.0",Children:k$2,render:V,hydrate:H$1,unmountComponentAtNode:un,createPortal:j$2,createElement:v,createContext:B,createFactory:tn,cloneElement:rn,createRef:y,Fragment:p,isValidElement:en,findDOMNode:on,Component:d,PureComponent:E,memo:g$2,forwardRef:x$2,unstable_batchedUpdates:ln,StrictMode:p,Suspense:U,SuspenseList:T$2,lazy:M$1,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:X};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var preact = createCommonjsModule(function (module, exports) {
  var n,
      l,
      u,
      t,
      i,
      o,
      r,
      f = {},
      e = [],
      c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

  function s(n, l) {
    for (var u in l) n[u] = l[u];

    return n;
  }

  function a(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
  }

  function p(n, l, u) {
    var t,
        i,
        o,
        r = arguments,
        f = {};

    for (o in l) "key" == o ? t = l[o] : "ref" == o ? i = l[o] : f[o] = l[o];

    if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) u.push(r[o]);
    if (null != u && (f.children = u), "function" == typeof n && null != n.defaultProps) for (o in n.defaultProps) void 0 === f[o] && (f[o] = n.defaultProps[o]);
    return v(n, f, t, i, null);
  }

  function v(l, u, t, i, o) {
    var r = {
      type: l,
      props: u,
      key: t,
      ref: i,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      __h: null,
      constructor: void 0,
      __v: null == o ? ++n.__v : o
    };
    return null != n.vnode && n.vnode(r), r;
  }

  function h(n) {
    return n.children;
  }

  function y(n, l) {
    this.props = n, this.context = l;
  }

  function d(n, l) {
    if (null == l) return n.__ ? d(n.__, n.__.__k.indexOf(n) + 1) : null;

    for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

    return "function" == typeof n.type ? d(n) : null;
  }

  function _(n) {
    var l, u;

    if (null != (n = n.__) && null != n.__c) {
      for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
        n.__e = n.__c.base = u.__e;
        break;
      }

      return _(n);
    }
  }

  function w(l) {
    (!l.__d && (l.__d = !0) && u.push(l) && !k.__r++ || i !== n.debounceRendering) && ((i = n.debounceRendering) || t)(k);
  }

  function k() {
    for (var n; k.__r = u.length;) n = u.sort(function (n, l) {
      return n.__v.__b - l.__v.__b;
    }), u = [], n.some(function (n) {
      var l, u, t, i, o, r;
      n.__d && (o = (i = (l = n).__v).__e, (r = l.__P) && (u = [], (t = s({}, i)).__v = i.__v + 1, N(r, i, t, l.__n, void 0 !== r.ownerSVGElement, null != i.__h ? [o] : null, u, null == o ? d(i) : o, i.__h), T(u, i), i.__e != o && _(i)));
    });
  }

  function x(n, l, u, t, i, o, r, c, s, p) {
    var y,
        _,
        w,
        k,
        x,
        b,
        A,
        P = t && t.__k || e,
        C = P.length;

    for (s == f && (s = null != r ? r[0] : C ? d(t, 0) : null), u.__k = [], y = 0; y < l.length; y++) if (null != (k = u.__k[y] = null == (k = l[y]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(h, {
      children: k
    }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, null, k.__v) : k)) {
      if (k.__ = u, k.__b = u.__b + 1, null === (w = P[y]) || w && k.key == w.key && k.type === w.type) P[y] = void 0;else for (_ = 0; _ < C; _++) {
        if ((w = P[_]) && k.key == w.key && k.type === w.type) {
          P[_] = void 0;
          break;
        }

        w = null;
      }
      N(n, k, w = w || f, i, o, r, c, s, p), x = k.__e, (_ = k.ref) && w.ref != _ && (A || (A = []), w.ref && A.push(w.ref, null, k), A.push(_, k.__c || x, k)), null != x ? (null == b && (b = x), "function" == typeof k.type && null != k.__k && k.__k === w.__k ? k.__d = s = g(k, s, n) : s = m(n, k, w, P, r, x, s), p || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && w.__e == s && s.parentNode != n && (s = d(w));
    }

    if (u.__e = b, null != r && "function" != typeof u.type) for (y = r.length; y--;) null != r[y] && a(r[y]);

    for (y = C; y--;) null != P[y] && ("function" == typeof u.type && null != P[y].__e && P[y].__e == u.__d && (u.__d = d(t, y + 1)), H(P[y], P[y]));

    if (A) for (y = 0; y < A.length; y++) j(A[y], A[++y], A[++y]);
  }

  function g(n, l, u) {
    var t, i;

    for (t = 0; t < n.__k.length; t++) (i = n.__k[t]) && (i.__ = n, l = "function" == typeof i.type ? g(i, l, u) : m(u, i, i, n.__k, null, i.__e, l));

    return l;
  }

  function m(n, l, u, t, i, o, r) {
    var f, e, c;
    if (void 0 !== l.__d) f = l.__d, l.__d = void 0;else if (i == u || o != r || null == o.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(o), f = null;else {
      for (e = r, c = 0; (e = e.nextSibling) && c < t.length; c += 2) if (e == o) break n;

      n.insertBefore(o, r), f = r;
    }
    return void 0 !== f ? f : o.nextSibling;
  }

  function b(n, l, u, t, i) {
    var o;

    for (o in u) "children" === o || "key" === o || o in l || P(n, o, null, u[o], t);

    for (o in l) i && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || P(n, o, l[o], u[o], t);
  }

  function A(n, l, u) {
    "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || c.test(l) ? u : u + "px";
  }

  function P(n, l, u, t, i) {
    var o, r, f;
    if (i && "className" == l && (l = "class"), "style" === l) {
      if ("string" == typeof u) n.style.cssText = u;else {
        if ("string" == typeof t && (n.style.cssText = t = ""), t) for (l in t) u && l in u || A(n.style, l, "");
        if (u) for (l in u) t && u[l] === t[l] || A(n.style, l, u[l]);
      }
    } else "o" === l[0] && "n" === l[1] ? (o = l !== (l = l.replace(/Capture$/, "")), (r = l.toLowerCase()) in n && (l = r), l = l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, f = o ? z : C, u ? t || n.addEventListener(l, f, o) : n.removeEventListener(l, f, o)) : "list" !== l && "tagName" !== l && "form" !== l && "type" !== l && "size" !== l && "download" !== l && "href" !== l && !i && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u && !/^ar/.test(l) ? n.removeAttribute(l) : n.setAttribute(l, u));
  }

  function C(l) {
    this.l[l.type + !1](n.event ? n.event(l) : l);
  }

  function z(l) {
    this.l[l.type + !0](n.event ? n.event(l) : l);
  }

  function N(l, u, t, i, o, r, f, e, c) {
    var a,
        p,
        v,
        d,
        _,
        w,
        k,
        g,
        m,
        b,
        A,
        P = u.type;

    if (void 0 !== u.constructor) return null;
    null != t.__h && (c = t.__h, e = u.__e = t.__e, u.__h = null, r = [e]), (a = n.__b) && a(u);

    try {
      n: if ("function" == typeof P) {
        if (g = u.props, m = (a = P.contextType) && i[a.__c], b = a ? m ? m.props.value : a.__ : i, t.__c ? k = (p = u.__c = t.__c).__ = p.__E : ("prototype" in P && P.prototype.render ? u.__c = p = new P(g, b) : (u.__c = p = new y(g, b), p.constructor = P, p.render = I), m && m.sub(p), p.props = g, p.state || (p.state = {}), p.context = b, p.__n = i, v = p.__d = !0, p.__h = []), null == p.__s && (p.__s = p.state), null != P.getDerivedStateFromProps && (p.__s == p.state && (p.__s = s({}, p.__s)), s(p.__s, P.getDerivedStateFromProps(g, p.__s))), d = p.props, _ = p.state, v) null == P.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), null != p.componentDidMount && p.__h.push(p.componentDidMount);else {
          if (null == P.getDerivedStateFromProps && g !== d && null != p.componentWillReceiveProps && p.componentWillReceiveProps(g, b), !p.__e && null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(g, p.__s, b) || u.__v === t.__v) {
            p.props = g, p.state = p.__s, u.__v !== t.__v && (p.__d = !1), p.__v = u, u.__e = t.__e, u.__k = t.__k, p.__h.length && f.push(p);
            break n;
          }

          null != p.componentWillUpdate && p.componentWillUpdate(g, p.__s, b), null != p.componentDidUpdate && p.__h.push(function () {
            p.componentDidUpdate(d, _, w);
          });
        }
        p.context = b, p.props = g, p.state = p.__s, (a = n.__r) && a(u), p.__d = !1, p.__v = u, p.__P = l, a = p.render(p.props, p.state, p.context), p.state = p.__s, null != p.getChildContext && (i = s(s({}, i), p.getChildContext())), v || null == p.getSnapshotBeforeUpdate || (w = p.getSnapshotBeforeUpdate(d, _)), A = null != a && a.type === h && null == a.key ? a.props.children : a, x(l, Array.isArray(A) ? A : [A], u, t, i, o, r, f, e, c), p.base = u.__e, u.__h = null, p.__h.length && f.push(p), k && (p.__E = p.__ = null), p.__e = !1;
      } else null == r && u.__v === t.__v ? (u.__k = t.__k, u.__e = t.__e) : u.__e = $(t.__e, u, t, i, o, r, f, c);

      (a = n.diffed) && a(u);
    } catch (l) {
      u.__v = null, (c || null != r) && (u.__e = e, u.__h = !!c, r[r.indexOf(e)] = null), n.__e(l, u, t);
    }
  }

  function T(l, u) {
    n.__c && n.__c(u, l), l.some(function (u) {
      try {
        l = u.__h, u.__h = [], l.some(function (n) {
          n.call(u);
        });
      } catch (l) {
        n.__e(l, u.__v);
      }
    });
  }

  function $(n, l, u, t, i, o, r, c) {
    var s,
        a,
        p,
        v,
        h,
        y = u.props,
        d = l.props;
    if (i = "svg" === l.type || i, null != o) for (s = 0; s < o.length; s++) if (null != (a = o[s]) && ((null === l.type ? 3 === a.nodeType : a.localName === l.type) || n == a)) {
      n = a, o[s] = null;
      break;
    }

    if (null == n) {
      if (null === l.type) return document.createTextNode(d);
      n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type, d.is && {
        is: d.is
      }), o = null, c = !1;
    }

    if (null === l.type) y === d || c && n.data === d || (n.data = d);else {
      if (null != o && (o = e.slice.call(n.childNodes)), p = (y = u.props || f).dangerouslySetInnerHTML, v = d.dangerouslySetInnerHTML, !c) {
        if (null != o) for (y = {}, h = 0; h < n.attributes.length; h++) y[n.attributes[h].name] = n.attributes[h].value;
        (v || p) && (v && (p && v.__html == p.__html || v.__html === n.innerHTML) || (n.innerHTML = v && v.__html || ""));
      }

      b(n, d, y, i, c), v ? l.__k = [] : (s = l.props.children, x(n, Array.isArray(s) ? s : [s], l, u, t, "foreignObject" !== l.type && i, o, r, f, c)), c || ("value" in d && void 0 !== (s = d.value) && (s !== n.value || "progress" === l.type && !s) && P(n, "value", s, y.value, !1), "checked" in d && void 0 !== (s = d.checked) && s !== n.checked && P(n, "checked", s, y.checked, !1));
    }
    return n;
  }

  function j(l, u, t) {
    try {
      "function" == typeof l ? l(u) : l.current = u;
    } catch (l) {
      n.__e(l, t);
    }
  }

  function H(l, u, t) {
    var i, o, r;

    if (n.unmount && n.unmount(l), (i = l.ref) && (i.current && i.current !== l.__e || j(i, null, u)), t || "function" == typeof l.type || (t = null != (o = l.__e)), l.__e = l.__d = void 0, null != (i = l.__c)) {
      if (i.componentWillUnmount) try {
        i.componentWillUnmount();
      } catch (l) {
        n.__e(l, u);
      }
      i.base = i.__P = null;
    }

    if (i = l.__k) for (r = 0; r < i.length; r++) i[r] && H(i[r], u, t);
    null != o && a(o);
  }

  function I(n, l, u) {
    return this.constructor(n, u);
  }

  function L(l, u, t) {
    var i, r, c;
    n.__ && n.__(l, u), r = (i = t === o) ? null : t && t.__k || u.__k, l = p(h, null, [l]), c = [], N(u, (i ? u : t || u).__k = l, r || f, f, void 0 !== u.ownerSVGElement, t && !i ? [t] : r ? null : u.childNodes.length ? e.slice.call(u.childNodes) : null, c, t || f, i), T(c, l);
  }

  n = {
    __e: function (n, l) {
      for (var u, t, i, o = l.__h; l = l.__;) if ((u = l.__c) && !u.__) try {
        if ((t = u.constructor) && null != t.getDerivedStateFromError && (u.setState(t.getDerivedStateFromError(n)), i = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), i = u.__d), i) return l.__h = o, u.__E = u;
      } catch (l) {
        n = l;
      }

      throw n;
    },
    __v: 0
  }, l = function (n) {
    return null != n && void 0 === n.constructor;
  }, y.prototype.setState = function (n, l) {
    var u;
    u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n && (n = n(s({}, u), this.props)), n && s(u, n), null != n && this.__v && (l && this.__h.push(l), w(this));
  }, y.prototype.forceUpdate = function (n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), w(this));
  }, y.prototype.render = h, u = [], t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, k.__r = 0, o = f, r = 0, exports.render = L, exports.hydrate = function (n, l) {
    L(n, l, o);
  }, exports.createElement = p, exports.h = p, exports.Fragment = h, exports.createRef = function () {
    return {
      current: null
    };
  }, exports.isValidElement = l, exports.Component = y, exports.cloneElement = function (n, l, u) {
    var t,
        i,
        o,
        r = arguments,
        f = s({}, n.props);

    for (o in l) "key" == o ? t = l[o] : "ref" == o ? i = l[o] : f[o] = l[o];

    if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) u.push(r[o]);
    return null != u && (f.children = u), v(n.type, f, t || n.key, i || n.ref, null);
  }, exports.createContext = function (n, l) {
    var u = {
      __c: l = "__cC" + r++,
      __: n,
      Consumer: function (n, l) {
        return n.children(l);
      },
      Provider: function (n) {
        var u, t;
        return this.getChildContext || (u = [], (t = {})[l] = this, this.getChildContext = function () {
          return t;
        }, this.shouldComponentUpdate = function (n) {
          this.props.value !== n.value && u.some(w);
        }, this.sub = function (n) {
          u.push(n);
          var l = n.componentWillUnmount;

          n.componentWillUnmount = function () {
            u.splice(u.indexOf(n), 1), l && l.call(n);
          };
        }), n.children;
      }
    };
    return u.Provider.__ = u.Consumer.contextType = u;
  }, exports.toChildArray = function n(l, u) {
    return u = u || [], null == l || "boolean" == typeof l || (Array.isArray(l) ? l.some(function (l) {
      n(l, u);
    }) : u.push(l)), u;
  }, exports.options = n;
});

var dist = createCommonjsModule(function (module, exports) {
  !function (e, t) {
     module.exports = t(preact) ;
  }(commonjsGlobal, function (e) {
    var t = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;

    function n(e) {
      "string" != typeof e && (e = String(e));

      for (var t = "", n = 0; n < e.length; n++) {
        var r = e[n];

        switch (r) {
          case "<":
            t += "&lt;";
            break;

          case ">":
            t += "&gt;";
            break;

          case '"':
            t += "&quot;";
            break;

          case "&":
            t += "&amp;";
            break;

          default:
            t += r;
        }
      }

      return t;
    }

    var r = function (e, t) {
      return String(e).replace(/(\n+)/g, "$1" + (t || "\t"));
    },
        o = function (e, t, n) {
      return String(e).length > (t || 40) || !n && -1 !== String(e).indexOf("\n") || -1 !== String(e).indexOf("<");
    },
        a = {};

    function i(e) {
      var n = "";

      for (var r in e) {
        var o = e[r];
        null != o && (n && (n += " "), n += "-" == r[0] ? r : a[r] || (a[r] = r.replace(/([A-Z])/g, "-$1").toLowerCase()), n += ": ", n += o, "number" == typeof o && !1 === t.test(r) && (n += "px"), n += ";");
      }

      return n || void 0;
    }

    function l(e, t) {
      for (var n in t) e[n] = t[n];

      return e;
    }

    function s(e, t) {
      return Array.isArray(t) ? t.reduce(s, e) : null != t && !1 !== t && e.push(t), e;
    }

    var f = {
      shallow: !0
    },
        c = [],
        u = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/,
        p = function () {};

    d.render = d;
    var _ = [];

    function d(t, a, f) {
      var d = function t(a, f, _, d, v, g) {
        if (null == a || "boolean" == typeof a) return "";
        Array.isArray(a) && (a = e.createElement(e.Fragment, null, a));
        var h = a.type,
            m = a.props,
            y = !1;
        f = f || {};
        _ = _ || {};
        var x = _.pretty,
            b = x && "string" == typeof x ? x : "\t";
        if ("object" != typeof a && !h) return n(a);

        if ("function" == typeof h) {
          if (y = !0, !_.shallow || !d && !1 !== _.renderRootComponent) {
            if (h === e.Fragment) {
              var S = "",
                  k = [];
              s(k, a.props.children);

              for (var w = 0; w < k.length; w++) S += (w > 0 && x ? "\n" : "") + t(k[w], f, _, !1 !== _.shallowHighOrder, v, g);

              return S;
            }

            var O,
                C = a.__c = {
              __v: a,
              context: f,
              props: a.props,
              setState: p,
              forceUpdate: p,
              __h: []
            };

            if (e.options.__b && e.options.__b(a), e.options.__r && e.options.__r(a), h.prototype && "function" == typeof h.prototype.render) {
              var A = h.contextType,
                  F = A && f[A.__c],
                  j = null != A ? F ? F.props.value : A.__ : f;
              (C = a.__c = new h(m, j)).__v = a, C._dirty = C.__d = !0, C.props = m, null == C.state && (C.state = {}), null == C._nextState && null == C.__s && (C._nextState = C.__s = C.state), C.context = j, h.getDerivedStateFromProps ? C.state = l(l({}, C.state), h.getDerivedStateFromProps(C.props, C.state)) : C.componentWillMount && (C.componentWillMount(), C.state = C._nextState !== C.state ? C._nextState : C.__s !== C.state ? C.__s : C.state), O = C.render(C.props, C.state, C.context);
            } else {
              var H = h.contextType,
                  T = H && f[H.__c],
                  $ = null != H ? T ? T.props.value : H.__ : f;
              O = h.call(a.__c, m, $);
            }

            return C.getChildContext && (f = l(l({}, f), C.getChildContext())), e.options.diffed && e.options.diffed(a), t(O, f, _, !1 !== _.shallowHighOrder, v, g);
          }

          h = (E = h).displayName || E !== Function && E.name || function (e) {
            var t = (Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/) || "")[1];

            if (!t) {
              for (var n = -1, r = c.length; r--;) if (c[r] === e) {
                n = r;
                break;
              }

              n < 0 && (n = c.push(e) - 1), t = "UnnamedComponent" + n;
            }

            return t;
          }(E);
        }

        var E;
        var L,
            M,
            R = "";

        if (m) {
          var q = Object.keys(m);
          _ && !0 === _.sortAttributes && q.sort();

          for (var D = 0; D < q.length; D++) {
            var N = q[D],
                P = m[N];

            if ("children" !== N) {
              if (!N.match(/[\s\n\\/='"\0<>]/) && (_ && _.allAttributes || "key" !== N && "ref" !== N && "__self" !== N && "__source" !== N && "defaultValue" !== N)) {
                if ("className" === N) {
                  if (m.class) continue;
                  N = "class";
                } else v && N.match(/^xlink:?./) && (N = N.toLowerCase().replace(/^xlink:?/, "xlink:"));

                if ("htmlFor" === N) {
                  if (m.for) continue;
                  N = "for";
                }

                "style" === N && P && "object" == typeof P && (P = i(P)), "a" === N[0] && "r" === N[1] && "boolean" == typeof P && (P = String(P));

                var U = _.attributeHook && _.attributeHook(N, P, f, _, y);

                if (U || "" === U) R += U;else if ("dangerouslySetInnerHTML" === N) M = P && P.__html;else if ("textarea" === h && "value" === N) L = P;else if ((P || 0 === P || "" === P) && "function" != typeof P) {
                  if (!(!0 !== P && "" !== P || (P = N, _ && _.xml))) {
                    R += " " + N;
                    continue;
                  }

                  if ("value" === N) {
                    if ("select" === h) {
                      g = P;
                      continue;
                    }

                    "option" === h && g == P && (R += " selected");
                  }

                  R += " " + N + '="' + n(P) + '"';
                }
              }
            } else L = P;
          }
        }

        if (x) {
          var W = R.replace(/^\n\s*/, " ");
          W === R || ~W.indexOf("\n") ? x && ~R.indexOf("\n") && (R += "\n") : R = W;
        }

        R = "<" + h + R + ">";
        if (String(h).match(/[\s\n\\/='"\0<>]/)) throw new Error(h + " is not a valid HTML tag name in " + R);
        var z = String(h).match(u) || _.voidElements && String(h).match(_.voidElements);
        var I = [];
        var V;
        if (M) x && o(M) && (M = "\n" + b + r(M, b)), R += M;else if (null != L && s(V = [], L).length) {
          for (var Z = x && ~R.indexOf("\n"), B = !1, G = 0; G < V.length; G++) {
            var J = V[G];

            if (null != J && !1 !== J) {
              var K = "svg" === h || "foreignObject" !== h && v,
                  Q = t(J, f, _, !0, K, g);
              if (x && !Z && o(Q) && (Z = !0), Q) if (x) {
                var X = Q.length > 0 && "<" != Q[0];
                B && X ? I[I.length - 1] += Q : I.push(Q), B = X;
              } else I.push(Q);
            }
          }

          if (x && Z) for (var Y = I.length; Y--;) I[Y] = "\n" + b + r(I[Y], b);
        }
        if (I.length || M) R += I.join("");else if (_ && _.xml) return R.substring(0, R.length - 1) + " />";
        !z || V || M ? (x && ~R.indexOf("\n") && (R += "\n"), R += "</" + h + ">") : R = R.replace(/>$/, " />");
        return R;
      }(t, a, f);

      return e.options.__c && e.options.__c(t, _), d;
    }

    return d.shallowRender = function (e, t) {
      return d(e, t, f);
    }, d;
  });
});

/* eslint-disable */
var renderToString;

try {
  renderToString = dep(dist);
} catch (e) {
  throw Error('renderToString() error: missing "preact-render-to-string" dependency.');
}

function dep(obj) {
  return obj['default'] || obj;
}

var server = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToString
};

function renderNode(params) {
  const {
    node,
    list
  } = params;
  const isLeaf = !list.find(item => item.parentId === node.id);
  const hasBackground = node.background && !node.background.startsWith('rgba(0, 0, 0, 0)');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      zIndex: 9999999,
      position: 'absolute',
      left: node.x,
      top: node.y,
      width: node.offsetWidth,
      height: node.offsetHeight,
      border: node.border,
      borderLeft: node.borderLeft,
      borderRight: node.borderRight,
      borderBottom: node.borderBottom,
      borderTop: node.borderTop,
      borderRadius: node.borderRadius,
      background: hasBackground ? node.background : isLeaf ? '#D3D4D7' : undefined
    }
  });
}

function renderToHtml(list) {
  // console.log(list);
  // console.log(list.filter(item => item.$node.nodeName === 'NAV'));
  // const root = list.find(item => !item.parentId);
  // return renderToStaticMarkup(<>
  //   {renderNode({node: root, list})}
  // </>)
  return server.renderToStaticMarkup( /*#__PURE__*/React.createElement(React.Fragment, null, list.map(node => renderNode({
    node,
    list
  }))));
}

class Skeletion {
  constructor(root) {
    this.root = root;
    this.skelentonDescList = generateSkeletonDescList({
      node: root,
      list: [],
      level: 0,
      index: 0
    });
  }

  renderToHtml() {
    return renderToHtml(this.skelentonDescList);
  }

}

(function () {
  let skltContainer;
  window.addEventListener('load', () => {
    console.log('onload');
    skltContainer = document.createElement('div');
    skltContainer.id = 'skelentonx-container'; // 

    document.body.appendChild(skltContainer);
  });
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'generate-skeleton') {
      const skeletion = new Skeletion(document.body);
      skltContainer.innerHTML = skeletion.renderToHtml();
    }

    if (request.action === 'clear-skeleton') {
      skltContainer.innerHTML = '';
    }

    if (request.action === 'set-skeleton-container-opcity') {
      skltContainer.style.opacity = request.data;
    }
  });
})();
