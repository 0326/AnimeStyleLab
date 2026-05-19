import type { Locale } from "./config";

export const dictionaries = {
  en: {
    metadata: {
      description:
        "Explore anime visual styles, compare mood systems, and generate GPT Image and Nano Banana prompts from a PC-first style workbench.",
    },
    nav: {
      tagline: "动漫风格图谱 · 提示词实验室",
      overview: "Overview",
      styles: "Style Atlas",
      builder: "Prompt Builder",
      wallpaper: "Wallpaper Lab",
      language: "Language",
      english: "EN",
      chinese: "中文",
    },
    footer: {
      note: "AnimeStyleLab v1 focuses on PC-first anime style exploration and prompt generation.",
      stack: "GPT Image · Nano Banana · Static Export",
    },
    actions: {
      copy: "Copy",
      copied: "Copied",
      copyPromptSuccess: "Prompt copied",
      copyBasePrompt: "Copy Base Prompt",
      copyAvoidTerms: "Copy Avoid Terms",
      copyPrompt: "Copy Prompt",
      save: "Save",
      saved: "Saved",
      savedSuccess: "Saved",
      removedSuccess: "Removed",
      saveToWorkbench: "Save to Workbench",
    },
    home: {
      eyebrow: "Anime Style Atlas",
      title:
        "Understand anime visual systems, then turn them into usable prompts.",
      intro:
        "AnimeStyleLab is a PC-first style workbench for comparing mood, material, composition, and prompt language across anime-inspired visual families.",
      explore: "Explore Style Atlas",
      builder: "Open Prompt Builder",
      wallpaper: "Launch Wallpaper Lab",
      styleCountLabel: "Curated styles",
      promptOutputsLabel: "Prompt outputs",
      dynamicComboLabel: "Dynamic remix",
      dynamicComboValue: "Infinite combinations",
      featuredEyebrow: "Featured Lanes",
      featuredTitle: "Styles worth opening first",
      featuredIntro:
        "Each card is a style lane, not just a prompt snippet. The previews are meant to signal material, mood, and rendering behavior before you open the detail page.",
      moreEyebrow: "See More",
      moreTitle: "Open the full atlas and compare the whole style field.",
      moreIntro:
        "Go beyond the featured lanes and scan the broader style map by mood, material, use case, and prompt language.",
      moreCta: "Enter Style Atlas",
    },
    styles: {
      metadataTitle: "Style Atlas",
      metadataDescription:
        "Browse 50 anime-inspired style lanes by mood, material, use case, and prompt language.",
      eyebrow: "Style Atlas",
      title: "Search by visual language, not by random prompt scraps.",
      intro:
        "Compare styles through thumbnails, prompt vocabulary, use cases, and failure patterns so you can choose a lane before you generate.",
      filtersEyebrow: "Style Filters",
      filtersTitle: "Atlas Controls",
      filtersIntro:
        "Search by visual language, use case, or prompt vocabulary and keep a narrowed style lane while you compare.",
      search: "Search",
      searchPlaceholder: "rain, plush, gothic, cel...",
      category: "Category",
      allCategories: "All categories",
      tag: "Tag",
      allTags: "All tags",
      useCase: "Use Case",
      allUseCases: "All use cases",
      savedOnly: "Saved only",
      on: "On",
      off: "Off",
      results: "Results",
      resultsTitle: "{count} styles in focus",
      resultsIntro:
        "The atlas stays PC-first: dense enough for comparison, but still paced for scanning prompt systems and preview language side by side.",
      noMatchEyebrow: "No Match",
      noMatchTitle: "Reset the lane",
      noMatchBody:
        "This combination is too narrow. Try clearing one filter or switching the use case so the style family can breathe again.",
      viewStyle: "View Style",
    },
    builder: {
      metadataTitle: "Prompt Builder",
      metadataDescription:
        "Build layered anime prompts for GPT Image and Nano Banana by combining subject, style, lighting, color, and composition.",
      eyebrow: "Prompt Builder",
      title: "One style lane, two prompt outputs.",
      intro:
        "The builder keeps GPT Image and Nano Banana aligned on the same visual brief while letting each model keep its own prompt voice.",
      inputEyebrow: "Builder Input",
      controlsTitle: "Prompt Controls",
      subject: "Subject",
      style: "Style",
      lighting: "Lighting",
      color: "Color",
      composition: "Composition",
      useCase: "Use Case",
      outputTitle: "Prompt Output",
      structure: "Structure",
      usageNotes: "Usage Notes",
      ratios: "Recommended Ratios",
      workbenchEyebrow: "Workbench",
      workbenchTitle: "Saved Prompt History",
      workbenchMeta: "Newest first, local-only, capped at 12 entries.",
      emptyHistory:
        "Save generated prompts here to compare different style lanes without leaving the builder.",
    },
    wallpaper: {
      metadataTitle: "Wallpaper Lab",
      metadataDescription:
        "Generate wallpaper-focused anime prompts with layout-safe framing, ratio presets, and PC-first prompt outputs.",
      eyebrow: "Wallpaper Lab",
      title: "Design prompts around framing constraints, not after them.",
      intro:
        "Wallpaper outputs add breathing room, device-safe placement, and ratio discipline so the final image survives the crop it is intended for.",
      controlEyebrow: "Wallpaper Control",
      layoutTitle: "Scene Layout",
      subject: "Subject",
      style: "Style",
      output: "Output",
      ratio: "Ratio",
      placement: "Placement",
    },
    detail: {
      notFound: "Style Not Found",
      promptSuffix: "Prompt",
      descriptionSuffix:
        "Learn the visual features, use cases, prompt direction, and failure points for this style.",
      remix: "Remix in Builder",
      visualFeatures: "Visual Features",
      bestFor: "Best For",
      avoid: "Avoid / Failure Points",
      gptTitle: "Natural-language prompt lane",
      nanoTitle: "Instruction-first prompt lane",
      useCases: "Use Cases",
      whereWorks: "Where this style works",
      notRecommendedFor: "Not recommended for:",
      startingRatios: "Starting ratios:",
    },
  },
  zh: {
    metadata: {
      description:
        "在 PC 优先的动漫风格工作台中探索画风、比较情绪系统，并生成 GPT Image 与 Nano Banana 提示词。",
    },
    nav: {
      tagline: "动漫风格图谱 · 提示词实验室",
      overview: "总览",
      styles: "风格图谱",
      builder: "提示词生成器",
      wallpaper: "壁纸实验室",
      language: "语言",
      english: "EN",
      chinese: "中文",
    },
    footer: {
      note: "AnimeStyleLab v1 聚焦 PC 优先的动漫风格探索与提示词生成。",
      stack: "GPT Image · Nano Banana · 静态导出",
    },
    actions: {
      copy: "复制",
      copied: "已复制",
      copyPromptSuccess: "复制提示词成功",
      copyBasePrompt: "复制基础提示词",
      copyAvoidTerms: "复制规避词",
      copyPrompt: "复制提示词",
      save: "收藏",
      saved: "已收藏",
      savedSuccess: "收藏成功",
      removedSuccess: "已取消收藏",
      saveToWorkbench: "保存到工作台",
    },
    home: {
      eyebrow: "动漫风格图谱",
      title: "构造你的动漫风格提示词系统",
      intro:
        "AnimeStyleLab 是一个专注动漫风格的文生图提示词平台，通过主体、风格、光线、色彩、构图和用途六大维度拆分，构建出科学、灵活、可扩展的提示词系统。",
      explore: "浏览风格图谱",
      builder: "打开提示词生成器",
      wallpaper: "启动壁纸实验室",
      styleCountLabel: "精选风格",
      promptOutputsLabel: "提示词输出",
      dynamicComboLabel: "动态组合",
      dynamicComboValue: "组合方式无限延展",
      featuredEyebrow: "精选风格",
      featuredTitle: "优先打开这些风格",
      featuredIntro:
        "每张卡片都是一条风格路径，而不只是提示词片段。预览图会先传达材质、情绪和渲染倾向，再进入详情页阅读。",
      moreEyebrow: "查看更多",
      moreTitle: "进入完整风格图谱，对比更广的画风场景。",
      moreIntro:
        "从精选入口继续展开，按情绪、材质、用途和提示词语言浏览整套风格路径。",
      moreCta: "前往风格图谱",
    },
    styles: {
      metadataTitle: "风格图谱",
      metadataDescription:
        "按情绪、材质、用途和提示词语言浏览 50 个动漫风格路径。",
      eyebrow: "风格图谱",
      title: "按视觉语言检索，而不是靠随机提示词碎片。",
      intro:
        "通过缩略预览、提示词词汇、使用场景和失败模式比较风格，先选定路径再开始生成。",
      filtersEyebrow: "风格筛选",
      filtersTitle: "图谱控制台",
      filtersIntro:
        "按视觉语言、使用场景或提示词词汇搜索，在对比时保持清晰的风格范围。",
      search: "搜索",
      searchPlaceholder: "雨夜、毛绒、哥特、赛璐璐...",
      category: "分类",
      allCategories: "全部分类",
      tag: "标签",
      allTags: "全部标签",
      useCase: "用途",
      allUseCases: "全部用途",
      savedOnly: "只看收藏",
      on: "开",
      off: "关",
      results: "结果",
      resultsTitle: "当前聚焦 {count} 个风格",
      resultsIntro:
        "图谱保持 PC 优先：信息密度足够支撑比较，同时仍能并排扫描提示词系统与预览语言。",
      noMatchEyebrow: "无匹配",
      noMatchTitle: "重置筛选路径",
      noMatchBody:
        "这个组合过窄。尝试清除一个筛选项，或切换用途，让风格族重新展开。",
      viewStyle: "查看风格",
    },
    builder: {
      metadataTitle: "提示词生成器",
      metadataDescription:
        "组合主体、风格、光线、色彩和构图，为 GPT Image 与 Nano Banana 构建分层动漫提示词。",
      eyebrow: "提示词生成器",
      title: "一条风格路径，两种提示词输出。",
      intro:
        "生成器让 GPT Image 和 Nano Banana 对齐在同一视觉简报上，同时保留各自的提示词表达方式。",
      inputEyebrow: "生成输入",
      controlsTitle: "提示词控制",
      subject: "主体",
      style: "风格",
      lighting: "光线",
      color: "色彩",
      composition: "构图",
      useCase: "用途",
      outputTitle: "提示词输出",
      structure: "结构",
      usageNotes: "使用说明",
      ratios: "推荐比例",
      workbenchEyebrow: "工作台",
      workbenchTitle: "已保存提示词",
      workbenchMeta: "最新在前，仅本地保存，最多 12 条。",
      emptyHistory:
        "保存生成结果后，可在不离开生成器的情况下对比不同风格路径。",
    },
    wallpaper: {
      metadataTitle: "壁纸实验室",
      metadataDescription:
        "生成面向壁纸的动漫提示词，包含安全构图、比例预设和 PC 优先输出。",
      eyebrow: "壁纸实验室",
      title: "先围绕构图约束设计提示词，而不是事后补救。",
      intro:
        "壁纸输出会加入留白、设备安全位置和比例约束，确保最终图片能适应目标裁切。",
      controlEyebrow: "壁纸控制",
      layoutTitle: "场景布局",
      subject: "主体",
      style: "风格",
      output: "输出",
      ratio: "比例",
      placement: "构图位置",
    },
    detail: {
      notFound: "未找到风格",
      promptSuffix: "提示词",
      descriptionSuffix:
        "了解这个风格的视觉特征、适用场景、提示词方向和失败点。",
      remix: "在生成器中改写",
      visualFeatures: "视觉特征",
      bestFor: "适合",
      avoid: "规避 / 失败点",
      gptTitle: "自然语言提示词路径",
      nanoTitle: "指令优先提示词路径",
      useCases: "使用场景",
      whereWorks: "这个风格适合哪里",
      notRecommendedFor: "不推荐：",
      startingRatios: "起始比例：",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
