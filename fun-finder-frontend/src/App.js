import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import EventsPage from "./Components/Events/EventsPage";
import CreateEvent from "./Components/Events/CreateEvent";
import ChatPageComponent from "./Components/ChatPage/ChatPage";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import WelcomePageHeader from "./Components/Header/WelcomePageHeader";
import { EventInfo } from "./Components/Events/EventInfo";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<> <WelcomePageHeader /><WelcomePage /> </>} />
          <Route path="/profile" element={<> <Header /><ProfilePage /> </>} />
          <Route path="/login" element={<> <WelcomePageHeader /><Login /> </>} />
          <Route path="/register" element={<> <WelcomePageHeader /><Register /> </>} />
          <Route path="/chat" element={<> <Header /><ChatPageComponent /> </>} />
          <Route path="/events" element={<> <Header /><EventsPage /> </>} />
          <Route path="/create-event" element={<> <Header /><CreateEvent /> </>} />
          <Route path="/event-info/:id" element={<> <Header /><EventInfo /> </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;