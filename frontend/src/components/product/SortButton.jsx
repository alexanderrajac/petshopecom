import { DropdownButton, Dropdown } from "react-bootstrap";
import { SORT_TYPES } from "../../constants";
import { useParams, useSearchParams } from "react-router-dom";
import { redirectProductSearch } from "../../utils/navigationUtils";

const SortButton = () => {
  const { keyword: paramKeyword, category: paramCat, sort: paramSort } = useParams();
  const [searchParams] = useSearchParams();

  const keyword =
    searchParams.get("keyword") ||
    (paramKeyword && paramKeyword !== "category" ? paramKeyword : "");
  const category =
    searchParams.get("category") ||
    (paramCat && paramCat !== "category" ? paramCat : "");
  const urlSort = searchParams.get("sort") || paramSort;

  const getSortBtnTitle = () => {
    if (urlSort) {
      const currentSort = SORT_TYPES.find((sort) => sort.value === urlSort);
      const currentSortLabel = currentSort?.label;
      return `Sort: ${currentSortLabel || urlSort}`;
    }
    return "Sort: Featured";
  };

  const redirectHandler = (sort) => {
    redirectProductSearch({ keyword, category, sort });
  };

  return (
    <DropdownButton
      variant="outline-secondary"
      id="dropdown-sort-filter"
      className="custom-filter-dropdown"
      title={getSortBtnTitle()}
    >
      {SORT_TYPES.map((sort) => (
        <Dropdown.Item
          key={sort.value}
          onClick={() => redirectHandler(sort.value)}
          active={urlSort === sort.value || (!urlSort && sort.value === "createdAt:desc")}
        >
          {sort.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default SortButton;
