import React, { PureComponent } from "react";
import { connect } from "react-redux";
import RenderSubLi from "./RenderSubLi";
import Tags from "./Tags";
import Lists from "./Lists";
import Input from "./Input";

class App extends PureComponent {
  constructor() {
    super();
    this.state = { showList: false };
  }

  input = React.createRef();
  ul = React.createRef();
  subLi = React.createRef();

  componentDidMount() {
    this.props.cloneAllItems();
  }

  showListHandler = () => {
    console.log("fired this");
    let element = this.input.current;
    element.focus();
    if (!this.state.showList) {
      this.setState({ showList: true });
      this.props.cloneAllItems();
    }
  };

  hideListHandler = event => {
    let target = event.target.dataset.value;
    if (target === "modal") {
      this.setState({ showList: false });
      this.props.hideList();
    }
  };

  render() {
    let selectedItems = this.props.selectedItems;
    return (
      <div className="App">
        <div
          className="modal"
          onClick={this.hideListHandler}
          data-value="modal"
        >
          <div className="dropdown-container" onBlur={this.hideListHandler}>
            {selectedItems.length !== 0 && <Tags />}
            <Input
              input={this.input}
              ul={this.ul}
              subLi={this.subLi}
              showListHandler={this.showListHandler}
            />
            {this.state.showList && <Lists ul={this.ul} input={this.input} />}
          </div>

          {this.props.showSubLists && (
            <React.Fragment>
              <div className="arrow-div" />
              <div className="sublist-container">
                <RenderSubLi subLi={this.subLi} />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedItems: state.selectedItems,
    showSubLists: state.showSubLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cloneAllItems: () => dispatch({ type: "CLONE" }),
    hideList: () => dispatch({ type: "HIDE_LISTS" })
    // updateHighLight: () =>
    //   dispatch({ type: "UPDATE_ACTIVE", highlightedValue: "" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// import React, { PureComponent } from "react";
// import { connect } from "react-redux";
// import Tags from "./Tags";
// import Lists from "./Lists";
// import Input from "./Input";

// class App extends PureComponent {
//   constructor() {
//     super();
//     this.state = { showList: false };
//   }

//   input = React.createRef();
//   ul = React.createRef();

//   componentDidMount() {
//     this.props.cloneAllItems();
//   }

//   showListHandler = () => {
//     let element = this.input.current;
//     element.focus();
//     this.setState({ showList: true });
//   };

//   hideListHandler = event => {
//     // let element = this.input.current;
//     // element.blur();
//     console.log(event.target);
//     window.onclick = event => {
//       console.log(event);
//     };
//     // this.setState({ showList: !this.state.showList });
//     // this.props.updateHighLight();
//   };
//   // onMouseLeave={this.hideListHandler}
//   render() {
//     let selectedItems = this.props.selectedItems;
//     return (
//       <div className="App">
//         <div className="modal">
//           <div className="dropdown-container" onBlur={this.hideListHandler}>
//             {selectedItems.length !== 0 && <Tags />}
//             <Input
//               input={this.input}
//               ul={this.ul}
//               showListHandler={this.showListHandler}
//             />
//             {this.state.showList && <Lists ul={this.ul} input={this.input} />}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     selectedItems: state.selectedItems
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     cloneAllItems: () => dispatch({ type: "CLONE" }),
//     updateHighLight: () =>
//       dispatch({ type: "UPDATE_ACTIVE", highlightedValue: "" })
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
