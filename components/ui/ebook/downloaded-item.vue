<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { CloudDownload } from "~/components/common";
import { type Ebook } from "~/stores/ebook";
import { formatBytes } from "~/utils";

interface DownloaderEbookItem extends Ebook {
  isShowFullDescription?: boolean;
  isShowDivision?: boolean;
}

const props = withDefaults(defineProps<DownloaderEbookItem>(), {
  isShowFullDescription: false,
  isShowDivision: true,
});

const isShowFullDescription = ref(props.isShowFullDescription);
</script>

<template>
  <div
    class="flex flex-col gap-2 p-6 items-center sm:flex-row sm:gap-8"
    :class="{
      'border-t border-surface-200 dark:border-surface-700':
        props.isShowDivision,
    }"
  >
    <div>
      <img :src="props.coverUrl" alt="Ebook cover" class="w-20" />
    </div>
    <div class="prose prose-sm flex flex-col flex-1 max-w-[unset]">
      <h3 class="text-center sm:text-start">{{ props.name }}</h3>
      <div class="not-prose">
        <p
          class="transition duration-700 ease-in-out"
          :class="[isShowFullDescription ? 'line-clamp-none' : 'line-clamp-3']"
          v-html="props.description"
        ></p>
      </div>
    </div>
    <div class="not-prose flex flex-col items-center gap-1">
      <Button v-if="!props.epubUrl" :loading="true" label="Crawling ..." />

      <Button
        v-else
        as="a"
        :href="epubUrl"
        :download="props.name"
        class="not-prose"
      >
        <CloudDownload />
        Download
      </Button>

      <p v-if="props.epubFileSize">{{ formatBytes(props.epubFileSize) }}</p>
    </div>
  </div>
</template>
