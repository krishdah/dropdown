import React, { PureComponent } from "react";
import { connect } from "react-redux";

class Input extends PureComponent {
  getFilteredItems = searchInputValue => {
    let newArr = [];
    this.props.allItems.filter(item => {
      let value = Object.keys(item)[0];
      let arr = item[value];
      let subArr = [];
      arr.filter(itm => {
        itm.toLowerCase().indexOf(searchInputValue) > -1 && subArr.push(itm);
      });
      let checkKey = value.toLowerCase().indexOf(searchInputValue) > -1;
      subArr.length
        ? newArr.push({ [value]: subArr })
        : checkKey && newArr.push({ [value]: subArr });
    });
    return newArr;
  };

  onChangeHandler = event => {
    let searchInputValue = event.target.value.toLowerCase();
    if (searchInputValue === "") {
      this.props.cloneAllItems();
      this.props.hideSubLists();
    } else {
      let filteredItems = this.getFilteredItems(searchInputValue);
      this.props.searchItems(searchInputValue, filteredItems);
    }
  };

  updateViewOnScroll = itemIndex => {
    let filteredItems = this.props.filteredItems;
    let subLists = this.props.subLists;
    let showSubLists = this.props.showSubLists;
    let highlightedValue = showSubLists
      ? subLists[itemIndex]
      : filteredItems[itemIndex];
    console.log(highlightedValue);
    if (this.props.searchInput !== "") {
      this.props.updateHighlightedValue(highlightedValue);
      let scroll = this.props.searchBlock.current;
      scroll.querySelectorAll(".searched-block")[itemIndex].scrollIntoView({
        block: "nearest",
        behavior: "instant"
      });
    } else {
      this.props.updateHighlightedValue(highlightedValue);
      let listOfDropDownItems = showSubLists
        ? this.props.subLi.current
        : this.props.ul.current;
      if (listOfDropDownItems != null) {
        listOfDropDownItems.querySelectorAll("li")[itemIndex].scrollIntoView({
          block: "nearest",
          behavior: "instant"
        });
      }
    }
  };

  onKeyDownHandler = e => {
    let selectedValue = this.props.highlightedCategory;
    let filteredItems = [...this.props.filteredItems];
    let showSubLists = this.props.showSubLists;
    let highlightedValue = this.props.highlightedValue;
    let searchInput = this.props.searchInput;
    let subLists = this.props.subLists;
    let itemIndex =
      highlightedValue === "" ? -1 : subLists.indexOf(highlightedValue);
    let index =
      selectedValue === "" ? -1 : filteredItems.indexOf(selectedValue);
    if (e.keyCode === 39 && searchInput !== "") {
      if (selectedValue !== "") {
        let show = showSubLists ? false : true;
        this.props.updateSelectedItems(selectedValue, show);
      }
    } else if (e.keyCode === 38 && itemIndex > 0 && showSubLists) {
      this.updateViewOnScroll(itemIndex - 1);
    } else if (e.keyCode === 38 && searchInput !== "" && index > 0) {
      this.updateViewOnScroll(index - 1);
    } else if (e.keyCode === 38 && index > 0 && !showSubLists) {
      this.updateViewOnScroll(index - 1);
    } else if (
      e.keyCode === 40 &&
      itemIndex < subLists.length - 1 &&
      showSubLists
    ) {
      this.updateViewOnScroll(itemIndex + 1);
    } else if (
      e.keyCode === 40 &&
      searchInput !== "" &&
      index < filteredItems.length - 1
    ) {
      this.updateViewOnScroll(index + 1);
    } else if (
      e.keyCode === 40 &&
      index < filteredItems.length - 1 &&
      !showSubLists
    ) {
      this.updateViewOnScroll(index + 1);
    } else if ((e.keyCode === 13 && !showSubLists) || e.keyCode === 39) {
      if (selectedValue !== "") {
        let show = showSubLists ? false : true;
        this.props.updateSelectedItems(selectedValue, show);
      }
    } else if (e.keyCode === 13 && showSubLists) {
      this.props.updateTags(selectedValue + "/" + highlightedValue);
    }
  };

