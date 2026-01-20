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
  author: "Shiro",
  avatar: "https://blog.shiro.team/avatar.png", // 你可以替换为实际的头像地址
  siteStartDate: "2026-01-20", // 添加站点启动日期
  social: [
    {
      name: "GitHub",
      url: "https://github.com/luojisama/nav_site",
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
      title: "AI",
      items: [
        {
          name: "ChatGPT",
          url: "https://chatgpt.com",
          description: "OpenAI 开发的强大 AI 聊天机器人",
        },
        {
          name: "Gemini",
          url: "https://gemini.google.com/app",
          description: "谷歌开发的的Gemini",
        },
        {
          name: "豆包",
          url: "https://www.doubao.com",
          description: "字节跳动旗下AI助手",
        },
        {
          name: "即梦",
          url: "https://jimeng.jianying.com/ai-tool/home",
          description: "字节跳动旗下AI创作助手",
        },
        {
          name: "Trae",
          url: "https://www.trae.ai",
          description: "字节跳动旗下AI编程IDE",
        },
        {
          name: "Trae CN",
          url: "https://www.trae.cn",
          description: "字节跳动旗下AI编程IDE-中国版",
        },
        {
          name: "柏拉图api中转站",
          url: "https://api.bltcy.ai/register?aff=lfpE63220",
          description: "高性价比api，支持多种模型",
        },
        {
          name: "Aihubmix",
          url: "https://aihubmix.com/?aff=0MsT",
          description: "高质量api，支持多种模型",
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
      title: "动漫，影视资源",
      items: [
        {
          name: "动漫花园",
          url: "https://dmhy.anoneko.com/",
          description: "动漫花园资源网",
        },
        {
          name: "Kazumi",
          url: "https://kazumi.app/",
          description: "使用 Flutter 开发的基于自定义规则的番剧采集与在线观看程序",
        },
        {
          name: "次元城动漫",
          url: "https://www.cycity.pro/",
          description: "免费观看动漫网页/APP",
        },
        {
          name: "不太灵影视",
          url: "http://www.butailing.com/",
          description: "在线观看电影/电视剧",
        },
        {
          name: "网飞猫",
          url: "https://www.ncat1.app/",
          description: "在线观看电影/电视剧",
        },
        {
          name: "柯南影视",
          url: "https://www.knvod.com/",
          description: "在线观看电影/电视剧",
        },
    ]
    },
    {
      title: "工具",
      items: [
        {
          name: "樱花内网穿透",
          url: "https://www.natfrp.com",
          description: "内网穿透工具，可用于Minecraft联机",
        },
        {
          name: "ascii2d",
          url: "https://ascii2d.net/",
          description: "图片搜索工具",
        },
        {
          name: "csqaq",
          url: "https://csqaq.com/home",
          description: "CS2饰品大盘",
        },
        {
          name: "Github Proxy",
          url: "https://github.akams.cn/",
          description: "Github下载代理加速",
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
          name: "百度解析",
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
          name: "TouchGal",
          url: "https://www.touchgal.top/",
          description: "一站式Galgame文化社区",
        },
        {
          name: "NekoNyan",
          url: "https://patches.nekonyansoft.com/",
          description: "Galgame补丁",
        },
        {
          name: "FOACG",
          url: "https://ugal.org/",
          description: "黄油",
        },
        {
          name: "萌幻之乡",
          url: "https://www.mhh1.com/",
          description: "黄油",
        },
        {
          name: "风灵月影",
          url: "https://flingtrainer.com/trainer/",
          description: "游戏修改器",
        },
        {
          name: "byrutgame",
          url: "https://byrutgame.org/",
          description: "毛子的破解游戏",
        },
        {
          name: "PCL",
          url: "https://pcl.ruanmao.net/",
          description: "Minecraft启动器",
        },
        {
          name: "PCL-CE",
          url: "https://pclce-web.demo.fis.ink/",
          description: "PCL启动器社区版",
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
          name: "萤火虫资源站",
          url: "https://www.yhcres.top/",
          description: "专注于安卓玩机和分享资源",
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
        {
          name: "超能网",
          url: "https://www.expreview.com/",
          description: "PC硬件社区",
        },
        
      ]
    }
  ] as Category[]
};
