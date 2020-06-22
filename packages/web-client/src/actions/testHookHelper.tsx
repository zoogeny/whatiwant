import React from "react";
import { stub, SinonStub } from "sinon";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

type Hook = () => void;

type WrapperElementProps = {
    hook: Hook;
};

const WrapperElement = ({ hook }: WrapperElementProps) => {
    hook();
    return (<div />);
};

export const mountWrappedElement = async (hook: Hook): Promise<void> => {
    await act(async () => {
        mount(<WrapperElement hook={ hook } />);
    });
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const mockFetch = (status: number, body: any): SinonStub => {
/* eslint-enable */
    if (typeof body === "object") {
        body = JSON.stringify(body);
    }
    return stub(window, "fetch").callsFake(() => {
        const response = new Response(body, {
            status,
        });
        return Promise.resolve(response);
    });
};

export const mockFetchNetworkError = (): SinonStub => {
    return stub(window, "fetch").callsFake(() => {
        throw new Error("Network connection failure");
    });
};

export const mockFetchJsonDecodeError = (): SinonStub => {
    return stub(window, "fetch").callsFake(() => {
        const response = new Response("{]");
        return Promise.resolve(response);
    });
};
