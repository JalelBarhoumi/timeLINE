import AcademyAppConfig from './academy/AcademyAppConfig';
import singlepostappconfig from './blog/src/components/singlePost/Singlepostappconfig';
import Homeappconfig from './blog/src/pages/home/Homeappconfig';
import WriteBlogConfig from './blog/src/pages/write/Writeappconfig';
import AskQuestionBlogConfig from './blog/src/pages/writequestion/Writeappconfig';
import CalendarAppConfig from './calendar/CalendarAppConfig';
import ChatAppConfig from './chat/ChatAppConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import AnalyticsDashboardAppConfig from './dashboards/analytics/AnalyticsDashboardAppConfig';
import ProjectDashboardAppConfig from './dashboards/project/ProjectDashboardAppConfig';
import ProjectsAppConfig from './dashboards/projects/ProjectsAppConfig';
import PhasesAppConfig from './dashboards/projects/PhasesAppConfig';
import ECommerceAppConfig from './e-commerce/ECommerceAppConfig';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import MailAppConfig from './mail/MailAppConfig';
import NotesAppConfig from './notes/NotesAppConfig';
import ScrumboardAppConfig from './scrumboard/ScrumboardAppConfig';
import TaskAppConfig from './task/TaskAppConfig';
import TeamChatConfig from './team/Components/TeamChatConfig';
import TeamConfig from './team/Components/TeamConfig';

import BotAppConfig from './timebot/BotAppConfig';
import TodoAppConfig from './todo/TodoAppConfig';
import reportsAppConfig from './dashboards/projects/components/reports/reportsAppConfig';

const appsConfigs = [
  AnalyticsDashboardAppConfig,
  ProjectDashboardAppConfig,
  MailAppConfig,
  TodoAppConfig,
  FileManagerAppConfig,
  ContactsAppConfig,
  CalendarAppConfig,
  ChatAppConfig,
  ECommerceAppConfig,
  ScrumboardAppConfig,
  AcademyAppConfig,
  NotesAppConfig,
  TaskAppConfig,
  BotAppConfig,
  ProjectsAppConfig,
  WriteBlogConfig,
  AskQuestionBlogConfig,
  Homeappconfig,
  singlepostappconfig,
 
  TeamConfig,
 TeamChatConfig,
  PhasesAppConfig,
  reportsAppConfig,

 
];

export default appsConfigs;
