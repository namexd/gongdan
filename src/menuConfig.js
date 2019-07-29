// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '首页',
    path: '/index',
    icon: 'home',
  },
   {
    name: '工单列表',
    path: '/project_list',
    icon: 'copy',
    children: [],
  },
  // {
  //   name: '分类管理',
  //   path: '/cate',
  //   icon: 'cascades',
  //   children: [],
  // },
  // {
  //   name: '标签管理',
  //   path: '/tag',
  //   icon: 'pin',
  //   children: [],
  // },
  // {
  //   name: '用户管理',
  //   path: '/users',
  //   icon: 'yonghu',
  //   children: [],
  // },
  // {
  //   name: '通用设置',
  //   path: '/setting',
  //   icon: 'shezhi',
  //   children: [],
  // },
];

export {headerMenuConfig, asideMenuConfig};
