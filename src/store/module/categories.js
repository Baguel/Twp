import axios from "axios";

const cateModule = {
  namespaced: true,
  state: {
    categorie: [],
  },
  getters: {
    allcate: (state) => state.categorie,
  },
  mutations: {
    SET_CATEGORIES(state, data) {
      state.categorie = data;
    },
  },
  actions: {
    async getCat({ commit }) {
      await axios
        .get("http://localhost:8081/wp-json/wp/v2/categories")
        .then((res) => {
          commit("SET_CATEGORIES", res.data);
        })
        .catch((error) => {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        });
    },
  },
};

export default cateModule;
