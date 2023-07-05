import { string } from "prop-types";

export interface Page {
  page: {
    title: string;
    content: string;
  }[];
}