const { default: axios } = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
app.use(express.json());
// const https = require("node:https");

app.use((req, res, next) => {
  // 设置允许跨域的域名， *代表允许任何域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method == "OPTIONS") res.sendStatus(200);
  else next();
});

app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/z_h", async (req, res) => {
  const postId = "34594745";
  try {
    const response = await axios.get(
      `https://www.zhihu.com/question/${postId}`
    );
    const html = response.data;
    const $ = cheerio.load(html);

    // let apis = [];
    // const text = $(".css-376mun .RichText p").each((i, el) => {
    //   console.log(el);
    //   apis[i] = el.text();
    // });
    console.log("12431242", html);
    const post = {
      data: html,
    };
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/d_b_mov", async (req, res) => {
  const postId = "30304994";
  try {
    const response = await axios.get(
      `https://movie.douban.com/subject/${postId}/`
    );
    const html = response.data;
    const $ = cheerio.load(html);

    const text = $("#link-report").text();

    const post = {
      data: text,
      // title
    };
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/t_b", async (req, res) => {
  const postId = "8455021008";
  try {
    const response = await axios.get(`https://tieba.baidu.com/p/${postId}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const text = $("#post_content_147816136438").text();

    const post = {
      data: text,
      // title
    };
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/redpost/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    // const response = await axios.get(
    //   `https://www.xiaohongshu.com/discovery/item/${postId}?filter=note_comments`
    // );
    // const response = await axios.get(`https://www.zhihu.com/question/34594745`);
    // const response = await axios.get(
    //   `https://movie.douban.com/subject/30304994/`
    // );
    const response = await axios.get(
      `https://weibo.com/6625904195/4898750352854914`
    );
    // const response = await axios.get(
    //   `https://www.douban.com/group/topic/289865880/?_i=8639166362bb709,6391681pRN2TUT&dt_dapp=1`
    // );
    // const response = await axios.get(`https://www.zhihu.com/question/34594745`);

    const html = response.data;
    const $ = cheerio.load(html);
    var fruits = [];

    // 提取帖子标题
    // const title = $("#link-report .topic-content .rich-content p").each(
    //   function (i, elem) {
    //     fruits[i] = $(this).text();
    //   }
    // );
    const title = $(".main-bd").text();
    console.log("123456", response);

    // https
    //   .get(`https://www.xiaohongshu.com/discovery/item/${postId}`, (res) => {
    //     var html = "";
    //     console.log("statusCode:", res.statusCode);
    //     console.log("headers:", res.headers);
    //     console.log("res:", res);

    //     res.on("data", (d) => {
    //       html += d;
    //       process.stdout.write(d);
    //       console.log("data", d);
    //     });
    //     res.on("end", () => {
    //       console.log("html1234", html);
    //     });
    //   })
    //   .on("error", (e) => {
    //     console.error(e);
    //   });

    const post = {
      data: response.data,
      // title
    };
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.use("/.netlify/functions/api", router);
app.listen(port, () => {
  console.log(`服务器端运行成功: http://localhost:${port}`);
});

module.exports.handler = serverless(app);
