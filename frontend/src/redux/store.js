import {
    configureStore,
} from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import employeeReducer from "./slices/employeeSlice";
import assetReducer from "./slices/assetSlice";
import requestReducer from "./slices/requestSlice";
import historyReducer from "./slices/historySlice";
import returnRequestReducer from "./slices/returnRequestSlice";
import maintenanceReducer from "./slices/maintenanceSlice";
import dashboardReducer from "./slices/dashboardSlice";

export const store =
    configureStore({
        reducer: {
            auth: authReducer,
            employees: employeeReducer,
            assets: assetReducer,
            requests:requestReducer,
            history:historyReducer,
            returnRequests:returnRequestReducer,
            dashboard:dashboardReducer,
            maintenance: maintenanceReducer,
        },
    });

