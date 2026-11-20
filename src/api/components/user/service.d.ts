export declare const registerService: (emailInput: unknown, passwordInput: unknown) => Promise<{
    id: string;
    email: string;
    role: "admin" | "user";
}>;
export declare const loginService: (emailInput: unknown, passwordInput: unknown) => Promise<string>;
//# sourceMappingURL=service.d.ts.map