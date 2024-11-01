import Header from "./layouts/header";
import ProductList from "./components/productList";
import { useTranslation } from "react-i18next";
import Filters from "./components/filters";
import { Route, Routes } from "react-router-dom";
import Sort from "./components/sort";
import Pagination from "./components/pagination";
import { DataProvider } from "./context/DataContext";

function App() {
  const { t } = useTranslation();
  return (
    <>
      <Header title={t("title")} />
      <div className="max-w-[1300px] mx-auto p-8 flex">
        <DataProvider>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex w-full">
                  <div className="basis-1/4">
                    <Filters />
                  </div>
                  <div className="basis-3/4">
                    <Sort />
                    <ProductList />
                    <Pagination />
                  </div>
                </div>
              }
            />
          </Routes>
        </DataProvider>
      </div>
    </>
  );
}

export default App;
