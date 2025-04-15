import { Routes, Route, NavLink } from 'react-router-dom';
import EventList from './pages/EventList';
import CreateEvent from './pages/CreateEvent';
import './styles/App.css';

function App() {
    return (
        <div className="app">
            <header>
                <h1>Event Management</h1>
                <nav>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                        Events
                    </NavLink>
                    <NavLink to="/create" className={({ isActive }) => isActive ? "active" : ""}>
                        Create Event
                    </NavLink>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<EventList />} />
                    <Route path="/create" element={<CreateEvent />} />
                </Routes>
            </main>
            <footer>
                <p>© 2025 Event Management App</p>
            </footer>
        </div>
    );
}

export default App;
