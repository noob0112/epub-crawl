import axios from "axios";
import { useRuntimeConfig } from '#imports'

export function useCrawlerEpubApi() {
  const config = useRuntimeConfig();
  const apiUrl = config.public.crawlerEpubApiUrl;

  const crawlerEpubClient = axios.create({
    baseURL: apiUrl,
    timeout: 120000,
    headers: {
      "Origin": apiUrl,
      "Referrer": apiUrl,
    }
  });

  async function fetchEbook(wakaEbookId: number) {
    try {
      const response = await crawlerEpubClient.get("/ebooks", {
        params: { wakaEbookId },
      });
      return {
        id: response.data.id,
        title: response.data.title,
        coverUrl: response.data.thumbnailUrl,
        epubUrl: response.data.epubUrl,
        description: response.data.description
      };
    } catch (error) {
      console.error("Error fetching ebook:", error);
      throw error;
    }
  }

  async function fetchEpubUrl(wakaEbookId: number): Promise<string> {
    try {
      const response = await crawlerEpubClient.get("/ebooks/epub", {
        params: { wakaEbookId },
      });
      return response.data.epubUrl;
    } catch (error) {
      console.error("Error fetching ebook:", error);
      throw error;
    }
  }

  return { fetchEbook, fetchEpubUrl };
}
