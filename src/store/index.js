import { createStore } from "vuex";
import cateModule from "./module/categories";
import postModule from "./module/posts";
//import axios from "axios";

export default createStore({
  modules: {
    cate: cateModule,
    post: postModule,
  },
});
