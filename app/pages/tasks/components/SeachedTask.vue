<template>
  <div class="h-full">
    <div class="h-[calc(100%-50px)] overflow-y-auto p-4 lg:p-6 flex flex-col">
      <div class="mb-4">
        <LucideArrowBigLeft
          class="text-gray-500 cursor-pointer hover:scale-105 transition-all duration-200"
          @click="handleBack"
        />
      </div>
      <div class="space-y-3 lg:space-y-4">
        <SearchedTaskItem :task="searchedTask" v-if="searchedTask" />
        <div class="blur pointer-events-none select-none">
          <SearchedTaskItem v-for="task in tasks" :key="task.id" :task="task" />
        </div>
      </div>
    </div>
    <div class="h-10 blur-sm pointer-events-none select-none">
      <Paginator :rows="10" :totalRecords="10" @page="10"></Paginator>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Task } from "@/models/Task";
import { ref } from "vue";
import SearchedTaskItem from "./SearchedTaskItem.vue";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();

const searchedTask = ref<Task | null>(null);

watch(
  () => taskStore.selectedTaskId,
  async () => {
    const { data } = await useApiRequest({
      endpoint: `tasks/${taskStore.selectedTaskId}`,
      method: "GET",
    });

    searchedTask.value = data;
  }
);

onMounted(async () => {
  const { data } = await useApiRequest({
    endpoint: `tasks/${taskStore.selectedTaskId}`,
    method: "GET",
  });

  searchedTask.value = data;
});

//blurred tasks
const tasks = ref<Task[]>([
  {
    id: "1",
    description: "Task 1",
    completed: false,
    date: "2021-01-01",
  },
  {
    id: "2",
    description: "Task 2",
    completed: false,
    date: "2021-01-02",
  },
]);

const handleBack = () => {
  taskStore.setSelectedTaskId(null);
};
</script>
