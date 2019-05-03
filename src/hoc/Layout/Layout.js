import React, { Component } from "react";

import Auxiliary from "../Auxiliary/Auxiliary" ;
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import "./Layout.css";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  SideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  drawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer}
    });
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar drawerToggleClicked={this.drawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.SideDrawerCloseHandler}
        />
        <main className="separating">{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
