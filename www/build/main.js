webpackJsonp([0],{

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(219);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, socket, storage, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.socket = socket;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.hexColor = "#00cc00";
        this.setData();
        // this.socket.connect();
        this.socket.on('dictexport', function (data) {
            _this.data = data;
            _this.setData();
            _this.storage.set('dict1', data);
        });
    }
    HomePage.prototype.checkAnswer = function (event) {
        var _this = this;
        var optionA = document.getElementById("buttonA");
        var optionB = document.getElementById("buttonB");
        var optionC = document.getElementById("buttonC");
        var optionD = document.getElementById("buttonD");
        var answer = event.target.innerHTML;
        if (answer !== this.correctAnswer) {
            this.currentWord.mistakes += 1;
            this.storage.set('dict1', { wordObjectArray: this.data });
            this.storage.get('dict1').then(function (val) {
                console.log(val);
            });
        }
        var allOptions = [optionA, optionB, optionC, optionD];
        var arrayWithWrongAnswers = [];
        allOptions.forEach(function (option) {
            // nimmt den Text des ersten Kindelements (span) und gleicht in mit der Antwort ab
            // Button ist immer großgeschrieben...
            if (option.innerText !== _this.correctAnswer.toUpperCase()) {
                arrayWithWrongAnswers.push(option);
            }
        });
        arrayWithWrongAnswers.forEach(function (option) {
            option.setAttribute("style", "background-color: #ff0000");
        });
        setTimeout(function () {
            optionA.setAttribute("style", "background-color:" + _this.hexColor);
            optionB.setAttribute("style", "background-color:" + _this.hexColor);
            optionC.setAttribute("style", "background-color:" + _this.hexColor);
            optionD.setAttribute("style", "background-color:" + _this.hexColor);
            _this.setAnswers();
        }, 1000);
        // document.getElementById("button1").innerHTML = "somethings";
    };
    HomePage.prototype.setQuestionAndAnswers = function (questionWord, tooltip, answerA, answerB, answerC, answerD) {
        document.getElementById("questionDiv").innerHTML = questionWord;
        document.getElementById("tooltipDiv").innerHTML = tooltip;
        document.getElementById("buttonA").innerHTML = answerA;
        document.getElementById("buttonB").innerHTML = answerB;
        document.getElementById("buttonC").innerHTML = answerC;
        document.getElementById("buttonD").innerHTML = answerD;
    };
    HomePage.prototype.sendData = function () {
        var _this = this;
        this.sendToast = this.toastCtrl.create({
            message: 'Daten erfolgreich gesendet',
            duration: 1500,
            position: 'bottom'
        });
        this.storage.get('dict1').then(function (val) {
            // this.socket.connect();
            _this.socket.emit('ocha', val);
            console.log("lolglgologlgolgo");
        });
        this.sendToast.present();
    };
    // statt ngOnInit(): void
    HomePage.prototype.getData = function () {
        this.getToast = this.toastCtrl.create({
            message: 'Daten erfolgreich geladen',
            duration: 1500,
            position: 'bottom'
        });
        // const socket = socketIo('192.168.178.28:3000');
        // this.socket.connect();
        this.socket.emit('ocha', 'getData');
        this.getToast.present();
    };
    HomePage.prototype.setData = function () {
        var _this = this;
        this.storage.get('dict1').then(function (val) {
            if (val === null || val.length < 1)
                return;
            _this.data = val["wordObjectArray"];
            console.log(_this.data);
            _this.setAnswers();
        });
    };
    HomePage.prototype.setAnswers = function () {
        if (this.data.length < 4) {
            console.log("Weniger als 4 Wörter");
            return;
        }
        var randomNumberInArray = Math.floor(Math.random() * (this.data.length - 1));
        var randomOption = this.data[randomNumberInArray];
        this.currentWord = randomOption;
        var questionWord = randomOption.word;
        var tooltip = randomOption.tooltip;
        this.correctAnswer = randomOption.translation[0];
        var wrongAnswer = [];
        for (var i = 0; i < 3; i++) {
            var randomNumber = Math.floor(Math.random() * (this.data.length - 1));
            while (randomNumberInArray === randomNumber) {
                randomNumber = Math.floor(Math.random() * (this.data.length - 1));
            }
            wrongAnswer.push(this.data[randomNumber].translation[0]);
        }
        var positionForCorrectAnswer = Math.floor(Math.random() * 4);
        wrongAnswer.splice(positionForCorrectAnswer, 0, this.correctAnswer);
        this.setQuestionAndAnswers(questionWord, tooltip, wrongAnswer[0], wrongAnswer[1], wrongAnswer[2], wrongAnswer[3]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Development\Workspace\Ocha\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      Ocha\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-menu [content]="mycontent">\n\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>\n        Menu\n      </ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n\n    <ion-list>\n      <button ion-item (click)="getData()">\n        <ion-icon name="cloud-download" item-start></ion-icon>\n        Load Data\n      </button>\n      <button ion-item (click)="sendData()">\n        <ion-icon name="cloud-upload" item-start></ion-icon>\n        Send Data\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-content padding #mycontent>\n  <ion-grid id="outerGrid">\n    <ion-row justify-content-center align-items-center>\n      <ion-grid id="innerGrid">\n        <ion-row justify-content-center>\n          <div id="questionDiv">\n            Bitte lade eine Datenquelle über das Menü\n          </div>\n        </ion-row>\n        <ion-row justify-content-center>\n          <div id="tooltipDiv">\n            Ocha by Fynn Grandke\n          </div>\n        </ion-row>\n      </ion-grid>\n    </ion-row>\n    <ion-row>\n      <button ion-button full large id="buttonA" [style.background-color]="hexColor" (click)="checkAnswer($event)">A</button>\n      <button ion-button full large id="buttonB" [style.background-color]="hexColor" (click)="checkAnswer($event)">B</button>\n      <button ion-button full large id="buttonC" [style.background-color]="hexColor" (click)="checkAnswer($event)">C</button>\n      <button ion-button full large id="buttonD" [style.background-color]="hexColor" (click)="checkAnswer($event)">D</button>\n    </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"C:\Development\Workspace\Ocha\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(243);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng_socket_io__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var config = { url: 'http://192.168.178.28:3000', options: {} };
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_8_ng_socket_io__["SocketIoModule"].forRoot(config),
                __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        }),
        __metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Development\Workspace\Ocha\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Development\Workspace\Ocha\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 315:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[220]);
//# sourceMappingURL=main.js.map