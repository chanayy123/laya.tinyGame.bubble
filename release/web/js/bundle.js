(function () {
    'use strict';

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
        static tween() {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("----------tween-------------");
                while (true) {
                    yield this.wait(1000);
                    console.log("当前时间戳: " + new Date().getTime());
                }
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

    class Bubble extends Laya.Sprite {
        constructor() {
            super();
            this._moveSpeed = 10;
            this._state = BubbleState.INVALID;
        }
        init(size, skin, isAI) {
            this._shapeSp = this._shapeSp || new Laya.Sprite();
            this.addChild(this._shapeSp);
            this.initStar(skin);
            this._initBubbleSize = size;
            this._visionRange = Laya.stage.width;
            this._skinIndex = skin;
            this._isAI = isAI;
            this._eatBeans = 0;
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
        get visionRange() {
            return this._visionRange;
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
        get bubbleSize() {
            return this._bubbleSize;
        }
        set eatBeans(value) {
            this._eatBeans = value;
            this.level = Math.floor(value / Bubble.AddLevelByBeans);
        }
        get eatBeans() {
            return this._eatBeans;
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
            if (this.State == value)
                return;
            if (this._state == BubbleState.INVALID && value == BubbleState.NORMAL) {
                this._curShape = this._normalShape;
                this.draw(this._normalShape);
            }
            else {
                this.checkTransformShape(this.getShape(this._state), this.getShape(value), Bubble.TransformTime, this.getEaseFun(this._state, value));
            }
            this.onStateChange(this.State, value);
            this._state = value;
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
                if (!this._isAI)
                    return;
                while (this.displayedInStage) {
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
            console.log(`玩家【${this.name}】击杀了玩家【${b.name}】`);
            b.State = BubbleState.DEAD;
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
            this._bubbleList = [];
        }
        static get Instance() {
            if (GameMap._instance == null) {
                GameMap._instance = new GameMap();
            }
            return this._instance;
        }
        init(w, h) {
            Laya.stage.addChild(this);
            this.size(w, h);
            this._boundary = new Laya.Point();
            this._boundary.x = Math.ceil(this.width / GameMap.GridSize) * GameMap.GridSize;
            this._boundary.y = Math.ceil(this.height / GameMap.GridSize) * GameMap.GridSize;
            this._emotionAnim = new Laya.Animation();
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
                        this._bubbleHero.kill(b);
                        this._delBubbleList.push(b);
                        this.delBubbleIcon(b);
                    }
                    else if (this._bubbleHero.level < b.level) {
                        b.kill(this._bubbleHero);
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
                            b.kill(b2);
                            this._delBubbleList.push(b2);
                            this.delBubbleIcon(b2);
                        }
                        else if (b.level < b2.level) {
                            b2.kill(b);
                            this._delBubbleList.push(b);
                            this.delBubbleIcon(b);
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
                    this._bubbleHero.eat(obs);
                    this.playEmotionAnim();
                    this._delObstacleList.push(obs);
                }
                for (let j = 0; j < bCount; ++j) {
                    let b = this._bubbleAIList[j];
                    if (GameUtil.powerDistance(b.x, b.y, obs.x, obs.y) <= Math.pow(b.bubbleSize / 2 + obs.obsSize / 2 + 5, 2)) {
                        b.eat(obs);
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
        }
        delBubbleIcon(b) {
            this._bubbleIconMap.get(b).removeSelf();
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
                ai.name = `路人${i}号`;
                ai.bubbleRotation = rotation;
                ai.pos(posX, posY);
                ai.setMoveBoundary(this._boundary.x, this._boundary.y);
                this._bubbleAIList.push(ai);
                this.addChild(ai);
                ai.startAILogic();
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
            for (let i = 0; i < GameMap.OBS_NUM; ++i) {
                let size = GameMap.GridSize + Math.floor(Math.random() * GameMap.GridSize);
                let skinIdx = Math.floor(Math.random() * 8);
                let x = size + Math.random() * (this._boundary.x - 2 * size);
                let y = size + Math.random() * (this._boundary.y - 2 * size);
                let obs = ObstacleFactory.Create(skinIdx, size, 1);
                this._obstacleList.push(obs);
                obs.pos(x, y);
                this.addChild(obs);
            }
        }
        playEmotionAnim() {
            if (Math.random() * 100 > 30)
                return;
            let list = [1, 10, 11, 13, 15, 16, 17, 18, 19, 2, 21, 23, 27, 4, 8, 9];
            let idx = Math.floor(Math.random() * list.length);
            this._emotionAnim.loadAnimation(ResData.getEmotionRes(list[idx]), Laya.Handler.create(this, this.onLoadAnimComplete), ResData.RES_ATLAS_EMOTION);
        }
        onLoadAnimComplete() {
            let bound = this._emotionAnim.getGraphicBounds();
            Laya.stage.addChild(this._emotionAnim);
            this._emotionAnim.pivot(bound.x + bound.width / 2, bound.y + bound.height / 2);
            this._emotionAnim.pos(Laya.stage.width / 2, 100);
            this._emotionAnim.autoPlay = true;
            Laya.timer.once(1500, this, this.stopEmotionAnim);
        }
        stopEmotionAnim() {
            this._emotionAnim.clear();
            this._emotionAnim.removeSelf();
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
    }
    GameMap.GridSize = 30;
    GameMap.IconSize = 20;
    GameMap.LineColor = '#000000';
    GameMap.MAP_WIDTH = 2048;
    GameMap.MAP_HEIGHT = 2048;
    GameMap.AI_NUM = 10;
    GameMap.OBS_NUM = 100;

    class GameControl extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
            Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
            this.initMap();
        }
        onDisable() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
            Laya.stage.off(Laya.Event.RESIZE, this, this.onResize);
        }
        onResize() {
            console.log("舞台宽高: " + Laya.stage.width + " " + Laya.stage.height);
        }
        onMouseMove() {
        }
        onTouchDown() {
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
            this._lastMousePosX = Laya.stage.mouseX;
            ;
            this._lastMousePosY = Laya.stage.mouseY;
            this._bubbleHero.startMove(this._map.mouseX, this._map.mouseY);
        }
        onTouchMove() {
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
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
            this._bubbleHero.stopMove();
        }
        onUpdate() {
            this._map.update();
        }
        initMap() {
            this._map = GameMap.Instance;
            this._map.init(GameMap.MAP_WIDTH, GameMap.MAP_HEIGHT);
            this._bubbleHero = BubbleFactory.Create(Bubble.InitSize, 0, false);
            this._bubbleHero.name = "普拉斯";
            this._bubbleHero.pos(Laya.stage.width / 2, Laya.stage.height / 2);
            this._map.addHero(this._bubbleHero);
        }
    }
    GameControl.TouchThreshold = 8;

    class test extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this._offset = 50;
            this._curRotation = 0;
        }
        onEnable() {
            console.log("enable script");
            this._bubbleSp = new Laya.Sprite();
            this._bubbleSp.size(50, 50);
            this._bubbleSp.pivot(25, 25);
            this.owner.addChild(this._bubbleSp);
            this._sp = new Laya.Sprite();
            this._sp.size(50, 50);
            this._sp.pivot(25, 25);
            this._sp.pos(25, 25);
            this._bubbleSp.addChild(this._sp);
            this._bubbleSp.pos(200, 100);
            this._graphic = this._sp.graphics;
            this._anim = new Laya.Animation();
            this._anim.loadAnimation("chat/anim/emoji_1.ani", Laya.Handler.create(this, () => {
                let bound = this._anim.getGraphicBounds();
                this._bubbleSp.addChild(this._anim);
                this._anim.pivot(bound.x + bound.width / 2, bound.y + bound.height / 2);
                let scale = Math.min(50 / bound.width, 50 / bound.height);
                this._anim.scale(0.3, 0.3);
                this._anim.pos(25, 25);
                this._anim.autoPlay = true;
            }), "res/atlas/chat/emoji.atlas");
            this.drawMove(25, 25, 25, 50);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
            this.initItems();
            this.drawCircle(300, 200, 50, 60);
            this.drawCircleEx(800, 400, 40, 60, 0);
        }
        initItems() {
            let colorList = this.gradientColors("#ff0000", "#0000ff", 100);
            this._itemList = [];
            for (let i = 0; i < 100; ++i) {
                let size = 5 + Math.floor(Math.random() * 10);
                let colorIdx = 1 + Math.floor(Math.random() * colorList.length - 2);
                let x = Math.random() * Laya.stage.width;
                let y = Math.random() * Laya.stage.height;
                let sp = new Laya.Sprite();
                sp.size(size, size);
                sp.pivot(size / 2, size / 2);
                sp.graphics.drawCircle(size / 2, size / 2, size / 2, colorList[colorIdx]);
                this._itemList.push(sp);
                sp.pos(x, y);
                Laya.stage.addChild(sp);
            }
        }
        onTouchDown() {
            this.drawMove(25, 25, 25, this._offset);
            this.lastMousePosX = Laya.stage.mouseX;
            this.lastMousePosY = Laya.stage.mouseY;
            this._sp.rotation = Math.atan2(this.lastMousePosY - this._bubbleSp.y, this.lastMousePosX - this._bubbleSp.x) * 180 / Math.PI;
            this._curRotation = this._sp.rotation;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
            Laya.timer.loop(30, this, this.onBallMove);
        }
        onTouchMove() {
            this.curMouseX = Laya.stage.mouseX;
            this.curMouseY = Laya.stage.mouseY;
            let deltaX = this.curMouseX - this.lastMousePosX;
            let deltaY = this.curMouseY - this.lastMousePosY;
            let len = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
            if (len <= Math.pow(8, 2))
                return;
            let targetRotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            let targetR = Math.floor(targetRotation * 10) * 0.1;
            this._sp.rotation = targetR;
            this.lastMousePosX = this.curMouseX;
            this.lastMousePosY = this.curMouseY;
        }
        onTouchUp() {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
            Laya.timer.clear(this, this.onBallMove);
            this.tweenNormal();
        }
        playScaleAnim() {
            Laya.Tween.clearAll(this._sp);
            this._sp.scale(1, 1);
            Laya.Tween.from(this._sp, { scaleX: 1.3, scaleY: 0.7 }, 500, Laya.Ease.backOut);
            let list = [1, 10, 11, 13, 15, 16, 17, 18, 19, 2, 21, 23, 27, 4, 8, 9];
            let idx = Math.floor(Math.random() * list.length);
            this._anim.loadAnimation(`chat/anim/emoji_${list[idx]}.ani`, null, "res/atlas/chat/emoji.atlas");
        }
        tweenNormal() {
            Laya.timer.loop(30, this, this._doTweenNormal);
        }
        _doTweenNormal() {
            this._offset -= 10;
            let flag = this.drawMove(25, 25, 25, this._offset);
            if (!flag) {
                Laya.timer.clear(this, this._doTweenNormal);
                this._offset = 50;
            }
        }
        resetNormal() {
            this.drawMove(25, 25, 25, 0);
        }
        onBallMove() {
            var speed = 5;
            var radians = this._sp.rotation * Math.PI / 180;
            var xOffset = Math.cos(radians) * speed;
            var yOffset = Math.sin(radians) * speed;
            this._bubbleSp.x += xOffset;
            this._bubbleSp.y += yOffset;
            let delList = [];
            for (let item in this._itemList) {
                let sp = this._itemList[item];
                if (this.powDistance(this._bubbleSp.x, this._bubbleSp.y, sp.x, sp.y) <= Math.pow(sp.width / 2 + this._sp.width / 2 + 5, 2)) {
                    delList.push(sp);
                    sp.removeSelf();
                    this.playScaleAnim();
                }
            }
            delList.forEach(element => {
                let index = this._itemList.indexOf(element);
                index != -1 && this._itemList.splice(index, 1);
            });
        }
        powDistance(x1, y1, x2, y2) {
            return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
        }
        drawMove(centerX, centerY, rad, offset) {
            var points = 512;
            var twoPi = 2 * Math.PI;
            var ptList = [];
            var theta = -Math.PI * 2 / 3;
            var x0, y0;
            x0 = centerX + rad * Math.cos(theta);
            y0 = centerY + rad * Math.sin(theta);
            let flag;
            if (offset > rad / 2) {
                for (var i = 0; i < points * 2 / 3; i++) {
                    theta += twoPi / points;
                    let x = centerX + rad * Math.cos(theta) - x0;
                    let y = centerY + rad * Math.sin(theta) - y0;
                    ptList.push(x);
                    ptList.push(y);
                }
                let x1 = ptList[ptList.length - 2] + x0;
                let y1 = ptList[ptList.length - 1] + y0;
                let x3 = ptList[0] + x0;
                let y3 = ptList[1] + y0;
                let x2 = x1 - offset;
                let y2 = (y1 + y3) / 2;
                for (let i = 0; i <= points / 3; ++i) {
                    let percent = i / (points / 3);
                    let x = this.getBezieratX(x1, x2, x3, percent) - x0;
                    let y = this.getBezieratY(y1, y2, y3, percent) - y0;
                    ptList.push(x);
                    ptList.push(y);
                }
                flag = true;
            }
            else {
                for (var i = 0; i < points; i++) {
                    theta += twoPi / points;
                    let x = centerX + rad * Math.cos(theta) - x0;
                    let y = centerY + rad * Math.sin(theta) - y0;
                    ptList.push(x);
                    ptList.push(y);
                }
                flag = false;
            }
            this._graphic.clear();
            this._graphic.drawPoly(x0, y0, ptList, '#ff0000', '#ffff00', 2);
            return flag;
        }
        setLinePoints(iterations) {
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
        drawCircle(centerX, centerY, minRad, maxRad) {
            var points = 512;
            var rad, theta;
            var twoPi = 2 * Math.PI;
            var x0, y0;
            theta = 0;
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
            Laya.stage.graphics.drawPoly(x0, y0, ptList, '#00ff00');
        }
        drawCircleEx(centerX, centerY, minRad, maxRad, phase) {
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
            Laya.stage.graphics.drawPoly(x0, y0, ptList, '#ffff00');
        }
        getBezieratX(x0, x1, x2, t) {
            t = Math.min(t, 1);
            let target;
            target = Math.pow(1 - t, 2) * x0 + 2 * t * (1 - t) * x1 + Math.pow(t, 2) * x2;
            return target;
        }
        getBezieratY(y0, y1, y2, t) {
            t = Math.min(t, 1);
            let target;
            target = Math.pow(1 - t, 2) * y0 + 2 * t * (1 - t) * y1 + Math.pow(t, 2) * y2;
            return target;
        }
        gradientColors(start, end, steps, gamma) {
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
        parseColor(hexStr) {
            return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) { return 0x11 * parseInt(s, 16); }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) { return parseInt(s, 16); });
        }
        ;
        pad(s) {
            return (s.length === 1) ? '0' + s : s;
        }
        onDisable() {
            console.log("disable script");
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("GameControl.ts", GameControl);
            reg("test.ts", test);
        }
    }
    GameConfig.width = 720;
    GameConfig.height = 1280;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "demo.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            Config.isAntialias = true;
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
            Laya.Stat.show(0, 0);
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
