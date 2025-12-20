import axios from "axios";
import { normalizeMedicineName } from "./normalizeMedicineName";

const WIKI_SEARCH_URL =
  "https://en.wikipedia.org/w/rest.php/v1/search/title";
const WIKI_SUMMARY_URL =
  "https://en.wikipedia.org/api/rest_v1/page/summary";

export const fetchMedicineImage = async (medicineName) => {
  try {
    const cleanName = normalizeMedicineName(medicineName);

    // 1️⃣ Search using normalized name
    const searchRes = await axios.get(WIKI_SEARCH_URL, {
      params: {
        q: cleanName,
        limit: 1,
      },
    });

    const pageTitle = searchRes.data.pages?.[0]?.title;
    if (!pageTitle) return null;

    // 2️⃣ Fetch page summary (thumbnail)
    const summaryRes = await axios.get(
      `${WIKI_SUMMARY_URL}/${encodeURIComponent(pageTitle)}`
    );

    return summaryRes.data.thumbnail?.source || null;
  } catch {
    return null;
  }
};
