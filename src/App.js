import React from 'react';
import List from './views/List'
import "./App.css";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
function App() {
  return <div className="App">
			<AppBar position="absolute">
				<Toolbar>
					<Typography component="h1" variant="h6" color="inherit" noWrap>
						Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<List />
		</div>;
}

export default App;
