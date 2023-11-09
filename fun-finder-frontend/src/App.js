import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ChatPageComponent from "./Components/ChatPage/ChatPage";
import WelcomePage from "./Components/WelcomePage/WelcomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
         <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatPageComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
