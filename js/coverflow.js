(function(t){var e={},n=function(t){if(!t)for(var o in e)t=e[o].id;if(t){var i=e[t];return i?i:e[t]=new n.Api(t)}return null};n.Api=function(t){var o,i;this.id=t,this.container=null,this.config=null,this.setup=function(e){o=null,i=!1;var r={mode:"html5",flash:"coverflow.swf",width:310,height:270,item:0,backgroundcolor:"000000",backgroundopacity:1,wmode:"window",gradientcolor:void 0,coverwidth:150,coverheight:"auto",covergap:40,coverangle:70,coverdepth:170,coveroffset:130,removeblackborder:!1,fixedsize:!1,opacitydecrease:.1,reflectionopacity:.3,reflectionratio:155,reflectionoffset:0,showduration:!1,showtext:!0,textstyle:".coverflow-text{color:#f1f1f1;text-align:center;font-family:Arial Rounded MT Bold,Arial;} .coverflow-text h1{font-size:14px;font-weight:normal;line-height:21px;} .coverflow-text h2{font-size:11px;font-weight:normal;} .coverflow-text a{color:#0000EE;}",textoffset:75,tweentime:.8,rotatedelay:0,focallength:250,framerate:60,x:0,y:0};return this.events={ready:new n.Signal,playlist:new n.Signal,focus:new n.Signal,click:new n.Signal,fadeIn:new n.Signal,fadeOut:new n.Signal},this.config=n.Utils.extend(r,e),this.config.id=this.id,this.container=document.getElementById(t),this.container.innerHTML="",n.Utils.addClass(this.container,"coverflow"),this.resize(this.config.width,this.config.height),this.getMode()==="html5"?o=new n.html5(this):this.getMode()==="flash"&&(o=new n.flash(this)),this.left=o.left,this.right=o.right,this.prev=o.prev,this.next=o.next,this.to=o.to,this.fadeIn=o.fadeIn,this.fadeOut=o.fadeOut,this},this.remove=function(){var t=document.createElement("div");t.id=this.id,this.container.parentNode.replaceChild(t,this.container),this.container=t,delete e[this.id]},this.resize=function(t,e){n.Utils.css(this.container,{width:t,height:e}),this.config.width=this.container.clientWidth,this.config.height=this.container.clientHeight,o&&o.resize(this.config.width,this.config.height)},this.getMode=function(){return n.Utils.hasFlash&&this.config.mode==="flash"?"flash":!n.Utils.isIE&&Modernizr.csstransforms3d&&Modernizr.csstransitions&&Modernizr.canvas?"html5":"flash"},this.on=function(t,e){this.events[t].on(e),i&&t==="ready"&&this.events.ready.trigger.apply(this)},this.off=function(t,e){this.events[t].off(e)},this.trigger=function(t){i=!0;var e=Array.prototype.slice.call(arguments);e.shift(),this.events[t].trigger.apply(this,e)}},typeof jQuery!="undefined"&&(jQuery.fn.coverflow=function(t){var e=n(this[0].id);return e[t]?e[t].apply(e,Array.prototype.slice.call(arguments,1)):typeof t=="object"?e.setup.apply(e,arguments):t?($.error("Method "+t+" does not exist on jQuery.coverflow"),void 0):e}),t.coverflow=n})(window),function(t){t.flash=function(t){function e(){var e='<object id="'+t.id+'-coverflow-flash" data="'+t.config.flash+'" width="100%" height="100%" type="application/x-shockwave-flash">'+'<param name="movie" value="'+t.config.flash+'" />'+'<param name="wmode" value="'+t.config.wmode+'" />'+'<param name="allowscriptaccess" value="always" />'+'<param name="flashvars" value="'+n(t.config)+'" />'+'<a href="http://get.adobe.com/flashplayer/">Get Adobe Flash player</a>'+"</object>";t.container.innerHTML=e,o=document.getElementById(t.id+"-coverflow-flash")}function n(t){var e="";for(var n in t)e+=typeof t[n]=="object"?n+"="+encodeURIComponent("[[JSON]]"+JSON.stringify(t[n]))+"&":n+"="+encodeURIComponent(t[n])+"&";return e.slice(0,-1)}var o;this.resize=function(t,e){o.apiResize(t,e)},this.left=function(){o.apiLeft()},this.right=function(){o.apiRight()},this.prev=function(){o.apiPrev()},this.next=function(){o.apiNext()},this.to=function(t){o.apiTo(t)},this.fadeIn=function(e){t.events.fadeIn.off().on(e),o.apiFadeIn()},this.fadeOut=function(e){t.events.fadeOut.off().on(e),o.apiFadeOut()},e()}}(coverflow),function(t){t.html5=function(e){function n(){var n=document.createElement("style");n.type="text/css",document.getElementsByTagName("head")[0].appendChild(n),n.appendChild(document.createTextNode(m.textstyle));var i=t.Utils.hexToRgb(m.backgroundcolor);m.backgroundcolor="rgba("+i.r+","+i.g+","+i.b+","+m.backgroundopacity+")",g.style.backgroundColor=m.backgroundcolor,m.gradientcolor!==void 0&&(i=t.Utils.hexToRgb(m.gradientcolor),m.gradientcolor="rgba("+i.r+","+i.g+","+i.b+","+m.backgroundopacity+")",g.style.background="-webkit-gradient(linear, left top, left bottom, from("+m.gradientcolor+"), to("+m.backgroundcolor+"))"),e.trigger("ready"),e.events.playlist.on(o);var r=new t.PlaylistLoader(e);r.load(e.config.playlist)}function o(e){h=e,m.coverheight=m.coverheight=="auto"?m.height:m.coverheight,d&&d.destroy(),d=new t.CoverFlow(g,h,m),g.appendChild(d.domElement),u&&g.removeChild(u),m.showtext===!0&&(u=document.createElement("div"),t.Utils.addClass(u,"coverflow-text"),g.appendChild(u)),d.onFocus(r),d.onClick(a),v.resize(m.width,m.height),m.rotatedelay>0&&(p&&v.stopRotation(),p=setInterval(s,m.rotatedelay),g.addEventListener("touchstart",v.stopRotation,!1),g.addEventListener("mousedown",v.stopRotation,!1)),g.addEventListener("webkitTransitionEnd",f,!1),g.addEventListener("transitionend",f,!1),g.addEventListener("mousewheel",i),g.addEventListener("DOMMouseScroll",i)}function i(t){t.preventDefault();var e=t.detail?t.detail*-120:t.wheelDelta,n=Math.ceil(Math.abs(e)/120);if(n>0){var o=Math.abs(e)/e,i=null;if(o>0?i=v.left:0>o&&(i=v.right),typeof i=="function")for(var r=0;n>r;r++)i()}}function r(t){if(m.showtext===!0){var n=h[t];n&&(u.innerHTML="<h1>"+(n.title===void 0?"":n.title)+"</h1><h2>"+(n.description===void 0?"":n.description)+"</h2>")}e.trigger("focus",t,h[t]?h[t].link:void 0)}function a(t){m.rotatedelay>0&&p&&v.stopRotation(),e.trigger("click",t,h[t]?h[t].link:void 0)}function s(){d.next()}function l(){g.style.opacity=1}function c(){u&&(u.style.opacity=0),d.fadeOut(function(){g.style.opacity=0})}function f(t){t.target===g&&(parseInt(g.style.opacity,10)===0?e.events.fadeOut.trigger():(u&&(u.style.opacity=1),d.fadeIn(function(){e.events.fadeIn.trigger()})))}var h,d,u,p,v=this,g=e.container,m=e.config;this.stopRotation=function(){g.removeEventListener("touchstart",v.stopRotation,!1),g.removeEventListener("mousedown",v.stopRotation,!1),clearInterval(p)},this.resize=function(t,e){d&&d.resize(t,e),u&&(u.style.top=e-m.textoffset+"px")},this.left=function(){d.left()},this.right=function(){d.right()},this.prev=function(){d.prev()},this.next=function(){d.next()},this.to=function(t){d.to(t)},this.fadeIn=function(t){e.events.fadeIn.off().on(t),l()},this.fadeOut=function(t){e.events.fadeOut.off().on(t),c()},n()}}(coverflow),function(t){t.CoverFlow=function(e,n,o){function i(t){t.stopPropagation(),parseInt(m.domElement.firstChild.style.opacity,10)===0?(s.domElement.style.opacity=0,l.trigger()):parseInt(m.domElement.firstChild.style.opacity,10)===1&&c.trigger()}function r(t){var e=this,n=0;while((e=e.previousSibling)!==null)n+=1;var o=s.covers[n],i=t.offsetY||t.layerY;o.halfHeight>i&&(t.preventDefault(),o.index!=u?s.to(o.index):s.clicked(o.index))}function a(t){var e=t.target;if(e.tagName!="INPUT"&&e.tagName!="SELECT"&&e.tagName!="TEXTAREA"&&[37,39,38,40,32].indexOf(t.keyCode)!==-1)switch(t.preventDefault(),t.keyCode){case 37:s.left();break;case 39:s.right();break;case 38:s.to(0);break;case 40:s.to(f-1);break;case 32:s.clicked(u)}}var s=this;this.config=o;var l=new t.Signal,c=new t.Signal,f=n.length,h=0,d=0,u=0,p=[],v=[];this.covers=[],this.transforms=[],this.prevF=-1,this.transformProp=Modernizr.prefixed("transform"),this.space=o.coveroffset+o.covergap,this._angle="rotateY("+-o.coverangle+"deg)",this.angle="rotateY("+o.coverangle+"deg)",this.domElement=document.createElement("div"),this.domElement.className="coverflow-wrap",this.tray=document.createElement("div"),this.tray.className="coverflow-tray",this.domElement.appendChild(this.tray),this.domElement.style[Modernizr.prefixed("perspective")]=o.focallength+"px";for(var g=new t.Controller(this,this.tray,this.config),m=null,y=0;f>y;y++)m=new t.Cover(s,y,n[y].image,n[y].duration,o),this.tray.appendChild(m.domElement),m.domElement.onmousedown=r,m.domElement.style[Modernizr.prefixed("transitionDuration")]=this.config.tweentime+"s",this.covers[y]=m;m&&(m.domElement.firstChild.addEventListener("webkitTransitionEnd",i,!1),m.domElement.firstChild.addEventListener("transitionend",i,!1)),e.addEventListener("touchstart",g,!0),window.addEventListener("keydown",a,!1),this.fadeOut=function(t){l.off().on(t);for(var e=0;this.covers.length>e;e++)this.covers[e].domElement.firstChild.style.opacity=0},this.fadeIn=function(t){c.off().on(t),s.domElement.style.opacity=1;for(var e=0;this.covers.length>e;e++)this.covers[e].domElement.firstChild.style.opacity=1},this.itemComplete=function(t){if(d=t>d?t:d,h+=1,h==f){s.to(o.item);for(var e=0;f>e;e++)this.covers[e].setY(d)}},this.left=function(){u>0&&s.to(u-1)},this.right=function(){f-1>u&&s.to(u+1)},this.prev=function(){u>0?s.to(u-1):s.to(f-1)},this.next=function(){f-1>u?s.to(u+1):s.to(0)},this.to=function(t){t>f-1?t=f-1:0>t&&(t=0),u=t,g.to(t)},this.focused=function(t){for(var e=0;p.length>e;e++)p[e](t)},this.clicked=function(t){for(var e=0;v.length>e;e++)v[e](t)},this.onFocus=function(t){p.push(t)},this.onClick=function(t){v.push(t)},this.destroy=function(){e.removeChild(s.domElement),e.removeEventListener("touchstart",g,!0),window.removeEventListener("keydown",a,!1)},this.resize=function(){t.Utils.css(this.domElement,{left:o.width*.5+o.x,top:o.height*.5+o.y})}},t.CoverFlow.prototype.updateTouchEnd=function(t){var e=this.getFocusedCover(t.currentX);t.currentX=-e*this.config.covergap,this.update(t.currentX)},t.CoverFlow.prototype.getFocusedCover=function(t){var e=-Math.round(t/this.config.covergap);return Math.min(Math.max(e,0),this.covers.length-1)},t.CoverFlow.prototype.getFocusedCoverOne=function(t){var e=-Math.round(t/this.config.covergap);return Math.min(Math.max(e,-1),this.covers.length)},t.CoverFlow.prototype.tap=function(t,e,n){var o=-Math.round(n/this.config.covergap),i=this.covers[o];if(i.domElement==t.target.parentNode){var r=this.findPos(i.domElement),a=e-r.y;i.halfHeight>a&&this.clicked(i.index)}},t.CoverFlow.prototype.findPos=function(t){var e=0,n=0;if(t.offsetParent){do e+=t.offsetLeft,n+=t.offsetTop;while((t=t.offsetParent)!==null);return{x:e,y:n}}},t.CoverFlow.prototype.setCoverStyle=function(t,e,n){this.transforms[e]!=n&&(t.domElement.style[this.transformProp]=n,this.transforms[e]=n)},t.CoverFlow.prototype.getCoverTransform=function(t,e){var n=e*this.config.covergap;return t==e?"translate3d("+n+"px, 0, 0)":e>t?"translate3d("+(n+this.space)+"px, 0, "+-this.config.coverdepth+"px) "+this._angle:"translate3d("+(n-this.space)+"px, 0, "+-this.config.coverdepth+"px) "+this.angle},t.CoverFlow.prototype.update=function(t){this.tray.style[this.transformProp]="translate3d("+t+"px, 0, 0)";var e=this.getFocusedCoverOne(t);e!=this.prevF&&(this.focused(e),this.prevF=e);for(var n=0;this.covers.length>n;n++)this.setCoverStyle(this.covers[n],n,this.getCoverTransform(e,n))}}(coverflow),function(t){t.Cover=function(e,n,o,i,r){function a(){var n,o=p.width,a=p.height,v=0,g=0,m=0;if(r.removeblackborder){var y=document.createElement("canvas");y.width=o,y.height=a,n=y.getContext("2d"),n.drawImage(p,0,0);for(var w=n.getImageData(0,0,o,a).data,x=0,C=0,E=0,b=0;a>b;b++){for(x=0,C=0;o>C;C++)E=(b*o+C)*4,x+=w[E]<<16|w[E+1]<<8|w[E+2];if(x/o>=460551)break;v++}for(b=a-1;b>=0;b--){for(x=0,C=0;o>C;C++)E=(b*o+C)*4,x+=w[E]<<16|w[E+1]<<8|w[E+2];if(x/o>=460551)break;g++}a-=v+g}var k;if(r.fixedsize?(s=Math.round(f),l=Math.round(h),l/a>s/o?(k=l/a,m+=(o-s/k)*.5):(k=s/o,v+=(a-l/k)*.5)):h>f?(s=Math.round(f),l=Math.round(a/o*f),k=f/o):(s=Math.round(o/a*h),l=Math.round(h),k=h/a),c.halfHeight=l,d.top=-(l*.5)+"px",d.left=-(s*.5)+"px",d.width=s+"px",d.height=l+"px",u.width=s,u.height=l*2,n=u.getContext("2d"),n.drawImage(p,m,v,o-2*m,a-2*v,0,0,s,l),r.showduration&&i>0){n.save();var M=t.Cover.formatTime(i);n.font="normal 10px Arial Rounded MT Bold, Arial";var T=n.measureText(M),I=T.width;n.roundRect(s-(I+9),5,I+4,11,2),n.fillStyle="#000",n.globalAlpha=.7,n.fill(),n.fillStyle="#fff",n.globalAlpha=.8,n.textAlign="right",n.fillText(M,s-7,14),n.restore()}r.reflectionopacity>0&&(d.height=l*2+"px",t.Cover.reflect(u,s,l,r.reflectionopacity,r.reflectionratio,r.reflectionoffset)),e.itemComplete(l)}var s,l,c=this,f=r.coverwidth,h=r.coverheight;this.index=n,this.halfHeight=0,this.domElement=document.createElement("div"),this.domElement.className=t.Cover.getClassName();var d=this.domElement.style;r.backgroundopacity===1&&(d.backgroundColor=r.backgroundcolor);var u=document.createElement("canvas");this.domElement.appendChild(u);var p=new Image;p.onload=a,p.src=o,this.setY=function(t){var e=t*.5-(t-l);this.domElement.style.top=-e+"px"}},t.Cover.getClassName=function(){return"coverflow-cell"},t.Cover.reflect=function(t,e,n,o,i,r){var a=t.getContext("2d");a.save(),a.scale(1,-1),a.drawImage(t,0,-n*2-r),a.restore(),a.globalCompositeOperation="destination-out";var s=a.createLinearGradient(0,0,0,n);s.addColorStop(i/255,"rgba(255, 255, 255, 1.0)"),s.addColorStop(0,"rgba(255, 255, 255, "+(1-o)+")"),a.translate(0,n+r),a.fillStyle=s,a.fillRect(0,0,e,n)},t.Cover.formatTime=function(t){var e=Math.floor(t/3600),n=Math.floor(t%3600/60),o=Math.floor(t%3600%60);return(e===0?"":e+""+":")+(n+"")+":"+(10>o?"0"+(o+""):o+"")},window.CanvasRenderingContext2D&&CanvasRenderingContext2D.prototype&&(CanvasRenderingContext2D.prototype.roundRect=function(t,e,n,o,i){return 2*i>n&&(i=n/2),2*i>o&&(i=o/2),this.beginPath(),this.moveTo(t+i,e),this.arcTo(t+n,e,t+n,e+o,i),this.arcTo(t+n,e+o,t,e+o,i),this.arcTo(t,e+o,t,e,i),this.arcTo(t,e,t+n,e,i),this.closePath(),this})}(coverflow),function(t){t.Controller=function(t,e,n){this.flow=t,this.elem=e,this.config=n,this.currentX=0,this.transformProp=Modernizr.prefixed("transitionDuration")},t.Controller.prototype.handleEvent=function(t){t.preventDefault(),this[t.type](t)},t.Controller.prototype.touchstart=function(t){t.stopImmediatePropagation(),this.startX=t.touches[0].pageX-this.currentX,this.pageY=t.touches[0].pageY,this.touchMoved=!1,window.addEventListener("touchmove",this,!0),window.addEventListener("touchend",this,!0),this.elem.style[this.transformProp]="0s"},t.Controller.prototype.touchmove=function(t){t.stopImmediatePropagation(),this.touchMoved=!0,this.lastX=this.currentX,this.lastMoveTime=(new Date).getTime(),this.currentX=t.touches[0].pageX-this.startX,this.flow.update(this.currentX)},t.Controller.prototype.touchend=function(t){if(t.stopImmediatePropagation(),window.removeEventListener("touchmove",this,!0),window.removeEventListener("touchend",this,!0),this.elem.style[this.transformProp]=this.config.tweentime+"s",this.touchMoved){var e=this.currentX-this.lastX,n=(new Date).getTime()-this.lastMoveTime+1;this.currentX=this.currentX+e*50/n,this.flow.updateTouchEnd(this)}else this.flow.tap(t,this.pageY,this.currentX)},t.Controller.prototype.to=function(t){this.currentX=-t*this.config.covergap,this.flow.update(this.currentX)}}(coverflow),function(t){t.PlaylistLoader=function(e){function n(t){var n=[];if(r.hasOwnProperty("route")){r.route.hasOwnProperty("playlist")&&(t=t[r.route.playlist]);for(var i=0;t.length>i;i++)n[i]={image:o(t[i],"image"),title:o(t[i],"title"),description:o(t[i],"description"),link:o(t[i],"link"),duration:o(t[i],"duration")}}e.events.playlist.trigger(n),e.events.playlist.off()}function o(t,e){if(r.route.hasOwnProperty(e)){for(var n=t,o=r.route[e].split("."),i=0;o.length>i;i++)n=n[o[i]];return n}return t[e]}function i(t){var n=JSON.parse(t.responseText);e.events.playlist.trigger(n),e.events.playlist.off()}var r=e.config;this.load=function(o){typeof o=="string"?o.indexOf("callback=?")!==-1?t.Utils.jsonp(o,n):t.Utils.ajax(o,i):typeof o=="object"&&(e.events.playlist.trigger(o),e.events.playlist.off())}}}(coverflow),function(t){t.Signal=function(){var t=[];this.on=function(e){return t.push(e),this},this.trigger=function(){for(var e=Array.prototype.slice.call(arguments),n=0;t.length>n;n++)typeof t[n]=="function"&&t[n].apply(this,e);return this},this.off=function(e){if(e)for(var n=0;t.length>n;n++)t[n]===e&&(t.splice(n,1),n--);else t=[];return this}}}(coverflow),function(t){t.Utils=function(){},t.Utils.hasFlash=navigator.plugins!==void 0&&typeof navigator.plugins["Shockwave Flash"]=="object"||window.ActiveXObject&&new ActiveXObject("ShockwaveFlash.ShockwaveFlash")!==!1,t.Utils.isIE=navigator.userAgent.match(/msie/i)!==null,t.Utils.ajax=function(t,e,n){var o;o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),o.onreadystatechange=function(){o.readyState===4&&(o.status===200?e&&e(o):n&&n(t))};try{o.open("GET",t,!0),o.send(null)}catch(i){n&&n(t)}return o},t.Utils.jsonp=function(e,n,o){var i=e.indexOf("?")===-1?"?":"&";o=o||{};for(var r in o)o.hasOwnProperty(r)&&(i+=encodeURIComponent(r)+"="+encodeURIComponent(o[r])+"&");var a=t.Utils.uniqueId("json_call");window[a]=function(t){n(t),window[a]=null};var s=document.createElement("script");s.src=e.indexOf("callback=?")!==-1?e.replace("callback=?","callback="+a)+i.slice(0,-1):e+i+"callback="+a,s.async=!0,s.onload=s.onreadystatechange=function(){this.readyState&&this.readyState!=="loaded"&&this.readyState!=="complete"||(s.onload=s.onreadystatechange=null,s&&s.parentNode&&s.parentNode.removeChild(s))};var l=document.head||document.getElementsByTagName("head")[0]||document.documentElement;l.insertBefore(s,l.firstChild)},t.Utils.extend=function(t,e){for(var n in e)e[n]&&e[n].constructor&&e[n].constructor===Object?(t[n]=t[n]||{},arguments.callee(t[n],e[n])):t[n]=e[n];return t};var e=0;t.Utils.uniqueId=function(t){var n=e++;return t?t+n:n},t.Utils.css=function(t,e){if(t)for(var n in e)if(e[n]!==void 0){if(typeof e[n]=="number"&&n!="zIndex"&&n!="opacity"){if(isNaN(e[n]))continue;e[n]=Math.ceil(e[n])+"px"}try{t.style[n]=e[n]}catch(o){}}},t.Utils.addClass=function(t,e){t.className.indexOf(e)===-1&&(t.className+=" "+e)},t.Utils.hexToRgb=function(t){var e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;t=t.replace(e,function(t,e,n,o){return e+e+n+n+o+o});var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null}}(coverflow),Array.indexOf||(Array.prototype.indexOf=function(t){for(var e=0;this.length>e;e++)if(this[e]==t)return e;return-1}),window.Modernizr=function(t,e,n){function o(t){m.cssText=t}function i(t,e){return typeof t===e}function r(t,e){return!!~(""+t).indexOf(e)}function a(t,e){for(var o in t){var i=t[o];if(!r(i,"-")&&m[i]!==n)return e=="pfx"?i:!0}return!1}function s(t,e,o){for(var r in t){var a=e[t[r]];if(a!==n)return o===!1?t[r]:i(a,"function")?a.bind(o||e):a}return!1}function l(t,e,n){var o=t.charAt(0).toUpperCase()+t.slice(1),r=(t+" "+x.join(o+" ")+o).split(" ");return i(e,"string")||i(e,"undefined")?a(r,e):(r=(t+" "+C.join(o+" ")+o).split(" "),s(r,e,n))}var c,f,h,d="2.6.2",u={},p=e.documentElement,v="modernizr",g=e.createElement(v),m=g.style,y=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),w="Webkit Moz O ms",x=w.split(" "),C=w.toLowerCase().split(" "),E={},b=[],k=b.slice,M=function(t,n,o,i){var r,a,s,l,c=e.createElement("div"),f=e.body,h=f||e.createElement("body");if(parseInt(o,10))while(o--)s=e.createElement("div"),s.id=i?i[o]:v+(o+1),c.appendChild(s);return r=["&#173;",'<style id="s',v,'">',t,"</style>"].join(""),c.id=v,(f?c:h).innerHTML+=r,h.appendChild(c),f||(h.style.background="",h.style.overflow="hidden",l=p.style.overflow,p.style.overflow="hidden",p.appendChild(h)),a=n(c,t),f?c.parentNode.removeChild(c):(h.parentNode.removeChild(h),p.style.overflow=l),!!a},T={}.hasOwnProperty;h=i(T,"undefined")||i(T.call,"undefined")?function(t,e){return e in t&&i(t.constructor.prototype[e],"undefined")}:function(t,e){return T.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(t){var e=this;if(typeof e!="function")throw new TypeError;var n=k.call(arguments,1),o=function(){if(this instanceof o){var i=function(){};i.prototype=e.prototype;var r=new i,a=e.apply(r,n.concat(k.call(arguments)));return Object(a)===a?a:r}return e.apply(t,n.concat(k.call(arguments)))};return o}),E.canvas=function(){var t=e.createElement("canvas");return!!t.getContext&&!!t.getContext("2d")},E.canvastext=function(){return!!u.canvas&&!!i(e.createElement("canvas").getContext("2d").fillText,"function")},E.csstransforms3d=function(){var t=!!l("perspective");return t&&"webkitPerspective"in p.style&&M("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(e){t=e.offsetLeft===9&&e.offsetHeight===3}),t},E.csstransitions=function(){return l("transition")};for(var I in E)h(E,I)&&(f=I.toLowerCase(),u[f]=E[I](),b.push((u[f]?"":"no-")+f));return u.addTest=function(t,e){if(typeof t=="object")for(var o in t)h(t,o)&&u.addTest(o,t[o]);else{if(t=t.toLowerCase(),u[t]!==n)return u;e=typeof e=="function"?e():e,typeof enableClasses!="undefined"&&enableClasses&&(p.className+=" "+(e?"":"no-")+t),u[t]=e}return u},o(""),g=c=null,u._version=d,u._prefixes=y,u._domPrefixes=C,u._cssomPrefixes=x,u.testProp=function(t){return a([t])},u.testAllProps=l,u.testStyles=M,u.prefixed=function(t,e,n){return e?l(t,e,n):l(t,"pfx")},u}(this,this.document)