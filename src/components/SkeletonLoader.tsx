import { Skeleton } from "antd";

const SkeletonLoader = () => {
  return (
    <div>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} active avatar />
      ))}
    </div>
  );
};

export default SkeletonLoader;
