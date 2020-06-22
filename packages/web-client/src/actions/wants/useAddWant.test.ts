import { stub, assert } from "sinon";
import {
    mountWrappedElement,
    mockFetch,
    mockFetchNetworkError,
    mockFetchJsonDecodeError,
} from "../testHookHelper";
import useAdWant from "./useAddWant";

describe("useAddWant", () => {

    let addHandler;
    let errorHandler;
    let messageProps;

    beforeEach(() => {
        addHandler = stub();
        errorHandler = stub();

        mountWrappedElement(() => {
            messageProps = useAdWant(addHandler, errorHandler);
        });
    });

    describe("#initiateAdd", () => {
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
                await messageProps.initiateAdd("some_thing", "some_category", 100);
                assert.calledWith(addHandler, {
                    id: "response_id",
                    thing: "some_thing",
                    category: "some_category",
                    cost: 100,
                });
            });

            it("does NOT call errorHandler", async () => {
                await messageProps.initiateAdd("some_thing", "some_category", 100);
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
                await messageProps.initiateAdd("some_thing", "some_category", 100);
                assert.notCalled(addHandler);
            });

            it("calls errorHandler", async () => {
                await messageProps.initiateAdd("some_thing", "some_category", 100);
                assert.calledWith(errorHandler, "Unable to add want");
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
                await messageProps.initiateAdd("some_thing", "some_category", 100);
                assert.notCalled(addHandler);
            });

            it("calls errorHandler", async () => {
                await messageProps.initiateAdd("some_thing", "some_category", 100);
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
                await messageProps.initiateAdd("some_thing", "some_category", 100);
                assert.notCalled(addHandler);
            });

            it("calls errorHandler", async () => {
                await messageProps.initiateAdd("some_thing", "some_category", 100);
                assert.calledWith(errorHandler, "Unable to parse add want server repsonse");
            });
        });
    });
});
