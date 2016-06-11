import _ from 'lodash';

const APPID = `c119dd9ad408c1bd020b119cd9f50180`;
const URL = `http://api.openweathermap.org/data/2.5/weather?APPID=${APPID}&`;


export default (lat,long) => {
  const QUERY = `${URL}lat=${lat}&lon=${long}`;

  return fetch(QUERY) //NEED to return the promise
    .then(response => {
      console.log('RESPONSE: ',response);
      return response.json();
    })
    .then(json => {
      console.log('JSON',json);
      return {
        city: _.capitalize(json.name),
        temp: Math.round(json.main.temp-273.15) * 1.8 + 32 + ' ˚F', //Far. temp
        description: _.capitalize(json.weather[0].description)
      };
    });
};
