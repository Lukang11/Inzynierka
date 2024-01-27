import React from "react";
import "./SearchPage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {    faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UserCard from "./UserCard";

function SearchPage() {
    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {
        console.log("szukam")
    }

    return(
    <div className="search-page-container ">
        <div className="search-container">
            <h1 className="search-header">Lepsze połączenia, bliższe relacje </h1>
            <p>Wyszukiwanie przyjaciół jeszcze nigdy nie było tak ekscytujące</p>
            <p>Poznawaj ludzi z FunFinder!</p>

            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    className="search_input"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                />
                <button className="search_btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>

        <UserCard />

    </div>
    )
}

export default SearchPage;