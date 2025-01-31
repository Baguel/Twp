<template>
  <div class="">
    <ListView />
  </div>
</template>

<script>
// import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import ListView from "@/components/ListView.vue";

export default {
  components: {
    ListView,
  },
  computed: {
    ...mapGetters("cate", ["allcate"]),
  },
  data: function () {
    return {
      post: [],
      menu: false,
      model: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    ...mapActions("cate", ["getCat"]),
    async deleteCat(id) {
      alert(id);
    },
    startDrag(evt, post) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", post.id);
    },
    onDrop(evt, list) {
      console.log("ok");
      const postID = evt.dataTransfer.getData("itemID");
      const post = this.posts.value.find((post) => post.id == postID);
      post.list = list;
    },
  },
  created() {
    this.$store.dispatch("cate/getCat");
  },
};
</script>
