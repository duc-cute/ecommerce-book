/** @format */

import { Row, Col, Skeleton } from "antd";

const ViewLoading = () => {
  return (
    <Row gutter={30} className="bookpage-loading">
      <Col
        md={10}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Skeleton.Input style={{ width: "100%", height: 350 }} block active />
        <div style={{ display: "flex", gap: "20px" }}>
          <Skeleton.Image active />
          <Skeleton.Image active />
          <Skeleton.Image active />
        </div>
      </Col>
      <Col md={14}>
        <Skeleton
          active
          paragraph={{
            rows: 3,
          }}
        />
        <br />
        <br />
        <Skeleton
          active
          paragraph={{
            rows: 2,
          }}
        />
        <br />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            // overflow: "hidden",
            marginTop: "20px",
          }}
        >
          <Skeleton.Button active size="large" style={{ width: 100 }} />
          <Skeleton.Button active size="large" style={{ width: 100 }} />
        </div>
      </Col>
    </Row>
  );
};

export default ViewLoading;
