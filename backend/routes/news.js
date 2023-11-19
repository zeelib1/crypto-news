const express = require("express");
const axios = require("axios");

const router = express.Router();
const chatController = require("./openai.js"); // Replace with the actual path to your openai.js file

router.get("/news", async (req, res) => {
  const token = process.env.NEWS_TOKEN;

  try {
    // const response = await axios.get(
    //   `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`
    // );
    // // console.log(newsData);
    // const newsData = response.data.data.map((news) => ({
    //   image: news.image_url,
    //   title: news.title,
    //   preview: news.text,
    //   url: news.url,
    //   readMore: news.news_url,
    // }));
    const response = await axios.get(
      // `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`
      "https://script.googleusercontent.com/macros/echo?user_content_key=4eLIVB4QOTmRwCEFmejStJuhQCSCRC2q0Xa4oi6HfXWpHbPpEBV9sxUEmDz4jFC7cakMVRbxdfGClfVxenQ6FXAsjZY5Bik5m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnB6NW3NfHDUvhZ7S4EyjBwHdONAONEwKBaPor4FrdBPKyslI_jijfp5GuCLyD4T_FxlsDHUa6YUxcTuJG59yh0ur9YVb6qb6rtz9Jw9Md8uu&lib=Mqf_okHJnh-a5kZF0LSklgYFMVPdJHIXQ"
    );
    const newsData = response.data.data.map((news) => ({
      image: news.image,
      title: news.title,
      preview: news.preview,
      url: news.url,
      readMore: news.url,
    }));

    res.json(newsData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the Cryptonews API.",
    });
  }
});
router.get("/nft", async (req, res) => {
  const token = process.env.NEWS_TOKEN;

  try {
    // const response = await axios.get(
    //   `https://cryptonews-api.com/api/v1/category?section=general&items=55&topic=NFT&page=1&token=${token}`
    // );
    // // console.log(newsData);
    // const newsData = response.data.data.map((news) => ({
    //   image: news.image_url,
    //   title: news.title,
    //   preview: news.text,
    //   url: news.url,
    //   readMore: news.news_url,
    // }));
    const response = await axios.get(
      //   `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`

      //NFT
      "https://script.googleusercontent.com/macros/echo?user_content_key=zALyE5iZqMTJgs-i1zOEDOIw1_OT7Gh-x88jKReuA6ezyfXnJ_bSATndolXOIvEcsL6ykxdIdptGPBUBpMa0TR662pYA2SBim5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCaBptbE-9hti4gD6uErvsUF5AiIzqpEDQVZCjEW-NyAC0eOtdeo8GxEm4bO-xB1kpJUqqA91AvonP3-Syx4iZbDqQYxZJRG8A&lib=MKASOD_uUu5GXoYNnEFuIflRjwUM6HP_Z"
    );
    const newsData = response.data.data.map((news) => ({
      image: news.image,
      title: news.title,
      preview: news.preview,
      url: news.url,
      readMore: news.url,
    }));
    res.json(newsData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message:
        "An error occurred while fetching data from the Cryptonews APIII.",
    });
  }
});
router.get("/prices-all", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.binance.com/api/v3/ticker/price"
    );

    const symbols = ["BTCUSDT", "ETHUSDT", "MATICUSDT", "ADAUSDT"];
    const priceData = response.data.filter((item) =>
      symbols.includes(item.symbol)
    );

    if (priceData.length === 0) {
      return res.status(404).json({
        message: `Prices for symbols ${symbols.join(", ")} not found.`,
      });
    }

    res.json(priceData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the Binance API.",
    });
  }
});

