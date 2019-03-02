import React, { PureComponent } from "react";
import { connect } from "react-redux";
import LiHighLight from "./LiHighLight";

class RenderLi extends PureComponent {
  render() {
    let lists = this.props.filteredItems;
    let pattern = this.props.searchInput;
    return (
      <React.Fragment>
        {lists.length
          ? lists.map(item => {
              return (
                <li
                  key={item}
                  className={
                    item === this.props.highlightedCategory
                      ? "highlightItem"
                      : ""
                  }
                >
                  <LiHighLight item={item} searchInput={pattern} />
                  {typeof item !== "object" && (
                    <div className="expand-category" data-value={item}>
                      &#9654;
                    </div>
                  )}
                </li>
              );
            })
          : "Sorry no data"}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    filteredItems: state.filteredItems,
    selectedItems: state.selectedItems,
    highlightedValue: state.highlightedValue,
    highlightedCategory: state.highlightedCategory,
    searchInput: state.searchInput
  };
};

export default connect(mapStateToProps)(RenderLi);

// import React, { PureComponent } from "react";
// import check from "./check.jpg";
// import { connect } from "react-redux";
// import LiHighLight from "./LiHighLight";

// class RenderLi extends PureComponent {
//   render() {
//     let lists = this.props.filteredItems;
//     let selectedItems = this.props.selectedItems;
//     let pattern = this.props.searchInput;
//     return (
//       <React.Fragment>
//         {lists.length
//           ? lists.map(item => {
//               return (
//                 <li
//                   data-value={item}
//                   key={item}
//                   className={
//                     item === this.props.highlightedValue ? "highlightItem" : ""
//                   }
//                 >
//                   <LiHighLight item={item} searchInput={pattern} />
//                   {/* {item} */}

//                   {selectedItems.includes(item) && (
//                     <img data-value={item} src={check} alt="check" />
//                   )}
//                 </li>
//               );
//             })
//           : "Sorry no data"}
//       </React.Fragment>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     filteredItems: state.filteredItems,
//     selectedItems: state.selectedItems,
//     highlightedValue: state.highlightedValue,
//     searchInput: state.searchInput
//   };
// };

// export default connect(mapStateToProps)(RenderLi);
