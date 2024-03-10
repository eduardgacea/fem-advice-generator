export type Advice = {
    id: number;
    advice: string;
};

export type AdviceState = {
    isLoading: boolean;
    isError: boolean;
    error: Error | string;
    advice: Advice | undefined;
};

export type AdviceAction =
    | { type: "startLoading" }
    | { type: "finishLoading" }
    | { type: "setError"; payload: Error | string }
    | { type: "setAdvice"; payload: Advice };

export type AdviceHook = AdviceState & {
    fetchAdvice: () => Promise<void>;
};
