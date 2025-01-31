<template>
  <div v-show="show">
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500/75 duration-500 transition-opacity opacity-20"
        aria-hidden="true"
      ></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl"
          >
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:items-start">
                <div class="">
                  <div class="flex justify-between">
                    <div class="select-none text-black text-lg mb-5 font-bold">
                      Detail Post
                    </div>
                    <button @click="$emit('closeEvent')">
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
                  <div class="space-y-5">
                    <div class="grid grid-cols-12 gap-[15px] max-md:flex-col">
                      <div class="col-span-2">
                        <div class="flex p-2">
                          <div>
                            <svg
                              class="vpbnr m5z5i"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="4 7 4 4 20 4 20 7"></polyline>
                              <line x1="9" x2="15" y1="20" y2="20"></line>
                              <line x1="12" x2="12" y1="4" y2="20"></line>
                            </svg>
                          </div>
                          <div>
                            <p>Title</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-10">
                        <div>
                          <input
                            class="w-full p-2 rounded-md focus:bg-slate-200 focus:outline-none"
                            type="text"
                            v-model="model.title"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-12 gap-4 max-md:flex-col">
                      <div class="col-span-2">
                        <div class="flex p-2">
                          <div>
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
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p>Content</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-10">
                        <div>
                          <textarea
                            name="description"
                            id="description"
                            rows="3"
                            class="block w-full rounded-md focus:bg-slate-200 focus:outline-none px-3 py-1.5 text-base text-gray-900"
                            v-model="model.content"
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <DeletePost :id="id" @close-event="$emit('closeEvent')" />
                  </div>
                  <CommentView :id="id" />
                  <div @click="closeModal" class="mt-2 flex justify-end">
                    <button
                      class="bg-black p-2 text-white font-semibold rounded-md"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CommentView from "./CommentView.vue";
import DeletePost from "./DeletePost.vue";
import axios from "axios";

export default {
  name: "DetailPost",
  props: {
    show: Boolean,
    id: Number,
  },
  components: {
    CommentView,
    DeletePost,
  },
  data() {
    return {
      showModal: false,
      post: [],
      model: {
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapGetters("post", ["allpost"]),
  },
  methods: {
    ...mapActions("post", ["getPost"]),
    alerte() {
      this.showModal = false;
    },
    async closeModal() {
      await axios
        .put(
          `http://localhost:8081/wp-json/wp/v2/posts/${this.id}`,
          {
            title: this.model.title,
            content: this.model.content,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("wp"),
            },
          }
        )
        .then((res) => {
          this.showModal = false;
          this.$store.dispatch("post/getPost");
          this.$emit("closeEvent");
          console.log(res);
        })
        .catch((error) => {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        });
    },
  },

  async mounted() {
    await axios
      .get(`http://localhost:8081/wp-json/wp/v2/posts/${this.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("wp"),
        },
      })
      .then((res) => {
        this.model.title = res.data.title.rendered;
        this.model.content = res.data.content.rendered.replace(/<[^>]+>/g, "");
      })
      .catch((error) => {
        if (error.status == 403 || error.status == 401) {
          this.$router.push("/login");
        }
      });
  },
};
</script>
