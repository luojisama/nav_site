import { Github, Twitter, Globe } from 'lucide-react';

export interface LinkItem {
  name: string;
  url: string;
  description?: string;
  icon?: string; // Optional icon name or URL
}

export interface Category {
  title: string;
  items: LinkItem[];
}

export const siteConfig = {
  title: "Shiroの个人网页导航站",
  description: "收集好用的工具，网站",
  author: "User",
  social: [
    {
      name: "GitHub",
      url: "https://github.com/luojisama",
      icon: Github,
    },
    {
      name: "Twitter",
      url: "https://x.com/shizuku__191981",
      icon: Twitter,
    },
    {
      name: "Blog",
      url: "https://blog.shiro.team",
      icon: Globe,
    }
  ],
  categories: [
    {
      title: "AI 工具",
      items: [
        {
          name: "ChatGPT",
          url: "https://chat.openai.com",
          description: "OpenAI 开发的强大 AI 聊天机器人",
        },
                {
          name: "Gemini",
          url: "https://gemini.google.com/app",
          description: "谷歌开发的的Gemini",
        },
        {
          name: "柏拉图api中转站",
          url: "https://api.bltcy.ai/register?aff=lfpE63220",
          description: "高性价比的模型api，支持多种模型",
        },
        {
          name: "Aihubmix",
          url: "https://aihubmix.com/?aff=0MsT",
          description: "高质量的模型api，支持多种模型",
        },
        {
          name: "Cherry Studio",
          url: "https://www.cherry-ai.com/",
          description: "Cherry Studio 是一款集多模型对话、知识库管理、AI 绘画、翻译等功能于一体的全能 AI 助手平台。",
        },
        {
          name: "RikkaHub",
          url: "https://rikka-ai.com/",
          description: "与Cherry Studio类似，适用于移动端",
        },

      ]
    },
    {
      title: "网盘工具",
      items: [
        {
          name: "夸克解析",
          url: "https://bd.bdwpweb.shop/quark/index.php",
          description: "夸克解析工具，支持解析夸克网盘链接",
        },
        {
          name: "百度网盘",
          url: "https://kdown.moiu.cn/free/#/index",
          description: "百度网盘解析工具，支持解析百度网盘链接",
        },
      ]
    },
    {
      title: "游戏",
      items: [
        {
          name: "月幕",
          url: "https://www.ymgal.games/",
          description: "一个Galgame社区",
        },
        {
          name: "小鳥遊暁の会员制餐厅",
          url: "https://t-satoru.top/",
          description: "Galgame",
        },
        {
          name: "乜都讲D",
          url: "https://blog.ztjal.info/",
          description: "Galgame个人博客",
        },
        {
          name: "风灵月影",
          url: "https://flingtrainer.com/trainer/",
          description: "游戏修改器",
        },
      ]
    },
    {
      title: "手机/电脑相关",
      items: [
        {
          name: "Mindows",
          url: "https://mindows.cn/#xz",
          description: "将适配的手机/平板刷入WOA系统",
        },
        {
          name: "搞机工具箱",
          url: "https://jamcz.com/gjgjx/",
          description: "安卓设备玩机工具，使用adb命令",
        },
        {
          name: "柚坛社区",
          url: "https://www.uotan.cn/",
          description: "通用玩机社区，分享玩机经验",
        },
        {
          name: "MSDN",
          url: "https://msdn.itellyou.cn/",
          description: "Windows系统镜像下载",
        },
        {
          name: "老弟一号wiki",
          url: "https://ldt.pc.wiki/",
          description: "B站up老弟一号的网站",
        },
        {
          name: "亦是美网络",
          url: "http://www.yishimei.cn/network/319.html",
          description: "提供激活Win的神龙KMS",
        },
        {
          name: "图吧工具箱",
          url: "https://tbtool.dawnstd.cn/download/",
          description: "知名综合硬件工具箱",
        },
      ]
    }
  ] as Category[]
};
