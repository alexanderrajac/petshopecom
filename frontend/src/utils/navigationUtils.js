export const redirectProductSearch = ({
  keyword,
  category,
  sort,
  pageNumber = 1,
}) => {
  const params = new URLSearchParams();
  if (keyword && keyword.trim()) params.set("keyword", keyword.trim());
  if (category && category.trim()) params.set("category", category.trim());
  if (sort && sort.trim()) params.set("sort", sort.trim());
  if (Number(pageNumber) > 1) params.set("page", pageNumber);

  const queryStr = params.toString() ? `?${params.toString()}` : "";
  window.location.href = `/products${queryStr}`;
};
