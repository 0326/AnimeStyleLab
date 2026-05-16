# AnimeStyleLab 第一版 MVP 需求方案

## 1. 项目定位

### 1.1 项目名称

推荐名称：**AnimeStyleLab**

中文定位：**二次元风格实验室**

### 1.2 一句话定位

帮助用户浏览、理解、组合二次元画风，并一键生成适用于 AI 生图工具的高质量 Prompt。

### 1.3 第一版目标

第一版不做在线生图、不做用户登录、不做社区、不依赖服务器，只做一个高质量纯静态 Prompt 风格知识库 + Prompt Builder。

核心目标：

- 让用户快速找到想要的二次元画风
- 让每种画风都有结构化解释和可复制 Prompt
- 让用户通过简单选择生成适配 GPT Image 和 Nano Banana 的 Prompt
- 让 Prompt 不只是关键词堆叠，而是按主体、风格、构图、光影、用途约束分层组织
- 为后续接入 AI 生图、图片反推、用户收藏、社区投稿预留结构

---

## 2. 技术方案

### 2.1 技术栈

使用：

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- 静态导出
- 本地 JSON / TS 数据文件
- localStorage
- Fuse.js 或简单前端搜索

### 2.2 部署方式

第一版使用纯静态部署：Cloudflare Pages

要求：

- 不依赖数据库
- 不依赖后端 API
- 不依赖登录系统
- 所有数据本地化
- 支持 SEO 静态页面生成

### 2.3 Next.js 配置要求

需要支持静态导出：

