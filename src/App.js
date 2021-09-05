import {BrowserRouter as Router, Route} from "react-router-dom";
import FilmsInfo from "./views/FilmsInfo";
import Films from "./views/Films";
import ActorInfo from "./views/ActorInfo";
import FilmsCast from "./views/FilmsCast";
import Header from "./components/Header";


function App() {
    return (
            <Router>
                <Header/>
                <div className="container my-5"><Route exact path="/"><Films/></Route>
                    <Route path="/film/:id"><FilmsInfo/></Route>
                    <Route path="/actor/:id"><ActorInfo/></Route>
                    <Route path="/cast/:id"><FilmsCast/></Route>
                </div>
            </Router>
    );
}

export default App;
