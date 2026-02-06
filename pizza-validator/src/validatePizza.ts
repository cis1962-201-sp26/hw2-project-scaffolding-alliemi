import { z } from 'zod';

export type Pizza = {
    size: number;
    crust: 'stuffed' | 'normal';
    isDeepDish?: boolean;
    toppings?: string[];
};

const bannedToppings = ['chocolate', 'cereal', 'broccoli', 'gummybears'];

const PizzaSchema = z.object({
    size: z.number(),
    crust: z.enum(['stuffed', 'normal']),
    isDeepDish: z.boolean().optional().default(false),
    toppings: z.array(z.string()).optional().default([])
}).superRefine((pizza, ctx) => {
    for (const topping of pizza.toppings) {
        if (bannedToppings.includes(topping)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Banned topping: ${topping}`
            });
        }
    }
});

export type ValidatePizzaResult =
    | { isPizza: true; pizza: Pizza }
    | { isPizza: false; errors: string[] };

export function validatePizza(input: unknown): ValidatePizzaResult {
    const result = PizzaSchema.safeParse(input);

    if (result.success) {
        return { isPizza: true, pizza: result.data };
    }

    const errors = result.error.issues.map(i => i.message);
    return { isPizza: false, errors };
}
