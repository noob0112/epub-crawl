import { ref } from "vue";

export async function useFileSize(url: string) {
  const size = ref<number | null>(null);
  const error = ref<string | null>(null);

  try {
    const response = await fetch(url, { method: "HEAD" }); // Không tải toàn bộ file, chỉ lấy metadata
    const length = response.headers.get("Content-Length");
    if (length) {
      size.value = Number(length);
    } else {
      error.value = "Không tìm thấy Content-Length";
    }
  } catch (err: any) {
    error.value = err.message;
  }

  return { size, error };
}
