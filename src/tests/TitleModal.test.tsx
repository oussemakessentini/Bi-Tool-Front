import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";
import TitleModal from "../components/TitleModal";
import { createDashboardItem, updateDashboardItem, getDashboardItemById } from '../Api/Api';
import { ChartType } from '@cubejs-client/core';

jest.mock("../Api/Api", () => ({
  createDashboardItem: jest.fn(),
  updateDashboardItem: jest.fn(),
  getDashboardItemById: jest.fn(),
}));

describe("TitleModal", () => {
    
  test("renders with input value and saves new item, then navigates to dashboard", async () => {
    const setTitleModalVisible = jest.fn();
    const setTitle = jest.fn();
    const finalTitle = "New Item";
    const finalVizState = { };
  
    const history = createMemoryHistory();

    render(
      <MemoryRouter>
        <TitleModal
          titleModalVisible={true}
          setTitleModalVisible={setTitleModalVisible}
          setTitle={setTitle}
          finalTitle={finalTitle}
          finalVizState={finalVizState}
          itemId={undefined} dashboardId={""}        />
      </MemoryRouter>
    );
    
    const okButton = screen.getByRole("button", { name: "OK" });
    
    await waitFor(() => {
        fireEvent.click(okButton);

    expect(createDashboardItem).toHaveBeenCalledTimes(1);
    
    expect(createDashboardItem).toHaveBeenCalledWith(expect.objectContaining({
      name: finalTitle,
      vizstate: JSON.stringify(finalVizState),
    }));
    expect(setTitleModalVisible).toHaveBeenCalledWith(false);
    expect(history.location.pathname).toBe("/");
    })
    
  });

  test("renders with item ID and updates existing item, then navigates to dashboard", async () => {
    const setTitleModalVisible = jest.fn();
    const setTitle = jest.fn();
    const finalTitle = "Existing Item";
    const finalVizState = {  };
    const itemId = "42";
    const history = createMemoryHistory();

    render(
      <MemoryRouter>
        <TitleModal
          titleModalVisible={true}
          setTitleModalVisible={setTitleModalVisible}
          setTitle={setTitle}
          finalTitle={finalTitle}
          finalVizState={finalVizState}
          itemId={itemId} dashboardId={""}        />
      </MemoryRouter>
    );
    const okButton = screen.getByRole("button", { name: "OK" });
    expect(getDashboardItemById).toHaveBeenCalledTimes(1);
    fireEvent.click(okButton);
    expect(updateDashboardItem).toHaveBeenCalledTimes(1);
    expect(setTitleModalVisible).toHaveBeenCalledWith(false);
    expect(history.location.pathname).toBe("/");
  });
});
