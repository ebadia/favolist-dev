"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var status;
(function (status) {
    status["PENDING"] = "PENDING";
    status["ORDERING"] = "ORDERING";
    status["RECEIVED"] = "RECEIVED";
    status["OPENED"] = "OPENED";
    status["READY"] = "READY";
})(status = exports.status || (exports.status = {}));
var place;
(function (place) {
    place["TEL"] = "TEL";
    place["APP"] = "APP";
    place["SHOP"] = "SHOP";
})(place = exports.place || (exports.place = {}));
var roles;
(function (roles) {
    roles["ADMIN"] = "ADMIN";
    roles["BUYER"] = "BUYER";
    roles["SELLER"] = "SELLER";
})(roles = exports.roles || (exports.roles = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["monday"] = 0] = "monday";
    DayOfWeek[DayOfWeek["tuesday"] = 1] = "tuesday";
    DayOfWeek[DayOfWeek["wednesday"] = 2] = "wednesday";
    DayOfWeek[DayOfWeek["thursday"] = 3] = "thursday";
    DayOfWeek[DayOfWeek["friday"] = 4] = "friday";
    DayOfWeek[DayOfWeek["saturday"] = 5] = "saturday";
    DayOfWeek[DayOfWeek["sunday"] = 6] = "sunday";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
//# sourceMappingURL=enums.js.map