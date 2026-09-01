const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:8001";

export function resolveImage(img?: string | null): string {
  if (!img || img === "/placeholder.png") return "";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  const base = API_URL.replace(/\/$/, "");
  const path = img.startsWith("/files")
    ? img
    : img.startsWith("/")
      ? `/files${img}`
      : `/files/${img}`;
  return `${base}${path.replace("/files/files", "/files")}`;
}