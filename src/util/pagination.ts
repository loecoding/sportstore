export const getSkip = (pages: number, sizes: number) =>  (pages - 1) * sizes;
export const getTotalPage = (totalPages: number, pageSizes: number) =>  Math.ceil(totalPages / pageSizes)

