require('dotenv').config()
const axios = require('axios')

const { APPID, Q, URL_BASE, URL_GEO, UNITS, IDIOMA } = process.env

const url_geo = `${URL_GEO}?q=${Q}&appid=${APPID}`
const obterCoordenadas = async () => {
    const resultado = await axios.get(url_geo)
    const lat = resultado.data[0].lat
    const lon = resultado.data[0].lon
    const url = `${URL_BASE}?appid=${APPID}&lat=${lat}&lon=${lon}&units=${UNITS}&lang=${IDIOMA}`
    console.log(`Cidade:${Q}, Latitude: ${lat}, Longitude: ${lon}`)
    return url
}

obterCoordenadas()
.then(url => {
    axios.get(url)
        .then(res => {
            const feels_like = res.data.list[0].main.feels_like
            const description = res.data.list[0].weather[0].description
            console.log(`Sensação térmica: ${feels_like}°C'`);
            console.log(`Descrição: ${description}`);
            return res
        })
})
