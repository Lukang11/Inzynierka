import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import { AuthProvider } from "./Utils/AuthProvider";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import EventsPage from "./Components/Events/EventsPage";
import CreateEvent from "./Components/Events/CreateEvent";
import ChatPageComponent from "./Components/ChatPage/ChatPage";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import WelcomePageHeader from "./Components/Header/WelcomePageHeader";
import { EventInfo } from "./Components/Events/EventInfo";
import { GoogleOAuthProvider } from "@react-oauth/google";
import EventsPageView from "./Components/EventsPageView/EventsPageView";
import EventBattler from "./Components/EventBattler/EventBattler";
import EventBattlerView from "./Components/EventBattlerView/EventBattlerView";
import SearchPage from "./Components/SearchPage/SearchPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <Routes>
            <Route
                path="/"
                element={
                  <>
                    {" "}
                    <Header />
                    <WelcomePage />{" "}
                  </>
                }
              />
              <Route
                path="/search"
                element={
                  <>
                  <PrivateRoute>
                    <Header />
                    <SearchPage />
                  </PrivateRoute>

                  </>
                }
              />
              <Route
                path="/battle"
                element={
                  <>
                    <PrivateRoute>
                      <Header />
                      <EventBattlerView />
                    </PrivateRoute>
                  </>
                }
              />
              <Route
                path="/battle/:id"
                element={
                  <>
                    <PrivateRoute>
                      <Header />
                      <EventBattler/>
                    </PrivateRoute>
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Header />
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {" "}
                    <Header />
                    <Login />{" "}
                  </>
                }
              />
              <Route
                path="/register"
                element={
                  <>
                    {" "}
                    <Header />
                    <Register />{" "}
                  </>
                }
              />
              <Route
                path="/chat"
                element={
                  <>
                    {" "}
                    <PrivateRoute>
                      <Header />
                      <ChatPageComponent />{" "}
                    </PrivateRoute>
                  </>
                }
              />
              <Route
                path="/events"
                element={
                  <>
                    {" "}
                    <PrivateRoute>
                      <Header />
                      <EventsPageView />{" "}
                    </PrivateRoute>
                  </>
                }
              />
              <Route
                path="/create-event"
                element={
                  <>
                    {" "}
                    <PrivateRoute>
                      <Header />
                      <CreateEvent />{" "}
                    </PrivateRoute>
                  </>
                }
              />
              <Route
                path="/event-info/:id"
                element={
                  <>
                    {" "}
                    <PrivateRoute>
                    <Header />
                    <EventInfo />{" "}
                    </PrivateRoute>
                  </>
                }
              />
            </Routes>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
