const navMenuMobile = document.getElementsByClassName("sanduiche");
const sideNavMenu = document.getElementById("mySidenav");
const closeSideNav = document.getElementsByClassName("fechar");

navMenuMobile[0].addEventListener("click", () => {
  sideNavMenu.setAttribute("style", "display: block");
});

closeSideNav[0].addEventListener("click", () => {
  sideNavMenu.setAttribute("style", "display: none");
});
