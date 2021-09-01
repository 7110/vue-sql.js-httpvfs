<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <button @click="runSql('SELECT COUNT(*) FROM mytable')">
      SELECT COUNT(*) FROM mytable
    </button>
    <button @click="runSql('SELECT * FROM mytable')">
      SELECT * FROM mytable
    </button>

    <pre>{{ result }}</pre>
  </div>
</template>

<script>
import { createDbWorker } from "sql.js-httpvfs";

// import HelloWorld from "@/components/HelloWorld.vue";

const publicPath =
  process.env.NODE_ENV === "production" ? "/vue-sql.js-httpvfs/" : "/";

const workerUrl = new URL(
  `${publicPath}sql.js-httpvfs/sqlite.worker.js`,
  import.meta.url
);
const wasmUrl = new URL(
  `${publicPath}sql.js-httpvfs/sql-wasm.wasm`,
  import.meta.url
);

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      result: undefined,
    };
  },
  async mounted() {
    this.worker = await createDbWorker(
      [
        {
          from: "inline",
          config: {
            serverMode: "full",
            url: `${publicPath}db/example.sqlite3`,
            requestChunkSize: 4096,
          },
        },
      ],
      workerUrl.toString(),
      wasmUrl.toString()
    );
  },
  methods: {
    async runSql(sql) {
      this.result = await this.worker.db.query(sql);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
