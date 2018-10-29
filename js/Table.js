"use strict";
function Table (options) {
    // будем хранить данные таблицы в виде массива строк
    // каждая из строк тоже будет представлена массивом, в котором
    // будут закодирован ячейки в виде объекта
    // у каждого объекта с ячейкой будет указан тип ячейки (данные или заголовок) и значение
    this.rows = [];

    // если переменная - НЕ объект
    if (typeof options !== "object") {
        // то сделаем её пустым объектом
        options = {};
    }

    if (typeof options.tableClass !== "undefined") {
        this.tableClass = options.tableClass;
    } else {
        this.tableClass = "";
    }

    if (typeof options.openTableTag !== "undefined") {
        this.openTableTag = options.openTableTag;
    } else {
        this.openTableTag = "<table class='" + this.tableClass + "'>";
    }

    if (typeof options.closeTableTag !== "undefined") {
        this.closeTableTag = options.closeTableTag;
    } else {
        this.closeTableTag = "</table>";
    }

    if (typeof options.openRowTag !== "undefined") {
        this.openRowTag = options.openRowTag;
    } else {
        this.openRowTag = "<tr>";
    }

    if (typeof options.closeRowTag !== "undefined") {
        this.closeRowTag = options.closeRowTag;
    } else {
        this.closeRowTag = "</tr>";
    }

    if (typeof options.openCellTag !== "undefined") {
        this.openCellTag = options.openCellTag;
    } else {
        this.openCellTag = "<td>";
    }

    if (typeof options.closeCellTag !== "undefined") {
        this.closeCellTag = options.closeCellTag;
    } else {
        this.closeCellTag = "</td>";
    }

    if (typeof options.openHeadingTag !== "undefined") {
        this.openHeadingTag = options.openHeadingTag;
    } else {
        this.openHeadingTag = "<th>";
    }

    if (typeof options.closeHeadingTag !== "undefined") {
        this.closeHeadingTag = options.closeHeadingTag;
    } else {
        this.closeHeadingTag = "</th>";
    }

};


// эта функция добавляет строку в таблицу
// для каждой ячейки указывает cellType
// а сами ячейки должны быть переданы через второй аргумент cell
Table.prototype.addCells = function (cellType, cells) {
    var row = [];

    for (var i=0; i<cells.length; i++) {
        // создаем объект из двух свойств
        var cell = {
            value: cells[i],
            type: cellType
        };

        // добавляем объект в массив с данными одной строки
        row.push(cell);
    }

    // строку добавляем в массив строк
    this.rows.push(row);
};


// эта функция будет добавлять в таблицу строку с заголовками
Table.prototype.addHeadingsRow = function () {
    this.addCells("heading", arguments);
};


// обычная строка с данными
Table.prototype.addRow = function () {
    this.addCells("data", arguments);
};

Table.prototype.generate = function () {
    var html = this.openTableTag;

    // this.rows - это массив строк, каждый элемент в нём - это тоже массив
    for (var i=0; i<this.rows.length; i++) {
        var row = this.rows[i];

        html += this.openRowTag;

        for (var j=0; j<row.length; j++) {
            var cell = row[j];

            if (cell.type === "heading") {
                html += this.openHeadingTag;
            } else {
                html += this.openCellTag;
            }

            html += cell.value;

            if (cell.type === "heading") {
                html += this.closeHeadingTag;
            } else {
                html += this.closeCellTag;
            }
        }

        html += this.closeRowTag;
    }

    html += this.closeTableTag;

    return html;
};
