import React, { PureComponent } from "react";
import { connect } from "react-redux";
import RenderLi from "./RenderLi";
import LiHighLight from "./LiHighLight";
import check from "./check.jpg";

class Lists extends PureComponent {
  onClickHandler = event => {
    let element = this.props.input.current;
    element.focus();
    let selectedValue = event.target.dataset.value;
    if (selectedValue !== undefined) {
      let show =
        this.props.highlightedCategory === selectedValue &&
        this.props.showSubLists
          ? false
          : true;
      this.props.updateTags(selectedValue, show);
    }
  };

  onClickSearch = (event, key) => {
    let element = this.props.input.current;
    element.focus();
    let selectedValue = event.target.dataset.value;
    let catg = event.target.dataset.key;
    if (selectedValue === "showSubLists") {
      let show =
        this.props.highlightedCategory === catg && this.props.showSubLists
          ? false
          : true;
      this.props.updateTags(catg, show);
    } else if (selectedValue !== undefined) {
      this.props.selectSearch(key + "/" + selectedValue, key);
    }
  };

  getLists = lists => {
    let highlightedCategory = this.props.highlightedCategory;
    return lists.map(item => {
      let key = Object.keys(item)[0];
      let arr = Object.values(item)[0];
      console.log(highlightedCategory, key, "rendering");
      return (
        <div
          className="searched-block"
          onClick={e => this.onClickSearch(e, key)}
        >
          <div
            className={
              highlightedCategory === key
                ? "searched-items-active"
                : "searched-items"
            }
          >
            <LiHighLight item={key} searchInput={this.props.searchInput} />
            <div
              className="expand-category"
              data-value="showSubLists"
              data-key={key}
            >
              &#9654;
            </div>
          </div>
          <ul>
            {arr.map(item => {
              return (
                <li data-value={item}>
                  <LiHighLight
                    item={item}
                    searchInput={this.props.searchInput}
                  />
                  {this.props.selectedItems.includes(key + "/" + item) && (
                    <img data-value={item} src={check} alt="check" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  render() {
    let lists = this.props.filteredItems;
    console.log(lists, "lists");
    if (lists.length && typeof lists[0] === "object") {
      let listToRender = this.getLists(lists);
      return (
        <div className="list-container" ref={this.props.searchBlock}>
          {listToRender}{" "}
        </div>
      );
    } else {
      return (
        <div>
          <ul
            className="item-lists"
            ref={this.props.ul}
            onClick={this.onClickHandler}
          >
            <RenderLi />
          </ul>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    highlightedCategory: state.highlightedCategory,
    showSubLists: state.showSubLists,
    filteredItems: state.filteredItems,
    selectedItems: state.selectedItems,
    searchInput: state.searchInput
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTags: (value, show) =>
      dispatch({
        type: "SHOW_SUBLISTS",
        highlightedValue: value,
        showType: show
      }),
    selectSearch: (value, key) => {
      dispatch({
        type: "SELECT_ITEM",
        value: value,
        key: key
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);

// import React, { PureComponent } from "react";
// import { connect } from "react-redux";
// import RenderLi from "./RenderLi";

// class Lists extends PureComponent {
//   onClickHandler = event => {
//     let element = this.props.input.current;
//     element.focus();
//     let selectedValue = event.target.dataset.value;
//     if (selectedValue !== undefined) {
//       this.props.updateTags(selectedValue);
//     }
//   };

//   render() {
//     console.log("fired lists");
//     return (
//       <div>
//         <ul
//           className="item-lists"
//           ref={this.props.ul}
//           onClick={this.onClickHandler}
//         >
//           <RenderLi />
//         </ul>
//       </div>
//     );
//   }
// }
// const mapStateToProps = state => {
//   return {};
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     updateTags: value =>
//       dispatch({
//         type: "UPDATE_TAGS",
//         highlightedValue: value
//       })
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Lists);
