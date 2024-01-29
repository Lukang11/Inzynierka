import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import UserCard from "./UserCard";


function SearchPage() {
  const [filter, setFilter] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
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
        {searchedUsers.length !== 0 && (
  <div className="sp-results">
    {searchedUsers.map((user) => (  
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
