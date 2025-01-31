<template>
  <div
    @click="showModal = true"
    class="mt-2 rounded-lg border hover:cursor-pointer bg-slate-100"
  >
    <div class="">
      <div class="flex justify-between items-center">
        <p class="px-3 py-1 text-md select-none font-semibold">
          Add a new Post
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
  <div v-if="showModal">
    <div
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
                <form class="" @submit.prevent="AddPost()">
                  <div class="flex justify-between">
                    <div class="select-none text-black text-lg mb-5 font-bold">
                      Add a new Post
                    </div>
                    <button @click="showModal = false">
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
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "AddPost",
  props: {
    id: Number,
  },
  data() {
    return {
      showModal: false,
      model: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    ...mapActions("post", ["getPost"]),
    ...mapActions("cate", ["getCat"]),
    async AddPost() {
      await axios
        .post(
          "http://localhost:8081/wp-json/wp/v2/posts",
          {
            title: this.model.title,
            content: this.model.description,
            categories: this.id,
            status: "publish",
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("wp"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.showModal = false;
          this.model.title = "";
          this.model.description = "";
          this.$store.dispatch("post/getPost");
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
