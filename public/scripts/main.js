function isMobile(){return/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent||navigator.vendor||window.opera)}function getScrollTopElement(){if("CSS1Compat"!==document.compatMode)return"body";var e=document.documentElement,t=document.body,n=window.pageYOffset||t.scrollTop||e.scrollTop,r=n+1;window.scrollTo(0,r);var o=e.scrollTop===r?"html":"body";return window.scrollTo(0,n),o}!function(e,t,n){"use strict";function r(n){if(o=t.documentElement,a=t.body,G(),ie=this,n=n||{},ue=n.constants||{},n.easing)for(var r in n.easing)U[r]=n.easing[r];ye=n.edgeStrategy||"set",ce={beforerender:n.beforerender,render:n.render,keyframe:n.keyframe},fe=n.forceHeight!==!1,fe&&(Oe=n.scale||1),pe=n.mobileDeceleration||E,de=n.smoothScrolling!==!1,ge=n.smoothScrollingDuration||x,ve={targetTop:ie.getScrollTop()},Ye=(n.mobileCheck||function(){return/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent||navigator.vendor||e.opera)})(),Ye?(se=t.getElementById("skrollr-body"),se&&ae(),X(),Fe(o,[y,w],[T])):Fe(o,[y,b],[T]),ie.refresh(),we(e,"resize orientationchange",function(){var e=o.clientWidth,t=o.clientHeight;t===Be&&e===Le||(Be=t,Le=e,qe=!0)});var i=K();return function l(){Z(),be=i(l)}(),ie}var o,a,i={get:function(){return ie},init:function(e){return ie||new r(e)},VERSION:"0.6.26"},l=Object.prototype.hasOwnProperty,s=e.Math,c=e.getComputedStyle,f="touchstart",u="touchmove",p="touchcancel",m="touchend",d="skrollable",g=d+"-before",v=d+"-between",h=d+"-after",y="skrollr",T="no-"+y,b=y+"-desktop",w=y+"-mobile",k="linear",S=1e3,E=.004,x=200,A="start",C="end",$="center",F="bottom",D="___skrollable_id",P=/^(?:input|textarea|button|select)$/i,I=/^\s+|\s+$/g,M=/^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,H=/\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,O=/^(@?[a-z\-]+)\[(\w+)\]$/,z=/-([a-z0-9_])/g,N=function(e,t){return t.toUpperCase()},V=/[\-+]?[\d]*\.?[\d]+/g,L=/\{\?\}/g,B=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,q=/[a-z\-]+-gradient/g,_="",Y="",G=function(){var e=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(c){var t=c(a,null);for(var n in t)if(_=n.match(e)||+n==n&&t[n].match(e))break;if(!_)return void(_=Y="");_=_[0],"-"===_.slice(0,1)?(Y=_,_={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[_]):Y="-"+_.toLowerCase()+"-"}},K=function(){var t=e.requestAnimationFrame||e[_.toLowerCase()+"RequestAnimationFrame"],n=Ie();return!Ye&&t||(t=function(t){var r=Ie()-n,o=s.max(0,1e3/60-r);return e.setTimeout(function(){n=Ie(),t()},o)}),t},R=function(){var t=e.cancelAnimationFrame||e[_.toLowerCase()+"CancelAnimationFrame"];return!Ye&&t||(t=function(t){return e.clearTimeout(t)}),t},U={begin:function(){return 0},end:function(){return 1},linear:function(e){return e},quadratic:function(e){return e*e},cubic:function(e){return e*e*e},swing:function(e){return-s.cos(e*s.PI)/2+.5},sqrt:function(e){return s.sqrt(e)},outCubic:function(e){return s.pow(e-1,3)+1},bounce:function(e){var t;if(e<=.5083)t=3;else if(e<=.8489)t=9;else if(e<=.96208)t=27;else{if(!(e<=.99981))return 1;t=91}return 1-s.abs(3*s.cos(e*t*1.028)/t)}};r.prototype.refresh=function(e){var r,o,a=!1;for(e===n?(a=!0,le=[],_e=0,e=t.getElementsByTagName("*")):e.length===n&&(e=[e]),r=0,o=e.length;r<o;r++){var i=e[r],l=i,s=[],c=de,f=ye,u=!1;if(a&&D in i&&delete i[D],i.attributes){for(var p=0,m=i.attributes.length;p<m;p++){var g=i.attributes[p];if("data-anchor-target"!==g.name)if("data-smooth-scrolling"!==g.name)if("data-edge-strategy"!==g.name)if("data-emit-events"!==g.name){var v=g.name.match(M);if(null!==v){var h={props:g.value,element:i,eventType:g.name.replace(z,N)};s.push(h);var y=v[1];y&&(h.constant=y.substr(1));var T=v[2];/p$/.test(T)?(h.isPercentage=!0,h.offset=(0|T.slice(0,-1))/100):h.offset=0|T;var b=v[3],w=v[4]||b;b&&b!==A&&b!==C?(h.mode="relative",h.anchors=[b,w]):(h.mode="absolute",b===C?h.isEnd=!0:h.isPercentage||(h.offset=h.offset*Oe))}}else u=!0;else f=g.value;else c="off"!==g.value;else if(l=t.querySelector(g.value),null===l)throw'Unable to find anchor target "'+g.value+'"'}if(s.length){var k,S,E;!a&&D in i?(E=i[D],k=le[E].styleAttr,S=le[E].classAttr):(E=i[D]=_e++,k=i.style.cssText,S=$e(i)),le[E]={element:i,styleAttr:k,classAttr:S,anchorTarget:l,keyFrames:s,smoothScrolling:c,edgeStrategy:f,emitEvents:u,lastFrameIndex:-1},Fe(i,[d],[])}}}for(xe(),r=0,o=e.length;r<o;r++){var x=le[e[r][D]];x!==n&&(J(x),ee(x))}return ie},r.prototype.relativeToAbsolute=function(e,t,n){var r=o.clientHeight,a=e.getBoundingClientRect(),i=a.top,l=a.bottom-a.top;return t===F?i-=r:t===$&&(i-=r/2),n===F?i+=l:n===$&&(i+=l/2),i+=ie.getScrollTop(),i+.5|0},r.prototype.animateTo=function(e,t){t=t||{};var r=Ie(),o=ie.getScrollTop();return me={startTop:o,topDiff:e-o,targetTop:e,duration:t.duration||S,startTime:r,endTime:r+(t.duration||S),easing:U[t.easing||k],done:t.done},me.topDiff||(me.done&&me.done.call(ie,!1),me=n),ie},r.prototype.stopAnimateTo=function(){me&&me.done&&me.done.call(ie,!0),me=n},r.prototype.isAnimatingTo=function(){return!!me},r.prototype.isMobile=function(){return Ye},r.prototype.setScrollTop=function(t,n){return he=n===!0,Ye?Ge=s.min(s.max(t,0),He):e.scrollTo(0,t),ie},r.prototype.getScrollTop=function(){return Ye?Ge:e.pageYOffset||o.scrollTop||a.scrollTop||0},r.prototype.getMaxScrollTop=function(){return He},r.prototype.on=function(e,t){return ce[e]=t,ie},r.prototype.off=function(e){return delete ce[e],ie},r.prototype.destroy=function(){var e=R();e(be),Se(),Fe(o,[T],[y,b,w]);for(var t=0,r=le.length;t<r;t++)oe(le[t].element);o.style.overflow=a.style.overflow="",o.style.height=a.style.height="",se&&i.setStyle(se,"transform","none"),ie=n,se=n,ce=n,fe=n,He=0,Oe=1,ue=n,pe=n,ze="down",Ne=-1,Le=0,Be=0,qe=!1,me=n,de=n,ge=n,ve=n,he=n,_e=0,ye=n,Ye=!1,Ge=0,Te=n};var X=function(){var r,i,l,c,d,g,v,h,y,T,b,w;we(o,[f,u,p,m].join(" "),function(e){var o=e.changedTouches[0];for(c=e.target;3===c.nodeType;)c=c.parentNode;switch(d=o.clientY,g=o.clientX,T=e.timeStamp,P.test(c.tagName)||e.preventDefault(),e.type){case f:r&&r.blur(),ie.stopAnimateTo(),r=c,i=v=d,l=g,y=T;break;case u:P.test(c.tagName)&&t.activeElement!==c&&e.preventDefault(),h=d-v,w=T-b,ie.setScrollTop(Ge-h,!0),v=d,b=T;break;default:case p:case m:var a=i-d,k=l-g,S=k*k+a*a;if(S<49){if(!P.test(r.tagName)){r.focus();var E=t.createEvent("MouseEvents");E.initMouseEvent("click",!0,!0,e.view,1,o.screenX,o.screenY,o.clientX,o.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null),r.dispatchEvent(E)}return}r=n;var x=h/w;x=s.max(s.min(x,3),-3);var A=s.abs(x/pe),C=x*A+.5*pe*A*A,$=ie.getScrollTop()-C,F=0;$>He?(F=(He-$)/C,$=He):$<0&&(F=-$/C,$=0),A*=1-F,ie.animateTo($+.5|0,{easing:"outCubic",duration:A})}}),e.scrollTo(0,0),o.style.overflow=a.style.overflow="hidden"},j=function(){var e,t,n,r,a,i,l,c,f,u,p,m=o.clientHeight,d=Ae();for(c=0,f=le.length;c<f;c++)for(e=le[c],t=e.element,n=e.anchorTarget,r=e.keyFrames,a=0,i=r.length;a<i;a++)l=r[a],u=l.offset,p=d[l.constant]||0,l.frame=u,l.isPercentage&&(u*=m,l.frame=u),"relative"===l.mode&&(oe(t),l.frame=ie.relativeToAbsolute(n,l.anchors[0],l.anchors[1])-u,oe(t,!0)),l.frame+=p,fe&&!l.isEnd&&l.frame>He&&(He=l.frame);for(He=s.max(He,Ce()),c=0,f=le.length;c<f;c++){for(e=le[c],r=e.keyFrames,a=0,i=r.length;a<i;a++)l=r[a],p=d[l.constant]||0,l.isEnd&&(l.frame=He-l.offset+p);e.keyFrames.sort(Me)}},W=function(e,t){for(var n=0,r=le.length;n<r;n++){var o,a,s=le[n],c=s.element,f=s.smoothScrolling?e:t,u=s.keyFrames,p=u.length,m=u[0],y=u[u.length-1],T=f<m.frame,b=f>y.frame,w=T?m:y,k=s.emitEvents,S=s.lastFrameIndex;if(T||b){if(T&&s.edge===-1||b&&1===s.edge)continue;switch(T?(Fe(c,[g],[h,v]),k&&S>-1&&(Ee(c,m.eventType,ze),s.lastFrameIndex=-1)):(Fe(c,[h],[g,v]),k&&S<p&&(Ee(c,y.eventType,ze),s.lastFrameIndex=p)),s.edge=T?-1:1,s.edgeStrategy){case"reset":oe(c);continue;case"ease":f=w.frame;break;default:case"set":var E=w.props;for(o in E)l.call(E,o)&&(a=re(E[o].value),0===o.indexOf("@")?c.setAttribute(o.substr(1),a):i.setStyle(c,o,a));continue}}else 0!==s.edge&&(Fe(c,[d,v],[g,h]),s.edge=0);for(var x=0;x<p-1;x++)if(f>=u[x].frame&&f<=u[x+1].frame){var A=u[x],C=u[x+1];for(o in A.props)if(l.call(A.props,o)){var $=(f-A.frame)/(C.frame-A.frame);$=A.props[o].easing($),a=ne(A.props[o].value,C.props[o].value,$),a=re(a),0===o.indexOf("@")?c.setAttribute(o.substr(1),a):i.setStyle(c,o,a)}k&&S!==x&&("down"===ze?Ee(c,A.eventType,ze):Ee(c,C.eventType,ze),s.lastFrameIndex=x);break}}},Z=function(){qe&&(qe=!1,xe());var e,t,r=ie.getScrollTop(),o=Ie();if(me)o>=me.endTime?(r=me.targetTop,e=me.done,me=n):(t=me.easing((o-me.startTime)/me.duration),r=me.startTop+t*me.topDiff|0),ie.setScrollTop(r,!0);else if(!he){var a=ve.targetTop-r;a&&(ve={startTop:Ne,topDiff:r-Ne,targetTop:r,startTime:Ve,endTime:Ve+ge}),o<=ve.endTime&&(t=U.sqrt((o-ve.startTime)/ge),r=ve.startTop+t*ve.topDiff|0)}if(Ye&&se&&i.setStyle(se,"transform","translate(0, "+-Ge+"px) "+Te),he||Ne!==r){ze=r>Ne?"down":r<Ne?"up":ze,he=!1;var l={curTop:r,lastTop:Ne,maxTop:He,direction:ze},s=ce.beforerender&&ce.beforerender.call(ie,l);s!==!1&&(W(r,ie.getScrollTop()),Ne=r,ce.render&&ce.render.call(ie,l)),e&&e.call(ie,!1)}Ve=o},J=function(e){for(var t=0,n=e.keyFrames.length;t<n;t++){for(var r,o,a,i,l=e.keyFrames[t],s={};null!==(i=H.exec(l.props));)a=i[1],o=i[2],r=a.match(O),null!==r?(a=r[1],r=r[2]):r=k,o=o.indexOf("!")?Q(o):[o.slice(1)],s[a]={value:o,easing:U[r]};l.props=s}},Q=function(e){var t=[];return B.lastIndex=0,e=e.replace(B,function(e){return e.replace(V,function(e){return e/255*100+"%"})}),Y&&(q.lastIndex=0,e=e.replace(q,function(e){return Y+e})),e=e.replace(V,function(e){return t.push(+e),"{?}"}),t.unshift(e),t},ee=function(e){var t,n,r={};for(t=0,n=e.keyFrames.length;t<n;t++)te(e.keyFrames[t],r);for(r={},t=e.keyFrames.length-1;t>=0;t--)te(e.keyFrames[t],r)},te=function(e,t){var n;for(n in t)l.call(e.props,n)||(e.props[n]=t[n]);for(n in e.props)t[n]=e.props[n]},ne=function(e,t,n){var r,o=e.length;if(o!==t.length)throw"Can't interpolate between \""+e[0]+'" and "'+t[0]+'"';var a=[e[0]];for(r=1;r<o;r++)a[r]=e[r]+(t[r]-e[r])*n;return a},re=function(e){var t=1;return L.lastIndex=0,e[0].replace(L,function(){return e[t++]})},oe=function(e,t){e=[].concat(e);for(var n,r,o=0,a=e.length;o<a;o++)r=e[o],n=le[r[D]],n&&(t?(r.style.cssText=n.dirtyStyleAttr,Fe(r,n.dirtyClassAttr)):(n.dirtyStyleAttr=r.style.cssText,n.dirtyClassAttr=$e(r),r.style.cssText=n.styleAttr,Fe(r,n.classAttr)))},ae=function(){Te="translateZ(0)",i.setStyle(se,"transform",Te);var e=c(se),t=e.getPropertyValue("transform"),n=e.getPropertyValue(Y+"transform"),r=t&&"none"!==t||n&&"none"!==n;r||(Te="")};i.setStyle=function(e,t,n){var r=e.style;if(t=t.replace(z,N).replace("-",""),"zIndex"===t)isNaN(n)?r[t]=n:r[t]=""+(0|n);else if("float"===t)r.styleFloat=r.cssFloat=n;else try{_&&(r[_+t.slice(0,1).toUpperCase()+t.slice(1)]=n),r[t]=n}catch(o){}};var ie,le,se,ce,fe,ue,pe,me,de,ge,ve,he,ye,Te,be,we=i.addEvent=function(t,n,r){var o=function(t){return t=t||e.event,t.target||(t.target=t.srcElement),t.preventDefault||(t.preventDefault=function(){t.returnValue=!1,t.defaultPrevented=!0}),r.call(this,t)};n=n.split(" ");for(var a,i=0,l=n.length;i<l;i++)a=n[i],t.addEventListener?t.addEventListener(a,r,!1):t.attachEvent("on"+a,o),Ke.push({element:t,name:a,listener:r})},ke=i.removeEvent=function(e,t,n){t=t.split(" ");for(var r=0,o=t.length;r<o;r++)e.removeEventListener?e.removeEventListener(t[r],n,!1):e.detachEvent("on"+t[r],n)},Se=function(){for(var e,t=0,n=Ke.length;t<n;t++)e=Ke[t],ke(e.element,e.name,e.listener);Ke=[]},Ee=function(e,t,n){ce.keyframe&&ce.keyframe.call(ie,e,t,n)},xe=function(){var e=ie.getScrollTop();He=0,fe&&!Ye&&(a.style.height=""),j(),fe&&!Ye&&(a.style.height=He+o.clientHeight+"px"),Ye?ie.setScrollTop(s.min(ie.getScrollTop(),He)):ie.setScrollTop(e,!0),he=!0},Ae=function(){var e,t,n=o.clientHeight,r={};for(e in ue)t=ue[e],"function"==typeof t?t=t.call(ie):/p$/.test(t)&&(t=t.slice(0,-1)/100*n),r[e]=t;return r},Ce=function(){var e=se&&se.offsetHeight||0,t=s.max(e,a.scrollHeight,a.offsetHeight,o.scrollHeight,o.offsetHeight,o.clientHeight);return t-o.clientHeight},$e=function(t){var n="className";return e.SVGElement&&t instanceof e.SVGElement&&(t=t[n],n="baseVal"),t[n]},Fe=function(t,r,o){var a="className";if(e.SVGElement&&t instanceof e.SVGElement&&(t=t[a],a="baseVal"),o===n)return void(t[a]=r);for(var i=t[a],l=0,s=o.length;l<s;l++)i=Pe(i).replace(Pe(o[l])," ");i=De(i);for(var c=0,f=r.length;c<f;c++)Pe(i).indexOf(Pe(r[c]))===-1&&(i+=" "+r[c]);t[a]=De(i)},De=function(e){return e.replace(I,"")},Pe=function(e){return" "+e+" "},Ie=Date.now||function(){return+new Date},Me=function(e,t){return e.frame-t.frame},He=0,Oe=1,ze="down",Ne=-1,Ve=Ie(),Le=0,Be=0,qe=!1,_e=0,Ye=!1,Ge=0,Ke=[];"function"==typeof define&&define.amd?define("skrollr",function(){return i}):"undefined"!=typeof module&&module.exports?module.exports=i:e.skrollr=i}(window,document),$(function(){var e=getScrollTopElement();isMobile()||($(".scrolldown, .learnmore").click(function(){$(e).animate({scrollTop:$(window).height()-85},1e3)}),skrollr.init({forceHeight:!1,constants:{previewstart:100,previewend:600,infostart:1100,infoend:1200}})),$(e).scrollTop()>10&&$(".header").addClass("nav-toggled"),$(document).scroll(function(){$(e).scrollTop()>10?$(".header").addClass("nav-toggled"):$(".header").removeClass("nav-toggled")}),$(".gotop").click(function(){$(e).animate({scrollTop:0},1e3)});var t={visible:!1,init:function(){var e=new google.maps.LatLng(60.612406,6.540851),t={center:e,mapTypeId:google.maps.MapTypeId.ROADMAP,zoom:14,mapTypeControl:!1,scrollwheel:!1,draggable:!0,navigationControl:!1},n="http://i.imgur.com/CubnP8t.png",r=new google.maps.Marker({position:e,icon:n}),o=new google.maps.Map(document.getElementById("map-canvas"),t);r.setMap(o)},show:function(){this.visible||this.init(),$(".map").addClass("toggled")},hide:function(){$(".map").removeClass("toggled")}};$(".button-map").click(function(e){$(".map").hasClass("toggled")?t.hide():t.show(),e.preventDefault()}),$(".menu-toggler").click(function(){$(".content-container, .small").toggleClass("toggled")}),$(document).on("click",".content-container.toggled",function(e){$(".content-container, .small").removeClass("toggled"),e.preventDefault()})});