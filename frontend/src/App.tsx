import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import SearchPage from './pages/Search/Search';
import DisplayLocationPage from './pages/DisplayLocation/DisplayLocation';
import NoMatch from './pages/NoMatch/NoMatch';
import { LocationsProvider } from './contexes/LocationsContext';

function App() {
  return (
    <LocationsProvider>
      <Router>
        <Routes>
            <Route element={<Layout />}>
              <Route index element={<SearchPage />} />
              <Route path="/location/:id" element={<DisplayLocationPage />} />
            </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </LocationsProvider>
  );
}

export default App;
