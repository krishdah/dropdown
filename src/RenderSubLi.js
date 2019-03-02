import React, { Component } from "react";
import check from "./check.jpg";
import { connect } from "react-redux";

class RenderSubLi extends Component {
  onClickHandler = event => {
    // let element = this.props.input.current;
    // element.focus();
    let selectedValue = event.target.dataset.value;
    if (selectedValue !== undefined) {
      this.props.updateTags(
        this.props.highlightedCategory + "/" + selectedValue
      );
    }
  };

  render() {
    let selectedItems = this.props.selectedItems;
    let lists = this.props.subLists;
    return (
      <React.Fragment>
        <ul
          className="subitem-lists"
          ref={this.props.subLi}
          onClick={this.onClickHandler}
        >
          {lists.map(item => {
            return (
              <li
                data-value={item}
                key={item}
                className={
                  item === this.props.highlightedValue ? "highlightItem" : ""
                }
              >
                {item}
                {selectedItems.includes(
                  this.props.highlightedCategory + "/" + item
                ) && <img data-value={item} src={check} alt="check" />}
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    subLists: state.subLists,
    highlightedValue: state.highlightedValue,
    selectedItems: state.selectedItems,
    highlightedCategory: state.highlightedCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTags: value =>
      dispatch({
        type: "UPDATE_TAGS",
        highlightedValue: value
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderSubLi);
