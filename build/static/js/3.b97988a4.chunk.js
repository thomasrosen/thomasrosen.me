(this.webpackJsonpthomasrosen=this.webpackJsonpthomasrosen||[]).push([[3],{35:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return u}));var a=n(4),c=n(1),s=(n(35),n(5)),r=n(0),i={year:31536e6,month:2628e6,day:864e5,hour:36e5,minute:6e4,second:1e3},o=new Intl.RelativeTimeFormat("en",{numeric:"auto"}),l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Date,n=e.getTime()-t.getTime();for(var a in i)if(Math.abs(n)>i[a]||"second"===a)return o.format(Math.round(n/i[a]),a)};function u(){var e=Object(c.useState)(null),t=Object(a.a)(e,2),n=t[0],i=t[1],o=Object(c.useState)(!0),u=Object(a.a)(o,2),j=u[0],d=u[1],h=Object(c.useState)(null),b=Object(a.a)(h,2),f=b[0],m=b[1];return Object(c.useEffect)((function(){fetch("/blog/articles/"+window.location.pathname.split("/").pop()+".json").then((function(e){return e.json()})).then((function(e){e.article.date=l(new Date(e.article.date)),i(e.article),d(!1)})).catch((function(e){m(e),d(!1)}))}),[]),Object(r.jsxs)("div",{className:"tab_content article ".concat(n&&"serif"===n.font?"serif_font":"sans_serif_font"),children:[j&&Object(r.jsx)("p",{children:"Loading article..."}),f&&Object(r.jsxs)("p",{children:["Error loading article: ",f.message]}),n?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:n.title}),Object(r.jsx)("p",{children:Object(r.jsxs)("strong",{children:[n.date," \u2014\xa0",Object(r.jsx)("span",{className:"tag_row",children:n.tags.map((function(e){return Object(r.jsx)("button",{className:"small",disabled:!0,children:e},e)}))})]})}),Object(r.jsx)("div",{dangerouslySetInnerHTML:{__html:n.html}}),Object(r.jsx)(s.a,{})]}):null]})}}}]);
//# sourceMappingURL=3.b97988a4.chunk.js.map