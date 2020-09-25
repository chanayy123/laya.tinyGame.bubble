!function(){"use strict";function __awaiter(t,e,i,a){return new(i||(i=Promise))(function(s,h){function fulfilled(t){try{step(a.next(t))}catch(t){h(t)}}function rejected(t){try{step(a.throw(t))}catch(t){h(t)}}function step(t){t.done?s(t.value):new i(function(e){e(t.value)}).then(fulfilled,rejected)}step((a=a.apply(t,e||[])).next())})}class t{constructor(){this.preLoad()}static get Instance(){return null==this._instance&&(this._instance=new t),this._instance}preLoad(){Laya.Scene.load(t.DefaultLoadScene,Laya.Handler.create(this,t=>{this._loadingScene=t}))}open(t,e=null,i=!1,a=!0,s=null,h=null){return __awaiter(this,void 0,void 0,function*(){try{if(i&&!this._loadingScene)return void Laya.timer.once(100,this,this.open,[t,a,i,e,s,h]);i&&(Laya.Scene.setLoadingPage(this._loadingScene),Laya.Scene.showLoadingPage(null,0),s=s||Laya.Handler.create(this,this._doProgress,null,!1)),e=e||this._getDefaultPromise();let n=this._doLoadScene(t,s),r=yield Promise.all([n,e]),l=r[0],o=r[1];h&&h.runWith(l),s&&s.recover(),l.open(!0,o),i&&(Laya.Scene.setLoadingPage(this._loadingScene),Laya.Scene.hideLoadingPage(0))}catch(e){console.warn(`加载${t}出现异常:${e}`)}})}_doProgress(t){this._loadingScene.event(Laya.Event.PROGRESS,t)}_doLoadScene(t,e){return new Promise((i,a)=>{Laya.Scene.load(t,Laya.Handler.create(this,t=>{Laya.Scene.setLoadingPage(null),i(t)}),e)})}_getDefaultPromise(){return Promise.resolve()}}t.MinLoadTime=500,t.DefaultLoadScene="bubble/LoadingScene.scene";class e{static getMusicPath(t){return`sound/music_${t}.mp3`}static getAudioPath(t){return`sound/audio_${t}.mp3`}static getObstacleRes(t){return`gameSkin/bubble_${t}.png`}static getEmotionRes(t){return`chat/anim/emoji_${t}.ani`}}e.RES_ATLAS_EMOTION="res/atlas/chat/emoji.atlas",e.RES_SOUND_CLICK="click",e.RES_SOUND_BG="bg",e.RES_SOUND_EAT="eat",e.RES_SOUND_WIN="win",e.RES_SOUND_FAIL="fail",e.RES_SOUND_RETURN="return",e.RES_SCENE_LAUNCH="bubble/LaunchScene.scene",e.RES_SCENE_SELECT="bubble/SelectScene.scene",e.RES_SCENE_Main="bubble/MainScene.scene";class i{static playMusic(t,i=!1){let a=e.getMusicPath(t);i?this._useGesture||(Laya.SoundManager.playMusic(a,0),this._useGesture=!0):Laya.SoundManager.playMusic(a,0)}static playAudio(t){let i=e.getAudioPath(t);Laya.SoundManager.playSound(i,1)}}i._useGesture=!1;class a extends Laya.Script{constructor(){super(),this.scaleRatio=1.1,this.tweenTime=200}onAwake(){this._btnOwner=this.owner,this._btnOwner.anchorX=this._btnOwner.anchorY=.5}onMouseDown(){Laya.Tween.clearAll(this._btnOwner),Laya.Tween.to(this._btnOwner,{scaleX:this.scaleRatio,scaleY:this.scaleRatio},this.tweenTime)}onMouseUp(){Laya.Tween.clearAll(this._btnOwner),Laya.Tween.to(this._btnOwner,{scaleX:1,scaleY:1},this.tweenTime)}onMouseOut(){Laya.Tween.clearAll(this._btnOwner),Laya.Tween.to(this._btnOwner,{scaleX:1,scaleY:1},this.tweenTime)}onClick(){this.clickHandler&&this.clickHandler.run(),i.playAudio(e.RES_SOUND_CLICK)}}class s{static MakeRegularBubble(t,e,i,a=512){var s,h,n=a,r=2*Math.PI,l=[],o=2*-Math.PI/3;s=t+i*Math.cos(o),h=e+i*Math.sin(o);for(var b=0;b<n;b++){o+=r/n;let a=t+i*Math.cos(o)-s,b=e+i*Math.sin(o)-h;l.push(a),l.push(b)}return[s,h,l]}static MakeBezierBubble(t,e,i,a=0,s=0,h=512){var n,r,l=h,o=2*Math.PI,b=[],u=2*-Math.PI/3;n=t+i*Math.cos(u),r=e+i*Math.sin(u);let c=Math.floor(2*l/3);for(var p=0;p<c;p++){u+=o/l;let a=0,s=t+(i+a)*Math.cos(u)-n,h=e+(i+a)*Math.sin(u)-r;b.push(s),b.push(h)}let d=b[b.length-2]+n,_=b[b.length-1]+r,g=n,S=r,m=d-2*i+a,y=(_+S)/2+s,L=l-c;for(let t=0;t<L;++t){let e=t/L,i=this.getBezieratX(d,m,g,e)-n,a=this.getBezieratY(_,y,S,e)-r;b.push(i),b.push(a)}return[n,r,b]}static MakeRRBubble(t,e,i,a,s=512){var h,n,r,l,o=s,b=2*Math.PI;n=2*-Math.PI/3;var u=[];r=t+(h=i+Math.random()*(a-i))*Math.cos(n),l=e+h*Math.sin(n);for(var c=0;c<o;c++){n+=b/o;let s=t+(h=i+Math.random()*(a-i))*Math.cos(n)-r,c=e+h*Math.sin(n)-l;u.push(s),u.push(c)}return[r,l,u]}static MakeIrregularBubble(t,e,i,a,s){var h,n,r,l,o,b=2*Math.PI,u=[];for(r=s,l=t+(n=i+(h=this.setLinePoints(9).first).y*(a-i))*Math.cos(r),o=e+n*Math.sin(r);null!=h.next;){r=b*(h=h.next).x+s;let c=t+(n=i+h.y*(a-i))*Math.cos(r)-l,p=e+n*Math.sin(r)-o;u.push(c),u.push(p)}return[l,o,u]}static setLinePoints(t){var e,i,a,s,h,n={first:{x:0,y:1}},r=1,l=1;n.first.next={x:1,y:1};for(var o=0;o<t;o++)for(e=n.first;null!=e.next;){a=(i=e.next).x-e.x,s=.5*(e.x+i.x),h=.5*(e.y+i.y);var b={x:s,y:h+=a*(2*Math.random()-1)};h<r?r=h:h>l&&(l=h),b.next=i,e.next=b,e=i}var u=1/(l-r);for(e=n.first;null!=e;)e.y=u*(e.y-r),e=e.next;return n}static wait(t){return new Promise(e=>{Laya.timer.once(t,this,()=>{e()})})}static getBezieratX(t,e,i,a){let s;return a=Math.min(a,1),s=Math.pow(1-a,2)*t+2*a*(1-a)*e+Math.pow(a,2)*i}static getBezieratY(t,e,i,a){let s;return a=Math.min(a,1),s=Math.pow(1-a,2)*t+2*a*(1-a)*e+Math.pow(a,2)*i}static gradientColors(t,e,i,a){var s,h,n,r,l=[],o=[];a=a||1;var b=function(t){return Math.pow(t/255,a)};for(t=this.parseColor(t).map(b),e=this.parseColor(e).map(b),s=0;s<i;s++){for(r=1-(n=s/(i-1)),h=0;h<3;h++)o[h]=this.pad(Math.round(255*Math.pow(t[h]*r+e[h]*n,1/a)).toString(16));l.push("#"+o.join(""))}return l}static parseColor(t){return 4===t.length?t.substr(1).split("").map(function(t){return 17*parseInt(t,16)}):[t.substr(1,2),t.substr(3,2),t.substr(5,2)].map(function(t){return parseInt(t,16)})}static pad(t){return 1===t.length?"0"+t:t}static powerDistance(t,e,i,a){return Math.pow(i-t,2)+Math.pow(a-e,2)}static clamp(t,e,i){return t<e?e:t>i?i:t}static randomRange(t,e){return t+Math.random()*(e-t)}static hasProbability(t){return 100*Math.random()<t}static unTarget(t,e,i=30){let a=Math.atan2(t.y-e.y,t.x-e.x);return i=Math.random()>=.5?-i*Math.random():i*Math.random(),Laya.Utils.toAngle(a)+i}static fmtTime(t){let e=Math.floor(t/60),i=t%60;return`${e<10?`0${e}`:e}:${i<10?`0${i}`:i}`}}class h extends Laya.Script{constructor(){super()}onAwake(){this.owner.autoDestroyAtClosed=!0,this._progress=this.owner.getChildByName("progress")}onEnable(){this._progress.value=0,t.Instance.open(e.RES_SCENE_SELECT,s.wait(h.MinLoadTime),!1,!0,Laya.Handler.create(this,this.onProgress,null,!1))}onProgress(t){this._progress.value=t}onClick(t){i.playMusic(e.RES_SOUND_BG,!0)}onDisable(){}}h.MinLoadTime=1e3;class n extends Laya.Script{constructor(){super()}onEnable(){Laya.stage.on(Laya.Event.RESIZE,this,this.onResize),this.onResize()}onDisable(){Laya.stage.off(Laya.Event.RESIZE,this,this.onResize)}onResize(){this.owner.size(Laya.stage.width,Laya.stage.height)}}class r extends Laya.Script{constructor(){super()}onAwake(){this._progress=this.owner.getChildByName("progress")}onEnable(){this._progress.value=0,this.owner.on(Laya.Event.PROGRESS,this,this.onProgress)}onProgress(t){let e=(new Date).getTime();console.log(e+" 加载进度:"+t),this._progress.value=t}onDisable(){this.owner.off(Laya.Event.PROGRESS,this,this.onProgress)}}var l,o,b,u,c=Laya.ClassUtils.regClass;!function(t){!function(t){class e extends Laya.View{constructor(){super()}createChildren(){super.createChildren(),this.createView(e.uiView)}}e.uiView={type:"View",props:{width:720,height:67},compId:2,child:[{type:"Image",props:{skin:"gameSkin/img_bg1.png",centerY:0,centerX:-194,sizeGrid:"20,25,20,25"},compId:3,child:[{type:"Label",props:{var:"labelTotalScore",text:"得分:0",fontSize:26,color:"#ffffff",centerY:0,centerX:0},compId:5}]},{type:"Image",props:{skin:"gameSkin/img_bg1.png",centerY:0,centerX:35,sizeGrid:"20,25,20,25"},compId:4,child:[{type:"Label",props:{y:10,x:-125,var:"labelTime",text:"02:59",fontSize:26,color:"#ffffff",centerY:0,centerX:0},compId:6}]},{type:"Box",props:{y:80,width:196,right:10,height:280},compId:15,child:[{type:"Image",props:{var:"img_bgRankList",skin:"gameSkin/img_bg2.png",right:0,left:0,height:280,sizeGrid:"10,10,10,10"},compId:7},{type:"List",props:{y:10,var:"rankList",spaceY:5,right:0,repeatY:1,repeatX:1,left:0},compId:8}]},{type:"Image",props:{var:"imgKill",top:20,skin:"gameSkin/img_bgKill.png",centerX:0},compId:16,child:[{type:"Label",props:{y:109,x:217,width:103,var:"labelSrc",text:"XXX",height:28,fontSize:28,color:"#ffffff"},compId:17},{type:"Label",props:{y:167,x:287,width:163,var:"labelDst",text:"XXX",height:28,fontSize:28,color:"#ffffff",align:"right"},compId:18},{type:"Image",props:{y:111,x:273.013671875,skin:"gameSkin/img_txtEat.png"},compId:19}]}],loadList:["gameSkin/img_bg1.png","gameSkin/img_bg2.png","gameSkin/img_bgKill.png","gameSkin/img_txtEat.png"],loadList3D:[]},t.GameRenderUI=e,c("ui.bubble.GameRenderUI",e);class i extends Laya.View{constructor(){super()}createChildren(){super.createChildren(),this.createView(i.uiView)}}i.uiView={type:"View",props:{width:720,mouseEnabled:!0,height:1280},compId:2,child:[{type:"Image",props:{top:0,skin:"gameSkin/img_blank.png",right:0,left:0,bottom:0,sizeGrid:"4,4,4,4"},compId:16},{type:"Box",props:{width:500,height:450,centerY:-320,centerX:0},compId:31,child:[{type:"Image",props:{y:213.5,x:251,var:"img_star",skin:"gameSkin/img_star.png",rotation:0,centerX:0,anchorY:.5,anchorX:.5},compId:17},{type:"Image",props:{y:160.5,x:-109,skin:"gameSkin/img_bgTitle.png",centerX:0},compId:18},{type:"Label",props:{y:180.5,x:-109,var:"labelRank",text:"排名",fontSize:45,color:"#ffffff",centerX:0},compId:28}]},{type:"Box",props:{width:600,var:"boxHtmlTxt",height:100,centerY:-122,centerX:0},compId:20,child:[{type:"HTMLDivElement",props:{x:0,width:218,var:"htmlTxt",text:"被XXX吃掉了",height:60,fontSize:32,centerY:-159,runtime:"laya.html.dom.HTMLDivElement"},compId:19}]},{type:"Label",props:{var:"labelScore",text:"积分: 123",fontSize:45,color:"#ffffff",centerY:24,centerX:0},compId:21},{type:"Image",props:{skin:"gameSkin/img_energy.png",centerY:200,centerX:-154},compId:23,child:[{type:"Label",props:{y:-5,x:33,var:"labelEnergy",text:"123",fontSize:45,color:"#ffffff"},compId:22}]},{type:"Image",props:{x:455,var:"btnGet",skin:"gameSkin/img_btnGet.png",centerY:200,anchorY:.5,anchorX:.5},compId:24,child:[{type:"Script",props:{runtime:"common/ScaleButton.ts"},compId:30}]}],loadList:["gameSkin/img_blank.png","gameSkin/img_star.png","gameSkin/img_bgTitle.png","gameSkin/img_energy.png","gameSkin/img_btnGet.png"],loadList3D:[]},t.GameResultRenderUI=i,c("ui.bubble.GameResultRenderUI",i);class a extends Laya.View{constructor(){super()}createChildren(){super.createChildren(),this.createView(a.uiView)}}a.uiView={type:"View",props:{x:0,width:180,height:20},compId:2,child:[{type:"Label",props:{y:0,width:90,var:"labelName",text:"玩家姓名",height:20,fontSize:20,color:"#ffffff",centerX:0,align:"center"},compId:3},{type:"Label",props:{y:0,x:0,width:49,var:"labelScore",text:"10",right:0,height:20,fontSize:20,color:"#ffffff",align:"center"},compId:4},{type:"Sprite",props:{y:0,x:10,width:20,var:"icon",height:20},compId:9}],loadList:[],loadList3D:[]},t.RankItemRenderUI=a,c("ui.bubble.RankItemRenderUI",a)}(t.bubble||(t.bubble={}))}(l||(l={}));class p extends l.bubble.GameRenderUI{constructor(){super(),this.initUI()}initUI(){this.img_bgRankList.alpha=.5,this.img_bgRankList.visible=!1,this.rankList.itemRender=l.bubble.RankItemRenderUI,this.rankList.renderHandler=new Laya.Handler(this,this.onItemRender),this.rankList.array=[],this.imgKill.visible=!1}onItemRender(t,e){let i=t.dataSource;t.icon.graphics.clear(),t.icon.graphics.drawCircle(t.icon.width/2,t.icon.height/2,t.icon.width/2,i.color),t.icon.graphics.fillText(`${e+1}`,t.icon.width/2,3,"14px Arial","#000000","center"),t.labelName.text=i.name,t.labelScore.text=i.eatBeans.toString()}updateRankList(...t){this.rankList.array=t,this.rankList.repeatY=t.length,this.img_bgRankList.visible=t.length>0,this.img_bgRankList.height=this.rankList.height+15}showTotalScore(t){this.labelTotalScore.text=`得分:${t}`}showLeftTime(t){this.labelTime.text=s.fmtTime(t)}showKillTip(t,e,i=2e3){this.imgKill.visible=!0,this.labelSrc.text=t,this.labelDst.text=e,Laya.timer.clearAll(this),Laya.timer.once(i,this,this.hideKillTip)}hideKillTip(){this.imgKill.visible=!1,this.imgKill.activeInHierarchy}}class d extends l.bubble.GameResultRenderUI{constructor(){super()}initUI(){this.htmlTxt.style.fontSize=45,this.htmlTxt.style.wordWrap=!0,this.htmlTxt.style.align=Laya.HTMLStyle.ALIGN_CENTER,this.htmlTxt.style.width=this.boxHtmlTxt.width,this.htmlTxt.style.height=this.boxHtmlTxt.height,this.on(Laya.Event.CLICK,this,this.onBtnClick),this.mouseEnabled=!0}onAwake(){this.initUI()}onBtnClick(a){a.target==this.btnGet&&(t.Instance.open(e.RES_SCENE_SELECT),i.playAudio(e.RES_SOUND_RETURN))}show(t,e,i,a){this.visible=!0,this.labelRank.text=`第${t}名`,this.labelScore.text=`积分: ${e}`,this.htmlTxt.innerHTML=a?`<span color='#ffffff'>被</span><span color='#e0c4c4'>${a}</span><span color='#ffffff'>吃掉了</span>`:"",this.labelEnergy.text=`${i}`,this.startAutoRotate()}startAutoRotate(){return __awaiter(this,void 0,void 0,function*(){for(;yield s.wait(100),this.activeInHierarchy;)this.img_star.rotation+=2})}hide(){this.visible=!1}}class _{constructor(){let t=Laya.LocalStorage.getItem(_.KEY_ENERGY)||"0";this.energy=parseInt(t);let e=Laya.LocalStorage.getItem(_.KEY_FIRSTPLAY)||"0";this._isFirstPlay=1==parseInt(e),Laya.LocalStorage.setItem(_.KEY_FIRSTPLAY,"1")}static get Instance(){return null==this._instance&&(this._instance=new _),this._instance}set energy(t){this._energy=t,Laya.LocalStorage.setItem(_.KEY_ENERGY,t.toString())}get energy(){return this._energy}get isFirstPlay(){return this._isFirstPlay}}_.KEY_ENERGY="energy",_.KEY_FIRSTPLAY="firstPlay";class g extends Laya.Sprite{constructor(){super()}init(t,e,i){this.skinIndex=t,this.obsSize=e,this._beansNum=i}get beansNum(){return this._beansNum}set skinIndex(t){let i=e.getObstacleRes(t);this.loadImage(i),this._skinIndex=t}get skinIndex(){return this._skinIndex}set obsSize(t){this._obsSize=t,this.width=this.height=t,this.pivot(t/2,t/2)}get obsSize(){return this._obsSize}}class S{static Create(t,e=0,i=1){let a=Laya.Pool.getItemByClass(this.POOL_SIGN,g);return a.init(t,e,i),a}static Recycle(t){t.removeSelf(),Laya.Pool.recover(this.POOL_SIGN,t)}}S.POOL_SIGN="POOL_OBSTACLE";class m{constructor(){}init(){this.name="",this.eatBeans=0,this.rank=0,this.color="",this.isAI=!0}}class y extends Laya.Sprite{constructor(){super(),this._moveSpeed=y.InitSpeed,this._state=o.INVALID}init(t,e,i){this._shapeSp=this._shapeSp||new Laya.Sprite,this.addChild(this._shapeSp),this._bubbleData=this._bubbleData||new m,this._bubbleData.init(),this.initStar(e),this._initBubbleSize=t,this._visionRange=Laya.stage.width,this._alarmRange=s.randomRange(y.MinAlaramRange,y.MaxAlarmRange),this.skinIndex=e,this.isAI=i,this.level=0,this.setMoveDelta(0,0),this.State=o.NORMAL}initStar(t){this._starShapeSp=this._starShapeSp||new Laya.Sprite;let e=[];e.push(0,-130),e.push(33,-33),e.push(130,-30),e.push(55,32),e.push(85,130),e.push(0,73),e.push(-85,130),e.push(-55,32),e.push(-130,-30),e.push(-33,-33),this._starShapeSp.graphics.clear(),this._starShapeSp.size(260,260),this._starShapeSp.pivot(130,140);y.SKIN_LIST.length;this._starShapeSp.graphics.drawPoly(130,130,e,y.SKIN_LIST[2])}showStar(t,e,i){this.addChild(this._starShapeSp),this._starShapeSp.pos(t,e),this._starShapeSp.scale(i/320,i/320)}updateShape(t,e){let i=t/2;if(this._killShape=this._killShape||new f(o.SPIKE,i,i,i),null==this._normalShape)this._normalShape=new f(o.NORMAL,i,i,i),[this._normalShape.startX,this._normalShape.startY,this._normalShape.ptList]=s.MakeRegularBubble(i,i,i);else if(this.State==o.NORMAL){this._normalShape.startX+=e/2,this._normalShape.startY+=e/2,this.draw(this._normalShape);let t=this._normalShape,a=new f(o.NORMAL,i,i,i);[a.startX,a.startY,a.ptList]=s.MakeRegularBubble(i,i,i),this.checkTransformShape(t,a,y.TransformTime,this.getEaseFun(this.State,this.State)),this._normalShape=a,this._moveShape.centerX=this._moveShape.centerY=this._moveShape.radius=i,[this._moveShape.startX,this._moveShape.startY,this._moveShape.ptList]=s.MakeBezierBubble(i,i,i),this._killShape.centerY=this._killShape.centerY=this._killShape.radius=i,[this._killShape.startX,this._killShape.startY,this._killShape.ptList]=s.MakeRRBubble(i,i,i,i+.2*i)}if(null==this._moveShape)this._moveShape=new f(o.MOVE,i,i,i),[this._moveShape.startX,this._moveShape.startY,this._moveShape.ptList]=s.MakeBezierBubble(i,i,i);else if(this.State==o.MOVE){this._moveShape.startX+=e/2,this._moveShape.startY+=e/2,this.draw(this._moveShape);let t=this._moveShape,a=new f(o.MOVE,i,i,i);[a.startX,a.startY,a.ptList]=s.MakeBezierBubble(i,i,i),this.checkTransformShape(t,a,y.TransformTime,this.getEaseFun(this.State,this.State)),this._moveShape=a,this._normalShape.centerX=this._normalShape.centerY=this._normalShape.radius=i,[this._normalShape.startX,this._normalShape.startY,this._normalShape.ptList]=s.MakeRegularBubble(i,i,i),this._killShape.centerY=this._killShape.centerY=this._killShape.radius=i,[this._killShape.startX,this._killShape.startY,this._killShape.ptList]=s.MakeRRBubble(i,i,i,i+.2*i)}this._tmpShape=this._tmpShape||new f(o.TMP,i,i,i)}set bubbleSize(t){if(this.bubbleSize==t)return;let e=t-this.bubbleSize;this._bubbleSize=t,this.size(t,t);let i=t/2;this.pivot(i,i),this._shapeSp.size(t,t),this._shapeSp.pivot(i,i),this._shapeSp.pos(i,i),this.updateShape(t,e)}get bubbleSize(){return this._bubbleSize}get attacker(){return this._attacker}set attacker(t){this._attacker=t}get isAI(){return this._bubbleData.isAI}set isAI(t){this._bubbleData.isAI=t}get rank(){return this._bubbleData.rank}set rank(t){this._bubbleData.rank=t}get visionRange(){return this._visionRange}get alarmRange(){return this._alarmRange}get skinIndex(){return this._skinIndex}set skinIndex(t){this._skinIndex=t,this._bubbleData.color=y.SKIN_LIST[t]}set aimTarget(t){this._aimTarget=t,t&&(this.bubbleRotation=180*Math.atan2(t.y-this.y,t.x-this.x)/Math.PI,this.State==o.NORMAL&&(this.State=o.MOVE))}set unAimTarget(t){this._aimTarget=null,this.bubbleRotation=s.unTarget(this,t),this.State==o.NORMAL&&(this.State=o.MOVE)}get aimTarget(){return this._aimTarget&&this._aimTarget.displayedInStage?this._aimTarget:null}get bubbleData(){return this._bubbleData}set bubbleName(t){this.name=t,this._bubbleData.name=t}get bubbleName(){return this._bubbleData.name}set eatBeans(t){this._bubbleData.eatBeans=t,this.level=Math.floor(t/y.AddLevelByBeans)}get eatBeans(){return this._bubbleData.eatBeans}set level(t){this._level=Math.min(t,this.maxLevel),this.bubbleSize=this._initBubbleSize+2*(y.AddSizeByLevel*this.level+this.circleNums*(y.AddSizeByCircle-y.AddSizeByLevel))}get level(){return this._level}getSizeByCircleNum(t){return this._initBubbleSize+2*(t*y.AddCircleByLevels*y.AddSizeByLevel+t*(y.AddSizeByCircle-y.AddSizeByLevel))}get circleNums(){return Math.floor(this.level/y.AddCircleByLevels)}get maxCircleNum(){return y.SKIN_LIST.length-1}get maxLevel(){return this.maxCircleNum*y.AddCircleByLevels}clearVisions(){this._visionObsList&&(this._visionObsList.length=0),this._visionBubbleList&&(this._visionBubbleList.length=0)}addVisionBubble(t){this._visionBubbleList=this._visionBubbleList||[],this._visionBubbleList.push(t)}addVisionObs(t){this._visionObsList=this._visionObsList||[],this._visionObsList.push(t)}clearAlarms(){this._alarmBubbleList&&(this._alarmBubbleList.length=0)}addAlarmBubble(t){this._alarmBubbleList=this._alarmBubbleList||[],this._alarmBubbleList.push(t)}isInVision(t){return!(!this._visionBubbleList||-1==this._visionBubbleList.indexOf(t))||!(!this._visionObsList||-1==this._visionObsList.indexOf(t))}draw(t){this._shapeSp.graphics.clear();let e=this.circleNums,i=(this._skinIndex+e)%y.SKIN_LIST.length,a=(this._skinIndex+1+e)%y.SKIN_LIST.length;if(this._shapeSp.graphics.drawPoly(t.startX,t.startY,t.ptList,y.SKIN_LIST[i],y.SKIN_LIST[a],3),e>=1)for(let t=e-1;t>=0;--t){let e=this.getSizeByCircleNum(t),i=(this._skinIndex+t)%y.SKIN_LIST.length;this._shapeSp.graphics.drawCircle(this.bubbleSize/2,this.bubbleSize/2,e/2,y.SKIN_LIST[i]),0==t&&this.showStar(this.bubbleSize/2,this.bubbleSize/2,e)}else this.showStar(this._normalShape.centerX,this._normalShape.centerY,2*this._normalShape.radius)}set State(t){if(this.State==t)return void(t==o.SPIKE&&console.log("击杀状态中:再次击杀"));let e=this._state;this._state=t,e==o.INVALID&&t==o.NORMAL?(this._curShape=this._normalShape,this.draw(this._normalShape)):this.checkTransformShape(this.getShape(e),this.getShape(t),y.TransformTime,this.getEaseFun(e,t)),this.onStateChange(e,t)}get State(){return this._state}onStateChange(t,e){e==o.DEAD&&L.Recycle(this)}getEaseFun(t,e){return t==o.NORMAL&&e==o.MOVE?Laya.Ease.backOut:t==o.MOVE&&e==o.NORMAL?Laya.Ease.backOut:Laya.Ease.bounceOut}getShape(t){return t==o.NORMAL?this._normalShape:t==o.MOVE?this._moveShape:t==o.SPIKE?this._killShape:null}get bubbleRotation(){return this._shapeSp.rotation}set bubbleRotation(t){this._shapeSp.rotation=t}checkTransformShape(t,e,i,a,s=!1){null!=t&&null!=e&&(this._isTransforming||this.transformShape(t,e,i,a,s))}transformShape(t,e,i,a,h=!1){return __awaiter(this,void 0,void 0,function*(){if(t.ptList.length!=e.ptList.length)return void console.error("两个形状顶点数量不一致!");if(this._isTransforming)return void console.warn("正在变形中,不能再次变形");this._isTransforming=!0;let h=0,n=t.ptList.length,r=t.startX,l=t.startY,o=e.startX,b=e.startY;for(;this._isTransforming&&(yield s.wait(30),this.activeInHierarchy);){let s=a(h+=30,r,o-r,i),u=a(h,l,b-l,i),c=[];for(let p=0;p<n;p+=2){let n=a(h,t.ptList[p]+r,e.ptList[p]+o-t.ptList[p]-r,i)-s,d=a(h,t.ptList[p+1]+l,e.ptList[p+1]+b-t.ptList[p+1]-l,i)-u;c.push(n),c.push(d)}if(this._tmpShape.startX=s,this._tmpShape.startY=u,this._tmpShape.ptList=c,this.draw(this._tmpShape),h>=i){this._curShape=e,this._isTransforming=!1,this.checkStateShape();break}}})}checkStateShape(){this.State==o.NORMAL?this._curShape!=this._normalShape&&this.transformShape(this._curShape,this._normalShape,y.TransformTime,this.getEaseFun(this._curShape.state,this.State)):this.State==o.MOVE?this._curShape!=this._moveShape&&this.transformShape(this._curShape,this._moveShape,y.TransformTime,this.getEaseFun(this._curShape.state,this.State)):this.State==o.SPIKE&&this._curShape!=this._killShape&&this.transformShape(this._curShape,this._killShape,y.TransformTime,this.getEaseFun(this._curShape.state,this.State))}startMove(t,e){this.State==o.NORMAL&&(this.State=o.MOVE,this.bubbleRotation=180*Math.atan2(e-this.y,t-this.x)/Math.PI)}stopMove(){this.isMoving&&(this.State=o.NORMAL)}get isMoving(){return this.State==o.MOVE}get isAlive(){return this.State!=o.DEAD}set moveSpeed(t){this._moveSpeed=t}get moveSpeed(){return this._moveSpeed}setMoveDelta(t,e){this._moveDelta=this._moveDelta||new Laya.Point,this._moveDelta.x=t,this._moveDelta.y=e}get moveDelta(){return this._moveDelta}setMoveBoundary(t,e){this._moveBoundary=this._moveBoundary||new Laya.Point,this._moveBoundary.x=t,this._moveBoundary.y=e}get moveBoundary(){return this._moveBoundary}update(){this.isAlive&&(this.isMoving?this.updateMove():this.setMoveDelta(0,0),this.autoRotateStar())}autoRotateStar(){this._starShapeSp.rotation+=.5}onEnable(){this.startAILogic()}updateMove(){this.updateTargetLook();var t=this.bubbleRotation*Math.PI/180,e=Math.cos(t)*this._moveSpeed,i=Math.sin(t)*this._moveSpeed;let a=this.x,h=this.y;this.x=s.clamp(this.x+e,this.bubbleSize/2,this.moveBoundary.x-this.bubbleSize/2),this.y=s.clamp(this.y+i,this.bubbleSize/2,this.moveBoundary.y-this.bubbleSize/2),this.setMoveDelta(this.x-a,this.y-h)}updateTargetLook(){this.aimTarget&&(this.bubbleRotation=180*Math.atan2(this.aimTarget.y-this.y,this.aimTarget.x-this.x)/Math.PI)}get isOnBoundary(){return this.x<=this.width/2||this.x>=this.moveBoundary.x-this.width/2||(this.y<=this.width/2||this.y>=this.moveBoundary.y-this.width/2)}startAILogic(){return __awaiter(this,void 0,void 0,function*(){if(this.isAI)for(;this.isAlive;){let t=0;if(this.isOnBoundary)this.bubbleRotation=Math.floor(360*Math.random()),this.State=o.MOVE,t=200;else{let e=this.hasStrongEnemy(),i=this.hasWeakEnemy(),a=!0;if(e?i?s.hasProbability(60)?(this.unAimTarget=e,t=1e3):(this.aimTarget=i,t=1500):s.hasProbability(80)?(this.unAimTarget=e,t=1e3):a=!1:i&&s.hasProbability(70)?(this.aimTarget=i,t=1500):a=!1,!a)if(this._visionObsList&&this._visionObsList.length>0){if(null==this.aimTarget){let e=Math.floor(Math.random()*this._visionObsList.length);this.aimTarget=this._visionObsList[e],t=500}}else{let e=100*Math.random();e<=50?(this.bubbleRotation=Math.floor(360*Math.random()),this.State=o.MOVE,t=1e3):e<=60?(this.State=o.NORMAL,t=200):(this.State=o.MOVE,t=1e3)}}let e=t+Math.floor(500*Math.random());if(yield s.wait(e),!this.activeInHierarchy)break}})}hasStrongEnemy(t=1){let e=this._alarmBubbleList;if(!e||0==e.length)return null;for(let i=0;i<e.length;++i)if(e[i].level-this.level>=t)return e[i];return null}hasWeakEnemy(t=1){let e=this._alarmBubbleList;if(!e||0==e.length)return null;for(let i=0;i<e.length;++i)if(e[i].level-this.level<=-t)return e[i];return null}playEatAnim(){Laya.Tween.clearAll(this._shapeSp),this._shapeSp.scale(1,1),Laya.Tween.from(this._shapeSp,{scaleX:1.3,scaleY:.7},500,Laya.Ease.bounceOut)}playKillAnim(){console.log("播放击杀动画"),this.State=o.SPIKE,Laya.timer.once(300,this,this.resumeState,[o.NORMAL])}resumeState(t){this.State=t,console.log("击杀动画播放完毕,恢复到待机状态")}eat(t){this.eatBeans+=t.beansNum,this.playEatAnim(),S.Recycle(t)}kill(t){t.attacker=this,t.State=o.DEAD,this.playKillAnim()}}y.EMOTION_IDLIST=[1,10,11,13,15,16,17,18,19,2,21,23,27,4,8,9],y.SKIN_LIST=["#ff0000","#ff7d00","#ffff00","#00ff00","0000ff","00ffff","ff00ff"],y.TransformTime=250,y.AddCircleByLevels=10,y.AddLevelByBeans=1,y.AddSizeByCircle=2,y.AddSizeByLevel=1,y.InitSize=50,y.InitSpeed=6,y.MinAlaramRange=50,y.MaxAlarmRange=100;class L{static Create(t,e,i){let a=Laya.Pool.getItemByClass(this.SIGN_BUBBLE,y);return a.init(t,e,i),a}static Recycle(t){t.removeSelf(),Laya.Pool.recover(this.SIGN_BUBBLE,t)}}L.SIGN_BUBBLE="POOL_BUBBLE";class f{constructor(t,e,i,a){this.state=t,this.centerX=e,this.centerY=i,this.radius=a}}!function(t){t[t.INVALID=0]="INVALID",t[t.TMP=1]="TMP",t[t.NORMAL=2]="NORMAL",t[t.MOVE=3]="MOVE",t[t.SPIKE=4]="SPIKE",t[t.SPIKE2=5]="SPIKE2",t[t.DEAD=6]="DEAD"}(o||(o={})),function(t){t[t.Ordinary=0]="Ordinary",t[t.Aggressive=1]="Aggressive",t[t.Defensive=2]="Defensive",t[t.Max=3]="Max"}(b||(b={}));class M extends Laya.Sprite{constructor(){super()}static get Instance(){return null==M._instance&&(M._instance=new M),this._instance}init(t,e){this.size(t,e),this._boundary=new Laya.Point,this._boundary.x=Math.ceil(this.width/M.GridSize)*M.GridSize,this._boundary.y=Math.ceil(this.height/M.GridSize)*M.GridSize,this.drawBg(),this.initPlayers(),this.initObstacles()}addHero(t){this._bubbleHero=t,t.setMoveBoundary(this._boundary.x,this._boundary.y),this.addChild(t)}update(){this.checkUpdate(),this.checkScrollMap(this._bubbleHero.moveDelta.x,this._bubbleHero.moveDelta.y),this.checkCollider(),this.checkOutOfStage(),this.checkSpawnObs(.3*M.OBS_NUM)}refreshRank(){this._rankDataList=this._rankDataList||[],this._rankDataList.length=0;for(let t=0;t<this._bubbleAIList.length;++t)this._rankDataList.push(this._bubbleAIList[t].bubbleData);this._bubbleHero&&this._rankDataList.push(this._bubbleHero.bubbleData),this._rankDataList.sort((t,e)=>e.eatBeans-t.eatBeans);for(let t=0;t<this._rankDataList.length;++t){let e=this._rankDataList[t];e.isAI?e.rank=t+1:this._bubbleHero.rank=t+1}this.updateRankHandler&&this.updateRankHandler.runWith(this._rankDataList)}checkSpawnObs(t){if(this._obstacleList.length<t){let t=20*Math.random();for(let e=0;e<t;++e){let t=M.GridSize/2+Math.floor(Math.random()*M.GridSize/2),e=Math.floor(8*Math.random()),i=t+Math.random()*(this._boundary.x-2*t),a=t+Math.random()*(this._boundary.y-2*t),s=S.Create(e,t,1);if(s.pos(i,a),this._obsLayer.addChild(s),this._obstacleList.push(s),this._obstacleList.length>=M.OBS_NUM)break}}}checkOutOfStage(){let t=this._bubbleAIList.length;for(let e=0;e<t;++e){let t=this._bubbleAIList[e];if(this.isInStage(t)){this._bubbleIconMap.get(t).removeSelf()}else{let e=this._bubbleIconMap.get(t);t.x+this.x<0?e.x=-this.x+e.width/2:t.x+this.x>Laya.stage.width?e.x=Laya.stage.width-this.x-e.width/2:e.x=t.x,t.y+this.y<0?e.y=-this.y+e.height/2:t.y+this.y>Laya.stage.height?e.y=Laya.stage.height-this.y-e.height/2:e.y=t.y,e.graphics.clear(),e.graphics.drawCircle(e.width/2,e.height/2,e.width/2,t.bubbleData.color),e.graphics.fillText(`${t.rank}`,e.width/2,3,"14px Arial","#000000","center"),this.addChild(e)}}}checkUpdate(){this._bubbleHero.update();let t=this._bubbleAIList.length;for(let e=0;e<t;++e){this._bubbleAIList[e].update()}}isOnBorder(t){return t.x<=t.width/2||t.x>=this._boundary.x-t.width/2||(t.y<=t.width/2||t.y>=this._boundary.y-t.width/2)}isInStage(t){return!(t.x+this.x<=-t.width/2||t.x+this.x>=Laya.stage.width+t.width/2)&&!(t.y+this.y<=-t.height/2||t.y+this.y>=Laya.stage.height+t.height/2)}checkScrollMap(t,e){let i=this.x+this._bubbleHero.x,a=this.y+this._bubbleHero.y;t>0&&i>Laya.stage.width/2&&Laya.stage.width+Math.abs(this.x)<this._boundary.x?this.x-=t:t<0&&i<Laya.stage.width/2&&this._bubbleHero.x>Laya.stage.width/2&&(this.x-=t),e>0&&a>Laya.stage.height/2&&Laya.stage.height+Math.abs(this.y)<this._boundary.y?this.y-=e:e<0&&a<Laya.stage.height/2&&this._bubbleHero.y>Laya.stage.height/2&&(this.y-=e)}checkCollider(){let t=this._bubbleAIList.length;for(let e=0;e<t;++e){let t=this._bubbleAIList[e];t.clearVisions(),t.clearAlarms()}this._delBubbleList.length=0;for(let e=0;e<t&&this._bubbleHero.isAlive;++e){let t=this._bubbleAIList[e];if(t.isAlive)if(s.powerDistance(this._bubbleHero.x,this._bubbleHero.y,t.x,t.y)<=Math.pow(this._bubbleHero.bubbleSize/2+t.bubbleSize/2,2)){if(this._bubbleHero.level>t.level)this.handleKill(this._bubbleHero,t),this._delBubbleList.push(t);else if(this._bubbleHero.level<t.level){this.handleKill(t,this._bubbleHero),console.log("游戏结束");break}}else s.powerDistance(this._bubbleHero.x,this._bubbleHero.y,t.x,t.y)<=Math.pow(t.bubbleSize/2+t.alarmRange+this._bubbleHero.bubbleSize/2,2)&&t.addAlarmBubble(this._bubbleHero)}for(let e=0;e<t;++e){let i=this._bubbleAIList[e];for(let a=e+1;a<t&&i.isAlive;++a){let t=this._bubbleAIList[a];t.isAlive&&(s.powerDistance(i.x,i.y,t.x,t.y)<=Math.pow(i.bubbleSize/2+t.bubbleSize/2,2)?i.level>t.level?(this.handleKill(i,t),this._delBubbleList.push(t)):i.level<t.level&&(this.handleKill(t,i),this._delBubbleList.push(i)):s.powerDistance(i.x,i.y,t.x,t.y)<=Math.pow(i.visionRange/2+t.bubbleSize/2,2)&&(i.addVisionBubble(t),t.addVisionBubble(i),s.powerDistance(i.x,i.y,t.x,t.y)<=Math.pow(i.bubbleSize/2+i.alarmRange+t.bubbleSize/2,2)?i.addAlarmBubble(t):s.powerDistance(t.x,t.y,i.x,i.y)<=Math.pow(t.bubbleSize/2+t.alarmRange+i.bubbleSize/2,2)&&t.addAlarmBubble(i)))}}this._bubbleAIList=this._delBubbleList.length>0?this._bubbleAIList.filter((t,e,i)=>-1==this._delBubbleList.indexOf(t)):this._bubbleAIList,this._delObstacleList.length=0;let e=this._obstacleList.length;t=this._bubbleAIList.length;for(let i=0;i<e;++i){let e=this._obstacleList[i];if(e.displayedInStage){this._bubbleHero.isAlive&&s.powerDistance(this._bubbleHero.x,this._bubbleHero.y,e.x,e.y)<=Math.pow(this._bubbleHero.bubbleSize/2+e.obsSize/2+5,2)&&(this.handleEatBeans(this._bubbleHero,e),this._delObstacleList.push(e));for(let i=0;i<t&&e.displayedInStage;++i){let t=this._bubbleAIList[i];s.powerDistance(t.x,t.y,e.x,e.y)<=Math.pow(t.bubbleSize/2+e.obsSize/2+5,2)?(this.handleEatBeans(t,e),this._delObstacleList.push(e)):s.powerDistance(t.x,t.y,e.x,e.y)<=Math.pow(t.visionRange/2+e.obsSize/2,2)&&t.addVisionObs(e)}}}this._obstacleList=this._delObstacleList.length>0?this._obstacleList.filter((t,e,i)=>-1==this._delObstacleList.indexOf(t)):this._obstacleList,(this._delBubbleList.length>0||this._delObstacleList.length>0)&&this.refreshRank()}handleEatBeans(t,e){t.eat(e),this.eatHandler&&this.eatHandler.runWith([t,e])}handleKill(t,e){t.kill(e),this.killHandler&&this.killHandler.runWith([t,e]),this.delBubbleIcon(e)}delBubbleIcon(t){let e=this._bubbleIconMap.get(t);e&&e.removeSelf(),this._bubbleIconMap.delete(t)}initPlayers(){this._bubbleAIList=[],this._delBubbleList=[],this._bubbleIconMap=new Map;for(let t=0;t<M.AI_NUM;++t){let e=Math.floor(Math.random()*y.SKIN_LIST.length),i=y.InitSize+Math.floor(Math.random()*(this._boundary.x-2*y.InitSize)),a=y.InitSize+Math.floor(Math.random()*(this._boundary.y-2*y.InitSize)),s=Math.floor(360*Math.random()),h=L.Create(y.InitSize,e,!0);h.bubbleName=`路人${t}号`,h.bubbleRotation=s,h.pos(i,a),h.setMoveBoundary(this._boundary.x,this._boundary.y),this._bubbleAIList.push(h),this.addChild(h);let n=new Laya.Sprite;n.size(M.IconSize,M.IconSize),n.pivot(n.width/2,n.height/2),n.graphics.drawCircle(n.width/2,n.height/2,n.width/2,y.SKIN_LIST[e]),n.graphics.fillText(`${t+1}`,n.width/2,3,"14px Arial","#000000","center"),this._bubbleIconMap.set(h,n)}}initObstacles(){this._obstacleList=[],this._delObstacleList=[],this._obsLayer=new Laya.Sprite,this._obsLayer.cacheAs="bitmap";for(let t=0;t<M.OBS_NUM;++t){let t=M.GridSize/2+Math.floor(Math.random()*M.GridSize/2),e=Math.floor(8*Math.random()),i=t+Math.random()*(this._boundary.x-2*t),a=t+Math.random()*(this._boundary.y-2*t),s=S.Create(e,t,1);this._obstacleList.push(s),s.pos(i,a),this._obsLayer.addChild(s)}this.addChild(this._obsLayer)}drawBg(){this.graphics.clear();let t=Math.ceil(this.height/M.GridSize),e=Math.ceil(this.width/M.GridSize);for(let e=0;e<=t;++e){let t=0,i=e*M.GridSize,a=this._boundary.x,s=i;this.graphics.drawLine(t,i,a,s,M.LineColor,1)}for(let t=0;t<=e;++t){let e=t*M.GridSize,i=0,a=e,s=this._boundary.y;this.graphics.drawLine(e,i,a,s,M.LineColor,1)}}onDestroy(){M._instance=null}}M.GridSize=50,M.IconSize=20,M.LineColor="#000000",M.MAP_WIDTH=2048,M.MAP_HEIGHT=2048,M.AI_NUM=9,M.OBS_NUM=100;class I extends Laya.Script{constructor(){super(),this._leftTime=0}onAwake(){this.initMap(),this.initUI(),this.initEffect(),this.owner.autoDestroyAtClosed=!0}onEnable(){Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onTouchDown),Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onTouchUp),Laya.stage.on(Laya.Event.RESIZE,this,this.onResize),this.gameState=u.START}onDisable(){Laya.stage.off(Laya.Event.MOUSE_DOWN,this,this.onTouchDown),Laya.stage.off(Laya.Event.MOUSE_UP,this,this.onTouchUp),Laya.stage.off(Laya.Event.RESIZE,this,this.onResize)}onResize(){console.log("舞台宽高: "+Laya.stage.width+" "+Laya.stage.height)}onMouseMove(){}onTouchDown(){this.gameState==u.START&&(Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onTouchMove),this._lastMousePosX=Laya.stage.mouseX,this._lastMousePosY=Laya.stage.mouseY,this._bubbleHero.startMove(this._map.mouseX,this._map.mouseY))}onTouchMove(){if(this.gameState!=u.START)return;let t=Laya.stage.mouseX,e=Laya.stage.mouseY,i=t-this._lastMousePosX,a=e-this._lastMousePosY;if(Math.pow(i,2)+Math.pow(a,2)<=Math.pow(I.TouchThreshold,2))return;let s=180*Math.atan2(a,i)/Math.PI,h=.1*Math.floor(10*s);this._bubbleHero.bubbleRotation=h,this._lastMousePosX=t,this._lastMousePosY=e}onTouchUp(){this.gameState==u.START&&(Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.onTouchMove),this._bubbleHero.stopMove())}onUpdate(){this.gameState==u.START&&this._map.update()}initMap(){this._map=M.Instance,this._map.init(M.MAP_WIDTH,M.MAP_HEIGHT),this.owner.addChildAt(this._map,0),this._bubbleHero=L.Create(y.InitSize,0,!1),this._bubbleHero.bubbleName="我",this._bubbleHero.pos(Laya.stage.width/2,Laya.stage.height/2),this._map.addHero(this._bubbleHero),this._map.eatHandler=Laya.Handler.create(this,this.onEat,null,!1),this._map.killHandler=Laya.Handler.create(this,this.onKill,null,!1),this._map.updateRankHandler=Laya.Handler.create(this,this.onRefreshRankList,null,!1)}initUI(){this._gameUI=this.owner.getChildByName("gameUI"),this._gameUI.showTotalScore(this._bubbleHero.eatBeans),this._gameUI.showLeftTime(this._leftTime),this._gameResultUI=this.owner.getChildByName("gameResultUI"),this._gameResultUI.hide()}initEffect(){this._emotionAnim=new Laya.Animation,this.owner.addChild(this._emotionAnim)}onKill(t,e){console.log(`玩家【${t.name}】击杀了玩家【${e.name}】`),e==this._bubbleHero?this.gameState=u.END:t==this._bubbleHero?(this._gameUI.showKillTip(t.name,e.name),this.playEmotionAnim()):this._gameUI.showKillTip(t.name,e.name)}onRefreshRankList(...t){this._gameUI.updateRankList(...t)}onEat(t,a){t==this._bubbleHero&&(this._gameUI.showTotalScore(this._bubbleHero.eatBeans),i.playAudio(e.RES_SOUND_EAT))}startMatch(){console.log("开始匹配玩家")}startCountDown(){return __awaiter(this,void 0,void 0,function*(){for(this.leftTime=I.TotalTime;this.leftTime>0&&this.gameState==u.START&&(yield s.wait(1e3),this.enabled);)this.leftTime-=1;this.gameState=u.END})}showGameResult(){_.Instance.energy+=10*this._bubbleHero.eatBeans;let t=this._bubbleHero.attacker?this._bubbleHero.attacker.bubbleName:null;this._gameResultUI.show(this._bubbleHero.rank,this._bubbleHero.eatBeans,10*this._bubbleHero.eatBeans,t),i.playAudio(t?e.RES_SOUND_FAIL:e.RES_SOUND_WIN)}set leftTime(t){this._leftTime=Math.max(t,0),this._gameUI.labelTime.text=s.fmtTime(this._leftTime)}get leftTime(){return this._leftTime}set gameState(t){if(this._gameState==t)return;let e=this._gameState;this._gameState=t,this.onGameStateChange(e,t)}get gameState(){return this._gameState}onGameStateChange(t,e){e==u.MATCH?this.startMatch():e==u.START?this.startCountDown():e==u.END&&this.showGameResult()}playEmotionAnim(){if(100*Math.random()>30)return;console.log("播放表情动画");let t=[1,10,11,13,15,16,17,18,19,2,21,23,27,4,8,9],i=Math.floor(Math.random()*t.length);this._emotionAnim.loadAnimation(e.getEmotionRes(t[i]),Laya.Handler.create(this,this.onLoadAnimComplete),e.RES_ATLAS_EMOTION)}onLoadAnimComplete(){let t=this._emotionAnim.getGraphicBounds();this.owner.addChild(this._emotionAnim),this._emotionAnim.pivot(t.x+t.width/2,t.y+t.height/2),this._emotionAnim.pos(Laya.stage.width/2,100),this._emotionAnim.autoPlay=!0,Laya.timer.once(1500,this,this.stopEmotionAnim)}stopEmotionAnim(){this._emotionAnim.clear(),this._emotionAnim.removeSelf()}}I.TouchThreshold=10,I.TotalTime=60,function(t){t[t.MATCH=0]="MATCH",t[t.START=1]="START",t[t.END=2]="END"}(u||(u={}));class w extends Laya.Script{constructor(){super()}onAwake(){this._ownerScene=this.owner,this._ownerScene.autoDestroyAtClosed=!0,this.drawBg()}onEnable(){this.labelEnergy.text=_.Instance.energy.toString()}onDisable(){}onClick(a){i.playMusic(e.RES_SOUND_BG,!0),a.target==this.btnStart&&t.Instance.open(e.RES_SCENE_Main)}drawBg(){this._ownerScene.graphics.clear();let t=Math.ceil(Laya.stage.height/w.GridSize),e=Math.ceil(Laya.stage.width/w.GridSize);for(let e=0;e<=t;++e){let t=0,i=e*w.GridSize,a=Laya.stage.width,s=i;this._ownerScene.graphics.drawLine(t,i,a,s,"#000000",1)}for(let t=0;t<=e;++t){let e=t*w.GridSize,i=0,a=e,s=Laya.stage.height;this._ownerScene.graphics.drawLine(e,i,a,s,"#000000",1)}}}w.GridSize=50;class v{constructor(){}static init(){var t=Laya.ClassUtils.regClass;t("common/ScaleButton.ts",a),t("control/LaunchControl.ts",h),t("common/Resize.ts",n),t("view/LoadingUI.ts",r),t("view/GameUI.ts",p),t("view/GameResultUI.ts",d),t("control/GameControl.ts",I),t("control/SelectControl.ts",w)}}v.width=720,v.height=1280,v.scaleMode="fixedwidth",v.screenMode="vertical",v.alignV="top",v.alignH="left",v.startScene="bubble/LaunchScene.scene",v.sceneRoot="",v.debug=!1,v.stat=!1,v.physicsDebug=!1,v.exportSceneToJson=!0,v.init();new class{constructor(){window.Laya3D?Laya3D.init(v.width,v.height):Laya.init(v.width,v.height,Laya.WebGL),Laya.Physics&&Laya.Physics.enable(),Laya.DebugPanel&&Laya.DebugPanel.enable(),Laya.stage.scaleMode=v.scaleMode,Laya.stage.screenMode=v.screenMode,Laya.stage.alignV=v.alignV,Laya.stage.alignH=v.alignH,Laya.stage.bgColor="#eeeeee",Laya.stage.frameRate=Laya.Stage.FRAME_SLOW,Laya.URL.exportSceneToJson=v.exportSceneToJson,(v.debug||"true"==Laya.Utils.getQueryString("debug"))&&Laya.enableDebugPanel(),v.physicsDebug&&Laya.PhysicsDebugDraw&&Laya.PhysicsDebugDraw.enable(),v.stat&&Laya.Stat.show(),Laya.alertGlobalError(!0),Laya.SoundManager.autoStopMusic=!0,Laya.ResourceVersion.enable("version.json",Laya.Handler.create(this,this.onVersionLoaded),Laya.ResourceVersion.FILENAME_VERSION)}onVersionLoaded(){Laya.AtlasInfoManager.enable("fileconfig.json",Laya.Handler.create(this,this.onConfigLoaded))}onConfigLoaded(){t.Instance.open(v.startScene)}}}();