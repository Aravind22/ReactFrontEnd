// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './components/home';

function App(){
  return(
    <Home></Home>
  )
}
// class App extends Component {
//   state = {
//     universities: [],
//     county : []
//   }

  // componentDidMount() {
    // fetch('http://127.0.0.1:5000/university')
    // .then(res => res.json())
    // .then((data)=>{
    //   this.setState({universities: data.universities})
    // })
    // .catch(console.log)
  // }

//   render() {
//     return (
//       <Universities universities={this.state.universities} />
//     );
//   }
// }

export default App;
