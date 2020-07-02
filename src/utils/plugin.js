import Vue from 'vue'

import {
    Message,
    MessageBox,
    Scrollbar,
    Menu,
    MenuItem,
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Select,
    Tooltip,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    ColorPicker,
    Switch,
    Form,
    FormItem,
    Table,
    Input,
    Button,
    Tree,
    Dialog,
    TableColumn,
    RadioGroup,
    Radio,
    RadioButton,
    Tag,
    Tabs,
    TabPane
} from 'element-ui';

Vue.component(Scrollbar.name,Scrollbar)
Vue.component(Menu.name,Menu)
Vue.component(Breadcrumb.name,Breadcrumb)
Vue.component(BreadcrumbItem.name,BreadcrumbItem)
Vue.component(Select.name,Select)
Vue.component(Tooltip.name,Tooltip)
Vue.component(Dropdown.name,Dropdown)
Vue.component(DropdownMenu.name,DropdownMenu)
Vue.component(DropdownItem.name,DropdownItem)
Vue.component(ColorPicker.name,ColorPicker)
Vue.component(Switch.name,Switch)
Vue.component(MenuItem.name,MenuItem)
Vue.component(Submenu.name,Submenu)
Vue.component(Input.name,Input)
Vue.component(Table.name,Table)
Vue.component(FormItem.name,FormItem)
Vue.component(Form.name,Form)
Vue.component(Dialog.name,Dialog)
Vue.component(Tree.name,Tree)
Vue.component(Button.name,Button)
Vue.component(TableColumn.name,TableColumn)
Vue.component(Radio.name,Radio)
Vue.component(RadioGroup.name,RadioGroup)
Vue.component(RadioButton.name,RadioButton)
Vue.component(Tag.name,Tag)
Vue.component(Tabs.name,Tabs)
Vue.component(TabPane.name,TabPane)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;