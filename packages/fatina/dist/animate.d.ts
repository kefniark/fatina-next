import { AnimationSettings, FlattenObjectKeys } from "./types";
export declare function useAnimate<T extends Record<string, unknown>>(ojb: T): {
    on(handler: CallableFunction): any;
    delay(duration: number): any;
    to(props: Partial<Record<FlattenObjectKeys<T>, number>>, duration?: number, options?: Partial<AnimationSettings>): any;
};
//# sourceMappingURL=animate.d.ts.map