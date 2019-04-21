import axios from 'axios';
import cheerio from 'cheerio';

async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data('count');
}

async function getInstagramFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('script[type="application/ld+json"]');
  let data = JSON.parse(span.html()).mainEntityofPage.interactionStatistic
    .userInteractionCount;
  return parseInt(data);
}

async function getTwitterCount() {
  const twitterHTML = await getHTML('https://twitter.com/NurulSundarani');
  const twitterCount = await getTwitterFollowers(twitterHTML);
  return twitterCount;
}

async function getInstagramCount() {
  const instagramHTML = await getHTML('https://www.instagram.com/nurul_1131/');
  const instagramCount = await getInstagramFollowers(instagramHTML);
  return instagramCount;
}

export { getInstagramCount, getTwitterCount };
