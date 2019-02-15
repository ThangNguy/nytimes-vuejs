<template>
  <div class="container">
    <header class="blog-header py-3">
      <div class="row flex-nowrap justify-content-between align-items-center">
        <div class="col text-center">
          <img src="../assets/nyt-icon.png">
        </div>
      </div>
    </header>
    <nav class="mb-3">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <form class="form-inline">
            <input class="form-control" type="search" v-model="search" placeholder="Search" aria-label="Search">
          </form>
        </li>
      </ul>
    </nav>
    <div class="row" v-if="times">
      <div
        class="col-md-6 card mb-4 box-shadow h-md-250 text-left"
        v-for="(time, index) in searchTitle"
        :key="index"
      >
        <h3 class="mb-0">
          <a class="text-dark" href="#">{{ trunTitle(time.headline.main) }}</a>
        </h3>
        <div class="mb-1 text-muted">{{ formatPubdate(time.pub_date) }}</div>
        <div class="snippet">
          <p class="card-text mb-auto">
            {{ truncate(time.snippet) }}
            <a :href="time.web_url">Detail</a>
          </p>
          <img :src="time | newsImage(time)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";

export default {
  name: "HomePage",
  data() {
    return {
      search: ""
    }

  },
  computed: {
    times() {
      return this.$store.state.times;
      console.log(this.$store.state.times);
    },
    searchTitle() {
      return this.times.filter((time) => {
        return _.lowerCase(time.headline.main).match(_.lowerCase(this.search))
      })
    }
  },
  methods: {
    truncate(str) {
      return _.truncate(str, {
        length: 100,
        separator: " "
      });
    },
    trunTitle(str) {
      return _.truncate(str, {
        length: 30,
        separator: " "
      });
    },
    formatPubdate(date) {
      return moment(date).format("MMMM, D");
    }
  },
  filters: {
    newsImage(time) {
      let baseURL = "https://static01.nyt.com/";
      let url =
        "images/2018/11/04/travel/04Hours-Singapore5/merlin_143821452_ed4b5ea3-b52c-496a-9a16-3c225ef111c0-articleLarge.jpg";
      if (time !== undefined && time.multimedia[0] !== undefined) {
        url = time.multimedia[0].url;
      }
      return baseURL + url;
    }
  },
  created() {
    this.$store.dispatch("getNYTimes");
  }
};
</script>

<style scoped lang="scss">
.snippet {
  display: inline-flex;
  p {
    width: 60%;
  }
  img {
    width: 35%;
    height: 100px;
  }
}

.nav {
  margin-bottom: 40px;
}
</style>
">
</style>

