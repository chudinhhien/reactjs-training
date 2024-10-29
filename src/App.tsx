import Header from "./layouts/header";
import ProductList from "./components/productList"
import { useTranslation } from "react-i18next";

function App() {
  const {t} = useTranslation();
  return (
    <>
      <Header title={t('title')}></Header>
      <ProductList />
    </>
    
  );
}

export default App;
