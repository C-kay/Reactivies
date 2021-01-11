(this["webpackJsonpclient-app"]=this["webpackJsonpclient-app"]||[]).push([[0],{277:function(e,t,a){},469:function(e,t,a){"use strict";a.r(t),a.d(t,"history",(function(){return Dt}));var n=a(0),r=a.n(n),i=a(42),c=a.n(i),o=a(18),l=(a(277),a(278),a(279),a(280),a(39)),s=a(487),u=a(57),m=a(494),d=a(20),b=a(491),p=a(502),h=a(261),v=a(124),f=a(12),g=a(46),y=a(11),E=(a(115),a(9)),j=a(15),O=a.n(j),w=a(44),A=a(259),S=a(141),k=a(81),C=a.n(k);C.a.defaults.baseURL="/api",C.a.interceptors.request.use((function(e){var t=window.localStorage.getItem("jwt");return t&&(e.headers.Authorization="Bearer ".concat(t)),e}),(function(e){return Promise.reject(e)})),C.a.interceptors.response.use(void 0,(function(e){"Network Error"!==e.message||e.response||u.b.error("Network error - make sure Api is running!");var t=e.response,a=t.status,n=t.data,r=t.config;throw 400===a&&Dt.push("/notfound"),404===a&&"get"===r.method&&n.errors.hasOwnProperty("id")&&Dt.push("/notfound"),500===a&&u.b.error("Server errror - check the terminal for more info!"),e.response}));var x,z,R,I,L,M,T,D,F,H,G,q,P,N,B,U,V,J,W,Y,K,Q,X,Z,$,_,ee,te,ae,ne,re,ie,ce,oe,le,se,ue,me,de,be,pe,he,ve=function(e){return e.data},fe=function(e){return C.a.get(e).then(ve)},ge=function(e,t){return C.a.post(e,t).then(ve)},ye=function(e,t){return C.a.get(e,t).then(ve)},Ee=function(e){return C.a.delete(e).then(ve)},je={Activities:{list:function(){return fe("/activities")},details:function(e){return fe("/activities/".concat(e))},create:function(e){return ge("/activities",e)},update:function(e){return ye("/activities/".concat(e.id),e)},delete:function(e){return Ee("/activities/".concat(e))},attend:function(e){return ge("/activities/".concat(e,"/attend"),{})},unattend:function(e){return Ee("/activities/".concat(e,"/attend"))}},User:{current:function(){return fe("/user")},login:function(e){return ge("/user/login",e)},register:function(e){return ge("/user/register",e)}}},Oe=function(e,t){e.date=new Date(e.date),e.isGoing=e.attendees.some((function(e){return e.username===t.username})),e.isHosting=e.attendees.some((function(e){return e.username===t.username&&e.isHost}))},we=function(e){return{displayName:e.displayName,isHost:!1,username:e.username,image:e.image}},Ae=a(201),Se=(x=E.f.ref,z=function(){function e(t){var a=this;Object(g.a)(this,e),this.rootStore=void 0,Object(f.a)(this,"activityRegistry",R,this),Object(f.a)(this,"selectedActivity",I,this),Object(f.a)(this,"loadingInitial",L,this),Object(f.a)(this,"submitting",M,this),Object(f.a)(this,"target",T,this),Object(f.a)(this,"loading",D,this),Object(f.a)(this,"hubConnection",F,this),Object(f.a)(this,"createHubConnection",H,this),Object(f.a)(this,"stopConnection",G,this),Object(f.a)(this,"addComment",q,this),Object(f.a)(this,"loadActivities",P,this),Object(f.a)(this,"selectActivity",N,this),Object(f.a)(this,"loadActivity",B,this),Object(f.a)(this,"clearActivity",U,this),this.getActivity=function(e){return a.activityRegistry.get(e)},Object(f.a)(this,"createActivity",V,this),Object(f.a)(this,"editActivity",J,this),Object(f.a)(this,"deleteActivity",W,this),Object(f.a)(this,"attendActivity",Y,this),Object(f.a)(this,"cancelAttendance",K,this),this.rootStore=t,Object(E.e)(this)}return Object(S.a)(e,[{key:"groupActivitiesByDate",value:function(e){var t=e.sort((function(e,t){return e.date.getTime()-t.date.getTime()}));return Object.entries(t.reduce((function(e,t){var a=t.date.toISOString().split("T")[0];return e[a]=e[a]?[].concat(Object(A.a)(e[a]),[t]):[t],e}),{}))}},{key:"activitiesByDate",get:function(){return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))}}]),e}(),R=Object(y.a)(z.prototype,"activityRegistry",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new Map}}),I=Object(y.a)(z.prototype,"selectedActivity",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),L=Object(y.a)(z.prototype,"loadingInitial",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),M=Object(y.a)(z.prototype,"submitting",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),T=Object(y.a)(z.prototype,"target",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),D=Object(y.a)(z.prototype,"loading",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),F=Object(y.a)(z.prototype,"hubConnection",[x],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),H=Object(y.a)(z.prototype,"createHubConnection",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.hubConnection=(new Ae.a).withUrl("/chat",{accessTokenFactory:function(){return e.rootStore.commonStore.token}}).configureLogging(Ae.b.Information).build(),e.hubConnection.start().then((function(){return console.log(e.hubConnection.state)})).then((function(){console.log("Attempting to join group"),e.hubConnection.invoke("AddToGroup",t)})).catch((function(e){return console.log("Error establishing connection: ",e)})),e.hubConnection.on("ReceiveComment",(function(t){e.selectedActivity.comments.push(t)})),e.hubConnection.on("Send",(function(e){u.b.info(e)}))}}}),G=Object(y.a)(z.prototype,"stopConnection",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){e.hubConnection.invoke("RemoveFromGroup",e.selectedActivity.id).then((function(){e.hubConnection.stop()})).then((function(){return console.log("Connetion stopped")})).catch((function(e){return console.log(e)}))}}}),q=Object(y.a)(z.prototype,"addComment",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){var t=Object(w.a)(O.a.mark((function t(a){var n;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.activityId=null===(n=e.selectedActivity)||void 0===n?void 0:n.id,t.prev=1,t.next=4,e.hubConnection.invoke("SendComment",a);case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),console.log(t.t0);case 9:case"end":return t.stop()}}),t,null,[[1,6]])})));return function(e){return t.apply(this,arguments)}}()}}),Object(y.a)(z.prototype,"activitiesByDate",[E.c],Object.getOwnPropertyDescriptor(z.prototype,"activitiesByDate"),z.prototype),P=Object(y.a)(z.prototype,"loadActivities",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return Object(w.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loadingInitial=!0,t.prev=1,t.next=4,je.Activities.list();case 4:t.sent.forEach((function(t){Oe(t,e.rootStore.userStore.user),e.activityRegistry.set(t.id,t),e.loadingInitial=!1})),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),e.loadingInitial=!1,console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[1,8]])})))}}),N=Object(y.a)(z.prototype,"selectActivity",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.selectedActivity=e.activityRegistry.get(t)}}}),B=Object(y.a)(z.prototype,"loadActivity",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){var t=Object(w.a)(O.a.mark((function t(a){var n;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=e.getActivity(a))){t.next=6;break}return e.selectedActivity=n,t.abrupt("return",n);case 6:return e.loadingInitial=!0,t.prev=7,t.next=10,je.Activities.details(a);case 10:return n=t.sent,Oe(n,e.rootStore.userStore.user),e.selectedActivity=n,e.activityRegistry.set(n.id,n),e.loadingInitial=!1,t.abrupt("return",n);case 18:t.prev=18,t.t0=t.catch(7),e.loadingInitial=!1;case 21:case"end":return t.stop()}}),t,null,[[7,18]])})));return function(e){return t.apply(this,arguments)}}()}}),U=Object(y.a)(z.prototype,"clearActivity",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){e.selectedActivity=null}}}),V=Object(y.a)(z.prototype,"createActivity",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){var t=Object(w.a)(O.a.mark((function t(a){var n,r;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.submitting=!0,t.prev=1,t.next=4,je.Activities.create(a);case 4:e.activityRegistry.set(a.id,a),(n=we(e.rootStore.userStore.user)).isHost=!0,(r=[]).push(n),a.attendees=r,a.comments=[],a.isHosting=!0,e.selectedActivity=a,e.submitting=!1,Dt.push("/activities/".concat(a.id)),t.next=22;break;case 17:t.prev=17,t.t0=t.catch(1),e.submitting=!1,u.b.error("Problem submitting data"),console.log(t.t0.response);case 22:case"end":return t.stop()}}),t,null,[[1,17]])})));return function(e){return t.apply(this,arguments)}}()}}),J=Object(y.a)(z.prototype,"editActivity",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){var t=Object(w.a)(O.a.mark((function t(a){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.submitting=!0,t.prev=1,t.next=4,je.Activities.update(a);case 4:e.activityRegistry.set(a.id,a),e.selectedActivity=a,e.submitting=!1,Dt.push("/activities/".concat(a.id)),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(1),console.log(t.t0),e.submitting=!1;case 14:case"end":return t.stop()}}),t,null,[[1,10]])})));return function(e){return t.apply(this,arguments)}}()}}),W=Object(y.a)(z.prototype,"deleteActivity",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){var t=Object(w.a)(O.a.mark((function t(a,n){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.submitting=!0,e.target=a.currentTarget.name,t.prev=2,t.next=5,je.Activities.delete(n.id);case 5:e.activityRegistry.delete(n.id),e.submitting=!1,t.next=14;break;case 9:t.prev=9,t.t0=t.catch(2),console.log(t.t0),e.submitting=!1,e.target="";case 14:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(e,a){return t.apply(this,arguments)}}()}}),Y=Object(y.a)(z.prototype,"attendActivity",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return Object(w.a)(O.a.mark((function t(){var a;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=we(e.rootStore.userStore.user),e.loading=!0,t.prev=2,t.next=5,je.Activities.attend(e.selectedActivity.id);case 5:e.selectedActivity&&(e.selectedActivity.attendees.push(a),e.selectedActivity.isGoing=!0,e.activityRegistry.set(e.selectedActivity.id,e.selectedActivity),e.loading=!1),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(2),e.loading=!1,u.b.error("Problem signing up to activity");case 12:case"end":return t.stop()}}),t,null,[[2,8]])})))}}),K=Object(y.a)(z.prototype,"cancelAttendance",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return Object(w.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.prev=1,t.next=4,je.Activities.unattend(e.selectedActivity.id);case 4:e.selectedActivity&&(e.selectedActivity.attendees=e.selectedActivity.attendees.filter((function(t){return t.username!==e.rootStore.userStore.user.username})),e.selectedActivity.isGoing=!1,e.activityRegistry.set(e.selectedActivity.id,e.selectedActivity),e.loading=!1),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(1),u.b.error("Problem canceling attendance"),e.loading=!1;case 11:case"end":return t.stop()}}),t,null,[[1,7]])})))}}),z),ke=(Q=function e(t){var a=this;Object(g.a)(this,e),this.rootStore=void 0,Object(f.a)(this,"token",X,this),Object(f.a)(this,"appLoaded",Z,this),Object(f.a)(this,"setToken",$,this),Object(f.a)(this,"setAppLoaded",_,this),this.rootStore=t,Object(E.e)(this),Object(E.g)((function(){return a.token}),(function(e){e?window.localStorage.setItem("jwt",e):window.localStorage.removeItem("jwt")}))},X=Object(y.a)(Q.prototype,"token",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return window.localStorage.getItem("jwt")}}),Z=Object(y.a)(Q.prototype,"appLoaded",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),$=Object(y.a)(Q.prototype,"setToken",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.token=t}}}),_=Object(y.a)(Q.prototype,"setAppLoaded",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){e.appLoaded=!0}}}),Q),Ce=(ee=E.f.shallow,te=function e(t){Object(g.a)(this,e),this.rootStore=void 0,Object(f.a)(this,"modal",ae,this),Object(f.a)(this,"openModal",ne,this),Object(f.a)(this,"closeModal",re,this),this.rootStore=t,Object(E.e)(this)},ae=Object(y.a)(te.prototype,"modal",[ee],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{open:!1,body:null}}}),ne=Object(y.a)(te.prototype,"openModal",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(t){e.modal.open=!0,e.modal.body=t}}}),re=Object(y.a)(te.prototype,"closeModal",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){e.modal.open=!1,e.modal.body=null}}}),te),xe=(ie=function(){function e(t){Object(g.a)(this,e),this.rootStore=void 0,Object(f.a)(this,"user",ce,this),Object(f.a)(this,"login",oe,this),Object(f.a)(this,"register",le,this),Object(f.a)(this,"getUser",se,this),Object(f.a)(this,"logout",ue,this),this.rootStore=t,Object(E.e)(this)}return Object(S.a)(e,[{key:"isLoggedIn",get:function(){return!!this.user}}]),e}(),ce=Object(y.a)(ie.prototype,"user",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),Object(y.a)(ie.prototype,"isLoggedIn",[E.c],Object.getOwnPropertyDescriptor(ie.prototype,"isLoggedIn"),ie.prototype),oe=Object(y.a)(ie.prototype,"login",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){var t=Object(w.a)(O.a.mark((function t(a){var n;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,je.User.login(a);case 3:n=t.sent,e.user=n,console.log(e.user),e.rootStore.commonStore.setToken(n.token),e.rootStore.modalStore.closeModal(),Dt.push("/activities"),t.next=14;break;case 11:throw t.prev=11,t.t0=t.catch(0),t.t0;case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()}}),le=Object(y.a)(ie.prototype,"register",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){var t=Object(w.a)(O.a.mark((function t(a){var n;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,je.User.register(a);case 3:n=t.sent,e.rootStore.commonStore.setToken(n.token),e.rootStore.modalStore.closeModal(),Dt.push("/activities"),t.next=12;break;case 9:throw t.prev=9,t.t0=t.catch(0),t.t0;case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()}}),se=Object(y.a)(ie.prototype,"getUser",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return Object(w.a)(O.a.mark((function t(){var a;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,je.User.current();case 3:a=t.sent,e.user=a,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))}}),ue=Object(y.a)(ie.prototype,"logout",[E.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){e.rootStore.commonStore.setToken(null),console.log(e.user),e.user=null,Dt.push("/")}}}),ie),ze=(me=function e(){Object(g.a)(this,e),Object(f.a)(this,"activityStore",de,this),Object(f.a)(this,"userStore",be,this),Object(f.a)(this,"commonStore",pe,this),Object(f.a)(this,"modalStore",he,this),this.activityStore=new Se(this),this.userStore=new xe(this),this.commonStore=new ke(this),this.modalStore=new Ce(this),Object(E.e)(this)},de=Object(y.a)(me.prototype,"activityStore",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),be=Object(y.a)(me.prototype,"userStore",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),pe=Object(y.a)(me.prototype,"commonStore",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),he=Object(y.a)(me.prototype,"modalStore",[E.f],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),me),Re=Object(n.createContext)(new ze),Ie=Object(m.a)((function(){var e=Object(n.useContext)(Re).userStore,t=e.user,a=e.logout;return r.a.createElement(b.a,{fixed:"top",inverted:!0},r.a.createElement(s.a,null,r.a.createElement(b.a.Item,{header:!0,as:d.b,to:"/"},r.a.createElement("img",{src:"/assets/logo.png",alt:"logo",style:{marginRight:"10px"}}),"Reactivities"),r.a.createElement(b.a.Item,{name:"Activities",as:d.b,to:"/activities"}),r.a.createElement(b.a.Item,null,r.a.createElement(p.a,{as:d.b,to:"/createActivity",positive:!0,content:"Create Activity"})),t&&r.a.createElement(b.a.Item,{position:"right"},r.a.createElement(h.a,{avatar:!0,spaced:"right",src:t.image||"/assets/user.png"}),r.a.createElement(v.a,{pointing:"top left",text:t.displayName},r.a.createElement(v.a.Menu,null,r.a.createElement(v.a.Item,{as:d.a,to:"/profile/username",text:"My profile",icon:"user"}),r.a.createElement(v.a.Item,{onClick:a,text:"Logout",icon:"power"}))))))})),Le=a(506),Me=a(121),Te=a(165),De=a(496),Fe=a(493),He=a(505),Ge=a(77),qe=a(497),Pe=a(490),Ne=function(e){var t=e.attendees;return r.a.createElement(qe.a,{horizontal:!0},t.map((function(e){return r.a.createElement(qe.a.Item,{key:e.username},r.a.createElement(Pe.a,{header:e.displayName,trigger:r.a.createElement(h.a,{size:"mini",circular:!0,src:e.image||"/assets/user.png"})}))})))},Be=function(e){var t=e.activity,a=t.attendees.filter((function(e){return e.isHost}))[0];return r.a.createElement(He.a.Group,null,r.a.createElement(He.a,null,r.a.createElement(De.a.Group,null,r.a.createElement(De.a,null,r.a.createElement(De.a.Image,{size:"tiny",circular:!0,src:a.image||"/assets/user.png"}),r.a.createElement(De.a.Content,null,r.a.createElement(De.a.Header,{as:d.a,to:"/activites/".concat(t.id)},t.title),r.a.createElement(De.a.Description,null,"Hosted by ",a.username),t.isHosting&&r.a.createElement(De.a.Description,null,r.a.createElement(Te.a,{basic:!0,color:"orange",content:"You are hosting this activity"})),t.isGoing&&r.a.createElement(De.a.Description,null,r.a.createElement(Te.a,{basic:!0,color:"green",content:"You are going to this activity"})))))),r.a.createElement(He.a,null,r.a.createElement(Ge.a,{name:"clock"}),Object(Fe.a)(t.date,"h:mm a"),r.a.createElement(Ge.a,{name:"marker"}),t.venue,", ",t.city),r.a.createElement(He.a,null,r.a.createElement(Ne,{attendees:t.attendees})),r.a.createElement(He.a,{clearing:!0},r.a.createElement("span",null,t.description),r.a.createElement(p.a,{as:d.a,to:"/activities/".concat(t.id),floated:"right",content:"View",color:"blue"})))},Ue=Object(m.a)((function(){var e=Object(n.useContext)(Re).activityStore.activitiesByDate;return r.a.createElement(n.Fragment,null,e.map((function(e){var t=Object(Me.a)(e,2),a=t[0],i=t[1];return r.a.createElement(n.Fragment,null,r.a.createElement(Te.a,{key:a,size:"large",color:"blue"},a),r.a.createElement(De.a.Group,{divided:!0},i.map((function(e){return console.log(e),r.a.createElement(Be,{activity:e})}))))})))})),Ve=a(503),Je=a(488),We=function(e){var t=e.inverted,a=void 0===t||t,n=e.content;return r.a.createElement(He.a,null,r.a.createElement(Ve.a,{active:!0,inverted:a},r.a.createElement(Je.a,{content:n})),r.a.createElement(h.a,{src:"/images/wireframe/short-paragraph.png"}))},Ye=Object(m.a)((function(){var e=Object(n.useContext)(Re).activityStore,t=e.loadActivities,a=e.loadingInitial;return Object(n.useEffect)((function(){t()}),[t]),a?r.a.createElement(We,{content:"Looading activities..."}):r.a.createElement(Le.a,null,r.a.createElement(Le.a.Column,{width:10},r.a.createElement(Ue,null)),r.a.createElement(Le.a.Column,{width:6},"Activity Filters"))})),Ke=a(507),Qe=a(70),Xe=a(58),Ze=a(17),$e=a(21),_e=a(492),et=a(500),tt=function(e){var t=e.error,a=e.text;return r.a.createElement(et.a,null,r.a.createElement(et.a.Header,null,t.statusText),t.data&&Object.keys(t.data.erros).length>0&&r.a.createElement(et.a.List,null,Object.values(t.data.errors).flat().map((function(e,t){return r.a.createElement(et.a.Item,{key:t},e)}))),a&&r.a.createElement(et.a.Content,{content:a}))},at=function(e){var t=e.input,a=e.width,n=e.type,i=e.placeholder,c=e.meta,o=c.touched,l=c.error;return r.a.createElement(_e.a.Field,{error:o&&!!l,type:n,width:a},r.a.createElement("input",Object.assign({},t,{placeholder:i})),o&&l&&r.a.createElement(Te.a,{basic:!0,color:"red"},l))},nt=Object($e.combineValidators)({email:Object($e.isRequired)("email"),password:Object($e.isRequired)("password")}),rt=function(){var e=Object(n.useContext)(Re).userStore.login;return r.a.createElement(Ze.b,{validate:nt,onSubmit:function(t){return e(t).catch((function(e){return Object(Qe.a)({},Xe.a,e)}))},render:function(e){var t=e.handleSubmit,a=e.submitting,n=e.submitError,i=e.invalid,c=e.pristine,o=e.dirtyFieldsSinceLastSubmit;return r.a.createElement(_e.a,{onSubmit:t,error:!0},r.a.createElement(Ke.a,{as:"h2",content:"Login to Reactivities",color:"teal",textAlign:"center"}),r.a.createElement(Ze.a,{name:"email",component:at,placeholder:"Email"}),r.a.createElement(Ze.a,{name:"password",component:at,placeholder:"Password",type:"password"}),n&&!o&&r.a.createElement(tt,{error:n,text:"Invalid emial or password"}),r.a.createElement("br",null),r.a.createElement(p.a,{loading:a,disabled:i||c||!o,color:"teal",content:"Login",fluid:!0}))}})},it=Object($e.combineValidators)({username:Object($e.isRequired)("username"),displayname:Object($e.isRequired)("displayname"),email:Object($e.isRequired)("email"),password:Object($e.isRequired)("password")}),ct=function(){var e=Object(n.useContext)(Re).userStore.register;return r.a.createElement(Ze.b,{validate:it,onSubmit:function(t){return e(t).catch((function(e){return Object(Qe.a)({},Xe.a,e)}))},render:function(e){var t=e.handleSubmit,a=e.submitting,n=e.submitError,i=e.invalid,c=e.pristine,o=e.dirtyFieldsSinceLastSubmit;return r.a.createElement(_e.a,{onSubmit:t,error:!0},r.a.createElement(Ke.a,{as:"h2",content:"Signup to Reactivities",color:"teal",textAlign:"center"}),r.a.createElement(Ze.a,{name:"username",component:at,placeholder:"Username"}),r.a.createElement(Ze.a,{name:"displayname",component:at,placeholder:"Displayname"}),r.a.createElement(Ze.a,{name:"email",component:at,placeholder:"Email"}),r.a.createElement(Ze.a,{name:"password",component:at,placeholder:"Password",type:"password"}),n&&!o&&r.a.createElement(tt,{error:n}),r.a.createElement("br",null),r.a.createElement(p.a,{loading:a,disabled:i||c||!o,color:"teal",content:"Register and Login",fluid:!0}))}})},ot=Object(m.a)((function(){var e=Object(n.useContext)(Re),t=e.userStore,a=t.isLoggedIn,i=t.user,c=e.modalStore.openModal;return r.a.createElement(He.a,{inverted:!0,textAlign:"center",vertical:!0,className:"masthead"},r.a.createElement(s.a,{text:!0},r.a.createElement(Ke.a,{as:"h1",inverted:!0},r.a.createElement(h.a,{size:"massive",src:"/assets/logo.png",alt:"logo",style:{marginBottom:12}}),"Reactivities"),r.a.createElement(Ke.a,{as:"h2",inverted:!0,content:"Welcome to Reactivities"}),a&&i?r.a.createElement(s.a,{style:{marginTop:"7em"}},r.a.createElement("h1",null,"Welcome ",i.displayName),r.a.createElement("h3",null,"Go to ",r.a.createElement(d.a,{to:"/activities"},"Activities"))):r.a.createElement(s.a,{style:{marginTop:"7em"}},r.a.createElement("h1",null,"Home Page"),r.a.createElement("h3",null,r.a.createElement(p.a,{onClick:function(){return c(r.a.createElement(rt,null))}},"Login")),r.a.createElement("h3",null,r.a.createElement(p.a,{onClick:function(){return c(r.a.createElement(ct,null))}},"Register")))))})),lt=a(123),st=a(260),ut=function e(t){Object(g.a)(this,e),this.id=void 0,this.title="",this.description="",this.category="",this.date=void 0,this.time=void 0,this.city="",this.venue="",t&&t.date&&(t.time=t.date),Object.assign(this,t)},mt=a(501),dt=function(e){var t=e.input,a=e.width,n=e.type,i=e.placeholder,c=e.meta,o=c.touched,l=c.error;return r.a.createElement(_e.a.Field,{error:o&&!!l,type:n,width:a},r.a.createElement("textarea",Object.assign({},t,{placeholder:i})),o&&l&&r.a.createElement(Te.a,{basic:!0,color:"red"},l))},bt=a(489),pt=function(e){var t=e.input,a=e.width,n=e.options,i=e.placeholder,c=e.meta,o=c.touched,l=c.error;return r.a.createElement(_e.a.Field,{error:o&&!!l,width:a},r.a.createElement(bt.a,{value:t.value,onChange:function(e,a){return t.onChange(a.value)},placeholder:i,options:n}),o&&l&&r.a.createElement(Te.a,{basic:!0,color:"red"},l))},ht=[{key:"drinks",text:"Drinks",value:"drinks"},{key:"culture",text:"Culture",value:"culture"},{key:"film",text:"Film",value:"film"},{key:"food",text:"Food",value:"food"},{key:"music",text:"Music",value:"music"},{key:"travel",text:"Travel",value:"travel"}],vt=function(e){e.input,e.date,e.time;var t=e.width,a=(e.placeholder,e.meta),n=a.touched,i=a.error;return r.a.createElement(_e.a.Field,{error:n&&!!i,width:t},n&&i&&r.a.createElement(Te.a,{basic:!0,color:"red"},i))},ft=Object($e.combineValidators)({title:Object($e.isRequired)({message:"The event title is required"}),category:Object($e.isRequired)("Category"),description:Object($e.composeValidators)(Object($e.isRequired)("Description"),Object($e.hasLengthGreaterThan)(4)({message:"Descrioption needs to be aat least 5 characters"}))(),city:Object($e.isRequired)("City"),venue:Object($e.isRequired)("Venue"),date:Object($e.isRequired)("Date"),time:Object($e.isRequired)("Time")}),gt=Object(m.a)((function(e){var t=e.match,a=e.history,i=Object(n.useContext)(Re).activityStore,c=i.createActivity,o=i.editActivity,l=i.submitting,s=i.loadActivity,u=i.clearActivity,m=Object(n.useState)(new ut),d=Object(Me.a)(m,2),b=d[0],h=d[1],v=Object(n.useState)(!1),f=Object(Me.a)(v,2),g=f[0],y=f[1];Object(n.useEffect)((function(){return y(!0),t.params.id&&s(t.params.id).then((function(e){h(new ut(e))})).finally((function(){return y(!1)})),function(){u()}}),[s,u,t.params.id]);var E=function(e){var t=e.currentTarget,a=t.name,n=t.value;h(Object(lt.a)(Object(lt.a)({},b),{},Object(Qe.a)({},a,n)))};return r.a.createElement(Le.a,null,r.a.createElement(Le.a.Column,{width:10},r.a.createElement(He.a,{clearing:!0},r.a.createElement(Ze.b,{validate:ft,loading:g,initialValues:b,onSubmit:function(e){var t=function(e,t){var a=e.getHours()+":"+e.getMinutes()+":00",n=t.getFullYear(),r=t.getMonth()+1,i=t.getDate(),c="".concat(n,"-").concat(r,"-").concat(i);return new Date(c+" "+a)}(e.date,e.time),a=(e.date,e.time,Object(st.a)(e,["date","time"]));if(a.date=t,a.id)o(a);else{var n=Object(lt.a)(Object(lt.a)({},a),{},{id:Object(mt.a)()});c(n)}},render:function(e){var t=e.handleSubmit,n=e.invalid,i=e.pristine;return r.a.createElement(_e.a,{onSubmit:t},r.a.createElement(Ze.a,{onChange:E,name:"title",placeholder:"Title",value:b.title,component:at}),r.a.createElement(Ze.a,{component:dt,row:3,name:"description",placeholder:"Description",value:b.description}),r.a.createElement(Ze.a,{component:pt,options:ht,name:"category",placeholder:"Category",value:b.category}),r.a.createElement(_e.a.Group,{widths:"equal"},r.a.createElement(Ze.a,{component:vt,name:"date",placeholder:"Date",value:b.date}),r.a.createElement(Ze.a,{component:vt,name:"date",placeholder:"Date",value:b.date})),r.a.createElement(Ze.a,{component:at,name:"city",placeholder:"City",value:b.city}),r.a.createElement(Ze.a,{component:at,name:"venue",placeholder:"Venue",value:b.venue}),r.a.createElement(p.a,{disabled:g||n||i,loading:l,floated:"right",positive:!0,type:"submit",content:"Submit"}),r.a.createElement(p.a,{disabled:g,onClick:b.id?function(){return a.push("/activities/".concat(b.id))}:function(){return a.push("/activities")},floated:"right",positive:!0,type:"submit",content:"Cancel"}))}}))))})),yt=a(495),Et=a(499),jt=Object(m.a)((function(){var e=Object(n.useContext)(Re).activityStore,t=e.createHubConnection,a=e.stopConnection,i=e.addComment,c=e.selectedActivity;return Object(n.useEffect)((function(){return t(c.id),function(){a()}}),[t,a,c]),r.a.createElement(n.Fragment,null,r.a.createElement(He.a,{textAlign:"center",attached:"top",inverted:!0,color:"teal",style:{border:"none"}},r.a.createElement(Ke.a,null,"Chat about this event")),r.a.createElement(He.a,{attached:!0},r.a.createElement(yt.a.Group,null,c&&c.comments&&c.comments.map((function(e){return r.a.createElement(yt.a,{key:e.id},r.a.createElement(yt.a.Avatar,{src:e.image||"/assets/user.png"}),r.a.createElement(yt.a.Content,null,r.a.createElement(yt.a.Author,{as:d.a,to:"/profile/".concat(e.username)},e.displayName),r.a.createElement(yt.a.Metadata,null,r.a.createElement("div",null,Object(Et.a)(e.createdAt,new Date))),r.a.createElement(yt.a.Text,null,e.body),r.a.createElement(yt.a.Actions,null,r.a.createElement(yt.a.Action,null,"Reply"))))})),r.a.createElement(Ze.b,{onSubmit:i,render:function(e){var t=e.handleSubmit,a=e.submitting,n=e.form;return r.a.createElement(_e.a,{onSubmit:function(){return t().then((function(){return n.reset()}))}},r.a.createElement(Ze.a,{name:"body",component:dt,rows:2,placeholder:"Add comment"}),r.a.createElement(p.a,{content:"Add Reply",labelPosition:"left",icon:"edit",primary:!0,loading:a}))}}))))})),Ot={filter:"brightness(30%)"},wt={position:"absolute",bottom:"5%",left:"5%",width:"100%",height:"auto",color:"white"},At=Object(m.a)((function(e){var t=e.activity,a=Object(n.useContext)(Re),i=a.userStore.user,c=a.activityStore,o=c.cancelAttendance,l=c.attendActivity,s=c.loading;return r.a.createElement(He.a.Group,null,r.a.createElement(He.a,{basic:!0,attached:"top",style:{padding:"0"}},r.a.createElement(h.a,{src:"/assets/placeholder.png",fluid:!0,style:Ot}),r.a.createElement(He.a,{basic:!0,style:wt},r.a.createElement(De.a.Group,null,r.a.createElement(De.a,null,r.a.createElement(De.a.Content,null,r.a.createElement(Ke.a,{size:"huge",content:t.title,style:{color:"white"}}),r.a.createElement("p",null,Object(Fe.a)(t.date,"eeee do MMMM")),r.a.createElement("p",null,"Hosted by ",r.a.createElement("strong",null,null===i||void 0===i?void 0:i.displayName))))))),r.a.createElement(He.a,{clearing:!0,attached:"bottom"},t.isHosting?r.a.createElement(p.a,{as:d.a,to:"/manage/".concat(t.id),color:"orange",floated:"right"},"Manage Event"):t.isGoing?r.a.createElement(p.a,{loading:s,onClick:o},"Cancel attendance"):r.a.createElement(p.a,{loading:s,onClick:l,color:"teal"},"Join Activity")))})),St=function(e){var t=e.activity;return r.a.createElement(He.a.Group,null,r.a.createElement(He.a,{attached:"top"},r.a.createElement(Le.a,null,r.a.createElement(Le.a.Column,{width:1},r.a.createElement(Ge.a,{size:"large",color:"teal",name:"info"})),r.a.createElement(Le.a.Column,{width:15},r.a.createElement("p",null,t.description)))),r.a.createElement(He.a,{attached:!0},r.a.createElement(Le.a,{verticalAlign:"middle"},r.a.createElement(Le.a.Column,{width:1},r.a.createElement(Ge.a,{name:"calendar",size:"large",color:"teal"})),r.a.createElement(Le.a.Column,{width:15},r.a.createElement("span",null,Object(Fe.a)(t.date,"eeee do MMMM")," at ",Object(Fe.a)(t.date,"h:mm a"))))),r.a.createElement(He.a,{attached:!0},r.a.createElement(Le.a,{verticalAlign:"middle"},r.a.createElement(Le.a.Column,{width:1},r.a.createElement(Ge.a,{name:"marker",size:"large",color:"teal"})),r.a.createElement(Le.a.Column,{width:11},r.a.createElement("span",null,t.venue,", ",t.city)))))},kt=Object(m.a)((function(e){var t=e.attendees;return r.a.createElement(n.Fragment,null,r.a.createElement(He.a,{textAlign:"center",style:{border:"none"},attached:"top",secondary:!0,inverted:!0,color:"teal"},t.length," People Going"),r.a.createElement(He.a,{attached:!0},r.a.createElement(qe.a,{relaxed:!0,divided:!0},t.map((function(e){return r.a.createElement(De.a,{key:e.displayName,style:{position:"relative"}},e.isHost&&r.a.createElement(Te.a,{style:{position:"absolute"},color:"orange",ribbon:"right"},"Host"),r.a.createElement(h.a,{size:"tiny",src:e.image||"/assets/user.png"}),r.a.createElement(De.a.Content,{verticalAlign:"middle"},r.a.createElement(De.a.Header,{as:"h3"},r.a.createElement(d.a,{to:"/profile/".concat(e.username)},e.displayName)),r.a.createElement(De.a.Extra,{style:{color:"orange"}},"Following")))})))))})),Ct=Object(m.a)((function(e){var t=e.match,a=e.history,i=Object(n.useContext)(Re).activityStore,c=i.selectedActivity,o=i.loadActivity,l=i.loadingInitial;return Object(n.useEffect)((function(){o(t.params.id)}),[o,t.params.id,a]),l||!c?r.a.createElement(We,{content:"Loading activit..."}):c?r.a.createElement(Le.a,null,r.a.createElement(Le.a.Column,{width:10},r.a.createElement(At,{activity:c,history:a}),r.a.createElement(St,{activity:c}),r.a.createElement(jt,null)),r.a.createElement(Le.a.Column,{width:6},r.a.createElement(kt,{attendees:c.attendees}))):r.a.createElement("h2",null,"Not found")})),xt=function(){return r.a.createElement(He.a,{placeholder:!0},r.a.createElement(Ke.a,{icon:!0},r.a.createElement(Ge.a,{name:"search"}),"Oops - We've looked everywhere but couldn't find this."),r.a.createElement(He.a.Inline,null,r.a.createElement(p.a,{as:d.a,to:"/activities",primary:!0},"Return to Activities page")))},zt=a(498),Rt=Object(m.a)((function(){var e=Object(n.useContext)(Re).modalStore,t=e.modal,a=t.open,i=t.body,c=e.closeModal;return r.a.createElement(zt.a,{open:a,onClose:c,size:"mini"},r.a.createElement(zt.a.Content,null," ",i," "))})),It=Object(o.f)(Object(m.a)((function(e){var t=e.location,a=Object(n.useContext)(Re),i=a.commonStore,c=i.setAppLoaded,l=i.token,m=i.appLoaded,d=a.userStore.getUser;return Object(n.useEffect)((function(){l?d().finally((function(){return c()})):c()}),[d,c,l]),m?r.a.createElement(n.Fragment,null,r.a.createElement(Rt,null),r.a.createElement(u.a,{position:"bottom-right"}),r.a.createElement(o.a,{exact:!0,path:"/",component:ot}),r.a.createElement(o.a,{path:"/(.+)",render:function(){return r.a.createElement(n.Fragment,null,r.a.createElement(Ie,null),r.a.createElement(s.a,{style:{marginTop:"7em"}},r.a.createElement(o.c,null,r.a.createElement(o.a,{exact:!0,path:"/activities",component:Ye}),r.a.createElement(o.a,{path:"/activities/:id",component:Ct}),r.a.createElement(o.a,{key:t.key,path:["/createActivity/","/manage/:id"],component:gt}),r.a.createElement(o.a,{path:"/login",component:rt}),r.a.createElement(o.a,{component:xt}))))}})):r.a.createElement(We,{content:"Loading app...."})}))),Lt=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,509)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),i(e),c(e)}))},Mt=Object(o.f)((function(e){var t=e.children,a=e.location.pathname;return Object(n.useEffect)((function(){window.scrollTo(0,0)}),[a]),t})),Tt=a(258);new(a.n(Tt).a);var Dt=Object(l.a)();c.a.render(r.a.createElement(o.b,{history:Dt},r.a.createElement(Mt,null,r.a.createElement(r.a.StrictMode,null,r.a.createElement(It,null)))),document.getElementById("root")),Lt()}},[[469,1,2]]]);
//# sourceMappingURL=main.59abc0db.chunk.js.map