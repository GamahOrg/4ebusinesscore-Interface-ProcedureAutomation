// import "./App.css";
import { Provider } from "react-redux";
import store from "./app/redux/store/store";
import { ExcludedUsers } from "@npm-react/react-redux-script";
import { AutomationRequestsPath } from "./app/pages/technical-support/automation-requests-path/automation-requests-path";
import AutomationAddRequestsPath from "./app/pages/technical-support/automation-requests-path/automation-add-requests-path";
import AutomationEditRequestsPath from "./app/pages/technical-support/automation-requests-path/automation-edit-requests-path";
import { AutomationRequestsPathDetails } from "./app/pages/technical-support/automation-requests-path/automation-requests-path-details";
import { Route, Routes } from "react-router";
import { DigitalServicesSettings } from "./app/pages/digital-media-settings/DigitalServicesSettings";
import { SystemsClassifications } from "./app/pages/system-classification/systemsClassifications";
import { AddSystemClassifications } from "./app/pages/system-classification/addSystemClassifications";
import { EditSystemsClassifications } from "./app/pages/system-classification/editSystemsClassifications";
import { ViewSystemsClassifications } from "./app/pages/system-classification/ViewSystemsClassifications";
import { AdminPanelViewallcardsEditCard } from "./app/pages/system-classification/editcard";
import { SystemsAndServicesEditSystem } from "./app/pages/system-classification/systemsAndServicesEditSystem";
import { SystemsAndServicesEditClassifications } from "./app/pages/system-classification/systemsAndServicesEditClassifications";
import { DynamicWorkSpace } from "@npm-react/react-redux-routing";
import { CreateNewService } from "@npm-react/react-redux-script";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<DynamicWorkSpace />} />
        <Route path="/create-new-service" element={<CreateNewService />} />
        <Route
          path="/create-new-service/excluded-users"
          element={<ExcludedUsers />}
        />
        <Route
          path="/create-new-service/:systemId"
          element={<CreateNewService />}
        />

        <Route
          path="/automation-requests-path"
          element={<AutomationRequestsPath />}
        />
        <Route
          path="/automation-requests-path/add-requests-path"
          element={<AutomationAddRequestsPath />}
        />
        <Route
          path="/automation-requests-path/edit-requests-path/:id"
          element={<AutomationEditRequestsPath />}
        />
        <Route
          path="/automation-requests-path/:id/details"
          element={<AutomationRequestsPathDetails />}
        />
        <Route
          path="/systems-services-settings/digital-services-settings"
          element={<DigitalServicesSettings />}
        />
        <Route
          path="/systems-services-settings/systems-classifications"
          element={<SystemsClassifications />}
        />
        <Route
          path="/systems-services-settings/systems-classifications/add-system"
          element={<AddSystemClassifications />}
        />
        <Route
          path="/systems-services-settings/systems-classifications/edit-system/:id"
          element={<EditSystemsClassifications />}
        />
        <Route
          path="/systems-services-settings/systems-classifications/view-system/:id"
          element={<ViewSystemsClassifications />}
        />
        <Route
          path="/systems-services-settings/systems-classifications/edit-card/:id"
          element={<AdminPanelViewallcardsEditCard />}
        />
        <Route
          path="/systems-services-settings/systems-classifications/edit-subsystem/:id"
          element={<SystemsAndServicesEditSystem />}
        />
        <Route
          path="/systems-services-settings/systems-classifications/edit-mainclassification/:id"
          element={<SystemsAndServicesEditClassifications />}
        />
      </Routes>
    </Provider>
  );
}

export default App;
