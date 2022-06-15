import express from "express";

const server = express();

const holidays = [
  { date: "1/1/2022", name: "Confraternização mundial" },
  { date: "1/3/2022", name: "Carnaval" },
  { date: "4/17/2022", name: "Páscoa" },
  { date: "4/21/2022", name: "Tiradentes" },
  { date: "5/1/2022", name: "Dia do trabalho" },
  { date: "6/16/2022", name: "Corpus Christi" },
  { date: "9/7/2022", name: "Independência do Brasil" },
  { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2022", name: "Finados" },
  { date: "11/15/2022", name: "Proclamação da República" },
  { date: "12/25/2022", name: "Natal" }
];

server.get("/holidays", (_, response) => {
  response.send(holidays);
});

server.get("/is-today-holiday", (_, response) => {
  const today = new Date();

  let message = "Não, hoje não é feriado";

  for(const holiday of holidays) {
    if(holiday.date === today.toLocaleDateString()) {
      message = `Sim, hoje é ${holiday.name}`;
      break;
    }
  }

  response.send(message);
});

server.get("/holidays/:month", (request, response) => {
  const month = request.params.month;
  const monthHolidays = [];

  for(const holiday of holidays) {
    const separadedDate = holiday.date.split("/");

    if(Number(separadedDate[0]) === Number(month)) {
      monthHolidays.push(holiday);
    }
  }

  response.send(monthHolidays);
});

server.listen(4000);