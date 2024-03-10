import { Advice, AdviceState, AdviceAction, AdviceHook } from "../types/types";
import { useCallback, useEffect, useReducer } from "react";

const initialState: AdviceState = {
    isLoading: false,
    isError: false,
    error: "",
    advice: undefined,
};

function reducer(state: AdviceState, action: AdviceAction): AdviceState {
    switch (action.type) {
        case "startLoading":
            return { ...state, isLoading: true };
        case "finishLoading":
            return { ...state, isLoading: false };
        case "setError":
            return { ...state, isLoading: false, isError: true, error: action.payload };
        case "setAdvice":
            return { ...state, isError: false, error: "", advice: action.payload };
        default:
            return state;
    }
}

export function useFetchAdvice(): AdviceHook {
    const [{ isLoading, isError, error, advice }, dispatch] = useReducer(reducer, initialState);

    const startLoading = () => dispatch({ type: "startLoading" });
    const finishLoading = () => dispatch({ type: "finishLoading" });
    const setError = (err: Error | string) => dispatch({ type: "setError", payload: err });
    const setAdvice = (advice: Advice) => dispatch({ type: "setAdvice", payload: advice });

    const fetchAdvice = useCallback(async () => {
        try {
            startLoading();
            const res = await fetch("https://api.adviceslip.com/advice");
            if (!res.ok) throw new Error("Oops! Something went wrong. Please try again later");
            const data = await res.json();
            const advice: Advice = data.slip;
            if (!advice) throw new Error("Failed to fetch advice. Please try again later");
            setAdvice(advice);
        } catch (err) {
            if (typeof err === "string" || err instanceof Error) setError(err);
            else throw new Error("unrecognized error type");
        } finally {
            finishLoading();
        }
    }, []);

    useEffect(() => {
        fetchAdvice();
    }, [fetchAdvice]);

    return { isLoading, isError, error, advice, fetchAdvice };
}
