<template>
  <van-skeleton title :row="10" :loading="loading">
    <div class="detail-contain">
      <daily-header-image
        :image-hue="imageHue"
        :image-source="imageSource"
        :title="title"
        :image="image"
      ></daily-header-image>
      <div v-html="body"></div>
    </div>
  </van-skeleton>
</template>

<script>
import DailyHeaderImage from "../components/DailyHeaderImage.vue";
import { Skeleton } from "vant";
export default {
  name: "news",
  data() {
    return {
      body: "",
      imageHue: "",
      imageSource: "",
      title: "",
      image: "",
      loading: true
    };
  },
  components: {
    [DailyHeaderImage.name]: DailyHeaderImage,
    [Skeleton.name]: Skeleton
  },
  methods: {
    createCssLink(cssURL) {
      let linkTag = document.createElement("link");
      linkTag.setAttribute("rel", "stylesheet");
      linkTag.setAttribute("charset", "utf-8");
      linkTag.setAttribute("type", "text/css");
      linkTag.href = cssURL;
      return linkTag;
    }
  },
  beforeRouteEnter(to, from, next) {
    let id = to.params.id;
    next(vm => {
      vm.axios.get("/api/stories/content/" + id).then(({ data }) => {
        vm.imageHue = data.image_hue;
        vm.image = data.image.replace("pic3", "pic1");
        vm.title = data.title;
        vm.imageSource = data.image_source;
        vm.body = data.body.replace(/pic3/g, "pic1");
        if (data.section) {
          vm.$nextTick(() => {
            let questions = document.getElementsByClassName("question");
            for (var i = 0; i < questions.length - 1; i++) {
              var answer = questions[i].children[1];
              var author = answer.children[0].children[1].innerHTML.replace(
                "，",
                ""
              );
              let p = answer.children[1].children[0].innerHTML;
              answer.children[1].children[0].innerHTML = `@${author}：${p}`;
            }
          });
        }
        vm.loading = false;
      });
    });
  },
  mounted() {
    //console.log("mounted");
  }
};
</script>

<style lang="scss">
.van-skeleton {
  margin-top: 20px;
}
.main-wrap {
  background-color: #f6f6f6;
}
figure {
  margin: 0;
}
.content-image {
  max-width: 100%;
  border-radius: 5px;
}
.question {
  padding: 0 45px;
  margin: 15px 0px;
  background-color: #ffffff;
  padding-bottom: 55px;

  .question-title {
    font-size: 45px;
    text-align: left;
    line-height: 1.5;
    padding-top: 35px;
  }

  .view-more {
    display: none;
  }
}
.question .answer .meta {
  display: none;
}
.question .answer:nth-child(1) .meta {
  display: block;
}
.answer {
  .meta {
    width: 100%;
    margin-top: 55px;
    margin-bottom: 70px;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;

    .avatar {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      vertical-align: middle;
    }
    span {
      font-size: 30px;
      color: #8f8f8f;
      vertical-align: middle;
    }
  }
  .content {
    color: #444444;
    text-align: left;
    * {
      font-size: 35px;
      line-height: 1.875;
    }
    p,
    div {
      margin: 24px 0;

      strong {
        font-weight: bold;
      }
      em {
        font-style: italic;
        font-weight: inherit;
      }
      img {
        max-width: 100%;
      }
    }

    a {
      color: #444444;
      text-decoration: underline;
    }
    ul {
      list-style: circle;
    }
  }
}
</style>
