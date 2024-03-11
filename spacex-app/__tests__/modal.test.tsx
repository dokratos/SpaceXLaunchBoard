import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_LAUNCH } from '@/components/modal';
import LaunchModal from '@/components/modal';
import { usePathname, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn()
}));

const mockGet = jest.fn();
mockGet.mockReturnValue('5000');

(useSearchParams as jest.Mock).mockReturnValue({
  get: mockGet,
});

(usePathname as jest.Mock).mockReturnValue({
  string: "path"
})

const mocks = [{
  delay: 30,
  request: {
    query: GET_LAUNCH,
    variables: {
      "launchId": "5000"
    }
  },
  result: {
    data: {
      launch : {
        details: "details",
        launch_date_local: "today",
        mission_name: "testing",
        rocket: {
          rocket_name: "test",
          rocket: {
            success_rate_pct: "?"
          }
        }
      }
    }
  }
}];

it("renders without error", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LaunchModal />
    </MockedProvider>
  );
  
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("details")).toBeInTheDocument();
});

it("should show error UI", async () => {
  const errorMock = {
    request: {
      query: GET_LAUNCH,
      variables: {
        "launchId": "5000"
      }
    },
    error: new Error("An error occurred")
  };
  render(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <LaunchModal  />
    </MockedProvider>
  );
  expect(await screen.findByText("An error occurred")).toBeInTheDocument();
});