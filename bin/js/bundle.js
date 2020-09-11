(function () {
    'use strict';

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
                this._anim.pivot(bound.x + bound.width / 2, bound.y + bound.height / 2);
                let scale = Math.min(50 / bound.width, 50 / bound.height);
                this._anim.scale(0.3, 0.3);
                this._anim.pos(25, 25);
            }), "res/atlas/chat/emoji.atlas");
            this._anim.autoPlay = true;
            this._bubbleSp.addChild(this._anim);
            this.drawMove(25, 25, 25, 50);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
            this.initItems();
            this.drawCircle(300, 200, 50, 60);
            this.drawCircleEx(800, 400, 40, 60, 0);
            let targetRotation = Math.atan2(200 - 100, 100 - 200) * 180 / Math.PI;
            console.log("target r " + targetRotation);
            targetRotation = Math.atan2(100 - 200, 100 - 200) * 180 / Math.PI;
            console.log("target r " + targetRotation);
            this._sp.rotation = 348;
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
            let targetRotation = Math.atan2(this.curMouseY - this.lastMousePosY, this.curMouseX - this.lastMousePosX) * 180 / Math.PI;
            if (Math.abs(targetRotation - this._sp.rotation) > 10 && Math.abs(targetRotation - this._sp.rotation) < 90) {
                let tmp = targetRotation;
                targetRotation = targetRotation > this._sp.rotation ? this._sp.rotation + 10 : this._sp.rotation - 10;
            }
            this._sp.rotation = targetRotation;
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
            reg("test.ts", test);
        }
    }
    GameConfig.width = 1280;
    GameConfig.height = 720;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test.scene";
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
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.stage.bgColor = '#eeeeee';
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
