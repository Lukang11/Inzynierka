import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import UserCard from "./UserCard";
import SPUserModal from "./SPUserModal";
import { useAuth } from "../../Utils/AuthProvider";


function SearchPage() {

  const { user } = useAuth();

  const [filter, setFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUser, setSelectedUser] = useState()

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    if (user) {
      console.log(user.email);
    } else {
      console.log("User email is undefined or null");
    }
  }

  function onClick(user) {
    setIsOpen((val) => !val);
    setSelectedUser(user)
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
            <div className="search_btn" >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </form>
        </div>
        </div>


<div className="users-section">
        <div className="users-section-header">Znaleziono dla Ciebie</div>
        <div>
      <label >Filtruj po zainteresowaniach użytkownika: </label>
      <select
        name="selectedCategory"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="All">Wszystkie</option>
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
     
        {isOpen ? <SPUserModal  onClick={onClick} selectedUser={selectedUser}/> : null}
        
        
    </div>

    {searchedUsers.length !== 0 && (
            <div className="sp-results">
              {searchedUsers
                .filter((searchedUser) => searchedUser.email !== user.email)
                .filter((searchedUser) => selectedCategory === "All" || searchedUser.hobbiesName.includes(selectedCategory) )
                .map((user, index) => (  
                  <div className="sp-results-item" onClick={() => onClick(user)} key={index}> 
                  <UserCard user={user}  />
                  </div>
              ))}
            </div>
          )}

                
                
   
    </>
  )
}

export default SearchPage;