```ts
// next.config.ts
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

---

## 3. MVP 核心功能

第一版只做 5 个核心模块：

1. 首页
2. 风格库
3. 风格详情页
4. Prompt Builder
5. 壁纸 Prompt 生成器

暂不做：

- 在线生图
- 登录注册
- 用户投稿
- 社区评论
- 图片上传反推风格
- 付费系统
- 后端数据库
- 移动端专项适配
- SDXL / Midjourney / Flux 等模型专项 Prompt

---

## 4. 页面结构

### 4.1 首页 `/`

首页目标：让用户快速理解网站价值，并进入风格探索或 Prompt 生成。

页面模块：

#### Hero 区

标题：

```txt
二次元风格实验室
```

副标题：

```txt
探索、理解、组合二次元画风，一键生成适用于 AI 生图的高质量 Prompt。
```

主按钮：

- 探索画风
- 生成 Prompt
- 查看壁纸模板

#### 热门风格区

展示 8-12 个热门风格卡片：

- 日系赛璐璐
- 新海诚感
- 厚涂游戏立绘
- 视觉小说
- 毛绒二次元
- 赛博动漫
- 韩漫 Webtoon
- Q版萌系
- 90s 复古动画
- 动漫手办感

每张卡片包含：

- 风格预览图
- 中文名
- 英文名
- 3-5 个标签
- 查看详情按钮
- 快速复制 Prompt 按钮

#### Prompt Builder 快速入口

提供一个迷你表单：

- 主体
- 风格
- 用途

用户点击后进入完整 Prompt Builder 页面。

#### 风格宇宙区

展示一级分类：

```txt
日系动画
漫画系
游戏立绘
视觉小说
萌系 / Q版
厚涂 / 半厚涂
3D / 手办 / 毛绒
赛博 / 科幻
暗黑 / 哥特
治愈 / 梦幻
国风二次元
韩漫 Webtoon
```

#### SEO 内容区

写一段介绍：

- 什么是二次元画风 Prompt
- 为什么画风需要结构化
- 如何使用本站生成 Prompt

---

### 4.2 风格库 `/styles`

页面目标：让用户像逛 Pinterest 一样浏览二次元风格。

核心功能：

- 风格卡片网格
- 分类筛选
- 标签筛选
- 搜索
- 排序
- 收藏
- 一键复制 Prompt

#### 筛选维度

一级分类：

```txt
日系动画
漫画系
游戏立绘
视觉小说
萌系 / Q版
厚涂 / 半厚涂
3D / 手办 / 毛绒
赛博 / 科幻
暗黑 / 哥特
治愈 / 梦幻
国风二次元
韩漫 Webtoon
```

用途：

```txt
头像
手机壁纸
桌面壁纸
IP角色
表情包
海报
公众号封面
小红书封面
游戏立绘
```

视觉标签：

```txt
柔光
高饱和
粉彩
厚涂
赛璐璐
毛绒
手办感
电影感
梦幻
暗黑
霓虹
复古
```

#### 风格卡片字段

每张卡片展示：

- 预览图
- 中文名
- 英文名
- 分类
- 标签
- 简短描述
- 适合用途
- 复制 Prompt
- 查看详情
- 收藏按钮

---

### 4.3 风格详情页 `/styles/[slug]`

页面目标：把每个风格做成一个可 SEO、可学习、可复制、可组合的风格说明页。

#### 页面结构

1. 风格头图
2. 风格名称
3. 中英文名称
4. 风格简介
5. 视觉特征
6. Prompt 关键词
7. 基础风格描述
8. 禁止项 / 避免项
9. 不同用途模板
10. 可融合风格
11. 相似风格
12. 使用建议

#### 示例：毛绒二次元

风格名称：

```txt
毛绒二次元 / Plush Anime
```

视觉特征：

```txt
柔软毛绒材质、圆润体块、暖色柔光、2.5D 动漫渲染、治愈氛围、可爱 IP 感。
```

关键词：

```txt
plush anime aesthetic, soft fur texture, rounded proportions, warm pastel lighting, anime 3D hybrid rendering, cute mascot design
```

基础风格描述：

```txt
plush anime aesthetic, soft fur texture, rounded character proportions, warm pastel lighting, anime 3D hybrid rendering, soft cinematic glow, cute mascot design, clean composition, high quality illustration
```

禁止项 / 避免项：

```txt
low quality, blurry, deformed, extra fingers, bad anatomy, messy background, text, watermark, logo
```

用途模板：

- 头像 Prompt
- 手机壁纸 Prompt
- 桌面壁纸 Prompt
- IP 角色 Prompt
- 表情包 Prompt

---

### 4.4 Prompt Builder `/builder`

页面目标：用户通过选择项快速生成 Prompt，而不是手写一大段英文。

#### 输入项

主体：

```txt
二次元少女
猫娘
少年
魔法少女
机甲
宠物角色
原创 IP 角色
城市风景
幻想场景
```

风格：

```txt
日系赛璐璐
新海诚感
视觉小说
厚涂游戏立绘
毛绒二次元
赛博动漫
暗黑哥特
梦幻粉彩
国风二次元
韩漫 Webtoon
```

光影：

```txt
柔光
逆光
黄昏光
月光
霓虹光
电影感光影
体积光
过曝梦幻光
```

配色：

```txt
粉彩
蜂蜜暖色
蓝紫冷色
黑金
高饱和
低饱和
清新蓝白
复古胶片色
```

构图：

```txt
特写
半身
全身
居中构图
远景
低角度
俯视角
对称构图
```

用途：

```txt
头像
手机壁纸
桌面壁纸
小红书封面
公众号封面
海报
角色设定图
```

模型类型：

```txt
GPT Image
Nano Banana
```

#### 输出结果

输出区域包含：

- GPT Image Prompt
- Nano Banana Prompt
- 中文解释
- Prompt 结构拆解
- 推荐比例
- 使用建议
- 复制按钮
- 保存到本地收藏

说明：

- GPT Image 输出偏自然语言描述，强调主体、风格、场景、构图、细节和限制条件。
- Nano Banana 输出偏清晰指令式描述，强调可控修改、画面元素、保留项、禁止项和最终用途。
- 第一版不输出 SDXL / Midjourney / Flux 专项参数。
- 负向约束不单独做成传统 negative prompt，而是合并进“避免/不要出现”的自然语言约束中。

#### Prompt 结构逻辑

Prompt 不是简单拼字符串，而是按语义段落组织：

```txt
主体描述 + 风格定义 + 关键视觉特征 + 光影 + 配色 + 构图 + 用途约束 + 禁止项 + 输出质量要求
```

建议内部结构：

```ts
type PromptBlock = {
  subject: string;
  style: string;
  visualFeatures: string[];
  lighting: string;
  color: string;
  composition: string;
  useCase: string;
  constraints: string[];
  quality: string[];
};
```

GPT Image 输出示例：

```txt
Create an anime-style illustration of an anime girl with rounded plush-like proportions, soft fur texture, warm pastel lighting, and a clean centered composition. Use a plush anime aesthetic with soft cinematic glow, gentle colors, and a cozy healing atmosphere. Make it suitable for a vertical mobile wallpaper with balanced negative space and no text, no logo, no watermark.
```

Nano Banana 输出示例：

```txt
Generate a vertical mobile wallpaper featuring an anime girl in a plush anime style. Keep the character centered with rounded proportions, soft fur-like surface details, warm pastel lighting, and a clean background. Preserve clear icon-safe space in the upper area. Avoid text, logos, watermarks, messy background elements, distorted anatomy, and harsh lighting.
```

---

### 4.5 壁纸 Prompt 生成器 `/wallpaper`

页面目标：专门为壁纸场景生成 Prompt。

#### 输入项

设备类型：

```txt
手机壁纸
桌面壁纸
超宽屏壁纸
平板壁纸
公众号封面
小红书封面
```

比例：

```txt
9:16
16:9
21:9
4:3
3:4
2.35:1
```

主体位置：

```txt
居中
偏左
偏右
底部
远景
留白多
```

风格：

复用风格库中的风格。

壁纸约束自动追加：

```txt
wallpaper composition, clean background, no text, no logo, safe area for icons, balanced negative space, high resolution, sharp details
```

#### 输出内容

- GPT Image 壁纸 Prompt
- Nano Banana 壁纸 Prompt
- 推荐比例
- 构图建议
- 图标安全区说明
- 复制按钮

---

## 5. 数据结构设计

### 5.1 风格数据 `styles.ts`

```ts
export type StyleCategory =
  | "japanese-anime"
  | "manga"
  | "game-illustration"
  | "visual-novel"
  | "kawaii-chibi"
  | "painterly"
  | "figure-3d-plush"
  | "cyber-sci-fi"
  | "dark-gothic"
  | "healing-dreamy"
  | "chinese-anime"
  | "webtoon";

