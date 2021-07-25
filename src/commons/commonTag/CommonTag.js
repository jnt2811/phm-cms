import { Tag } from "antd";
import "./commonTag.scss";

export const GreenTag = ({ children, ...props }) => (
  <Tag className="tag green-tag" {...props}>
    {children}
  </Tag>
);

export const RedTag = ({ children, ...props }) => (
  <Tag className="tag red-tag" {...props}>
    {children}
  </Tag>
);
