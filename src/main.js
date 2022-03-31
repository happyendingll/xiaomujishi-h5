import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "./style/base.scss";
import {
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  CellGroup,
  Button,
  Image,
  Field,
  Form,
  Icon,
  Search,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Card,
  Tabbar,
  TabbarItem,
  Collapse,
  NavBar,
  AddressList,
  AddressEdit,
  Sidebar,
  Stepper,
  Popup,
  Checkbox,
  Overlay,
  Dialog,
  Cell,
  ImagePreview,
  Divider,
  Empty,
  SidebarItem,
} from "vant";

createApp(App)
  .use(store)
  .use(ActionBar)
  .use(ActionBarIcon)
  .use(ActionBarButton)
  .use(SidebarItem)
  .use(CellGroup)
  .use(Button)
  .use(Image)
  .use(Field)
  .use(Form)
  .use(Popup)
  .use(Divider)
  .use(ImagePreview)
  .use(Empty)
  .use(Overlay)
  .use(Checkbox)
  .use(Cell)
  .use(Sidebar)
  .use(AddressEdit)
  .use(Stepper)
  .use(AddressList)
  .use(NavBar)
  .use(Collapse)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Dialog)
  .use(Card)
  .use(Swipe)
  .use(SwipeItem)
  .use(Icon)
  .use(Grid)
  .use(GridItem)
  .use(Search)
  .use(router)
  .mount("#app");
