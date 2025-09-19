<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <Card class="w-full max-w-md mx-4 relative z-10 shadow-2xl">
      <template #header>
        <div class="flex justify-center pt-6">
          <div
            class="px-4 py-2 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold"
          >
            Task Manager
          </div>
        </div>
      </template>

      <template #title>
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p class="text-gray-600 text-sm">Login to continue using this app</p>
        </div>
      </template>

      <template #content>
        <Form
          :validation-schema="validationSchema"
          :initial-values="form"
          @submit="onSubmit"
          class="space-y-6"
        >
          <Field name="email" v-slot="{ field }">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <InputText
                id="email"
                v-bind="field"
                type="email"
                placeholder="Enter your email"
                class="w-full"
              />
              <ErrorMessage name="email" class="text-red-500 text-xs" />
            </div>
          </Field>

          <Field name="password" v-slot="{ field }">
            <div>
              <div class="flex justify-between items-center">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot your password?
                </a>
              </div>
              <Password
                id="password"
                v-bind="field"
                placeholder="Enter your password"
                class="w-full"
                :feedback="false"
                toggleMask
              />
              <ErrorMessage name="password" class="text-red-500 text-xs" />
            </div>
          </Field>
          <Button
            type="submit"
            label="Login"
            class="w-full bg-gray-900 hover:bg-gray-800 transition-colors"
            :loading="isLoading"
          />
        </Form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useForm, Form, Field, ErrorMessage } from "vee-validate";
import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";import { useToast } from "primevue/usetoast";
import type { User } from "~/models/User";

const toast = useToast();
const { login } = useSanctumAuth();

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .min(1, { message: "This is required" })
      .email({ message: "Must be a valid email" }),
    password: zod
      .string()
      .min(1, { message: "This is required" })
      .min(8, { message: "Too short" }),
  })
);

const form = reactive<User>({
  email: "",
  password: "",
});

const isLoading = ref(false);

const onSubmit = async (values: User) => {
  isLoading.value = true;

  try {
    await login({
      email: values.email,
      password: values.password,
    });

    toast.add({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 3000 });

    await navigateTo("/tasks");
  } catch (error) {
    console.error("Login failed:", error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Login failed', life: 3000 });
  } finally {
    isLoading.value = false;
  }
};

const handleFormSubmit = onSubmit;
</script>

<style scoped>
:deep(.p-card) {
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

:deep(.p-card-header) {
  padding: 0;
}

:deep(.p-card-title) {
  margin-bottom: 1.5rem;
}

:deep(.p-card-content) {
  padding: 1.5rem 2rem 2rem;
}

:deep(.p-inputtext) {
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
}

:deep(.p-inputtext:focus) {
  border-color: #374151;
  box-shadow: 0 0 0 3px rgba(55, 65, 81, 0.1);
}

:deep(.p-password) {
  width: 100%;
}

:deep(.p-password-input) {
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
}

:deep(.p-password-input:focus) {
  border-color: #374151;
  box-shadow: 0 0 0 3px rgba(55, 65, 81, 0.1);
}

:deep(.p-button) {
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

:deep(.p-button:not(:disabled):hover) {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  :deep(.p-card-content) {
    padding: 1rem 1.5rem 1.5rem;
  }
}
</style>
