function normalizeTargetLang(targetLang: string) {
  const t = (targetLang || "").trim().toLowerCase();
  if (t === "德语" || t === "german" || t === "de") return "de";
  if (t === "西班牙语" || t === "spanish" || t === "es") return "es";
  return t || targetLang;
}

type MyMemoryResponse = {
  responseStatus?: number;
  responseDetails?: string;
  responseData?: {
    translatedText?: string;
  };
};

export async function translateText(text: string, targetLang: string) {
  const input = (text ?? "").toString();
  if (!input.trim()) return input;

  const lang = normalizeTargetLang(targetLang);
  const email = process.env.MYMEMORY_EMAIL;

  const url =
    `https://api.mymemory.translated.net/get` +
    `?q=${encodeURIComponent(input)}` +
    `&langpair=en|${encodeURIComponent(lang)}` +
    (email ? `&de=${encodeURIComponent(email)}` : "");

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("[translateText] MyMemory http error", { status: res.status, statusText: res.statusText });
      return input;
    }

    const data = (await res.json()) as MyMemoryResponse;
    const translated = data?.responseData?.translatedText;

    if (!translated || typeof translated !== "string") {
      console.error("[translateText] MyMemory invalid response", data);
      return input;
    }

    // MyMemory uses responseStatus 200 for success; be defensive and still accept translatedText.
    if (typeof data.responseStatus === "number" && data.responseStatus !== 200) {
      console.error("[translateText] MyMemory translation failed", {
        responseStatus: data.responseStatus,
        responseDetails: data.responseDetails,
      });
      return input;
    }

    return translated;
  } catch (err) {
    console.error("[translateText] MyMemory request failed", err);
    return input;
  }
}
