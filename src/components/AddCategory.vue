<template>
  <div class="mb-4 w-[250px] h-screen">
    <div class="">
      <button
        class="bg-black text-white p-1 rounded-md"
        @click="showModal = true"
      >
        New categorie
      </button>
    </div>
  </div>
  <div v-if="showModal">
    <transition name="modal-fade">
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
                  <form class="" @submit.prevent="creatdCategories()">
                    <div class="flex justify-between">
                      <div
                        class="select-none text-black text-lg mb-5 font-bold"
                      >
                        Create a new categorie
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
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddCategory",
  computed: {
    ...mapGetters("cate", ["allcate"]),
  },
  data: function () {
    return {
      showModal: false,
      model: {
        title: "",
        description: "",
      },
    };
  },

  methods: {
    ...mapActions("cate", ["getCat"]),
    success() {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        icon: "success",
        title: "Hi from Wello",
        text: `The categorie ${this.model.title} created with success☺️`,
        showCancelButton: "true",
      });
    },
    error() {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        icon: "error",
        title: "Hi from Wello",
        text: "Error encounted in catgory creation",
        showCancelButton: "true",
      });
    },
    async creatdCategories() {
      await axios
        .post(
          "http://localhost:8081/wp-json/wp/v2/categories/",
          {
            name: this.model.title,
            description: this.model.description,
            slug: this.model.description,
            parent: 0,
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
          this.$store.dispatch("cate/getCat");
          this.success();
          this.model.title = "";
          this.model.description = "";
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
