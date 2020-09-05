import HomeScreen from "./screens/Home";
import createHeader from "./components/Header";
import './index.css';

const app = document.createElement("main");
app.appendChild(createHeader());
app.appendChild(HomeScreen());

document.body.appendChild(app);
