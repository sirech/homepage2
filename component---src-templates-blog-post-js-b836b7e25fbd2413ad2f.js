"use strict";(self.webpackChunkhomepage=self.webpackChunkhomepage||[]).push([[989],{8271:function(e,t,r){r.r(t),r.d(t,{default:function(){return le}});var n,a=r(7294),o=r(5697),i=r.n(o),l=r(9875),c=r.n(l),s=r(4160),u=r(5896),p=r(5098),m=(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),d=function(e){function t(t){var r=e.call(this,t)||this;return r.name="AssertionError",r}return m(t,e),t}(Error);function h(e,t){if(!e)throw new d(t)}function f(e){var t=Object.entries(e).filter((function(e){var t=e[1];return null!=t})).map((function(e){var t=e[0],r=e[1];return"".concat(encodeURIComponent(t),"=").concat(encodeURIComponent(String(r)))}));return t.length>0?"?".concat(t.join("&")):""}var y=function(){var e=function(t,r){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},e(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),w=function(){return w=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},w.apply(this,arguments)},g=function(e,t,r,n){return new(r||(r=Promise))((function(a,o){function i(e){try{c(n.next(e))}catch(t){o(t)}}function l(e){try{c(n.throw(e))}catch(t){o(t)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,l)}c((n=n.apply(e,t||[])).next())}))},b=function(e,t){var r,n,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(o){return function(l){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(l){o=[6,l],n=0}finally{r=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}},v=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r};var E=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.openShareDialog=function(e){var r,n,a=t.props,o=a.onShareWindowClose,i=a.windowHeight,l=void 0===i?400:i,c=a.windowPosition,s=void 0===c?"windowCenter":c,u=a.windowWidth,p=void 0===u?550:u;!function(e,t,r){var n=t.height,a=t.width,o=v(t,["height","width"]),i=w({height:n,width:a,location:"no",toolbar:"no",status:"no",directories:"no",menubar:"no",scrollbars:"yes",resizable:"no",centerscreen:"yes",chrome:"yes"},o),l=window.open(e,"",Object.keys(i).map((function(e){return"".concat(e,"=").concat(i[e])})).join(", "));if(r)var c=window.setInterval((function(){try{(null===l||l.closed)&&(window.clearInterval(c),r(l))}catch(e){console.error(e)}}),1e3)}(e,w({height:l,width:p},"windowCenter"===s?(r=p,n=l,{left:window.outerWidth/2+(window.screenX||window.screenLeft||0)-r/2,top:window.outerHeight/2+(window.screenY||window.screenTop||0)-n/2}):function(e,t){return{top:(window.screen.height-t)/2,left:(window.screen.width-e)/2}}(p,l)),o)},t.handleClick=function(e){return g(t,void 0,void 0,(function(){var t,r,n,a,o,i,l,c,s,u;return b(this,(function(p){switch(p.label){case 0:return t=this.props,r=t.beforeOnClick,n=t.disabled,a=t.networkLink,o=t.onClick,i=t.url,l=t.openShareDialogOnClick,c=t.opts,s=a(i,c),n?[2]:(e.preventDefault(),r?(u=r(),!(m=u)||"object"!=typeof m&&"function"!=typeof m||"function"!=typeof m.then?[3,2]:[4,u]):[3,2]);case 1:p.sent(),p.label=2;case 2:return l&&this.openShareDialog(s),o&&o(e,s),[2]}var m}))}))},t}return y(t,e),t.prototype.render=function(){var e=this.props,t=(e.beforeOnClick,e.children),r=e.className,n=e.disabled,o=e.disabledStyle,i=e.forwardedRef,l=(e.networkLink,e.networkName),s=(e.onShareWindowClose,e.openShareDialogOnClick,e.opts,e.resetButtonStyle),u=e.style,p=(e.url,e.windowHeight,e.windowPosition,e.windowWidth,v(e,["beforeOnClick","children","className","disabled","disabledStyle","forwardedRef","networkLink","networkName","onShareWindowClose","openShareDialogOnClick","opts","resetButtonStyle","style","url","windowHeight","windowPosition","windowWidth"])),m=c()("react-share__ShareButton",{"react-share__ShareButton--disabled":!!n,disabled:!!n},r),d=w(w(s?{backgroundColor:"transparent",border:"none",padding:0,font:"inherit",color:"inherit",cursor:"pointer"}:{},u),n&&o);return a.createElement("button",w({},p,{"aria-label":p["aria-label"]||l,className:m,onClick:this.handleClick,ref:i,style:d}),t)},t.defaultProps={disabledStyle:{opacity:.6},openShareDialogOnClick:!0,resetButtonStyle:!0},t}(a.Component),k=E,O=function(){return O=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},O.apply(this,arguments)};var S=function(e,t,r,n){function o(o,i){var l=r(o),c=O({},o);return Object.keys(l).forEach((function(e){delete c[e]})),a.createElement(k,O({},n,c,{forwardedRef:i,networkName:e,networkLink:t,opts:r(o)}))}return o.displayName="ShareButton-".concat(e),(0,a.forwardRef)(o)};var C=S("facebook",(function(e,t){var r=t.quote,n=t.hashtag;return h(e,"facebook.url"),"https://www.facebook.com/sharer/sharer.php"+f({u:e,quote:r,hashtag:n})}),(function(e){return{quote:e.quote,hashtag:e.hashtag}}),{windowWidth:550,windowHeight:400}),j=function(){return j=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},j.apply(this,arguments)},N=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r};function R(e){var t=function(t){var r=t.bgStyle,n=t.borderRadius,o=t.iconFillColor,i=t.round,l=t.size,c=N(t,["bgStyle","borderRadius","iconFillColor","round","size"]);return a.createElement("svg",j({viewBox:"0 0 64 64",width:l,height:l},c),i?a.createElement("circle",{cx:"32",cy:"32",r:"31",fill:e.color,style:r}):a.createElement("rect",{width:"64",height:"64",rx:n,ry:n,fill:e.color,style:r}),a.createElement("path",{d:e.path,fill:o}))};return t.defaultProps={bgStyle:{},borderRadius:0,iconFillColor:"white",size:64},t}var x=R({color:"#3b5998",networkName:"facebook",path:"M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"});var P=S("twitter",(function(e,t){var r=t.title,n=t.via,a=t.hashtags,o=void 0===a?[]:a,i=t.related,l=void 0===i?[]:i;return h(e,"twitter.url"),h(Array.isArray(o),"twitter.hashtags is not an array"),h(Array.isArray(l),"twitter.related is not an array"),"https://twitter.com/share"+f({url:e,text:r,via:n,hashtags:o.length>0?o.join(","):void 0,related:l.length>0?l.join(","):void 0})}),(function(e){return{hashtags:e.hashtags,title:e.title,via:e.via,related:e.related}}),{windowWidth:550,windowHeight:400}),_=P,Z=R({color:"#00aced",networkName:"twitter",path:"M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"});var q=S("linkedin",(function(e,t){var r=t.title,n=t.summary,a=t.source;return h(e,"linkedin.url"),"https://linkedin.com/shareArticle"+f({url:e,mini:"true",title:r,summary:n,source:a})}),(function(e){return{title:e.title,summary:e.summary,source:e.source}}),{windowWidth:750,windowHeight:600}),z=R({color:"#007fb1",networkName:"linkedin",path:"M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"});var T=S("email",(function(e,t){var r=t.subject,n=t.body,a=t.separator;return"mailto:"+f({subject:r,body:n?n+a+e:e})}),(function(e){return{subject:e.subject,body:e.body,separator:e.separator||" "}}),{openShareDialogOnClick:!1,onClick:function(e,t){window.location.href=t}}),H=R({color:"#7f7f7f",networkName:"email",path:"M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z"}),M=r(365),I=r(8156),L=r(9768);const W=({frontmatter:e,site:t})=>{const{path:r,title:n,categories:o,description:i}=e,l=(0,M.Z)(["siteMetadata","url"])(t),c=(0,M.Z)(["siteMetadata","twitter"])(t),s=l+r;return a.createElement("div",{className:"style-module--share--bb374"},a.createElement("div",{className:"style-module--cta--dbc7f"},"Did you like it? Give it a share!"),a.createElement("div",{className:"style-module--buttons--1d8e2"},a.createElement(C,{url:s,quote:i},a.createElement(x,{size:32,round:!0})),a.createElement(_,{url:s,title:n,via:c.replace(/@/,""),hashtags:o.map((e=>e.toLowerCase().replace(/ /,"")))},a.createElement(Z,{size:32,round:!0})),a.createElement(q,{url:s,title:n,summary:i},a.createElement(z,{size:32,round:!0})),a.createElement(T,{subject:n,body:i+" "+s},a.createElement(H,{size:32,round:!0}))))};W.propTypes={frontmatter:I.Z,site:L.Z};var D=W;const V=({data:{frontmatter:e,html:t},site:r})=>{const{title:n,path:o,date:i,categories:l}=e;return a.createElement(u.Z,null,a.createElement("div",{className:"style-module--articles--c67cd"},a.createElement("article",{key:o,className:c()("style-module--article--4ad66")},a.createElement("header",null,a.createElement(s.rU,{style:{boxShadow:"none"},to:o},a.createElement("h1",null,n),a.createElement("time",{dateTime:i},i)),a.createElement(p.Z,{categories:l})),a.createElement("section",{className:c()("style-module--pageContent--f8ff8","clearfix"),dangerouslySetInnerHTML:{__html:t}}),a.createElement("section",null,a.createElement(D,{site:r,frontmatter:e})))))};V.propTypes={data:i().shape({frontmatter:I.Z,html:i().string.isRequired}).isRequired,site:L.Z};var B=V,A=r(4593);const U=({post:e,site:t})=>{const r=(0,M.Z)(["frontmatter","title"])(e),n=(0,M.Z)(["siteMetadata","title"])(t),o=(0,M.Z)(["siteMetadata","author"])(t),i=(0,M.Z)(["frontmatter","date"])(e),l=(e=>(0,M.Z)(["frontmatter","description"])(e)||e.html.replace(/<figure>[\s\S]*<\/figure>/s,"").replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,"").substr(0,200))(e),c=(0,M.Z)(["siteMetadata","url"])(t),s=c+(0,M.Z)(["frontmatter","path"])(e),u=(0,M.Z)(["frontmatter","draft"])(e),p=(0,M.Z)(["frontmatter","canonical"])(e),m=(e=>{const t=(0,M.Z)(["frontmatter","image","childImageSharp","gatsbyImageData","images","sources"])(e);if(t&&t.length>=1){const e=t[0].srcSet.split(",\n"),r={};for(const t of e){const e=t.split(" ");r[e[1]]=e[0]}if(r["750w"])return r["750w"]}return null})(e),d=m?c+m:null,h=(({url:e,siteUrl:t,title:r,author:n,image:a,siteTitle:o,description:i,datePublished:l})=>{const c=[{"@context":"http://schema.org","@type":"WebSite",url:e,name:r,alternateName:o}],s={"@context":"http://schema.org","@type":"BlogPosting",url:e,name:r,alternateName:o,headline:r,description:i,author:{"@type":"Person",name:n},publisher:{"@type":"Organization",url:t,name:n},mainEntityOfPage:{"@type":"WebSite","@id":t},datePublished:l};return a&&(s.image=a),[...c,{"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,item:{"@id":e,name:r}}]},s]})({url:s,siteUrl:c,title:r,author:o,image:d,siteTitle:n,description:l,datePublished:i});return a.createElement(A.Helmet,{title:`${r} | ${n}`},a.createElement("meta",{name:"title",content:`${r} | ${n}`}),a.createElement("meta",{name:"description",content:l}),a.createElement("meta",{name:"author",content:o}),a.createElement("script",{type:"application/ld+json"},JSON.stringify(h)),u?a.createElement("meta",{name:"robots",content:"noindex"}):a.createElement("meta",{name:"robots",content:"index, follow"}),a.createElement("meta",{property:"og:url",content:s}),((e,t)=>[a.createElement("meta",{key:"article",property:"og:type",content:"article"}),a.createElement("meta",{key:"published_time",property:"article:published_time",content:t.replace(/\//g,"-")}),a.createElement("meta",{key:"author",property:"article:author",content:e})])(c,i),a.createElement("meta",{property:"og:site_name",content:n}),a.createElement("meta",{property:"og:title",content:r}),a.createElement("meta",{property:"og:description",content:l}),m&&a.createElement("meta",{property:"og:image",content:d}),a.createElement("meta",{name:"twitter:card",content:m?"summary_large_image":"summary"}),m&&a.createElement("meta",{name:"twitter:image",content:d}),a.createElement("meta",{name:"twitter:creator",content:(0,M.Z)(["siteMetadata","twitter"])(t)}),a.createElement("meta",{name:"twitter:title",content:r}),a.createElement("meta",{name:"twitter:description",content:l}),p?a.createElement("link",{rel:"canonical",key:p,href:p}):null)};U.propTypes={post:i().shape({frontmatter:i().shape({categories:i().arrayOf(i().string),date:i().string.isRequired,layout:i().string,path:i().string.isRequired,title:i().string.isRequired,draft:i().bool.isRequired,canonical:i().string,image:i().shape({childImageSharp:i().shape({gatsbyImageData:i().shape({images:i().shape({sources:i().arrayOf(i().shape({srcSet:i().string.isRequired}))})})})})}).isRequired,html:i().string.isRequired}).isRequired,site:L.Z};var F=U;const $=({tag:e,className:t,children:r})=>{const n=e;return a.createElement(n,{className:c()("style-module--card--ba21b",t)},r)};$.propTypes={tag:i().string,className:i().string,children:i().node},$.defaultProps={tag:"div",className:null};var G=$,J=r(7858);const K=i().shape({date:i().string.isRequired,path:i().string.isRequired,title:i().string.isRequired}),X=i().shape({frontmatter:K});var Y=i().shape({nodes:i().arrayOf(X).isRequired}).isRequired;const Q=({frontmatter:{title:e,path:t,date:r}})=>a.createElement(G,{tag:"li",className:"style-module--item--67119"},a.createElement(s.rU,{to:t},a.createElement("h4",null,e)),a.createElement(J.Z,{date:r}));Q.propTypes={frontmatter:X.isRequired};const ee=({related:{nodes:e}})=>0===e.length?a.createElement(a.Fragment,null):a.createElement(u.Z,{className:"style-module--related--6af3b"},a.createElement("h2",null,"Related Posts"),a.createElement("ul",{className:"style-module--list--31170"},e.map((({frontmatter:e})=>a.createElement(Q,{key:e.path,frontmatter:e})))));ee.propTypes={related:Y};var te=ee;const re=({frontmatter:e,position:t})=>a.createElement(G,{tag:"li",className:"style-module--item--78799"},a.createElement("h5",{className:"style-module--position--5153d"},t),e&&a.createElement(a.Fragment,null,a.createElement(s.rU,{to:e.path},a.createElement("h4",null,e.title))));re.propTypes={frontmatter:X,position:i().string};const ne=({previous:e,next:t})=>a.createElement(u.Z,{className:"style-module--more--510a6"},a.createElement("h2",null,"Keep Reading"),a.createElement("ul",{className:"style-module--list--ded2f"},a.createElement(re,{frontmatter:null==e?void 0:e.frontmatter,position:"previous"}),a.createElement(re,{frontmatter:null==t?void 0:t.frontmatter,position:"next"})));ne.propTypes={previous:X,next:X};var ae=ne,oe=i().shape({id:i().string,html:i().string.isRequired,frontmatter:I.Z}).isRequired;const ie=({data:{post:e,site:t,related:r,previous:n,next:o}})=>a.createElement("main",null,a.createElement(F,{post:e,site:t}),a.createElement(B,{data:e,site:t,isIndex:!1}),a.createElement(te,{related:r}),a.createElement(ae,{previous:n,next:o}));ie.propTypes={data:i().shape({site:L.Z,post:oe,related:Y,previous:X,next:X}).isRequired};var le=ie}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-b836b7e25fbd2413ad2f.js.map