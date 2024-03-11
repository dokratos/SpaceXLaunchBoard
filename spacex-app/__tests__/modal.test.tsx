import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_LAUNCH } from '@/components/modal';
import LaunchModal from '@/components/modal';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn()
}));

const mockGet = jest.fn();
mockGet.mockReturnValue('5000');

(useSearchParams as jest.Mock).mockReturnValue({
  get: mockGet,
});

const mocks = [{
  request: {
    query: GET_LAUNCH,
    variables: {
      "launchId": "1"
    }
  },
  result: {
    data: {

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
});