export type AnimeStyle = {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  category: StyleCategory;
  summary: string;
  description: string;
  previewImage: string;
  tags: string[];
  visualFeatures: string[];
  promptKeywords: string[];
  basePrompt: string;
  avoidPrompt: string;
  useCases: string[];
  recommendedRatios: string[];
  compatibleStyles: string[];
  similarStyles: string[];
  bestFor: string[];
  notRecommendedFor: string[];
  commonFailurePoints: string[];
  modelTips?: {
    gptImage?: string;
    nanoBanana?: string;
  };
};
```

### 5.2 Prompt 片段数据 `prompt-segments.ts`

```ts
export type PromptSegment = {
  id: string;
  labelZh: string;
  labelEn: string;
  type:
    | "subject"
    | "lighting"
    | "color"
    | "composition"
    | "quality"
    | "wallpaper";
  prompt: string;
};
```

### 5.3 分类数据 `categories.ts`

```ts
export const categories = [
  {
    id: "japanese-anime",
    nameZh: "日系动画",
    nameEn: "Japanese Anime",
    description: "经典日系动画、赛璐璐、新海诚感、京都动画感等。",
  },
  {
    id: "figure-3d-plush",
    nameZh: "3D / 手办 / 毛绒",
    nameEn: "3D / Figure / Plush",
    description: "动漫手办、毛绒玩具、2.5D、IP 角色渲染等。",
  },
];
```

### 5.4 数据质量标准

第一版虽然是静态数据，但必须保证数据可维护、可筛选、可生成 Prompt。

每条风格数据必须满足：

- `id` 和 `slug` 全局唯一
- `category` 必须来自 `StyleCategory`
- `tags` 至少 3 个，最多 8 个
- `visualFeatures` 至少 5 条
- `promptKeywords` 至少 6 条
- `basePrompt` 可作为基础风格描述使用
- `avoidPrompt` 作为禁止项来源，不直接暴露为传统负向 Prompt 的唯一输出
- `useCases` 至少 3 个
- `recommendedRatios` 至少 1 个
- `compatibleStyles` 和 `similarStyles` 必须引用真实存在的风格 slug
- `bestFor` 至少 3 条
- `notRecommendedFor` 至少 2 条
- `commonFailurePoints` 至少 2 条

分类分布要求：

- 第一版不少于 50 个风格
- 每个一级分类至少 3 个风格
- 首页热门风格必须来自不同分类，避免视觉重复

预览图要求：

- 每个风格必须提供 `previewImage`
- 预览图统一放在 `public/images/styles/`
- 图片比例优先使用 4:3 或 16:9，卡片中统一裁切
- 缺图时使用统一 fallback 图，但不允许详情页缺少视觉预览
- 后续如果批量生成预览图，需保持相同主体、不同风格，方便用户横向比较

---

## 6. 第一批风格库建议

第一版建议先做 60-100 个风格，不要少于 50 个。

### 6.1 日系动画类

- 日系赛璐璐
- 新海诚感
- 京都动画感
- 吉卜力童话感
- 90s 复古动画
- 2000s Galgame 风
- TV 动画截图风
- 剧场版动画风
- 少女动画风
- 热血少年漫动画风

### 6.2 漫画类

- 黑白漫画线稿
- 少女漫画
- 少年漫画
- 青年漫画
- 四格漫画
- 网点纸漫画
- 手绘漫画草稿
- 彩色漫画封面

### 6.3 游戏立绘类

- 二次元手游立绘
- 厚涂游戏立绘
- 半厚涂角色设定
- 卡牌插画
- 幻想 RPG 立绘
- 乙女游戏立绘
- 战斗角色立绘
- Live2D 看板娘风

### 6.4 视觉小说类

- Galgame 背景
- 视觉小说角色
- 校园恋爱视觉小说
- 悬疑视觉小说
- 治愈系视觉小说
- 高级 UI 角色立绘

### 6.5 萌系 / Q版类

- Q版萌系
- Chibi 小人
- 表情包风
- 可爱贴纸风
- Sanrio 感可爱风
- Line Friends 极简可爱风
- 圆润 IP 角色风

### 6.6 3D / 手办 / 毛绒类

- 动漫手办渲染
- 毛绒二次元
- 2.5D 动漫渲染
- 3D Q版角色
- 盲盒玩具风
- 黏土人风
- 软糖质感角色
- 毛毡玩具风

### 6.7 赛博 / 科幻类

- 赛博朋克动漫
- 霓虹城市动漫
- 未来机甲
- AI 虚拟偶像
- 科幻实验室
- 数字空间少女
- 全息界面风

### 6.8 暗黑 / 哥特类

- 暗黑哥特动漫
- 吸血鬼少女
- 黑金幻想
- 废墟末世动漫
- 魔女风
- 暗黑童话
- 神秘宗教感插画

### 6.9 治愈 / 梦幻类

- 梦幻粉彩
- 治愈系动漫
- 云朵天空风
- 柔光少女风
- 童话梦境
- 水彩二次元
- 森系治愈

### 6.10 国风二次元类

- 国风仙侠
- 新中式动漫
- 水墨二次元
- 工笔人物二次元
- 古风少女
- 山海经幻想
- 国潮动漫

### 6.11 韩漫 Webtoon 类

- 韩漫 Webtoon
- 现代都市韩漫
- 浪漫恋爱韩漫
- 长条漫画风
- 高光皮肤韩漫
- 时尚人物韩漫

---

## 7. 组件设计

### 7.1 核心组件

```txt
Header
Footer
HeroSection
StyleCard
StyleGrid
CategoryFilter
TagFilter
SearchInput
CopyButton
FavoriteButton
PromptOutput
PromptBuilderForm
WallpaperPresetSelector
StyleDetailHeader
RelatedStyleList
```

### 7.2 StyleCard 组件

展示内容：

```txt
预览图
中文名
英文名
标签
简介
适合用途
复制按钮
详情按钮
收藏按钮
```

### 7.3 CopyButton 组件

要求：

- 点击后复制 Prompt
- 显示“已复制”反馈
- 支持复制 GPT Image Prompt
- 支持复制 Nano Banana Prompt
- 支持复制基础风格描述

### 7.4 FavoriteButton 组件

要求：

- 使用 localStorage 保存收藏
- 收藏状态刷新后保留
- 风格库中支持“只看收藏”

---

## 8. 交互要求

### 8.1 搜索

支持搜索：

- 中文名
- 英文名
- 标签
- 视觉特征
- Prompt 关键词

搜索不需要后端，使用前端数据过滤即可。

### 8.2 筛选

支持多条件组合筛选：

- 分类
- 用途
- 标签
- 收藏状态

### 8.3 Prompt Builder

用户每改变一个选项，右侧 Prompt 实时更新。

### 8.4 复制反馈

复制成功后按钮显示：

```txt
已复制
```

1.5 秒后恢复。

### 8.5 PC 响应式设计

必须适配：

- 1280px 常规笔记本屏幕
- 1440px 主流桌面屏幕
- 1728px / 1920px 大屏幕
- 2560px 及以上宽屏显示器

PC 体验重点保证：

- 内容最大宽度受控，避免大屏过度拉伸
- 风格库在不同宽度下自动调整列数
- 左侧筛选区和右侧内容区比例稳定
- Prompt Builder 使用左右分栏，输入区和输出区同时可见
- Prompt 输出区域支持长文本滚动、复制和局部查看
- 不做手机端专项适配，但页面在窄屏下不能出现严重布局错位

---

## 9. SEO 设计

### 9.1 页面 SEO

每个风格详情页要有独立标题：

```txt
毛绒二次元 Prompt｜Plush Anime AI Illustration Style
```

描述：

```txt
了解毛绒二次元画风的视觉特征、关键词、基础风格描述、禁止项、壁纸 Prompt 和适合用途。
```

### 9.2 URL 结构

```txt
/styles/plush-anime
/styles/cyber-anime
/styles/visual-novel
/styles/anime-figure
/builder
/wallpaper
```

### 9.3 内容策略

每个风格详情页至少包含：

- 300 字中文说明
- 英文关键词
- Prompt 示例
- 使用场景
- 相似风格
- 可融合风格

---

## 10. 视觉设计方向

### 10.1 整体风格

关键词：

```txt
二次元实验室
深色工作台
图像优先
清晰卡片网格
少量霓虹强调
Prompt Console
高级但克制
```

### 10.2 推荐视觉元素

- 深色背景
- 克制的紫蓝强调色
- 少量柔和光晕
- 清晰边界的卡片
- 标签胶囊
- 网格背景
- 轻微动效
- 类 IDE / Lab Console 的 Prompt 输出区

### 10.3 UI 参考方向

整体感觉应接近：

```txt
AI 创作工具 + 二次元风格图鉴 + Prompt 工作台
```

不要做成传统博客，也不要做成普通工具站。

---

## 11. 目录结构建议

```txt
anime-style-lab/
├─ app/
│  ├─ page.tsx
│  ├─ styles/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx
│  ├─ builder/page.tsx
│  ├─ wallpaper/page.tsx
│  └─ layout.tsx
├─ components/
│  ├─ Header.tsx
│  ├─ Footer.tsx
│  ├─ StyleCard.tsx
│  ├─ StyleGrid.tsx
│  ├─ CopyButton.tsx
│  ├─ FavoriteButton.tsx
│  ├─ PromptBuilderForm.tsx
│  ├─ PromptOutput.tsx
│  └─ WallpaperPromptForm.tsx
├─ data/
│  ├─ styles.ts
│  ├─ categories.ts
│  ├─ prompt-segments.ts
│  └─ wallpaper-presets.ts
├─ lib/
│  ├─ prompt-builder.ts
│  ├─ search.ts
│  └─ storage.ts
├─ public/
│  └─ images/styles/
├─ styles/
│  └─ globals.css
└─ next.config.ts
```

---

## 12. Prompt Builder 逻辑示例

```ts
export type TargetModel = "gpt-image" | "nano-banana";

