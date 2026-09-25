import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FiSearch, FiX } from "react-icons/fi";
import { useParams, useSearchParams } from "react-router-dom";
import { redirectProductSearch } from "../../utils/navigationUtils.js";

const SearchInput = () => {
  const { keyword: paramKeyword, category: paramCat, sort: paramSort } = useParams();
  const [searchParams] = useSearchParams();

  const activeKeyword =
    searchParams.get("keyword") ||
    (paramKeyword && paramKeyword !== "category" ? paramKeyword : "");
  const category =
    searchParams.get("category") ||
    (paramCat && paramCat !== "category" ? paramCat : "");
  const sort = searchParams.get("sort") || paramSort;

  const [keyword, setKeyword] = useState(activeKeyword);

  useEffect(() => {
    setKeyword(activeKeyword);
  }, [activeKeyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    redirectProductSearch({ keyword: keyword.trim(), category, sort });
  };

  const clearSearchHandler = () => {
    setKeyword("");
    redirectProductSearch({ keyword: "", category, sort });
  };

  return (
    <Form onSubmit={submitHandler} className="search-form-wrap">
      <InputGroup className="startup-search-input-group shadow-sm">
        <InputGroup.Text className="bg-white border-end-0 ps-3">
          <FiSearch className="text-muted" />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search pet food, puppies, toys, treats, grooming..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border-start-0 border-end-0 py-2"
        />
        {keyword && (
          <Button
            variant="light"
            onClick={clearSearchHandler}
            className="border-top border-bottom border-0 bg-white text-muted px-2"
            type="button"
          >
            <FiX />
          </Button>
        )}
        <Button type="submit" variant="primary" className="px-4 fw-semibold">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchInput;
