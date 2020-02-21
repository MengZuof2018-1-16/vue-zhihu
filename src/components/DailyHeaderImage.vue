<template>
  <div class="daily-top-contain" :class="{index:index}">
    <div class="daily-top-img">
      <img :src="image" />
      <div class="image-hue" :style="{ backgroundImage: getBackgroundColor(imageHue) }"></div>
    </div>
    <p class="daily-title">{{ title }}</p>
    <p class="daily-author">{{ author }}</p>
    <p class="daily-image-source">{{ imageSource }}</p>
  </div>
</template>

<script>
export default {
  name: "daily-header-image",
  data() {
    return {};
  },
  props: ["imageHue", "imageSource", "title", "image", "author", "index"],
  methods: {
    getBackgroundColor(hexcolor) {
      var colorChange = [];
      for (var i = 2; i < hexcolor.length; i += 2) {
        colorChange.push(parseInt("0x" + hexcolor.slice(i, i + 2)));
      }
      return (
        "linear-gradient(0, " +
        "RGBA(" +
        colorChange.join(",") +
        ",1)," +
        "RGBA(" +
        colorChange.join(",") +
        ",0.9)," +
        "RGBA(" +
        colorChange.join(",") +
        ",0)" +
        ")"
      );
    }
  }
};
</script>

<style lang="scss">
.daily-top-contain {
  position: relative;
}
.daily-top-img {
  position: relative;
  height: 100vw;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }

  .image-hue {
    position: absolute;
    width: 100%;
    height: 50%;
    bottom: 0;
  }
}

.daily-title {
  position: absolute;
  left: 45px;
  right: 45px;
  bottom: 85px;
  font-size: 50px;
  color: #ffffff;
  line-height: 1.3;
  text-align: left;
  font-weight: bold;
}
.index .daily-title {
  bottom: 120px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.daily-author {
  position: absolute;
  left: 45px;
  right: 45px;
  bottom: 55px;
  font-size: 30px;
  color: #ffffff;
  text-align: left;
}
.daily-image-source {
  position: absolute;
  left: 45px;
  right: 45px;
  bottom: 30px;
  font-size: 20px;
  color: #d2c7b8;
  text-align: right;
}
</style>
