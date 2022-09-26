import React from "react";
import { useLocation } from "react-router-dom";

export default function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    console.log("keyword", keyword);
    console.log("location", location);
    return <div>Search</div>;
}
