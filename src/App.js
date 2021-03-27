import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import AddProducts from './pages/AddProducts';
import AllProducts from './pages/AllProducts';
import ViewProducts from './pages/ViewProducts';
import Team from './pages/Team';

function App() {
	return (
		<Router>
			<Sidebar />
			<Switch>
				<Route path="/overview" exact component={Overview} />
				<Route path="/reports" exact component={Reports} />
				<Route path="/products/add" exact component={AddProducts} />
				<Route path="/products/all" exact component={AllProducts} />
				<Route path="/products/view/:productId" exact component={ViewProducts} />
				<Route path="/reports/reports1" exact component={ReportsOne} />
				<Route path="/reports/reports2" exact component={ReportsTwo} />
				<Route path="/reports/reports3" exact component={ReportsThree} />
				<Route path="/team" exact component={Team} />
			</Switch>
		</Router>
	);
}

export default App;
