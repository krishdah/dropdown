const initState = {
  allItems: [
    { FrontEnd: ["Angular", "React", "Vue"] },
    {
      FrontEndDesign: [
        "Bootstrap",
        "Semantic UI",
        "Foundation",
        "Material UI",
        "Pure CSS",
        "Skeleton",
        "UIKit",
        "Miligram",
        "Susy"
      ]
    },
    { BackEnd: ["JSP", "Servlet", "PHP", "Node", "Express"] },
    { Programming: ["C", "C++", "C#", "Java", ".Net"] },
    { Database: ["SQL Server", "Oracle", "MySql", "MongoDB", "Firebase"] },
    {
      New: [
        "Go",
        "R",
        "Groovy",
        "Crystal",
        "Rust",
        "Elixir",
        "Julia",
        "Elm",
        "Kotlin"
      ]
    },
    { Old: ["FORTAN", "COBOL", "Lisp", "PASCAL", "MATLAB"] },
    { MobileApp: ["BuildFire", "Python", "Java", "Kotlin", "Swift"] }
  ],
  selectedItems: [],
  highlightedValue: "",
  highlightedCategory: "",
  searchInput: "",
  filteredItems: [],
  subLists: [],
  showSubLists: false
};

const reducer = (state = initState, action) => {
  if (action.type === "CLONE") {
    let keys = state.allItems.map(item => {
      let key = Object.keys(item);
      return key[0];
    });
    return {
      ...state,
      filteredItems: keys,
      searchInput: ""
    };
  }

  if (action.type === "UPDATE_ACTIVE") {
    if (state.filteredItems.includes(action.highlightedValue)) {
      return {
        ...state,
        highlightedCategory: action.highlightedValue
      };
    } else {
      return {
        ...state,
        highlightedValue: action.highlightedValue
      };
    }
  }

  if (action.type === "HIDE_LISTS") {
    return {
      ...state,
      showSubLists: false,
      highlightedValue: "",
      searchInput: ""
    };
  }

  if (action.type === "SELECT_ITEM") {
    let selectedItems = state.selectedItems;
    let newItems = [];
    if (selectedItems.includes(action.value)) {
      newItems = selectedItems.filter(item => {
        return item !== action.value;
      });
    } else {
      newItems = state.selectedItems.concat(action.value);
    }
    return {
      ...state,
      selectedItems: newItems
    };
  }

  if (action.type === "SHOW_SUBLISTS") {
    let activeItem = action.highlightedValue;
    let list = state.allItems.filter(item => {
      let key = Object.keys(item);
      if (key[0] === activeItem) {
        return item;
      }
    });
    let arr = Object.values(list[0])[0];
    return {
      ...state,
      showSubLists: action.showType,
      highlightedCategory: activeItem,
      subLists: arr
    };
  }

  if (action.type === "UPDATE_TAGS") {
    let selectedValue = action.highlightedValue;
    let selectedItems = [...state.selectedItems];
    let newSelectedItems = selectedItems.includes(selectedValue)
      ? selectedItems.filter(item => {
          return item !== selectedValue;
        })
      : selectedItems.concat(selectedValue);
    return {
      ...state,
      highlightedValue: selectedValue,
      selectedItems: [...newSelectedItems]
    };
  }

  if (action.type === "UPDATE_SELECTED_ITEMS") {
    return {
      ...state,
      selectedItems: [...action.selectedItems]
    };
  }

  if (action.type === "SEARCH") {
    return {
      ...state,
      searchInput: action.searchInput,
      filteredItems: action.newFilteredItems
    };
  }

  return state;
};

export default reducer;

// const initState = {
//   allItems: [
//     "Angular",
//     "React",
//     "C++",
//     ".Net",
//     "C/C++",
//     "Vue",
//     "Express",
//     "Node",
//     "Mongo",
//     "Firebase",
//     "Mysql",
//     "jQuery",
//     "Ajax"
//   ],
//   selectedItems: [],
//   highlightedValue: "",
//   searchInput: "",
//   filteredItems: []
// };

// const reducer = (state = initState, action) => {
//   if (action.type === "CLONE") {
//     return {
//       ...state,
//       filteredItems: [...state.allItems]
//     };
//   }

//   if (action.type === "UPDATE_ACTIVE") {
//     return {
//       ...state,
//       highlightedValue: action.highlightedValue
//     };
//   }

//   if (action.type === "UPDATE_TAGS") {
//     let selectedValue = action.highlightedValue;
//     let selectedItems = [...state.selectedItems];
//     let newSelectedItems = selectedItems.includes(selectedValue)
//       ? selectedItems.filter(item => {
//           return item !== selectedValue;
//         })
//       : selectedItems.concat(selectedValue);
//     return {
//       ...state,
//       highlightedValue: action.highlightedValue,
//       selectedItems: [...newSelectedItems]
//     };
//   }

//   if (action.type === "UPDATE_SELECTED_ITEMS") {
//     return {
//       ...state,
//       selectedItems: [...action.selectedItems]
//     };
//   }

//   if (action.type === "SEARCH") {
//     return {
//       ...state,
//       searchInput: action.searchInput,
//       filteredItems: action.newFilteredItems
//     };
//   }

//   return state;
// };

// export default reducer;
