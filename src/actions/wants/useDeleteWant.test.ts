import { stub, assert } from "sinon";
import {
    mountWrappedElement,
    mockFetch,
    mockFetchNetworkError,
    mockFetchJsonDecodeError,
} from "../testHookHelper";
import useDeleteWant from "./useDeleteWant";

describe("useDeleteWant", () => {

    let deleteHandler;
    let errorHandler;
    let messageProps;

    beforeEach(() => {
        deleteHandler = stub();
        errorHandler = stub();

        mountWrappedElement(() => {
            messageProps = useDeleteWant(deleteHandler, errorHandler);
        });
    });

    describe("#initiateDelete", () => {
        describe("when the server returns a success", () => {
            let fetchStub;

            beforeEach(() => {
                fetchStub = mockFetch(200, {
                    id: "response_id",
                });
            });

            afterEach(() => {
                fetchStub.restore();
            });

            it("calls addHandler", async () => {
                await messageProps.initiateDelete("some_thing", "some_category", 100);
                assert.calledWith(deleteHandler, {
                    id: "response_id",
                });
            });

            it("does NOT call errorHandler", async () => {
                await messageProps.initiateDelete("some_thing", "some_category", 100);
                assert.notCalled(errorHandler);
            });
        });

        describe("when the server returns a failure", () => {
            let fetchStub;

            beforeEach(() => {
                fetchStub = mockFetch(400, {
                    error: "whatever",
                });
            });

            afterEach(() => {
                fetchStub.restore();
            });

            it("does NOT call addHandler", async () => {
                await messageProps.initiateDelete("some_thing", "some_category", 100);
                assert.notCalled(deleteHandler);
            });

            it("calls errorHandler", async () => {
                await messageProps.initiateDelete("some_thing", "some_category", 100);
                assert.calledWith(errorHandler, "Unable to delete want");
            });
        });

        describe("when fetch has a network error", () => {
            let fetchStub;

            beforeEach(() => {
                fetchStub = mockFetchNetworkError();
            });

            afterEach(() => {
                fetchStub.restore();
            });

            it("does NOT call addHandler", async () => {
                await messageProps.initiateDelete("some_thing", "some_category", 100);
                assert.notCalled(deleteHandler);
            });

            it("calls errorHandler", async () => {
                await messageProps.initiateDelete("some_thing", "some_category", 100);
                assert.calledWith(errorHandler, "Unable to connect to server");
            });
        });

        describe("when return type is bad json", () => {
            let fetchStub;

            beforeEach(() => {
                fetchStub = mockFetchJsonDecodeError();
            });

            afterEach(() => {
                fetchStub.restore();
            });

            it("does NOT call addHandler", async () => {
                await messageProps.initiateDelete("some_thing", "some_category", 100);
                assert.notCalled(deleteHandler);
            });

            it("calls errorHandler", async () => {
                await messageProps.initiateDelete("some_thing", "some_category", 100);
                assert.calledWith(errorHandler, "Unable to parse delete repsonse");
            });
        });
    });
});
