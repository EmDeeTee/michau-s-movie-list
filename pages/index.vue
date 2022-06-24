<script lang="ts">
export default {
    methods: {
        redirectToTVMaze(link: string) {
            window.open(link, '_blank');
        }
    },
    data() {
        return {
            //noResults: true
        }
    }
}
</script>

<script setup lang="ts">
import { dataToEsm } from "@rollup/pluginutils";
import {ref} from "vue"

const searchText = ref("")
const shows = ref([]) as any
var noResults = ref(false)

async function searchForShows() {
    const data = await fetch(`api/backend?search=${searchText.value}`)
    const json = await data.json()
    shows.value = json 
    if (json.length == 0) {
        noResults.value = true
    }
}
</script>

<template>
<div>
    <form class="form" @submit.prevent="searchForShows()">
        <input type="text" v-model="searchText">
        <button>Search!</button>
    </form>
    <div class="shows">
        <div v-for="show in shows" v-bind:key="show">
            <img class="showResoult" :src="show.show?.image?.medium" @click="redirectToTVMaze(show.show?.url)">
        </div>
        <div v-if="noResults">
            <h1>No results.</h1>
        </div>
    </div>
</div>
</template>

<style>

.form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

body {
    background-color: #121212;
}

.shows {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.showResoult {
    cursor: pointer;
}

img:hover {
    transform: scale(90%);
}

</style>