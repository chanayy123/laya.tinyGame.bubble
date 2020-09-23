(function () {
    'use strict';

    class ScaleButton extends Laya.Script {
        constructor() {
            super();
            this.scaleRatio = 1.1;
            this.tweenTime = 200;
        }
        onAwake() {
            this._btn = this.owner;
            this._btn.anchorX = this._btn.anchorY = 0.5;
        }
        onMouseDown() {
            Laya.Tween.clearAll(this._btn);
            Laya.Tween.to(this._btn, { scaleX: this.scaleRatio, scaleY: this.scaleRatio }, this.tweenTime);
        }
        onMouseUp() {
            Laya.Tween.clearAll(this._btn);
            Laya.Tween.to(this._btn, { scaleX: 1, scaleY: 1 }, this.tweenTime);
        }
        onMouseOut() {
            Laya.Tween.clearAll(this._btn);
            Laya.Tween.to(this._btn, { scaleX: 1, scaleY: 1 }, this.tweenTime);
        }
        onClick() {
            this.clickHandler && this.clickHandler.run();
        }
    }

    class Launch extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.autoDestroyAtClosed = true;
            this.btnStart.getComponent(ScaleButton).clickHandler = Laya.Handler.create(this, this.onBtnClick);
        }
        onEnable() {
        }
        onBtnClick(e) {
            Laya.Scene.open("bubble/MainScene.scene");
        }
        onDisable() {
        }
    }

    class Resize extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
            this.onResize();
        }
        onDisable() {
            Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
        }
        onResize() {
            this.owner.size(Laya.stage.width, Laya.stage.height);
            console.log("适配最新舞台尺寸: " + Laya.stage.width + " " + Laya.stage.height);
        }
    }

    class GameUtil {
        static MakeRegularBubble(centerX, centerY, radius, vtCount = 512) {
            var points = vtCount;
            var twoPi = 2 * Math.PI;
            var ptList = [];
            var theta = -Math.PI * 2 / 3;
            var x0, y0;
            x0 = centerX + radius * Math.cos(theta);
            y0 = centerY + radius * Math.sin(theta);
            for (var i = 0; i < points; i++) {
                theta += twoPi / points;
                let x = centerX + radius * Math.cos(theta) - x0;
                let y = centerY + radius * Math.sin(theta) - y0;
                ptList.push(x);
                ptList.push(y);
            }
            return [x0, y0, ptList];
        }
        static MakeBezierBubble(centerX, centerY, radius, xOffset = 0, yOffset = 0, vtCount = 512) {
            var points = vtCount;
            var twoPi = 2 * Math.PI;
            var ptList = [];
            var theta = -Math.PI * 2 / 3;
            var x0, y0;
            x0 = centerX + radius * Math.cos(theta);
            y0 = centerY + radius * Math.sin(theta);
            let ptCount1 = Math.floor(points * 2 / 3);
            for (var i = 0; i < ptCount1; i++) {
                theta += twoPi / points;
                let offset = 0;
                let x = centerX + (radius + offset) * Math.cos(theta) - x0;
                let y = centerY + (radius + offset) * Math.sin(theta) - y0;
                ptList.push(x);
                ptList.push(y);
            }
            let x1 = ptList[ptList.length - 2] + x0;
            let y1 = ptList[ptList.length - 1] + y0;
            let x3 = x0;
            let y3 = y0;
            let x2 = x1 - 2 * radius + xOffset;
            let y2 = (y1 + y3) / 2 + yOffset;
            let ptCount2 = points - ptCount1;
            for (let i = 0; i < ptCount2; ++i) {
                let percent = i / (ptCount2);
                let x = this.getBezieratX(x1, x2, x3, percent) - x0;
                let y = this.getBezieratY(y1, y2, y3, percent) - y0;
                ptList.push(x);
                ptList.push(y);
            }
            return [x0, y0, ptList];
        }
        static MakeRRBubble(centerX, centerY, minRad, maxRad, vtCount = 512) {
            var points = vtCount;
            var rad, theta;
            var twoPi = 2 * Math.PI;
            var x0, y0;
            theta = -Math.PI * 2 / 3;
            rad = minRad + Math.random() * (maxRad - minRad);
            var ptList = [];
            x0 = centerX + rad * Math.cos(theta);
            y0 = centerY + rad * Math.sin(theta);
            for (var i = 0; i < points; i++) {
                theta += twoPi / points;
                rad = minRad + Math.random() * (maxRad - minRad);
                let x = centerX + rad * Math.cos(theta) - x0;
                let y = centerY + rad * Math.sin(theta) - y0;
                ptList.push(x);
                ptList.push(y);
            }
            return [x0, y0, ptList];
        }
        static MakeIrregularBubble(centerX, centerY, minRad, maxRad, phase) {
            var point;
            var rad, theta;
            var twoPi = 2 * Math.PI;
            var x0, y0;
            var ptList = [];
            var pointList = this.setLinePoints(9);
            point = pointList.first;
            theta = phase;
            rad = minRad + point.y * (maxRad - minRad);
            x0 = centerX + rad * Math.cos(theta);
            y0 = centerY + rad * Math.sin(theta);
            while (point.next != null) {
                point = point.next;
                theta = twoPi * point.x + phase;
                rad = minRad + point.y * (maxRad - minRad);
                let x = centerX + rad * Math.cos(theta) - x0;
                let y = centerY + rad * Math.sin(theta) - y0;
                ptList.push(x);
                ptList.push(y);
            }
            return [x0, y0, ptList];
        }
        static setLinePoints(iterations) {
            var pointList = {};
            pointList.first = {
                x: 0,
                y: 1
            };
            var lastPoint = {
                x: 1,
                y: 1
            };
            var minY = 1;
            var maxY = 1;
            var point;
            var nextPoint;
            var dx, newX, newY;
            pointList.first.next = lastPoint;
            for (var i = 0; i < iterations; i++) {
                point = pointList.first;
                while (point.next != null) {
                    nextPoint = point.next;
                    dx = nextPoint.x - point.x;
                    newX = 0.5 * (point.x + nextPoint.x);
                    newY = 0.5 * (point.y + nextPoint.y);
                    newY += dx * (Math.random() * 2 - 1);
                    var newPoint = {
                        x: newX,
                        y: newY
                    };
                    if (newY < minY) {
                        minY = newY;
                    }
                    else if (newY > maxY) {
                        maxY = newY;
                    }
                    newPoint.next = nextPoint;
                    point.next = newPoint;
                    point = nextPoint;
                }
            }
            var normalizeRate = 1 / (maxY - minY);
            point = pointList.first;
            while (point != null) {
                point.y = normalizeRate * (point.y - minY);
                point = point.next;
            }
            return pointList;
        }
        static wait(time) {
            return new Promise((resolve) => {
                Laya.timer.once(time, this, () => {
                    resolve();
                });
            });
        }
        static getBezieratX(x0, x1, x2, t) {
            t = Math.min(t, 1);
            let target;
            target = Math.pow(1 - t, 2) * x0 + 2 * t * (1 - t) * x1 + Math.pow(t, 2) * x2;
            return target;
        }
        static getBezieratY(y0, y1, y2, t) {
            t = Math.min(t, 1);
            let target;
            target = Math.pow(1 - t, 2) * y0 + 2 * t * (1 - t) * y1 + Math.pow(t, 2) * y2;
            return target;
        }
        static gradientColors(start, end, steps, gamma) {
            var i, j, ms, me, output = [], so = [];
            gamma = gamma || 1;
            var normalize = function (channel) {
                return Math.pow(channel / 255, gamma);
            };
            start = this.parseColor(start).map(normalize);
            end = this.parseColor(end).map(normalize);
            for (i = 0; i < steps; i++) {
                ms = i / (steps - 1);
                me = 1 - ms;
                for (j = 0; j < 3; j++) {
                    so[j] = this.pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
                }
                output.push('#' + so.join(''));
            }
            return output;
        }
        static parseColor(hexStr) {
            return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) { return 0x11 * parseInt(s, 16); }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) { return parseInt(s, 16); });
        }
        ;
        static pad(s) {
            return (s.length === 1) ? '0' + s : s;
        }
        static powerDistance(x1, y1, x2, y2) {
            return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
        }
        static clamp(value, min, max) {
            return value < min ? min : value > max ? max : value;
        }
        static fmtTime(seconds) {
            let min = Math.floor(seconds / 60);
            let sec = seconds % 60;
            let minStr = min < 10 ? `0${min}` : min;
            let secStr = sec < 10 ? `0${sec}` : sec;
            return `${minStr}:${secStr}`;
        }
    }

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var bubble;
        (function (bubble) {
            class GameRenderUI extends Laya.View {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren();
                    this.createView(GameRenderUI.uiView);
                }
            }
            GameRenderUI.uiView = { "type": "View", "props": { "width": 720, "height": 67 }, "compId": 2, "child": [{ "type": "Image", "props": { "skin": "game/img_bg1.png", "centerY": 0, "centerX": -194, "sizeGrid": "20,25,20,25" }, "compId": 3, "child": [{ "type": "Label", "props": { "var": "labelTotalScore", "text": "得分:0", "fontSize": 26, "color": "#ffffff", "centerY": 0, "centerX": 0 }, "compId": 5 }] }, { "type": "Image", "props": { "skin": "game/img_bg1.png", "centerY": 0, "centerX": 35, "sizeGrid": "20,25,20,25" }, "compId": 4, "child": [{ "type": "Label", "props": { "y": 10, "x": -125, "var": "labelTime", "text": "02:59", "fontSize": 26, "color": "#ffffff", "centerY": 0, "centerX": 0 }, "compId": 6 }] }, { "type": "Box", "props": { "y": 80, "width": 196, "right": 10, "height": 280 }, "compId": 15, "child": [{ "type": "Image", "props": { "var": "img_bgRankList", "skin": "game/img_bg2.png", "right": 0, "left": 0, "height": 280, "sizeGrid": "10,10,10,10" }, "compId": 7 }, { "type": "List", "props": { "y": 10, "var": "rankList", "spaceY": 5, "right": 0, "repeatY": 1, "repeatX": 1, "left": 0 }, "compId": 8 }] }, { "type": "Image", "props": { "var": "imgKill", "top": 20, "skin": "game/img_bgKill.png", "centerX": 0 }, "compId": 16, "child": [{ "type": "Label", "props": { "y": 109, "x": 217, "width": 103, "var": "labelSrc", "text": "XXX", "height": 28, "fontSize": 28, "color": "#ffffff" }, "compId": 17 }, { "type": "Label", "props": { "y": 167, "x": 287, "width": 163, "var": "labelDst", "text": "XXX", "height": 28, "fontSize": 28, "color": "#ffffff", "align": "right" }, "compId": 18 }, { "type": "Image", "props": { "y": 111, "x": 273.013671875, "skin": "game/img_txtEat.png" }, "compId": 19 }] }], "loadList": ["game/img_bg1.png", "game/img_bg2.png", "game/img_bgKill.png", "game/img_txtEat.png"], "loadList3D": [] };
            bubble.GameRenderUI = GameRenderUI;
            REG("ui.bubble.GameRenderUI", GameRenderUI);
            class GameResultRenderUI extends Laya.View {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren();
                    this.createView(GameResultRenderUI.uiView);
                }
            }
            GameResultRenderUI.uiView = { "type": "View", "props": { "width": 720, "mouseEnabled": true, "height": 1280 }, "compId": 2, "child": [{ "type": "Image", "props": { "top": 0, "skin": "game/img_blank.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "4,4,4,4" }, "compId": 16 }, { "type": "Box", "props": { "width": 500, "height": 450, "centerY": -320, "centerX": 0 }, "compId": 31, "child": [{ "type": "Image", "props": { "y": 213.5, "x": 251, "var": "img_star", "skin": "game/img_star.png", "rotation": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 17 }, { "type": "Image", "props": { "y": 160.5, "x": -109, "skin": "game/img_bgTitle.png", "centerX": 0 }, "compId": 18 }, { "type": "Label", "props": { "y": 180.5, "x": -109, "var": "labelRank", "text": "排名", "fontSize": 45, "color": "#ffffff", "centerX": 0 }, "compId": 28 }] }, { "type": "Box", "props": { "width": 600, "var": "boxHtmlTxt", "height": 100, "centerY": -122, "centerX": 0 }, "compId": 20, "child": [{ "type": "HTMLDivElement", "props": { "x": 0, "width": 218, "var": "htmlTxt", "text": "被XXX吃掉了", "height": 60, "fontSize": 32, "centerY": -159, "runtime": "laya.html.dom.HTMLDivElement" }, "compId": 19 }] }, { "type": "Label", "props": { "var": "labelScore", "text": "积分: 123", "fontSize": 45, "color": "#ffffff", "centerY": 24, "centerX": 0 }, "compId": 21 }, { "type": "Image", "props": { "skin": "game/img_energy.png", "centerY": 200, "centerX": -154 }, "compId": 23, "child": [{ "type": "Label", "props": { "y": -5, "x": 33, "var": "labelEnergy", "text": "123", "fontSize": 45, "color": "#ffffff" }, "compId": 22 }] }, { "type": "Image", "props": { "x": 455, "var": "btnGet", "skin": "game/img_btnGet.png", "centerY": 200, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 24, "child": [{ "type": "Script", "props": { "runtime": "common/ScaleButton.ts" }, "compId": 30 }] }], "loadList": ["game/img_blank.png", "game/img_star.png", "game/img_bgTitle.png", "game/img_energy.png", "game/img_btnGet.png"], "loadList3D": [] };
            bubble.GameResultRenderUI = GameResultRenderUI;
            REG("ui.bubble.GameResultRenderUI", GameResultRenderUI);
            class RankItemRenderUI extends Laya.View {
                constructor() {
                    super();
                }
                createChildren() {
                    super.createChildren();
                    this.createView(RankItemRenderUI.uiView);
                }
            }
            RankItemRenderUI.uiView = { "type": "View", "props": { "x": 0, "width": 180, "height": 20 }, "compId": 2, "child": [{ "type": "Label", "props": { "y": 0, "width": 90, "var": "labelName", "text": "玩家姓名", "height": 20, "fontSize": 20, "color": "#ffffff", "centerX": 0, "align": "center" }, "compId": 3 }, { "type": "Label", "props": { "y": 0, "x": 0, "width": 49, "var": "labelScore", "text": "10", "right": 0, "height": 20, "fontSize": 20, "color": "#ffffff", "align": "center" }, "compId": 4 }, { "type": "Sprite", "props": { "y": 0, "x": 10, "width": 20, "var": "icon", "height": 20 }, "compId": 9 }], "loadList": [], "loadList3D": [] };
            bubble.RankItemRenderUI = RankItemRenderUI;
            REG("ui.bubble.RankItemRenderUI", RankItemRenderUI);
        })(bubble = ui.bubble || (ui.bubble = {}));
    })(ui || (ui = {}));

    class GameUI extends ui.bubble.GameRenderUI {
        constructor() {
            super();
            this.initUI();
        }
        initUI() {
            this.img_bgRankList.alpha = 0.5;
            this.img_bgRankList.visible = false;
            this.rankList.itemRender = ui.bubble.RankItemRenderUI;
            this.rankList.renderHandler = new Laya.Handler(this, this.onItemRender);
            this.rankList.array = [];
            this.imgKill.visible = false;
        }
        onItemRender(cell, index) {
            let data = cell.dataSource;
            cell.icon.graphics.clear();
            cell.icon.graphics.drawCircle(cell.icon.width / 2, cell.icon.height / 2, cell.icon.width / 2, data.color);
            cell.icon.graphics.fillText(`${index + 1}`, cell.icon.width / 2, 3, "14px Arial", "#000000", "center");
            cell.labelName.text = data.name;
            cell.labelScore.text = data.eatBeans.toString();
        }
        updateRankList(...data) {
            this.rankList.array = data;
            this.rankList.repeatY = data.length;
            this.img_bgRankList.visible = data.length > 0;
            this.img_bgRankList.height = this.rankList.height + 15;
        }
        showTotalScore(score) {
            this.labelTotalScore.text = `得分:${score}`;
        }
        showLeftTime(time) {
            this.labelTime.text = GameUtil.fmtTime(time);
        }
        showKillTip(srcName, dstName, duration = 2000) {
            this.imgKill.visible = true;
            this.labelSrc.text = srcName;
            this.labelDst.text = dstName;
            Laya.timer.clearAll(this);
            Laya.timer.once(duration, this, this.hideKillTip);
        }
        hideKillTip() {
            this.imgKill.visible = false;
            this.imgKill.activeInHierarchy;
        }
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    class GameResultUI extends ui.bubble.GameResultRenderUI {
        constructor() {
            super();
        }
        initUI() {
            this.htmlTxt.style.fontSize = 45;
            this.htmlTxt.style.wordWrap = true;
            this.htmlTxt.style.align = Laya.HTMLStyle.ALIGN_CENTER;
            this.htmlTxt.style.width = this.boxHtmlTxt.width;
            this.htmlTxt.style.height = this.boxHtmlTxt.height;
            this.btnGet.getComponent(ScaleButton).clickHandler = Laya.Handler.create(this, this.onClick);
            this.mouseEnabled = true;
        }
        onAwake() {
            this.initUI();
        }
        onClick() {
            Laya.Scene.open("bubble/LaunchScene.scene");
        }
        show(rank, score, attackName) {
            this.visible = true;
            this.labelRank.text = `第${rank}名`;
            this.labelScore.text = `积分: ${score}`;
            this.htmlTxt.innerHTML = attackName ? `<span color='#ffffff'>被</span><span color='#e0c4c4'>${attackName}</span><span color='#ffffff'>吃掉了</span>` : "";
            this.labelEnergy.text = `${score * 10}`;
            this.startAutoRotate();
        }
        startAutoRotate() {
            return __awaiter(this, void 0, void 0, function* () {
                while (true) {
                    yield GameUtil.wait(100);
                    if (!this.activeInHierarchy)
                        break;
                    this.img_star.rotation += 2;
                }
            });
        }
        hide() {
            this.visible = false;
        }
    }

    class ResData {
        static getObstacleRes(index) {
            return `game/bubble_${index}.png`;
        }
        static getEmotionRes(id) {
            return `chat/anim/emoji_${id}.ani`;
        }
    }
    ResData.RES_ATLAS_GAME = "res/atlas/game.atlas";
    ResData.RES_ATLAS_EMOTION = "res/atlas/chat/emoji.atlas";

    class Obstacle extends Laya.Sprite {
        constructor() {
            super();
        }
        init(skinIdx, size, beansNum) {
            this.skinIndex = skinIdx;
            this.obsSize = size;
            this._beansNum = beansNum;
        }
        get beansNum() {
            return this._beansNum;
        }
        set skinIndex(value) {
            let res = ResData.getObstacleRes(value);
            this.loadImage(res);
            this._skinIndex = value;
        }
        get skinIndex() {
            return this._skinIndex;
        }
        set obsSize(value) {
            this._obsSize = value;
            this.width = this.height = value;
            this.pivot(value / 2, value / 2);
        }
        get obsSize() {
            return this._obsSize;
        }
    }
    class ObstacleFactory {
        static Create(skinIdx, size = 0, beansNum = 1) {
            let obs = Laya.Pool.getItemByClass(this.POOL_SIGN, Obstacle);
            obs.init(skinIdx, size, beansNum);
            return obs;
        }
        static Recycle(obs) {
            obs.removeSelf();
            Laya.Pool.recover(this.POOL_SIGN, obs);
        }
    }
    ObstacleFactory.POOL_SIGN = "POOL_OBSTACLE";

    class BubbleData {
        constructor() {
        }
        init() {
            this.name = "";
            this.eatBeans = 0;
            this.rank = 0;
            this.color = "";
            this.isAI = true;
        }
    }
    class Bubble extends Laya.Sprite {
        constructor() {
            super();
            this._moveSpeed = Bubble.InitSpeed;
            this._state = BubbleState.INVALID;
        }
        init(size, skin, isAI) {
            this._shapeSp = this._shapeSp || new Laya.Sprite();
            this.addChild(this._shapeSp);
            this._bubbleData = this._bubbleData || new BubbleData();
            this._bubbleData.init();
            this.initStar(skin);
            this._initBubbleSize = size;
            this._visionRange = Laya.stage.width;
            this.skinIndex = skin;
            this.isAI = isAI;
            this.level = 0;
            this.setMoveDelta(0, 0);
            this.State = BubbleState.NORMAL;
        }
        initStar(skinIdx) {
            this._starShapeSp = this._starShapeSp || new Laya.Sprite();
            let size = 260;
            let halfSize = size / 2;
            let path = [];
            path.push(0, -130);
            path.push(33, -33);
            path.push(130, -30);
            path.push(55, 32);
            path.push(85, 130);
            path.push(0, 73);
            path.push(-85, 130);
            path.push(-55, 32);
            path.push(-130, -30);
            path.push(-33, -33);
            this._starShapeSp.graphics.clear();
            this._starShapeSp.size(size, size);
            this._starShapeSp.pivot(halfSize, halfSize + 10);
            let idx = (skinIdx + 1) % Bubble.SKIN_LIST.length;
            this._starShapeSp.graphics.drawPoly(halfSize, halfSize, path, Bubble.SKIN_LIST[2]);
        }
        showStar(centerX, centerY, size) {
            this.addChild(this._starShapeSp);
            this._starShapeSp.pos(centerX, centerY);
            this._starShapeSp.scale(size / 320, size / 320);
        }
        updateShape(size, deltaSize) {
            let radius = size / 2;
            this._killShape = this._killShape || new BubbleShape(BubbleState.SPIKE, radius, radius, radius);
            if (this._normalShape == null) {
                this._normalShape = new BubbleShape(BubbleState.NORMAL, radius, radius, radius);
                [this._normalShape.startX, this._normalShape.startY, this._normalShape.ptList] = GameUtil.MakeRegularBubble(radius, radius, radius);
            }
            else if (this.State == BubbleState.NORMAL) {
                this._normalShape.startX += deltaSize / 2;
                this._normalShape.startY += deltaSize / 2;
                this.draw(this._normalShape);
                let oldShape = this._normalShape;
                let newShape = new BubbleShape(BubbleState.NORMAL, radius, radius, radius);
                [newShape.startX, newShape.startY, newShape.ptList] = GameUtil.MakeRegularBubble(radius, radius, radius);
                this.checkTransformShape(oldShape, newShape, Bubble.TransformTime, this.getEaseFun(this.State, this.State));
                this._normalShape = newShape;
                this._moveShape.centerX = this._moveShape.centerY = this._moveShape.radius = radius;
                [this._moveShape.startX, this._moveShape.startY, this._moveShape.ptList] = GameUtil.MakeBezierBubble(radius, radius, radius);
                this._killShape.centerY = this._killShape.centerY = this._killShape.radius = radius;
                [this._killShape.startX, this._killShape.startY, this._killShape.ptList] = GameUtil.MakeRRBubble(radius, radius, radius, radius + radius * 0.2);
            }
            if (this._moveShape == null) {
                this._moveShape = new BubbleShape(BubbleState.MOVE, radius, radius, radius);
                [this._moveShape.startX, this._moveShape.startY, this._moveShape.ptList] = GameUtil.MakeBezierBubble(radius, radius, radius);
            }
            else if (this.State == BubbleState.MOVE) {
                this._moveShape.startX += deltaSize / 2;
                this._moveShape.startY += deltaSize / 2;
                this.draw(this._moveShape);
                let oldShape = this._moveShape;
                let newShape = new BubbleShape(BubbleState.MOVE, radius, radius, radius);
                [newShape.startX, newShape.startY, newShape.ptList] = GameUtil.MakeBezierBubble(radius, radius, radius);
                this.checkTransformShape(oldShape, newShape, Bubble.TransformTime, this.getEaseFun(this.State, this.State));
                this._moveShape = newShape;
                this._normalShape.centerX = this._normalShape.centerY = this._normalShape.radius = radius;
                [this._normalShape.startX, this._normalShape.startY, this._normalShape.ptList] = GameUtil.MakeRegularBubble(radius, radius, radius);
                this._killShape.centerY = this._killShape.centerY = this._killShape.radius = radius;
                [this._killShape.startX, this._killShape.startY, this._killShape.ptList] = GameUtil.MakeRRBubble(radius, radius, radius, radius + radius * 0.2);
            }
            this._tmpShape = this._tmpShape || new BubbleShape(BubbleState.TMP, radius, radius, radius);
        }
        set bubbleSize(value) {
            if (this.bubbleSize == value)
                return;
            let deltaSize = value - this.bubbleSize;
            this._bubbleSize = value;
            this.size(value, value);
            let halfSize = value / 2;
            this.pivot(halfSize, halfSize);
            this._shapeSp.size(value, value);
            this._shapeSp.pivot(halfSize, halfSize);
            this._shapeSp.pos(halfSize, halfSize);
            this.updateShape(value, deltaSize);
        }
        get bubbleSize() {
            return this._bubbleSize;
        }
        get attacker() {
            return this._attacker;
        }
        set attacker(value) {
            this._attacker = value;
        }
        get isAI() {
            return this._bubbleData.isAI;
        }
        set isAI(value) {
            this._bubbleData.isAI = value;
        }
        get rank() {
            return this._bubbleData.rank;
        }
        set rank(value) {
            this._bubbleData.rank = value;
        }
        get visionRange() {
            return this._visionRange;
        }
        get skinIndex() {
            return this._skinIndex;
        }
        set skinIndex(value) {
            this._skinIndex = value;
            this._bubbleData.color = Bubble.SKIN_LIST[value];
        }
        set aimTarget(value) {
            this._aimTarget = value;
            if (value) {
                this.bubbleRotation = Math.atan2(value.y - this.y, value.x - this.x) * 180 / Math.PI;
                if (this.State == BubbleState.NORMAL) {
                    this.State = BubbleState.MOVE;
                }
            }
        }
        get aimTarget() {
            return this._aimTarget;
        }
        get bubbleData() {
            return this._bubbleData;
        }
        set bubbleName(value) {
            this.name = value;
            this._bubbleData.name = value;
        }
        get bubbleName() {
            return this._bubbleData.name;
        }
        set eatBeans(value) {
            this._bubbleData.eatBeans = value;
            this.level = Math.floor(value / Bubble.AddLevelByBeans);
        }
        get eatBeans() {
            return this._bubbleData.eatBeans;
        }
        set level(value) {
            this._level = Math.min(value, this.maxLevel);
            this.bubbleSize = this._initBubbleSize + 2 * (Bubble.AddSizeByLevel * this.level + this.circleNums * (Bubble.AddSizeByCircle - Bubble.AddSizeByLevel));
        }
        get level() {
            return this._level;
        }
        getSizeByCircleNum(circleNum) {
            return this._initBubbleSize + 2 * (circleNum * Bubble.AddCircleByLevels * Bubble.AddSizeByLevel + circleNum * (Bubble.AddSizeByCircle - Bubble.AddSizeByLevel));
        }
        get circleNums() {
            let circleNum = Math.floor(this.level / Bubble.AddCircleByLevels);
            return circleNum;
        }
        get maxCircleNum() {
            return Bubble.SKIN_LIST.length - 1;
        }
        get maxLevel() {
            return this.maxCircleNum * Bubble.AddCircleByLevels;
        }
        clearVisions() {
            this._visionObsList && (this._visionObsList.length = 0);
            this._visionBubbleList && (this._visionBubbleList.length = 0);
        }
        addVisionBubble(target) {
            this._visionBubbleList = this._visionBubbleList || [];
            this._visionBubbleList.push(target);
        }
        addVisionObs(target) {
            this._visionObsList = this._visionObsList || [];
            this._visionObsList.push(target);
        }
        isInVision(target) {
            if (this._visionBubbleList && this._visionBubbleList.indexOf(target) != -1) {
                return true;
            }
            if (this._visionObsList && this._visionObsList.indexOf(target) != -1) {
                return true;
            }
            return false;
        }
        draw(shape) {
            this._shapeSp.graphics.clear();
            let circleNums = this.circleNums;
            let outerColorIdx = (this._skinIndex + circleNums) % Bubble.SKIN_LIST.length;
            let lineColorIdx = (this._skinIndex + 1 + circleNums) % Bubble.SKIN_LIST.length;
            this._shapeSp.graphics.drawPoly(shape.startX, shape.startY, shape.ptList, Bubble.SKIN_LIST[outerColorIdx], Bubble.SKIN_LIST[lineColorIdx], 3);
            if (circleNums >= 1) {
                for (let i = circleNums - 1; i >= 0; --i) {
                    let size = this.getSizeByCircleNum(i);
                    let colorIdx = (this._skinIndex + i) % Bubble.SKIN_LIST.length;
                    this._shapeSp.graphics.drawCircle(this.bubbleSize / 2, this.bubbleSize / 2, size / 2, Bubble.SKIN_LIST[colorIdx]);
                    if (i == 0) {
                        this.showStar(this.bubbleSize / 2, this.bubbleSize / 2, size);
                    }
                }
            }
            else {
                this.showStar(this._normalShape.centerX, this._normalShape.centerY, this._normalShape.radius * 2);
            }
        }
        set State(value) {
            if (this.State == value) {
                if (value == BubbleState.SPIKE)
                    console.log("击杀状态中:再次击杀");
                return;
            }
            let preState = this._state;
            this._state = value;
            if (preState == BubbleState.INVALID && value == BubbleState.NORMAL) {
                this._curShape = this._normalShape;
                this.draw(this._normalShape);
            }
            else {
                this.checkTransformShape(this.getShape(preState), this.getShape(value), Bubble.TransformTime, this.getEaseFun(preState, value));
            }
            this.onStateChange(preState, value);
        }
        get State() {
            return this._state;
        }
        onStateChange(lastState, nowState) {
            if (nowState == BubbleState.DEAD) {
                BubbleFactory.Recycle(this);
            }
        }
        getEaseFun(srcState, dstState) {
            if (srcState == BubbleState.NORMAL && dstState == BubbleState.MOVE) {
                return Laya.Ease.backOut;
            }
            else if (srcState == BubbleState.MOVE && dstState == BubbleState.NORMAL) {
                return Laya.Ease.backOut;
            }
            else {
                return Laya.Ease.bounceOut;
            }
        }
        getShape(state) {
            if (state == BubbleState.NORMAL) {
                return this._normalShape;
            }
            else if (state == BubbleState.MOVE) {
                return this._moveShape;
            }
            else if (state == BubbleState.SPIKE) {
                return this._killShape;
            }
            return null;
        }
        get bubbleRotation() {
            return this._shapeSp.rotation;
        }
        set bubbleRotation(value) {
            this._shapeSp.rotation = value;
        }
        checkTransformShape(srcShape, dstShape, totalTime, easeFunc, overrite = false) {
            if (srcShape == null || dstShape == null)
                return;
            if (!this._isTransforming) {
                this.transformShape(srcShape, dstShape, totalTime, easeFunc, overrite);
            }
        }
        transformShape(srcShape, dstShape, totalTime, easeFunc, overrite = false) {
            return __awaiter(this, void 0, void 0, function* () {
                if (srcShape.ptList.length != dstShape.ptList.length) {
                    console.error("两个形状顶点数量不一致!");
                    return;
                }
                if (this._isTransforming) {
                    console.warn("正在变形中,不能再次变形");
                    return;
                }
                this._isTransforming = true;
                let step = 30;
                let startTime = 0;
                let count = srcShape.ptList.length;
                let srcX = srcShape.startX;
                let srcY = srcShape.startY;
                let dstX = dstShape.startX;
                let dstY = dstShape.startY;
                while (this._isTransforming) {
                    yield GameUtil.wait(step);
                    if (!this.activeInHierarchy)
                        break;
                    startTime += step;
                    let startX = easeFunc(startTime, srcX, dstX - srcX, totalTime);
                    let startY = easeFunc(startTime, srcY, dstY - srcY, totalTime);
                    let list = [];
                    for (let i = 0; i < count; i += 2) {
                        let x = easeFunc(startTime, srcShape.ptList[i] + srcX, dstShape.ptList[i] + dstX - srcShape.ptList[i] - srcX, totalTime) - startX;
                        let y = easeFunc(startTime, srcShape.ptList[i + 1] + srcY, dstShape.ptList[i + 1] + dstY - srcShape.ptList[i + 1] - srcY, totalTime) - startY;
                        list.push(x);
                        list.push(y);
                    }
                    this._tmpShape.startX = startX;
                    this._tmpShape.startY = startY;
                    this._tmpShape.ptList = list;
                    this.draw(this._tmpShape);
                    if (startTime >= totalTime) {
                        this._curShape = dstShape;
                        this._isTransforming = false;
                        this.checkStateShape();
                        break;
                    }
                }
            });
        }
        checkStateShape() {
            if (this.State == BubbleState.NORMAL) {
                if (this._curShape != this._normalShape) {
                    this.transformShape(this._curShape, this._normalShape, Bubble.TransformTime, this.getEaseFun(this._curShape.state, this.State));
                }
            }
            else if (this.State == BubbleState.MOVE) {
                if (this._curShape != this._moveShape) {
                    this.transformShape(this._curShape, this._moveShape, Bubble.TransformTime, this.getEaseFun(this._curShape.state, this.State));
                }
            }
            else if (this.State == BubbleState.SPIKE) {
                if (this._curShape != this._killShape) {
                    this.transformShape(this._curShape, this._killShape, Bubble.TransformTime, this.getEaseFun(this._curShape.state, this.State));
                }
            }
        }
        startMove(targetX, targetY) {
            if (this.State == BubbleState.NORMAL) {
                this.State = BubbleState.MOVE;
                this.bubbleRotation = Math.atan2(targetY - this.y, targetX - this.x) * 180 / Math.PI;
            }
        }
        stopMove() {
            if (this.isMoving)
                this.State = BubbleState.NORMAL;
        }
        get isMoving() {
            return this.State == BubbleState.MOVE;
        }
        get isAlive() {
            return this.State != BubbleState.DEAD;
        }
        set moveSpeed(value) {
            this._moveSpeed = value;
        }
        get moveSpeed() {
            return this._moveSpeed;
        }
        setMoveDelta(deltaX, deltaY) {
            this._moveDelta = this._moveDelta || new Laya.Point();
            this._moveDelta.x = deltaX;
            this._moveDelta.y = deltaY;
        }
        get moveDelta() {
            return this._moveDelta;
        }
        setMoveBoundary(x, y) {
            this._moveBoundary = this._moveBoundary || new Laya.Point();
            this._moveBoundary.x = x;
            this._moveBoundary.y = y;
        }
        get moveBoundary() {
            return this._moveBoundary;
        }
        update() {
            if (!this.isAlive)
                return;
            if (this.isMoving) {
                this.updateMove();
            }
            else {
                this.setMoveDelta(0, 0);
            }
            this.autoRotateStar();
        }
        autoRotateStar() {
            this._starShapeSp.rotation += 0.5;
        }
        onEnable() {
            this.startAILogic();
        }
        updateMove() {
            var radians = this.bubbleRotation * Math.PI / 180;
            var xOffset = Math.cos(radians) * this._moveSpeed;
            var yOffset = Math.sin(radians) * this._moveSpeed;
            let preX = this.x;
            let preY = this.y;
            this.x = GameUtil.clamp(this.x + xOffset, this.bubbleSize / 2, this.moveBoundary.x - this.bubbleSize / 2);
            this.y = GameUtil.clamp(this.y + yOffset, this.bubbleSize / 2, this.moveBoundary.y - this.bubbleSize / 2);
            this.setMoveDelta(this.x - preX, this.y - preY);
        }
        get isOnBoundary() {
            if (this.x <= this.width / 2 || this.x >= this.moveBoundary.x - this.width / 2)
                return true;
            if (this.y <= this.width / 2 || this.y >= this.moveBoundary.y - this.width / 2)
                return true;
            return false;
        }
        startAILogic() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.isAI)
                    return;
                while (this.isAlive) {
                    let baseTime = 0;
                    if (this.isOnBoundary) {
                        this.bubbleRotation = Math.floor(Math.random() * 360);
                        this.State = BubbleState.MOVE;
                        baseTime = 500;
                    }
                    else {
                        if (this._visionObsList && this._visionObsList.length > 0) {
                            if (this.aimTarget == null) {
                                let idx = Math.floor(Math.random() * this._visionObsList.length);
                                this.aimTarget = this._visionObsList[idx];
                            }
                            else if (!this.isInVision(this.aimTarget)) {
                                let idx = Math.floor(Math.random() * this._visionObsList.length);
                                this.aimTarget = this._visionObsList[idx];
                            }
                            baseTime = 500;
                        }
                        else {
                            this.aimTarget = null;
                            let rand = Math.random() * 100;
                            if (rand <= 50) {
                                this.bubbleRotation = Math.floor(Math.random() * 360);
                                this.State = BubbleState.MOVE;
                            }
                            else if (rand <= 60) {
                                this.State = BubbleState.NORMAL;
                            }
                            else {
                                this.State = BubbleState.MOVE;
                            }
                            baseTime = 1000;
                        }
                    }
                    let time = baseTime + Math.floor(Math.random() * 500);
                    yield GameUtil.wait(time);
                    if (!this.activeInHierarchy)
                        break;
                }
            });
        }
        playEatAnim() {
            Laya.Tween.clearAll(this._shapeSp);
            this._shapeSp.scale(1, 1);
            Laya.Tween.from(this._shapeSp, { scaleX: 1.3, scaleY: 0.7 }, 500, Laya.Ease.bounceOut);
        }
        playKillAnim() {
            console.log('播放击杀动画');
            this.State = BubbleState.SPIKE;
            Laya.timer.once(300, this, this.resumeState, [BubbleState.NORMAL]);
        }
        resumeState(state) {
            this.State = state;
            console.log("击杀动画播放完毕,恢复到待机状态");
        }
        eat(obs) {
            this.eatBeans += obs.beansNum;
            this.playEatAnim();
            this.aimTarget = this.aimTarget == obs ? null : this.aimTarget;
            ObstacleFactory.Recycle(obs);
        }
        kill(b) {
            b.attacker = this;
            b.State = BubbleState.DEAD;
            this.aimTarget = this.aimTarget == b ? null : this.aimTarget;
            this.playKillAnim();
        }
    }
    Bubble.EMOTION_IDLIST = [1, 10, 11, 13, 15, 16, 17, 18, 19, 2, 21, 23, 27, 4, 8, 9];
    Bubble.SKIN_LIST = ['#ff0000', '#ff7d00', '#ffff00', '#00ff00', '0000ff', '00ffff', 'ff00ff'];
    Bubble.TransformTime = 250;
    Bubble.AddCircleByLevels = 10;
    Bubble.AddLevelByBeans = 1;
    Bubble.AddSizeByCircle = 2;
    Bubble.AddSizeByLevel = 1;
    Bubble.InitSize = 50;
    Bubble.InitSpeed = 6;
    class BubbleFactory {
        static Create(size, skin, isAI) {
            let b = Laya.Pool.getItemByClass(this.SIGN_BUBBLE, Bubble);
            b.init(size, skin, isAI);
            return b;
        }
        static Recycle(bubble) {
            bubble.removeSelf();
            Laya.Pool.recover(this.SIGN_BUBBLE, bubble);
        }
    }
    BubbleFactory.SIGN_BUBBLE = "POOL_BUBBLE";
    class BubbleShape {
        constructor(state, centerX, centerY, radius) {
            this.state = state;
            this.centerX = centerX;
            this.centerY = centerY;
            this.radius = radius;
        }
    }
    var BubbleState;
    (function (BubbleState) {
        BubbleState[BubbleState["INVALID"] = 0] = "INVALID";
        BubbleState[BubbleState["TMP"] = 1] = "TMP";
        BubbleState[BubbleState["NORMAL"] = 2] = "NORMAL";
        BubbleState[BubbleState["MOVE"] = 3] = "MOVE";
        BubbleState[BubbleState["SPIKE"] = 4] = "SPIKE";
        BubbleState[BubbleState["SPIKE2"] = 5] = "SPIKE2";
        BubbleState[BubbleState["DEAD"] = 6] = "DEAD";
    })(BubbleState || (BubbleState = {}));
    var AIType;
    (function (AIType) {
        AIType[AIType["Ordinary"] = 0] = "Ordinary";
        AIType[AIType["Risk"] = 1] = "Risk";
        AIType[AIType["Coward"] = 2] = "Coward";
    })(AIType || (AIType = {}));

    class GameMap extends Laya.Sprite {
        constructor() {
            super();
        }
        static get Instance() {
            if (GameMap._instance == null) {
                GameMap._instance = new GameMap();
            }
            return this._instance;
        }
        init(w, h) {
            this.size(w, h);
            this._boundary = new Laya.Point();
            this._boundary.x = Math.ceil(this.width / GameMap.GridSize) * GameMap.GridSize;
            this._boundary.y = Math.ceil(this.height / GameMap.GridSize) * GameMap.GridSize;
            this.draw();
            this.initPlayers();
            this.initObstacles();
        }
        addHero(b) {
            this._bubbleHero = b;
            b.setMoveBoundary(this._boundary.x, this._boundary.y);
            this.addChild(b);
        }
        update() {
            this.checkUpdate();
            this.checkScrollMap(this._bubbleHero.moveDelta.x, this._bubbleHero.moveDelta.y);
            this.checkCollider();
            this.checkOutOfStage();
            this.checkSpawnObs(GameMap.OBS_NUM * 0.3);
        }
        refreshRank() {
            this._rankDataList = this._rankDataList || [];
            this._rankDataList.length = 0;
            for (let i = 0; i < this._bubbleAIList.length; ++i) {
                this._rankDataList.push(this._bubbleAIList[i].bubbleData);
            }
            if (this._bubbleHero) {
                this._rankDataList.push(this._bubbleHero.bubbleData);
            }
            this._rankDataList.sort((l, r) => r.eatBeans - l.eatBeans);
            for (let i = 0; i < this._rankDataList.length; ++i) {
                let data = this._rankDataList[i];
                if (data.isAI) {
                    data.rank = i + 1;
                }
                else {
                    this._bubbleHero.rank = i + 1;
                }
            }
            this.updateRankHandler && this.updateRankHandler.runWith(this._rankDataList);
        }
        checkSpawnObs(minNum) {
            if (this._obstacleList.length < minNum) {
                let addNum = Math.random() * 20;
                for (let i = 0; i < addNum; ++i) {
                    let size = GameMap.GridSize / 2 + Math.floor(Math.random() * GameMap.GridSize / 2);
                    let skinIdx = Math.floor(Math.random() * 8);
                    let x = size + Math.random() * (this._boundary.x - 2 * size);
                    let y = size + Math.random() * (this._boundary.y - 2 * size);
                    let obs = ObstacleFactory.Create(skinIdx, size, 1);
                    obs.pos(x, y);
                    this._obsLayer.addChild(obs);
                    this._obstacleList.push(obs);
                    if (this._obstacleList.length >= GameMap.OBS_NUM) {
                        break;
                    }
                }
            }
        }
        checkOutOfStage() {
            let count = this._bubbleAIList.length;
            for (let i = 0; i < count; ++i) {
                let b = this._bubbleAIList[i];
                if (!this.isInStage(b)) {
                    let icon = this._bubbleIconMap.get(b);
                    if (b.x + this.x < 0) {
                        icon.x = -this.x + icon.width / 2;
                    }
                    else if (b.x + this.x > Laya.stage.width) {
                        icon.x = Laya.stage.width - this.x - icon.width / 2;
                    }
                    else {
                        icon.x = b.x;
                    }
                    if (b.y + this.y < 0) {
                        icon.y = -this.y + icon.height / 2;
                    }
                    else if (b.y + this.y > Laya.stage.height) {
                        icon.y = Laya.stage.height - this.y - icon.height / 2;
                    }
                    else {
                        icon.y = b.y;
                    }
                    icon.graphics.clear();
                    icon.graphics.drawCircle(icon.width / 2, icon.height / 2, icon.width / 2, b.bubbleData.color);
                    icon.graphics.fillText(`${b.rank}`, icon.width / 2, 3, '14px Arial', '#000000', 'center');
                    this.addChild(icon);
                }
                else {
                    let icon = this._bubbleIconMap.get(b);
                    icon.removeSelf();
                }
            }
        }
        checkUpdate() {
            this._bubbleHero.update();
            let count = this._bubbleAIList.length;
            for (let i = 0; i < count; ++i) {
                let ai = this._bubbleAIList[i];
                ai.update();
            }
        }
        isOnBorder(obj) {
            if (obj.x <= obj.width / 2 || obj.x >= this._boundary.x - obj.width / 2)
                return true;
            if (obj.y <= obj.width / 2 || obj.y >= this._boundary.y - obj.width / 2)
                return true;
            return false;
        }
        isInStage(obj) {
            if (obj.x + this.x <= -obj.width / 2 || obj.x + this.x >= Laya.stage.width + obj.width / 2)
                return false;
            if (obj.y + this.y <= -obj.height / 2 || obj.y + this.y >= Laya.stage.height + obj.height / 2)
                return false;
            return true;
        }
        checkScrollMap(deltaX, deltaY) {
            let stageX = this.x + this._bubbleHero.x;
            let stageY = this.y + this._bubbleHero.y;
            if (deltaX > 0 && stageX > Laya.stage.width / 2 && (Laya.stage.width + Math.abs(this.x) < this._boundary.x)) {
                this.x -= deltaX;
            }
            else if (deltaX < 0 && stageX < Laya.stage.width / 2 && this._bubbleHero.x > Laya.stage.width / 2) {
                this.x -= deltaX;
            }
            if (deltaY > 0 && stageY > Laya.stage.height / 2 && (Laya.stage.height + Math.abs(this.y) < this._boundary.y)) {
                this.y -= deltaY;
            }
            else if (deltaY < 0 && stageY < Laya.stage.height / 2 && this._bubbleHero.y > Laya.stage.height / 2) {
                this.y -= deltaY;
            }
        }
        checkCollider() {
            let bCount = this._bubbleAIList.length;
            for (let i = 0; i < bCount; ++i) {
                let b = this._bubbleAIList[i];
                b.clearVisions();
            }
            this._delBubbleList.length = 0;
            for (let i = 0; i < bCount; ++i) {
                if (!this._bubbleHero.isAlive)
                    break;
                let b = this._bubbleAIList[i];
                if (!b.isAlive)
                    continue;
                if (GameUtil.powerDistance(this._bubbleHero.x, this._bubbleHero.y, b.x, b.y) <= Math.pow(this._bubbleHero.bubbleSize / 2 + b.bubbleSize / 2, 2)) {
                    if (this._bubbleHero.level > b.level) {
                        this.handleKill(this._bubbleHero, b);
                        this._delBubbleList.push(b);
                    }
                    else if (this._bubbleHero.level < b.level) {
                        this.handleKill(b, this._bubbleHero);
                        console.log('游戏结束');
                        break;
                    }
                }
            }
            for (let i = 0; i < bCount; ++i) {
                let b = this._bubbleAIList[i];
                for (let j = i + 1; j < bCount; ++j) {
                    if (!b.isAlive)
                        break;
                    let b2 = this._bubbleAIList[j];
                    if (!b2.isAlive)
                        continue;
                    if (GameUtil.powerDistance(b.x, b.y, b2.x, b2.y) <= Math.pow(b.bubbleSize / 2 + b2.bubbleSize / 2, 2)) {
                        if (b.level > b2.level) {
                            this.handleKill(b, b2);
                            this._delBubbleList.push(b2);
                        }
                        else if (b.level < b2.level) {
                            this.handleKill(b2, b);
                            this._delBubbleList.push(b);
                        }
                    }
                    else if (GameUtil.powerDistance(b.x, b.y, b2.x, b2.y) <= Math.pow(b.visionRange / 2 + b2.width / 2, 2)) {
                        b.addVisionBubble(b2);
                        b2.addVisionBubble(b);
                    }
                }
            }
            this._bubbleAIList = this._delBubbleList.length > 0 ? this._bubbleAIList.filter((ele, index, array) => {
                return this._delBubbleList.indexOf(ele) == -1;
            }) : this._bubbleAIList;
            this._delObstacleList.length = 0;
            let count = this._obstacleList.length;
            bCount = this._bubbleAIList.length;
            for (let i = 0; i < count; ++i) {
                let obs = this._obstacleList[i];
                if (!obs.displayedInStage)
                    continue;
                if (this._bubbleHero.isAlive && GameUtil.powerDistance(this._bubbleHero.x, this._bubbleHero.y, obs.x, obs.y) <= Math.pow(this._bubbleHero.bubbleSize / 2 + obs.obsSize / 2 + 5, 2)) {
                    this.handleEatBeans(this._bubbleHero, obs);
                    this._delObstacleList.push(obs);
                }
                for (let j = 0; j < bCount; ++j) {
                    let b = this._bubbleAIList[j];
                    if (GameUtil.powerDistance(b.x, b.y, obs.x, obs.y) <= Math.pow(b.bubbleSize / 2 + obs.obsSize / 2 + 5, 2)) {
                        this.handleEatBeans(b, obs);
                        this._delObstacleList.push(obs);
                    }
                    else if (GameUtil.powerDistance(b.x, b.y, obs.x, obs.y) <= Math.pow(b.visionRange / 2 + obs.obsSize / 2, 2)) {
                        b.addVisionObs(obs);
                    }
                }
            }
            this._obstacleList = this._delObstacleList.length > 0 ? this._obstacleList.filter((ele, index, array) => {
                return this._delObstacleList.indexOf(ele) == -1;
            }) : this._obstacleList;
            if (this._delBubbleList.length > 0 || this._delObstacleList.length > 0) {
                this.refreshRank();
            }
        }
        handleEatBeans(src, dst) {
            src.eat(dst);
            this.eatHandler && this.eatHandler.runWith([src, dst]);
        }
        handleKill(src, dst) {
            src.kill(dst);
            this.killHandler && this.killHandler.runWith([src, dst]);
            this.delBubbleIcon(dst);
        }
        delBubbleIcon(b) {
            let icon = this._bubbleIconMap.get(b);
            icon && icon.removeSelf();
            this._bubbleIconMap.delete(b);
        }
        initPlayers() {
            this._bubbleAIList = [];
            this._delBubbleList = [];
            this._bubbleIconMap = new Map();
            for (let i = 0; i < GameMap.AI_NUM; ++i) {
                let idx = Math.floor(Math.random() * Bubble.SKIN_LIST.length);
                let posX = Bubble.InitSize + Math.floor(Math.random() * (this._boundary.x - 2 * Bubble.InitSize));
                let posY = Bubble.InitSize + Math.floor(Math.random() * (this._boundary.y - 2 * Bubble.InitSize));
                let rotation = Math.floor(Math.random() * 360);
                let ai = BubbleFactory.Create(Bubble.InitSize, idx, true);
                ai.bubbleName = `路人${i}号`;
                ai.bubbleRotation = rotation;
                ai.pos(posX, posY);
                ai.setMoveBoundary(this._boundary.x, this._boundary.y);
                this._bubbleAIList.push(ai);
                this.addChild(ai);
                let icon = new Laya.Sprite();
                icon.size(GameMap.IconSize, GameMap.IconSize);
                icon.pivot(icon.width / 2, icon.height / 2);
                icon.graphics.drawCircle(icon.width / 2, icon.height / 2, icon.width / 2, Bubble.SKIN_LIST[idx]);
                icon.graphics.fillText(`${i + 1}`, icon.width / 2, 3, '14px Arial', '#000000', 'center');
                this._bubbleIconMap.set(ai, icon);
            }
        }
        initObstacles() {
            this._obstacleList = [];
            this._delObstacleList = [];
            this._obsLayer = new Laya.Sprite;
            this._obsLayer.cacheAs = "bitmap";
            for (let i = 0; i < GameMap.OBS_NUM; ++i) {
                let size = GameMap.GridSize / 2 + Math.floor(Math.random() * GameMap.GridSize / 2);
                let skinIdx = Math.floor(Math.random() * 8);
                let x = size + Math.random() * (this._boundary.x - 2 * size);
                let y = size + Math.random() * (this._boundary.y - 2 * size);
                let obs = ObstacleFactory.Create(skinIdx, size, 1);
                this._obstacleList.push(obs);
                obs.pos(x, y);
                this._obsLayer.addChild(obs);
            }
            this.addChild(this._obsLayer);
        }
        draw() {
            this.graphics.clear();
            let row = Math.ceil(this.height / GameMap.GridSize);
            let col = Math.ceil(this.width / GameMap.GridSize);
            for (let i = 0; i <= row; ++i) {
                let x0 = 0;
                let y0 = (i) * GameMap.GridSize;
                let x1 = this._boundary.x;
                let y1 = y0;
                this.graphics.drawLine(x0, y0, x1, y1, GameMap.LineColor, 1);
            }
            for (let i = 0; i <= col; ++i) {
                let x0 = (i) * GameMap.GridSize;
                let y0 = 0;
                let x1 = x0;
                let y1 = this._boundary.y;
                this.graphics.drawLine(x0, y0, x1, y1, GameMap.LineColor, 1);
            }
        }
        onDestroy() {
            GameMap._instance = null;
        }
    }
    GameMap.GridSize = 50;
    GameMap.IconSize = 20;
    GameMap.LineColor = '#000000';
    GameMap.MAP_WIDTH = 2048;
    GameMap.MAP_HEIGHT = 2048;
    GameMap.AI_NUM = 9;
    GameMap.OBS_NUM = 100;

    class GameControl extends Laya.Script {
        constructor() {
            super();
            this._leftTime = 0;
        }
        onAwake() {
            this.initMap();
            this.initUI();
            this.initEffect();
            this.owner.autoDestroyAtClosed = true;
            EventSource;
        }
        onEnable() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
            Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
            this.gameState = GameState.START;
        }
        onDisable() {
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onTouchUp);
            Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
        }
        onResize() {
            console.log("舞台宽高: " + Laya.stage.width + " " + Laya.stage.height);
        }
        onMouseMove() {
        }
        onTouchDown() {
            if (this.gameState != GameState.START)
                return;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
            this._lastMousePosX = Laya.stage.mouseX;
            ;
            this._lastMousePosY = Laya.stage.mouseY;
            this._bubbleHero.startMove(this._map.mouseX, this._map.mouseY);
        }
        onTouchMove() {
            if (this.gameState != GameState.START)
                return;
            let curMouseX = Laya.stage.mouseX;
            let curMouseY = Laya.stage.mouseY;
            let deltaX = curMouseX - this._lastMousePosX;
            let deltaY = curMouseY - this._lastMousePosY;
            let len = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
            if (len <= Math.pow(GameControl.TouchThreshold, 2))
                return;
            let targetRotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            let targetR = Math.floor(targetRotation * 10) * 0.1;
            this._bubbleHero.bubbleRotation = targetR;
            this._lastMousePosX = curMouseX;
            this._lastMousePosY = curMouseY;
        }
        onTouchUp() {
            if (this.gameState != GameState.START)
                return;
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
            this._bubbleHero.stopMove();
        }
        onUpdate() {
            if (this.gameState != GameState.START)
                return;
            this._map.update();
        }
        initMap() {
            this._map = GameMap.Instance;
            this._map.init(GameMap.MAP_WIDTH, GameMap.MAP_HEIGHT);
            this.owner.addChildAt(this._map, 0);
            this._bubbleHero = BubbleFactory.Create(Bubble.InitSize, 0, false);
            this._bubbleHero.bubbleName = "Molly(我)";
            this._bubbleHero.pos(Laya.stage.width / 2, Laya.stage.height / 2);
            this._map.addHero(this._bubbleHero);
            this._map.eatHandler = Laya.Handler.create(this, this.onEat, null, false);
            this._map.killHandler = Laya.Handler.create(this, this.onKill, null, false);
            this._map.updateRankHandler = Laya.Handler.create(this, this.onRefreshRankList, null, false);
        }
        initUI() {
            this._gameUI = this.owner.getChildByName("gameUI");
            this._gameUI.showTotalScore(this._bubbleHero.eatBeans);
            this._gameUI.showLeftTime(this._leftTime);
            this._gameResultUI = this.owner.getChildByName("gameResultUI");
            this._gameResultUI.hide();
        }
        initEffect() {
            this._emotionAnim = new Laya.Animation();
            this.owner.addChild(this._emotionAnim);
        }
        onKill(src, dst) {
            console.log(`玩家【${src.name}】击杀了玩家【${dst.name}】`);
            if (dst == this._bubbleHero) {
                this.gameState = GameState.END;
            }
            else if (src == this._bubbleHero) {
                this._gameUI.showKillTip(src.name, dst.name);
                this.playEmotionAnim();
            }
            else {
                this._gameUI.showKillTip(src.name, dst.name);
            }
        }
        onRefreshRankList(...data) {
            this._gameUI.updateRankList(...data);
        }
        onEat(src, dst) {
            if (src == this._bubbleHero) {
                this._gameUI.showTotalScore(this._bubbleHero.eatBeans);
            }
        }
        startMatch() {
            console.log("开始匹配玩家");
        }
        startCountDown() {
            return __awaiter(this, void 0, void 0, function* () {
                this.leftTime = GameControl.TotalTime;
                while (this.leftTime > 0 && this.gameState == GameState.START) {
                    yield GameUtil.wait(1000);
                    if (!this.enabled)
                        break;
                    this.leftTime -= 1;
                }
                this.gameState = GameState.END;
            });
        }
        showGameResult() {
            let attacker = this._bubbleHero.attacker ? this._bubbleHero.attacker.bubbleName : null;
            this._gameResultUI.show(this._bubbleHero.rank, this._bubbleHero.eatBeans, attacker);
        }
        set leftTime(value) {
            this._leftTime = Math.max(value, 0);
            this._gameUI.labelTime.text = GameUtil.fmtTime(this._leftTime);
        }
        get leftTime() {
            return this._leftTime;
        }
        set gameState(value) {
            if (this._gameState == value)
                return;
            let preState = this._gameState;
            this._gameState = value;
            this.onGameStateChange(preState, value);
        }
        get gameState() {
            return this._gameState;
        }
        onGameStateChange(pre, now) {
            if (now == GameState.MATCH) {
                this.startMatch();
            }
            else if (now == GameState.START) {
                this.startCountDown();
            }
            else if (now == GameState.END) {
                this.showGameResult();
            }
        }
        playEmotionAnim() {
            if (Math.random() * 100 > 30)
                return;
            console.log("播放表情动画");
            let list = [1, 10, 11, 13, 15, 16, 17, 18, 19, 2, 21, 23, 27, 4, 8, 9];
            let idx = Math.floor(Math.random() * list.length);
            this._emotionAnim.loadAnimation(ResData.getEmotionRes(list[idx]), Laya.Handler.create(this, this.onLoadAnimComplete), ResData.RES_ATLAS_EMOTION);
        }
        onLoadAnimComplete() {
            let bound = this._emotionAnim.getGraphicBounds();
            this.owner.addChild(this._emotionAnim);
            this._emotionAnim.pivot(bound.x + bound.width / 2, bound.y + bound.height / 2);
            this._emotionAnim.pos(Laya.stage.width / 2, 100);
            this._emotionAnim.autoPlay = true;
            Laya.timer.once(1500, this, this.stopEmotionAnim);
        }
        stopEmotionAnim() {
            this._emotionAnim.clear();
            this._emotionAnim.removeSelf();
        }
    }
    GameControl.TouchThreshold = 10;
    GameControl.TotalTime = 1 * 60;
    var GameState;
    (function (GameState) {
        GameState[GameState["MATCH"] = 0] = "MATCH";
        GameState[GameState["START"] = 1] = "START";
        GameState[GameState["END"] = 2] = "END";
    })(GameState || (GameState = {}));

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("common/ScaleButton.ts", ScaleButton);
            reg("Launch.ts", Launch);
            reg("common/Resize.ts", Resize);
            reg("GameUI.ts", GameUI);
            reg("GameResultUI.ts", GameResultUI);
            reg("GameControl.ts", GameControl);
        }
    }
    GameConfig.width = 720;
    GameConfig.height = 1280;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "bubble/LaunchScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.stage.bgColor = '#eeeeee';
            Laya.stage.frameRate = Laya.Stage.FRAME_SLOW;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
//# sourceMappingURL=bundle.js.map