  render() {
    let selectedItems = this.props.selectedItems;
    return (
      <div className="input-and-count">
        <div className="count-tags">{selectedItems.length}</div>
        <input
          ref={this.props.input}
          id="input-box"
          type="text"
          placeholder="Select an item"
          onFocus={this.props.showListHandler}
          onKeyDown={this.onKeyDownHandler}
          onChange={this.onChangeHandler}
          value={this.props.searchInput}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    highlightedValue: state.highlightedValue,
    filteredItems: state.filteredItems,
    selectedItems: state.selectedItems,
    searchInput: state.searchInput,
    allItems: state.allItems,
    showSubLists: state.showSubLists,
    subLists: state.subLists,
    highlightedCategory: state.highlightedCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cloneAllItems: () => dispatch({ type: "CLONE" }),
    updateHighlightedValue: value =>
      dispatch({ type: "UPDATE_ACTIVE", highlightedValue: value }),
    updateSelectedItems: (value, show) =>
      dispatch({
        type: "SHOW_SUBLISTS",
        highlightedValue: value,
        showType: show
      }),
    searchItems: (inputPattern, newItems) =>
      dispatch({
        type: "SEARCH",
        searchInput: inputPattern,
        newFilteredItems: newItems
      }),
    updateTags: value =>
      dispatch({
        type: "UPDATE_TAGS",
        highlightedValue: value
      }),
    hideSubLists: () => dispatch({ type: "HIDE_LISTS" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);

// import React, { PureComponent } from "react";
// import { connect } from "react-redux";

// class Input extends PureComponent {
//   getFilteredItems = searchInputValue => {
//     return this.props.allItems.filter(item => {
//       item = item.toLowerCase();
//       return item.indexOf(searchInputValue) > -1;
//     });
//   };

//   onChangeHandler = event => {
//     let searchInputValue = event.target.value.toLowerCase();
//     let filteredItems = this.getFilteredItems(searchInputValue);
//     this.props.searchItems(searchInputValue, filteredItems);
//   };

//   updateViewOnScroll = itemIndex => {
//     let highlightedValue = this.props.filteredItems[itemIndex];
//     this.props.updateHighlightedValue(highlightedValue);
//     let listOfDropDownItems = this.props.ul.current;
//     if (listOfDropDownItems != null) {
//       listOfDropDownItems.querySelectorAll("li")[itemIndex].scrollIntoView({
//         block: "nearest",
//         behavior: "instant"
//       });
//     }
//   };

//   getNewSelectedItemList = selectedValue => {
//     let selectedItems = [...this.props.selectedItems];
//     return selectedItems.includes(selectedValue)
//       ? selectedItems.filter(item => {
//           return item !== selectedValue;
//         })
//       : selectedItems.concat(selectedValue);
//   };

//   onKeyDownHandler = e => {
//     let selectedValue = this.props.highlightedValue;
//     let filteredItems = [...this.props.filteredItems];

//     let index =
//       selectedValue === "" ? -1 : filteredItems.indexOf(selectedValue);
//     if (e.keyCode === 38 && index > 0) {
//       this.updateViewOnScroll(index - 1);
//     } else if (e.keyCode === 40 && index < filteredItems.length - 1) {
//       this.updateViewOnScroll(index + 1);
//     } else if (e.keyCode === 13) {
//       if (selectedValue !== "") {
//         let newSelectedItems = this.getNewSelectedItemList(selectedValue);
//         this.props.updateSelectedItems(newSelectedItems);
//       }
//     }
//   };

//   render() {
//     console.log("fired input");
//     let selectedItems = this.props.selectedItems;
//     return (
//       <div className="input-and-count">
//         <div className="count-tags">{selectedItems.length}</div>
//         <input
//           ref={this.props.input}
//           id="input-box"
//           type="text"
//           placeholder="Select an item"
//           onFocus={this.props.showListHandler}
//           onKeyDown={this.onKeyDownHandler}
//           onChange={this.onChangeHandler}
//           value={this.props.searchInput}
//         />
//       </div>
//     );
//   }
// }
// const mapStateToProps = state => {
//   return {
//     highlightedValue: state.highlightedValue,
//     filteredItems: state.filteredItems,
//     selectedItems: state.selectedItems,
//     searchInput: state.searchInput,
//     allItems: state.allItems
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     updateHighlightedValue: value =>
//       dispatch({ type: "UPDATE_ACTIVE", highlightedValue: value }),
//     updateSelectedItems: items =>
//       dispatch({ type: "UPDATE_SELECTED_ITEMS", selectedItems: items }),
//     searchItems: (inputPattern, newItems) =>
//       dispatch({
//         type: "SEARCH",
//         searchInput: inputPattern,
//         newFilteredItems: newItems
//       })
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Input);
