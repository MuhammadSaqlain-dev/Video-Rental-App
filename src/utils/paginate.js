import _ from "lodash";

export function paginate(totalItems, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  return _(totalItems).slice(startIndex).take(pageSize).value();
}
