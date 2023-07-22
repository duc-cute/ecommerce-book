/** @format */
import { Layout } from "antd";

const Footer = () => {
  const { Footer } = Layout;
  return (
    <>
      <Footer
        style={{
          textAlign: "center",
          bottom: "0",
          left: "0",
          right: "0",
          background: "#f5f5fa",

          position: "absolute",
        }}
      >
        Ant Design ©2023 Created by Duc-cute
      </Footer>
    </>
  );
};

export default Footer;
