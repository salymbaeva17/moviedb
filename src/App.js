import {BrowserRouter as Router, Route} from "react-router-dom";
import FilmsInfo from "./views/FilmsInfo";
import Films from "./views/Films";
import ActorInfo from "./views/ActorInfo";
import FilmsCast from "./views/FilmsCast";
import Header from "./components/Header";
import Search from "./views/Search";


function App() {
    return (
        <Router>
            <Header/>
            <Route path="/search/:name"><Search/></Route>
            <Route path="/film/:id"><FilmsInfo/></Route>
            <div className="container my-5 margin-top">
                <Route exact path="/films"><Films/></Route>
                <Route path="/actor/:id"><ActorInfo/></Route>
                <Route path="/cast/:id"><FilmsCast/></Route>
            </div>
        </Router>
    );
}

export default App;
