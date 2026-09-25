import { DropdownButton, Dropdown } from "react-bootstrap";
import { CATEGORY_TYPES, CATEGORY_METADATA } from "../../constants";
import { useParams, useSearchParams } from "react-router-dom";
import { redirectProductSearch } from "../../utils/navigationUtils";

const CategoryButton = () => {
  const { keyword: paramKeyword, category: paramCat, sort: paramSort } = useParams();
  const [searchParams] = useSearchParams();

  const urlCategory =
    searchParams.get("category") ||
    (paramCat && paramCat !== "category" ? paramCat : "");
  const keyword =
    searchParams.get("keyword") ||
    (paramKeyword && paramKeyword !== "category" ? paramKeyword : "");
  const sort = searchParams.get("sort") || paramSort;

  const getCategoryBtnTitle = () => {
    if (urlCategory && CATEGORY_METADATA[urlCategory]) {
      return `${CATEGORY_METADATA[urlCategory].icon} ${CATEGORY_METADATA[urlCategory].label}`;
    }
    if (urlCategory) {
      return `Category: ${urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1)}`;
    }
    return "🐾 All Categories";
  };

  const redirectHandler = (category) => {
    redirectProductSearch({ keyword, category, sort });
  };

  return (
    <DropdownButton
      variant="outline-secondary"
      id="dropdown-category-filter"
      className="custom-filter-dropdown"
      title={getCategoryBtnTitle()}
    >
      <Dropdown.Item
        key="categoryAll"
        onClick={() => redirectHandler("")}
        active={!urlCategory}
      >
        ✨ All Categories
      </Dropdown.Item>
      {CATEGORY_TYPES.map((catKey) => {
        const meta = CATEGORY_METADATA[catKey];
        return (
          <Dropdown.Item
            key={catKey}
            onClick={() => redirectHandler(catKey)}
            active={urlCategory === catKey}
          >
            {meta?.icon || "🏷️"} {meta?.label || catKey}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
};

export default CategoryButton;
