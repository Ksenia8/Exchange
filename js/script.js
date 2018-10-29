window.addEventListener("load", function () {
    "use strict";

    const URL = `https://www.cbr-xml-daily.ru/daily_json.js`;

    const request = new XMLHttpRequest();

    request.open("GET", URL);

    request.send();

    request.addEventListener("load", function () {
        if (request.status === 200) {

            let data = JSON.parse(request.responseText);

            let users = new Table({
                tableClass: "table table-bordered table-hover"
            });

            let usersContainer = document.querySelector("#users");

            users.addHeadingsRow("Название", "Код", "Курс к рублю");
            users.addRow(data.Valute.USD.CharCode, data.Valute.USD.NumCode, data.Valute.USD.Value);
            users.addRow(data.Valute.EUR.CharCode, data.Valute.EUR.NumCode, data.Valute.EUR.Value);
            users.addRow(data.Valute.GBP.CharCode, data.Valute.GBP.NumCode, data.Valute.GBP.Value);
            users.addRow(data.Valute.CNY.CharCode, data.Valute.CNY.NumCode, data.Valute.CNY.Value);
            users.addRow(data.Valute.JPY.CharCode, data.Valute.JPY.NumCode, data.Valute.JPY.Value);


            usersContainer.innerHTML = users.generate();

        } else {
            alert("Не удалось получить данные на сервере!");
        }
    });

});