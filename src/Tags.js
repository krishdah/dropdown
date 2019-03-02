import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Tags extends PureComponent {
  onClickHandler = event => {
    let selectedValue = event.target.dataset.value;
    if (selectedValue !== undefined) {
      this.props.updateTags(selectedValue);
    }
  };

  render() {
    let tagsList = this.props.selectedItems;
    return (
      <div className="item-tags" onClick={this.onClickHandler}>
        {tagsList.map(item => {
          return (
            <div className="tag-and-remove">
              <button className="tag-btn" key={item}>
                {item}
              </button>
              <div className="remove-icon" data-value={item}>
                x
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedItems: state.selectedItems
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
)(Tags);
