<template>
  <div>
    <div
      class="bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in w-[250px]"
      v-for="post in allpost"
      v-bind:key="post.id"
    >
      <div class="mt-2 overflow-y-auto" v-if="post.categories == id">
        <div
          class="rounded-lg hover:cursor-pointer"
          draggable="true"
          @dragstart="drag($event, post)"
          @click="(show = true), (postId = post)"
        >
          <div class="text-white">
            <div class="flex justify-between items-center">
              <p
                class="px-3 py-1 text-md select-none font-semibold overflow-hidden truncate"
              >
                {{ post.title.rendered }}
              </p>
            </div>
            <p class="px-3 py-1 text-sm select-none truncate">
              {{ post.content.rendered.replace(/<[^>]+>/g, "") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="show">
    <DetailPost :id="postId.id" @close-event="alerte" :show="show" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DetailPost from "./DetailPost.vue";
import axios from "axios";

export default {
  name: "PostComponent",
  components: {
    DetailPost,
  },
  props: {
    id: Number,
    category: Number,
  },
  data() {
    return {
      show: false,
      showModal: false,
      postId: 0,
      post: [],
    };
  },
  computed: {
    ...mapGetters("post", ["allpost"]),
    ...mapGetters("cate", ["allcate"]),
  },
  methods: {
    ...mapActions("post", ["getPost"]),
    ...mapActions("cate", ["getCat"]),
    alerte() {
      this.show = false;
    },
    drag(event, post) {
      console.log(post);
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("postID", post.id);
      }
    },
    onDrop(event, id) {
      let ids = event.dataTransfer.getData("postID");
      const post = this.allpost.find((posts) => posts.id == ids);
      console.log(post.id);
      console.log(id);
      const cate = this.allcate.find((cat) => cat.id == id);
      axios
        .put(
          `http://localhost:8081/wp-json/wp/v2/posts/${post.id}`,
          {
            categories: cate.id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("wp"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.$store.dispatch("post/getPost");
        })
        .catch((error) => {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        });
    },
  },
  created() {
    this.$store.dispatch("post/getPost");
  },
};
</script>
