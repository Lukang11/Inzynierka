import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import UserCard from "./UserCard";


function SearchPage() {
  const [filter, setFilter] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value)
  }

  useEffect(() => {
    const fetchSearchedUsers = async () => {
      try {
        if (filter.trim() !== '') {
          const response = await axios.get(`http://localhost:7000/users/search-by-prefix/${filter}`);
          setSearchedUsers(response.data);
        } else {
          setSearchedUsers([]);
        }
      } catch (error) {
        console.error('Error fetching searched users:', error);
      }
    };

    fetchSearchedUsers();
  }, [filter]);

  return (
    <>
      <div className="search-page-container ">
        <div className="search-container">
          <h1 className="search-header">Lepsze połączenia, bliższe relacje </h1>
          <p>Wyszukiwanie przyjaciół jeszcze nigdy nie było tak ekscytujące</p>
          <p>Poznawaj ludzi z FunFinder!</p>

          <form className="search-form">
            <input
              className="search_input"
              type="text"
              id="search"
              placeholder=""
              onChange={handleSearchChange}
              value={filter}
            />
            <button className="search_btn" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>


<div className="users-section">
        <div className="users-section-header">Propozycje dla Ciebie</div>
        <div>
      <label >Filtruj po zainteresowaniach użytkownika: </label>
      <select
        name="selectedCategory"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="All">Wybierz</option>
        <option value="Motoryzacja">Motoryzacja</option>
        <option value="Kultura">Kultura</option>
        <option value="Edukacja">Edukacja</option>
        <option value="Rozrywka i rekreacja">Rozrywka i rekreacja</option>
        <option value="Jedzenie">Jedzenie</option>
        <option value="Zdrowie i uroda">Zdrowie i uroda</option>
        <option value="Agroturystyka">Agroturystyka</option>
        <option value="Zakupy">Zakupy</option>
        <option value="Sport i Fitnes">Sport i Fitness</option>
        <option value="Transport">Transport</option>
      </select>
    </div>
     
        {/* <SPUserModal /> */}
        
    </div>

    {searchedUsers.length !== 0 && (
            <div className="sp-results">
              {searchedUsers.filter((user) => selectedCategory === "All" || user.hobbiesName.includes(selectedCategory) ).map((user) => (  
                  <div className="sp-results-item">
                  <UserCard user={user} />
                  </div>
              ))}
            </div>
          )}

      </div>
    </>
  )
}

export default SearchPage;
