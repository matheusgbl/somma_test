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
    console.log(dataList);
  } catch (error) {
    console.log("something failed", error);
  }
};

const getDataInfo = async () => {
  try {
    await getDataAPI();
    console.log(dataInfo);
  } catch (error) {
    console.log("something failed", error);
  }
};

await getListData();
await getDataInfo();

const buildCard = (text, secondText) => {
  const card = document.getElementsByClassName("card__info");
  const paragraph = document.createElement("p");
  paragraph.className = "card__text";
  if (secondText == undefined || null) {
    secondText = "Não informado ou não possui";
  }
  paragraph.innerHTML = `<span class="primary-text">${text}:</span> ${secondText}`;
  return card[0].appendChild(paragraph);
};

const createInfoParagraph = (text) => {
  const card = document.getElementsByClassName("card__info");
  const paragraph = document.createElement("p");
  paragraph.className = "card__text-info";
  paragraph.innerHTML = `${text}`;
  return card[0].insertAdjacentElement("beforeend", paragraph);
};

const buildHTML = () => {
  const dataListCol = dataList.colunas;
  const dataListColClass = dataList.colunas_classe;

  const registerDate = formatDate(dataInfo.date_inc);
  const updateDate = formatDate(dataInfo.date_upd);

  createInfoParagraph("Dados empresariais");
  buildCard(dataListCol.nome, dataInfo.nome);
  buildCard(dataListCol.cnpj, dataInfo.cnpj);
  buildCard(dataListColClass.endereco, dataInfo.endereco);

  createInfoParagraph("Datas");
  buildCard(dataListColClass.date_inc, registerDate);
  buildCard(dataListColClass.date_upd, updateDate);

  createInfoParagraph("Informações gerais");
  buildCard(dataListColClass.custodia, dataInfo.custodia);
  buildCard(dataListColClass.administrador, dataInfo.administrador);
  buildCard(dataListColClass.gestor, dataInfo.gestor);
  buildCard(dataListColClass.tipo_cliente, dataInfo.tipo_cliente);

  createInfoParagraph("Informações financeiras");
  buildCard(dataListColClass.consolidar, dataInfo.consolidar);
  buildCard(dataListColClass.benchmark, dataInfo.benchmark);
  buildCard(dataListColClass.grafico_pataporte, dataInfo.grafico_pataporte);
  buildCard(dataListColClass.indicadores, dataInfo.indicadores);
  buildCard(dataListColClass.indicadoresmercado, dataInfo.indicadoresmercado);
  buildCard(dataListColClass.inirent, dataInfo.inirent);
  buildCard(dataListColClass.isentoir, dataInfo.isentoir);
  buildCard(dataListColClass.isin, dataInfo.isin);
  buildCard(dataListColClass.limites, dataInfo.limites);
  buildCard(dataListColClass.maximorat, dataInfo.maximorat);
  buildCard(dataListColClass.rentcarteira, dataInfo.rentcarteira);
  buildCard(dataListColClass.segmento_okr, dataInfo.segmento_okr);
  buildCard(dataListColClass.valores, dataInfo.valores);
  buildCard(dataListColClass.sigla, dataInfo.sigla);
  buildCard(dataListColClass.tipo_indice, dataInfo.tipo_indice);

  createInfoParagraph("Informações adicionais");
  buildCard(dataListColClass.paginas_gerador, dataInfo.paginas_gerador);
  buildCard(dataListColClass.rentpainel, dataInfo.rentpainel);
  buildCard(dataListColClass.rvpg1, dataInfo.rvpg1);
  buildCard(dataListColClass.meta, dataInfo.meta);
  buildCard(dataListColClass.inicio, dataInfo.inicio);

  buildCard(dataListColClass.validadorignorar, dataInfo.validadorignorar);
  buildCard(dataListColClass.xml, dataInfo.xml);
};

buildHTML();
