<template>
  <div class="index-contain">
    <fixed-header></fixed-header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-swipe :autoplay="3000" indicator-color="white" ref="vanSwipe">
        <van-swipe-item v-for="item in topStories" :key="item.id">
          <daily-header-image
            :image-hue="item.image_hue"
            :author="item.hint"
            :title="item.title"
            :image="picImageUrl(item.image,'pic4')"
            :index="true"
          ></daily-header-image>
        </van-swipe-item>
      </van-swipe>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :error.sync="error"
        error-text="加载出错了..."
      >
        <div class="story-list">
          <section class="story-list-section">
            <ul class="story-list-wrapper">
              <li v-for="(item, index) in stories" :key="index">
                <div class="div-line">
                  <span>{{ getDateString(item.date) }}</span>
                  <div class="line"></div>
                </div>
                <router-link
                  :to="{ name: 'daily_page', params: { id: story.id } }"
                  class="story-list-item"
                  v-for="story in item.stories"
                  :key="story.id"
                >
                  <div class="story-text">
                    <h1 class="story-text-title">{{ story.title }}</h1>
                    <span class="story-text-hint">{{ story.hint }}</span>
                  </div>
                  <div
                    class="story-image"
                    v-lazy:background-image="
                      picImageUrl(story.images[0], 'pic1')
                    "
                  ></div>
                </router-link>
              </li>
            </ul>
          </section>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { List, Swipe, SwipeItem, PullRefresh } from "vant";
import Header from "../components/FixedHeader";
import DailyHeaderImage from "../components/DailyHeaderImage.vue";

export default {
  name: "index",
  data() {
    return {
      loading: false,
      error: false,
      finished: false,
      isLoading: false,
      topStories: [],
      stories: [],
      etag: "",
      beforeDate: "20200101"
    };
  },
  components: {
    [List.name]: List,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [PullRefresh.name]: PullRefresh,
    [Header.name]: Header,
    [DailyHeaderImage.name]: DailyHeaderImage
  },
  methods: {
    onLoad() {
      this.axios
        .get("/api/stories/before/" + this.beforeDate)
        .then(({ data }) => {
          this.stories.push({ date: data.date, stories: data.stories });
          this.beforeDate = data.date;
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    },
    getDateString(str) {
      let year = parseInt(str.substr(0, 4));
      let month = parseInt(str.substr(4, 2));
      let day = parseInt(str.substr(6, 2));
      let thisYear = new Date().getFullYear();
      return year == thisYear
        ? month + "月" + day + "日"
        : year + "年" + month + "月" + day + "日";
    },
    onRefresh() {
      this.axios
        .get("/api/stories/latest", { headers: { "If-None-Match": this.etag } })
        .then(({ data, headers }) => {
          this.topStories = data.top_stories;
          this.stories[0] = data.stories;
          this.etag = headers.etag;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    convertColor(hexcolor, opacity) {
      var colorChange = [];
      for (var i = 2; i < hexcolor.length; i += 2) {
        colorChange.push(parseInt("0x" + hexcolor.slice(i, i + 2)));
      }
      return "RGBA(" + colorChange.join(",") + "," + opacity + ")";
    },
    picImageUrl(url, replace) {
      if (url.indexOf("pic3")) {
        return url.replace("pic3", replace);
      }
    }
  },
  mounted() {
    this.axios.get("/api/stories/latest").then(({ data, headers }) => {
      window.console.log(data);
      this.topStories = data.top_stories;
      this.stories.push({ date: data.date, stories: data.stories });
      this.etag = headers.etag;
      this.beforeDate = data.date;
    });
    console.warn("mounted");
    console.log(List);
  }
};
</script>

<style lang="scss">
.van-swipe__indicators {
  right: 45px;
  left: auto;
  transform: translateX(0);
}
</style>
<style lang="scss" scoped>
.index-contain {
}

.daily-list {
  padding-top: 140px;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}

.van-swipe {
  margin-top: 70px;

  .van-swipe-item {
    .top-story-contain {
      background-size: cover;
      background-position: center center;
      // height: 750px !important;
      height: 100%;
      position: relative;
    }
    // background: url('../assets/logo.png') no-repeat center;
    float: left;
  }
}

.story-list {
  li {
    position: relative;
    padding-top: 110px;
  }
  .story-list-wrapper li:first-child {
    padding-top: 55px;

    .div-line {
      display: none;
    }
  }
  .div-line {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      padding: 0 35px;
      font-weight: bold;
      letter-spacing: 5px;
      color: #acacac;
    }
    .line {
      height: 1px;
      background-color: #acacac;
      flex: auto;
    }
  }
  .story-list-item {
    padding: 0 35px 75px;
    display: flex;
    justify-content: space-between;

    .story-text {
      width: 70%;
      text-align: left;

      .story-text-title {
        font-size: 36px;
        color: #0b0b0b;
        line-height: 1.3;
        margin: 15px 0 15px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
      }
      .story-text-hint {
        color: #acacac;
        font-size: 28px;
      }
    }
    .story-image {
      width: 165px;
      height: 165px;
      background-size: cover;
      background-position: center;
      border-radius: 5px;
    }
  }
}
</style>