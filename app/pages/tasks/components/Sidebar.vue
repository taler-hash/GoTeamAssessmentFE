<template>
  <div
    class="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto h-full shadow-lg lg:shadow-none"
  >
    <div
      class="lg:hidden flex justify-between items-center p-4 border-b border-gray-200 bg-white"
    >
      <h2 class="text-lg font-semibold text-gray-800">Navigation</h2>
      <button
        @click="closeSidebar"
        class="text-gray-600 hover:text-black transition-colors p-1 rounded-full hover:bg-gray-100"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>

    <div class="p-4 lg:p-6">
      <div class="space-y-1">
        <div class="w-full mb-5">
          <DatePicker
            v-model="date"
            view="month"
            dateFormat="MM yy"
            class="w-full font-bold text-center text-lg"
            size="small"
            :max-date="new Date()"
            @update:model-value="handleSelectMonth"
          />
        </div>
        <template v-for="(week, wIdx) in sidebarWeeks" :key="wIdx">
          <div v-if="week.label" class="pt-3 lg:pt-4">
            <h3
              class="text-xs font-semibold text-gray-300 uppercase tracking-wide px-3 lg:px-4 py-1 lg:py-2"
            >
              {{ week.label }}
            </h3>
            <div class="space-y-1">
              <div
                v-for="(date, dIdx) in week.dates"
                :key="date.date"
                :class="[
                  'px-3 lg:px-4 py-2 lg:py-3 rounded-lg cursor-pointer transition-colors text-sm lg:text-base',
                  date.selected
                    ? 'bg-black text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
                @click="handleSelectDate(date.date)"
              >
                {{ date.label }}
              </div>
            </div>
          </div>
          <template v-else>
            <div
              v-for="(date, dIdx) in week.dates"
              :key="date.date"
              :class="[
                'px-3 lg:px-4 py-2 lg:py-3 rounded-lg cursor-pointer transition-colors text-sm lg:text-base',
                date.selected
                  ? 'bg-black text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
              @click="handleSelectDate(date.date)"
            >
              {{ date.label }}
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();
const date = ref(new Date());
const sidebarWeeks = ref<any[]>([]);

const transformToSideBarDates = (date: moment.Moment, selectedDate: string) => {
  // Get the current month and year
  const currentMonth = date.month(); // 0-indexed
  const currentYear = date.year();

  // Find the first day of the month
  const firstDayOfMonth = date.clone().startOf("month");
  // Find the current day (today or the date passed in)
  const lastDay = date.clone();

  // Prepare the result object as an array to preserve order
  type SidebarDate = {
    label: string;
    selected: boolean;
    date: string; // "month-day-year"
  };
  const weeksArr: { label: string | null; dates: SidebarDate[] }[] = [];

  // Helper to get week label suffix
  const getWeekSuffix = (weekNum: number) => {
    if (weekNum % 10 === 1 && weekNum !== 11) return "st";
    if (weekNum % 10 === 2 && weekNum !== 12) return "nd";
    if (weekNum % 10 === 3 && weekNum !== 13) return "rd";
    return "th";
  };

  // Map to group dates by week number (from first week to last week)
  const weekMap: Record<number, moment.Moment[]> = {};

  // Loop from first day to last day (earliest date first)
  let iter = firstDayOfMonth.clone();
  while (iter.isSameOrBefore(lastDay, "day")) {
    const weekNum = iter.week() - firstDayOfMonth.week() + 1;
    if (!weekMap[weekNum]) {
      weekMap[weekNum] = [];
    }
    weekMap[weekNum].push(iter.clone());
    iter.add(1, "day");
  }

  // Get all week numbers, reverse them so the latest week comes first
  const weekNumbers = Object.keys(weekMap)
    .map(Number)
    .sort((a, b) => b - a);

  // Determine the current week number (relative to the month)
  const today = moment();
  let currentWeekNum: number | null = null;
  if (today.year() === currentYear && today.month() === currentMonth) {
    currentWeekNum = today.week() - firstDayOfMonth.week() + 1;
  }

  // If currentWeekNum is not in weekMap (e.g. today is not in this month), set to null
  if (currentWeekNum && !weekMap[currentWeekNum]) {
    currentWeekNum = null;
  }

  // Determine the last week number (the week before the current week)
  let lastWeekNum: number | null = null;
  if (currentWeekNum && weekNumbers.includes(currentWeekNum - 1)) {
    lastWeekNum = currentWeekNum - 1;
  } else if (currentWeekNum && weekNumbers.includes(currentWeekNum + 1)) {
    // In case week numbers are reversed (descending)
    lastWeekNum = currentWeekNum + 1;
  } else if (currentWeekNum && weekNumbers.includes(currentWeekNum - 1)) {
    lastWeekNum = currentWeekNum - 1;
  } else if (currentWeekNum) {
    // fallback: last week is the one before current in the sorted array
    const idx = weekNumbers.indexOf(currentWeekNum);
    if (idx !== -1 && idx + 1 < weekNumbers.length) {
      lastWeekNum = weekNumbers[idx + 1] ?? null;
    }
  }

  for (const weekNum of weekNumbers) {
    let label: string | null = null;
    if (currentWeekNum && weekNum === currentWeekNum) {
      label = null;
    } else if (lastWeekNum && weekNum === lastWeekNum) {
      label = "Last week";
    } else {
      const suffix = getWeekSuffix(weekNum);
      const monthName = weekMap[weekNum]?.[0]?.format("MMMM") ?? "";
      label = `${weekNum}${suffix} week of ${monthName}`;
    }

    // Build the dates array with the new structure
    const dates: SidebarDate[] = (
      weekMap[weekNum]?.slice().reverse() ?? []
    ).map((d) => {
      let dateLabel = "";
      if (d.isSame(today, "day")) {
        dateLabel = "Today";
      } else if (d.isSame(today.clone().subtract(1, "day"), "day")) {
        dateLabel = "Yesterday";
      } else {
        dateLabel = d.format("dddd, MMMM D");
      }
      return {
        label: dateLabel,
        selected: d.isSame(selectedDate, "day"),
        date: d.format("M-D-YYYY"),
      };
    });

    weeksArr.push({
      label,
      dates,
    });
  }

  return weeksArr;
};

watch(() => taskStore.selectedDate, () => {
  const selectedMoment = moment(taskStore.selectedDate);
    const today = moment();
    let setDate: moment.Moment;

    if (
      selectedMoment.year() === today.year() &&
      selectedMoment.month() === today.month()
    ) {
      setDate = today;
    } else {
      setDate = selectedMoment.endOf("month");
    }
  sidebarWeeks.value = transformToSideBarDates(setDate, taskStore.selectedDate ?? "");
});

onMounted(() => {
  sidebarWeeks.value = transformToSideBarDates(moment(), taskStore.selectedDate ?? "");
});

const handleSelectMonth = (date: Date | Date[] | (Date | null)[] | null | undefined) => {
  if (date instanceof Date) {
    const selectedMoment = moment(date);
    const today = moment();
    let setDate: moment.Moment;

    if (
      selectedMoment.year() === today.year() &&
      selectedMoment.month() === today.month()
    ) {
      setDate = today;
    } else {
      setDate = selectedMoment.endOf("month");
    }

    taskStore.setSelectedDate(setDate.format("M-D-YYYY"));
  }
};

const handleSelectDate = (date: string) => {
  taskStore.setSelectedDate(date);
};

type Emits = {
  close: [];
};



const emit = defineEmits<Emits>();

const closeSidebar = () => {
  emit("close");
};
</script>
