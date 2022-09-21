import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Header from "./components/Header";
import Series from "./Routes/Series";
import Movie from "./Routes/Movie";
function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/series" element={<Series />} />
                <Route path="/movie" element={<Movie />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    );
}

export default App;
