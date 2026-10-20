const sharp = require("sharp");
const path = require("path");

const jobs = [
  { src: "media-output/img-mvdhzfqh-f4bd85ec.png", out: "public/images/hero-driver.webp", width: 1200 },
  { src: "media-output/img-mvdhzc6r-93bee076.png", out: "public/images/car-night.webp", width: 1600 },
  { src: "media-output/img-mvdhzkh1-ee430c39.png", out: "public/images/truck-dusk.webp", width: 1600 },
  { src: "media-output/img-mvdhzmj0-599781c6.png", out: "public/images/classroom.webp", width: 1600 },
];

(async () => {
  for (const job of jobs) {
    await sharp(job.src)
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(job.out);
    console.log("built", job.out);
  }
})();
