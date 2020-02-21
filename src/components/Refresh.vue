<template>
  <div class="refresh-contain" ref="refresh">
    <div class="refresh-wrap" ref="refreshWrap">
      <div class="swipe-contain" :style="{height:stretch, 'transition-duration':duration}">
        <slot name="swipeContain"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Event from "../assets/js/event";

export default {
  name: "refresh",
  data() {
    return {
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      direction: "",
      stretch: "10rem",
      duration: "0ms",
      needRefresh: false
    };
  },
  props: ["isLoading"],
  methods: {
    touchStart(e) {
      this.restTouchData();
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.duration = "0ms";
    },
    touchMove(e) {
      this.deltaX = e.touches[0].clientX - this.startX;
      this.deltaY = e.touches[0].clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.getDirection(this.deltaX, this.deltaY);

      if (this.direction == "down" && this.$el.scrollTop == 0) {
        this.stretch = `calc(10rem + ${this.offsetY}px)`;
        this.needRefresh = true;
      }
    },
    touchEnd() {
      this.stretch = "10rem";
      this.duration = "300ms";
      if (this.needRefresh) {
        this.$emit("refresh");
        this.isLoading = true;
      }
    },
    restTouchData() {
      this.startX = 0;
      this.startY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.direction = "";
    },
    getDirection(x, y) {
      let temp_x = Math.abs(x);
      let temp_y = Math.abs(y);
      if (temp_x > temp_y && temp_x > 10) {
        return "horizontal";
      }
      if (temp_y > temp_x && temp_y > 10 && y > 0) {
        return "down";
      }
    },
    onScroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
    bindTouchEvent(el) {
      Event.on(el, "touchstart", this.touchStart);
      Event.on(el, "touchmove", this.touchMove);
      Event.on(el, "touchend", this.touchEnd);
    }
  },
  mounted() {
    this.bindTouchEvent(this.$refs.refresh);
  }
};
</script>

<style>
.refresh-contain {
  margin-top: 140px;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
}
.swipe-contain {
}
</style>