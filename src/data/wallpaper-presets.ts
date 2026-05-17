export type WallpaperPreset = {
  id: string;
  label: string;
  ratio: string;
  placement: string;
  constraints: string[];
};

export const wallpaperPresets: WallpaperPreset[] = [
  {
    id: "mobile",
    label: "手机壁纸",
    ratio: "9:16",
    placement: "centered subject with safe top space",
    constraints: [
      "preserve icon-safe area in the upper third",
      "keep major focal elements away from the screen corners",
      "avoid text and watermark",
    ],
  },
  {
    id: "desktop",
    label: "桌面壁纸",
    ratio: "16:9",
    placement: "wide composition with balanced center and side breathing room",
    constraints: [
      "leave negative space for desktop icons",
      "keep the center visually readable from a distance",
      "avoid text and watermark",
    ],
  },
  {
    id: "ultrawide",
    label: "超宽屏壁纸",
    ratio: "21:9",
    placement: "panoramic composition with anchor elements offset from center",
    constraints: [
      "use layered depth across the full width",
      "avoid crowding the center strip",
      "avoid text and watermark",
    ],
  },
  {
    id: "cover-rednote",
    label: "小红书封面",
    ratio: "3:4",
    placement: "clean central subject with top and side title breathing room",
    constraints: [
      "reserve layout space for external typography overlay",
      "keep the subject readable at thumbnail size",
      "avoid embedded text",
    ],
  },
  {
    id: "cover-wechat",
    label: "公众号封面",
    ratio: "2.35:1",
    placement: "wide banner focal point with controlled empty space",
    constraints: [
      "leave one clean zone for later title placement",
      "maintain strong focal clarity in a shallow banner crop",
      "avoid embedded text",
    ],
  },
];
