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
          <form class="form-inline">
            <input
              class="form-control"
              type="search"
              v-model="search"
              placeholder="Search"
              aria-label="Search"
            >
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
          <a class="text-dark" :href="time.web_url">{{ trunTitle(time.headline.main) }}</a>
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
    <div class="overflow-auto">
      <div>
        <b-pagination size="md" :total-rows="100" v-model="currentPage" @change="loadDataSet()" :per-page="10"/>
      </div>
    </div>
    <div class="loading-overlay" v-show="dataLoading">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { setTimeout } from 'timers'

export default {
  name: 'HomePage',
  data () {
    return {
      search: '',
      currentPage: 1,
      dataLoading: false
    }
  },
  computed: {
    times () {
      return this.$store.state.times
    },
    searchTitle () {
      return this.times.filter(time => {
        return _.lowerCase(time.headline.main).match(_.lowerCase(this.search))
      })
    }
  },
  methods: {
    truncate (str) {
      return _.truncate(str, {
        length: 100,
        separator: ' '
      })
    },
    trunTitle (str) {
      return _.truncate(str, {
        length: 30,
        separator: ' '
      })
    },
    formatPubdate (date) {
      return moment(date).format('MMMM, D')
    },
    loadData () {
      // Callback to call after success API in Vuex
      const callback = () => {
        this.dataLoading = false
      }
      // Start Loading
      this.dataLoading = true
      this.$store.dispatch('getNYTimes', {
        page: this.currentPage - 1,
        successCallback: callback
      })
    },
    loadDataSet () {
      setTimeout(this.loadData, 200)
    }
  },
  filters: {
    newsImage (time) {
      let baseURL = 'https://static01.nyt.com/'
      let url =
        'images/2018/11/04/travel/04Hours-Singapore5/merlin_143821452_ed4b5ea3-b52c-496a-9a16-3c225ef111c0-articleLarge.jpg'
      if (time !== undefined && time.multimedia[0] !== undefined) {
        url = time.multimedia[0].url
      }
      return baseURL + url
    }
  },
  created () {
    this.loadData()
  }
}
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

.loading-overlay {
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
