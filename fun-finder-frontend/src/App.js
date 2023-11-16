import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ChatPageComponent from "./Components/ChatPage/ChatPage";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import WelcomePageHeader from "./Components/Header/WelcomePageHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <Routes>
          <Route path="/" element={<> <WelcomePageHeader /><WelcomePage /> </>} />
          <Route path="/profile" element={<> <Header /><ProfilePage /> </>} />
          <Route path="/login" element={<> <WelcomePageHeader /><Login /> </>} />
          <Route path="/register" element={<> <WelcomePageHeader /><Register /> </>} />
          <Route path="/chat" element={<> <Header /><ChatPageComponent /> </>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
