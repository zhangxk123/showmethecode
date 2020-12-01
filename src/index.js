/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import huskyImg from "@/assets/images/husky.jpg";
import "@/assets/styles/index.scss";

const img = document.createElement("img");
img.src = huskyImg;
document.getElementById("app").append(img);