router.get("/prices/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/price`
    );

    const priceData = {
      symbol: response.data.symbol,
      price: response.data.price,
    };

    res.json(priceData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the Binance API.",
    });
  }
});
router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await chatController.POST(prompt);
    res.send(result);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while processing the chat request.",
    });
  }
});
router.get("/regulations", async (req, res) => {
  const token = process.env.NEWS_TOKEN;

  try {
    // const response = await axios.get(
    //   `https://cryptonews-api.com/api/v1/category?section=general&items=7&topic=Regulations&page=1&token=${token}`
    // );
    // // console.log(newsData);
    // const newsData = response.data.data.map((news) => ({
    //   image: news.image_url,
    //   title: news.title,
    //   preview: news.text,
    //   url: news.url,
    //   readMore: news.news_url,
    //   id: news._id,
    // }));
    const response = await axios.get(
      // `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`
      "https://script.googleusercontent.com/macros/echo?user_content_key=m7H_Kmo7vlBE4yCV1s5-yLZ427FNZnAyAUZWUBPR9DVt_4BDgWWhXO4ykj5h5l_V0ZnofX-Uggkcnmg1yFivRQywVrpNTnnwm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnB8ex65WXef7EHwHtd0ikuL2hzJq76R-oDTGmcaxaNEsV0eM4Qfc-FE_XqK1ktSHf8AjZ0eDm51NJYrjiwHwieujMlPMCO3M_Q&lib=M3-riw0b7GK8_5ptYzpm_PVRjwUM6HP_Z"
    );
    const newsData = response.data.data.map((news) => ({
      image: news.image,
      title: news.title,
      preview: news.preview,
      url: news.url,
      readMore: news.url,
    }));
    res.json(newsData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the Cryptonews API.",
    });
  }
});
router.get("/ticker/:symbol", async (req, res) => {
  const token = process.env.NEWS_TOKEN;
  const symbol = req.params.symbol.toUpperCase();
  let symbolUrl = "";
  if (symbol === "BTC") {
    const btcUrl =
      "https://script.googleusercontent.com/macros/echo?user_content_key=PoMaKPOKifOX1qWivri_b8PVsKdcYab5356rL2AKLDj8F1SiAEAI6FPbN83sayfZ1-oX-71GebYQF9H8DKx9Jv8IWPg3egJAm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPKQmkgn6Uqj8YFZwJZLWGkAXWjMCj4Qu4_oeVLRrjvXIwNaBF2MkMEo9tkOwBM_fMNRrq-lczwzo1arcCZuz9AZiZCxYzFL0g&lib=MnEYv4ldoIc08f7En9BtjSlRjwUM6HP_Z";

    symbolUrl = btcUrl;
  } else if (symbol === "MATIC") {
    const maticURL =
      "https://script.googleusercontent.com/macros/echo?user_content_key=uuwLD8wenn7i5d68bT9NU_zJIMiDl2Q0MQ5bc_HgBUXyy_RJI7Q6MralCb-pENnAnONXJSTyvGsQ5SxoLpn_FU-bGy83DdFSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMJOiFb_Kp46klK0CMTD7FHErT0xU1Z-JAwfDH8lua1CIi1mh8LxsfsXwBoxRLM-zIyJs0E-EAeW4ntTjY7HQ3ABlEBMKeI23tz9Jw9Md8uu&lib=MMKIT_Po-8NvjwuANFBvmroFMVPdJHIXQ";

    symbolUrl = maticURL;
  } else if (symbol === "ETH") {
    const ethURL =
      "https://script.googleusercontent.com/macros/echo?user_content_key=5UvFkufVSJfJfOyN9BsF8fKDSNyB9P2D2inh6y6crv4Lz39-7MLXBMVO7vGkUdPj9sRtyzfbxiZPi3nH0j_cCeUJkVnFKce7m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC-YzgfVS8HYkerId4ngvMglMAPYPUT25tHtlLni8MbZhIMCIXICnv159FVdb807tPkfIxSfhWtM4L1PPl6gYzASyBZ9YN3Huw&lib=MMNRdIA7G3xZBs9UeGaujEVRjwUM6HP_Z";
    symbolUrl = ethURL;
  }

  try {
    // const response = await axios.get(
    //   `https://cryptonews-api.com/api/v1?tickers-only=${symbol}&items=10&page=1&token=${token}`
    // );

    // if (!response.data.data || !Array.isArray(response.data.data)) {
    //   console.error(
    //     `Unexpected response from Cryptonews API: ${response.data}`
    //   );
    //   return res.status(500).json({
    //     message: "An unexpected response was received from the Cryptonews API.",
    //   });
    // }

    // const tickerData = response.data.data.map((ticker) => ({
    //   image: ticker.image_url,
    //   title: ticker.title,
    //   preview: ticker.text,
    //   url: ticker.url,
    //   readMore: ticker.news_url,
    // }));
    const response = await axios.get(
      // `https://cryptonews-api.com/api/v1/category?section=alltickers&items=17&page=1&token=${token}`
      symbolUrl
    );
    const tickerData = response.data.data.map((news) => ({
      image: news.image,
      title: news.title,
      preview: news.preview,
      url: news.url,
      readMore: news.url,
    }));

    res.json(tickerData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the Cryptonews API.",
    });
  }
});
router.get("/live-prices", async (req, res) => {
  try {
    const ids =
      "bitcoin,ethereum,solana,polygon,cardano,shiba-inu,aave,near,dogecoin,floki,memag,flow,immutable,pepe,arbitrum,optimism,aptos,filecoin,tron,gmx,mana";
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`
    );

    if (response.data.length === 0) {
      return res
        .status(404)
        .json({ message: `Prices for symbols ${ids} not found.` });
    }

    const priceData = response.data.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      price_change_24h: coin.price_change_percentage_24h,
    }));

    res.json(priceData);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({
      message: "An error occurred while fetching data from the CoinGecko API.",
    });
  }
});

module.exports = router;
