<template>
  <NavBar />
  <div class="bg-slate-500">
    <div class="flex items-start space-x-2 overflow-x-auto pl-20 pt-10">
      <div
        class="px-5 py-5 bg-black rounded-xl"
        v-for="cat in allcate"
        v-bind:key="cat.id"
      >
        <div class="flex justify-between mb-4 w-[250px]">
          <div class="text-slate-300 text-sm font-bold p-1 rounded-md">
            <div class="rounded-sm text-[18px] hover:cursor-pointer">
              {{ cat.name }}
            </div>
          </div>
          <div class="flex space-x-2 text-white">
            <p class="bg-slate-400 w-6 h-6 rounded-full">{{ cat.count }}</p>
            <ModalCategorie :id="cat.id" />
          </div>
        </div>
        <div
          class="rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in w-[250px] h-10"
          v-bind:class="addColor()"
        >
          <div class="mt-2 overflow-y-auto">
            <div class="rounded-lg hover:cursor-pointer">
              <div class="">
                <div class="flex justify-center text-center items-center">
                  <p
                    class="px-3 py-1 text-md select-none font-semibold overflow-hidden text-white truncate"
                  >
                    {{ cat.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class=""
          @dragenter.prevent
          @dragover.prevent
          @drop="onDrop($event, cat.id)"
        >
          <PostComponent :id="cat.id" />
          <AddPost :id="cat.id" />
        </div>
      </div>
      <AddCategory />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddCategory from "@/components/AddCategory.vue";
import ModalCategorie from "./ModalCategorie.vue";
import PostComponent from "./PostComponent.vue";
import NavBar from "./NavBar.vue";
import AddPost from "./AddPost.vue";
import axios from "axios";

export default {
  name: "ListView",
  components: {
    AddCategory,
    ModalCategorie,
    PostComponent,
    AddPost,
    NavBar,
  },
  computed: {
    ...mapGetters("cate", ["allcate"]),
    ...mapGetters("post", ["allpost"]),
  },
  data: function () {
    return {
      bg: ["bg-yellow-500", "bg-green-500", "bg-cyan-500", "bg-red-500"],
      post: [],
      menu: false,
      model: {
        title: "",
        description: "",
      },
    };
  },

  methods: {
    ...mapActions("post", ["getPost"]),
    ...mapActions("cate", ["getCat"]),
    onDrop(event, id) {
      let ids = event.dataTransfer.getData("postID");
      const post = this.allpost.find((posts) => posts.id == ids);
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
          this.$store.dispatch("cate/getCat");
          this.$store.dispatch("post/getPost");
        })
        .catch((error) => {
          if (error.status == 403 || error.status == 401) {
            this.$router.push("/login");
          }
        });
    },
    addColor() {
      let color = this.bg[Math.floor(Math.random() * this.bg.length)];
      return color;
    },
  },
  created() {
    this.$store.dispatch("cate/getCat");
  },
};
</script>
