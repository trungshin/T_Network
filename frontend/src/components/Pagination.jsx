import React from "react";

import { Pagination } from "@mui/material";

const PaginationCustomize = ({ page, setPage, postsLength }) => {
	const handleChangePagination = (event, value) => {
		setPage(value);

		const addOrUpdateURLParams = (key, value) => {
			const searchParams = new URLSearchParams(window.location.search);
			searchParams.set(key, value);
			const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
			// eslint-disable-next-line no-restricted-globals
			history.pushState(null, "", newRelativePathQuery);
		};

		addOrUpdateURLParams("page", value);
	};

	return (
		<Pagination
			count={Number.isInteger(postsLength / 10) ? postsLength / 10 : Math.floor(postsLength / 10) + 1}
			page={page}
			color="primary"
			size="large"
			onChange={handleChangePagination}
		/>
	);
};

export default PaginationCustomize;
