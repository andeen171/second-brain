import React from "react";
import { render } from "@testing-library/react";
import { Button } from "./button";
import { test } from "vitest";

test("Button component renders without crashing", () => {
  render(<Button />);
});
