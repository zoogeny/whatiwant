import React from "react";
import { stub } from "sinon";
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

export const mountWrappedElement = async (hook: Hook) => {
    await act(async () => {
        mount(<WrapperElement hook={ hook } />);
    });
};

export const mockFetch = (status: number, body: any) => {
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

export const mockFetchNetworkError = () => {
    return stub(window, "fetch").callsFake(() => {
        throw new Error("Network connection failure");
    });
};

export const mockFetchJsonDecodeError = () => {
    return stub(window, "fetch").callsFake(() => {
        const response = new Response("{]");
        return Promise.resolve(response);
    });
};
