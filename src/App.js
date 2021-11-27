import React, {Component} from "react";
import Layout from "./hoc/Layout";
import {Routes, Route} from 'react-router-dom';
import Quiz from './Container/Quiz/Quiz';
import QuizList from './Container/QuizList/QuizList';
import Auth from './Container/Auth/Auth';
import QuizCreator from './Container/QuizCreator/QuizCreator';
import Menu from "./components/Navigation/Menu/Menu";
import Drawer from "./components/Navigation/Drawer/Drawer";

class App extends Component {
  state = {
    isOpen: false
  }

  onMenu = () => {
      this.setState({
          isOpen: !this.state.isOpen
      })
  }

  onBackdrop = () => {
      this.setState({
          isOpen: false
      })
  }

  render() {
    return (
      <React.Fragment>
        <Drawer 
            isOpen={this.state.isOpen}
            onCloseBackdrop={this.onBackdrop}
        />

        <Menu 
            onMenu={this.onMenu}
            isOpen={this.state.isOpen}
        />

        

        <Layout>
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path='/quiz-creator' element={<QuizCreator />} />
            <Route path='/quiz/:id' element={<Quiz />} />
            <Route path="/" element={<QuizList />} />
          </Routes>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
