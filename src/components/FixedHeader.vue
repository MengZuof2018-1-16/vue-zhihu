<template>
  <header id="fixed-header" @click="backTop">
    <div class="daily-date">
      <h4 class="day">{{day}}</h4>
      <h4 class="month">{{monthArr[month]}}</h4>
    </div>
    <h1 class="headline">{{headline}}</h1>
  </header>
</template>

<script>
export default {
  name: "fixed-header",
  data() {
    return {
      day: 1,
      month: 1,
      headline: "知乎日报",
      monthArr: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ]
    };
  },
  methods: {
    getDay() {
      this.day = new Date().getDate();
    },
    getMonth() {
      this.month = new Date().getMonth();
    },
    backTop() {
      // if (document.documentElement.scrollTop) {
      //   document.documentElement.scrollTop = 0;
      //   alert("docment");
      // } else if (document.body.scrollTop) {
      //   document.body.scrollTop = 0;
      // } else if (window.pageYOffset) {
      //   window.pageYOffset = 0;
      //   alert("pageY");
      // }
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    this.getDay();
    this.getMonth();
  }
};
</script>

<style lang="scss" scoped>
#fixed-header {
  position: fixed;
  width: 100%;
  top: 0;
  padding: 30px 35px 30px 0;
  display: flex;
  background-color: #ffffff;
  z-index: 999;

  .daily-date {
    display: inline-flex;
    width: 145px;
    align-items: flex-start;
    justify-content: center;
    line-height: 1;
    flex-wrap: wrap;

    .day {
      width: 100%;
      font-size: 35px;
      padding: 10px 0;
    }
    .month {
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
</style>