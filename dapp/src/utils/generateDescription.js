import { array } from "joi";
import http from "./../services/httpService";

function getDomain(endpointAPI) {
  const domain = endpointAPI.match(/.*?:\/\/.*?\//); //[http|https]://domain/
  return domain;
}

function mapMonth(monthNumber) {
  const mapping = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  return mapping[monthNumber];
}

export default async function generateDescription(
  endpointAPI,
  authorizationHeader
) {
  const domain = getDomain(endpointAPI);
  const endpointStatementList = `${domain}api/v2/statement/`;

  const statementList = await http.get(endpointStatementList, {
    headers: { Authorization: authorizationHeader },
  });

  /*---------------------------------------Getting Number of Statements---------------------------------------*/
  const numStatements = statementList.data.length;

  /*---------------------------------------Getting Lowest and Largest Date of the Statement---------------------------------------*/
  let minDate;
  let maxDate;
  for (let i = 0; i < statementList.data.length; i++) {
    const timestamp = statementList.data[i].timestamp;
    const newTimestamp = timestamp.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})/g)[0];
    const date = new Date(newTimestamp.split("-"));
    if (i === 0) {
      minDate = date;
      maxDate = date;
    } else {
      if (date.getTime() < minDate.getTime()) {
        minDate = date;
      }
      if (date.getTime() > maxDate.getTime()) {
        maxDate = date;
      }
    }
  }

  const dates = `${mapMonth(
    minDate.getMonth()
  )} ${minDate.getFullYear()} - ${mapMonth(
    maxDate.getMonth()
  )} ${maxDate.getFullYear()}`;

  /*---------------------------------------Counting All Activities by name---------------------------------------*/
  let countNames = new Map();
  for (let i = 0; i < statementList.data.length; i++) {
    let activityName = "";
    if (
      statementList.data[i].statement.context &&
      statementList.data[i].statement.context.contextActivities &&
      statementList.data[i].statement.context.contextActivities.grouping
    ) {
      activityName =
        statementList.data[i].statement.context.contextActivities.grouping[0]
          .definition.name["en-GB"];
    }

    if (
      statementList.data[i].statement.context &&
      statementList.data[i].statement.context.contextActivities &&
      statementList.data[i].statement.context.contextActivities.parent
    ) {
      activityName =
        statementList.data[i].statement.context.contextActivities.parent[0]
          .definition.name["en-GB"];
    }

    if (activityName !== "") {
      if (countNames.has(activityName)) {
        countNames.set(activityName, countNames.get(activityName) + 1);
      } else {
        countNames.set(activityName, 1);
      }
    }
  }
  let arrayNames = Array.from(countNames.keys());
  let arrayActivities = arrayNames.map((k) => ({
    name: k,
    value: countNames.get(k),
  }));

  arrayActivities.sort((a, b) => b.value - a.value);
  arrayActivities = arrayActivities.slice(0, 10);
  arrayActivities = arrayActivities.map((o) => o.name);

  const keywordsResult = arrayActivities.reduce(
    (keywords = "", current) => `${keywords}, ${current}`
  );

  //Return the 3 values together as the "description"
  return `${numStatements} Statements | ${dates} | ${keywordsResult}`;
}