export type PromptInput = {
  subject: string;
  styleName: string;
  styleDescription: string;
  visualFeatures: string[];
  lighting: string;
  color: string;
  composition: string;
  useCase: string;
  constraints: string[];
  targetModel: TargetModel;
};

export function buildPrompt(input: PromptInput) {
  const featureText = input.visualFeatures.slice(0, 6).join(", ");
  const avoidText = input.constraints.join(", ");

  if (input.targetModel === "nano-banana") {
    return [
      `Generate ${input.useCase} featuring ${input.subject}.`,
      `Use ${input.styleName}: ${input.styleDescription}.`,
      `Keep these visual features clear: ${featureText}.`,
      `Composition: ${input.composition}. Lighting: ${input.lighting}. Color palette: ${input.color}.`,
      `Avoid ${avoidText}.`,
    ].join(" ");
  }

  return [
    `Create an anime-style image of ${input.subject}.`,
    `The visual style should be ${input.styleName}, described as ${input.styleDescription}.`,
    `Include these key visual traits: ${featureText}.`,
    `Use ${input.lighting}, ${input.color}, and ${input.composition}.`,
    `Make it suitable for ${input.useCase}.`,
    `Avoid ${avoidText}.`,
  ].join(" ");
}
```

核心原则：

- GPT Image：更自然、更完整，像给图像模型的创作简报。
- Nano Banana：更明确、更指令化，适合强调“生成什么、保留什么、避免什么”。
- 不为第一版实现传统逗号关键词模式，也不输出模型参数。

---

## 13. 壁纸 Prompt 规则

根据用途自动追加：

### 手机壁纸

```txt
vertical wallpaper, 9:16 aspect ratio, safe area for app icons, clean upper space, centered subject, no text, no logo
```

### 桌面壁纸

```txt
desktop wallpaper, 16:9 aspect ratio, wide composition, balanced negative space, clean background, no text, no logo
```

### 超宽屏壁纸

```txt
ultrawide wallpaper, 21:9 aspect ratio, panoramic composition, cinematic wide shot, balanced layout, no text, no logo
```

### 小红书封面

```txt
3:4 vertical cover composition, clean central subject, space for title overlay, high contrast, no existing text
```

### 公众号封面

```txt
wide banner composition, 2.35:1 aspect ratio, strong focal point, clean space for typography, no existing text
```

---

## 14. 第一版验收标准

### 14.1 功能验收

必须完成：

- 首页完整可访问
- 风格库可筛选、搜索、复制
- 至少 50 个风格数据
- 每个风格有详情页
- Prompt Builder 可用
- 壁纸 Prompt 生成器可用
- 收藏功能使用 localStorage
- GPT Image Prompt 输出可用
- Nano Banana Prompt 输出可用
- 静态导出成功
- PC 不同屏幕宽度可用

### 14.2 内容验收

每个风格至少包含：

- 中文名
- 英文名
- 分类
- 简介
- 视觉特征
- 标签
- 基础风格描述
- 禁止项 / 避免项
- 适合用途
- 推荐比例
- 适合场景
- 不适合场景
- 常见失败点
- GPT Image 使用建议
- Nano Banana 使用建议

数据验收：

- `slug` 无重复
- `compatibleStyles` 和 `similarStyles` 不引用不存在的风格
- 每个一级分类至少 3 个风格
- 每个风格都有预览图
- 首页热门风格覆盖至少 6 个不同分类

### 14.3 体验验收

用户应能在 30 秒内完成：

```txt
进入网站 → 找到一个喜欢的画风 → 复制 Prompt
```

用户应能在 1 分钟内完成：

```txt
选择主体 + 风格 + 用途 → 生成一条可用 Prompt
```

PC 屏幕验收：

- 1280px 宽度下，风格库、详情页、Builder 均无横向滚动
- 1440px 宽度下，主要内容阅读宽度舒适
- 1920px 宽度下，内容不被无限拉宽
- Builder 页面输入区和输出区同时可见
- Prompt 长文本可滚动查看并一键复制

---

## 15. 后续版本规划

### V1.1

- 增加到 150 个风格
- 增加更多用途模板
- 增加 Prompt Remix 预设
- 增加中英文双语切换

### V1.2

- 图片上传反推风格，纯前端可先做占位说明
- 风格对比页面
- 风格关系图谱
- 用户本地 Prompt 历史记录

### V2.0

- 接入后端
- 用户账号
- 在线生图
- 用户投稿
- 社区作品墙
- Prompt 版本管理

### V3.0

- 个人 Style DNA
- 图片反推 Prompt
- 风格 Remix 引擎
- HajimiKitty 虚拟设计师接入

---

## 16. 给 Cursor 的开发指令建议

可以直接使用以下开发指令：

```txt
请使用 Next.js + TypeScript + Tailwind CSS 开发一个纯静态站点 AnimeStyleLab。

