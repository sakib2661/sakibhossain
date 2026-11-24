document.addEventListener("DOMContentLoaded", () => {
  const img = new Image();
  img.src = "../IMAGES/root/fav.png";

  img.onload = () => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, 0, 0, size, size);

    const headContent = `
      <link rel="icon" type="image/png" href="${canvas.toDataURL("image/png")}">
    `;
    document.head.insertAdjacentHTML("beforeend", headContent);
  };
});
