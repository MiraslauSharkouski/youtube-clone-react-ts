import { Skeleton, Row, Col } from "antd";

const SkeletonLoader = () => {
  return (
    <div style={{ padding: 20 }}>
      {[1, 2, 3, 4].map((i) => (
        <Row key={i} gutter={16} style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Skeleton.Image active style={{ width: "100%", height: 120 }} />
          </Col>
          <Col span={18}>
            <Skeleton active paragraph={{ rows: 3 }} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default SkeletonLoader;
