import React, { Component } from "react";

export default class LiHighLight extends Component {
  render() {
    let str = this.props.item;
    let mystr = this.props.searchInput;
    let index = str.toLowerCase().indexOf(mystr.toLowerCase());
    let mid = str.slice(index, mystr.length + index);
    let first = str.slice(0, index);
    let last = str.slice(mystr.length + index, str.length);
    return (
      //  using div because using react fragment..all list items were aligning towards right
      <div>
        {index === -1 ? (
          str
        ) : (
          <React.Fragment>
            <span>{first}</span>
            <strong>{mid}</strong>
            <span>{last}</span>
          </React.Fragment>
        )}
      </div>
    );
  }
}

// import React, { Component } from "react";

// export default class LiHighLight extends Component {
//   render() {
//     let str = this.props.item;
//     let mystr = this.props.searchInput;
//     let index = str.toLowerCase().indexOf(mystr.toLowerCase());
//     let mid = str.slice(index, mystr.length + index);
//     let first = str.slice(0, index);
//     let last = str.slice(mystr.length + index, str.length);
//     return (
//       //  using div because using react fragment..all list items were aligning towards right
//       <div>
//         <span data-value={str}>{first}</span>
//         <strong data-value={str}>{mid}</strong>
//         <span data-value={str}>{last}</span>
//       </div>
//     );
//   }
// }
