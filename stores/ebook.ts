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

  function fetchEbook(ebookUrl: string): Promise<Ebook> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          name: "[Sách ngoại văn] The Brothers Karamazov",
          coverUrl:
            "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/51712.jpg",
          description: `The Brothers Karamazov là tiểu thuyết cuối cùng và được xem là đỉnh cao trong sự nghiệp của đại văn hào Nga Fyodor Dostoevsky. Tác phẩm được xuất bản lần đầu vào năm 1880, không chỉ nổi tiếng trong nước Nga mà còn được cả thế giới tôn vinh như một kiệt tác triết học – tâm lý học vượt thời gian.

      Câu chuyện kể về gia đình nhà Karamazov với người cha – Fyodor Pavlovich Karamazov – đầy dục vọng, tham lam và vô đạo đức; cùng ba người con trai chính thức: Dmitri (nóng nảy, đầy cảm xúc), Ivan (trí tuệ, hoài nghi), và Alyosha (hiền hậu, hướng thiện), mỗi người đại diện cho một mặt khác nhau trong tâm hồn và triết lý sống của con người. Bên cạnh đó còn có Smerdyakov, người con ngoài giá thú, mang theo bóng tối và sự ngờ vực.

      Cái chết của người cha dưới bàn tay bí ẩn đã đẩy các nhân vật vào cuộc khủng hoảng đạo đức, những câu hỏi về Chúa, tự do, cái ác, công lý và bản chất con người. Không chỉ là một câu chuyện tội ác – hình phạt, cuốn tiểu thuyết đi sâu vào những xung đột tâm linh, triết học và niềm tin, khiến người đọc không thể ngừng suy ngẫm.

      Với chiều sâu tư tưởng, sự dày dạn trong phân tích tâm lý và ngôn ngữ nghệ thuật đặc trưng của văn học Nga, The Brothers Karamazov được coi là một trong những tiểu thuyết vĩ đại nhất trong lịch sử nhân loại.`,
        });
      }, 1000);
    });
  }

  function updateEbook(ebookId: string | number, updatedEbookData: Ebook) {
    const ebookIndex = downloaderEbooks.value.findIndex(
      (ebook) => ebook.id === ebookId
    );
    downloaderEbooks.value[ebookIndex] = {
      ...downloaderEbooks.value[ebookIndex],
      ...updatedEbookData,
    };
  }

  function updateEpubUrl(ebookId: string | number, epubUrl: EpubUrl) {
    const ebook = downloaderEbooks.value.find((ebook) => ebook.id === ebookId);
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
    fetchEbook,
    addDownloaderEbook,
    crawlEpub,
    updateEbook,
  };
});
