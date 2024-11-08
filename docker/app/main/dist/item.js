"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    say(elem) {
        if (elem) { // 引数がnullでない場合
            elem.innerHTML = '書名：' + this.name + '  価格: ' + this.price + '円です';
        }
    }
}
exports.Item = Item;
