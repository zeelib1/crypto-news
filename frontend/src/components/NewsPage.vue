//
<template>
  //
  <div>
    //
    <!-- UPPER NAVBAR -->
    //
    <nav class="flex items-center uppercase font-normal sm:flex">
      //
      <img
        class="w-1/4"
        src="https://fair-votes.com/img/6.%20O%20NAMA/logo/index.png"
        alt="logo"
      />
      //
      <ul class="flex">
        //
        <li class="m-5">Naslovnica</li>
        //
        <li class="m-5">Vijesti</li>
        //
        <li class="m-5">Sport</li>
        //
        <li class="m-5">Magazin</li>
        //
        <li class="m-5">Oglasi</li>
        //
        <li class="m-5">Ostalo</li>
        //
      </ul>
      //
      <img
        class="ml-auto mr-5 mt-3 h-10 align-middle"
        src="https://itsa.org.uk/wp-content/uploads/2017/09/search.png"
        alt="search"
      />
      //
    </nav>

    //
    <!-- INNER NAVBAR -->
    //
    <nav class="flex items-center uppercase font-normal md:flex">
      //
      <ul class="flex">
        //
        <li class="m-4 uppercase font-bold text-index text-xl">Vijesti</li>
        //
        <li class="m-5">Hrvatska</li>
        //
        <li class="m-5">Zagreb</li>
        //
        <li class="m-5">Regija</li>
        //
        <li class="m-5">EU</li>
        //
        <li class="m-5">Svijet</li>
        //
        <li class="m-5">Znanost</li>
        //
        <li class="m-5">Crna Kronika</li>
        //
        <li class="m-5">Komentari</li>
        //
        <li class="m-5">Novac</li>
        //
      </ul>
      //
      <hr class="border-lightgray" />
      //
    </nav>

    //
    <!-- MAIN BODY -->
    //
    <main class="flex flex-col md:flex-row">
      //
      <section class="p-2 border-lightgray lg:w-3/5">
        //
        <img class="mb-2" src="https://via.placeholder.com/500x300" alt="" /> //
        <a href="https://www.example.com" target="_blank">
          //
          <h1>Sample Title</h1>
          //
        </a>
        //
        <p>Sample summary text.</p>

        //
        <p class="text-lightgray-darker uppercase mt-2">Vezane vijesti</p>
        //
        <hr class="border-lightgray my-2" />
        //
        <p>Sample connected news one.</p>
        //
        <div class="flex justify-between">
          //
          <hr class="border-lightgray my-2" />
          //
          <p>Sample connected news two.</p>
          //
        </div>
        //
        <div class="flex justify-between">
          //
          <hr class="border-lightgray my-2" />
          //
          <p>Sample connected news three.</p>
          //
        </div>
        //
        <div class="flex justify-between">
          //
          <button class="bg-facebook px-4 mt-2 text-lightgray">
            // <span class="font-bold mr-1">&#x1D5BF;</span>121 //
          </button>
          //
          <div class="flex">
            //
            <img
              class="w-8 text-lightgray-darker bg-transparent bg-lightgray opacity-10 mr-1"
              src="https://static.thenounproject.com/png/1314304-200.png"
              alt=""
            />
            // <span class="text-lightgray-darker">127</span> //
          </div>
          //
        </div>
        //
      </section>

      //
      <!-- MIDDLE SECTION -->
      //
      <section class="p-2 border-l-2 border-lightgray lg:w-2/5">
        //
        <img class="mb-2" src="https://via.placeholder.com/500x300" alt="" /> //
        <h1>Sample Title</h1>

        //
        <!-- BOTTOM SECTION -->
        //
        <div class="flex mt-3 border-t pt-1 border-lightgray">
          //
          <img class="mr-2" src="https://via.placeholder.com/50x50" alt="" /> //
          <p>
            //
            <a
              class="text-paragraph"
              href="https://www.example.com"
              target="_blank"
              >Sample Bottom Link One</a
            >
            //
          </p>
          //
        </div>
        //
        <div class="flex mt-3 border-t border-lightgray pt-1">
          //
          <img class="mr-2" src="https://via.placeholder.com/50x50" alt="" /> //
          <p>
            //
            <a
              class="text-paragraph"
              href="https://www.example.com"
              target="_blank"
              >Sample Bottom Link Two</a
            >
            //
          </p>
          //
        </div>
        //
        <div class="flex mt-3 border-t border-lightgray pt-1">
          //
          <img class="mr-2" src="https://via.placeholder.com/50x50" alt="" /> //
          <p>
            //
            <a
              class="text-paragraph"
              href="https://www.example.com"
              target="_blank"
              >Sample Bottom Link Three</a
            >
            //
          </p>
          //
        </div>
        //
        <div class="flex mt-3 border-t border-lightgray pt-1">
          //
          <img class="mr-2" src="https://via.placeholder.com/50x50" alt="" /> //
          <p>
            //
            <a
              class="text-paragraph"
              href="https://www.example.com"
              target="_blank"
              >Sample Bottom Link Four</a
            >
            //
          </p>
          //
        </div>
        //
      </section>

      //
      <!-- SIDEBAR RIGHT -->
      //
      <section class="p-2 border-l-2 border-lightgray flex flex-col lg:2/5">
        //
        <article class="flex mb-3">
          //
          <div class="flex flex-col mr-3">
            // <span class="text-index">18</span> // <span>min</span> //
          </div>
          //
          <p class="text-paragraph">
            //
            <a
              class="text-paragraph"
              href="https://www.example.com"
              target="_blank"
              >Sample Article Title</a
            >
            //
          </p>
          //
        </article>
        //
        <!-- Repeat the above structure for other articles -->
        //
        <button
          class="text-gray border-lightgray text-lightgray-darker border-2 px-12 py-3 uppercase self-center hover:text-paragraph"
        >
          // Prikaži još vijesti //
        </button>
        //
        <img
          class="mt-2"
          src="https://static.criteo.net/design/dt/82887/210514/ba76789c37ae419283a27fbfa3e039ec_image_ad_480x320.png"
          alt=""
        />
        //
      </section>
      //
    </main>
    //
  </div>
  //
</template>

//
<script>
//   import { ref } from 'vue';
//   import axios from 'axios';

//   export default {
//     props: {
//       symbol:String
//     },
//     setup() {
//       const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
//       const selectedSymbol = ref(symbols[0]);
//       const cryptoData = ref(null);

//       const fetchData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5001/news`);
//           cryptoData.value = response.data;
//         } catch (error) {
//           console.error(`Error: ${error}`);
//         }
//       };

//       return {
//         symbols,
//         selectedSymbol,
//         cryptoData,
//         fetchData
//       };
//     }
//   };
//
</script>
