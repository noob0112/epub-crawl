import { ref } from "vue";
import { defineStore } from "pinia";

type EpubUrl = string | undefined;

export interface Ebook {
  id: number;
  name: string;
  coverUrl: string;
  epubUrl?: EpubUrl;
  epubFileSize?: number | null;
  description?: string;
}

export const useEbookStore = defineStore("ebook", () => {
  const downloaderEbooks = ref<Ebook[]>([]);

  function addDownloaderEbook(ebook: Ebook) {
    downloaderEbooks.value.push(ebook);
  }

  function updateEbook(ebookId: string | number, updatedEbookData: Ebook) {
    const ebookIndex = downloaderEbooks.value.findIndex(
      (ebook: Ebook) => ebook.id === ebookId
    );
    downloaderEbooks.value[ebookIndex] = {
      ...downloaderEbooks.value[ebookIndex],
      ...updatedEbookData,
    };
  }

  function updateEpubUrl(ebookId: string | number, epubUrl: EpubUrl) {
    const ebook = downloaderEbooks.value.find((ebook: Ebook) => ebook.id === ebookId);
    if (ebook) {
      ebook.epubUrl = epubUrl;
    }
  }

  function crawlEpub(ebookId: string | number): EpubUrl {
    const epubUrl = `https://s3.amazonaws.com/moby-dick/moby-dick.epub`;
    // updateEpubUrl(ebookId, epubUrl)

    return epubUrl;
  }

  return {
    downloaderEbooks,
    addDownloaderEbook,
    crawlEpub,
    updateEbook,
  };
});
