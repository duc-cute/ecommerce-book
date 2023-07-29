/** @format */

import { useEffect, useState } from "react";
import ViewDetail from "./ViewDetail";
import { useLocation } from "react-router-dom";
import { getBookDetail } from "../../services/apiService";

const BookPage = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id");
  const URL_BACKEND = `${import.meta.env.VITE_BACKEND_URL}`;

  const [dataBook, setDataBook] = useState({});

  useEffect(() => {
    const fetchDataDetailBook = async () => {
      const res = await getBookDetail(id);
      let raw = res.data;
      raw.items = getImageBook(raw);
      setDataBook(raw);
    };
    fetchDataDetailBook();
  }, [id]);

  const getImageBook = (raw) => {
    let items = [];
    items = [raw?.thumbnail, ...raw?.slider];
    items = items.map((item) => {
      return {
        original: `${URL_BACKEND}/images/book/${item}`,
        thumbnail: `${URL_BACKEND}/images/book/${item}`,
        originalClass: "original-image",
        thumbnailClass: "thumbnail-image",
        originalHeight: 400,
      };
    });
    return items;
  };

  return <ViewDetail dataBook={dataBook} />;
};

export default BookPage;
