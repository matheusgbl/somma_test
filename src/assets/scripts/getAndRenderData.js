import {
  createInfoParagraph,
  createCard,
} from "../../utils/createHTMLElements.js";
import {
  loginURL,
  assessmentListURL,
  assessmentDataURL,
} from "../../utils/endpoints.js";
import { formatDate } from "../../utils/formatDate.js";

let dataList;
let dataInfo;

const login = () => {
  $.ajax({
    type: "POST",
    url: loginURL,
    data: {
      user: "teste",
      pass: "ug235235",
    },
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      localStorage.setItem("token", response.TOKEN);
      alert("Login realizado com sucesso!");
    },
  });
};

if (localStorage.getItem("token") === null) {
  login();
}

const getListAPI = () => {
  return $.ajax({
    type: "GET",
    url: assessmentListURL,
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      localStorage.getItem("token");
      dataList = response.DADOS;
    },
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbnN0aXR1dGlvbiI6MTEzOSwic3ViIjoicm9ueSIsImFjY2VzcyI6MjIxNDk3MCwiYWdlbmN5IjoxOSwiZXhwIjoxNjcwNzI0MzM1LCJ1c2VySWQiOjExNDcsImF1dGhvcml0aWVzIjpbIlJPTEVfQUNUVUFUT1IiLCJST0xFX1BBVFRFUk5TIl19.wSunuaC6iQkxEFcckDGzE3lFeI2lQXnFffy0FZWK8V-5945z1GMHzeeqknWajiT-F0wKlKKBZ7phfBBaLTfREA"
      );
    },
  });
};

const getDataAPI = () => {
  return $.ajax({
    type: "GET",
    url: assessmentDataURL,
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      localStorage.getItem("token");
      dataInfo = response.DADOS;
    },
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbnN0aXR1dGlvbiI6MTEzOSwic3ViIjoicm9ueSIsImFjY2VzcyI6MjIxNDk3MCwiYWdlbmN5IjoxOSwiZXhwIjoxNjcwNzI0MzM1LCJ1c2VySWQiOjExNDcsImF1dGhvcml0aWVzIjpbIlJPTEVfQUNUVUFUT1IiLCJST0xFX1BBVFRFUk5TIl19.wSunuaC6iQkxEFcckDGzE3lFeI2lQXnFffy0FZWK8V-5945z1GMHzeeqknWajiT-F0wKlKKBZ7phfBBaLTfREA"
      );
    },
  });
};

const getListData = async () => {
  try {
    await getListAPI();
  } catch (error) {
    console.log("something failed", error);
  }
};

const getDataInfo = async () => {
  try {
    await getDataAPI();
  } catch (error) {
    console.log("something failed", error);
  }
};

await getListData();
await getDataInfo();

const buildHTML = () => {
  const dataListCol = dataList.colunas;
  const dataListColClass = dataList.colunas_classe;

  const registerDate = formatDate(dataInfo.date_inc);
  const updateDate = formatDate(dataInfo.date_upd);

  createInfoParagraph("Dados empresariais");
  createCard(dataListCol.nome, dataInfo.nome);
  createCard(dataListCol.cnpj, dataInfo.cnpj);
  createCard(dataListColClass.endereco, dataInfo.endereco);

  createInfoParagraph("Datas");
  createCard(dataListColClass.date_inc, registerDate);
  createCard(dataListColClass.date_upd, updateDate);

  createInfoParagraph("Informações gerais");
  createCard(dataListColClass.custodia, dataInfo.custodia);
  createCard(dataListColClass.administrador, dataInfo.administrador);
  createCard(dataListColClass.gestor, dataInfo.gestor);
  createCard(dataListColClass.tipo_cliente, dataInfo.tipo_cliente);

  createInfoParagraph("Informações financeiras");
  createCard(dataListColClass.consolidar, dataInfo.consolidar);
  createCard(dataListColClass.benchmark, dataInfo.benchmark);
  createCard(dataListColClass.grafico_pataporte, dataInfo.grafico_pataporte);
  createCard(dataListColClass.indicadores, dataInfo.indicadores);
  createCard(dataListColClass.indicadoresmercado, dataInfo.indicadoresmercado);
  createCard(dataListColClass.inirent, dataInfo.inirent);
  createCard(dataListColClass.isentoir, dataInfo.isentoir);
  createCard(dataListColClass.isin, dataInfo.isin);
  createCard(dataListColClass.limites, dataInfo.limites);
  createCard(dataListColClass.maximorat, dataInfo.maximorat);
  createCard(dataListColClass.rentcarteira, dataInfo.rentcarteira);
  createCard(dataListColClass.segmento_okr, dataInfo.segmento_okr);
  createCard(dataListColClass.valores, dataInfo.valores);
  createCard(dataListColClass.sigla, dataInfo.sigla);
  createCard(dataListColClass.tipo_indice, dataInfo.tipo_indice);

  createInfoParagraph("Informações adicionais");
  createCard(dataListColClass.paginas_gerador, dataInfo.paginas_gerador);
  createCard(dataListColClass.rentpainel, dataInfo.rentpainel);
  createCard(dataListColClass.rvpg1, dataInfo.rvpg1);
  createCard(dataListColClass.meta, dataInfo.meta);
  createCard(dataListColClass.inicio, dataInfo.inicio);

  createCard(dataListColClass.validadorignorar, dataInfo.validadorignorar);
  createCard(dataListColClass.xml, dataInfo.xml);
};

buildHTML();
