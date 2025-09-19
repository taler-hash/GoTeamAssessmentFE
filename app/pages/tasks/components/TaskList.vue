<template>
  <div class="h-full">
    <div class="h-[calc(100%-50px)] overflow-y-auto p-4 lg:p-6 flex flex-col">
      <div class="space-y-3 lg:space-y-4">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle="handleToggleTask"
          @delete="handleDeleteTask"
        />
      </div>
      <div
        v-if="tasks.length === 0"
        class="flex flex-col items-center justify-center h-48 lg:h-64 text-gray-500 px-4"
      >
        <LucideTicket class="w-12 h-12 lg:w-16 lg:h-16 mb-3 lg:mb-4" />
        <p class="text-base lg:text-lg font-medium text-center">No tasks yet</p>
        <p class="text-xs lg:text-sm text-center mt-1">
          Add your first task below to get started!
        </p>
      </div>
    </div>
    <div class="h-10">
      <Paginator
        :rows="meta?.per_page || 0"
        :totalRecords="meta?.total || 0"
        @page="handlePageChange"
        v-model="filters.page"
      ></Paginator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import TaskItem from "./TaskItem.vue";
import { useTaskStore } from "@/stores/task";
import moment from "moment";
import { useToast } from "primevue/usetoast";
import type { Task } from "@/models/Task";
import { useApiRequest } from "@/utils/useApiRequest";
import type { Meta } from "@/models/Meta";

const toast = useToast();

const taskStore = useTaskStore();
const tasks = ref<Task[]>([]);
const meta = ref<Meta | undefined>();
const filters = ref<{ [key: string]: any }>({
  date: moment(taskStore.selectedDate).format("YYYY-MM-DD"),
  page: 0,
});

const handlePageChange = (event: any) => {
  filters.value.page = event.page + 1;
  handleGetTasks();
};

const handleGetTasks = async () => {
  const { data, meta: responseMeta } = await useApiRequest({
    endpoint: `tasks`,
    method: "GET",
    body: {
      date: moment(taskStore.selectedDate).format("YYYY-MM-DD"),
      page: filters?.value?.page ?? 1,
    },
  });

  tasks.value = data || [];
  meta.value = responseMeta || undefined;
};

onMounted(() => {
  handleGetTasks();
});

watch(
  () => taskStore.selectedDate,
  () => {
    filters.value.date = moment(taskStore.selectedDate).format("YYYY-MM-DD");
    filters.value.page = 1; // Reset to first page when date changes
    handleGetTasks();
  }
);

// Watch for changes in page
watch(
  () => [filters.value.page, taskStore.selectedTaskId],
  (newPage) => {
    if(!taskStore.selectedTaskId) {
      handleGetTasks();
    }
  }
);

type Emits = {
  "task-updated": [];
};

const emit = defineEmits<Emits>();

const handleToggleTask = async (id: string) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    await useApiRequest({
      endpoint: `tasks/${id}`,
      method: "PUT",
      body: {
        description: task.description,
        completed: true,
        date: moment(taskStore.selectedDate).format("YYYY-MM-DD"),
      },
    });

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task completed",
      life: 3000,
    });

    await handleGetTasks();

    emit("task-updated");
  }
};

const handleDeleteTask = async (id: string) => {
  await useApiRequest({
      endpoint: `tasks/${id}`,
      method: "DELETE",
    });

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task deleted",
      life: 3000,
    });

    await handleGetTasks();
};

defineExpose({
  addTask: async (description: string) => {
    await useApiRequest({
      endpoint: "tasks",
      method: "POST",
      body: {
        description: description,
        date: moment(taskStore.selectedDate).format("YYYY-MM-DD"),
      },
    });
    await handleGetTasks();

    if (data) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Task added successfully",
        life: 3000,
      });
      emit("task-updated");
    }
  },
});
</script>
