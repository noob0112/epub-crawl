<script setup lang="ts">
import { storeToRefs } from "#imports";
import { reactive, ref } from "vue";
import {
  ArrowBigRight,
  Button,
  InputText,
  Form,
  Message,
} from "~/components/common";
import DownloadedItem from "~/components/ui/ebook/downloaded-item.vue";
import { useEbookStore } from "~/stores/ebook";
import { useToast } from "primevue/usetoast";
import { useFileSize } from "~/composables/useFileSize";

const toast = useToast();
const ebookUrlInputId = "ebookUrl";
const isLoading = ref<boolean>(false);

const ebookStore = useEbookStore();
const { downloaderEbooks } = storeToRefs(ebookStore);
const { fetchEbook, addDownloaderEbook, crawlEpub, updateEbook } = ebookStore;

const initialValues = reactive({
  ebookUrl: "",
});

const resolver = ({ values }: any) => {
  const errors: { ebookUrl: { message: string }[] } = { ebookUrl: [] };

  if (!values.ebookUrl) {
    errors.ebookUrl.push({ message: "Ebook URL is required." });
  }

  if (!validateUrl(values.ebookUrl)) {
    errors.ebookUrl.push({ message: "Invalid Waka.vn ebook URL." });
  }

  return {
    values,
    errors,
  };
};

async function getEpubUrl({ valid, reset }: any) {
  isLoading.value = true;

  if (!valid) {
    isLoading.value = false;
    return;
  }

  const ebookUrl = initialValues.ebookUrl.trim();

  const ebook = await fetchEbook(ebookUrl);
  if (!ebook) {
    toast.add({
      severity: "error",
      summary: "An error occurred, please try again",
      life: 3000,
    });

    isLoading.value = false;
    return;
  }

  reset();

  addDownloaderEbook(ebook);

  if (!ebook.epubUrl) {
    const epubUrl = await crawlEpub(ebook.id);
    ebook.epubUrl = epubUrl;
  }

  if (ebook.epubUrl) {
    const { size } = await useFileSize(ebook.epubUrl);
    ebook.epubFileSize = size.value;
  }

  updateEbook(ebook.id, ebook);

  toast.add({
    severity: "success",
    summary: "Epub is ready to download",
    life: 3000,
  });

  isLoading.value = false;
  return;
}

function validateUrl(ebookUrl: string): boolean {
  const wakaEbookUrlRegex =
    /^(https?:\/\/)?(www\.)?waka\.vn\/ebook\/[a-zA-Z0-9-]+\.html$/;
  return wakaEbookUrlRegex.test(ebookUrl);
}
</script>

<template>
  <div class="flex flex-col gap-12">
    <div class="prose card w-full sm:max-w-xl self-center">
      <h2>Epub Downloader</h2>
      <Form
        v-slot="$form"
        :initialValues
        :resolver
        @submit="getEpubUrl"
        :validateOnValueUpdate="false"
        :validateOnBlur="true"
        class="flex flex-col gap-2"
      >
        <label :for="ebookUrlInputId">Ebook Url</label>
        <div class="flex flex-col gap-2">
          <InputText
            class="flex-1"
            :id="ebookUrlInputId"
            :name="ebookUrlInputId"
            placeholder="https://waka.vn/ebook/xxx.html"
          />
          <Message
            v-if="$form.ebookUrl?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.ebookUrl.error?.message }}</Message
          >
          <Button v-if="isLoading" :loading="true" label="Start" />
          <Button v-else class="gap-0!" type="submit"
            >Start<ArrowBigRight
          /></Button>
        </div>
      </Form>
    </div>

    <div class="card prose max-w-none">
      <h2>Thông tin Ebook</h2>
      <DataView :value="downloaderEbooks">
        <template #list="slotProps">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <DownloadedItem
                :id="item.id"
                :name="item.name"
                :coverUrl="item.coverUrl"
                :epubUrl="item.epubUrl"
                :epubFileSize="item.epubFileSize"
                :description="item.description"
                :showFullDescription="item.showFullDescription"
                :isShowDivision="index === 0 ? false : true"
              />
            </div>
          </div>
        </template>
        <template #empty>
          <p class="text-center">
            Không có thông tin ebook, vui lòng nhập ebook url vào input trên và
            submit
          </p>
        </template>
      </DataView>
    </div>
  </div>
</template>

<style scoped>
.card {
  --card-background: inherit;
  --card-border: 1px solid var(--p-surface-200);

  background: var(--card-background);
  border: var(--card-border);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
</style>
