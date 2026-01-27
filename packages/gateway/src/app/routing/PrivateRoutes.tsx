import { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "@4eplatform/shared/src/components/loader";
import { PageNotFound } from "@4eplatform/shared/src/components/404";
import { LoadRoutes } from "../services/dynamicRoutes/LoadRoutes";
import { MasterLayout } from "../layout/MasterLayout";
import { useIntl } from "react-intl";

const DynamicComponentsWrapper = lazy(
  () => import("./DynamicComponentsWrapper")
);

const PrivateRoutes = () => {
  const [components, setComponents] = useState<any>();

  const fetchComponents = async () => {
    try {
      const loadedComponents = await LoadRoutes();
      setComponents(loadedComponents);
    } catch (error) {
      console.error("Error loading components:", error);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);
  let intl = useIntl();
  let languageData = intl.locale;
  useEffect(() => {
    document.documentElement.lang = languageData;
    document.documentElement.dir = languageData === "ar" ? "rtl" : "ltr";
  }, [languageData]);

  return (
    <Suspense
    //  fallback={<Loader />}
    >
      <Routes>
        <Route element={<MasterLayout />}>
          {/* <Route path="/home-workspace" element={<HomeWorkspace />} />
          <Route index path="/" element={<HomeWorkspace />} /> */}
          <Route path="/loading" element={<Loader />} />
          <Route path="/404" element={<PageNotFound />} />

          <Route
            path="/*"
            element={<DynamicComponentsWrapper components={components} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export { PrivateRoutes };
