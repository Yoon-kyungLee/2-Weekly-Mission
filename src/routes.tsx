import React from "react";
import { Route, Navigate } from "react-router-dom";
import SharedPage from "./pages/shared";
import FolderPage from "./pages/folder";

export const routes = [
  <Route path="/" element={<Navigate replace to="/folder" />} />,
  <Route path="/shared" element={<SharedPage />} />,
  <Route path="/folder" element={<FolderPage />} />,
];