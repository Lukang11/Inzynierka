import EventsPage from "./Components/Events/EventsPage";
import CreateEvent from "./Components/Events/CreateEvent";
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
          <Route path="/events" element={<EventsPage />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;