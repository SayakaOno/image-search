(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n.p+"static/media/carrotcake.48a57335.jpg"},23:function(e,t,n){e.exports=n(52)},50:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),s=n(19),r=n.n(s),c=n(12),o=n.n(c),l=n(20),u=n(21),m=n(2),d=n(3),h=n(5),f=n(4),g=n(6),p=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e))).nameInput=i.a.createRef(),n}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.nameInput.current.focus()}},{key:"render",value:function(){var e=this.props,t=e.name,n=e.term,a=e.onChange,s=e.onKeyDown;return i.a.createElement("div",{className:"ui input search"},i.a.createElement("input",{ref:this.nameInput,name:"name",type:"text",value:t,onChange:a,placeholder:"restaurant name"}),i.a.createElement("input",{name:"term",type:"text",value:n,onChange:a,onKeyDown:s,placeholder:"menu"}))}}]),t}(i.a.Component),v=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e))).getItemsWidth=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.length,n=Array.from(e);return n.length=t,n.reduce(function(e,t){return e+t.offsetWidth},0)},n.renderItems=function(){return n.props.images.map(function(e,t){var a=t===n.props.selectedIndex?" active":"";return i.a.createElement("li",{className:"item"+a,key:e[0].term},e[0].term)})},n.onNavClick=function(e){"LI"===e.target.tagName&&(n.props.onSelect(e.target.innerHTML),n.handleScroll(e.target))},n.handleScroll=function(e){var t=document.querySelectorAll(".navbar li"),a=document.querySelector(".navbar-container");a.getBoundingClientRect().left>e.getBoundingClientRect().left?a.scrollLeft=n.getItemsWidth(t,[].slice.call(t).indexOf(e))-20:a.getBoundingClientRect().right<e.getBoundingClientRect().right&&(a.scrollLeft=n.getItemsWidth(t,[].slice.call(t).indexOf(e)))},n.state={ulWidth:0,imageListWidth:0},n.ulRef=i.a.createRef(),n}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.setState({imageListWidth:this.props.imageListWidth})}},{key:"componentDidUpdate",value:function(){if(this.ulRef.current&&this.props.imageListWidth){this.state.imageListWidth!==this.props.imageListWidth&&this.setState({imageListWidth:this.props.imageListWidth});var e=document.querySelectorAll(".navbar li"),t=this.getItemsWidth(e);if(this.state.ulWidth!==t&&this.setState(function(){return{ulWidth:t}}),this.ulRef.current.style.width=this.getUlWidth(t)+"px",e[this.props.selectedIndex]&&0!==this.props.imageListWidth){var n=this.getItemsWidth(e,this.props.selectedIndex+1)-this.props.imageListWidth+30;n>0&&setTimeout(function(){document.querySelector(".navbar-container").scrollLeft=n},0)}}}},{key:"getUlWidth",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.ulWidth;return Math.max(this.props.imageListWidth,e+25)}},{key:"render",value:function(){return 0===this.props.images.length?null:i.a.createElement("div",{className:"navbar"},i.a.createElement("div",{className:"navbar-container"},i.a.createElement("ul",{ref:this.ulRef,className:"ui top tabular menu",onClick:this.onNavClick},this.renderItems())),i.a.createElement("i",{className:"fas fa-times-circle",onClick:this.props.onRemove}))}}]),t}(a.Component),b=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e))).setSpans=function(){try{var e=n.imageRef.current.clientHeight,t=Math.ceil(e/10);n.setState({spans:t})}catch(a){console.log(a)}},n.state={spans:0},n.imageRef=i.a.createRef(),n}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.imageRef.current.addEventListener("load",this.setSpans),window.addEventListener("resize",this.setSpans)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.setSpans)}},{key:"render",value:function(){var e=this.props.image,t=e.title,n=e.link;return i.a.createElement("li",{style:{gridRowEnd:"span ".concat(this.state.spans)}},i.a.createElement("img",{ref:this.imageRef,alt:t,src:n}))}}]),t}(i.a.Component),y=i.a.forwardRef(function(e,t){var n=e.images?e.images[0].list.map(function(e,t){return i.a.createElement(b,{image:e,inedex:t,key:e.title.slice(0,6)+t})}):null;return void 0===e.images?null:i.a.createElement("div",{ref:t,className:"image-list ui bottom attached active tab segment",style:{height:e.height}},i.a.createElement("div",{className:"image-frame"},i.a.createElement("div",null,i.a.createElement("ul",{className:"ui images image-ul"},n),function(){var t=e.images[0].list.length+1;return t>100?null:i.a.createElement("button",{className:"ui orange basic button",onClick:function(){return e.onLoadMore(t)}},"More")}())))}),S=n(22),w=n.n(S).a.create({baseURL:"https://www.googleapis.com"}),x="customsearch/v1?key=AIzaSyDEKjJgTJu-A2sYRnbzBwc74N93NTeRe8Q&cx=017292147882044979880:bz3csnf9fsw",E=function(e){function t(){var e,n;Object(m.a)(this,t);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(n=Object(h.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(i)))).state={text:"Loading"},n}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.loaderId=setInterval(function(){"Loading..."===e.state.text?e.setState({text:"Loading"}):e.setState(function(e){return{text:e.text+"."}})},300)}},{key:"componentWillUnmount",value:function(){clearInterval(this.loaderId)}},{key:"render",value:function(){return i.a.createElement("div",{className:"loader-frame ui segment",style:{height:window.innerHeight-40}},i.a.createElement("div",{className:"ui active inverted dimmer"},i.a.createElement("div",{className:"ui text loader"},this.state.text)))}}]),t}(i.a.Component),L=n(7),R=n.n(L),I=n(8),k=n.n(I),W=n(9),j=n.n(W),O=n(10),C=n.n(O),N=(R.a,R.a,R.a,k.a,k.a,k.a,j.a,j.a,j.a,C.a,C.a,C.a,function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(h.a)(this,Object(f.a)(t).call(this,e))).setImageListWidth=function(){n.imageListRef.current&&n.setState({imageListWidth:n.imageListRef.current.offsetWidth})},n.isInputEmpty=function(){return!n.state.term},n.handleChange=function(e){n.setState(Object(u.a)({},e.target.name,e.target.value));setTimeout(function(){n.state.name||n.state.term?n.searchButtonRef.current.className="ui yellow button":n.searchButtonRef.current.className="ui yellow button disabled"},0)},n.onSearchSubmit=Object(l.a)(o.a.mark(function e(){var t,a,i,s,r,c,l,u,m,d=arguments;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=d.length>0&&void 0!==d[0]?d[0]:1,a=d.length>1&&void 0!==d[1]?d[1]:null,n.setState({loading:!0}),i=n.state.term,e.prev=4,i||(i=n.state.images[n.state.selectedIndex][0].term),e.next=8,w.get(x,{params:{searchType:"image",q:n.state.name+"+"+i,start:t}});case 8:if(s=e.sent,r=s.data.items){e.next=12;break}throw Error;case 12:if(c=n.state.selectedIndex,l=[],1===t?(u=[{term:n.state.term,list:r}],l=n.state.images.concat([u]),c=l.length-1):(m=n.state.images[c][0].list.concat(r),(l=n.state.images.slice())[c][0].list=m),!a||n.state.term){e.next=17;break}return e.abrupt("return");case 17:n.setState(function(e){return{term:"",selectedIndex:c,requestedName:n.state.name,loading:!1,images:l}}),e.next=24;break;case 20:e.prev=20,e.t0=e.catch(4),n.setState({loading:!1,term:""}),setTimeout(function(){return alert('I am sorry but something went wrong... :(\nPlease ask your server what "'.concat(i,'" is.'))},100);case 24:case"end":return e.stop()}},e,this,[[4,20]])})),n.handleSubmit=function(e){if(n.isInputEmpty())alert("Please enter menu!");else{var t=n.state.images.findIndex(function(e){return e[0].term===n.state.term});-1===t?(n.state.requestedName!==n.state.name&&n.setState({images:[],requestedName:""}),n.onSearchSubmit(1,e)):n.setState({selectedIndex:t,term:""})}},n.handleSelect=function(e){var t=n.state.images.findIndex(function(t){return t[0].term===e});n.setState({selectedIndex:t})},n.handleKeyDown=function(e){"Enter"===e.key&&n.handleSubmit()},n.removeNavItem=function(){var e=Math.min(n.state.images.length-2,n.state.selectedIndex);n.setState(function(t){return{images:t.images.filter(function(e,t){return n.state.selectedIndex!==t}),selectedIndex:e}})},n.renderResultComponents=function(){var e=n.state,t=e.selectedIndex,a=e.images;return i.a.createElement(i.a.Fragment,null,i.a.createElement(v,{onSelect:n.handleSelect,selectedIndex:t,imageListWidth:n.state.imageListWidth,images:a,onRemove:n.removeNavItem}),n.state.loading&&!n.state.requestedName?i.a.createElement(E,null):i.a.createElement(y,{ref:n.imageListRef,height:n.state.screenHeight-80,images:a[t],onLoadMore:n.onSearchSubmit}))},n.state={name:"",term:"",requestedName:"",selectedIndex:0,imageListWidth:0,loading:!1,images:[],screenHeight:0},n.searchButtonRef=i.a.createRef(),n.imageListRef=i.a.createRef(),n}return Object(g.a)(t,e),Object(d.a)(t,[{key:"fixResultComponent",value:function(){var e=document.querySelector(".image-list"),t=document.querySelector(".navbar");document.querySelector(".image-list i");if(t.getBoundingClientRect().top>10)e.style.overflowY="hidden";else try{e.style.overflowY="scroll"}catch(n){console.log(n)}}},{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.fixResultComponent),window.addEventListener("resize",this.setImageListWidth),this.setState({screenHeight:document.documentElement.clientHeight})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.fixResultComponent),window.removeEventListener("resize",this.setImageListWidth)}},{key:"componentDidUpdate",value:function(){this.imageListRef.current&&this.state.imageListWidth!==this.imageListRef.current.offsetWidth&&this.setState({imageListWidth:this.imageListRef.current.offsetWidth})}},{key:"render",value:function(){var e=this.state,t=e.name,n=e.term;return i.a.createElement("main",null,i.a.createElement(i.a.StrictMode,null,i.a.createElement(p,{ref:this.searchButtonRef,name:t,term:n,onChange:this.handleChange,onClick:this.handleSubmit,onKeyDown:this.handleKeyDown}),i.a.createElement("button",{ref:this.searchButtonRef,className:"ui yellow button disabled",onClick:this.handleSubmit},"Search"),this.renderResultComponents()))}}]),t}(a.Component));n(50);r.a.render(i.a.createElement(N,null),document.getElementById("root"))},7:function(e,t,n){e.exports=n.p+"static/media/chocolatecake.7b396a06.jpg"},8:function(e,t,n){e.exports=n.p+"static/media/lemoncake.395df99b.jpg"},9:function(e,t,n){e.exports=n.p+"static/media/redvelvetcake.2fc34d65.jpg"}},[[23,2,1]]]);
//# sourceMappingURL=main.1f2353dd.chunk.js.map