import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    isCollapse: false, //默认未展开
  },
  reducers: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
});

// 修改后的代码
const { collapseMenu } = tabSlice.actions;

const TabReducer = tabSlice.reducer;

export { collapseMenu };
export default TabReducer;
