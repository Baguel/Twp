<template>
  <div>
    <div>
      <div @click="menu = !menu">
        <button v-if="!menu" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <button v-else type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <ul
        v-if="menu"
        role="menu"
        data-popover="menu"
        data-popover-placement="bottom"
        class="absolute z-20 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
      >
        <li
          @click="alerte"
          role="menuitem"
          class="cursor-pointer flex justify-between text-center text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
        >
          <p>Edit</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </li>
        <li
          role="menuitem"
          class="cursor-pointer flex justify-between text-center text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-red-100 focus:bg-red-100 active:bg-red-100"
          @click="deleteModal = true"
        >
          <p>Delete</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </li>
      </ul>
      <div>
        <div
          v-if="modal"
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            class="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
              class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <div
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:items-start">
                    <form class="" @submit.prevent="Update">
                      <div class="flex justify-between">
                        <div
                          class="select-none text-black text-lg mb-5 font-bold"
                        >
                          Update this categorie
                        </div>
                        <button @click="modal = false">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <label
                        for="about"
                        class="block text-md font-semibold text-gray-900 mb-2"
                        >Title</label
                      >
                      <input
                        type="text"
                        name="titre"
                        id="titre"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        v-model="model.title"
                        required
                      />
                      <label
                        for="about"
                        class="block text-sm/6 font-semibold text-gray-900 mt-5"
                        >Description</label
                      >
                      <div class="mt-2">
                        <textarea
                          name="description"
                          id="description"
                          rows="3"
                          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          v-model="model.description"
                          required
                        ></textarea>
                      </div>
                      <div class="mt-2 flex justify-end">
                        <button
                          class="bg-black p-2 text-white font-semibold rounded-md"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="deleteModal">
    <div
      class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
    >
      <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
          viewBox="0 0 320.591 320.591"
          @click="(deleteModal = false), (menu = false)"
        >
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"
          ></path>
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"
          ></path>
        </svg>

        <div class="my-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-14 fill-red-500 inline"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
              data-original="#000000"
            />
            <path
              d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
              data-original="#000000"
            />
          </svg>
          <h4 class="text-gray-800 text-base font-semibold mt-4">
            Are you sure you want to delete it?
          </h4>

          <div class="text-center space-x-4 mt-8">
            <button
              type="button"
              class="px-4 py-2 rounded-lg text-gray-800 text-sm bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              @click="(deleteModal = false), (menu = false)"
            >
              Cancel
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-lg text-white text-sm bg-red-600 hover:bg-red-700 active:bg-red-600"
              @click="deleteCat(id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ModalCategorie",
  props: {
    id: Number,
  },
  computed: {
    ...mapGetters("cate", ["allcate"]),
  },
  data: function () {
    return {
      post: [],
      postcat: [],
      menu: false,
      modal: false,
      deleteModal: false,
      model: {
        title: "",
        description: "",
      },
    };
  },

  methods: {
    ...mapActions("cate", ["getCat"]),
    async deletepost(id) {
      await axios
        .delete("http://localhost:8081/wp-json/wp/v2/posts/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("wp"),
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        });
    },
    async deleteit(id) {
      await axios
        .delete(
          "http://localhost:8081/wp-json/wp/v2/categories/" +
            id +
            "?force=true",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("wp"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.$store.dispatch("cate/getCat");
        })
        .catch((error) => {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        });
    },
    async deleteCat(id) {
      await axios
        .get("http://localhost:8081/wp-json/wp/v2/posts?categories=" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("wp"),
          },
        })
        .then((res) => {
          this.postcat = res.data;
          console.log(this.postcat);
          for (const posted in this.postcat) {
            this.deletepost(this.postcat[posted].id);
          }
          this.deleteit(id);
        })
        .catch((error) => {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        });
    },
    async alerte() {
      this.modal = true;
      this.menu = false;
      await axios
        .get(
          "http://localhost:8081/wp-json/wp/v2/categories/" +
            this.id +
            "?force=true",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("wp"),
            },
          }
        )
        .then((res) => {
          this.model.title = res.data.name;
          this.model.description = res.data.description;
        })
        .catch((error) => {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        });
    },
    async Update() {
      await axios
        .put(
          "http://localhost:8081/wp-json/wp/v2/categories/" +
            this.id +
            "?force=true",
          {
            name: this.model.title,
            description: this.model.description,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("wp"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.modal = false;
          this.$store.dispatch("cate/getCat");
        })
        .catch((error) => {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        });
    },
  },
};
</script>
