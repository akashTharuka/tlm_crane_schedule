import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components';


function App() {
    return (
        <Router>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<Dashboard />} />
				</Routes>
		  	</div>
		</Router>
    );
}

export default App;
