export var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["CUSTOMER"] = "CUSTOMER";
    Role["MODERATOR"] = "MODERATOR";
})(Role || (Role = {}));
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["FULFILLED"] = "FULFILLED";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (OrderStatus = {}));
export var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["UNPAID"] = "UNPAID";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["VOIDED"] = "VOIDED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(PaymentStatus || (PaymentStatus = {}));
export var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["CARD"] = "CARD";
})(PaymentMethod || (PaymentMethod = {}));
export var DiscountEnum;
(function (DiscountEnum) {
    DiscountEnum["PERCENTAGE"] = "PERCENTAGE";
    DiscountEnum["FIXED"] = "FIXED";
    DiscountEnum["BOGO"] = "BOGO";
    DiscountEnum["BULK"] = "BULK";
})(DiscountEnum || (DiscountEnum = {}));
