// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import UserLogin from './pages/UserLogin';
import UserLoading from './pages/UserLoading';
import Dashboard from './pages/Dashboard';
import ProjectList from "./pages/ProjectList";

const routerConfig = [
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/loading',
    component: UserLoading,
  },
  {
    path: '/index',
    component: Dashboard,
    auth: true
  },
  {
    path: '/project_list',
    component: ProjectList,
    auth: true
  },
];

export default routerConfig;
