import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ChatPage from "./Components/ChatPage/ChatPage";
import EventsPage from "./Components/Events/EventsPage";
import CreateEvent from "./Components/Events/CreateEvent";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Routes>
        <Route path="/" element={<> <WelcomePageHeader /><WelcomePage /> </>} />
          <Route path="/profile" element={<> <Header /><ProfilePage /> </>} />
          <Route path="/login" element={<> <WelcomePageHeader /><Login /> </>} />
          <Route path="/register" element={<> <WelcomePageHeader /><Register /> </>} />
          <Route path="/chat" element={<> <Header /><ChatPageComponent /> </>} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