这是一个 二次元风格实验室，不需要后端、不需要登录、不需要数据库。所有数据放在本地 data/*.ts 文件中，支持静态导出。

请实现以下页面：
1. 首页 /
2. 风格库 /styles
3. 风格详情页 /styles/[slug]
4. Prompt Builder /builder
5. 壁纸 Prompt 生成器 /wallpaper

请实现以下功能：
- 风格卡片展示
- 分类筛选
- 标签筛选
- 关键词搜索
- 一键复制 Prompt
- localStorage 收藏
- Prompt Builder 实时生成 GPT Image 和 Nano Banana Prompt
- 壁纸用途自动追加 Prompt 约束
- 适配 PC 不同屏幕宽度，不需要移动端专项体验
- SEO metadata

请先内置至少 50 条二次元画风数据，每条数据包含中文名、英文名、slug、分类、标签、视觉特征、基础风格描述、禁止项 / 避免项、适合用途、推荐比例、相似风格、可融合风格、适合场景、不适合场景、常见失败点、GPT Image 使用建议和 Nano Banana 使用建议。

整体视觉风格为：深色工作台、二次元实验室、图像优先、清晰卡片网格、少量霓虹强调、Prompt Console、高级克制。
```

---

## 17. 核心原则

第一版一定要克制。

不要做成：

```txt
AI Prompt 大全
```

而要做成：

```txt
二次元画风实验室
```

核心差异化：

```txt
不是复制 Prompt，而是理解、组合和复用画风。
```
