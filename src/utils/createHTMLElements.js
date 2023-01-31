const createCard = (text, secondText) => {
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

export { createCard, createInfoParagraph };
