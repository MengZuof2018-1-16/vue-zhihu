<template>
  <div class="index-contain">
    <header id="fixed_header">
      <div class="date-today">
        <h4 class="day-today">8</h4>
        <h4 class="month-today">一月</h4>
      </div>
      <h1 class="headline">知乎日报</h1>
    </header>
    <iscroll-view
      @pullDown="onRefresh"
      class="scroll-view"
      @scrollStart="log"
      ref="iscroll"
    >
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in topStories" :key="item.id">
          <div
            class="top-story-contain"
            :style="'background-image:url(' + item.image + ')'"
          >
            <div
              class="story-info"
              :style="
                'background-image: linear-gradient(to top,' +
                  convertColor(item.image_hue, 1) +
                  ',' +
                  convertColor(item.image_hue, 0)
              "
            >
              <h1 class="story-title">{{ item.title }}</h1>
              <span class="story-hint">{{ item.hint }}</span>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="story-list">
        <section class="story-list-section">
          <ul class="story-list-wrapper">
            <li v-for="item in stories" :key="item.id" class="story-list-item">
              <div class="story-text">
                <h1 class="story-text-title">{{ item.title }}</h1>
                <span class="story-text-hint">{{ item.hint }}</span>
              </div>
              <div
                class="story-image"
                :style="'background-image:url(' + item.images[0] + ')'"
              ></div>
            </li>
          </ul>
        </section>
      </div>
    </iscroll-view>
  </div>
</template>

<script>
import { List, Swipe, SwipeItem } from 'vant'

export default {
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      topStories: [],
      stories: [],
    }
  },
  components: {
    [List.name]: List,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    //[PullRefresh.name]: PullRefresh,
  },
  methods: {
    onLoad() {},
    onRefresh() {
      //alert('fuck')
    },
    convertColor(hexcolor, opacity) {
      var colorChange = []
      for (var i = 2; i < hexcolor.length; i += 2) {
        colorChange.push(parseInt('0x' + hexcolor.slice(i, i + 2)))
      }
      return 'RGBA(' + colorChange.join(',') + ',' + opacity + ')'
    },
    log(iscroll) {
      console.log(iscroll)
    },
  },
  mounted() {
    this.axios.get('/api/stories/latest').then(response => {
      let res = eval(response)
      window.console.log(res)
      this.topStories = res.data.top_stories
      this.stories = res.data.stories
      //this.$refs.iscroll.refresh()
      setTimeout(this.$refs.iscroll.refresh, 0)
    })
  },
}
</script>

<style lang="scss" scoped>
.index-contain {
  height: 100%;
}
#fixed_header {
  position: fixed;
  width: 100%;
  top: 0;
  padding: 30px 35px 30px 0;
  display: flex;
  background-color: #ffffff;
  z-index: 999;

  .date-today {
    display: inline-flex;
    width: 145px;
    align-items: flex-start;
    justify-content: center;
    line-height: 1;
    flex-wrap: wrap;

    .day-today {
      width: 100%;
      font-size: 35px;
      padding: 10px 0;
    }
    .month-today {
      font-size: 25px;
    }
  }

  .headline {
    font-size: 55px;
    padding: 0 30px;
    line-height: 85px;
    border-left: 4px solid #cecece;
  }
}

.van-swipe {
  .van-swipe-item {
    .top-story-contain {
      background-size: cover;
      background-position: center center;
      height: 750px !important;
      position: relative;
    }
    // background: url('../assets/logo.png') no-repeat center;
    float: left;
  }
}

.story-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: left;
  padding: 0 45px 60px;
  box-sizing: border-box;

  .story-title {
    font-size: 50px;
    color: #ffffff;
    line-height: 70px;
    padding-bottom: 20px;
  }

  .story-hint {
    font-size: 35px;
    color: #ffffff;
  }
}

.story-list {
  padding-top: 55px;

  .story-list-item {
    padding: 0 35px 75px;
    display: flex;
    justify-content: space-between;

    .story-text {
      width: 70%;
      text-align: left;

      .story-text-title {
        font-size: 38px;
        line-height: 1.3;
        padding-bottom: 20px;
      }
    }
    .story-image {
      width: 170px;
      height: 170px;
      background-size: cover;
      background-position: center;
    }
  }
}

.scroll-view {
  /* -- Attention: This line is extremely important in chrome 55+! -- */
  touch-action: none;
  /* -- Attention-- */
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  margin-top: 140px;
}
</style>
