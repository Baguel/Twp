<template>
  <div v-for="comments in comment" v-bind:key="comments.id">
    <div class="space-y-5">
      <div
        class="mx-auto my-8 flex max-w-screen-sm rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8"
      >
        <img
          class="mr-5 block h-8 w-8 max-w-full text-left align-middle sm:h-16 sm:w-16"
          src="/jObGDNw-_400x400.jpg"
          alt="Profile Picture"
        />
        <div class="w-full text-left">
          <div
            class="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row"
          >
            <h3 class="font-medium">{{ comments.author_name }}</h3>
            <time class="text-xs" datetime="2022-11-13T20:00Z">{{
              comments.date.toString()
            }}</time>
          </div>
          <p class="text-sm">
            {{ comments.content.rendered.replace(/<[^>]+>/g, "") }}
          </p>
          <div
            class="mt-5 flex items-center justify-end text-gray-600 space-x-5"
            v-if="!commentInput || comments.id != CommentId"
          >
            <button
              class="text-red-500"
              @click="supprimerCommentaire(comments.id)"
            >
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
            </button>
            <button
              class="text-black"
              @click="(commentInput = true), (CommentId = comments.id)"
            >
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
            </button>
          </div>
          <div v-if="commentInput && comments.id == CommentId">
            <UpdateComment :id="comments.id" @modal-event="updatePost()" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="font-bold">COMMENTS</p>
  <form
    @submit.prevent="ajouterCommentaire"
    class="w-full relative flex justify-between gap-2"
  >
    <input
      type="text"
      class="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
      placeholder="Write comments here...."
      v-model="model.content"
      required
    />
    <button type="submit" class="absolute right-6 top-[18px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
          stroke="#111827"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </form>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import UpdateComment from "./UpdateComment.vue";

export default {
  name: "CommentView",
  props: {
    id: Number,
  },
  components: {
    UpdateComment,
  },
  data() {
    return {
      showModal: false,
      commentInput: false,
      comment: [],
      CommentId: 0,
      newContent: "",
      model: {
        content: "",
      },
    };
  },
  methods: {
    ...mapActions("post", ["getPost"]),
    ...mapActions("cate", ["getCat"]),
    postData() {
      try {
        axios
          .get(`http://localhost:8081/wp-json/wp/v2/comments?post=${this.id}`)
          .then((res) => (this.comment = res.data));
      } catch (error) {
        if (error.status == 403 || error.status == 401) {
          this.$router.push("/login");
        }
      }
    },
    updatePost() {
      this.postData();
      this.commentInput = false;
    },
    async ajouterCommentaire() {
      try {
        await axios.post(
          "http://localhost:8081/wp-json/wp/v2/comments",
          {
            post: this.id,
            content: this.model.content,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("wp"),
            },
          }
        );
        this.model.content = "";
        this.postData();
      } catch (error) {
        if (error.status == 403 || error.status == 401) {
          this.$router.push("/login");
        }
      }
    },
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
    async supprimerCommentaire(id) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
        try {
          await axios.delete(
            `http://localhost:8081/wp-json/wp/v2/comments/${id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("wp"),
              },
            }
          );
          this.postData();
        } catch (error) {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        }
      }
    },
  },
  mounted() {
    try {
      axios
        .get(`http://localhost:8081/wp-json/wp/v2/comments?post=${this.id}`)
        .then((res) => (this.comment = res.data));
    } catch (error) {
      if (error.status == 403 || error.status == 401) {
        this.$router.push("/login");
      }
    }
  },
};
</script>
