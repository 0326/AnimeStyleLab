export type StyleCategory =
  | "japanese-anime"
  | "manga"
  | "game-illustration"
  | "visual-novel"
  | "kawaii-chibi"
  | "figure-3d-plush"
  | "cyber-sci-fi"
  | "dark-gothic"
  | "healing-dreamy"
  | "chinese-anime"
  | "webtoon";

export type StyleCategoryInfo = {
  id: StyleCategory;
  nameZh: string;
  nameEn: string;
  description: string;
};

export const categories: StyleCategoryInfo[] = [
  {
    id: "japanese-anime",
    nameZh: "日系动画",
    nameEn: "Japanese Anime",
    description: "清晰轮廓、情绪光影与强烈叙事感并存的动画系画风。",
  },
  {
    id: "manga",
    nameZh: "漫画系",
    nameEn: "Manga",
    description: "偏线稿、分镜、网点与纸面表达的漫画视觉语言。",
  },
  {
    id: "game-illustration",
    nameZh: "游戏立绘",
    nameEn: "Game Illustration",
    description: "角色卖点强、材质明确、适合设定图与商业宣传的立绘体系。",
  },
  {
    id: "visual-novel",
    nameZh: "视觉小说",
    nameEn: "Visual Novel",
    description: "角色表演和氛围背景并重，适合剧情化场景与对话界面。",
  },
  {
    id: "kawaii-chibi",
    nameZh: "萌系 / Q版",
    nameEn: "Kawaii / Chibi",
    description: "圆润、轻量、亲和，适合贴纸、表情包和轻 IP 化表达。",
  },
  {
    id: "figure-3d-plush",
    nameZh: "3D / 手办 / 毛绒",
    nameEn: "3D / Figure / Plush",
    description: "材质感主导的二次元衍生视觉，强调玩具、毛绒和展示感。",
  },
  {
    id: "cyber-sci-fi",
    nameZh: "赛博 / 科幻",
    nameEn: "Cyber / Sci-Fi",
    description: "霓虹、全息、机甲与数字空间的未来动漫表达。",
  },
  {
    id: "dark-gothic",
    nameZh: "暗黑 / 哥特",
    nameEn: "Dark / Gothic",
    description: "高对比、宗教感、古堡感与神秘叙事构成的暗色系视觉。",
  },
  {
    id: "healing-dreamy",
    nameZh: "治愈 / 梦幻",
    nameEn: "Healing / Dreamy",
    description: "柔光、粉雾、梦境气氛与低压情绪的舒缓系画风。",
  },
  {
    id: "chinese-anime",
    nameZh: "国风二次元",
    nameEn: "Chinese Anime",
    description: "新中式、仙侠、水墨与国潮配色驱动的东方幻想表达。",
  },
  {
    id: "webtoon",
    nameZh: "韩漫 Webtoon",
    nameEn: "Webtoon",
    description: "高光皮肤、都市时装感与长条漫画节奏鲜明的现代韩漫风格。",
  },
];

export const categoryMap = Object.fromEntries(
  categories.map((category) => [category.id, category]),
) as Record<StyleCategory, StyleCategoryInfo>;
