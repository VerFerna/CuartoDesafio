import express from "express";
import router from "./routes/index.js";
import handlebars from "express-handlebars";

const app = express();
const PORT = 8080;

//Postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Navegador
app.use("/static", express.static("./src/public"))
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

router(app);

app.get("/", (req, res) => {
  res.render("index")
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
