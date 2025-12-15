<template>
  <div class="search-input-box">

    <input
        v-model="keyword"
        @keyup.enter="search"
        placeholder="영화 제목을 검색하세요"
    />

    <button @click="search">검색</button>

    <!-- 최근 검색어 -->
    <div v-if="recent.length" class="recent">
      <p>최근 검색어</p>
      <div class="tags">
        <span
              v-for="word in recent"
              :key="word"
              class="tag"
          >
          <span class="text" @click="select(word)">
            {{ word }}
          </span>
          <span class="remove" @click.stop="remove(word)">
            ×
          </span>
        </span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["search"]);

const keyword = ref("");
const recent = ref([]);

onMounted(() => {
  recent.value = JSON.parse(localStorage.getItem("recentSearches") || "[]");
});

function saveRecent(word) {
  const normalized = word.trim();

  let list = JSON.parse(localStorage.getItem("recentSearches") || "[]");

  list = list.filter(w => w.trim() !== normalized);

  list.unshift(normalized);

  list = list.slice(0, 5);

  localStorage.setItem("recentSearches", JSON.stringify(list));
  recent.value = list;
}


function search() {
  if (!keyword.value.trim()) return;
  saveRecent(keyword.value);
  emit("search", keyword.value);
}

function select(word) {
  keyword.value = word;
  search();
}

function remove(word) {
  let list = JSON.parse(localStorage.getItem("recentSearches") || "[]");

  list = list.filter(w => w !== word);

  localStorage.setItem("recentSearches", JSON.stringify(list));
  recent.value = list;
}

</script>

<style scoped>
.search-input-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width:390px;
}

input {
  padding: 12px;
  border-radius: 6px;
}

button {
  padding: 10px;
}

.recent{
  color:white;
}

.recent p {
  font-size: 13px;
  opacity: 0.7;
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tags span {
  padding: 4px 8px;
  background: #222;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom:15px;
}

.remove {
  font-size: 14px;
  color: #aaa;
  cursor: pointer;
}

.remove:hover {
  color: #e50914; /* 넷플릭스 레드 */
}
</style>
