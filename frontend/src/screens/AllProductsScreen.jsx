import { useMemo } from "react";
import PageTitle from "../components/PageTitle.jsx";
import { Row, Col, Badge, Button } from "react-bootstrap";
import Product from "../components/product/Product.jsx";
import Paginate from "../components/product/Paginate.jsx";
import SearchInput from "../components/product/SearchInput.jsx";
import CategoryButton from "../components/product/CategoryButton.jsx";
import SortButton from "../components/product/SortButton.jsx";
import NoProductsFound from "../components/product/NoProductsFound.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import {
  PAGINATION_LIMIT,
  CATEGORY_TYPES,
  CATEGORY_METADATA,
} from "../constants.js";
import { redirectProductSearch } from "../utils/navigationUtils.js";
import Loader from "../components/Loader.jsx";

const AllProductsScreen = () => {
  const {
    pageNumber: paramPage,
    keyword: paramKeyword,
    category: paramCat,
    sort: paramSort,
  } = useParams();
  const [searchParams] = useSearchParams();

  const keyword =
    searchParams.get("keyword") ||
    (paramKeyword && paramKeyword !== "category" ? paramKeyword : "");
  const category =
    searchParams.get("category") ||
    (paramCat && paramCat !== "category" ? paramCat : "");
  const sort = searchParams.get("sort") || paramSort || "createdAt:desc";
  const pageNumber = searchParams.get("page") || paramPage || 1;

  const { data, isLoading, error } = useGetProductsQuery({
    keyword: keyword || undefined,
    pageNumber,
    isPublished: true,
    pageSize: PAGINATION_LIMIT,
    category: category || undefined,
    sort,
  });

  const categoryMeta = useMemo(() => {
    return category ? CATEGORY_METADATA[category] : null;
  }, [category]);

  const handleCategoryClick = (catKey) => {
    redirectProductSearch({
      keyword,
      category: catKey === category ? "" : catKey,
      sort,
    });
  };

  const clearFilter = () => {
    redirectProductSearch({ keyword: "", category: "", sort: "createdAt:desc" });
  };

  return (
    <div className="pb-5 products-list startup-catalog-screen">
      {/* Category Hero / Header */}
      {categoryMeta ? (
        <div className="category-hero-banner mb-4 p-4 rounded-4 shadow-sm text-white">
          <div className="d-flex align-items-center gap-3">
            <span className="fs-1">{categoryMeta.icon}</span>
            <div>
              <span className="text-uppercase tracking-wider small fw-bold opacity-75">
                Browse Category
              </span>
              <h2 className="fw-bold mb-1">{categoryMeta.label}</h2>
              <p className="mb-0 opacity-90 small">{categoryMeta.desc}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="catalog-header mb-4">
          <PageTitle title="Browse Our Pet Catalog" />
          <p className="text-muted small">
            Explore vet-approved pet food, live adoptable pets, toys, natural treats, and premium accessories.
          </p>
        </div>
      )}

      {/* Category Pills Bar */}
      <div className="category-chips-scroll mb-4 d-flex gap-2 flex-wrap align-items-center">
        <Button
          variant={!category ? "primary" : "outline-secondary"}
          size="sm"
          className="rounded-pill px-3 py-2 fw-semibold category-pill"
          onClick={() => handleCategoryClick("")}
        >
          ✨ All Products
        </Button>
        {CATEGORY_TYPES.map((catKey) => {
          const meta = CATEGORY_METADATA[catKey];
          const isActive = category === catKey;
          return (
            <Button
              key={catKey}
              variant={isActive ? "primary" : "outline-secondary"}
              size="sm"
              className="rounded-pill px-3 py-2 fw-semibold category-pill"
              onClick={() => handleCategoryClick(catKey)}
            >
              <span>{meta?.icon || "🏷️"}</span> {meta?.label || catKey}
            </Button>
          );
        })}
      </div>

      {/* Search & Sort Controls */}
      <div className="filter-controls-row mb-4 p-3 bg-white rounded-3 shadow-sm border">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={6}>
            <SearchInput />
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-md-end gap-2">
            <CategoryButton />
            <SortButton />
          </Col>
        </Row>

        {/* Active Filter Chips */}
        {(keyword || category) && (
          <div className="active-filters mt-3 pt-3 border-top d-flex align-items-center gap-2 flex-wrap">
            <span className="text-muted small fw-bold">Active filters:</span>
            {category && (
              <Badge
                bg="light"
                text="dark"
                className="border px-3 py-2 rounded-pill fw-medium d-flex align-items-center gap-2"
              >
                <span>Category: {CATEGORY_METADATA[category]?.label || category}</span>
                <span
                  role="button"
                  className="text-danger fw-bold ms-1"
                  onClick={() => handleCategoryClick(category)}
                >
                  &times;
                </span>
              </Badge>
            )}
            {keyword && (
              <Badge
                bg="light"
                text="dark"
                className="border px-3 py-2 rounded-pill fw-medium d-flex align-items-center gap-2"
              >
                <span>Keyword: "{keyword}"</span>
                <span
                  role="button"
                  className="text-danger fw-bold ms-1"
                  onClick={() =>
                    redirectProductSearch({ keyword: "", category, sort })
                  }
                >
                  &times;
                </span>
              </Badge>
            )}
            <Button
              variant="link"
              size="sm"
              className="text-decoration-none text-danger p-0 ms-2 small fw-semibold"
              onClick={clearFilter}
            >
              Reset all
            </Button>
          </div>
        )}
      </div>

      {/* Loading / Error States */}
      {isLoading && <Loader />}
      {error && (
        <div className="alert alert-danger py-3">
          Error loading products: {error?.data?.message || error.error}
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !error && (
        <>
          {data?.products.length === 0 ? (
            <NoProductsFound />
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted small">
                  Showing <strong>{data?.products?.length || 0}</strong> products
                  {category && ` in ${CATEGORY_METADATA[category]?.label || category}`}
                </span>
              </div>
              <Row className="g-3 g-md-4">
                {data?.products.map((product) => (
                  <Col key={product._id} xs={6} sm={6} md={4} lg={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <div className="mt-5 d-flex justify-content-center">
                <Paginate
                  page={data.page}
                  pages={data.pages}
                  keyword={keyword}
                  category={category}
                  sort={sort}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AllProductsScreen;
