import React, { useState } from "react";
import "./SearchPage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {    faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UserCard from "./UserCard";
import SPUserModal from "./SPUserModal";
import axios from 'axios';

function SearchPage() {
    const [filter, setFilter] = useState('');
    const [searchedUser, setSearchedUser] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await searchForUser(filter);
    }

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    }

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    }

    const searchForUser = async (email) => {
        try {
            const response = await axios.get(`http://localhost:7000/users/user-data-email/${email}`);
            setSearchedUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error finding user with this email', error);
        }
    }



    return(
    <>
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
                            value={filter}
                        />
                        <button className="search_btn" type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                </div>
                

                {searchedUser.length !== 0 && (
                    <div className="sp-results">
                        <p>Znaleziono użytkownika</p>

                        <button
                            className='sp-result-btn'
                            onClick={() => console.log(searchedUser)}
                        >
                            <p>{searchedUser.fname} {searchedUser.lname}</p>
                        </button>
                    </div>
                )}
    </div>



    <div className="users-section">
        <div className="users-section-header">Propozycje dla Ciebie</div>
        <div>
      <label >Filtruj po zainteresowaniach użytkownika: </label>
      <select
        name="filter"
        value={filter}
        onChange={handleChangeFilter}
      >
        <option value="">Wybierz</option>
        <option value="motoryzacja">Motoryzacja</option>
        <option value="kultura">Kultura</option>
        <option value="edukacja">Edukacja</option>
        <option value="rozrywkairekreacja">Rozrywka i rekreacja</option>
        <option value="jedzenie">Jedzenie</option>
        <option value="zdrowieiuroda">Zdrowie i uroda</option>
        <option value="Agroturystyka">Agroturystyka</option>
        <option value="zakupy">Zakupy</option>
        <option value="sportifitnes">Sport i Fitness</option>
        <option value="transport">Transport</option>
      </select>
    </div>
        <UserCard />
        {/* <SPUserModal /> */}
    </div>
    
    </>
    )
}

export default SearchPage;