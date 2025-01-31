import axios from "axios";

const postModule = {
  namespaced: true,
  state: {
    posts: [],
  },
  getters: {
    allpost: (state) => state.posts,
  },
  mutations: {
    SET_POSTS(state, data) {
      state.posts = data;
    },
  },
  actions: {
    async getPost({ commit }) {
      await axios
        .get("http://localhost:8081/wp-json/wp/v2/posts?page=1&per_page=50")
        .then((res) => {
          commit("SET_POSTS", res.data);
        })
        .catch((error) => {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        });
    },
  },
};

export default postModule;
