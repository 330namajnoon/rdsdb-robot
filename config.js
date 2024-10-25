const SERVER_PORT = 4000;

const USER = {
    email: "sina.majnoon@digimobil.es",
    password: "Sinmaj.2024",
}

const digiAcountSecretCode = "G7CSZ4KXN6RUK434";
const authSecretCode = "W35NA2V3WAZRZNN2";


const es = {
    rdsdbURL: "https://rdsdb-dev.digimobil.es:8443/",
}

const pt = {
    rdsdbURL: "https://rdsdb-dev.digi.pt:8443/",
}

module.exports = {SERVER_PORT, USER, authSecretCode, digiAcountSecretCode, es, pt };