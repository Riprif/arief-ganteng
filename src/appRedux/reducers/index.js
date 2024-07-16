import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Settings from "./Settings";
import Notes from "./Notes";
import Contact from "./Contact";
import Common from "./Common";
import studentReducer from "./studentReducers";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    notes: Notes,
    contact: Contact,
    common: Common,
    student: studentReducer, // Add this line
    template: require("./TemplateRedux").reducer,
    auth: require("./AuthRedux").reducer,
    comments: require("./CommentsRedux").reducer,
    modalinfo: require("./ModalInfoRedux").reducer,
    loadingoverlay: require("./LoadingOverlayRedux").reducer,
  });

export default createRootReducer;
