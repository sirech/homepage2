"use strict";(self.webpackChunkhomepage=self.webpackChunkhomepage||[]).push([[280],{5098:function(e,t,a){var r=a(7294),n=a(5697),i=a.n(n),s=a(350),l=a(5970);const c=({categories:e})=>{return r.createElement(r.Fragment,null,(t=e,(0,s.h0F)(s.UID)(((e,t)=>r.createElement(l.Z,{key:t,item:e,text:e})))(t)));var t};c.propTypes={categories:i().arrayOf(i().string).isRequired},t.Z=c},9195:function(e,t,a){a.d(t,{Z:function(){return s}});var r=a(7294),n=a(5697);const i=({date:e})=>r.createElement("time",{className:"style-module--time--YzbtV",dateTime:e},e);i.propTypes={date:a.n(n)().string.isRequired};var s=i},8156:function(e,t,a){var r=a(5697),n=a.n(r);t.Z=n().shape({categories:n().arrayOf(n().string).isRequired,date:n().string.isRequired,layout:n().string.isRequired,path:n().string.isRequired,title:n().string.isRequired,draft:n().bool.isRequired,description:n().string}).isRequired},9768:function(e,t,a){var r=a(5697),n=a.n(r);t.Z=n().shape({siteMetadata:n().shape({title:n().string.isRequired,url:n().string.isRequired,author:n().string.isRequired,twitter:n().string.isRequired}).isRequired}).isRequired},7688:function(e,t,a){a.r(t),a.d(t,{default:function(){return Z}});var r=a(7294),n=a(5697),i=a.n(n),s=a(5414),l=a(350),c=a(5900),o=a.n(c),m=a(8037),u=a(353),p=a(5098),d=a(9195),g=a(8156);const f=({data:{frontmatter:e}})=>{const{title:t,path:a,date:n,categories:i,description:s}=e;return r.createElement(u.Z,null,r.createElement("div",{className:o()("style-module--articles--jUQW3")},r.createElement("article",{key:a,className:o()("style-module--article--3cWEW","style-module--articleBox--3vA05")},r.createElement("header",null,r.createElement(m.default,{to:a},r.createElement("h3",null,t)),r.createElement(d.Z,{date:n}),r.createElement(p.Z,{categories:i})),r.createElement("section",null,s))))};f.propTypes={data:i().shape({frontmatter:g.Z}).isRequired};var E=f;const h=(e,t)=>1===e?`/${t}/`:`/${t}/${e}`,y=e=>1===e,x=(e,t)=>e===t,q=({index:e,pageCount:t,pathPrefix:a})=>r.createElement(u.Z,null,r.createElement("nav",{className:"mt-4"},t>1&&r.createElement("ul",{className:"pagination justify-content-center"},r.createElement("li",{className:o()("page-item",{disabled:y(e)})},((e,t)=>r.createElement(m.default,{className:"page-link",to:h(e-1,t)},r.createElement("i",{className:"fa fa-caret-left"})))(e,a)),((e,t,a)=>(0,l.w6H)(1,t+1).map((t=>r.createElement("li",{className:o()("page-item",{active:t===e}),key:t},r.createElement(m.default,{className:"page-link",to:h(t,a)},t)))))(e,t,a),r.createElement("li",{className:o()("page-item",{disabled:x(e,t)})},((e,t)=>r.createElement(m.default,{className:"page-link",to:h(e+1,t)},r.createElement("i",{className:"fa fa-caret-right"})))(e,a)))));q.propTypes={index:i().number,pageCount:i().number,pathPrefix:i().string};var R=q,v=a(9768);const N=({pageContext:e})=>{const{group:t,additionalContext:a,index:n,pageCount:i,pathPrefix:c}=e;return r.createElement("div",null,(e=>{const{title:t,description:a,url:n}=e;return r.createElement(s.Helmet,{title:t,meta:[{name:"twitter:card",content:"summary"},{property:"og:title",content:t},{property:"og:type",content:"website"},{property:"og:description",content:a},{property:"og:url",content:n}]})})(a.siteMetadata),(e=>(0,l.zGw)((0,l.hXT)((e=>{const t=(0,l.ETc)(["frontmatter","layout"])(e),a=(0,l.ETc)(["frontmatter","path"])(e);return"post"===t&&"/404/"!==a})),(0,l.h0F)(l.UID)(((e,t)=>r.createElement(E,{data:e,isIndex:!0,key:t}))))(e))(t),r.createElement(R,{index:n,pageCount:i,pathPrefix:c}))};N.propTypes={pageContext:i().shape({index:i().number,pageCount:i().number,group:i().arrayOf(i().shape({frontmatter:g.Z})),additionalContext:v.Z,pathPrefix:i().string})};var Z=N}}]);
//# sourceMappingURL=component---src-templates-blog-index-js-9b001829c48393b2431c.js.map