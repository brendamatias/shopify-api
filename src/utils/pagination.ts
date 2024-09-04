type MetaPaginationProps = {
  page: number;
  limit: number;
  total: number;
  data: any;
};

export const getMetaPagination = ({
  total,
  limit,
  page,
  data,
}: MetaPaginationProps) => {
  const totalPages = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: totalPages === Infinity ? 1 : totalPages,
    },
    data,
  };
};

type SkipProps = {
  page: number;
  limit: number;
};

export const skip = ({ page, limit }: SkipProps) => (page - 1) * limit || 0;
